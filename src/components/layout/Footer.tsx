import React from 'react';
import { useShowroom } from '../../context/ShowroomContext';
import { DEALERSHIP_INFO, DEALERSHIP_BRANDS } from '../../data/dealership';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Instagram,
  Youtube,
  Facebook
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, openWhatsApp, openTestDrive, openTradeIn, t, dealership, brands, cmsText } = useShowroom();

  const d = dealership;
  const street = d?.street ?? DEALERSHIP_INFO.address.streetAr;
  const city = d?.city ?? DEALERSHIP_INFO.address.cityAr;
  const phone = d?.phoneDirect ?? DEALERSHIP_INFO.phoneDirect;
  const email = d?.email ?? DEALERSHIP_INFO.email;
  const hours = d?.openingHours?.length ? d.openingHours : DEALERSHIP_INFO.openingHoursAr;
  const stats = d?.stats?.length ? d.stats : DEALERSHIP_INFO.stats;
  const brandList = brands && brands.length ? brands : DEALERSHIP_BRANDS;

  return (
    <footer className="bg-white text-neutral-500 border-t border-neutral-200 relative z-10">
      {/* Evidence line — replaces the old icon-pillar banner */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex flex-wrap items-baseline gap-x-10 gap-y-4 text-sm">
          {stats.map((s) => (
            <div key={(s as any).label ?? (s as any).labelAr} className="flex items-baseline gap-2.5">
              <span className="font-mono text-lg text-neutral-900">{s.value}</span>
              <span className="text-neutral-500 text-xs tracking-wide">{(s as any).labelAr ?? s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hairline" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-14">
        {/* Brand & contact */}
        <div className="lg:col-span-4 space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-[#a98136] rotate-45" aria-hidden />
            <span className="font-mono text-base tracking-[0.22em] text-neutral-900">الأصدقاء</span>
            <span className="text-xs text-neutral-500">{cmsText('header.wordmarkSub', 'موتورز · القاهرة')}</span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-500 max-w-xs">
            {t.footerAbout}
          </p>
          <ul className="space-y-2.5 text-xs">
            <li className="flex items-start gap-3">
              <MapPin className="w-3.5 h-3.5 text-neutral-600 shrink-0 mt-0.5" strokeWidth={1.75} />
              <span>{`${street}، ${city}`}</span>
            </li>
              <li className="flex items-center gap-3">
                <Phone className="w-3.5 h-3.5 text-neutral-600 shrink-0" strokeWidth={1.75} />
                <a href={`tel:${d?.phoneDirect || DEALERSHIP_INFO.phoneDirect}`} dir="ltr" className="font-mono hover:text-neutral-900 transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 text-neutral-600 shrink-0" strokeWidth={1.75} />
                <a href={`mailto:${d?.email || DEALERSHIP_INFO.email}`} dir="ltr" className="font-mono hover:text-neutral-900 transition-colors">
                  {email}
                </a>
              </li>
          </ul>
        </div>

        {/* Inventory */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs tracking-[0.15em] text-neutral-900 font-semibold">{t.footerInventoryBrands}</h4>
          <ul className="space-y-2.5 text-sm">
            <li><button onClick={() => navigateTo('cars')} className="hover:text-neutral-900 transition-colors">جميع السيارات المعروضة</button></li>
            {brandList.slice(0, 6).map((b) => (
              <li key={b.name}>
                <button onClick={() => navigateTo('cars', null, b.name)} className="hover:text-neutral-900 transition-colors">
                  {b.nameAr || b.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs tracking-[0.15em] text-neutral-900 font-semibold">{t.navServices}</h4>
          <ul className="space-y-2.5 text-sm">
            <li><button onClick={() => openTestDrive()} className="hover:text-neutral-900 transition-colors">{t.bookTestDrive}</button></li>
            <li><button onClick={() => openTradeIn()} className="hover:text-neutral-900 transition-colors">{t.heroTradeInEst}</button></li>
            <li>
              <button onClick={() => openWhatsApp()} className="text-[#128C7E] hover:brightness-110 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.75} />
                واتساب
              </button>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs tracking-[0.15em] text-neutral-900 font-semibold">{t.footerConciergeHours}</h4>
          <div className="space-y-3 text-xs">
            {hours.map((h) => (
              <div key={h.days} className="flex items-baseline justify-between border-b border-neutral-200 pb-2.5">
                <span>{h.days}</span>
                <span className="font-mono text-neutral-700" dir="rtl">{h.hours}</span>
              </div>
            ))}
            <p className="text-neutral-600 pt-1 leading-relaxed">
              الزيارات الخاصة والمواعيد المسائية بالحجز المسبق.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="hairline" />
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-7 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <p className="text-neutral-600">{t.footerRights}</p>
        <div className="flex items-center gap-6 text-neutral-600">
          <span className="hover:text-neutral-500 cursor-pointer transition-colors">{t.footerPrivacy}</span>
          <span className="hover:text-neutral-500 cursor-pointer transition-colors">{t.footerTerms}</span>
        </div>
        <div className="flex items-center gap-1">
          <a href="#instagram" className="p-2 hover:text-neutral-900 transition-colors" aria-label="Instagram">
            <Instagram className="w-4 h-4" strokeWidth={1.5} />
          </a>
          <a href="#youtube" className="p-2 hover:text-neutral-900 transition-colors" aria-label="YouTube">
            <Youtube className="w-4 h-4" strokeWidth={1.5} />
          </a>
          <a href="#facebook" className="p-2 hover:text-neutral-900 transition-colors" aria-label="Facebook">
            <Facebook className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
};
