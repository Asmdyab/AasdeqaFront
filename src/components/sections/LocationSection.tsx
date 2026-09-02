import React from 'react';
import { Reveal, WordReveal } from '../../lib/motion';
import { DEALERSHIP_INFO } from '../../data/dealership';
import { useShowroom } from '../../context/ShowroomContext';
import { MapPin, ChevronLeft } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { openTestDrive, t, dealership, cmsText } = useShowroom();

  const street = dealership?.street ?? DEALERSHIP_INFO.address.streetAr;
  const city = dealership?.city ?? DEALERSHIP_INFO.address.cityAr;
  const hours = dealership?.openingHours?.length ? dealership.openingHours : DEALERSHIP_INFO.openingHoursAr;
  const phoneDirect = dealership?.phoneDirect ?? DEALERSHIP_INFO.phoneDirect;
  const lat = dealership?.lat ?? DEALERSHIP_INFO.address.mapCoordinates.lat;
  const lng = dealership?.lng ?? DEALERSHIP_INFO.address.mapCoordinates.lng;

  const handleDirections = () => {
    const query = encodeURIComponent(`${street}, ${city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="bg-ink border-t border-neutral-200">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Details */}
        <div className="flex items-center order-2 lg:order-1">
          <div className="px-6 lg:px-14 py-16 lg:py-24 w-full max-w-xl">
            <Reveal><p className="eyebrow mb-4 text-base sm:text-lg lg:text-xl">الزيارة</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-snug">
              <WordReveal text={t.locationTitle} />
            </h2>
            </Reveal>

            <address className="mt-8 not-italic space-y-6 text-sm">
              <div>
                <p className="text-xs tracking-wide text-neutral-500 mb-1.5">{t.locationAddress}</p>
                <p className="text-neutral-900">{street}</p>
                <p className="text-neutral-500 mt-0.5">{city}</p>
              </div>

              <div>
                <p className="text-xs tracking-wide text-neutral-500 mb-1.5">{t.locationHours}</p>
                <ul className="space-y-1.5">
                  {hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-6 border-b border-neutral-200 pb-1.5">
                      <span className="text-neutral-700">{h.days}</span>
                      <span className="text-neutral-500 font-mono text-xs pt-0.5" dir="rtl">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs tracking-wide text-neutral-500 mb-1.5">{t.locationPhone}</p>
                <a
                  href={`tel:${dealership?.phoneDirect || DEALERSHIP_INFO.phoneDirect}`}
                  dir="ltr"
                  className="font-mono text-neutral-900 hover:text-[#a98136] transition-colors inline-block"
                >
                  {phoneDirect}
                </a>
              </div>
            </address>

            <div className="mt-9 flex flex-wrap gap-3">
              <button onClick={handleDirections} className="btn btn-ghost btn-sm">
                <MapPin className="w-4 h-4" strokeWidth={1.75} />
                {cmsText('home.locationDirectionsBtn', t.locationGetDirections)}
              </button>
              <button onClick={() => openTestDrive()} className="btn btn-gold btn-sm">
                {t.heroBookDrive}
              </button>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="relative min-h-[380px] lg:min-h-[560px] order-1 lg:order-2 bg-[#e5e7ea] overflow-hidden">
          <iframe
            title={`موقع ${t.brandName} على الخريطة`}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=31.44%2C30.01%2C31.50%2C30.05&layer=mapnik&marker=${lat}%2C${lng}`}
            className="absolute inset-0 w-full h-full opacity-95"
            loading="lazy"
          />
          <button
            onClick={handleDirections}
            className="absolute bottom-6 end-6 flex items-center gap-1.5 px-4 py-2.5 bg-white/95 border border-neutral-200 shadow-sm text-xs text-neutral-900 hover:border-[#a98136]/60 transition-colors"
          >
            فتح في خرائط جوجل
            <ChevronLeft className="w-3.5 h-3.5 text-[#a98136]" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
};
