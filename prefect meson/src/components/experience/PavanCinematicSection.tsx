import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const TOTAL_FRAMES = 240;

// Natural numerical order frame URLs directly from PAVAN source
const pavanFrameUrls = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/pavan/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
);

interface PavanCinematicSectionProps {
  onExploreProjects?: () => void;
}

export const PavanCinematicSection: React.FC<PavanCinematicSectionProps> = ({
  onExploreProjects,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentRenderedFrameRef = useRef<number>(-1);
  const animatedFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);

  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // 1. Precise Scroll Progress Calculation (0 to 1)
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
    if (scrollableDistance <= 0) return;

    const currentScroll = -rect.top;
    const clampedProgress = Math.min(1, Math.max(0, currentScroll / scrollableDistance));
    setScrollProgress(clampedProgress);

    // Map scroll progress to target frame index (0 to 239)
    targetFrameRef.current = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(clampedProgress * (TOTAL_FRAMES - 1)))
    );
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 2. Nearest Decoded Frame Lookup to guarantee zero blank frames
  const getBestImage = useCallback((targetIndex: number): HTMLImageElement | null => {
    const exact = imagesRef.current[targetIndex];
    if (exact && exact.complete && exact.naturalWidth > 0) return exact;

    // Search backward
    for (let i = targetIndex - 1; i >= 0; i--) {
      const prev = imagesRef.current[i];
      if (prev && prev.complete && prev.naturalWidth > 0) return prev;
    }

    // Search forward
    for (let i = targetIndex + 1; i < TOTAL_FRAMES; i++) {
      const next = imagesRef.current[i];
      if (next && next.complete && next.naturalWidth > 0) return next;
    }

    return null;
  }, []);

  // 3. Exact 100vw x 100vh Fullscreen Cover Render with Pixel-Perfect Alignment
  const drawFrame = useCallback(
    (frameIdx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const img = getBestImage(frameIdx);
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (canvas.width !== viewportWidth * dpr || canvas.height !== viewportHeight * dpr) {
        canvas.width = viewportWidth * dpr;
        canvas.height = viewportHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Base background color
      ctx.fillStyle = '#1456D8';
      ctx.fillRect(0, 0, viewportWidth, viewportHeight);

      // Math.max Cover Scale Calculation
      const imageWidth = img.naturalWidth;
      const imageHeight = img.naturalHeight;
      const scale = Math.max(viewportWidth / imageWidth, viewportHeight / imageHeight);
      const renderWidth = imageWidth * scale;
      const renderHeight = imageHeight * scale;

      const offsetX = (viewportWidth - renderWidth) / 2;
      const offsetY = (viewportHeight - renderHeight) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
      ctx.restore();

      currentRenderedFrameRef.current = frameIdx;
    },
    [getBestImage]
  );

  // 4. Preload all 240 PAVAN frames in natural numerical order
  useEffect(() => {
    let isCancelled = false;

    // Load Frame 001 immediately
    const firstImg = new Image();
    firstImg.src = pavanFrameUrls[0];
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      drawFrame(0);
    };

    // Preload remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = pavanFrameUrls[i];
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[i] = img;

        if (Math.round(animatedFrameRef.current) === i) {
          drawFrame(i);
        }
      };
    }

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // 5. 60fps requestAnimationFrame Smooth Cinematic Lerp Loop
  useEffect(() => {
    let animId: number;

    const loop = () => {
      const target = targetFrameRef.current;
      const current = animatedFrameRef.current;

      const diff = target - current;
      if (Math.abs(diff) > 0.01) {
        animatedFrameRef.current += diff * 0.16; // Smooth cinematic ease
      } else {
        animatedFrameRef.current = target;
      }

      const frameToRender = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(animatedFrameRef.current))
      );

      if (frameToRender !== currentRenderedFrameRef.current) {
        drawFrame(frameToRender);
      }

      animId = window.requestAnimationFrame(loop);
    };

    animId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(animId);
    };
  }, [drawFrame]);

  // 6. Window Resize Observer
  useEffect(() => {
    const handleResize = () => {
      drawFrame(Math.round(animatedFrameRef.current));
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Content overlay fade based on scroll progress
  const contentOpacity =
    scrollProgress < 0.25
      ? 1
      : Math.max(0, 1 - (scrollProgress - 0.25) * 3.0);

  const contentTranslateY = scrollProgress * -50;

  return (
    <section
      ref={containerRef}
      id="experience"
      className="pavan-cinematic-section relative w-full h-[320vh] bg-slate-950 select-none z-20"
    >
      {/* Pinned Sticky 100vw x 100vh Fullscreen Stage */}
      <div className="pavan-sticky-stage sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Fullscreen 100vw x 100vh HTML Canvas */}
        <canvas
          ref={canvasRef}
          className="pavan-frame-canvas absolute inset-0 w-full h-full block pointer-events-none"
          style={{
            width: '100vw',
            height: '100vh',
            display: 'block',
          }}
        />

        {/* Ambient Top & Bottom Contrast Gradients */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

        {/* ============================================================ */}
        {/* HTML CONTENT OVERLAY (Separate Clean Layer)                  */}
        {/* ============================================================ */}
        <div
          style={{
            transform: `translateY(${contentTranslateY}px)`,
            opacity: contentOpacity,
          }}
          className="section-content relative z-20 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 sm:pt-36 text-center flex flex-col items-center pointer-events-auto transition-opacity duration-150"
        >
          {/* Section Label */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-1000 ring-4 ring-royal-400/30" />
              <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950 animate-ping" />
            </div>

            <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.28em] text-white font-bold flex items-center gap-2 drop-shadow-md">
              PROJECT EXPERIENCE
              <Sparkles className="w-3.5 h-3.5 text-slate-400 animate-pulse" />
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold text-white uppercase tracking-tight leading-[1.05] drop-shadow-lg mb-5">
            <span className="block">Built from structure</span>
            <span className="block text-slate-400">to the final detail.</span>
          </h2>

          {/* Supporting Text */}
          <p className="max-w-2xl text-base sm:text-lg text-slate-200 font-sans leading-relaxed font-normal drop-shadow-md mb-8">
            Perfect Mason brings construction, coordination and interior execution together to deliver complete project experiences.
          </p>

          {/* CTA Button */}
          {onExploreProjects && (
            <button
              type="button"
              onClick={onExploreProjects}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-950 hover:bg-black active:bg-royal-800 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-cta-glow hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-400"
            >
              <span>EXPLORE PROJECTS</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}
        </div>

        {/* Subtle Bottom Scroll Hint */}
        <div className="relative z-20 px-6 py-6 flex items-center justify-center pointer-events-none">
          <div
            style={{ opacity: contentOpacity }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/15 text-slate-300 text-xs font-mono"
          >
            <span>Scroll to experience construction progression</span>
            <span className="text-slate-400 font-bold animate-bounce">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};
