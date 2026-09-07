import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/jewelleryData';
import { ArrowUpRight } from 'lucide-react';

export const CategoriesSection: React.FC<{ onSelectCategory?: (cat: string) => void }> = ({ onSelectCategory }) => {
  const navigate = useNavigate();

  return (
    <section id="categories" className="py-12 sm:py-16 px-6 sm:px-12 bg-[#0D0906] relative overflow-hidden border-t border-gold-500/15">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] font-mono tracking-[0.4em] text-gold-400 uppercase block mb-2">
            EXPLORE THE CURATION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-wide mb-2.5">
            Shop by Category
          </h2>
          <p className="font-cormorant italic text-base sm:text-lg text-champagne-200/80">
            Timeless pieces in 22K/18K gold, certified diamonds, and bespoke bridal parures.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                if (onSelectCategory) {
                  onSelectCategory(cat.id);
                } else {
                  navigate(`/collections/${cat.id}`);
                }
              }}
              className="group bg-espresso-950/70 p-5 sm:p-6 rounded-3xl border border-gold-500/20 hover:border-gold-400/60 transition-all duration-500 flex flex-col justify-between cursor-pointer shadow-xl hover:shadow-gold-glow relative overflow-hidden hover:-translate-y-1"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-espresso-900 border border-gold-500/20">
                    {cat.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:bg-gold-500/20 transition-colors">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <h3 className="font-serif text-lg sm:text-xl text-white font-medium group-hover:text-champagne-200 transition-colors pt-1">
                  {cat.title}
                </h3>

                <p className="text-xs text-white/60 font-light leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-champagne-300/70 group-hover:text-gold-300 transition-colors">
                <span>View 360° Designs</span>
                <span className="text-xs">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
