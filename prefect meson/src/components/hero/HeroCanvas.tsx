import React, { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 240;
const frameUrls = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
);

interface HeroCanvasProps {
  progress: number; // 0 to 1
  prefersReducedMotion?: boolean;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({
  progress,
  prefersReducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentRenderedFrameRef = useRef<number>(-1);
  const animatedFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);

  // Compute target frame index (0 to 239)
  useEffect(() => {
    if (prefersReducedMotion) {
      targetFrameRef.current = TOTAL_FRAMES - 1;
    } else {
      const clampedProgress = Math.min(1, Math.max(0, progress));
      targetFrameRef.current = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(clampedProgress * (TOTAL_FRAMES - 1)))
      );
    }
  }, [progress, prefersReducedMotion]);

  // Find nearest decoded frame so canvas is NEVER blank
  const getBestImage = useCallback((targetIndex: number): HTMLImageElement | null => {
    const exact = imagesRef.current[targetIndex];
    if (exact && exact.complete && exact.naturalWidth > 0) return exact;

    for (let i = targetIndex - 1; i >= 0; i--) {
      const prev = imagesRef.current[i];
      if (prev && prev.complete && prev.naturalWidth > 0) return prev;
    }

    for (let i = targetIndex + 1; i < TOTAL_FRAMES; i++) {
      const next = imagesRef.current[i];
      if (next && next.complete && next.naturalWidth > 0) return next;
    }

    return null;
  }, []);

  // Draw current frame with exact 100vw x 100vh cover
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

      // Natural sky blue background fallback
      ctx.fillStyle = '#6DA5DD';
      ctx.fillRect(0, 0, viewportWidth, viewportHeight);

      // Exact 100% COVER calculation
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

  // Preload all 240 frames
  useEffect(() => {
    let isCancelled = false;

    // Load Frame 001 first
    const firstImg = new Image();
    firstImg.src = frameUrls[0];
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      drawFrame(0);
    };

    // Preload remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameUrls[i];
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

  // 60fps animation loop with smooth lerping
  useEffect(() => {
    let animId: number;

    const loop = () => {
      const target = targetFrameRef.current;
      const current = animatedFrameRef.current;

      const diff = target - current;
      if (Math.abs(diff) > 0.01) {
        animatedFrameRef.current += diff * 0.18;
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

  // Window resize observer
  useEffect(() => {
    const handleResize = () => {
      drawFrame(Math.round(animatedFrameRef.current));
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Calculate dynamic mist opacity: 0% opacity until scroll reaches 80%, then smoothly rises to 100%
  const mistOpacity =
    progress < 0.80
      ? 0
      : Math.min(1, Math.pow((progress - 0.80) / 0.20, 1.4));

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-[#6DA5DD]">
      {/* 1. LAYER 1: GPU FRAME CANVAS */}
      <canvas
        ref={canvasRef}
        className="hero-canvas w-full h-full block"
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
        }}
      />

      {/* 2. LAYER 2: SUBTLE DAYLIGHT TOP GRADIENT FOR HIGH CONTRAST */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

      {/* 3. LAYER 3: ATMOSPHERIC WHITE MIST TRANSITION (Appears ONLY at 80% - 100% scroll) */}
      <div
        style={{ opacity: mistOpacity }}
        className="absolute bottom-0 left-0 right-0 h-[45vh] max-h-[480px] flex flex-col justify-end pointer-events-none overflow-hidden transition-opacity duration-150"
      >
        {/* Organic Mist Cloud Layer */}
        <div
          className="absolute inset-x-0 bottom-0 h-52 sm:h-64 opacity-85 bg-repeat-x bg-bottom bg-contain pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: "url('/assets/mist-clouds.png')",
          }}
        />

        {/* Multi-Stop Atmospheric Gradient Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/25 via-white/65 via-white/95 to-white pointer-events-none" />

        {/* Solid Pure White Base Cap */}
        <div className="relative z-10 w-full h-8 bg-white pointer-events-none" />
      </div>
    </div>
  );
};
