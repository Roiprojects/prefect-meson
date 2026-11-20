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
      className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-2 w-full sm:w-auto select-none"
    >
      {/* 1. PRIMARY CTA: GET A QUOTE */}
      <button
        onClick={onQuoteClick}
        className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3.5 pl-6 pr-2.5 py-3 sm:py-3.5 bg-slate-950 hover:bg-black active:bg-royal-800 text-white rounded-full font-sans text-[13px] font-bold tracking-[0.14em] uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 shadow-sm hover:shadow-cta-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-500 focus-visible:ring-offset-2"
        aria-label="Get a Quote — Project Consultation"
      >
        <span className="tracking-[0.14em]">GET A QUOTE</span>
        
        {/* Small White Circular Arrow Badge with Orange Micro-cue */}
        <span className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-slate-950 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105 shadow-xs">
          <ArrowRight
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950 transform transition-transform duration-300 ease-out group-hover:translate-x-0.5"
            strokeWidth={2.5}
            aria-hidden="true"
          />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-slate-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </span>
      </button>

      {/* 2. SECONDARY CTA: EXPLORE OUR PROJECTS */}
      <button
        onClick={onExploreClick}
        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:py-3.5 bg-white/90 hover:bg-slate-100/80 active:bg-slate-200/60 text-slate-950 rounded-full font-sans text-[13px] font-bold tracking-[0.14em] uppercase border-2 border-slate-950 transition-all duration-300 ease-out hover:-translate-y-0.5 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
        aria-label="Explore Our Projects"
      >
        <Compass className="w-4 h-4 text-slate-950 group-hover:rotate-45 transition-transform duration-300" />
        <span className="tracking-[0.14em]">EXPLORE OUR PROJECTS</span>
      </button>
    </motion.div>
  );
};
