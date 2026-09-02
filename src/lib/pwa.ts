import { registerSW } from 'virtual:pwa-register';

let updateFn: (() => void) | null = null;

/**
 * Register PWA SW (injectManifest). Uses prompt strategy — shows toast when update available.
 * Call once from main App. Integrates with existing push SW at /sw.js (same file).
 */
export function initPWA(onNeedRefresh?: () => void, onOfflineReady?: () => void) {
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      if (onNeedRefresh) onNeedRefresh();
      // expose for manual skipWaiting from UI toast
      updateFn = () => updateSW(true);
      // also dispatch event for UI to pick up
      window.dispatchEvent(new CustomEvent('pwa:need-refresh'));
    },
    onOfflineReady() {
      if (onOfflineReady) onOfflineReady();
      window.dispatchEvent(new CustomEvent('pwa:offline-ready'));
    },
    onRegisteredSW(swUrl, r) {
      // keep push admin flow compatible — r is the same registration as push uses
      // ensure periodic update check (1h)
      if (r) {
        setInterval(() => r.update().catch(() => {}), 60 * 60 * 1000);
      }
      console.log(`[pwa] SW registered: ${swUrl}`);
    },
    onRegisterError(e) {
      console.warn('[pwa] SW registration error', e);
    }
  });
  return updateSW;
}

export function applyPWAUpdate() {
  if (updateFn) updateFn();
  else {
    // fallback: tell SW to skipWaiting
    navigator.serviceWorker?.controller?.postMessage({ type: 'SKIP_WAITING' });
    // also try to find registration
    navigator.serviceWorker.getRegistration().then(r => r?.waiting?.postMessage({ type: 'SKIP_WAITING' }));
  }
}

export function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true;
}
