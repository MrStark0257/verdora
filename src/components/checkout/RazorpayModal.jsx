import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2, CreditCard, Smartphone, Building, Loader2, Lock } from 'lucide-react';

export default function RazorpayModal({ isOpen, onClose, amount, orderId, onSuccess }) {
  const [selectedMethod, setSelectedMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState('user@okaxis');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const fakePaymentId = `pay_VRD_${Math.floor(100000 + Math.random() * 900000)}`;
      onSuccess(fakePaymentId);
    }, 1400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-lg bg-white rounded-editorial shadow-floating border border-forest/15 overflow-hidden z-10 font-sans"
        >
          {/* Razorpay Brand Header */}
          <div className="bg-[#0C2340] text-white p-5 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#3395FF] flex items-center justify-center font-bold text-white text-lg font-mono">
                R
              </div>
              <div>
                <span className="block text-xs uppercase font-mono tracking-widest text-slate-300">
                  Razorpay Checkout
                </span>
                <h3 className="font-serif text-lg font-semibold text-white">
                  VERDORA Botanical Living
                </h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-mono">Total Amount</span>
              <span className="font-mono text-xl font-bold text-emerald-400">
                ₹{amount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Security Banner */}
          <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-bit Bank Grade Encrypted Payment</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">Ref: {orderId}</span>
          </div>

          {/* Payment Method Selector */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMethod('upi')}
                className={`p-3 rounded-editorial border text-xs flex flex-col items-center justify-center gap-1.5 transition-all ${
                  selectedMethod === 'upi'
                    ? 'border-[#3395FF] bg-blue-50/50 text-[#0C2340] font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-4 h-4 text-[#3395FF]" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('card')}
                className={`p-3 rounded-editorial border text-xs flex flex-col items-center justify-center gap-1.5 transition-all ${
                  selectedMethod === 'card'
                    ? 'border-[#3395FF] bg-blue-50/50 text-[#0C2340] font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#3395FF]" />
                <span>Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('netbanking')}
                className={`p-3 rounded-editorial border text-xs flex flex-col items-center justify-center gap-1.5 transition-all ${
                  selectedMethod === 'netbanking'
                    ? 'border-[#3395FF] bg-blue-50/50 text-[#0C2340] font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Building className="w-4 h-4 text-[#3395FF]" />
                <span>Net Banking</span>
              </button>
            </div>

            {/* Method Inputs */}
            {selectedMethod === 'upi' && (
              <div className="p-4 bg-slate-50 rounded-editorial border border-slate-200 space-y-3">
                <span className="text-xs font-semibold text-slate-700 block">
                  Pay via Instant UPI ID or App
                </span>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="name@okhdfcbank"
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs font-mono outline-none focus:border-[#3395FF]"
                />
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="px-2 py-0.5 bg-white border rounded">GPay</span>
                  <span className="px-2 py-0.5 bg-white border rounded">PhonePe</span>
                  <span className="px-2 py-0.5 bg-white border rounded">Paytm</span>
                </div>
              </div>
            )}

            {selectedMethod === 'card' && (
              <div className="p-4 bg-slate-50 rounded-editorial border border-slate-200 space-y-3">
                <span className="text-xs font-semibold text-slate-700 block">
                  Credit / Debit Card
                </span>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs font-mono outline-none focus:border-[#3395FF]"
                />
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <input type="text" defaultValue="12/28" className="bg-white border border-slate-300 rounded px-3 py-1.5" />
                  <input type="password" defaultValue="•••" className="bg-white border border-slate-300 rounded px-3 py-1.5" />
                </div>
              </div>
            )}

            {selectedMethod === 'netbanking' && (
              <div className="p-4 bg-slate-50 rounded-editorial border border-slate-200 space-y-3 text-xs">
                <span className="font-semibold text-slate-700 block">Popular Indian Banks</span>
                <div className="grid grid-cols-2 gap-2 font-medium text-slate-700">
                  <label className="flex items-center gap-2 p-2 bg-white border rounded cursor-pointer">
                    <input type="radio" name="bank" defaultChecked className="accent-[#3395FF]" />
                    <span>HDFC Bank</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 bg-white border rounded cursor-pointer">
                    <input type="radio" name="bank" className="accent-[#3395FF]" />
                    <span>ICICI Bank</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 bg-white border rounded cursor-pointer">
                    <input type="radio" name="bank" className="accent-[#3395FF]" />
                    <span>State Bank of India</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 bg-white border rounded cursor-pointer">
                    <input type="radio" name="bank" className="accent-[#3395FF]" />
                    <span>Axis Bank</span>
                  </label>
                </div>
              </div>
            )}

            {/* Pay Button */}
            <button
              type="button"
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 bg-[#3395FF] hover:bg-[#2080eb] text-white font-semibold rounded-editorial text-sm shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authorizing via Banking Gateway...</span>
                </>
              ) : (
                <span>Pay ₹{amount.toLocaleString('en-IN')} Securely</span>
              )}
            </button>
          </div>

          {/* Footer Note */}
          <div className="p-3 bg-slate-100 text-center text-[10px] text-slate-500 font-mono flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sandbox Demonstration Mode · Zero real money debited</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

