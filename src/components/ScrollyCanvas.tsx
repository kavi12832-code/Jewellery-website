import React, { useRef, useEffect, useState, useCallback } from 'react';
import { StoryBeatsOverlay } from './StoryBeatsOverlay';

interface ScrollyCanvasProps {
  onOpenBooking: () => void;
  onOpenShowcase: () => void;
}

const TOTAL_FRAMES = 240;

export const ScrollyCanvas: React.FC<ScrollyCanvasProps> = ({
  onOpenBooking,
  onOpenShowcase
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Loaded images cache
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);

  // Physics / Lerp values for silky buttery motion
  const targetFrameRef = useRef<number>(0);
  const currentInterpolatedFrameRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const autoPlayIntervalRef = useRef<number | null>(null);

  // Format frame filename: ezgif-frame-001.jpg ... ezgif-frame-240.jpg
  const getFrameUrl = (index: number) => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `/sequence/ezgif-frame-${frameNum}.jpg`;
  };

  // Preload all 240 frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Prioritize critical frames first for immediate render
    const priorityIndices = [0, 60, 120, 180, 239];
    priorityIndices.forEach((idx) => {
      const img = new Image();
      img.src = getFrameUrl(idx);
    });

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount++;
        const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadProgress(percent);
        if (loadedCount >= TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  const lastDrawnFrameRef = useRef<number>(-1);

  // Draw current frame to Canvas with clean, highly-optimized composition
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Use optimal resolution cap for buttery smooth 60-120fps performance
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.scale(dpr, dpr);
    }

    // 1. Solid background
    ctx.fillStyle = '#0D0906';
    ctx.fillRect(0, 0, width, height);

    // 2. Background warm luxury aura using user's exact gradient palette (#D6B278 -> #4A331C)
    const focalX = width * 0.55;
    const focalY = height * 0.55;
    const auraGrad = ctx.createRadialGradient(
      focalX,
      focalY,
      10,
      focalX,
      focalY,
      Math.max(width * 0.5, 360)
    );
    auraGrad.addColorStop(0, 'rgba(214, 178, 120, 0.22)');
    auraGrad.addColorStop(0.55, 'rgba(74, 51, 28, 0.1)');
    auraGrad.addColorStop(1, 'rgba(13, 9, 6, 0)');
    ctx.fillStyle = auraGrad;
    ctx.fillRect(0, 0, width, height);

    // 3. Containment sizing
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let renderW = width;
    let renderH = height;
    let renderX = 0;
    let renderY = 0;

    if (canvasRatio > imgRatio) {
      renderH = height;
      renderW = height * imgRatio;
      renderX = (width - renderW) / 2;
      renderY = 0;
    } else {
      renderW = width;
      renderH = width / imgRatio;
      renderX = 0;
      renderY = (height - renderH) / 2;
    }

    // 4. Draw base video frame
    ctx.drawImage(img, renderX, renderY, renderW, renderH);

    // 5. User exact Radial Gradient (#D6B278 0%, #4A331C 100% at 55% 55%) color overlay
    const imgFocalX = renderX + renderW * 0.55;
    const imgFocalY = renderY + renderH * 0.55;
    const gradRadius = Math.max(renderW, renderH) * 0.62;

    const goldNecklaceGrad = ctx.createRadialGradient(
      imgFocalX,
      imgFocalY,
      0,
      imgFocalX,
      imgFocalY,
      gradRadius
    );
    goldNecklaceGrad.addColorStop(0, 'rgba(214, 178, 120, 0.42)');
    goldNecklaceGrad.addColorStop(1, 'rgba(74, 51, 28, 0.42)');

    ctx.save();
    ctx.globalCompositeOperation = 'color';
    ctx.fillStyle = goldNecklaceGrad;
    ctx.fillRect(renderX, renderY, renderW, renderH);
    ctx.restore();

    // 6. Linear Edge Feathering: Clean merge into #0D0906 without heavy software blur
    const featherX = Math.min(renderW * 0.12, 70);
    const featherY = Math.min(renderH * 0.12, 70);

    // Top
    const topGrad = ctx.createLinearGradient(0, renderY, 0, renderY + featherY);
    topGrad.addColorStop(0, '#0D0906');
    topGrad.addColorStop(1, 'rgba(13, 9, 6, 0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(renderX - 1, renderY - 1, renderW + 2, featherY + 1);

    // Bottom
    const botGrad = ctx.createLinearGradient(0, renderY + renderH - featherY, 0, renderY + renderH);
    botGrad.addColorStop(0, 'rgba(13, 9, 6, 0)');
    botGrad.addColorStop(1, '#0D0906');
    ctx.fillStyle = botGrad;
    ctx.fillRect(renderX - 1, renderY + renderH - featherY, renderW + 2, featherY + 1);

    // Left
    const leftGrad = ctx.createLinearGradient(renderX, 0, renderX + featherX, 0);
    leftGrad.addColorStop(0, '#0D0906');
    leftGrad.addColorStop(1, 'rgba(13, 9, 6, 0)');
    ctx.fillStyle = leftGrad;
    ctx.fillRect(renderX - 1, renderY - 1, featherX + 1, renderH + 2);

    // Right
    const rightGrad = ctx.createLinearGradient(renderX + renderW - featherX, 0, renderX + renderW, 0);
    rightGrad.addColorStop(0, 'rgba(13, 9, 6, 0)');
    rightGrad.addColorStop(1, '#0D0906');
    ctx.fillStyle = rightGrad;
    ctx.fillRect(renderX + renderW - featherX, renderY - 1, featherX + 1, renderH + 2);

    lastDrawnFrameRef.current = frameIdx;
  }, []);

  // Smooth frame loop using Lerp with sleep when at rest
  useEffect(() => {
    let active = true;

    const loop = () => {
      if (!active) return;

      const diff = targetFrameRef.current - currentInterpolatedFrameRef.current;
      const lerpFactor = 0.18;
      
      if (Math.abs(diff) > 0.04) {
        currentInterpolatedFrameRef.current += diff * lerpFactor;
      } else {
        currentInterpolatedFrameRef.current = targetFrameRef.current;
      }

      const safeIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentInterpolatedFrameRef.current)));
      
      if (safeIdx !== lastDrawnFrameRef.current) {
        setCurrentFrameIndex(safeIdx);
        drawFrame(safeIdx);
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [drawFrame]);

  // Scroll listener mapped to 0 -> 1 progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isPlayingAuto) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;

      if (scrollableHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      setScrollProgress(progress);

      const targetFrame = Math.round(progress * (TOTAL_FRAMES - 1));
      targetFrameRef.current = targetFrame;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlayingAuto]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      drawFrame(Math.round(currentInterpolatedFrameRef.current));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Jump to specific chapter progress
  const jumpToProgress = (prog: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollableHeight = rect.height - window.innerHeight;
    const targetScrollY = containerTop + prog * scrollableHeight;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  // Auto-play mode toggle
  const toggleAutoPlay = () => {
    if (isPlayingAuto) {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
      setIsPlayingAuto(false);
    } else {
      setIsPlayingAuto(true);
      autoPlayIntervalRef.current = window.setInterval(() => {
        targetFrameRef.current = (targetFrameRef.current + 1) % TOTAL_FRAMES;
        setScrollProgress(targetFrameRef.current / (TOTAL_FRAMES - 1));
      }, 33); // ~30fps smooth playback
    }
  };

  return (
    <div
      ref={containerRef}
      id="experience"
      className="relative w-full bg-[#0D0906]"
      style={{ height: '480vh' }}
    >
      {/* Sticky Fullscreen Canvas Wrapper */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#0D0906] flex items-center justify-center">
        {/* HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block touch-none select-none bg-[#0D0906]"
        />

        {/* Seamless Soft Edge Vignette & Ambient Radial Mask Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(13,9,6,0.25)_80%,#0D0906_98%)]" />
        <div className="pointer-events-none absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0D0906] via-[#0D0906]/50 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0D0906] via-[#0D0906]/50 to-transparent" />

        {/* Preloader Screen */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 bg-[#0D0906] flex flex-col items-center justify-center p-6 text-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full border border-gold-500/20 border-t-gold-400 animate-spin" />
            </div>
            
            <h3 className="font-serif tracking-[0.25em] uppercase text-xl text-white mb-2 font-light">
              Bizjewellery
            </h3>
            
            <p className="font-cormorant italic text-base text-champagne-200/80 mb-4 tracking-wider">
              Loading our finest pieces...
            </p>

            <div className="w-48 h-1 bg-espresso-800 rounded-full overflow-hidden border border-gold-500/20">
              <div
                className="h-full bg-gradient-to-r from-gold-500 via-champagne-300 to-gold-400 transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            
            <span className="text-[10px] font-mono text-gold-400/80 tracking-widest mt-3">
              {loadProgress}% LOADED · 240 ATELIER FRAMES
            </span>
          </div>
        )}

        {/* Synchronized Editorial Story Beats Overlay */}
        <StoryBeatsOverlay
          progress={scrollProgress}
          onOpenBooking={onOpenBooking}
          onOpenShowcase={onOpenShowcase}
          onSelectChapter={jumpToProgress}
        />
      </div>
    </div>
  );
};
