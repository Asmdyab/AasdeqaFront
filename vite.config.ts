import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        strategies: 'injectManifest',
        srcDir: 'public',
        filename: 'sw.js',
        registerType: 'prompt',
        injectRegister: null,
        injectManifest: {
          globPatterns: ['**/*.{js,css,html,woff2,woff,png,jpg,jpeg,svg,ico,json}'],
          maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
        },
        manifest: {
          name: 'الأصدقاء موتورز — صالة السيارات الفاخرة',
          short_name: 'الأصدقاء موتورز',
          description: 'سيارات مفحوصة ومعتمدة، أسعار معلنة، تمويل مرن — الأصدقاء موتورز القاهرة',
          theme_color: '#a98136',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'any',
          scope: '/',
          start_url: '/?source=pwa',
          lang: 'ar',
          dir: 'rtl',
          categories: ['shopping', 'auto'],
          icons: [
            { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
            { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
          ],
          shortcuts: [
            { name: 'لوحة التحكم', short_name: 'التحكم', description: 'إدارة السيارات والطلبات', url: '/admin', icons: [{ src: 'icons/icon-192.png', sizes: '192x192' }] },
            { name: 'صندوق الطلبات', short_name: 'الطلبات', description: 'الطلبات الجديدة من العملاء', url: '/admin#inbox', icons: [{ src: 'icons/icon-192.png', sizes: '192x192' }] }
          ],
          screenshots: []
        },
        devOptions: { enabled: false, type: 'module', navigateFallback: 'index.html', suppressWarnings: true }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {
        // The backend writes uploads (wwwroot/uploads) and build output (bin/obj)
        // inside this project root. Ignore it so those writes don't trigger a
        // full-page reload of the dev server.
        ignored: ['**/backend/**'],
      },
    },
  };
});


