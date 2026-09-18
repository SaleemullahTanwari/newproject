import React from 'react';
import { Heart, ShoppingBag, Eye, Star, AlertCircle, Check } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
            isOutOfStock ? 'opacity-60 grayscale-[40%]' : ''
          }`}
          loading="lazy"
        />

        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.badge === 'sale' && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-rose-600 text-white shadow-xs">
              Save {discountPercent}%
            </span>
          )}
          {product.badge === 'new' && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-stone-900 text-white shadow-xs">
              New Arrival
            </span>
          )}
          {product.badge === 'bestseller' && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-stone-950 shadow-xs">
              Bestseller
            </span>
          )}
          {product.badge === 'limited' && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-indigo-600 text-white shadow-xs">
              Limited Edition
            </span>
          )}
          {isOutOfStock && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-stone-700 text-stone-100 shadow-xs">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10 shadow-xs ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/90 backdrop-blur-xs text-stone-600 hover:text-stone-950 hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick view hover button on desktop */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 px-3 rounded-lg bg-white/95 backdrop-blur-xs text-stone-900 text-xs font-semibold hover:bg-white transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Stock label */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
            <span className="text-stone-500 font-medium uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            {isOutOfStock ? (
              <span className="text-stone-400 font-medium text-[11px]">Sold Out</span>
            ) : isLowStock ? (
              <span className="text-amber-700 font-semibold text-[11px] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Only {product.stock} left
              </span>
            ) : (
              <span className="text-emerald-700 font-medium text-[11px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                In Stock ({product.stock})
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-semibold text-stone-900 text-sm sm:text-base leading-snug hover:text-stone-700 cursor-pointer line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-stone-600 text-xs mt-1 line-clamp-2 leading-relaxed">
            {product.tagline || product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-stone-800 ml-1">
                {product.rating ? product.rating.toFixed(1) : '4.8'}
              </span>
            </div>
            <span className="text-stone-400 text-xs font-light">
              ({product.reviewsCount || 24})
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-400 text-[11px] font-mono">
              {product.sku}
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart footer */}
        <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-stone-900">
                ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {hasDiscount && (
                <span className="text-xs text-stone-400 line-through font-normal">
                  ${product.comparePrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              )}
            </div>
          </div>

          <button
            id={`add-to-cart-${product.id}`}
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product)}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
              isOutOfStock
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-95'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
