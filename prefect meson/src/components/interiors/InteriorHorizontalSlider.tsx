import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { InteriorScene, interiorsConfig } from '../../data/interiorsData';
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  MapPin,
  Sparkles,
  Layers,
  ArrowUpRight,
  Compass,
  Maximize2,
  Home,
  CheckCircle2,
} from 'lucide-react';

interface InteriorHorizontalSliderProps {
  onOpenInteriorModal?: (scene: InteriorScene) => void;
}

const AUTOPLAY_INTERVAL = 6000; // 6 seconds per slide

export const InteriorHorizontalSlider: React.FC<InteriorHorizontalSliderProps> = ({
  onOpenInteriorModal,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const scenes = interiorsConfig.scenes;
  const numScenes = scenes.length;

  // Next & Prev Handlers
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % numScenes);
    setProgress(0);
  }, [numScenes]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + numScenes) % numScenes);
    setProgress(0);
  }, [numScenes]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    setProgress(0);
  };

  // High-Precision Automated Progress Timer
  useEffect(() => {
    if (isPaused || isHovered) return;

    const intervalTime = 40;
    const step = (intervalTime / AUTOPLAY_INTERVAL) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, isHovered, nextSlide]);

  // Touch Swipe Handlers for Mobile & Tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartXRef.current = null;
  };

  /**
   * Helper to compute relative circular offset from active slide (-1, 0, 1, etc.)
   */
  const getCardOffset = (index: number) => {
    let diff = index - currentIndex;
    if (diff > numScenes / 2) diff -= numScenes;
    if (diff < -numScenes / 2) diff += numScenes;
    return diff;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white text-slate-900 pb-16 select-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ============================================================ */}
      {/* 1. TOP INTERIOR INTRO & INTEGRATED HUD CONTROLS              */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-14 sm:pt-20 pb-8 sm:pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
          {/* Left: Eyebrow + Large Headline */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-4 ring-slate-200/80" />
                <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950 animate-ping" />
              </div>

              <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.28em] text-slate-800 font-bold flex items-center gap-2">
                {interiorsConfig.intro.eyebrow}
                <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-950 uppercase tracking-tight leading-[1.06]">
              <span className="block text-slate-950">{interiorsConfig.intro.headline.line1}</span>
              <span className="block text-slate-950">{interiorsConfig.intro.headline.line2}</span>
            </h2>
          </div>

          {/* Right: Supporting Paragraph + HUD Controls */}
          <div className="flex flex-col items-start lg:items-end gap-5">
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-md lg:text-right font-normal">
              {interiorsConfig.intro.description}
            </p>

            {/* Slider Navigation Buttons + Circular Progress HUD */}
            <div className="flex items-center gap-4 pt-2">
              {/* Circular Countdown Progress Ring */}
              <div className="relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-100/90 border border-slate-200 shadow-xs">
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <svg className="w-5 h-5 -rotate-90" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-slate-300"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeDasharray={56.54}
                      strokeDashoffset={56.54 - (56.54 * progress) / 100}
                      className="text-slate-950 transition-all duration-75 ease-linear"
                    />
                  </svg>
                </div>

                <div className="font-mono text-xs font-bold text-slate-900 flex items-center">
                  <span className="text-slate-950">0{currentIndex + 1}</span>
                  <span className="text-slate-400 mx-1.5">/</span>
                  <span className="text-slate-500">0{numScenes}</span>
                </div>
              </div>

              {/* Pause/Play Button */}
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                title={isPaused ? 'Resume Auto-Slide' : 'Pause Auto-Slide'}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
              >
                {isPaused ? <Play className="w-4 h-4 ml-0.5" /> : <Pause className="w-4 h-4" />}
              </button>

              {/* Previous Arrow */}
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Interior Scene"
                className="w-11 h-11 rounded-full bg-white hover:bg-slate-950 text-slate-800 hover:text-white border border-slate-200 hover:border-slate-950 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Next Arrow */}
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Interior Scene"
                className="w-11 h-11 rounded-full bg-slate-950 hover:bg-black text-white shadow-md hover:shadow-cta-glow flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Execution Capabilities Row */}
        <div className="pt-6 border-t border-slate-100 flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 font-bold mr-2">
            CAPABILITIES:
          </span>
          {interiorsConfig.intro.capabilities.map((capability) => (
            <span
              key={capability}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-slate-700 font-sans text-xs font-medium hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 transition-colors"
            >
              <CheckCircle2 className="w-3 h-3 text-slate-950" />
              <span>{capability}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. ULTRA-ADVANCED 3D KINETIC MULTI-PANEL CAROUSEL STAGE       */}
      {/* ============================================================ */}
      <div className="relative w-full h-[580px] sm:h-[660px] lg:h-[720px] overflow-hidden flex items-center justify-center [perspective:1800px]">
        <div className="relative w-full h-full max-w-[1500px] flex items-center justify-center">
          {scenes.map((scene, idx) => {
            const offset = getCardOffset(idx);
            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isHidden = Math.abs(offset) > 1;

            if (isHidden) return null;

            // 3D Matrix Calculation
            let translateX = '0%';
            let scale = 1;
            let rotateY = 0;
            let zIndex = 20;
            let opacity = 1;
            let filter = 'blur(0px) brightness(100%)';

            if (isCenter) {
              translateX = '0%';
              scale = 1;
              rotateY = 0;
              zIndex = 30;
              opacity = 1;
              filter = 'blur(0px) brightness(100%)';
            } else if (isLeft) {
              translateX = '-68%';
              scale = 0.82;
              rotateY = 16;
              zIndex = 10;
              opacity = 0.55;
              filter = 'blur(1.5px) brightness(75%)';
            } else if (isRight) {
              translateX = '68%';
              scale = 0.82;
              rotateY = -16;
              zIndex = 10;
              opacity = 0.55;
              filter = 'blur(1.5px) brightness(75%)';
            }

            return (
              <motion.div
                key={scene.id}
                animate={{
                  x: translateX,
                  scale,
                  rotateY,
                  opacity,
                  filter,
                  zIndex,
                }}
                transition={{
                  duration: 0.95,
                  ease: [0.16, 1, 0.3, 1], // Quintic luxury easing
                }}
                onClick={() => {
                  if (!isCenter) {
                    goToSlide(idx);
                  } else {
                    onOpenInteriorModal?.(scene);
                  }
                }}
                className={`absolute top-0 w-[88vw] sm:w-[78vw] lg:w-[68vw] max-w-[1100px] h-full rounded-[36px] sm:rounded-[44px] overflow-hidden shadow-2xl cursor-pointer group [transform-style:preserve-3d] ${
                  isCenter ? 'ring-1 ring-slate-900/10' : 'hover:opacity-80'
                }`}
              >
                {/* 1. Full-Bleed 8K Interior Photography */}
                <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950">
                  <motion.img
                    src={scene.image}
                    alt={scene.title}
                    animate={{
                      scale: isCenter ? 1.05 : 1.15,
                    }}
                    transition={{
                      duration: isCenter ? 6.0 : 0.8,
                      ease: isCenter ? 'linear' : [0.16, 1, 0.3, 1],
                    }}
                    className="w-full h-full object-cover object-center will-change-transform group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Contrast Ambient Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950/50 via-transparent to-transparent pointer-events-none" />

                  {/* Top Holographic Tag */}
                  <div className="absolute top-6 left-6 sm:left-8 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/15 text-white/90 font-mono text-[10.5px] uppercase tracking-widest pointer-events-none">
                    <Compass className="w-3.5 h-3.5 text-slate-400 animate-spin-slow" />
                    <span>PERFECT MASON // INTERIORS 0{idx + 1}</span>
                  </div>

                  {/* Top Right Expand Icon */}
                  {isCenter && (
                    <div className="absolute top-6 right-6 sm:right-8 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 pointer-events-none">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* 2. Sleek Kinetic Bottom Caption Bar */}
                <div className="absolute inset-x-0 bottom-0 z-30 pb-7 sm:pb-9 px-6 sm:px-10 flex flex-col sm:flex-row sm:items-end justify-between gap-5 pointer-events-auto">
                  <div className="overflow-hidden">
                    {/* Category & Status Badges */}
                    <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
                      <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                        <Home className="w-3.5 h-3.5 text-slate-950" />
                        {scene.number} // {scene.category}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-slate-950/95 backdrop-blur-md text-white font-mono text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        TURNKEY INTERIORS
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight leading-tight drop-shadow-md group-hover:text-slate-300 transition-colors duration-300">
                      {scene.title}
                    </h3>

                    {/* Location & Specs */}
                    <div className="flex items-center gap-3.5 text-xs sm:text-sm font-sans text-slate-200 font-medium mt-1.5">
                      <span className="inline-flex items-center gap-1.5 text-slate-100">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {scene.location}
                      </span>
                      {scene.areaSqFt && (
                        <>
                          <span className="text-white/40">•</span>
                          <span className="inline-flex items-center gap-1.5 text-orange-400">
                            <Layers className="w-3.5 h-3.5" />
                            {scene.areaSqFt}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* View Details Action Button */}
                  {isCenter && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenInteriorModal?.(scene);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-950 text-slate-900 hover:text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-cta-glow hover:scale-105 active:scale-95 self-start sm:self-auto shrink-0"
                    >
                      <span>VIEW SPECIFICATION</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. EXPANDING KINETIC THUMBNAIL NAVIGATION STRIP              */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mt-8 flex items-center justify-center gap-3.5 flex-wrap">
        {scenes.map((sc, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={sc.id}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to interior scene ${sc.number}: ${sc.title}`}
              className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-500 ease-out focus:outline-none ${
                isActive
                  ? 'bg-slate-100 border-2 border-slate-950 shadow-md scale-105'
                  : 'bg-slate-50 border border-slate-200/80 hover:bg-slate-100 text-slate-500 hover:scale-100'
              }`}
            >
              {/* Micro Thumbnail with Zoom on Active */}
              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-slate-200 relative">
                <img
                  src={sc.image}
                  alt={sc.title}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isActive ? 'scale-125' : 'group-hover:scale-110'
                  }`}
                />
                {isActive && (
                  <div className="absolute inset-0 bg-slate-950/15 ring-2 ring-inset ring-slate-950 rounded-lg" />
                )}
              </div>

              {/* Text info (visible on desktop) */}
              <div className="hidden sm:flex flex-col text-left">
                <span
                  className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                    isActive ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  0{idx + 1} // {sc.category}
                </span>
                <span
                  className={`font-sans text-xs font-semibold truncate max-w-[140px] ${
                    isActive ? 'text-slate-950' : 'text-slate-600'
                  }`}
                >
                  {sc.title}
                </span>
              </div>

              {/* Mobile Active Dot */}
              <span
                className={`sm:hidden w-2 h-2 rounded-full transition-colors duration-300 ${
                  isActive ? 'bg-slate-950 ring-2 ring-slate-300' : 'bg-slate-300'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
