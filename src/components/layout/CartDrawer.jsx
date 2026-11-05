import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles, Truck, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    freeShippingRemaining,
    freeShippingProgress,
    FREE_SHIPPING_THRESHOLD,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-offwhite text-charcoal h-full shadow-floating flex flex-col justify-between overflow-hidden z-10 border-l border-forest/15"
          >
            {/* Header */}
            <div className="p-6 border-b border-forest/10 bg-cream/60">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ rotate: -10, scale: 0.9 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <ShoppingBag className="w-5 h-5 text-forest" />
                  </motion.div>
                  <h3 className="font-serif text-xl text-forest tracking-tight">
                    Your Botanical Bag
                  </h3>
                  <span className="text-xs font-mono text-charcoal/50">
                    ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-charcoal/60 hover:text-forest transition-colors rounded-editorial hover:bg-forest/5"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="p-3.5 bg-white rounded-editorial border border-forest/10 shadow-subtle relative overflow-hidden">
                <div className="flex items-center justify-between text-xs font-sans mb-2">
                  <span className="flex items-center gap-1.5 text-forest font-medium">
                    <Truck className="w-3.5 h-3.5 text-botanical" />
                    {freeShippingRemaining === 0 ? (
                      <span className="text-botanical font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                        Free Standard Shipping Unlocked!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-forest">₹{freeShippingRemaining.toLocaleString('en-IN')}</strong> more for Free Shipping
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-[10px] text-charcoal/60">
                    ₹{FREE_SHIPPING_THRESHOLD} Goal
                  </span>
                </div>

                {/* Progress bar line */}
                <div className="w-full h-2 bg-cream-200 rounded-pill overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-botanical to-forest rounded-pill"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 space-y-4"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-cream flex items-center justify-center text-forest/40">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-lg text-forest">Your bag is empty</h4>
                  <p className="text-xs text-charcoal/60 max-w-xs mx-auto leading-relaxed">
                    Explore our botanical specimens and bring the grounding calm of nature into your home.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsCartOpen(false)}
                    to="/shop"
                  >
                    Explore Living Catalog
                  </Button>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item, idx) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
                      transition={{ delay: idx * 0.04, duration: 0.3 }}
                      className="flex gap-4 p-3.5 bg-white rounded-editorial border border-forest/10 shadow-subtle hover:border-forest/20 transition-all"
                    >
                      {/* Thumbnail */}
                      <Link
                        to={`/product/${item.slug || item.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="w-20 h-24 rounded-editorial overflow-hidden shrink-0 bg-cream block relative group"
                      >
                        <img
                          src={item.images?.[0] || item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              to={`/product/${item.slug || item.id}`}
                              onClick={() => setIsCartOpen(false)}
                              className="font-serif text-sm font-medium text-forest leading-snug hover:text-botanical transition-colors"
                            >
                              {item.name}
                            </Link>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-charcoal/40 hover:text-earth p-1 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {item.botanicalName && (
                            <p className="font-serif italic text-[11px] text-charcoal/50">
                              {item.botanicalName}
                            </p>
                          )}
                          <p className="font-sans text-xs text-charcoal/60 mt-0.5">
                            Size: {item.size || 'Standard'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          {/* Quantity Counter */}
                          <div className="inline-flex items-center border border-forest/20 rounded-editorial bg-offwhite">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-charcoal/70 hover:text-forest active:scale-90 transition-transform"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono font-medium text-forest">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-charcoal/70 hover:text-forest active:scale-90 transition-transform"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Price */}
                          <span className="font-sans text-sm font-semibold text-forest">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer Summary & Checkout CTA */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-forest/10 bg-cream/60 space-y-4">
                <div className="space-y-1.5 text-xs font-sans">
                  <div className="flex justify-between text-charcoal/70">
                    <span>Subtotal</span>
                    <span className="font-semibold text-charcoal">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-charcoal/70">
                    <span>Shipping</span>
                    <span className="font-medium text-botanical">
                      {freeShippingRemaining === 0 ? 'FREE' : 'Calculated at checkout'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-forest/10 flex justify-between items-baseline">
                  <span className="font-serif text-base text-forest">Estimated Total</span>
                  <span className="font-sans text-xl font-bold text-forest">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="primary"
                    fullWidth={true}
                    size="md"
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    icon={ArrowRight}
                  >
                    Proceed to Checkout
                  </Button>

                  <Button
                    variant="ghost"
                    fullWidth={true}
                    size="sm"
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                  >
                    View Bag Details
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
