import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Filter, LayoutGrid, Grid3X3, ArrowUpDown, Search } from 'lucide-react';

export default function ShopHeader({
  title = 'Botanical Catalog',
  subtitle = 'Discover our entire collection of indoor specimens, architectural foliage, and rare cultivars.',
  itemCount = 0,
  sortBy,
  onSortChange,
  gridCols,
  onGridColsChange,
  onOpenMobileFilters,
  activeFilterCount,
  searchQuery,
  onSearchChange,
  categoryName,
}) {
  return (
    <div className="space-y-6 pb-8 border-b border-forest/15">
      {/* Editorial Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-sans text-charcoal/60">
        <Link to="/" className="hover:text-forest transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-charcoal/40" />
        <Link to="/shop" className={categoryName ? 'hover:text-forest transition-colors' : 'text-forest font-medium'}>
          Shop All Plants
        </Link>
        {categoryName && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-charcoal/40" />
            <span className="text-forest font-medium">{categoryName}</span>
          </>
        )}
      </nav>

      {/* Main Title Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-5xl text-forest tracking-tight">
            {title}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-charcoal/70 mt-2 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Total Count Badge */}
        <div className="text-xs font-mono uppercase tracking-widest text-charcoal/60 bg-cream px-3 py-1.5 rounded-editorial border border-forest/10 self-start md:self-end">
          Showing <strong className="text-forest">{itemCount}</strong> Specimens
        </div>
      </div>

      {/* Controls Bar: In-Shop Search, Mobile Filter Button, Sort Dropdown & Grid View Switcher */}
      <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-cream/40 p-4 rounded-editorial border border-forest/10">
        {/* In-Catalog Live Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, light, pet-safety..."
            className="w-full bg-white pl-9 pr-4 py-2 rounded-editorial text-xs font-sans text-charcoal placeholder:text-charcoal/40 border border-forest/15 focus:outline-none focus:border-forest"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          {/* Mobile Filter Drawer Trigger */}
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 bg-white rounded-editorial border border-forest/20 text-xs font-sans font-medium text-forest hover:bg-forest hover:text-cream transition-colors"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-forest text-cream text-[10px] px-1.5 py-0.2 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs font-sans">
            <span className="hidden md:inline text-charcoal/60 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-white border border-forest/20 rounded-editorial px-3 py-2 text-xs text-charcoal font-medium outline-none focus:border-forest cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated ★</option>
              <option value="bestsellers">Bestsellers First</option>
            </select>
          </div>

          {/* Grid Layout Switcher (Desktop 3 vs 4 columns) */}
          <div className="hidden sm:flex items-center border border-forest/20 rounded-editorial bg-white p-0.5">
            <button
              type="button"
              onClick={() => onGridColsChange(3)}
              className={`p-1.5 rounded-[2px] transition-colors ${
                gridCols === 3 ? 'bg-forest text-cream' : 'text-charcoal/50 hover:text-forest'
              }`}
              title="3 Columns (Spacious Editorial)"
              aria-label="3 Column Grid"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onGridColsChange(4)}
              className={`p-1.5 rounded-[2px] transition-colors ${
                gridCols === 4 ? 'bg-forest text-cream' : 'text-charcoal/50 hover:text-forest'
              }`}
              title="4 Columns (Compact Grid)"
              aria-label="4 Column Grid"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

