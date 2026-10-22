import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 6 Coherent Architectural Transformation Stages
import img01Concept from '../../assets/process_architectural_planning.jpg';
import img02Planning from '../../assets/turnkey_01_blueprint.jpg';
import img03Site from '../../assets/about_active_construction.jpg';
import img04Structure from '../../assets/corp_main_construction.jpg';
import img05Finish from '../../assets/corp_detail_masonry.jpg';
import img06Built from '../../assets/cinematic_grand_estate.jpg';

export interface TransformationStage {
  id: string;
  step: string;
  stageName: string;
  headline: string;
  description: string;
  discipline: string;
  technicalMilestone: string;
  image: string;
}

export const transformationStages: TransformationStage[] = [
  {
    id: 'concept',
    step: '01',
    stageName: 'CONCEPT',
    headline: 'INITIAL IDEA',
    description: 'Translate the project requirement into an initial architectural direction.',
    discipline: 'ARCHITECTURAL CONCEPTION',
    technicalMilestone: 'Spatial zoning, orientation studies and volumetric feasibility analysis.',
    image: img01Concept,
  },
  {
    id: 'planning',
    step: '02',
    stageName: 'PLANNING',
    headline: 'PROJECT PLANNING',
    description: 'Develop the planning direction required for execution.',
    discipline: 'ENGINEERING & ESTIMATION',
    technicalMilestone: 'Verified CAD blueprints, structural load calculations and itemized BOQ.',
    image: img02Planning,
  },
  {
    id: 'site',
    step: '03',
    stageName: 'SITE',
    headline: 'SITE PREPARATION',
    description: 'Move the project into the physical site and execution environment.',
    discipline: 'EARTHWORK & LOGISTICS',
    technicalMilestone: 'Topographic grid setting, soil bearing tests and foundation excavation.',
    image: img03Site,
  },
  {
    id: 'structure',
    step: '04',
    stageName: 'STRUCTURE',
    headline: 'STRUCTURAL EXECUTION',
    description: 'Progress through the main structural construction stage.',
    discipline: 'RCC SUPERSTRUCTURE',
    technicalMilestone: 'Reinforced concrete columns, post-tensioned slabs and core framing.',
    image: img04Structure,
  },
  {
    id: 'finish',
    step: '05',
    stageName: 'FINISH',
    headline: 'FINISHING',
    description: 'Bring together finishes and project details.',
    discipline: 'FACADES & INTERIORS',
    technicalMilestone: 'Architectural masonry, acoustic glazing, MEP routing and millwork.',
    image: img05Finish,
  },
  {
    id: 'built',
    step: '06',
    stageName: 'BUILT',
    headline: 'COMPLETED FORM',
    description: 'Reveal the completed architectural outcome.',
    discipline: 'HANDOVER & OCCUPANCY',
    technicalMilestone: 'Multi-point quality certification, as-built records and key handover.',
    image: img06Built,
  },
];

export const ConstructionProcess: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const isReduced = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeStage = transformationStages[activeIndex];
  const easeCubic = [0.22, 1, 0.36, 1];

  // Auto progression every 5.5 seconds when not hovered
  useEffect(() => {
    if (isPaused || isReduced) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % transformationStages.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isReduced]);

  const handleNextStage = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % transformationStages.length);
  }, []);

  const handlePrevStage = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0 ? transformationStages.length - 1 : prev - 1
    );
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIndex(index);
    }
  };

  return (
    <section
      id="construction-process"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-[#FFFFFF] text-slate-900 py-16 sm:py-24 lg:py-28 overflow-hidden select-none border-b border-slate-200"
    >
      {/* Subtle Architectural Datum Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#F1F5F9_1px,transparent_1px),linear-gradient(to_bottom,#F1F5F9_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60 pointer-events-none" />

      {/* Floating Registration Mark */}
      <div className="absolute top-6 left-8 text-slate-400 font-mono text-[10px] pointer-events-none select-none tracking-widest hidden sm:block">
        + [TRANSFORMATION ROADMAP: STAGE 01 — 06]
      </div>
      <div className="absolute top-6 right-8 text-slate-400 font-mono text-[10px] pointer-events-none select-none tracking-widest hidden sm:block">
        + DATUM REF: IDEA TO BUILT FORM
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 z-10 space-y-12 sm:space-y-16">
        
        {/* ============================================================ */}
        {/* 1. SECTION HEADER                                            */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: easeCubic }}
              className="flex items-center gap-2.5 mb-3"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-4 ring-slate-200/80" />
                <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950 animate-ping" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-slate-800 flex items-center gap-1.5">
                PROJECT TRANSFORMATION
                <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: easeCubic }}
              className="font-display text-3xl sm:text-5xl lg:text-[54px] font-bold text-slate-950 uppercase tracking-tight leading-[1.02]"
            >
              FROM IDEA <br />
              <span className="text-slate-950">TO BUILT FORM.</span>
            </motion.h2>
          </div>

          <div className="max-w-md space-y-3">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.14, ease: easeCubic }}
              className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed font-normal"
            >
              Show how coordinated planning, construction and finishing bring a project from an initial concept toward a completed built environment.
            </motion.p>

            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              <span>STAGE {activeStage.step} OF 06: {activeStage.stageName}</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. MAIN ASYMMETRIC TRANSFORMATION STAGE                      */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: STAGE DETAILS & EDITORIAL CONTEXT (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: easeCubic }}
                className="space-y-5"
              >
                {/* Stage Badge & Step Indicator */}
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-white bg-slate-950 px-3 py-1 rounded-lg">
                    STAGE {activeStage.step}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {activeStage.discipline}
                  </span>
                </div>

                {/* Main Stage Headline */}
                <h3 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold uppercase text-slate-950 tracking-tight leading-none">
                  {activeStage.headline}
                </h3>

                {/* Primary Short Description */}
                <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed font-normal">
                  {activeStage.description}
                </p>

                {/* Technical Milestone Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    EXECUTION MILESTONE
                  </span>
                  <p className="text-xs sm:text-[13px] text-slate-800 font-sans leading-relaxed font-medium">
                    {activeStage.technicalMilestone}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Stage Controls & CTA */}
            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/turnkey-construction')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-950 hover:bg-black text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>EXPLORE EXECUTION</span>
                <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevStage}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-xs font-bold transition-colors cursor-pointer"
                  title="Previous Stage"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={handleNextStage}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-xs font-bold transition-colors cursor-pointer"
                  title="Next Stage"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: LARGE DOMINANT TRANSFORMATION VISUAL (7 COLS) */}
          <div className="lg:col-span-7">
            <div
              onClick={handleNextStage}
              className="group relative w-full aspect-[16/10] sm:aspect-[16/11] lg:aspect-[16/10] rounded-[32px] overflow-hidden bg-slate-950 border border-slate-300 shadow-2xl cursor-pointer"
            >
              {/* Dynamic Masked Image Stage with Scale Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.65, ease: easeCubic }}
                  className="relative w-full h-full"
                >
                  <img
                    src={activeStage.image}
                    alt={activeStage.headline}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000 ease-out"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Architectural HUD Tags */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none z-20">
                <div className="px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-bold uppercase tracking-wider shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                  <span>PHASE {activeStage.step}: {activeStage.stageName}</span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-mono text-[10px] uppercase font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>VERIFIED NDL PROTOCOL</span>
                </div>
              </div>

              {/* Bottom In-Image Tag */}
              <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between pointer-events-none text-white">
                <div>
                  <span className="font-mono text-[10px] uppercase text-orange-400 font-bold tracking-widest block mb-0.5">
                    {activeStage.discipline}
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white drop-shadow">
                    {activeStage.headline}
                  </h4>
                </div>

                <span className="font-mono text-[10px] text-slate-300 tracking-widest hidden sm:inline-block">
                  CLICK IMAGE TO ADVANCE →
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 3. SIX-STAGE PROGRESS RAIL (REFINED ARCHITECTURAL TIMELINE)  */}
        {/* ============================================================ */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          
          {/* Top Label & Technical Strip */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-slate-500 uppercase tracking-widest">
              PROJECT JOURNEY • 06 STAGES
            </span>
            <span className="text-slate-400 hidden sm:inline-block">
              CONCEPT → PLAN → SITE → STRUCTURE → FINISH → BUILT
            </span>
          </div>

          {/* Progress Bar Line */}
          <div className="relative w-full h-1 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-slate-950 rounded-full"
              initial={false}
              animate={{
                width: `${((activeIndex + 1) / transformationStages.length) * 100}%`,
              }}
              transition={{ duration: 0.45, ease: easeCubic }}
            />
          </div>

          {/* 6 Stage Buttons Rail (Desktop & Horizontal Scrollable Mobile) */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3"
            role="tablist"
            aria-label="6 Project Transformation Stages"
          >
            {transformationStages.map((stage, idx) => {
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;

              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={0}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-slate-950 text-white border-slate-950 shadow-lg -translate-y-1'
                      : isPast
                      ? 'bg-slate-100/90 text-slate-800 border-slate-300 hover:bg-slate-200/80'
                      : 'bg-slate-50/80 text-slate-600 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-white/20 text-orange-400'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {stage.step}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive
                          ? 'bg-orange-400'
                          : isPast
                          ? 'bg-emerald-500'
                          : 'bg-slate-300'
                      }`}
                    />
                  </div>

                  <div>
                    <span
                      className={`font-mono text-[9px] uppercase tracking-wider block ${
                        isActive ? 'text-slate-400' : 'text-slate-400'
                      }`}
                    >
                      STAGE {stage.step}
                    </span>
                    <h5
                      className={`font-display text-sm font-bold uppercase tracking-tight ${
                        isActive ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {stage.stageName}
                    </h5>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
