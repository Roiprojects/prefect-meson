import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Phone,
  FileText,
  X,
  Sparkles,
  Headphones,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { navigationConfig } from '../../data/navigationData';
import { useData } from '../../context/DataContext';

interface FloatingActionsProps {
  onOpenQuoteModal: () => void;
  onOpenAiChat?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenQuoteModal,
  onOpenAiChat,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { settings } = useData();

  const activePhone = settings?.phone || navigationConfig.contactQuickInfo.phone;
  const activeWhatsapp =
    settings?.whatsappNumber || settings?.phone || navigationConfig.contactQuickInfo.phone;
  const rawWhatsapp = activeWhatsapp.replace(/[^0-9]/g, '');

  const whatsappUrl = `https://wa.me/${rawWhatsapp}?text=${encodeURIComponent(
    'Hello Perfect Mason, I would like to enquire about an architectural & construction project.'
  )}`;
  const phoneUrl = `tel:${activePhone}`;

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none pointer-events-auto"
    >
      {/* 1. EXPANDED CONCIERGE CARD (Floats above the button, cleanly aligned, zero overlapping) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="absolute bottom-20 right-0 w-[310px] sm:w-[350px] bg-slate-950/95 backdrop-blur-2xl text-white rounded-3xl border-2 border-white/20 shadow-[0_25px_60px_-10px_rgba(15,23,42,0.6)] p-4 flex flex-col gap-3 overflow-hidden z-50"
          >
            {/* Top Gloss Highlight */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/15 to-transparent rounded-t-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <img
                  src="/logo.png"
                  alt="Perfect Mason"
                  className="w-12 h-12 rounded-full bg-white object-contain p-1 shadow-md shrink-0 ring-2 ring-white/40"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-xs font-black tracking-wider uppercase text-white">
                      PERFECT MASON
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300">
                    Live Concierge & AI Assistant
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close concierge"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Action Channels */}
            <div className="flex flex-col gap-2 relative">
              {/* Channel 1: AI Project Assistant */}
              {onOpenAiChat && (
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    onOpenAiChat();
                  }}
                  className="group w-full p-2.5 rounded-2xl bg-gradient-to-r from-blue-950 via-[#0B132B] to-slate-900 border border-blue-500/30 hover:border-blue-400 text-left flex items-center justify-between transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                      <Sparkles className="w-4 h-4 text-orange-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans text-xs font-bold text-white">
                          AI Project Assistant
                        </span>
                        <span className="text-[9px] font-mono bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded font-semibold">
                          AI
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-300">
                        Bylaws, costs, setback & plot planning
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              )}

              {/* Channel 2: WhatsApp Chat */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsExpanded(false)}
                className="group w-full p-2.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-400 text-left flex items-center justify-between transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center shrink-0 group-hover:bg-[#25D366] transition-colors">
                    <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-slate-950 transition-colors fill-current" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans text-xs font-bold text-white">
                        WhatsApp Architecture
                      </span>
                      <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                        FAST
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-300">
                      {activeWhatsapp} • Instant reply
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </a>

              {/* Channel 3: Direct Phone Call */}
              <a
                href={phoneUrl}
                onClick={() => setIsExpanded(false)}
                className="group w-full p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-left flex items-center justify-between transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                    <Phone className="w-4 h-4 text-orange-400 group-hover:text-slate-950 transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-xs font-bold text-white">
                      Call Principal Team
                    </span>
                    <span className="text-[10px] text-slate-300">
                      {activePhone} • Mon–Sat 9AM–6PM
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </a>

              {/* Channel 4: Free BOQ / Project Estimate */}
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  onOpenQuoteModal();
                }}
                className="group w-full p-2.5 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950/70 border border-white/10 hover:border-white/30 text-left flex items-center justify-between transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center shrink-0 group-hover:bg-orange-500 transition-colors">
                    <FileText className="w-4 h-4 text-orange-400 group-hover:text-slate-950 transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-xs font-bold text-white">
                      Request Project Estimate
                    </span>
                    <span className="text-[10px] text-slate-300">
                      Free BOQ consultation & site visit
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            </div>

            {/* Micro Footer */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>Bangalore Studio • Zero spam</span>
              </span>
              <span className="text-slate-300">AECS Layout</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. PERSISTENT HIGH-VISIBILITY PILL CALLOUT (Beside the trigger button) */}
      {!isExpanded && (
        <motion.button
          type="button"
          onClick={() => setIsExpanded(true)}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-950 text-white border-2 border-white shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-md hover:bg-slate-900 transition-all cursor-pointer select-none ring-2 ring-blue-600/30"
          aria-label="Open Quick Connect"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-sans text-xs font-bold tracking-wide text-white whitespace-nowrap">
            Quick Connect & AI
          </span>
          <span className="text-[9.5px] font-mono text-amber-300 font-bold bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
            ONLINE
          </span>
        </motion.button>
      )}

      {/* 3. SOLID, HIGH-CONTRAST TRIGGER BUTTON (100% VISIBLE) */}
      <motion.button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-[0_12px_36px_rgba(0,0,0,0.45)] border-2 border-white ring-4 ring-blue-600/30 hover:ring-blue-500/60 transition-all duration-200 focus:outline-none overflow-hidden group cursor-pointer shrink-0"
        aria-label={isExpanded ? 'Close Concierge' : 'Open Concierge'}
      >
        {/* Subtle glass reflection highlight */}
        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none" />

        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 450, damping: 24 }}
          className="relative z-10 flex items-center justify-center"
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-white group-hover:text-orange-400 transition-colors" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Headphones className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-orange-400 transition-colors" />
              {/* Online green indicator badge */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-slate-950" />
              </span>
            </div>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};
