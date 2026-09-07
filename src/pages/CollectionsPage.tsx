import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COLLECTIONS_DATA } from '../data/jewelleryData';
import { Rotate3d, ArrowRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export const CollectionsPage: React.FC = () => {
  const navigate = useNavigate();
  const categories = Object.values(COLLECTIONS_DATA);

  return (
    <div className="min-h-screen bg-[#0D0906] pt-20 sm:pt-24 pb-12 px-4 sm:px-8 lg:px-12 relative overflow-hidden flex flex-col justify-between">
      {/* Dynamic Background Luxury Glows */}
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-gold-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-amber-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Compact Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-4">
          <Link to="/" className="hover:text-champagne-200 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gold-400 font-semibold">Collections</span>
        </div>

        {/* Collections Page Header (Compact & Fits in Window) */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-espresso-900/80 backdrop-blur-md mb-2.5 shadow-gold-glow"
          >
            <Rotate3d className="w-3 h-3 text-gold-400" />
            <span className="text-[10px] tracking-[0.3em] text-champagne-300 uppercase font-mono">
              360° INTERACTIVE JEWELLERY STUDIO
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-serif text-2xl sm:text-4xl font-light text-white tracking-wide mb-2"
          >
            Explore Collections in 360°
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-cormorant italic text-base sm:text-lg text-champagne-200/90 max-w-xl mx-auto leading-relaxed"
          >
            Select a category to view 360° turntable perspectives and artisan creations.
          </motion.p>
        </div>

        {/* 4 Category Grid Cards - Compact Sizing that Fits in Windows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 * idx }}
              onClick={() => navigate(`/collections/${cat.slug}`)}
              className="group bg-espresso-950/80 rounded-2xl border border-gold-500/20 hover:border-gold-400/70 transition-all duration-300 p-4 sm:p-4.5 cursor-pointer shadow-xl hover:shadow-gold-glow flex flex-col justify-between relative overflow-hidden hover:-translate-y-1"
            >
              {/* Subtle top gold line accent */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/30 to-transparent group-hover:via-gold-400 transition-all duration-300" />

              <div>
                {/* Scaled-down Image Stage */}
                <div className="relative h-36 sm:h-40 w-full rounded-xl overflow-hidden bg-[#070504] border border-gold-500/20 flex items-center justify-center p-3 mb-3.5 shadow-inner">
                  {/* Radial glow */}
                  <div className="absolute inset-0 bg-radial from-gold-500/10 via-transparent to-transparent pointer-events-none" />

                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="max-h-[125px] sm:max-h-[135px] w-auto max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)] group-hover:scale-108 transition-transform duration-500 ease-out"
                  />

                  {/* 360 Live Badge */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-espresso-950/90 border border-gold-400/40 text-gold-300 text-[10px] font-mono shadow-sm group-hover:bg-gold-500 group-hover:text-espresso-950 transition-colors">
                    <Rotate3d className="w-3 h-3 text-gold-400 group-hover:text-espresso-950 group-hover:rotate-180 transition-transform duration-500" />
                    <span>360°</span>
                  </div>

                  {/* Frame count */}
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono text-champagne-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>240 Frames</span>
                  </div>
                </div>

                {/* Card Meta */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-gold-400 uppercase tracking-wider px-2 py-0.5 rounded bg-espresso-900 border border-gold-500/20">
                      {cat.tag}
                    </span>
                    <span className="font-mono text-xs font-bold text-champagne-200">
                      {cat.specimen.price}
                    </span>
                  </div>

                  <h2 className="font-serif text-lg sm:text-xl text-white font-normal group-hover:text-champagne-200 transition-colors truncate">
                    {cat.title}
                  </h2>

                  <p className="text-xs text-white/60 font-light leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Bottom CTA Bar */}
              <div className="pt-3 mt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-champagne-300 group-hover:text-gold-300 transition-colors">
                <span className="flex items-center gap-1.5 truncate">
                  <Compass className="w-3 h-3 text-gold-400 shrink-0" />
                  <span>Explore in 360°</span>
                </span>
                <div className="w-6 h-6 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-espresso-950 transition-all shrink-0">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
