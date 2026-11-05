import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingBag, X, Sparkles, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Toast() {
  const { notification, setNotification, setIsCartOpen } = useCart();

  if (!notification) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="pointer-events-auto bg-forest text-cream p-4 rounded-editorial shadow-floating border border-forest-700 max-w-sm flex items-center gap-3.5 backdrop-blur-md"
        >
          {/* Icon or Thumbnail */}
          {notification.image ? (
            <div className="w-12 h-14 rounded-editorial overflow-hidden shrink-0 bg-forest-900 border border-forest-600">
              <img src={notification.image} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center shrink-0 text-sage">
              {notification.type === 'coupon' ? <Tag className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
            </div>
          )}

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <span className="block text-[10px] font-mono uppercase tracking-widest text-sage font-medium">
              {notification.title}
            </span>
            <p className="font-serif text-sm text-cream font-medium truncate mt-0.5">
              {notification.message}
            </p>
          </div>

          {/* Quick Bag Button */}
          {notification.type === 'add' && (
            <button
              type="button"
              onClick={() => {
                setNotification(null);
                setIsCartOpen(true);
              }}
              className="text-xs uppercase font-mono tracking-wider text-sage hover:text-cream underline shrink-0 px-1 py-1"
            >
              View Bag
            </button>
          )}

          {/* Close X */}
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="p-1 text-cream/50 hover:text-cream transition-colors rounded shrink-0"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

