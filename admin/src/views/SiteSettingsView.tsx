import React, { useEffect, useState, useCallback } from 'react';
import { RefreshCw, Save, Plus, Trash2, Building2, Clock, BarChart3, Sparkles } from 'lucide-react';
import {
  fetchDealership,
  updateDealership,
  fetchStats,
  updateStats,
  fetchOpeningHours,
  updateOpeningHours,
  fetchServices,
  updateServices,
  DealershipInfo,
  StatItem,
  OpeningHour,
  ServiceDto
} from '../adminApi';
import { Field, inputCls } from './common';

export const SiteSettingsView: React.FC = () => {
  const [info, setInfo] = useState<Omit<DealershipInfo, 'openingHours' | 'stats'> | null>(null);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [services, setServices] = useState<ServiceDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [d, s, h, sv] = await Promise.all([
        fetchDealership(),
        fetchStats(),
        fetchOpeningHours(),
        fetchServices()
      ]);
      const { openingHours, stats, ...rest } = d;
      setInfo(rest);
      setStats(stats);
      setHours(h);
      setServices(sv);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setInfoField = (patch: Partial<typeof info>) =>
    setInfo((i) => (i ? { ...i, ...patch } : i));

  const saveInfo = async () => {
    if (!info) return;
    setMsg(null);
    try {
      await updateDealership(info);
      setMsg('تم حفظ بيانات المعرض');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'فشل الحفظ');
    }
  };

  const saveStats = async () => {
    setMsg(null);
    try {
      await updateStats(stats);
      setMsg('تم حفظ الإحصائيات');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'فشل الحفظ');
    }
  };

  const saveHours = async () => {
    setMsg(null);
    try {
      await updateOpeningHours(hours);
      setMsg('تم حفظ مواعيد العمل');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'فشل الحفظ');
    }
  };

  const saveServices = async () => {
    setMsg(null);
    try {
      await updateServices(services);
      setMsg('تم حفظ الخدمات');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'فشل الحفظ');
    }
  };

  if (loading || !info) {
    return <p className="pt-36 sm:pt-24 text-center text-sm text-neutral-500">جارٍ التحميل...</p>;
  }

  return (
    <div className="min-h-screen bg-[#f7f7f8] pt-36 sm:pt-24 pb-16 px-6 lg:px-10 max-w-4xl mx-auto space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-neutral-900 flex items-center gap-3">
          <Building2 className="w-6 h-6 text-[#a98136]" /> إعدادات الموقع
        </h1>
        <button onClick={load} className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 cursor-pointer">
          <RefreshCw className="w-3.5 h-3.5" /> تحديث
        </button>
      </div>

      {msg && <p className="text-xs text-emerald-600">{msg}</p>}

      {/* Dealership info */}
      <section className="bg-white border border-neutral-200 shadow-sm p-5">
        <h2 className="font-semibold text-neutral-900 mb-4">بيانات المعرض</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="الاسم"><input className={inputCls} value={info.name} onChange={(e) => setInfoField({ name: e.target.value })} /></Field>
          <Field label="الاسم بالعربية"><input className={inputCls} value={info.nameAr} onChange={(e) => setInfoField({ nameAr: e.target.value })} /></Field>
          <Field label="الاسم القانوني"><input className={inputCls} value={info.legalName} onChange={(e) => setInfoField({ legalName: e.target.value })} /></Field>
          <Field label="الشعار"><input className={inputCls} value={info.tagline} onChange={(e) => setInfoField({ tagline: e.target.value })} /></Field>
          <Field label="الشعار بالعربية"><input className={inputCls} value={info.taglineAr} onChange={(e) => setInfoField({ taglineAr: e.target.value })} /></Field>
          <Field label="الهاتف"><input className={inputCls} dir="ltr" value={info.phone} onChange={(e) => setInfoField({ phone: e.target.value })} /></Field>
          <Field label="هاتف مباشر"><input className={inputCls} dir="ltr" value={info.phoneDirect} onChange={(e) => setInfoField({ phoneDirect: e.target.value })} /></Field>
          <Field label="واتساب"><input className={inputCls} dir="ltr" value={info.whatsappNumber} onChange={(e) => setInfoField({ whatsappNumber: e.target.value })} /></Field>
          <Field label="البريد"><input className={inputCls} dir="ltr" value={info.email} onChange={(e) => setInfoField({ email: e.target.value })} /></Field>
          <Field label="بريد المبيعات"><input className={inputCls} dir="ltr" value={info.salesEmail} onChange={(e) => setInfoField({ salesEmail: e.target.value })} /></Field>
          <Field label="الشارع"><input className={inputCls} value={info.street} onChange={(e) => setInfoField({ street: e.target.value })} /></Field>
          <Field label="المدينة"><input className={inputCls} value={info.city} onChange={(e) => setInfoField({ city: e.target.value })} /></Field>
          <Field label="خط العرض (Lat)"><input className={inputCls} dir="ltr" value={info.lat} onChange={(e) => setInfoField({ lat: Number(e.target.value) })} /></Field>
          <Field label="خط الطول (Lng)"><input className={inputCls} dir="ltr" value={info.lng} onChange={(e) => setInfoField({ lng: Number(e.target.value) })} /></Field>
          <div className="sm:col-span-2">
            <Field label="رابط الخريطة"><input className={inputCls} dir="ltr" value={info.mapUrl} onChange={(e) => setInfoField({ mapUrl: e.target.value })} /></Field>
          </div>
        </div>
        <button onClick={saveInfo} className="mt-4 text-xs px-4 py-2 rounded bg-[#a98136] text-white hover:brightness-105 cursor-pointer flex items-center gap-1.5">
          <Save className="w-3.5 h-3.5" /> حفظ بيانات المعرض
        </button>
      </section>

      {/* Stats */}
      <section className="bg-white border border-neutral-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-neutral-900 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-[#a98136]" /> الإحصائيات</h2>
          <button onClick={() => setStats((s) => [...s, { label: '', value: '', description: '' }])} className="text-xs px-2.5 py-1.5 rounded bg-neutral-100 hover:bg-neutral-200 cursor-pointer flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> إضافة
          </button>
        </div>
        <div className="space-y-3">
          {stats.map((s, i) => (
            <div key={s.id ?? i} className="flex items-end gap-2 flex-wrap border-b border-neutral-100 pb-3">
              <div className="flex-1 min-w-[120px]"><Field label="القيمة"><input className={inputCls} dir="ltr" value={s.value} onChange={(e) => setStats((xs) => xs.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} /></Field></div>
              <div className="flex-1 min-w-[120px]"><Field label="العنوان"><input className={inputCls} value={s.label} onChange={(e) => setStats((xs) => xs.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} /></Field></div>
              <div className="flex-1 min-w-[160px]"><Field label="الوصف"><input className={inputCls} value={s.description} onChange={(e) => setStats((xs) => xs.map((x, j) => j === i ? { ...x, description: e.target.value } : x))} /></Field></div>
              <button onClick={() => setStats((xs) => xs.filter((_, j) => j !== i))} className="text-neutral-600 hover:text-red-600 cursor-pointer p-1"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <button onClick={saveStats} className="mt-4 text-xs px-4 py-2 rounded bg-[#a98136] text-white hover:brightness-105 cursor-pointer flex items-center gap-1.5">
          <Save className="w-3.5 h-3.5" /> حفظ الإحصائيات
        </button>
      </section>

      {/* Opening hours */}
      <section className="bg-white border border-neutral-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-neutral-900 flex items-center gap-2"><Clock className="w-5 h-5 text-[#a98136]" /> مواعيد العمل</h2>
          <button onClick={() => setHours((h) => [...h, { days: '', hours: '' }])} className="text-xs px-2.5 py-1.5 rounded bg-neutral-100 hover:bg-neutral-200 cursor-pointer flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> إضافة
          </button>
        </div>
        <div className="space-y-3">
          {hours.map((h, i) => (
            <div key={i} className="flex items-end gap-2 flex-wrap border-b border-neutral-100 pb-3">
              <div className="flex-1 min-w-[140px]"><Field label="الأيام"><input className={inputCls} value={h.days} onChange={(e) => setHours((xs) => xs.map((x, j) => j === i ? { ...x, days: e.target.value } : x))} /></Field></div>
              <div className="flex-1 min-w-[140px]"><Field label="الساعات"><input className={inputCls} dir="ltr" value={h.hours} onChange={(e) => setHours((xs) => xs.map((x, j) => j === i ? { ...x, hours: e.target.value } : x))} /></Field></div>
              <button onClick={() => setHours((xs) => xs.filter((_, j) => j !== i))} className="text-neutral-600 hover:text-red-600 cursor-pointer p-1"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <button onClick={saveHours} className="mt-4 text-xs px-4 py-2 rounded bg-[#a98136] text-white hover:brightness-105 cursor-pointer flex items-center gap-1.5">
          <Save className="w-3.5 h-3.5" /> حفظ المواعيد
        </button>
      </section>

      {/* Services */}
      <section className="bg-white border border-neutral-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-neutral-900 flex items-center gap-2"><Sparkles className="w-5 h-5 text-[#a98136]" /> الخدمات</h2>
          <button onClick={() => setServices((s) => [...s, { slug: '', title: '', description: '', badge: '' }])} className="text-xs px-2.5 py-1.5 rounded bg-neutral-100 hover:bg-neutral-200 cursor-pointer flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> إضافة
          </button>
        </div>
        <div className="space-y-3">
          {services.map((s, i) => (
            <div key={s.id ?? i} className="flex items-end gap-2 flex-wrap border-b border-neutral-100 pb-3">
              <div className="flex-1 min-w-[120px]"><Field label="العنوان"><input className={inputCls} value={s.title} onChange={(e) => setServices((xs) => xs.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} /></Field></div>
              <div className="flex-1 min-w-[120px]"><Field label="الشارة"><input className={inputCls} value={s.badge} onChange={(e) => setServices((xs) => xs.map((x, j) => j === i ? { ...x, badge: e.target.value } : x))} /></Field></div>
              <div className="flex-1 min-w-[160px]"><Field label="الوصف"><input className={inputCls} value={s.description} onChange={(e) => setServices((xs) => xs.map((x, j) => j === i ? { ...x, description: e.target.value } : x))} /></Field></div>
              <button onClick={() => setServices((xs) => xs.filter((_, j) => j !== i))} className="text-neutral-600 hover:text-red-600 cursor-pointer p-1"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <button onClick={saveServices} className="mt-4 text-xs px-4 py-2 rounded bg-[#a98136] text-white hover:brightness-105 cursor-pointer flex items-center gap-1.5">
          <Save className="w-3.5 h-3.5" /> حفظ الخدمات
        </button>
      </section>
    </div>
  );
};
