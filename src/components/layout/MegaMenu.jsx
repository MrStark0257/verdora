import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../../data/products';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

export default function MegaMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onMouseLeave={onClose}
          className="absolute top-full left-0 w-full bg-cream/95 backdrop-blur-md border-b border-forest/15 shadow-floating z-30 py-8 px-6 sm:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Category Grid (Columns 1-3) */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-forest/10">
                  <h3 className="font-serif text-lg text-forest tracking-tight">
                    Explore By Botanical Category
                  </h3>
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="font-sans text-xs tracking-editorial uppercase text-forest hover:text-botanical font-medium inline-flex items-center gap-1 group"
                  >
                    View All Specimens
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/collections/${cat.slug}`}
                      onClick={onClose}
                      className="group flex items-center gap-3.5 p-2 rounded-editorial hover:bg-forest/5 transition-all duration-200"
                    >
                      <div className="w-12 h-12 rounded-editorial overflow-hidden shrink-0 bg-forest/5">
                        <img
                          src={getAssetUrl(cat.image)}
                          alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-medium text-forest group-hover:text-botanical transition-colors">
                          {cat.name}
                        </h4>
                        <span className="text-[11px] font-sans text-charcoal/50">
                          {cat.itemCount} plants available
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Editorial Spotlight Card (Column 4) */}
              <div className="lg:col-span-1 bg-white p-5 rounded-editorial border border-forest/10 shadow-subtle flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-botanical bg-sage/20 px-2 py-0.5 rounded-pill mb-3">
                    <Sparkles className="w-3 h-3" />
                    Collector Spotlight
                  </div>
                  <h4 className="font-serif text-base text-forest mb-1">
                    Rare Variegated Cultivars
                  </h4>
                  <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
                    Hand-propagated specimens with bespoke white, cream, and silver variegations.
                  </p>
                </div>
                <div className="rounded-editorial overflow-hidden h-28 relative mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=600&q=80"
                    alt="Variegated Plants"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Link
                  to="/collections/rare"
                  onClick={onClose}
                  className="font-sans text-xs tracking-editorial uppercase text-forest font-semibold hover:text-botanical inline-flex items-center justify-between"
                >
                  <span>Explore Rare Vault</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

