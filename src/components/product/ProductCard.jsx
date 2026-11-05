import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, Plus, Check, Sun, Droplets, Sparkles } from 'lucide-react';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';
import { getAssetUrl } from '../../utils/assetUrl';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { openQuickView } = useUI();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const rawMain = product.images?.[0] || product.image;
  const rawSec = product.images?.[1] || rawMain;
  const mainImage = getAssetUrl(rawMain);
  const secondaryImage = getAssetUrl(rawSec);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 350, damping: 24 }}
      className="group relative flex flex-col bg-white rounded-editorial border border-forest/10 overflow-hidden shadow-subtle hover:shadow-elevated transition-shadow duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container with Dual Image Crossfade */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream/40">
        <Link to={`/product/${product.slug}`} className="block w-full h-full relative">
          <img
            src={mainImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-108 ${
              isHovered && secondaryImage !== mainImage ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
          />

          {secondaryImage !== mainImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} detail view`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-108 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Ambient Top Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isBestseller && (
            <Badge variant="bestseller" size="sm">Bestseller</Badge>
          )}
          {product.isRare && (
            <Badge variant="rare" size="sm">Rare Drop</Badge>
          )}
          {product.isPetSafe && (
            <Badge variant="petsafe" size="sm">Pet-Safe</Badge>
          )}
        </div>

        {/* Top Right Wishlist Action with Micro Spring Pulse */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.15 }}
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-colors duration-200 backdrop-blur-md shadow-sm ${
            isFavorited
              ? 'bg-earth text-cream'
              : 'bg-white/85 text-charcoal/70 hover:text-earth hover:bg-white'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${isFavorited ? 'fill-current text-cream' : ''}`}
          />
        </motion.button>

        {/* Quick View Button (Desktop Hover Trigger) */}
        <div className="absolute bottom-3 left-3 right-3 hidden sm:flex items-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={handleQuickView}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white/95 backdrop-blur-md text-forest hover:bg-forest hover:text-cream text-xs uppercase tracking-editorial font-semibold rounded-editorial shadow-elevated transition-colors duration-200"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </motion.button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div>
          {/* Micro Botanical Metric Indicators */}
          <div className="flex items-center gap-3 text-[11px] font-sans text-charcoal/60 mb-1.5">
            <span className="flex items-center gap-1 text-charcoal/70">
              <Sun className="w-3 h-3 text-earth" />
              {product.sunlight?.split(' ')[0] || 'Medium'} Light
            </span>
            <span className="text-forest/20">·</span>
            <span className="flex items-center gap-1 text-charcoal/70">
              <Droplets className="w-3 h-3 text-botanical" />
              {product.difficulty || 'Easy'} Care
            </span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.slug}`} className="block group-hover:text-botanical transition-colors">
            <h3 className="font-serif text-lg font-medium text-forest line-clamp-1 group-hover:underline underline-offset-4 decoration-botanical/30">
              {product.name}
            </h3>
            {product.botanicalName && (
              <p className="font-serif italic text-xs text-charcoal/50 line-clamp-1 mt-0.5">
                {product.botanicalName}
              </p>
            )}
          </Link>
        </div>

        {/* Pricing, Rating & Quick Add */}
        <div className="pt-2 border-t border-forest/10 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-base sm:text-lg font-bold text-forest">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="font-sans text-xs text-charcoal/40 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <Rating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
          </div>

          {/* Quick Add CTA with Morphing Check Animation */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.08 }}
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdded}
            className={`p-2.5 rounded-editorial transition-all duration-300 flex items-center justify-center shadow-sm ${
              isAdded
                ? 'bg-botanical text-cream ring-4 ring-botanical/20'
                : 'bg-forest/5 text-forest hover:bg-forest hover:text-cream'
            }`}
            title={isAdded ? 'Added to Bag' : 'Quick Add to Bag'}
            aria-label={`Quick add ${product.name} to bag`}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="flex items-center"
                >
                  <Check className="w-4 h-4 text-cream" />
                </motion.div>
              ) : (
                <motion.div
                  key="plus"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Plus className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}