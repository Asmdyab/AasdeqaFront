import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useShowroom } from '../../context/ShowroomContext';
import { PriceTag } from '../price/PriceTag';
import { assetUrl } from '../../lib/api';
import { Search, X, ChevronLeft } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen, vehicles, navigateTo, formatPrice, t } = useShowroom();
  const [query, setQuery] = useState('');

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === 'Escape' && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  useEffect(() => {
    if (!searchModalOpen) setQuery('');
  }, [searchModalOpen]);

  const searchResults = query.trim()
    ? vehicles.filter(v => {
        const text = `${v.brand} ${v.model} ${v.trim} ${v.engine} ${v.year} ${v.fuelType} ${v.stockNumber}`.toLowerCase();
        return text.includes(query.toLowerCase());
      })
    : vehicles.slice(0, 4);

  return (
    <AnimatePresence>
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSearchModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={t.searchModalTitle}
            className="relative z-10 w-full max-w-lg bg-white border border-neutral-200 shadow-[0_30px_80px_rgba(9,9,11,0.28)]"
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-200">
              <Search className="w-4 h-4 text-[#a98136] shrink-0" strokeWidth={1.75} />
              <input
                autoFocus
                type="text"
                placeholder={t.searchModalPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none min-w-0"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-neutral-500 hover:text-neutral-900 text-[11px] cursor-pointer transition-colors shrink-0"
                >
                  مسح
                </button>
              )}
              <button
                onClick={() => setSearchModalOpen(false)}
                aria-label="إغلاق البحث"
                className="p-1 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[55vh] overflow-y-auto">
              <div className="eyebrow px-5 pt-4 pb-2">
                {query.trim()
                  ? `نتائج البحث (${searchResults.length})`
                  : t.searchPopularSearches}
              </div>

              {searchResults.length === 0 ? (
                <p className="px-5 py-12 text-center text-xs text-neutral-500 leading-relaxed">
                  {t.searchNoResults}. جرّب البحث عن «بورشه» أو «GT3» أو «كوبيه».
                </p>
              ) : (
                <ul className="divide-y divide-neutral-200 pb-2">
                  {searchResults.map((car) => (
                    <li key={car.id}>
                      <button
                        onClick={() => {
                          setSearchModalOpen(false);
                          navigateTo('car-detail', car.id);
                        }}
                        className="w-full flex items-center justify-between gap-3 px-5 py-3 hover:bg-neutral-100 transition-colors duration-150 cursor-pointer group text-start"
                      >
                        <span className="flex items-center gap-3.5 min-w-0">
                          <img
                            src={assetUrl(car.images[0]?.url)}
                            alt={car.model}
                            className="w-14 h-10 object-cover border border-neutral-200 shrink-0"
                          />
                          <span className="min-w-0">
                            <span className="block text-xs font-semibold text-neutral-900 group-hover:text-[#a98136] transition-colors truncate">
                              {car.year} {car.brand} {car.model}
                            </span>
                            <span className="block text-[11px] text-neutral-500 font-mono truncate" dir="ltr">
                              {car.engine} · {car.horsepower} HP · {car.transmission}
                            </span>
                          </span>
                        </span>

                        <span className="text-end shrink-0 flex items-center gap-2">
                          <span>
                            <PriceTag amount={car.price} className="block text-xs font-semibold text-neutral-900 font-mono" />
                          </span>
                          <ChevronLeft
                            className="w-3.5 h-3.5 text-neutral-600 group-hover:text-[#a98136] transition-colors"
                            strokeWidth={1.75}
                          />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-neutral-200 text-[11px] text-neutral-500">
              <span>اضغط ESC للإغلاق</span>
              <button
                onClick={() => {
                  setSearchModalOpen(false);
                  navigateTo('cars');
                }}
                className="text-[#a98136] hover:underline cursor-pointer"
              >
                تصفح الأسطول الكامل ←
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
