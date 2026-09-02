import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import AdminApp from '../admin/src/AdminApp.tsx';
import '../admin/src/admin.css';
import { initPWA } from './lib/pwa';

// Single deployable: website at "/" and admin panel at "/admin".
// Support /admin, /admin/, /admin#inbox and also legacy hash #admin / #/admin → redirect to /admin
const _p = window.location.pathname;
const _h = window.location.hash;
const isAdmin = _p.startsWith('/admin') || _h.startsWith('#admin') || _h.startsWith('#/admin');
if (isAdmin && !_p.startsWith('/admin')) {
  // keep hash fragment after redirect e.g. #admin#inbox → /admin#inbox
  const suffix = _h.replace(/^#\/?admin/i, '') || '';
  window.history.replaceState(null, '', '/admin' + suffix);
}

// Fix: previous dev builds registered SW at /sw.js with NetworkFirst for /api.
// After switching devOptions.enabled=false, old SW stays cached and makes /api/auth/login appear pending.
// In DEV, force unregister any stale SW so API goes direct to :5000 without interception.
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    if (regs.length) {
      regs.forEach(r => r.unregister());
      console.log('[pwa] unregistered stale dev SW', regs.length);
      // also clear Workbox caches that may hold stale /api
      if ('caches' in window) caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
    }
  });
} else {
  // Init PWA only in prod (single SW at /sw.js handles both precache + push)
  initPWA();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? <AdminApp /> : <App />}
  </StrictMode>,
);
