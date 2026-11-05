import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ShopHeader from '../components/shop/ShopHeader';
import FilterSidebar from '../components/shop/FilterSidebar';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';
import { categories, products } from '../data/products';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CategoryPage() {
  const { category: categorySlug } = useParams();

  // Find category metadata
  const currentCategory = useMemo(() => {
    return categories.find((c) => c.slug === categorySlug) || {
      id: categorySlug,
      name: categorySlug ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1) : 'Collection',
      slug: categorySlug,
      tagline: 'Curated botanical living selection.',
      description: 'Living architectural elements curated for contemporary spaces.',
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=80',
    };
  }, [categorySlug]);

  const [priceRange, setPriceRange] = useState(4000);
  const [selectedSunlight, setSelectedSunlight] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [petSafeOnly, setPetSafeOnly] = useState(false);
  const [airPurifierOnly, setAirPurifierOnly] = useState(false);
  const [rareOnly, setRareOnly] = useState(categorySlug === 'rare');
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState(3);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleToggleSunlight = (val) => {
    setSelectedSunlight((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  const handleToggleDifficulty = (val) => {
    setSelectedDifficulty((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  const handleToggleSize = (val) => {
    setSelectedSize((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  const handleResetFilters = () => {
    setPriceRange(4000);
    setSelectedSunlight([]);
    setSelectedDifficulty([]);
    setSelectedSize([]);
    setPetSafeOnly(false);
    setAirPurifierOnly(false);
    setRareOnly(categorySlug === 'rare');
    setBestsellerOnly(false);
    setSearchQuery('');
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (priceRange < 4000) count += 1;
    count += selectedSunlight.length;
    count += selectedDifficulty.length;
    count += selectedSize.length;
    if (petSafeOnly) count += 1;
    if (airPurifierOnly) count += 1;
    if (rareOnly && categorySlug !== 'rare') count += 1;
    if (bestsellerOnly) count += 1;
    if (searchQuery.trim()) count += 1;
    return count;
  }, [priceRange, selectedSunlight, selectedDifficulty, selectedSize, petSafeOnly, airPurifierOnly, rareOnly, bestsellerOnly, searchQuery, categorySlug]);

  const categoryProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Must match current category (or 'rare' toggle)
        if (categorySlug === 'rare') {
          if (!p.isRare) return false;
        } else if (categorySlug === 'air-purifying') {
          if (!p.isAirPurifier) return false;
        } else if (p.category !== categorySlug) {
          return false;
        }

        // Price
        if (p.price > priceRange) return false;

        // Sunlight
        if (selectedSunlight.length > 0 && !selectedSunlight.some((l) => p.sunlight?.includes(l))) {
          return false;
        }

        // Difficulty
        if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(p.difficulty)) {
          return false;
        }

        // Size
        if (selectedSize.length > 0 && !selectedSize.some((s) => p.size?.includes(s))) {
          return false;
        }

        // Toggles
        if (petSafeOnly && !p.isPetSafe) return false;
        if (airPurifierOnly && !p.isAirPurifier) return false;
        if (bestsellerOnly && !p.isBestseller) return false;

        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.botanicalName?.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q);
          if (!match) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [categorySlug, priceRange, selectedSunlight, selectedDifficulty, selectedSize, petSafeOnly, airPurifierOnly, bestsellerOnly, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-offwhite text-charcoal flex flex-col">
      <AnnouncementBar />
      <Navbar />

      {/* Editorial Category Hero Header */}
      <section className="relative bg-forest text-cream py-16 sm:py-24 px-6 sm:px-12 overflow-hidden border-b border-forest-800">
        <div className="absolute inset-0 z-0">
          <img
            src={currentCategory.image}
            alt={currentCategory.name}
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900/90 to-forest-950/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-sage">
            <Link to="/shop" className="hover:underline">Catalog</Link>
            <span>/</span>
            <span>Collection</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-cream tracking-tight">
            {currentCategory.name}
          </h1>

          <p className="font-sans text-sm sm:text-base text-cream/80 max-w-2xl leading-relaxed">
            {currentCategory.description}
          </p>
        </div>
      </section>

      {/* Main Catalog Area */}
      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-12 py-12 w-full space-y-8">
        <ShopHeader
          title={currentCategory.name}
          subtitle={currentCategory.tagline}
          categoryName={currentCategory.name}
          itemCount={categoryProducts.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          gridCols={gridCols}
          onGridColsChange={setGridCols}
          onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
          activeFilterCount={activeFilterCount}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-28">
            <FilterSidebar
              selectedCategory={categorySlug}
              onSelectCategory={(slug) => {
                if (slug === 'all') window.location.href = '/shop';
                else window.location.href = `/collections/${slug}`;
              }}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              selectedSunlight={selectedSunlight}
              onToggleSunlight={handleToggleSunlight}
              selectedDifficulty={selectedDifficulty}
              onToggleDifficulty={handleToggleDifficulty}
              selectedSize={selectedSize}
              onToggleSize={handleToggleSize}
              petSafeOnly={petSafeOnly}
              onTogglePetSafe={() => setPetSafeOnly(!petSafeOnly)}
              airPurifierOnly={airPurifierOnly}
              onToggleAirPurifier={() => setAirPurifierOnly(!airPurifierOnly)}
              rareOnly={rareOnly}
              onToggleRare={() => setRareOnly(!rareOnly)}
              bestsellerOnly={bestsellerOnly}
              onToggleBestseller={() => setBestsellerOnly(!bestsellerOnly)}
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Right Products */}
          <div className="lg:col-span-3">
            {categoryProducts.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-editorial border border-forest/10 p-8 space-y-4">
                <Sparkles className="w-12 h-12 text-forest/40 mx-auto" />
                <h3 className="font-serif text-2xl text-forest">
                  No matching specimens in this collection
                </h3>
                <p className="text-xs text-charcoal/60">
                  Try adjusting the price slider or resetting filters.
                </p>
                <Button variant="secondary" size="sm" onClick={handleResetFilters}>
                  Clear Collection Filters
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  gridCols === 4
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-floating overflow-y-auto p-6 z-10"
            >
              <FilterSidebar
                selectedCategory={categorySlug}
                onSelectCategory={(slug) => {
                  if (slug === 'all') window.location.href = '/shop';
                  else window.location.href = `/collections/${slug}`;
                }}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                selectedSunlight={selectedSunlight}
                onToggleSunlight={handleToggleSunlight}
                selectedDifficulty={selectedDifficulty}
                onToggleDifficulty={handleToggleDifficulty}
                selectedSize={selectedSize}
                onToggleSize={handleToggleSize}
                petSafeOnly={petSafeOnly}
                onTogglePetSafe={() => setPetSafeOnly(!petSafeOnly)}
                airPurifierOnly={airPurifierOnly}
                onToggleAirPurifier={() => setAirPurifierOnly(!airPurifierOnly)}
                rareOnly={rareOnly}
                onToggleRare={() => setRareOnly(!rareOnly)}
                bestsellerOnly={bestsellerOnly}
                onToggleBestseller={() => setBestsellerOnly(!bestsellerOnly)}
                onResetFilters={handleResetFilters}
                activeFilterCount={activeFilterCount}
                onCloseMobile={() => setIsMobileFilterOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
