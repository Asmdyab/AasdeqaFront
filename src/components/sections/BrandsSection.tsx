import React, { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useMotionTemplate
} from 'motion/react';
import { Reveal, useForceMotion } from '../../lib/motion';
import { useShowroom } from '../../context/ShowroomContext';
import { DEALERSHIP_BRANDS } from '../../data/dealership';
import { assetUrl } from '../../lib/api';

const COUNTRY_AR: Record<string, string> = {
  Germany: 'ألمانيا',
  Italy: 'إيطاليا',
  'United Kingdom': 'بريطانيا',
  UK: 'بريطانيا',
  Japan: 'اليابان',
  USA: 'أمريكا'
};

/* ------------------------- Grid phase: preview tiles ------------------------ */

const TILE_HEIGHTS = ['h-44', 'h-64', 'h-36', 'h-56', 'h-40', 'h-60'];

const BrandTile: React.FC<{ brand: { name: string; bgImage: string }; height: string }> = ({ brand, height }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${height} w-full`}
      transition={{ delay: 0.06, duration: 0.5 }}
    >
      <img
        src={assetUrl(brand.bgImage)}
        alt={brand.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent" />
      <span className="absolute bottom-3 start-3 font-display text-sm font-medium text-neutral-900">
        {brand.name}
      </span>
    </motion.div>
  );
};

/* ---------------------- Morph phase: expandable cards ----------------------- */

interface ExpandableBrandCardProps {
  index: number;
  brand: { name: string; bgImage: string; country: string; vehicleCount: number; tagline: string };
  isActive: boolean;
  onActivate: () => void;
}

const ExpandableBrandCard: React.FC<ExpandableBrandCardProps> = ({ index, brand, isActive, onActivate }) => {
  const { navigateTo } = useShowroom();

  return (
    <motion.div
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={() => navigateTo('cars', null, brand.name)}
      role="button"
      tabIndex={0}
      aria-label={`${brand.name} — ${brand.vehicleCount} سيارة`}
      className="relative overflow-hidden cursor-pointer h-full min-w-0 outline-none focus-visible:ring-1 focus-visible:ring-[#a98136]"
    >
      {/* Image layer */}
      <motion.img
        src={assetUrl(brand.bgImage)}
        alt=""
        loading="lazy"
        animate={{ scale: isActive ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-white via-white/45 to-transparent" />

      {/* Collapsed: vertical name */}
      <motion.span
        animate={{ opacity: isActive ? 0 : 1, y: isActive ? -8 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-6 start-1/2 -translate-x-1/2 font-display text-base font-medium text-neutral-900 whitespace-nowrap hidden lg:block"
        style={{ writingMode: 'vertical-rl' }}
      >
        {brand.name}
      </motion.span>

      {/* Expanded content */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: isActive ? 0.15 : 0 }}
        className="absolute inset-x-0 bottom-0 p-6 xl:p-8 pointer-events-none"
      >
        <p className="font-mono text-xs text-[#a98136]" dir="ltr">
          {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="mt-2 font-display text-2xl xl:text-3xl font-semibold text-neutral-900 whitespace-nowrap">
          {brand.name}
        </h3>
        <p className="mt-1 text-xs text-neutral-500">
          {COUNTRY_AR[brand.country] ?? brand.country} · {brand.vehicleCount} سيارة متوفرة
        </p>
        <p className="mt-3 text-sm text-neutral-700 leading-relaxed opacity-90 line-clamp-2">
          {brand.tagline}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[#a98136]">
          استعرض السيارات
          <span aria-hidden>←</span>
        </span>
      </motion.div>

      {/* Active hairline */}
      <motion.span
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 inset-x-0 h-px bg-[#a98136] origin-right"
      />
    </motion.div>
  );
};

/* --------------------------------- Section --------------------------------- */

export const BrandsSection: React.FC = () => {
  const { navigateTo, t, brands } = useShowroom();
  const reduce = useForceMotion();

  const displayBrands = (brands && brands.length ? brands : DEALERSHIP_BRANDS).map(b => ({
    name: b.nameAr || b.name,
    logo: b.logoUrl,
    tagline: b.tagline,
    country: b.country,
    vehicleCount: b.vehicleCount,
    featuredModel: b.featuredModel,
    bgImage: b.backgroundImageUrl || b.logoUrl
  }));
  const SHOWCASE_BRANDS = displayBrands.slice(0, 6);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'grid' | 'morph'>('grid');
  const [activeIndex, setActiveIndex] = useState(0);
  const hoveringRef = useRef(false);
  const hoveredIndexRef = useRef(0);

  const N = SHOWCASE_BRANDS.length;
  /* Morph span in progress space */
  const SPAN_START = 0.14;
  const SPAN_END = 0.92;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  /* Inertia-smoothed progress — the single source of truth for card widths */
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.5 });

  /* Continuous growth curves: each card swells around its center as you scroll.
     No discrete state → no spring retargeting → no jank while scrolling. */
  const centers = SHOWCASE_BRANDS.map((_, i) => SPAN_START + (SPAN_END - SPAN_START) * (N === 1 ? 0 : i / (N - 1)));
  const halfWidth = ((SPAN_END - SPAN_START) / Math.max(1, N - 1)) * 1.15;
  const grows = SHOWCASE_BRANDS.map((_, i) =>
    useTransform(smoothProgress, (v) => {
      if (hoveringRef.current) {
        // hold the hovered card open even if the user scrolls on top of it
        return i === hoveredIndexRef.current ? 3.2 : 1;
      }
      const d = Math.abs(v - centers[i]);
      return 1 + 2.2 * Math.max(0, 1 - d / halfWidth);
    })
  );

  const indexFromProgress = (v: number) => {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < N; i++) {
      const d = Math.abs(v - centers[i]);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    return best;
  };

  /* Header fades/blurs/lifts out as the cards take over */
  const headerOpacity = useTransform(scrollYProgress, [0.02, 0.09], [1, 0]);
  const headerBlur = useTransform(scrollYProgress, [0.02, 0.09], [0, 12]);
  const headerFilter = useMotionTemplate`blur(${headerBlur}px)`;
  const headerYRaw = useTransform(scrollYProgress, [0, 0.1], [0, 90]);
  const headerY = useSpring(headerYRaw, { stiffness: 60, damping: 20 });

  /* Per-column parallax for the preview tiles */
  const colY0 = useTransform(scrollYProgress, [0, 0.1], [110, -70]);
  const colY1 = useTransform(scrollYProgress, [0, 0.1], [60, -45]);
  const colY2 = useTransform(scrollYProgress, [0, 0.1], [140, -95]);
  const colYs = [colY0, colY1, colY2];

  useMotionValueEvent(smoothProgress, 'change', (v) => {
    /* Hysteresis: forward at 0.12, back only below 0.05 — prevents flicker */
    if (v > 0.12 && phase === 'grid') setPhase('morph');
    if (v < 0.05 && phase !== 'grid') setPhase('grid');
    /* Only the text/overlay layer is discrete — width itself is continuous */
    if (!hoveringRef.current) setActiveIndex(indexFromProgress(v));
  });

  const handleHoverCard = (i: number) => {
    if (hoveringRef.current && activeIndex === i) return;
    hoveringRef.current = true;
    hoveredIndexRef.current = i;
    setActiveIndex(i);
    grows.forEach((mv, j) => mv.set(j === i ? 3.2 : 1));
  };
  const handleLeaveCards = () => {
    hoveringRef.current = false;
    setActiveIndex(indexFromProgress(smoothProgress.get()));
  };

  /* ---------------- Mobile / reduced-motion: typographic index ---------------- */
  const MobileIndex = (
    <div>
      {displayBrands.map((brand, i) => (
        <button
          key={brand.name}
          onClick={() => navigateTo('cars', null, brand.name)}
          className={`group relative w-full flex items-center justify-between gap-6 py-5 sm:py-6 text-start border-t border-neutral-200 ${
            i === displayBrands.length - 1 ? 'border-b' : ''
          }`}
          aria-label={`${brand.name} — ${brand.vehicleCount} سيارة`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute end-[18%] top-1/2 -translate-y-1/2 w-44 h-28 overflow-hidden opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hidden lg:block z-10"
          >
            <img src={assetUrl(brand.bgImage)} alt="" loading="lazy" className="w-full h-full object-cover" />
            <span className="absolute inset-0 ring-1 ring-inset ring-neutral-900/10" />
          </span>

          <span className="flex items-baseline gap-4 min-w-0">
            <span className="font-mono text-xs text-neutral-600 w-6 shrink-0" dir="ltr">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-display text-xl sm:text-3xl text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300 truncate">
              {brand.name}
            </span>
          </span>

          <span className="flex items-center gap-4 shrink-0">
            <span className="hidden sm:inline text-xs text-neutral-500">{COUNTRY_AR[brand.country] ?? brand.country}</span>
            <span className="font-mono text-xs text-neutral-500">{brand.vehicleCount}</span>
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* ---------- Desktop: sticky scroll showcase ---------- */}
      <section className="hidden lg:block relative border-t border-neutral-200">
        <div ref={sectionRef} style={{ height: '320vh' }}>
          <div className="sticky top-0 h-screen overflow-hidden bg-ink flex items-center justify-center">
            {/* Header */}
            <Reveal className="absolute z-10 inset-x-0 top-24 text-center px-6">
              <motion.div style={{ opacity: headerOpacity, filter: headerFilter, y: headerY }}>
                <p className="eyebrow justify-center text-base sm:text-lg lg:text-xl">الماركات</p>
                <h2 className="mt-4 font-display text-4xl xl:text-6xl font-semibold text-neutral-900">
                  {t.brandsTitle}
                </h2>
                <p className="mt-3 text-sm text-neutral-500">تابع التمرير — العلامات تنتظرك</p>
              </motion.div>
            </Reveal>

            {/* Phase area — staged transitions, no shared-layout projection */}
            <AnimatePresence mode="wait">
              {phase === 'grid' ? (
                /* Rising parallax tile columns */
                <motion.div
                  key="preview-grid"
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                  className="absolute inset-0 flex items-center justify-center gap-5 px-16"
                >
                   {[0, 1, 2].map((col) => (
                    <motion.div key={col} style={{ y: colYs[col] }} className="flex flex-col gap-5 w-full max-w-xs">
                      <BrandTile brand={SHOWCASE_BRANDS[col * 2]} height={TILE_HEIGHTS[(col * 2) % TILE_HEIGHTS.length]} />
                      <BrandTile brand={SHOWCASE_BRANDS[col * 2 + 1]} height={TILE_HEIGHTS[(col * 2 + 1) % TILE_HEIGHTS.length]} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                /* Expandable brand cards */
                <motion.div
                  key="expanded-cards"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center px-10 xl:px-16 pt-10"
                >
                  <div
                    className="flex gap-3 w-full max-w-7xl"
                    style={{ height: 'min(62vh, 520px)' }}
                    role="tablist"
                    aria-label="دليل الماركات"
                    onMouseLeave={handleLeaveCards}
                  >
                    {SHOWCASE_BRANDS.map((brand, i) => (
                      <motion.div
                        key={brand.name}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          opacity: { duration: 0.4, delay: 0.05 + i * 0.06 },
                          y: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 + i * 0.06 }
                        }}
                        style={{
                          minWidth: 0,
                          flexShrink: 1,
                          flexBasis: 0,
                          flexGrow: grows[i],
                          willChange: 'flex-grow'
                        }}
                        className="relative"
                      >
                        <ExpandableBrandCard
                          index={i}
                          brand={SHOWCASE_BRANDS[i]}
                          isActive={activeIndex === i}
                          onActivate={() => handleHoverCard(i)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom hint during morph phase */}
            <AnimatePresence>
              {phase === 'morph' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.5 } }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-8 text-xs text-neutral-600"
                >
                  استمر بالتمرير للتنقل بين الماركات — أو مرر المؤشر على أي علامة
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ---------- Mobile: typographic index ---------- */}
      <section className="lg:hidden py-20 bg-ink border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <Reveal>
              <p className="eyebrow mb-4 text-base sm:text-lg lg:text-xl">الماركات</p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-neutral-900">
                {t.brandsTitle}
              </h2>
            </Reveal>
          </div>
          {MobileIndex}
        </div>
      </section>
    </>
  );
};
