import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Gem, MessageCircle, ArrowUp, Sun, Flame, Check } from 'lucide-react';

interface SacredCollectionProps {
  onOpenBooking: () => void;
}

export const AtelierCraftsmanship: React.FC<SacredCollectionProps> = ({ onOpenBooking }) => {
  const [selectedIdolTab, setSelectedIdolTab] = useState<'gold' | 'silver' | 'custom'>('gold');

  const idolSpecs = {
    gold: {
      metal: '22K Sovereign Gold (916 Hallmarked)',
      dimensions: 'Available from 2.5 inches to 12 inches',
      weightRange: '45g – 450g Solid Casting',
      finishing: 'Hand-chiseled antique matte & high-gloss highlight polish',
      significance: 'Consecrated for puja mandirs, housewarmings, and auspicious wedding gifts'
    },
    silver: {
      metal: '92.5 Sterling Silver (Antique Patina & Gloss)',
      dimensions: 'Available from 3 inches to 18 inches',
      weightRange: '150g – 1,200g Master Silverwork',
      finishing: 'Tarnish-resistant nano-ceramic protective coating',
      significance: 'Traditional sanctum deity vessels and festive deepams'
    },
    custom: {
      metal: 'Bespoke 22K Gold / Silver / Panchaloha Fusion',
      dimensions: 'Tailored to your temple or home mandir sanctum',
      weightRange: 'Custom weight according to agamic proportions',
      finishing: 'Hand-set certified rubies, emeralds, and diamond eyes',
      significance: 'Generational family heirlooms crafted by hereditary shilpis'
    }
  };

  return (
    <section id="sacred" className="relative overflow-hidden border-t border-gold-500/15">
      {/* 1. Main Sacred Collection · Divine Idols Banner */}
      <div className="py-16 sm:py-24 px-6 sm:px-12 bg-gradient-to-b from-[#180A0B] via-[#0E0607] to-[#0D0906] relative">
        {/* Ambient velvet glow */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Golden Idol Visual Stage */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative group w-full max-w-md rounded-3xl overflow-hidden border border-gold-500/30 bg-[#120708] shadow-2xl hover:border-gold-400/60 transition-all duration-700">
                {/* Visual */}
                <div className="relative aspect-[4/3] max-h-[280px] overflow-hidden flex items-center justify-center bg-radial from-[#320D12] to-[#0D0506]">
                  <img
                    src="/sacred/divine-ganesha-idol.jpg"
                    alt="Divine Idols Sacred Collection - Golden Ganesha"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter drop-shadow-2xl"
                  />
                  {/* Subtle specular gold shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0607] via-transparent to-transparent opacity-80" />
                </div>

                {/* Idol Badge Card */}
                <div className="p-5 sm:p-6 bg-[#16090B]/90 backdrop-blur-md border-t border-gold-500/20">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono text-gold-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/20">
                      22K FINE GOLD & SILVER
                    </span>
                    <span className="text-xs font-mono text-champagne-300">
                      BIS 916 Hallmarked
                    </span>
                  </div>
                  <h4 className="font-serif text-lg sm:text-xl text-white font-medium">
                    Shri Ganesha Mahaganapathi Idol
                  </h4>
                  <p className="text-xs text-white/60 font-light mt-1">
                    Sculpted with traditional shilpa shastra proportions and hand-carved ornamentation.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Editorial Copy & Sacred Specs */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-[11px] font-mono tracking-[0.4em] text-gold-400 uppercase block mb-3">
                  SACRED COLLECTION
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-wide mb-5">
                  DIVINE IDOLS
                </h2>
                <p className="font-cormorant italic text-xl sm:text-2xl text-champagne-200/90 leading-relaxed font-light">
                  Sacred idols crafted in fine gold and silver, designed to elevate every sacred space.
                </p>
                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mt-4 max-w-xl">
                  Bringing timeless divinity into your household mandir and sanctum. Each piece is cast in certified 22-karat sovereign gold or pure sterling silver, consecrated with intricate detailing by master sculptors.
                </p>
              </div>

              {/* Metal Specification Selector Tabs */}
              <div className="space-y-4">
                <div className="flex gap-2 border-b border-white/10 pb-3">
                  {(['gold', 'silver', 'custom'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedIdolTab(tab)}
                      className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                        selectedIdolTab === tab
                          ? 'bg-gold-500/20 border border-gold-400 text-gold-300 shadow-gold-glow font-bold'
                          : 'bg-white/5 border border-transparent text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {tab === 'gold' ? '22K Gold Idols' : tab === 'silver' ? 'Silver Idols' : 'Custom Commission'}
                    </button>
                  ))}
                </div>

                <div className="bg-espresso-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gold-500/20 space-y-3 text-xs font-mono">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/40">PURITY & METAL:</span>
                    <span className="text-gold-300 font-semibold">{idolSpecs[selectedIdolTab].metal}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/40">SANCTUM SIZES:</span>
                    <span className="text-white">{idolSpecs[selectedIdolTab].dimensions}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/40">WEIGHT CADENCE:</span>
                    <span className="text-champagne-200">{idolSpecs[selectedIdolTab].weightRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">SPECIALTY:</span>
                    <span className="text-white/80 max-w-xs text-right">{idolSpecs[selectedIdolTab].significance}</span>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="https://wa.me/919876543210?text=Hello%20Bizjewellery%2C%20I%20am%20interested%20in%20the%20Sacred%20Collection%20Divine%20Idols."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-full border border-gold-400/40 bg-gold-500/10 hover:bg-gold-500/20 text-xs font-mono uppercase tracking-[0.2em] text-champagne-200 hover:text-white transition-all flex items-center justify-center gap-2 shadow-gold-glow"
                >
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  <span>Inquire via WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
