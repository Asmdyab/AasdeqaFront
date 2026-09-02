import React, { useState } from 'react';
import { useShowroom } from '../context/ShowroomContext';
import { VehicleCard } from '../components/vehicles/VehicleCard';
import { VehicleFilters } from '../components/vehicles/VehicleFilters';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FALLBACK_COLLECTIONS = [
  { id: 'all', label: 'الكل', bodyType: undefined as string | undefined, maxPrice: undefined as number | undefined },
  { id: 'performance', label: 'أداء', bodyType: 'Supercar', maxPrice: undefined },
  { id: 'suv', label: 'دفع رباعي', bodyType: 'SUV', maxPrice: undefined },
  { id: 'sedan', label: 'سيدان فاخرة', bodyType: 'Sedan', maxPrice: undefined },
  { id: 'convertible', label: 'مكشوفة', bodyType: 'Convertible', maxPrice: undefined },
  { id: 'value', label: 'تحت 10 مليون', bodyType: undefined, maxPrice: 10000000 }
];

export const CarsPage: React.FC = () => {
  const {
    filteredVehicles,
    vehicles,
    filters,
    setFilters,
    resetFilters,
    t,
    cmsList
  } = useShowroom();

  const collections = cmsList<typeof FALLBACK_COLLECTIONS>('lists.carsCollections', FALLBACK_COLLECTIONS);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const activeCollection = collections.find((c) => {
    if (!c.bodyType && !c.maxPrice) return filters.bodyType === 'All' && filters.maxPrice >= 25000000;
    if (c.bodyType && c.maxPrice) return filters.bodyType === c.bodyType && filters.maxPrice === c.maxPrice;
    if (c.bodyType) return filters.bodyType === c.bodyType;
    return filters.maxPrice === c.maxPrice;
  })?.id ?? null;

  const activeFilterCount = [
    filters.brand !== 'All',
    filters.fuelType !== 'All',
    filters.transmission !== 'All',
    filters.condition !== 'All',
    Boolean(filters.searchQuery),
    !activeCollection
  ].filter(Boolean).length;

  const applyCollection = (id: string) => {
    const col = collections.find((c) => c.id === id);
    if (!col) return;
    resetFilters();
    if (col.bodyType || col.maxPrice) {
      setFilters((prev) => ({
        ...prev,
        bodyType: col.bodyType ?? 'All',
        maxPrice: col.maxPrice ?? 25000000
      }));
    }
  };

  const removeFilter = (key: string, value: string | number) => {
    setFilters((p) => ({ ...p, [key]: key === 'searchQuery' ? '' : value }));
  };

  return (
    <div className="min-h-screen bg-ink pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="pb-8 border-b border-neutral-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-5xl font-semibold text-neutral-900">
                المعرض
              </h1>
              <p className="text-sm text-neutral-500 mt-2 font-mono" dir="ltr">
                {filteredVehicles.length} / {vehicles.length}
                <span className="font-body ms-2" dir="rtl">سيارة متاحة</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden btn btn-ghost btn-sm"
              >
                <SlidersHorizontal className="w-4 h-4" strokeWidth={1.75} />
                الفلاتر{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
              </button>

              <div className="relative flex items-center gap-2 text-xs">
                <span className="text-neutral-500 hidden sm:inline">{t.sort}:</span>
                <div className="relative">
                  <select
                    aria-label={t.sort}
                    value={filters.sortBy}
                    onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as never }))}
                    className="field-input appearance-none cursor-pointer ps-3 pe-8 py-2 text-xs w-40"
                  >
                    <option value="recommended">{t.sortFeatured}</option>
                    <option value="price-asc">{t.sortPriceAsc}</option>
                    <option value="price-desc">{t.sortPriceDesc}</option>
                    <option value="year-desc">{t.sortYearDesc}</option>
                    <option value="horsepower-desc">{t.sortHpDesc}</option>
                    <option value="mileage-asc">{t.sortMileageAsc}</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute end-2 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.75} />
                </div>
              </div>
            </div>
          </div>

          {/* Curated collections */}
          <nav className="flex items-center gap-6 mt-7 overflow-x-auto pb-1 -mb-1" aria-label="مجموعات مختارة">
            {collections.map((c) => {
              const isActive = activeCollection === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => applyCollection(c.id)}
                  aria-pressed={isActive}
                  className={`relative pb-2 whitespace-nowrap text-[13px] transition-colors duration-200 ${
                    isActive ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  {c.label}
                  {isActive && (
                    <motion.span
                      layoutId="collectionIndicator"
                      className="absolute bottom-0 inset-x-0 h-px bg-[#a98136]"
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Active filter chips */}
          {(filters.brand !== 'All' || filters.fuelType !== 'All' || filters.transmission !== 'All' || filters.condition !== 'All' || filters.searchQuery) && (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-xs">
              {filters.brand !== 'All' && (
                <Chip label={`${t.filterBrand}: ${filters.brand}`} onRemove={() => removeFilter('brand', 'All')} />
              )}
              {filters.fuelType !== 'All' && (
                <Chip label={`${t.filterFuelType}: ${filters.fuelType}`} onRemove={() => removeFilter('fuelType', 'All')} />
              )}
              {filters.transmission !== 'All' && (
                <Chip label={`${t.filterTransmission}: ${filters.transmission}`} onRemove={() => removeFilter('transmission', 'All')} />
              )}
              {filters.condition !== 'All' && (
                <Chip label={`${t.filterCondition}: ${filters.condition}`} onRemove={() => removeFilter('condition', 'All')} />
              )}
              {filters.searchQuery && (
                <Chip label={`بحث: "${filters.searchQuery}"`} onRemove={() => removeFilter('searchQuery', '')} />
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                {t.filterReset}
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 items-start">
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <VehicleFilters />
          </div>

          <div className="lg:col-span-9">
            {filteredVehicles.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-lg text-neutral-900">لا توجد سيارة مطابقة لاختيارك الحالي.</p>
                <p className="mt-2 text-sm text-neutral-500">جرّب توسيع نطاق السعر أو إزالة بعض الفلاتر.</p>
                <button onClick={resetFilters} className="btn btn-gold btn-sm mt-8 mx-auto">
                  <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} />
                  {t.filterReset}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-14">
                {filteredVehicles.map((car) => (
                  <VehicleCard key={car.id} vehicle={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/80"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 w-screen max-w-md bg-surface border-e border-neutral-300 shadow-2xl overflow-y-auto"
              role="dialog"
              aria-label={t.filterInventory}
            >
              <div className="p-5 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-surface z-10">
                <h3 className="text-sm font-semibold text-neutral-900">{t.filterInventory}</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                  aria-label="إغلاق الفلاتر"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <VehicleFilters isMobileDrawer onCloseMobile={() => setMobileFilterOpen(false)} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Chip: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-2 text-neutral-700">
    {label}
    <button
      type="button"
      onClick={onRemove}
      className="p-0.5 text-neutral-600 hover:text-neutral-900 transition-colors"
      aria-label={`إزالة فلتر ${label}`}
    >
      <X className="w-3 h-3" />
    </button>
  </span>
);
