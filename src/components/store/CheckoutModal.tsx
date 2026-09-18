import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CreditCard, Check, Lock, Sparkles, UserCheck } from 'lucide-react';
import { CartItem, Order, OrderCustomer, CustomerUser } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  appliedPromo: string;
  promoDiscountRate: number;
  currentUser?: CustomerUser | null;
  onOrderComplete: (newOrder: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  appliedPromo,
  promoDiscountRate,
  currentUser,
  onOrderComplete
}) => {
  if (!isOpen || cart.length === 0) return null;

  const [customer, setCustomer] = useState<OrderCustomer>({
    fullName: currentUser?.name || 'Ayesha Khan',
    email: currentUser?.email || 'ayesha@ayeshabeauty.com',
    phone: currentUser?.phone || '+1 (555) 234-5678',
    address: currentUser?.defaultShippingAddress?.address || '742 Evergreen Terrace',
    city: currentUser?.defaultShippingAddress?.city || 'Beverly Hills',
    postalCode: currentUser?.defaultShippingAddress?.postalCode || '90210'
  });

  useEffect(() => {
    if (currentUser) {
      setCustomer({
        fullName: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone || '',
        address: currentUser.defaultShippingAddress?.address || '',
        city: currentUser.defaultShippingAddress?.city || '',
        postalCode: currentUser.defaultShippingAddress?.postalCode || ''
      });
    }
  }, [currentUser]);

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'digital'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('08/28');
  const [cvv, setCvv] = useState('389');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * promoDiscountRate;
  const shipping = subtotal >= 65 ? 0 : 8.5;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.email || !customer.address || !customer.city) {
      alert('Please fill in all shipping details');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = `AYE-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder: Order = {
        id: `ord-beauty-${Date.now()}`,
        orderNumber,
        userId: currentUser?.id,
        createdAt: new Date().toISOString(),
        items: cart.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.images[0]
        })),
        customer,
        subtotal,
        shipping,
        discount: discountAmount,
        total,
        status: 'processing',
        paymentMethod: paymentMethod === 'card' ? 'Credit Card (Visa)' : paymentMethod === 'digital' ? 'Apple Pay' : 'Cash on Delivery',
        notes: 'Complimentary botanical discovery samples requested.'
      };

      setIsProcessing(false);
      onOrderComplete(newOrder);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-stone-50 rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 via-amber-300 to-rose-300 text-stone-950 flex items-center justify-center font-bold text-sm">
              A
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                Express Checkout
              </span>
              <h2 className="text-xl font-bold tracking-tight text-stone-900">
                Delivery & Payment Details
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {currentUser && (
            <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-stone-800">
                <UserCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Ordering as <strong className="font-semibold">{currentUser.name}</strong> ({currentUser.email})
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                Syncs to Account
              </span>
            </div>
          )}

          {/* Section: Shipping Address */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 pb-1 border-b border-stone-200 flex items-center justify-between">
              <span>1. Recipient & Shipping Details</span>
              <span className="text-[11px] font-normal text-stone-500">Tracked Express (2-4 Days)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-stone-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-stone-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">City / Region</label>
                <input
                  type="text"
                  required
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Postal / Zip Code</label>
                <input
                  type="text"
                  required
                  value={customer.postalCode}
                  onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:border-stone-800"
                />
              </div>
            </div>
          </div>

          {/* Section: Payment Method */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 pb-1 border-b border-stone-200">
              2. Payment Selection
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('digital')}
                className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'digital'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Pay on Arrival</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">Expiration</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">CVC Code</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section: Order Summary */}
          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2 text-xs">
            <h4 className="font-bold text-stone-900 text-sm mb-2">Order Review</h4>
            <div className="flex justify-between text-stone-600">
              <span>Formulation Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-rose-700 font-medium">
                <span>Promotional Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Express Tracked Delivery</span>
              <span>{shipping === 0 ? <strong className="text-emerald-700">Complimentary</strong> : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-100">
              <span>Final Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              id="checkout-confirm-pay-btn"
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Authorize & Place Order • ${total.toFixed(2)}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Complimentary 30-Day Courtesy Return & Clean Guarantee</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
