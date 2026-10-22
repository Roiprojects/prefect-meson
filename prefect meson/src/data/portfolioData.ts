import port1 from '../assets/portfolio_01_residence.jpg';
import port2 from '../assets/showcase_02_commercial.jpg';
import port3 from '../assets/showcase_03_turnkey.jpg';
import port4 from '../assets/portfolio_04_interior.jpg';

export interface PortfolioProject {
  id: string;
  number: string;
  category: string;
  badge: string;
  title: string;
  location: string;
  description: string;
  image: string;
  slug: string;
  scope?: string;
}

export interface PortfolioSectionData {
  eyebrow: string;
  headline: {
    line1: string;
    line2: string;
  };
  description: string;
  ctaText: string;
  projects: PortfolioProject[];
}

export const portfolioConfig: PortfolioSectionData = {
  eyebrow: 'SELECTED PROJECTS',
  headline: {
    line1: 'Explore projects',
    line2: 'built with purpose.',
  },
  description:
    'Discover residential, commercial, turnkey and interior projects delivered with thoughtful planning, quality craftsmanship and attention to every detail.',
  ctaText: 'VIEW ALL PROJECTS',
  projects: [
    {
      id: 'proj-01',
      number: '01',
      category: 'RESIDENTIAL CONSTRUCTION',
      badge: 'RESIDENTIAL',
      title: 'Contemporary Residence',
      location: 'Bengaluru, Karnataka',
      description:
        'Modern residential construction with carefully coordinated planning, structural execution and premium finishing.',
      image: port1,
      slug: 'contemporary-residence',
      scope: 'Turnkey Residential Architecture & Structural Build',
    },
    {
      id: 'proj-02',
      number: '02',
      category: 'COMMERCIAL CONSTRUCTION',
      badge: 'COMMERCIAL',
      title: 'Modern Business Centre',
      location: 'Hyderabad, Telangana',
      description:
        'Contemporary commercial construction focused on efficient planning, structural quality and coordinated execution.',
      image: port2,
      slug: 'modern-business-centre',
      scope: 'High-Efficiency Superstructure & Facade Engineering',
    },
    {
      id: 'proj-03',
      number: '03',
      category: 'TURNKEY PROJECT',
      badge: 'TURNKEY',
      title: 'Integrated Development',
      location: 'Whitefield, Bangalore',
      description:
        'End-to-end project execution coordinated from planning through finishing and handover.',
      image: port3,
      slug: 'integrated-development',
      scope: 'Turnkey Campus Engineering & Sustainable Architecture',
    },
    {
      id: 'proj-04',
      number: '04',
      category: 'INTERIORS',
      badge: 'INTERIORS',
      title: 'Contemporary Interior Project',
      location: 'Bengaluru, Karnataka',
      description:
        'Purposeful interior execution combining space planning, materials, lighting and custom finishes.',
      image: port4,
      slug: 'contemporary-interior-project',
      scope: 'Architectural Space Planning & Bespoke Joinery',
    },
  ],
};
