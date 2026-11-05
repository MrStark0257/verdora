import React from 'react';
import { Link } from 'react-router-dom';

/**
 * VERDORA Premium Botanical Identity Logo
 * Combines an architectural 'V' monogram with an organic botanical leaf flourish and editorial wordmark.
 */
export const LogoSymbol = ({ className = 'w-9 h-9', theme = 'dark' }) => {
  const isLight = theme === 'light';
  const strokeColor = isLight ? '#F5F1E7' : '#183D2B';
  const leafColor = isLight ? '#A3B89B' : '#315B40';
  const veinColor = isLight ? '#183D2B' : '#F5F1E7';

  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${className}`}
      aria-label="VERDORA Botanical V Emblem"
    >
      {/* Background Soft Glow (optional editorial touch) */}
      <circle cx="30" cy="30" r="28" fill={isLight ? 'rgba(245, 241, 231, 0.08)' : 'rgba(163, 184, 155, 0.15)'} />
      
      {/* Architectural Left Arm of V */}
      <path
        d="M17 18L28 43C28.5 44.2 30.5 44.2 31 43L36 32"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Organic Curved Leaf nested inside the V */}
      <path
        d="M29.5 43C29.5 43 25 32 34 22C39 16.5 44 17 44 17C44 17 44.5 24 38.5 31.5C34 37 29.5 43 29.5 43Z"
        fill={leafColor}
      />

      {/* Leaf Central Vein accent */}
      <path
        d="M30 42C32.5 35 36.5 28 42.5 19.5"
        stroke={veinColor}
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Right Arm of V finishing clean */}
      <path
        d="M36 32L43 18"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Tiny Botanical Seed Dot Accent */}
      <circle cx="44" cy="15" r="1.8" fill={leafColor} />
    </svg>
  );
};

export const LogoWordmark = ({ theme = 'dark', showSubline = true, size = 'md' }) => {
  const isLight = theme === 'light';
  const primaryText = isLight ? 'text-cream' : 'text-forest';
  const subText = isLight ? 'text-sage-200' : 'text-charcoal/70';

  const sizeClasses = {
    sm: { title: 'text-xl tracking-[0.22em]', sub: 'text-[9px] tracking-[0.32em]' },
    md: { title: 'text-2xl tracking-[0.24em]', sub: 'text-[10px] tracking-[0.34em]' },
    lg: { title: 'text-3xl tracking-[0.26em]', sub: 'text-[11px] tracking-[0.36em]' },
    xl: { title: 'text-4xl tracking-[0.28em]', sub: 'text-[13px] tracking-[0.38em]' },
  }[size] || { title: 'text-2xl tracking-[0.24em]', sub: 'text-[10px] tracking-[0.34em]' };

  return (
    <div className="flex flex-col select-none leading-none">
      <span className={`font-serif font-semibold uppercase ${primaryText} ${sizeClasses.title} transition-colors duration-300`}>
        VERDORA
      </span>
      {showSubline && (
        <span className={`font-sans font-medium uppercase mt-1 ${subText} ${sizeClasses.sub} transition-colors duration-300`}>
          Botanical Living
        </span>
      )}
    </div>
  );
};

const Logo = ({
  variant = 'full', // 'full' | 'symbol' | 'wordmark'
  theme = 'dark', // 'dark' | 'light'
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  to = '/',
  showSubline = true,
  className = '',
}) => {
  const symbolSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  }[size] || 'w-9 h-9';

  const content = (
    <div className={`inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-95 ${className}`}>
      {(variant === 'full' || variant === 'symbol') && (
        <LogoSymbol className={symbolSizes} theme={theme} />
      )}
      {(variant === 'full' || variant === 'wordmark') && (
        <LogoWordmark theme={theme} showSubline={showSubline} size={size} />
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/30 rounded">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;

