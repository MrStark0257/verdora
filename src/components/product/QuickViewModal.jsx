import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  Check,
  Heart,
  Sun,
  Droplets,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Maximize2,
} from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView } = useUI();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const product = quickViewProduct;
  const isFavorited = product ? isInWishlist(product.id) : false;
  const images = product ? (product.images && product.images.length > 0 ? product.images : [product.image]) : [];

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      closeQuickView();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-4xl bg-offwhite rounded-editorial shadow-floating border border-forest/15 overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeQuickView}
              className="absolute top-4 right-4 z-20 p-2 text-charcoal/60 hover:text-forest bg-white/80 hover:bg-white rounded-full transition-colors backdrop-blur-sm shadow-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Gallery */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-cream/30 border-b md:border-b-0 md:border-r border-forest/10">
              {/* Main Featured Photo */}
              <div className="relative aspect-square w-full rounded-editorial overflow-hidden bg-white shadow-subtle mb-4">
                <img
                  src={images[selectedImageIndex] || images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
                  {product.isRare && <Badge variant="rare">Rare Drop</Badge>}
                </div>
              </div>

              {/* Thumbnail Row */}
              {images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-editorial overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImageIndex === idx ? 'border-forest scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Product Specifications */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-botanical font-semibold">
                    {product.category} Collection
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-forest mt-1">
                    {product.name}
                  </h2>
                  {product.botanicalName && (
                    <p className="font-serif italic text-sm text-charcoal/60 mt-0.5">
                      {product.botanicalName}
                    </p>
                  )}
                </div>

                {/* Price & Rating */}
                <div className="flex items-center justify-between pb-3 border-b border-forest/10">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-sans text-2xl font-bold text-forest">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="font-sans text-sm text-charcoal/40 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <Rating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans">
                  {product.shortDescription || product.description}
                </p>

                {/* Key Botanical Specifications Matrix */}
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-cream/50 rounded-editorial border border-forest/10 text-xs">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-earth shrink-0" />
                    <div>
                      <span className="block text-[10px] text-charcoal/50 uppercase font-mono">Sunlight</span>
                      <span className="font-medium text-forest">{product.sunlight || 'Medium Indirect'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-botanical shrink-0" />
                    <div>
                      <span className="block text-[10px] text-charcoal/50 uppercase font-mono">Watering</span>
                      <span className="font-medium text-forest">{product.watering || 'Weekly'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {product.isPetSafe ? (
                      <ShieldCheck className="w-4 h-4 text-botanical shrink-0" />
                    ) : (
                      <ShieldAlert className="w-4 h-4 text-earth shrink-0" />
                    )}
                    <div>
                      <span className="block text-[10px] text-charcoal/50 uppercase font-mono">Pet Toxicity</span>
                      <span className="font-medium text-forest">{product.isPetSafe ? '100% Pet-Safe' : 'Keep Away From Pets'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-forest/70 shrink-0" />
                    <div>
                      <span className="block text-[10px] text-charcoal/50 uppercase font-mono">Plant Scale</span>
                      <span className="font-medium text-forest">{product.size || 'Medium'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Quantity Selector & Add to Bag */}
              <div className="space-y-3 pt-4 border-t border-forest/10">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="inline-flex items-center border border-forest/20 rounded-editorial bg-white px-2 py-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 text-charcoal/60 hover:text-forest active:scale-90 transition-transform"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-mono text-sm font-semibold text-forest">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 text-charcoal/60 hover:text-forest active:scale-90 transition-transform"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <Button
                    variant="primary"
                    className="flex-1"
                    size="md"
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    icon={isAdded ? Check : null}
                  >
                    {isAdded ? 'Added to Bag!' : `Add to Bag · ₹${(product.price * quantity).toLocaleString('en-IN')}`}
                  </Button>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-editorial border transition-colors ${
                      isFavorited
                        ? 'bg-earth text-cream border-earth'
                        : 'border-forest/20 text-charcoal/60 hover:text-earth hover:border-earth'
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-cream' : ''}`} />
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={closeQuickView}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-editorial font-medium text-forest hover:text-botanical transition-colors"
                  >
                    <span>View Complete Botanical Details & Care Plan</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
