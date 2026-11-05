import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ImageZoomGallery from '../components/product/ImageZoomGallery';
import ProductReviews from '../components/product/ProductReviews';
import ProductCard from '../components/product/ProductCard';
import Rating from '../components/ui/Rating';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  Sun,
  Droplets,
  ShieldCheck,
  ShieldAlert,
  Maximize2,
  TrendingUp,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Check,
  Heart,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('care'); // 'care' | 'shipping' | 'reviews'
  const [isAdded, setIsAdded] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Find product
  const product = useMemo(() => {
    return products.find((p) => p.slug === slug) || products[0];
  }, [slug]);

  const isFavorited = isInWishlist(product.id);

  // Track Recently Viewed in localStorage
  useEffect(() => {
    if (!product) return;
    try {
      const saved = JSON.parse(localStorage.getItem('verdora_recently_viewed') || '[]');
      const filtered = saved.filter((id) => id !== product.id);
      const updated = [product.id, ...filtered].slice(0, 5);
      localStorage.setItem('verdora_recently_viewed', JSON.stringify(updated));

      // Resolve full product objects for display
      const recentProducts = updated
        .filter((id) => id !== product.id)
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean);
      setRecentlyViewed(recentProducts);
    } catch (e) {
      console.error(e);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug, product]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  // Related products from same category
  const relatedProducts = useMemo(() => {
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  return (
    <div className="min-h-screen bg-offwhite text-charcoal flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-12 py-8 sm:py-12 w-full space-y-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-sans text-charcoal/60">
          <Link to="/" className="hover:text-forest transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal/40" />
          <Link to="/shop" className="hover:text-forest transition-colors">Catalog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal/40" />
          <Link to={`/collections/${product.category}`} className="hover:text-forest transition-colors capitalize">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal/40" />
          <span className="text-forest font-medium">{product.name}</span>
        </nav>

        {/* 2-Column Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Image Zoom Gallery */}
          <div className="lg:col-span-6 sticky top-28">
            <ImageZoomGallery
              images={product.images && product.images.length > 0 ? product.images : [product.image]}
              name={product.name}
              isBestseller={product.isBestseller}
              isRare={product.isRare}
              isPetSafe={product.isPetSafe}
            />
          </div>

          {/* Right: Product Details & Purchase Actions */}
          <div className="lg:col-span-6 space-y-8">
            {/* Title & Binomial */}
            <div className="space-y-2 border-b border-forest/10 pb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold">
                  {product.category} Specimen
                </span>
                <span className="text-charcoal/30">·</span>
                <span className="text-xs font-mono text-charcoal/60">
                  {product.stockCount ? `${product.stockCount} in stock` : 'Available'}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl text-forest tracking-tight leading-tight">
                {product.name}
              </h1>

              {product.botanicalName && (
                <p className="font-serif italic text-base sm:text-lg text-charcoal/60">
                  {product.botanicalName}
                </p>
              )}

              {/* Price & Rating */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-sans text-3xl sm:text-4xl font-bold text-forest">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="font-sans text-base text-charcoal/40 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-earth/15 text-earth text-xs font-mono px-2 py-0.5 rounded font-medium">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <Rating rating={product.rating} reviewCount={product.reviewCount} size="md" />
                </div>
              </div>
            </div>

            {/* Narrative Description */}
            <p className="font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed">
              {product.description || product.shortDescription}
            </p>

            {/* Key Botanical Metrics Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-5 bg-cream/50 rounded-editorial border border-forest/10 text-xs">
              <div className="flex items-center gap-2.5">
                <Sun className="w-4 h-4 text-earth shrink-0" />
                <div>
                  <span className="block text-[10px] text-charcoal/50 uppercase font-mono">Sunlight</span>
                  <span className="font-medium text-forest">{product.sunlight}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Droplets className="w-4 h-4 text-botanical shrink-0" />
                <div>
                  <span className="block text-[10px] text-charcoal/50 uppercase font-mono">Watering</span>
                  <span className="font-medium text-forest">{product.watering}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {product.isPetSafe ? (
                  <ShieldCheck className="w-4 h-4 text-botanical shrink-0" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-earth shrink-0" />
                )}
                <div>
                  <span className="block text-[10px] text-charcoal/50 uppercase font-mono">Pet Toxicity</span>
                  <span className="font-medium text-forest">
                    {product.isPetSafe ? '100% Pet-Safe' : 'Toxic to Animals'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Maximize2 className="w-4 h-4 text-forest/70 shrink-0" />
                <div>
                  <span className="block text-[10px] text-charcoal/50 uppercase font-mono">Plant Size</span>
                  <span className="font-medium text-forest">{product.size}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-botanical shrink-0" />
                <div>
                  <span className="block text-[10px] text-charcoal/50 uppercase font-mono">Growth Rate</span>
                  <span className="font-medium text-forest">{product.growthRate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-earth shrink-0" />
                <div>
                  <span className="block text-[10px] text-charcoal/50 uppercase font-mono">Difficulty</span>
                  <span className="font-medium text-forest">{product.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Interactive Botanical Vitality Meters */}
            <div className="space-y-3 p-5 bg-cream/30 rounded-editorial border border-forest/10">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-forest font-semibold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-botanical" /> Botanical Vitality Index
                </span>
                <span className="text-[11px] text-botanical font-bold">Specimen Grade A+</span>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <div>
                  <div className="flex justify-between text-charcoal/70 mb-1">
                    <span>Light Requirement ({product.sunlight})</span>
                    <span className="font-mono text-forest">
                      {product.sunlight?.toLowerCase().includes('low') ? '35% Ambient' : product.sunlight?.toLowerCase().includes('bright') ? '85% Bright' : '65% Medium'}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-cream-200 rounded-pill overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: product.sunlight?.toLowerCase().includes('low') ? '35%' : product.sunlight?.toLowerCase().includes('bright') ? '85%' : '65%'
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-earth rounded-pill"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-charcoal/70 mb-1">
                    <span>Hydration Demand ({product.watering})</span>
                    <span className="font-mono text-forest">
                      {product.watering?.toLowerCase().includes('2-3') ? '30% Drought-Tolerant' : product.watering?.toLowerCase().includes('daily') ? '90% Frequent' : '55% Moderate'}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-cream-200 rounded-pill overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: product.watering?.toLowerCase().includes('2-3') ? '30%' : product.watering?.toLowerCase().includes('daily') ? '90%' : '55%'
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                      className="h-full bg-botanical rounded-pill"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-charcoal/70 mb-1">
                    <span>Care Resilience ({product.difficulty})</span>
                    <span className="font-mono text-forest">
                      {product.difficulty?.toLowerCase().includes('easy') ? '95% Beginner-Friendly' : '70% Attentive'}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-cream-200 rounded-pill overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: product.difficulty?.toLowerCase().includes('easy') ? '95%' : '70%'
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                      className="h-full bg-forest rounded-pill"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Dual CTAs (Add to Cart / Buy Now) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-forest/20 rounded-editorial bg-white px-3 py-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-charcoal/60 hover:text-forest"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-mono text-sm font-semibold text-forest">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-charcoal/60 hover:text-forest"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Bag */}
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  icon={isAdded ? Check : null}
                >
                  {isAdded ? 'Added to Bag!' : `Add to Bag · ₹${(product.price * quantity).toLocaleString('en-IN')}`}
                </Button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-editorial border transition-colors ${
                    isFavorited
                      ? 'bg-earth text-cream border-earth'
                      : 'border-forest/20 text-forest hover:bg-forest/5'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <Button
                variant="earth"
                size="md"
                fullWidth={true}
                onClick={handleBuyNow}
                icon={ArrowRight}
              >
                Instant Buy Now
              </Button>
            </div>

            {/* Reassurance Guarantees */}
            <div className="pt-4 border-t border-forest/10 grid grid-cols-2 gap-4 text-xs font-sans text-charcoal/70">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-botanical" />
                <span>Free shipping on orders above ₹999</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-botanical" />
                <span>14-Day botanical vitality guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Information: Care Guide, Shipping & Reviews */}
        <section className="pt-16 border-t border-forest/15 space-y-8">
          <div className="flex items-center justify-center gap-6 sm:gap-10 border-b border-forest/10 pb-4 font-serif text-base sm:text-lg">
            <button
              type="button"
              onClick={() => setActiveTab('care')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'care' ? 'text-forest font-semibold' : 'text-charcoal/40 hover:text-forest'
              }`}
            >
              Botanical Care Guide
              {activeTab === 'care' && (
                <motion.span
                  layoutId="productTabIndicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-forest"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('shipping')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'shipping' ? 'text-forest font-semibold' : 'text-charcoal/40 hover:text-forest'
              }`}
            >
              Packaging & Vitality Guarantee
              {activeTab === 'shipping' && (
                <motion.span
                  layoutId="productTabIndicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-forest"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'reviews' ? 'text-forest font-semibold' : 'text-charcoal/40 hover:text-forest'
              }`}
            >
              Customer Reviews ({product.reviewCount || 142})
              {activeTab === 'reviews' && (
                <motion.span
                  layoutId="productTabIndicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-forest"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
            </button>
          </div>

          {/* Active Tab Content with Smooth Transition */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'care' && (
                <motion.div
                  key="tab-care"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white rounded-editorial border border-forest/10 shadow-subtle text-xs sm:text-sm font-sans space-y-3"
                >
                  <div className="space-y-1">
                    <h4 className="font-serif text-base text-forest flex items-center gap-2">
                      <Sun className="w-4 h-4 text-earth" /> Light & Position
                    </h4>
                    <p className="text-charcoal/70 leading-relaxed">
                      {product.care?.light || 'Place in medium to bright filtered light. Avoid harsh scorch sun.'}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-serif text-base text-forest flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-botanical" /> Hydration Regimen
                    </h4>
                    <p className="text-charcoal/70 leading-relaxed">
                      {product.care?.water || 'Water when the top 2-3 inches of potting medium dry out thoroughly.'}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-serif text-base text-forest flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-botanical" /> Humidity & Climate
                    </h4>
                    <p className="text-charcoal/70 leading-relaxed">
                      {product.care?.humidity || 'Enjoys 50-65% atmospheric humidity. Light morning misting is beneficial.'}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-serif text-base text-forest flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-earth" /> Toxicity Guidance
                    </h4>
                    <p className="text-charcoal/70 leading-relaxed">
                      {product.care?.toxicity || (product.isPetSafe ? 'Non-toxic to cats and dogs.' : 'Harmful if ingested.')}
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'shipping' && (
                <motion.div
                  key="tab-shipping"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="p-8 bg-white rounded-editorial border border-forest/10 shadow-subtle space-y-6 text-xs sm:text-sm font-sans"
                >
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg text-forest">Eco-Insulated Transit Protection</h4>
                    <p className="text-charcoal/70 leading-relaxed">
                      Every VERDORA plant travels nestled inside our custom moisture-retaining root cradles and corrugated bamboo cartons. The root ball is hydrated 24 hours prior to dispatch to ensure zero hydration shock.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg text-forest">14-Day Botanical Vitality Guarantee</h4>
                    <p className="text-charcoal/70 leading-relaxed">
                      Plants are living beings. If your specimen shows signs of irreversible transit trauma or fails to acclimate within 14 days of arrival, our botanists will diagnose or issue a free replacement with zero hassle.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="tab-reviews"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProductReviews product={product} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <section className="pt-16 border-t border-forest/15 space-y-8">
            <div className="flex items-end justify-between">
              <div>
                <span className="font-sans text-xs uppercase font-mono tracking-widest text-botanical block mb-1">
                  Harmonious Companions
                </span>
                <h3 className="font-serif text-3xl text-forest">
                  You May Also Love
                </h3>
              </div>
              <Link to={`/collections/${product.category}`} className="text-xs font-sans uppercase tracking-editorial text-forest hover:text-botanical font-medium">
                View Full Collection &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed Products */}
        {recentlyViewed.length > 0 && (
          <section className="pt-16 border-t border-forest/15 space-y-8">
            <h3 className="font-serif text-2xl text-forest">
              Recently Viewed Botanical Specimens
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewed.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
