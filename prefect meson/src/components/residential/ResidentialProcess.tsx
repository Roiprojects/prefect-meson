import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProcessStage {
  step: string;
  phase: string;
  title: string;
  summary: string;
  deliverables: string[];
}

const stages: ProcessStage[] = [
  {
    step: '01',
    phase: 'IDEA',
    title: 'Initial Consultation',
    summary: 'Discovery meeting with senior civil engineering directors to understand lifestyle requirements, architectural drawings, site constraints, and delivery timelines.',
    deliverables: ['Requirement Brief Documentation', 'Execution Strategy Alignment', 'Timeline Feasibility Roadmap'],
  },
  {
    step: '02',
    phase: 'UNDERSTAND',
    title: 'Requirement Understanding',
    summary: 'In-depth architectural review, family spatial layout zoning, structural load analysis, and luxury material preferences (exposed RCC, wire-cut brick, marble).',
    deliverables: ['Room-by-Room Area Schedules', 'Architect Drawing Verification', 'Structural Load Parameters'],
  },
  {
    step: '03',
    phase: 'SITE',
    title: 'Site Evaluation',
    summary: 'Geotechnical soil investigation, safe bearing capacity (SBC) assessment, topography levelling survey, boundary pegging, and utility access logistics.',
    deliverables: ['Soil Core Borehole Report', 'Topographical Grid Survey', 'Substructure Foundation Strategy'],
  },
  {
    step: '04',
    phase: 'PLAN',
    title: 'Design & Planning',
    summary: 'Structural engineering drawing detailing, municipal sanction coordination, 3D BIM coordination, and plumbing/electrical conduit routing diagrams.',
    deliverables: ['RCC Structural Drawings', 'Municipal Sanction Filings', 'Integrated MEP Working Drawings'],
  },
  {
    step: '05',
    phase: 'BUDGET',
    title: 'Budget Estimation',
    summary: 'Itemized transparent Bill of Quantities (BOQ) with certified material brands, locked unit rates, and milestone-linked payment disbursements with zero escalation.',
    deliverables: ['Locked Itemized BOQ', 'Brand Specification Matrix', 'Milestone Linked Cashflow Schedule'],
  },
  {
    step: '06',
    phase: 'BUILD',
    title: 'Construction',
    summary: 'Heavy civil execution, deep raft footings, vibrator-compacted columns, floating slabs, exposed architectural brickwork, and daily digital site reporting.',
    deliverables: ['Substructure & Plinth Casting', 'RCC Superstructure Frames', 'Precision Civil Wall Masonry'],
  },
  {
    step: '07',
    phase: 'QUALITY',
    title: 'Quality Checks',
    summary: 'Multi-tier batch testing including 7 & 28-day concrete cube compression tests, ultrasonic rebar inspection, and 72-hour waterproofing ponding audits.',
    deliverables: ['Concrete Cube Compression Reports', '72-Hour Waterproofing Flood Certification', 'Plumbing 10-Bar Pressure Test'],
  },
  {
    step: '08',
    phase: 'FINISH',
    title: 'Final Finishing',
    summary: 'Precision wall plastering, Italian marble mirror grinding, seasoned teak wood door joinery, false ceilings, architectural reveals, and painting coats.',
    deliverables: ['Diamond Polished Marble Floors', 'Teak Wood Joinery & Modular Cabinets', 'Airless Luxury Interior Emulsions'],
  },
  {
    step: '09',
    phase: 'HANDOVER',
    title: 'Handover',
    summary: 'Zero-defect pre-handover snag clearance, deep chemical cleaning, as-built documentation, structural warranty certificates, and ceremonial key handover.',
    deliverables: ['As-Built Drawing Dossier', 'Structural Warranty Certificates', 'Ceremonial Move-In Key Handover'],
  },
];

export const ResidentialProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = stages[activeStep];
  const easeCubic = [0.22, 1, 0.36, 1];

  return (
    <section className="relative w-full bg-white text-slate-900 py-20 sm:py-28 border-b border-slate-200 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full mb-4">
              <GitCommit className="w-3.5 h-3.5 text-[#071D38]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                5.4 // 9-STAGE RESIDENTIAL CONSTRUCTION SEQUENCE
              </span>
            </div>
            <h2 className="font-barlow text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#071D38] leading-[1.05]">
              Home Construction Process
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-slate-600 font-sans leading-relaxed lg:text-right">
            A systematic engineering progression from initial brief and site soil testing to precision civil construction, batch audits, and zero-defect key handover.
          </p>
        </div>

        {/* Visual Progression Line (IDEA → SITE → PLAN → BUDGET → BUILD → QUALITY → FINISH → HANDOVER) */}
        <div className="mb-10 overflow-x-auto pb-4">
          <div className="flex items-center justify-between min-w-[760px] relative">
            {/* Connecting Track Line */}
            <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
            
            {stages.map((st, i) => {
              const isActive = i === activeStep;
              const isPassed = i < activeStep;

              return (
                <button
                  key={st.step}
                  onClick={() => setActiveStep(i)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-[#071D38] text-white scale-110 shadow-lg ring-4 ring-[#071D38]/15'
                        : isPassed
                        ? 'bg-slate-800 text-white'
                        : 'bg-white text-slate-500 border-2 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {st.step}
                  </div>
                  <span
                    className={`mt-2 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      isActive ? 'text-[#071D38]' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  >
                    {st.phase}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Presentation */}
        <div className="bg-[#F8FAFC] rounded-[32px] p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-xs">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: easeCubic }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#071D38] text-white rounded-md font-mono text-xs font-bold">
                    STAGE {current.step}
                  </span>
                  <span className="font-mono text-xs text-slate-500 font-bold uppercase tracking-widest">
                    PHASE: {current.phase}
                  </span>
                </div>

                <h3 className="font-barlow text-3xl sm:text-4xl font-bold uppercase text-slate-950 tracking-tight mb-4">
                  {current.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed mb-6">
                  {current.summary}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : 0))}
                    disabled={activeStep === 0}
                    className="px-4 py-2 rounded-full border border-slate-300 text-xs font-mono font-bold uppercase disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep((prev) => (prev < stages.length - 1 ? prev + 1 : prev))}
                    disabled={activeStep === stages.length - 1}
                    className="px-4 py-2 rounded-full bg-[#071D38] text-white text-xs font-mono font-bold uppercase disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed flex items-center gap-1.5"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-4">
                  STAGE DELIVERABLES & VERIFICATIONS:
                </span>
                <div className="space-y-3">
                  {current.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#071D38] shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
