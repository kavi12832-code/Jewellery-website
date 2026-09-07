import React, { useState } from 'react';
import { Rotate3d, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { JewelleryPiece } from '../types';

interface EarringsStudsSpotlightProps {
  onOpenBooking: () => void;
  onExplore360: () => void;
  onSelectPiece?: (piece: JewelleryPiece) => void;
}

export const EarringsStudsSpotlight: React.FC<EarringsStudsSpotlightProps> = ({
  onOpenBooking,
  onExplore360,
  onSelectPiece
}) => {
  const [activeTab, setActiveTab] = useState<'jhumkas' | 'studs' | 'chandbalis'>('jhumkas');

  const earringVariations = {
    jhumkas: {
      tag: '360° LIVE ROYAL MASTERPIECE',
      name: 'The Mayurakshi Royal Temple Jhumkas',
      price: '₹1,65,000',
      purity: '22K Antique Sovereign Gold (BIS 916)',
      gemstones: 'Natural Burma Rubies & Emerald Cabochons',
      weight: '42g Solid Handcrafted Casting',
      closure: 'South Indian Screw-Post & Security Grip',
      image: '/earrings-360/ezgif-frame-001.jpg',
      description: 'Hand-carved in 22K gold by our generational artisans featuring sculpted peacocks, tiered bell domes, and acoustic gold droplets with full 360° grandeur.'
    },
    studs: {
      tag: 'HAUTE BRILLIANCE DAILY LUXURY',
      name: 'Petal Diamond Solitaire Studs',
      price: '₹28,500',
      purity: '18K White & Rose Gold (BIS 750)',
      gemstones: '0.50 ctw VVS Round Brilliant Diamonds',
      weight: '8.5g Featherlight Gala Comfort',
      closure: 'Secure Double-Thread Screw Back',
      image: '/collection/eternite-diamond-bracelet.jpg',
      description: 'Engineered for everyday luxury and effortless comfort, arranged in an organic floral petal silhouette catching pure specular brilliance.'
    },
    chandbalis: {
      tag: 'HERITAGE POLKI CRESCENT',
      name: 'Nizam Royal Polki Chandbalis',
      price: '₹1,95,000',
      purity: '22K Sovereign Yellow Gold (BIS 916)',
      gemstones: 'Uncut Polki & Basra Seed Pearl Droplets',
      weight: '36g Hand-Articulated Filigree',
      closure: 'Traditional Push-Back Safety Clasp',
      image: '/marquee/byzantine-gold-cuffs.jpg',
      description: 'Crescent-moon silhouette adorned with foil-backed uncut Polki diamonds and dangling Basra seed pearl clusters.'
    }
  };

  const current = earringVariations[activeTab];

  return (
    <section id="earrings-studs" className="py-12 sm:py-16 px-6 sm:px-12 bg-gradient-to-b from-[#0A0706] via-[#140D09] to-[#0D0906] relative overflow-hidden border-t border-gold-500/20">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-500/30 bg-espresso-900/80 backdrop-blur-md mb-3.5 shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[10px] tracking-[0.35em] text-champagne-300 uppercase font-mono">
              HERITAGE EAR ADORNMENTS
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-wide mb-4">
            Earrings & Studs Collection
          </h2>

          <p className="font-cormorant italic text-lg sm:text-2xl text-champagne-200/90 max-w-2xl mx-auto leading-relaxed font-light">
            From majestic 360° royal temple jhumkas to daily diamond studs, each piece is handcrafted for timeless radiance.
          </p>
        </div>

        {/* Interactive Spotlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-espresso-950/70 border border-gold-500/25 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Subtle gold line accent on top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

          {/* Left: Product Imagery & 360 Trigger */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative group w-full aspect-[4/3] max-w-[480px] rounded-2xl overflow-hidden bg-[#070504] border border-gold-500/30 flex items-center justify-center p-6 shadow-2xl">
              {/* Subtle Radial Glow */}
              <div className="absolute inset-0 bg-radial from-gold-500/10 via-transparent to-transparent pointer-events-none" />

              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-700"
              />

              {/* 360 Badge Overlay */}
              <button
                onClick={onExplore360}
                className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-espresso-950/90 border border-gold-400/40 text-gold-300 text-xs font-mono shadow-gold-glow hover:bg-gold-500 hover:text-espresso-950 transition-all duration-300 group/btn"
              >
                <Rotate3d className="w-4 h-4 text-gold-400 group-hover/btn:text-espresso-950 group-hover/btn:rotate-180 transition-transform duration-500" />
                <span>Launch 360° Studio</span>
              </button>

              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-champagne-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>22K BIS Hallmarked</span>
              </div>
            </div>

            {/* Quick 360 CTA below image */}
            <div className="mt-3.5 flex items-center justify-between w-full max-w-[480px] px-2">
              <span className="text-xs font-mono text-white/50">Drag & explore in 360° studio</span>
              <button
                onClick={onExplore360}
                className="text-xs font-mono text-gold-400 hover:text-champagne-200 flex items-center gap-1 transition-colors group"
              >
                <span>Launch 360° Studio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Technical Spec Sheet & Reservation */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            {/* Style Selector Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3.5">
              {(['jhumkas', 'studs', 'chandbalis'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-gold-500 to-champagne-300 text-espresso-950 font-bold shadow-gold-glow scale-105'
                      : 'bg-espresso-900/60 border border-gold-500/20 text-white/70 hover:bg-[#FFF3DA] hover:text-[#1E120A] hover:border-[#D4AF37] hover:scale-105 shadow-md'
                  }`}
                >
                  {tab === 'jhumkas'
                    ? 'Temple Jhumkas'
                    : tab === 'studs'
                    ? 'Diamond Studs'
                    : 'Polki Chandbalis'}
                </button>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono tracking-[0.3em] text-gold-400 uppercase bg-gold-500/10 px-2.5 py-0.5 rounded border border-gold-500/20">
                  {current.tag}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl text-white font-light mb-3">
                {current.name}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Price & Assay Badges */}
            <div className="flex items-baseline gap-4 py-3 border-y border-gold-500/15">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-gold-300">
                {current.price}
              </span>
              <span className="text-xs font-mono text-white/50">
                Inclusive of all taxes & BIS Hallmarking
              </span>
            </div>

            {/* Technical Specification Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-mono">
              <div className="p-3 bg-espresso-900/60 rounded-xl border border-white/5">
                <span className="text-white/40 block text-[10px] uppercase mb-1">Metal Purity</span>
                <span className="text-white font-medium">{current.purity}</span>
              </div>
              <div className="p-3 bg-espresso-900/60 rounded-xl border border-white/5">
                <span className="text-white/40 block text-[10px] uppercase mb-1">Precious Stones</span>
                <span className="text-gold-300 font-medium">{current.gemstones}</span>
              </div>
              <div className="p-3 bg-espresso-900/60 rounded-xl border border-white/5">
                <span className="text-white/40 block text-[10px] uppercase mb-1">Approx Weight</span>
                <span className="text-white font-medium">{current.weight}</span>
              </div>
              <div className="p-3 bg-espresso-900/60 rounded-xl border border-white/5">
                <span className="text-white/40 block text-[10px] uppercase mb-1">Locking & Post</span>
                <span className="text-white font-medium">{current.closure}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onExplore360}
                className="gold-glow-btn flex-1 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] text-champagne-100 font-bold flex items-center justify-center gap-2"
              >
                <span>Spin 360° Perspective</span>
                <Rotate3d className="w-4 h-4 text-champagne-300" />
              </button>

              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.15em] text-white/80 hover:text-white border border-gold-500/30 hover:border-gold-400 bg-espresso-900/60 hover:bg-espresso-800 transition-all flex items-center justify-center gap-2"
              >
                <span>Reserve in Boutique</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
