import React from 'react';
import { Vehicle } from '../../types/vehicle';
import { useShowroom } from '../../context/ShowroomContext';
import { Heart, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { PriceTag } from '../price/PriceTag';
import { assetUrl } from '../../lib/api';

interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle: rawVehicle }) => {
  const {
    navigateTo,
    toggleFavorite,
    isFavorite,
    getLocalizedVehicle,
    formatPrice,
    t
  } = useShowroom();

  const vehicle = getLocalizedVehicle(rawVehicle);
  const favorited = isFavorite(vehicle.id);
  const isNew = vehicle.condition === 'New';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hovered"
      className="group relative flex flex-col border-b border-neutral-200 pb-6"
    >
      {/* Image — the card's identity */}
      <div
        className="relative aspect-[16/10] overflow-hidden bg-black cursor-pointer"
        onClick={() => navigateTo('car-detail', vehicle.id)}
      >
        <motion.img
          src={assetUrl(vehicle.images[0]?.url)}
          alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}`}
          loading="lazy"
          variants={{ hovered: { scale: 1.05 } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover object-center"
        />
        {/* Availability marker */}
        <span className={`absolute top-4 start-4 flex items-center gap-1.5 text-[11px] font-medium tracking-wide px-2 py-0.5 ${
          isNew ? 'bg-[#0a0b0e]/85 text-emerald-600' : 'bg-[#0a0b0e]/85 text-white'
        }`}>
          <span className={`w-1 h-1 rounded-full ${isNew ? 'bg-emerald-400' : 'bg-neutral-300'}`} />
          {isNew ? t.conditionNew : t.conditionCertified}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(vehicle.id);
          }}
          aria-label={favorited ? 'إزالة من المفضلة' : 'أضف إلى المفضلة'}
          aria-pressed={favorited}
          className="absolute top-3 end-3 p-2 bg-[#0a0b0e]/70 hover:bg-[#0a0b0e]/90 transition-colors duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${favorited ? 'fill-[#a98136] text-[#a98136] scale-110' : 'text-white'}`}
            strokeWidth={1.75}
          />
        </button>
      </div>

      {/* Typographic body — no boxes */}
      <div className="pt-5 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className="font-display text-lg font-medium text-neutral-900 leading-snug hover:text-[#a98136] transition-colors cursor-pointer"
            onClick={() => navigateTo('car-detail', vehicle.id)}
          >
            {vehicle.brand} {vehicle.model}
          </h3>
          <PriceTag amount={vehicle.price} className="font-mono text-sm text-neutral-900 whitespace-nowrap" />
        </div>

        <p className="mt-1 text-xs text-neutral-500">
          {vehicle.trim} · {vehicle.year} ·{' '}
          {vehicle.mileage === 0 ? 'مسافة تسليم' : `${vehicle.mileage.toLocaleString('en-US')} كم`} ·{' '}
          {vehicle.horsepower} حصان
        </p>

        {vehicle.originalPrice && (
          <p className="mt-1.5 text-xs flex items-center gap-2">
            <PriceTag amount={vehicle.originalPrice} className="text-neutral-600 line-through" />
            <span className="text-[#a98136]">سعر مخفض</span>
          </p>
        )}

        <button
          onClick={() => navigateTo('car-detail', vehicle.id)}
          className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm text-neutral-700 hover:text-neutral-900 transition-colors self-start"
          aria-label={`${t.viewVehicleDetails}: ${vehicle.brand} ${vehicle.model}`}
        >
          {t.viewVehicleDetails}
          <motion.span
            variants={{ hovered: { x: -4 } }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="inline-flex"
          >
            <ChevronLeft className="w-4 h-4 text-[#a98136]" strokeWidth={1.75} />
          </motion.span>
        </button>
      </div>
    </motion.article>
  );
};
