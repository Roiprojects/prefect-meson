import React from 'react';
import { interiorsConfig } from '../../data/interiorsData';
import { Sparkles, Home, Building, CheckCircle2 } from 'lucide-react';

export const InteriorIntro: React.FC = () => {
  const { intro } = interiorsConfig;

  return (
    <section className="relative w-full bg-white pt-20 sm:pt-28 pb-16 sm:pb-20 border-b border-slate-100 select-none z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Top Eyebrow + Two-Column Headline Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            {/* Small Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-4 ring-slate-200/80" />
                <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950 animate-ping" />
              </div>

              <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.28em] text-slate-800 font-bold flex items-center gap-2">
                {intro.eyebrow}
                <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-950 uppercase tracking-tight leading-[1.06]">
              <span className="block text-slate-950">{intro.headline.line1}</span>
              <span className="block text-slate-950">{intro.headline.line2}</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed font-normal mb-6">
              {intro.description}
            </p>

            {/* Quick Service Categories */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-royal-100 text-slate-900 font-mono text-xs font-bold uppercase">
                <Home className="w-3.5 h-3.5 text-slate-950" />
                <span>Residential Interiors</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-bold uppercase">
                <Building className="w-3.5 h-3.5 text-slate-900" />
                <span>Commercial Interiors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Execution Capabilities Row */}
        <div className="pt-8 border-t border-slate-100">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 font-bold mb-4">
            COMPLETE INTERIOR EXECUTION CAPABILITIES
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {intro.capabilities.map((capability) => (
              <span
                key={capability}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-slate-700 font-sans text-xs font-medium hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 transition-colors"
              >
                <CheckCircle2 className="w-3 h-3 text-slate-950" />
                <span>{capability}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
