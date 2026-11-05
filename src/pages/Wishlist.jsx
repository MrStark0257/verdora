import React from 'react';
import { Link } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Rating from '../components/ui/Rating';
import Badge from '../components/ui/Badge';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { getAssetUrl } from '../utils/assetUrl';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, Sun, Droplets } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, wishlistCount, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  return (
    <div className="min-h-screen bg-offwhite text-charcoal flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-12 py-12 w-full space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-forest/15 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold block mb-1">
              Curated Sanctuary
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-forest tracking-tight">
              Saved Botanical Specimens
            </h1>
          </div>

          <div className="text-xs font-mono uppercase tracking-widest text-charcoal/60 bg-cream px-3 py-1.5 rounded-editorial border border-forest/10 self-start sm:self-auto">
            {wishlistCount} {wishlistCount === 1 ? 'Specimen' : 'Specimens'} Saved
          </div>
        </div>

        {/* Content */}
        {wishlist.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-editorial border border-forest/10 p-8 space-y-5">
            <div className="w-20 h-20 rounded-full bg-cream mx-auto flex items-center justify-center text-forest/40">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-3xl text-forest">Your wishlist is empty</h2>
            <p className="font-sans text-sm text-charcoal/60 max-w-md mx-auto leading-relaxed">
              Explore our botanical specimens and click the heart icon on any plant to curate your personal dream collection.
            </p>
            <div className="pt-2">
              <Button to="/shop" variant="primary" size="md" icon={ArrowRight}>
                Discover Living Specimens
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white rounded-editorial border border-forest/10 overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] bg-cream/40 overflow-hidden">
                  <Link to={`/product/${product.slug}`} className="block w-full h-full">
                    <img
                      src={getAssetUrl(product.images?.[0] || product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-charcoal/60 hover:text-earth transition-colors backdrop-blur-sm"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
                    {product.isRare && <Badge variant="rare">Rare Drop</Badge>}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] font-sans text-charcoal/60">
                      <span className="flex items-center gap-1">
                        <Sun className="w-3 h-3 text-earth" /> {product.sunlight?.split(' ')[0] || 'Medium'}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-botanical" /> {product.difficulty}
                      </span>
                    </div>

                    <Link to={`/product/${product.slug}`} className="font-serif text-lg font-medium text-forest hover:text-botanical transition-colors block">
                      {product.name}
                    </Link>

                    {product.botanicalName && (
                      <p className="font-serif italic text-xs text-charcoal/50">
                        {product.botanicalName}
                      </p>
                    )}

                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="font-sans text-lg font-bold text-forest">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="font-sans text-xs text-charcoal/40 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Move to Cart Action Button */}
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth={true}
                    onClick={() => handleMoveToCart(product)}
                    icon={ShoppingBag}
                  >
                    Move to Bag
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

