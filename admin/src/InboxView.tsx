import React, { useEffect, useState, useCallback } from 'react';
import { Inbox as InboxIcon, Car, Trash2, Phone, Mail, Calendar, RefreshCw, ShoppingCart, Eye } from 'lucide-react';
import { fetchNewInbox, updateNewStatus, deleteNewInboxItem, NewInboxData, PurchaseDto, InspectionDto } from './adminApi';

const STATUSES: Record<number, string> = { 1: 'جديد', 2: 'تم التواصل', 3: 'مغلق' };
const PURCHASE_TYPES: Record<number, string> = { 1: 'شراء', 2: 'تأجير' };

const StatusBadge: React.FC<{ status: number }> = ({ status }) => (
  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${status === 1 ? 'bg-emerald-500/15 text-emerald-700' : status === 2 ? 'bg-amber-500/20 text-amber-700' : 'bg-neutral-400/20 text-neutral-500'}`}>{STATUSES[status]}</span>
);
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="bg-white border border-neutral-200 shadow-sm p-4 space-y-3">{children}</div>;
const Meta: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500" dir="auto"><Icon className="w-3.5 h-3.5 text-neutral-500" /> {children}</span>
);

export const InboxView: React.FC<{ refreshBadge?: () => void }> = ({ refreshBadge }) => {
  const [tab, setTab] = useState<'purchases' | 'inspections'>('purchases');
  const [data, setData] = useState<NewInboxData | null>(null);
  const [loading, setLoading] = useState(true);
  const [newIds, setNewIds] = useState<Set<number>>(new Set());

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchNewInbox();
      setData(prev => {
        if (prev) {
          const prevIds = new Set([...prev.purchases.map(p => p.id), ...prev.inspections.map(i => i.id)]);
          const incomingIds = [...res.purchases.map(p => p.id), ...res.inspections.map(i => i.id)].filter(id => !prevIds.has(id));
          if (incomingIds.length) setNewIds(s => new Set([...s, ...incomingIds]));
          setTimeout(() => setNewIds(s => { const n = new Set(s); incomingIds.forEach(id => n.delete(id)); return n; }), 3000);
        }
        return res;
      });
      refreshBadge?.();
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [refreshBadge]);
  useEffect(() => { load(); }, [load]);
  // realtime: listen to push SSE forwarded event
  useEffect(() => {
    const h = () => load();
    window.addEventListener('apex:inbox:new', h as EventListener);
    const iv = setInterval(load, 15000); // polling fallback for cases where SSE missed
    return () => { window.removeEventListener('apex:inbox:new', h as EventListener); clearInterval(iv); };
  }, [load]);

  const handleStatus = async (kind: 'purchase' | 'inspection', id: number, status: number) => {
    await updateNewStatus(kind, id, status);
    load();
  };
  const handleDelete = async (kind: 'purchase' | 'inspection', id: number) => {
    if (!confirm('حذف هذا العنصر نهائياً؟')) return;
    await deleteNewInboxItem(kind, id);
    load();
  };

  const tabs = [
    { key: 'purchases' as const, label: `طلبات شراء / تأجير (${data?.purchases.length ?? 0})`, icon: ShoppingCart },
    { key: 'inspections' as const, label: `طلبات معاينة (${data?.inspections.length ?? 0})`, icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f8] pt-36 sm:pt-24 pb-16 px-6 lg:px-10 max-w-6xl mx-auto" dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-semibold text-neutral-900 flex items-center gap-3"><InboxIcon className="w-6 h-6 text-[#a98136]" /> صندوق الطلبات</h1>
        <button onClick={load} className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 cursor-pointer"><RefreshCw className="w-3.5 h-3.5" /> تحديث</button>
      </div>
      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.key} onClick={() => setTab(t.key)} className={`text-sm px-4 py-2 border transition-colors cursor-pointer flex items-center gap-1.5 ${tab === t.key ? 'border-[#a98136] bg-[#a98136]/10 text-neutral-900 font-semibold' : 'border-neutral-300 text-neutral-500 hover:text-neutral-900'}`}>
              <Icon className="w-3.5 h-3.5" />{t.label}
            </button>
          );
        })}
      </div>
      {loading && <p className="text-sm text-neutral-500">جارٍ التحميل...</p>}

      {!loading && tab === 'purchases' && (data?.purchases ?? []).map((p: PurchaseDto) => (
        <div key={p.id} className={newIds.has(p.id) ? 'animate-pulse ring-2 ring-[#a98136]/30' : ''}>
          <Card key={p.id}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-neutral-900">{p.name} <StatusBadge status={p.status} /> <span className="text-xs text-[#a98136] ms-2">{PURCHASE_TYPES[p.requestType]}</span></p>
              <p className="text-xs text-[#a98136] mt-1">{p.vehicleName} {p.rentalDuration ? `— مدة التأجير: ${p.rentalDuration}` : ''}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                <Meta icon={Phone}><span dir="ltr">{p.phone}</span></Meta>
                {p.email ? <Meta icon={Mail}>{p.email}</Meta> : null}
                <Meta icon={Car}>{PURCHASE_TYPES[p.requestType]}</Meta>
              </div>
              {p.notes && <p className="text-xs text-neutral-500 mt-2">ملاحظات: {p.notes}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <select value={p.status} onChange={e => handleStatus('purchase', p.id, Number(e.target.value))} className="bg-white border border-neutral-200 rounded-lg text-xs text-neutral-700 hover:border-[#a98136]/50 px-2.5 py-1.5 cursor-pointer">
                {Object.entries(STATUSES).map(([v,l])=> <option key={v} value={v}>{l}</option>)}
              </select>
              <button onClick={() => handleDelete('purchase', p.id)} className="text-neutral-500 hover:text-red-600 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
          <p className="text-[10px] text-neutral-600">{new Date(p.createdAt).toLocaleString('ar-EG')}</p>
          </Card>
        </div>
       ))}

      {!loading && tab === 'inspections' && (data?.inspections ?? []).map((ins: InspectionDto) => (
        <div key={ins.id} className={newIds.has(ins.id) ? 'animate-pulse ring-2 ring-[#a98136]/30' : ''}>
          <Card key={ins.id}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-neutral-900">{ins.name} <StatusBadge status={ins.status} /></p>
              <p className="text-xs text-[#a98136] mt-1">{ins.vehicleName}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                <Meta icon={Phone}><span dir="ltr">{ins.phone}</span></Meta>
                {ins.email ? <Meta icon={Mail}>{ins.email}</Meta> : null}
                <Meta icon={Calendar}><span dir="ltr">{ins.preferredDate} — {ins.preferredTime}</span></Meta>
              </div>
              {ins.notes && <p className="text-xs text-neutral-500 mt-2">ملاحظات: {ins.notes}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <select value={ins.status} onChange={e => handleStatus('inspection', ins.id, Number(e.target.value))} className="bg-white border border-neutral-200 rounded-lg text-xs text-neutral-700 hover:border-[#a98136]/50 px-2.5 py-1.5 cursor-pointer">
                {Object.entries(STATUSES).map(([v,l])=> <option key={v} value={v}>{l}</option>)}
              </select>
              <button onClick={() => handleDelete('inspection', ins.id)} className="text-neutral-500 hover:text-red-600 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
          <p className="text-[10px] text-neutral-600">{new Date(ins.createdAt).toLocaleString('ar-EG')}</p>
          </Card>
        </div>
       ))}

      {!loading && ((tab === 'purchases' && !data?.purchases.length) || (tab === 'inspections' && !data?.inspections.length)) && (
        <p className="text-sm text-neutral-500 py-12 text-center">لا توجد طلبات بعد.</p>
      )}
    </div>
  );
};
