import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { portfolioConfig, PortfolioProject } from '../../data/portfolioData';
import {
  ArrowRight,
  MapPin,
  Building2,
  Home,
  Layers,
  Palette,
  Sparkles,
  ArrowUpRight,
  Plus,
} from 'lucide-react';

interface SelectedProjectsGridProps {
  onSelectProject?: (project: PortfolioProject) => void;
  onViewAllProjects?: () => void;
}

export const SelectedProjectsGrid: React.FC<SelectedProjectsGridProps> = ({
  onSelectProject,
  onViewAllProjects,
}) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const isReducedMotion = useReducedMotion();

  const { eyebrow, headline, description, ctaText, projects } = portfolioConfig;
  const currentProject = projects[activeProjectIndex] || projects[0];

  // Track scroll across the runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track active project index dynamically
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.25) {
      setActiveProjectIndex(0);
    } else if (latest < 0.52) {
      setActiveProjectIndex(1);
    } else if (latest < 0.78) {
      setActiveProjectIndex(2);
    } else {
      setActiveProjectIndex(3);
    }
  });

  const getCategoryIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('residential')) return <Home className="w-4 h-4 text-slate-950" />;
    if (lower.includes('commercial')) return <Building2 className="w-4 h-4 text-slate-950" />;
    if (lower.includes('turnkey')) return <Layers className="w-4 h-4 text-slate-950" />;
    if (lower.includes('interior')) return <Palette className="w-4 h-4 text-slate-950" />;
    return <Building2 className="w-4 h-4 text-slate-950" />;
  };

  const handleSelectProject = (project: PortfolioProject) => {
    if (onSelectProject) {
      onSelectProject(project);
    }
    navigate(`/projects/${project.slug}`);
  };

  const handleViewAll = () => {
    if (onViewAllProjects) {
      onViewAllProjects();
    } else {
      navigate('/gallery');
    }
  };

  const handleJumpToSegment = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const trackHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (idx / (projects.length - 1)) * trackHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section id="portfolio" className="relative w-full bg-[#F8FAFC] text-slate-900 select-none">
      {/* ============================================================ */}
      {/* 1. TOP EDITORIAL INTRO AREA (PREMIUM LIGHT THEME)             */}
      {/* ============================================================ */}
      <div className="w-full pt-28 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-10 lg:px-16 border-t border-slate-200/80 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          {/* Left: Eyebrow + Line-by-Line Heading */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-4 ring-slate-200" />
                <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950 animate-ping" />
              </div>

              <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.28em] text-slate-800 font-bold flex items-center gap-2">
                {eyebrow}
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              </span>
            </motion.div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] font-bold text-slate-950 uppercase tracking-tight leading-[1.04]">
              <div className="overflow-hidden py-0.5">
                <motion.span
                  initial={{ y: 55, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-slate-950"
                >
                  {headline.line1}
                </motion.span>
              </div>

              <div className="overflow-hidden py-0.5">
                <motion.span
                  initial={{ y: 55, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-slate-950"
                >
                  {headline.line2}
                </motion.span>
              </div>
            </h2>
          </div>

          {/* Right: Supporting Paragraph & View All Projects CTA */}
          <div className="max-w-md flex flex-col items-start lg:items-end gap-6 lg:text-right">
            <motion.p
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed font-normal"
            >
              {description}
            </motion.p>

            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleViewAll}
              className="group relative inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-slate-950 hover:bg-black active:bg-royal-800 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-royal-600/20 hover:shadow-xl hover:shadow-royal-600/30 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
            >
              <span>{ctaText}</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-colors">
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. SINGLE-CARD STICKY SCROLL STAGE (560vh RUNWAY)            */}
      {/* ============================================================ */}
      <div
        ref={containerRef}
        className="relative w-full h-[560vh] bg-[#F8FAFC]"
      >
        {/* Sticky 100vh Viewport Stage */}
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-4 sm:py-6">
          {/* Subtle architectural dot grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />

          {/* Minimal Top Navigation / Progress Indicator */}
          <div className="relative z-30 w-full max-w-6xl mb-4 sm:mb-6 flex items-center justify-between">
            {/* Monospace Indicator Badge */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-slate-800 bg-white px-4 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
                0{activeProjectIndex + 1} / 0{projects.length}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400 font-mono text-[11px] uppercase tracking-[0.2em]">
                <Plus className="w-3 h-3 text-slate-300" />
                <span>PERFECT MASON // ARCHITECTURAL SHOWCASE</span>
              </span>
            </div>

            {/* Quick-Jump Step Indicators */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white p-1.5 rounded-full border border-slate-200/80 shadow-sm">
              {projects.map((proj, idx) => {
                const isActive = activeProjectIndex === idx;
                return (
                  <button
                    key={`nav-${proj.id}`}
                    type="button"
                    onClick={() => handleJumpToSegment(idx)}
                    className={`relative px-3 py-1 rounded-full font-mono text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? 'text-white bg-slate-950 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    0{idx + 1}
                    {isActive && (
                      <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-slate-950" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============================================================ */}
          {/* THE SINGLE STICKY CINEMATIC ARCHITECTURAL CARD               */}
          {/* ============================================================ */}
          <div className="relative z-20 w-full max-w-6xl min-h-[500px] lg:h-[72vh] lg:max-h-[660px] bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] p-5 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 overflow-hidden">
            {/* Architectural CAD Hairline Corner Crosshairs */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-slate-300 pointer-events-none" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-slate-300 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-slate-300 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-slate-300 pointer-events-none" />

            {/* ======================================================== */}
            {/* LEFT: Single Cinematic Architectural Image Showcase      */}
            {/* ======================================================== */}
            <div className="relative w-full lg:w-[54%] h-[280px] sm:h-[360px] lg:h-full rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-900 group cursor-pointer shadow-lg flex-shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={
                    isReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.96, filter: 'blur(4px)' }
                  }
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={
                    isReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 1.03, filter: 'blur(4px)' }
                  }
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleSelectProject(currentProject)}
                  className="relative w-full h-full"
                >
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                    loading="eager"
                  />

                  {/* Gradient Depth Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Floating Case Study Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 border border-white/10 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      <span>FEATURED WORK</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>

                  {/* Bottom Image Archive Caption */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white pointer-events-none">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-orange-400 font-bold tracking-widest block mb-0.5">
                        PHOTOGRAPHIC ARCHIVE
                      </span>
                      <span className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-white drop-shadow-sm">
                        {currentProject.title}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-slate-950 group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ======================================================== */}
            {/* RIGHT: Synchronized Editorial Project Information        */}
            {/* ======================================================== */}
            <div className="w-full lg:w-[46%] flex flex-col justify-center text-left space-y-4 sm:space-y-5 lg:space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={
                    isReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 16 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    isReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -16 }
                  }
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Category Eyebrow */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 text-slate-950 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.22em]">
                      {getCategoryIcon(currentProject.category)}
                      <span>{currentProject.category}</span>
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                  </div>

                  {/* Project Title */}
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.6rem] font-bold uppercase tracking-tight text-slate-900 leading-[1.08]">
                    {currentProject.title}
                  </h3>

                  {/* Location & Scope Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-sans text-slate-600 font-medium">
                    <div className="inline-flex items-center gap-1.5 text-slate-900 bg-slate-100 px-3.5 py-1.5 rounded-full border border-royal-100">
                      <MapPin className="w-3.5 h-3.5 text-slate-950 flex-shrink-0" />
                      <span>{currentProject.location}</span>
                    </div>

                    {currentProject.scope && (
                      <span className="font-mono text-xs text-slate-700 tracking-wide uppercase bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
                        {currentProject.scope}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-xl font-normal">
                    {currentProject.description}
                  </p>

                  {/* Action CTA Button */}
                  <div className="pt-2 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleSelectProject(currentProject)}
                      className="group/btn relative inline-flex items-center gap-3.5 px-8 py-3.5 rounded-full bg-slate-950 hover:bg-slate-950 active:bg-black text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-slate-950/15 hover:shadow-royal-600/30 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-400 cursor-pointer"
                    >
                      <span>VIEW PROJECT</span>
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-colors group-hover/btn:bg-white group-hover/btn:text-slate-900">
                        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. POST-STAGE EDITORIAL ARCHIVE CALLOUT (LIGHT THEME)         */}
      {/* ============================================================ */}
      <div className="w-full py-14 sm:py-20 px-6 sm:px-10 lg:px-16 bg-white border-t border-slate-200/80 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-royal-100 text-slate-900 font-mono text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FULL ARCHITECTURAL ARCHIVE</span>
          </div>

          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-slate-950 tracking-tight leading-tight mb-6">
            Looking for something specific?
          </h3>

          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed mb-8 max-w-xl">
            Explore our comprehensive gallery of residential landmarks, commercial superstructures, turnkey campuses, and bespoke interior spaces.
          </p>

          <button
            type="button"
            onClick={handleViewAll}
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-slate-950 hover:bg-black text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-royal-600/20 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <span>VIEW ALL PROJECTS IN GALLERY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};





