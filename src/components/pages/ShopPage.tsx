import React from 'react';
import { 
  Sparkles, 
  Search, 
  SlidersHorizontal, 
  Check, 
  X, 
  ArrowUpDown,
  Filter,
  CheckCircle2,
  Heart,
  Eye,
  ShoppingBag
} from 'lucide-react';
import { Product } from '../../types';
import { CATEGORIES } from '../../data/initialProducts';
import { ProductCard } from '../store/ProductCard';

interface ShopPageProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  onSortChange: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest') => void;
  onlyInStock: boolean;
  onToggleInStock: (val: boolean) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  onViewProductDetails: (productId: string) => void;
  onDirectCheckout: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onlyInStock,
  onToggleInStock,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isWishlisted,
  onViewProductDetails,
  onDirectCheckout
}) => {
  // Filter and sort products
  const filteredProducts = products.filter((p) => {
    if (p.status !== 'active') return false;
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (onlyInStock && p.stock <= 0) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchIng = p.ingredients?.some((ing) => ing.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchCat && !matchIng) return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return 0; // featured default
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Pure Botanical Biotechnology</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            The Complete Atelier Collection
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Handcrafted with sustainably sourced botanical actives, biocompatible antioxidants, and clinical peptidic complexes. Explore formulas curated for lasting skin radiance.
          </p>
        </div>

        {/* Decorative background subtle glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Category Pills Strip */}
      <div className="pb-4 mb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
        
        {/* Search within catalog */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search actives, botanical extracts, serums..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-amber-400 text-stone-900 placeholder-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Toggles & Sort */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* In Stock toggle */}
          <button
            onClick={() => onToggleInStock(!onlyInStock)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-colors cursor-pointer font-medium ${
              onlyInStock
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${onlyInStock ? 'text-amber-600' : 'text-stone-400'}`} />
            <span>In Stock Only</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-stone-200 px-3 py-1.5 rounded-xl">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <span className="text-stone-500 text-[11px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Atelier</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Formulations</option>
            </select>
          </div>

          <span className="text-[11px] text-stone-500 font-medium pl-1">
            {sortedProducts.length} formulations
          </span>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-20 bg-stone-50 rounded-2xl border border-dashed border-stone-300 p-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">No Formulations Found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-4">
            We could not find any products matching your active filters. Try resetting the category or clearing the search query.
          </p>
          <button
            onClick={() => {
              onSelectCategory('All');
              onSearchChange('');
              onToggleInStock(false);
            }}
            className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={isWishlisted(product.id)}
              onViewDetails={onViewProductDetails}
              onDirectCheckout={onDirectCheckout}
            />
          ))}
        </div>
      )}
    </div>
  );
};
