import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Layers, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../../data/projectsData';
import { StatusBadge } from '../common/StatusBadge';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConsultationRequest?: (projectName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onConsultationRequest,
}) => {
  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-white rounded-[32px] shadow-2xl border border-slate-200/90 overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Modal Image Header */}
            <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-slate-100 flex-shrink-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-800 hover:bg-white flex items-center justify-center shadow-md transition-transform hover:scale-105 focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Metadata Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/90 backdrop-blur-md text-[11px] font-mono font-bold tracking-wider uppercase">
                    {project.category}
                  </span>
                  <StatusBadge status={project.status} variant="glass" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Key Project Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                    Location
                  </span>
                  <div className="flex items-center gap-1.5 font-sans text-sm text-slate-900 font-bold">
                    <MapPin className="w-4 h-4 text-slate-950" />
                    {project.location}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                    Built-up Area
                  </span>
                  <div className="flex items-center gap-1.5 font-sans text-sm text-slate-900 font-bold">
                    <Layers className="w-4 h-4 text-slate-900" />
                    {project.areaSqFt || 'Custom Scope'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                    Scope of Work
                  </span>
                  <div className="flex items-center gap-1.5 font-sans text-sm text-slate-900 font-bold">
                    <Building2 className="w-4 h-4 text-slate-950" />
                    {project.scope}
                  </div>
                </div>
              </div>

              {/* Description & Execution Highlights */}
              <div className="space-y-3">
                <h4 className="font-display text-base uppercase font-bold text-slate-950">
                  Architectural & Engineering Summary
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {project.description} Engineered according to strict ISO 9001:2015 master-builder benchmarks, incorporating advanced structural modeling, laser-level digital snagging, and single-source contractor transparency.
                </p>
              </div>

              {/* Delivery Guarantees */}
              <div className="p-5 rounded-2xl bg-slate-100/60 border border-royal-100/80 space-y-2">
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-slate-900 font-bold block">
                  PERFECT MASON ASSURANCE
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>Zero-Cost Overrun Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>Digital Milestone Snagging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>Seismic Grade-A Structural Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>Single-Source Key Handover</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-mono text-slate-500">
                  Ready to construct a similar benchmark?
                </span>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onConsultationRequest?.(project.title);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <span>REQUEST PROJECT APPRAISAL</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
