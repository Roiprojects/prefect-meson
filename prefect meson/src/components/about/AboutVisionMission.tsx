import React from 'react';
import { motion } from 'framer-motion';
import { Target, Building, Award, Check } from 'lucide-react';
import { ndlCompanyProfile } from '../../data/ndlCompanyData';

export const AboutVisionMission: React.FC = () => {
  return (
    <section id="vision-mission" className="relative w-full py-20 sm:py-28 bg-[#F8F9FA] border-y border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#071D38]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#071D38] uppercase font-mono">
              FUTURE DIRECTION & ROADMAP
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#071D38] font-barlow leading-tight">
            Immediate and Long-Term Goals
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            Our strategic growth plan centers on scaling technical capacity, maintaining good quality, ensuring smooth execution, and establishing the company as a brand known for credibility.
          </p>
        </div>

        {/* Goals List Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#071D38]">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-[#071D38] uppercase tracking-widest block">
                  STRATEGIC OBJECTIVES
                </span>
                <h3 className="text-xl sm:text-2xl font-barlow font-bold text-slate-950 uppercase tracking-tight">
                  Growth & Execution Goals
                </h3>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {ndlCompanyProfile.immediateAndLongTermGoals.goals.map((g, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-sans">
                  <Check className="w-4 h-4 text-[#071D38] shrink-0 mt-0.5" />
                  <span>{g}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="lg:col-span-5 p-8 sm:p-10 rounded-2xl bg-[#071D38] text-white shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#C8A96B] mb-5">
                <Building className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs font-bold text-[#C8A96B] uppercase tracking-widest block mb-1">
                FUTURE CAPABILITY
              </span>
              <h3 className="text-2xl font-barlow font-bold text-white uppercase tracking-tight mb-4">
                Targeted Project Domains
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                Positioning the organization with enhanced technical staff to undertake larger residential, institutional, and commercial developments:
              </p>

              <div className="space-y-2.5">
                {ndlCompanyProfile.immediateAndLongTermGoals.futureCapabilities.map((fc, idx) => {
                  const isHighlighted =
                    fc.toLowerCase().includes('affordable') ||
                    fc.toLowerCase().includes('exquisite') ||
                    fc.toLowerCase().includes('architecturally');
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl flex items-center justify-between gap-2.5 transition-all ${
                        isHighlighted
                          ? 'bg-yellow-400/20 border-2 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.25)]'
                          : 'bg-white/10 border border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            isHighlighted ? 'bg-yellow-400 shadow-[0_0_8px_#facc15]' : 'bg-[#C8A96B]'
                          }`}
                        />
                        <span className="font-barlow text-sm font-bold uppercase tracking-wide">
                          {isHighlighted ? (
                            <mark className="bg-yellow-300 text-slate-950 font-black px-2 py-0.5 rounded shadow-xs inline-block">
                              {fc}
                            </mark>
                          ) : (
                            <span className="text-white">{fc}</span>
                          )}
                        </span>
                      </div>
                      {isHighlighted && (
                        <span className="shrink-0 font-mono text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-yellow-400 text-slate-950 shadow-xs">
                          NEW DOMAIN
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-[#C8A96B]">
              <Award className="w-4 h-4" />
              <span>QUALITY • COMMITMENT • CREDIBILITY</span>
            </div>
          </motion.div>
        </div>

        {/* 4 Brand Values from Source */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: 'QUALITY', desc: 'Ensure good quality and adherence to verified structural and finishing standards on every project.' },
            { title: 'COMMITMENT', desc: 'Ensure smooth project execution and faithful delivery of contractual specifications.' },
            { title: 'CREDIBILITY', desc: 'Over 14 years of civil engineering and interior experience backed by B.E. Civil proprietor leadership.' },
            { title: 'INNOVATIVE APPROACH', desc: 'Experience with challenging architectural features, water bodies, floating slabs, and eco-friendly materials.' }
          ].map((val, idx) => (
            <div
              key={val.title}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#071D38]" />
                <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  PILLAR 0{idx + 1}
                </span>
              </div>
              <h4 className="font-barlow text-base font-bold text-slate-950 uppercase tracking-tight mb-1.5">
                {val.title}
              </h4>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
