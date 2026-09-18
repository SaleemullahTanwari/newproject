import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Image as ImageIcon, Sparkles, Check, HelpCircle, Eye } from 'lucide-react';
import { Product } from '../../types';
import { CATEGORIES, PRESET_IMAGES } from '../../data/initialProducts';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProduct: (product: Product) => void;
  productToEdit?: Product | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSaveProduct,
  productToEdit
}) => {
  if (!isOpen) return null;

  const isEditing = !!productToEdit;

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [customCategory, setCustomCategory] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [comparePrice, setComparePrice] = useState<number | ''>('');
  const [stock, setStock] = useState<number | ''>(15);
  const [sku, setSku] = useState('');
  const [status, setStatus] = useState<'active' | 'draft' | 'archived'>('active');
  const [badge, setBadge] = useState<'none' | 'new' | 'bestseller' | 'sale' | 'limited'>('none');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>([
    { label: 'Material', value: 'Aerospace Aluminum / Vegan Leather' },
    { label: 'Warranty', value: '2-Year Official Guarantee' }
  ]);
  const [showPresets, setShowPresets] = useState(false);
  const [formError, setFormError] = useState('');

  // Populate when editing
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setTagline(productToEdit.tagline || '');
      setCategory(productToEdit.category);
      setPrice(productToEdit.price);
      setComparePrice(productToEdit.comparePrice || '');
      setStock(productToEdit.stock);
      setSku(productToEdit.sku);
      setStatus(productToEdit.status);
      setBadge(productToEdit.badge || 'none');
      setImageUrl(productToEdit.images[0] || '');
      setDescription(productToEdit.description);
      setSpecs(productToEdit.specs && productToEdit.specs.length > 0 ? productToEdit.specs : [{ label: 'Origin', value: 'Handcrafted' }]);
    } else {
      // New product defaults
      setName('');
      setTagline('');
      setCategory('Electronics');
      setPrice('');
      setComparePrice('');
      setStock(20);
      setSku(`SKU-${Math.floor(1000 + Math.random() * 9000)}`);
      setStatus('active');
      setBadge('new');
      setImageUrl(PRESET_IMAGES[0].url);
      setDescription('Precision crafted item engineered with attention to detail and long-lasting durability.');
      setSpecs([
        { label: 'Craftsmanship', value: 'Industrial Grade' },
        { label: 'Warranty', value: '2-Year Replacement Guarantee' }
      ]);
    }
  }, [productToEdit]);

  const handleGenerateSku = () => {
    const prefix = name ? name.replace(/[^A-Za-z]/g, '').substring(0, 3).toUpperCase() : 'PRD';
    setSku(`${prefix}-${Math.floor(100 + Math.random() * 900)}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setImageUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { label: '', value: '' }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: 'label' | 'value', text: string) => {
    const updated = [...specs];
    updated[index][field] = text;
    setSpecs(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Product name is required.');
      return;
    }
    if (price === '' || Number(price) <= 0) {
      setFormError('Please enter a valid product price.');
      return;
    }

    const finalCategory = category === 'Custom' ? (customCategory.trim() || 'General') : category;
    const finalImage = imageUrl.trim() || PRESET_IMAGES[0].url;

    const newProduct: Product = {
      id: productToEdit ? productToEdit.id : `prod-${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      price: Number(price),
      comparePrice: comparePrice !== '' && Number(comparePrice) > 0 ? Number(comparePrice) : undefined,
      category: finalCategory,
      images: [finalImage],
      stock: stock === '' ? 0 : Math.max(0, Number(stock)),
      sku: sku.trim() || `SKU-${Date.now().toString().slice(-4)}`,
      status,
      badge: badge === 'none' ? undefined : badge,
      rating: productToEdit ? productToEdit.rating : 5.0,
      reviewsCount: productToEdit ? productToEdit.reviewsCount : 1,
      specs: specs.filter(s => s.label.trim() && s.value.trim()),
      createdAt: productToEdit ? productToEdit.createdAt : new Date().toISOString()
    };

    onSaveProduct(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">
              {isEditing ? 'Edit Product Details' : 'List New Product on Store'}
            </h2>
            <p className="text-xs text-stone-500">
              {isEditing
                ? 'Update pricing, images, inventory stock, or technical specifications.'
                : 'Fill out the product information below to instantly publish to your storefront.'}
            </p>
          </div>
          <button
            id="product-form-modal-close"
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Main Form Column */}
            <div className="lg:col-span-8 space-y-5">
              {/* Basic Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Product Identification</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Product Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="admin-product-name-input"
                    type="text"
                    required
                    placeholder="e.g. Titanium Ergonomic Desk Stand"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Catchy Tagline / Short Summary
                  </label>
                  <input
                    id="admin-product-tagline-input"
                    type="text"
                    placeholder="e.g. Dual-hinged CNC machined stand for laptops and tablets"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                  />
                </div>

                {/* Category & Badge */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                    <select
                      id="admin-product-category-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                    >
                      {CATEGORIES.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                      <option value="Custom">+ Custom Category...</option>
                    </select>

                    {category === 'Custom' && (
                      <input
                        type="text"
                        placeholder="Enter custom category name"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="mt-2 w-full px-3 py-1.5 text-xs rounded-xl border border-stone-300 bg-white"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Promotional Badge</label>
                    <select
                      id="admin-product-badge-select"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                    >
                      <option value="none">None (Standard)</option>
                      <option value="new">New Arrival</option>
                      <option value="bestseller">Bestseller</option>
                      <option value="sale">On Sale</option>
                      <option value="limited">Limited Edition</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="space-y-3 pt-3 border-t border-stone-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Pricing & Inventory</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Selling Price ($) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-xs">$</span>
                      <input
                        id="admin-product-price-input"
                        type="number"
                        step="0.01"
                        min="0.5"
                        required
                        placeholder="149.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Compare Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-xs">$</span>
                      <input
                        id="admin-product-compare-price-input"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="189.00"
                        value={comparePrice}
                        onChange={(e) => setComparePrice(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Inventory Stock
                    </label>
                    <input
                      id="admin-product-stock-input"
                      type="number"
                      min="0"
                      required
                      placeholder="15"
                      value={stock}
                      onChange={(e) => setStock(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-stone-700">Stock Keeping Unit (SKU)</label>
                      <button
                        type="button"
                        onClick={handleGenerateSku}
                        className="text-[10px] text-amber-700 hover:text-amber-800 font-semibold cursor-pointer"
                      >
                        Auto-generate
                      </button>
                    </div>
                    <input
                      id="admin-product-sku-input"
                      type="text"
                      placeholder="STD-DSK-01"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white font-mono uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Publishing Status</label>
                    <select
                      id="admin-product-status-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                    >
                      <option value="active">Active (Visible in Store)</option>
                      <option value="draft">Draft (Hidden)</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description & Technical Specs */}
              <div className="space-y-3 pt-3 border-t border-stone-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Description & Specifications</h3>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Product Description</label>
                  <textarea
                    id="admin-product-description-input"
                    rows={3}
                    required
                    placeholder="Provide a compelling overview of the product materials, design ethos, and functionality..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                  />
                </div>

                {/* Specs rows */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-stone-700">Specification Table (Optional)</label>
                    <button
                      type="button"
                      onClick={handleAddSpec}
                      className="text-xs text-stone-700 hover:text-stone-950 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Row</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {specs.map((spec, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Feature (e.g. Dimensions)"
                          value={spec.label}
                          onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                          className="w-1/3 px-3 py-1.5 text-xs rounded-xl border border-stone-300 bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g. 14 x 9 x 2 cm)"
                          value={spec.value}
                          onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-stone-300 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSpec(index)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Media & Preview Column */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Product Media</h3>

              {/* Image Preview Box */}
              <div className="aspect-[4/3] rounded-2xl bg-stone-100 border border-stone-200 overflow-hidden relative shadow-xs flex items-center justify-center">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4 text-stone-400">
                    <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                    <p className="text-xs">No image provided</p>
                  </div>
                )}
                {badge !== 'none' && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-900 text-white shadow-xs">
                    {badge}
                  </span>
                )}
              </div>

              {/* Direct URL input */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Image URL</label>
                <input
                  id="admin-product-image-url-input"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white font-mono"
                />
              </div>

              {/* File Upload Simulator */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Or Upload From Device</label>
                <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-stone-300 hover:border-stone-500 bg-stone-50 hover:bg-white text-stone-600 text-xs font-medium transition-all cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose local file...</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Preset Gallery Picker */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-800 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Preset Photography Library</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPresets(!showPresets)}
                    className="text-[11px] text-stone-500 hover:text-stone-900 cursor-pointer underline"
                  >
                    {showPresets ? 'Hide' : 'Browse'}
                  </button>
                </div>

                {showPresets && (
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 bg-stone-50 rounded-xl border border-stone-200">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setImageUrl(preset.url);
                          if (!name) setName(preset.name);
                        }}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer relative group ${
                          imageUrl === preset.url ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-stone-200 hover:border-stone-400'
                        }`}
                        title={preset.name}
                      >
                        <img src={preset.url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[9px] font-bold p-1 text-center transition-opacity">
                          {preset.name}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mini Card Preview recap */}
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-xs">
                <div className="flex justify-between items-center text-stone-500 text-[11px]">
                  <span>Store Display Price</span>
                  <span className="font-mono font-bold text-stone-900">
                    ${Number(price || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-stone-500 text-[11px]">
                  <span>Stock Available</span>
                  <span className="font-semibold text-stone-800">{stock || 0} units</span>
                </div>
                <div className="flex justify-between items-center text-stone-500 text-[11px]">
                  <span>Visibility</span>
                  <span className="capitalize font-semibold text-stone-800">{status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              id="admin-save-product-btn"
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-98"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{isEditing ? 'Save Product Changes' : 'Publish Product to Store'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
