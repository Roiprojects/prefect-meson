import React from 'react';
import { motion } from 'framer-motion';
import { impactConfig, ImpactStatistic } from '../../data/impactData';
import { StatCounter } from './StatCounter';
import { ArrowUpRight } from 'lucide-react';

export const OurImpact: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="our-impact"
      className="relative w-full bg-white text-slate-900 py-14 sm:py-20 z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* ============================================================ */}
        {/* 1. SECTION EYEBROW                                          */}
        {/* ============================================================ */}
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-4 ring-slate-200/80" />
            <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950" />
          </div>

          <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.28em] text-slate-800 font-bold select-none">
            {impactConfig.eyebrow}
          </span>
        </div>

        {/* ============================================================ */}
        {/* 2. TWO-COLUMN EDITORIAL HEADING AREA                         */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-14 sm:mb-20">
          {/* Left Large Headline */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.65rem] font-bold text-slate-950 uppercase tracking-tight leading-[1.04]">
              <span className="block text-slate-950">{impactConfig.headline.line1}</span>
              <span className="block text-slate-950">{impactConfig.headline.line2}</span>
            </h2>
          </div>

          {/* Right Supporting Narrative Paragraph */}
          <div className="lg:col-span-5 lg:pt-3">
            <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed font-normal">
              {impactConfig.description}
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. THREE-COLUMN COMPOSITION: [ IMAGE | STATS | IMAGE ]       */}
        {/* ============================================================ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-stretch"
        >
          {/* ---------------------------------------------------------- */}
          {/* LEFT COLUMN: ACTIVE CONSTRUCTION PORTRAIT IMAGE           */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex flex-col"
          >
            <div className="group relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] rounded-[28px] overflow-hidden bg-slate-100 border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-md">
              <img
                src={impactConfig.leftImage.src}
                alt={impactConfig.leftImage.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* Daylight Shadow Gradient at Base */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Stage Pill Overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] font-mono tracking-wider font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  {impactConfig.leftImage.badge}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ---------------------------------------------------------- */}
          {/* CENTER COLUMN: THREE STACKED STATISTIC ROWS                */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex flex-col justify-between gap-4 sm:gap-5"
          >
            {impactConfig.statistics.map((stat: ImpactStatistic, index: number) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="group relative flex-1 p-6 sm:p-7 rounded-[24px] bg-slate-50/90 border border-slate-200/80 hover:border-slate-300 hover:bg-blue-50/40 shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Row: Index + Micro Indicator */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                  <span>0{index + 1} // CAPACITY</span>
                  <div className="flex items-center gap-1.5 text-slate-950 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold">VERIFIED</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Main Content: Number on Left, Label on Right */}
                <div className="flex items-baseline justify-between gap-4 mt-auto">
                  <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 group-hover:text-slate-950 transition-colors">
                    <StatCounter
                      value={stat.numericValue}
                      suffix={stat.suffix}
                    />
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 block">
                      {stat.label}
                    </span>
                    {stat.description && (
                      <span className="text-[11px] text-slate-500 block mt-0.5 max-w-[180px] ml-auto font-sans leading-tight">
                        {stat.description}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Active Accent Line */}
                <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-royal-600/0 via-royal-600/40 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>

          {/* ---------------------------------------------------------- */}
          {/* RIGHT COLUMN: COMPLETED COMMERCIAL ARCHITECTURE IMAGE      */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex flex-col"
          >
            <div className="group relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] rounded-[28px] overflow-hidden bg-slate-100 border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-md">
              <img
                src={impactConfig.rightImage.src}
                alt={impactConfig.rightImage.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* Daylight Shadow Gradient at Base */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Stage Pill Overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] font-mono tracking-wider font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-royal-400 animate-pulse" />
                  {impactConfig.rightImage.badge}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
