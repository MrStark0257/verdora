import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';

export default function FeaturedCollection() {
  return (
    <section className="py-24 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Header with reveal animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-16 space-y-4"
      >
        <span className="font-sans text-xs uppercase tracking-widest text-botanical font-semibold block">
          Editorial Curation · Volume I
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-forest tracking-tight">
          Bring the <span className="font-serif italic font-normal text-botanical">Outdoors In.</span>
        </h2>
        <p className="font-sans text-sm sm:text-base text-charcoal/70 leading-relaxed">
          Explore architectural greenery engineered for tranquil indoor living. Elevate morning routines and quiet reading nooks with living organic design.
        </p>
      </motion.div>

      {/* Asymmetric Editorial Collage Layout with Staggered Motion */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Tall Focus Card with Floating Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, x: -20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 relative group rounded-editorial overflow-hidden shadow-floating bg-cream aspect-[16/10] sm:aspect-[4/3]"
        >
          <img
            src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1400&q=85"
            alt="Indoor botanical living curation"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-900/20 to-transparent" />

          {/* Floating Tag */}
          <div className="absolute bottom-6 left-6 right-6 text-cream space-y-1 z-10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-sage block">
              Indoor Sanctuary Collection
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-cream font-medium">
              The Fenestrated Collection
            </h3>
            <p className="text-xs text-cream/80 max-w-md">
              Selected tropical monsters and ficus specimens curated for light-filled rooms.
            </p>
          </div>
        </motion.div>

        {/* Right Stacked Editorial Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Top Feature Card with Zoom */}
          <div className="group relative rounded-editorial overflow-hidden shadow-elevated bg-cream aspect-[16/9]">
            <img
              src="https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=800&q=80"
              alt="Calathea Foliage Details"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-forest-950/40 group-hover:bg-forest-950/20 transition-colors" />
            <div className="absolute bottom-4 left-4 text-cream">
              <span className="font-serif italic text-base text-cream">Nocturnal Prayer Foliage</span>
            </div>
          </div>

          {/* Editorial Highlights Box with Hover Lift */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-8 bg-cream/60 rounded-editorial border border-forest/10 space-y-5 shadow-subtle transition-shadow"
          >
            <h4 className="font-serif text-xl text-forest font-semibold">
              Why Indoor Greenery Matters
            </h4>
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-charcoal/80">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-botanical shrink-0 mt-0.5" />
                <span>Filters airborne volatile compounds and generates restorative moisture.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-botanical shrink-0 mt-0.5" />
                <span>Biophilic presence shown to reduce cortisol stress markers by 37%.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-botanical shrink-0 mt-0.5" />
                <span>Anchors architectural interior spaces with sculpted living form.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Button to="/collections/indoor" variant="primary" size="md" icon={ArrowRight}>
                Shop Indoor Collection
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}