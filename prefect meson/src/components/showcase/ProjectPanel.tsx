import { forwardRef } from 'react';
import { ShowcaseProject } from '../../data/showcaseData';
import { ProjectCard } from './ProjectCard';

interface ProjectPanelProps {
  project: ShowcaseProject;
  index: number;
  totalProjects: number;
  onSelectProject?: (project: ShowcaseProject) => void;
}

export const ProjectPanel = forwardRef<HTMLDivElement, ProjectPanelProps>(
  ({ project, totalProjects, onSelectProject }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          willChange: 'transform',
        }}
        className="project-panel absolute top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-end select-none bg-slate-950"
      >
        {/* 1. FULLSCREEN PROJECT IMAGE (100vw x 100vh object-cover) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center block"
            style={{ opacity: 1 }}
          />

          {/* Readability Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950/45 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* 2. ATTACHED INFORMATION CARD (Moves In Lockstep With Image) */}
        <ProjectCard
          project={project}
          totalProjects={totalProjects}
          onSelectProject={onSelectProject}
        />
      </div>
    );
  }
);

ProjectPanel.displayName = 'ProjectPanel';
