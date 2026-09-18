import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowDown, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Droplets, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  ArrowRight,
  Check,
  Eye
} from 'lucide-react';

interface HeroSlide {
  id: string;
  productId: string;
  badge: string;
  title: string;
  highlightText: string;
  description: string;
  bgImage: string;
  accentColor: 'amber' | 'emerald' | 'sky' | 'rose';
  cardImage: string;
  cardTitle: string;
  cardSubtitle: string;
  cardPrice: string;
  cardOriginalPrice: string;
  cardBadge: string;
  cardActives: string[];
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    productId: 'lumiere-01',
    badge: 'Clinical Formulary • Pure Cold-Pressed',
    title: 'Active botanicals engineered for transformative cellular renewal.',
    highlightText: 'transformative cellular renewal',
    description: 'Cold-pressed wild rosehip lipids, 2% bio-identical bakuchiol, and CoQ10 antioxidant synergy formulated in Provence to restore elasticity and natural luminance.',
    bgImage: 'https://images.unsplash.com/photo-1608248597359-0a69a03fc6eb?auto=format&fit=crop&w=2000&q=85',
    accentColor: 'amber',
    cardImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    cardTitle: 'Rosehip & Phyto-Bakuchiol Renewal Serum',
    cardSubtitle: '2% Natural Bakuchiol • Cold-Pressed Seed Lipids',
    cardPrice: '$78.00',
    cardOriginalPrice: '$92.00',
    cardBadge: 'Flagship Serum',
    cardActives: ['2% Bakuchiol', 'Cold-Pressed Rosehip', 'CoQ10']
  },
  {
    id: 'slide-2',
    productId: 'lumiere-02',
    badge: 'Lipid Architecture • 72-Hour Moisture',
    title: 'Deep cellular hydration cushion fortified with snow mushroom.',
    highlightText: '72-Hour Moisture Cushion',
    description: 'A cloud-soft moisturizing emulsion engineered with 5 molecular weights of hyaluronic acid, Tremella mushroom, and 3 skin-identical plant ceramides to rebuild compromised barriers.',
    bgImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=2000&q=85',
    accentColor: 'emerald',
    cardImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    cardTitle: 'Celestial Dew Multi-Hyaluronic Crème',
    cardSubtitle: '5D Hyaluronic Multi-Complex • Ceramide NP/AP',
    cardPrice: '$64.00',
    cardOriginalPrice: '$75.00',
    cardBadge: 'Award Winner',
    cardActives: ['5D Hyaluronic Acid', 'Tremella Mushroom', 'Ceramides NP/AP']
  },
  {
    id: 'slide-3',
    productId: 'lumiere-03',
    badge: 'Nocturnal Double Cleanse • Melts Impurities',
    title: 'Silky oil-to-milk balm that melts stubborn SPF and pollutants.',
    highlightText: 'melts stubborn SPF and pollutants',
    description: 'Transformative melting balm that dissolves waterproof cosmetics without stripping the delicate acid mantle. Infused with pure German blue chamomile, virgin marula, and bisabolol.',
    bgImage: 'https://images.unsplash.com/photo-1512290900672-1f02e1c9e8aa?auto=format&fit=crop&w=2000&q=85',
    accentColor: 'sky',
    cardImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    cardTitle: 'Velvet Chamomile Cleansing Balm',
    cardSubtitle: 'Blue Chamomile • Virgin Marula Kernel Oil',
    cardPrice: '$46.00',
    cardOriginalPrice: '$54.00',
    cardBadge: 'Best Seller',
    cardActives: ['German Chamomile', 'Virgin Marula', 'Bisabolol']
  },
  {
    id: 'slide-4',
    productId: 'lumiere-04',
    badge: 'Japanese Tsubaki • Glass Skin Luminosity',
    title: 'Ultralight botanical dry nectar for an ethereal, velvet glow.',
    highlightText: 'ethereal, velvet glow',
    description: 'A precious elixir of Japanese Tsubaki camellia seed oil, wild Amazonian passionfruit nectar, and squalane. Delivers instant radiant glow with zero greasy residue.',
    bgImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2000&q=85',
    accentColor: 'amber',
    cardImage: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80',
    cardTitle: 'Golden Camellia Illuminating Nectar',
    cardSubtitle: 'Japanese Camellia • Passionfruit • Vitamin E',
    cardPrice: '$72.00',
    cardOriginalPrice: '$85.00',
    cardBadge: 'New Release',
    cardActives: ['Camellia Japonica', 'Maracuja Seed Oil', 'Vitamin E']
  }
];

const AUTO_SLIDE_INTERVAL = 6000; // 6 seconds per slide

interface HeroBannerProps {
  totalProducts: number;
  onExploreClick: () => void;
  onSelectProduct?: (productId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  totalProducts,
  onExploreClick,
  onSelectProduct
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  // Swipe handling
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const currentSlide = HERO_SLIDES[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    setProgress(0);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
  }, []);

  const handleSelectSlide = (idx: number) => {
    if (idx === currentIndex) return;
    setCurrentIndex(idx);
    setProgress(0);
  };

  // Auto-slide ticker with smooth progress animation
  useEffect(() => {
    if (!isPlaying || isHovered) {
      return;
    }

    const intervalStep = 50; // update every 50ms for smooth progress bar
    const progressIncrement = (intervalStep / AUTO_SLIDE_INTERVAL) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + progressIncrement;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <div
      id="store-hero-carousel"
      className="relative bg-stone-950 text-stone-100 overflow-hidden border-b border-stone-800 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* BACKGROUND IMAGES CAROUSEL WITH DUAL GRADIENTS */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentSlide.bgImage}
              alt={currentSlide.title}
              className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.1]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Sophisticated Dark Gradient Overlays for optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/60 pointer-events-none" />
        
        {/* Subtle geometric grid backdrop */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      {/* FOREGROUND HERO CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Animated Text Copy */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentSlide.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="space-y-6"
              >
                {/* Active Release Badge */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-stone-700/80 text-xs font-medium text-stone-300 backdrop-blur-md shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{currentSlide.badge}</span>
                    <span className="text-stone-600">•</span>
                    <span className="text-stone-400 font-mono text-[11px]">{totalProducts} Formulations</span>
                  </div>

                  {currentSlide.accentColor === 'amber' && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      Cold-Pressed
                    </span>
                  )}
                  {currentSlide.accentColor === 'emerald' && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      Bio-Identical
                    </span>
                  )}
                  {currentSlide.accentColor === 'sky' && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                      Chamazulene
                    </span>
                  )}
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                  {currentSlide.title}
                </h1>

                {/* Description Body */}
                <p className="text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
                  {currentSlide.description}
                </p>

                {/* Call-to-action buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                  <button
                    id="hero-explore-collection-btn"
                    onClick={onExploreClick}
                    className="px-6 py-3 rounded-xl bg-white text-stone-950 font-semibold text-sm hover:bg-stone-100 transition-all flex items-center gap-2 shadow-sm cursor-pointer active:scale-98"
                  >
                    <span>Explore Formulations</span>
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  <button
                    id="hero-inspect-formulation-btn"
                    onClick={() => {
                      if (onSelectProduct) {
                        onSelectProduct(currentSlide.productId);
                      } else {
                        onExploreClick();
                      }
                    }}
                    className="px-5 py-3 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700/90 text-sm font-medium transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer active:scale-98"
                  >
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>Inspect Formulation</span>
                  </button>

                  <div className="inline-flex items-center gap-2 px-3.5 py-3 rounded-xl bg-stone-900/50 text-stone-400 border border-stone-800 text-xs font-medium">
                    <Droplets className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="hidden sm:inline">Clean Clinical Purity</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Interactive Featured Product Card */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${currentSlide.id}`}
                initial={{ opacity: 0, scale: 0.95, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -14 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onClick={() => onSelectProduct?.(currentSlide.productId)}
                className="group relative rounded-2xl bg-stone-900/85 border border-stone-700/80 p-5 sm:p-6 overflow-hidden shadow-2xl backdrop-blur-md cursor-pointer hover:border-stone-500/80 transition-all"
              >
                {/* Product Image Frame */}
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 relative bg-stone-950">
                  <img
                    src={currentSlide.cardImage}
                    alt={currentSlide.cardTitle}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-stone-950/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase text-amber-400 border border-stone-700 shadow-sm">
                    {currentSlide.cardBadge}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 bg-stone-950/90 backdrop-blur-md px-3 py-1 rounded-lg text-sm font-bold text-white flex items-center gap-1.5 border border-stone-800 shadow-sm">
                    <span>{currentSlide.cardPrice}</span>
                    <span className="text-stone-500 line-through text-xs font-normal">
                      {currentSlide.cardOriginalPrice}
                    </span>
                  </div>
                </div>

                {/* Product Metadata */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-white font-semibold text-base group-hover:text-amber-300 transition-colors line-clamp-1">
                      {currentSlide.cardTitle}
                    </h4>
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[11px] font-medium shrink-0">
                      In Stock
                    </span>
                  </div>

                  <p className="text-stone-400 text-xs line-clamp-1 font-normal">
                    {currentSlide.cardSubtitle}
                  </p>

                  {/* Active Ingredients Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentSlide.cardActives.map((act, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-800/90 border border-stone-700 text-[10px] text-stone-300 font-mono"
                      >
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                        {act}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-stone-400 border-t border-stone-800/80 mt-2">
                    <span className="text-[11px] text-stone-400">Click card to inspect formulation specs</span>
                    <span className="text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold text-[11px]">
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CAROUSEL CONTROLS BAR: Auto-slide Progress, Pill Indicators & Navigation */}
        <div className="mt-8 pt-6 border-t border-stone-800/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left: Slide Selector Pills with Integrated Progress Indicator */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  id={`carousel-pill-${idx}`}
                  onClick={() => handleSelectSlide(idx)}
                  className={`group relative px-3 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer overflow-hidden border ${
                    isActive
                      ? 'bg-stone-800/90 text-white border-stone-700 shadow-md'
                      : 'bg-stone-900/40 text-stone-400 hover:text-stone-200 border-stone-800 hover:bg-stone-800/50'
                  }`}
                  title={`Switch to slide ${idx + 1}`}
                >
                  {/* Real-time progress fill for active slide */}
                  {isActive && isPlaying && !isHovered && (
                    <motion.div
                      className="absolute bottom-0 left-0 top-0 bg-amber-400/15 pointer-events-none"
                      style={{ width: `${progress}%` }}
                      transition={{ ease: 'linear' }}
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-2">
                    <span className={`font-mono text-[10px] ${isActive ? 'text-amber-400' : 'text-stone-500'}`}>
                      0{idx + 1}
                    </span>
                    <span className="hidden md:inline text-xs font-medium">
                      {slide.cardTitle.split(' ')[0]} {slide.cardTitle.split(' ')[1]}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse hidden sm:inline-block" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Slide Counter, Pause/Play and Arrow Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Slide Index Counter */}
            <div className="text-xs font-mono text-stone-400 flex items-center gap-1.5 bg-stone-900/60 px-2.5 py-1.5 rounded-lg border border-stone-800">
              <span className="text-white font-bold">0{currentIndex + 1}</span>
              <span className="text-stone-600">/</span>
              <span className="text-stone-400">0{HERO_SLIDES.length}</span>
            </div>

            {/* Play / Pause Toggle Button */}
            <button
              id="carousel-toggle-play-btn"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="p-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-colors cursor-pointer"
              title={isPlaying ? 'Pause auto-slide' : 'Resume auto-slide (6s)'}
              aria-label={isPlaying ? 'Pause auto-slide' : 'Resume auto-slide'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-amber-400" />
              ) : (
                <Play className="w-4 h-4 text-emerald-400" />
              )}
            </button>

            {/* Arrow Navigation Controls */}
            <div className="flex items-center gap-1.5">
              <button
                id="carousel-prev-btn"
                onClick={handlePrev}
                className="p-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-all cursor-pointer active:scale-95"
                title="Previous slide"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="carousel-next-btn"
                onClick={handleNext}
                className="p-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-all cursor-pointer active:scale-95"
                title="Next slide"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* FEATURE BADGES ROW (Preserved exact design and dark styling) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-stone-800/80 text-stone-400 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-stone-300 shrink-0">
              <Truck className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="font-semibold text-stone-200">Express Tracked Delivery</p>
              <p className="text-[11px] text-stone-400">Complimentary on boutique orders over $65</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-stone-300 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="font-semibold text-stone-200">Clinical Purity Standard</p>
              <p className="text-[11px] text-stone-400">100% Non-toxic, Leaping Bunny certified</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-stone-300 shrink-0">
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
