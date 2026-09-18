import React from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  Share2
} from 'lucide-react';
import { Product } from '../../types';

interface WishlistPageProps {
  wishlistIds: string[];
  allProducts: Product[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onAddAllInStockToCart: (products: Product[]) => void;
  onViewProduct: (productId: string) => void;
  onNavigateToShop: () => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  wishlistIds,
  allProducts,
  onToggleWishlist,
  onAddToCart,
  onAddAllInStockToCart,
  onViewProduct,
  onNavigateToShop
}) => {
  const wishlistedProducts = allProducts.filter((p) => wishlistIds.includes(p.id));
  const inStockWishlisted = wishlistedProducts.filter((p) => p.stock > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Saved Vanity Collection</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            My Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'formulation' : 'formulations'} saved to your vanity
          </p>
        </div>

        {wishlistedProducts.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddAllInStockToCart(inStockWishlisted)}
              disabled={inStockWishlisted.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>Move All In-Stock to Bag ({inStockWishlisted.length})</span>
            </button>
          </div>
        )}
      </div>

      {/* Wishlist Items Grid */}
      {wishlistedProducts.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-stone-50 border border-dashed border-stone-300 my-8 p-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-100">
            <Heart className="w-8 h-8 fill-rose-100 text-rose-400" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">Your Vanity is Empty</h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto mt-1 mb-6">
            Bookmark serums, balms, and botanical elixirs to curate your personal luxury beauty regimen.
          </p>
          <button
            onClick={onNavigateToShop}
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Explore Formulations
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden"
            >
              {/* Image Box */}
              <div className="relative aspect-square bg-stone-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Remove from wishlist button */}
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-rose-500 hover:bg-rose-50 hover:text-rose-600 shadow-sm transition-colors cursor-pointer"
                  title="Remove from wishlist"
                >
                  <Heart className="w-4 h-4 fill-rose-500" />
                </button>

                {/* Stock Status Badge */}
                <div className="absolute bottom-3 left-3">
                  {product.stock > 0 ? (
                    <span className="px-2 py-1 rounded-md bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>In Stock</span>
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-md bg-rose-900/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-rose-300" />
                      <span>Sold Out</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                    <span className="font-semibold uppercase tracking-wider text-amber-700">
                      {product.category}
                    </span>
                    {product.volume && <span>{product.volume}</span>}
                  </div>

                  <h3
                    onClick={() => onViewProduct(product.id)}
                    className="text-sm font-bold text-stone-900 hover:text-amber-800 transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-2 mt-1 mb-3">
                    {product.shortDescription || product.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-base font-black text-stone-900 font-mono">
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => onAddToCart(product)}
                    disabled={product.stock <= 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recommended Formulations Footer */}
      <div className="mt-16 pt-8 border-t border-stone-200">
        <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Curator's Highlights</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allProducts.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => onViewProduct(item.id)}
              className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer border border-stone-200/60"
            >
              <div className="aspect-square rounded-lg bg-stone-200 overflow-hidden mb-2">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-xs font-bold text-stone-900 truncate">{item.name}</h4>
              <p className="text-xs font-mono font-bold text-stone-700 mt-0.5">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
