import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { commercialPages } from '../data/commercialData';

interface CommercialServicePageProps {
  onOpenQuoteModal: () => void;
}

export const CommercialServicePage: React.FC<CommercialServicePageProps> = ({ onOpenQuoteModal }) => {
  const { serviceId } = useParams<{ serviceId: string }>();

  const pageData = useMemo(() => {
    return commercialPages.find(p => p.slug === serviceId);
  }, [serviceId]);

  if (!pageData) {
    return <Navigate to="/commercial-construction" replace />;
  }

  return (
    <div className="w-full bg-white text-slate-900 pt-28 sm:pt-36 select-none overflow-hidden min-h-screen">
      
      {/* 1. CINEMATIC PAGE HERO */}
      <section className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-16 sm:pb-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-slate-950"></div>
              <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.28em] text-slate-800 font-bold">
                COMMERCIAL / {pageData.category}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-slate-950 uppercase tracking-tight leading-[1.05]"
            >
              {pageData.title}
            </motion.h1>
          </div>

          <div className="max-w-md lg:pb-3">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed font-light"
            >
              {pageData.description}
            </motion.p>
          </div>
        </div>

        {/* Cinematic Hero Image */}
        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[640px] rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl bg-slate-950">
          <motion.img
            initial={{ scale: 1.03 }}
            animate={{ scale: 1.00 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src={pageData.heroImage}
            alt={pageData.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-950/10 mix-blend-multiply pointer-events-none" />
        </div>
      </section>

      {/* 2. INTRODUCTION & CAPABILITIES */}
      <section className="bg-[#F8FAFC] py-20 sm:py-28 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="font-display text-3xl font-bold text-slate-950 uppercase mb-8">
                Capabilities
              </h2>
              <div className="flex flex-wrap gap-3">
                {pageData.capabilities.map((cap, i) => (
                  <span key={i} className="px-5 py-2.5 rounded-full bg-white border border-slate-200/80 text-sm font-sans font-medium text-slate-700 shadow-sm">
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-3xl font-bold text-slate-950 uppercase mb-8">
                {pageData.scope.title}
              </h2>
              <ul className="space-y-5">
                {pageData.scope.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-slate-950 shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-sans text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECT PROCESS */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-950 font-bold block mb-3">
              EXECUTION METHODOLOGY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 uppercase tracking-tight">
              How We Deliver
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pageData.process.map((step, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
                <span className="font-display text-4xl font-black text-slate-100 block mb-4">
                  0{i + 1}
                </span>
                <h3 className="font-display text-xl font-bold text-slate-900 uppercase mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-500 font-sans text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-24 sm:pb-32">
        <div className="rounded-[36px] bg-slate-950 text-white p-10 sm:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-widest block mb-3">
              START YOUR PROJECT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight mb-4">
              Planning a commercial project?
            </h2>
            <p className="text-base text-slate-300 font-sans leading-relaxed">
              Our engineering and design teams are ready to review your specifications and furnish a preliminary feasibility appraisal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-slate-950 hover:bg-black text-white font-sans text-sm font-bold uppercase tracking-wider transition-all shadow-lg"
            >
              <span>GET A QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans text-sm font-semibold transition-all"
            >
              <span>EXPLORE PROJECTS</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
