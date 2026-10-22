import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Compass,
  Layers,
  FileCheck,
  Building2,
  Calculator,
  HardHat,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface CommercialProcessProps {
  onOpenQuoteModal?: () => void;
}

interface ProcessStage {
  step: string;
  title: string;
  tag: string;
  desc: string;
  deliverables: string[];
  icon: React.FC<{ className?: string }>;
  timing: string;
}

const stages: ProcessStage[] = [
  {
    step: '01',
    title: 'CONSULTATION & SCOPE',
    tag: 'FEASIBILITY & SCOPING',
    desc: 'Commercial requirement discovery, site viability analysis, zoning parameters, and municipal bylaw feasibility before drafting.',
    deliverables: ['Zoning & Bylaw Review', 'Client Brief Definition', 'Feasibility Roadmap'],
    icon: Compass,
    timing: 'Stage 01',
  },
  {
    step: '02',
    title: 'REQUIREMENT ANALYSIS',
    tag: 'SPATIAL PLANNING',
    desc: 'Floor plate optimization, commercial occupancy loads, column grid clearances, and spatial circulation matrix modeling.',
    deliverables: ['Floor Plate Optimization', 'Occupancy Load Study', 'BIM Spatial Matrix'],
    icon: Layers,
    timing: 'Stage 02',
  },
  {
    step: '03',
    title: 'SITE ASSESSMENT',
    tag: 'GEOTECHNICAL SURVEY',
    desc: 'Geotechnical soil core testing, topography survey, heavy machinery access logistics, and boundary pegging verification.',
    deliverables: ['Soil Compression Test', 'Total Station Survey', 'Machinery Access Audit'],
    icon: FileCheck,
    timing: 'Stage 03',
  },
  {
    step: '04',
    title: 'PLANNING & DESIGN',
    tag: 'ENGINEERING & SANCTIONS',
    desc: 'Multi-disciplinary structural engineering, MEP coordination drawings, 3D BIM synchronization, and municipal sanction approvals.',
    deliverables: ['Structural Blueprints', 'MEP Synchronization', 'Municipal Sanctions'],
    icon: Building2,
    timing: 'Stage 04',
  },
  {
    step: '05',
    title: 'COST ESTIMATION & BOQ',
    tag: 'COMMERCIAL BOQ LOCK',
    desc: 'Itemized, locked Bill of Quantities (BOQ) with guaranteed material specifications and transparent milestone scheduling.',
    deliverables: ['Itemized BOQ Line Items', 'Material Certifications', 'Milestone Payment Plan'],
    icon: Calculator,
    timing: 'Stage 05',
  },
  {
    step: '06',
    title: 'CIVIL EXECUTION',
    tag: 'FAST-TRACK CONSTRUCTION',
    desc: 'Fast-track heavy civil and structural construction managed on-site by resident engineers with daily digital logs and batch testing.',
    deliverables: ['Resident Site Supervision', 'Daily Digital Logs', 'Batch Concrete Testing'],
    icon: HardHat,
    timing: 'Stage 06',
  },
  {
    step: '07',
    title: 'QUALITY CONTROL & AUDITS',
    tag: 'AUDIT & TESTING',
    desc: 'Continuous concrete cube compression tests at 7 & 28 days, facade wind/water tolerance testing, and MEP load audits.',
    deliverables: ['140+ Point Inspection', 'Facade Wind Testing', 'Pre-Handover Snagging'],
    icon: ShieldCheck,
    timing: 'Stage 07',
  },
  {
    step: '08',
    title: 'COMPLETION & HANDOVER',
    tag: 'DELIVERY & OCCUPANCY',
    desc: 'Zero-defect snagging clearance, complete as-built CAD/BIM package, warranty certificates, and formal keys handover.',
    deliverables: ['As-Built CAD/BIM Package', 'Warranty Certificates', 'Occupancy Handover'],
    icon: KeyRound,
    timing: 'Stage 08',
  },
];

export const CommercialProcess: React.FC<CommercialProcessProps> = ({ onOpenQuoteModal }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Automatic circular sliding every 3.5s
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stages.length);
    }, 3500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered]);

  // Center active card smoothly within horizontal container ONLY (never scroll whole window)
  useEffect(() => {
    if (containerRef.current) {
      const activeEl = containerRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        const container = containerRef.current;
        const targetScrollLeft = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth',
        });
      }
    }
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % stages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + stages.length) % stages.length);
  };

  const currentStage = stages[activeIndex];
  const CurrentIcon = currentStage.icon;

  return (
    <section
      id="commercial-process"
      aria-label="8-Stage Commercial Construction Process"
      className="relative w-full bg-white text-slate-900 py-20 sm:py-28 overflow-hidden select-none border-b border-slate-200"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* ============================================================ */}
        {/* 1. HEADER SECTION (CLEAN ARCHITECTURAL EDITORIAL)            */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 pb-8 border-b border-slate-200">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-950" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-900 font-bold flex items-center gap-2">
                04.3 // SYSTEMATIC EXECUTION FRAMEWORK
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-slate-950 leading-[1.04]">
              8-Stage Commercial <br className="hidden sm:inline" />
              Construction Process.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-2xl">
              From initial zoning discovery and structural engineering to on-site concrete batch testing and zero-defect key handover.
            </p>
          </div>

          {/* CONTROLS (AUTOPLAY + NAVIGATION + COUNTER) */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Autoplay Play/Pause */}
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause sliding' : 'Start sliding'}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs font-bold hover:bg-slate-100 transition-all cursor-pointer shadow-2xs"
            >
              {isPlaying ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>SLIDING ACTIVE</span>
                  <Pause className="w-3.5 h-3.5 text-slate-900 ml-1" />
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <span>PAUSED</span>
                  <Play className="w-3.5 h-3.5 text-slate-600 ml-1" />
                </>
              )}
            </button>

            {/* Step Counter */}
            <div className="font-mono text-xs font-bold text-slate-950 bg-slate-100 px-4 py-2.5 rounded-full border border-slate-200 shadow-2xs">
              STAGE {stages[activeIndex].step} <span className="text-slate-400">/</span> 08
            </div>

            {/* Left / Right Nav Chevrons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous stage"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-900 hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next stage"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-900 hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. SLEEK STEPPER TRACK (8 NODES)                              */}
        {/* ============================================================ */}
        <div className="relative mb-12">
          {/* Connecting Line */}
          <div className="absolute top-5 left-6 right-6 h-[2px] bg-slate-200 hidden md:block" />

          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 relative z-10">
            {stages.map((st, idx) => {
              const isActive = activeIndex === idx;
              const isPassed = activeIndex > idx;
              return (
                <button
                  key={`node-${st.step}`}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-slate-950 text-white ring-4 ring-slate-950/15 scale-110 shadow-md'
                        : isPassed
                        ? 'bg-slate-800 text-white shadow-2xs'
                        : 'bg-white text-slate-600 border border-slate-300 group-hover:border-slate-950 group-hover:text-slate-950'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-4 h-4" /> : st.step}
                  </div>
                  <span
                    className={`mt-2 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-center truncate max-w-full px-1 transition-colors ${
                      isActive ? 'text-slate-950' : 'text-slate-500'
                    }`}
                  >
                    {st.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. HERO SPOTLIGHT + HORIZONTAL SLIDER                        */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">
          
          {/* Left Column: Active Spotlight Card (High Contrast Black & White) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-[32px] bg-slate-950 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Header Pill */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <span>PHASE {currentStage.step} OF 08</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                  <CurrentIcon className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Tag */}
              <div>
                <span className="font-mono text-xs font-bold text-orange-400 uppercase tracking-widest block mb-2">
                  {currentStage.tag}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white leading-tight">
                  {currentStage.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed font-normal">
                {currentStage.desc}
              </p>

              {/* Deliverables Checklist */}
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                  KEY DELIVERABLES & MILESTONES:
                </span>
                <div className="space-y-2">
                  {currentStage.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs font-sans text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            {onOpenQuoteModal && (
              <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">
                  Ready to initiate Stage {currentStage.step}?
                </span>
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Enquire Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Carousel Track with Cards */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div
              ref={containerRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto py-2 px-1 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden h-full"
            >
              {stages.map((stage, idx) => {
                const isActive = activeIndex === idx;
                const StageIcon = stage.icon;

                return (
                  <motion.div
                    key={stage.step}
                    onClick={() => setActiveIndex(idx)}
                    whileHover={{ y: -4 }}
                    className={`shrink-0 w-[260px] sm:w-[280px] rounded-[26px] p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between select-none ${
                      isActive
                        ? 'bg-slate-900 text-white border-2 border-slate-900 shadow-xl scale-[1.02]'
                        : 'bg-[#F8F9FA] hover:bg-white text-slate-900 border border-slate-200/90 shadow-2xs hover:border-slate-300'
                    }`}
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/40">
                        <span
                          className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md ${
                            isActive ? 'bg-white/15 text-white' : 'bg-slate-200 text-slate-800'
                          }`}
                        >
                          PHASE {stage.step}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isActive ? 'bg-white/10 text-white' : 'bg-white text-slate-700 shadow-2xs'
                          }`}
                        >
                          <StageIcon className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Stage Title */}
                      <h4
                        className={`font-display text-lg font-bold uppercase tracking-tight mb-1 ${
                          isActive ? 'text-white' : 'text-slate-950'
                        }`}
                      >
                        {stage.title}
                      </h4>

                      <span
                        className={`font-mono text-[10px] font-bold uppercase tracking-wider block mb-3 ${
                          isActive ? 'text-orange-400' : 'text-slate-500'
                        }`}
                      >
                        {stage.tag}
                      </span>

                      <p
                        className={`text-xs font-sans leading-relaxed line-clamp-3 ${
                          isActive ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {stage.desc}
                      </p>
                    </div>

                    {/* Bottom Deliverables Pill */}
                    <div className="pt-4 border-t border-slate-200/30 mt-4 flex items-center justify-between text-[11px] font-mono">
                      <span className={isActive ? 'text-slate-400' : 'text-slate-500'}>
                        {stage.deliverables.length} Deliverables
                      </span>
                      <span className={isActive ? 'text-white font-bold' : 'text-slate-900 font-bold'}>
                        VIEW →
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Bar below slider */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-sans text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span className="font-medium">Continuous milestone inspection & structural certification at every stage.</span>
              </div>
              <div className="font-mono text-[11px] text-slate-500 hidden sm:block">
                CLICK ANY PHASE TO INSPECT
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
