import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck, Truck, RotateCcw, PackagePlus } from 'lucide-react';

interface HeroBannerProps {
  totalProducts: number;
  onExploreClick: () => void;
  onOpenAdmin: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  totalProducts,
  onExploreClick,
  onOpenAdmin
}) => {
  return (
    <div className="relative bg-stone-900 text-stone-100 overflow-hidden border-b border-stone-800">
      {/* Subtle grid backdrop pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-800 border border-stone-700 text-xs font-medium text-stone-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Autumn Release & Living Edit</span>
              <span className="text-stone-500">•</span>
              <span className="text-stone-400">{totalProducts} Curated Artifacts</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Essential objects designed for a lifetime of use.
            </h1>

            <p className="text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
              Explore precision audio, tactile mechanical desk accessories, pure Belgian linen, and architectural homeware. Add your own custom merchandise instantly via the admin portal.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                id="hero-explore-collection-btn"
                onClick={onExploreClick}
                className="px-6 py-3 rounded-xl bg-white text-stone-950 font-semibold text-sm hover:bg-stone-100 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Explore Catalog</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                id="hero-admin-portal-btn"
                onClick={onOpenAdmin}
                className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white font-semibold text-sm border border-stone-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <PackagePlus className="w-4 h-4 text-amber-400" />
                <span>List Product in Admin</span>
              </button>
            </div>
          </div>

          {/* Right highlight showcase card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-stone-800/80 border border-stone-700/80 p-5 sm:p-6 overflow-hidden shadow-2xl backdrop-blur-sm">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 relative bg-stone-950">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                  alt="Aura ANC Headphones"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase text-amber-400 border border-stone-700">
                  Featured Product
                </div>
                <div className="absolute bottom-3 right-3 bg-stone-950/90 backdrop-blur-md px-3 py-1 rounded-lg text-sm font-bold text-white">
                  $289.00
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
                <div>
                  <h4 className="text-white font-semibold text-sm">Aura ANC Wireless Headphones</h4>
                  <p className="text-stone-400 text-xs mt-0.5">38-hr battery reserve • Beryllium drivers</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[11px] font-medium">
                    Ready to ship
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature badges row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 mt-10 border-t border-stone-800/80 text-stone-400 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-stone-300">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-stone-200">Express Global Transit</p>
              <p className="text-[11px] text-stone-400">Tracked shipping on every order</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-stone-300">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-stone-200">2-Year Atelier Guarantee</p>
              <p className="text-[11px] text-stone-400">Complete parts and repair coverage</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-stone-300">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-stone-200">Hassle-Free 30-Day Returns</p>
              <p className="text-[11px] text-stone-400">Pre-paid carbon-neutral return label</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
