import React from 'react';
import { useForceMotion } from '../../lib/motion';
import { motion } from 'motion/react';
import { useShowroom } from '../../context/ShowroomContext';

const FALLBACK_BRANDS = [
  'بورشه',
  'فيراري',
  'لامبورغيني',
  'مرسيدس-بنز',
  'بي إم دبليو',
  'أستون مارتن',
  'بنتلي',
  'أودي',
  'رينج روفر',
  'مايزراتي'
];

/** Infinite brand-name marquee with masked edges */
export const BrandMarquee: React.FC = () => {
  const reduce = useForceMotion();
  const { brands } = useShowroom();
  const names = (brands && brands.length ? brands.map(b => b.nameAr) : FALLBACK_BRANDS);
  const items = [...names, ...names];

  return (
    <div className="bg-surface border-b border-neutral-200 py-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      {reduce ? (
        <p className="text-center text-sm tracking-wide text-neutral-500">
          {names.join('  ·  ')}
        </p>
      ) : (
        <motion.div
          className="flex w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
        >
          {items.map((brand, i) => (
            <span key={`${brand}-${i}`} className="flex items-center shrink-0">
              <span className="font-display text-lg sm:text-xl font-medium text-neutral-600 hover:text-[#a98136] transition-colors duration-300 cursor-default px-8 sm:px-12">
                {brand}
              </span>
              <span className="w-1 h-1 bg-[#a98136]/40 rotate-45 shrink-0" aria-hidden />
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
};
