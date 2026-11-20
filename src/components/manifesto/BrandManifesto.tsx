import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useData } from '../../context/DataContext';

export const BrandManifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { pageContents } = useData();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const manifestoData = pageContents?.home?.manifesto || {};
  const manifestoHeading = manifestoData.heading || 'OUR APPROACH // ARCHITECTURAL MANIFESTO';
  const manifestoStatement = manifestoData.statement || 'From strategic master planning to meticulous turnkey execution, every square foot is engineered for enduring structural integrity, refined living, and timeless architectural presence.';

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Track scroll progress across this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms for multi-tiered fog and ghosted depth
  const ghostTextY = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const fogLeftX = useTransform(scrollYProgress, [0.1, 0.65], [-30, -140]);
  const fogRightX = useTransform(scrollYProgress, [0.1, 0.65], [30, 140]);
  const fogOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.85, 1], [0.8, 0.65, 0.4, 0.55, 0.8]);

  // Subtle 2-3px mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 12);
    mouseY.set(y * 12);
  };

  const line1Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const line2Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.26, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const line3Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      id="our-approach"
      onMouseMove={handleMouseMove}
      className="relative w-full bg-gradient-to-b from-[#FFFFFF] via-[#F8FBFE] to-[#FFFFFF] text-slate-900 py-16 sm:py-24 lg:py-28 flex flex-col justify-center items-center z-20 overflow-hidden select-none border-y border-slate-100/80"
    >
      {/* ============================================================ */}
      {/* LAYER 1: AMBIENT VOLUMETRIC BACKGROUND LIGHT & HAZE           */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft radial atmospheric sky-blue core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-slate-200/35 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-blue-50/60 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* ============================================================ */}
      {/* LAYER 2: OVERSIZED GHOSTED ARCHITECTURAL DEPTH TYPOGRAPHY   */}
      {/* ============================================================ */}
      <motion.div
        style={
          prefersReducedMotion
            ? {}
            : { y: ghostTextY, x: smoothMouseX, translateY: smoothMouseY }
        }
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.035] sm:opacity-[0.045]"
      >
        <span className="font-display text-[6.5rem] xs:text-[9rem] sm:text-[13rem] md:text-[17rem] lg:text-[21rem] font-black uppercase tracking-widest text-royal-900 leading-none whitespace-nowrap">
          PRECISION
        </span>
        <span className="font-display text-[5rem] xs:text-[7.5rem] sm:text-[11rem] md:text-[14rem] lg:text-[17rem] font-black uppercase tracking-widest text-slate-900 leading-none whitespace-nowrap -mt-6 sm:-mt-16">
          LEGACY
        </span>
      </motion.div>

      {/* ============================================================ */}
      {/* LAYER 3: VOLUMETRIC DRIFTING WHITE MIST & FOG BANKS (BACK)   */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Fog Bank Left: Organic wispy cloud drifting slowly */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [-10, 15, -10],
                  scale: [1, 1.04, 1],
                }
          }
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            backgroundImage: "url('/assets/wispy-fog-1.png')",
            x: prefersReducedMotion ? 0 : fogLeftX,
            opacity: prefersReducedMotion ? 0.35 : fogOpacity,
          }}
          className="absolute -left-20 top-10 sm:top-20 w-[600px] sm:w-[850px] lg:w-[1100px] h-[450px] sm:h-[600px] bg-contain bg-no-repeat opacity-45 mix-blend-screen pointer-events-none"
        />

        {/* Fog Bank Right: Billowy rolling mist drifting counter */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [12, -12, 12],
                  scale: [1.03, 1, 1.03],
                }
          }
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            backgroundImage: "url('/assets/wispy-fog-2.png')",
            x: prefersReducedMotion ? 0 : fogRightX,
            opacity: prefersReducedMotion ? 0.35 : fogOpacity,
          }}
          className="absolute -right-20 bottom-10 sm:bottom-20 w-[650px] sm:w-[900px] lg:w-[1150px] h-[450px] sm:h-[600px] bg-contain bg-no-repeat opacity-40 mix-blend-screen pointer-events-none"
        />
      </div>

      {/* ============================================================ */}
      {/* LAYER 4: CENTERED EDITORIAL STATEMENT CONTENT                 */}
      {/* ============================================================ */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 w-full flex flex-col items-center text-center">
        {/* Section Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 mb-10 sm:mb-14 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-4 ring-slate-200/80" />
            <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950" />
          </div>

          <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.28em] text-slate-800 font-bold select-none">
            {manifestoHeading}
          </span>
        </motion.div>

        {/* Massive Centered 3-Line Statement */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-1 sm:space-y-2 select-none max-w-5xl"
        >
          {/* Line 1 */}
          <div className="overflow-hidden">
            <motion.h2
              variants={line1Variants}
              className="font-sans text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] font-extrabold text-slate-950 tracking-tight leading-[1.04]"
            >
              Planned with{' '}
              <span className="font-editorial italic font-normal text-slate-950 tracking-normal inline-block">
                precision.
              </span>
            </motion.h2>
          </div>

          {/* Line 2 */}
          <div className="overflow-hidden">
            <motion.div
              variants={line2Variants}
              className="font-sans text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] font-extrabold text-slate-950 tracking-tight leading-[1.04]"
            >
              Built with{' '}
              <span className="font-editorial italic font-normal text-slate-950 tracking-normal inline-block">
                purpose.
              </span>
            </motion.div>
          </div>

          {/* Line 3 */}
          <div className="overflow-hidden">
            <motion.div
              variants={line3Variants}
              className="font-sans text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] font-extrabold text-slate-950 tracking-tight leading-[1.04]"
            >
              Made to{' '}
              <span className="font-editorial italic font-normal text-slate-950 tracking-normal inline-flex items-baseline">
                last
                <span className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-950 ml-2 mb-1 transform transition-transform duration-300 hover:scale-125" />
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Supporting Narrative Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-14 max-w-2xl"
        >
          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-sans leading-relaxed font-normal">
            {manifestoStatement}
          </p>
        </motion.div>

        {/* Discipline Pillars (Minimal Coordinate Accents) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-slate-200/80 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-left"
        >
          <div className="flex flex-col items-center sm:items-start space-y-1">
            <span className="font-mono text-[11px] font-bold text-slate-950 tracking-wider">
              01 // SINGLE-SOURCE
            </span>
            <span className="text-xs text-slate-700 font-medium">
              Architecture & turnkey engineering
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-1">
            <span className="font-mono text-[11px] font-bold text-slate-950 tracking-wider">
              02 // DEFECT-FREE APPROACH
            </span>
            <span className="text-xs text-slate-700 font-medium">
              Rigorous multi-stage quality assurance
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-1">
            <span className="font-mono text-[11px] font-bold text-slate-950 tracking-wider">
              03 // ENDURING VALUE
            </span>
            <span className="text-xs text-slate-700 font-medium">
              Guaranteed milestone handovers
            </span>
          </div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* LAYER 5: FOREGROUND WISPY MIST VEIL (Volumetric 3D Depth)   */}
      {/* ============================================================ */}
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none overflow-hidden opacity-35 mix-blend-screen">
        <div
          className="w-full h-full bg-repeat-x bg-bottom bg-contain"
          style={{
            backgroundImage: "url('/assets/mist-clouds.png')",
          }}
        />
      </div>
    </section>
  );
};
