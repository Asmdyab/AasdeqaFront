/* Apex Motors PWA — injectManifest (Workbox) + Web Push */
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// Injected by vite-plugin-pwa injectManifest
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// API — NetworkFirst (never cache POST, short timeout)
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'apex-api',
    networkTimeoutSeconds: 4,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 5 * 60 })
    ]
  }),
  'GET'
);

// Images — CacheFirst 30 days
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'apex-images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 30 * 24 * 60 * 60 })
    ]
  })
);

// Fonts — CacheFirst 1 year
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts',
    plugins: [new ExpirationPlugin({ maxEntries: 20, maxAgeSeconds: 365 * 24 * 60 * 60 })]
  })
);

// JS/CSS — StaleWhileRevalidate
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({ cacheName: 'apex-assets' })
);

// Navigation — network first fallback to precached index.html (SPA)
let navigationPreloadEnabled = false;
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
        navigationPreloadEnabled = true;
      }
      await self.clients.claim();
    })()
  );
});

registerRoute(
  new NavigationRoute(async ({ event }) => {
    try {
      const preload = navigationPreloadEnabled ? await event.preloadResponse : null;
      if (preload) return preload;
      const res = await fetch(event.request);
      return res;
    } catch (e) {
      const cache = await caches.match('/index.html');
      return cache || Response.error();
    }
  })
);

// SKIP_WAITING message from client (PWA update prompt)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

/* ---- Web Push (existing, multi-admin, standards VAPID) ---- */
self.addEventListener('push', (event) => {
  let data = { title: 'طلب جديد', body: 'وصل طلب جديد من العميل', tag: 'apex', url: '/admin#inbox' };
  try {
    if (event.data) {
      const json = event.data.json();
      data = { ...data, ...json };
    }
  } catch (_) {
    const text = event.data ? event.data.text() : '';
    if (text) data.body = text;
  }

  const title = data.title || 'الأصدقاء موتورز';
  const options = {
    body: data.body,
    icon: data.icon || '/icons/icon-192.png',
    badge: data.badge || '/icons/icon-192.png',
    tag: data.tag || 'apex-inbox',
    data: { url: data.url || '/admin#inbox' },
    renotify: true,
    requireInteraction: false,
    vibrate: [200, 100, 200],
    timestamp: data.timestamp || Date.now()
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/admin#inbox';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.includes('/admin') && 'focus' in c) {
          c.navigate(url);
          return c.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

self.addEventListener('install', () => {
  self.skipWaiting();
});


