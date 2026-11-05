import React, { useState } from 'react';
import { brandTokens, colorPalette, typographySystem, responsiveBreakpoints } from '../data/designTokens';
import Logo, { LogoSymbol, LogoWordmark } from '../components/brand/Logo';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Rating from '../components/ui/Rating';
import Modal from '../components/ui/Modal';
import {
  ArrowRight,
  Sparkles,
  Search,
  Mail,
  Heart,
  ShoppingBag,
  CheckCircle2,
  Copy,
  Layers,
  Palette,
  Type,
  Layout,
  Sliders,
  ExternalLink,
} from 'lucide-react';

export default function DesignSystemReview() {
  const [copiedColor, setCopiedColor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sampleRating, setSampleRating] = useState(4.8);
  const [activeTab, setActiveTab] = useState('all');

  const copyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-offwhite text-charcoal pb-24">
      {/* Top Header Bar */}
      <header className="bg-forest text-cream py-12 px-6 sm:px-12 border-b border-forest-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-sage text-xs tracking-widest uppercase mb-3 font-mono">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              Phase 1 Deliverable · Design System Architecture
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-cream tracking-tight">
              VERDORA Design System & Brand Identity
            </h1>
            <p className="font-serif text-editorial-italic text-sage/90 text-lg mt-2">
              "{brandTokens.tagline}"
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-editorial bg-forest-800 text-cream px-4 py-2 rounded-editorial border border-forest-600">
              Status: Ready for Phase 2
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Showcase */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-12 space-y-20">
        {/* ============================================== */}
        {/* 1. BRAND IDENTITY & LOGO SYSTEM */}
        {/* ============================================== */}
        <section id="logo-system" className="space-y-6">
          <div className="flex items-center gap-3 border-b border-forest/15 pb-4">
            <Layers className="w-5 h-5 text-forest" />
            <h2 className="font-serif text-2xl sm:text-3xl text-forest">
              1. Brand Identity & Logo Suite
            </h2>
          </div>

          <p className="text-charcoal/70 text-sm max-w-3xl leading-relaxed">
            A minimalist, botanical-inspired monogram blending architectural geometric precision with the natural curvature of a living leaf, paired with the regal Playfair Display wordmark.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Standard Dark Theme Logo on Light Surface */}
            <Card variant="editorial" padding="lg" className="flex flex-col items-center justify-center text-center space-y-4 min-h-[220px]">
              <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal/50">Full Logo · Light Canvas</span>
              <Logo size="lg" theme="dark" showSubline={true} />
              <p className="text-xs text-charcoal/60">Primary header & desktop navigation</p>
            </Card>

            {/* Light Theme Logo on Forest Dark Surface */}
            <div className="bg-forest p-8 rounded-editorial flex flex-col items-center justify-center text-center space-y-4 min-h-[220px] shadow-elevated border border-forest-800">
              <span className="text-[11px] font-mono uppercase tracking-widest text-sage/70">Full Logo · Forest Dark Canvas</span>
              <Logo size="lg" theme="light" showSubline={true} />
              <p className="text-xs text-cream/70">Hero overlay & footer inverted brand state</p>
            </div>

            {/* Standalone Monogram Symbol & Wordmark */}
            <Card variant="cream" padding="lg" className="flex flex-col items-center justify-center text-center space-y-6 min-h-[220px]">
              <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal/50">Symbol & Wordmark Variations</span>
              <div className="flex items-center gap-6">
                <LogoSymbol className="w-12 h-12" theme="dark" />
                <div className="h-10 w-px bg-forest/20" />
                <LogoWordmark size="md" theme="dark" showSubline={false} />
              </div>
              <p className="text-xs text-charcoal/60">Favicon, app icon, packaging & mobile compact nav</p>
            </Card>
          </div>
        </section>

        {/* ============================================== */}
        {/* 2. COLOR PALETTE */}
        {/* ============================================== */}
        <section id="color-palette" className="space-y-6">
          <div className="flex items-center gap-3 border-b border-forest/15 pb-4">
            <Palette className="w-5 h-5 text-forest" />
            <h2 className="font-serif text-2xl sm:text-3xl text-forest">
              2. Botanical Color Palette & Contrast
            </h2>
          </div>

          <p className="text-charcoal/70 text-sm max-w-3xl leading-relaxed">
            Rooted in organic forest understories, warm earthen ceramics, and soft editorial creams. Click any color chip to copy its HEX code.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {colorPalette.map((c) => (
              <div
                key={c.name}
                onClick={() => copyHex(c.hex)}
                className="group relative cursor-pointer bg-white rounded-editorial border border-forest/10 shadow-subtle overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              >
                {/* Color Swatch Block */}
                <div
                  className="h-28 w-full relative flex items-end justify-between p-3.5 transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: c.hex }}
                >
                  <span
                    className={`text-xs font-mono font-medium px-2 py-0.5 rounded backdrop-blur-md ${
                      c.textDark ? 'text-charcoal bg-white/70' : 'text-cream bg-black/30'
                    }`}
                  >
                    {c.hex}
                  </span>

                  <span
                    className={`text-[10px] uppercase font-sans tracking-widest ${
                      c.textDark ? 'text-charcoal/70' : 'text-cream/80'
                    }`}
                  >
                    {copiedColor === c.hex ? 'Copied!' : 'Click to copy'}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <h3 className="font-serif font-medium text-base text-forest">{c.name}</h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed">{c.role}</p>
                  <div className="pt-2 border-t border-charcoal/10 flex items-center justify-between text-[11px] font-mono text-charcoal/60">
                    <span>Contrast</span>
                    <span className="font-medium text-forest">{c.contrastRatio}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================== */}
        {/* 3. TYPOGRAPHY SYSTEM */}
        {/* ============================================== */}
        <section id="typography" className="space-y-6">
          <div className="flex items-center gap-3 border-b border-forest/15 pb-4">
            <Type className="w-5 h-5 text-forest" />
            <h2 className="font-serif text-2xl sm:text-3xl text-forest">
              3. Editorial Typography Scale
            </h2>
          </div>

          <p className="text-charcoal/70 text-sm max-w-3xl leading-relaxed">
            The stately distinction of <strong>Playfair Display</strong> creates editorial gravitas, while <strong>Inter</strong> provides crisp, functional readability for commerce metrics, filters, and prices.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Serif Headlines */}
            <Card variant="editorial" padding="lg" className="space-y-6">
              <div className="border-b border-forest/10 pb-3 flex items-center justify-between">
                <span className="font-serif text-lg text-forest">Headings & Titles · Playfair Display</span>
                <span className="text-xs font-mono text-charcoal/50">Google Fonts Serif</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-charcoal/40 uppercase tracking-widest block mb-1">Hero Display (72px / 4.5rem)</span>
                  <p className="font-serif text-4xl sm:text-5xl text-forest leading-none tracking-tight">
                    Let Nature Find <span className="italic font-normal">Its Place.</span>
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-charcoal/40 uppercase tracking-widest block mb-1">Section Heading H2 (36px / 2.25rem)</span>
                  <p className="font-serif text-2xl sm:text-3xl text-forest tracking-tight">
                    Most Loved by Nature
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-charcoal/40 uppercase tracking-widest block mb-1">Product Title H3 (24px / 1.5rem)</span>
                  <p className="font-serif text-xl sm:text-2xl text-forest">
                    Monstera Deliciosa Variegata
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-charcoal/40 uppercase tracking-widest block mb-1">Editorial Italic Accent</span>
                  <p className="font-serif text-editorial-italic text-xl text-botanical">
                    "Every living leaf tells a quiet architectural story."
                  </p>
                </div>
              </div>
            </Card>

            {/* Sans Body & UI */}
            <Card variant="editorial" padding="lg" className="space-y-6">
              <div className="border-b border-forest/10 pb-3 flex items-center justify-between">
                <span className="font-sans font-medium text-lg text-forest">Body & UI · Inter</span>
                <span className="text-xs font-mono text-charcoal/50">Google Fonts Sans</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-charcoal/40 uppercase tracking-widest block mb-1">Editorial Body Lead (18px)</span>
                  <p className="font-sans text-lg text-charcoal/80 leading-relaxed">
                    Discover a curated collection of beautiful indoor and outdoor plants designed to bring life, freshness and tranquility into your everyday spaces.
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-charcoal/40 uppercase tracking-widest block mb-1">Body Standard & Pricing (14px - 16px)</span>
                  <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                    Native to tropical rainforests, this variety adapts gracefully to modern apartments. Paired in our handcrafted earthen planter.
                  </p>
                  <p className="font-sans text-xl font-semibold text-forest mt-2">
                    ₹1,899 <span className="text-sm font-normal text-charcoal/40 line-through ml-2">₹2,299</span>
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-charcoal/40 uppercase tracking-widest block mb-1">Micro Labels & Metric Indicators (11px tracked)</span>
                  <p className="font-sans text-xs uppercase tracking-widest font-semibold text-botanical">
                    Sunlight: Bright Indirect · Watering: Every 7-10 Days
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* ============================================== */}
        {/* 4. BUTTONS & ACTIONS */}
        {/* ============================================== */}
        <section id="buttons" className="space-y-6">
          <div className="flex items-center gap-3 border-b border-forest/15 pb-4">
            <Sliders className="w-5 h-5 text-forest" />
            <h2 className="font-serif text-2xl sm:text-3xl text-forest">
              4. Interactive Buttons & Actions
            </h2>
          </div>

          <p className="text-charcoal/70 text-sm max-w-3xl leading-relaxed">
            Crafted for tactile luxury with subtle micro-elevation, letter-spaced tracking, and clear functional hierarchy.
          </p>

          <Card variant="editorial" padding="xl" className="space-y-8">
            {/* Button Variants Row */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-charcoal/50 block mb-4">Button Style Variants</span>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" icon={ArrowRight}>
                  Explore Collection
                </Button>

                <Button variant="secondary">
                  Find Your Plant
                </Button>

                <Button variant="earth" icon={ShoppingBag}>
                  Add to Cart
                </Button>

                <Button variant="ghost">
                  Learn More
                </Button>

                <Button variant="editorial">
                  Read Journal Entry &rarr;
                </Button>
              </div>
            </div>

            {/* Sizing Scale */}
            <div className="pt-6 border-t border-forest/10">
              <span className="text-xs font-mono uppercase tracking-widest text-charcoal/50 block mb-4">Size Hierarchy (SM to XL)</span>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm" variant="secondary">Small Action</Button>
                <Button size="md" variant="primary">Medium (Default)</Button>
                <Button size="lg" variant="primary">Large Featured</Button>
                <Button size="xl" variant="secondary">Extra Large Hero</Button>
              </div>
            </div>

            {/* Interactive States */}
            <div className="pt-6 border-t border-forest/10">
              <span className="text-xs font-mono uppercase tracking-widest text-charcoal/50 block mb-4">States: Loading & Disabled</span>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" isLoading={true}>Processing</Button>
                <Button variant="secondary" disabled={true}>Out of Stock</Button>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                  Open Demonstration Modal
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* ============================================== */}
        {/* 5. BADGES & BOTANICAL METRIC LABELS */}
        {/* ============================================== */}
        <section id="badges" className="space-y-6">
          <div className="flex items-center gap-3 border-b border-forest/15 pb-4">
            <Sparkles className="w-5 h-5 text-forest" />
            <h2 className="font-serif text-2xl sm:text-3xl text-forest">
              5. Botanical Badges & Markers
            </h2>
          </div>

          <p className="text-charcoal/70 text-sm max-w-3xl leading-relaxed">
            High-utility botanical markers for pet safety, air filtration, rarity tier, and bestseller indicators.
          </p>

          <Card variant="editorial" padding="lg">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="bestseller">Bestseller</Badge>
              <Badge variant="rare">Rare Specimen</Badge>
              <Badge variant="petsafe">100% Pet-Safe</Badge>
              <Badge variant="airpurifying">NASA Air Purifier</Badge>
              <Badge variant="sale">Save 20%</Badge>
              <Badge variant="new">New Season</Badge>
              <Badge variant="sage">Easy Care</Badge>
              <Badge variant="default">Medium Light</Badge>
            </div>
          </Card>
        </section>

        {/* ============================================== */}
        {/* 6. FORM INPUTS & REFINED CONTROLS */}
        {/* ============================================== */}
        <section id="forms" className="space-y-6">
          <div className="flex items-center gap-3 border-b border-forest/15 pb-4">
            <Layout className="w-5 h-5 text-forest" />
            <h2 className="font-serif text-2xl sm:text-3xl text-forest">
              6. Form Elements & Interactive Controls
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="editorial" padding="lg" className="space-y-4">
              <h3 className="font-serif text-lg text-forest">Text Inputs</h3>
              <Input
                label="Search Collection"
                placeholder="Monstera, Fiddle Leaf, Snake Plant..."
                icon={Search}
              />
              <Input
                label="Newsletter Subscription"
                placeholder="your.email@botanical.com"
                icon={Mail}
                helperText="We send weekly plant care and rare drop alerts."
              />
            </Card>

            <Card variant="editorial" padding="lg" className="space-y-4">
              <h3 className="font-serif text-lg text-forest">Select Dropdowns</h3>
              <Select
                label="Sunlight Availability"
                placeholder="Select light level..."
                options={[
                  { value: 'low', label: 'Low Ambient Light (Bedrooms, Hallways)' },
                  { value: 'medium', label: 'Medium Indirect Light (Living Rooms)' },
                  { value: 'bright', label: 'Bright Filtered Sun (South Windows)' },
                  { value: 'direct', label: 'Direct Sun (Balcony & Terraces)' },
                ]}
              />
              <Select
                label="Maintenance Level"
                options={[
                  { value: 'all', label: 'All Maintenance Levels' },
                  { value: 'easy', label: 'Easy (Water once every 2 weeks)' },
                  { value: 'moderate', label: 'Moderate (Weekly care)' },
                  { value: 'master', label: 'Plant Parent Pro' },
                ]}
              />
            </Card>

            <Card variant="editorial" padding="lg" className="space-y-4">
              <h3 className="font-serif text-lg text-forest">Rating System</h3>
              <p className="text-xs text-charcoal/70">
                Interactive customer review score component:
              </p>
              <div className="pt-2 space-y-3">
                <div>
                  <span className="text-[11px] font-mono text-charcoal/50 block mb-1">Click to Rate:</span>
                  <Rating
                    rating={sampleRating}
                    reviewCount={142}
                    size="md"
                    interactive={true}
                    onChange={(r) => setSampleRating(r)}
                  />
                </div>
                <p className="text-xs text-charcoal/60">
                  Current value: <strong className="text-forest">{sampleRating} / 5.0</strong>
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* ============================================== */}
        {/* 7. RESPONSIVE BREAKPOINTS */}
        {/* ============================================== */}
        <section id="breakpoints" className="space-y-6">
          <div className="flex items-center gap-3 border-b border-forest/15 pb-4">
            <Layout className="w-5 h-5 text-forest" />
            <h2 className="font-serif text-2xl sm:text-3xl text-forest">
              7. Responsive Breakpoint Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {responsiveBreakpoints.map((bp) => (
              <Card key={bp.name} variant="cream" padding="md" className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-medium text-forest">{bp.name}</h4>
                  <span className="text-[10px] font-mono bg-sage/30 text-forest px-2 py-0.5 rounded">
                    {bp.range}
                  </span>
                </div>
                <p className="text-xs text-charcoal/70 leading-relaxed">{bp.behavior}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Demonstration Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Botanical Design System"
        subtitle="Phase 1 Verification Modal"
      >
        <div className="space-y-4 text-sm text-charcoal/80">
          <p>
            This modal confirms that Framer Motion animations, accessible keyboard escape triggers, and scroll lock functionality are operational in the VERDORA design system.
          </p>
          <div className="p-4 bg-cream rounded-editorial border border-forest/10">
            <p className="font-serif italic text-forest text-base">
              "Bring Nature Into Your Space."
            </p>
            <p className="text-xs text-charcoal/60 mt-1">
              Phase 1 components are modular, responsive, and ready to construct the editorial homepage in Phase 2.
            </p>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
              Close Review
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
              Acknowledge
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

