import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ShieldCheck, Sparkles, Award } from 'lucide-react';
import Badge from '../ui/Badge';
import { getAssetUrl } from '../../utils/assetUrl';

export default function ImageZoomGallery({ images = [], name, isBestseller, isRare, isPetSafe }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const rawImage = images[selectedIndex] || images[0];
  const activeImage = getAssetUrl(rawImage);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Featured Main Image with Zoom Lens */}
      <div
        className="relative aspect-[4/5] w-full rounded-editorial overflow-hidden bg-cream shadow-subtle border border-forest/10 cursor-crosshair select-none"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={activeImage}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-200 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }
              : undefined
          }
        />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
          {isBestseller && <Badge variant="bestseller" size="md">Bestseller</Badge>}
          {isRare && <Badge variant="rare" size="md">Rare Collector Vault</Badge>}
          {isPetSafe && <Badge variant="petsafe" size="md">100% Pet-Safe</Badge>}
        </div>

        {/* Zoom Hint Indicator */}
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] uppercase font-mono tracking-wider text-charcoal/70 flex items-center gap-1.5 pointer-events-none">
          <Maximize2 className="w-3 h-3 text-forest" />
          <span>Hover to Zoom</span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`w-20 h-24 rounded-editorial overflow-hidden border-2 transition-all shrink-0 bg-cream ${
                selectedIndex === idx
                  ? 'border-forest scale-95 shadow-sm'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={getAssetUrl(img)} alt={`${name} view ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

