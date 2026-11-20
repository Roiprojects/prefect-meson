import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass } from 'lucide-react';

export const CinematicBrandReveal: React.FC = () => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 6, y: y * 6 });
  };

  return (
    <section
      id="brand-reveal"
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[680px] max-h-[1080px] bg-slate-950 select-none overflow-hidden z-20 flex flex-col justify-between"
    >
      {/* ============================================================ */}
      {/* 1. FULLSCREEN 8K ARCHITECTURAL IMAGE LAYER (100vw x 100vh)   */}
      {/* ============================================================ */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.img
          src="/assets/cinematic_grand_estate.jpg"
          alt="Perfect Mason Completed Contemporary Architectural Estate"
          animate={{
            scale: 1.03,
            x: mousePos.x,
            y: mousePos.y,
          }}
          transition={{
            scale: { duration: 8.0, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
            x: { duration: 0.2 },
            y: { duration: 0.2 },
          }}
          className="w-full h-full object-cover object-center transform will-change-transform"
        />

        {/* Ambient Top & Bottom Lighting Gradients */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-64 sm:h-80 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />
      </div>

      {/* ============================================================ */}
      {/* 2. TOP EDITORIAL BADGE & COORDINATES                         */}
      {/* ============================================================ */}
      <div className="relative z-30 pt-10 sm:pt-14 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] uppercase tracking-[0.25em] shadow-lg"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-slate-1000 ring-4 ring-royal-400/30" />
            <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950 animate-ping" />
          </div>
          <span>BUILT WITH PURPOSE</span>
          <Sparkles className="w-3.5 h-3.5 text-slate-400 animate-pulse" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/15 text-slate-300 font-mono text-[11px] tracking-wider"
        >
          <Compass className="w-3.5 h-3.5 text-slate-400 animate-spin-slow" />
          <span>PERFECT MASON // ARCHITECTURAL REVEAL</span>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 3. GIANT OVERSIZED "PERFECT MASON" TYPOGRAPHY (ANCHORED)     */}
      {/* ============================================================ */}
      <div className="relative z-30 pb-0 sm:pb-1 w-full px-2 sm:px-4 text-center overflow-hidden flex flex-col items-center justify-end pointer-events-none">
        <motion.h2
          initial={{ opacity: 0, y: 60, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.95,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-display font-black tracking-[-0.05em] uppercase text-white/85 text-[12.5vw] sm:text-[14vw] lg:text-[15.5vw] leading-[0.88] select-none drop-shadow-2xl will-change-transform w-full"
          style={{
            textShadow: '0 10px 40px rgba(0,0,0,0.65)',
          }}
        >
          PERFECT MASON
        </motion.h2>
      </div>
    </section>
  );
};
