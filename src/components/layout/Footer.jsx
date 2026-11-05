import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../brand/Logo';
import { Mail, MapPin, Phone, ShieldCheck, Heart } from 'lucide-react';

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-forest text-cream pt-20 pb-12 border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
        {/* Top Brand Banner Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-forest-800 gap-8">
          <div className="space-y-4 max-w-md">
            <Logo size="lg" theme="light" showSubline={true} />
            <p className="font-serif italic text-sage text-base sm:text-lg">
              "Bring Nature Into Your Space."
            </p>
            <p className="font-sans text-xs text-cream/70 leading-relaxed">
              Curated architectural botanical greenery and organic plant care designed for contemporary living. Cultivated with patience in artisanal small-batch greenhouses.
            </p>
          </div>

          {/* Direct Concierge Contact */}
          <div className="flex flex-col sm:flex-row gap-6 text-xs font-sans text-cream/80">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-sage shrink-0 mt-0.5" />
              <div>
                <span className="block font-medium text-cream">Botanical Atelier</span>
                <span className="text-cream/60">Bandra West, Mumbai 400050</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-sage shrink-0 mt-0.5" />
              <div>
                <span className="block font-medium text-cream">Care Concierge</span>
                <a href="mailto:concierge@verdora.in" className="text-cream/60 hover:text-sage transition-colors">
                  concierge@verdora.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Column Directory Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 font-sans text-xs">
          {/* Column 1: Shopping Collections */}
          <div className="space-y-4">
            <h4 className="font-serif text-base text-cream tracking-tight uppercase">
              Botanical Collections
            </h4>
            <ul className="space-y-2.5 text-cream/70">
              <li>
                <Link to="/collections/indoor" className="hover:text-sage transition-colors">
                  Indoor Plants
                </Link>
              </li>
              <li>
                <Link to="/collections/outdoor" className="hover:text-sage transition-colors">
                  Outdoor Specimens
                </Link>
              </li>
              <li>
                <Link to="/collections/succulents" className="hover:text-sage transition-colors">
                  Succulents & Cacti
                </Link>
              </li>
              <li>
                <Link to="/collections/flowering" className="hover:text-sage transition-colors">
                  Flowering Varieties
                </Link>
              </li>
              <li>
                <Link to="/collections/rare" className="hover:text-sage transition-colors">
                  Rare & Variegated Vault
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-sage transition-colors font-medium text-sage">
                  All Plants (Full Catalog) &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Care & Diagnostics */}
          <div className="space-y-4">
            <h4 className="font-serif text-base text-cream tracking-tight uppercase">
              Care & Science
            </h4>
            <ul className="space-y-2.5 text-cream/70">
              <li>
                <Link to="/plant-finder" className="hover:text-sage transition-colors">
                  Interactive Plant Diagnostic
                </Link>
              </li>
              <li>
                <Link to="/plant-care" className="hover:text-sage transition-colors">
                  The Plant Care Journal
                </Link>
              </li>
              <li>
                <a href="#light-guide" className="hover:text-sage transition-colors">
                  Light Metering Handbook
                </a>
              </li>
              <li>
                <a href="#pet-safety" className="hover:text-sage transition-colors">
                  Pet-Safety Toxicity Directory
                </a>
              </li>
              <li>
                <a href="#potting" className="hover:text-sage transition-colors">
                  Unglazed Terracotta Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Orders */}
          <div className="space-y-4">
            <h4 className="font-serif text-base text-cream tracking-tight uppercase">
              Customer Sanctuary
            </h4>
            <ul className="space-y-2.5 text-cream/70">
              <li>
                <Link to="/track-order" className="hover:text-sage transition-colors">
                  Track Your Delivery
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-sage transition-colors">
                  Your Botanical Bag
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-sage transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <a href="#shipping" className="hover:text-sage transition-colors">
                  Free Shipping Policy (₹999)
                </a>
              </li>
              <li>
                <a href="#vitality-promise" className="hover:text-sage transition-colors">
                  14-Day Vitality Guarantee
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sage transition-colors">
                  Contact Plant Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: The Brand Maison */}
          <div className="space-y-4">
            <h4 className="font-serif text-base text-cream tracking-tight uppercase">
              Brand Maison
            </h4>
            <ul className="space-y-2.5 text-cream/70">
              <li>
                <Link to="/about" className="hover:text-sage transition-colors">
                  Our Editorial Story
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-sage transition-colors font-medium text-sage">
                  Portfolio Case Study &rarr;
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-sage transition-colors">
                  Admin Portal
                </Link>
              </li>
              <li>
                <Link to="/design-system" className="hover:text-sage transition-colors text-sage/80 font-mono">
                  Design System Showcase
                </Link>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-sage transition-colors">
                  Zero-Plastic Packaging
                </a>
              </li>
              <li>
                <a href="#greenhouses" className="hover:text-sage transition-colors">
                  Artisanal Greenhouses
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal, Social & Currency Bar */}
        <div className="pt-8 border-t border-forest-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] font-sans text-cream/60">
          <div className="flex items-center gap-6">
            <p>© {new Date().getFullYear()} VERDORA Botanical Living. All rights reserved.</p>
            <span className="hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1 text-sage">
              Currency: INR (₹)
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-cream/70">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-sage transition-colors" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-sage transition-colors" aria-label="YouTube">
              <YoutubeIcon />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-sage transition-colors" aria-label="Facebook">
              <FacebookIcon />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-cream/50">
            <a href="#privacy" className="hover:text-cream transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#terms" className="hover:text-cream transition-colors">Terms of Living</a>
            <span>·</span>
            <a href="#security" className="hover:text-cream transition-colors">Encrypted Checkout</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
