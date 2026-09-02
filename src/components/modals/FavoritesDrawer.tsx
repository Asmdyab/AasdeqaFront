import React, { useEffect } from 'react';
import { PriceTag } from '../price/PriceTag';
import { AnimatePresence, motion } from 'motion/react';
import { useShowroom } from '../../context/ShowroomContext';
import { assetUrl } from '../../lib/api';
import {
  Heart,
  X,
  Trash2,
  ChevronLeft,
  Calendar
} from 'lucide-react';

export const FavoritesDrawer: React.FC = () => {
  const {
    favoritesDrawerOpen,
    setFavoritesDrawerOpen,
    favorites,
    toggleFavorite,
    clearFavorites,
    vehicles,
    navigateTo,
    openTestDrive,
    formatPrice,
    t
  } = useShowroom();

  const favoriteVehicles = favorites
    .map(id => vehicles.find(v => v.id === id))
    .filter(Boolean) as typeof vehicles;

  const totalValue = favoriteVehicles.reduce((acc, v) => acc + v.price, 0);

  useEffect(() => {
    if (!favoritesDrawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFavoritesDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [favoritesDrawerOpen, setFavoritesDrawerOpen]);

  return (
    <AnimatePresence>
      {favoritesDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setFavoritesDrawerOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer (start side: right in RTL) */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={t.garageTitle}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-s border-neutral-200 shadow-[0_30px_80px_rgba(9,9,11,0.28)] flex flex-col"
          >
            {/* Header */}
            <header className="flex items-start justify-between gap-4 p-6 border-b border-neutral-200">
              <div>
                <span className="eyebrow">
                  <Heart className="w-3.5 h-3.5 text-[#a98136] fill-[#a98136]" strokeWidth={1.75} />
                  {t.garageTitle}
                </span>
                <h3 className="font-display text-lg font-semibold text-neutral-900 mt-2">
                  {t.garageSubtitle(favoriteVehicles.length)}
                </h3>
                {favoriteVehicles.length > 0 && (
                  <p className="text-xs text-neutral-500 mt-1">
                    إجمالي قيمة المرآب:{' '}
                    <PriceTag amount={totalValue} className="font-mono text-[#a98136]" />
                  </p>
                )}
              </div>

              <button
                onClick={() => setFavoritesDrawerOpen(false)}
                aria-label="إغلاق المرآب"
                className="p-1.5 -m-1.5 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" strokeWidth={1.75} />
              </button>
            </header>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {favoriteVehicles.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="py-24 text-center space-y-5"
                >
                  <Heart className="w-8 h-8 text-neutral-600 mx-auto" strokeWidth={1.75} />
                  <div className="space-y-2">
                    <h4 className="font-display text-base font-semibold text-neutral-900">الجراج فارغ</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed max-w-xs mx-auto">
                      {t.garageEmptySub}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setFavoritesDrawerOpen(false);
                      navigateTo('cars');
                    }}
                    className="btn btn-ghost btn-sm"
                  >
                    استعرض المعرض
                    <ChevronLeft className="w-3.5 h-3.5 btn-arrow" strokeWidth={1.75} />
                  </button>
                </motion.div>
              ) : (
                <ul className="divide-y divide-neutral-200">
                  {favoriteVehicles.map((car) => (
                    <li key={car.id} className="py-4 first:pt-2 last:pb-6">
                      <div className="flex gap-4">
                        <img
                          src={assetUrl(car.images[0]?.url)}
                          alt={car.model}
                          className="w-20 h-14 object-cover border border-neutral-200 shrink-0 cursor-pointer hover:border-[#a98136]/40 transition-colors"
                          onClick={() => {
                            setFavoritesDrawerOpen(false);
                            navigateTo('car-detail', car.id);
                          }}
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <span className="block font-mono text-[10px] tracking-widest text-[#a98136]" dir="ltr">
                                {car.brand}
                              </span>
                              <button
                                onClick={() => {
                                  setFavoritesDrawerOpen(false);
                                  navigateTo('car-detail', car.id);
                                }}
                                className="block text-xs font-semibold text-neutral-900 truncate max-w-full cursor-pointer hover:text-[#a98136] transition-colors text-start"
                              >
                                {car.year} {car.model}
                              </button>
                              <span className="flex items-baseline gap-2 text-[11px] text-neutral-500 font-mono mt-1">
                                <PriceTag amount={car.price} />
                              </span>
                            </div>

                            <button
                              onClick={() => toggleFavorite(car.id)}
                              aria-label="إزالة من المحفوظات"
                              title="إزالة من المحفوظات"
                              className="text-neutral-600 hover:text-red-600 transition-colors p-1 cursor-pointer shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                            </button>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 pt-3">
                            <button
                              onClick={() => {
                                setFavoritesDrawerOpen(false);
                                navigateTo('car-detail', car.id);
                              }}
                              className="btn btn-sm btn-ghost !h-8 flex-1 text-[11px]"
                            >
                              {t.viewDetails}
                              <ChevronLeft className="w-3 h-3 btn-arrow" strokeWidth={1.75} />
                            </button>
                            <button
                              onClick={() => {
                                setFavoritesDrawerOpen(false);
                                openTestDrive(car.id);
                              }}
                              className="btn btn-sm btn-gold !h-8 flex-1 text-[11px]"
                            >
                              <Calendar className="w-3 h-3" strokeWidth={1.75} />
                              {t.bookTestDrive}
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {favoriteVehicles.length > 0 && (
              <footer className="p-6 border-t border-neutral-200">
                <div className="flex items-center justify-between text-xs">
                  <button
                    onClick={clearFavorites}
                    className="text-neutral-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {t.favoritesClear}
                  </button>
                  <button
                    onClick={() => {
                      setFavoritesDrawerOpen(false);
                      navigateTo('cars');
                    }}
                    className="text-[#a98136] hover:underline cursor-pointer"
                  >
                    استعرض كامل المعرض ←
                  </button>
                </div>
              </footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
