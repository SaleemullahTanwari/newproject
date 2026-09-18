import React, { useState, useEffect, useMemo } from 'react';
import { Product, Order, CartItem, FilterState } from './types';
import {
  getStoredProducts,
  saveStoredProducts,
  getStoredOrders,
  saveStoredOrders,
  getStoredCart,
  saveStoredCart,
  getStoredWishlist,
  saveStoredWishlist,
  resetDemoData
} from './utils/storage';
import { CATEGORIES } from './data/initialProducts';

// Store Components
import { Navbar } from './components/store/Navbar';
import { HeroBanner } from './components/store/HeroBanner';
import { ProductCard } from './components/store/ProductCard';
import { ProductDetailModal } from './components/store/ProductDetailModal';
import { CartDrawer } from './components/store/CartDrawer';
import { CheckoutModal } from './components/store/CheckoutModal';
import { OrderSuccessModal } from './components/store/OrderSuccessModal';
import { Footer } from './components/store/Footer';

// Admin Components
import { AdminHeader, AdminTab } from './components/admin/AdminHeader';
import { AdminProducts } from './components/admin/AdminProducts';
import { AdminOrders } from './components/admin/AdminOrders';
import { AdminAnalytics } from './components/admin/AdminAnalytics';
import { ProductFormModal } from './components/admin/ProductFormModal';

// Icons
import {
  Filter,
  ArrowUpDown,
  CheckCircle2,
  SlidersHorizontal,
  X,
  Store,
  Shield,
  Search,
  PackageX
} from 'lucide-react';

export default function App() {
  // App view: 'store' | 'admin'
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  const [adminTab, setAdminTab] = useState<AdminTab>('products');

  // Core Data
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Filtering & Browsing State
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  // Promo Code State
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [promoDiscountRate, setPromoDiscountRate] = useState<number>(0);

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isProductFormOpen, setIsProductFormOpen] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((curr) => (curr === message ? null : curr));
    }, 3200);
  };

  // Initial Data Loading
  useEffect(() => {
    setProducts(getStoredProducts());
    setOrders(getStoredOrders());
    setCart(getStoredCart());
    setWishlist(getStoredWishlist());
  }, []);

  // Sync to Storage when data changes
  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    saveStoredProducts(newProducts);
  };

  const updateOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    saveStoredOrders(newOrders);
  };

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    saveStoredCart(newCart);
  };

  const updateWishlist = (newWishlist: string[]) => {
    setWishlist(newWishlist);
    saveStoredWishlist(newWishlist);
  };

  // Cart Operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    if (product.stock <= 0) return;

    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let updatedCart: CartItem[];

    if (existingIndex > -1) {
      updatedCart = [...cart];
      const newQty = Math.min(product.stock, updatedCart[existingIndex].quantity + quantity);
      updatedCart[existingIndex].quantity = newQty;
    } else {
      updatedCart = [...cart, { product, quantity: Math.min(product.stock, quantity) }];
    }

    updateCart(updatedCart);
    showToast(`Added "${product.name}" to cart`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    const updated = cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity: Math.min(item.product.stock, quantity) };
      }
      return item;
    });
    updateCart(updated);
  };

  const handleRemoveCartItem = (productId: string) => {
    const updated = cart.filter((item) => item.product.id !== productId);
    updateCart(updated);
  };

  const handleToggleWishlist = (productId: string) => {
    let updated: string[];
    if (wishlist.includes(productId)) {
      updated = wishlist.filter((id) => id !== productId);
      showToast('Removed from wishlist');
    } else {
      updated = [...wishlist, productId];
      showToast('Saved to your wishlist');
    }
    updateWishlist(updated);
  };

  const handleApplyPromo = (code: string): boolean => {
    if (code === 'STUDIO15') {
      setAppliedPromo('STUDIO15');
      setPromoDiscountRate(0.15);
      showToast('15% discount applied!');
      return true;
    }
    if (code === 'WELCOME10') {
      setAppliedPromo('WELCOME10');
      setPromoDiscountRate(0.10);
      showToast('10% welcome discount applied!');
      return true;
    }
    return false;
  };

  // Order Placement
  const handleOrderComplete = (newOrder: Order) => {
    // 1. Deduct stock from products inventory
    const updatedProducts = products.map((prod) => {
      const purchasedItem = newOrder.items.find((item) => item.productId === prod.id);
      if (purchasedItem) {
        return {
          ...prod,
          stock: Math.max(0, prod.stock - purchasedItem.quantity)
        };
      }
      return prod;
    });

    updateProducts(updatedProducts);

    // 2. Add to orders
    const updatedOrders = [newOrder, ...orders];
    updateOrders(updatedOrders);

    // 3. Clear cart and checkout modal
    updateCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);

    // 4. Open success receipt
    setCompletedOrder(newOrder);
    showToast(`Order #${newOrder.orderNumber} confirmed!`);
  };

  // Admin Product Operations
  const handleSaveProduct = (savedProduct: Product) => {
    const exists = products.some((p) => p.id === savedProduct.id);
    let updated: Product[];
    if (exists) {
      updated = products.map((p) => (p.id === savedProduct.id ? savedProduct : p));
      showToast(`Updated "${savedProduct.name}"`);
    } else {
      updated = [savedProduct, ...products];
      showToast(`Listed new product "${savedProduct.name}"`);
    }
    updateProducts(updated);
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    updateProducts(updated);
    showToast('Product deleted from catalog');
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    const updated = products.map((p) => (p.id === productId ? { ...p, stock: newStock } : p));
    updateProducts(updated);
  };

  const handleToggleProductStatus = (productId: string) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        const nextStatus: Product['status'] = p.status === 'active' ? 'draft' : 'active';
        return { ...p, status: nextStatus };
      }
      return p;
    });
    updateProducts(updated);
    showToast('Product status updated');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    updateOrders(updated);
    showToast(`Order status set to ${newStatus}`);
  };

  const handleResetDemo = () => {
    const res = resetDemoData();
    setProducts(res.products);
    setOrders(res.orders);
    setCart([]);
    setWishlist([]);
    showToast('Store catalog and orders reset to demo default');
  };

  // Filtered and Sorted Storefront Products
  const visibleProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Only active products in storefront
        if (p.status !== 'active') return false;

        // Category filter
        if (activeCategory !== 'All' && p.category !== activeCategory) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesDesc = p.description.toLowerCase().includes(q);
          const matchesTagline = p.tagline?.toLowerCase().includes(q);
          const matchesSku = p.sku.toLowerCase().includes(q);
          if (!matchesName && !matchesDesc && !matchesTagline && !matchesSku) {
            return false;
          }
        }

        // Only in stock filter
        if (onlyInStock && p.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'featured':
          default:
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
      });
  }, [products, activeCategory, searchQuery, onlyInStock, sortBy]);

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-stone-900 selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-stone-900 text-white text-xs font-semibold shadow-xl border border-stone-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* VIEW 1: STOREFRONT */}
      {currentView === 'store' && (
        <>
          {/* Navigation Bar */}
          <Navbar
            cartCount={cartTotalCount}
            wishlistCount={wishlist.length}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              const element = document.getElementById('catalog-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAdmin={() => {
              setCurrentView('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Hero Banner with Curated Showcase */}
          <HeroBanner
            totalProducts={products.filter((p) => p.status === 'active').length}
            onExploreClick={() => {
              const element = document.getElementById('catalog-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onOpenAdmin={() => {
              setCurrentView('admin');
              setAdminTab('products');
              setProductToEdit(null);
              setIsProductFormOpen(true);
            }}
          />

          {/* Catalog Section */}
          <main id="catalog-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
            {/* Header Title & Filter Bar */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
                    {activeCategory === 'All' ? 'Curated Collection' : `${activeCategory}`}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    Showing {visibleProducts.length} objects available for immediate dispatch
                  </p>
                </div>

                {/* Quick Sort & Stock Controls */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Stock Toggle */}
                  <button
                    id="filter-only-in-stock-btn"
                    onClick={() => setOnlyInStock(!onlyInStock)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      onlyInStock
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${onlyInStock ? 'bg-emerald-400' : 'bg-stone-300'}`} />
                    <span>In Stock Only</span>
                  </button>

                  {/* Sort Dropdown */}
                  <div className="relative flex items-center">
                    <ArrowUpDown className="w-3.5 h-3.5 absolute left-3 text-stone-400 pointer-events-none" />
                    <select
                      id="sort-by-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="pl-8 pr-8 py-2 text-xs font-semibold rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:border-stone-900 shadow-xs cursor-pointer appearance-none"
                    >
                      <option value="featured">Featured First</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest Releases</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Categories Pills Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      id={`category-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:text-stone-900'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Active Search Badge */}
              {searchQuery && (
                <div className="flex items-center gap-2 text-xs bg-stone-100 text-stone-700 px-3 py-1.5 rounded-lg w-fit">
                  <Search className="w-3.5 h-3.5 text-stone-400" />
                  <span>
                    Searching for: <strong className="text-stone-900">"{searchQuery}"</strong>
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-0.5 rounded-full hover:bg-stone-200 text-stone-500 cursor-pointer ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Product Grid */}
            {visibleProducts.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-stone-200 shadow-xs p-8 space-y-4">
                <PackageX className="w-12 h-12 text-stone-300 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-stone-900">No objects match your criteria</h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Try changing your category filter, clearing your search query, or add new products via the admin panel.
                  </p>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setActiveCategory('All');
                      setSearchQuery('');
                      setOnlyInStock(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView('admin');
                      setAdminTab('products');
                      setProductToEdit(null);
                      setIsProductFormOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    + List Product in Admin
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                  />
                ))}
              </div>
            )}
          </main>

          {/* Footer */}
          <Footer
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              const element = document.getElementById('catalog-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onOpenAdmin={() => {
              setCurrentView('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </>
      )}

      {/* VIEW 2: ADMIN PANEL */}
      {currentView === 'admin' && (
        <div className="min-h-screen flex flex-col bg-stone-100">
          <AdminHeader
            currentTab={adminTab}
            onSelectTab={setAdminTab}
            onBackToStore={() => {
              setCurrentView('store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAddProduct={() => {
              setProductToEdit(null);
              setIsProductFormOpen(true);
            }}
            totalProducts={products.length}
            totalOrders={orders.length}
            lowStockCount={lowStockCount}
            onResetData={handleResetDemo}
          />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {adminTab === 'products' && (
              <AdminProducts
                products={products}
                onOpenAddProduct={() => {
                  setProductToEdit(null);
                  setIsProductFormOpen(true);
                }}
                onEditProduct={(p) => {
                  setProductToEdit(p);
                  setIsProductFormOpen(true);
                }}
                onDeleteProduct={handleDeleteProduct}
                onUpdateStock={handleUpdateStock}
                onToggleStatus={handleToggleProductStatus}
                onViewProductInStore={(p) => {
                  setCurrentView('store');
                  setQuickViewProduct(p);
                }}
              />
            )}

            {adminTab === 'orders' && (
              <AdminOrders
                orders={orders}
                onUpdateOrderStatus={handleUpdateOrderStatus}
              />
            )}

            {adminTab === 'analytics' && (
              <AdminAnalytics
                products={products}
                orders={orders}
                onRestockProduct={(productId, amount) => {
                  const target = products.find((p) => p.id === productId);
                  if (target) {
                    handleUpdateStock(productId, target.stock + amount);
                    showToast(`Restocked "${target.name}" (+${amount} units)`);
                  }
                }}
                onOpenAddProduct={() => {
                  setProductToEdit(null);
                  setIsProductFormOpen(true);
                }}
              />
            )}
          </main>
        </div>
      )}

      {/* Floating View Switcher Button (Useful on Mobile & Desktop) */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          id="floating-view-toggle"
          onClick={() => {
            setCurrentView(currentView === 'store' ? 'admin' : 'store');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-950/90 hover:bg-stone-900 text-white text-xs font-semibold shadow-2xl border border-stone-800 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          {currentView === 'store' ? (
            <>
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Admin Panel ({products.length})</span>
            </>
          ) : (
            <>
              <Store className="w-4 h-4 text-emerald-400" />
              <span>Back to Storefront</span>
            </>
          )}
        </button>
      </div>

      {/* PRODUCT QUICK VIEW / DETAIL MODAL */}
      <ProductDetailModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* SHOPPING CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        promoDiscountRate={promoDiscountRate}
        onApplyPromo={handleApplyPromo}
      />

      {/* CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        appliedPromo={appliedPromo}
        promoDiscountRate={promoDiscountRate}
        onOrderComplete={handleOrderComplete}
      />

      {/* ORDER SUCCESS RECEIPT MODAL */}
      <OrderSuccessModal
        order={completedOrder}
        isOpen={!!completedOrder}
        onClose={() => setCompletedOrder(null)}
        onViewInAdmin={() => {
          setCompletedOrder(null);
          setCurrentView('admin');
          setAdminTab('orders');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* ADMIN PRODUCT CREATION & EDITING MODAL */}
      <ProductFormModal
        isOpen={isProductFormOpen}
        onClose={() => {
          setIsProductFormOpen(false);
          setProductToEdit(null);
        }}
        onSaveProduct={handleSaveProduct}
        productToEdit={productToEdit}
      />
    </div>
  );
}
