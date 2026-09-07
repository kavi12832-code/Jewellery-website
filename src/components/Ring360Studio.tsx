import React, { useRef, useEffect, useState, useCallback, MouseEvent, TouchEvent } from 'react';
import { Rotate3d, Play, Pause, ZoomIn, ZoomOut, Compass, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { BRIDAL_COLLECTION } from '../data/jewelleryData';
import { JewelleryPiece } from '../types';

interface MultiCategoryStudioProps {
  onOpenBooking: () => void;
  activeCategory?: string;
  onSelectPiece?: (piece: JewelleryPiece) => void;
}

interface StudioItemConfig {
  id: string;
  label: string;
  folder: string;
  totalFrames: number;
  active360: true;
  specimen: {
    tag: string;
    name: string;
    price: string;
    specs: { label: string; value: string; highlight?: boolean }[];
    buttonText: string;
  };
  galleryTitle: string;
}

const CATEGORY_CONFIGS: Record<string, StudioItemConfig> = {
  rings: {
    id: 'rings',
    label: 'Rings (360° Live)',
    folder: '/ring-360',
    totalFrames: 240,
    active360: true,
    specimen: {
      tag: 'FEATURED 360° SPECIMEN',
      name: 'The Rosé Imperial Solitaire',
      price: '₹2,15,000',
      specs: [
        { label: 'CENTER GEMSTONE:', value: '3.20 ct Ceylon Pink Sapphire', highlight: true },
        { label: 'HALO ACCENTS:', value: '0.78 ctw D-Flawless Diamonds' },
        { label: 'METAL PURITY:', value: '18K Rose Gold (BIS 750)' },
        { label: 'CERTIFICATION:', value: 'Dual GIA & IGI Dossier', highlight: true }
      ],
      buttonText: 'Reserve Ring In Showroom'
    },
    galleryTitle: 'The Solitaire Gallery'
  },
  necklaces: {
    id: 'necklaces',
    label: 'Necklaces (360° Live)',
    folder: '/necklace-360',
    totalFrames: 240,
    active360: true,
    specimen: {
      tag: 'FEATURED 360° SPECIMEN',
      name: 'The Nizam Royal Heritage Necklace',
      price: '₹4,85,000',
      specs: [
        { label: 'PRIMARY MOTIF:', value: 'Uncut Polki & Zambian Emeralds', highlight: true },
        { label: 'CARAT & WEIGHT:', value: '14.50 ctw Polki + 120g 22K Gold' },
        { label: 'METAL PURITY:', value: '22K Handcrafted Gold (BIS 916)' },
        { label: 'CERTIFICATION:', value: 'Dual GIA & IGI Master Certificate', highlight: true }
      ],
      buttonText: 'Reserve Necklace In Showroom'
    },
    galleryTitle: 'The Necklace & Choker Gallery'
  },
  bangles: {
    id: 'bangles',
    label: 'Bangles & Kadas (360° Live)',
    folder: '/bangles-360',
    totalFrames: 240,
    active360: true,
    specimen: {
      tag: 'FEATURED 360° SPECIMEN',
      name: 'The Mayura Imperial Filigree Kadas',
      price: '₹3,45,000',
      specs: [
        { label: 'PRIMARY MOTIF:', value: 'Handcrafted Filigree & Beaded Relief', highlight: true },
        { label: 'ACCENTS & GEMS:', value: '3.80 ctw Uncut Polki & Natural Topaz' },
        { label: 'METAL PURITY:', value: '22K Sovereign Gold (BIS 916)', highlight: true },
        { label: 'CLOSURE & SECURITY:', value: 'Dual Screw-Pin Lock & Safety Hinge' }
      ],
      buttonText: 'Reserve Kadas In Showroom'
    },
    galleryTitle: 'The Bangles & Kadas Gallery'
  },
  earrings: {
    id: 'earrings',
    label: 'Earrings & Studs (360° Live)',
    folder: '/earrings-360',
    totalFrames: 240,
    active360: true,
    specimen: {
      tag: 'FEATURED 360° SPECIMEN',
      name: 'The Mayurakshi Royal Temple Jhumkas',
      price: '₹1,65,000',
      specs: [
        { label: 'PRIMARY MOTIF:', value: 'Peacock Crown & Multi-Tier Jhumka Dome', highlight: true },
        { label: 'GEMSTONES & ACCENTS:', value: 'Natural Burma Rubies & Emerald Cabochons' },
        { label: 'METAL PURITY:', value: '22K Antique Sovereign Gold (BIS 916)', highlight: true },
        { label: 'ARTICULATION & FINISH:', value: 'Hand-Carved Relief & Hanging Gold Ghungroos' }
      ],
      buttonText: 'Reserve Jhumkas In Showroom'
    },
    galleryTitle: 'The Earrings & Studs Gallery'
  }
};

const STUDIO_CATEGORIES = [
  { id: 'rings', label: 'Rings (360° Live)', active360: true },
  { id: 'necklaces', label: 'Necklaces (360° Live)', active360: true },
  { id: 'bangles', label: 'Bangles & Kadas (360° Live)', active360: true },
  { id: 'earrings', label: 'Earrings & Studs (360° Live)', active360: true }
];

export const Ring360Studio: React.FC<MultiCategoryStudioProps> = ({
  onOpenBooking,
  activeCategory = 'rings',
  onSelectPiece
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesCacheRef = useRef<Record<string, HTMLImageElement[]>>({});

  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>(activeCategory || 'rings');
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartXRef = useRef<number>(0);

  useEffect(() => {
    if (activeCategory && (CATEGORY_CONFIGS[activeCategory] || STUDIO_CATEGORIES.some(c => c.id === activeCategory))) {
      setSelectedCategoryTab(activeCategory);
    }
  }, [activeCategory]);
  const startFrameRef = useRef<number>(0);

  const activeConfig = CATEGORY_CONFIGS[selectedCategoryTab];
  const totalFrames = activeConfig?.totalFrames || 240;

  // Preload frames for currently selected category
  useEffect(() => {
    if (!activeConfig) return;

    const currentTab = selectedCategoryTab;
    const folder = activeConfig.folder;
    const count = activeConfig.totalFrames;

    // Check if already cached
    if (imagesCacheRef.current[currentTab] && imagesCacheRef.current[currentTab].length === count) {
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

    for (let i = 0; i < count; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(3, '0');
      img.src = `${folder}/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        const prog = Math.round((loadedCount / count) * 100);
        setLoadProgress(prog);
        if (loadedCount >= count) {
          imagesCacheRef.current[currentTab] = images;
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= count) {
          imagesCacheRef.current[currentTab] = images;
          setIsLoaded(true);
        }
      };

      images.push(img);
    }
  }, [selectedCategoryTab, activeConfig]);

  // Draw frame on canvas with high DPI sharpness
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const currentImages = imagesCacheRef.current[selectedCategoryTab];
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
  }, [zoomLevel, selectedCategoryTab]);

  useEffect(() => {
    if (isLoaded) {
      drawFrame(currentFrame);
    }
  }, [currentFrame, drawFrame, isLoaded]);

  // Turntable 360 Auto-Rotation Loop (Smooth 38ms interval)
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

  // Filter gallery items based on active category
  const filteredGalleryPieces = BRIDAL_COLLECTION.filter((p) => {
    if (selectedCategoryTab === 'necklaces') {
      return (
        p.id.includes('necklace') ||
        p.id.includes('choker') ||
        p.name.toLowerCase().includes('necklace') ||
        p.name.toLowerCase().includes('choker') ||
        p.category === 'Bridal Sets'
      );
    }
    if (selectedCategoryTab === 'bangles') {
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
    if (selectedCategoryTab === 'earrings') {
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
      p.name.toLowerCase().includes('ring')
    );
  });

  return (
    <section id="ring-360" className="py-16 sm:py-24 px-6 sm:px-12 bg-[#0A0706] relative overflow-hidden border-t border-b border-gold-500/20">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-pink-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-500/30 bg-espresso-900/80 backdrop-blur-md mb-3 shadow-gold-glow">
            <Rotate3d className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[10px] tracking-[0.35em] text-champagne-300 uppercase font-mono">
              360° INTERACTIVE JEWELLERY STUDIO
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-white tracking-wide mb-3">
            Explore Collections in 360°
          </h2>
          <p className="font-cormorant italic text-base sm:text-xl text-champagne-200/90 max-w-xl mx-auto leading-relaxed">
            Select a category to view 360° turntable perspectives and artisan creations.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12">
          {STUDIO_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategoryTab(cat.id);
                setIsPlaying(true);
              }}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                selectedCategoryTab === cat.id
                  ? 'bg-gradient-to-r from-gold-500 to-champagne-300 text-espresso-950 font-bold shadow-gold-glow scale-105'
                  : 'bg-espresso-900/70 border border-gold-500/20 text-white/70 hover:text-white hover:border-gold-400/50'
              }`}
            >
              <span>{cat.label}</span>
              {cat.active360 && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />}
            </button>
          ))}
        </div>

        {/* Live 360 Turntable View for Rings & Necklaces */}
        {activeConfig ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center mb-16">
              {/* 360 Canvas Stage */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div
                  ref={containerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className={`relative w-full aspect-square max-w-[400px] sm:max-w-[460px] max-h-[400px] sm:max-h-[460px] rounded-3xl overflow-hidden border border-gold-500/30 bg-[#0F0B09] shadow-[0_20px_50px_rgba(0,0,0,0.85)] select-none transition-all duration-300 ${
                    isDragging ? 'cursor-grabbing border-gold-400' : 'cursor-grab hover:border-gold-400/60'
                  }`}
                >
                  <canvas ref={canvasRef} className="w-full h-full block" />

                  {/* Loading Screen Overlay */}
                  {!isLoaded && (
                    <div className="absolute inset-0 z-30 bg-[#0F0B09] flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-full border border-gold-500/20 border-t-gold-400 animate-spin mb-4" />
                      <p className="font-serif text-sm text-white tracking-widest uppercase mb-2">
                        Loading 360° {selectedCategoryTab === 'necklaces' ? 'Heritage Necklace' : selectedCategoryTab === 'bangles' ? 'Imperial Kadas' : selectedCategoryTab === 'earrings' ? 'Temple Jhumkas & Studs' : 'Solitaire'}
                      </p>
                      <div className="w-44 h-1.5 bg-espresso-800 rounded-full overflow-hidden border border-gold-500/20">
                        <div
                          className="h-full bg-gradient-to-r from-gold-500 to-champagne-300 transition-all duration-200"
                          style={{ width: `${loadProgress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-champagne-300/60 mt-2">{loadProgress}%</span>
                    </div>
                  )}

                  {/* 360° Angle Degree Tracker */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-espresso-950/80 backdrop-blur-md border border-gold-500/30 text-gold-300 text-[10px] font-mono shadow-md">
                    <Compass className="w-3 h-3 text-gold-400 animate-spin-slow" />
                    <span>{currentDegrees}° ANGLE</span>
                  </div>

                  {/* Drag to Rotate Guidance Hint */}
                  <div className="absolute bottom-4 right-4 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/60 border border-white/10">
                    <span>↔ Drag to spin 360°</span>
                  </div>
                </div>

                {/* Turntable Controls Bar */}
                <div className="flex items-center gap-3 mt-4 bg-espresso-950/80 backdrop-blur-md px-5 py-2 rounded-full border border-gold-500/20 shadow-xl">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-full text-champagne-300 hover:text-white transition-colors"
                    title={isPlaying ? 'Pause Rotation' : 'Play 360° Spin'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-gold-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
                  </button>
                  <div className="h-3.5 w-[1px] bg-white/10" />
                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(1, prev - 0.2))}
                    className="p-1.5 text-champagne-300 hover:text-white transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-white/70 min-w-9 text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(1.6, prev + 0.2))}
                    className="p-1.5 text-champagne-300 hover:text-white transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <div className="h-3.5 w-[1px] bg-white/10" />
                  {/* Preset quick jumps */}
                  <button
                    onClick={() => jumpToAngle(0)}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-espresso-900 text-gold-300/80 hover:text-gold-200"
                  >
                    0°
                  </button>
                  <button
                    onClick={() => jumpToAngle(Math.round(totalFrames * 0.25))}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-espresso-900 text-gold-300/80 hover:text-gold-200"
                  >
                    90°
                  </button>
                  <button
                    onClick={() => jumpToAngle(Math.round(totalFrames * 0.5))}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-espresso-900 text-gold-300/80 hover:text-gold-200"
                  >
                    180°
                  </button>
                </div>
              </div>

              {/* Specimen Details Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.35em] text-gold-400 uppercase block mb-1.5">
                    {activeConfig.specimen.tag}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mb-2">
                    {activeConfig.specimen.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-gold-300">
                      {activeConfig.specimen.price}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> In Stock
                    </span>
                  </div>
                </div>

                <div className="bg-espresso-950/80 p-5 sm:p-6 rounded-2xl border border-gold-500/25 space-y-3.5 text-xs font-mono">
                  {activeConfig.specimen.specs.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between ${
                        idx < activeConfig.specimen.specs.length - 1 ? 'border-b border-white/5 pb-2' : ''
                      }`}
                    >
                      <span className="text-white/40">{item.label}</span>
                      <span className={item.highlight ? 'text-gold-300 font-semibold' : 'text-white'}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={onOpenBooking}
                    className="gold-glow-btn px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] text-champagne-100 font-bold flex items-center justify-center gap-2"
                  >
                    <span>{activeConfig.specimen.buttonText}</span> <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Gallery Grid for this Category */}
            <div className="mt-12 pt-10 border-t border-gold-500/20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                  {activeConfig.galleryTitle}
                </h3>
                <span className="text-xs font-mono text-champagne-300/80 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
                  {filteredGalleryPieces.length} Pieces
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredGalleryPieces.map((piece) => (
                  <div
                    key={piece.id}
                    onClick={() => onSelectPiece && onSelectPiece(piece)}
                    className="group bg-espresso-950/80 rounded-2xl border border-gold-500/20 hover:border-gold-400/60 p-4 transition-all cursor-pointer shadow-lg hover:shadow-gold-glow"
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-espresso-900 mb-4 flex items-center justify-center p-3">
                      <img
                        src={piece.image}
                        alt={piece.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h4 className="font-serif text-base text-white truncate">{piece.name}</h4>
                    <p className="text-xs text-white/50 font-light truncate mt-0.5">{piece.gemstone}</p>
                    <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-white/10 mt-2">
                      <span className="text-gold-300 font-bold">{piece.price}</span>
                      <span className="text-white/60 group-hover:text-gold-300 transition-colors">Details →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="py-16 px-8 rounded-3xl bg-espresso-950/60 border border-gold-500/20 text-center max-w-2xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 mx-auto flex items-center justify-center">
              <Rotate3d className="w-7 h-7 animate-spin-slow" />
            </div>
            <h3 className="font-serif text-2xl text-white">360° Turntable Integration Ready</h3>
            <p className="text-xs font-mono text-white/60">
              Select Rings or Necklaces to interact with the live 360° turntable.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setSelectedCategoryTab('rings')}
                className="gold-glow-btn px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest text-champagne-100"
              >
                360° Rings
              </button>
              <button
                onClick={() => setSelectedCategoryTab('necklaces')}
                className="gold-glow-btn px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest text-champagne-100"
              >
                360° Necklaces
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
