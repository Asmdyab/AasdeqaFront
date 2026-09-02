import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Lock, LogIn, Tag, MessageSquare, Building2, Inbox, Car, Bell, BellOff, Volume2 } from 'lucide-react';
import { login, setToken, getToken, fetchNewUnreadCounts, fetchLegacyUnreadCounts, testPush } from './adminApi';
import { InboxView } from './InboxView';
import { VehiclesView } from './VehiclesView';
import { BrandsView } from './views/BrandsView';
import { ReviewsView } from './views/ReviewsView';
import { SiteSettingsView } from './views/SiteSettingsView';
import { isPushSupported, subscribeToPush, getPermission, subscribeToAdminEvents } from './push';
import { PWAUpdatePrompt } from '../../src/components/PWAUpdatePrompt';

type AdminView = 'brands' | 'reviews' | 'site' | 'inbox' | 'vehicles';

const LoginScreen: React.FC<{ onLogin: (token: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await login(username, password);
      setToken(res.token);
      onLogin(res.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'فشل تسجيل الدخول');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" dir="rtl">
      <form onSubmit={submit} className="w-full max-w-sm bg-white border border-neutral-200 shadow-sm p-8 space-y-6">
        <div className="text-center space-y-2">
          <Lock className="w-8 h-8 text-[#a98136] mx-auto" strokeWidth={1.5} />
          <h1 className="font-display text-xl font-semibold text-neutral-900">الأصدقاء موتورز</h1>
          <p className="text-xs text-neutral-500">لوحة تحكم الموقع</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="field-label">اسم المستخدم</label>
            <input
              type="text" required value={username}
              onChange={e => setUsername(e.target.value)}
              className="field-input" placeholder="admin" dir="ltr"
            />
          </div>
          <div>
            <label className="field-label">كلمة المرور</label>
            <input
              type="password" required value={password}
              onChange={e => setPassword(e.target.value)}
              className="field-input" placeholder="••••••••" dir="ltr"
            />
          </div>
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button type="submit" disabled={busy} className="btn btn-gold w-full">
          <LogIn className="w-4 h-4" />
          {busy ? 'جارٍ الدخول...' : 'تسجيل الدخول'}
        </button>
      </form>
    </div>
  );
};

export default function AdminApp() {
  const [authed, setAuthed] = useState<boolean>(() => Boolean(getToken()));
  const [view, setView] = useState<AdminView>('brands');
  const [badge, setBadge] = useState<number>(0);
  const [pushStatus, setPushStatus] = useState<'unsupported' | 'granted' | 'denied' | 'default' | 'prompt'>('default');
  const [toast, setToast] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const refreshBadge = useCallback(async () => {
    try {
      const [n, l] = await Promise.all([fetchNewUnreadCounts().catch(() => ({ purchases: 0, inspections: 0 })), fetchLegacyUnreadCounts().catch(() => ({ contacts: 0, testDrives: 0, tradeIns: 0 }))]);
      const total = (n.purchases || 0) + (n.inspections || 0) + (l.contacts || 0) + (l.testDrives || 0) + (l.tradeIns || 0);
      setBadge(total);
    } catch { /* ignore */ }
  }, []);

  const playSound = useCallback(() => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
        // tiny beep fallback via WebAudio
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = 'sine'; o.frequency.value = 880; g.gain.value = 0.12;
        o.connect(g); g.connect(ctx.destination); o.start(); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5); o.stop(ctx.currentTime + 0.5);
        return;
      }
      audioRef.current.currentTime = 0; audioRef.current.play().catch(() => {});
    } catch { /* ignore */ }
  }, []);

  const triggerForegroundNotify = useCallback((msg: string) => {
    setToast(msg);
    playSound();
    refreshBadge();
    // also show browser Notification if foreground & granted
    if (Notification.permission === 'granted') {
      try { new Notification('طلب جديد — الأصدقاء', { body: msg, icon: '/favicon.ico', tag: 'apex-foreground' }); } catch { /* ignore */ }
    }
    setTimeout(() => setToast(null), 4000);
  }, [playSound, refreshBadge]);

  useEffect(() => {
    if (!authed) return;
    refreshBadge();
    const id = setInterval(refreshBadge, 30000);
    return () => clearInterval(id);
  }, [authed, refreshBadge]);

  useEffect(() => {
    if (!authed) return;
    let unsubSSE: (() => void) | null = null;
    (async () => {
      const supported = await isPushSupported();
      if (!supported) { setPushStatus('unsupported'); }
      else {
        const perm = await getPermission();
        setPushStatus(perm as any);
        // auto-subscribe if already granted
        if (perm === 'granted') {
          subscribeToPush().then(() => setPushStatus('granted')).catch(() => {});
        }
      }
      unsubSSE = subscribeToAdminEvents((data) => {
        if (data.type?.startsWith('inbox:new')) {
          const kind = data.type.split(':')[2] || 'طلب';
          triggerForegroundNotify(`وصل ${kind} جديد — افتح الطلبات للاطلاع`);
          // notify InboxView via custom event
          window.dispatchEvent(new CustomEvent('apex:inbox:new', { detail: data }));
        }
      });
    })();
    return () => { if (unsubSSE) unsubSSE(); };
  }, [authed, triggerForegroundNotify]);

  const handleEnablePush = async () => {
    const sub = await subscribeToPush().catch(() => null);
    const perm = await getPermission();
    setPushStatus(perm as any);
    if (sub && perm === 'granted') {
      triggerForegroundNotify('تم تفعيل الإشعارات — ستصلك الطلبات حتى مع إغلاق الصفحة');
    } else if (perm === 'denied') {
      alert('تم حظر الإشعارات من المتصفح. فعّلها من إعدادات الموقع.');
    }
  };

  const handleTestPush = async () => {
    try { await testPush(); } catch (e: any) { alert(e.message); }
  };

  const logout = () => {
    setToken(null);
    setAuthed(false);
    setView('brands');
  };

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  return (
    <>
      <AdminTopBar view={view} setView={setView} onLogout={logout} badge={badge} pushStatus={pushStatus} onEnablePush={handleEnablePush} onTestPush={handleTestPush} />
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[200] bg-neutral-900 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-2" dir="rtl">
          <Volume2 className="w-3.5 h-3.5 text-[#a98136]" /> {toast}
        </div>
      )}
      {view === 'brands' && <BrandsView />}
      {view === 'reviews' && <ReviewsView />}
      {view === 'site' && <SiteSettingsView />}
      {view === 'inbox' && <InboxView refreshBadge={refreshBadge} />}
      {view === 'vehicles' && <VehiclesView />}
      <PWAUpdatePrompt />
    </>
  );
};

const NAV: { key: AdminView; label: string; icon: React.ReactNode }[] = [
  { key: 'brands', label: 'الماركات', icon: <Tag className="w-3.5 h-3.5" /> },
  { key: 'reviews', label: 'الآراء', icon: <MessageSquare className="w-3.5 h-3.5" /> },
  { key: 'site', label: 'إعدادات الموقع', icon: <Building2 className="w-3.5 h-3.5" /> },
  { key: 'inbox', label: 'الطلبات', icon: <Inbox className="w-3.5 h-3.5" /> },
  { key: 'vehicles', label: 'السيارات', icon: <Car className="w-3.5 h-3.5" /> }
];

const AdminTopBar: React.FC<{
  view: AdminView;
  setView: (v: AdminView) => void;
  onLogout: () => void;
  badge?: number;
  pushStatus?: string;
  onEnablePush?: () => void;
  onTestPush?: () => void;
}> = ({ view, setView, onLogout, badge = 0, pushStatus = 'default', onEnablePush, onTestPush }) => (
  <div className="apex-admin-toolbar fixed top-0 inset-x-0 z-[100] bg-white/95 backdrop-blur border-b border-neutral-200 px-4 py-2 flex items-center gap-3 shadow-lg flex-wrap" dir="rtl">
    <span className="font-bold text-sm text-[#a98136]">لوحة تحكم الأصدقاء</span>
    <div className="flex items-center gap-1 flex-wrap">
      {NAV.map((n) => {
        const isInbox = n.key === 'inbox';
        return (
          <button
            key={n.key}
            onClick={() => setView(n.key)}
            className={`text-xs px-3 py-1.5 rounded cursor-pointer flex items-center gap-1.5 relative ${
              view === n.key ? 'bg-[#a98136] text-white font-semibold' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            {n.icon}
            {n.label}
            {isInbox && badge > 0 && (
              <span className="absolute -top-1 -left-1 bg-red-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center leading-none">{badge > 99 ? '99+' : badge}</span>
            )}
          </button>
        );
      })}
    </div>
    <div className="flex-1" />
    {pushStatus !== 'unsupported' && pushStatus !== 'granted' && (
      <button onClick={onEnablePush} className="text-xs px-3 py-1.5 rounded bg-[#a98136]/10 hover:bg-[#a98136]/20 text-[#a98136] border border-[#a98136]/30 flex items-center gap-1.5 cursor-pointer" title="تفعيل إشعارات المتصفح حتى مع إغلاق الصفحة">
        <Bell className="w-3.5 h-3.5" /> تفعيل الإشعارات
      </button>
    )}
    {pushStatus === 'granted' && (
      <button onClick={onTestPush} className="text-xs px-2 py-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 border border-emerald-500/20 flex items-center gap-1 cursor-pointer" title="اختبار وصول الإشعار">
        <Bell className="w-3 h-3" /> اختبار
      </button>
    )}
    {pushStatus === 'denied' && (
      <span className="text-[11px] text-red-500 flex items-center gap-1"><BellOff className="w-3 h-3" /> محظور</span>
    )}
    {pushStatus === 'granted' && <span className="text-[11px] text-emerald-600 flex items-center gap-1"><Bell className="w-3 h-3" /> مفعّل</span>}
    <button onClick={onLogout} className="text-xs px-3 py-1.5 rounded bg-neutral-100 hover:bg-red-500/20 hover:text-red-600 cursor-pointer">خروج</button>
  </div>
);


