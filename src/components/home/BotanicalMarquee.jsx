import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Leaf, Award, ShieldCheck, Sun, Droplets, Heart } from 'lucide-react';

const MARQUEE_ITEMS = [
  { icon: Leaf, text: 'Rare Variegated Cultivars' },
  { icon: Sparkles, text: '100% Peat-Free Organic Substrate' },
  { icon: ShieldCheck, text: '14-Day Living Plant Guarantee' },
  { icon: Droplets, text: 'Climate-Controlled Specialized Transit' },
  { icon: Award, text: 'Handcrafted Unglazed Terracotta Vessels' },
  { icon: Sun, text: 'Solar-Powered Pune Greenhouse Ateliers' },
  { icon: Heart, text: 'Direct Care Access to Master Botanists' },
  { icon: Leaf, text: 'NASA-Studied Natural Air Purifiers' },
];

export default function BotanicalMarquee() {
  return (
    <div className="relative py-4 bg-forest text-cream overflow-hidden border-y border-forest-800 select-none">
      {/* Subtle side fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-forest to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-forest to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling motion container */}
      <div className="flex w-max">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 28,
            ease: 'linear',
            repeat: Infinity,
          }}
          className="flex items-center gap-8 sm:gap-12 text-xs sm:text-sm font-sans tracking-widest uppercase font-medium"
        >
          {/* Double array for seamless loop */}
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3 shrink-0 group cursor-default">
                <span className="w-6 h-6 rounded-full bg-cream/10 border border-sage/30 flex items-center justify-center text-sage group-hover:bg-sage group-hover:text-forest transition-colors duration-300">
                  <Icon className="w-3 h-3" />
                </span>
                <span className="text-cream/90 group-hover:text-sage transition-colors duration-300 font-serif italic tracking-wider text-sm sm:text-base">
                  {item.text}
                </span>
                <span className="text-sage/40 text-xs font-mono ml-4">✦</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
