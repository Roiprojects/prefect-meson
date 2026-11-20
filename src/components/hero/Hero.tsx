import React, { useRef, useState, useEffect, useCallback } from 'react';
import { HeroCanvas } from './HeroCanvas';
import { CredibilityBadge } from './CredibilityBadge';
import { HeroCTA } from './HeroCTA';
import { useData } from '../../context/DataContext';

interface HeroProps {
  onOpenQuoteModal: () => void;
  onExploreProjects?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuoteModal,
  onExploreProjects,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { settings } = useData();
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Robust Native Scroll Listener for 100% Continuous Sticky Pinning
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
    if (scrollableDistance <= 0) return;

    // Direct progress calculation: 0 when at top of hero, 1 when hero completes
    const currentScroll = -rect.top;
    const clampedProgress = Math.min(1, Math.max(0, currentScroll / scrollableDistance));
    setScrollProgress(clampedProgress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial measure

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Content opacity & translate based on scroll progress
  const contentOpacity =
    scrollProgress < 0.35
      ? 1
      : Math.max(0.1, 1 - (scrollProgress - 0.35) * 2.0);

  const contentTranslateY = scrollProgress * -45;

  return (
    <section
      ref={containerRef}
      id="home"
      className="hero-scroll relative w-full h-[300vh] bg-[#F8FAFC]"
    >
      {/* 1. STICKY FULL-VIEWPORT CONTAINER (Pinned for the full 300vh duration) */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between z-10">
        {/* FULLSCREEN BACKGROUND GPU CANVAS (100vw x 100vh) */}
        <HeroCanvas
          progress={scrollProgress}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* 2. HTML CONTENT LAYER (Upper-Center Viewport) */}
        <div
          style={{
            transform: `translateY(${contentTranslateY}px)`,
            opacity: contentOpacity,
          }}
          className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-24 min-[390px]:pt-28 sm:pt-32 lg:pt-36 text-center flex flex-col items-center space-y-2.5 sm:space-y-4 select-none pointer-events-auto transition-opacity duration-150"
        >
          {/* Credibility Badge */}
          <CredibilityBadge />

          {/* Oversized Editorial Headline */}
          <div className="w-full space-y-0.5 sm:space-y-1">
            <h1 className="font-display text-[1.35rem] min-[360px]:text-[1.5rem] min-[400px]:text-[1.75rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight uppercase text-slate-950 leading-[1.12] sm:leading-[1.02] drop-shadow-xs max-w-4xl mx-auto break-words px-1 sm:px-0">
              {settings?.heroHeadline || 'BUILDING SPACES. CREATING LEGACIES.'}
            </h1>
          </div>

          {/* Professional Supporting Copy */}
          <p className="max-w-xl sm:max-w-2xl mx-auto text-[11.5px] min-[380px]:text-xs sm:text-base md:text-[16.5px] text-slate-700 font-sans leading-relaxed tracking-normal font-medium drop-shadow-xs px-2 sm:px-0 line-clamp-3 sm:line-clamp-none">
            {settings?.heroSubheadline || 'From residential homes to commercial spaces and turnkey projects, Perfect Mason brings together planning, construction, interiors and quality execution under one trusted team.'}
          </p>

          {/* Dual CTA Buttons */}
          <HeroCTA
            onQuoteClick={onOpenQuoteModal}
            onExploreClick={onExploreProjects}
          />
        </div>
      </div>
    </section>
  );
};
