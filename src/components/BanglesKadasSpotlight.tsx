import React, { useState } from 'react';
import { Rotate3d, Sparkles, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { JewelleryPiece } from '../types';

interface BanglesKadasSpotlightProps {
  onOpenBooking: () => void;
  onExplore360: () => void;
  onSelectPiece?: (piece: JewelleryPiece) => void;
}

export const BanglesKadasSpotlight: React.FC<BanglesKadasSpotlightProps> = ({
  onOpenBooking,
  onExplore360,
  onSelectPiece
}) => {
  const [activeTab, setActiveTab] = useState<'antique' | 'ruby' | 'diamond'>('antique');

  const bangleVariations = {
    antique: {
      tag: 'HERITAGE POLKI MASTERWORK',
      name: 'The Mayura Imperial Filigree Kadas',
      price: '₹3,45,000',
      purity: '22K Sovereign Gold (BIS 916)',
      gemstones: 'Uncut Polki & Champagne Topaz (3.80 ctw)',
      weight: '85g – 110g Solid Casting per pair',
      closure: 'Dual Screw-Pin Lock & Concealed Safety Hinge',
      image: '/bangles-360/ezgif-frame-001.jpg',
      description: 'Handcrafted in 22K gold by our master karigars with intricate floral filigree, micro-beaded relief, and radiant polki settings with 360° grandeur.'
    },
    ruby: {
      tag: 'ROYAL HEIRLOOM EDITION',
      name: 'Imperial Ruby & Diamond Gold Bangles',
      price: '₹2,60,000',
      purity: '22K Hallmarked Yellow Gold (BIS 916)',
      gemstones: 'Natural Pigeon Blood Rubies & Fine Diamonds',
      weight: '65g – 80g Hand-Fabricated Pair',
      closure: 'Traditional Screw-Pin Clasp with Safety Chain',
      image: '/collection/royal-ruby-bangles.jpg',
      description: 'Pair of solid 22K gold bangles encrusted with glowing natural rubies and chiseled beaded milgrain borders for royal celebratory occasions.'
    },
    diamond: {
      tag: 'HAUTE JOAILLERIE MODERN',
      name: 'Éternité Diamond Tennis Kada Bracelet',
      price: '₹1,95,000',
      purity: '18K Rose & White Gold (BIS 750)',
      gemstones: '5.50 ctw VVS Round Brilliant Diamonds',
      weight: '38g Lightweight High-Tensile Gold',
      closure: 'Precision Double Push-Button Safety Clasp',
      image: '/collection/eternite-diamond-bracelet.jpg',
      description: 'Modern luxury diamond kada-bracelet handcrafted with continuous channel-set certified brilliant-cut diamonds catching maximum specular fire.'
    }
  };

  const current = bangleVariations[activeTab];

  return (
    <section id="bangles-kadas" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0906] via-[#140D09] to-[#0A0706] relative overflow-hidden border-t border-gold-500/20">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full border border-gold-500/30 bg-espresso-900/80 backdrop-blur-md mb-2.5 shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] text-champagne-300 uppercase font-mono">
              HEIRLOOM ARM ADORNMENTS
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-light text-white tracking-wide mb-2 sm:mb-2.5">
            Bangles & Kadas Collection
          </h2>

          <p className="font-cormorant italic text-base sm:text-xl text-champagne-200/90 max-w-2xl mx-auto leading-relaxed font-light">
            Sculpted in 22K sovereign gold and precious stones, forged to resonate with heritage grandeur and modern grace.
          </p>
        </div>

        {/* Interactive Spotlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-espresso-950/70 border border-gold-500/25 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Subtle gold line accent on top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

          {/* Left: Product Imagery & 360 Trigger */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative group w-full aspect-[4/3] max-w-[480px] rounded-2xl overflow-hidden bg-[#070504] border border-gold-500/30 flex items-center justify-center p-4 sm:p-5 shadow-2xl">
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
                className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-espresso-950/90 backdrop-blur-md border border-gold-400/50 text-gold-300 text-[9px] sm:text-[10px] font-mono shadow-lg hover:bg-gold-500/20 hover:text-white transition-all group/btn"
              >
                <Rotate3d className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-400 animate-spin-slow" />
                <span>360° TURNTABLE</span>
              </button>

              {/* Purity Stamp */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 px-2.5 sm:px-3 py-1 rounded-full bg-espresso-950/90 backdrop-blur-md border border-gold-500/30 text-[9px] sm:text-[10px] font-mono text-champagne-300">
                BIS 916 HALLMARKED
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
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Specs, Style Switcher & Booking */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            {/* Style Selector Tabs */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 border-b border-white/10 pb-3.5">
              {(['antique', 'ruby', 'diamond'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-gold-500 to-champagne-300 text-espresso-950 font-bold shadow-gold-glow scale-105'
                      : 'bg-espresso-900/60 border border-gold-500/20 text-white/70 hover:bg-[#FFF3DA] hover:text-[#1E120A] hover:border-[#D4AF37] hover:scale-105 shadow-md'
                  }`}
                >
                  {tab === 'antique'
                    ? 'Antique Polki Kadas'
                    : tab === 'ruby'
                    ? 'Imperial Ruby Bangles'
                    : 'Diamond Kada Bracelet'}
                </button>
              ))}
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] text-gold-400 uppercase block mb-1">
                {current.tag}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mb-2">
                {current.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="font-mono text-xl sm:text-2xl font-bold text-gold-300">
                  {current.price}
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Pair of 2
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mt-2.5">
                {current.description}
              </p>
            </div>

            {/* Spec Matrix */}
            <div className="bg-espresso-900/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-gold-500/20 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/40">GOLD PURITY:</span>
                <span className="text-gold-300 font-semibold">{current.purity}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/40">GEMSTONE ACCENTS:</span>
                <span className="text-white">{current.gemstones}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/40">ESTIMATED WEIGHT:</span>
                <span className="text-champagne-200">{current.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">LOCK & SECURITY:</span>
                <span className="text-white/80">{current.closure}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto sm:flex-1 gold-glow-btn px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] text-champagne-100 font-bold flex items-center justify-center gap-2"
              >
                <span>Reserve In Showroom</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onExplore360}
                className="w-full sm:w-auto sm:flex-1 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] border border-gold-500/40 bg-espresso-900/80 text-champagne-200 hover:text-white hover:border-gold-300 transition-all flex items-center justify-center gap-2"
              >
                <Rotate3d className="w-3.5 h-3.5 text-gold-400" />
                <span>View 360° Studio</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
