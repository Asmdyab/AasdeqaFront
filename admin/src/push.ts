import { getVapidPublicKey, savePushSubscription } from './adminApi';

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) out[i] = raw.charCodeAt(i);
  return out;
}

function arrayBufferToBase64Url(buf: ArrayBuffer | null): string {
  if (!buf) return '';
  const bytes = new Uint8Array(buf);
  let binary = '';
  bytes.forEach(b => binary += String.fromCharCode(b));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function isPushSupported(): Promise<boolean> {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

export async function getPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) return 'denied';
  return Notification.permission;
}

export async function requestPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) return 'denied';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  return await Notification.requestPermission();
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) return null;
  try {
    // PWA plugin (virtual:pwa-register) already registers /sw.js.
    // Reuse existing registration to avoid double-register conflict with injectManifest.
    let reg = await navigator.serviceWorker.getRegistration();
    if (!reg) {
      reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    }
    await navigator.serviceWorker.ready;
    return reg;
  } catch (e) {
    console.warn('[push] SW registration failed', e);
    return null;
  }
}

export async function subscribeToPush(): Promise<PushSubscription | null> {
  const reg = await registerServiceWorker();
  if (!reg) return null;

  const perm = await requestPermission();
  if (perm !== 'granted') {
    console.warn('[push] permission not granted:', perm);
    return null;
  }

  let existing = await reg.pushManager.getSubscription();
  if (existing) {
    // Ensure server has it
    await syncSubscriptionToServer(existing);
    return existing;
  }

  const { publicKey } = await getVapidPublicKey();
  const converted = urlBase64ToUint8Array(publicKey);
  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: converted as BufferSource
  });
  await syncSubscriptionToServer(sub);
  return sub;
}

async function syncSubscriptionToServer(sub: PushSubscription) {
  const p256dh = arrayBufferToBase64Url(sub.getKey('p256dh'));
  const auth = arrayBufferToBase64Url(sub.getKey('auth'));
  await savePushSubscription({
    endpoint: sub.endpoint,
    p256dh,
    auth,
    expirationTime: sub.expirationTime
  });
}

export async function unsubscribeFromPush(): Promise<boolean> {
  if (!('serviceWorker' in navigator)) return false;
  const reg = await navigator.serviceWorker.ready.catch(() => null);
  if (!reg) return false;
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return true;
  const endpoint = sub.endpoint;
  const ok = await sub.unsubscribe();
  if (ok) {
    try {
      const { removePushSubscription } = await import('./adminApi');
      await removePushSubscription(endpoint);
    } catch { /* ignore */ }
  }
  return ok;
}

/** Lightweight SSE for foreground realtime (badge + toast) — uses fetch stream to send auth header */
export function subscribeToAdminEvents(onMessage: (data: { type: string; at: string }) => void): () => void {
  let abort: AbortController | null = null;
  let closed = false;

  const connect = async () => {
    if (closed) return;
    abort = new AbortController();
    const token = localStorage.getItem('apex_admin_token');
    try {
      const base = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${base}/api/admin/events`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        signal: abort.signal
      });
      if (!res.ok || !res.body) {
        throw new Error(`SSE ${res.status}`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      while (!closed) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buffer.indexOf('\n\n')) !== -1) {
          const chunk = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data:')) {
              const payload = line.slice(5).trim();
              if (!payload || payload.startsWith(':')) continue;
              try {
                const json = JSON.parse(payload);
                onMessage(json);
              } catch {
                onMessage({ type: payload, at: new Date().toISOString() });
              }
            }
          }
        }
      }
    } catch (e: any) {
      if (e?.name === 'AbortError') return;
      console.warn('[admin-events] disconnected, reconnecting in 3s', e?.message);
    } finally {
      if (!closed) setTimeout(connect, 3000);
    }
  };

  connect();
  return () => {
    closed = true;
    abort?.abort();
  };
}
