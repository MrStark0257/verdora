import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import {
  careCategories,
  careArticlesFull,
  plantDoctorSymptoms,
  speciesCareSheets,
} from '../data/plantCareData';
import {
  BookOpen,
  Stethoscope,
  Clock,
  ArrowRight,
  Sun,
  Droplets,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

export default function PlantCare() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedSymptom, setSelectedSymptom] = useState(plantDoctorSymptoms[0]);
  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'doctor' | 'species'

  const filteredArticles = activeCategory === 'all'
    ? careArticlesFull
    : careArticlesFull.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-offwhite text-charcoal flex flex-col">
      <AnnouncementBar />
      <Navbar />

      {/* Editorial Header Banner */}
      <section className="bg-forest text-cream py-16 sm:py-24 px-6 sm:px-12 border-b border-forest-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-subtle-pattern-light opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-sage px-3 py-1 rounded-pill bg-cream/10 border border-cream/20">
            <BookOpen className="w-3.5 h-3.5" />
            VERDORA Botanical Institute
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-cream tracking-tight">
            The Plant Care Journal & Clinic
          </h1>

          <p className="font-sans text-xs sm:text-base text-cream/80 leading-relaxed">
            Science-grounded botanical regimens, diagnostic symptom checklists, and living guides to help your indoor jungle flourish across every season.
          </p>
        </div>
      </section>

      {/* Navigation Mode Switcher Bar */}
      <div className="bg-cream/80 border-b border-forest/15 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-center gap-2 sm:gap-4 py-3 font-sans text-xs sm:text-sm">
          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 rounded-editorial font-medium transition-colors relative ${
              activeTab === 'articles'
                ? 'text-cream font-semibold'
                : 'text-charcoal/70 hover:text-forest'
            }`}
          >
            {activeTab === 'articles' && (
              <motion.span
                layoutId="careTabIndicator"
                className="absolute inset-0 bg-forest rounded-editorial -z-10 shadow-sm"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            Care Articles & Guides
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('doctor')}
            className={`px-4 py-2 rounded-editorial font-medium transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'doctor'
                ? 'text-cream font-semibold'
                : 'text-charcoal/70 hover:text-forest'
            }`}
          >
            {activeTab === 'doctor' && (
              <motion.span
                layoutId="careTabIndicator"
                className="absolute inset-0 bg-forest rounded-editorial -z-10 shadow-sm"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <Stethoscope className="w-4 h-4 text-sage" />
            <span>Plant Doctor Diagnostic</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('species')}
            className={`px-4 py-2 rounded-editorial font-medium transition-colors relative ${
              activeTab === 'species'
                ? 'text-cream font-semibold'
                : 'text-charcoal/70 hover:text-forest'
            }`}
          >
            {activeTab === 'species' && (
              <motion.span
                layoutId="careTabIndicator"
                className="absolute inset-0 bg-forest rounded-editorial -z-10 shadow-sm"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            Species Reference Sheets
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-12 py-12 w-full space-y-16">
        {/* ============================================== */}
        {/* TAB 1: CARE ARTICLES & GUIDES */}
        {/* ============================================== */}
        {activeTab === 'articles' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-forest/15">
              <span className="text-xs font-mono uppercase text-charcoal/50 mr-2">Topic:</span>
              {careCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(c.id);
                    setSelectedArticle(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-editorial text-xs font-sans tracking-editorial uppercase transition-all ${
                    activeCategory === c.id
                      ? 'bg-forest text-cream font-medium shadow-sm'
                      : 'bg-white text-charcoal/70 hover:bg-cream border border-forest/10'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Article Detail View or Grid */}
            {selectedArticle ? (
              <div className="bg-white rounded-editorial border border-forest/15 shadow-floating p-6 sm:p-12 space-y-8 max-w-4xl mx-auto">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs uppercase font-sans tracking-widest text-forest font-semibold hover:underline inline-flex items-center gap-1.5"
                >
                  &larr; Back to All Care Guides
                </button>

                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold">
                    {selectedArticle.categoryLabel} · {selectedArticle.readTime}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-5xl text-forest tracking-tight">
                    {selectedArticle.title}
                  </h2>
                  <p className="text-xs text-charcoal/50 font-mono">
                    By {selectedArticle.author} · {selectedArticle.date}
                  </p>
                </div>

                <div className="aspect-[16/9] w-full rounded-editorial overflow-hidden bg-cream shadow-subtle">
                  <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-6 text-charcoal/80 font-sans text-sm sm:text-base leading-relaxed">
                  <p className="text-base sm:text-lg font-serif italic text-forest border-l-4 border-botanical pl-4 py-1">
                    "{selectedArticle.summary}"
                  </p>

                  {selectedArticle.content.map((sec, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="font-serif text-xl sm:text-2xl text-forest font-medium">
                        {sec.heading}
                      </h3>
                      <p className="text-charcoal/75 leading-relaxed">{sec.body}</p>
                    </div>
                  ))}
                </div>

                {selectedArticle.tips && (
                  <div className="p-6 bg-cream/70 rounded-editorial border border-forest/10 space-y-3">
                    <h4 className="font-serif text-lg text-forest flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-botanical" />
                      Key Botanical Takeaways
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm font-sans text-charcoal/80">
                      {selectedArticle.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-botanical shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="group bg-white rounded-editorial border border-forest/10 overflow-hidden shadow-subtle hover:shadow-floating transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] uppercase font-mono tracking-wider text-forest font-semibold">
                          {article.categoryLabel}
                        </div>
                      </div>

                      <div className="p-6 sm:p-8 space-y-3">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-charcoal/50">
                          <Clock className="w-3.5 h-3.5 text-botanical" />
                          <span>{article.readTime}</span>
                          <span>·</span>
                          <span>{article.date}</span>
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl text-forest group-hover:text-botanical transition-colors leading-snug">
                          {article.title}
                        </h3>

                        <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed line-clamp-3">
                          {article.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 pt-0">
                      <button
                        type="button"
                        onClick={() => setSelectedArticle(article)}
                        className="font-serif italic text-sm text-forest group-hover:text-botanical inline-flex items-center gap-2 transition-colors border-b border-forest/20 pb-0.5 hover:border-botanical"
                      >
                        <span>Read In-Depth Guide</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================== */}
        {/* TAB 2: INTERACTIVE PLANT DOCTOR */}
        {/* ============================================== */}
        {activeTab === 'doctor' && (
          <div className="space-y-12 animate-fadeIn max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-botanical font-semibold block">
                Symptom Diagnostic Tool
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-forest">
                What Symptom Is Your Plant Displaying?
              </h2>
              <p className="font-sans text-xs sm:text-sm text-charcoal/70">
                Select your plant’s visual distress signal below to view our verified diagnostic diagnosis and treatment protocol.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Symptom Selectors List */}
              <div className="lg:col-span-5 space-y-2">
                <span className="text-[11px] font-mono uppercase text-charcoal/50 block mb-2 font-semibold">
                  Select Visual Signal:
                </span>
                {plantDoctorSymptoms.map((sym) => {
                  const isSelected = selectedSymptom.id === sym.id;
                  return (
                    <button
                      key={sym.id}
                      type="button"
                      onClick={() => setSelectedSymptom(sym)}
                      className={`w-full text-left p-4 rounded-editorial border transition-all text-xs font-sans flex items-center justify-between ${
                        isSelected
                          ? 'bg-forest text-cream border-forest shadow-elevated font-medium'
                          : 'bg-white hover:bg-cream text-charcoal border-forest/15'
                      }`}
                    >
                      <span>{sym.symptom}</span>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                        isSelected ? 'bg-forest-900 text-sage' : 'bg-cream text-charcoal/60'
                      }`}>
                        {sym.urgency} Urgency
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Diagnosis Remedy Card */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedSymptom.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white p-8 rounded-editorial border border-forest/15 shadow-floating space-y-6"
                  >
                    <div className="space-y-1 pb-4 border-b border-forest/10">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase text-earth font-semibold">
                        <AlertCircle className="w-4 h-4 text-earth" />
                        <span>Observed Symptom: {selectedSymptom.symptom}</span>
                      </div>
                      <h3 className="font-serif text-2xl text-forest">
                        Root Cause: {selectedSymptom.commonCause}
                      </h3>
                    </div>

                    <div className="p-4 bg-cream/70 rounded-editorial border border-forest/10 space-y-1">
                      <span className="block text-[11px] font-mono uppercase text-charcoal/50 font-semibold">
                        Diagnostic Quick-Check:
                      </span>
                      <p className="font-serif italic text-forest text-sm">
                        "{selectedSymptom.quickCheck}"
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-lg text-forest">
                        Botanical Treatment Protocol
                      </h4>
                      <p className="font-sans text-sm text-charcoal/80 leading-relaxed">
                        {selectedSymptom.solution}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-forest/10 flex items-center justify-between text-xs font-sans text-charcoal/60">
                      <span>Need personalized botanist assistance?</span>
                      <a href="mailto:concierge@verdora.in" className="text-forest font-medium underline hover:text-botanical">
                        Contact Care Concierge
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* ============================================== */}
        {/* TAB 3: SPECIES CARE SHEETS */}
        {/* ============================================== */}
        {activeTab === 'species' && (
          <div className="space-y-10 animate-fadeIn max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-botanical font-semibold block">
                Quick Reference Sheets
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-forest">
                Species-Specific Care Profiles
              </h2>
              <p className="font-sans text-xs sm:text-sm text-charcoal/70">
                Exact lighting lux, hydration intervals, and potting medium recommendations for the most popular indoor varieties.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {speciesCareSheets.map((spec) => (
                <div
                  key={spec.species}
                  className="bg-white p-6 sm:p-8 rounded-editorial border border-forest/15 shadow-subtle space-y-4"
                >
                  <div className="border-b border-forest/10 pb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-forest font-medium">{spec.species}</h3>
                      <p className="font-serif italic text-xs text-charcoal/60">{spec.binomial}</p>
                    </div>
                    {spec.petSafe ? (
                      <span className="text-[10px] uppercase font-mono tracking-wider bg-botanical/15 text-botanical px-2.5 py-0.5 rounded-pill font-medium">
                        Pet-Safe
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-mono tracking-wider bg-earth/15 text-earth px-2.5 py-0.5 rounded-pill font-medium">
                        Toxic to Pets
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5 text-xs font-sans text-charcoal/80">
                    <div className="flex items-start gap-2">
                      <Sun className="w-4 h-4 text-earth shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-forest">Sunlight:</strong> {spec.light}
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Droplets className="w-4 h-4 text-botanical shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-forest">Hydration:</strong> {spec.water}
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-botanical shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-forest">Humidity & Temp:</strong> {spec.humidity} · {spec.temperature}
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-forest/60 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-forest">Soil Mix:</strong> {spec.soil}
                      </div>
                    </div>
                  </div>
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
