import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    discountPercent,
    shippingFee,
    grandTotal,
    couponCode,
    couponError,
    applyCoupon,
    removeCoupon,
    orderNote,
    setOrderNote,
    freeShippingRemaining,
    freeShippingProgress,
    FREE_SHIPPING_THRESHOLD,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const ok = applyCoupon(inputCoupon);
    if (ok) setInputCoupon('');
  };

  return (
    <div className="min-h-screen bg-offwhite text-charcoal flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-12 py-12 w-full space-y-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-forest/15 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold block mb-1">
              Your Living Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-forest tracking-tight">
              Botanical Shopping Bag
            </h1>
          </div>

          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs font-mono uppercase tracking-wider text-charcoal/50 hover:text-earth flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Bag
            </button>
          )}
        </div>

        {/* Free Shipping Progress Box */}
        <div className="p-4 sm:p-5 bg-white rounded-editorial border border-forest/15 shadow-subtle space-y-2 max-w-3xl">
          <div className="flex items-center justify-between text-xs font-sans">
            <span className="flex items-center gap-2 text-forest font-medium">
              <Truck className="w-4 h-4 text-botanical shrink-0" />
              {freeShippingRemaining === 0 ? (
                <span className="text-botanical font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Congratulations! You unlocked FREE Pan-India Shipping.
                </span>
              ) : (
                <span>
                  Add <strong className="text-forest">₹{freeShippingRemaining.toLocaleString('en-IN')}</strong> more to unlock FREE Shipping
                </span>
              )}
            </span>
            <span className="font-mono text-[11px] text-charcoal/50">
              Goal: ₹{FREE_SHIPPING_THRESHOLD}
            </span>
          </div>

          <div className="w-full h-2 bg-cream-200 rounded-pill overflow-hidden">
            <div
              className="h-full bg-botanical transition-all duration-500 rounded-pill"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main Cart Items or Empty State */}
        {cartItems.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-editorial border border-forest/10 p-8 space-y-5">
            <div className="w-20 h-20 rounded-full bg-cream mx-auto flex items-center justify-center text-forest/40">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-3xl text-forest">Your bag is currently empty</h2>
            <p className="font-sans text-sm text-charcoal/60 max-w-md mx-auto leading-relaxed">
              Explore our botanical specimens, from shade-tolerant monstera cultivars to flowering jasmine, and invite the calming rhythms of nature into your everyday spaces.
            </p>
            <div className="pt-2">
              <Button to="/shop" variant="primary" size="md" icon={ArrowRight}>
                Explore Botanical Catalog
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 8 Columns: Items List & Order Notes */}
            <div className="lg:col-span-8 space-y-6">
              {/* Items Card List */}
              <div className="bg-white rounded-editorial border border-forest/15 divide-y divide-forest/10 shadow-subtle overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                    {/* Product Media & Info */}
                    <div className="flex gap-4 items-center">
                      <Link to={`/product/${item.slug}`} className="w-20 h-24 rounded-editorial overflow-hidden shrink-0 bg-cream border border-forest/10">
                        <img
                          src={item.images?.[0] || item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      <div className="space-y-1">
                        <Link to={`/product/${item.slug}`} className="font-serif text-base sm:text-lg font-medium text-forest hover:text-botanical transition-colors block">
                          {item.name}
                        </Link>
                        {item.botanicalName && (
                          <p className="font-serif italic text-xs text-charcoal/50">
                            {item.botanicalName}
                          </p>
                        )}
                        <p className="font-sans text-xs text-charcoal/60">
                          Unit: ₹{item.price.toLocaleString('en-IN')} · Scale: {item.size || 'Standard'}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Stepper & Subtotal */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-forest/10">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-forest/20 rounded-editorial bg-offwhite px-2 py-1.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-charcoal/60 hover:text-forest"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 font-mono text-sm font-semibold text-forest">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-charcoal/60 hover:text-forest"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right">
                        <span className="font-sans text-base sm:text-lg font-bold text-forest block">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-charcoal/40 hover:text-earth p-1.5 transition-colors"
                        title="Remove from bag"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gift Message / Special Delivery Instructions */}
              <div className="p-6 bg-white rounded-editorial border border-forest/15 shadow-subtle space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-botanical" />
                  <h3 className="font-serif text-base text-forest">
                    Gift Note & Special Delivery Instructions
                  </h3>
                </div>
                <textarea
                  rows={2}
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="e.g. Please include a handwritten gift card: 'Happy housewarming! May this Monstera bring calm to your new home.'"
                  className="w-full bg-offwhite border border-forest/15 rounded-editorial p-3 text-xs font-sans text-charcoal outline-none focus:border-forest"
                />
                <p className="text-[11px] font-sans text-charcoal/50">
                  Complimentary handwritten botanical card included with every gift request.
                </p>
              </div>
            </div>

            {/* Right 4 Columns: Order Summary & Voucher */}
            <div className="lg:col-span-4 space-y-6 sticky top-28">
              <div className="bg-white rounded-editorial border border-forest/15 p-6 shadow-subtle space-y-6">
                <h3 className="font-serif text-xl text-forest pb-3 border-b border-forest/10">
                  Order Summary
                </h3>

                {/* Subtotal, Shipping & Discount Rows */}
                <div className="space-y-3 font-sans text-xs">
                  <div className="flex justify-between text-charcoal/80">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-charcoal">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-botanical font-medium">
                      <span>Voucher Discount ({discountPercent}%)</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-charcoal/80">
                    <span>Estimated Shipping</span>
                    <span className={`font-semibold ${shippingFee === 0 ? 'text-botanical' : 'text-charcoal'}`}>
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </div>
                </div>

                {/* Voucher Code Form */}
                <div className="pt-4 border-t border-forest/10 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal/60 block font-semibold">
                    Voucher / Discount Code
                  </span>

                  {couponCode ? (
                    <div className="flex items-center justify-between p-2.5 bg-cream rounded-editorial border border-botanical/30 text-xs">
                      <div className="flex items-center gap-2 text-botanical font-mono font-semibold">
                        <Tag className="w-3.5 h-3.5" />
                        <span>{couponCode}</span>
                        <span className="text-[10px] text-botanical/70 font-sans">({discountPercent}% OFF)</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-xs text-charcoal/60 hover:text-earth underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={inputCoupon}
                          onChange={(e) => setInputCoupon(e.target.value)}
                          placeholder="e.g. GROW10"
                          className="flex-1 bg-offwhite border border-forest/20 rounded-editorial px-3 py-2 text-xs uppercase font-mono text-charcoal outline-none focus:border-forest"
                        />
                        <button
                          type="submit"
                          className="bg-forest text-cream px-4 py-2 rounded-editorial text-xs font-sans tracking-editorial uppercase hover:bg-forest-800 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-red-600 font-sans">{couponError}</p>
                      )}
                      <p className="text-[10px] text-charcoal/50 font-sans">
                        Tip: Use code <strong className="font-mono text-forest">GROW10</strong> for 10% welcome discount.
                      </p>
                    </form>
                  )}
                </div>

                {/* Grand Total */}
                <div className="pt-4 border-t border-forest/15 flex items-baseline justify-between">
                  <span className="font-serif text-lg text-forest">Grand Total</span>
                  <div className="text-right">
                    <span className="font-sans text-2xl font-bold text-forest">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-charcoal/50 font-mono">
                      Includes all GST & taxes
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="space-y-2 pt-2">
                  <Button
                    to="/checkout"
                    variant="primary"
                    size="lg"
                    fullWidth={true}
                    icon={ArrowRight}
                  >
                    Proceed to Secure Checkout
                  </Button>

                  <div className="text-center pt-2">
                    <Link
                      to="/shop"
                      className="font-sans text-xs tracking-editorial uppercase text-charcoal/60 hover:text-forest underline"
                    >
                      &larr; Continue Exploring Greenery
                    </Link>
                  </div>
                </div>

                {/* Reassurance Badges */}
                <div className="pt-4 border-t border-forest/10 space-y-2 text-[11px] text-charcoal/60 font-sans">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-botanical" />
                    <span>14-Day botanical vitality guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-botanical" />
                    <span>Safe eco-packaging transit assurance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

