import React from 'react';
import { ShowcaseProject } from '../../data/showcaseData';
import { ArrowRight, MapPin, Building2, Layers } from 'lucide-react';

interface ProjectCardProps {
  project: ShowcaseProject;
  totalProjects: number;
  onSelectProject?: (project: ShowcaseProject) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  totalProjects,
  onSelectProject,
}) => {
  return (
    <div className="relative z-30 pb-8 sm:pb-12 px-4 sm:px-6 w-full flex justify-center pointer-events-auto">
      <div className="group relative w-full max-w-xl p-6 sm:p-8 rounded-[28px] bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-2xl text-slate-900 transition-all duration-300 hover:shadow-cta-glow">
        {/* Category Pill + Status */}
        <div className="flex items-center justify-between gap-3 mb-3.5 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-royal-100 text-[11px] font-mono tracking-wider font-bold text-slate-900 uppercase">
            <Building2 className="w-3.5 h-3.5 text-slate-950" />
            <span>
              {project.number} // {project.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[10.5px] font-mono font-semibold text-orange-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
            <span>{project.status}</span>
          </div>
        </div>

        {/* Project Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 uppercase tracking-tight leading-tight group-hover:text-slate-950 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Location & Specs */}
        <div className="flex items-center gap-4 text-xs font-sans text-slate-500 font-medium mt-2 mb-3.5">
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

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed line-clamp-2 mb-5">
          {project.description}
        </p>

        {/* Action Button & Metadata */}
        <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
          <div className="text-[11px] font-mono text-slate-400">
            PROJECT {project.number} OF 0{totalProjects}
          </div>

          <button
            type="button"
            onClick={() => onSelectProject?.(project)}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-black active:bg-royal-800 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 group-hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
          >
            <span>VIEW PROJECT</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
