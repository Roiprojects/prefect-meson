import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Users,
  FileCheck,
  Ruler,
  Clock,
  Layers,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Award,
  Zap,
  Activity,
} from 'lucide-react';

interface StrengthPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  keyMetric: string;
  tag: string;
  icon: React.FC<{ className?: string }>;
}

const pillars: StrengthPillar[] = [
  {
    id: 'quality-construction',
    number: '01',
    title: 'Quality Construction',
    subtitle: 'Structural Core & Concrete Rigor',
    description: 'Disciplined structural engineering with high-grade Fe550D rebar, 53-grade cement, and mechanical compaction for zero-settlement foundations.',
    keyMetric: 'M25/M30 Mix Precision',
    tag: 'STRUCTURAL INTEGRITY',
    icon: ShieldCheck,
  },
  {
    id: 'experienced-professionals',
    number: '02',
    title: 'Experienced Professionals',
    subtitle: 'Led by B.E. Teams of Senior Engineers',
    description: 'Experienced civil engineers and site supervisors provide hands-on civil oversight, eliminating subcontracting dilution.',
    keyMetric: '14+ Years Track Record',
    tag: 'SENIOR LEADERSHIP',
    icon: Users,
  },
  {
    id: 'transparent-process',
    number: '03',
    title: 'Transparent Process',
    subtitle: 'Locked Itemized BOQ',
    description: 'Complete transparency with itemized rate disclosures, certified material schedules, and stage-gate billing linked to verified project milestones.',
    keyMetric: 'Regular Updates & Relevant Transparency',
    tag: 'FINANCIAL INTEGRITY',
    icon: FileCheck,
  },
  {
    id: 'attention-to-detail',
    number: '04',
    title: 'Attention to Detail',
    subtitle: 'Minimum Level Tolerance',
    description: 'Exacting standards across exposed architectural concrete shuttering, brick alignments, and waterproof floor joints.',
    keyMetric: 'Minimum Finish Tolerance',
    tag: 'CRAFTSMANSHIP',
    icon: Ruler,
  },
  {
    id: 'timely-execution',
    number: '05',
    title: 'Timely Execution',
    subtitle: 'Committed Handover Dates',
    description: 'Systematic timeline management with daily digital progress logs, automated material buffering, and committed handover dates.',
    keyMetric: 'Milestone Adherence',
    tag: 'PUNCTUAL DELIVERY',
    icon: Clock,
  },
  {
    id: 'end-to-end-management',
    number: '06',
    title: 'End-to-End Execution',
    subtitle: 'Single-Source Accountability',
    description: 'Complete design-build coordination encompassing municipal sanctions, structural drawings, procurement, and turnkey interior fit-outs.',
    keyMetric: '100% In-House Setup',
    tag: 'TURNKEY EPC',
    icon: Layers,
  },
  {
    id: 'premium-materials',
    number: '07',
    title: 'Premium Materials',
    subtitle: 'Batch Testing & Certification',
    description: 'Direct procurement of tested steel, river sand, seasoned teak wood, and branded CP plumbing and electrical conduits.',
    keyMetric: 'MATERIAL QUALITY CHECKS',
    tag: 'TESTED MATERIALS',
    icon: Sparkles,
  },
  {
    id: 'customer-centric',
    number: '08',
    title: 'Customer-Centric Focus',
    subtitle: 'Long-Term Warranty Backing',
    description: 'Direct access to company management, regular WhatsApp site updates, scheduled walkthroughs, and prompt post-handover support.',
    keyMetric: 'Easy Approach to Technical Team',
    tag: 'CLIENT COMMITMENT',
    icon: HeartHandshake,
  },
];

const trustStats = [
  { label: 'CIVIL EXECUTION EXPERIENCE', value: '14+ Yrs', icon: Award, isNew: false },
  { label: 'BOQ ESTIMATION ACCURACY', value: '100%', icon: CheckCircle2, isNew: false },
  { label: 'sufficient construction equipments and tools', value: 'resources', icon: Zap, isNew: true },
  { label: 'PROGRESS MONITORING & QUALITY INSPECTIONS', value: 'SITE QUALITY CONTROL', icon: Activity, isNew: true },
];

export const WhyChooseUs: React.FC = () => {
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
  const easeCubic = [0.22, 1, 0.36, 1];

  return (
    <section
      id="why-choose-us"
      className="relative w-full bg-[#FFFFFF] text-slate-900 py-20 sm:py-28 lg:py-32 overflow-hidden select-none border-b border-slate-200"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Decorative Large Architectural Watermark */}
      <div className="absolute top-8 left-0 right-0 overflow-hidden pointer-events-none select-none z-0 flex justify-center opacity-[0.03]">
        <span className="font-barlow font-black text-[12vw] leading-none uppercase tracking-tighter text-slate-950 whitespace-nowrap">
          PRECISION • CRAFT • INTEGRITY
        </span>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 z-10">
        {/* ============================================================ */}
        {/* 1. EDITORIAL SECTION HEADER                                  */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-slate-200">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, ease: easeCubic }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 border border-slate-200/90 rounded-full mb-5 shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                04 // TRUSTED CIVIL & ARCHITECTURAL BUILDERS
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.08, ease: easeCubic }}
              className="font-display text-4xl sm:text-6xl lg:text-[4.5rem] font-black text-slate-950 uppercase tracking-tight leading-[0.98]"
            >
              WHY CHOOSE <br />
              PERFECT MASON.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.16, ease: easeCubic }}
            className="max-w-md lg:text-right"
          >
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Quality, precision and dependable execution come together to deliver an uncompromising construction experience with single-source accountability.
            </p>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* 2. 8 PILLARS ARCHITECTURAL BENTO GRID (4 COLUMNS x 2 ROWS)   */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const isHovered = hoveredPillar === pillar.id;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: easeCubic }}
                onMouseEnter={() => setHoveredPillar(pillar.id)}
                onMouseLeave={() => setHoveredPillar(null)}
                className={`group relative p-6 sm:p-7 rounded-[24px] transition-all duration-300 flex flex-col justify-between border cursor-default ${
                  isHovered
                    ? 'bg-[#F8FAFC] border-[#071D38] shadow-xl -translate-y-1'
                    : 'bg-white border-slate-200/90 shadow-2xs hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Top Bar: Number + Tag + Icon */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-[#071D38] bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                        {pillar.number}
                      </span>
                      <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                        {pillar.tag}
                      </span>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isHovered
                          ? 'bg-[#071D38] text-white'
                          : 'bg-slate-50 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-barlow text-xl sm:text-2xl font-bold uppercase tracking-tight text-slate-950 mb-1 leading-tight">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono font-semibold text-[#071D38] mb-3">
                    {pillar.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 font-sans leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Metric Pill */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider shrink-0">
                    SPEC GUARANTEE
                  </span>
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border shadow-2xs text-right transition-all ${
                    pillar.id === 'premium-materials'
                      ? 'text-yellow-950 bg-yellow-300 border-yellow-500 ring-2 ring-yellow-400 font-extrabold shadow-sm'
                      : 'text-slate-950 bg-white border-slate-200/90'
                  }`}>
                    {pillar.keyMetric}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* 3. BOTTOM ENGINEERING TRUST METRICS STRIP                    */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeCubic }}
          className="p-6 sm:p-8 rounded-[28px] bg-[#F8FAFC] border border-slate-200/90 shadow-sm"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {trustStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className={`flex flex-col items-center sm:items-start text-center sm:text-left transition-all ${
                    i !== 0 ? 'sm:pl-8 pt-4 sm:pt-0' : ''
                  } ${stat.isNew ? 'bg-yellow-50/80 p-3 sm:-m-2 rounded-2xl border-2 border-yellow-400 shadow-sm' : ''}`}
                >
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <Icon className={`w-4 h-4 shrink-0 ${stat.isNew ? 'text-yellow-700' : 'text-[#071D38]'}`} />
                    <span className={`text-xl sm:text-2xl lg:text-[26px] xl:text-3xl font-black font-barlow uppercase tracking-tight leading-none ${
                      stat.isNew
                        ? 'text-yellow-950 bg-yellow-300 px-2 py-0.5 rounded border border-yellow-500'
                        : 'text-slate-950'
                    }`}>
                      {stat.value}
                    </span>
                    {stat.isNew && (
                      <span className="text-[9px] font-mono font-bold bg-yellow-400 text-yellow-950 px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                        Updated
                      </span>
                    )}
                  </div>
                  <span className={`font-mono text-[11px] font-bold uppercase tracking-wider leading-snug ${
                    stat.isNew
                      ? 'text-yellow-950 bg-yellow-200/90 px-1.5 py-0.5 rounded border border-yellow-300 mt-1 block'
                      : 'text-slate-500'
                  }`}>
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
