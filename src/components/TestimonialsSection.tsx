import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/jewelleryData';
import { TestimonialItem } from '../types';
import { Quote, Star, X, Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TestimonialsSection: React.FC = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialItem | null>(null);

  const handleNext = () => {
    if (!selectedTestimonial) return;
    const currentIndex = TESTIMONIALS.findIndex((t) => t.id === selectedTestimonial.id);
    const nextIndex = (currentIndex + 1) % TESTIMONIALS.length;
    setSelectedTestimonial(TESTIMONIALS[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedTestimonial) return;
    const currentIndex = TESTIMONIALS.findIndex((t) => t.id === selectedTestimonial.id);
    const prevIndex = (currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    setSelectedTestimonial(TESTIMONIALS[prevIndex]);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#0D0906] relative overflow-hidden border-t border-gold-500/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Customer Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-500/30 bg-espresso-900/80 backdrop-blur-md mb-2.5 shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[10px] tracking-[0.35em] text-champagne-300 uppercase font-mono">
              CLIENT TESTIMONIALS
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-wide mb-2.5">
            What Our Customers Say
          </h2>
          <p className="font-cormorant italic text-base sm:text-lg text-champagne-200/80">
            Cherished memories forged with families across generations. Hover or click any review to inspect client feedback.
          </p>
        </div>
      </div>

      {/* Infinite Smooth Testimonials Marquee */}
      <div className="relative w-full overflow-hidden mask-gradient py-2 group/marquee">
        {/* Edge Gradient Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#0D0906] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#0D0906] to-transparent z-20" />

        <div className="animate-marquee-smooth group-hover/marquee:[animation-play-state:paused] flex items-stretch gap-6 w-max will-change-transform py-4">
          {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => {
            const isCurrentActive = selectedTestimonial?.id === t.id;
            return (
              <div
                key={`${t.id}-${idx}`}
                onClick={() => setSelectedTestimonial(t)}
                className={`w-[320px] sm:w-[380px] p-7 sm:p-8 rounded-3xl border transition-all duration-300 ease-out flex flex-col justify-between shadow-xl relative group cursor-pointer shrink-0 select-none ${
                  isCurrentActive
                    ? 'bg-[#FFF3DA] text-[#1E120A] border-[#D4AF37] shadow-[0_20px_50px_rgba(212,175,55,0.4)] scale-[1.04] -translate-y-2 z-10'
                    : 'bg-espresso-900/60 backdrop-blur-md border-gold-500/20 hover:bg-[#FFF3DA] hover:border-[#D4AF37] hover:shadow-[0_25px_60px_rgba(212,175,55,0.35),0_10px_25px_rgba(0,0,0,0.85)] hover:scale-[1.04] hover:-translate-y-2 hover:z-10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quote
                      className={`w-7 h-7 transition-colors duration-300 ${
                        isCurrentActive
                          ? 'text-[#8B6D1B]'
                          : 'text-gold-400/50 group-hover:text-[#8B6D1B]'
                      }`}
                    />
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 transition-colors duration-300 ${
                            isCurrentActive
                              ? 'fill-[#B8860B] text-[#B8860B]'
                              : 'fill-gold-400 text-gold-400 group-hover:fill-[#B8860B] group-hover:text-[#B8860B]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p
                    className={`font-cormorant italic text-base sm:text-lg leading-relaxed transition-colors duration-300 ${
                      isCurrentActive
                        ? 'text-[#1E120A] font-normal'
                        : 'text-champagne-100/90 group-hover:text-[#1E120A] group-hover:font-normal'
                    }`}
                  >
                    "{t.quote}"
                  </p>
                </div>

                <div
                  className={`pt-5 mt-6 border-t flex items-center justify-between text-xs font-mono transition-colors duration-300 ${
                    isCurrentActive
                      ? 'border-[#3D2608]/20'
                      : 'border-white/10 group-hover:border-[#3D2608]/20'
                  }`}
                >
                  <span
                    className={`font-medium tracking-wider transition-colors duration-300 ${
                      isCurrentActive
                        ? 'text-[#1E120A]'
                        : 'text-white group-hover:text-[#1E120A]'
                    }`}
                  >
                    {t.author}
                  </span>
                  <span
                    className={`transition-colors duration-300 ${
                      isCurrentActive
                        ? 'text-[#7A5515] font-semibold'
                        : 'text-gold-400/90 group-hover:text-[#7A5515] group-hover:font-semibold'
                    }`}
                  >
                    {t.location}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pop-In Tab Modal in Cream Color (#FFF3DA) when clicking any client review */}
      <AnimatePresence>
        {selectedTestimonial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            {/* Backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTestimonial(null)}
              className="absolute inset-0"
            />

            {/* Cream Colored Pop Tab Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-2xl bg-[#FFF3DA] text-[#1E120A] rounded-3xl p-7 sm:p-10 border-2 border-[#D4AF37]/50 shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_50px_rgba(212,175,55,0.25)] overflow-hidden"
            >
              {/* Subtle royal background watermark quote */}
              <Quote className="absolute -bottom-6 -right-6 w-44 h-44 text-[#C9A227]/10 pointer-events-none rotate-12" />

              {/* Top Bar with Badge and Close button */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#3D2608]/15 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest font-semibold uppercase bg-[#ECDAB3] text-[#3D2608] border border-[#C9A227]/40 flex items-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6D1B]" /> Verified Client Review
                  </span>
                </div>

                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="p-2 rounded-full bg-[#ECDAB3]/80 hover:bg-[#DDC596] text-[#241407] transition-all hover:rotate-90 duration-300 shadow-sm"
                  aria-label="Close comment"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Star Rating & Quote Accent */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#B8860B] text-[#B8860B] drop-shadow-sm" />
                  ))}
                  <span className="text-xs font-mono font-bold text-[#8B6D1B] ml-2">5.0 / 5.0 Star Experience</span>
                </div>
                <Quote className="w-8 h-8 text-[#C9A227]/60" />
              </div>

              {/* Testimonial Quote */}
              <blockquote className="font-cormorant italic text-xl sm:text-3xl text-[#1E120A] leading-relaxed font-normal mb-8 relative z-10">
                "{selectedTestimonial.quote}"
              </blockquote>

              {/* Client Info & Prev/Next Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#3D2608]/15 relative z-10">
                <div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1E120A] tracking-wide">
                    {selectedTestimonial.author}
                  </h4>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#7A5515] font-semibold mt-0.5">
                    {selectedTestimonial.location} · Bespoke Patron
                  </p>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-full bg-[#ECDAB3]/80 hover:bg-[#DDC596] text-[#241407] transition-all flex items-center justify-center"
                    title="Previous Review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-[#7A5515] px-2 font-medium">
                    {TESTIMONIALS.findIndex((t) => t.id === selectedTestimonial.id) + 1} / {TESTIMONIALS.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full bg-[#ECDAB3]/80 hover:bg-[#DDC596] text-[#241407] transition-all flex items-center justify-center"
                    title="Next Review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
