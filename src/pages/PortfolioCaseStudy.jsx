import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/brand/Logo';
import { getAssetUrl } from '../utils/assetUrl';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import {
  ExternalLink,
  Monitor,
  Smartphone,
  Layers,
  Sparkles,
  CheckCircle2,
  Copy,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Leaf,
  SlidersHorizontal,
  Lock,
  Code2,
  FileText,
  Eye,
  X,
  Compass,
} from 'lucide-react';

const GithubIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const SCREENSHOTS = [
  {
    id: 'desktop-home',
    title: 'Editorial Homepage',
    category: 'desktop',
    desc: '13 cohesive editorial sections, sticky transparent-to-solid navbar, and botanical storytelling.',
    src: getAssetUrl('/showcase/desktop-homepage.png'),
  },
  {
    id: 'shop-catalog',
    title: 'Shop Catalog & Multi-Faceted Filters',
    category: 'desktop',
    desc: 'Price slider, light intensity, care difficulty, pet-safety toggles, and 3/4 column grid switcher.',
    src: getAssetUrl('/showcase/shop-catalog.png'),
  },
  {
    id: 'product-detail',
    title: 'Product Detail & Care Specifications',
    category: 'desktop',
    desc: 'Interactive image gallery, sunlight/watering meters, customer reviews, and quantity management.',
    src: getAssetUrl('/showcase/product-detail.png'),
  },
  {
    id: 'plant-finder',
    title: 'Interactive Plant Diagnostic Finder',
    category: 'desktop',
    desc: '4-step recommendation questionnaire matching living spaces to optimal plant species.',
    src: getAssetUrl('/showcase/plant-finder.png'),
  },
  {
    id: 'checkout-razorpay',
    title: 'Razorpay Payment Gateway Simulation',
    category: 'desktop',
    desc: '256-bit encrypted checkout modal simulating UPI/QR, Cards, and Netbanking authorization.',
    src: getAssetUrl('/showcase/checkout-razorpay.png'),
  },
  {
    id: 'order-tracking',
    title: 'Botanical Climate Logistics Telemetry',
    category: 'desktop',
    desc: 'Live 4-stage tracking timeline, courier coordinates, root cocoon wrap status, and arrival care tips.',
    src: getAssetUrl('/showcase/order-tracking.png'),
  },
  {
    id: 'admin-dashboard',
    title: 'Protected Atelier Admin Command Center',
    category: 'desktop',
    desc: 'Financial KPIs, order fulfillment status updater, live inventory stock control, and customer directory.',
    src: getAssetUrl('/showcase/admin-dashboard.png'),
  },
  {
    id: 'plant-care',
    title: 'Plant Care Journal & Clinic',
    category: 'desktop',
    desc: 'Curated editorial guides, seasonal watering protocols, and botanical diagnostic clinic.',
    src: getAssetUrl('/showcase/plant-care.png'),
  },
  {
    id: 'about-page',
    title: 'Brand Maison & Sustainability Pledge',
    category: 'desktop',
    desc: 'Brand philosophy, 100% peat-free organic substrate guarantee, and botanist curator profiles.',
    src: getAssetUrl('/showcase/about-page.png'),
  },
  {
    id: 'contact-page',
    title: 'Concierge Clinic & Atelier Locations',
    category: 'desktop',
    desc: 'Interactive concierge form with validation, automated ticket generation, and atelier addresses.',
    src: getAssetUrl('/showcase/contact-page.png'),
  },
  {
    id: 'mobile-home',
    title: 'Mobile Homepage Experience',
    category: 'mobile',
    desc: 'Fully responsive mobile drawer, optimized touch tap targets, and zero horizontal overflow.',
    src: getAssetUrl('/showcase/mobile-homepage.png'),
  },
  {
    id: 'mobile-track',
    title: 'Mobile Parcel Tracking',
    category: 'mobile',
    desc: 'Adaptive mobile courier timeline and live order progress indicators.',
    src: getAssetUrl('/showcase/mobile-track-order.png'),
  },
  {
    id: 'mobile-admin',
    title: 'Mobile Admin Inventory Controller',
    category: 'mobile',
    desc: 'Responsive touch-friendly management tables and quick stock adjustment controls.',
    src: getAssetUrl('/showcase/mobile-admin.png'),
  },
];

export default function PortfolioCaseStudy() {
  const [filterCategory, setFilterCategory] = useState('all'); // 'all' | 'desktop' | 'mobile'
  const [selectedImage, setSelectedImage] = useState(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const filteredScreenshots =
    filterCategory === 'all'
      ? SCREENSHOTS
      : SCREENSHOTS.filter((s) => s.category === filterCategory);

  const portfolioMarkdown = `### VERDORA — Premium Botanical E-Commerce Website
**Category:** E-commerce Website | **Industry:** Botanical & Lifestyle
**Role:** UI/UX Design & Frontend Development
**Tech Stack:** React, Vite, Tailwind CSS, Framer Motion, React Router, Lucide React
**Project Type:** Concept Project | **Status:** Completed

- **Live Storefront Demo (GitHub Pages):** https://sanchitsharma217-arch.github.io/verdora/
- **GitHub Repository:** https://github.com/sanchitsharma217-arch/verdora
- **Key Features:** 18 complete routes, cinematic preloader intro, multi-faceted product filtering, interactive 4-step plant diagnostic quiz, Razorpay gateway simulation, 4-stage logistics telemetry tracking, protected staff admin inventory center, and 100% responsive zero-overflow mobile layout.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(portfolioMarkdown);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  return (
    <div className="min-h-screen bg-offwhite text-charcoal flex flex-col font-sans">
      {/* Top Portfolio Header */}
      <header className="bg-forest text-cream border-b border-forest/30 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-subtle">
        <div className="flex items-center gap-3">
          <Logo theme="light" size="sm" showSubline={false} />
          <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded text-sage">
            Portfolio Showcase & Case Study
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="bg-cream text-forest hover:bg-white px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-editorial transition-colors inline-flex items-center gap-1.5"
          >
            <span>Launch Live Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/admin"
            className="border border-cream/30 text-cream hover:bg-white/10 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors hidden md:inline-flex items-center gap-1.5"
          >
            <span>Staff Admin</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-16">
        {/* ======================================================== */}
        {/* 1. PROJECT HERO PRESENTATION */}
        {/* ======================================================== */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/15 text-xs font-mono uppercase tracking-widest text-botanical font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-botanical" />
            <span>Fictional E-Commerce Concept Showcase</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-forest tracking-tight font-bold">
            VERDORA
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-botanical">
            "Bring Nature Into Your Space."
          </p>

          <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-sans max-w-2xl mx-auto">
            A comprehensive botanical lifestyle and e-commerce experience developed to showcase agency-grade UI/UX design, custom design tokens, modern component architecture, and advanced interactive frontend engineering in React.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="bg-forest text-cream hover:bg-forest-800 px-6 py-3 rounded-editorial text-xs uppercase tracking-editorial font-semibold transition-all shadow-subtle inline-flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-sage" />
              <span>Explore Live E-Commerce Store</span>
            </Link>
            <Link
              to="/admin"
              className="border border-forest/30 text-forest hover:bg-forest/5 px-6 py-3 rounded-editorial text-xs uppercase tracking-editorial font-semibold transition-all inline-flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-botanical" />
              <span>Admin Command Center</span>
            </Link>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. SPECIFICATION TABLE (EXACT MATCH FOR PORTFOLIO) */}
        {/* ======================================================== */}
        <section className="bg-white border border-forest/15 rounded-3xl p-6 sm:p-10 shadow-editorial space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-forest/10 gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold">
                Portfolio Metadata Overview
              </span>
              <h2 className="font-serif text-2xl text-forest font-bold">
                Project Detail Matrix
              </h2>
            </div>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-botanical bg-forest/5 hover:bg-forest/10 px-3 py-1.5 rounded-lg border border-forest/10 transition-colors self-start sm:self-auto"
            >
              {copiedSnippet ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Markdown Snippet</span>
                </>
              )}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-forest/15 text-charcoal/50 uppercase font-mono text-xs">
                  <th className="py-3 px-4 font-semibold w-1/3">Portfolio Detail</th>
                  <th className="py-3 px-4 font-semibold w-2/3">Content & Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10">
                <tr className="hover:bg-cream/20 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-forest">Project Name</td>
                  <td className="py-3.5 px-4 font-serif text-base font-bold text-forest">VERDORA</td>
                </tr>
                <tr className="hover:bg-cream/20 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-forest">Category</td>
                  <td className="py-3.5 px-4 text-charcoal/80">E-commerce Website</td>
                </tr>
                <tr className="hover:bg-cream/20 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-forest">Industry</td>
                  <td className="py-3.5 px-4 text-charcoal/80">Botanical & Lifestyle</td>
                </tr>
                <tr className="hover:bg-cream/20 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-forest">Role</td>
                  <td className="py-3.5 px-4 font-medium text-forest">UI/UX Design & Frontend Development</td>
                </tr>
                <tr className="hover:bg-cream/20 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-forest">Technologies</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1.5">
                      {['React', 'Tailwind CSS', 'Framer Motion', 'React Router', 'Lucide React', 'Vite'].map((t) => (
                        <span key={t} className="bg-forest/10 text-forest text-xs font-mono px-2.5 py-0.5 rounded-full font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-cream/20 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-forest">Project Type</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-botanical font-semibold bg-sage/20 px-2.5 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      Concept Project (Portfolio Showcase)
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-cream/20 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-forest">Status</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Completed & Fully Verified
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quick Links Row */}
          <div className="pt-4 border-t border-forest/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-cream/50 border border-forest/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-charcoal/60 block">Live Demonstration</span>
                <span className="font-serif text-sm font-bold text-forest">Interactive Web Storefront</span>
              </div>
              <Link to="/" className="text-botanical hover:underline font-mono text-xs inline-flex items-center gap-1">
                <span>Open Store</span> <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-cream/50 border border-forest/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-charcoal/60 block">Source Code Repository</span>
                <span className="font-serif text-sm font-bold text-forest">GitHub Open Portfolio</span>
              </div>
              <a
                href="https://github.com/sanchitsharma217-arch/verdora"
                target="_blank"
                rel="noreferrer"
                className="text-botanical hover:underline font-mono text-xs inline-flex items-center gap-1"
              >
                <span>View Repo</span> <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. INTERACTIVE SCREENSHOT GALLERY */}
        {/* ======================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold">
                Visual Artifacts
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-forest font-bold">
                Desktop & Mobile Screenshots
              </h2>
              <p className="text-xs text-charcoal/60 mt-1">
                Click any screenshot thumbnail to inspect in high resolution.
              </p>
            </div>

            {/* Filter Toggle Buttons */}
            <div className="flex items-center gap-1 bg-cream/70 p-1 rounded-xl border border-forest/15">
              {[
                { id: 'all', label: 'All Artifacts' },
                { id: 'desktop', label: 'Desktop Screens (1440px)', icon: Monitor },
                { id: 'mobile', label: 'Mobile (375px)', icon: Smartphone },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = filterCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilterCategory(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-forest text-cream shadow-sm'
                        : 'text-charcoal/70 hover:text-forest hover:bg-forest/5'
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScreenshots.map((shot) => (
              <div
                key={shot.id}
                onClick={() => setSelectedImage(shot)}
                className="bg-white border border-forest/10 rounded-2xl overflow-hidden shadow-subtle hover:shadow-elevated transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="aspect-[16/10] bg-cream overflow-hidden relative border-b border-forest/10">
                  <img
                    src={shot.src}
                    alt={shot.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-forest/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/95 text-forest px-3 py-1.5 rounded-full text-xs font-mono font-semibold shadow-md inline-flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      Expand Screen
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-serif text-base text-forest font-bold group-hover:text-botanical transition-colors">
                      {shot.title}
                    </h3>
                    <Badge variant={shot.category === 'desktop' ? 'secondary' : 'primary'} size="sm">
                      {shot.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    {shot.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-floating"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-forest/10 flex items-center justify-between bg-cream/40">
                <div>
                  <h3 className="font-serif text-lg font-bold text-forest">
                    {selectedImage.title}
                  </h3>
                  <p className="text-xs text-charcoal/60">{selectedImage.desc}</p>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 text-forest/70 hover:text-forest transition-colors rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-auto p-4 flex-1 bg-cream/20 text-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full h-auto mx-auto rounded-lg shadow-sm border border-forest/10"
                />
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. KEY ARCHITECTURAL FEATURES & HIGHLIGHTS */}
        {/* ======================================================== */}
        <section className="bg-cream/40 border border-forest/15 rounded-3xl p-6 sm:p-10 shadow-subtle space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold">
              Engineering Capabilities
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-forest font-bold">
              Key Features & Architectural Highlights
            </h2>
            <p className="text-xs text-charcoal/60 mt-1">
              Engineered with production-grade modularity and rigorous attention to UI/UX performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-forest/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-botanical/10 text-botanical flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest">
                Custom Botanical Design System
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Handcrafted color tokens (Forest `#183D2B`, Botanical `#315B40`, Sage `#A3B89B`, Cream `#F5F1E7`), Playfair Display headings, Inter body, and bespoke leaf V-monogram vector branding.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-forest/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center font-bold">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest">
                Multi-Faceted Catalog Filters
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Live price range slider, sunlight requirements, care difficulty levels, plant height sizes, pet-safe toggles, multi-parameter sorting, and grid layout switchers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-forest/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sage/20 text-forest flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest">
                Interactive Diagnostic Plant Quiz
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Multi-step recommendation engine analyzing room environment, sunlight angles, maintenance capacity, and foliage preferences to suggest living botanical cultivars.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-forest/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-earth/10 text-earth flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest">
                Razorpay Simulation & Telemetry
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Demonstration modal simulating 256-bit encrypted banking authorization (UPI, Card, Netbanking), order persistence, and 4-stage climate courier parcel tracking.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-forest/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest">
                Protected Admin Command Center
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Secured staff view with 1-click evaluation access, gross revenue KPIs, live order fulfillment status updater, real-time inventory increment/decrement, and CMS controls.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-forest/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-botanical/10 text-botanical flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest">
                Zero-Overflow Mobile Perfection
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Strict layout guardrails ensuring perfect mobile viewport containment (`clientWidth === scrollWidth === 375px`) verified by automated headless browser testing.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. COPYABLE PORTFOLIO EMBED CODE */}
        {/* ======================================================== */}
        <section className="bg-forest text-cream rounded-3xl p-6 sm:p-10 shadow-editorial space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forest-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-sage">
                Developer Portfolio Integration
              </span>
              <h2 className="font-serif text-2xl text-cream font-bold">
                Ready-to-Paste Portfolio Showcase Card
              </h2>
            </div>
            <button
              onClick={copyToClipboard}
              className="bg-cream text-forest hover:bg-white px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              {copiedSnippet ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Snippet Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Markdown Card</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs sm:text-sm text-cream/80 max-w-2xl leading-relaxed">
            Copy and paste this structured presentation block directly into your personal portfolio website, GitHub README, or client proposals.
          </p>

          <pre className="bg-[#0f281c] p-4 sm:p-6 rounded-2xl text-[11px] sm:text-xs font-mono text-sage/90 overflow-x-auto border border-sage/20 whitespace-pre-wrap leading-relaxed">
            {portfolioMarkdown}
          </pre>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-forest text-cream py-8 border-t border-forest-800 text-center text-xs font-sans">
        <p className="text-cream/70">
          © {new Date().getFullYear()} VERDORA Botanical Maison · Portfolio Demonstration Project.
        </p>
        <div className="mt-2 flex items-center justify-center gap-4 text-sage font-mono text-[11px]">
          <Link to="/" className="hover:underline">Storefront</Link>
          <span>·</span>
          <Link to="/shop" className="hover:underline">Catalog</Link>
          <span>·</span>
          <Link to="/admin" className="hover:underline">Admin Center</Link>
          <span>·</span>
          <Link to="/design-system" className="hover:underline">Design System</Link>
        </div>
      </footer>
    </div>
  );
}