import React from 'react';
import { useShowroom } from '../../context/ShowroomContext';
import { PriceTag } from '../price/PriceTag';
import { OptionItem } from '../../types/vehicle';

const FALLBACK_BODY: OptionItem[] = [
  { value: 'All', label: 'الكل' },
  { value: 'Supercar', label: 'سوبر كار' },
  { value: 'Coupe', label: 'كوبيه' },
  { value: 'Sedan', label: 'سيدان' },
  { value: 'SUV', label: 'دفع رباعي' },
  { value: 'Convertible', label: 'مكشوفة' }
];

const FALLBACK_FUEL: OptionItem[] = [
  { value: 'All', label: 'الكل' },
  { value: 'Petrol', label: 'بنزين' },
  { value: 'Plug-in Hybrid', label: 'هايبرد شحن خارجي' },
  { value: 'Hybrid', label: 'هايبرد' },
  { value: 'Electric', label: 'كهربائي' }
];

interface VehicleFiltersProps {
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

export const VehicleFilters: React.FC<VehicleFiltersProps> = ({
  isMobileDrawer = false,
  onCloseMobile
}) => {
  const { filters, setFilters, resetFilters, filteredVehicles, vehicles, formatPrice, t, cmsList, brands } = useShowroom();

  const brandOptions = [
    { value: 'All', label: 'الكل' },
    ...(brands && brands.length ? brands : []).map((b) => ({ value: b.name, label: b.nameAr || b.name }))
  ];

  const BODY_AR: Record<string, string> = { Sedan: 'سيدان', Coupe: 'كوبيه', SUV: 'دفع رباعي', Convertible: 'مكشوفة', Supercar: 'سوبر كار', Wagon: 'واجن' };
  const cmsBodyFallback = cmsList<OptionItem[]>('lists.filterBodyTypes', FALLBACK_BODY);
  const bodyTypes = React.useMemo<OptionItem[]>(() => {
    const liveTypes = [...new Set((vehicles || []).map((v: any) => v.bodyType).filter(Boolean) as string[])];
    if (liveTypes.length) {
      return [{ value: 'All', label: 'الكل' }, ...liveTypes.map(bt => ({ value: bt, label: BODY_AR[bt] || bt }))];
    }
    return cmsBodyFallback;
  }, [vehicles, cmsBodyFallback]);
  const fuelTypes = cmsList<OptionItem[]>('lists.filterFuelTypes', FALLBACK_FUEL);
  const conditions = cmsList<OptionItem[]>('lists.filterConditions', [
    { value: 'All', label: 'الكل' },
    { value: 'New', label: t.conditionNew },
    { value: 'Certified Pre-Owned', label: t.conditionCertified },
    { value: 'Pre-Owned', label: t.conditionPreOwned }
  ]);

  return (
    <div className={`space-y-8 ${isMobileDrawer ? 'p-6 pb-10' : ''}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs tracking-[0.15em] text-neutral-900 font-semibold">{t.filterInventory}</h3>
        {!isMobileDrawer && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            {t.filterReset}
          </button>
        )}
      </div>

      {/* Search */}
      <fieldset>
        <legend className="field-label">{t.searchPlaceholder}</legend>
        <input
          type="search"
          placeholder="GT3 RS، كربون، V8..."
          value={filters.searchQuery}
          onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
          className="field-input"
        />
      </fieldset>

      {/* Brand list — typographic rows */}
      <fieldset>
        <legend className="field-label">{t.filterBrand}</legend>
        <ul className="-mx-1">
          {brandOptions.map((brand) => {
            const count = brand.value === 'All'
              ? vehicles.length
              : vehicles.filter((v) => v.brand.toLowerCase() === brand.value.toLowerCase()).length;
            // Always show brand even if count is 0 so newly added brands from admin appear immediately
            const isSelected = filters.brand.toLowerCase() === brand.value.toLowerCase();
            return (
              <li key={brand.value}>
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, brand: brand.value }))}
                  aria-pressed={isSelected}
                  className={`w-full flex items-center justify-between py-2 px-1 border-b border-neutral-200 text-[13px] transition-colors duration-150 ${
                    isSelected ? 'text-[#a98136]' : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <span>{brand.label}</span>
                  <span className="font-mono text-[11px] text-neutral-600" dir="ltr">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      {/* Price */}
      <fieldset className="pt-6 border-t border-neutral-200">
        <div className="flex items-baseline justify-between mb-2">
          <legend className="field-label !mb-0">{t.filterPriceRange}</legend>
          <PriceTag amount={filters.maxPrice} className="font-mono text-xs text-neutral-900" />
        </div>
        <input
          type="range"
          min={6000000}
          max={25000000}
          step={500000}
          value={Math.max(filters.maxPrice, 6000000)}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-[#a98136]"
          aria-label={t.filterPriceRange}
        />
        <div className="flex justify-between mt-1 text-[10px] font-mono text-neutral-600" dir="ltr">
          <span>6M</span>
          <span>25M+</span>
        </div>
      </fieldset>

      {/* Body type */}
      <fieldset className="pt-6 border-t border-neutral-200">
        <legend className="field-label">{t.filterBodyType}</legend>
        <FilterGroup options={bodyTypes} selected={filters.bodyType} onSelect={(v) => setFilters((p) => ({ ...p, bodyType: v }))} />
      </fieldset>

      {/* Fuel */}
      <fieldset className="pt-6 border-t border-neutral-200">
        <legend className="field-label">{t.filterFuelType}</legend>
        <FilterGroup options={fuelTypes} selected={filters.fuelType} onSelect={(v) => setFilters((p) => ({ ...p, fuelType: v }))} />
      </fieldset>

      {/* Condition */}
      <fieldset className="pt-6 border-t border-neutral-200">
        <legend className="field-label">{t.filterCondition}</legend>
        <FilterGroup options={conditions} selected={filters.condition} onSelect={(v) => setFilters((p) => ({ ...p, condition: v }))} />
      </fieldset>

      {/* Mobile apply */}
      {isMobileDrawer && onCloseMobile && (
        <div className="pt-4 sticky bottom-0 bg-surface -mx-6 px-6 pb-2 pt-4">
          <button type="button" onClick={onCloseMobile} className="btn btn-gold w-full">
            عرض {filteredVehicles.length} سيارة
          </button>
        </div>
      )}
    </div>
  );
};

const FilterGroup: React.FC<{
  options: { value: string; label: string }[];
  selected: string;
  onSelect: (value: string) => void;
}> = ({ options, selected, onSelect }) => (
  <div className="flex flex-wrap gap-x-4 gap-y-2">
    {options.map((o) => {
      const isSelected = selected === o.value;
      return (
        <button
          key={o.value}
          type="button"
          aria-pressed={isSelected}
          onClick={() => onSelect(o.value)}
          className={`text-[13px] transition-colors duration-150 ${
            isSelected ? 'text-[#a98136]' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          {o.label}
        </button>
      );
    })}
  </div>
);
