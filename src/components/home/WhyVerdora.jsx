import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, PackageCheck, Sparkles } from 'lucide-react';
import { whyChooseUsFeatures } from '../../data/homeContent';

const iconMap = {
  Leaf,
  ShieldCheck,
  PackageCheck,
  Sparkles,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const pillarVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 18,
    },
  },
};

export default function WhyVerdora() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl mx-auto mb-16 space-y-3"
      >
        <span className="font-sans text-xs uppercase tracking-widest text-botanical font-semibold block">
          The Botanical Standard
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-forest tracking-tight">
          Why Discerning Collectors Choose <span className="font-serif italic font-normal text-botanical">VERDORA.</span>
        </h2>
        <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
          Crafted from root to leaf to ensure vibrant, thriving living elements for your home.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {whyChooseUsFeatures.map((feat, idx) => {
          const IconComponent = iconMap[feat.iconName] || Leaf;

          return (
            <motion.div
              key={feat.id}
              variants={pillarVariants}
              whileHover={{ y: -8 }}
              className="p-8 bg-cream/50 rounded-editorial border border-forest/10 shadow-subtle hover:shadow-elevated transition-shadow duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-editorial bg-forest text-cream flex items-center justify-center shadow-sm group-hover:bg-botanical transition-colors duration-300"
                >
                  <IconComponent className="w-6 h-6 text-sage" />
                </motion.div>

                <h3 className="font-serif text-xl text-forest font-medium group-hover:text-botanical transition-colors">
                  {feat.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-2 border-t border-forest/10 flex items-center justify-between text-[11px] font-mono text-charcoal/40 uppercase">
                <span>Pillar 0{idx + 1}</span>
                <span className="text-botanical font-semibold group-hover:text-forest transition-colors">
                  Standard
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}