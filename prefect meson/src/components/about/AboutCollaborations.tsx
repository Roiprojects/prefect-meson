import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Building2 } from 'lucide-react';
import { ndlCompanyProfile } from '../../data/ndlCompanyData';

export const AboutCollaborations: React.FC = () => {
  return (
    <section id="architectural-collaborations" className="relative w-full py-20 sm:py-28 bg-white text-slate-900 overflow-hidden select-none border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* ============================================================ */}
        {/* 1. ARCHITECTS ASSOCIATED WITH                                */}
        {/* ============================================================ */}
        <div className="mb-20">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#071D38]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                PROFESSIONAL ASSOCIATIONS
              </span>
            </div>
            <h2 className="font-barlow text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#071D38] leading-tight">
              Architects Associated With
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              We have executed landmark residential and commercial projects under leading architectural practices across Bangalore.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ndlCompanyProfile.architectsAssociatedWith.map((arch, idx) => (
              <motion.div
                key={arch.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04, duration: 0.4 }}
                className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200 hover:border-[#071D38] hover:bg-white transition-all shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 mb-2">
                    <Compass className="w-3.5 h-3.5 text-[#071D38]" />
                    <span>ARCHITECTURAL PRACTICE</span>
                  </div>
                  <h4 className="font-barlow text-xl font-bold uppercase text-slate-950 mb-1 leading-snug">
                    {arch.name}
                  </h4>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    {arch.location}
                  </p>
                  {arch.note && (
                    <p className="mt-2 text-[11px] text-slate-500 font-sans border-t border-slate-200/60 pt-2">
                      {arch.note}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. STRUCTURAL CONSULTANTS ASSOCIATED WITH                    */}
        {/* ============================================================ */}
        <div className="pt-12 border-t border-slate-200">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#071D38]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                STRUCTURAL ENGINEERING ASSOCIATIONS
              </span>
            </div>
            <h2 className="font-barlow text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#071D38] leading-tight">
              Structural Consultants
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Experience executing complex structural designs and load specifications in coordination with recognized structural consultants.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ndlCompanyProfile.structuralConsultants.map((cons, idx) => (
              <motion.div
                key={cons.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200 hover:border-[#071D38] hover:bg-white transition-all shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 mb-2">
                    <Building2 className="w-3.5 h-3.5 text-[#071D38]" />
                    <span>STRUCTURAL CONSULTANT</span>
                  </div>
                  <h4 className="font-barlow text-xl font-bold uppercase text-slate-950 mb-1 leading-snug">
                    {cons.name}
                  </h4>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    {cons.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
