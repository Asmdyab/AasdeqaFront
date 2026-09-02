import React from 'react';
import { Reveal, WordReveal } from '../../lib/motion';
import { useShowroom } from '../../context/ShowroomContext';
import { VehicleCard } from '../vehicles/VehicleCard';

export const FeaturedVehicles: React.FC = () => {
  const { vehicles, navigateTo, t, cmsText } = useShowroom();
  const featured = vehicles.filter(v => v.isFeatured).slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-ink">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header — quiet label, strong title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <Reveal><p className="eyebrow mb-4 text-base sm:text-lg lg:text-xl">وصلت حديثاً</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-tight">
              <WordReveal text={t.featuredTitle} />
            </h2>
            </Reveal>
          </div>

          <button
            onClick={() => navigateTo('cars')}
            className="inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900 transition-colors self-start md:self-auto pb-1 border-b border-neutral-300 hover:border-[#a98136] transition-colors"
          >
            {t.viewAllFleet(vehicles.length)}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {featured.map((car) => (
            <VehicleCard key={car.id} vehicle={car} />
          ))}
        </div>

        {/* Quiet sourcing line instead of gradient callout card */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-neutral-500 max-w-xl leading-relaxed">
            {cmsText(
              'home.featuredSourcingLine',
              'تبحث عن طراز معين أو تجهيز نادر؟ فريق التوريد يتولى البحث والتأمين نيابة عنك.'
            )}
          </p>
          <button onClick={() => navigateTo('cars')} className="btn btn-ghost btn-sm shrink-0">
            {cmsText('home.featuredRequestBtn', 'اطلب سيارة بالطلب')}
          </button>
        </div>
      </div>
    </section>
  );
};
