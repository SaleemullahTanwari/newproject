import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Search, 
  ArrowRight, 
  RefreshCw, 
  Copy, 
  Check, 
  FileText, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ShoppingBag
} from 'lucide-react';
import { Order, Product, CustomerUser } from '../../types';

interface OrdersPageProps {
  orders: Order[];
  allProducts?: Product[];
  products?: Product[];
  currentUser: CustomerUser | null;
  onNavigateToShop?: () => void;
  onViewProduct?: (productId: string) => void;
  onReorderItems?: (items: { productId: string; quantity: number }[]) => void;
  onOpenAuthModal: () => void;
  onContactSupport?: (orderNumber?: string) => void;
  onNavigate?: (path: string) => void;
  onAddToCart?: (product: Product) => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({
  orders,
  allProducts,
  products,
  currentUser,
  onNavigateToShop,
  onViewProduct,
  onReorderItems,
  onOpenAuthModal,
  onContactSupport,
  onNavigate,
  onAddToCart
}) => {
  const productList = allProducts || products || [];
  const handleShopNavigation = () => {
    if (onNavigateToShop) onNavigateToShop();
    else if (onNavigate) onNavigate('/shop');
  };
  const handleViewProduct = (id: string) => {
    if (onViewProduct) onViewProduct(id);
    else if (onNavigate) onNavigate(`/product/${id}`);
  };
  const [filterStatus, setFilterStatus] = useState<'all' | 'processing' | 'shipped' | 'delivered'>('all');
  const [copiedTracking, setCopiedTracking] = useState<string | null>(null);
  const [searchOrderInput, setSearchOrderInput] = useState('');
  const [guestLookupOrderNum, setGuestLookupOrderNum] = useState('');
  const [guestLookupEmail, setGuestLookupEmail] = useState('');
  const [guestLookupResult, setGuestLookupResult] = useState<Order | null>(null);
  const [guestLookupError, setGuestLookupError] = useState<string | null>(null);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  // Filter orders for the logged-in customer (or all test orders if no specific user filter is strict)
  const userOrders = orders.filter((o) => {
    if (!currentUser) return true; // Show demo store orders for viewing
    const userMatch = o.userId && o.userId === currentUser.id;
    const emailMatch = o.customer?.email?.toLowerCase() === currentUser.email?.toLowerCase();
    return userMatch || emailMatch || orders.length <= 4;
  });

  const filteredOrders = userOrders.filter((o) => {
    const matchesStatus = filterStatus === 'all' ? true : o.status === filterStatus;
    const matchesSearch = searchOrderInput.trim() === ''
      ? true
      : o.orderNumber.toLowerCase().includes(searchOrderInput.toLowerCase()) ||
        o.items.some((it) => (it.name || '').toLowerCase().includes(searchOrderInput.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleCopyTracking = (tracking: string) => {
    navigator.clipboard?.writeText(tracking);
    setCopiedTracking(tracking);
    setTimeout(() => setCopiedTracking(null), 2000);
  };

  const handleGuestLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setGuestLookupError(null);
    const found = orders.find(
      (o) =>
        o.orderNumber.trim().toLowerCase() === guestLookupOrderNum.trim().toLowerCase() &&
        (!guestLookupEmail || o.customer?.email?.trim().toLowerCase() === guestLookupEmail.trim().toLowerCase())
    );

    if (found) {
      setGuestLookupResult(found);
    } else {
      setGuestLookupError(`No order found matching "${guestLookupOrderNum}". Try sample order number: AYE-94821`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
            <Package className="w-3.5 h-3.5" />
            <span>Order History & Live Fulfillment</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            My Orders & Tracking
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Track real-time carrier status, view formulation receipts, and manage delivery logistics.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToShop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span>Browse Formulations</span>
          </button>
        </div>
      </div>

      {/* Guest Order Lookup Banner */}
      {!currentUser && (
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-amber-600" />
                <span>Instant Guest Order Lookup</span>
              </h3>
              <p className="text-xs text-amber-800/90 mt-0.5">
                Placed an order without an account? Track your luxury delivery by entering your Order ID and Email.
              </p>
            </div>
            <form onSubmit={handleGuestLookup} className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              <input
                type="text"
                placeholder="Order # (e.g. AYE-94821)"
                value={guestLookupOrderNum}
                onChange={(e) => setGuestLookupOrderNum(e.target.value)}
                required
                className="px-3 py-2 text-xs bg-white border border-amber-300 rounded-xl focus:outline-none focus:border-amber-500 text-stone-900 placeholder-stone-400"
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={guestLookupEmail}
                onChange={(e) => setGuestLookupEmail(e.target.value)}
                className="px-3 py-2 text-xs bg-white border border-amber-300 rounded-xl focus:outline-none focus:border-amber-500 text-stone-900 placeholder-stone-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Track Order
              </button>
            </form>
          </div>

          {guestLookupError && (
            <p className="text-xs text-rose-700 mt-2 flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{guestLookupError}</span>
            </p>
          )}

          {/* Render Result of Guest Lookup if requested */}
          {guestLookupResult && (
            <div className="mt-4 p-4 rounded-xl bg-white border border-amber-300 shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Found Order</span>
                  <h4 className="text-sm font-bold text-stone-900">Order #{guestLookupResult.orderNumber}</h4>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  guestLookupResult.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                  guestLookupResult.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  Status: {guestLookupResult.status}
                </span>
              </div>
              <div className="pt-3 text-xs text-stone-600 flex flex-wrap justify-between gap-2">
                <span>Placed on: {new Date(guestLookupResult.createdAt).toLocaleDateString()}</span>
                <span>Total: <strong className="text-stone-900 font-mono">${guestLookupResult.total.toFixed(2)}</strong></span>
                <span>Carrier Tracking: <strong className="text-stone-900 font-mono">{guestLookupResult.trackingNumber || 'AYE-88291-US'}</strong></span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filter Tabs & Quick Search */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'shipped', label: 'In Transit / Shipped' },
            { id: 'delivered', label: 'Delivered' },
            { id: 'processing', label: 'Processing' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                filterStatus === tab.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Orders Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order # or product..."
            value={searchOrderInput}
            onChange={(e) => setSearchOrderInput(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-stone-900 placeholder-stone-400"
          />
        </div>
      </div>

      {/* Orders List Content */}
      <div className="mt-6 space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-stone-50 border border-dashed border-stone-300">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
              <Package className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-stone-900">No Orders Found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-5">
              {searchOrderInput 
                ? `No orders matching "${searchOrderInput}". Try a different search query.`
                : "You don't have any orders matching this status filter yet."}
            </p>
            <button
              onClick={onNavigateToShop}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Explore Ayesha Beauty Formulations
            </button>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const trackingNum = order.trackingNumber || `AYE-${order.orderNumber.replace(/[^0-9]/g, '') || '94821'}-US`;
            
            // Progress Step (1 to 4)
            const step = order.status === 'delivered' ? 4 : order.status === 'shipped' ? 3 : 2;

            return (
              <div 
                key={order.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden hover:border-stone-300 transition-colors"
              >
                {/* Order Card Header */}
                <div className="p-4 sm:p-5 bg-stone-50/80 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-stone-600">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">Order Placed</span>
                      <span className="font-semibold text-stone-800">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">Total</span>
                      <span className="font-semibold text-stone-900 font-mono">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">Ship To</span>
                      <span className="font-semibold text-stone-800 truncate max-w-40 block" title={order.customer?.fullName}>
                        {order.customer?.fullName || 'Valued Customer'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">Order Number</span>
                      <span className="font-bold text-stone-900 font-mono text-xs sm:text-sm">
                        #{order.orderNumber}
                      </span>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      order.status === 'delivered' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : order.status === 'shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status === 'delivered' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {order.status === 'shipped' && <Truck className="w-3 h-3 text-blue-600" />}
                      {order.status === 'processing' && <Clock className="w-3 h-3 text-amber-600" />}
                      <span>{order.status}</span>
                    </span>
                  </div>
                </div>

                {/* Interactive Shipment Progress Bar */}
                <div className="p-4 sm:p-5 border-b border-stone-100 bg-stone-50/30">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-3">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-amber-600" />
                      <span>
                        {order.status === 'delivered'
                          ? 'Package Delivered to Doorstep'
                          : order.status === 'shipped'
                          ? 'In Transit with Express Courier'
                          : 'Order Received & Being Formulated'}
                      </span>
                    </div>

                    {/* Carrier Tracking Pill */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-stone-400 font-normal">Tracking:</span>
                      <span className="font-mono text-xs font-bold text-stone-900">{trackingNum}</span>
                      <button
                        onClick={() => handleCopyTracking(trackingNum)}
                        className="p-1 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                        title="Copy tracking number"
                      >
                        {copiedTracking === trackingNum ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Visual Stepper */}
                  <div className="relative pt-2 pb-1">
                    <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{ width: step === 4 ? '100%' : step === 3 ? '70%' : '30%' }}
                      />
                    </div>
                    <div className="grid grid-cols-4 text-[10px] font-semibold text-stone-500 pt-2 text-center">
                      <span className="text-amber-700">1. Order Placed</span>
                      <span className={step >= 2 ? 'text-amber-700' : ''}>2. Handcrafted</span>
                      <span className={step >= 3 ? 'text-amber-700' : ''}>3. On Carrier</span>
                      <span className={step >= 4 ? 'text-emerald-700 font-bold' : ''}>4. Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Ordered Items Grid */}
                <div className="p-4 sm:p-5 space-y-4">
                  <div className="space-y-3">
                    {order.items.map((item, idx) => {
                      const prod = productList.find((p) => p.id === item.productId);

                      return (
                        <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-stone-100 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200/60">
                              <img
                                src={item.image || prod?.images?.[0] || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300'}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 
                                onClick={() => handleViewProduct(item.productId)}
                                className="text-xs sm:text-sm font-bold text-stone-900 hover:text-amber-700 transition-colors cursor-pointer"
                              >
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-stone-500 mt-0.5">
                                Qty: <strong className="font-semibold text-stone-700">{item.quantity}</strong> × ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-xs sm:text-sm font-bold text-stone-900 font-mono">
                              ${(item.quantity * item.price).toFixed(2)}
                            </span>
                            <div className="mt-1">
                              <button
                                onClick={() => handleViewProduct(item.productId)}
                                className="text-[11px] text-amber-700 hover:underline font-semibold cursor-pointer"
                              >
                                View Product
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-stone-500 text-[11px]">
                      Delivering to: <span className="font-medium text-stone-700">{order.customer?.address}, {order.customer?.city}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedReceiptOrder(order)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold cursor-pointer transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-stone-500" />
                        <span>View Receipt</span>
                      </button>

                      <button
                        onClick={() => onReorderItems(order.items)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold cursor-pointer transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                        <span>Buy Again</span>
                      </button>

                      <button
                        onClick={() => onContactSupport(order.orderNumber)}
                        className="p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer"
                        title="Need help with this order?"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: View Receipt Details */}
      {selectedReceiptOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-stone-900">Official Order Receipt</h3>
              </div>
              <button 
                onClick={() => setSelectedReceiptOrder(null)}
                className="text-stone-400 hover:text-stone-600 text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="text-xs space-y-2 text-stone-600">
              <p><strong>Order ID:</strong> #{selectedReceiptOrder.orderNumber}</p>
              <p><strong>Customer:</strong> {selectedReceiptOrder.customer?.fullName}</p>
              <p><strong>Email:</strong> {selectedReceiptOrder.customer?.email}</p>
              <p><strong>Payment:</strong> {selectedReceiptOrder.paymentMethod || 'Credit Card (Visa)'}</p>
              <p><strong>Date:</strong> {new Date(selectedReceiptOrder.createdAt).toLocaleString()}</p>
            </div>

            <div className="py-2 border-y border-stone-200 space-y-1.5 text-xs">
              {selectedReceiptOrder.items.map((it, i) => (
                <div key={i} className="flex justify-between">
                  <span>{it.quantity}× {it.name}</span>
                  <span className="font-mono font-medium">${(it.quantity * it.price).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-1 text-xs space-y-1 font-mono">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span>${selectedReceiptOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Shipping</span>
                <span>{selectedReceiptOrder.shipping === 0 ? 'Complimentary' : `$${selectedReceiptOrder.shipping.toFixed(2)}`}</span>
              </div>
              {selectedReceiptOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount Applied</span>
                  <span>-${selectedReceiptOrder.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-900 font-bold text-sm pt-1 border-t border-stone-200">
                <span>Total Paid</span>
                <span>${selectedReceiptOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => window.print()}
                className="w-full py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Print / Save PDF Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
