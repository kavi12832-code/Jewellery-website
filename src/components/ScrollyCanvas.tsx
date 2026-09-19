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

  const lastDrawnFrameRef = useRef<number>(-1);

  // Helper to get exact frame or closest available loaded frame
  const getRenderImage = useCallback((targetIdx: number): HTMLImageElement | null => {
    const direct = imagesRef.current[targetIdx];
    if (direct && direct.complete && direct.naturalWidth > 0) return direct;

    // Search outward for closest loaded frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const left = targetIdx - offset;
      if (left >= 0) {
        const imgL = imagesRef.current[left];
        if (imgL && imgL.complete && imgL.naturalWidth > 0) return imgL;
      }
      const right = targetIdx + offset;
      if (right < TOTAL_FRAMES) {
        const imgR = imagesRef.current[right];
        if (imgR && imgR.complete && imgR.naturalWidth > 0) return imgR;
      }
    }
    return null;
  }, []);

  // Progressive Preloading Strategy: Instant Hero Display + Background Streaming
  useEffect(() => {
    let active = true;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    let loadedCount = 0;

    const onSingleImageLoad = () => {
      if (!active) return;
      loadedCount++;
      const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      setLoadProgress(percent);
    };

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (!active || images[index]) {
          resolve();
          return;
        }
        const img = new Image();
        img.src = getFrameUrl(index);
        images[index] = img;
        img.onload = () => {
          onSingleImageLoad();
          resolve();
        };
        img.onerror = () => {
          onSingleImageLoad();
          resolve();
        };
      });
    };

    // Step 1: Load Frame 0 (Hero frame) first for instant initial display
    loadImage(0).then(() => {
      if (!active) return;
      setIsLoaded(true); // Dismiss blocking screen in under 50-80ms!

      // Step 2: Load key milestone angles across the 240 frames (every 8th frame)
      const milestoneIndices: number[] = [];
      for (let i = 8; i < TOTAL_FRAMES; i += 8) {
        milestoneIndices.push(i);
      }
      if (!milestoneIndices.includes(TOTAL_FRAMES - 1)) {
        milestoneIndices.push(TOTAL_FRAMES - 1);
      }

      Promise.all(milestoneIndices.map((idx) => loadImage(idx))).then(() => {
        if (!active) return;

        // Step 3: Stream the remaining frames in small batches so network is never choked
        const remainingIndices: number[] = [];
        for (let i = 0; i < TOTAL_FRAMES; i++) {
          if (!images[i]) {
            remainingIndices.push(i);
          }
        }

        let currentBatch = 0;
        const batchSize = 8;

        const loadNextBatch = () => {
          if (!active || currentBatch >= remainingIndices.length) return;
          const batch = remainingIndices.slice(currentBatch, currentBatch + batchSize);
          currentBatch += batchSize;
          Promise.all(batch.map((idx) => loadImage(idx))).then(() => {
            if (active && currentBatch < remainingIndices.length) {
              setTimeout(loadNextBatch, 35);
            }
          });
        };

        loadNextBatch();
      });
    });

    // Fallback: Ensure preloader is dismissed within 150ms even on slow mobile networks
    const fallbackTimer = setTimeout(() => {
      if (active) {
        setIsLoaded(true);
      }
    }, 150);

    return () => {
      active = false;
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Draw current frame to Canvas with clean, highly-optimized composition
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = getRenderImage(frameIdx);
    if (!img) return;

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
      className="relative w-full bg-[#0D0906] h-[240vh] md:h-[440vh]"
    >
      {/* Sticky Fullscreen Canvas Wrapper */}
      <div className="sticky top-0 left-0 w-full h-[100dvh] min-h-screen overflow-hidden bg-[#0D0906] flex items-center justify-center">
        {/* HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block pointer-events-none select-none bg-[#0D0906]"
        />

        {/* Seamless Soft Edge Vignette & Ambient Radial Mask Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(13,9,6,0.25)_80%,#0D0906_98%)]" />
        <div className="pointer-events-none absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0D0906] via-[#0D0906]/50 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0D0906] via-[#0D0906]/50 to-transparent" />

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
