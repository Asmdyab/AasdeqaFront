import React, { useEffect, useState } from 'react';
import { RefreshCw, Download, X } from 'lucide-react';
import { applyPWAUpdate } from '../lib/pwa';

export const PWAUpdatePrompt: React.FC = () => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);

  useEffect(() => {
    const onNeed = () => setNeedRefresh(true);
    const onReady = () => {
      setOfflineReady(true);
      setTimeout(() => setOfflineReady(false), 4000);
    };
    const onControllerChange = () => window.location.reload();
    window.addEventListener('pwa:need-refresh', onNeed as EventListener);
    window.addEventListener('pwa:offline-ready', onReady as EventListener);
    navigator.serviceWorker?.addEventListener('controllerchange', onControllerChange);
    return () => {
      window.removeEventListener('pwa:need-refresh', onNeed as EventListener);
      window.removeEventListener('pwa:offline-ready', onReady as EventListener);
      navigator.serviceWorker?.removeEventListener('controllerchange', onControllerChange);
    };
  }, []);

  if (offlineReady) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[300] bg-emerald-600 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-2" dir="rtl">
        <Download className="w-3.5 h-3.5" /> جاهز للعمل دون اتصال
        <button onClick={() => setOfflineReady(false)} className="ms-2 p-1 hover:bg-white/20 rounded-full"><X className="w-3 h-3" /></button>
      </div>
    );
  }

  if (!needRefresh) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[300] bg-neutral-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 max-w-[90vw]" dir="rtl">
      <RefreshCw className="w-4 h-4 text-[#a98136] shrink-0" />
      <span>يتوفر تحديث جديد — حدّث الآن</span>
      <button onClick={() => { navigator.serviceWorker.getRegistration().then(r => r?.unregister()).then(() => window.location.reload()); }} className="bg-[#a98136] text-white px-3 py-1.5 rounded font-semibold hover:brightness-110 cursor-pointer">تحديث</button>
      <button onClick={() => setNeedRefresh(false)} className="p-1 hover:bg-white/20 rounded-full cursor-pointer"><X className="w-3 h-3" /></button>
    </div>
  );
};
