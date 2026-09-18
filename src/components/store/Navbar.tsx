import React, { useState } from 'react';
import { ShoppingBag, Search, X, User, Package, ChevronDown, Heart } from 'lucide-react';
import { CustomerUser } from '../../types';
import { MenuBar } from './MenuBar';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCart: () => void;
  onOpenWishlist?: () => void;
  onNavigateHome?: () => void;
  currentPath?: string;
  onNavigate?: (path: string) => void;
  currentUser?: CustomerUser | null;
  userOrderCount?: number;
  onOpenAuthModal?: () => void;
  onOpenAccountModal?: (tab?: 'orders' | 'profile' | 'wishlist') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenCart,
  onNavigateHome,
  currentPath = '/',
  onNavigate = () => {},
  currentUser,
  userOrderCount = 0,
  onOpenAuthModal,
  onOpenAccountModal
}) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleBrandClick = () => {
    onSelectCategory('All');
    if (onNavigate) {
      onNavigate('/');
    } else if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950 text-stone-100 border-b border-stone-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo with the name Ayesha Beauty */}
          <div
            id="navbar-brand-logo"
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={handleBrandClick}
          >
            {/* Elegant Monogram Emblem */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-300 to-rose-300 text-stone-950 flex items-center justify-center font-extrabold tracking-tight text-xl shadow-sm group-hover:scale-105 transition-transform">
              A
            </div>
            
            {/* Brand Title */}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-white font-sans">
                  AYESHA
                </span>
                <span className="text-lg sm:text-2xl font-light tracking-wide text-amber-300 font-sans">
                  BEAUTY
                </span>
              </div>
              <p className="text-[10px] text-stone-400 tracking-widest uppercase hidden sm:block font-medium">
                Beverly Hills • Luxury Skincare
              </p>
            </div>
          </div>

          {/* Simple Clean Actions on the Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Desktop Clean Search Bar */}
            <div className="relative hidden sm:block w-44 md:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              <input
                id="storefront-search-input"
                type="text"
                placeholder="Search formulations..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentPath !== '/shop' && currentPath !== '/') {
                    onNavigate('/shop');
                  }
                }}
                className="w-full pl-9 pr-8 py-2 text-xs bg-stone-900 text-white rounded-xl border border-stone-800 focus:outline-none focus:border-amber-400/80 placeholder-stone-500 transition-colors"
              />
              {searchQuery && (
                <button
                  id="storefront-search-clear-btn"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white p-0.5 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Search Toggle Button */}
            <div className="sm:hidden">
              {showMobileSearch ? (
                <div className="fixed inset-x-0 top-0 bg-stone-950 p-3 border-b border-stone-800 flex items-center gap-2 z-50 animate-in fade-in">
                  <Search className="w-4 h-4 text-stone-400 shrink-0 ml-1" />
                  <input
                    id="mobile-search-input"
                    type="text"
                    placeholder="Search beauty products..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    autoFocus
                    className="flex-1 py-1.5 px-2 text-sm bg-transparent text-white focus:outline-none placeholder-stone-500"
                  />
                  <button
                    onClick={() => setShowMobileSearch(false)}
                    className="p-1.5 text-stone-400 hover:text-white cursor-pointer"
                    aria-label="Close search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  id="mobile-search-trigger"
                  onClick={() => setShowMobileSearch(true)}
                  className="p-2.5 rounded-xl bg-stone-900 text-stone-300 hover:text-white border border-stone-800 transition-colors cursor-pointer"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Wishlist Header Icon (Desktop) */}
            <button
              id="navbar-wishlist-quick-btn"
              onClick={() => onNavigate('/wishlist')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-800 transition-all text-xs font-semibold cursor-pointer"
              title="View Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${wishlistCount > 0 ? 'fill-rose-400 text-rose-400' : 'text-stone-400'}`} />
              <span className="hidden xl:inline">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.2 font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Account / Orders / Sign-in Navigation Controls */}
            {currentUser ? (
              <div className="relative">
                <div className="flex items-center gap-1.5">
                  {/* Direct 'My Orders' button on desktop */}
                  <button
                    id="navbar-orders-btn"
                    onClick={() => onNavigate('/orders')}
                    className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-800 hover:border-stone-700 transition-all text-xs font-semibold cursor-pointer"
                    title="View My Orders & Tracking"
                  >
                    <Package className="w-3.5 h-3.5 text-amber-400" />
                    <span>Orders</span>
                    {userOrderCount > 0 && (
                      <span className="bg-amber-400 text-stone-950 text-[10px] font-extrabold rounded-full px-1.5 py-0.2 font-mono">
                        {userOrderCount}
                      </span>
                    )}
                  </button>

                  {/* User Profile Trigger */}
                  <button
                    id="navbar-user-btn"
                    onClick={() => onNavigate('/account')}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-800 hover:border-stone-700 transition-all text-xs font-semibold cursor-pointer active:scale-95"
                    title={`${currentUser.name} (Account Portal)`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-400 to-amber-200 text-stone-950 flex items-center justify-center text-xs font-black shrink-0">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden lg:inline font-medium max-w-28 truncate">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-stone-400 hidden sm:inline" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                id="navbar-signin-btn"
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-800 hover:border-stone-700 transition-all text-xs font-semibold cursor-pointer active:scale-95"
                title="Customer Login / Register"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Shopping Bag Button */}
            <button
              id="cart-drawer-toggle-btn"
              onClick={onOpenCart}
              className="relative px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 hover:text-white border border-stone-800 hover:border-stone-700 transition-all flex items-center gap-2.5 cursor-pointer active:scale-95 shadow-xs"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-semibold hidden sm:inline">Bag</span>
              {cartCount > 0 ? (
                <span className="bg-amber-400 text-stone-950 text-[11px] font-bold rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              ) : (
                <span className="text-stone-500 text-xs font-mono hidden sm:inline">0</span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Primary Menu Bar Component */}
      <MenuBar
        currentPath={currentPath}
        onNavigate={onNavigate}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        userOrderCount={userOrderCount}
        currentUser={currentUser}
        onOpenAuthModal={onOpenAuthModal}
      />
    </header>
  );
};
