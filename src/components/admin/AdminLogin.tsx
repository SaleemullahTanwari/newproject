import React, { useState } from 'react';
import { Lock, Sparkles, Eye, EyeOff, ShieldCheck, ArrowRight, Store, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToStore }) => {
  const [email, setEmail] = useState('admin@lumierebeaute.com');
  const [password, setPassword] = useState('beautyadmin2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your administrator email and password.');
      return;
    }

    setIsLoading(true);

    // Simulate secure verification
    setTimeout(() => {
      setIsLoading(false);
      // Allow the default credentials or any validly formatted test input
      if (
        (email.toLowerCase() === 'admin@lumierebeaute.com' && password === 'beautyadmin2026') ||
        (email.includes('@') && password.length >= 6)
      ) {
        onLoginSuccess();
      } else {
        setErrorMessage('Invalid credentials. Please check your credentials or use the 1-Click Demo Sign-In.');
      }
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setEmail('admin@lumierebeaute.com');
    setPassword('beautyadmin2026');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#1C1917] text-stone-100 flex flex-col justify-between selection:bg-rose-900 selection:text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-rose-900/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-amber-900/20 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="px-6 py-6 border-b border-stone-800/80 backdrop-blur-md relative z-10 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-200 to-rose-200 text-stone-950 flex items-center justify-center font-serif font-bold text-xl shadow-md">
            L
          </div>
          <div>
            <span className="font-serif tracking-widest text-lg text-white block uppercase">
              LUMIÈRE BEAUTÉ
            </span>
            <span className="text-[10px] tracking-wider text-rose-200/60 uppercase block">
              Atelier Management Portal
            </span>
          </div>
        </div>

        <button
          onClick={onBackToStore}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-stone-300 hover:text-white bg-stone-900/80 hover:bg-stone-800 border border-stone-800 transition-colors cursor-pointer"
        >
          <Store className="w-3.5 h-3.5 text-rose-300" />
          <span>Return to Storefront</span>
        </button>
      </header>

      {/* Center Auth Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="w-full max-w-md bg-stone-900/90 rounded-3xl border border-stone-800 p-7 sm:p-9 shadow-2xl backdrop-blur-xl">
          {/* Card Title */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-stone-800 border border-stone-700/80 flex items-center justify-center text-rose-300 shadow-inner">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-white tracking-tight">
              Merchant Sign In
            </h1>
            <p className="text-xs text-stone-400 mt-2 max-w-xs mx-auto leading-relaxed">
              Authenticate to manage product listings, pricing, customer orders, and boutique analytics.
            </p>
          </div>

          {/* Quick Demo Credentials Callout */}
          <div className="mb-6 p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700/60 flex items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-semibold text-rose-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Demo Admin Access</span>
              </p>
              <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                admin@lumierebeaute.com
              </p>
            </div>
            <button
              type="button"
              id="admin-quick-demo-fill-btn"
              onClick={handleQuickDemoLogin}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-400 to-amber-300 hover:from-rose-300 hover:to-amber-200 text-stone-950 font-bold text-xs tracking-tight transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              1-Click Sign In
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                Admin Email Address
              </label>
              <input
                id="admin-login-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@lumierebeaute.com"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm focus:outline-none focus:border-rose-400/80 transition-colors placeholder-stone-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                  Master Password
                </label>
                <span className="text-[11px] text-stone-500">Default: beautyadmin2026</span>
              </div>
              <div className="relative">
                <input
                  id="admin-login-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm focus:outline-none focus:border-rose-400/80 transition-colors placeholder-stone-600 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-700 bg-stone-950 text-rose-500 focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-xs text-stone-400">Remember session</span>
              </label>
              <span className="text-[11px] text-stone-500">256-Bit SSL</span>
            </div>

            <button
              id="admin-submit-login-btn"
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-rose-200 via-rose-300 to-amber-200 hover:from-white hover:to-rose-100 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Discreet Footer Info */}
          <div className="mt-8 pt-6 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Private Merchant Route</span>
            </div>
            <span>v2.4 Beauty Suite</span>
          </div>
        </div>
      </main>

      {/* Bottom Legal Notice */}
      <footer className="py-4 text-center text-xs text-stone-600 relative z-10 border-t border-stone-900">
        <p>© 2026 Lumière Beauté Inc. Authorized retail staff and store owners only.</p>
      </footer>
    </div>
  );
};
