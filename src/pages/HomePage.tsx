import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { useShowroom } from '../context/ShowroomContext';
import { VehicleCard } from '../components/vehicles/VehicleCard';
import { Reveal, WordReveal } from '../lib/motion';

const AllCarsSection: React.FC = () => {
  const { vehicles, t } = useShowroom();
  return (
    <section className="py-20 lg:py-28 bg-ink">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <Reveal><p className="eyebrow mb-4 text-base sm:text-lg lg:text-xl">المعرض الكامل</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-tight">
              <WordReveal text={t.featuredTitle} />
            </h2>
            </Reveal>
            <p className="mt-3 text-sm text-neutral-500">{vehicles.length} سيارة متاحة</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {vehicles.map((car) => (
            <VehicleCard key={car.id} vehicle={car} />
          ))}
        </div>
        {vehicles.length === 0 && (
          <p className="text-center text-sm text-neutral-500 py-16">لا توجد سيارات حالياً</p>
        )}
      </div>
    </section>
  );
};

export const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <AllCarsSection />
    </div>
  );
};
