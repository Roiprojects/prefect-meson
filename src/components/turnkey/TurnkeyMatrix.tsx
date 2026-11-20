import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { turnkeyData } from '../../data/turnkeyData';

export const TurnkeyMatrix: React.FC = () => {
  const { matrix } = turnkeyData;

  return (
    <section className="relative w-full py-24 md:py-32 bg-white overflow-hidden selection:bg-slate-200">
      {/* Huge Background Text */}
      <div className="absolute top-10 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden opacity-[0.02] mix-blend-multiply z-0">
        <h2 className="text-[100px] md:text-[180px] lg:text-[240px] font-display font-bold leading-none whitespace-nowrap text-slate-900 tracking-tighter">
          {matrix.bgText}
        </h2>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-slate-950"></div>
            <span className="font-display font-bold text-slate-950 text-[11px] sm:text-xs md:text-sm tracking-[0.2em] uppercase">
              {matrix.label}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[9px] md:text-[10px] text-slate-400 font-semibold tracking-[0.25em] uppercase hidden md:block">
              {matrix.topRightText}
            </span>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left: 3 Phases (takes 8 cols on xl) */}
          <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
            {matrix.phases.map((phase, index) => (
              <motion.div 
                key={phase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="flex flex-col"
              >
                {/* Phase Header */}
                <div className="mb-10 relative">
                  <h3 className="font-display font-bold text-slate-950 text-sm lg:text-base tracking-wider uppercase mb-3 pr-4">
                    {phase.title}
                  </h3>
                  <p className="font-sans text-xs lg:text-sm text-slate-500 font-light leading-relaxed">
                    {phase.subtitle}
                  </p>
                  
                  {/* Subtle divider line matching the reference */}
                  <div className="absolute -bottom-5 left-0 right-0 h-px bg-slate-100"></div>
                </div>

                {/* Phase Items */}
                <div className="flex flex-col gap-8">
                  {phase.items.map((item, i) => (
                    <Link 
                      key={i} 
                      to={item.href || '#'}
                      className="flex flex-col relative group cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5 transition-transform duration-300 group-hover:translate-x-1">
                        <h4 className="font-sans font-bold text-slate-800 text-sm lg:text-[15px] group-hover:text-slate-950 transition-colors">
                          {item.title}
                        </h4>
                        {item.badge && (
                          <span className="shrink-0 border border-orange-200 text-slate-900 bg-orange-50/50 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full whitespace-nowrap">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-[13px] lg:text-[14px] text-slate-500 font-light leading-relaxed pr-2 group-hover:text-slate-700 transition-colors">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Card (takes 4 cols on xl) */}
          <div className="xl:col-span-4 flex items-start">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full bg-white rounded-[24px] md:rounded-[32px] p-4 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
            >
              {/* Card Image */}
              <div className="relative w-full aspect-[4/3] rounded-[16px] md:rounded-[24px] overflow-hidden mb-8">
                <img 
                  src="/assets/showcase_03_turnkey.jpg" 
                  alt="Turnkey Methodology" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                
                {/* Top Left Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                  <span className="font-display font-bold text-[9px] md:text-[10px] text-slate-950 tracking-widest uppercase">
                    {matrix.card.badge}
                  </span>
                </div>

                {/* Bottom Text Over Image */}
                <div className="absolute bottom-5 left-5 right-5">
                  <h4 className="font-display font-bold text-white text-lg md:text-xl tracking-wide uppercase mb-1">
                    {matrix.card.imageTitle}
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-slate-300 font-light">
                    {matrix.card.imageSubtitle}
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4 mb-8 px-2">
                {matrix.card.stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <span className="font-mono text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase">
                      {stat.label}
                    </span>
                    <span className="font-sans text-[15px] font-bold text-slate-800">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Link */}
              <div className="px-2 pb-2">
                <Link 
                  to={matrix.card.linkUrl}
                  className="group inline-flex items-center gap-2 font-display text-[11px] md:text-xs font-bold text-slate-950 tracking-[0.15em] uppercase hover:text-royal-800 transition-colors"
                >
                  <span>{matrix.card.linkText.replace(' →', '')}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
