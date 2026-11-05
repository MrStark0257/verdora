import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  ArrowRight,
  RotateCcw,
  Sun,
  Home,
  Building2,
  Sparkles,
  Droplets,
  Flower2,
  Leaf,
  Check,
} from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';
import Button from '../ui/Button';

export default function InteractivePlantFinder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    space: '',
    light: '',
    maintenance: '',
    aesthetic: '',
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = [
    {
      id: 1,
      key: 'space',
      question: 'Where will your new botanical companion live?',
      subtitle: 'Select the primary space you wish to transform.',
      options: [
        { label: 'Indoor Living Room / Bedroom', value: 'Indoor', icon: Home, desc: 'Filtered ambient indoor atmosphere' },
        { label: 'Outdoor Garden / Patio', value: 'Outdoor', icon: Sun, desc: 'Open-air, weathered natural environment' },
        { label: 'Covered Balcony / Terrace', value: 'Balcony', icon: Sparkles, desc: 'Semi-open sheltered with fresh air' },
        { label: 'Office / Study Desk', value: 'Office', icon: Building2, desc: 'Air-conditioned workspace with artificial light' },
      ],
    },
    {
      id: 2,
      key: 'light',
      question: 'What type of sunlight does this spot receive?',
      subtitle: 'Lighting is the lifeblood of botanical vitality.',
      options: [
        { label: 'Low Ambient Light', value: 'Low', icon: Sparkles, desc: 'Few feet away from north window; gentle shade' },
        { label: 'Medium Indirect Light', value: 'Medium', icon: Sun, desc: 'Dappled, bright filtered room illumination' },
        { label: 'Bright Direct Sunlight', value: 'Bright', icon: Sun, desc: 'South/West windows with several hours of sunshine' },
      ],
    },
    {
      id: 3,
      key: 'maintenance',
      question: 'What is your preferred maintenance commitment?',
      subtitle: 'Be honest—there are plants that thrive on loving neglect!',
      options: [
        { label: 'Minimal (Low Effort)', value: 'Minimal', icon: Droplets, desc: 'Water once every 2–3 weeks. Indestructible.' },
        { label: 'Moderate (Weekly Routine)', value: 'Moderate', icon: Droplets, desc: 'Weekly watering and light monthly leaf dusting.' },
        { label: 'High (Botanical Passion)', value: 'High', icon: Droplets, desc: 'Dedicated misting, humidity checks & pruning.' },
      ],
    },
    {
      id: 4,
      key: 'aesthetic',
      question: 'Which visual aesthetic speaks to your style?',
      subtitle: 'Choose the visual foliage mood you desire.',
      options: [
        { label: 'Lush Green Foliage', value: 'Green', icon: Leaf, desc: 'Dramatic tropical fenestrations and architectural leaves' },
        { label: 'Flowering & Blooms', value: 'Flowering', icon: Flower2, desc: 'Pristine spathes, delicate petals, seasonal color' },
        { label: 'Sculptural Succulents', value: 'Succulents', icon: Sparkles, desc: 'Geometric rosettes and cascading desert pearls' },
        { label: 'Surprise Me (Any)', value: 'Any', icon: Compass, desc: 'Show me the highest-rated all-round match' },
      ],
    },
  ];

  const handleSelectOption = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({ space: '', light: '', maintenance: '', aesthetic: '' });
    setCurrentStep(1);
    setIsCompleted(false);
  };

  // Algorithm to rank and score recommendations
  const getRecommendedProducts = () => {
    return products
      .map((p) => {
        let score = 0;
        // Space matching
        if (answers.space === 'Outdoor' && p.category === 'outdoor') score += 35;
        if (answers.space === 'Indoor' && p.category === 'indoor') score += 35;
        if (answers.space === 'Office' && (p.difficulty === 'Easy' || p.isAirPurifier)) score += 35;
        if (answers.space === 'Balcony') score += 30;

        // Light matching
        if (answers.light === 'Low' && (p.sunlight?.includes('Low') || p.difficulty === 'Easy')) score += 30;
        if (answers.light === 'Medium' && p.sunlight?.includes('Medium')) score += 30;
        if (answers.light === 'Bright' && p.sunlight?.includes('Bright')) score += 30;

        // Maintenance matching
        if (answers.maintenance === 'Minimal' && p.difficulty === 'Easy') score += 25;
        if (answers.maintenance === 'Moderate' && (p.difficulty === 'Moderate' || p.difficulty === 'Easy')) score += 25;
        if (answers.maintenance === 'High') score += 25;

        // Aesthetic matching
        if (answers.aesthetic === 'Green' && p.category === 'indoor') score += 20;
        if (answers.aesthetic === 'Flowering' && p.category === 'flowering') score += 35;
        if (answers.aesthetic === 'Succulents' && p.category === 'succulents') score += 35;
        if (answers.aesthetic === 'Any') score += 20;

        return { ...p, matchScore: Math.min(99, 68 + score) };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  };

  const recommendedProducts = getRecommendedProducts();

  return (
    <section id="plant-finder-section" className="py-24 sm:py-32 px-6 sm:px-12 bg-cream/70 border-y border-forest/15 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-forest/10 text-forest text-xs uppercase font-mono tracking-widest font-semibold">
            <Compass className="w-3.5 h-3.5 text-botanical" />
            Interactive Plant Diagnostic
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-forest tracking-tight">
            Find Your <span className="font-serif italic font-normal text-botanical">Perfect Match.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-charcoal/70 leading-relaxed">
            Answer 4 simple lifestyle questions and let our botanical algorithm recommend the ideal species for your unique microclimate.
          </p>
        </motion.div>

        {/* Multi-step Quiz Container */}
        {!isCompleted ? (
          <div className="bg-white rounded-editorial shadow-floating border border-forest/15 p-6 sm:p-12">
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-forest/10">
              <span className="font-mono text-xs uppercase tracking-widest text-forest font-semibold">
                Question {currentStep} of 4
              </span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-pill transition-all duration-300 ${
                      s === currentStep
                        ? 'w-8 bg-forest'
                        : s < currentStep
                        ? 'w-4 bg-botanical'
                        : 'w-4 bg-cream-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Active Question Content with AnimatePresence */}
            <AnimatePresence mode="wait">
              {steps
                .filter((s) => s.id === currentStep)
                .map((step) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl text-forest tracking-tight font-medium">
                        {step.question}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-charcoal/60 mt-1">
                        {step.subtitle}
                      </p>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {step.options.map((opt) => {
                        const IconComponent = opt.icon;
                        const isSelected = answers[step.key] === opt.value;

                        return (
                          <motion.button
                            key={opt.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() => handleSelectOption(step.key, opt.value)}
                            className={`group text-left p-5 sm:p-6 rounded-editorial border transition-all duration-300 flex items-start gap-4 ${
                              isSelected
                                ? 'bg-forest text-cream border-forest shadow-elevated scale-[1.01]'
                                : 'bg-offwhite hover:bg-cream text-charcoal border-forest/15 hover:border-forest/40'
                            }`}
                          >
                            <div
                              className={`p-3 rounded-editorial shrink-0 transition-colors ${
                                isSelected
                                  ? 'bg-cream text-forest'
                                  : 'bg-forest/5 text-forest group-hover:bg-forest group-hover:text-cream'
                              }`}
                            >
                              <IconComponent className="w-5 h-5" />
                            </div>

                            <div className="space-y-1">
                              <span className="font-serif font-medium text-base sm:text-lg block">
                                {opt.label}
                              </span>
                              <span
                                className={`text-xs block leading-relaxed ${
                                  isSelected ? 'text-cream/80' : 'text-charcoal/60'
                                }`}
                              >
                                {opt.desc}
                              </span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Back Navigation */}
                    {currentStep > 1 && (
                      <div className="pt-4 flex justify-start">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(currentStep - 1)}
                          className="text-xs uppercase font-sans tracking-widest text-charcoal/60 hover:text-forest underline"
                        >
                          &larr; Previous Question
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Recommended Results View with Spring Reveal */
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-white rounded-editorial shadow-floating border border-forest/15 p-6 sm:p-12 space-y-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold block mb-1">
                  Diagnostic Results Complete
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-forest font-bold">
                  Recommended Botanical Cultivars
                </h3>
                <p className="text-xs text-charcoal/60 mt-1">
                  Based on: {answers.space} space · {answers.light} light · {answers.maintenance} maintenance · {answers.aesthetic} style.
                </p>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs uppercase font-sans tracking-editorial text-forest hover:text-botanical font-medium transition-colors border border-forest/20 hover:border-forest px-4 py-2 rounded-editorial"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>

            {/* 3 Matched Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {recommendedProducts.map((prod) => (
                <div key={prod.id} className="relative">
                  <div className="absolute -top-3 left-4 z-20 bg-forest text-cream text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm border border-sage/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-sage" />
                    <span>{prod.matchScore}% Match</span>
                  </div>
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Button to="/shop" variant="secondary" size="md" icon={ArrowRight}>
                View All Living Catalog Specimens
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}