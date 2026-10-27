import React from 'react';
import { motion } from 'framer-motion';

// Authentic Real Project Assets from NDL PPT
const imgCenterCommercial = '/projects/mr_sarabjith_ghose/sarabjith_ghose_01_corner_elevation.jpg'; // Mr. Sarabjith Ghose (GRC Architects)
const imgTopVilla = '/projects/dr_anil_kush/dr_anil_kush_01_facade_front.jpg'; // Dr. Anil Kush (Architecture Paradigm - Building Elevation)
const imgBottomEstate = '/ndl_projects/slide_055_img_1.jpg'; // 24x7 Solutions Office Space

interface MetricItem {
  label: string;
  value: string;
}

const metrics: MetricItem[] = [
  {
    label: 'PROPRIETOR EXPERIENCE',
    value: '14+ Yrs',
  },
  {
    label: 'ESTABLISHED YEAR',
    value: '2016',
  },
  {
    label: 'MAJOR CASE STUDIES',
    value: '20+',
  },
  {
    label: 'STRUCTURAL QUALITY FOCUS',
    value: '100%',
  },
];

export const AboutTrust: React.FC = () => {
  return (
    <section className="relative w-full bg-white text-slate-900 py-20 sm:py-28 overflow-hidden select-none border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* ============================================================ */}
        {/* 1. HEADER                                                    */}
        {/* ============================================================ */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#071D38]" />
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#071D38] uppercase">
              CREDIBILITY & EXECUTION RECORD
            </span>
          </div>

          <h2 className="font-barlow text-4xl sm:text-5xl lg:text-6xl font-bold text-[#071D38] uppercase tracking-tight leading-[1.05] mb-4">
            Confidence Built Into Every Project.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl font-normal">
            From geotechnical soil investigation and civil foundation casting to turnkey interiors and structural handovers, our record is defined by precision engineering and client trust.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 2. THREE-COLUMN COMPOSITION (STATS + CENTER + RIGHT STACK)   */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: 4 Stat Cards */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-4">
            {metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="bg-[#F8F9FA] rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-[#071D38] transition-all flex flex-col justify-center min-h-[110px]"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#071D38]" />
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                    {metric.label}
                  </span>
                </div>
                <div className="font-barlow text-3xl sm:text-4xl font-bold text-[#071D38] uppercase tracking-tight">
                  {metric.value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Column: Dominant Real Project Image (Mr. Sarabjith Ghose / GRC) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 min-h-[380px] lg:min-h-[520px] group bg-[#071D38]"
          >
            <img
              src={imgCenterCommercial}
              alt="Mr. Sarabjith Ghose Residence by GRC Architects & NDL"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#C8A96B] font-bold block mb-1">
                CONTEMPORARY RESIDENCE • TALAGHATTAPURA
              </span>
              <p className="font-barlow text-lg font-bold uppercase leading-tight">
                Gaurav Roy Choudhury Architects • NDL Civil Execution
              </p>
            </div>
          </motion.div>

          {/* Right Column: 2 Stacked Real Images */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {/* Top Image: Dr. Anil Kush Estate */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative flex-1 rounded-2xl overflow-hidden shadow-md border border-slate-200 min-h-[200px] lg:min-h-[245px] group bg-[#071D38]"
            >
              <img
                src={imgTopVilla}
                alt="Dr. Anil Kush Estate Villa by Architecture Paradigm & NDL"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="font-mono text-[10px] uppercase text-[#C8A96B] font-bold block">
                  ESTATE VILLA • ARCHITECTURE PARADIGM
                </span>
              </div>
            </motion.div>

            {/* Bottom Image: 24x7 Solutions Corporate Workspace */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative flex-1 rounded-2xl overflow-hidden shadow-md border border-slate-200 min-h-[200px] lg:min-h-[245px] group bg-[#071D38]"
            >
              <img
                src={imgBottomEstate}
                alt="24x7 Solutions Corporate Workspace by Keystone Architects & NDL"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="font-mono text-[10px] uppercase text-[#C8A96B] font-bold block">
                  CORPORATE WORKSPACE • KEYSTONE ARCHITECTS
                </span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
