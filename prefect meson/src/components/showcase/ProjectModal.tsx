import React, { useEffect } from 'react';
import { ShowcaseProject } from '../../data/showcaseData';
import { X, MapPin, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: ShowcaseProject | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestConsultation?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onRequestConsultation,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row text-slate-900 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Project Modal"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-white hover:scale-105 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: High-Resolution Visual */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-slate-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 text-white font-mono text-xs px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20">
            PROJECT {project.number}
          </div>
        </div>

        {/* Right Side: Architectural Brief Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category & Status */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-royal-100 text-slate-900 font-mono text-[11px] font-bold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 font-mono text-[11px] font-semibold">
                {project.status}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 uppercase tracking-tight leading-tight mb-2">
              {project.title}
            </h3>

            {/* Location & Specs */}
            <div className="flex items-center gap-4 text-xs font-sans text-slate-500 font-medium mb-4">
              <span className="inline-flex items-center gap-1.5 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-slate-950" />
                {project.location}
              </span>
              {project.areaSqFt && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="inline-flex items-center gap-1 text-slate-600">
                    <Layers className="w-3.5 h-3.5 text-slate-900" />
                    {project.areaSqFt}
                  </span>
                </>
              )}
            </div>

            {/* Scope of Execution */}
            <div className="mb-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                EXECUTION SCOPE
              </div>
              <div className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-950 shrink-0" />
                <span>{project.scope}</span>
              </div>
            </div>

            {/* Detailed Description */}
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6">
              {project.description}
            </p>
          </div>

          {/* Consultation CTA */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onRequestConsultation}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-cta-glow transition-all"
            >
              <span>DISCUSS SIMILAR PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
