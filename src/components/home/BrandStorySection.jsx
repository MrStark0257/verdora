import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export default function BrandStorySection() {
  return (
    <section className="py-24 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Editorial Photography Composition */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-6 relative"
        >
          {/* Main Large Botanical Photograph */}
          <div className="relative rounded-editorial overflow-hidden shadow-floating bg-cream aspect-[4/5] group">
            <img
              src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=85"
              alt="Botanical living sanctuary by VERDORA"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-forest/10 mix-blend-multiply" />
          </div>

          {/* Floating Offset Secondary Image with Continuous Float */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden sm:block absolute -bottom-10 -right-8 w-56 h-64 rounded-editorial overflow-hidden border-8 border-offwhite shadow-floating bg-white z-10"
          >
            <img
              src="https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=600&q=80"
              alt="Healthy foliage care"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Floating Organic Quality Seal with Slow Spin */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute -top-6 -left-6 bg-forest text-cream p-4 rounded-editorial shadow-elevated border border-forest-800 flex items-center gap-3 z-10 backdrop-blur-md"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              <Leaf className="w-5 h-5 text-sage" />
            </motion.div>
            <div className="text-left font-sans">
              <span className="block text-[10px] uppercase font-mono tracking-widest text-sage">EST. 2024</span>
              <span className="block text-xs font-semibold tracking-wide">Cultivated with Care</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Editorial Narrative Storytelling */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="lg:col-span-6 space-y-8 lg:pl-6"
        >
          <div>
            <span className="font-sans text-xs uppercase tracking-widest text-botanical font-semibold block mb-3">
              The VERDORA Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-forest tracking-tight leading-[1.15]">
              A Greener <br />
              <span className="font-serif italic font-normal text-botanical">Way to Live.</span>
            </h2>
          </div>

          <div className="space-y-5 text-charcoal/80 font-sans text-sm sm:text-base leading-relaxed">
            <p>
              We believe a home is never truly complete without the quiet architecture of living plants. In an era dominated by screens and concrete, welcoming nature into your daily living space is an intentional act of well-being.
            </p>
            <p>
              VERDORA was founded to bridge the gap between commercial industrial nurseries and high-design interior living. Every specimen in our botanical gallery is grown in specialized small-batch greenhouses, climate-hardened for modern homes, and paired with handcrafted earthen vessels.
            </p>
          </div>

          {/* Editorial Italic Quote Block */}
          <motion.div
            whileHover={{ x: 4 }}
            className="p-6 bg-cream/70 rounded-editorial border-l-4 border-botanical shadow-subtle space-y-2 transition-transform"
          >
            <p className="font-serif text-editorial-italic text-lg text-forest">
              "To nurture a plant is to enter into a patient dialogue with time, light, and seasons. It softens our spaces and anchors our days."
            </p>
            <span className="block text-xs font-sans uppercase tracking-widest text-charcoal/60 font-semibold">
              — VERDORA Editorial Collective
            </span>
          </motion.div>

          {/* Pillars List */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <h4 className="font-serif font-medium text-forest text-base mb-1">Small-Batch Grown</h4>
              <p className="text-xs text-charcoal/60 leading-relaxed">
                Hand-potted with organic soil blends tuned to individual root architectures.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-medium text-forest text-base mb-1">Lifelong Guidance</h4>
              <p className="text-xs text-charcoal/60 leading-relaxed">
                Personalized care schedules and direct diagnostic access to certified botanists.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Button to="/about" variant="primary" size="md" icon={ArrowRight}>
              Read Our Full Story
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}