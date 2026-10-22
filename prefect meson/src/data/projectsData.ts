export interface ProjectItem {
  id: string;
  number: string;
  category: string;
  title: string;
  location: string;
  description: string;
  scope: string;
  status: string;
  image: string;
  slug: string;
  areaSqFt?: string;
}

export interface ProjectsSectionData {
  eyebrow: string;
  headline: {
    line1: string;
    line2: string;
  };
  description: string;
  projects: ProjectItem[];
}

export const projectsConfig: ProjectsSectionData = {
  eyebrow: 'OUR PROJECTS',
  headline: {
    line1: 'Explore our selected',
    line2: 'construction projects.',
  },
  description:
    'Discover residential, commercial, turnkey and interior projects delivered with precision and purpose.',
  projects: [
    {
      id: 'proj-01',
      number: '01',
      category: 'RESIDENTIAL CONSTRUCTION',
      title: 'Contemporary Residence',
      location: 'Bengaluru, Karnataka',
      description:
        'A modern residential project built through careful planning, reinforced concrete execution and premium finishing.',
      scope: 'Structural Concrete & Turnkey Engineering',
      status: 'ACTIVE EXECUTION',
      image: '/assets/project_01_residential.jpg',
      slug: 'contemporary-residence-bengaluru',
      areaSqFt: '14,500 sq.ft',
    },
    {
      id: 'proj-02',
      number: '02',
      category: 'COMMERCIAL CONSTRUCTION',
      title: 'Modern Business Centre',
      location: 'Outer Ring Road, Bangalore',
      description:
        'High-efficiency commercial development featuring advanced superstructure engineering, tower crane operations and unitized glass facade installation.',
      scope: 'Core & Shell Structural Execution',
      status: 'ACTIVE SUPERSTRUCTURE',
      image: '/assets/project_02_commercial.jpg',
      slug: 'modern-business-centre-bangalore',
      areaSqFt: '185,000 sq.ft',
    },
    {
      id: 'proj-03',
      number: '03',
      category: 'TURNKEY PROJECT',
      title: 'Integrated Corporate Campus',
      location: 'Electronic City, Bangalore',
      description:
        'End-to-end turnkey project execution combining structural engineering, honed natural sandstone facade finishing and smart infrastructure.',
      scope: 'Turnkey Master Execution',
      status: 'NEARING HANDOVER',
      image: '/assets/project_03_turnkey.jpg',
      slug: 'integrated-corporate-campus-bangalore',
      areaSqFt: '92,000 sq.ft',
    },
    {
      id: 'proj-04',
      number: '04',
      category: 'INTERIORS / COMPLETED PROJECT',
      title: 'Waterfront Architectural Estate',
      location: 'Bengaluru, Karnataka',
      description:
        'Completed luxury contemporary architectural estate featuring bespoke teak wood detailing, flush perimeter infinity pool and landscaped gardens.',
      scope: 'Turnkey Architecture, Build & Interiors',
      status: 'COMPLETED HANDOVER',
      image: '/assets/project_04_completed.jpg',
      slug: 'waterfront-estate-bengaluru',
      areaSqFt: '16,200 sq.ft',
    },
  ],
};
