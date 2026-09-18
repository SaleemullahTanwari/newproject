import React, { useState, useEffect } from 'react';
import { 
  X, 
  Package, 
  User, 
  Heart, 
  Sparkles, 
  LogOut, 
  Clock, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  ShoppingBag, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { CustomerUser, Order, Product } from '../../types';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CustomerUser | null;
  orders: Order[];
  products: Product[];
  wishlistIds: string[];
  initialTab?: 'orders' | 'profile' | 'wishlist';
  onUpdateUser: (updated: CustomerUser) => void;
  onLogout: () => void;
  onAddToCart: (product: Product) => void;
  onViewProduct: (productId: string) => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  orders,
  products,
  wishlistIds,
  initialTab = 'orders',
  onUpdateUser,
  onLogout,
  onAddToCart,
  onViewProduct
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'wishlist'>(initialTab);

  // Edit Profile form state
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [skinType, setSkinType] = useState(currentUser?.skinType || 'Combination / Sensitive');

  // Address state
  const [address, setAddress] = useState(currentUser?.defaultShippingAddress?.address || '');
  const [city, setCity] = useState(currentUser?.defaultShippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(currentUser?.defaultShippingAddress?.postalCode || '');

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPhone(currentUser.phone || '');
      setSkinType(currentUser.skinType || 'Combination / Sensitive');
      setAddress(currentUser.defaultShippingAddress?.address || '');
      setCity(currentUser.defaultShippingAddress?.city || '');
      setPostalCode(currentUser.defaultShippingAddress?.postalCode || '');
    }
  }, [currentUser]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  if (!isOpen || !currentUser) return null;

  // Filter orders related to this user: by userId OR customer email matching
  const userOrders = orders.filter(
    (ord) =>
      (ord.userId && ord.userId === currentUser.id) ||
      (ord.customer && ord.customer.email && ord.customer.email.toLowerCase() === currentUser.email.toLowerCase())
  );

  // Filter wishlisted products
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CustomerUser = {
      ...currentUser,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      skinType,
      defaultShippingAddress: {
        address: address.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
        phone: phone.trim()
      }
    };
    onUpdateUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden text-stone-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-950/80">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-300 to-rose-300 text-stone-950 flex items-center justify-center font-extrabold text-xl shadow-md">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {currentUser.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {currentUser.memberTier || 'Gold Glow'}
                </span>
              </div>
              <p className="text-xs text-stone-400 flex items-center gap-2 mt-0.5">
                <span>{currentUser.email}</span>
                <span>•</span>
                <span className="text-amber-400 font-medium">
                  {currentUser.rewardPoints || 450} Glow Points
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-stone-700/60"
            >
              <LogOut className="w-3.5 h-3.5 text-stone-400" />
              <span>Sign Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-800 bg-stone-900/90 px-6 gap-2 overflow-x-auto scrollbar-none">
          <button
            id="account-tab-orders"
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({userOrders.length})</span>
          </button>

          <button
            id="account-tab-profile"
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Addresses</span>
          </button>

          <button
            id="account-tab-wishlist"
            onClick={() => setActiveTab('wishlist')}
            className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'wishlist'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlistedProducts.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {userOrders.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-stone-950/40 rounded-2xl border border-stone-800/80 p-8">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-stone-800 text-stone-400 flex items-center justify-center">
                    <Package className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-white">No Orders Placed Yet</h3>
                  <p className="text-xs text-stone-400 max-w-sm mx-auto">
                    When you purchase botanical formulations with Ayesha Beauty, your orders and tracking status will appear here.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    <span>Browse Collection</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userOrders.map((ord) => {
                    const statusColors: Record<string, string> = {
                      pending: 'bg-amber-950 text-amber-400 border-amber-800',
                      processing: 'bg-blue-950 text-blue-400 border-blue-800',
                      shipped: 'bg-purple-950 text-purple-300 border-purple-800',
                      delivered: 'bg-emerald-950 text-emerald-400 border-emerald-800',
                      cancelled: 'bg-rose-950 text-rose-400 border-rose-800'
                    };

                    const steps = [
                      { label: 'Confirmed', done: true },
                      { label: 'Artisan Batch Prep', done: ord.status !== 'pending' },
                      { label: 'Dispatched', done: ord.status === 'shipped' || ord.status === 'delivered' },
                      { label: 'Delivered', done: ord.status === 'delivered' }
                    ];

                    return (
                      <div
                        key={ord.id}
                        className="bg-stone-950 rounded-2xl border border-stone-800 p-5 space-y-4 hover:border-stone-700 transition-colors"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800/80">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-white text-sm">
                                #{ord.orderNumber}
                              </span>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[ord.status] || 'bg-stone-800 text-stone-300'}`}>
                                {ord.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-400 mt-0.5">
                              Placed on {new Date(ord.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })} • {ord.paymentMethod}
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="text-base font-extrabold text-white">
                              ${ord.total.toFixed(2)}
                            </span>
                            <span className="text-[11px] text-stone-400 block">
                              {ord.items.reduce((s, it) => s + it.quantity, 0)} item(s)
                            </span>
                          </div>
                        </div>

                        {/* Order Tracking Progress Bar */}
                        <div className="py-2">
                          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1.5">
                            <span className="flex items-center gap-1 font-medium text-stone-300">
                              <Truck className="w-3.5 h-3.5 text-amber-400" />
                              <span>Fulfillment Progress</span>
                            </span>
                            <span className="text-stone-500 font-mono text-[10px]">
                              Tracking: {ord.trackingNumber || `AYE-${ord.id.slice(-6).toUpperCase()}`}
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5">
                            {steps.map((st, i) => (
                              <div key={i} className="space-y-1 text-center">
                                <div className={`h-1.5 rounded-full transition-all ${st.done ? 'bg-amber-400' : 'bg-stone-800'}`} />
                                <span className={`text-[10px] truncate block ${st.done ? 'text-stone-200 font-medium' : 'text-stone-600'}`}>
                                  {st.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Item Thumbnails & Names */}
                        <div className="space-y-2.5 pt-1">
                          {ord.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between gap-3 p-2 rounded-xl bg-stone-900/70 border border-stone-800/60"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-11 h-11 rounded-lg object-cover bg-stone-800"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <h4 className="text-xs font-semibold text-stone-200 line-clamp-1">
                                    {item.name}
                                  </h4>
                                  <p className="text-[11px] text-stone-400">
                                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    onClose();
                                    onViewProduct(item.productId);
                                  }}
                                  className="px-2.5 py-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors cursor-pointer"
                                >
                                  View Item
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Shipping Destination */}
                        <div className="pt-2 text-[11px] text-stone-400 flex items-center justify-between border-t border-stone-800/80">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-stone-500" />
                            <span>Destination: {ord.customer.address}, {ord.customer.city} {ord.customer.postalCode}</span>
                          </span>
                          <span className="text-stone-500">Free Botanical Express</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROFILE & ADDRESSES */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6 max-w-2xl">
              {savedSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your beauty profile and shipping address have been updated successfully!</span>
                </div>
              )}

              <div className="space-y-4 bg-stone-950 p-5 rounded-2xl border border-stone-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>Personal Details & Skin Profile</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-stone-300">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-300">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-300">Contact Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-300">Skin Type Profile</label>
                    <select
                      value={skinType}
                      onChange={(e) => setSkinType(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Combination / Sensitive">Combination / Sensitive</option>
                      <option value="Dry / Dehydrated">Dry / Dehydrated</option>
                      <option value="Oily / Blemish-Prone">Oily / Blemish-Prone</option>
                      <option value="Normal / Balanced">Normal / Balanced</option>
                      <option value="Mature / Barrier Depleted">Mature / Barrier Depleted</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4 bg-stone-950 p-5 rounded-2xl border border-stone-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Default Delivery Address</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-stone-300">Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 742 Evergreen Terrace, Apt 4"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-stone-300">City / District</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Beverly Hills"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-stone-300">Postal / ZIP Code</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 90210"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                Save Changes
              </button>
            </form>
          )}

          {/* TAB 3: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              {wishlistedProducts.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-stone-950/40 rounded-2xl border border-stone-800/80 p-8">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-stone-800 text-rose-400 flex items-center justify-center">
                    <Heart className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-white">Your Wishlist is Empty</h3>
                  <p className="text-xs text-stone-400 max-w-sm mx-auto">
                    Tap the heart icon on any formulation to save items to your personal vanity.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    <span>Explore Formulations</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-between gap-3 hover:border-stone-700 transition-colors"
                    >
                      <div
                        className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                        onClick={() => {
                          onClose();
                          onViewProduct(p.id);
                        }}
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-14 h-14 rounded-xl object-cover bg-stone-900 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] uppercase font-bold text-stone-500 block">
                            {p.category}
                          </span>
                          <h4 className="text-xs font-semibold text-white truncate hover:text-amber-300 transition-colors">
                            {p.name}
                          </h4>
                          <span className="text-xs font-bold text-amber-400 mt-1 block">
                            ${p.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onAddToCart(p)}
                        className="p-2.5 rounded-xl bg-stone-800 hover:bg-amber-400 hover:text-stone-950 text-stone-200 transition-all cursor-pointer shrink-0 shadow-xs"
                        title="Add to Shopping Bag"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
