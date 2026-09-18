import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/initialProducts';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 backdrop-blur-md">
      {/* Top utility ticker / announcement */}
      <div className="bg-stone-950 text-stone-300 text-xs py-1.5 px-4 border-b border-stone-800/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Complimentary worldwide express shipping on orders over $150</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              id="header-admin-quick-switch"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 text-stone-200 hover:text-white transition-colors cursor-pointer text-xs font-semibold px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 border border-stone-700"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectCategory('All')}>
            <div className="w-9 h-9 rounded-xl bg-white text-stone-950 flex items-center justify-center font-bold tracking-tighter text-lg shadow-sm">
              S
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                STUDIO<span className="text-stone-400 font-light">ATELIER</span>
              </span>
              <p className="text-[10px] text-stone-400 tracking-wider uppercase hidden sm:block">Curated Essentials & Living</p>
            </div>
          </div>

          {/* Desktop Categories */}
          <nav className="hidden lg:flex items-center space-x-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  id={`nav-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
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
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Search Toggle/Input */}
            <div className="relative">
              <div className={`flex items-center transition-all ${showSearchInput ? 'w-48 sm:w-64' : 'w-9 sm:w-9'}`}>
                {showSearchInput ? (
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      id="storefront-search-input"
                      type="text"
                      placeholder="Search catalog..."
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
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    id="search-open-btn"
                    onClick={() => setShowSearchInput(true)}
                    className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Cart Button with Count Badge */}
            <button
              id="cart-drawer-toggle-btn"
              onClick={onOpenCart}
              className="relative p-2 rounded-lg text-stone-200 hover:text-white hover:bg-stone-800 transition-colors flex items-center cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-stone-950 text-[11px] font-bold rounded-full h-5 min-w-5 px-1 flex items-center justify-center ring-2 ring-stone-900">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct Admin Access Button */}
            <button
              id="main-admin-panel-btn"
              onClick={onOpenAdmin}
              className="ml-1 sm:ml-2 inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-white text-stone-900 hover:bg-stone-100 transition-all shadow-sm cursor-pointer"
            >
              <Shield className="w-4 h-4 text-stone-700" />
              <span className="hidden md:inline">Admin Panel</span>
              <span className="md:hidden">Admin</span>
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
              placeholder="Search products by name or category..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-stone-800 text-white rounded-lg border border-stone-700 focus:outline-none focus:border-stone-500 placeholder-stone-400"
            />
          </div>

          <div className="space-y-1">
            <p className="text-[11px] font-bold uppercase text-stone-400 px-2 py-1 tracking-wider">Categories</p>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg text-left transition-colors ${
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

          <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
            <button
              id="mobile-drawer-admin-btn"
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-sm font-semibold border border-stone-700 transition-colors"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Switch to Admin Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
