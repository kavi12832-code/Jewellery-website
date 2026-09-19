import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface StoryBeatsOverlayProps {
  progress: number; // 0 to 1
  onOpenBooking: () => void;
  onOpenShowcase: () => void;
  onSelectChapter?: (progress: number) => void;
}

export const StoryBeatsOverlay = React.memo<StoryBeatsOverlayProps>(({
  progress,
  onOpenBooking,
  onOpenShowcase
}) => {
  const getBeatOpacity = (start: number, end: number) => {
    const fadeInWindow = 0.04;
    const fadeOutWindow = 0.04;

    if (progress < start - 0.02 || progress > end + 0.02) return 0;

    if (progress >= start && progress <= end) {
      if (start > 0 && progress < start + fadeInWindow) {
        return (progress - start) / fadeInWindow;
      }
      if (progress > end - fadeOutWindow && end < 1.0) {
        return (end - progress) / fadeOutWindow;
      }
      return 1;
    }
    return 0;
  };

  const getBeatYOffset = (start: number, end: number) => {
    if (progress < start) return 25;
    if (progress > end) return -25;
    return 0;
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-center p-6 sm:p-12 md:p-16 max-w-7xl mx-auto">
      <div className="relative flex items-center justify-center my-auto w-full">
        {/* BEAT 1: HERO / INTRO (0 - 15%) */}
        {(() => {
          const opacity = getBeatOpacity(0, 0.15);
          const y = getBeatYOffset(0, 0.15);
          if (opacity <= 0) return null;
          return (
            <div
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                transition: 'opacity 0.25s ease-out, transform 0.25s ease-out'
              }}
              className="text-center max-w-3xl mx-auto flex flex-col items-center pointer-events-auto"
            >
              <span className="text-[11px] tracking-[0.4em] text-gold-400 uppercase font-mono mb-4">
                NEW COLLECTION 2026
              </span>

              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.06em] leading-[1.08] text-white drop-shadow-2xl mb-4">
                Timeless Elegance, Crafted in Gold
              </h1>

              <p className="font-cormorant italic text-2xl sm:text-3xl text-champagne-200/90 font-normal mb-6 tracking-wide">
                Each piece hand-finished by our artisans.
              </p>

              <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed mb-8 font-light">
                Using gold and gemstones sourced with the same care as generations before. For over three decades, Bizjewellery has been synonymous with fine craftsmanship and timeless design.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                <button
                  onClick={onOpenShowcase}
                  className="gold-glow-btn px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] font-semibold text-champagne-100 flex items-center justify-center gap-2"
                >
                  <span>Explore Collection</span>
                  <ArrowUpRight className="w-4 h-4 text-gold-400" />
                </button>

                <button
                  onClick={onOpenBooking}
                  className="px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] font-medium text-white/85 border border-white/20 hover:border-gold-400 hover:text-champagne-200 bg-white/5 backdrop-blur-md transition-all duration-300"
                >
                  Book a Private Viewing
                </button>
              </div>
            </div>
          );
        })()}

        {/* BEAT 2: CRAFTSMANSHIP REVEAL (15 - 40%) */}
        {(() => {
          const opacity = getBeatOpacity(0.15, 0.40);
          const y = getBeatYOffset(0.15, 0.40);
          if (opacity <= 0) return null;
          return (
            <div
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                transition: 'opacity 0.25s ease-out, transform 0.25s ease-out'
              }}
              className="w-full flex justify-start pointer-events-auto"
            >
              <div className="max-w-md text-left bg-espresso-950/70 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-gold-500/20 shadow-2xl shadow-black/80 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-16 h-[2px] bg-gradient-to-r from-gold-500 to-transparent" />
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-wide leading-tight mb-2.5">
                  The Art Behind Every Piece
                </h2>

                <p className="text-xs sm:text-sm text-champagne-200/80 mb-2 font-light leading-relaxed">
                  Every Bizjewellery creation begins as a sketch and ends as a story.
                </p>

                <p className="text-xs text-white/60 font-light leading-relaxed">
                  Our artisans spend upward of forty hours on a single piece — casting, setting, and polishing by hand. Passed down through generations of goldsmiths.
                </p>
              </div>
            </div>
          );
        })()}

        {/* BEAT 3: THE GEMSTONE (40 - 65%) */}
        {(() => {
          const opacity = getBeatOpacity(0.40, 0.65);
          const y = getBeatYOffset(0.40, 0.65);
          if (opacity <= 0) return null;
          return (
            <div
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                transition: 'opacity 0.25s ease-out, transform 0.25s ease-out'
              }}
              className="w-full flex justify-end pointer-events-auto"
            >
              <div className="max-w-md text-left bg-espresso-950/70 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-gold-500/20 shadow-2xl shadow-black/80 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-[2px] bg-gradient-to-l from-gold-500 to-transparent" />
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-wide leading-tight mb-2.5">
                  Certified Gemstones
                </h2>

                <div className="space-y-1.5 text-xs text-white/75 font-light leading-relaxed">
                  <p className="flex items-start gap-2">
                    <span className="text-gold-400 font-bold">•</span>
                    <span>Each gemstone individually selected for clarity and fire.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-gold-400 font-bold">•</span>
                    <span>Set with precision taught over generations.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-gold-400 font-bold">•</span>
                    <span>100% certified authentic natural stones.</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* BEAT 4: LIGHT & FINISH (65 - 85%) */}
        {(() => {
          const opacity = getBeatOpacity(0.65, 0.85);
          const y = getBeatYOffset(0.65, 0.85);
          if (opacity <= 0) return null;
          return (
            <div
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                transition: 'opacity 0.25s ease-out, transform 0.25s ease-out'
              }}
              className="w-full flex justify-start pointer-events-auto"
            >
              <div className="max-w-md text-left bg-espresso-950/70 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-gold-500/20 shadow-2xl shadow-black/80 relative">
                <div className="absolute top-0 left-0 w-16 h-[2px] bg-gradient-to-r from-gold-500 to-transparent" />
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-wide leading-tight mb-2.5">
                  Polished for Every Light
                </h2>

                <p className="text-xs sm:text-sm text-champagne-200/80 mb-2 font-light leading-relaxed">
                  A final hand-polish brings out a warmth no machine can replicate.
                </p>

                <p className="text-xs text-white/60 font-light leading-relaxed">
                  Jewellery made to be worn for generations. Every surface reflects light with buttery specular brilliance.
                </p>
              </div>
            </div>
          );
        })()}

        {/* BEAT 5: REASSEMBLY & BRIDAL CTA (85 - 100%) */}
        {(() => {
          const opacity = getBeatOpacity(0.85, 1.0);
          const y = getBeatYOffset(0.85, 1.0);
          if (opacity <= 0) return null;
          return (
            <div
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                transition: 'opacity 0.25s ease-out, transform 0.25s ease-out'
              }}
              className="text-center max-w-3xl mx-auto flex flex-col items-center pointer-events-auto bg-espresso-950/70 backdrop-blur-2xl p-8 sm:p-12 rounded-3xl border border-gold-500/30 shadow-2xl shadow-gold-950/30"
            >
              <span className="text-[11px] tracking-[0.4em] text-gold-400 uppercase font-mono mb-3">
                THE BRIDAL EDIT
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.06em] text-white mb-3">
                Timeless as Your Promise
              </h2>

              <p className="font-cormorant italic text-xl sm:text-2xl text-champagne-300 font-normal mb-5">
                Designed to be worn today, and inherited tomorrow.
              </p>

              <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto mb-8 font-light">
                Our bridal collection blends traditional craftsmanship with contemporary elegance.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                <button
                  onClick={onOpenShowcase}
                  className="w-full sm:w-auto gold-glow-btn px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] font-semibold text-champagne-100 flex items-center justify-center gap-2"
                >
                  <span>Explore Bridal Collection</span>
                  <ArrowUpRight className="w-4 h-4 text-gold-400" />
                </button>

                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] font-medium text-white/85 border border-white/20 hover:border-gold-400 hover:text-champagne-200 bg-white/5 backdrop-blur-md transition-all duration-300"
                >
                  Book an Appointment
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
});
