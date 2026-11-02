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
    // If fewer than 6 items, repeat to enable infinite smooth scroll
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

    const scrollAmount = 480;
    scrollContainer.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#0B0F17] text-white overflow-hidden border-t border-b border-white/5">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C8A96B]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10 sm:mb-14">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-3xl">
            {/* Elegant Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#C8A96B]/30 backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#C8A96B] font-semibold">
                CURATED ARCHITECTURAL PORTFOLIO
              </span>
            </div>

            {/* Primary Section Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-barlow tracking-tight text-white uppercase leading-[1.1]">
              Architectural Masterworks{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96B] via-[#E2C992] to-[#C8A96B]">
                In Motion
              </span>
            </h2>

            {/* Section Description */}
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-300 font-sans leading-relaxed">
              A continuous, high-definition showcase of luxury residential estates, commercial
              headquarters, and turnkey environments executed with exacting structural precision
              and unyielding craftsmanship across Karnataka.
            </p>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            {/* Play / Pause Toggle */}
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              title={isPlaying ? 'Pause auto-sliding' : 'Resume auto-sliding'}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono tracking-wider text-slate-300 hover:text-white transition-all duration-300"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#C8A96B]" />
                  <span className="hidden sm:inline">PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#C8A96B] fill-[#C8A96B]" />
                  <span className="hidden sm:inline">PLAY</span>
                </>
              )}
            </button>

            {/* Scroll Left Button */}
            <button
              onClick={() => handleManualScroll('left')}
              title="Previous slide"
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scroll Right Button */}
            <button
              onClick={() => handleManualScroll('right')}
              title="Next slide"
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* View Full Gallery Button */}
            <button
              onClick={() => navigate('/gallery')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C8A96B] hover:bg-[#d4b77d] text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#C8A96B]/20"
            >
              <span className="hidden sm:inline">Explore Full</span> Archive
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 whitespace-nowrap border ${
                  isSelected
                    ? 'bg-[#C8A96B] text-slate-950 font-bold border-[#C8A96B] shadow-md shadow-[#C8A96B]/25'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white border-white/10 hover:border-white/20'
                }`}
              >
                {cat === 'All' ? 'All Disciplines' : cat}
              </button>
            );
          })}
          <div className="ml-auto text-xs font-mono text-slate-400 hidden md:block">
            {activeSlides.length} Masterworks
          </div>
        </div>
      </div>

      {/* Auto-Sliding Marquee Track */}
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
            className="group relative flex-shrink-0 w-[300px] sm:w-[420px] lg:w-[480px] h-[340px] sm:h-[400px] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-[#C8A96B]/60 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#C8A96B]/10 cursor-pointer"
          >
            {/* Crisp High-Res Image */}
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
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.98] contrast-[1.02]"
              loading="lazy"
            />

            {/* Polished Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-wider uppercase text-white font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
                {slide.category}
              </span>

              <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white z-10 pointer-events-none">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#C8A96B] font-bold mb-1">
                {slide.category} • MASTERWORK
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-barlow text-white uppercase tracking-tight leading-snug drop-shadow-md group-hover:text-[#E2C992] transition-colors duration-300">
                {slide.title}
              </h3>

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 font-sans pt-2.5 border-t border-white/10 mt-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A96B]" />
                  <span className="truncate max-w-[170px]">{slide.location}</span>
                </div>
                {slide.timeline && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-white/60" />
                    <span>{slide.timeline}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Detail Modal / Lightbox */}
      <AnimatePresence>
        {selectedSlide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedSlide(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0F172A] border border-white/15 shadow-2xl text-white flex flex-col md:flex-row overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSlide(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* High-Res Image Preview */}
              <div className="w-full md:w-3/5 min-h-[300px] md:min-h-[460px] relative bg-black">
                <img
                  src={selectedSlide.image}
                  alt={selectedSlide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#C8A96B]/50 text-xs font-mono uppercase tracking-widest text-[#C8A96B] font-bold">
                    {selectedSlide.category}
                  </span>
                </div>
              </div>

              {/* Slide Details */}
              <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono tracking-widest text-[#C8A96B] uppercase mb-2">
                    ARCHITECTURAL SPECIFICATION
                  </div>
                  <h3 className="text-2xl font-bold font-barlow uppercase text-white tracking-tight leading-tight">
                    {selectedSlide.title}
                  </h3>

                  <div className="mt-6 space-y-3.5 text-xs sm:text-sm">
                    <div className="flex items-start gap-2.5 text-slate-300">
                      <MapPin className="w-4 h-4 text-[#C8A96B] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-mono">Location</span>
                        <span className="text-white font-medium">{selectedSlide.location}</span>
                      </div>
                    </div>

                    {selectedSlide.architect && (
                      <div className="flex items-start gap-2.5 text-slate-300">
                        <Building2 className="w-4 h-4 text-[#C8A96B] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-mono">Architect / Cell</span>
                          <span className="text-white font-medium">{selectedSlide.architect}</span>
                        </div>
                      </div>
                    )}

                    {selectedSlide.timeline && (
                      <div className="flex items-start gap-2.5 text-slate-300">
                        <Clock className="w-4 h-4 text-[#C8A96B] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-mono">Execution Timeline</span>
                          <span className="text-white font-medium">{selectedSlide.timeline}</span>
                        </div>
                      </div>
                    )}

                    {selectedSlide.scope && (
                      <div className="flex items-start gap-2.5 text-slate-300">
                        <Layers className="w-4 h-4 text-[#C8A96B] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-mono">Scope of Work</span>
                          <span className="text-white font-medium">{selectedSlide.scope}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                  <button
                    onClick={() => {
                      setSelectedSlide(null);
                      if (onOpenQuoteModal) onOpenQuoteModal();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#C8A96B] hover:bg-[#d4b77d] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 text-center shadow-lg shadow-[#C8A96B]/25"
                  >
                    Inquire About A Similar Project
                  </button>

                  <button
                    onClick={() => {
                      setSelectedSlide(null);
                      navigate('/gallery');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 text-center border border-white/10"
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
