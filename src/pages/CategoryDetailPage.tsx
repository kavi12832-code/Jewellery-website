import React, { useRef, useEffect, useState, useCallback, MouseEvent, TouchEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { COLLECTIONS_DATA, BRIDAL_COLLECTION } from '../data/jewelleryData';
import { JewelleryPiece } from '../types';
import {
  Rotate3d,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryDetailPageProps {
  onOpenBooking: () => void;
  onSelectPiece: (piece: JewelleryPiece) => void;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({
  onOpenBooking,
  onSelectPiece
}) => {
  const { category = 'rings' } = useParams<{ category: string }>();
  const navigate = useNavigate();

  // Normalize category slug
  const normalizedCategory = COLLECTIONS_DATA[category.toLowerCase()] ? category.toLowerCase() : 'rings';
  const activeMeta = COLLECTIONS_DATA[normalizedCategory];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesCacheRef = useRef<Record<string, HTMLImageElement[]>>({});

  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const startFrameRef = useRef<number>(0);

  const totalFrames = activeMeta.totalFrames || 240;
  const folder = activeMeta.folder;

  // Preload frames for currently active category
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (imagesCacheRef.current[normalizedCategory] && imagesCacheRef.current[normalizedCategory].length === totalFrames) {
      setIsLoaded(true);
      setLoadProgress(100);
      setCurrentFrame(0);
      return;
    }

    setIsLoaded(false);
    setLoadProgress(0);
    setCurrentFrame(0);

    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(3, '0');
      img.src = `${folder}/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        const prog = Math.round((loadedCount / totalFrames) * 100);
        setLoadProgress(prog);
        if (loadedCount >= totalFrames) {
          imagesCacheRef.current[normalizedCategory] = images;
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= totalFrames) {
          imagesCacheRef.current[normalizedCategory] = images;
          setIsLoaded(true);
        }
      };

      images.push(img);
    }
  }, [normalizedCategory, folder, totalFrames]);

  // Draw frame on canvas with high DPI sharpness
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const currentImages = imagesCacheRef.current[normalizedCategory];
    if (!currentImages || !currentImages[frameIdx]) return;

    const img = currentImages[frameIdx];
    if (!img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#0F0B09';
    ctx.fillRect(0, 0, width, height);

    const renderW = width * zoomLevel;
    const renderH = height * zoomLevel;
    const offsetX = (width - renderW) / 2;
    const offsetY = (height - renderH) / 2;

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();
  }, [zoomLevel, normalizedCategory]);

  useEffect(() => {
    if (isLoaded) {
      drawFrame(currentFrame);
    }
  }, [currentFrame, drawFrame, isLoaded]);

  // Turntable 360 Auto-Rotation Loop
  useEffect(() => {
    if (!isPlaying || isDragging || !isLoaded) return;
    const interval = window.setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % totalFrames);
    }, 38);
    return () => clearInterval(interval);
  }, [isPlaying, isDragging, isLoaded, totalFrames]);

  // Mouse & Touch Drag Interaction
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setIsPlaying(false);
    dragStartXRef.current = e.clientX;
    startFrameRef.current = currentFrame;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const frameDelta = Math.round(deltaX / 3.2);
    let newFrame = (startFrameRef.current + frameDelta) % totalFrames;
    if (newFrame < 0) newFrame += totalFrames;
    setCurrentFrame(newFrame);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setIsPlaying(false);
    dragStartXRef.current = e.touches[0].clientX;
    startFrameRef.current = currentFrame;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartXRef.current;
    const frameDelta = Math.round(deltaX / 3.2);
    let newFrame = (startFrameRef.current + frameDelta) % totalFrames;
    if (newFrame < 0) newFrame += totalFrames;
    setCurrentFrame(newFrame);
  };

  const handleTouchEnd = () => setIsDragging(false);

  const jumpToAngle = (frameIdx: number) => {
    setIsPlaying(false);
    setCurrentFrame(frameIdx % totalFrames);
  };

  const currentDegrees = Math.round((currentFrame / totalFrames) * 360);

  // Filter gallery items for this category
  const categoryPieces = BRIDAL_COLLECTION.filter((p) => {
    if (normalizedCategory === 'necklaces') {
      return (
        p.id.includes('necklace') ||
        p.id.includes('choker') ||
        p.name.toLowerCase().includes('necklace') ||
        p.name.toLowerCase().includes('choker') ||
        p.category === 'Bridal Sets'
      );
    }
    if (normalizedCategory === 'bangles') {
      return (
        p.id.includes('bangle') ||
        p.id.includes('kada') ||
        p.id.includes('bracelet') ||
        p.id.includes('cuff') ||
        p.name.toLowerCase().includes('bangle') ||
        p.name.toLowerCase().includes('kada') ||
        p.name.toLowerCase().includes('bracelet') ||
        p.category === 'Bangles & Kadas'
      );
    }
    if (normalizedCategory === 'earrings') {
      return (
        p.id.includes('earring') ||
        p.id.includes('stud') ||
        p.id.includes('jhumka') ||
        p.name.toLowerCase().includes('earring') ||
        p.name.toLowerCase().includes('stud') ||
        p.name.toLowerCase().includes('jhumka') ||
        p.category === 'Earrings & Studs' ||
        p.category === 'Temple Jewellery'
      );
    }
    return (
      p.id.includes('ring') ||
      p.id.includes('solitaire') ||
      p.name.toLowerCase().includes('solitaire') ||
      p.name.toLowerCase().includes('ring') ||
      p.category === 'Diamond Collection'
    );
  });

  return (
    <div className="min-h-screen bg-[#0D0906] pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-amber-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-4">
          <Link to="/" className="hover:text-champagne-200 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-champagne-200 transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-gold-400 font-semibold">{activeMeta.title}</span>
        </div>

        {/* Category Switcher Pill Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mb-8 pb-4 border-b border-white/10">
          <Link
            to="/collections"
            className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider bg-espresso-900/70 border border-gold-500/20 text-white/70 hover:text-white hover:border-gold-400/50 transition-all"
          >
            ← All Collections
          </Link>
          {Object.values(COLLECTIONS_DATA).map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                navigate(`/collections/${cat.slug}`);
                setIsPlaying(true);
              }}
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                normalizedCategory === cat.slug
                  ? 'bg-gradient-to-r from-gold-500 to-champagne-300 text-espresso-950 font-bold shadow-gold-glow scale-105'
                  : 'bg-espresso-900/70 border border-gold-500/20 text-white/70 hover:text-white hover:border-gold-400/50'
              }`}
            >
              <span>{cat.title}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            </button>
          ))}
        </div>

        {/* Section 1: 360° Interactive Viewer Header & Stage */}
        <div className="mb-14 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-espresso-950/70 rounded-2xl sm:rounded-3xl border border-gold-500/25 p-4 sm:p-7 lg:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
            {/* Subtle top gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

            {/* Left: 360 Turntable Stage */}
            <div className="lg:col-span-7 flex flex-col items-center w-full">
              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`relative w-full aspect-square max-w-[300px] sm:max-w-[390px] rounded-2xl overflow-hidden border border-gold-500/30 bg-[#0F0B09] shadow-[0_15px_40px_rgba(0,0,0,0.85)] select-none transition-all duration-300 ${
                  isDragging ? 'cursor-grabbing border-gold-400' : 'cursor-grab hover:border-gold-400/60'
                }`}
              >
                <canvas ref={canvasRef} className="w-full h-full block" />

                {/* Loading Screen Overlay */}
                {!isLoaded && (
                  <div className="absolute inset-0 z-30 bg-[#0F0B09] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-10 h-10 rounded-full border border-gold-500/20 border-t-gold-400 animate-spin mb-3" />
                    <p className="font-serif text-xs text-white tracking-widest uppercase mb-2">
                      Loading 360° {activeMeta.specimen.name}
                    </p>
                    <div className="w-36 h-1 bg-espresso-800 rounded-full overflow-hidden border border-gold-500/20">
                      <div
                        className="h-full bg-gradient-to-r from-gold-500 to-champagne-300 transition-all duration-200"
                        style={{ width: `${loadProgress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-champagne-300/60 mt-1.5">{loadProgress}%</span>
                  </div>
                )}

                {/* 360° Angle Degree Tracker */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-espresso-950/80 backdrop-blur-md border border-gold-500/30 text-gold-300 text-[10px] font-mono shadow-md">
                  <Compass className="w-3 h-3 text-gold-400 animate-spin-slow" />
                  <span>{currentDegrees}° ANGLE</span>
                </div>

                {/* Drag Guidance Hint */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/60 border border-white/10">
                  <span>↔ Drag to spin 360°</span>
                </div>
              </div>

              {/* Turntable Controls Bar */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-4 bg-espresso-950/80 backdrop-blur-md px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-gold-500/20 shadow-xl max-w-full">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 sm:p-1.5 rounded-full text-champagne-300 hover:text-white transition-colors"
                  title={isPlaying ? 'Pause Rotation' : 'Play 360° Spin'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-400" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />}
                </button>
                <div className="h-3.5 w-[1px] bg-white/10" />
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(1, prev - 0.2))}
                  className="p-1 sm:p-1.5 text-champagne-300 hover:text-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <span className="text-[10px] sm:text-[11px] font-mono text-white/70 min-w-8 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(1.6, prev + 0.2))}
                  className="p-1 sm:p-1.5 text-champagne-300 hover:text-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <div className="h-3.5 w-[1px] bg-white/10" />
                <button
                  onClick={() => jumpToAngle(0)}
                  className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded bg-espresso-900 text-gold-300/80 hover:text-gold-200"
                >
                  0°
                </button>
                <button
                  onClick={() => jumpToAngle(Math.round(totalFrames * 0.25))}
                  className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded bg-espresso-900 text-gold-300/80 hover:text-gold-200"
                >
                  90°
                </button>
                <button
                  onClick={() => jumpToAngle(Math.round(totalFrames * 0.5))}
                  className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded bg-espresso-900 text-gold-300/80 hover:text-gold-200"
                >
                  180°
                </button>
              </div>
            </div>

            {/* Right: Specimen Details & Technical Matrix */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-[0.35em] text-gold-400 uppercase block mb-1.5">
                  {activeMeta.specimen.tag}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mb-2">
                  {activeMeta.specimen.name}
                </h2>
                <p className="text-xs sm:text-sm text-white/60 font-light mb-4">
                  {activeMeta.subtitle}
                </p>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-gold-300">
                    {activeMeta.specimen.price}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> In Atelier Vault
                  </span>
                </div>
              </div>

              {/* Technical Spec Sheet */}
              <div className="bg-espresso-900/70 p-5 sm:p-6 rounded-2xl border border-gold-500/25 space-y-3.5 text-xs font-mono">
                {activeMeta.specimen.specs.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex justify-between ${
                      idx < activeMeta.specimen.specs.length - 1 ? 'border-b border-white/5 pb-2' : ''
                    }`}
                  >
                    <span className="text-white/40">{item.label}</span>
                    <span className={item.highlight ? 'text-gold-300 font-semibold' : 'text-white'}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="gold-glow-btn flex-1 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] text-champagne-100 font-bold flex items-center justify-center gap-2 shadow-gold-glow"
                >
                  <span>{activeMeta.specimen.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Category Product Grid ("Browse More in this Category") */}
        <div className="pt-10 border-t border-gold-500/20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] font-mono tracking-[0.4em] text-gold-400 uppercase block mb-2">
                CURATED ARTISAN VAULT
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-light">
                {activeMeta.title} Collection
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light mt-1">
                Explore hand-finished heirloom creations and certified gemstone settings.
              </p>
            </div>
            <span className="text-xs font-mono text-champagne-300/80 bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/20 w-max">
              {categoryPieces.length} Exclusive Creations
            </span>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categoryPieces.map((piece) => (
              <div
                key={piece.id}
                onClick={() => onSelectPiece(piece)}
                className="group bg-espresso-950/80 rounded-2xl border border-gold-500/20 hover:border-gold-400/60 p-5 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-gold-glow h-full flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="flex-1 flex flex-col">
                  {/* Product Image Stage */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#070504] mb-4 flex items-center justify-center p-4 border border-gold-500/15">
                    <div className="absolute inset-0 bg-radial from-gold-500/10 via-transparent to-transparent pointer-events-none" />
                    <img
                      src={piece.image}
                      alt={piece.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 right-3 p-1.5 rounded-full bg-espresso-950/80 text-gold-300/80 group-hover:text-gold-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 mb-3 flex-1">
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block">
                      {piece.metal}
                    </span>
                    <h4 className="font-serif text-lg text-white font-medium group-hover:text-champagne-200 transition-colors truncate">
                      {piece.name}
                    </h4>
                    <p className="text-xs text-white/50 font-light truncate">
                      {piece.gemstone}
                    </p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-gold-300 font-bold text-sm sm:text-base">
                    {piece.price}
                  </span>
                  <span className="text-champagne-300/80 group-hover:text-gold-300 flex items-center gap-1 transition-colors">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
