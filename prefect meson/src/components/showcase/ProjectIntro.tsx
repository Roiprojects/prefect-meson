import React from 'react';
import { showcaseConfig } from '../../data/showcaseData';

export const ProjectIntro: React.FC = () => {
  const { intro } = showcaseConfig;

  return (
    <section className="relative w-full bg-white pt-20 sm:pt-28 pb-16 sm:pb-24 border-b border-slate-100 select-none z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-4 ring-slate-200/80" />
            <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950" />
          </div>

          <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.28em] text-slate-800 font-bold">
            {intro.eyebrow}
          </span>
        </div>

        {/* Two-Column Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-950 uppercase tracking-tight leading-[1.06]">
              <span className="block text-slate-950">{intro.headline.line1}</span>
              <span className="block text-slate-950">{intro.headline.line2}</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-3">
            <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed font-normal">
              {intro.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
