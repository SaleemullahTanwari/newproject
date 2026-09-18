import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Leaf, 
  FlaskConical, 
  Sun, 
  Award, 
  ArrowRight,
  Droplets
} from 'lucide-react';

interface AboutPageProps {
  onNavigateToShop: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToShop }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 space-y-16">
      {/* Hero Narrative */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Our Brand Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
          Where Artisanal Botany Meets Dermatological Chemistry
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Founded in Beverly Hills, Ayesha Beauty was created to redefine luxury skincare: prioritizing clean bioactive ingredients, biocompatible textures, and clinically proven clinical results without compromise.
        </p>
      </div>

      {/* Visual Image Banner with Quote */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-21/9 min-h-[280px]">
        <img
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1600"
          alt="Artisanal Skincare Laboratory and Botanicals"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent flex items-end p-6 sm:p-10">
          <div className="max-w-xl text-white">
            <p className="text-sm sm:text-lg font-serif italic leading-relaxed text-stone-200">
              "We formulate with intentional restraint. Every droplet must have a biological reason to touch your skin."
            </p>
            <p className="text-xs text-amber-300 font-bold uppercase tracking-widest mt-2">
              — Ayesha Khan, Founder & Lead Formulator
            </p>
          </div>
        </div>
      </div>

      {/* The 4 Clean Beauty Pillars */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-stone-900">Our Four Clean Commitments</h2>
          <p className="text-xs text-stone-500 mt-1">Non-negotiable formulation standards applied to every batch.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Clinical Bio-Actives</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Stabilized peptides, multi-molecular weight hyaluronic acids, and cold-pressed plant squalane proven to repair the cellular barrier.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900">100% Vegan & Pure</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Cruelty-free certified by Leaping Bunny. Formulated with zero animal derivatives, parabens, phthalates, synthetic colorants, or sulfates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Biocompatible Lipids</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Designed to mimic the skin's natural sebum, ensuring fast absorption, velvet finish, and long-lasting non-comedogenic hydration.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Miron Violet Glass</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Bottled in specialized UV-filtering glass jars and bottles that naturally preserve delicate botanical antioxidants without heavy artificial preservatives.
            </p>
          </div>
        </div>
      </div>

      {/* Sourcing Ingredients Showcase */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="max-w-xl">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
            Ethical Provenance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
            Ethically Sourced Around The Globe
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
            <h4 className="font-bold text-sm text-amber-300">Bulgarian Damask Rose</h4>
            <p className="text-stone-300 leading-relaxed">
              Harvested at dawn by local artisans in Kazanlak, capturing the highest concentration of soothing volatile essential oils and bioflavonoids.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
            <h4 className="font-bold text-sm text-amber-300">French Coastal Marine Kelp</h4>
            <p className="text-stone-300 leading-relaxed">
              Bio-fermented kelp extract from the cold waters of Brittany, rich in iodine, zinc, and minerals that defend against environmental stressors.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
            <h4 className="font-bold text-sm text-amber-300">Olive Squalane (Spain)</h4>
            <p className="text-stone-300 leading-relaxed">
              100% plant-derived squalane extracted from upcycled Spanish olives, delivering instantaneous lipid barrier replenishment.
            </p>
          </div>
        </div>
      </div>

      {/* Founder's Letter & Signature */}
      <div className="bg-amber-50/60 border border-amber-200/80 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-white">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
            alt="Ayesha Khan, Founder"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-extrabold text-stone-900">A Personal Note From Ayesha</h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            "I created Ayesha Beauty because I was tired of choosing between sterile clinical bottles that lacked sensorial pleasure and organic products that lacked proven results. Our formulations prove that high science and clean botany can coexist in perfect harmony. I invite you to experience the difference."
          </p>
          <div className="pt-2">
            <p className="text-sm font-serif italic text-stone-900 font-bold">Ayesha Khan</p>
            <p className="text-xs text-stone-500">Founder & CEO, Ayesha Beauty Beverly Hills</p>
          </div>
        </div>
      </div>

      {/* Direct CTA */}
      <div className="text-center py-6">
        <button
          onClick={onNavigateToShop}
          className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105 cursor-pointer"
        >
          <span>Explore Ayesha Beauty Formulations</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>
    </div>
  );
};
