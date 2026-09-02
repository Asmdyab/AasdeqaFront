import React, { useState, useEffect } from 'react';
import { useShowroom, AppView } from '../../context/ShowroomContext';
import { DEALERSHIP_INFO } from '../../data/dealership';
import {
  Search,
  Heart,
  Menu,
  X,
  Phone,
  MessageSquare,
  Calendar,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const {
    currentView,
    navigateTo,
    favorites,
    setSearchModalOpen,
    setFavoritesDrawerOpen,
    openTestDrive,
    openWhatsApp,
    t,
    isRTL,
    cmsText,
    dealership
  } = useShowroom();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // City shown in wordmark — live from admin (dealership.city), not hardcoded "القاهرة"
  const city = (() => {
    const raw = dealership?.city || cmsText('dealership.city', 'القاهرة الجديدة، مصر');
    const short = raw.split(/[،,]/)[0]?.trim();
    return short || 'القاهرة';
  })();

  const navItems: { label: string; view: AppView }[] = [
    { label: t.navHome, view: 'home' },
    { label: t.navCars, view: 'cars' },
    { label: t.navBrands, view: 'brands' },
    { label: 'الآراء', view: 'reviews' },
    { label: t.navAbout, view: 'about' },
    { label: 'الموقع', view: 'location' },
    { label: t.navContact, view: 'contact' },
  ];

  const handleNavClick = (view: AppView) => {
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled || currentView !== 'home'
            ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200 shadow-[0_1px_12px_rgba(9,9,11,0.05)]'
            : 'bg-gradient-to-b from-white/85 via-white/40 to-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
              aria-label={t.navHome}
            >
              <span className="w-2 h-2 bg-[#a98136] rotate-45 shrink-0" aria-hidden />
              <span className="flex items-baseline gap-1.5">
                <span className="font-mono text-lg tracking-[0.22em] text-neutral-900 font-medium">
                  الأصدقاء
                </span>
                <span className="hidden sm:inline text-xs tracking-wide text-neutral-700">
                  موتورز · {city}
                </span>
              </span>
            </button>

            {/* Desktop Navigation — 7 items, wrap on smaller lg */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="التنقل الرئيسي">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  aria-current={currentView === item.view ? 'page' : undefined}
                  className={`relative py-1.5 text-[13px] tracking-wide transition-colors duration-200 ${
                    currentView === item.view
                      ? 'text-neutral-900'
                      : 'text-neutral-700 hover:text-[#a98136]'
                  }`}
                >
                  {item.label}
                  {currentView === item.view && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 inset-x-0 h-px bg-[#a98136]"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2.5 text-neutral-700 hover:text-[#a98136] transition-colors"
                title={t.searchTooltip}
                aria-label={t.searchTooltip}
              >
                <Search className="w-4 h-4" strokeWidth={1.75} />
              </button>

              <button
                onClick={() => setFavoritesDrawerOpen(true)}
                className="relative p-2.5 text-neutral-700 hover:text-[#a98136] transition-colors"
                title={t.garageTitle}
                aria-label={`${t.garageTitle} (${favorites.length})`}
              >
                <Heart
                  className={`w-4 h-4 ${favorites.length > 0 ? 'fill-[#a98136] text-[#a98136]' : ''}`}
                  strokeWidth={1.75}
                />
                {favorites.length > 0 && (
                  <span className="absolute top-1 end-1 w-3.5 h-3.5 bg-[#a98136] text-black text-[9px] font-bold flex items-center justify-center rounded-full">
                    {favorites.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => openWhatsApp()}
                className="hidden sm:flex p-2.5 text-neutral-500 hover:text-[#25D366] transition-colors"
                title={t.whatsappConcierge}
                aria-label={t.whatsappConcierge}
              >
                <MessageSquare className="w-4 h-4" strokeWidth={1.75} />
              </button>

              <button
                onClick={() => openTestDrive()}
                className="btn btn-gold btn-sm hidden md:inline-flex ms-2"
              >
                <Calendar className="w-3.5 h-3.5" strokeWidth={1.75} />
                طلب معاينة
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 text-neutral-700 hover:text-neutral-900 transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="فتح القائمة"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 pt-20 px-6 pb-8 bg-white flex flex-col justify-between lg:hidden overflow-y-auto"
          >
            <nav className="py-6" aria-label="قائمة الجوال">
              <ul>
                {navItems.map((item) => (
                  <li key={item.view}>
                    <button
                      onClick={() => handleNavClick(item.view)}
                      className={`w-full flex items-center justify-between py-4 border-b border-neutral-200 text-start transition-colors ${
                        currentView === item.view ? 'text-[#a98136]' : 'text-neutral-700'
                      }`}
                    >
                      <span className="text-base">{item.label}</span>
                      <ChevronLeft className={`w-4 h-4 ${isRTL ? '' : 'rotate-180'} opacity-50`} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-6 mt-6 text-sm text-neutral-500">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setFavoritesDrawerOpen(true);
                  }}
                  className="flex items-center gap-2"
                >
                  <Heart className="w-4 h-4" strokeWidth={1.75} />
                  {t.garageTitle} ({favorites.length})
                </button>
              </div>
            </nav>

            {/* Mobile conversion actions */}
            <div className="space-y-3 pb-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openTestDrive();
                }}
                className="btn btn-gold w-full"
              >
                <Calendar className="w-4 h-4" strokeWidth={1.75} />
                طلب معاينة
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openWhatsApp();
                  }}
                  className="btn btn-ghost text-[#25D366] border-[#25D366]/40 text-xs"
                >
                  <MessageSquare className="w-4 h-4" strokeWidth={1.75} />
                  واتساب
                </button>
                <a
                  href={`tel:${dealership?.phoneDirect || DEALERSHIP_INFO.phoneDirect}`}
                  className="btn btn-ghost text-xs"
                >
                  <Phone className="w-4 h-4" strokeWidth={1.75} />
                  اتصل بنا
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
