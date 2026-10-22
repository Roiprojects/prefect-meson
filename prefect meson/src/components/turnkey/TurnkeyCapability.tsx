import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TransformationStage {
  id: string;
  step: string;
  label: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  phaseCode: string;
  deliverables: string[];
}

const TRANSFORMATION_STAGES: TransformationStage[] = [
  {
    id: 'concept',
    step: '01',
    label: 'CONCEPT',
    title: 'INITIAL IDEA',
    tagline: 'Translating Vision into Architectural Form',
    description: 'Translate the project requirement into an initial direction, establishing spatial proportions, site orientation, and conceptual volume.',
    image: '/assets/transformation/01_concept.jpg',
    phaseCode: 'PHASE // 01-CONCEPT',
    deliverables: ['Program Definition', 'Massing Studies', 'Schematic Direction'],
  },
  {
    id: 'planning',
    step: '02',
    label: 'PLANNING',
    title: 'PROJECT PLANNING',
    tagline: 'Precision BIM & Structural Integration',
    description: 'Develop the planning direction required for execution, calibrating structural calculations, MEP pathways, and statutory approvals.',
    image: '/assets/transformation/02_planning.jpg',
    phaseCode: 'PHASE // 02-PLANNING',
    deliverables: ['BIM Coordination', 'Structural Drawings', 'Statutory Approvals'],
  },
  {
    id: 'site',
    step: '03',
    label: 'SITE',
    title: 'SITE PREPARATION',
    tagline: 'Groundwork & Substructure Mobilization',
    description: 'Move the project into the physical site and execution environment, mobilizing survey alignments, soil stabilizing, and deep foundation footings.',
    image: '/assets/transformation/03_site.jpg',
    phaseCode: 'PHASE // 03-SITE',
    deliverables: ['Topographical Survey', 'Excavation & Shoring', 'Foundation Grid'],
  },
  {
    id: 'structure',
    step: '04',
    label: 'STRUCTURE',
    title: 'STRUCTURAL EXECUTION',
    tagline: 'Reinforced Concrete Framework',
    description: 'Progress through the main structural construction stage, erecting engineered RCC columns, load-bearing shear walls, and monolithic floor slabs.',
    image: '/assets/transformation/04_structure.jpg',
    phaseCode: 'PHASE // 04-STRUCTURE',
    deliverables: ['RCC Frame Curing', 'Shuttering Systems', 'Civil Quality Audits'],
  },
  {
    id: 'finish',
    step: '05',
    label: 'FINISH',
    title: 'FINISHING',
    tagline: 'Envelope & Detail Integration',
    description: 'Bring together finishes and project details, installing architectural glazing, natural stone cladding, bespoke millwork, and refined interiors.',
    image: '/assets/transformation/05_finish.jpg',
    phaseCode: 'PHASE // 05-FINISH',
    deliverables: ['Façade Glazing', 'Material Detailing', 'Acoustic & MEP Commissioning'],
  },
  {
    id: 'built',
    step: '06',
    label: 'BUILT',
    title: 'COMPLETED FORM',
    tagline: 'Architectural Permanence Handover',
    description: 'Reveal the completed architectural outcome, delivering a certified, structurally enduring built environment ready for seamless occupation.',
    image: '/assets/transformation/06_built.jpg',
    phaseCode: 'PHASE // 06-BUILT',
    deliverables: ['Final As-Built Handover', 'Structural Warranty', 'Move-In Readiness'],
  },
];

export const TurnkeyCapability: React.FC = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const railRef = useRef<HTMLDivElement>(null);

  const currentStage = TRANSFORMATION_STAGES[activeIdx];

  // Optional auto-rotation if user hasn't interacted
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TRANSFORMATION_STAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIdx(index);
      setIsPaused(true);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (index + 1) % TRANSFORMATION_STAGES.length;
      setActiveIdx(next);
      setIsPaused(true);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (index - 1 + TRANSFORMATION_STAGES.length) % TRANSFORMATION_STAGES.length;
      setActiveIdx(prev);
      setIsPaused(true);
    }
  };

  // Preload next image for instant responsive transitions
  useEffect(() => {
    const nextIdx = (activeIdx + 1) % TRANSFORMATION_STAGES.length;
    const img = new Image();
    img.src = TRANSFORMATION_STAGES[nextIdx].image;
  }, [activeIdx]);

  return (
    <section
      id="project-transformation"
      className="relative bg-[#FBFBFA] py-24 md:py-32 lg:py-36 border-b border-stone-200/80 overflow-hidden text-slate-900"
      aria-label="Project Transformation: From Idea to Built Form"
    >
      {/* Subtle Architectural Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E7E5E4_1px,transparent_1px),linear-gradient(to_bottom,#E7E5E4_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-[#C8A96B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-96 bg-slate-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* ========================================================== */}
        {/* SECTION HEADER                                             */}
        {/* ========================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-800 font-mono text-xs uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
              PROJECT TRANSFORMATION
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-light uppercase tracking-tight text-[#0F172A] leading-[0.95]">
              FROM IDEA <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#0F172A] via-[#C8A96B] to-[#9A7B38]">
                TO BUILT FORM
              </span>
            </h2>
          </div>

          {/* Supporting Copy */}
          <div className="max-w-md">
            <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed mb-4">
              Show how coordinated planning, construction and finishing bring a project from an initial concept toward a completed built environment.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-[#C8A96B] font-medium">
              <span>06 CONTINUOUS STAGES</span>
              <span className="w-6 h-[1px] bg-[#C8A96B]" />
              <span>SINGLE-POINT EXECUTION</span>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* MAIN ASYMMETRICAL TRANSFORMATION SHOWCASE                  */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* LEFT: Stage Information & Editorial Metadata (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            
            {/* Current Stage Indicator */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm font-bold tracking-widest text-[#C8A96B]">
                {currentStage.step} / 06
              </span>
              <span className="w-8 h-[1px] bg-[#C8A96B]/50" />
              <span className="font-mono text-xs tracking-widest text-slate-500 uppercase">
                {currentStage.phaseCode}
              </span>
            </div>

            {/* Dynamic Stage Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-medium uppercase tracking-tight text-[#0F172A] leading-tight">
                  {currentStage.title}
                </h3>
                
                <p className="text-xs sm:text-sm font-mono text-[#C8A96B] uppercase tracking-wider font-semibold">
                  {currentStage.tagline}
                </p>

                <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed pt-2">
                  {currentStage.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="pt-6 border-t border-stone-200/90 space-y-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold mb-3">
                    Stage Focus & Key Milestones
                  </div>
                  {currentStage.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A96B] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Direct Navigation Button */}
            <div className="pt-8 mt-6">
              <button
                type="button"
                onClick={() => navigate('/turnkey-construction')}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl group cursor-pointer"
              >
                <span>Explore Full Execution Process</span>
                <ArrowRight className="w-4 h-4 text-[#C8A96B] group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* RIGHT: Large Transformation Hero Visual (7 Cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div 
              className="relative aspect-[16/10] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl bg-slate-950 border border-stone-300/80 group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={currentStage.image}
                    alt={`${currentStage.title} - Perfect Mason Construction`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  {/* Elegant Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/70 via-transparent to-black/20" />
                </motion.div>
              </AnimatePresence>

              {/* Top Floating Stage Stamp */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse" />
                  <span>{currentStage.label}</span>
                </div>
              </div>

              {/* Bottom Visual Caption Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-white/90">
                <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 text-xs font-mono tracking-wider">
                  STAGE {currentStage.step} // {currentStage.title}
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-[#C8A96B]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PERFECT MASON SYSTEM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* SIX-STAGE ARCHITECTURAL PROGRESS RAIL                      */}
        {/* ========================================================== */}
        <div className="relative pt-6 border-t border-stone-300/80">
          
          {/* Horizontal Connecting Progress Line (Desktop) */}
          <div className="hidden md:block absolute top-[2.35rem] left-8 right-8 h-[2px] bg-stone-200 pointer-events-none">
            <motion.div
              className="h-full bg-gradient-to-r from-[#0F172A] to-[#C8A96B]"
              initial={false}
              animate={{
                width: `${(activeIdx / (TRANSFORMATION_STAGES.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* 6 Stage Buttons Rail */}
          <div
            ref={railRef}
            className="flex items-center justify-between gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory focus:outline-none"
            role="tablist"
            aria-label="Construction Transformation Stages"
          >
            {TRANSFORMATION_STAGES.map((stage, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={stage.id}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={0}
                  onClick={() => {
                    setActiveIdx(idx);
                    setIsPaused(true);
                  }}
                  onMouseEnter={() => {
                    setActiveIdx(idx);
                    setIsPaused(true);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`group relative flex-1 min-w-[130px] md:min-w-0 py-3 px-3 rounded-xl border text-left transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C8A96B] focus:ring-offset-2 snap-start ${
                    isActive
                      ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-lg'
                      : 'bg-white/80 border-stone-200/90 text-slate-700 hover:border-slate-400 hover:bg-white'
                  }`}
                >
                  {/* Top Pip Indicator */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono text-xs font-bold tracking-widest ${
                        isActive ? 'text-[#C8A96B]' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    >
                      {stage.step}
                    </span>
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-[#C8A96B] ring-4 ring-[#C8A96B]/20 scale-110'
                          : 'bg-stone-300 group-hover:bg-stone-400'
                      }`}
                    />
                  </div>

                  {/* Stage Name */}
                  <div
                    className={`font-heading text-sm md:text-base font-semibold uppercase tracking-tight leading-snug truncate ${
                      isActive ? 'text-white' : 'text-slate-800'
                    }`}
                  >
                    {stage.label}
                  </div>

                  {/* Micro Subtitle */}
                  <div
                    className={`text-[10px] font-mono uppercase tracking-wider truncate mt-0.5 ${
                      isActive ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    {stage.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================== */}
        {/* SECONDARY TECHNICAL INFORMATION STRIP                      */}
        {/* ========================================================== */}
        <div className="mt-8 pt-4 border-t border-stone-200/60 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 uppercase tracking-wider gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F172A]">PROJECT JOURNEY</span>
            <span>//</span>
            <span>06 DEFINED STAGES</span>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto">
            {['CONCEPT', 'PLAN', 'SITE', 'STRUCTURE', 'FINISH', 'BUILT'].map((name, i) => (
              <span
                key={name}
                className={`transition-colors ${
                  activeIdx === i ? 'text-[#C8A96B] font-bold underline underline-offset-4' : 'text-slate-400'
                }`}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
