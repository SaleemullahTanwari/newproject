import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/initialProducts';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCart: () => void;
  onOpenWishlist?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenCart
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 backdrop-blur-md shadow-lg">
      {/* Top Announcement Bar */}
      <div className="bg-stone-950 text-stone-300 text-xs py-2 px-4 border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium mx-auto sm:mx-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse hidden sm:inline" />
            <span>Complimentary Botanical Discovery Trio with all orders over $65</span>
            <span className="hidden md:inline text-stone-600">•</span>
            <span className="hidden md:inline text-amber-400/90 text-[11px] font-semibold">USE CODE 'GLOW15' FOR 15% OFF</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-stone-400">
            <span>100% Clean Actives</span>
            <span>Refillable Amber Glass</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Logo Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => onSelectCategory('All')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-stone-950 flex items-center justify-center font-bold tracking-tighter text-lg sm:text-xl shadow-sm">
              B
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                STUDIO<span className="text-stone-400 font-light">BEAUTÉ</span>
              </span>
              <p className="text-[10px] text-stone-400 tracking-wider uppercase hidden sm:block">
                Clinical Botanicals & Skincare
              </p>
            </div>
          </div>

          {/* Desktop Categories */}
          <nav className="hidden lg:flex items-center space-x-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  id={`nav-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-stone-800 text-white shadow-xs'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Toggle/Input */}
            <div className="relative">
              <div className={`flex items-center transition-all ${showSearchInput ? 'w-48 sm:w-64' : 'w-9 sm:w-9'}`}>
                {showSearchInput ? (
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      id="storefront-search-input"
                      type="text"
                      placeholder="Search serums, creams..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      autoFocus
                      className="w-full pl-8 pr-7 py-1.5 text-xs bg-stone-800 text-white rounded-lg border border-stone-700 focus:outline-none focus:border-stone-500 placeholder-stone-400"
                    />
                    <button
                      onClick={() => {
                        setShowSearchInput(false);
                        onSearchChange('');
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    id="search-open-btn"
                    onClick={() => setShowSearchInput(true)}
                    className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Wishlist count indicator if available */}
            {wishlistCount > 0 && (
              <div className="hidden sm:flex items-center text-xs text-rose-400 bg-stone-800 px-2.5 py-1 rounded-lg border border-stone-700/80 gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-rose-400" />
                <span className="font-semibold">{wishlistCount}</span>
              </div>
            )}

            {/* Cart Drawer Trigger with Badge */}
            <button
              id="cart-drawer-toggle-btn"
              onClick={onOpenCart}
              className="relative p-2 rounded-lg text-stone-200 hover:text-white hover:bg-stone-800 transition-colors flex items-center cursor-pointer"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-stone-950 text-[11px] font-bold rounded-full h-5 min-w-5 px-1 flex items-center justify-center ring-2 ring-stone-900 animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800 bg-stone-900 px-4 pt-3 pb-5 space-y-3 animate-in fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id="mobile-drawer-search-input"
              type="text"
              placeholder="Search formulations & skincare..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-stone-800 text-white rounded-lg border border-stone-700 focus:outline-none focus:border-stone-500 placeholder-stone-400"
            />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold uppercase text-stone-400 px-2 py-1 tracking-wider">
              Beauty Categories
            </p>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg text-left transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-stone-800 text-white font-semibold'
                    : 'text-stone-300 hover:bg-stone-800/60'
                }`}
              >
                <span>{cat}</span>
                {activeCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
