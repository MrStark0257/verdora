import React from 'react';
import { Filter, X, RotateCcw, Check, Sun, Droplets, ShieldCheck, Sparkles, Wind } from 'lucide-react';
import { categories } from '../../data/products';

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  selectedSunlight,
  onToggleSunlight,
  selectedDifficulty,
  onToggleDifficulty,
  selectedSize,
  onToggleSize,
  petSafeOnly,
  onTogglePetSafe,
  airPurifierOnly,
  onToggleAirPurifier,
  rareOnly,
  onToggleRare,
  bestsellerOnly,
  onToggleBestseller,
  onResetFilters,
  activeFilterCount,
  onCloseMobile,
}) {
  const sunlightOptions = [
    { label: 'Low Ambient Light', value: 'Low' },
    { label: 'Medium Indirect Light', value: 'Medium' },
    { label: 'Bright Indirect Light', value: 'Bright' },
    { label: 'Direct Sunlight', value: 'Direct' },
  ];

  const difficultyOptions = ['Easy', 'Moderate', 'Master'];
  const sizeOptions = ['Small', 'Medium', 'Large', 'Trailing'];

  return (
    <aside className="w-full bg-white rounded-editorial border border-forest/10 p-6 shadow-subtle space-y-8 font-sans">
      {/* Sidebar Header with Active Count & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-forest/10">
        <div className="flex items-center gap-2 text-forest">
          <Filter className="w-4 h-4 text-botanical" />
          <h3 className="font-serif text-lg font-medium text-forest">
            Refine Catalog
          </h3>
          {activeFilterCount > 0 && (
            <span className="bg-forest text-cream text-[10px] font-mono px-2 py-0.5 rounded-pill">
              {activeFilterCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs text-charcoal/60 hover:text-earth underline flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}

          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-charcoal/60 hover:text-forest"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-3">
        <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal/60 block font-semibold">
          Plant Category
        </span>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-editorial text-xs transition-colors ${
              selectedCategory === 'all'
                ? 'bg-forest text-cream font-medium shadow-sm'
                : 'text-charcoal/80 hover:bg-forest/5'
            }`}
          >
            <span>All Specimens</span>
            <span className="text-[10px] opacity-70">16</span>
          </button>

          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectCategory(c.slug)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-editorial text-xs transition-colors ${
                selectedCategory === c.slug
                  ? 'bg-forest text-cream font-medium shadow-sm'
                  : 'text-charcoal/80 hover:bg-forest/5'
              }`}
            >
              <span>{c.name}</span>
              <span className="text-[10px] opacity-70">{c.itemCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Price Range Slider */}
      <div className="space-y-3 pt-4 border-t border-forest/10">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal/60 font-semibold">
            Maximum Price
          </span>
          <span className="font-mono text-xs font-semibold text-forest">
            ₹{priceRange.toLocaleString('en-IN')}
          </span>
        </div>

        <input
          type="range"
          min="500"
          max="4000"
          step="100"
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-forest cursor-pointer"
        />

        <div className="flex justify-between text-[10px] font-mono text-charcoal/50">
          <span>₹500</span>
          <span>₹2,250</span>
          <span>₹4,000+</span>
        </div>
      </div>

      {/* 3. Sunlight Filter Checkboxes */}
      <div className="space-y-3 pt-4 border-t border-forest/10">
        <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal/60 block font-semibold">
          Sunlight Availability
        </span>
        <div className="space-y-2">
          {sunlightOptions.map((opt) => {
            const isChecked = selectedSunlight.includes(opt.value);
            return (
              <label
                key={opt.value}
                className="flex items-center gap-2.5 text-xs text-charcoal/80 hover:text-forest cursor-pointer select-none"
              >
                <div
                  onClick={() => onToggleSunlight(opt.value)}
                  className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${
                    isChecked ? 'bg-forest border-forest text-cream' : 'border-forest/25 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Care Difficulty */}
      <div className="space-y-3 pt-4 border-t border-forest/10">
        <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal/60 block font-semibold">
          Care Difficulty
        </span>
        <div className="flex flex-wrap gap-2">
          {difficultyOptions.map((d) => {
            const isSelected = selectedDifficulty.includes(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() => onToggleDifficulty(d)}
                className={`px-3 py-1.5 rounded-editorial text-xs transition-colors border ${
                  isSelected
                    ? 'bg-botanical text-cream border-botanical font-medium'
                    : 'bg-cream/40 text-charcoal/80 border-forest/15 hover:bg-forest/5'
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Plant Size */}
      <div className="space-y-3 pt-4 border-t border-forest/10">
        <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal/60 block font-semibold">
          Plant Size Scale
        </span>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((s) => {
            const isSelected = selectedSize.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => onToggleSize(s)}
                className={`px-3 py-1.5 rounded-editorial text-xs transition-colors border ${
                  isSelected
                    ? 'bg-forest text-cream border-forest font-medium'
                    : 'bg-cream/40 text-charcoal/80 border-forest/15 hover:bg-forest/5'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Special Attributes & Safety Checkboxes */}
      <div className="space-y-3 pt-4 border-t border-forest/10">
        <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal/60 block font-semibold">
          Special Curations
        </span>
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 text-xs text-charcoal/80 hover:text-forest cursor-pointer select-none">
            <div
              onClick={onTogglePetSafe}
              className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${
                petSafeOnly ? 'bg-botanical border-botanical text-cream' : 'border-forest/25 bg-white'
              }`}
            >
              {petSafeOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-botanical" />
              100% Pet-Safe Only
            </span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-charcoal/80 hover:text-forest cursor-pointer select-none">
            <div
              onClick={onToggleAirPurifier}
              className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${
                airPurifierOnly ? 'bg-botanical border-botanical text-cream' : 'border-forest/25 bg-white'
              }`}
            >
              {airPurifierOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className="flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-botanical" />
              NASA Air-Purifiers
            </span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-charcoal/80 hover:text-forest cursor-pointer select-none">
            <div
              onClick={onToggleRare}
              className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${
                rareOnly ? 'bg-forest border-forest text-cream' : 'border-forest/25 bg-white'
              }`}
            >
              {rareOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-earth" />
              Rare & Variegated Cultivars
            </span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-charcoal/80 hover:text-forest cursor-pointer select-none">
            <div
              onClick={onToggleBestseller}
              className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${
                bestsellerOnly ? 'bg-forest border-forest text-cream' : 'border-forest/25 bg-white'
              }`}
            >
              {bestsellerOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span>Bestsellers Only</span>
          </label>
        </div>
      </div>
    </aside>
  );
}

