import React from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, KeyRound, HardHat, Ruler, Compass } from 'lucide-react';
import { ndlCompanyProfile } from '../../data/ndlCompanyData';

const executionIcons = [FileSpreadsheet, KeyRound, HardHat, Ruler, Compass];

export const AboutApproach: React.FC = () => {
  return (
    <section id="about-approach" className="relative w-full py-20 sm:py-28 bg-white overflow-hidden select-none border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#071D38]" />
              <span className="text-xs font-semibold tracking-[0.2em] text-[#071D38] uppercase font-mono">
                FLEXIBLE AGREEMENT & DELIVERY MODELS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#071D38] font-barlow leading-tight">
              Modes of Project Execution
            </h2>
          </div>

          <div className="max-w-md lg:pb-2">
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              We undertake construction works under well-defined agreement models tailored to client procurement preferences, architectural complexities, and financial structures.
            </p>
          </div>
        </div>

        {/* 5-Model Execution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ndlCompanyProfile.modesOfExecution.map((mode, idx) => {
            const Icon = executionIcons[idx % executionIcons.length];
            return (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07, duration: 0.5 }}
                className="p-7 sm:p-8 rounded-2xl bg-[#F8F9FA] border border-slate-200 hover:border-[#071D38] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xl font-bold text-[#071D38]">
                      0{idx + 1}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#071D38] group-hover:bg-[#071D38] group-hover:text-white transition-colors shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-barlow text-xl font-bold text-slate-900 uppercase tracking-tight mb-3 group-hover:text-[#071D38] transition-colors">
                    {mode.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    {mode.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>MODEL 0{idx + 1}</span>
                  <span className="text-[#071D38] font-bold uppercase">STRUCTURED CONTRACT</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
