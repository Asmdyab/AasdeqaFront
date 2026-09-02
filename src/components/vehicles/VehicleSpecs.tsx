import React from 'react';
import { Vehicle } from '../../types/vehicle';

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

export const VehicleSpecs: React.FC<VehicleSpecsProps> = ({ vehicle }) => {
  const specs: { label: string; value: React.ReactNode }[] = [
    { label: 'المحرك', value: vehicle.engine },
    { label: 'القوة والعزم', value: `${vehicle.horsepower} حصان · ${vehicle.torque}` },
    { label: 'التسارع 0–100 كم/س', value: `${vehicle.acceleration0to100} ثانية` },
    { label: 'السرعة القصوى', value: `${vehicle.topSpeed} كم/س` },
    { label: 'ناقل الحركة', value: vehicle.transmission },
    { label: 'نظام الدفع', value: vehicle.drivetrain },
    { label: 'الوقود والاستهلاك', value: `${vehicle.fuelType} · ${vehicle.fuelEconomy}` },
    {
      label: 'الممشى',
      value: vehicle.mileage === 0 ? 'جديدة — 0 كم' : `${vehicle.mileage.toLocaleString('en-US')} كم`
    },
    {
      label: 'الألوان',
      value: (
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border border-neutral-300 inline-block" style={{ backgroundColor: vehicle.exteriorColorHex }} />
          {vehicle.exteriorColor}
        </span>
      )
    },
    {
      label: 'المقصورة الداخلية',
      value: (
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border border-neutral-300 inline-block" style={{ backgroundColor: vehicle.interiorColorHex }} />
          {vehicle.interiorColor}
        </span>
      )
    },
    { label: 'الفحص المعتمد', value: `${vehicle.inspectionScore}/100` },
    { label: 'الضمان', value: vehicle.warranty }
  ];

  return (
    <div className="space-y-14">
      {/* Technical table */}
      <section>
        <h2 className="eyebrow mb-6">المواصفات الفنية</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
          {specs.map((s, i) => (
            <div key={s.label} className={`flex items-baseline justify-between gap-4 py-3.5 border-b border-neutral-200 ${i >= specs.length - (specs.length % 2 === 1 ? 1 : 2) ? '' : ''}`}>
              <dt className="text-xs text-neutral-500 shrink-0">{s.label}</dt>
              <dd className="text-sm text-neutral-700 text-end">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Highlights */}
      <section>
        <h2 className="eyebrow mb-6">أبرز التجهيزات</h2>
        <ul className="space-y-0">
          {vehicle.keyHighlights.map((highlight) => (
            <li key={highlight} className="py-3.5 border-b border-neutral-200 text-sm text-neutral-700 leading-relaxed">
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      {/* Features */}
      <section>
        <h2 className="eyebrow mb-6">الخيارات والتجهيزات</h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {vehicle.features.map((feature) => (
            <li key={feature} className="text-xs text-neutral-500 flex items-center gap-2">
              <span className="w-1 h-1 bg-[#a98136]/70 rotate-45 shrink-0" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
