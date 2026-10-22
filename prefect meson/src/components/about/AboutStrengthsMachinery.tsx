import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Droplets, Layers, Hammer, Truck, Activity, Wrench, Crosshair, CheckCircle2, Check } from 'lucide-react';
import { ndlCompanyProfile } from '../../data/ndlCompanyData';

const strengthIcons = [Cpu, ShieldCheck, Droplets, Layers, Hammer, Activity, Wrench];
const machineryIcons = [Layers, Hammer, Activity, ShieldCheck, Wrench, Crosshair, Truck];

export const AboutStrengthsMachinery: React.FC = () => {
  return (
    <section id="strengths-machinery" className="relative w-full py-20 sm:py-28 bg-[#F8F9FA] text-slate-900 overflow-hidden select-none border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* ============================================================ */}
        {/* 1. CORE TECHNICAL CONSTRUCTION STRENGTHS                     */}
        {/* ============================================================ */}
        <div className="mb-20">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-3 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#071D38]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                PROVEN COMPETENCIES
              </span>
            </div>
            <h2 className="font-barlow text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#071D38] leading-tight">
              Technical Strengths & Craftsmanship
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              With a technically qualified civil engineering team at the helm, we give paramount importance to structural integrity while executing challenging architectural features and sustainable materials.
            </p>
          </div>

          {/* Strengths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {ndlCompanyProfile.companyStrengths.map((st, idx) => {
              const Icon = strengthIcons[idx % strengthIcons.length];
              return (
                <motion.div
                  key={st.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06, duration: 0.5 }}
                  className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#071D38] hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#071D38] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-barlow text-lg sm:text-xl font-bold uppercase text-slate-950 mb-2">
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#071D38]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>VERIFIED CAPABILITY</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Challenging Features & Eco-Friendly Materials Callouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 rounded-2xl bg-white border border-slate-200">
              <span className="font-mono text-xs font-bold text-[#071D38] uppercase tracking-widest block mb-3">
                CHALLENGING ARCHITECTURAL FEATURES
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {ndlCompanyProfile.challengingFeatures.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-sans text-slate-700 font-medium">
                    <Check className="w-3.5 h-3.5 text-[#071D38] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-slate-200">
              <span className="font-mono text-xs font-bold text-[#071D38] uppercase tracking-widest block mb-3">
                ECO-FRIENDLY CONSTRUCTION MATERIALS
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {ndlCompanyProfile.ecoFriendlyMaterials.map((mat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-sans text-slate-700 font-medium">
                    <Check className="w-3.5 h-3.5 text-[#071D38] shrink-0" />
                    <span>{mat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. IN-HOUSE PLANTS & MACHINERY                               */}
        {/* ============================================================ */}
        <div className="pt-12 border-t border-slate-200">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-3 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#071D38]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                EQUIPMENT & INFRASTRUCTURE
              </span>
            </div>
            <h2 className="font-barlow text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#071D38] leading-tight">
              Plants & Machinery in Possession
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Available technical resources in possession to support multi-site civil execution and rigorous on-site quality testing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ndlCompanyProfile.plantsAndMachinery.map((mach, idx) => {
              const Icon = machineryIcons[idx % machineryIcons.length];
              const isUpdatedToday = idx === 2 || idx === 4 || idx === 5;
              return (
                <div
                  key={mach.name}
                  className={`p-5 rounded-xl transition-all flex flex-col justify-between ${
                    isUpdatedToday
                      ? 'bg-yellow-50/90 border-2 border-yellow-400 shadow-md ring-2 ring-yellow-300/40'
                      : 'bg-white border border-slate-200 shadow-2xs hover:border-[#071D38]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                        isUpdatedToday
                          ? 'bg-yellow-300 text-yellow-950 border-yellow-400'
                          : 'bg-slate-50 border-slate-200 text-[#071D38]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        {isUpdatedToday && (
                          <span className="font-mono text-[9px] font-bold bg-yellow-300 text-yellow-950 px-1.5 py-0.5 rounded uppercase tracking-wider border border-yellow-400">
                            Updated
                          </span>
                        )}
                        <span className={`font-mono text-xs font-bold ${
                          isUpdatedToday ? 'text-yellow-900' : 'text-slate-400'
                        }`}>
                          0{idx + 1}
                        </span>
                      </div>
                    </div>
                    <h4 className={`font-barlow text-base font-bold uppercase mb-1 leading-snug ${
                      isUpdatedToday
                        ? 'text-yellow-950 bg-yellow-300 px-1.5 py-0.5 rounded border border-yellow-400 inline-block'
                        : 'text-slate-950'
                    }`}>
                      {mach.name}
                    </h4>
                    <span className={`font-mono text-[10px] uppercase tracking-wider block mt-1 ${
                      isUpdatedToday
                        ? 'text-yellow-900 bg-yellow-200/80 px-1.5 py-0.5 rounded border border-yellow-300 inline-block font-semibold'
                        : 'text-slate-500'
                    }`}>
                      {mach.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
