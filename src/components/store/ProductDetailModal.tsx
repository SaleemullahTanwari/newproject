import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, Check, Leaf, Sparkles } from 'lucide-react';
import { Product } from '../../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  if (!isOpen || !product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;

  const handleAdd = () => {
    if (isOutOfStock) return;
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="product-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 flex items-center justify-center transition-colors shadow-sm cursor-pointer border border-stone-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visuals & Gallery */}
        <div className="md:w-1/2 p-6 bg-stone-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200 overflow-y-auto">
          <div>
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white border border-stone-200 shadow-xs mb-3">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {product.badge && (
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-stone-900 text-white shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === idx ? 'border-stone-900 ring-2 ring-stone-900/10' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clean Standards Callout */}
          <div className="pt-5 mt-5 border-t border-stone-200 grid grid-cols-3 gap-2 text-center text-[11px] text-stone-600">
            <div className="p-2.5 rounded-xl bg-white border border-stone-200/80">
              <Leaf className="w-4 h-4 mx-auto text-emerald-700 mb-1" />
              <p className="font-semibold text-stone-800">100% Clean</p>
              <p className="text-[10px] text-stone-500">Cruelty-Free</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-stone-200/80">
              <Sparkles className="w-4 h-4 mx-auto text-amber-500 mb-1" />
              <p className="font-semibold text-stone-800">Cold-Pressed</p>
              <p className="text-[10px] text-stone-500">Bioactive</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-stone-200/80">
              <ShieldCheck className="w-4 h-4 mx-auto text-stone-800 mb-1" />
              <p className="font-semibold text-stone-800">Derm Tested</p>
              <p className="text-[10px] text-stone-500">Hypoallergenic</p>
            </div>
          </div>
        </div>

        {/* Right Column: Formulation Details & Purchase */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span className="uppercase tracking-wider text-[11px] font-semibold text-stone-500">
                  {product.category}
                </span>
                {product.volume && (
                  <span className="font-medium text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-md text-[11px]">
                    {product.volume}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 leading-tight">
                {product.name}
              </h2>

              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Price & Rating Row */}
            <div className="flex items-center justify-between py-3 border-y border-stone-200">
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-extrabold text-stone-900">
                  ${product.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-stone-400 line-through font-normal">
                    ${product.comparePrice?.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-stone-600">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-stone-900">{product.rating.toFixed(1)}</span>
                <span className="text-stone-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Skin Type */}
            {product.skinType && (
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs">
                <span className="text-stone-400 font-semibold uppercase tracking-wider text-[10px] block mb-0.5">
                  Target Skin Type
                </span>
                <p className="text-stone-800 font-medium">{product.skinType}</p>
              </div>
            )}

            {/* Key Actives */}
            {product.keyActives && product.keyActives.length > 0 && (
              <div>
                <span className="text-stone-400 font-semibold uppercase tracking-wider text-[10px] block mb-1.5">
                  Bioactive Ingredients
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.keyActives.map((act, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 text-xs font-medium border border-stone-200"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <span className="text-stone-400 font-semibold uppercase tracking-wider text-[10px] block mb-1">
                The Formulation
              </span>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* How to use */}
            {product.howToUse && (
              <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80 text-xs text-stone-800">
                <span className="font-semibold text-stone-900 block mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Application Ritual</span>
                </span>
                <p className="leading-relaxed">{product.howToUse}</p>
              </div>
            )}

            {/* Specifications */}
            {product.specs && product.specs.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <span className="text-stone-400 font-semibold uppercase tracking-wider text-[10px] block">
                  Product Attributes
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="p-2 bg-stone-50 rounded-lg border border-stone-200">
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">{spec.label}</span>
                      <span className="text-stone-800 font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-6 mt-6 border-t border-stone-200 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-semibold text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                id="modal-add-to-cart-btn"
                disabled={isOutOfStock}
                onClick={handleAdd}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                  isOutOfStock
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : addedNotice
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-95'
                }`}
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : isOutOfStock ? (
                  <span>Currently Out of Stock</span>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                id="modal-toggle-wishlist-btn"
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-white text-stone-600 hover:text-stone-950 border-stone-200'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
