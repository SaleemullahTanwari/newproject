import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, Check, AlertCircle } from 'lucide-react';
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
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="product-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visuals & Thumbnails */}
        <div className="md:w-1/2 p-5 sm:p-6 bg-stone-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200 overflow-y-auto">
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-stone-200/80 shadow-xs mb-3">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {product.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-stone-900 text-white">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails if multiple images exist */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === idx ? 'border-stone-900 ring-2 ring-stone-900/10' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Guarantee Perks */}
          <div className="pt-4 mt-4 border-t border-stone-200/80 grid grid-cols-3 gap-2 text-center text-[11px] text-stone-500">
            <div className="p-2 rounded-xl bg-white border border-stone-200/60">
              <Truck className="w-4 h-4 mx-auto text-stone-700 mb-1" />
              <p className="font-medium text-stone-800">Tracked</p>
              <p className="text-[10px]">Worldwide</p>
            </div>
            <div className="p-2 rounded-xl bg-white border border-stone-200/60">
              <ShieldCheck className="w-4 h-4 mx-auto text-stone-700 mb-1" />
              <p className="font-medium text-stone-800">Authentic</p>
              <p className="text-[10px]">Guaranteed</p>
            </div>
            <div className="p-2 rounded-xl bg-white border border-stone-200/60">
              <RotateCcw className="w-4 h-4 mx-auto text-stone-700 mb-1" />
              <p className="font-medium text-stone-800">30 Days</p>
              <p className="text-[10px]">Free Return</p>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-1">
                <span className="uppercase font-semibold tracking-wider text-stone-500">{product.category}</span>
                <span className="font-mono text-stone-400 text-xs">SKU: {product.sku}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                {product.name}
              </h2>
              {product.tagline && (
                <p className="text-stone-500 text-sm mt-1">{product.tagline}</p>
              )}
            </div>

            {/* Rating & Stock status */}
            <div className="flex items-center justify-between gap-4 py-2 border-y border-stone-100">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-800 ml-1">
                  {product.rating?.toFixed(1) || '4.8'}
                </span>
                <span className="text-xs text-stone-400 font-light">
                  ({product.reviewsCount || 24} reviews)
                </span>
              </div>

              <div>
                {isOutOfStock ? (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600">
                    Out of Stock
                  </span>
                ) : isLowStock ? (
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Only {product.stock} units left
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    In Stock ({product.stock} units)
                  </span>
                )}
              </div>
            </div>

            {/* Price display */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-stone-400 line-through text-base">
                    ${product.comparePrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                    Save ${(product.comparePrice! - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="text-stone-600 text-sm leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Specs / Highlights */}
            {product.specs && product.specs.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">Specifications</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="p-2 rounded-lg bg-stone-50 border border-stone-200/60">
                      <span className="text-stone-400 block text-[10px] uppercase font-medium">{spec.label}</span>
                      <span className="font-semibold text-stone-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-6 mt-6 border-t border-stone-200 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="px-3 py-2.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 cursor-pointer font-bold text-sm"
                >
                  -
                </button>
                <span className="px-3 py-2 text-sm font-semibold text-stone-900 min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock || isOutOfStock}
                  className="px-3 py-2.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 cursor-pointer font-bold text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                id="modal-add-to-cart-btn"
                disabled={isOutOfStock}
                onClick={handleAdd}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  isOutOfStock
                    ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                    : addedNotice
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-98'
                }`}
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-stone-300 text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
                aria-label="Toggle Wishlist"
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
