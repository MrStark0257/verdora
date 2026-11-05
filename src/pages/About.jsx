import React from 'react';
import { Link } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import {
  Sparkles,
  Leaf,
  ShieldCheck,
  Heart,
  Sun,
  Award,
  ArrowRight,
  Sprout,
  CheckCircle2,
} from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-offwhite text-charcoal flex flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 w-full overflow-hidden">
        {/* ========================================================= */}
        {/* HERO SECTION: Editorial Botanical Maison Cover */}
        {/* ========================================================= */}
        <section className="relative py-16 sm:py-24 bg-cream/50 border-b border-forest/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold flex items-center justify-center gap-1.5">
                <Leaf className="w-3.5 h-3.5" />
                The Story of VERDORA
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-forest tracking-tight leading-[1.1]">
                A Living Sanctuary In Every Modern Home.
              </h1>
              <p className="font-sans text-sm sm:text-base text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
                Founded on the belief that human spaces and the natural world are meant to coexist harmoniously. VERDORA curates, conditions, and delivers living botanical art to elevate urban sanctuaries across India.
              </p>
            </div>
          </div>
        </section>

        {/* Large Curated Editorial Hero Image Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-16 sm:mb-24">
          <div className="relative rounded-3xl overflow-hidden shadow-editorial aspect-[16/9] sm:aspect-[21/9] max-h-[500px] border border-forest/10">
            <img
              src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=2000&q=85"
              alt="VERDORA Botanical Greenhouse Atelier"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent flex items-end p-6 sm:p-12">
              <div className="text-cream max-w-xl">
                <span className="text-xs font-mono uppercase tracking-wider text-sage block mb-1">
                  Pune Greenhouse Atelier • Established 2021
                </span>
                <p className="font-serif text-lg sm:text-2xl text-cream font-medium italic">
                  "We don't merely grow house plants. We cultivate living companions that breathe tranquility into daily life."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* BRAND MANIFESTO: Editorial Split */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold">
                Our Botanical Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-forest tracking-tight">
                Grown with Patience, Hand-Inspected by Botanists.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
                <p>
                  Most commercial houseplants are forced through synthetic fertilizers and rushed into retail stores with compromised root systems. At VERDORA, we practice slow, respectful horticulture inside our solar-powered greenhouse ateliers in Pune and Bengaluru.
                </p>
                <p>
                  Every specimen develops in peat-free, organic substrate enriched with mycorrhizal fungi and beneficial microbes. Before leaving our greenhouse, each plant undergoes a 7-day environmental conditioning protocol to ensure seamless acclimation inside your living room or study.
                </p>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="border-l-2 border-botanical pl-4">
                  <span className="font-serif text-2xl font-bold text-forest">100%</span>
                  <p className="text-xs text-charcoal/60 mt-0.5">Peat-free sustainable substrate</p>
                </div>
                <div className="border-l-2 border-botanical pl-4">
                  <span className="font-serif text-2xl font-bold text-forest">14 Days</span>
                  <p className="text-xs text-charcoal/60 mt-0.5">Living plant replacement guarantee</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-editorial border border-forest/10">
                <img
                  src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80"
                  alt="Monstera Deliciosa Cultivation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-forest text-cream p-6 rounded-2xl shadow-editorial hidden sm:block max-w-xs border border-sage/20">
                <span className="text-xs text-sage font-mono uppercase tracking-wider block mb-1">
                  Living Guarantee
                </span>
                <p className="font-serif text-sm leading-snug">
                  If your botanical specimen arrives showing transit stress, our master horticulturists diagnose and replace it at zero cost.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SUSTAINABILITY PILLARS */}
        {/* ========================================================= */}
        <section className="bg-cream/40 border-y border-forest/10 py-16 sm:py-24 my-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold">
                Our Environmental Pledge
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-forest tracking-tight mt-1 mb-3">
                Rooted in Gentle Stewardship.
              </h2>
              <p className="text-sm text-charcoal/70">
                How we minimize our ecological footprint from seedling propagation to doorstep delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-forest/10 rounded-2xl p-8 shadow-subtle space-y-4">
                <div className="w-12 h-12 rounded-xl bg-botanical/10 flex items-center justify-center text-botanical">
                  <Sprout className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-forest font-bold">
                  Zero Peat Moss Extraction
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Peat bogs store 30% of global soil carbon. We never use mined peat, formulating our soil entirely from renewable coconut coir, composted bark, and organic vermiculite.
                </p>
              </div>

              <div className="bg-white border border-forest/10 rounded-2xl p-8 shadow-subtle space-y-4">
                <div className="w-12 h-12 rounded-xl bg-botanical/10 flex items-center justify-center text-botanical">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-forest font-bold">
                  Plastic-Free Biodegradable Packaging
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Our custom suspension boxes are crafted from unbleached FSC-certified kraft paper, bamboo support stays, and cornstarch-based protective cushioning.
                </p>
              </div>

              <div className="bg-white border border-forest/10 rounded-2xl p-8 shadow-subtle space-y-4">
                <div className="w-12 h-12 rounded-xl bg-botanical/10 flex items-center justify-center text-botanical">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-forest font-bold">
                  Solar-Powered Greenhouse Ateliers
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Our Maharashtra growing facility harnesses 100% rooftop solar energy for automated misting, circadian LED grow lighting, and natural passive ventilation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* BOTANICAL CURATORS & HORTICULTURISTS */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold">
              The Curators
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest tracking-tight mt-1 mb-3">
              Botanists Behind the Collection.
            </h2>
            <p className="text-sm text-charcoal/70">
              Passionate plant scientists and landscape designers shaping living interior landscapes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Elena Vance',
                role: 'Head of Botanical Curation',
                bio: 'Trained at Kew Royal Botanic Gardens with 14 years specializing in tropical Araceae and rare variegated cultivars.',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
              },
              {
                name: 'Dr. Rohan Sen',
                role: 'Chief Horticultural Scientist',
                bio: 'PhD in Plant Physiology. Oversees root microbiome health, organic nutrient formulations, and acclimation protocols.',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
              },
              {
                name: 'Maya Kulkarni',
                role: 'Biophilic Interior Architect',
                bio: 'Designs residential and workplace plant installations, matching species to light lux coordinates and architectural spaces.',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
              },
            ].map((member, i) => (
              <div key={i} className="bg-white border border-forest/10 rounded-2xl overflow-hidden shadow-subtle group">
                <div className="aspect-[4/5] overflow-hidden bg-cream">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-botanical block mb-1">
                    {member.role}
                  </span>
                  <h3 className="font-serif text-xl text-forest font-bold mb-2">
                    {member.name}
                  </h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* CALL TO ACTION */}
        {/* ========================================================= */}
        <section className="bg-forest text-cream py-16 sm:py-20 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-sage">
              Welcome to the Sanctuary
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-cream font-medium">
              Ready to Bring Nature Into Your Space?
            </h2>
            <p className="text-sm sm:text-base text-cream/80 max-w-xl mx-auto leading-relaxed">
              Explore our hand-nurtured botanical collection or let our interactive Plant Finder guide you to your ideal specimen.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/shop"
                className="bg-cream text-forest px-8 py-3.5 rounded-editorial text-xs uppercase tracking-editorial font-medium hover:bg-white transition-all shadow-subtle inline-flex items-center gap-2"
              >
                <span>Browse Living Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/plant-finder"
                className="border border-cream/30 text-cream px-8 py-3.5 rounded-editorial text-xs uppercase tracking-editorial font-medium hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                <span>Take the Plant Quiz</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
