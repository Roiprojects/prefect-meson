import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';

interface HeroCTAProps {
  onQuoteClick: () => void;
  onExploreClick?: () => void;
}

export const HeroCTA: React.FC<HeroCTAProps> = ({
  onQuoteClick,
  onExploreClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-row items-center justify-center gap-2 sm:gap-4 pt-1 sm:pt-2 w-full max-w-sm sm:max-w-none mx-auto select-none"
    >
      {/* 1. PRIMARY CTA: GET A QUOTE */}
      <button
        onClick={onQuoteClick}
        className="group relative flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 sm:gap-3.5 pl-3.5 pr-1.5 py-2.5 sm:pl-6 sm:pr-2.5 sm:py-3.5 bg-slate-950 hover:bg-black active:bg-royal-800 text-white rounded-full font-sans text-[11px] sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.14em] uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 shadow-sm hover:shadow-cta-glow focus:outline-none shrink-0"
        aria-label="Get a Quote — Project Consultation"
      >
        <span className="whitespace-nowrap">GET A QUOTE</span>
        
        {/* Small White Circular Arrow Badge */}
        <span className="relative w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-white text-slate-950 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105 shadow-xs shrink-0">
          <ArrowRight
            className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-slate-950 transform transition-transform duration-300 ease-out group-hover:translate-x-0.5"
            strokeWidth={2.5}
            aria-hidden="true"
          />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-slate-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </span>
      </button>

      {/* 2. SECONDARY CTA: EXPLORE OUR PROJECTS */}
      <button
        onClick={onExploreClick}
        className="group flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3.5 bg-white/95 hover:bg-slate-100/90 active:bg-slate-200/80 text-slate-950 rounded-full font-sans text-[11px] sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.14em] uppercase border-2 border-slate-950 transition-all duration-300 ease-out hover:-translate-y-0.5 shadow-xs focus:outline-none shrink-0"
        aria-label="Explore Our Projects"
      >
        <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950 group-hover:rotate-45 transition-transform duration-300 shrink-0" />
        <span className="whitespace-nowrap sm:hidden">PROJECTS</span>
        <span className="whitespace-nowrap hidden sm:inline">EXPLORE OUR PROJECTS</span>
      </button>
    </motion.div>
  );
};
