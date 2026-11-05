import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="bg-forest text-cream py-2 px-4 text-center relative z-40 border-b border-forest-800 text-[11px] sm:text-xs font-sans tracking-editorial uppercase select-none transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden lg:block w-36" />

        <div className="flex items-center justify-center gap-2 flex-1 text-center">
          <Sparkles className="w-3.5 h-3.5 text-sage animate-pulse shrink-0" />
          <span className="font-medium text-cream/95">
            Free Shipping on Orders Above ₹999 <span className="text-sage/60 mx-1.5 hidden sm:inline">|</span> <span className="hidden sm:inline text-sage">Discover Your Green Side.</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center justify-end w-36">
          <Link
            to="/portfolio"
            className="text-[10px] font-mono text-sage hover:text-cream bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded transition-colors normal-case inline-flex items-center gap-1"
            title="View Developer Portfolio Case Study"
          >
            <span>Case Study</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}