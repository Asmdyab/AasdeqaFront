import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import {
  VehicleRowDto,
  VehicleInput,
  VehicleImageInput,
  createVehicle,
  updateVehicleFull,
  fetchBrands,
  BrandDto
} from '../adminApi';
import { ImagePicker, Field, inputCls } from './common';

const CONDITIONS = [
  { value: 1, label: 'جديد' },
  { value: 2, label: 'مجددة معتمدة' },
  { value: 3, label: 'مستعملة' }
];
const FUELS = [
  { value: 1, label: 'بنزين' },
  { value: 2, label: 'ديزل' },
  { value: 3, label: 'هايبرد' },
  { value: 4, label: 'هايبرد شحن خارجي' },
  { value: 5, label: 'كهربائي' }
];
const TRANSMISSIONS = [
  { value: 1, label: 'أوتوماتيك' },
  { value: 2, label: 'ثنائي القابض' },
  { value: 3, label: 'يدوي' }
];
const DRIVETRAINS = [
  { value: 1, label: 'دفع رباعي AWD' },
  { value: 2, label: 'دفع خلفي RWD' },
  { value: 3, label: 'دفع أمامي FWD' },
  { value: 4, label: '4WD' }
];
const BODIES = [
  { value: 1, label: 'سيدان' },
  { value: 2, label: 'كوبيه' },
  { value: 3, label: 'SUV' },
  { value: 4, label: 'مكشوفة' },
  { value: 5, label: 'سوبر كار' },
  { value: 6, label: 'واجن' }
];

const selectCls = inputCls + ' bg-white';

function blankVehicle(): VehicleInput {
  return {
    brand: '', model: '', trim: '', year: new Date().getFullYear(),
    price: 0, originalPrice: null, currency: 'جم', monthlyEstimate: 0,
    mileageKm: 0, condition: 1, fuelType: 1, transmission: 1, drivetrain: 2, bodyType: 1,
    engine: '', horsepower: 0, torque: '', acceleration0To100: 0, topSpeedKmh: 0,
    fuelEconomy: '', exteriorColor: '', exteriorColorHex: '#000000', interiorColor: '', interiorColorHex: '#111111',
    doors: 2, seats: 4, vin: '', stockNumber: '',
    isFeatured: false, isAvailable: true, isSpecialOffer: false,
    taglineAr: '', descriptionAr: '', keyHighlightsAr: [], featuresAr: [],
    inspectionScore: 0, previousOwners: 0, warranty: '',
    images: []
  };
}

function fromRow(v: VehicleRowDto): VehicleInput {
  return {
    brand: v.brand, model: v.model, trim: v.trim, year: v.year,
    price: v.price, originalPrice: v.originalPrice ?? null, currency: v.currency, monthlyEstimate: v.monthlyEstimate,
    mileageKm: v.mileageKm, condition: v.condition, fuelType: v.fuelType, transmission: v.transmission, drivetrain: v.drivetrain, bodyType: v.bodyType,
    engine: v.engine, horsepower: v.horsepower, torque: v.torque, acceleration0To100: v.acceleration0To100, topSpeedKmh: v.topSpeedKmh,
    fuelEconomy: v.fuelEconomy, exteriorColor: v.exteriorColor, exteriorColorHex: v.exteriorColorHex, interiorColor: v.interiorColor, interiorColorHex: v.interiorColorHex,
    doors: v.doors, seats: v.seats, vin: v.vin, stockNumber: v.stockNumber,
    isFeatured: v.isFeatured, isAvailable: v.isAvailable, isSpecialOffer: v.isSpecialOffer,
    taglineAr: v.taglineAr, descriptionAr: v.descriptionAr, keyHighlightsAr: v.keyHighlightsAr || [], featuresAr: v.featuresAr || [],
    inspectionScore: v.inspectionScore, previousOwners: v.previousOwners, warranty: v.warranty,
    images: (v.images || []).map((im) => ({ url: im.url, caption: im.caption, category: null, sortOrder: im.sortOrder }))
  };
}

export const VehicleEditor: React.FC<{
  vehicle: VehicleRowDto | null;
  existingModels: string[];
  onClose: () => void;
  onSaved: () => void;
}> = ({ vehicle, existingModels, onClose, onSaved }) => {
  const isNew = !vehicle;
  const [form, setForm] = useState<VehicleInput>(vehicle ? fromRow(vehicle) : blankVehicle());
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [customModel, setCustomModel] = useState(false);
  const [brands, setBrands] = useState<BrandDto[]>([]);
  const [brandsLoading, setBrandsLoading] = useState(true);

  useEffect(() => {
    setForm(vehicle ? fromRow(vehicle) : blankVehicle());
    setCustomModel(!!vehicle && !existingModels.includes(vehicle.model));
  }, [vehicle, existingModels]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const bs = await fetchBrands();
        if (!cancelled) setBrands(bs);
      } catch { /* ignore */ } finally {
        if (!cancelled) setBrandsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const set = (patch: Partial<VehicleInput>) => setForm((f) => ({ ...f, ...patch }));
  const num = (v: string) => Number(v);
  const lines = (arr?: string[]) => (arr || []).join('\n');

  const save = async () => {
    setBusy(true);
    setErr(null);
    const payload: VehicleInput = {
      ...form,
      keyHighlightsAr: (form.keyHighlightsAr || []).map((s) => s.trim()).filter(Boolean),
      featuresAr: (form.featuresAr || []).map((s) => s.trim()).filter(Boolean),
      images: (form.images || []).map((im, i) => ({ url: im.url, caption: im.caption, category: null, sortOrder: i }))
    };
    try {
      if (isNew) await createVehicle(payload);
      else await updateVehicleFull(vehicle!.id, payload);
      onSaved();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'فشل الحفظ');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/40 flex items-start justify-center p-4 overflow-y-auto" dir="rtl">
      <div className="bg-white w-full max-w-3xl my-8 shadow-xl rounded-lg">
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-3 sticky top-0 bg-white z-10">
          <h2 className="font-display text-lg font-semibold text-neutral-900">
            {isNew ? 'إضافة سيارة جديدة' : `تعديل: ${form.year} ${form.brand} ${form.model}`}
          </h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900 cursor-pointer p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
          {err && <p className="text-xs text-red-600">{err}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="الماركة">
              <select className={selectCls} value={form.brand} onChange={(e) => set({ brand: e.target.value })} disabled={brandsLoading}>
                <option value="" disabled>{brandsLoading ? 'جارٍ تحميل الماركات...' : 'اختر الماركة'}</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.name}>{b.nameAr ? `${b.nameAr} (${b.name})` : b.name}</option>
                ))}
                {/* Keep current value if not in brands list (legacy data) */}
                {form.brand && !brands.some(b => b.name === form.brand) && (
                  <option value={form.brand}>{form.brand} (غير موجودة في الماركات)</option>
                )}
              </select>
              {!brandsLoading && brands.length === 0 && (
                <p className="text-[11px] text-amber-600 mt-1">لا توجد ماركات — أضف ماركة أولاً من تبويب الماركات</p>
              )}
            </Field>
            <Field label="الموديل">
              {customModel ? (
                <div className="flex gap-2">
                  <input className={inputCls} dir="ltr" value={form.model} placeholder="اكتب الموديل" onChange={(e) => set({ model: e.target.value })} />
                  <button type="button" onClick={() => setCustomModel(false)} className="text-xs px-2.5 py-1.5 rounded bg-neutral-100 hover:bg-neutral-200 cursor-pointer whitespace-nowrap">قائمة</button>
                </div>
              ) : (
                <select
                  className={selectCls}
                  value={existingModels.includes(form.model) ? form.model : form.model ? form.model : ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '__new__') { setCustomModel(true); set({ model: '' }); }
                    else set({ model: val });
                  }}
                >
                  <option value="" disabled>اختر الموديل</option>
                  {existingModels.map((m) => <option key={m} value={m}>{m}</option>)}
                  {form.model && !existingModels.includes(form.model) && (
                    <option value={form.model}>{form.model} (مخفي/غير في القائمة)</option>
                  )}
                  <option value="__new__">+ موديل جديد</option>
                </select>
              )}
            </Field>
            <Field label="الفئة"><input className={inputCls} value={form.trim} onChange={(e) => set({ trim: e.target.value })} /></Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="سنة"><input type="number" className={inputCls} dir="ltr" value={form.year} onChange={(e) => set({ year: num(e.target.value) })} /></Field>
            <Field label="الحالة">
              <select className={selectCls} value={form.condition} onChange={(e) => set({ condition: num(e.target.value) })}>
                {CONDITIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
            <Field label="نوع الهيكل">
              <select className={selectCls} value={form.bodyType} onChange={(e) => set({ bodyType: num(e.target.value) })}>
                {BODIES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="الوقود">
              <select className={selectCls} value={form.fuelType} onChange={(e) => set({ fuelType: num(e.target.value) })}>
                {FUELS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
            <Field label="ناقل الحركة">
              <select className={selectCls} value={form.transmission} onChange={(e) => set({ transmission: num(e.target.value) })}>
                {TRANSMISSIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
            <Field label="الدفع">
              <select className={selectCls} value={form.drivetrain} onChange={(e) => set({ drivetrain: num(e.target.value) })}>
                {DRIVETRAINS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="السعر"><input type="number" className={inputCls} dir="ltr" value={form.price} onChange={(e) => set({ price: num(e.target.value) })} /></Field>
            <Field label="السعر الأصلي"><input type="number" className={inputCls} dir="ltr" value={form.originalPrice ?? ''} onChange={(e) => set({ originalPrice: e.target.value ? num(e.target.value) : null })} /></Field>
            <Field label="العملة"><input className={inputCls} dir="ltr" value={form.currency} onChange={(e) => set({ currency: e.target.value })} /></Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Field label="المسافة (كم)"><input type="number" className={inputCls} dir="ltr" value={form.mileageKm} onChange={(e) => set({ mileageKm: num(e.target.value) })} /></Field>
            <Field label="القوة (حصان)"><input type="number" className={inputCls} dir="ltr" value={form.horsepower} onChange={(e) => set({ horsepower: num(e.target.value) })} /></Field>
            <Field label="عدد الأبواب"><input type="number" className={inputCls} dir="ltr" value={form.doors} onChange={(e) => set({ doors: num(e.target.value) })} /></Field>
            <Field label="المقاعد"><input type="number" className={inputCls} dir="ltr" value={form.seats} onChange={(e) => set({ seats: num(e.target.value) })} /></Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="المحرك"><input className={inputCls} value={form.engine} onChange={(e) => set({ engine: e.target.value })} /></Field>
            <Field label="العزم"><input className={inputCls} value={form.torque} onChange={(e) => set({ torque: e.target.value })} /></Field>
            <Field label="استهلاك الوقود"><input className={inputCls} value={form.fuelEconomy} onChange={(e) => set({ fuelEconomy: e.target.value })} /></Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Field label="تسارع 0-100"><input type="number" className={inputCls} dir="ltr" value={form.acceleration0To100} onChange={(e) => set({ acceleration0To100: num(e.target.value) })} /></Field>
            <Field label="السرعة القصوى"><input type="number" className={inputCls} dir="ltr" value={form.topSpeedKmh} onChange={(e) => set({ topSpeedKmh: num(e.target.value) })} /></Field>
            <Field label="درجة الفحص"><input type="number" className={inputCls} dir="ltr" value={form.inspectionScore} onChange={(e) => set({ inspectionScore: num(e.target.value) })} /></Field>
            <Field label="المالكون السابقون"><input type="number" className={inputCls} dir="ltr" value={form.previousOwners} onChange={(e) => set({ previousOwners: num(e.target.value) })} /></Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Field label="اللون الخارجي"><input className={inputCls} value={form.exteriorColor} onChange={(e) => set({ exteriorColor: e.target.value })} /></Field>
            <Field label="رمز لون الخارجي"><input className={inputCls} dir="ltr" value={form.exteriorColorHex} onChange={(e) => set({ exteriorColorHex: e.target.value })} /></Field>
            <Field label="اللون الداخلي"><input className={inputCls} value={form.interiorColor} onChange={(e) => set({ interiorColor: e.target.value })} /></Field>
            <Field label="رمز لون الداخلي"><input className={inputCls} dir="ltr" value={form.interiorColorHex} onChange={(e) => set({ interiorColorHex: e.target.value })} /></Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="رقم الهيكل (VIN)"><input className={inputCls} dir="ltr" value={form.vin} onChange={(e) => set({ vin: e.target.value })} /></Field>
            <Field label="رقم المخزون"><input className={inputCls} dir="ltr" value={form.stockNumber} onChange={(e) => set({ stockNumber: e.target.value })} /></Field>
            <Field label="الضمان"><input className={inputCls} value={form.warranty} onChange={(e) => set({ warranty: e.target.value })} /></Field>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-xs text-neutral-700"><input type="checkbox" checked={form.isFeatured} onChange={(e) => set({ isFeatured: e.target.checked })} /> مميزة</label>
            <label className="flex items-center gap-2 text-xs text-neutral-700"><input type="checkbox" checked={form.isAvailable} onChange={(e) => set({ isAvailable: e.target.checked })} /> متاحة</label>
            <label className="flex items-center gap-2 text-xs text-neutral-700"><input type="checkbox" checked={form.isSpecialOffer} onChange={(e) => set({ isSpecialOffer: e.target.checked })} /> عرض خاص</label>
          </div>

          <Field label="الوصف المختصر (عربي)"><input className={inputCls} value={form.taglineAr} onChange={(e) => set({ taglineAr: e.target.value })} /></Field>
          <Field label="الوصف (عربي)"><textarea className={inputCls} rows={3} value={form.descriptionAr} onChange={(e) => set({ descriptionAr: e.target.value })} /></Field>
          <Field label="أبرز النقاط (سطر لكل نقطة)"><textarea className={inputCls} rows={3} value={lines(form.keyHighlightsAr)} onChange={(e) => set({ keyHighlightsAr: e.target.value.split('\n') })} /></Field>
          <Field label="المميزات (سطر لكل ميزة)"><textarea className={inputCls} rows={3} value={lines(form.featuresAr)} onChange={(e) => set({ featuresAr: e.target.value.split('\n') })} /></Field>

          {/* Images */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-500">الصور</span>
              <button type="button" onClick={() => set({ images: [...(form.images || []), { url: '', caption: '', category: null, sortOrder: (form.images?.length || 0) }] })}
                className="text-xs px-2.5 py-1.5 rounded bg-neutral-100 hover:bg-neutral-200 cursor-pointer flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" /> إضافة صورة
              </button>
            </div>
            <div className="space-y-3">
              {(form.images || []).map((im, i) => (
                <div key={i} className="flex items-start gap-3 border border-neutral-200 p-2 rounded">
                  <div className="shrink-0 min-w-[120px]">
                    <ImagePicker url={im.url} onPicked={(u) => set({ images: (form.images || []).map((x, j) => j === i ? { ...x, url: u } : x) })} label="رفع" />
                  </div>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input className={inputCls} dir="ltr" placeholder="رابط الصورة" value={im.url} onChange={(e) => set({ images: (form.images || []).map((x, j) => j === i ? { ...x, url: e.target.value } : x) })} />
                    <input className={inputCls} placeholder="تعليق" value={im.caption || ''} onChange={(e) => set({ images: (form.images || []).map((x, j) => j === i ? { ...x, caption: e.target.value } : x) })} />
                  </div>
                  <button type="button" onClick={() => set({ images: (form.images || []).filter((_, j) => j !== i) })} className="text-neutral-600 hover:text-red-600 cursor-pointer p-1"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-neutral-200 px-5 py-3 sticky bottom-0 bg-white">
          <button onClick={onClose} className="text-xs px-4 py-2 rounded border border-neutral-300 text-neutral-700 hover:bg-neutral-100 cursor-pointer">إلغاء</button>
          <button onClick={save} disabled={busy} className="text-xs px-4 py-2 rounded bg-[#a98136] text-white hover:brightness-105 cursor-pointer flex items-center gap-1.5">
            <Save className="w-3.5 h-3.5" /> {busy ? 'جارٍ الحفظ...' : 'حفظ'}
          </button>
        </div>
      </div>
    </div>
  );
};
