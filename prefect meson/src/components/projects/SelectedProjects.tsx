import React, { useRef, useState, useEffect, useCallback } from 'react';
import { projectsConfig, ProjectItem } from '../../data/projectsData';
import { ArrowRight, MapPin, Building2, Layers } from 'lucide-react';

interface SelectedProjectsProps {
  onOpenProjectModal?: (project: ProjectItem) => void;
}

export const SelectedProjects: React.FC<SelectedProjectsProps> = ({
  onOpenProjectModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndicator, setActiveIndicator] = useState<number>(0);

  const projects = projectsConfig.projects;
  const numProjects = projects.length; // 4

  // Synchronous physical vertical update on scroll
  const updatePanelPositions = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const maxOffset = (numProjects - 1) * vh;

    // Direct scrollOffset in pixels
    const currentScroll = -rect.top;
    const scrollOffset = Math.max(0, Math.min(maxOffset, currentScroll));

    // Update every panel's physical translate3d(0, y, 0)
    for (let i = 0; i < numProjects; i++) {
      const panel = panelsRef.current[i];
      if (!panel) continue;

      // Exact physical vertical position: i * vh - scrollOffset
      const y = i * vh - scrollOffset;

      panel.style.transform = `translate3d(0, ${y}px, 0)`;

      // Hide panels that are completely offscreen to optimize GPU compositing
      if (y <= -vh || y >= vh) {
        panel.style.visibility = 'hidden';
      } else {
        panel.style.visibility = 'visible';
      }
    }

    // Active indicator calculation
    const currentIdx = Math.min(
      numProjects - 1,
      Math.max(0, Math.round(scrollOffset / vh))
    );
    setActiveIndicator(currentIdx);
  }, [numProjects]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updatePanelPositions();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updatePanelPositions(); // Initial position

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [updatePanelPositions]);

  return (
    <div id="projects" className="relative w-full bg-white text-slate-900 z-20">


      {/* ============================================================ */}
      {/* 2. EXACT VERTICAL PHYSICAL STACK (400vh)                      */}
      {/* ============================================================ */}
      <div
        ref={containerRef}
        className="project-scroll-section relative w-full h-[400vh] bg-slate-950"
      >
        {/* Sticky 100vw x 100vh Fullscreen Stage */}
        <div className="project-sticky-stage sticky top-0 left-0 w-full h-screen overflow-hidden select-none bg-slate-950">
          {projects.map((project: ProjectItem, index: number) => {
            return (
              <div
                key={project.id}
                ref={(el) => (panelsRef.current[index] = el)}
                style={{
                  transform: `translate3d(0, ${index * 100}vh, 0)`,
                  willChange: 'transform',
                }}
                className="project-panel absolute top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-end select-none"
              >
                {/* 1. FULLSCREEN PROJECT IMAGE (100vw x 100vh object-cover) */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center block"
                    style={{ opacity: 1 }}
                  />

                  {/* Gradient Overlays for Card Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950/45 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* 2. FLOATING INFORMATION CARD (Attached Directly Inside Each Panel) */}
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

                    {/* Location & Metadata */}
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

                    {/* View Project Action Button */}
                    <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
                      <div className="text-[11px] font-mono text-slate-400">
                        PROJECT {project.number} OF 0{numProjects}
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenProjectModal?.(project)}
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-black active:bg-royal-800 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 group-hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
                      >
                        <span>VIEW PROJECT</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* ======================================================== */}
          {/* FIXED BOTTOM TIMELINE REEL INDICATOR                     */}
          {/* ======================================================== */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30 pointer-events-none">
            {projects.map((proj: ProjectItem, idx: number) => {
              const isActive = idx === activeIndicator;
              return (
                <span
                  key={proj.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'w-8 bg-slate-1000 shadow-xs' : 'w-2 bg-white/40'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
