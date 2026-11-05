import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import RazorpayModal from '../components/checkout/RazorpayModal';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  CheckCircle2,
  Package,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
} from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, discountAmount, shippingFee, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  // Contact & Address Fields
  const [email, setEmail] = useState(user?.email || 'arya.sharma@example.com');
  const [fullName, setFullName] = useState(user?.full_name || 'Arya Sharma');
  const [phone, setPhone] = useState(user?.phone || '+91 98201 44521');
  const [street, setStreet] = useState(user?.addresses?.[0]?.street || '14th Road, Bandra West');
  const [city, setCity] = useState(user?.addresses?.[0]?.city || 'Mumbai');
  const [state, setState] = useState(user?.addresses?.[0]?.state || 'Maharashtra');
  const [pincode, setPincode] = useState(user?.addresses?.[0]?.pincode || '400050');

  // Delivery & Payment Choices
  const [deliveryMethod, setDeliveryMethod] = useState('standard'); // 'standard' (0 or 149) | 'white-glove' (+299)
  const [paymentChoice, setPaymentChoice] = useState('razorpay'); // 'razorpay' | 'cod'

  // Modals & Confirmation States
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Financials
  const deliveryAddon = deliveryMethod === 'white-glove' ? 299 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee + deliveryAddon);
  const currentOrderId = `VRD-${Math.floor(1000 + Math.random() * 9000)}-IN`;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (paymentChoice === 'razorpay') {
      setIsRazorpayOpen(true);
    } else {
      // Direct Cash on Delivery
      handleOrderSuccess('cod_verified');
    }
  };

  const handleOrderSuccess = (paymentRef) => {
    setIsRazorpayOpen(false);
    setIsPlacingOrder(true);

    setTimeout(() => {
      const orderReceipt = {
        orderId: currentOrderId,
        paymentId: paymentRef,
        customerName: fullName,
        email,
        phone,
        address: `${street}, ${city}, ${state} — ${pincode}`,
        items: [...cartItems],
        total: grandTotal,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        estimatedDelivery: '3 to 5 business days',
      };

      // Save to localStorage order history
      try {
        const existing = JSON.parse(localStorage.getItem('verdora_orders') || '[]');
        localStorage.setItem('verdora_orders', JSON.stringify([orderReceipt, ...existing]));
      } catch (e) {
        console.error(e);
      }

      setConfirmedOrder(orderReceipt);
      clearCart();
      setIsPlacingOrder(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-offwhite text-charcoal flex flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-12 py-12 w-full space-y-12">
        {confirmedOrder ? (
          /* ============================================== */
          /* ORDER CONFIRMATION RECEIPT STATE */
          /* ============================================== */
          <div className="max-w-2xl mx-auto bg-white rounded-editorial border border-forest/20 shadow-floating p-8 sm:p-12 space-y-8 animate-fadeIn">
            <div className="text-center space-y-3 pb-6 border-b border-forest/15">
              <div className="w-16 h-16 rounded-full bg-cream mx-auto flex items-center justify-center text-botanical">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold block">
                Acquisition Confirmed
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-forest">
                Thank You, {confirmedOrder.customerName}
              </h1>
              <p className="text-xs sm:text-sm text-charcoal/70 max-w-md mx-auto">
                Your living botanical specimens have been queued for pre-transit root hydration and insulated packaging.
              </p>
            </div>

            {/* Receipt Summary Grid */}
            <div className="p-5 bg-cream/50 rounded-editorial border border-forest/10 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-forest/10">
                <span className="font-mono text-charcoal/50 uppercase">Order Identifier</span>
                <span className="font-mono font-bold text-forest text-sm">{confirmedOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Payment Reference</span>
                <span className="font-mono text-forest">{confirmedOrder.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Estimated Sanctuary Arrival</span>
                <span className="font-medium text-botanical">{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Delivery Address</span>
                <span className="text-right max-w-xs text-forest">{confirmedOrder.address}</span>
              </div>
            </div>

            {/* Item List */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-charcoal/50 block">
                Package Contents ({confirmedOrder.items.length} Varieties)
              </span>
              <div className="divide-y divide-forest/10">
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.images?.[0] || item.image} alt="" className="w-10 h-12 object-cover rounded bg-cream" />
                      <div>
                        <span className="font-serif font-medium text-forest block">{item.name}</span>
                        <span className="text-charcoal/50">{item.quantity}× ₹{item.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-forest">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-forest/15 flex items-baseline justify-between">
              <span className="font-serif text-lg text-forest">Amount Paid</span>
              <span className="font-sans text-2xl font-bold text-forest">
                ₹{confirmedOrder.total.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Next Steps Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button
                to={`/track-order?id=${confirmedOrder.orderId}`}
                variant="primary"
                size="md"
                className="flex-1"
                icon={ArrowRight}
              >
                Track Live Parcel
              </Button>
              <Button
                to="/shop"
                variant="secondary"
                size="md"
                className="flex-1"
              >
                Continue Browsing
              </Button>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Bag Redirect Prompt */
          <div className="text-center py-24 bg-white rounded-editorial border border-forest/10 p-8 space-y-4 max-w-md mx-auto">
            <h2 className="font-serif text-2xl text-forest">Your shopping bag is empty</h2>
            <p className="text-xs text-charcoal/60">
              Add living plants to your bag before proceeding to checkout.
            </p>
            <Button to="/shop" variant="primary" size="sm">
              Discover Plants
            </Button>
          </div>
        ) : (
          /* ============================================== */
          /* CHECKOUT TWO-COLUMN EXPERIENCE */
          /* ============================================== */
          <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 7 Columns: Details, Shipping & Payment Selection */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold block mb-1">
                  Step 1 of 2 · Delivery Coordinates
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-forest tracking-tight">
                  Checkout & Botanical Delivery
                </h1>
              </div>

              {/* Contact Information */}
              <div className="bg-white p-6 sm:p-8 rounded-editorial border border-forest/15 shadow-subtle space-y-4">
                <h3 className="font-serif text-xl text-forest flex items-center justify-between">
                  <span>Customer Contact</span>
                  {!isAuthenticated && (
                    <Link to="/account" className="text-xs font-sans text-forest underline hover:text-botanical">
                      Sign in for faster checkout
                    </Link>
                  )}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    required
                  />
                  <Input
                    label="Contact Phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98000 00000"
                    required
                  />
                </div>

                <Input
                  label="Email Address for Care Sheets & Receipt"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  required
                />
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 sm:p-8 rounded-editorial border border-forest/15 shadow-subtle space-y-4">
                <h3 className="font-serif text-xl text-forest">
                  Sanctuary Shipping Address
                </h3>

                <Input
                  label="Street Address / Flat / Floor / Building"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Apartment 402, Lotus Residency, 14th Road"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <Input
                    label="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                  <Input
                    label="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Delivery Service Selection */}
              <div className="bg-white p-6 sm:p-8 rounded-editorial border border-forest/15 shadow-subtle space-y-4">
                <h3 className="font-serif text-xl text-forest">
                  Select Delivery Service
                </h3>

                <div className="space-y-3">
                  <label
                    className={`flex items-start justify-between p-4 rounded-editorial border cursor-pointer transition-all ${
                      deliveryMethod === 'standard'
                        ? 'border-forest bg-cream/30 shadow-subtle'
                        : 'border-forest/15 hover:bg-offwhite'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'standard'}
                        onChange={() => setDeliveryMethod('standard')}
                        className="accent-forest mt-1"
                      />
                      <div>
                        <span className="font-serif text-base text-forest block font-medium">
                          Standard Botanical Climate-Insulated Transit
                        </span>
                        <span className="text-xs text-charcoal/60 leading-relaxed block mt-0.5">
                          Hydrated root ball cradle in corrugated box. Arrives in 3–5 business days.
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold text-forest">
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </label>

                  <label
                    className={`flex items-start justify-between p-4 rounded-editorial border cursor-pointer transition-all ${
                      deliveryMethod === 'white-glove'
                        ? 'border-forest bg-cream/30 shadow-subtle'
                        : 'border-forest/15 hover:bg-offwhite'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'white-glove'}
                        onChange={() => setDeliveryMethod('white-glove')}
                        className="accent-forest mt-1"
                      />
                      <div>
                        <span className="font-serif text-base text-forest block font-medium flex items-center gap-1.5">
                          <span>White-Glove Hand Installation</span>
                          <span className="text-[10px] font-mono uppercase bg-sage/30 text-forest px-2 py-0.2 rounded">
                            Premium
                          </span>
                        </span>
                        <span className="text-xs text-charcoal/60 leading-relaxed block mt-0.5">
                          Unboxed, inspected, placed in desired room spot, and watered by a trained plant specialist.
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold text-forest">
                      +₹299
                    </span>
                  </label>
                </div>
              </div>

              {/* Payment Method Choice */}
              <div className="bg-white p-6 sm:p-8 rounded-editorial border border-forest/15 shadow-subtle space-y-4">
                <h3 className="font-serif text-xl text-forest">
                  Payment Gateway
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-4 rounded-editorial border cursor-pointer flex items-center gap-3 transition-all ${
                      paymentChoice === 'razorpay'
                        ? 'border-forest bg-cream/30 font-semibold'
                        : 'border-forest/15 text-charcoal/70'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentChoice === 'razorpay'}
                      onChange={() => setPaymentChoice('razorpay')}
                      className="accent-forest"
                    />
                    <div>
                      <span className="font-serif text-sm text-forest block">
                        Razorpay Gateway
                      </span>
                      <span className="text-[11px] text-charcoal/50 block">
                        UPI, Cards, NetBanking, EMI
                      </span>
                    </div>
                  </label>

                  <label
                    className={`p-4 rounded-editorial border cursor-pointer flex items-center gap-3 transition-all ${
                      paymentChoice === 'cod'
                        ? 'border-forest bg-cream/30 font-semibold'
                        : 'border-forest/15 text-charcoal/70'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentChoice === 'cod'}
                      onChange={() => setPaymentChoice('cod')}
                      className="accent-forest"
                    />
                    <div>
                      <span className="font-serif text-sm text-forest block">
                        Pay on Arrival (COD)
                      </span>
                      <span className="text-[11px] text-charcoal/50 block">
                        Cash or UPI upon delivery
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Sticky Order Summary & Authorize Button */}
            <div className="lg:col-span-5 space-y-6 sticky top-28">
              <div className="bg-white p-6 sm:p-8 rounded-editorial border border-forest/15 shadow-subtle space-y-6">
                <h3 className="font-serif text-xl text-forest pb-3 border-b border-forest/10">
                  Review Botanical Order
                </h3>

                {/* Items Mini List */}
                <div className="divide-y divide-forest/10 max-h-60 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.images?.[0] || item.image}
                          alt=""
                          className="w-10 h-12 object-cover rounded bg-cream border border-forest/10"
                        />
                        <div>
                          <span className="font-serif font-medium text-forest block truncate max-w-[160px]">
                            {item.name}
                          </span>
                          <span className="text-charcoal/50">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-mono font-semibold text-forest">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Summary Lines */}
                <div className="pt-4 border-t border-forest/10 space-y-2.5 text-xs font-sans">
                  <div className="flex justify-between text-charcoal/70">
                    <span>Subtotal</span>
                    <span className="font-semibold text-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-botanical font-medium">
                      <span>Voucher Discount</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-charcoal/70">
                    <span>Base Shipping</span>
                    <span className={shippingFee === 0 ? 'text-botanical font-semibold' : ''}>
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </div>

                  {deliveryAddon > 0 && (
                    <div className="flex justify-between text-charcoal/70">
                      <span>White-Glove Installation</span>
                      <span className="font-mono">+₹{deliveryAddon}</span>
                    </div>
                  )}
                </div>

                {/* Grand Total */}
                <div className="pt-4 border-t border-forest/15 flex items-baseline justify-between">
                  <span className="font-serif text-lg text-forest">Payable Total</span>
                  <div className="text-right">
                    <span className="font-sans text-2xl font-bold text-forest">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-charcoal/50 font-mono">
                      All taxes included
                    </span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <div className="space-y-3 pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth={true}
                    icon={Lock}
                    disabled={isPlacingOrder}
                    isLoading={isPlacingOrder}
                  >
                    {paymentChoice === 'razorpay'
                      ? `Proceed to Pay ₹${grandTotal.toLocaleString('en-IN')}`
                      : `Confirm Order with Pay on Arrival`}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal/60 font-mono text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-botanical" />
                    <span>Protected by 14-Day Botanical Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>

      {/* Razorpay Interactive Modal */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        amount={grandTotal}
        orderId={currentOrderId}
        onSuccess={handleOrderSuccess}
      />

      <Footer />
    </div>
  );
}
