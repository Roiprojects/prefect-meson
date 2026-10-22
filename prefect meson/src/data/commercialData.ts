export interface CommercialPageData {
  slug: string;
  category: string;
  title: string;
  description: string;
  heroImage: string;
  capabilities: string[];
  scope: {
    title: string;
    items: string[];
  };
  process: {
    title: string;
    description: string;
  }[];
  seo: {
    title: string;
    description: string;
  };
}

export const commercialPages: CommercialPageData[] = [
  {
    slug: 'office-buildings',
    category: 'Corporate & Retail',
    title: 'Office Buildings Built for Better Work.',
    description: 'We construct modern Indian corporate offices with precise structural execution, glass facades, and professional commercial environments optimized for productivity and scale.',
    heroImage: '/assets/comm_office_hero.jpg',
    capabilities: [
      'Corporate Offices',
      'Business Parks',
      'Corporate Headquarters',
      'Workplace Construction',
      'Structural Execution',
      'MEP Coordination',
      'Interior Coordination',
      'Finishing'
    ],
    scope: {
      title: 'WHAT WE DELIVER',
      items: [
        'End-to-end structural construction for high-rise workspaces.',
        'Integration of intelligent HVAC and building management systems.',
        'Acoustic engineering and premium interior finish coordination.'
      ]
    },
    process: [
      { title: 'Feasibility', description: 'Site analysis and structural blueprinting.' },
      { title: 'Execution', description: 'Deep foundation and RCC framing.' },
      { title: 'Handover', description: 'Final snagging and MEP commissioning.' }
    ],
    seo: {
      title: 'Office Buildings | Perfect Mason Commercial',
      description: 'Expert construction of corporate offices and business parks.'
    }
  },
  {
    slug: 'commercial-complexes',
    category: 'Corporate & Retail',
    title: 'Commercial Spaces Designed for Scale.',
    description: 'Mixed-use developments integrating retail, office, and parking architecture with heavy structural execution and intelligent services coordination.',
    heroImage: '/assets/comm_complex_hero.jpg',
    capabilities: [
      'Planning',
      'Civil Construction',
      'Structural Work',
      'Services Coordination',
      'Finishing',
      'Project Management'
    ],
    scope: {
      title: 'WHAT WE DELIVER',
      items: [
        'Large-scale commercial complex construction.',
        'Multi-level parking and pedestrian circulation.',
        'High-capacity MEP and life-safety systems.'
      ]
    },
    process: [
      { title: 'Planning', description: 'Master plan and zone engineering.' },
      { title: 'Structure', description: 'Heavy civil and concrete batching.' },
      { title: 'Services', description: 'Centralized utility integration.' }
    ],
    seo: {
      title: 'Commercial Complexes | Perfect Mason',
      description: 'Building large-scale mixed-use commercial developments.'
    }
  },
  {
    slug: 'retail-spaces',
    category: 'Corporate & Retail',
    title: 'Retail Environments Built to Perform.',
    description: 'Premium Indian high-street retail architecture featuring modern storefronts, architectural lighting, and luxurious customer circulation spaces.',
    heroImage: '/assets/comm_retail_hero.jpg',
    capabilities: [
      'Retail Planning',
      'Structural Execution',
      'Facade Engineering',
      'Services Integration',
      'Interior Execution',
      'Premium Finishing'
    ],
    scope: {
      title: 'WHAT WE DELIVER',
      items: [
        'High-end retail storefronts and display architecture.',
        'Advanced architectural lighting and HVAC.',
        'Bespoke joinery and premium flooring.'
      ]
    },
    process: [
      { title: 'Blueprint', description: 'Retail flow and structural planning.' },
      { title: 'Facade', description: 'Glass and cladding installation.' },
      { title: 'Fit-out', description: 'Interior finishing and handover.' }
    ],
    seo: {
      title: 'Retail Spaces | Perfect Mason',
      description: 'Premium retail construction and execution.'
    }
  },
  {
    slug: 'showrooms',
    category: 'Corporate & Retail',
    title: 'Showrooms Made for the Brand.',
    description: 'Premium Indian automotive, luxury, and lifestyle showrooms with expansive glass facades and brand-sensitive finishing.',
    heroImage: '/assets/comm_showroom_hero.jpg',
    capabilities: [
      'Showroom Planning',
      'Large-span Structure',
      'MEP Coordination',
      'Architectural Lighting',
      'Interiors',
      'Brand-sensitive Finishing'
    ],
    scope: {
      title: 'WHAT WE DELIVER',
      items: [
        'Large-span column-free display areas.',
        'Heavy-duty flooring for automotive display.',
        'Precision lighting and brand integration.'
      ]
    },
    process: [
      { title: 'Design Sync', description: 'Aligning with global brand guidelines.' },
      { title: 'Execution', description: 'Fast-track structural and glass work.' },
      { title: 'Detailing', description: 'Perfecting joints and finishes.' }
    ],
    seo: {
      title: 'Showrooms | Perfect Mason',
      description: 'Luxury showroom architecture and construction.'
    }
  },
  {
    slug: 'restaurants',
    category: 'Hospitality & Industrial',
    title: 'Spaces That Bring People Together.',
    description: 'Premium Indian restaurant architecture combining luxurious dining interiors with complex commercial kitchen coordination.',
    heroImage: '/assets/comm_restaurant_hero.jpg',
    capabilities: [
      'Restaurant Construction',
      'Commercial Kitchen Coordination',
      'HVAC Coordination',
      'Acoustic Lighting',
      'Interiors',
      'Finishing',
      'Guest Circulation'
    ],
    scope: {
      title: 'WHAT WE DELIVER',
      items: [
        'Atmospheric dining architecture and execution.',
        'High-capacity commercial exhaust and MEP.',
        'Bespoke millwork and bar joinery.'
      ]
    },
    process: [
      { title: 'Services', description: 'Kitchen and dining MEP layout.' },
      { title: 'Interiors', description: 'Acoustic and aesthetic treatments.' },
      { title: 'Commissioning', description: 'Testing all culinary infrastructure.' }
    ],
    seo: {
      title: 'Restaurants | Perfect Mason',
      description: 'Fine dining and commercial restaurant construction.'
    }
  },
  {
    slug: 'hospitality',
    category: 'Hospitality & Industrial',
    title: 'Built for Hospitality.',
    description: 'Indian luxury hotel, resort, and boutique hospitality projects focused on guest experience, grand lobbies, and serene landscaping.',
    heroImage: '/assets/comm_hospitality_hero.jpg',
    capabilities: [
      'Hotel/Resort Construction',
      'Guest Areas',
      'Lobby Architecture',
      'Rooms & Suites',
      'Central Services',
      'Interior Execution',
      'Landscape Coordination'
    ],
    scope: {
      title: 'WHAT WE DELIVER',
      items: [
        'End-to-end resort and hotel civil execution.',
        'Luxury room fit-outs and bathroom engineering.',
        'Pool, spa, and landscape structural integration.'
      ]
    },
    process: [
      { title: 'Substructure', description: 'Extensive foundation and site prep.' },
      { title: 'Superstructure', description: 'Multi-level room framing.' },
      { title: 'Luxury Fit-out', description: 'Immaculate guest-facing finishes.' }
    ],
    seo: {
      title: 'Hospitality | Perfect Mason',
      description: 'Luxury hotel and resort construction.'
    }
  },
  {
    slug: 'institutional',
    category: 'Hospitality & Industrial',
    title: 'Built for Communities and Institutions.',
    description: 'Modern Indian institutional architecture for education campuses, research facilities, and civic buildings.',
    heroImage: '/assets/comm_institutional_hero.jpg',
    capabilities: [
      'Campus Planning',
      'Structural Construction',
      'Centralized Services',
      'Institutional Finishing',
      'Project Management',
      'Safety Compliance'
    ],
    scope: {
      title: 'WHAT WE DELIVER',
      items: [
        'Large-scale academic and research blocks.',
        'Auditoriums and high-capacity circulation.',
        'Durable, low-maintenance institutional finishes.'
      ]
    },
    process: [
      { title: 'Logistics', description: 'Managing large-scale material flow.' },
      { title: 'Execution', description: 'Phased block construction.' },
      { title: 'Handover', description: 'Safety audits and facility transfer.' }
    ],
    seo: {
      title: 'Institutional Architecture | Perfect Mason',
      description: 'Education campus and civic building construction.'
    }
  },
  {
    slug: 'industrial-business-spaces',
    category: 'Hospitality & Industrial',
    title: 'Industrial Spaces Built for Performance.',
    description: 'Modern Indian industrial facilities, warehouses, and logistics hubs engineered for heavy-duty performance and scale.',
    heroImage: '/assets/comm_industrial_hero.jpg',
    capabilities: [
      'Warehouse Construction',
      'Logistics Hubs',
      'Fabrication Spaces',
      'Industrial Structure',
      'Loading Areas',
      'Heavy-duty Pavement',
      'High-bay Lighting'
    ],
    scope: {
      title: 'WHAT WE DELIVER',
      items: [
        'Pre-engineered buildings (PEB) and heavy RCC.',
        'Industrial flooring and dock levelers.',
        'High-voltage electrical and fire suppression.'
      ]
    },
    process: [
      { title: 'Earthwork', description: 'Mass grading and compaction.' },
      { title: 'Structure', description: 'Erecting spans and roofing.' },
      { title: 'Flooring', description: 'Laser-screed VDF flooring.' }
    ],
    seo: {
      title: 'Industrial Spaces | Perfect Mason',
      description: 'Warehouse and industrial facility construction.'
    }
  }
];
