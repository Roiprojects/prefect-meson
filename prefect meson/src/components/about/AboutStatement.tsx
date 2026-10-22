import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CoreValueItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
}

const coreValuesList: CoreValueItem[] = [
  {
    id: 'integrity',
    num: '01',
    title: 'INTEGRITY',
    subtitle: 'Absolute Honesty & Fiduciary Trust',
    description: 'Operate with complete honesty and responsibility across every client relationship, contractual schedule, and material specification.',
    metric: '100% Itemized BOQ Transparency',
  },
  {
    id: 'quality',
    num: '02',
    title: 'QUALITY',
    subtitle: 'Zero-Defect Architectural Standards',
    description: 'Maintain a strong focus on structural excellence and disciplined execution at every milestone and concrete pour.',
    metric: '140+ Point Structural Audit',
  },
  {
    id: 'reliability',
    num: '03',
    title: 'RELIABILITY',
    subtitle: 'Accountable On-Site Supervision',
    description: 'Deliver with consistency, accountable certified civil engineer supervision, and unwavering schedule dependability.',
    metric: 'Dedicated Site Engineering Lead',
  },
  {
    id: 'transparency',
    num: '04',
    title: 'TRANSPARENCY',
    subtitle: 'Real-Time Financial & Stage Clarity',
    description: 'Keep communication, itemized financial allocations, and project milestones clear, open, and audit-ready at all times.',
    metric: 'Milestone-Linked Escrow Tracking',
  },
  {
    id: 'innovation',
    num: '05',
    title: 'INNOVATION',
    subtitle: 'Advanced BIM & Construction Tech',
    description: 'Embrace better structural ideas, advanced 3D BIM coordination methods, and digitally engineered building practices.',
    metric: 'Digital 3D Clash Detection',
  },
  {
    id: 'commitment',
    num: '06',
    title: 'COMMITMENT',
    subtitle: 'Uncompromising Structural Permanence',
    description: 'Stay committed to structural longevity, safety protocols, and client success throughout full lifecycle execution.',
    metric: 'Long-Term Structural Assurance',
  },
  {
    id: 'customer-satisfaction',
    num: '07',
    title: 'CUSTOMER SATISFACTION',
    subtitle: 'Client-Centric Turnkey Handover',
    description: 'Keep the client\'s requirements, spatial vision, and turnkey handover experience at the heart of every build.',
    metric: 'End-to-End Director Support',
  },
];

export const AboutStatement: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('quality');
  const easeLuxury = [0.22, 1, 0.36, 1];

  return (
    <section
      id="core-values"
      className="relative w-full bg-[#FFFFFF] text-slate-900 py-24 sm:py-32 lg:py-36 overflow-hidden select-none border-b border-slate-200"
    >
      {/* ---------------------------------------------------------------- */}
      {/* 0. ARCHITECTURAL CLEAN LIGHT GRID BACKGROUND                     */}
      {/* ---------------------------------------------------------------- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.4] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 z-10">
        
        {/* ============================================================ */}
        {/* 1. SECTION HEADER (CLEAN BLACK & WHITE TYPOGRAPHY)           */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeLuxury }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#0F172A] uppercase">
                CORE VALUES
              </span>
              <span className="w-8 h-[1px] bg-[#0F172A]" />
              <span className="font-mono text-[10px] sm:text-xs tracking-widest text-slate-500 uppercase hidden sm:inline-block">
                FOUNDATIONAL VALUES SYSTEM
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeLuxury }}
              className="font-barlow text-4xl sm:text-6xl lg:text-[4.2rem] font-bold text-slate-950 uppercase tracking-tight leading-[0.96]"
            >
              <span className="block text-slate-950">Principles That</span>
              <span className="block text-[#0F172A]">Guide Our Work.</span>
            </motion.h2>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: easeLuxury }}
              className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed font-normal mt-4 max-w-xl"
            >
              Strong projects begin with strong principles. Every blueprint, concrete pour, and client handover is guided by seven core values.
            </motion.p>
          </div>

          <div className="hidden lg:flex items-center gap-3 font-mono text-xs text-slate-700 bg-white border border-slate-200/90 shadow-sm px-4 py-2.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#0F172A]" />
            <span className="tracking-widest uppercase font-bold text-slate-900">
              7 GUIDING ORGANIZATIONAL PILLARS
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. REFINED TWO-COLUMN SPLIT (INTERACTIVE VALUES + PREVIEW)   */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 7 Values Interactive List */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            {coreValuesList.map((val) => {
              const isActive = activeId === val.id;

              return (
                <div
                  key={val.id}
                  onClick={() => setActiveId(val.id)}
                  onMouseEnter={() => setActiveId(val.id)}
                  className={`group relative flex flex-col p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white border-slate-900 shadow-lg scale-[1.01]'
                      : 'bg-white/60 hover:bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-xs sm:text-sm font-black transition-colors ${
                          isActive ? 'text-[#0F172A]' : 'text-slate-400 group-hover:text-slate-700'
                        }`}
                      >
                        {val.num}
                      </span>
                      <h3
                        className={`font-barlow text-2xl sm:text-3xl font-bold uppercase tracking-tight transition-colors ${
                          isActive ? 'text-slate-950' : 'text-slate-700 group-hover:text-slate-950'
                        }`}
                      >
                        {val.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-wider text-slate-400">
                        {val.subtitle}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isActive ? 'rotate-90 text-[#0F172A]' : 'text-slate-300 group-hover:text-slate-600'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Active Expandable Drawer */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: easeLuxury }}
                      className="pt-4 mt-3 border-t border-slate-100"
                    >
                      <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed font-normal mb-3">
                        {val.description}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 border border-slate-200/80 text-slate-800 font-mono text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0F172A]" />
                        <span>{val.metric}</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Architectural Value Showcase Card */}
          <div className="hidden lg:block lg:col-span-5 sticky top-32">
            {(() => {
              const currentVal = coreValuesList.find((v) => v.id === activeId) || coreValuesList[0];
              return (
                <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0F172A]/10 rounded-bl-full pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-3xl font-black text-[#0F172A]">
                      {currentVal.num}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 font-mono text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                      FOUNDATIONAL STANDARD
                    </span>
                  </div>

                  <h3 className="font-barlow text-4xl lg:text-5xl font-bold text-slate-950 uppercase tracking-tight leading-none mb-3">
                    {currentVal.title}
                  </h3>

                  <div className="font-mono text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-6">
                    {currentVal.subtitle}
                  </div>

                  <p className="text-base text-slate-600 font-sans leading-relaxed mb-8">
                    {currentVal.description}
                  </p>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#0F172A] shrink-0" />
                    <div>
                      <div className="font-mono text-[10px] uppercase text-slate-400 font-bold">
                        EXECUTION GUARANTEE
                      </div>
                      <div className="font-mono text-xs font-bold text-slate-900 uppercase">
                        {currentVal.metric}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>

      </div>
    </section>
  );
};
