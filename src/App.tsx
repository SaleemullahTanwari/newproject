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
  resetDemoData,
  isAdminAuthenticated,
  setAdminSession
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
import { AdminLogin } from './components/admin/AdminLogin';

// Icons
import {
  Filter,
  ArrowUpDown,
  CheckCircle2,
  SlidersHorizontal,
  X,
  Search,
  PackageX,
  Sparkles
} from 'lucide-react';

export default function App() {
  // Routing State for /admin-p/login and /admin-p
  const getInitialRoute = () => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.startsWith('/admin-p') || hash.includes('admin-p')) {
      return path.startsWith('/admin-p') ? path : hash.replace('#', '');
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialRoute);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(isAdminAuthenticated);
  const [adminTab, setAdminTab] = useState<AdminTab>('products');

  // Handle URL change
  const navigateTo = (path: string) => {
    try {
      window.history.pushState({}, '', path);
    } catch {
      // fallback for environments where pushState is restricted
      window.location.hash = path;
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.startsWith('/admin-p') || hash.includes('admin-p')) {
        setCurrentPath(path.startsWith('/admin-p') ? path : hash.replace('#', ''));
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Core Data
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Filtering & Browsing State (Storefront)
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
    setIsAdminLoggedIn(isAdminAuthenticated());
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
    showToast(`Added "${product.name}" to your bag`);
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

  const handleApplyPromo = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'GLOW15' || normalized === 'STUDIO15') {
      setAppliedPromo(normalized);
      setPromoDiscountRate(0.15);
      showToast('15% botanical discount applied to bag');
      return true;
    } else if (normalized === 'BOTANICAL10' || normalized === 'WELCOME10') {
      setAppliedPromo(normalized);
      setPromoDiscountRate(0.1);
      showToast('10% botanical welcome discount applied');
      return true;
    }
    return false;
  };

  // Wishlist Toggle
  const handleToggleWishlist = (productId: string) => {
    let updatedWishlist: string[];
    if (wishlist.includes(productId)) {
      updatedWishlist = wishlist.filter((id) => id !== productId);
      showToast('Removed formulation from saved wishlist');
    } else {
      updatedWishlist = [...wishlist, productId];
      showToast('Saved formulation to your ritual wishlist');
    }
    updateWishlist(updatedWishlist);
  };

  // Order Complete
  const handleOrderComplete = (newOrder: Order) => {
    // 1. Prepend order
    const updatedOrders = [newOrder, ...orders];
    updateOrders(updatedOrders);

    // 2. Decrement stock
    const updatedProducts = products.map((p) => {
      const purchased = newOrder.items.find((it) => it.productId === p.id);
      if (purchased) {
        return { ...p, stock: Math.max(0, p.stock - purchased.quantity) };
      }
      return p;
    });
    updateProducts(updatedProducts);

    // 3. Clear cart & close checkout
    updateCart([]);
    setIsCheckoutOpen(false);
    setCompletedOrder(newOrder);
  };

  // Admin Actions
  const handleSaveProduct = (productData: Product) => {
    const exists = products.some((p) => p.id === productData.id);
    let updated: Product[];
    if (exists) {
      updated = products.map((p) => (p.id === productData.id ? productData : p));
      showToast(`Updated "${productData.name}"`);
    } else {
      updated = [productData, ...products];
      showToast(`Listed new formulation "${productData.name}"`);
    }
    updateProducts(updated);
  };

  const handleDeleteProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    const updated = products.filter((p) => p.id !== productId);
    updateProducts(updated);
    showToast(`Removed "${product?.name || 'Product'}" from catalog`);
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    const updated = products.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p));
    updateProducts(updated);
    showToast('Updated inventory stock count');
  };

  const handleToggleProductStatus = (productId: string) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        const nextStatus = p.status === 'active' ? 'draft' : 'active';
        return { ...p, status: nextStatus as 'active' | 'draft' };
      }
      return p;
    });
    updateProducts(updated);
    showToast('Updated formulation visibility status');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    updateOrders(updated);
    showToast(`Order status updated to ${newStatus}`);
  };

  const handleResetDemoData = () => {
    const reset = resetDemoData();
    setProducts(reset.products);
    setOrders(reset.orders);
    setCart([]);
    setWishlist([]);
    showToast('Catalog and demo orders reset to fresh beauty defaults');
  };

  // Admin Auth Handlers
  const handleAdminLoginSuccess = () => {
    setAdminSession(true);
    setIsAdminLoggedIn(true);
    navigateTo('/admin-p');
    showToast('Authenticated to Merchant Control Center');
  };

  const handleAdminLogout = () => {
    setAdminSession(false);
    setIsAdminLoggedIn(false);
    navigateTo('/admin-p/login');
    showToast('Signed out of Merchant Control Center');
  };

  // Filtered and Sorted Storefront Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Active status only for customer view
        if (p.status !== 'active') return false;

        // Category filter
        if (activeCategory !== 'All' && p.category !== activeCategory) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchActives = p.keyActives?.some((a) => a.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchCat && !matchActives) {
            return false;
          }
        }

        // Only in stock
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

  // Low stock counter for admin analytics
  const lowStockCount = useMemo(() => {
    return products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  }, [products]);

  // ROUTE DETERMINATION
  const isDedicatedAdminLoginRoute = currentPath === '/admin-p/login';
  const isAdminRoute = currentPath.startsWith('/admin-p');

  // If user navigated to /admin-p/login:
  if (isDedicatedAdminLoginRoute) {
    if (isAdminLoggedIn) {
      // If already logged in, show admin control directly
      return (
        <div className="min-h-screen bg-[#1C1917] text-stone-100 flex flex-col font-sans">
          <AdminHeader
            currentTab={adminTab}
            onSelectTab={setAdminTab}
            onBackToStore={() => navigateTo('/')}
            onLogout={handleAdminLogout}
            onOpenAddProduct={() => {
              setProductToEdit(null);
              setIsProductFormOpen(true);
            }}
            totalProducts={products.length}
            totalOrders={orders.length}
            lowStockCount={lowStockCount}
            onResetData={handleResetDemoData}
          />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
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
                  setQuickViewProduct(p);
                  navigateTo('/');
                }}
              />
            )}
            {adminTab === 'orders' && (
              <AdminOrders orders={orders} onUpdateOrderStatus={handleUpdateOrderStatus} />
            )}
            {adminTab === 'analytics' && (
              <AdminAnalytics
                products={products}
                orders={orders}
                onRestockProduct={(id, amt) => {
                  const target = products.find((p) => p.id === id);
                  handleUpdateStock(id, (target?.stock || 0) + amt);
                }}
                onOpenAddProduct={() => {
                  setProductToEdit(null);
                  setIsProductFormOpen(true);
                }}
              />
            )}
          </main>
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
    return (
      <AdminLogin
        onLoginSuccess={handleAdminLoginSuccess}
        onBackToStore={() => navigateTo('/')}
      />
    );
  }

  // If user is at /admin-p (and authenticated)
  if (isAdminRoute) {
    if (!isAdminLoggedIn) {
      // Must authenticate first
      return (
        <AdminLogin
          onLoginSuccess={handleAdminLoginSuccess}
          onBackToStore={() => navigateTo('/')}
        />
      );
    }

    return (
      <div className="min-h-screen bg-[#1C1917] text-stone-100 flex flex-col font-sans">
        <AdminHeader
          currentTab={adminTab}
          onSelectTab={setAdminTab}
          onBackToStore={() => navigateTo('/')}
          onLogout={handleAdminLogout}
          onOpenAddProduct={() => {
            setProductToEdit(null);
            setIsProductFormOpen(true);
          }}
          totalProducts={products.length}
          totalOrders={orders.length}
          lowStockCount={lowStockCount}
          onResetData={handleResetDemoData}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
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
                setQuickViewProduct(p);
                navigateTo('/');
              }}
            />
          )}
          {adminTab === 'orders' && (
            <AdminOrders orders={orders} onUpdateOrderStatus={handleUpdateOrderStatus} />
          )}
          {adminTab === 'analytics' && (
            <AdminAnalytics
              products={products}
              orders={orders}
              onRestockProduct={(id, amt) => {
                const target = products.find((p) => p.id === id);
                handleUpdateStock(id, (target?.stock || 0) + amt);
              }}
              onOpenAddProduct={() => {
                setProductToEdit(null);
                setIsProductFormOpen(true);
              }}
            />
          )}
        </main>
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

  // STANDARD CLIENT-FACING BEAUTY STORE VIEW (Previous sleek design with dark color palette)
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-stone-900 selection:text-white">
      {/* Dynamic Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-3 fade-in duration-200">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-stone-900 text-white text-xs font-semibold shadow-2xl border border-stone-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* STOREFRONT NAVIGATION (Customer view) */}
      <Navbar
        cartCount={cart.reduce((sum, it) => sum + it.quantity, 0)}
        wishlistCount={wishlist.length}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* DARK HERO BANNER */}
      <HeroBanner
        totalProducts={products.filter((p) => p.status === 'active').length}
        onExploreClick={() => {
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* MAIN CATALOG SECTION */}
      <main id="catalog-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full">
        {/* Section Header Title & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
              {activeCategory === 'All' ? 'Curated Formulations' : activeCategory}
            </h2>
            <p className="text-xs text-stone-500 mt-1 font-normal">
              Showing {filteredProducts.length} available {filteredProducts.length === 1 ? 'formulation' : 'formulations'}
            </p>
          </div>

          {/* Quick Filters & Sorting Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* In stock toggle pill */}
            <button
              id="filter-in-stock-btn"
              onClick={() => setOnlyInStock(!onlyInStock)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                onlyInStock
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${onlyInStock ? 'bg-emerald-400' : 'bg-stone-300'}`} />
              <span>In Stock Only</span>
            </button>

            {/* Sort selection dropdown */}
            <div className="relative">
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="pl-8 pr-8 py-2 text-xs font-semibold rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:border-stone-900 shadow-xs cursor-pointer appearance-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Formulations</option>
              </select>
              <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter chips when active */}
        {(searchQuery || activeCategory !== 'All' || onlyInStock) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-stone-500">Active filters:</span>
            {activeCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-stone-900 text-white font-medium shadow-xs">
                <span>Category: {activeCategory}</span>
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setActiveCategory('All')} />
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-stone-900 text-white font-medium shadow-xs">
                <span>"{searchQuery}"</span>
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}
            {onlyInStock && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-stone-900 text-white font-medium shadow-xs">
                <span>In Stock Only</span>
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setOnlyInStock(false)} />
              </span>
            )}
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setOnlyInStock(false);
              }}
              className="text-xs text-stone-600 hover:text-stone-950 hover:underline ml-2 cursor-pointer font-medium"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-stone-200 shadow-xs p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
              <PackageX className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg">No formulations found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              We couldn't locate any products matching your search criteria. Try modifying your search or clearing category filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setOnlyInStock(false);
              }}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={setQuickViewProduct}
                onAddToCart={(p) => handleAddToCart(p, 1)}
              />
            ))}
          </div>
        )}
      </main>

      {/* FOOTER (With subtle staff portal link to /admin-p/login) */}
      <Footer
        onSelectCategory={setActiveCategory}
        onNavigateToAdminLogin={() => navigateTo('/admin-p/login')}
      />

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

      {/* ORDER SUCCESS CONFIRMATION MODAL */}
      <OrderSuccessModal
        order={completedOrder}
        isOpen={!!completedOrder}
        onClose={() => setCompletedOrder(null)}
      />
    </div>
  );
}
