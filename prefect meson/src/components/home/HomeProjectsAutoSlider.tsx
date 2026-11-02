import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  MapPin,
  Building2,
  Clock,
  Sparkles,
  Maximize2,
  X,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { useData, HomeShowcaseSlide } from '../../context/DataContext';

interface HomeProjectsAutoSliderProps {
  onOpenQuoteModal?: () => void;
}

export const HomeProjectsAutoSlider: React.FC<HomeProjectsAutoSliderProps> = ({
  onOpenQuoteModal,
}) => {
  const navigate = useNavigate();
  const { homeShowcaseSlides } = useData();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedSlide, setSelectedSlide] = useState<HomeShowcaseSlide | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Filter active slides
  const activeSlides = useMemo(() => {
    const list = homeShowcaseSlides.filter((s) => s.active !== false);
    if (selectedCategory === 'All') return list;
    return list.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [homeShowcaseSlides, selectedCategory]);

  // Duplicate slides for seamless infinite loop when enough slides exist
  const displaySlides = useMemo(() => {
    if (activeSlides.length === 0) return [];
    if (activeSlides.length < 6) {
      return [...activeSlides, ...activeSlides, ...activeSlides];
    }
    return [...activeSlides, ...activeSlides];
  }, [activeSlides]);

  const categories = ['All', 'Residential', 'Commercial', 'Turnkey', 'Interiors'];

  // Smooth continuous auto-sliding ticker
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const speed = 0.65; // Pixels per frame (~40px/sec at 60fps)

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
  }, [isPlaying, isHovered, displaySlides.length]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollAmount = 460;
    scrollContainer.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const getCategoryDotColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'residential':
        return 'bg-amber-500';
      case 'commercial':
        return 'bg-blue-600';
      case 'turnkey':
        return 'bg-emerald-600';
      case 'interiors':
        return 'bg-purple-600';
      default:
        return 'bg-slate-700';
    }
  };

  return (
    <section className="relative w-full py-18 sm:py-24 bg-[#FAFAF9] text-slate-900 overflow-hidden border-t border-b border-slate-200/80 font-sans">
      {/* Subtle Architectural Grid Texture */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-60 pointer-events-none"
      />

      {/* Soft Ambient Radiance */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-3xl">
            {/* Elegant Light-Theme Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-200/90 text-[#936B2B] text-xs font-mono uppercase tracking-widest font-bold mb-3.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#936B2B]" />
              CURATED ARCHITECTURAL PORTFOLIO
            </div>

            {/* Primary Section Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-barlow tracking-tight text-slate-900 uppercase leading-[1.1]">
              Architectural Masterworks{' '}
              <span className="text-[#936B2B]">
                In Motion
              </span>
            </h2>

            {/* Section Description */}
            <p className="mt-3.5 text-sm sm:text-base lg:text-lg text-slate-600 font-sans leading-relaxed">
              A continuous, high-definition showcase of luxury residential estates, commercial
              headquarters, and turnkey environments executed with exacting structural precision
              and unyielding craftsmanship across Karnataka.
            </p>
          </div>

          {/* Interactive Navigation Controls (Clean Light Styling) */}
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

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-2 mt-7 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 whitespace-nowrap border ${
                  isSelected
                    ? 'bg-slate-900 text-white font-bold border-slate-900 shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {cat === 'All' ? 'All Disciplines' : cat}
              </button>
            );
          })}
          <div className="ml-auto text-xs font-mono text-slate-500 hidden md:block">
            {activeSlides.length} Masterworks Featured
          </div>
        </div>
      </div>

      {/* Auto-Sliding Architectural Marquee Track */}
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="flex gap-6 overflow-x-auto scrollbar-none px-4 sm:px-8 py-4 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollBehavior: 'auto' }}
      >
        {displaySlides.map((slide, idx) => (
          <div
            key={`${slide.id}-${idx}`}
            onClick={() => setSelectedSlide(slide)}
            className="group relative flex-shrink-0 w-[310px] sm:w-[390px] lg:w-[430px] rounded-3xl bg-white border border-slate-200/90 hover:border-amber-400/90 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.12)] transition-all duration-500 overflow-hidden flex flex-col cursor-pointer"
          >
            {/* Crisp High-Res Image Viewport */}
            <div className="relative w-[calc(100%-20px)] h-[220px] sm:h-[250px] m-2.5 rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={slide.image}
                alt={slide.title}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (slide.category === 'Residential') {
                    target.src = '/assets/about_hero_villa.jpg';
                  } else if (slide.category === 'Commercial') {
                    target.src = '/assets/commercial_hero.jpg';
                  } else if (slide.category === 'Interiors') {
                    target.src = '/assets/interior_01_living.jpg';
                  } else {
                    target.src = '/assets/turnkey_hero.jpg';
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[1.01] contrast-[1.01]"
                loading="lazy"
              />

              {/* Subtle Natural Contrast Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* Floating Category Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 text-[10px] sm:text-[11px] font-mono tracking-wider uppercase font-bold text-slate-900 shadow-xs">
                  <span className={`w-2 h-2 rounded-full ${getCategoryDotColor(slide.category)}`} />
                  {slide.category}
                </span>
              </div>

              {/* Floating Expand Icon */}
              <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xs text-slate-800">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Bottom Content Body (Clean Editorial Light Theme) */}
            <div className="p-5 pt-1.5 flex flex-col justify-between flex-grow">
              <div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#936B2B] font-bold mb-1">
                  {slide.category} • MASTERWORK
                </div>

                <h3 className="text-base sm:text-lg font-bold font-barlow text-slate-900 uppercase tracking-tight leading-snug group-hover:text-blue-950 transition-colors line-clamp-1">
                  {slide.title}
                </h3>
              </div>

              {/* Metadata Bar */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500 font-sans">
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#936B2B] flex-shrink-0" />
                  <span className="truncate max-w-[170px]">{slide.location}</span>
                </div>
                {slide.timeline && (
                  <div className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold border border-slate-200/70 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{slide.timeline}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Detail Modal / Lightbox (Luxury Light Theme) */}
      <AnimatePresence>
        {selectedSlide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedSlide(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 shadow-2xl text-slate-900 flex flex-col md:flex-row overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSlide(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/95 hover:bg-white text-slate-700 border border-slate-200 shadow-md transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* High-Res Image Preview */}
              <div className="w-full md:w-3/5 min-h-[300px] md:min-h-[460px] relative bg-slate-100">
                <img
                  src={selectedSlide.image}
                  alt={selectedSlide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-mono uppercase tracking-widest text-slate-900 font-bold shadow-sm">
                    <span className={`w-2 h-2 rounded-full ${getCategoryDotColor(selectedSlide.category)}`} />
                    {selectedSlide.category}
                  </span>
                </div>
              </div>

              {/* Slide Architectural Details */}
              <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-slate-50/50">
                <div>
                  <div className="text-xs font-mono tracking-widest text-[#936B2B] uppercase mb-2 font-bold">
                    ARCHITECTURAL SPECIFICATION
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-barlow uppercase text-slate-900 tracking-tight leading-tight">
                    {selectedSlide.title}
                  </h3>

                  <div className="mt-6 space-y-3.5 text-xs sm:text-sm">
                    <div className="flex items-start gap-2.5 text-slate-700">
                      <MapPin className="w-4 h-4 text-[#936B2B] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-mono">Location</span>
                        <span className="text-slate-900 font-semibold">{selectedSlide.location}</span>
                      </div>
                    </div>

                    {selectedSlide.architect && (
                      <div className="flex items-start gap-2.5 text-slate-700">
                        <Building2 className="w-4 h-4 text-[#936B2B] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-mono">Architect / Cell</span>
                          <span className="text-slate-900 font-semibold">{selectedSlide.architect}</span>
                        </div>
                      </div>
                    )}

                    {selectedSlide.timeline && (
                      <div className="flex items-start gap-2.5 text-slate-700">
                        <Clock className="w-4 h-4 text-[#936B2B] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-mono">Execution Timeline</span>
                          <span className="text-slate-900 font-semibold">{selectedSlide.timeline}</span>
                        </div>
                      </div>
                    )}

                    {selectedSlide.scope && (
                      <div className="flex items-start gap-2.5 text-slate-700">
                        <Layers className="w-4 h-4 text-[#936B2B] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-mono">Scope of Work</span>
                          <span className="text-slate-900 font-semibold">{selectedSlide.scope}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
                  <button
                    onClick={() => {
                      setSelectedSlide(null);
                      if (onOpenQuoteModal) onOpenQuoteModal();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 text-center shadow-sm"
                  >
                    Inquire About A Similar Project
                  </button>

                  <button
                    onClick={() => {
                      setSelectedSlide(null);
                      navigate('/gallery');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-mono text-xs uppercase tracking-wider transition-all duration-200 text-center border border-slate-200"
                  >
                    View All Gallery Projects
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
