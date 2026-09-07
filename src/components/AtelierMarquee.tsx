import React, { useState } from 'react';
import { Eye, ArrowUpRight, Award, Gem, ShieldCheck, X } from 'lucide-react';

interface MarqueeItem {
  id: string;
  title: string;
  frenchTitle: string;
  category: string;
  gemstone: string;
  metal: string;
  image: string;
  tag: string;
  story: string;
}

const MARQUEE_PIECES: MarqueeItem[] = [
  {
    id: 'kundan-royal-choker',
    title: 'The Maharani Polki Choker',
    frenchTitle: 'Collier Ras-de-Cou Royal Maharani',
    category: 'Haute Parure',
    gemstone: 'Uncut Polki Diamonds & Basra Pearls',
    metal: '24k Meenakari Royal Gold',
    image: '/marquee/kundan-royal-choker.jpg',
    tag: 'PIECE UNIQUE · HERITAGE EDITION',
    story: 'Handcrafted with antique uncut flat diamond slices seated in 24k foil-backed collets, tiered with lustrous Basra seed pearls and fine emerald enamel reverse.'
  },
  {
    id: 'atelier-bust-necklace',
    title: 'The Vendôme Silhouette Rivière',
    frenchTitle: 'Collier Rivière Haute Joaillerie',
    category: 'Necklaces',
    gemstone: '28.50 ctw Graduated Brilliant Diamonds',
    metal: '18k Fairmined White Gold',
    image: '/marquee/atelier-bust-necklace.jpg',
    tag: 'SALON PLACE VENDÔME',
    story: 'Conceived to drape like liquid starlight across the collarbone. Each individual diamond is custom cut to form a seamless unbroken line of pure white fire.'
  },
  {
    id: 'byzantine-gold-cuffs',
    title: 'The Byzantine Woven Gold Suite',
    frenchTitle: 'Parure Manchette & Pendantes Byzance',
    category: 'High Joaillerie',
    gemstone: 'Faceted Cognac & Imperial Topaz',
    metal: '24k Hand-Chiseled Gold Mesh',
    image: '/marquee/byzantine-gold-cuffs.jpg',
    tag: 'ATELIER MASTERWORK',
    story: 'Woven with microscopic 24k gold wire mesh requiring over 190 hours of hand-filing, accented by matching drop jhumki earrings with delicate filigree spheres.'
  },
  {
    id: 'violet-amethyst-studs',
    title: 'The Nocturne Amethyst Solitaires',
    frenchTitle: 'Boucles d\'Oreilles Améthyste Royale',
    category: 'Earrings',
    gemstone: '12.00 ctw Royal Deep Siberian Amethyst',
    metal: 'Platinum & Black Titanium Collets',
    image: '/marquee/violet-amethyst-studs.jpg',
    tag: 'COLLECTION NOCTURNE',
    story: 'Rare non-heat-treated Siberian violet amethysts featuring deep purple body color with vivid magenta flashes, set in ultra-clean mirror bezel mounts.'
  },
  {
    id: 'imperial-chandelier-drops',
    title: 'The Prism Chandelier Suite',
    frenchTitle: 'Pendantes Chandelier Prisme Précieux',
    category: 'Earrings',
    gemstone: 'Emerald, Ruby, Sapphire & Pavé Diamonds',
    metal: '18k Fairmined White & Rose Gold',
    image: '/marquee/imperial-chandelier-drops.jpg',
    tag: 'SUR-MESURE PARURE',
    story: 'A vibrant tribute to high jewelry color theory. Marquise-cut natural gemstones suspended within articulated pavé diamond frames designed for kinetic evening sparkle.'
  }
];

export const AtelierMarquee: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [selectedItem, setSelectedItem] = useState<MarqueeItem | null>(null);

  // Duplicate for infinite seamless marquee
  const row1 = [...MARQUEE_PIECES, ...MARQUEE_PIECES];
  const row2 = [...MARQUEE_PIECES.slice().reverse(), ...MARQUEE_PIECES.slice().reverse()];

  return (
    <section className="py-10 sm:py-14 bg-[#0D0906] relative overflow-hidden border-t border-gold-500/15">
      {/* Background soft ambient vignette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-6 sm:mb-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-500/30 bg-espresso-900/60 backdrop-blur-md mb-2 shadow-gold-glow">
          <span className="text-[10px] tracking-[0.35em] text-champagne-300 uppercase font-mono">
            ARCHIVAL EXHIBITION · BIZJEWELLERY
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-white tracking-wide mb-2">
          The Atelier Exhibition Tape
        </h2>

        <p className="font-cormorant italic text-base sm:text-lg text-champagne-200/80 max-w-xl mx-auto">
          A continuous motion marquee showcasing one-of-a-kind royal parures and museum commissions.
        </p>
      </div>

      {/* Infinite Marquee Container with Left & Right Edge Gradient Fades */}
      <div className="relative w-full overflow-hidden space-y-4 select-none">
        {/* Left Fade Gradient */}
        <div className="absolute top-0 left-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#0D0906] via-[#0D0906]/80 to-transparent z-20 pointer-events-none" />
        {/* Right Fade Gradient */}
        <div className="absolute top-0 right-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#0D0906] via-[#0D0906]/80 to-transparent z-20 pointer-events-none" />

        {/* Marquee Row 1 (Drifting Left) */}
        <div className="animate-marquee-smooth flex gap-4 sm:gap-6 px-3">
          {row1.map((item, idx) => (
            <div
              key={`row1-${item.id}-${idx}`}
              onClick={() => setSelectedItem(item)}
              className="group w-[250px] sm:w-[300px] h-[350px] sm:h-[390px] bg-espresso-950/80 rounded-2xl sm:rounded-3xl border border-gold-500/20 hover:border-gold-400/70 p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer transition-all duration-500 shadow-xl hover:shadow-gold-glow hover:-translate-y-1.5 relative overflow-hidden shrink-0"
            >
              {/* Image Container with Smooth Zoom */}
              <div className="relative h-[66%] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#070504]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-[0.95] group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
              </div>

              {/* Text Info */}
              <div className="pt-2 pb-0.5 px-1 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[9px] font-mono text-gold-400 uppercase tracking-widest block mb-0.5">
                    {item.frenchTitle}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg text-white font-medium line-clamp-1 group-hover:text-champagne-200 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] sm:text-[11px] font-mono text-white/50">
                  <span className="text-champagne-300/80 truncate max-w-[160px]">{item.gemstone}</span>
                  <span className="text-gold-400 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee Row 2 (Drifting Right) */}
        <div className="animate-marquee-reverse flex gap-4 sm:gap-6 px-3">
          {row2.map((item, idx) => (
            <div
              key={`row2-${item.id}-${idx}`}
              onClick={() => setSelectedItem(item)}
              className="group w-[250px] sm:w-[300px] h-[350px] sm:h-[390px] bg-espresso-950/80 rounded-2xl sm:rounded-3xl border border-gold-500/20 hover:border-gold-400/70 p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer transition-all duration-500 shadow-xl hover:shadow-gold-glow hover:-translate-y-1.5 relative overflow-hidden shrink-0"
            >
              {/* Image Container with Smooth Zoom */}
              <div className="relative h-[66%] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#070504]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-[0.95] group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
              </div>

              {/* Text Info */}
              <div className="pt-2 pb-0.5 px-1 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[9px] font-mono text-gold-400 uppercase tracking-widest block mb-0.5">
                    {item.frenchTitle}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg text-white font-medium line-clamp-1 group-hover:text-champagne-200 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] sm:text-[11px] font-mono text-white/50">
                  <span className="text-champagne-300/80 truncate max-w-[160px]">{item.metal}</span>
                  <span className="text-gold-400 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / High-Res Dossier Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-espresso-950 rounded-3xl border border-gold-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gold-500/15 bg-espresso-900/40">
              <div>
                <span className="text-[9px] font-mono tracking-[0.35em] text-gold-400 uppercase block">
                  ARCHIVAL EXHIBITION DOSSIER
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-white font-light mt-0.5">
                  {selectedItem.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 rounded-2xl overflow-hidden border border-gold-500/20 bg-[#070504] shadow-2xl max-h-[260px] flex items-center justify-center">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full max-h-[260px] object-cover"
                />
              </div>

              <div className="md:col-span-7 space-y-4">
                <div>
                  <span className="text-xs font-mono text-gold-400 uppercase tracking-widest block mb-1">
                    {selectedItem.frenchTitle}
                  </span>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                    {selectedItem.story}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/40">GEMSTONE MATRIX:</span>
                    <span className="text-champagne-200">{selectedItem.gemstone}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/40">PRECIOUS METAL:</span>
                    <span className="text-white">{selectedItem.metal}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-white/40">CLASSIFICATION:</span>
                    <span className="text-gold-300">{selectedItem.category}</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      onOpenBooking();
                    }}
                    className="w-full gold-glow-btn py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] text-champagne-100 font-bold flex items-center justify-center gap-2 shadow-2xl"
                  >
                    <span>Request Archival Viewing</span>
                    <ArrowUpRight className="w-4 h-4 text-gold-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
