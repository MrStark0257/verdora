import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ArrowUpRight, X, ExternalLink, Code2 } from 'lucide-react';

export default function PortfolioBadge() {
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();

  // Hide badge on the case study page itself
  if (location.pathname === '/portfolio' || location.pathname === '/case-study') {
    return null;
  }

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 left-4 z-50 bg-forest text-cream p-2.5 rounded-full shadow-floating border border-sage/30 hover:bg-forest-800 transition-all group"
        title="Show Portfolio Case Study"
        aria-label="Show Portfolio Case Study"
      >
        <Sparkles className="w-4 h-4 text-sage group-hover:rotate-12 transition-transform" />
      </button>
    );
  }

  return (
    <aside
      aria-label="Portfolio Demonstration Notice"
      className="fixed bottom-4 left-4 z-50 bg-forest/95 text-cream border border-sage/25 rounded-2xl p-3.5 shadow-floating backdrop-blur-md max-w-[280px] sm:max-w-xs font-sans text-xs transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-sage font-semibold">
            Developer Portfolio Project
          </span>
        </div>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-cream/50 hover:text-cream transition-colors p-0.5 rounded"
          title="Minimize badge"
          aria-label="Minimize badge"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-[11px] text-cream/80 leading-snug mb-3">
        <strong>VERDORA</strong> is a concept e-commerce demonstration designed to showcase luxury UI/UX and advanced React engineering.
      </p>

      <div className="flex items-center gap-2">
        <Link
          to="/portfolio"
          className="flex-1 bg-cream text-forest hover:bg-white px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide uppercase transition-colors text-center inline-flex items-center justify-center gap-1"
        >
          <span>View Case Study</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          to="/admin"
          className="bg-white/10 hover:bg-white/20 text-cream px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-colors"
          title="Admin Portal"
        >
          Admin
        </Link>
      </div>

      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent('verdora_replay_intro'))}
        className="w-full mt-2.5 pt-2 border-t border-white/10 text-[10px] font-mono text-sage/80 hover:text-cream flex items-center justify-center gap-1.5 transition-colors"
        title="Replay Cinematic Intro Animation"
      >
        <span>🎬 Replay Intro Reveal</span>
      </button>
    </aside>
  );
}

