import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CredibilityBadge: React.FC = () => {
  const { settings } = useData();

  const badgeText = settings?.heroBadge || 'TRUSTED CONSTRUCTION EXPERTS • ISO 9001:2015';

  // Parse segments if separated by bullet or pipe for clean, balanced wrapping on mobile
  const separator = badgeText.includes('•') ? '•' : badgeText.includes('|') ? '|' : null;
  const segments = separator
    ? badgeText.split(separator).map((s: string) => s.trim()).filter(Boolean)
    : [badgeText];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-md border border-blue-100/90 shadow-sm text-slate-800 select-none group hover:border-royal-300 transition-colors duration-300 max-w-[94vw] sm:max-w-fit mx-auto"
    >
      {/* Visual Accent: Tiny Dual Badges */}
      <div className="flex items-center -space-x-1.5 shrink-0 self-center">
        <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-xs">
          <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        </span>
        <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-xs">
          <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        </span>
      </div>

      {/* Badge Text: Clean single-line on desktop, balanced stacked wrap on narrow mobile viewports */}
      <div className="font-mono text-[9px] min-[380px]:text-[9.5px] sm:text-[11px] font-bold uppercase tracking-[0.05em] sm:tracking-[0.18em] text-slate-900 flex flex-col sm:flex-row items-center sm:gap-2 text-center leading-tight sm:leading-normal">
        <span className="whitespace-nowrap">{segments[0]}</span>
        {segments.length > 1 && (
          <>
            <span className="hidden sm:inline text-slate-400 select-none">•</span>
            <span className="whitespace-nowrap">{segments.slice(1).join(' • ')}</span>
          </>
        )}
      </div>
    </motion.div>
  );
};
