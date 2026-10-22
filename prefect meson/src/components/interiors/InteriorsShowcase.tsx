import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Authentic High-Resolution Interior Visual Assets
import imgResidential from '../../assets/interior_01_living.jpg';
import imgCommercial from '../../assets/comm_showroom_hero.jpg';
import imgOffice from '../../assets/interior_04_office.jpg';
import imgModular from '../../assets/interior_02_kitchen.jpg';
import imgCustom from '../../assets/interior_03_bedroom.jpg';

interface SpatialMarker {
  id: string;
  num: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  materials: string[];
  // Desktop spatial placement coordinates (% across the room canvas)
  position: {
    top: string;
    left: string;
  };
}

const spatialMarkers: SpatialMarker[] = [
  {
    id: 'residential',
    num: '01',
    tag: 'RESIDENTIAL',
    title: 'Residential Interiors',
    description: 'Thoughtful residential spaces shaped around comfort, function, and refined natural material detailing.',
    image: imgResidential,
    materials: ['NATURAL STONE', 'TEAK FLUTING', 'COVE LIGHTING', 'BESPOKE TEXTILES'],
    position: { top: '34%', left: '18%' },
  },
  {
    id: 'commercial',
    num: '02',
    tag: 'COMMERCIAL',
    title: 'Commercial Interiors',
    description: 'High-impact retail, showroom, and hospitality environments engineered for customer flow and durability.',
    image: imgCommercial,
    materials: ['ACOUSTIC SLATS', 'TERRAZZO', 'BRUSHED BRASS', 'DYNAMIC ILLUMINATION'],
    position: { top: '24%', left: '52%' },
  },
  {
    id: 'office',
    num: '03',
    tag: 'OFFICE',
    title: 'Office Interiors',
    description: 'Modern high-performance corporate workspaces integrating acoustic privacy, biophilic elements, and ergonomics.',
    image: imgOffice,
    materials: ['ACOUSTIC GLASS', 'WHITE OAK', 'MAGNETIC TRACKS', 'BIOPHILIC LIVING'],
    position: { top: '48%', left: '38%' },
  },
  {
    id: 'modular',
    num: '04',
    tag: 'MODULAR',
    title: 'Modular Solutions',
    description: 'Precision-engineered modular kitchen and wardrobe architecture featuring German hardware and spatial optimization.',
    image: imgModular,
    materials: ['ACRYLIC SHUTTERS', 'CALACATTA QUARTZ', 'GERMAN HARDWARE', 'MODULAR CARCASS'],
    position: { top: '32%', left: '74%' },
  },
  {
    id: 'custom',
    num: '05',
    tag: 'CUSTOM',
    title: 'Custom Interior Execution',
    description: 'Artisanal on-site joinery, handcrafted fluted wood paneling, luxury master suites, and bespoke finishes.',
    image: imgCustom,
    materials: ['HAND-RUBBED TEAK', 'FLUTED HEADBOARDS', 'TINTED GLASS', 'ARCHITECTURAL JOINERY'],
    position: { top: '56%', left: '68%' },
  },
];

interface InteriorsShowcaseProps {
  onOpenInteriorModal?: (scene: any) => void;
}

export const InteriorsShowcase: React.FC<InteriorsShowcaseProps> = ({
  onOpenInteriorModal,
}) => {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const isReduced = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const activeSpace = spatialMarkers[activeIdx];
  const easeLuxury = [0.22, 1, 0.36, 1];

  // Auto-progress every 5.5s on desktop if not paused
  useEffect(() => {
    if (isPaused) return;
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % spatialMarkers.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeIdx]);

  const nextSpace = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % spatialMarkers.length);
  }, []);

  const prevSpace = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + spatialMarkers.length) % spatialMarkers.length);
  }, []);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) nextSpace();
      else prevSpace();
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      id="interiors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[100vh] min-h-[760px] max-h-[1000px] bg-[#111827] text-white overflow-hidden select-none"
    >
      {/* ============================================================ */}
      {/* 1. FULL-BLEED IMMERSIVE INTERIOR ENVIRONMENT CANVAS          */}
      {/* ============================================================ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSpace.id}
          initial={
            isReduced
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.05 }
          }
          animate={{ opacity: 1, scale: 1.0 }}
          exit={
            isReduced
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.03 }
          }
          transition={{ duration: 0.8, ease: easeLuxury }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={activeSpace.image}
            alt={activeSpace.title}
            className="w-full h-full object-cover object-center will-change-transform"
            loading="eager"
          />

          {/* Architectural Ambient Shading (Contrast for Typography & Markers) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/95 via-[#111827]/35 to-[#111827]/85 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/90 via-[#111827]/30 to-[#111827]/60 pointer-events-none" />
          
          {/* Subtle Fine Blueprint / CAD Drafting Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 2. TOP-LEFT BRAND TYPOGRAPHY (UPPER-LEFT WITH BREATHING ROOM)*/}
      {/* ============================================================ */}
      <div className="absolute top-8 sm:top-12 lg:top-14 left-6 sm:left-12 lg:left-16 z-30 max-w-xl pointer-events-none">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeLuxury }}
          className="flex items-center gap-2 mb-3 sm:mb-4"
        >
          <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#0F172A] uppercase">
            INTERIORS
          </span>
        </motion.div>

        {/* Main Heading (Barlow Condensed) */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeLuxury }}
          className="font-barlow text-3xl sm:text-5xl lg:text-[3.8rem] font-bold text-white uppercase tracking-tight leading-[0.95] drop-shadow-lg"
        >
          <span className="block text-white">Spaces Designed</span>
          <span className="block text-[#0F172A]">Around The Way You Live.</span>
        </motion.h2>

        {/* Supporting Line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: easeLuxury }}
          className="text-xs sm:text-sm lg:text-base text-white/80 font-sans leading-relaxed font-normal mt-3 sm:mt-4 max-w-md hidden sm:block"
        >
          From residential environments to commercial and office spaces, Perfect Mason brings design and execution together.
        </motion.p>
      </div>

      {/* Top-Right Technical Coordinates Tag */}
      <div className="absolute top-8 sm:top-12 lg:top-14 right-6 sm:right-12 lg:right-16 z-30 hidden lg:flex items-center gap-3 text-right pointer-events-none">
        <div className="font-mono text-[11px] text-white/60 uppercase tracking-widest">
          SPATIAL CANVAS // {activeSpace.num} OF 05
        </div>
        <div className="w-2 h-2 rounded-full bg-[#0F172A] animate-pulse" />
      </div>

      {/* ============================================================ */}
      {/* 3. FIVE FLOATING ARCHITECTURAL SPATIAL MARKERS (DESKTOP)     */}
      {/* ============================================================ */}
      <div className="absolute inset-0 z-30 pointer-events-none hidden lg:block">
        {spatialMarkers.map((marker, idx) => {
          const isActive = activeIdx === idx;

          return (
            <div
              key={marker.id}
              style={{ top: marker.position.top, left: marker.position.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              <button
                type="button"
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                onFocus={() => {
                  setActiveIdx(idx);
                  setIsPaused(true);
                }}
                onBlur={() => setIsPaused(false)}
                className="group relative flex items-center gap-3 py-2 px-3 focus:outline-none cursor-pointer"
                aria-label={`Select interior space: ${marker.title}`}
              >
                {/* Architectural Crosshair / Pip */}
                <div className="relative flex items-center justify-center">
                  <span
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#0F172A] scale-125 ring-4 ring-[#0F172A]/30 shadow-[0_0_12px_#0F172A]'
                        : 'bg-white/60 group-hover:bg-white group-hover:scale-110'
                    }`}
                  />
                  {isActive && (
                    <span className="absolute w-6 h-6 rounded-full border border-[#0F172A]/60 animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Marker Typographic Annotation */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-mono text-[11px] font-bold transition-colors duration-200 ${
                        isActive ? 'text-[#0F172A]' : 'text-white/60 group-hover:text-white/90'
                      }`}
                    >
                      {marker.num}
                    </span>
                    <span
                      className={`font-barlow text-sm lg:text-base font-bold uppercase tracking-wider transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                      }`}
                    >
                      {marker.tag}
                    </span>
                  </div>

                  {/* Dynamic Underline Marker Extension */}
                  <div className="relative w-full h-[1px] bg-white/20 mt-0.5 overflow-hidden">
                    {isActive && (
                      <motion.div
                        layoutId="active-spatial-marker-line"
                        className="absolute inset-0 bg-[#0F172A]"
                        transition={{ duration: 0.35, ease: easeLuxury }}
                      />
                    )}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 4. BOTTOM-LEFT ACTIVE CATEGORY CAPTION & MATERIAL DESCRIPTORS*/}
      {/* ============================================================ */}
      <div className="absolute bottom-8 sm:bottom-12 lg:bottom-14 left-6 sm:left-12 lg:left-16 z-30 max-w-2xl">
        {/* Active Space Sub-Heading */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpace.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: easeLuxury }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#0F172A] uppercase tracking-[0.25em]">
                {activeSpace.num} / {activeSpace.title}
              </span>
            </div>

            <p className="text-sm sm:text-base text-white/90 font-sans leading-relaxed font-normal max-w-lg">
              “{activeSpace.description}”
            </p>

            {/* Material Language Badges */}
            <div className="flex items-center gap-2 flex-wrap pt-1 mb-4">
              {activeSpace.materials.map((mat) => (
                <span
                  key={mat}
                  className="font-mono text-[10px] sm:text-[11px] text-white/80 bg-black/40 backdrop-blur-sm border border-white/15 px-2.5 py-0.5 rounded tracking-wider uppercase"
                >
                  {mat}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Corporate CTA Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (onOpenInteriorModal) {
                onOpenInteriorModal({
                  id: activeSpace.id,
                  number: activeSpace.num,
                  category: activeSpace.title,
                  title: activeSpace.title,
                  location: 'Bengaluru / Pan-India',
                  description: activeSpace.description,
                  scope: activeSpace.title,
                  image: activeSpace.image,
                  slug: activeSpace.id,
                });
              } else {
                navigate('/interiors');
              }
            }}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded bg-[#111827] hover:bg-[#27272A] active:scale-[0.98] border border-white/20 text-[#FFFFFF] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-2xl cursor-pointer"
          >
            <span>Explore Interior Solutions</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 text-[#0F172A]" />
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. MOBILE INTENTIONAL HORIZONTAL MARKER RAIL (BOTTOM)        */}
      {/* ============================================================ */}
      <div className="absolute bottom-4 right-6 left-6 z-30 lg:hidden pointer-events-auto">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
          {spatialMarkers.map((marker, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={`mob-marker-${marker.id}`}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 px-3 py-2 rounded border transition-all text-left snap-center ${
                  isActive
                    ? 'bg-[#111827] border-[#0F172A] text-white shadow-lg'
                    : 'bg-black/50 backdrop-blur-md border-white/10 text-white/70'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-[#0F172A]' : 'text-white/50'}`}>
                    {marker.num}
                  </span>
                  <span className="font-barlow text-xs font-bold uppercase tracking-wider">
                    {marker.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
};
