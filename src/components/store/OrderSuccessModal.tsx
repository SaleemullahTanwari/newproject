import React from 'react';
import { CheckCircle2, PackageCheck, ArrowRight, ShieldCheck, Printer } from 'lucide-react';
import { Order } from '../../types';

interface OrderSuccessModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onViewInAdmin: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  isOpen,
  onClose,
  onViewInAdmin
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon Badge */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Order Confirmed!</h2>
          <p className="text-xs text-stone-500 max-w-xs mx-auto">
            Thank you for your purchase. We have received your order and dispatched confirmation to{' '}
            <strong className="text-stone-800">{order.customer.email}</strong>.
          </p>
        </div>

        {/* Receipt Details Card */}
        <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200 space-y-3.5 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-semibold">Order Reference</span>
              <span className="font-mono font-bold text-stone-900 text-sm">{order.orderNumber}</span>
            </div>
            <div className="text-right">
              <span className="text-stone-400 block text-[10px] uppercase font-semibold">Status</span>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 capitalize">
                {order.status}
              </span>
            </div>
          </div>

          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-semibold mb-1">Shipping To</span>
            <p className="font-semibold text-stone-800">{order.customer.fullName}</p>
            <p className="text-stone-600">{order.customer.address}, {order.customer.city} {order.customer.postalCode}</p>
          </div>

          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-semibold mb-1.5">Items</span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-stone-700">{item.quantity}x {item.name}</span>
                  <span className="font-semibold text-stone-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline font-bold text-sm text-stone-900">
            <span>Total Paid</span>
            <span className="text-base">${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Notice highlighting Admin visibility */}
        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <PackageCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Live Admin Synchronization:</span>
            <p className="text-[11px] text-amber-800 mt-0.5">
              This order and updated inventory counts have been instantly recorded in your admin database. You can inspect it in the Orders tab.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-1">
          <button
            id="order-success-view-admin-btn"
            onClick={onViewInAdmin}
            className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Inspect in Admin Orders</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            id="order-success-continue-shopping-btn"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold transition-colors cursor-pointer"
          >
            Back to Storefront
          </button>
        </div>
      </div>
    </div>
  );
};
