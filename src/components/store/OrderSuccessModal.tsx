import React from 'react';
import { CheckCircle2, ShoppingBag, Sparkles, Printer, ArrowRight } from 'lucide-react';
import { Order } from '../../types';

interface OrderSuccessModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  isOpen,
  onClose
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-stone-50 rounded-2xl shadow-2xl overflow-hidden border border-stone-200 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon & Heading */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Order Confirmed
          </h2>
          <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
            Thank you for ordering with Studio Beauté. We have dispatched a receipt and tracking confirmation to{' '}
            <strong className="text-stone-900">{order.customer.email}</strong>.
          </p>
        </div>

        {/* Receipt Details Card */}
        <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-3.5 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase tracking-wider font-semibold">
                Order Reference
              </span>
              <span className="font-mono font-bold text-stone-900 text-sm">{order.orderNumber}</span>
            </div>
            <div className="text-right">
              <span className="text-stone-400 block text-[10px] uppercase tracking-wider font-semibold">
                Fulfillment Status
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 capitalize">
                {order.status}
              </span>
            </div>
          </div>

          <div>
            <span className="text-stone-400 block text-[10px] uppercase tracking-wider font-semibold mb-1">
              Recipient
            </span>
            <p className="font-semibold text-stone-900">{order.customer.fullName}</p>
            <p className="text-stone-600">{order.customer.address}, {order.customer.city} {order.customer.postalCode}</p>
          </div>

          <div>
            <span className="text-stone-400 block text-[10px] uppercase tracking-wider font-semibold mb-1.5">
              Purchased Formulations
            </span>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-stone-700 font-medium">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-semibold text-stone-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline font-bold text-sm text-stone-900">
            <span>Total Paid</span>
            <span className="text-lg font-bold text-stone-900">${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Complimentary Discovery Gift Banner */}
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-stone-800 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Complimentary Discovery Samples Included:</span>
            <p className="text-[11px] text-stone-600 mt-0.5">
              Our packaging atelier has included two deluxe vials of our Celestial Dew Crème and Chamomile Cleansing Balm with your package.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-1">
          <button
            id="order-success-continue-shopping-btn"
            onClick={onClose}
            className="w-full py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full py-2 px-4 rounded-xl text-stone-500 hover:text-stone-800 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Order Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
