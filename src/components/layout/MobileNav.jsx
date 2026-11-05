import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronRight, Search, Heart, ShoppingBag, User, Sparkles } from 'lucide-react';
import Logo from '../brand/Logo';
import { categories } from '../../data/products';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

export default function MobileNav({ isOpen, onClose }) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { wishlistCount } = useWishlist();
  const { totalCount, setIsCartOpen } = useCart();
  const { setIsSearchOpen } = useUI();

  const handleSearchClick = () => {
    onClose();
    setIsSearchOpen(true);
  };

  const handleCartClick = () => {
    onClose();
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-xs bg-cream text-charcoal h-full shadow-floating flex flex-col justify-between overflow-y-auto z-10"
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between p-6 border-b border-forest/15">
                <Logo size="sm" theme="dark" showSubline={true} />
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-charcoal/70 hover:text-forest transition-colors rounded-editorial"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Action Search Bar */}
              <div className="p-5 border-b border-forest/10">
                <button
                  type="button"
                  onClick={handleSearchClick}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white rounded-editorial border border-forest/15 text-xs text-charcoal/60 text-left font-sans"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-forest/70" />
                    Search plants, care, pots...
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider bg-forest/5 px-2 py-0.5 rounded text-forest">
                    Find
                  </span>
                </button>
              </div>

              {/* Nav Links */}
              <nav className="p-6 space-y-4 font-sans text-sm tracking-wide">
                <Link
                  to="/"
                  onClick={onClose}
                  className="block font-medium text-forest hover:text-botanical transition-colors py-1"
                >
                  Home
                </Link>

                {/* Categories Dropdown in Drawer */}
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className="w-full flex items-center justify-between font-medium text-forest hover:text-botanical transition-colors"
                  >
                    <span>Shop All Plants</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isCategoriesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isCategoriesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-3 pt-3 space-y-2.5 border-l-2 border-forest/20 mt-2"
                      >
                        <Link
                          to="/shop"
                          onClick={onClose}
                          className="block text-xs uppercase tracking-editorial text-forest font-semibold"
                        >
                          All Plants (Full Catalog)
                        </Link>
                        {categories.map((c) => (
                          <Link
                            key={c.id}
                            to={`/collections/${c.slug}`}
                            onClick={onClose}
                            className="block text-xs text-charcoal/80 hover:text-forest transition-colors"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/collections/indoor"
                  onClick={onClose}
                  className="block font-medium text-forest hover:text-botanical transition-colors py-1"
                >
                  Indoor Plants
                </Link>

                <Link
                  to="/collections/outdoor"
                  onClick={onClose}
                  className="block font-medium text-forest hover:text-botanical transition-colors py-1"
                >
                  Outdoor Plants
                </Link>

                <Link
                  to="/plant-finder"
                  onClick={onClose}
                  className="flex items-center justify-between font-medium text-forest hover:text-botanical transition-colors py-1"
                >
                  <span>Interactive Plant Finder</span>
                  <span className="text-[10px] bg-sage/30 text-forest px-2 py-0.5 rounded-pill font-mono">
                    Quiz
                  </span>
                </Link>

                <Link
                  to="/plant-care"
                  onClick={onClose}
                  className="block font-medium text-forest hover:text-botanical transition-colors py-1"
                >
                  Plant Care Journal
                </Link>

                <Link
                  to="/about"
                  onClick={onClose}
                  className="block font-medium text-forest hover:text-botanical transition-colors py-1"
                >
                  About VERDORA
                </Link>

                <Link
                  to="/contact"
                  onClick={onClose}
                  className="block font-medium text-forest hover:text-botanical transition-colors py-1"
                >
                  Contact Concierge
                </Link>

                <Link
                  to="/track-order"
                  onClick={onClose}
                  className="block font-medium text-forest hover:text-botanical transition-colors py-1"
                >
                  Track Order
                </Link>

                <Link
                  to="/account"
                  onClick={onClose}
                  className="block font-medium text-forest hover:text-botanical transition-colors py-1"
                >
                  My Account
                </Link>

                <Link
                  to="/admin"
                  onClick={onClose}
                  className="block text-xs font-mono text-botanical hover:text-forest transition-colors py-1"
                >
                  Staff Admin Portal
                </Link>

                <Link
                  to="/design-system"
                  onClick={onClose}
                  className="block text-xs font-mono text-charcoal/50 hover:text-forest transition-colors py-1"
                >
                  Design System Showcase
                </Link>
              </nav>
            </div>

            {/* Bottom Actions & Account */}
            <div className="p-6 border-t border-forest/15 bg-white/60 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/wishlist"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-editorial border border-forest/15 text-xs font-medium text-forest hover:bg-forest/5"
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist ({wishlistCount})</span>
                </Link>

                <button
                  type="button"
                  onClick={handleCartClick}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-editorial bg-forest text-cream text-xs font-medium hover:bg-forest-800"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Cart ({totalCount})</span>
                </button>
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-charcoal/60 font-sans">
                  Free Shipping on Orders Above ₹999
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

