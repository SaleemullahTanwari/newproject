import React, { useState } from 'react';
import { Plus, Search, Filter, Edit3, Trash2, AlertCircle, Check, Eye, Package, ExternalLink, ArrowUpDown } from 'lucide-react';
import { Product } from '../../types';
import { CATEGORIES } from '../../data/initialProducts';

interface AdminProductsProps {
  products: Product[];
  onOpenAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
  onToggleStatus: (productId: string) => void;
  onViewProductInStore: (product: Product) => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({
  products,
  onOpenAddProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateStock,
  onToggleStatus,
  onViewProductInStore
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'draft'>('all');

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

    const matchesStock =
      stockFilter === 'all'
        ? true
        : stockFilter === 'low'
        ? p.stock > 0 && p.stock <= 5
        : p.stock <= 0;

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStock && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <span>Product Inventory</span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
              {products.length} Items Listed
            </span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Create, modify, adjust stock levels, or toggle visibility on your storefront.
          </p>
        </div>

        <button
          id="admin-products-add-btn"
          onClick={onOpenAddProduct}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>List New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              id="admin-search-products"
              type="text"
              placeholder="Search by name, SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
            >
              <option value="All">All Categories ({products.length})</option>
              {CATEGORIES.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
          <div>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
            >
              <option value="all">Stock: All Levels</option>
              <option value="low">Low Stock (≤ 5 units)</option>
              <option value="out">Out of Stock (0 units)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
            >
              <option value="all">Status: All Statuses</option>
              <option value="active">Active (Visible)</option>
              <option value="draft">Draft (Hidden)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table (Desktop) & Cards (Mobile) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Package className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="text-sm font-semibold text-stone-900">No matching products</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your search criteria or list a new product to populate your inventory.
            </p>
            <button
              onClick={onOpenAddProduct}
              className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              + List New Product
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-600">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-900 uppercase tracking-wider text-[11px] font-bold">
                  <tr>
                    <th className="py-3.5 px-4">Product</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Stock Level</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredProducts.map((p) => {
                    const isLow = p.stock > 0 && p.stock <= 5;
                    const isOut = p.stock <= 0;

                    return (
                      <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                        {/* Product info */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                              <img
                                src={p.images[0]}
                                alt=""
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-stone-900 text-xs line-clamp-1">{p.name}</span>
                                {p.badge && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-stone-100 text-stone-700 border border-stone-200">
                                    {p.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-stone-400 font-mono">SKU: {p.sku}</span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 font-medium text-[11px]">
                            {p.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-4">
                          <div className="font-mono font-bold text-stone-900 text-xs">
                            ${p.price.toFixed(2)}
                          </div>
                          {p.comparePrice && (
                            <div className="text-[10px] text-stone-400 line-through">
                              ${p.comparePrice.toFixed(2)}
                            </div>
                          )}
                        </td>

                        {/* Stock inline editor */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
                              <button
                                onClick={() => onUpdateStock(p.id, Math.max(0, p.stock - 1))}
                                className="px-2 py-1 text-stone-600 hover:text-stone-900 font-bold hover:bg-stone-200/50 cursor-pointer"
                                title="Decrease stock"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-mono font-semibold text-stone-900 min-w-7 text-center">
                                {p.stock}
                              </span>
                              <button
                                onClick={() => onUpdateStock(p.id, p.stock + 1)}
                                className="px-2 py-1 text-stone-600 hover:text-stone-900 font-bold hover:bg-stone-200/50 cursor-pointer"
                                title="Increase stock"
                              >
                                +
                              </button>
                            </div>

                            {isOut ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                                Out
                              </span>
                            ) : isLow ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                                Low
                              </span>
                            ) : null}
                          </div>
                        </td>

                        {/* Status Toggle */}
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => onToggleStatus(p.id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                              p.status === 'active'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                                : 'bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'active' ? 'bg-emerald-500' : 'bg-stone-400'}`} />
                            <span className="capitalize">{p.status}</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onViewProductInStore(p)}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                              title="Preview in Store"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => onEditProduct(p)}
                              className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                              title="Edit product"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => {
                                if (window.confirm(`Delete "${p.name}"? This action cannot be undone.`)) {
                                  onDeleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-stone-200">
              {filteredProducts.map((p) => {
                const isLow = p.stock > 0 && p.stock <= 5;
                const isOut = p.stock <= 0;

                return (
                  <div key={p.id} className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <img src={p.images[0]} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-semibold text-stone-900 text-xs leading-snug line-clamp-1">{p.name}</h4>
                          <span className="font-mono font-bold text-stone-900 text-xs">
                            ${p.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 font-mono mt-0.5">SKU: {p.sku}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-medium">
                            {p.category}
                          </span>
                          <button
                            onClick={() => onToggleStatus(p.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize ${
                              p.status === 'active' ? 'bg-emerald-50 text-emerald-800' : 'bg-stone-100 text-stone-500'
                            }`}
                          >
                            {p.status}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                      {/* Stock controls */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-stone-500">Stock:</span>
                        <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                          <button
                            onClick={() => onUpdateStock(p.id, Math.max(0, p.stock - 1))}
                            className="px-2 py-0.5 text-stone-600 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-stone-900">
                            {p.stock}
                          </span>
                          <button
                            onClick={() => onUpdateStock(p.id, p.stock + 1)}
                            className="px-2 py-0.5 text-stone-600 font-bold"
                          >
                            +
                          </button>
                        </div>
                        {isOut && <span className="text-[10px] font-bold text-rose-600">Out</span>}
                        {isLow && <span className="text-[10px] font-bold text-amber-700">Low</span>}
                      </div>

                      {/* Edit / Delete / View */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewProductInStore(p)}
                          className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditProduct(p)}
                          className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 text-xs font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${p.name}"?`)) onDeleteProduct(p.id);
                          }}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
