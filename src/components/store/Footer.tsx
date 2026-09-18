import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { CATEGORIES } from '../../data/initialProducts';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenAdmin }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-stone-950 flex items-center justify-center font-bold text-base">
                S
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                STUDIO<span className="text-stone-400 font-light">ATELIER</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              An independent studio curating utilitarian artifacts, mechanical craftsmanship, and organic essentials designed to outlast modern obsolescence.
            </p>

            {/* Newsletter input */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-stone-200 mb-2">Subscribe to our seasonal dispatch</p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800">
                  <Check className="w-4 h-4" />
                  <span>You are subscribed to private atelier drops.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    id="footer-email-input"
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-stone-900 rounded-xl border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-stone-600"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-100 hover:bg-white text-stone-950 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-3">Collections</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {CATEGORIES.slice(1).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-3">Support & Care</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Track Shipment</li>
              <li>Returns & Exchanges</li>
              <li>Warranty & Repairs</li>
              <li>Care Guidelines</li>
              <li>Contact Concierge</li>
            </ul>
          </div>

          {/* Merchant / Admin shortcut */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-3">Store Admin</h4>
            <p className="text-xs text-stone-400 mb-3">
              Manage inventory, add new products, edit pricing, or monitor customer orders.
            </p>
            <button
              id="footer-admin-link"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-semibold border border-stone-700 transition-colors cursor-pointer"
            >
              <span>Access Admin Panel</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Studio Atelier Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
