export interface ShowcaseProject {
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

export interface ShowcaseData {
  intro: {
    eyebrow: string;
    headline: {
      line1: string;
      line2: string;
    };
    description: string;
  };
  projects: ShowcaseProject[];
}

export const showcaseConfig: ShowcaseData = {
  intro: {
    eyebrow: 'OUR PROJECTS',
    headline: {
      line1: 'Explore our selected',
      line2: 'construction projects.',
    },
    description:
      'From residential construction to commercial developments, turnkey execution and interiors, every project is delivered with precision, quality and purpose.',
  },
  projects: [
    {
      id: 'showcase-01',
      number: '01',
      category: 'Residential Construction',
      title: 'Contemporary Residence',
      location: 'Bengaluru, Karnataka',
      description:
        'A bespoke multi-story luxury villa constructed with high-grade reinforced concrete, custom formwork, and precision structural engineering.',
      scope: 'Reinforced Concrete Superstructure & Formwork',
      status: 'ACTIVE EXECUTION',
      image: '/assets/showcase_01_residential.jpg',
      slug: 'contemporary-residence',
      areaSqFt: '14,500 sq.ft',
    },
    {
      id: 'showcase-02',
      number: '02',
      category: 'Commercial Construction',
      title: 'Apex Commercial Tower',
      location: 'Hyderabad, Telangana',
      description:
        'High-efficiency commercial development featuring advanced steel reinforcement, tower crane operations, and structural core execution.',
      scope: 'Structural Superstructure & Crane Operations',
      status: 'ACTIVE CORE BUILD',
      image: '/assets/showcase_02_commercial.jpg',
      slug: 'apex-commercial-tower',
      areaSqFt: '185,000 sq.ft',
    },
    {
      id: 'showcase-03',
      number: '03',
      category: 'Turnkey Project',
      title: 'Vivanta Innovation Campus',
      location: 'Electronic City, Bangalore',
      description:
        'Comprehensive turnkey corporate headquarters combining honed natural sandstone facade finishing, structural glazing, and architectural reflection plazas.',
      scope: 'Turnkey Architecture, Structural & Facades',
      status: 'NEARING HANDOVER',
      image: '/assets/showcase_03_turnkey.jpg',
      slug: 'vivanta-innovation-campus',
      areaSqFt: '92,000 sq.ft',
    },
    {
      id: 'showcase-04',
      number: '04',
      category: 'Interiors / Completed Project',
      title: 'Waterfront Luxury Estate',
      location: 'Bengaluru, Karnataka',
      description:
        'Completed luxury contemporary tropical estate featuring cantilevered architecture, teak louver screens, and perimeter infinity pool.',
      scope: 'Turnkey Architecture, Build & Interiors',
      status: 'COMPLETED HANDOVER',
      image: '/assets/showcase_04_completed.jpg',
      slug: 'waterfront-luxury-estate',
      areaSqFt: '16,200 sq.ft',
    },
  ],
};
