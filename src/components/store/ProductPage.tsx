import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Heart, 
  Share2, 
  Check, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Leaf, 
  Sparkles, 
  Droplets, 
  Clock, 
  ChevronRight,
  AlertCircle,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Product, CustomerUser } from '../../types';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface ProductPageProps {
  productId: string;
  products: Product[];
  onNavigateBack: () => void;
  onNavigateToProduct: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onDirectCheckout: (product: Product, quantity?: number) => void;
  isWishlisted: (productId: string) => boolean;
  onToggleWishlist: (productId: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenCheckout: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: string) => void;
  onNavigateToAdminLogin: () => void;
  onNavigate?: (path: string) => void;
  currentPath?: string;
  currentUser?: CustomerUser | null;
  userOrderCount?: number;
  onOpenAuthModal?: () => void;
  onOpenAccountModal?: (tab?: 'orders' | 'profile' | 'wishlist') => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  productId,
  products,
  onNavigateBack,
  onNavigateToProduct,
  onAddToCart,
  onDirectCheckout,
  isWishlisted,
  onToggleWishlist,
  cartCount,
  wishlistCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onNavigateToAdminLogin,
  onNavigate = () => {},
  currentPath = `/product/${productId}`,
  currentUser,
  userOrderCount,
  onOpenAuthModal,
  onOpenAccountModal
}) => {
  const product = products.find((p) => p.id === productId);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'ritual' | 'ingredients' | 'benefits' | 'reviews'>('ritual');
  const [addedNotice, setAddedNotice] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Reset view state when product changes
  useEffect(() => {
    setSelectedImageIdx(0);
    setQuantity(1);
    setAddedNotice(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      document.title = `${product.name} | Ayesha Beauty`;
    }
    return () => {
      document.title = 'Ayesha Beauty | Luxury Skincare & Cosmetics';
    };
  }, [productId, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
        <Navbar
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          activeCategory="All"
          onSelectCategory={onSelectCategory}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onOpenCart={onOpenCart}
          onNavigateHome={onNavigateBack}
          currentPath={currentPath}
          onNavigate={onNavigate}
          currentUser={currentUser}
          userOrderCount={userOrderCount}
          onOpenAuthModal={onOpenAuthModal}
          onOpenAccountModal={onOpenAccountModal}
        />
        <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-200 text-stone-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900">Formulation Not Found</h2>
          <p className="text-stone-600 text-sm">
            The requested beauty product could not be located in our current formulary catalogue.
          </p>
          <button
            onClick={onNavigateBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white font-medium text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Storefront</span>
          </button>
        </div>
        <Footer
          onSelectCategory={onSelectCategory}
          onNavigateToAdminLogin={onNavigateToAdminLogin}
        />
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  const handleAdd = () => {
    if (isOutOfStock) return;
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    onDirectCheckout(product, quantity);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Related products from same category or complementary
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.status === 'active')
    .sort((a, b) => (a.category === product.category ? -1 : 1))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col justify-between selection:bg-stone-900 selection:text-white">
      {/* Reusable Simple Navbar */}
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        activeCategory={product.category}
        onSelectCategory={onSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onOpenCart={onOpenCart}
        onNavigateHome={onNavigateBack}
        currentPath={currentPath}
        onNavigate={onNavigate}
        currentUser={currentUser}
        userOrderCount={userOrderCount}
        onOpenAuthModal={onOpenAuthModal}
        onOpenAccountModal={onOpenAccountModal}
      />

      {/* Product Page Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
        
        {/* Top Breadcrumbs & Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-stone-200 mb-8">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <button
              onClick={onNavigateBack}
              className="inline-flex items-center gap-1.5 font-semibold text-stone-800 hover:text-stone-950 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Products</span>
            </button>
            <span>/</span>
            <button
              onClick={() => onSelectCategory(product.category)}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              {product.category}
            </button>
            <span className="hidden sm:inline">/</span>
            <span className="text-stone-900 font-medium truncate max-w-xs hidden sm:inline">
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
              title="Share product link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Gallery & Visual Display */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Featured Image Container */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm group">
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.badge === 'bestseller' && (
                  <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-stone-950 shadow-xs">
                    Bestseller
                  </span>
                )}
                {product.badge === 'award' && (
                  <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-stone-950 shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Award Winner</span>
                  </span>
                )}
                {product.badge === 'clean' && (
                  <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-700 text-white shadow-xs">
                    100% Clean Actives
                  </span>
                )}
                {product.badge === 'new' && (
                  <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-stone-900 text-white shadow-xs">
                    New Formulation
                  </span>
                )}
                {hasDiscount && (
                  <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Wishlist Quick Toggle on Image */}
              <button
                id="product-page-wishlist-toggle"
                onClick={() => onToggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-sm ${
                  isWishlisted(product.id)
                    ? 'bg-rose-50 text-rose-600 ring-2 ring-rose-200'
                    : 'bg-white/90 text-stone-600 hover:text-stone-900 hover:bg-white'
                }`}
                title="Add to wishlist"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted(product.id) ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnails Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    id={`product-thumbnail-${idx}`}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-white ${
                      selectedImageIdx === idx
                        ? 'border-stone-900 ring-2 ring-stone-900/15 scale-102'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Clean Formulation Trust Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-stone-200 text-center space-y-1">
                <Leaf className="w-5 h-5 mx-auto text-emerald-700" />
                <p className="font-bold text-stone-900 text-xs">100% Non-Toxic</p>
                <p className="text-[11px] text-stone-500">Cruelty-free & vegan</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200 text-center space-y-1">
                <ShieldCheck className="w-5 h-5 mx-auto text-amber-600" />
                <p className="font-bold text-stone-900 text-xs">Derm Approved</p>
                <p className="text-[11px] text-stone-500">Sensitive skin tested</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200 text-center space-y-1">
                <RotateCcw className="w-5 h-5 mx-auto text-stone-700" />
                <p className="font-bold text-stone-900 text-xs">30-Day Courtesy</p>
                <p className="text-[11px] text-stone-500">Easy return guarantee</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Formulation Info & Purchase Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header: Category, Title, Rating */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-500 font-mono">
                  {product.category}
                </span>
                <span className="text-xs font-mono text-stone-400">SKU: {product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Tagline */}
              <p className="text-stone-600 text-sm sm:text-base font-normal leading-relaxed">
                {product.tagline}
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-900">
                  {product.rating ? product.rating.toFixed(1) : '4.9'}
                </span>
                <span className="text-xs text-stone-500">
                  ({product.reviewsCount || 48} verified customer reviews)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-stone-950">
                  ${product.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-base text-stone-400 line-through">
                      ${product.comparePrice!.toFixed(2)}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      Save ${(product.comparePrice! - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-stone-500 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Complimentary express delivery on orders over $65</span>
              </p>
            </div>

            {/* Volume & Skin Type Pill Overview */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-1">
                  Volume / Net Wt.
                </span>
                <span className="font-semibold text-stone-800">
                  {product.volume || '50 ml / 1.7 fl. oz.'}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-1">
                  Target Skin Type
                </span>
                <span className="font-semibold text-stone-800 truncate block" title={product.skinType}>
                  {product.skinType || 'All skin types & sensitive'}
                </span>
              </div>
            </div>

            {/* Key Active Ingredients Tags */}
            {product.keyActives && product.keyActives.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Key Active Botanicals
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.keyActives.map((act, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-stone-200 text-xs font-medium text-stone-800 shadow-2xs"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>{act}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Availability Indicator */}
            <div className="flex items-center gap-2 text-xs">
              {isOutOfStock ? (
                <div className="flex items-center gap-1.5 text-rose-700 font-semibold bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
                  <AlertCircle className="w-4 h-4" />
                  <span>Currently Sold Out — Join Waitlist</span>
                </div>
              ) : isLowStock ? (
                <div className="flex items-center gap-1.5 text-amber-800 font-semibold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Low Inventory: Only {product.stock} units remaining</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-emerald-800 font-medium bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>In Stock ({product.stock} units) • Dispatches within 24 hours</span>
                </div>
              )}
            </div>

            {/* Quantity Selector & CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Counter */}
                <div className="flex items-center bg-white border border-stone-300 rounded-xl overflow-hidden shadow-2xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={isOutOfStock || quantity <= 1}
                    className="px-3.5 py-3 text-stone-700 hover:bg-stone-100 disabled:opacity-40 cursor-pointer font-bold"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 text-xs font-bold text-stone-900 font-mono min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={isOutOfStock || quantity >= product.stock}
                    className="px-3.5 py-3 text-stone-700 hover:bg-stone-100 disabled:opacity-40 cursor-pointer font-bold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  id="product-page-add-to-cart-btn"
                  onClick={handleAdd}
                  disabled={isOutOfStock}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>
                    {isOutOfStock ? 'Sold Out' : `Add to Bag • $${(product.price * quantity).toFixed(2)}`}
                  </span>
                </button>
              </div>

              {/* Buy Now Direct Checkout */}
              {!isOutOfStock && (
                <button
                  id="product-page-buy-now-btn"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Instant Checkout • Fast Delivery</span>
                </button>
              )}

              {/* Added Feedback Toast */}
              {addedNotice && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-medium animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Added {quantity} unit(s) of {product.name} to your shopping bag!</span>
                </div>
              )}
            </div>

            {/* Description Summary */}
            <div className="pt-4 border-t border-stone-200 text-xs text-stone-600 leading-relaxed space-y-2">
              <p>{product.description}</p>
            </div>
          </div>
        </div>

        {/* DEEP DIVE TABS: Ritual, Full Ingredients, Benefits, Reviews */}
        <div className="mt-16 pt-10 border-t border-stone-200">
          
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto scrollbar-none">
            <button
              id="tab-btn-ritual"
              onClick={() => setActiveTab('ritual')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'ritual'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Application Ritual
            </button>

            <button
              id="tab-btn-ingredients"
              onClick={() => setActiveTab('ingredients')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'ingredients'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Full Formulary (INCI)
            </button>

            <button
              id="tab-btn-benefits"
              onClick={() => setActiveTab('benefits')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'benefits'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Specifications & Benefits
            </button>

            <button
              id="tab-btn-reviews"
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Client Reviews ({product.reviewsCount || 48})
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="py-8">
            {activeTab === 'ritual' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6 max-w-4xl shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">The Suggested Daily Ritual</h3>
                    <p className="text-stone-500 text-xs">Maximize absorption and lipid bioavailability</p>
                  </div>
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                  {product.howToUse ||
                    'Warm 3 to 4 drops between the palms of clean hands to awaken active botanicals. Inhale gently, then press into damp face, neck, and décolletage using firm, upward sweep motions until fully absorbed. Use morning and night following cleansing.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Step 01</span>
                    <h4 className="font-semibold text-stone-900 text-xs">Cleanse & Tone</h4>
                    <p className="text-stone-500 text-xs">Ensure skin mantle is clean and slightly damp.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Step 02</span>
                    <h4 className="font-semibold text-stone-900 text-xs">Press & Infuse</h4>
                    <p className="text-stone-500 text-xs">Gently press without dragging delicate skin tissues.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Step 03</span>
                    <h4 className="font-semibold text-stone-900 text-xs">Lock in Lipids</h4>
                    <p className="text-stone-500 text-xs">Follow with restorative cream and daytime SPF shield.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6 max-w-4xl shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">Full Formulation Transparency (INCI)</h3>
                    <p className="text-stone-500 text-xs">Free of parabens, phthalates, synthetic fragrance, and silicones</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-700 leading-relaxed">
                  Rosa Canina (Cold-Pressed Wild Rosehip) Seed Oil*, Squalane (Sugar-Cane Derived), Bakuchiol (2% Sytenol A)*, 
                  Simmondsia Chinensis (Jojoba) Seed Oil*, Tocopherol (Non-GMO Vitamin E), Ubiquinone (CoQ10), 
                  Helianthus Annuus (Sunflower) Seed Oil, Bisabolol*, Pelargonium Graveolens (Rose Geranium) Flower Essence. 
                  *Certified Organic Clinical Harvest.
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="font-bold text-stone-900 block">Non-GMO</span>
                    <span className="text-[10px] text-stone-500">Plant derived</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="font-bold text-stone-900 block">Cruelty-Free</span>
                    <span className="text-[10px] text-stone-500">Leaping Bunny</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="font-bold text-stone-900 block">Fragrance-Free</span>
                    <span className="text-[10px] text-stone-500">No synthetic perfumes</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="font-bold text-stone-900 block">Recyclable</span>
                    <span className="text-[10px] text-stone-500">Amber glass bottle</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6 max-w-4xl shadow-2xs">
                <h3 className="font-bold text-stone-900 text-base">Technical Specifications & Proven Benefits</h3>
                
                <div className="divide-y divide-stone-100 text-xs">
                  {product.specs && product.specs.length > 0 ? (
                    product.specs.map((spec, idx) => (
                      <div key={idx} className="py-2.5 flex justify-between">
                        <span className="text-stone-500 font-medium">{spec.label}</span>
                        <span className="text-stone-900 font-semibold">{spec.value}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-stone-500 font-medium">Texture Profile</span>
                        <span className="text-stone-900 font-semibold">Silky, fast-absorbing micro-emulsion</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-stone-500 font-medium">Aromatic Note</span>
                        <span className="text-stone-900 font-semibold">Subtle wild rosehip & herbal chamomile</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-stone-500 font-medium">pH Balance</span>
                        <span className="text-stone-900 font-semibold">5.4 (Bio-compatible with skin barrier)</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-stone-500 font-medium">Certifications</span>
                        <span className="text-stone-900 font-semibold">Ecocert • PETA Approved Vegan</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6 max-w-4xl shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                  <div>
                    <h3 className="font-bold text-stone-900 text-lg">Verified Customer Reviews</h3>
                    <p className="text-stone-500 text-xs">Based on {product.reviewsCount || 48} community evaluations</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-extrabold text-stone-950 font-mono">
                      {product.rating ? product.rating.toFixed(1) : '4.9'}
                    </span>
                    <div className="text-amber-500">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-stone-500 font-medium">98% Recommendation rate</span>
                    </div>
                  </div>
                </div>

                {/* Sample Review Testimonials */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900">Sophie V. — Verified Buyer</span>
                      <span className="text-stone-400 text-[11px]">2 days ago</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-stone-700 leading-relaxed">
                      "I have been using this for 3 weeks and my morning glow has completely transformed. It absorbs instantly with no heavy residue and plays beautifully under sunscreen."
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900">Dr. Elena K. — Dermatologist</span>
                      <span className="text-stone-400 text-[11px]">1 week ago</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-stone-700 leading-relaxed">
                      "The 2% Bakuchiol concentration provides all the retinol-like renewal without any redness or peeling. The inclusion of squalane keeps the barrier protected."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED COMPLEMENTARY ROUTINE */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">
                  Curated Skincare Routine
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                  Complementary Formulations
                </h3>
              </div>
              <button
                onClick={onNavigateBack}
                className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Catalog</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigateToProduct(rel.id)}
                  className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {rel.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-900 text-white shadow-xs">
                        {rel.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-stone-500 block mb-1">
                        {rel.category}
                      </span>
                      <h4 className="font-semibold text-stone-900 text-sm line-clamp-1 group-hover:text-amber-700 transition-colors">
                        {rel.name}
                      </h4>
                      <p className="text-stone-500 text-xs line-clamp-1 mt-1">{rel.tagline}</p>
                    </div>
                    <div className="pt-2 flex items-center justify-between border-t border-stone-100 text-xs">
                      <span className="font-extrabold text-stone-900">${rel.price.toFixed(2)}</span>
                      <span className="text-amber-600 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Reusable Clean Footer */}
      <Footer
        onSelectCategory={onSelectCategory}
        onNavigateToAdminLogin={onNavigateToAdminLogin}
        onNavigate={onNavigate}
      />
    </div>
  );
};
