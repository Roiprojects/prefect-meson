import React from 'react';
import { motion } from 'framer-motion';
import { aboutData } from '../../data/aboutData';
import aboutHeroImg from '../../assets/about_hero_villa.jpg';

export const AboutHero: React.FC = () => {
  return (
    <section className="relative w-full pt-[90px] md:pt-[110px] lg:pt-[120px] pb-12 md:pb-16 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Content with Vertical Architectural Title on Desktop */}
          <div className="col-span-1 lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            
            {/* Desktop: Vertical Architectural Spine Title | Mobile: Refined Horizontal Pill */}
            <div className="mb-6 md:mb-8">
              {/* Mobile Only: Elegant Horizontal Header */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex lg:hidden items-center gap-3"
              >
                <div className="w-[7px] h-[7px] rounded-full bg-slate-950 relative">
                  <div className="absolute inset-0 bg-slate-1000 rounded-full animate-ping opacity-30"></div>
                </div>
                <span className="text-xs font-mono font-bold tracking-[0.25em] text-slate-950 uppercase">
                  {aboutData.hero.label}
                </span>
                <span className="h-[1px] w-12 bg-slate-950/60" />
              </motion.div>

              {/* Desktop Only: Elegant Vertical Architectural Title */}
              <div className="hidden lg:flex items-center gap-4 mb-8">
                {/* Thin Vertical Rule Beside Title */}
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "100px", opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-[1.5px] bg-gradient-to-b from-royal-600 via-royal-500 to-orange-500 rounded-full"
                />

                {/* Vertical Typography using writing-mode */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                  className="select-none py-1"
                >
                  <span 
                    style={{ writingMode: 'vertical-rl' }} 
                    className="font-mono text-[13px] font-extrabold tracking-[0.45em] text-slate-950 uppercase inline-block"
                  >
                    ABOUT US
                  </span>
                </motion.div>

                {/* Micro Studio Category Indicator */}
                <div className="flex flex-col gap-1 pl-2 border-l border-slate-200/80 font-mono text-[10.5px] text-slate-400 font-semibold tracking-widest uppercase">
                  <span className="text-slate-900 font-bold">EST. 2014</span>
                  <span>STUDIO PROFILE</span>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <div className="overflow-hidden mb-6 md:mb-8">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-[38px] sm:text-[46px] md:text-[54px] lg:text-[60px] leading-[1.08] font-light tracking-[-0.03em] text-slate-900 whitespace-pre-line font-display"
              >
                {aboutData.hero.heading}
              </motion.h1>
            </div>

            {/* Supporting Text */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-lg font-sans"
            >
              {aboutData.hero.supportingText}
            </motion.p>
          </div>

          {/* Right Image Container */}
          <div className="col-span-1 lg:col-span-7 order-1 lg:order-2 flex items-center justify-center lg:justify-end">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full rounded-[28px] sm:rounded-[36px] md:rounded-[44px] lg:rounded-[48px] overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-100 bg-slate-100 aspect-[16/10] sm:aspect-[16/9] group"
            >
              <img 
                src={aboutHeroImg} 
                alt="Perfect Mason Architectural Sunset Villa" 
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
