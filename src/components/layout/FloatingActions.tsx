import React, { useState, useEffect } from 'react';
import { useShowroom } from '../../context/ShowroomContext';
import { MessageSquare, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingActions: React.FC = () => {
  const {
    openWhatsApp,
    t
  } = useShowroom();

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [waHovered, setWaHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Bottom-start floating hub */}
      <div className="fixed bottom-6 start-6 z-40 flex flex-col gap-3">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="w-10 h-10 bg-white/95 border border-neutral-200 shadow-sm text-neutral-500 hover:text-neutral-900 hover:border-neutral-400/30 flex items-center justify-center transition-colors"
              aria-label="العودة لأعلى الصفحة"
            >
              <ArrowUp className="w-4 h-4" strokeWidth={1.75} />
            </motion.button>
          )}
        </AnimatePresence>

        <div
          className="relative flex items-center"
          onMouseEnter={() => setWaHovered(true)}
          onMouseLeave={() => setWaHovered(false)}
        >
          <AnimatePresence>
            {waHovered && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18 }}
                className="absolute start-13 px-3.5 py-2 bg-white border border-neutral-300 text-xs whitespace-nowrap"
              >
                تحدث مع مستشار المبيعات
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => openWhatsApp()}
            className="w-12 h-12 rounded-full bg-[#1ebe5d] text-white flex items-center justify-center hover:bg-[#25D366] transition-colors duration-200 shadow-lg shadow-black/50"
            aria-label={t.whatsappConcierge}
          >
            <MessageSquare className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </>
  );
};
