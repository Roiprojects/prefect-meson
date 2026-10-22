import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { aboutData } from '../../data/aboutData';
import { useData } from '../../context/DataContext';
import ctaBgImg from '../../assets/about_hero_villa.jpg';

export const AboutCTA: React.FC = () => {
  const { pageContents } = useData();
  const cta = pageContents?.about?.cta || aboutData.cta;

  return (
    <section className="relative w-full py-14 md:py-20 bg-white flex items-center justify-center select-none">
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 lg:px-20">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="group relative w-full rounded-[32px] sm:rounded-[44px] md:rounded-[52px] overflow-hidden bg-slate-100 border border-slate-200/90 min-h-[480px] sm:min-h-[540px] md:min-h-[580px] p-6 sm:p-12 md:p-16 flex items-center justify-center text-center shadow-2xl shadow-slate-900/10"
        >
          {/* Prominent Architectural Background Image */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <img 
              src={ctaBgImg} 
              alt="Perfect Mason Architectural Background" 
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Luminous Architectural Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20" />
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
          </div>

          {/* Central Frosted Glassmorphic Editorial Card */}
          <div className="relative z-10 max-w-2xl w-full mx-auto rounded-[28px] sm:rounded-[36px] md:rounded-[44px] bg-white/92 backdrop-blur-2xl border border-white/80 p-8 sm:p-12 md:p-14 shadow-2xl shadow-slate-950/15 flex flex-col items-center">
            
            {/* Collaboration Tag */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-2 h-2 rounded-full bg-blue-600 relative">
                <div className="absolute inset-0 bg-slate-950 rounded-full animate-ping opacity-40"></div>
              </div>
              <span className="font-mono text-xs sm:text-[13px] font-bold text-blue-600 uppercase tracking-[0.25em] flex items-center gap-2">
                COLLABORATION
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[38px] leading-[1.25] font-bold tracking-tight text-slate-950 mb-5 uppercase font-display max-w-xl text-center">
              <span className="bg-yellow-300 text-slate-950 px-3 py-1 rounded-2xl border border-yellow-500 shadow-sm inline-block">
                {cta.heading || aboutData.cta.heading}
              </span>
            </h2>
            
            {/* Supporting Text */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 font-sans font-normal leading-relaxed mb-8 max-w-lg">
              {cta.supportingText || aboutData.cta.supportingText}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              <Link 
                to="/contact-us"
                className="w-full sm:w-auto group flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-8 sm:px-9 py-4 rounded-full transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 hover:-translate-y-0.5 active:translate-y-0 font-sans text-xs sm:text-sm font-bold tracking-[0.16em] uppercase"
              >
                <span>{cta.primaryButton || aboutData.cta.primaryButton}</span>
                <ArrowRight size={17} className="group-hover:translate-x-1.5 transition-transform duration-300 text-orange-400" />
              </Link>

              <Link 
                to="/gallery"
                className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-slate-900/90 hover:bg-slate-950 text-white px-8 sm:px-9 py-4 rounded-full transition-all duration-300 shadow-md hover:-translate-y-0.5 active:translate-y-0 font-sans text-xs sm:text-sm font-bold tracking-[0.16em] uppercase"
              >
                <span>{cta.secondaryButton || aboutData.cta.secondaryButton}</span>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
