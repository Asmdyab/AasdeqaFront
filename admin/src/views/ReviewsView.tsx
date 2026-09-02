import React, { useEffect, useState, useCallback } from 'react';
import { RefreshCw, Save, Trash2, Plus, Star, MessageSquare } from 'lucide-react';
import {
  fetchReviews,
  createReview,
  updateReview,
  deleteReview,
  ReviewDto
} from '../adminApi';
import { ImagePicker, Field, inputCls } from './common';

const emptyReview = (): Omit<ReviewDto, 'id'> => ({
  name: '',
  role: '',
  location: '',
  avatarUrl: '',
  vehiclePurchased: '',
  rating: 5,
  dateLabel: '',
  reviewText: '',
  verified: true,
  sortOrder: 0
});

export const ReviewsView: React.FC = () => {
  const [items, setItems] = useState<ReviewDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await fetchReviews());
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setField = (id: number, patch: Partial<ReviewDto>) =>
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const save = async (r: ReviewDto) => {
    setMsg(null);
    try {
      if (r.id) await updateReview(r);
      else {
        const created = await createReview(r);
        setItems((xs) => xs.map((x) => (x === r ? { ...created, ...r } : x)));
      }
      setMsg('تم الحفظ');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'فشل الحفظ');
    }
  };

  const add = () => setItems((xs) => [...xs, { ...emptyReview() } as ReviewDto]);
  const remove = async (id: number) => {
    if (!confirm('حذف التقييم؟')) return;
    if (id) await deleteReview(id);
    setItems((xs) => xs.filter((x) => x.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] pt-36 sm:pt-24 pb-16 px-6 lg:px-10 max-w-4xl mx-auto" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold text-neutral-900 flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-[#a98136]" /> آراء العملاء ({items.length})
        </h1>
        <div className="flex items-center gap-3">
          <button onClick={add} className="text-xs px-3 py-1.5 rounded bg-[#a98136] text-white hover:brightness-105 cursor-pointer flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> إضافة تقييم
          </button>
          <button onClick={load} className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5" /> تحديث
          </button>
        </div>
      </div>

      {msg && <p className="text-xs text-emerald-600 mb-3">{msg}</p>}
      {loading && <p className="text-sm text-neutral-500">جارٍ التحميل...</p>}

      <div className="space-y-4">
        {items.map((r) => (
          <div key={r.id || Math.random()} className="bg-white border border-neutral-200 shadow-sm p-4">
            <div className="flex items-start gap-4 flex-wrap">
              <div className="shrink-0 min-w-[120px]">
                <ImagePicker url={r.avatarUrl} onPicked={(u) => setField(r.id, { avatarUrl: u })} label="صورة العميل" />
              </div>
              <div className="flex-1 min-w-[240px] grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="الاسم">
                  <input className={inputCls} value={r.name} onChange={(e) => setField(r.id, { name: e.target.value })} />
                </Field>
                <Field label="الصفة">
                  <input className={inputCls} value={r.role} onChange={(e) => setField(r.id, { role: e.target.value })} />
                </Field>
                <Field label="المدينة">
                  <input className={inputCls} value={r.location} onChange={(e) => setField(r.id, { location: e.target.value })} />
                </Field>
                <Field label="السيارة المشتراة">
                  <input className={inputCls} dir="ltr" value={r.vehiclePurchased} onChange={(e) => setField(r.id, { vehiclePurchased: e.target.value })} />
                </Field>
                <Field label="التاريخ">
                  <input className={inputCls} dir="ltr" value={r.dateLabel} onChange={(e) => setField(r.id, { dateLabel: e.target.value })} />
                </Field>
                <Field label={`التقييم: ${r.rating}`}>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" onClick={() => setField(r.id, { rating: n })} className="cursor-pointer">
                        <Star className={`w-4 h-4 ${n <= r.rating ? 'fill-[#a98136] text-[#a98136]' : 'text-neutral-400'}`} />
                      </button>
                    ))}
                  </div>
                </Field>
                <label className="flex items-center gap-2 text-xs text-neutral-600 sm:col-span-2">
                  <input type="checkbox" checked={r.verified} onChange={(e) => setField(r.id, { verified: e.target.checked })} />
                  عميل موثّق
                </label>
                <div className="sm:col-span-2">
                  <Field label="نص التقييم">
                    <textarea className={inputCls} rows={3} value={r.reviewText} onChange={(e) => setField(r.id, { reviewText: e.target.value })} />
                  </Field>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-stretch">
                <button onClick={() => save(r)} className="text-xs px-3 py-2 rounded bg-[#a98136] text-white hover:brightness-105 cursor-pointer flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" /> حفظ
                </button>
                <button onClick={() => remove(r.id)} className="text-neutral-600 hover:text-red-600 cursor-pointer p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
