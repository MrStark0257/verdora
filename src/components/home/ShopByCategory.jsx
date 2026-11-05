import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { categories } from '../../data/products';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
};

export default function ShopByCategory() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header with Scroll-triggered Fade */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
      >
        <div>
          <span className="font-sans text-xs uppercase tracking-widest text-botanical font-semibold block mb-2">
            Curated Plant Families
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-forest tracking-tight">
            Find Your <span className="font-serif italic font-normal text-botanical">Green.</span>
          </h2>
        </div>
        <p className="font-sans text-sm text-charcoal/70 max-w-md leading-relaxed">
          From sculptural living room statements to resilient desert rosettes and rare variegated collector gems.
        </p>
      </motion.div>

      {/* 6 Category Cards Grid with Staggered Entrance */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Link
              to={`/collections/${cat.slug}`}
              className="group relative h-[380px] sm:h-[420px] rounded-editorial overflow-hidden bg-forest shadow-subtle hover:shadow-floating transition-all duration-500 flex flex-col justify-end p-6 sm:p-8 block"
            >
              {/* Background Category Image with Smooth Zoom */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Editorial Multi-stop Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-900/50 to-transparent transition-opacity duration-300 group-hover:from-forest-950" />

              {/* Category Number Accent with gentle slide */}
              <span className="absolute top-6 right-6 font-serif text-xl sm:text-2xl text-cream/40 font-light group-hover:text-cream/90 transition-all duration-300 group-hover:-translate-y-1">
                0{idx + 1}
              </span>

              {/* Category Text & Action */}
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-sage block">
                  {cat.itemCount} Cultivars
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl text-cream tracking-tight group-hover:text-sage transition-colors">
                  {cat.name}
                </h3>

                <p className="font-sans text-xs text-cream/80 line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100">
                  {cat.tagline || cat.description}
                </p>

                <div className="pt-3 flex items-center gap-2 text-xs uppercase tracking-editorial font-medium text-cream group-hover:text-sage transition-all">
                  <span>Explore Specimens</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}