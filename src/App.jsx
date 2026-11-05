import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UIProvider } from './context/UIContext';
import CartDrawer from './components/layout/CartDrawer';
import QuickViewModal from './components/product/QuickViewModal';
import SearchModal from './components/search/SearchModal';
import Toast from './components/ui/Toast';
import PortfolioBadge from './components/common/PortfolioBadge';
import ScrollToTop from './components/common/ScrollToTop';
import Preloader from './components/common/Preloader';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import PlantFinder from './pages/PlantFinder';
import PlantCare from './pages/PlantCare';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import TrackOrder from './pages/TrackOrder';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import DesignSystemReview from './pages/DesignSystemReview';
import PortfolioCaseStudy from './pages/PortfolioCaseStudy';

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* 1. Homepage */}
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />

        {/* 2. Shop & Collections */}
        <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/collections/:category" element={<PageTransition><CategoryPage /></PageTransition>} />
        <Route path="/product/:slug" element={<PageTransition><ProductDetail /></PageTransition>} />

        {/* 3. Dedicated Cart & Wishlist */}
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />

        {/* 4. Checkout & Order Tracking */}
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/track-order" element={<PageTransition><TrackOrder /></PageTransition>} />

        {/* 5. Plant Discovery & Care Guides */}
        <Route path="/plant-finder" element={<PageTransition><PlantFinder /></PageTransition>} />
        <Route path="/plant-care" element={<PageTransition><PlantCare /></PageTransition>} />

        {/* 6. Brand & Concierge */}
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />

        {/* 7. User Account & Authentication */}
        <Route path="/account" element={<PageTransition><Account /></PageTransition>} />

        {/* 8. Protected Admin Dashboard */}
        <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />

        {/* 9. Design System Review */}
        <Route path="/design-system" element={<PageTransition><DesignSystemReview /></PageTransition>} />

        {/* 10. Developer Portfolio Case Study & Presentation */}
        <Route path="/portfolio" element={<PageTransition><PortfolioCaseStudy /></PageTransition>} />
        <Route path="/case-study" element={<PageTransition><PortfolioCaseStudy /></PageTransition>} />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <PageTransition>
              <div className="min-h-screen bg-offwhite flex flex-col items-center justify-center p-6 text-center">
                <span className="text-xs uppercase font-mono tracking-widest text-botanical mb-2">
                  VERDORA Botanical Maison
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-forest mb-3">
                  Page Not Found
                </h2>
                <p className="font-sans text-sm text-charcoal/70 max-w-md mb-8 leading-relaxed">
                  The botanical coordinates you requested are unavailable or have been relocated in our nursery catalog.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/"
                    className="bg-forest text-cream px-6 py-3 rounded-editorial text-xs uppercase tracking-editorial font-medium hover:bg-forest-800 transition-colors shadow-subtle"
                  >
                    Return to Homepage
                  </Link>
                  <Link
                    to="/shop"
                    className="border border-forest/30 text-forest px-6 py-3 rounded-editorial text-xs uppercase tracking-editorial font-medium hover:bg-forest/5 transition-colors"
                  >
                    Browse Living Catalog
                  </Link>
                </div>
              </div>
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [showPreloader, setShowPreloader] = useState(() => {
    // Show preloader on first session visit
    return !sessionStorage.getItem('verdora_intro_played');
  });

  useEffect(() => {
    const replayHandler = () => {
      setShowPreloader(true);
    };
    window.addEventListener('verdora_replay_intro', replayHandler);
    return () => window.removeEventListener('verdora_replay_intro', replayHandler);
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('verdora_intro_played', 'true');
    setShowPreloader(false);
  };

  return (
    <AuthProvider>
      <UIProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
              {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
              <ScrollToTop />
              <AnimatedRoutes />

              {/* Global Overlays & Modals */}
              <CartDrawer />
              <QuickViewModal />
              <SearchModal />
              <Toast />
              <PortfolioBadge />
            </Router>
          </CartProvider>
        </WishlistProvider>
      </UIProvider>
    </AuthProvider>
  );
}
