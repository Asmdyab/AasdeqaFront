import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ShowroomProvider, useShowroom } from './context/ShowroomContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingActions } from './components/layout/FloatingActions';
import { PurchaseModal } from './components/modals/PurchaseModal';
import { InspectionModal } from './components/modals/InspectionModal';
import { SearchModal } from './components/modals/SearchModal';
import { FavoritesDrawer } from './components/modals/FavoritesDrawer';
import { useForceMotion } from './lib/motion';

import { HomePage } from './pages/HomePage';
import { CarsPage } from './pages/CarsPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { BrandsPage } from './pages/BrandsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AboutPage } from './pages/AboutPage';
import { LocationPage } from './pages/LocationPage';
import { ContactPage } from './pages/ContactPage';
import { PWAUpdatePrompt } from './components/PWAUpdatePrompt';

const AppContent: React.FC = () => {
  const { currentView } = useShowroom();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'cars':
        return <CarsPage />;
      case 'car-detail':
        return <VehicleDetailPage />;
      case 'brands':
        return <BrandsPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'about':
        return <AboutPage />;
      case 'location':
        return <LocationPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-ink text-neutral-800 flex flex-col selection:bg-[#a98136] selection:text-black">
      <Header />

      <main className="flex-1">
        {renderCurrentView()}
      </main>

      <Footer />
      <FloatingActions />
      <PurchaseModal />
      <InspectionModal />
      <SearchModal />
      <FavoritesDrawer />
      <PWAUpdatePrompt />
    </div>
  );
};

/** Gold scroll-progress bar — RTL origin (right edge) */
const ScrollProgress: React.FC = () => {
  const reduce = useForceMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  if (reduce) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-50 h-[2px] pointer-events-none" aria-hidden>
      <motion.div
        className="h-full w-full bg-[#a98136]"
        style={{ scaleX, transformOrigin: 'right' }}
      />
    </div>
  );
};

export default function App() {
  return (
    <ShowroomProvider>
      <ScrollProgress />
      <AppContent />
    </ShowroomProvider>
  );
}
