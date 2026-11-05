import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';
import Button from '../ui/Button';

export default function BestsellersSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Bestsellers' },
    { id: 'indoor', label: 'Indoor Classics' },
    { id: 'rare', label: 'Collector Picks' },
    { id: 'petsafe', label: '100% Pet-Safe' },
  ];

  // Filter 8 products based on active selection
  const filteredProducts = products
    .filter((p) => {
      if (activeFilter === 'indoor') return p.category === 'indoor';
      if (activeFilter === 'rare') return p.isRare;
      if (activeFilter === 'petsafe') return p.isPetSafe;
      return true;
    })
    .slice(0, 8);

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-cream/40 border-y border-forest/10 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header with Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-6 border-b border-forest/15"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-botanical mb-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              Customer Favorites
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-forest tracking-tight">
              Most Loved <span className="font-serif italic font-normal text-botanical">by Nature.</span>
            </h2>
          </div>

          {/* Filter Pills with animated tab indicator */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-4 py-2 text-xs font-sans tracking-editorial uppercase rounded-editorial transition-all duration-300 ${
                    isActive
                      ? 'bg-forest text-cream shadow-sm font-semibold'
                      : 'bg-white/80 text-charcoal/70 hover:bg-white hover:text-forest border border-forest/10'
                  }`}
                >
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* 8 Product Cards Grid with AnimatePresence Layout Physics */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA to view full catalog */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-8 text-center"
        >
          <Button to="/shop" variant="secondary" size="lg" icon={ArrowRight}>
            Explore All 16 Living Specimens
          </Button>
        </motion.div>
      </div>
    </section>
  );
}