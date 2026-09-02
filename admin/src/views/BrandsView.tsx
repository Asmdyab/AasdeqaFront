import React, { useEffect, useState, useCallback } from 'react';
import { RefreshCw, Save, Trash2, Plus, Tag, X } from 'lucide-react';
import {
  fetchBrands,
  updateBrand,
  createBrand,
  deleteBrand,
  BrandDto
} from '../adminApi';
import { ImagePicker, Field, inputCls } from './common';

const emptyBrand = (): Omit<BrandDto, 'id'> => ({
  name: '',
  nameAr: '',
  logoUrl: '',
  tagline: '',
  country: 'Germany',
  vehicleCount: 0,
  featuredModel: '',
  backgroundImageUrl: '',
  sortOrder: 0
});

export const BrandsView: React.FC = () => {
  const [brands, setBrands] = useState<BrandDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<BrandDto, 'id'>>(emptyBrand());
  const [savingNew, setSavingNew] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setBrands(await fetchBrands());
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setField = (id: number, patch: Partial<BrandDto>) =>
    setBrands((bs) => bs.map((b) => (b.id === id ? { ...b, ...patch } : b)));

  const save = async (b: BrandDto) => {
    setMsg(null);
    try {
      await updateBrand(b);
      setMsg('تم الحفظ');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'فشل الحفظ');
    }
  };

  const openAdd = () => {
    setDraft(emptyBrand());
    setDialogOpen(true);
  };

  const saveNew = async () => {
    setSavingNew(true);
    setMsg(null);
    try {
      await createBrand(draft);
      setDialogOpen(false);
      setMsg('تمت الإضافة');
      load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'فشل الإضافة');
    } finally {
      setSavingNew(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm('حذف هذه الماركة؟')) return;
    await deleteBrand(id);
    load();
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] pt-36 sm:pt-24 pb-16 px-6 lg:px-10 max-w-5xl mx-auto" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold text-neutral-900 flex items-center gap-3">
          <Tag className="w-6 h-6 text-[#a98136]" /> الماركات ({brands.length})
        </h1>
        <div className="flex items-center gap-3">
          <button onClick={openAdd} className="text-xs px-3 py-1.5 rounded bg-[#a98136] text-white hover:brightness-105 cursor-pointer flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> إضافة ماركة
          </button>
          <button onClick={load} className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5" /> تحديث
          </button>
        </div>
      </div>

      {msg && <p className="text-xs text-emerald-600 mb-3">{msg}</p>}
      {loading && <p className="text-sm text-neutral-500">جارٍ التحميل...</p>}

      <div className="space-y-4">
        {brands.map((b) => (
          <div key={b.id} className="bg-white border border-neutral-200 shadow-sm p-4">
            <div className="flex items-start gap-4 flex-wrap">
              <div className="shrink-0 min-w-[120px]">
                <ImagePicker
                  url={b.backgroundImageUrl}
                  onPicked={(u) => setField(b.id, { backgroundImageUrl: u })}
                  label="خلفية الماركة"
                />
              </div>
              <div className="flex-1 min-w-[240px] grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="الاسم (إنجليزي - مفتاح الفلتر)">
                  <input className={inputCls} dir="ltr" value={b.name} onChange={(e) => setField(b.id, { name: e.target.value })} />
                </Field>
                <Field label="الاسم بالعربية">
                  <input className={inputCls} value={b.nameAr} onChange={(e) => setField(b.id, { nameAr: e.target.value })} />
                </Field>
                <Field label="الدولة">
                  <input className={inputCls} dir="ltr" value={b.country} onChange={(e) => setField(b.id, { country: e.target.value })} />
                </Field>
                <Field label="عدد السيارات (محسوب تلقائياً)">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-semibold text-[#a98136] min-w-[28px] text-center">{b.vehicleCount}</span>
                    <span className="text-xs text-neutral-500">سيارة — يُحسب من السيارات الفعلية</span>
                  </div>
                </Field>
                <Field label="الطراز المميز">
                  <input className={inputCls} value={b.featuredModel} onChange={(e) => setField(b.id, { featuredModel: e.target.value })} />
                </Field>
                <Field label="الشعار">
                  <ImagePicker url={b.logoUrl} onPicked={(u) => setField(b.id, { logoUrl: u })} label="رفع الشعار" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="الوصف">
                    <textarea className={inputCls} rows={2} value={b.tagline} onChange={(e) => setField(b.id, { tagline: e.target.value })} />
                  </Field>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-stretch">
                <button onClick={() => save(b)} className="text-xs px-3 py-2 rounded bg-[#a98136] text-white hover:brightness-105 cursor-pointer flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" /> حفظ
                </button>
                <button onClick={() => remove(b.id)} className="text-neutral-600 hover:text-red-600 cursor-pointer p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {dialogOpen && (
        <div className="fixed inset-0 z-[200] bg-black/40 flex items-start justify-center p-4 overflow-y-auto" dir="rtl">
          <div className="bg-white w-full max-w-2xl my-8 shadow-xl rounded-lg">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-3 sticky top-0 bg-white z-10">
              <h2 className="font-display text-lg font-semibold text-neutral-900">إضافة ماركة جديدة</h2>
              <button onClick={() => setDialogOpen(false)} className="text-neutral-500 hover:text-neutral-900 cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="الاسم (إنجليزي - مفتاح الفلتر)">
                  <input className={inputCls} dir="ltr" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                </Field>
                <Field label="الاسم بالعربية">
                  <input className={inputCls} value={draft.nameAr} onChange={(e) => setDraft({ ...draft, nameAr: e.target.value })} />
                </Field>
                <Field label="الدولة">
                  <input className={inputCls} dir="ltr" value={draft.country} onChange={(e) => setDraft({ ...draft, country: e.target.value })} />
                </Field>
                <Field label="الطراز المميز">
                  <input className={inputCls} value={draft.featuredModel} onChange={(e) => setDraft({ ...draft, featuredModel: e.target.value })} />
                </Field>
                <Field label="الشعار">
                  <ImagePicker url={draft.logoUrl} onPicked={(u) => setDraft({ ...draft, logoUrl: u })} label="رفع الشعار" />
                </Field>
                <Field label="عدد السيارات (محسوب تلقائياً)">
                  <div className="text-xs text-neutral-500 py-2">سيُحسب تلقائياً من عدد السيارات المرتبطة بهذه الماركة (حالياً 0)</div>
                </Field>
              </div>
              <Field label="الوصف">
                <textarea className={inputCls} rows={2} value={draft.tagline} onChange={(e) => setDraft({ ...draft, tagline: e.target.value })} />
              </Field>
              <Field label="صورة الخلفية">
                <ImagePicker url={draft.backgroundImageUrl} onPicked={(u) => setDraft({ ...draft, backgroundImageUrl: u })} label="رفع" />
              </Field>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-neutral-200 px-5 py-3 sticky bottom-0 bg-white">
              <button onClick={() => setDialogOpen(false)} className="text-xs px-4 py-2 rounded border border-neutral-300 text-neutral-700 hover:bg-neutral-100 cursor-pointer">إلغاء</button>
              <button onClick={saveNew} disabled={savingNew} className="text-xs px-4 py-2 rounded bg-[#a98136] text-white hover:brightness-105 cursor-pointer flex items-center gap-1.5">
                <Save className="w-3.5 h-3.5" /> {savingNew ? 'جارٍ الحفظ...' : 'حفظ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
