import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import { customerTestimonials } from '../../data/homeContent';
import Rating from '../ui/Rating';

export default function CustomerTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  // Auto slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === customerTestimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? customerTestimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === customerTestimonials.length - 1 ? 0 : prev + 1));
  };

  const current = customerTestimonials[currentIndex];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-forest text-cream relative overflow-hidden select-none">
      {/* Background Subtle Gradient & Pattern */}
      <div className="absolute inset-0 bg-subtle-pattern-light opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-cream/10 text-sage text-[11px] uppercase font-mono tracking-widest border border-cream/15">
            <Quote className="w-3.5 h-3.5 text-sage" />
            Voices of Our Botanical Community
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-cream tracking-tight">
            Loved by Homes Across <span className="font-serif italic font-normal text-sage-200">the Country.</span>
          </h2>
          <p className="font-sans text-[11px] text-sage/70 uppercase tracking-widest">
            [ Demonstration Content · Verified Plant Collectors ]
          </p>
        </motion.div>

        {/* Testimonial Active Slide Card with AnimatePresence */}
        <div className="bg-forest-800/80 backdrop-blur-md rounded-editorial border border-forest-600 p-8 sm:p-14 shadow-floating relative min-h-[320px] flex items-center justify-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-8 text-center max-w-3xl mx-auto w-full"
            >
              {/* Stars */}
              <div className="flex justify-center">
                <Rating rating={current.rating} size="md" showScore={false} />
              </div>

              {/* Quote Body */}
              <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-cream font-normal leading-relaxed tracking-tight">
                "{current.quote}"
              </blockquote>

              {/* Author Information */}
              <div className="pt-4 border-t border-forest-700 space-y-1.5">
                <h4 className="font-serif text-lg font-medium text-cream flex items-center justify-center gap-2">
                  <span>{current.author}</span>
                  {current.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-sage bg-forest-900 px-2 py-0.5 rounded-pill border border-forest-700">
                      <ShieldCheck className="w-3 h-3 text-sage" />
                      Verified Collector
                    </span>
                  )}
                </h4>
                <p className="font-sans text-xs text-sage/80 tracking-wide">
                  {current.role}
                </p>
                <p className="font-sans text-xs text-cream/50 italic">
                  Cultivating: {current.plantPurchased}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Arrows & Dots */}
        <div className="flex items-center justify-between max-w-xs mx-auto pt-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={prevSlide}
            className="p-3 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors border border-cream/20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {customerTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-6 bg-sage' : 'w-2 bg-cream/30 hover:bg-cream/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={nextSlide}
            className="p-3 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors border border-cream/20"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}