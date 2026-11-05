import React, { useState } from 'react';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';
import { products } from '../data/products';
import {
  Compass,
  Home,
  Sun,
  Droplets,
  Leaf,
  Flower2,
  Sparkles,
  ShieldCheck,
  Check,
  RotateCcw,
  ArrowRight,
  Building2,
  Bed,
  Layers,
  Heart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlantFinder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    space: '',
    light: '',
    maintenance: '',
    aesthetic: '',
    petSafe: false,
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = [
    {
      id: 1,
      title: 'Target Environment',
      question: 'Which living space are you looking to transform?',
      subtitle: 'Each room has unique humidity and airflow dynamics.',
      options: [
        { label: 'Living Room Sanctuary', value: 'Living Room', icon: Home, desc: 'Central gathering space with ambient airflow' },
        { label: 'Tranquil Bedroom', value: 'Bedroom', icon: Bed, desc: 'Calming retreat; oxygen-producing varieties thrive here' },
        { label: 'Balcony or Garden Patio', value: 'Balcony', icon: Sun, desc: 'Sheltered outdoor space with direct outdoor elements' },
        { label: 'Office or Work Studio', value: 'Office', icon: Building2, desc: 'Air-conditioned space with artificial and ambient light' },
      ],
    },
    {
      id: 2,
      title: 'Sunlight Exposure',
      question: 'How much natural sunlight bathes this location?',
      subtitle: 'Light fuels chlorophyll synthesis. Be as accurate as possible.',
      options: [
        { label: 'Low Ambient Light', value: 'Low', icon: Sparkles, desc: 'A few feet away from north windows; gentle soft shade' },
        { label: 'Medium Indirect Light', value: 'Medium', icon: Sun, desc: 'Bright, diffused room illumination without scorching sun' },
        { label: 'Bright Filtered Sunlight', value: 'Bright', icon: Sun, desc: 'East/West windows with warm filtered morning or afternoon light' },
        { label: 'Direct Blistering Sun', value: 'Direct', icon: Sun, desc: 'Unobstructed sunlight pouring in for 4+ hours daily' },
      ],
    },
    {
      id: 3,
      title: 'Care Commitment',
      question: 'What is your hydration and care commitment level?',
      subtitle: 'There is a perfect plant for every daily schedule.',
      options: [
        { label: 'Loving Neglect (Minimal)', value: 'Minimal', icon: Droplets, desc: 'Water once every 2–3 weeks. Resilient and forgiving.' },
        { label: 'Mindful Routine (Moderate)', value: 'Moderate', icon: Droplets, desc: 'Weekly watering and light leaf dusting routine.' },
        { label: 'Botanical Passion (Dedicated)', value: 'Dedicated', icon: Droplets, desc: 'Daily misting, humidity checks, and active propagation.' },
      ],
    },
    {
      id: 4,
      title: 'Foliage Aesthetic',
      question: 'Which visual mood speaks to your interior design style?',
      subtitle: 'Select the botanical presence you desire.',
      options: [
        { label: 'Lush Architectural Greenery', value: 'Green', icon: Leaf, desc: 'Dramatic tropical fenestrations and broad glossy leaves' },
        { label: 'Fragrant Floral Blooms', value: 'Flowering', icon: Flower2, desc: 'Delicate blossoms, porcelain petals, and natural scent' },
        { label: 'Sculptural Succulents', value: 'Succulents', icon: Sparkles, desc: 'Geometric rosettes, trailing beads, and desert forms' },
        { label: 'NASA Air Purifiers', value: 'AirPurifier', icon: ShieldCheck, desc: 'Clinically proven botanical air scrubbers' },
      ],
    },
    {
      id: 5,
      title: 'Household Safety',
      question: 'Do you share your space with curious cats or dogs?',
      subtitle: 'We filter out any specimens that contain natural calcium oxalates.',
      options: [
        { label: 'Yes, 100% Non-Toxic & Pet-Safe Only', value: 'true', icon: ShieldCheck, desc: 'Completely harmless if accidentally nibbled' },
        { label: 'No Pets / Kept Safely Out of Reach', value: 'false', icon: Layers, desc: 'Show all botanical varieties without restriction' },
      ],
    },
  ];

  const handleSelect = (val) => {
    if (currentStep === 5) {
      setAnswers((prev) => ({ ...prev, petSafe: val === 'true' }));
      setIsCompleted(true);
    } else {
      const stepKey = ['space', 'light', 'maintenance', 'aesthetic'][currentStep - 1];
      setAnswers((prev) => ({ ...prev, [stepKey]: val }));
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setAnswers({ space: '', light: '', maintenance: '', aesthetic: '', petSafe: false });
    setCurrentStep(1);
    setIsCompleted(false);
  };

  // Algorithm matching
  const matchedProducts = products
    .map((p) => {
      let score = 50;

      // Pet safe filter is mandatory if selected
      if (answers.petSafe && !p.isPetSafe) return null;

      // Space
      if (answers.space === 'Balcony' && (p.category === 'outdoor' || p.category === 'flowering')) score += 20;
      if (answers.space === 'Living Room' && p.category === 'indoor') score += 20;
      if (answers.space === 'Bedroom' && p.isAirPurifier) score += 22;
      if (answers.space === 'Office' && (p.difficulty === 'Easy' || p.isAirPurifier)) score += 20;

      // Light
      if (answers.light === 'Low' && (p.sunlight?.includes('Low') || p.difficulty === 'Easy')) score += 18;
      if (answers.light === 'Medium' && p.sunlight?.includes('Medium')) score += 18;
      if (answers.light === 'Bright' && p.sunlight?.includes('Bright')) score += 18;
      if (answers.light === 'Direct' && (p.sunlight?.includes('Direct') || p.category === 'outdoor')) score += 20;

      // Maintenance
      if (answers.maintenance === 'Minimal' && p.difficulty === 'Easy') score += 16;
      if (answers.maintenance === 'Moderate' && (p.difficulty === 'Moderate' || p.difficulty === 'Easy')) score += 16;
      if (answers.maintenance === 'Dedicated') score += 15;

      // Aesthetic
      if (answers.aesthetic === 'Green' && p.category === 'indoor') score += 14;
      if (answers.aesthetic === 'Flowering' && p.category === 'flowering') score += 20;
      if (answers.aesthetic === 'Succulents' && p.category === 'succulents') score += 20;
      if (answers.aesthetic === 'AirPurifier' && p.isAirPurifier) score += 20;

      const finalScore = Math.min(99, score);
      return { ...p, matchScore: finalScore };
    })
    .filter(Boolean)
    .sort((a, b) => b.matchScore - a.matchScore);

  const activeStepObj = steps.find((s) => s.id === currentStep);

  return (
    <div className="min-h-screen bg-offwhite text-charcoal flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 sm:px-12 py-12 w-full space-y-12">
        {/* Editorial Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-forest/10 text-forest text-xs uppercase font-mono tracking-widest">
            <Compass className="w-3.5 h-3.5 text-botanical" />
            Interactive Plant Diagnostic
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-forest tracking-tight">
            The Botanical Matchmaker
          </h1>
          <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed">
            Every home possesses a unique microclimate. Our 5-step diagnostic analyzes light contours, room dynamics, and care habits to match you with thriving living companions.
          </p>
        </div>

        {/* Wizard Container */}
        {!isCompleted ? (
          <div className="bg-white rounded-editorial border border-forest/15 shadow-floating p-6 sm:p-12 max-w-4xl mx-auto">
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-forest/10">
              <span className="font-mono text-xs uppercase tracking-widest text-forest font-semibold">
                Step {currentStep} of 5 · {activeStepObj?.title}
              </span>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
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

            {/* Step Content */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-forest tracking-tight">
                  {activeStepObj?.question}
                </h2>
                <p className="font-sans text-xs sm:text-sm text-charcoal/60 mt-1">
                  {activeStepObj?.subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeStepObj?.options.map((opt) => {
                  const IconComponent = opt.icon;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      className="group text-left p-6 rounded-editorial border border-forest/15 bg-offwhite hover:bg-cream hover:border-forest/40 transition-all duration-300 flex items-start gap-4 hover:-translate-y-0.5 shadow-subtle hover:shadow-elevated"
                    >
                      <div className="p-3 rounded-editorial bg-forest/5 text-forest group-hover:bg-forest group-hover:text-cream transition-colors shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="space-y-1">
                        <span className="font-serif font-medium text-base sm:text-lg block text-forest group-hover:text-botanical transition-colors">
                          {opt.label}
                        </span>
                        <span className="text-xs text-charcoal/60 leading-relaxed block font-sans">
                          {opt.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Back Button */}
              {currentStep > 1 && (
                <div className="pt-4 flex justify-start">
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="text-xs uppercase font-sans tracking-widest text-charcoal/60 hover:text-forest underline"
                  >
                    &larr; Previous Step
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="space-y-10 animate-fadeIn max-w-6xl mx-auto">
            {/* Results Diagnostic Card */}
            <div className="bg-white p-6 sm:p-8 rounded-editorial border border-forest/15 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-botanical font-semibold">
                  <Check className="w-4 h-4" />
                  Diagnostic Complete
                </span>
                <h2 className="font-serif text-3xl text-forest">
                  Your Curated Botanical Recommendations
                </h2>
                <div className="flex flex-wrap gap-2 text-xs font-sans text-charcoal/70 pt-1">
                  <span className="px-2.5 py-0.5 bg-cream rounded-editorial border border-forest/10">
                    Room: {answers.space}
                  </span>
                  <span className="px-2.5 py-0.5 bg-cream rounded-editorial border border-forest/10">
                    Light: {answers.light}
                  </span>
                  <span className="px-2.5 py-0.5 bg-cream rounded-editorial border border-forest/10">
                    Care: {answers.maintenance}
                  </span>
                  {answers.petSafe && (
                    <span className="px-2.5 py-0.5 bg-botanical/15 text-botanical font-medium rounded-editorial border border-botanical/20">
                      100% Pet-Safe Only
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs uppercase font-sans tracking-editorial text-forest hover:text-botanical border border-forest/20 hover:border-forest rounded-editorial transition-colors self-start md:self-auto shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Diagnostic
              </button>
            </div>

            {/* Matched Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {matchedProducts.map((p) => (
                <div key={p.id} className="relative">
                  <div className="absolute -top-3 left-3 z-20 bg-forest text-cream text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-pill shadow-sm border border-forest-800">
                    {p.matchScore}% Match
                  </div>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
