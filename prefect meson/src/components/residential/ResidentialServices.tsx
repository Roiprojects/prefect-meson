import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface ResidentialCategory {
  id: string;
  num: string;
  shortTitle: string;
  title: string;
  desc: string;
  image: string;
  tag: string;
}

const residentialCategories: ResidentialCategory[] = [
  {
    id: 'luxury-villas-item-rate',
    num: '01',
    shortTitle: 'LUXURY VILLAS (ITEM RATE BASIS)',
    title: 'LUXURY VILLAS ON ITEM RATE BASIS',
    desc: 'Stately luxury villa construction executed on a transparent item-rate contractual basis with itemized BOQ estimations, exposed RCC cantilevered slabs, natural stone masonry, water bodies, and bespoke estate finishes.',
    image: '/projects/dr_anil_kush/dr_anil_kush_01_courtyard_louvers.png',
    tag: 'ITEM RATE CONTRACT BASIS • BOQ ESTIMATION',
  },
  {
    id: 'affordable-homes-packages',
    num: '02',
    shortTitle: 'AFFORDABLE HOMES (PACKAGES PER SPECS)',
    title: 'AFFORDABLE HOMES WITH PACKAGES AS PER SPECS',
    desc: 'High-quality affordable family home construction with structured specification packages: 1. Basic Package (₹2,300/sft), 2. Premium Package (₹2,800/sft), and 3. Luxury Package (₹3,000/sft), with robust civil foundations & transparent billing.',
    image: '/ndl_projects/slide_081_img_1.jpg',
    tag: 'BASIC ₹2300 • PREMIUM ₹2800 • LUXURY ₹3000 / SFT',
  },
  {
    id: 'eco-friendly-homes',
    num: '03',
    shortTitle: 'ECO-FRIENDLY HOMES (DESIGN & EXECUTION)',
    title: 'ECO-FRIENDLY HOMES WITH CONSULTATION, DESIGN & EXECUTION',
    desc: 'Environmentally conscious sustainable residences featuring wire-cut brick masonry, stabilized mud blocks (SMB), passive thermal planning, natural courtyards, rainwater harvesting, end-to-end engineering consultation, architectural design, and turnkey execution.',
    image: '/ndl_projects/slide_026_img_1.jpg',
    tag: 'CONSULTATION, DESIGN & TURNKEY EXECUTION',
  },
  {
    id: 'independent-houses',
    num: '04',
    shortTitle: 'INDEPENDENT HOUSES',
    title: 'INDEPENDENT HOUSES',
    desc: 'Custom private independent homes tailored to family lifestyle, bespoke spatial zoning, and robust structural foundations.',
    image: '/ndl_projects/slide_081_img_1.jpg',
    tag: 'PRIVATE ELEVATION & COURTYARDS',
  },
  {
    id: 'duplex-houses',
    num: '05',
    shortTitle: 'DUPLEX HOUSES',
    title: 'DUPLEX HOUSES',
    desc: 'Sculptural multi-tier split-level duplex residences featuring exposed wire-cut brick masonry and double-height living spaces.',
    image: '/ndl_projects/slide_026_img_1.jpg',
    tag: 'SPLIT-LEVEL & WIRE-CUT BRICK',
  },
  {
    id: 'multi-storey-homes',
    num: '06',
    shortTitle: 'MULTI-STOREY HOMES',
    title: 'MULTI-STOREY HOMES',
    desc: 'High-specification multi-storey urban family residences with heavy structural framing, concealed conduits, and lift shafts.',
    image: '/ndl_projects/slide_050_img_1.jpg',
    tag: 'URBAN FRAMING & LIFT SHAFTS',
  },
  {
    id: 'renovation-extension',
    num: '07',
    shortTitle: 'RENOVATIONS & EXTENSIONS',
    title: 'RENOVATIONS & EXTENSIONS',
    desc: 'Structural retrofitting, vertical floor additions, facade modernization, and civil remodeling of existing residential homes.',
    image: '/ndl_projects/slide_117_img_1.jpg',
    tag: 'STRUCTURAL RETROFITTING & FACADE',
  },
];

interface ResidentialServicesProps {
  onSelectCategory?: (category: string) => void;
  onOpenQuoteModal?: () => void;
}

export const ResidentialServices: React.FC<ResidentialServicesProps> = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Auto rotation every 5 seconds when not paused
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % residentialCategories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleMouseEnter = (index: number) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setIsPaused(true);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setMousePos({ x, y });
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % residentialCategories.length;
      setActiveIndex(next);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + residentialCategories.length) % residentialCategories.length;
      setActiveIndex(prev);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIndex(index);
    }
  };

  const handleExploreCategory = (slug: string) => {
    navigate(`/residential-construction/${slug}`);
  };

  const activeCategory = residentialCategories[activeIndex];

  useEffect(() => {
    if (mobileScrollRef.current) {
      const activeEl = mobileScrollRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        const container = mobileScrollRef.current;
        const targetScrollLeft = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth',
        });
      }
    }
  }, [activeIndex]);

  return (
    <section
      id="residential-services"
      aria-label="Residential Project Typologies"
      className="relative w-full bg-[#FFFFFF] text-slate-900 py-20 lg:py-28 overflow-hidden border-b border-slate-200/80"
    >
      {/* Subtle Architectural Drafting Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#071D38 1px, transparent 1px), linear-gradient(90deg, #071D38 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* SECTION 5.2 HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
          <div className="max-w-3xl">
            {/* Tagline / Section Code */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200/90 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#071D38]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                05.2 / RESIDENTIAL PROJECT TYPES
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-barlow text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#071D38] leading-[1.05]">
              Types of <br className="hidden sm:inline" />
              Residential Projects.
            </h2>

            {/* Supporting Copy */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl">
              Explore specialized residential execution categories tailored for standalone homeowners, luxury villa builders, and multi-storey developers.
            </p>
          </div>

          {/* Architectural Index Counter (IBM Plex Mono) */}
          <div className="flex items-center gap-6 self-start lg:self-end">
            <div className="flex flex-col items-end">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#071D38] tracking-tighter">
                {activeCategory.num} <span className="text-slate-300 font-light">/</span> 07
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-slate-500 font-semibold mt-0.5">
                ACTIVE PORTFOLIO WINDOW
              </span>
            </div>

            {/* Manual Navigation Chevrons */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-full border border-slate-200">
              <button
                onClick={() => {
                  setIsPaused(true);
                  setActiveIndex((prev) => (prev - 1 + residentialCategories.length) % residentialCategories.length);
                }}
                aria-label="Previous residential category"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-slate-900 shadow-xs hover:bg-[#071D38] hover:text-white transition-all duration-200 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsPaused(true);
                  setActiveIndex((prev) => (prev + 1) % residentialCategories.length);
                }}
                aria-label="Next residential category"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-slate-900 shadow-xs hover:bg-[#071D38] hover:text-white transition-all duration-200 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* PROGRESS INDICATOR (7-Segment Architectural Line) */}
        <div className="w-full grid grid-cols-7 gap-1.5 sm:gap-2 mb-6" role="tablist">
          {residentialCategories.map((cat, idx) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeIndex === idx}
              aria-label={`Select category ${cat.num}: ${cat.title}`}
              onClick={() => {
                setIsPaused(true);
                setActiveIndex(idx);
              }}
              className="group relative h-1.5 sm:h-2 rounded-full overflow-hidden bg-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-[#071D38] cursor-pointer"
            >
              <div
                className={`h-full w-full transition-all duration-500 ease-out ${
                  activeIndex === idx
                    ? 'bg-[#071D38] opacity-100'
                    : 'bg-slate-300 opacity-60 group-hover:opacity-100 group-hover:bg-slate-400'
                }`}
              />
            </button>
          ))}
        </div>

        {/* ============================================================ */}
        {/* DESKTOP INTERACTIVE ACCORDION CANVAS (7 VERTICAL PANELS)     */}
        {/* ============================================================ */}
        <div
          className="hidden lg:flex w-full h-[580px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {residentialCategories.map((cat, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={cat.id}
                role="tabpanel"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onMouseEnter={() => handleMouseEnter(idx)}
                onClick={() => {
                  setIsPaused(true);
                  setActiveIndex(idx);
                }}
                className={`relative h-full transition-all duration-700 cursor-pointer overflow-hidden select-none border-r last:border-r-0 border-white/10 ${
                  isActive
                    ? 'flex-[4.6]'
                    : 'flex-[0.9] hover:flex-[1.2] opacity-75 hover:opacity-95'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {/* BACKGROUND IMAGE CONTAINER */}
                <div className="absolute inset-0 overflow-hidden bg-slate-900">
                  <motion.img
                    src={cat.image}
                    alt={cat.title}
                    animate={{
                      scale: isActive ? 1.03 : 1.1,
                      x: isActive ? mousePos.x : 0,
                      y: isActive ? mousePos.y : 0,
                    }}
                    transition={{
                      scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                      x: { duration: 0.3, ease: 'easeOut' },
                      y: { duration: 0.3, ease: 'easeOut' },
                    }}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isActive
                        ? 'brightness-95 contrast-105'
                        : 'brightness-50 contrast-90 grayscale-[25%]'
                    }`}
                  />

                  {/* Gradient Layers */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      isActive
                        ? 'bg-gradient-to-t from-black/95 via-black/40 to-black/30'
                        : 'bg-black/60 hover:bg-black/40'
                    }`}
                  />
                </div>

                {/* INACTIVE STATE CONTENT: Vertical Project Label + Top Number */}
                {!isActive && (
                  <div className="absolute inset-0 flex flex-col justify-between items-center py-8 px-2 z-10">
                    <span className="font-mono text-xs font-bold text-white/70 tracking-widest">
                      {cat.num}
                    </span>

                    <div className="flex-1 flex items-center justify-center">
                      <span
                        className="font-barlow text-sm font-bold text-white/80 tracking-widest uppercase whitespace-nowrap"
                        style={{
                          writingMode: 'vertical-rl',
                          transform: 'rotate(180deg)',
                        }}
                      >
                        {cat.shortTitle}
                      </span>
                    </div>

                    <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  </div>
                )}

                {/* ACTIVE STATE CONTENT: Top Index & Sequential Bottom Panel */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key={`active-${cat.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between z-20 pointer-events-none"
                    >
                      {/* Top Bar Header inside active window */}
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-lg">
                          <span className="font-mono text-xs font-bold text-[#C8A96B]">
                            {cat.num} / RESIDENTIAL
                          </span>
                          <span className="w-1 h-1 rounded-full bg-white/40" />
                          <span className="font-mono text-[11px] text-white/90 tracking-wider">
                            {cat.tag}
                          </span>
                        </div>

                        <div className="hidden xl:flex items-center gap-2 text-white/60 font-mono text-xs">
                          <span>EXPANDED WINDOW</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#C8A96B]" />
                        </div>
                      </div>

                      {/* Bottom Dominant Text & Call to Action */}
                      <div className="max-w-xl">
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <h3 className="font-barlow text-3xl xl:text-4xl font-bold uppercase tracking-tight text-white mb-2 leading-none">
                            {cat.title}
                          </h3>
                        </motion.div>

                        <motion.p
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="text-sm xl:text-base text-white/85 font-sans leading-relaxed mb-6"
                        >
                          {cat.desc}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.24, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="pointer-events-auto flex items-center gap-3"
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExploreCategory(cat.id);
                            }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-950 hover:bg-[#C8A96B] hover:text-slate-950 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md group cursor-pointer"
                          >
                            <span>Explore Projects</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </button>
                          <span className="font-mono text-[11px] text-white/50 tracking-wider">
                            STRUCTURED EXECUTION
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* MOBILE DEDICATED EXPERIENCE (< 1024px)                       */}
        {/* ============================================================ */}
        <div className="lg:hidden flex flex-col gap-5">
          {/* Active Mobile Window */}
          <div className="relative w-full h-[400px] sm:h-[460px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45 }}
                className="relative w-full h-full"
              >
                <img
                  src={activeCategory.image}
                  alt={activeCategory.title}
                  className="w-full h-full object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white self-start">
                    <span className="font-mono text-xs font-bold text-[#C8A96B]">
                      {activeCategory.num} / RESIDENTIAL
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-[#C8A96B] font-bold tracking-widest uppercase block mb-1">
                      {activeCategory.tag}
                    </span>
                    <h3 className="font-barlow text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-2">
                      {activeCategory.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed mb-4">
                      {activeCategory.desc}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleExploreCategory(activeCategory.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-950 font-sans text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
                    >
                      <span>Explore Projects</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Category Select Pills */}
          <div
            ref={mobileScrollRef}
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
          >
            {residentialCategories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setActiveIndex(idx)}
                className={`shrink-0 px-4 py-2 rounded-full border text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeIndex === idx
                    ? 'bg-[#071D38] border-[#071D38] text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat.num} {cat.shortTitle}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
