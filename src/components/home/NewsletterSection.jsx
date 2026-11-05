import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, Sparkles, Copy, Check } from 'lucide-react';
import Button from '../ui/Button';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid botanical email address.');
      return;
    }
    setError('');
    setIsSubscribed(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('VERDORA10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="py-24 sm:py-32 px-6 sm:px-12 bg-cream/80 border-t border-forest/15 relative overflow-hidden"
    >
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-sage/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-botanical/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div className="space-y-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-forest/10 text-forest text-xs font-mono uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5 text-botanical" />
            The Green Dispatch
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-forest tracking-tight">
            Let's Grow <span className="font-serif italic font-normal text-botanical">Together.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-charcoal/70 max-w-xl mx-auto leading-relaxed">
            Subscribe for 10% off your first botanical acquisition, seasonal repotting guidance, and VIP invitations to rare variegated drops.
          </p>
        </div>

        {/* Subscription Form */}
        <AnimatePresence mode="wait">
          {!isSubscribed ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2 bg-white p-2 rounded-editorial border border-forest/20 shadow-subtle focus-within:border-forest focus-within:ring-2 focus-within:ring-forest/20 transition-all">
                <div className="flex items-center pl-3 w-full text-charcoal/40">
                  <Mail className="w-5 h-5 text-forest/60 mr-2 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address..."
                    className="w-full bg-transparent text-sm text-charcoal placeholder:text-charcoal/40 outline-none font-sans py-2"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto shrink-0 shadow-sm"
                >
                  Subscribe
                </Button>
              </div>

              {error && (
                <p className="text-xs text-red-600 font-sans tracking-wide text-left pl-2">
                  {error}
                </p>
              )}

              <p className="text-[11px] font-sans text-charcoal/50">
                Zero spam. Unsubscribe at any time. Read our{' '}
                <a href="#privacy" className="underline hover:text-forest">
                  Privacy Covenant
                </a>.
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="subscribed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="bg-white p-8 rounded-editorial border border-forest/20 shadow-floating max-w-md mx-auto space-y-4"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-cream flex items-center justify-center text-botanical">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl text-forest">Welcome to the Living Circle</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-sans">
                We've registered <strong className="text-forest">{email}</strong>. Use your exclusive 10% welcome voucher at checkout:
              </p>

              {/* Copyable Promo Code Badge */}
              <div className="flex items-center justify-between p-3 bg-cream/60 rounded-editorial border border-forest/15 font-mono text-sm">
                <span className="font-bold text-forest tracking-wider">VERDORA10</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs uppercase tracking-wider bg-forest text-cream rounded hover:bg-forest-800 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-sage" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subscriber Perks Checklist */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans text-charcoal/70 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-botanical" />
            <span>₹999 Free Shipping Privileges</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-botanical" />
            <span>Botanist Diagnostic Hotline</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-botanical" />
            <span>Seasonal Soil Guides</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
