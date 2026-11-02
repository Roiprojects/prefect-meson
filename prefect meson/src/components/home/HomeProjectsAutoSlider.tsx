import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Maximize2,
  X,
  ArrowRight,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface HomeProjectsAutoSliderProps {
  onOpenQuoteModal?: () => void;
}

export const HomeProjectsAutoSlider: React.FC<HomeProjectsAutoSliderProps> = ({
  onOpenQuoteModal,
}) => {
  const navigate = useNavigate();
  const { homeShowcaseSlides, projects } = useData();

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Collect the project images that were added to the site
  const projectImagesList = useMemo(() => {
    // 1. If admin customized homeShowcaseSlides, use active items
    const customActive = homeShowcaseSlides
      .filter((s) => s.active !== false && Boolean(s.image))
      .map((s) => s.image);

    if (customActive.length > 0) {
      return customActive;
    }

    // 2. Fallback to images from added projects in the gallery
    if (projects && projects.length > 0) {
      return projects.map((p) => p.image).filter(Boolean);
    }

    return [];
  }, [homeShowcaseSlides, projects]);

  // Duplicate images for a seamless, continuous infinite loop
  const displayImages = useMemo(() => {
    if (projectImagesList.length === 0) return [];
    if (projectImagesList.length < 8) {
      return [...projectImagesList, ...projectImagesList, ...projectImagesList];
    }
    return [...projectImagesList, ...projectImagesList];
  }, [projectImagesList]);

  // Smooth continuous auto-sliding ticker
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const speed = 0.7; // Pixels per frame (~42px/sec at 60fps)

    const step = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (isPlaying && !isHovered && scrollContainer) {
        const factor = Math.min(deltaTime / 16.67, 2.5);
        scrollContainer.scrollLeft += speed * factor;

        // Loop reset when reaching half scrollWidth
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft -= maxScroll;
        }
      }

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, isHovered, displayImages.length]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollAmount = 480;
    scrollContainer.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative w-full py-16 sm:py-22 bg-[#FAFAF9] text-slate-900 overflow-hidden border-t border-b border-slate-200/80 font-sans">
      {/* Subtle Architectural Drafting Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-60 pointer-events-none" />

      {/* Soft Ambient Radiance */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-10">
        {/* Section Header (No category badges, pure architectural framing) */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-3xl">
            {/* Elegant Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-200/90 text-[#936B2B] text-xs font-mono uppercase tracking-widest font-bold mb-3.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#936B2B]" />
              ARCHITECTURAL ARCHIVE • LIVE SHOWCASE
            </div>

            {/* Primary Section Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-barlow tracking-tight text-slate-900 uppercase leading-[1.1]">
              Architectural Masterworks{' '}
              <span className="text-[#936B2B]">In Motion</span>
            </h2>

            {/* Section Description */}
            <p className="mt-3.5 text-sm sm:text-base lg:text-lg text-slate-600 font-sans leading-relaxed">
              A continuous, high-definition visual showcase of our built structures and
              architectural executions across Karnataka.
            </p>
          </div>

          {/* Minimalist Controls */}
          <div className="flex items-center gap-2.5 self-start lg:self-end">
            {/* Play / Pause Toggle */}
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              title={isPlaying ? 'Pause auto-sliding' : 'Resume auto-sliding'}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-mono tracking-wider text-slate-700 hover:text-slate-950 shadow-2xs transition-all duration-200"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#936B2B]" />
                  <span className="hidden sm:inline font-semibold">PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#936B2B] fill-[#936B2B]" />
                  <span className="hidden sm:inline font-semibold">PLAY</span>
                </>
              )}
            </button>

            {/* Scroll Left Button */}
            <button
              onClick={() => handleManualScroll('left')}
              title="Previous slide"
              className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-950 shadow-2xs transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scroll Right Button */}
            <button
              onClick={() => handleManualScroll('right')}
              title="Next slide"
              className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-950 shadow-2xs transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* View Full Gallery Button */}
            <button
              onClick={() => navigate('/gallery')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-sm"
            >
              <span className="hidden sm:inline">Explore Full</span> Archive
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Auto-Sliding Project Images Marquee Track (Pure Edge-to-Edge Images, No Names, No Badges) */}
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none px-4 sm:px-8 py-3 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollBehavior: 'auto' }}
      >
        {displayImages.map((imageUrl, idx) => (
          <div
            key={`${imageUrl}-${idx}`}
            onClick={() => setSelectedImage(imageUrl)}
            className="group relative flex-shrink-0 w-[300px] sm:w-[420px] lg:w-[480px] h-[220px] sm:h-[280px] lg:h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/90 hover:border-amber-400/90 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_-8px_rgba(0,0,0,0.14)] transition-all duration-500 cursor-pointer"
          >
            {/* Pure Architectural Project Image (Edge-to-Edge, Sharp, Full Daylight) */}
            <img
              src={imageUrl}
              alt="Architectural Project Execution"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[1.01] contrast-[1.01]"
              loading="lazy"
            />

            {/* Subtle Hover Glow Frame */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />

            {/* Floating Expand Icon on Hover */}
            <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md text-slate-800">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Pure High-Definition Lightbox Modal (No forced names or badges) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 p-3 sm:p-4 flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-white/95 hover:bg-white text-slate-700 border border-slate-200 shadow-md transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Full Image */}
              <div className="w-full max-h-[75vh] overflow-hidden rounded-2xl bg-slate-100 flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Architectural Project"
                  className="w-full h-full object-contain max-h-[75vh]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 px-2">
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    if (onOpenQuoteModal) onOpenQuoteModal();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm"
                >
                  Inquire About Similar Execution
                </button>

                <button
                  onClick={() => {
                    setSelectedImage(null);
                    navigate('/gallery');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs uppercase tracking-wider transition-all duration-200 border border-slate-200"
                >
                  Explore Complete Portfolio Archive
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
