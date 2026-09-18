import React from 'react';
import { DollarSign, ShoppingBag, Package, AlertTriangle, TrendingUp, Plus, ArrowUpRight } from 'lucide-react';
import { Product, Order } from '../../types';

interface AdminAnalyticsProps {
  products: Product[];
  orders: Order[];
  onRestockProduct: (productId: string, amount: number) => void;
  onOpenAddProduct: () => void;
}

export const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({
  products,
  orders,
  onRestockProduct,
  onOpenAddProduct
}) => {
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;
  const activeProductsCount = products.filter(p => p.status === 'active').length;
  const lowStockProducts = products.filter(p => p.stock <= 5);

  // Group by category
  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold uppercase tracking-wider">
            <span>Total Gross Sales</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-stone-400">Across {totalOrdersCount} fulfilled & processing orders</p>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold uppercase tracking-wider">
            <span>Customer Orders</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900">
            {totalOrdersCount}
          </div>
          <p className="text-[11px] text-stone-400">Avg ticket: ${avgOrderValue.toFixed(2)}</p>
        </div>

        {/* Active Products */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold uppercase tracking-wider">
            <span>Live Catalog</span>
            <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900">
            {activeProductsCount} <span className="text-xs font-normal text-stone-400">/ {products.length} total</span>
          </div>
          <p className="text-[11px] text-stone-400">Visible on active storefront</p>
        </div>

        {/* Low Stock Alerts */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold uppercase tracking-wider">
            <span>Low Stock Items</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${lowStockProducts.length > 0 ? 'bg-amber-50 text-amber-700' : 'bg-stone-50 text-stone-400'}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900">
            {lowStockProducts.length}
          </div>
          <p className="text-[11px] text-stone-400">Products with ≤ 5 units remaining</p>
        </div>
      </div>

      {/* Two columns: Low stock restock action list + Category distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Low Stock Replenishment */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900">Inventory Replenishment</h3>
              <p className="text-xs text-stone-500">Products requiring restock to avoid order disruptions</p>
            </div>
            <button
              onClick={onOpenAddProduct}
              className="text-xs text-stone-700 hover:text-stone-950 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>List Item</span>
            </button>
          </div>

          {lowStockProducts.length === 0 ? (
            <div className="p-8 text-center bg-stone-50 rounded-xl border border-stone-100 text-xs text-stone-500">
              <Package className="w-8 h-8 mx-auto text-emerald-600 mb-1" />
              <p className="font-semibold text-stone-800">All inventory levels are healthy</p>
              <p className="text-stone-400 mt-0.5">No products currently need immediate replenishment.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100 border border-stone-100 rounded-xl overflow-hidden">
              {lowStockProducts.map((p) => (
                <div key={p.id} className="p-3.5 flex items-center justify-between gap-3 bg-white hover:bg-stone-50/50">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                      <img src={p.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-stone-900 truncate">{p.name}</p>
                      <p className="text-[10px] text-stone-400 font-mono">SKU: {p.sku} • {p.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono ${p.stock === 0 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
                      {p.stock} in stock
                    </span>
                    <button
                      onClick={() => onRestockProduct(p.id, 10)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors cursor-pointer"
                    >
                      +10 Units
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Catalog Breakdown by Category */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="text-base font-bold text-stone-900">Catalog Composition</h3>
            <p className="text-xs text-stone-500">Distribution of products across department categories</p>
          </div>

          <div className="space-y-3">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const percentage = Math.round((count / products.length) * 100) || 0;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-stone-800">{cat}</span>
                    <span className="text-stone-500 font-mono">{count} items ({percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-stone-900 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Guidance Box */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1">
            <p className="font-semibold text-stone-900">Pro Merchant Tip</p>
            <p className="text-[11px] leading-relaxed text-stone-500">
              When listing high-value products, providing technical specifications and compare-at pricing increases customer conversion rates by up to 34%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
