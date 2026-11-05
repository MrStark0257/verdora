/**
 * VERDORA Design System — Design Tokens & Architecture
 * Centralized specifications for brand identity, editorial typography, and botanical colors.
 */

export const brandTokens = {
  name: 'VERDORA',
  tagline: 'Bring Nature Into Your Space.',
  heroHeadline: 'Let Nature Find Its Place.',
  heroDescription:
    'Discover a curated collection of beautiful indoor and outdoor plants designed to bring life, freshness and tranquility into your everyday spaces.',
  announcement:
    'Free Shipping on Orders Above ₹999 | Discover Your Green Side.',
  personality: [
    'Elegant',
    'Premium',
    'Natural',
    'Minimalist',
    'Modern',
    'Sophisticated',
  ],
};

export const colorPalette = [
  {
    name: 'Primary Forest Green',
    hex: '#183D2B',
    role: 'Primary brand anchor, stately headings, primary CTA buttons, dark navbar state',
    textDark: false,
    contrastRatio: '11.8:1 with Cream',
  },
  {
    name: 'Botanical Green',
    hex: '#315B40',
    role: 'Secondary accent, botanical highlights, active icons, hover highlights',
    textDark: false,
    contrastRatio: '7.2:1 with Cream',
  },
  {
    name: 'Sage Green',
    hex: '#A3B89B',
    role: 'Soft badge fills, borders, decorative leaf curves, scrollbars',
    textDark: true,
    contrastRatio: '3.6:1 with Forest (accessible for large accents/tags)',
  },
  {
    name: 'Cream',
    hex: '#F5F1E7',
    role: 'Warm editorial background, solid scrolled navbar, card fills, text on forest',
    textDark: true,
    contrastRatio: '12.4:1 with Forest',
  },
  {
    name: 'Off White',
    hex: '#FCFBF7',
    role: 'Base canvas body color, maximum natural light and whitespace breathing room',
    textDark: true,
    contrastRatio: '14.1:1 with Charcoal',
  },
  {
    name: 'Earth Brown',
    hex: '#8A674B',
    role: 'Terracotta accents, star ratings, warm price tags, soil & ceramic pot cues',
    textDark: false,
    contrastRatio: '5.1:1 with Off White',
  },
  {
    name: 'Charcoal',
    hex: '#252A25',
    role: 'High-legibility body copy, secondary typography, subtle micro-borders',
    textDark: false,
    contrastRatio: '13.9:1 with Off White',
  },
];

export const typographySystem = {
  headings: {
    fontFamily: 'Playfair Display, Georgia, serif',
    weights: 'Regular (400), Medium (500), SemiBold (600), Bold (700)',
    role: 'Editorial elegance, storytelling headlines, product titles, hero statements',
    examples: [
      { tag: 'Hero Title', style: 'font-serif text-5xl md:text-7xl font-normal leading-[1.08] tracking-tight' },
      { tag: 'Section Heading', style: 'font-serif text-3xl md:text-5xl font-normal tracking-tight' },
      { tag: 'Product Title', style: 'font-serif text-xl md:text-2xl font-medium tracking-tight' },
      { tag: 'Editorial Italic', style: 'font-serif italic font-normal tracking-wide' },
    ],
  },
  body: {
    fontFamily: 'Inter, system-ui, sans-serif',
    weights: 'Regular (400), Medium (500), SemiBold (600)',
    role: 'Clean functional interface text, pricing, botanical care metrics, button labels, form fields',
    examples: [
      { tag: 'Body Large', style: 'font-sans text-lg leading-relaxed text-charcoal/80' },
      { tag: 'Body Base', style: 'font-sans text-sm md:text-base leading-relaxed text-charcoal/80' },
      { tag: 'Micro / Metric', style: 'font-sans text-xs tracking-editorial uppercase font-medium' },
      { tag: 'Button Label', style: 'font-sans text-xs tracking-[0.14em] uppercase font-medium' },
    ],
  },
};

export const responsiveBreakpoints = [
  { name: 'Mobile (xs/sm)', range: '375px — 640px', behavior: 'Single column, full touch targets (48px+), slide drawer navigation' },
  { name: 'Tablet (md)', range: '768px — 1023px', behavior: '2-column product grids, compact filters, adapted hero proportions' },
  { name: 'Laptop (lg)', range: '1024px — 1279px', behavior: 'Full mega-menu, 3-column product showcase, split brand stories' },
  { name: 'Desktop (xl/2xl)', range: '1280px+', behavior: '4-column product grids, expansive editorial whitespace, immersive imagery' },
];

