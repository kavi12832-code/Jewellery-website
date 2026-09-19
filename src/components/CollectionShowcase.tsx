import React, { useState, useRef, MouseEvent } from 'react';
import { BRIDAL_COLLECTION } from '../data/jewelleryData';
import { JewelleryPiece } from '../types';
import { Eye, ArrowRight, Clock, ArrowUpRight } from 'lucide-react';

interface CollectionShowcaseProps {
  onSelectPiece: (piece: JewelleryPiece) => void;
  onOpenBooking: () => void;
}

const InteractiveJewelleryCard: React.FC<{
  piece: JewelleryPiece;
  onSelectPiece: (piece: JewelleryPiece) => void;
}> = ({ piece, onSelectPiece }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glintPos, setGlintPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -7;
    const rY = ((x - centerX) / centerX) * 7;

    setRotateX(rX);
    setRotateY(rY);

    const glintX = (x / rect.width) * 100;
    const glintY = (y / rect.height) * 100;
    setGlintPos({ x: glintX, y: glintY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlintPos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className="group bg-espresso-950/80 rounded-2xl border border-gold-500/20 hover:border-gold-400/60 transition-colors duration-500 overflow-hidden flex flex-col justify-between h-full shadow-xl hover:shadow-gold-glow relative will-change-transform"
    >
      {/* Specular Light Reflection Follower */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 240px at ${glintPos.x}% ${glintPos.y}%, rgba(232, 201, 160, 0.15), rgba(201, 162, 39, 0.04) 45%, transparent 70%)`
        }}
      />

      {/* Product Image Stage */}
      <div
        onClick={() => onSelectPiece(piece)}
        className="relative h-40 sm:h-52 w-full bg-[#070504] flex items-center justify-center p-3 sm:p-4 overflow-hidden cursor-pointer"
      >
        <div
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
          style={{
            background: isHovered
              ? 'radial-gradient(circle at center, rgba(201, 162, 39, 0.1) 0%, rgba(13, 9, 6, 0.8) 70%)'
              : 'radial-gradient(circle at center, rgba(201, 162, 39, 0.02) 0%, rgba(13, 9, 6, 0.95) 80%)'
          }}
        />

        <img
          src={piece.image}
          alt={piece.name}
          className="w-full h-full max-h-[150px] sm:max-h-[180px] object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-all duration-700 ease-out z-10"
        />
      </div>

      {/* Product Content & Price */}
      <div
        onClick={() => onSelectPiece(piece)}
        className="p-3 sm:p-3.5 px-3.5 sm:px-4 flex items-center justify-between bg-espresso-950/90 border-t border-gold-500/15 relative z-10 cursor-pointer hover:bg-espresso-900 transition-colors gap-2"
      >
        <h3 className="font-serif text-xs sm:text-sm md:text-base text-white font-light tracking-wide group-hover:text-champagne-100 transition-colors truncate flex-1">
          {piece.name}
        </h3>
        <span className="text-xs sm:text-sm md:text-base font-mono text-champagne-200 font-bold tracking-wider shrink-0">
          {piece.price}
        </span>
      </div>
    </div>
  );
};

export const CollectionShowcase: React.FC<CollectionShowcaseProps> = ({
  onSelectPiece,
  onOpenBooking
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Bangles & Kadas', 'Diamond Collection', 'Temple Jewellery', 'Bridal Sets'];

  const filteredPieces = selectedCategory === 'All'
    ? BRIDAL_COLLECTION
    : BRIDAL_COLLECTION.filter((p) => p.category === selectedCategory || (selectedCategory === 'Diamond Collection' && p.category.includes('Diamond')));

  return (
    <section id="collections" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#0D0906] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3.5 border-b border-gold-500/15 pb-4 sm:pb-5">
          <div>
            <span className="text-[10px] font-mono tracking-[0.4em] text-gold-400 uppercase block mb-1">
              CURATED MASTERPIECES
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl font-light text-white tracking-wide">
              Trending Now
            </h2>

            <p className="font-cormorant italic text-base sm:text-lg text-champagne-200/80 mt-0.5">
              Handpicked favourites from our latest collection.
            </p>
          </div>

          {/* Category Filter Pills with Cream Hover */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-gold-500 to-champagne-300 text-espresso-950 font-bold shadow-gold-glow scale-105'
                    : 'bg-espresso-900/60 text-white/70 border border-white/10 hover:bg-[#FFF3DA] hover:text-[#1E120A] hover:border-[#D4AF37] hover:scale-105 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Products Compact 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredPieces.map((piece) => (
            <InteractiveJewelleryCard
              key={piece.id}
              piece={piece}
              onSelectPiece={onSelectPiece}
            />
          ))}
        </div>

        {/* View Full Collection CTA */}
        <div className="text-center mt-6 sm:mt-8">
          <button
            onClick={() => setSelectedCategory('All')}
            className="gold-glow-btn px-7 py-3 rounded-full text-xs font-mono uppercase tracking-[0.2em] font-semibold text-champagne-100"
          >
            View Full Collection
          </button>
        </div>
      </div>
    </section>
  );
};
