import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, CheckCircle2, ShieldCheck, Compass, Award, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';
import mainImg from '../../assets/corp_main_construction.jpg';
import detailImg from '../../assets/corp_detail_masonry.jpg';

interface CorporateRow {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

const corporateRows: CorporateRow[] = [
  {
    id: 'expertise',
    number: '01',
    title: 'EXPERTISE',
    description: 'Construction expertise and professional execution across complex structural builds.',
    icon: Compass,
  },
  {
    id: 'quality',
    number: '02',
    title: 'QUALITY',
    description: 'A quality-focused approach to materials, tolerances, and durable workmanship.',
    icon: ShieldCheck,
  },
  {
    id: 'clients',
    number: '03',
    title: 'CLIENTS',
    description: 'Commitment to dependable delivery, transparent communication, and client satisfaction.',
    icon: CheckCircle2,
  },
  {
    id: 'capability',
    number: '04',
    title: 'CAPABILITY',
    description: 'Professional construction knowledge backed by disciplined engineering management.',
    icon: Award,
  },
  {
    id: 'service-areas',
    number: '05',
    title: 'SERVICE AREAS',
    description: 'End-to-end delivery across residential, commercial, turnkey, and interior sectors.',
    icon: MapPin,
  },
];

export const CompanyIntroduction: React.FC = () => {
  const navigate = useNavigate();
  const { settings, pageContents } = useData();
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  const introData = pageContents?.home?.intro || {};
  const headingText = introData.heading || 'Built on Experience. Focussed on Quality.';
  const eyebrowText = introData.eyebrow || 'COMPANY INTRODUCTION';
  const subtext = introData.subtext || settings?.aboutBrief || 'Perfect Mason is one of the finest architectural and turnkey construction firms in South Bangalore, delivering high-precision residential estates, commercial spaces, industrial buildings & detailed interiors across Bangalore.';

  // Controlled, subtle parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const mainParallax = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-10, 10]);
  const detailParallax = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-14, 14]);

  const easeCubic = [0.22, 1, 0.36, 1];

  return (
    <section
      ref={containerRef}
      id="company-introduction"
      className="relative w-full bg-[#FFFFFF] text-[#252A30] py-20 sm:py-28 lg:py-32 overflow-hidden select-none border-b border-[#E2E8F0]"
    >
      {/* Engineering Micro-Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05] pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 z-10">
        {/* ============================================================ */}
        {/* SECTION HEADER ROW                                          */}
        {/* ============================================================ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-12 sm:mb-16 border-b border-[#E2E8F0]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: easeCubic }}
            className="flex items-center gap-3.5"
          >
            <span className="font-mono text-xs sm:text-sm font-black tracking-[0.25em] text-[#0F172A] uppercase">
              02
            </span>
            <span className="text-[#E2E8F0] text-sm">/</span>
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.22em] text-[#0B0F19] uppercase">
              {eyebrowText}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden sm:flex items-center gap-2.5 font-mono text-[11px] text-[#252A30]/60 uppercase tracking-[0.2em]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F172A]" />
            <span>PERFECT MASON // CORPORATE PROFILE</span>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* CORPORATE 60 / 40 COMPOSITION                                */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ---------------------------------------------------------- */}
          {/* LEFT 60%: STRUCTURED CORPORATE IMAGERY COMPOSITION          */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col relative">
            {/* Primary Main Corporate Construction Image */}
            <motion.div
              style={{ y: mainParallax }}
              initial={{ opacity: 0, scale: 1.03 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: easeCubic }}
              className="group relative w-full h-[360px] sm:h-[460px] lg:h-[560px] rounded-md overflow-hidden bg-[#0B0F19] border border-[#E2E8F0] shadow-xl will-change-transform"
            >
              <img
                src={mainImg}
                alt="Perfect Mason Structural Engineering and Commercial Construction"
                className="w-full h-full object-cover object-center transform group-hover:scale-[1.025] transition-transform duration-700 ease-out select-none"
                loading="eager"
              />

              {/* Natural Lighting Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/60 via-transparent to-transparent pointer-events-none" />

              {/* Technical Alignment Line */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none text-white/80 font-mono text-[10px] tracking-widest uppercase">
                <span className="bg-[#0B0F19]/80 backdrop-blur-sm px-2.5 py-1 rounded border border-white/15">
                  ACTIVE CONSTRUCTION // STRUCTURAL PHASE
                </span>
                <span className="hidden sm:inline bg-[#0B0F19]/80 backdrop-blur-sm px-2.5 py-1 rounded border border-white/15">
                  ISO-COMPLIANT EXECUTION
                </span>
              </div>
            </motion.div>

            {/* Secondary Overlapping Craftsmanship Detail Image */}
            <motion.div
              style={{ y: detailParallax }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: 0.2, ease: easeCubic }}
              className="relative lg:absolute -bottom-8 lg:-bottom-10 right-4 sm:right-8 w-44 sm:w-56 lg:w-64 aspect-square rounded-md overflow-hidden border-2 border-white bg-white shadow-2xl z-20 mt-4 lg:mt-0"
            >
              <img
                src={detailImg}
                alt="Precision Stone Masonry and Architectural Detailing"
                className="w-full h-full object-cover object-center hover:scale-[1.015] transition-transform duration-500 select-none"
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 bg-[#0B0F19]/90 backdrop-blur-sm p-2 text-center text-white font-mono text-[9.5px] uppercase tracking-wider">
                PRECISION FINISHING DETAIL
              </div>
            </motion.div>

            {/* Floating Corporate Data Label */}
            <div className="hidden lg:block absolute bottom-8 left-8 z-20">
              <div className="bg-white/95 backdrop-blur-md border border-[#E2E8F0] px-5 py-3.5 rounded-md shadow-md max-w-xs">
                <div className="font-mono text-[10px] font-bold text-[#0F172A] uppercase tracking-[0.2em] mb-1">
                  {settings?.companyName || 'PERFECT MASON'}
                </div>
                <div className="font-mono text-xs font-bold text-[#0B0F19] uppercase tracking-wider">
                  {settings?.tagline || 'CONSTRUCTION EXPERTISE'}
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* RIGHT 40%: CORPORATE HEADLINE, NARRATIVE & STRUCTURED ROWS */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8">
            {/* Corporate Headline in Barlow Condensed */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: easeCubic }}
              className="space-y-2"
            >
              <h2 className="font-barlow text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#0B0F19] uppercase tracking-tight leading-[0.98]">
                {headingText.includes('.') ? (
                  <>
                    <span className="block text-[#0B0F19]">{headingText.split('.')[0]}.</span>
                    {headingText.split('.').slice(1).join('.').trim() && (
                      <span className="block text-[#123A68]">{headingText.split('.').slice(1).join('.').trim()}</span>
                    )}
                  </>
                ) : (
                  <span className="block text-[#0B0F19]">{headingText}</span>
                )}
              </h2>
            </motion.div>

            {/* Core Description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.1, duration: 0.4, ease: easeCubic }}
              className="text-base sm:text-[17px] text-[#252A30] font-sans leading-relaxed font-normal"
            >
              {subtext}
            </motion.p>

            {/* Horizontal Credibility Indicator Strip */}
            <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#E2E8F0] font-mono text-center">
              <div className="border-r border-[#E2E8F0] pr-2">
                <span className="block text-[11px] font-bold text-[#0F172A] uppercase tracking-wider">EXPERTISE</span>
                <span className="block text-xs font-semibold text-[#0B0F19]">{introData.experienceYears || settings?.experienceYears || '18+'} Years</span>
              </div>
              <div className="border-r border-[#E2E8F0] px-2">
                <span className="block text-[11px] font-bold text-[#0F172A] uppercase tracking-wider">PROJECTS</span>
                <span className="block text-xs font-semibold text-[#0B0F19]">{introData.projectsCompleted || settings?.projectsCompleted || '150+'} Completed</span>
              </div>
              <div className="pl-2">
                <span className="block text-[11px] font-bold text-[#0F172A] uppercase tracking-wider">DELIVERED</span>
                <span className="block text-xs font-semibold text-[#0B0F19]">{introData.sqftDelivered || settings?.sqftDelivered || '1.5M+'} Sq.Ft</span>
              </div>
            </div>

            {/* Five Structured Information Rows */}
            <div className="space-y-1 pt-1" role="tablist" aria-label="Corporate Overview Rows">
              {corporateRows.map((row, idx) => {
                const isActive = activeRowIndex === idx;

                return (
                  <div
                    key={row.id}
                    onMouseEnter={() => setActiveRowIndex(idx)}
                    onClick={() => setActiveRowIndex(isActive ? null : idx)}
                    className={`group relative p-3 sm:p-3.5 rounded-md transition-all duration-200 cursor-pointer border-b border-[#E2E8F0] ${
                      isActive ? 'bg-[#EAF1F8]/50' : 'hover:bg-[#EAF1F8]/30'
                    }`}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveRowIndex(isActive ? null : idx);
                      }
                    }}
                  >
                    {/* Header Line */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs font-bold transition-colors ${
                            isActive ? 'text-[#0F172A]' : 'text-[#252A30]/50'
                          }`}
                        >
                          {row.number}
                        </span>
                        <span className="text-[#E2E8F0] text-xs">—</span>
                        <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.15em] uppercase text-[#0B0F19]">
                          {row.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isActive ? 'rotate-90 text-[#0F172A]' : 'text-[#252A30]/30 group-hover:translate-x-1 group-hover:text-[#0B0F19]'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Expandable Clean Text Row */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.25, ease: easeCubic }}
                          className="overflow-hidden pl-7"
                        >
                          <p className="text-xs sm:text-sm font-sans text-[#252A30]/85 leading-relaxed font-normal">
                            {row.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Active Accent Indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#0F172A] rounded-r" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Corporate CTA Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => navigate('/about-us')}
                className="group relative inline-flex items-center gap-3.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-md bg-[#0B0F19] hover:bg-[#123A68] active:scale-[0.98] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.16em] transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B0F19] cursor-pointer"
              >
                <span>Know More About Us</span>
                <ArrowRight className="w-4 h-4 text-[#0F172A] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
