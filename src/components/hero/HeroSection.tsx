import React, { useEffect, useRef, useState } from 'react';
import { useShowroom } from '../../context/ShowroomContext';
import { Search, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { DEALERSHIP_INFO } from '../../data/dealership';
import { WordReveal, Magnetic, EASE, useForceMotion } from '../../lib/motion';
import { OptionItem } from '../../types/vehicle';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2400&q=90';

const PRICE_OPTIONS = [
  { value: '25000000', label: 'حتى 25 مليون جنيه' },
  { value: '15000000', label: 'حتى 15 مليون جنيه' },
  { value: '10000000', label: 'حتى 10 ملايين جنيه' },
  { value: '7000000', label: 'حتى 7 ملايين جنيه' }
];

const BRAND_OPTIONS = [
  { value: 'All', label: 'جميع الماركات' },
  { value: 'Porsche', label: 'بورشه' },
  { value: 'Ferrari', label: 'فيراري' },
  { value: 'Mercedes-Benz', label: 'مرسيدس-بنز' },
  { value: 'BMW', label: 'بي إم دبليو' },
  { value: 'Audi', label: 'أودي' },
  { value: 'Aston Martin', label: 'أستون مارتن' },
  { value: 'Lamborghini', label: 'لامبورغيني' },
  { value: 'Bentley', label: 'بنتلي' },
  { value: 'Land Rover', label: 'رينج روفر' }
];

const BODY_OPTIONS = [
  { value: 'All', label: 'جميع الفئات' },
  { value: 'Supercar', label: 'سوبر كار' },
  { value: 'Coupe', label: 'كوبيه' },
  { value: 'Sedan', label: 'سيدان فاخرة' },
  { value: 'SUV', label: 'دفع رباعي' },
  { value: 'Convertible', label: 'مكشوفة' }
];

/* Custom themed dropdown — native select popups follow OS color scheme
   (dark on dark-mode systems), so we render our own list instead. */
const HeroSelect: React.FC<{
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}> = ({ id, label, value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const current = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-sm cursor-pointer transition-colors duration-200 ${
          open
            ? 'border-[#a98136] text-neutral-900'
            : 'border-neutral-200 text-neutral-700 hover:text-neutral-900 hover:border-[#a98136]/50'
        }`}
      >
        <span className="truncate">{current?.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.75}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-labelledby={id}
          className="absolute z-50 bottom-full mb-2 w-full max-h-64 overflow-y-auto rounded-lg border border-neutral-200 bg-white shadow-xl py-1"
        >
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={o.value === value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`w-full text-start px-3.5 py-2 text-sm cursor-pointer transition-colors duration-150 ${
                  o.value === value
                    ? 'text-[#a98136] font-semibold bg-[#faf6ec]'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const { navigateTo, setFilters, t, cmsList, cmsText, cmsImage, dealership, brands, vehicles } = useShowroom();
  const reduce = useForceMotion();

  // Live brand options from DB (admin → /api/brands) — falls back to CMS/static if offline
  const cmsBrandFallback = cmsList<OptionItem[]>('lists.heroBrands', BRAND_OPTIONS);
  const brandOptions = React.useMemo<OptionItem[]>(() => {
    if (brands && brands.length) {
      return [{ value: 'All', label: 'جميع الماركات' }, ...brands.map(b => ({ value: b.name, label: b.nameAr || b.name }))];
    }
    return cmsBrandFallback;
  }, [brands, cmsBrandFallback]);

  // Live body-type options from actual vehicles (distinct bodyType) — fallback to CMS/static
  const BODY_AR: Record<string, string> = { Sedan: 'سيدان فاخرة', Coupe: 'كوبيه', SUV: 'دفع رباعي', Convertible: 'مكشوفة', Supercar: 'سوبر كار', Wagon: 'واجن' };
  const cmsBodyFallback = cmsList<OptionItem[]>('lists.heroBodyTypes', BODY_OPTIONS);
  const bodyOptions = React.useMemo<OptionItem[]>(() => {
    const liveTypes = [...new Set((vehicles || []).map((v: any) => v.bodyType).filter(Boolean) as string[])];
    if (liveTypes.length) {
      return [{ value: 'All', label: 'جميع الفئات' }, ...liveTypes.map(bt => ({ value: bt, label: (BODY_AR as Record<string, string>)[bt] || bt }))];
    }
    return cmsBodyFallback;
  }, [vehicles, cmsBodyFallback]);

  // Live price options: derive thresholds from actual inventory max, else CMS/static
  const cmsPriceFallback = cmsList<OptionItem[]>('lists.heroPriceOptions', PRICE_OPTIONS);
  const priceOptions = React.useMemo<OptionItem[]>(() => {
    if (vehicles && vehicles.length) {
      const max = Math.max(...vehicles.map(v => v.price));
      const tiers = [7000000, 10000000, 15000000, 25000000].filter(th => th <= max || th === 25000000);
      // If inventory max is below smallest tier, show tiers up to max
      const labels: Record<number, string> = { 7000000: 'حتى 7 ملايين جنيه', 10000000: 'حتى 10 ملايين جنيه', 15000000: 'حتى 15 مليون جنيه', 25000000: 'حتى 25 مليون جنيه' };
      const live = tiers.map(v => ({ value: String(v), label: labels[v] }));
      // If max is e.g. 5M, show only 25M fallback
      return live.length ? live : cmsPriceFallback;
    }
    return cmsPriceFallback;
  }, [vehicles, cmsPriceFallback]);

  const heroImage = cmsImage('img.heroBackground', HERO_IMAGE);

  const [quickBrand, setQuickBrand] = useState('All');
  const [quickBodyType, setQuickBodyType] = useState('All');
  const [quickMaxPrice, setQuickMaxPrice] = useState('25000000');

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 90]), {
    stiffness: 80,
    damping: 20
  });

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      brand: quickBrand,
      bodyType: quickBodyType,
      maxPrice: Number(quickMaxPrice)
    }));
    navigateTo('cars');
  };

  return (
    <section ref={sectionRef} className="relative min-h-[92vh] lg:min-h-screen flex flex-col overflow-hidden bg-ink">
      {/* Cinematic backdrop with parallax exit */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          style={reduce ? undefined : { y: bgY, scale: bgScale }}
          className="w-full h-full"
        >
          <img
            src={heroImage}
            alt="سيارة رياضية في صالة عرض الأصدقاء موتورز"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        {/* Legibility gradients only */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7f7f8] via-[#f7f7f8]/55 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-[#f7f7f8]/85" />
      </div>

      {/* Composition */}
      <div className="relative z-10 flex-1 flex flex-col justify-end">
        <motion.div
          style={reduce ? undefined : { opacity: contentOpacity, y: contentY }}
          className="max-w-7xl mx-auto px-6 lg:px-10 w-full pb-10 lg:pb-16 pt-32"
        >
          <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="eyebrow mb-6 text-base sm:text-lg lg:text-xl"
              >
                {cmsText('home.heroFounded', `تأسست ${DEALERSHIP_INFO.foundedYear} · القاهرة`)}
              </motion.p>

            <h1 className="font-display text-5xl sm:text-7xl lg:text-[5rem] font-semibold leading-[1.28] lg:leading-[1.22] text-neutral-900">
              <WordReveal text={t.heroTitle1} delay={0.35} />
              <span className="block text-[#a98136]">
                <WordReveal text={t.heroTitle2} delay={0.55} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-5 max-w-xl text-sm sm:text-base text-neutral-700 leading-relaxed"
            >
              {t.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.2}>
                <button
                  onClick={() => navigateTo('cars')}
                  className="btn btn-gold"
                >
                  {t.heroExploreFleet}
                  <span aria-hidden className="btn-arrow inline-block">←</span>
                </button>
              </Magnetic>
              <button onClick={() => navigateTo('cars')} className="btn btn-ghost">
                {t.navCars}
              </button>
            </motion.div>
          </div>

          {/* Metadata strip — evidence, not badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="mt-12 lg:mt-16 pt-5 border-t border-neutral-900/15 flex flex-wrap items-baseline gap-x-10 gap-y-3"
          >
            {(dealership?.stats?.length ? dealership.stats : DEALERSHIP_INFO.stats).slice(0, 3).map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-mono text-sm text-neutral-900">{s.value}</span>
                <span className="text-xs text-neutral-700">{s.labelAr ?? s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Slim discovery bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="border-t border-neutral-200 bg-white/85 backdrop-blur-md"
        >
          <form
            onSubmit={handleQuickSearch}
            className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-x-8 items-center"
          >
            <label className="sr-only" htmlFor="hero-brand">{t.filterBrand}</label>
            <div className="py-4 border-e border-neutral-200 hidden lg:block">
              <HeroSelect
                id="hero-brand"
                label={t.filterBrand}
                value={quickBrand}
                options={brandOptions}
                onChange={setQuickBrand}
              />
            </div>

            <label className="sr-only" htmlFor="hero-body">{t.filterBodyType}</label>
            <div className="relative py-4 lg:border-e border-neutral-200">
              <HeroSelect
                id="hero-body"
                label={t.filterBodyType}
                value={quickBodyType}
                options={bodyOptions}
                onChange={setQuickBodyType}
              />
            </div>

            <label className="sr-only" htmlFor="hero-price">{t.filterPriceRange}</label>
            <div className="relative py-4 lg:border-s-0 hidden sm:block">
              <HeroSelect
                id="hero-price"
                label={t.filterPrice}
                value={quickMaxPrice}
                options={priceOptions}
                onChange={setQuickMaxPrice}
              />
            </div>

            <button type="submit" className="flex items-center justify-center gap-2.5 py-4 text-sm font-medium text-neutral-900 hover:text-[#a98136] transition-colors duration-200">
              <Search className="w-4 h-4" strokeWidth={1.75} />
              {cmsText('home.heroSearchBtn', 'ابحث في المعرض')}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
