import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck, Truck, RotateCcw, Droplets } from 'lucide-react';

interface HeroBannerProps {
  totalProducts: number;
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  totalProducts,
  onExploreClick
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
              <span>Autumn Botanical Release & Clinical Formulary</span>
              <span className="text-stone-500">•</span>
              <span className="text-stone-400">{totalProducts} Active Formulations</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Active botanicals designed for transformative skin health.
            </h1>

            <p className="text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
              Experience cold-pressed wild plant lipid elixirs, bio-identical peptide complexes, and multi-molecular hyaluronic treatments. Formulated in Provence with zero synthetic fillers or harsh chemicals.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                id="hero-explore-collection-btn"
                onClick={onExploreClick}
                className="px-6 py-3 rounded-xl bg-white text-stone-950 font-semibold text-sm hover:bg-stone-100 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Explore Formulations</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              <div className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-800/80 text-stone-300 border border-stone-700 text-xs font-medium">
                <Droplets className="w-4 h-4 text-emerald-400" />
                <span>100% Bio-Active & Cruelty-Free</span>
              </div>
            </div>
          </div>

          {/* Right highlight showcase card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-stone-800/80 border border-stone-700/80 p-5 sm:p-6 overflow-hidden shadow-2xl backdrop-blur-sm">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 relative bg-stone-950">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
                  alt="Rosehip & Bakuchiol Renewal Serum"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase text-amber-400 border border-stone-700">
                  Featured Formulation
                </div>
                <div className="absolute bottom-3 right-3 bg-stone-950/90 backdrop-blur-md px-3 py-1 rounded-lg text-sm font-bold text-white">
                  $78.00
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
                <div>
                  <h4 className="text-white font-semibold text-sm">
                    Rosehip & Phyto-Bakuchiol Renewal Serum
                  </h4>
                  <p className="text-stone-400 text-xs mt-0.5">
                    2% Natural Bakuchiol • Cold-Pressed Seed Lipids
                  </p>
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
              <Truck className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="font-semibold text-stone-200">Express Tracked Delivery</p>
              <p className="text-[11px] text-stone-400">Complimentary on orders over $65</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-stone-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="font-semibold text-stone-200">Clinical Purity Standard</p>
              <p className="text-[11px] text-stone-400">100% Non-toxic, Leaping Bunny certified</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-stone-300">
              <RotateCcw className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <p className="font-semibold text-stone-200">30-Day Glow Guarantee</p>
              <p className="text-[11px] text-stone-400">Effortless returns & sample exchanges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
