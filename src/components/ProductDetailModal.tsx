import React, { useState, MouseEvent } from 'react';
import { X, Clock, Check, ArrowRight, ZoomIn } from 'lucide-react';
import { JewelleryPiece } from '../types';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface ProductDetailModalProps {
  piece: JewelleryPiece | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  piece,
  onClose,
  onOpenBooking
}) => {
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState<boolean>(false);

  // Freeze background scrolling on desktop and mobile when viewing a jewel
  useBodyScrollLock(Boolean(piece));

  if (!piece) return null;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn overscroll-contain"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-espresso-950 rounded-2xl sm:rounded-3xl border border-gold-500/35 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] overscroll-contain"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gold-500/15 bg-espresso-900/40">
          <div>
            <span className="text-[9px] font-mono tracking-[0.35em] text-gold-400 uppercase block">
              BIZJEWELLERY · ATELIER DOSSIER
            </span>
            <h3 className="font-serif text-lg sm:text-2xl text-white font-light mt-0.5">
              {piece.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close product dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
          {/* Interactive Optical Zoom Visual Stage */}
          <div className="md:col-span-6 flex flex-col items-center w-full">
            <div
              onMouseEnter={() => setIsZooming(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsZooming(false)}
              className="relative w-full h-[200px] sm:h-[280px] lg:h-[300px] max-h-[35vh] bg-[#070504] rounded-2xl border border-gold-500/25 overflow-hidden flex items-center justify-center cursor-crosshair group shadow-2xl"
            >
              {/* Main Visual with Dynamic Optical Zoom */}
              <img
                src={piece.image}
                alt={piece.name}
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isZooming ? 'scale(2.2)' : 'scale(1)',
                  transition: isZooming ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out'
                }}
                className="w-full h-full max-h-[260px] object-contain filter drop-shadow-2xl will-change-transform select-none pointer-events-none"
              />
            </div>
          </div>

          {/* Details & Specs */}
          <div className="md:col-span-6 space-y-4">
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-xs font-mono text-gold-400 uppercase tracking-widest">
                  {piece.frenchName}
                </span>
                <span className="text-base font-mono text-champagne-200 font-bold tracking-wider">
                  {piece.price}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                {piece.description}
              </p>
            </div>

            {/* Atelier Provenance */}
            <div className="bg-espresso-900/60 p-4 sm:p-5 rounded-2xl border border-gold-500/15">
              <span className="text-[10px] font-mono text-gold-400 tracking-widest uppercase block mb-1">
                ATELIER PROVENANCE
              </span>
              <p className="text-xs sm:text-sm text-champagne-100/90 font-light italic font-cormorant leading-relaxed">
                "{piece.story}"
              </p>
            </div>

            {/* Technical Gemological Specs */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 text-xs font-mono">
              <div className="bg-espresso-950 p-2.5 sm:p-3 rounded-xl border border-white/10">
                <span className="text-[8px] sm:text-[9px] text-white/40 block mb-1 uppercase">CUT TYPE</span>
                <span className="text-white text-[10px] sm:text-[11px] font-semibold truncate block">{piece.specs.cut}</span>
              </div>
              <div className="bg-espresso-950 p-2.5 sm:p-3 rounded-xl border border-white/10">
                <span className="text-[8px] sm:text-[9px] text-white/40 block mb-1 uppercase">CLARITY</span>
                <span className="text-champagne-200 text-[10px] sm:text-[11px] font-semibold truncate block">{piece.specs.clarity}</span>
              </div>
              <div className="bg-espresso-950 p-2.5 sm:p-3 rounded-xl border border-white/10">
                <span className="text-[8px] sm:text-[9px] text-white/40 block mb-1 uppercase">COLOR</span>
                <span className="text-gold-300 text-[10px] sm:text-[11px] font-semibold truncate block">{piece.specs.color}</span>
              </div>
            </div>

            {/* Distinguishing Features */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                DISTINGUISHING ATELIER ATTRIBUTES
              </span>
              {piece.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-white/80 font-light">
                  <div className="mt-0.5 p-0.5 rounded-full bg-gold-500/20 text-gold-400">
                    <Check className="w-3 h-3 shrink-0" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-3 sm:pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="w-full gold-glow-btn py-3.5 sm:py-4 px-4 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-champagne-100 font-bold flex items-center justify-center gap-2 shadow-2xl text-center"
              >
                <span>Reserve Private Salon Viewing</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
