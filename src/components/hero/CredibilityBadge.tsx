import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CredibilityBadge: React.FC = () => {
  const { settings } = useData();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-blue-100/90 shadow-sm text-slate-800 select-none group hover:border-royal-300 transition-colors duration-300"
    >
      {/* Visual Accent: Tiny Dual Badges */}
      <div className="flex items-center -space-x-1.5">
        <span className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-xs">
          <ShieldCheck className="w-3 h-3" />
        </span>
        <span className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-xs">
          <Award className="w-3 h-3" />
        </span>
      </div>

      {/* Badge Text */}
      <span className="font-mono text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900">
        {settings?.heroBadge || 'TRUSTED CONSTRUCTION EXPERTS • ISO 9001:2015'}
      </span>
    </motion.div>
  );
};
