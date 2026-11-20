import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ShowcaseProject, showcaseConfig } from '../../data/showcaseData';
import { ProjectPanel } from './ProjectPanel';

interface ProjectScrollStoryProps {
  onSelectProject?: (project: ShowcaseProject) => void;
}

export const ProjectScrollStory: React.FC<ProjectScrollStoryProps> = ({
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndicator, setActiveIndicator] = useState<number>(0);

  const projects = showcaseConfig.projects;
  const numProjects = projects.length; // 4

  // Synchronous physical vertical calculation
  const updatePanelPositions = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const maxOffset = (numProjects - 1) * vh;

    // Direct scroll offset from viewport top
    const currentScroll = -rect.top;
    const scrollOffset = Math.max(0, Math.min(maxOffset, currentScroll));

    // Update every panel: panelY = index * vh - scrollOffset
    for (let i = 0; i < numProjects; i++) {
      const panel = panelsRef.current[i];
      if (!panel) continue;

      const y = i * vh - scrollOffset;
      panel.style.transform = `translate3d(0, ${y}px, 0)`;

      // Hide offscreen panels to optimize GPU rendering
      if (y <= -vh || y >= vh) {
        panel.style.visibility = 'hidden';
      } else {
        panel.style.visibility = 'visible';
      }
    }

    // Update bottom reel indicator
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
    updatePanelPositions();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [updatePanelPositions]);

  return (
    <div
      ref={containerRef}
      className="project-scroll-story relative w-full h-[400vh] bg-slate-950"
    >
      {/* Sticky 100vw x 100vh Stage */}
      <div className="sticky-viewport sticky top-0 left-0 w-full h-screen overflow-hidden select-none bg-slate-950">
        {projects.map((project: ShowcaseProject, index: number) => (
          <ProjectPanel
            key={project.id}
            ref={(el) => (panelsRef.current[index] = el)}
            project={project}
            index={index}
            totalProjects={numProjects}
            onSelectProject={onSelectProject}
          />
        ))}

        {/* Bottom Timeline Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30 pointer-events-none">
          {projects.map((proj: ShowcaseProject, idx: number) => {
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
  );
};
