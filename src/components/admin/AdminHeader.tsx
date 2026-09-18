import React from 'react';
import { Package, ShoppingBag, BarChart3, Store, LogOut, RotateCcw, Plus, Sparkles } from 'lucide-react';

export type AdminTab = 'products' | 'orders' | 'analytics';

interface AdminHeaderProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onBackToStore: () => void;
  onLogout: () => void;
  onOpenAddProduct: () => void;
  totalProducts: number;
  totalOrders: number;
  lowStockCount: number;
  onResetData: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentTab,
  onSelectTab,
  onBackToStore,
  onLogout,
  onOpenAddProduct,
  totalProducts,
  totalOrders,
  lowStockCount,
  onResetData
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#1C1917] text-stone-100 border-b border-stone-800 shadow-lg">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Brand & Admin Badge */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-base shadow-xs">
              B
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base tracking-tight">
                  STUDIO BEAUTÉ
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-800 text-amber-400 border border-stone-700">
                  Store Admin
                </span>
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                Catalog management, order fulfillment, and inventory analytics
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="admin-reset-demo-btn"
              onClick={() => {
                if (window.confirm('Reset boutique catalog and demo orders to fresh beauty defaults?')) {
                  onResetData();
                }
              }}
              title="Reset to default demo data"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Demo</span>
            </button>

            <button
              id="admin-new-product-btn"
              onClick={onOpenAddProduct}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>List New Product</span>
            </button>

            <button
              id="admin-view-store-btn"
              onClick={onBackToStore}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 transition-colors cursor-pointer"
            >
              <Store className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">View Storefront</span>
              <span className="sm:hidden">Store</span>
            </button>

            <button
              id="admin-logout-btn"
              onClick={onLogout}
              title="Sign out of admin portal"
              className="p-2 rounded-xl text-stone-400 hover:text-rose-300 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 border-t border-stone-800/80 py-2.5 overflow-x-auto scrollbar-none">
          <button
            id="admin-tab-products"
            onClick={() => onSelectTab('products')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              currentTab === 'products'
                ? 'bg-stone-800 text-white shadow-xs border border-stone-700'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
            }`}
          >
            <Package className="w-4 h-4 text-rose-300" />
            <span>Product Catalog</span>
            <span className="px-2 py-0.5 rounded-full bg-stone-700 text-[11px] text-stone-300 font-mono">
              {totalProducts}
            </span>
          </button>

          <button
            id="admin-tab-orders"
            onClick={() => onSelectTab('orders')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              currentTab === 'orders'
                ? 'bg-stone-800 text-white shadow-xs border border-stone-700'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span>Customer Orders</span>
            <span className="px-2 py-0.5 rounded-full bg-stone-700 text-[11px] text-stone-300 font-mono">
              {totalOrders}
            </span>
          </button>

          <button
            id="admin-tab-analytics"
            onClick={() => onSelectTab('analytics')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              currentTab === 'analytics'
                ? 'bg-stone-800 text-white shadow-xs border border-stone-700'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-300" />
            <span>Inventory & Analytics</span>
            {lowStockCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono">
                {lowStockCount} Low
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
