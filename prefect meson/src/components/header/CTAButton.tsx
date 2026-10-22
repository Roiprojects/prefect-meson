import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  label = 'CONTACT US',
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 sm:gap-2.5 xl:gap-3 pl-3.5 sm:pl-4 xl:pl-5 pr-1.5 sm:pr-2 py-1.5 sm:py-2 bg-slate-950 hover:bg-black active:bg-royal-800 text-white rounded-full font-sans text-[11px] sm:text-[11.5px] xl:text-[12.5px] font-semibold tracking-[0.08em] xl:tracking-[0.14em] uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 shadow-sm hover:shadow-cta-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white select-none whitespace-nowrap shrink-0 ${className}`}
      aria-label={`${label} — Connect with Perfect Mason`}
    >
      <span className="tracking-[0.08em] xl:tracking-[0.14em] pl-0.5 font-semibold whitespace-nowrap">{label}</span>
      
      {/* Small White circular badge containing Royal Blue arrow with subtle Orange dot on hover */}
      <span className="relative w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7 rounded-full bg-white text-slate-950 flex items-center justify-center transition-transform duration-300 ease-out shadow-xs group-hover:scale-105 shrink-0">
        <ArrowRight
          className="w-2.5 h-2.5 sm:w-3 sm:h-3 xl:w-3.5 xl:h-3.5 text-slate-950 transform transition-transform duration-300 ease-out group-hover:translate-x-0.5"
          strokeWidth={2.5}
          aria-hidden="true"
        />
        
        {/* Subtle orange accent dot in badge */}
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-slate-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </span>
    </button>
  );
};
