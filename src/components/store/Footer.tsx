import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, Truck, Sparkles, Lock } from 'lucide-react';
import { CATEGORIES } from '../../data/initialProducts';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onNavigateToAdminLogin: () => void;
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onSelectCategory, 
  onNavigateToAdminLogin,
  onNavigate = () => {} 
}) => {
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 via-amber-300 to-rose-300 text-stone-950 flex items-center justify-center font-extrabold text-base">
                A
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                AYESHA <span className="text-amber-300 font-light">BEAUTY</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Formulated in small artisanal batches with pure botanical extracts and clinical biotechnology. Delivering transformative nourishment, clean formulas, and radiant skin health.
            </p>

            {/* Newsletter input */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-stone-200 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Subscribe for 15% off first order (Code: GLOW15)</span>
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800">
                  <Check className="w-4 h-4" />
                  <span>Welcome to Ayesha Beauty. Use code GLOW15 at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    id="footer-email-input"
                    type="email"
                    required
                    placeholder="Enter email address..."
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-3">
              Formulations
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {CATEGORIES.slice(1).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigate('/shop');
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-3">
              Care & Support
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('/orders')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Track Shipment & Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Returns & Satisfaction
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Clinical Actives Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Violet Glass Sustainability
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left text-amber-300 font-medium"
                >
                  Direct Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Staff Access / Admin link */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-3">
              Merchant Portal
            </h4>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Authorized staff management for inventory, active catalog items, and fulfillment.
            </p>
            <button
              id="footer-admin-link"
              onClick={onNavigateToAdminLogin}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold border border-stone-800 hover:border-stone-700 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Login (/admin-p/login)</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Ayesha Beauty. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Clean Formulations Guarantee</span>
            <button
              onClick={onNavigateToAdminLogin}
              className="text-stone-600 hover:text-stone-400 transition-colors cursor-pointer"
              title="Staff portal login"
            >
              Staff Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
