import React, { useState } from 'react';
import { Gem, Award, ShieldCheck, Sliders, CheckCircle2, ChevronRight } from 'lucide-react';

export const GemstoneMatrix: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'cut' | 'color' | 'clarity' | 'carat'>('cut');
  const [caratWeight, setCaratWeight] = useState<number>(12.48);

  const cDetails = {
    cut: {
      title: 'Optical Triple Excellent Cut',
      french: 'La Taille Parfaite',
      score: 'Top 0.01% of Worldwide Yield',
      description: 'Precision cutting is the single most defining factor of diamond brilliance. Each facet in the Bizjewellery signature diamond is aligned to within 0.1° tolerance, directing 99.4% of incoming light back to the observer in a scintillating dispersion spectrum.',
      stats: [
        { label: 'Table Percentage', val: '57.0%' },
        { label: 'Crown Angle', val: '34.5°' },
        { label: 'Pavilion Depth', val: '43.0%' },
        { label: 'Light Return Index', val: '99.4%' }
      ],
      diagramLabel: '57 Mathematically Ideal Facets'
    },
    color: {
      title: 'D-Colorless Exceptional',
      french: 'La Pureté Chromatique',
      score: 'Grade D (Highest Possible GIA Rating)',
      description: 'Completely devoid of any nitrogen impurities or chemical hue. The Bizjewellery diamond acts as a pure prism, refracting crisp white brilliance with vivid rainbow spectral flashes under natural light and evening illumination alike.',
      stats: [
        { label: 'Color Grade', val: 'D Colorless' },
        { label: 'Type Classification', val: 'Type IIa Nitrogen-Free' },
        { label: 'Fluorescence', val: 'Inert / None' },
        { label: 'Transmission', val: '100% Optic Clarity' }
      ],
      diagramLabel: 'Type IIa Chemical Purity'
    },
    clarity: {
      title: 'Flawless / Internally Flawless',
      french: 'La Clarté Absolue',
      score: 'FL / VVS1 Microscope Certified',
      description: 'Under 10x and 40x optical magnification, zero internal inclusions, clouds, or pinpoints exist within the crystal matrix. Formed over 1.8 billion years at depths exceeding 150km beneath the Earth’s mantle.',
      stats: [
        { label: 'GIA Clarity Rating', val: 'Flawless (FL)' },
        { label: 'Internal Grain', val: 'Nil' },
        { label: 'Laser Inscription', val: 'BIZJEWELLERY-001-GIA' },
        { label: 'Formation Age', val: '1.8 Billion Years' }
      ],
      diagramLabel: 'Zero Inclusions at 40x Optics'
    },
    carat: {
      title: '12.48 Carat Signature Centerpiece',
      french: 'Le Poids en Carats',
      score: 'Custom Specimen Weight',
      description: 'Selected from a rare 34-carat rough gemstone discovered in the Karowe deposit. Over 60% of the rough was sacrificed during cutting to achieve peerless symmetry rather than maximum carat weight retention.',
      stats: [
        { label: 'Cut Carat Weight', val: `${caratWeight.toFixed(2)} Carats` },
        { label: 'Rough Stone Weight', val: '34.2 Carats' },
        { label: 'Dimension', val: '15.2 x 15.1 x 9.4 mm' },
        { label: 'Yield Efficiency', val: 'Symmetry Prioritized' }
      ],
      diagramLabel: 'Substantial Finger & Neckline Presence'
    }
  };

  const activeData = cDetails[activeTab];

  return (
    <section id="gemstones" className="py-24 sm:py-32 px-6 sm:px-12 bg-espresso-950 relative overflow-hidden border-t border-b border-gold-500/15">
      {/* Subtle Background Ruby/Gold ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-ruby-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-500/30 bg-espresso-900/60 backdrop-blur-md mb-4">
            <Gem className="w-3.5 h-3.5 text-ruby-400" />
            <span className="text-[10px] tracking-[0.35em] text-champagne-300 uppercase font-mono">
              GEMOLOGICAL RIGOR & DUAL CERTIFICATION
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-wide mb-4">
            The 4Cs Matrix of Excellence
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-champagne-200/80 max-w-xl mx-auto">
            Beyond conventional grading: where mineral rarity meets French lapidary artistry.
          </p>
        </div>

        {/* 4Cs Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {(['cut', 'color', 'clarity', 'carat'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-gold-500 to-champagne-300 text-espresso-950 font-bold shadow-gold-glow scale-105'
                  : 'bg-espresso-900/80 text-white/60 hover:text-white border border-white/10 hover:border-gold-500/30'
              }`}
            >
              <span>{tab}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Matrix Showcase Card */}
        <div className="bg-espresso-900/50 backdrop-blur-2xl rounded-3xl border border-gold-500/25 p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Gemstone Interactive Prism Visualization */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-espresso-950/80 rounded-2xl border border-gold-500/15 relative overflow-hidden text-center">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
              {/* Rotating Gold/Ruby Aura */}
              <div className="absolute inset-0 rounded-full border border-dashed border-gold-400/20 animate-spin" style={{ animationDuration: '30s' }} />
              <div className="absolute inset-4 rounded-full border border-ruby-500/30 animate-pulse" />
              
              {/* Center Diamond Graphic */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl rotate-45 border-2 border-champagne-300/80 bg-gradient-to-br from-white/20 via-gold-500/10 to-ruby-500/20 backdrop-blur-md flex items-center justify-center shadow-gold-glow">
                  <Gem className="w-12 h-12 -rotate-45 text-champagne-200" />
                </div>
                <span className="mt-4 text-[10px] font-mono tracking-widest text-gold-400 uppercase">
                  {activeData.diagramLabel}
                </span>
              </div>
            </div>

            {/* Interactive Carat Slider if Carat tab */}
            {activeTab === 'carat' && (
              <div className="w-full mt-6 pt-4 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-xs font-mono text-champagne-300">
                  <span>Interactive Carat Scale</span>
                  <span className="text-gold-400 font-bold">{caratWeight.toFixed(2)} CT</span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="20.0"
                  step="0.05"
                  value={caratWeight}
                  onChange={(e) => setCaratWeight(parseFloat(e.target.value))}
                  className="w-full accent-gold-500 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Right Column: Detailed Editorial & Technical Breakdown */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-gold-400 uppercase tracking-widest">
                  {activeData.french}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-xs font-mono text-champagne-300/80">
                  {activeData.score}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl text-white font-light tracking-wide mb-3">
                {activeData.title}
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
                {activeData.description}
              </p>
            </div>

            {/* Technical Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              {activeData.stats.map((stat, i) => (
                <div key={i} className="bg-espresso-950/70 p-3 rounded-xl border border-gold-500/10">
                  <span className="text-[10px] font-mono text-white/40 block mb-1 uppercase">
                    {stat.label}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-champagne-200">
                    {stat.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Certifications & Booking Trigger */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-white/60 font-mono">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>GIA Dossier & Bizjewellery Certification Included</span>
              </div>

              <button
                onClick={onOpenBooking}
                className="gold-glow-btn px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest text-champagne-100 flex items-center gap-2 group w-full sm:w-auto justify-center"
              >
                <span>Request Gem Dossier</span>
                <ChevronRight className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
