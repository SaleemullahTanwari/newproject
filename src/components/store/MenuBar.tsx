import React, { useState } from 'react';
import { 
  Home, 
  Sparkles, 
  Package, 
  Heart, 
  User, 
  BookOpen, 
  HelpCircle, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { CustomerUser } from '../../types';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: number | string;
  description?: string;
}

interface MenuBarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  cartCount: number;
  wishlistCount: number;
  userOrderCount: number;
  currentUser?: CustomerUser | null;
  onOpenAuthModal?: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  currentPath,
  onNavigate,
  cartCount,
  wishlistCount,
  userOrderCount,
  currentUser,
  onOpenAuthModal
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: Home,
      description: 'Discover luxury beauty highlights'
    },
    {
      id: 'shop',
      label: 'Shop Formulations',
      path: '/shop',
      icon: Sparkles,
      description: 'All skincare, serums & botanicals'
    },
    {
      id: 'orders',
      label: 'My Orders & Tracking',
      path: '/orders',
      icon: Package,
      badge: userOrderCount > 0 ? userOrderCount : undefined,
      description: 'Live shipment tracking & order history'
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      path: '/wishlist',
      icon: Heart,
      badge: wishlistCount > 0 ? wishlistCount : undefined,
      description: 'Saved vanity & personal favorites'
    },
    {
      id: 'account',
      label: 'Skin Profile & Account',
      path: '/account',
      icon: User,
      badge: currentUser ? 'Active' : undefined,
      description: 'Member perks & skin diagnosis'
    },
    {
      id: 'about',
      label: 'Our Story & Philosophy',
      path: '/about',
      icon: BookOpen,
      description: 'Artisanal heritage & clean science'
    },
    {
      id: 'contact',
      label: 'Concierge & Support',
      path: '/contact',
      icon: HelpCircle,
      description: 'Skin consultation & live concierge'
    }
  ];

  const isCurrentActive = (itemPath: string) => {
    if (itemPath === '/') {
      return currentPath === '/' || currentPath === '' || currentPath === '/home';
    }
    return currentPath.startsWith(itemPath);
  };

  const handleItemClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full bg-stone-900 border-b border-stone-800/80 text-stone-200">
      {/* Desktop Menu Bar Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11">
          
          {/* Main Horizontal Desktop Links */}
          <nav 
            id="desktop-primary-menubar"
            className="hidden md:flex items-center gap-1 lg:gap-2 overflow-x-auto no-scrollbar py-1"
            aria-label="Store navigation menu"
          >
            {navItems.map((item) => {
              const active = isCurrentActive(item.path);
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  id={`menubar-link-${item.id}`}
                  onClick={() => handleItemClick(item.path)}
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer whitespace-nowrap select-none ${
                    active
                      ? 'text-amber-300 bg-stone-800/90 shadow-xs'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-amber-300' : 'text-stone-400'}`} />
                  <span>{item.label}</span>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        active
                          ? 'bg-amber-400 text-stone-950 font-mono'
                          : 'bg-stone-800 text-amber-300 font-mono border border-stone-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Active Indicator Underline */}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Perks Snippet */}
          <div className="hidden lg:flex items-center gap-4 text-[11px] text-stone-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>Complimentary US Delivery Over $75</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-stone-700" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Clean & Cruelty-Free</span>
            </span>
          </div>

          {/* Mobile Menu Bar Toggle & Quick Horizontal Scroll */}
          <div className="flex items-center justify-between w-full md:hidden py-1">
            <button
              id="mobile-menu-drawer-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-stone-800 text-amber-300 text-xs font-semibold border border-stone-700 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>Menu</span>
            </button>

            {/* Quick horizontally scrollable pills on mobile */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pl-2">
              <button
                onClick={() => handleItemClick('/shop')}
                className={`px-2 py-1 text-[11px] rounded-md font-medium whitespace-nowrap ${
                  isCurrentActive('/shop') ? 'bg-amber-400 text-stone-950 font-semibold' : 'bg-stone-800/80 text-stone-300'
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => handleItemClick('/orders')}
                className={`flex items-center gap-1 px-2 py-1 text-[11px] rounded-md font-medium whitespace-nowrap ${
                  isCurrentActive('/orders') ? 'bg-amber-400 text-stone-950 font-semibold' : 'bg-stone-800/80 text-stone-300'
                }`}
              >
                <span>Orders</span>
                {userOrderCount > 0 && (
                  <span className="bg-amber-500 text-stone-950 text-[9px] px-1 rounded-full font-bold font-mono">
                    {userOrderCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleItemClick('/wishlist')}
                className={`flex items-center gap-1 px-2 py-1 text-[11px] rounded-md font-medium whitespace-nowrap ${
                  isCurrentActive('/wishlist') ? 'bg-amber-400 text-stone-950 font-semibold' : 'bg-stone-800/80 text-stone-300'
                }`}
              >
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="bg-amber-500 text-stone-950 text-[9px] px-1 rounded-full font-bold font-mono">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleItemClick('/account')}
                className={`px-2 py-1 text-[11px] rounded-md font-medium whitespace-nowrap ${
                  isCurrentActive('/account') ? 'bg-amber-400 text-stone-950 font-semibold' : 'bg-stone-800/80 text-stone-300'
                }`}
              >
                Account
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Slide-down Navigation Drawer */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-navigation-dropdown"
          className="md:hidden bg-stone-950 border-b border-stone-800 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200"
        >
          <div className="pb-2 border-b border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-stone-300">
              Ayesha Beauty Navigation
            </span>
            {currentUser ? (
              <span className="text-amber-400 font-medium">
                Signed in as {currentUser.name.split(' ')[0]}
              </span>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuthModal?.();
                }}
                className="text-amber-400 hover:underline font-semibold"
              >
                Sign In
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-1.5 pt-1">
            {navItems.map((item) => {
              const active = isCurrentActive(item.path);
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleItemClick(item.path)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                    active 
                      ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30' 
                      : 'hover:bg-stone-900 text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${active ? 'bg-amber-400 text-stone-950' : 'bg-stone-900 text-stone-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-2">
                        <span>{item.label}</span>
                        {item.badge !== undefined && (
                          <span className="bg-amber-400 text-stone-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full font-mono">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-[11px] text-stone-400 line-clamp-1">{item.description}</p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-500" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-800/80 text-[11px] text-stone-400 flex items-center justify-between">
            <span>Bag Items: <strong className="text-white">{cartCount}</strong></span>
            <span>Customer Concierge: <strong className="text-amber-300">Active</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
