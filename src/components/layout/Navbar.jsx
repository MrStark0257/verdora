import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, ChevronDown } from 'lucide-react';
import Logo from '../brand/Logo';
import MegaMenu from './MegaMenu';
import MobileNav from './MobileNav';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { totalCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { setIsSearchOpen, isMobileNavOpen, setIsMobileNavOpen } = useUI();
  const location = useLocation();

  // On homepage, navbar starts transparent over the hero, then turns solid cream on scroll.
  // On other pages or when scrolled, it maintains solid cream with subtle border.
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHomePage && !isScrolled && !isMegaMenuOpen;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent text-forest border-b border-forest/10 backdrop-blur-[2px]'
            : 'bg-cream/95 text-forest border-b border-forest/15 shadow-subtle backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between relative overflow-hidden">
          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              className="p-1.5 -ml-1 text-forest hover:text-botanical transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Left Brand Logo */}
          <div className="flex items-center shrink-0">
            <div className="hidden sm:block">
              <Logo
                size="md"
                theme="dark"
                showSubline={true}
                className="transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
            <div className="sm:hidden">
              <Logo
                size="sm"
                theme="dark"
                showSubline={false}
                className="transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Center Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-sans text-xs tracking-widest uppercase font-medium">
            <Link
              to="/"
              className="text-forest hover:text-botanical transition-colors py-2 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-botanical transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Shop with Dropdown Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 text-forest hover:text-botanical transition-colors py-2 uppercase tracking-widest text-xs font-medium group"
              >
                <span>Shop</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMegaMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            <Link
              to="/collections/indoor"
              className="text-forest hover:text-botanical transition-colors py-2 relative group"
            >
              Indoor Plants
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-botanical transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              to="/collections/outdoor"
              className="text-forest hover:text-botanical transition-colors py-2 relative group"
            >
              Outdoor Plants
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-botanical transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              to="/plant-care"
              className="text-forest hover:text-botanical transition-colors py-2 relative group"
            >
              Plant Care
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-botanical transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              to="/about"
              className="text-forest hover:text-botanical transition-colors py-2 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-botanical transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Right Action Icons: Search, Account, Wishlist, Cart */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-forest hover:text-botanical hover:bg-forest/5 rounded-editorial transition-colors"
              aria-label="Search catalog"
              title="Search (Ctrl + K)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Link */}
            <Link
              to="/account"
              className="p-1.5 text-forest hover:text-botanical hover:bg-forest/5 rounded-editorial transition-colors hidden sm:inline-flex"
              aria-label="User Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Icon with Dynamic Badge */}
            <Link
              to="/wishlist"
              className="p-1.5 text-forest hover:text-botanical hover:bg-forest/5 rounded-editorial transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 transition-transform hover:scale-110 active:scale-90" />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    key={`wishlist-${wishlistCount}`}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className="absolute top-0.5 right-0.5 w-4 h-4 bg-earth text-cream text-[10px] font-sans font-semibold rounded-full flex items-center justify-center shadow-subtle"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Shopping Cart Drawer Trigger with Badge */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 text-forest hover:text-botanical hover:bg-forest/5 rounded-editorial transition-colors relative flex items-center gap-1.5 group"
              aria-label="Open Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110 active:scale-90" />
                <AnimatePresence>
                  {totalCount > 0 && (
                    <motion.span
                      key={`cart-${totalCount}`}
                      initial={{ scale: 0, y: -4 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-forest text-cream text-[10px] font-sans font-bold rounded-full flex items-center justify-center shadow-subtle"
                    >
                      {totalCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="hidden md:inline font-sans text-xs tracking-wider font-semibold uppercase">
                Bag
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown */}
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
        />
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}

