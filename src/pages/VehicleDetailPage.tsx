import React, { useState } from 'react';
import { useShowroom } from '../context/ShowroomContext';
import { VehicleGallery } from '../components/vehicles/VehicleGallery';
import { VehicleSpecs } from '../components/vehicles/VehicleSpecs';
import { VehicleCard } from '../components/vehicles/VehicleCard';
import { PriceTag } from '../components/price/PriceTag';
import {
  Heart,
  Layers,
  Share2,
  MessageSquare,
  Calendar,
  Eye,
  CheckCircle2,
  ChevronLeft,
  Check
} from 'lucide-react';

export const VehicleDetailPage: React.FC = () => {
  const {
    selectedVehicle,
    vehicles,
    navigateTo,
    openWhatsApp,
    openTestDrive,
    openPurchase,
    openInspection,
    toggleFavorite,
    isFavorite,
    toggleCompare,
    isComparing,
    formatPrice,
    t
  } = useShowroom();

  const [copied, setCopied] = useState(false);

  const vehicle = selectedVehicle || vehicles[0];

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-ink pt-40 text-center text-neutral-900">
        <p>لم يتم العثور على السيارة.</p>
        <button onClick={() => navigateTo('cars')} className="btn btn-gold btn-sm mt-6">
          العودة إلى المعرض
        </button>
      </div>
    );
  }

  const isFav = isFavorite(vehicle.id);
  const isComp = isComparing(vehicle.id);

  const similarVehicles = vehicles
    .filter(v => v.id !== vehicle.id && (v.brand === vehicle.brand || v.bodyType === vehicle.bodyType))
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePurchaseInquiry = () => {
    openWhatsApp(vehicle,
      `مرحباً، أود بدء إجراءات شراء السيارة ${vehicle.year} ${vehicle.brand} ${vehicle.model} (${vehicle.trim}) المعروضة بسعر ${formatPrice(vehicle.price)} — رقم المخزون ${vehicle.stockNumber}. أرجو تزويدي بتفاصيل العقد وموعد التسليم.`
    );
  };

  return (
    <div className="min-h-screen bg-ink pt-16 pb-28 lg:pb-24">
      {/* Gallery first — the car is the page */}
      <div className="-mt-16">
        <VehicleGallery vehicle={vehicle} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Breadcrumb + tools */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6">
          <nav aria-label="مسار التنقل" className="flex items-center gap-1.5 text-xs text-neutral-500">
            <button onClick={() => navigateTo('cars')} className="hover:text-neutral-900 transition-colors">
              المعرض
            </button>
            <ChevronLeft className="w-3 h-3 text-neutral-800" />
            <button onClick={() => navigateTo('cars', null, vehicle.brand)} className="hover:text-neutral-900 transition-colors">
              {vehicle.brand}
            </button>
            <ChevronLeft className="w-3 h-3 text-neutral-800" />
            <span className="text-neutral-700">{vehicle.model}</span>
          </nav>

          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
              aria-label="نسخ رابط السيارة"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" strokeWidth={1.75} />}
              <span className="hidden sm:inline">{copied ? 'تم النسخ' : 'مشاركة'}</span>
            </button>
            <button
              type="button"
              onClick={() => toggleCompare(vehicle.id)}
              aria-pressed={isComp}
              className={`flex items-center gap-1.5 transition-colors ${isComp ? 'text-[#a98136]' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              <Layers className="w-4 h-4" strokeWidth={1.75} />
              <span className="hidden sm:inline">{isComp ? 'قيد المقارنة' : t.compare}</span>
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(vehicle.id)}
              aria-pressed={isFav}
              className={`flex items-center gap-1.5 transition-colors ${isFav ? 'text-[#a98136]' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              <Heart className={`w-4 h-4 transition-transform duration-200 ${isFav ? 'fill-[#a98136]' : ''}`} strokeWidth={1.75} />
              <span className="hidden sm:inline">{isFav ? 'محفوظة' : 'حفظ'}</span>
            </button>
          </div>
        </div>

        {/* Identity block — pure typography */}
        <header className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-4 text-base sm:text-lg lg:text-xl">
              {vehicle.condition === 'New' ? t.conditionNew : t.conditionCertified} في صالة العرض
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-semibold text-neutral-900 leading-tight">
              {vehicle.year} {vehicle.brand} {vehicle.model}
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              {vehicle.trim} · فحص {vehicle.inspectionScore}/100 · مخزون{' '}
              <span className="font-mono" dir="ltr">#{vehicle.stockNumber}</span>
            </p>
          </div>

          {/* Price */}
          <div className="lg:col-span-4 lg:text-end">
            <p className="text-xs tracking-wide text-neutral-500 mb-1">{t.priceCash}</p>
            <PriceTag
              amount={vehicle.price}
              className="font-mono text-3xl sm:text-4xl text-neutral-900"
              currencyClassName="text-xl sm:text-2xl"
            />
            {vehicle.originalPrice && (
              <PriceTag
                amount={vehicle.originalPrice}
                className="font-mono text-sm text-neutral-600 line-through mt-1"
              />
            )}
            <p className="mt-2 flex items-center justify-start lg:justify-end gap-1.5 text-xs text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.75} />
              السعر النهائي — بدون رسوم خفية
            </p>
          </div>
        </header>

        {/* Main split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 items-start">
          {/* Left: details flow */}
          <div className="lg:col-span-7 space-y-14">
            {/* Key specs strip */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 py-7 border-y border-neutral-200" dir="ltr">
              {[
                { l: t.specHorsepower, v: `${vehicle.horsepower}` },
                { l: 'تسارع 0–100', v: `${vehicle.acceleration0to100}s` },
                { l: t.specTopSpeed, v: `${vehicle.topSpeed}` },
                { l: t.specMileage, v: vehicle.mileage === 0 ? 'جديدة' : `${(vehicle.mileage / 1000).toFixed(1)}k` }
              ].map((s) => (
                <div key={s.l}>
                  <dt className="text-xs text-neutral-500">{s.l}</dt>
                  <dd className="font-mono text-xl text-neutral-900 mt-1">{s.v}</dd>
                </div>
              ))}
            </dl>

            {/* Description */}
            <section>
              <h2 className="eyebrow mb-5">ملاحظات القيّمين</h2>
              <p className="text-sm sm:text-base text-neutral-700 leading-loose">
                {vehicle.description}
              </p>
              <p className="mt-4 font-display text-lg text-neutral-500 leading-relaxed">{vehicle.tagline}</p>
            </section>

            {/* Full specs */}
            <VehicleSpecs vehicle={vehicle} />
          </div>

          {/* Right: sticky acquisition console */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">
            <div className="border border-neutral-200 bg-surface p-7">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <span className="text-xs tracking-[0.15em] text-neutral-500">إتمام الشراء</span>
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-600">
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  جاهزة للتسليم
                </span>
              </div>

              <dl className="py-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-neutral-500">ناقل الحركة</dt>
                  <dd className="text-neutral-700">{vehicle.transmission}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-neutral-500">الوقود</dt>
                  <dd className="text-neutral-700">{vehicle.fuelType}</dd>
                </div>
              </dl>

              <div className="space-y-2.5">
                <button type="button" onClick={() => (openPurchase as any)(vehicle.id)} className="btn btn-gold w-full">
                  <Calendar className="w-4 h-4" strokeWidth={1.75} />
                  طلب شراء أو تأجير
                </button>
                <button type="button" onClick={() => (openInspection as any)(vehicle.id)} className="btn w-full bg-white border border-neutral-300 text-neutral-800 hover:border-[#a98136]/50">
                  <Eye className="w-4 h-4" strokeWidth={1.75} />
                  طلب معاينة
                </button>
                <button type="button" onClick={() => openWhatsApp(vehicle)} className="btn w-full !bg-transparent border border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366]/10" style={{ height: '3rem' }}>
                  <MessageSquare className="w-4 h-4" strokeWidth={1.75} />
                  تواصل عبر واتساب
                </button>
              </div>

              <ul className="mt-6 pt-5 border-t border-neutral-200 space-y-2.5 text-xs text-neutral-500">
                {[
                  'ضمان شامل ممتد',
                  'تقرير الفحص الكامل متاح',
                  'نقل مغلق مؤمن لكامل المحافظات'
                ].map((g) => (
                  <li key={g} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-600 shrink-0" strokeWidth={1.75} />
                    {g}
                  </li>
                ))}
              </ul>

              <p className="mt-6 pt-5 border-t border-neutral-200 text-xs text-neutral-500 leading-relaxed">
                لديك سؤال قبل الحجز؟ فريق المبيعات يرد عادة خلال دقائق في ساعات العمل.
              </p>
            </div>
          </aside>
        </div>

        {/* Similar vehicles */}
        {similarVehicles.length > 0 && (
          <section className="mt-20 pt-14 border-t border-neutral-200">
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-neutral-900">
                سيارات مشابهة
              </h2>
              <button onClick={() => navigateTo('cars')} className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors pb-0.5 border-b border-neutral-300 hover:border-[#a98136] transition-all">
                كل المعرض
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
              {similarVehicles.map((sim) => (
                <VehicleCard key={sim.id} vehicle={sim} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile conversion bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 flex items-center gap-3">
        <div className="shrink-0">
          <p className="font-mono text-sm text-neutral-900 leading-none"><PriceTag amount={vehicle.price} /></p>
          <p className="text-[10px] text-neutral-500 mt-1">سعر نهائي</p>
        </div>
        <div className="flex-1 flex items-center gap-2 justify-end">
          <button
            onClick={() => openWhatsApp(vehicle)}
            aria-label="تواصل واتساب"
            className="h-11 px-4 border border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366]/10 transition-colors flex items-center gap-1.5 text-xs"
          >
            <MessageSquare className="w-4 h-4" strokeWidth={1.75} />
            واتساب
          </button>
          <button onClick={() => (openPurchase as any)(vehicle.id)} className="btn btn-gold btn-sm !h-11">
            شراء / تأجير
          </button>
          <button onClick={() => (openInspection as any)(vehicle.id)} className="btn btn-ghost btn-sm !h-11 border border-neutral-300">
            معاينة
          </button>
        </div>
      </div>
    </div>
  );
};
