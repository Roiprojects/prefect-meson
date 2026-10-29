import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, Building2 } from 'lucide-react';

// Authentic High-Resolution Commercial Construction Imagery (Mr. Venkatarama Raju & Mr. Nataraj)
const imgMainCommercial = '/projects/mr_venkatarama_raju/raju_01_commercial_facade_retail.jpg';
const imgDetailCommercial = '/projects/mr_nataraj/nataraj_01_commercial_complex_street_view.png';

interface CommercialIntroProps {
  onOpenQuoteModal?: () => void;
}

const commercialCapabilities = [
  'PLANNING',
  'CIVIL CONSTRUCTION',
  'STRUCTURAL WORK',
  'ELECTRICAL COORDINATION',
  'PLUMBING COORDINATION',
  'FINISHING',
  'INTERIOR EXECUTION',
  'PROJECT MANAGEMENT',
];

const commercialProjectTypes = [
  'OFFICE BUILDINGS',
  'COMMERCIAL COMPLEXES',
  'RETAIL SPACES',
  'SHOWROOMS',
  'RESTAURANTS',
  'HOSPITALITY PROJECTS',
  'INSTITUTIONAL BUILDINGS',
  'INDUSTRIAL / BUSINESS SPACES',
];

export const CommercialIntro: React.FC<CommercialIntroProps> = ({ onOpenQuoteModal }) => {
  const [hoveredCapability, setHoveredCapability] = useState<string | null>(null);
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const isReduced = useReducedMotion();
  const easeLuxury = [0.22, 1, 0.36, 1];

  return (
    <section
      id="commercial-intro"
      className="relative w-full bg-white text-slate-900 pt-24 sm:pt-32 pb-20 sm:pb-28 overflow-hidden select-none border-b border-slate-200"
    >
      {/* ---------------------------------------------------------------- */}
      {/* 0. SUBTLE ARCHITECTURAL LINEWORK & LIGHT GRID                    */}
      {/* ---------------------------------------------------------------- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#F1F5F9_1px,transparent_1px),linear-gradient(to_bottom,#F1F5F9_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] opacity-70 pointer-events-none" />

      <div className="relative max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 z-10">
        
        {/* ============================================================ */}
        {/* 1. ASYMMETRICAL CORPORATE HERO GRID (CONTENT + 60% VISUAL)   */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
          
          {/* Left Column: Authoritative Editorial Positioning (40-45%) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Section Index Marker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeLuxury }}
              className="flex items-center gap-3 mb-4 sm:mb-5"
            >
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-slate-900 uppercase">
                04.1
              </span>
              <span className="text-slate-300 text-sm">/</span>
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.22em] text-slate-600 uppercase">
                COMMERCIAL CONSTRUCTION
              </span>
            </motion.div>

            {/* Main Headline (Barlow Condensed) */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeLuxury }}
              className="font-barlow text-4xl sm:text-6xl lg:text-[4.2rem] font-bold text-slate-950 uppercase tracking-tight leading-[0.96] mb-6"
            >
              <span className="block text-slate-950">Commercial Construction,</span>
              <span className="block text-slate-700">Built for Business.</span>
            </motion.h1>

            {/* Introduction Copy */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: easeLuxury }}
              className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed font-normal mb-8 max-w-xl"
            >
              Perfect Mason provides structured commercial construction solutions for businesses, organizations, investors and commercial property owners. Our approach brings planning, construction coordination, execution and finishing together to support projects from early requirements through completion.
            </motion.p>

            {/* Compact Commercial Capability Statement */}
            <div className="mb-8 pt-6 border-t border-slate-200">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-3">
                INTEGRATED COMMERCIAL CAPABILITIES
              </span>

              <div className="flex flex-wrap gap-2.5">
                {commercialCapabilities.map((cap) => {
                  const isHovered = hoveredCapability === cap;
                  return (
                    <button
                      key={cap}
                      type="button"
                      onMouseEnter={() => setHoveredCapability(cap)}
                      onMouseLeave={() => setHoveredCapability(null)}
                      onFocus={() => setHoveredCapability(cap)}
                      onBlur={() => setHoveredCapability(null)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-left font-mono text-[11px] font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                        isHovered
                          ? 'bg-slate-950 border-slate-950 text-white shadow-sm translate-x-0.5'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <ChevronRight className={`w-3 h-3 transition-transform ${isHovered ? 'text-white' : 'text-slate-400'}`} />
                      <span>{cap}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenQuoteModal?.()}
                className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-xl bg-slate-950 hover:bg-black active:scale-[0.98] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-xl cursor-pointer"
              >
                <span>Discuss Your Commercial Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 text-slate-300" />
              </button>
            </div>

          </div>

          {/* Right Column: Dominant 55–65% Architectural Image Canvas */}
          <div className="lg:col-span-7 relative">
            
            {/* Main Architectural Image Frame */}
            <motion.div
              initial={isReduced ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeLuxury }}
              className="relative w-full h-[420px] sm:h-[540px] lg:h-[620px] rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-slate-950 group"
            >
              <img
                src={imgMainCommercial}
                alt="Mr. Venkatarama Raju Commercial Building, JP Nagar 9th Phase"
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                loading="eager"
              />

              {/* Natural Shading Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />

              {/* Top-Left Technical Annotation */}
              <div className="absolute top-6 left-6 z-20 pointer-events-none">
                <div className="bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-white/15 text-white font-mono text-[11px] tracking-widest uppercase flex items-center gap-2.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>MR. VENKATARAMA RAJU // JP NAGAR 9TH PHASE</span>
                  <span className="text-white/30">•</span>
                  <span className="font-bold text-slate-200">04.1</span>
                </div>
              </div>

              {/* In-Image Status Badge (Bottom-Left) */}
              <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none flex items-end justify-between">
                <div className="max-w-md text-white">
                  <span className="font-mono text-[10px] uppercase text-slate-300 tracking-[0.2em] font-bold block mb-1">
                    MR. VENKATARAMA RAJU COMMERCIAL BUILDING
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-slate-200 font-normal">
                    Meenal Cavale (MJC Architects) • G+4 Flagship Retail Showroom & Column-Free Floor Plates.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Small Overlapping Secondary Detail Image (Bottom-Right) */}
            <motion.div
              initial={isReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease: easeLuxury }}
              className="absolute -bottom-6 sm:-bottom-8 -left-4 sm:-left-8 w-44 sm:w-60 h-32 sm:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-slate-900 hidden sm:block group"
            >
              <img
                src={imgDetailCommercial}
                alt="Mr. Nataraj Commercial Cum Residence Complex, HSR Layout"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-slate-950/90 backdrop-blur-xs px-2 py-1 rounded text-[9px] font-mono text-white tracking-wider uppercase text-center border border-white/10">
                MR. NATARAJ // HSR LAYOUT
              </div>
            </motion.div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* 2. PROJECT-TYPE PREVIEW (FLOWING TYPOGRAPHIC TREATMENT)      */}
        {/* ============================================================ */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="shrink-0 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
              <Building2 className="w-4 h-4 text-slate-900" />
              <span>COMMERCIAL PROJECT TYPES:</span>
            </div>

            {/* Horizontal Flowing Typographic List */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-none flex-wrap">
              {commercialProjectTypes.map((type, idx) => {
                const isHovered = hoveredType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onMouseEnter={() => setHoveredType(type)}
                    onMouseLeave={() => setHoveredType(null)}
                    onFocus={() => setHoveredType(type)}
                    onBlur={() => setHoveredType(null)}
                    className={`font-barlow text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      isHovered ? 'text-slate-950 scale-105' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>{type}</span>
                    {idx < commercialProjectTypes.length - 1 && (
                      <span className="text-slate-300 font-normal select-none">•</span>
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
