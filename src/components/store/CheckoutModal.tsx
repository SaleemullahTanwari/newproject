import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Truck, Check, Lock, DollarSign } from 'lucide-react';
import { CartItem, Order, OrderCustomer } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  appliedPromo: string;
  promoDiscountRate: number;
  onOrderComplete: (newOrder: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  appliedPromo,
  promoDiscountRate,
  onOrderComplete
}) => {
  if (!isOpen || cart.length === 0) return null;

  const [customer, setCustomer] = useState<OrderCustomer>({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 349-8821',
    address: '840 Pacific Avenue, Suite 300',
    city: 'San Francisco',
    postalCode: '94133'
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'digital'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * promoDiscountRate;
  const shipping = subtotal >= 150 ? 0 : 15;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.email || !customer.address || !customer.city) {
      alert('Please fill in all shipping details');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
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
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit Card (Visa ending in 4242)'
            : paymentMethod === 'digital'
            ? 'Digital Wallet (Instant Pay)'
            : 'Cash on Delivery (COD)'
      };

      setIsProcessing(false);
      onOrderComplete(newOrder);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900">Secure Order Checkout</h2>
              <p className="text-xs text-stone-500">Encrypted 256-bit order fulfillment</p>
            </div>
          </div>
          <button
            id="checkout-modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Shipping Address Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-stone-600" />
              <span>1. Shipping Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Full Name</label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Email Address</label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Phone Number</label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Postal / ZIP Code</label>
                <input
                  id="checkout-postal"
                  type="text"
                  required
                  value={customer.postalCode}
                  onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1">Street Address</label>
                <input
                  id="checkout-address"
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">City</label>
                <input
                  id="checkout-city"
                  type="text"
                  required
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Country</label>
                <input
                  type="text"
                  readOnly
                  value="United States / Global Express"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-100 text-stone-600 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-stone-600" />
              <span>2. Payment Option</span>
            </h3>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                    : 'border-stone-200 bg-stone-50 hover:bg-white text-stone-700'
                }`}
              >
                <CreditCard className="w-4 h-4 mb-2" />
                <div>
                  <p className="text-xs font-semibold">Credit Card</p>
                  <p className="text-[10px] opacity-75">Stripe 256-bit</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('digital')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'digital'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                    : 'border-stone-200 bg-stone-50 hover:bg-white text-stone-700'
                }`}
              >
                <Lock className="w-4 h-4 mb-2" />
                <div>
                  <p className="text-xs font-semibold">Instant Pay</p>
                  <p className="text-[10px] opacity-75">Apple / Google</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                    : 'border-stone-200 bg-stone-50 hover:bg-white text-stone-700'
                }`}
              >
                <DollarSign className="w-4 h-4 mb-2" />
                <div>
                  <p className="text-xs font-semibold">Cash On Delivery</p>
                  <p className="text-[10px] opacity-75">Pay upon arrival</p>
                </div>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5 animate-in fade-in">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Card Number (Simulated Demo)</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">Expiration</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">CVV Security Code</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Recap */}
          <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 space-y-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Order Items ({cart.length})</h4>
            <div className="max-h-32 overflow-y-auto space-y-2 pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-xs">
                  <span className="text-stone-700 line-clamp-1 flex-1 pr-2">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="font-semibold text-stone-900 shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-200/80 space-y-1 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount ({appliedPromo})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-stone-900 pt-1 border-t border-stone-200">
                <span>Total Due</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              id="confirm-place-order-btn"
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Authorizing Payment & Reserving Stock...</span>
              ) : (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Place Order • ${total.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
