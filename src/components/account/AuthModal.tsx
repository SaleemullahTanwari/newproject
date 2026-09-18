import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { CustomerUser } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: CustomerUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  
  // Sign In State
  const [signInEmail, setSignInEmail] = useState('ayesha@ayeshabeauty.com');
  const [signInPassword, setSignInPassword] = useState('beauty2026');

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regSkinType, setRegSkinType] = useState('Combination / Sensitive');

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!signInEmail.trim() || !signInPassword.trim()) {
      setErrorMessage('Please enter your email and password');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Construct or retrieve user
      const user: CustomerUser = {
        id: `usr-${Date.now()}`,
        name: signInEmail.includes('ayesha') ? 'Ayesha Khan' : signInEmail.split('@')[0],
        email: signInEmail.trim(),
        phone: '+1 (555) 342-8819',
        joinedDate: new Date().toISOString(),
        memberTier: 'Gold Glow',
        rewardPoints: 350,
        defaultShippingAddress: {
          address: '742 Evergreen Terrace',
          city: 'Beverly Hills',
          postalCode: '90210',
          phone: '+1 (555) 342-8819'
        },
        skinType: 'Combination / Sensitive'
      };

      onLoginSuccess(user);
      onClose();
    }, 450);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setErrorMessage('Please fill in your name, email, and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newUser: CustomerUser = {
        id: `usr-${Date.now()}`,
        name: regName.trim(),
        email: regEmail.trim(),
        phone: regPhone.trim() || undefined,
        joinedDate: new Date().toISOString(),
        memberTier: 'Member',
        rewardPoints: 100, // 100 bonus welcome points
        skinType: regSkinType,
        defaultShippingAddress: {
          address: '450 Sunset Boulevard',
          city: 'Los Angeles',
          postalCode: '90028',
          phone: regPhone.trim() || '+1 (555) 019-2834'
        }
      };

      onLoginSuccess(newUser);
      onClose();
    }, 450);
  };

  const handleQuickDemo = () => {
    const demoUser: CustomerUser = {
      id: 'usr-ayesha-demo',
      name: 'Ayesha Khan',
      email: 'ayesha@ayeshabeauty.com',
      phone: '+1 (555) 234-5678',
      joinedDate: '2025-09-14T10:00:00Z',
      memberTier: 'Gold Glow',
      rewardPoints: 450,
      defaultShippingAddress: {
        address: '742 Evergreen Terrace',
        city: 'Beverly Hills',
        postalCode: '90210',
        phone: '+1 (555) 234-5678'
      },
      skinType: 'Combination / Sensitive'
    };

    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden text-stone-100 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-11 h-11 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-300 to-rose-300 text-stone-950 flex items-center justify-center font-extrabold text-xl shadow-md">
            A
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              AYESHA <span className="text-amber-300 font-light">BEAUTY</span>
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Customer Sanctuary & Order Tracking Portal
            </p>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-800 mb-6">
          <button
            id="auth-tab-signin"
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 text-xs font-bold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-stone-800 text-white shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            id="auth-tab-register"
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 text-xs font-bold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-stone-800 text-white shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-950/50 border border-rose-800/80 rounded-xl text-xs text-rose-300">
            {errorMessage}
          </div>
        )}

        {/* Sign In Form */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  id="signin-email"
                  type="email"
                  required
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  id="signin-password"
                  type="password"
                  required
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              id="submit-signin-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* 1-Click Demo Login */}
            <div className="pt-2">
              <button
                id="demo-user-signin-btn"
                type="button"
                onClick={handleQuickDemo}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700/80 border border-stone-700 text-stone-200 text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>1-Click Test Sign-In (Ayesha Khan)</span>
              </button>
            </div>
          </form>
        )}

        {/* Register Form */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  id="register-name"
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ayesha Khan"
                  className="w-full pl-10 pr-4 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  id="register-email"
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="ayesha@example.com"
                  className="w-full pl-10 pr-4 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  id="register-password"
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-300">Skin Type Profile</label>
              <select
                value={regSkinType}
                onChange={(e) => setRegSkinType(e.target.value)}
                className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Combination / Sensitive">Combination / Sensitive</option>
                <option value="Dry / Dehydrated">Dry / Dehydrated</option>
                <option value="Oily / Blemish-Prone">Oily / Blemish-Prone</option>
                <option value="Normal / Balanced">Normal / Balanced</option>
                <option value="Mature / Barrier Depleted">Mature / Barrier Depleted</option>
              </select>
            </div>

            <button
              id="submit-register-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
            >
              {isLoading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Join Ayesha Beauty Sanctuary</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
