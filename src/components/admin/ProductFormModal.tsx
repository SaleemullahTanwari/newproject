import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Image as ImageIcon, Sparkles, Check, HelpCircle } from 'lucide-react';
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
  const [category, setCategory] = useState<string>(CATEGORIES[1]);
  const [customCategory, setCustomCategory] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [comparePrice, setComparePrice] = useState<number | ''>('');
  const [stock, setStock] = useState<number | ''>(20);
  const [sku, setSku] = useState('');
  const [status, setStatus] = useState<'active' | 'draft' | 'archived'>('active');
  const [badge, setBadge] = useState<'new' | 'bestseller' | 'sale' | 'limited' | 'clean' | 'award' | undefined>('new');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [volume, setVolume] = useState('30ml / 1.0 fl oz');
  const [skinType, setSkinType] = useState('All Skin Types, Sensitive & Dry');
  const [keyActivesInput, setKeyActivesInput] = useState('Cold-Pressed Rosehip, 2% Bakuchiol, Squalane');
  const [howToUse, setHowToUse] = useState('Warm 3 to 4 drops between clean palms and gently press into face and neck every evening.');
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>([
    { label: 'Formulation', value: '100% Waterless, Vegan & Clean' },
    { label: 'Origin', value: 'Handcrafted in Provence, France' }
  ]);
  const [showPresets, setShowPresets] = useState(false);
  const [formError, setFormError] = useState('');

  // Populate when editing or opening
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
      setBadge(productToEdit.badge);
      setImageUrl(productToEdit.images[0] || '');
      setDescription(productToEdit.description);
      setVolume(productToEdit.volume || '30ml / 1.0 fl oz');
      setSkinType(productToEdit.skinType || 'All Skin Types');
      setKeyActivesInput(productToEdit.keyActives ? productToEdit.keyActives.join(', ') : '');
      setHowToUse(productToEdit.howToUse || '');
      setSpecs(productToEdit.specs && productToEdit.specs.length > 0 ? productToEdit.specs : [{ label: 'Origin', value: 'Provence, France' }]);
    } else {
      // New product defaults
      setName('');
      setTagline('');
      setCategory(CATEGORIES[1]);
      setPrice('');
      setComparePrice('');
      setStock(25);
      setSku(`LUM-${Math.floor(100 + Math.random() * 900)}`);
      setStatus('active');
      setBadge('new');
      setImageUrl(PRESET_IMAGES[0].url);
      setDescription('Exquisite botanical formulation crafted with cold-pressed natural plant oils and active vitamins.');
      setVolume('30ml / 1.0 fl oz');
      setSkinType('All Skin Types including Reactive Complexions');
      setKeyActivesInput('Botanical Lipids, Vitamin E, Plant Peptides');
      setHowToUse('Smooth 3-4 drops over clean face and neck in upward circular motions.');
      setSpecs([
        { label: 'Formulation', value: '100% Clean, Vegan & Cruelty-Free' },
        { label: 'Certification', value: 'Leaping Bunny & Dermatologist Evaluated' }
      ]);
    }
  }, [productToEdit]);

  const handleGenerateSku = () => {
    const prefix = name ? name.replace(/[^A-Za-z]/g, '').substring(0, 3).toUpperCase() : 'LUM';
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

  const handleSpecChange = (index: number, field: 'label' | 'value', val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Product name is required.');
      return;
    }

    if (price === '' || isNaN(Number(price)) || Number(price) <= 0) {
      setFormError('Please enter a valid retail price greater than 0.');
      return;
    }

    if (stock === '' || isNaN(Number(stock)) || Number(stock) < 0) {
      setFormError('Stock quantity must be a non-negative number.');
      return;
    }

    if (!imageUrl.trim()) {
      setFormError('Please provide an image URL or choose a preset beauty image.');
      return;
    }

    const finalCategory = category === 'Other' && customCategory.trim() ? customCategory.trim() : category;

    const keyActives = keyActivesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const productData: Product = {
      id: productToEdit ? productToEdit.id : `lumiere-${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim() || 'Cold-pressed botanical skin elixir',
      description: description.trim() || 'Botanical formulation engineered for pure radiance and daily skin resilience.',
      price: Number(price),
      comparePrice: comparePrice !== '' && Number(comparePrice) > 0 ? Number(comparePrice) : undefined,
      category: finalCategory,
      images: [imageUrl.trim()],
      stock: Number(stock),
      sku: sku.trim() || `LUM-${Date.now().toString().slice(-4)}`,
      status,
      badge: badge || undefined,
      rating: productToEdit ? productToEdit.rating : 4.9,
      reviewsCount: productToEdit ? productToEdit.reviewsCount : 1,
      featured: productToEdit ? productToEdit.featured : true,
      volume: volume.trim(),
      skinType: skinType.trim(),
      keyActives: keyActives.length > 0 ? keyActives : undefined,
      howToUse: howToUse.trim(),
      specs: specs.filter((s) => s.label.trim() && s.value.trim()),
      createdAt: productToEdit ? productToEdit.createdAt : new Date().toISOString()
    };

    onSaveProduct(productData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#1C1917] text-stone-100 rounded-3xl shadow-2xl border border-stone-800 flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800 flex items-center justify-between bg-stone-900/60">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-300">
              {isEditing ? 'Editing Catalog Entry' : 'New Formulation Listing'}
            </span>
            <h2 className="text-xl font-serif font-bold text-white mt-0.5">
              {isEditing ? `Edit: ${productToEdit.name}` : 'List New Beauty Product'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {formError && (
            <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>{formError}</span>
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-200/90 pb-1 border-b border-stone-800">
              1. Product Essentials
            </h3>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                Formulation Name <span className="text-rose-400">*</span>
              </label>
              <input
                id="admin-product-name-input"
                type="text"
                required
                placeholder="e.g., Rosehip & Phyto-Retinol Bakuchiol Elixir"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-rose-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Tagline / Benefit Subtitle
                </label>
                <input
                  id="admin-product-tagline-input"
                  type="text"
                  placeholder="e.g., Gentle botanical cell-renewing concentrate"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Category
                </label>
                <select
                  id="admin-product-category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-rose-400"
                >
                  {CATEGORIES.slice(1).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Other">Other / Custom</option>
                </select>
              </div>
            </div>

            {category === 'Other' && (
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Custom Category Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hair Treatments, Body Care"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-rose-400"
                />
              </div>
            )}
          </div>

          {/* Section 2: Pricing & Inventory */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-200/90 pb-1 border-b border-stone-800">
              2. Pricing & Stock Inventory
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Retail Price ($) <span className="text-rose-400">*</span>
                </label>
                <input
                  id="admin-product-price-input"
                  type="number"
                  step="0.01"
                  min="0.5"
                  required
                  placeholder="78.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-rose-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Compare Price ($)
                </label>
                <input
                  id="admin-product-compare-price-input"
                  type="number"
                  step="0.01"
                  placeholder="92.00"
                  value={comparePrice}
                  onChange={(e) => setComparePrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-rose-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Units in Stock <span className="text-rose-400">*</span>
                </label>
                <input
                  id="admin-product-stock-input"
                  type="number"
                  min="0"
                  required
                  placeholder="20"
                  value={stock}
                  onChange={(e) => setStock(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-rose-400 font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-stone-300">SKU Code</label>
                  <button
                    type="button"
                    onClick={handleGenerateSku}
                    className="text-[10px] text-rose-300 hover:underline cursor-pointer"
                  >
                    Auto
                  </button>
                </div>
                <input
                  id="admin-product-sku-input"
                  type="text"
                  placeholder="LUM-SER-01"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-rose-400 font-mono uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Listing Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-rose-400"
                >
                  <option value="active">Active (Visible in Store)</option>
                  <option value="draft">Draft (Hidden)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Product Highlight Badge
                </label>
                <select
                  value={badge || 'none'}
                  onChange={(e) => setBadge(e.target.value === 'none' ? undefined : (e.target.value as any))}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-rose-400"
                >
                  <option value="none">No Badge</option>
                  <option value="clean">100% Clean</option>
                  <option value="bestseller">Bestseller</option>
                  <option value="award">Award Winner</option>
                  <option value="new">New Arrival</option>
                  <option value="sale">Sale / Discount</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Beauty Attributes & Ritual */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-200/90 pb-1 border-b border-stone-800">
              3. Beauty Details, Ingredients & Ritual
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Volume / Bottle Size
                </label>
                <input
                  type="text"
                  placeholder="e.g., 30ml / 1.0 fl oz"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Target Skin Type
                </label>
                <input
                  type="text"
                  placeholder="e.g., All Skin Types, Sensitive & Dehydrated"
                  value={skinType}
                  onChange={(e) => setSkinType(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                Bioactive Ingredients (comma-separated)
              </label>
              <input
                type="text"
                placeholder="2% Bakuchiol, Cold-Pressed Rosehip, Squalane, Vitamin E"
                value={keyActivesInput}
                onChange={(e) => setKeyActivesInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-rose-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                Application Ritual / Instructions
              </label>
              <textarea
                rows={2}
                placeholder="Warm 3-4 drops between clean palms. Gently press into face, neck, and décolletage every evening..."
                value={howToUse}
                onChange={(e) => setHowToUse(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-rose-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                Full Description & Benefits
              </label>
              <textarea
                rows={3}
                placeholder="Explain the clinical formulation, botanical extraction method, and skin transformation results..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-rose-400"
              />
            </div>
          </div>

          {/* Section 4: Imagery */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-stone-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-200/90">
                4. Product Photography
              </h3>
              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="text-xs text-rose-300 hover:text-white flex items-center gap-1 cursor-pointer font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{showPresets ? 'Hide Presets' : 'Choose from Luxury Beauty Presets'}</span>
              </button>
            </div>

            {/* Presets Gallery */}
            {showPresets && (
              <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 grid grid-cols-2 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto">
                {PRESET_IMAGES.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setImageUrl(preset.url);
                      setShowPresets(false);
                    }}
                    className="group cursor-pointer rounded-xl overflow-hidden border border-stone-800 hover:border-rose-400 transition-all"
                  >
                    <div className="aspect-square bg-stone-950">
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-[10px] text-stone-300 p-1 truncate bg-stone-950/80">{preset.name}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-2xl bg-stone-900 border border-stone-700 overflow-hidden shrink-0 flex items-center justify-center">
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-stone-600" />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <input
                  id="admin-product-image-url-input"
                  type="url"
                  placeholder="Paste direct HTTPS image URL..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs focus:outline-none focus:border-rose-400"
                />

                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <span>or upload local file:</span>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 cursor-pointer text-xs border border-stone-700">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Browse Image</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Specifications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-stone-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-200/90">
                5. Formulation Specifications
              </h3>
              <button
                type="button"
                onClick={handleAddSpec}
                className="text-xs text-rose-300 hover:text-white flex items-center gap-1 cursor-pointer font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Attribute</span>
              </button>
            </div>

            <div className="space-y-2">
              {specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Attribute Label (e.g., Formulation)"
                    value={spec.label}
                    onChange={(e) => handleSpecChange(i, 'label', e.target.value)}
                    className="w-1/3 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs focus:outline-none focus:border-rose-400"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g., 100% Waterless, Vegan)"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(i, 'value', e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs focus:outline-none focus:border-rose-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(i)}
                    className="p-1.5 text-stone-500 hover:text-rose-400 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-stone-400 hover:text-white text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="admin-product-save-btn"
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-300 to-amber-200 hover:from-rose-200 hover:to-amber-100 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer"
            >
              {isEditing ? 'Update Listing' : 'Publish Product to Catalog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
