import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { products, categories } from '../../data/products';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, openQuickView } = useUI();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Focus input automatically on open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.botanicalName?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.difficulty?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
        />

        {/* Search Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-offwhite rounded-editorial shadow-floating border border-forest/15 overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-6 py-4.5 border-b border-forest/15 bg-white">
            <Search className="w-5 h-5 text-forest/70 shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search botanical specimens, rare cultivars, light conditions..."
              className="w-full bg-transparent font-sans text-charcoal text-base placeholder:text-charcoal/40 outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-charcoal/40 hover:text-forest mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="text-xs uppercase font-mono tracking-widest text-charcoal/50 hover:text-forest px-2 py-1 bg-cream rounded"
            >
              ESC
            </button>
          </div>

          {/* Search Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
            {query.trim() === '' ? (
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-charcoal/50 block">
                  Popular Botanical Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Monstera', 'Pet-Safe Plants', 'Fiddle Leaf', 'Low Light', 'Raven ZZ', 'Calathea', 'Air Purifying'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="text-xs font-sans px-3 py-1.5 bg-cream hover:bg-forest hover:text-cream text-charcoal/80 rounded-editorial transition-colors border border-forest/10"
                    >
                      {term}
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-forest/10">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-charcoal/50 block mb-2">
                    Browse Categories
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map((c) => (
                      <Link
                        key={c.id}
                        to={`/collections/${c.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-2.5 bg-white hover:bg-cream rounded-editorial border border-forest/10 text-xs font-medium text-forest transition-colors flex items-center justify-between"
                      >
                        <span>{c.name}</span>
                        <ArrowRight className="w-3 h-3 text-forest/40" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <p className="font-serif text-lg text-forest">No specimens found for "{query}"</p>
                <p className="text-xs text-charcoal/60">
                  Try searching by broader attributes like "Indoor", "Easy", or "Low Light".
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-charcoal/50 block">
                  Found {filteredProducts.length} Matching Plants
                </span>

                <div className="divide-y divide-forest/10">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="py-3 flex items-center justify-between gap-4 group hover:bg-forest/5 px-2 rounded-editorial transition-colors"
                    >
                      <Link
                        to={`/product/${p.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3.5 flex-1"
                      >
                        <div className="w-12 h-14 rounded-editorial overflow-hidden bg-cream shrink-0">
                          <img
                            src={p.images?.[0] || p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-medium text-forest group-hover:text-botanical transition-colors">
                            {p.name}
                          </h4>
                          {p.botanicalName && (
                            <p className="font-serif italic text-[11px] text-charcoal/50">
                              {p.botanicalName}
                            </p>
                          )}
                          <span className="text-[10px] uppercase font-mono tracking-wider text-botanical">
                            {p.category} · {p.difficulty}
                          </span>
                        </div>
                      </Link>

                      <div className="text-right">
                        <span className="font-sans text-sm font-semibold text-forest block">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setIsSearchOpen(false);
                            openQuickView(p);
                          }}
                          className="text-[11px] font-sans text-charcoal/60 hover:text-forest underline uppercase tracking-wider"
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

