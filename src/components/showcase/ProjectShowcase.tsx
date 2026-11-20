import React from 'react';
import { ShowcaseProject } from '../../data/showcaseData';
import { ProjectHorizontalSlider } from './ProjectHorizontalSlider';

interface ProjectShowcaseProps {
  onOpenProjectModal?: (project: ShowcaseProject) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  onOpenProjectModal,
}) => {
  return (
    <section id="projects" className="relative w-full bg-white text-slate-900 z-20">
      {/* AUTOMATED HORIZONTAL SLIDING PROJECT SHOWCASE */}
      <ProjectHorizontalSlider onOpenProjectModal={onOpenProjectModal} />
    </section>
  );
};
