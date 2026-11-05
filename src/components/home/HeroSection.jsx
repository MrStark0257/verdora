import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles, ShieldCheck, Sun, Leaf, Droplets } from 'lucide-react';
import Button from '../ui/Button';

// Word-by-word reveal variants
const titleContainer = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 * i },
  }),
};

const wordChild = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      damping: 18,
      stiffness: 120,
    },
  },
};

export default function HeroSection({ onOpenPlantFinder }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 16;
    const y = (clientY / innerHeight - 0.5) * 16;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[94vh] flex items-center justify-center overflow-hidden bg-forest text-cream select-none"
    >
      {/* Background Hero Botanical Photography with Subtle Mouse Parallax & Breathing Zoom */}
      <motion.div
        animate={{
          scale: [1.02, 1.05, 1.02],
          x: mousePos.x * -0.5,
          y: mousePos.y * -0.5,
        }}
        transition={{
          scale: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
          x: { type: 'spring', stiffness: 50, damping: 20 },
          y: { type: 'spring', stiffness: 50, damping: 20 },
        }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85"
          alt="Lush Botanical Interior Living Space"
          className="w-full h-full object-cover object-center"
        />
        {/* Multi-layered Dark Botanical Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-900/75 to-forest-950/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/60" />
      </motion.div>

      {/* Floating Organic Botanical Leaf Flourish (Top Right) */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 6, -3, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-16 right-8 sm:right-24 z-10 pointer-events-none opacity-20 hidden md:block"
      >
        <svg width="220" height="220" viewBox="0 0 200 200" fill="none">
          <path
            d="M50 180C50 180 80 120 160 80C140 120 100 160 50 180Z"
            fill="#A3B89B"
          />
          <path
            d="M30 140C70 120 120 70 180 30C150 70 100 110 30 140Z"
            fill="#315B40"
          />
          <circle cx="140" cy="60" r="4" fill="#F5F1E7" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Floating Organic Botanical Flourish (Bottom Left) */}
      <motion.div
        animate={{
          y: [0, 16, 0],
          rotate: [0, -5, 4, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-20 left-6 sm:left-16 z-10 pointer-events-none opacity-25 hidden md:block"
      >
        <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
          <path
            d="M20 160C40 100 110 60 170 40C130 90 80 140 20 160Z"
            fill="#A3B89B"
          />
        </svg>
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-12 py-24 sm:py-36 flex flex-col items-center text-center">
        {/* Animated Sub-badge with glowing pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cream/10 border border-cream/20 text-cream text-[11px] sm:text-xs font-sans tracking-widest uppercase mb-8 backdrop-blur-md shadow-subtle hover:bg-cream/15 transition-colors cursor-default"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
          </span>
          <span className="text-sage font-medium">Curated Botanical Living</span>
          <span className="text-cream/40">·</span>
          <span>Pan-India Climate Hardened</span>
        </motion.div>

        {/* Staggered Animated Headline */}
        <motion.h1
          variants={titleContainer}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-cream font-normal tracking-tight max-w-5xl leading-[1.06]"
        >
          <span className="inline-block overflow-hidden mr-3">
            <motion.span variants={wordChild} className="inline-block">
              Let
            </motion.span>
          </span>
          <span className="inline-block overflow-hidden mr-3">
            <motion.span variants={wordChild} className="inline-block">
              Nature
            </motion.span>
          </span>
          <span className="inline-block overflow-hidden mr-3">
            <motion.span variants={wordChild} className="inline-block">
              Find
            </motion.span>
          </span>
          <br className="hidden sm:inline" />
          <span className="inline-block overflow-hidden mr-3">
            <motion.span
              variants={wordChild}
              className="inline-block font-serif italic text-sage-200"
            >
              Its
            </motion.span>
          </span>
          <span className="inline-block overflow-hidden">
            <motion.span
              variants={wordChild}
              className="inline-block font-serif italic text-sage-200 underline decoration-sage/30 decoration-1 underline-offset-8"
            >
              Place.
            </motion.span>
          </span>
        </motion.h1>

        {/* Narrative Sub-description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-cream/80 font-sans leading-relaxed"
        >
          Discover a curated collection of beautiful indoor and outdoor plants designed to bring life, freshness and tranquility into your everyday spaces.
        </motion.p>

        {/* Action Buttons with Spring Hover Effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Button
              to="/shop"
              variant="light"
              size="lg"
              icon={ArrowRight}
              className="w-full sm:w-auto shadow-floating"
            >
              Explore Collection
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Button
              onClick={onOpenPlantFinder}
              variant="secondary-light"
              size="lg"
              icon={Compass}
              className="w-full sm:w-auto"
            >
              Find Your Plant
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated Key Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-16 sm:mt-24 pt-8 border-t border-cream/15 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 w-full max-w-4xl text-left"
        >
          <motion.div
            whileHover={{ y: -3 }}
            className="space-y-1 transition-transform"
          >
            <span className="font-serif text-2xl sm:text-4xl text-sage font-bold block">
              50+
            </span>
            <span className="font-sans text-xs uppercase tracking-wider text-cream/70 font-medium">
              Living Cultivars
            </span>
            <p className="text-[11px] text-cream/50 leading-tight">
              Indoor, outdoor & rare
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="space-y-1 transition-transform"
          >
            <span className="font-serif text-2xl sm:text-4xl text-sage font-bold block">
              100%
            </span>
            <span className="font-sans text-xs uppercase tracking-wider text-cream/70 font-medium">
              Peat-Free Substrate
            </span>
            <p className="text-[11px] text-cream/50 leading-tight">
              Sustainable coir blend
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="space-y-1 transition-transform"
          >
            <span className="font-serif text-2xl sm:text-4xl text-sage font-bold block">
              14 Days
            </span>
            <span className="font-sans text-xs uppercase tracking-wider text-cream/70 font-medium">
              Vitality Guarantee
            </span>
            <p className="text-[11px] text-cream/50 leading-tight">
              Zero-risk transit promise
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="space-y-1 transition-transform"
          >
            <span className="font-serif text-2xl sm:text-4xl text-sage font-bold block">
              4.9★
            </span>
            <span className="font-sans text-xs uppercase tracking-wider text-cream/70 font-medium">
              Botanical Rating
            </span>
            <p className="text-[11px] text-cream/50 leading-tight">
              Over 2,400+ sanctuaries
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}