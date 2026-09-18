import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Sparkles, 
  Package, 
  Award, 
  Gift, 
  CheckCircle2, 
  ShieldCheck, 
  Save, 
  LogOut, 
  ArrowRight,
  Droplets,
  Heart
} from 'lucide-react';
import { CustomerUser, Order, Product } from '../../types';

interface AccountPageProps {
  currentUser: CustomerUser | null;
  orders: Order[];
  allProducts?: Product[];
  products?: Product[];
  wishlistIds?: string[];
  onUpdateUser: (user: CustomerUser) => void;
  onLogout: () => void;
  onOpenAuthModal: () => void;
  onNavigateToOrders?: () => void;
  onViewProduct?: (productId: string) => void;
  onNavigate?: (path: string) => void;
  onAddToCart?: (product: Product) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  currentUser,
  orders,
  allProducts,
  products,
  onUpdateUser,
  onLogout,
  onOpenAuthModal,
  onNavigateToOrders,
  onViewProduct,
  onNavigate
}) => {
  const productList = allProducts || products || [];
  const handleNavigateOrders = () => {
    if (onNavigateToOrders) onNavigateToOrders();
    else if (onNavigate) onNavigate('/orders');
  };
  const handleViewProduct = (id: string) => {
    if (onViewProduct) onViewProduct(id);
    else if (onNavigate) onNavigate(`/product/${id}`);
  };
  // If not logged in, prompt sign in with luxury benefit breakdown
  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ayesha Beauty Private Member Portal
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
            Sign in to unlock personalized botanical skin consultations, track priority shipments, view formulation receipts, and collect Glow Rewards.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenAuthModal}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-105"
            >
              Sign In or Create Account
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-stone-800 text-left text-xs text-stone-300">
            <div className="flex items-start gap-2.5">
              <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold">Glow Points</strong>
                Earn 5 points for every $1 spent on artisanal skincare.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold">Custom Regimen</strong>
                Diagnostic skin analysis tailored to your bio-texture.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold">Fast Checkout</strong>
                Auto-fill saved delivery address on all future orders.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Profile Form States
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [skinType, setSkinType] = useState(currentUser.skinType || 'Combination / Sensitive');

  // Address States
  const [address, setAddress] = useState(currentUser.defaultShippingAddress?.address || '');
  const [city, setCity] = useState(currentUser.defaultShippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(currentUser.defaultShippingAddress?.postalCode || '');

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Recommended products matching the selected skin type
  const recommendedFormulations = productList.filter((p) => {
    if (skinType.includes('Sensitive') || skinType.includes('Combination')) {
      return p.category === 'Serums' || p.category === 'Oils';
    }
    return p.category === 'Creams' || p.category === 'Cleansers';
  }).slice(0, 3);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CustomerUser = {
      ...currentUser,
      name,
      email,
      phone,
      skinType,
      defaultShippingAddress: {
        address,
        city,
        postalCode,
        phone
      }
    };
    onUpdateUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header Banner with Member Tier */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-md mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-300 to-amber-200 text-stone-950 flex items-center justify-center text-2xl font-black shadow-md shrink-0">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-stone-950">
                  {currentUser.memberTier || 'Gold Glow'}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                {currentUser.email} • Member since {new Date(currentUser.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Reward Points Badge */}
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700/80 text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                Reward Balance
              </span>
              <span className="text-lg sm:text-xl font-black font-mono text-white">
                {currentUser.rewardPoints || 450} Glow Points
              </span>
            </div>

            <button
              onClick={onLogout}
              className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer text-xs"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Editable Personal Info & Address */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-600" />
                <span>Personal Profile & Contact</span>
              </h2>
              {savedSuccess && (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Changes Saved</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Skin Diagnostic Type</label>
                <select
                  value={skinType}
                  onChange={(e) => setSkinType(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-stone-900 font-medium"
                >
                  <option value="Combination / Sensitive">Combination / Sensitive</option>
                  <option value="Dry / Dehydrated">Dry / Dehydrated</option>
                  <option value="Normal / Radiant">Normal / Radiant</option>
                  <option value="Oily / Blemish-Prone">Oily / Blemish-Prone</option>
                  <option value="Mature / Anti-Aging">Mature / Anti-Aging</option>
                </select>
              </div>
            </div>

            {/* Saved Delivery Address */}
            <div className="pt-4 border-t border-stone-200 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>Default Shipping & Delivery Address</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Street Address</label>
                  <input
                    type="text"
                    placeholder="e.g. 742 Evergreen Terrace, Apt 4"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">City / State</label>
                    <input
                      type="text"
                      placeholder="e.g. Beverly Hills, CA"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Postal / ZIP Code</label>
                    <input
                      type="text"
                      placeholder="e.g. 90210"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-stone-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-amber-400" />
                <span>Save Profile Preferences</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Column: Orders Quick Access & Tailored Routine */}
        <div className="space-y-6">
          {/* Quick Orders Card */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-amber-600" />
                <span>Recent Orders</span>
              </h3>
              <button
                onClick={onNavigateToOrders}
                className="text-xs text-amber-700 hover:underline font-semibold flex items-center gap-1"
              >
                <span>View All ({orders.length})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="divide-y divide-stone-100 pt-1">
              {orders.slice(0, 2).map((ord) => (
                <div key={ord.id} className="py-2.5 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-stone-900">#{ord.orderNumber}</span>
                    <span className="text-[10px] text-stone-400 block">{new Date(ord.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-stone-800">${ord.total.toFixed(2)}</span>
                    <span className={`text-[10px] uppercase font-bold block ${
                      ord.status === 'delivered' ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {ord.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personalized Skin Recommendation Widget */}
          <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Tailored to Your Profile</span>
            </div>
            <p className="text-xs text-amber-900/80 mb-4 leading-relaxed">
              Based on your diagnostic selection (<strong>{skinType}</strong>), these biocompatible formulations are recommended:
            </p>

            <div className="space-y-3">
              {recommendedFormulations.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => onViewProduct(rec.id)}
                  className="flex items-center gap-3 p-2 bg-white rounded-xl border border-amber-200/60 hover:border-amber-300 transition-colors cursor-pointer"
                >
                  <img src={rec.image} alt={rec.name} className="w-10 h-10 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">{rec.name}</h4>
                    <p className="text-[10px] text-stone-500 font-mono">${rec.price.toFixed(2)}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
