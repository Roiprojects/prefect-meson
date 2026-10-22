// =========================================================================
// PERFECT MASON — VERIFIED KNOWLEDGE BASE FOR AI ASSISTANT
// =========================================================================

export const perfectMasonKnowledge = {
  company: {
    name: 'Perfect Mason',
    parentEntity: 'NDL Engineers & Contractors',
    tagline: 'Architectural & Turnkey Construction Excellence',
    description:
      'Premier architectural and turnkey construction firm based in Bengaluru, specializing in high-precision luxury villas, commercial towers, turnkey project execution, and bespoke interior architecture.',
    studioOffice: {
      address: 'No: 2041, 18th Cross, AECS Layout, A Block, Hosur Main Road, Bangalore - 560068',
      landmark: 'Near Singasandra / Kudlu Gate on Hosur Main Road, South Bangalore',
      workingHours: 'Monday to Saturday, 9:00 AM to 6:00 PM (Sunday by prior appointment)',
      phone: '+91 98863 29424',
      whatsapp: '+91 98863 29424',
      email: 'contact@perfectmason.com',
      website: 'https://prefect-meson.vercel.app',
    },
    serviceAreas: [
      'Bengaluru / Bangalore (all zones including HSR Layout, Koramangala, Indiranagar, Whitefield, Sarjapur Road, Electronic City, Jayanagar, JP Nagar, Bannerghatta Road, Sadashivanagar, Hebbal)',
    ],
  },

  services: {
    residential: {
      title: 'Residential Construction',
      route: '/residential',
      description:
        'Architectural design, structural engineering, and end-to-end civil construction of custom homes.',
      types: [
        'Contemporary Luxury Villas',
        'Independent Duplex Homes',
        'Multi-Storey Residences (G+2, G+3, G+4)',
        'Row Houses and Gated Community Residences',
        'Comprehensive Structural Renovations and Floor Extensions',
      ],
      standards: [
        'Soil testing and structural RCC frame engineered to IS 456 & IS 1893 seismic standards',
        'Fe550D TMT steel reinforcement and RMC (Ready Mix Concrete) grade M25/M30',
        'Advanced damp-proofing and 5-layer terrace waterproofing',
        'Custom architectural facades: terracotta louvers, exposed concrete, double-glazed fenestrations',
      ],
    },

    commercial: {
      title: 'Commercial Construction & Workspaces',
      route: '/commercial',
      description:
        'Corporate office complexes, retail showrooms, hospitality venues, and industrial facilities.',
      types: [
        'Multi-Storey Commercial & Office Complexes',
        'Automobile & Retail Flagship Showrooms',
        'Restaurants, Cafes & Fine Dining Hospitality Venues',
        'Healthcare Clinics & Institutional Facilities',
        'Pre-engineered Buildings (PEB) & Industrial Warehouses',
      ],
      standards: [
        'Post-tensioned slabs and large column-free spans for retail and office layouts',
        'Centralized HVAC ducting, VRV/VRF systems, and fire protection networks (NFPA / NBC compliant)',
        'Commercial grade three-phase power distribution and acoustic insulation',
      ],
    },

    turnkey: {
      title: 'Turnkey Project Execution',
      route: '/turnkey-project-execution',
      description:
        'Single-point accountability from raw plot feasibility to final key handover.',
      stages: [
        {
          stage: '01',
          name: 'Consultation & Spatial Planning',
          desc: 'Client brief analysis, site survey, architectural schematics and 3D visualization.',
        },
        {
          stage: '02',
          name: 'Engineering & BOQ Preparation',
          desc: 'Structural drawings, MEP planning, and transparent itemized Bill of Quantities (zero hidden costs).',
        },
        {
          stage: '03',
          name: 'Civil & RCC Construction',
          desc: 'Foundation, column casting, masonry, lintel, and roof slabs with milestone verification.',
        },
        {
          stage: '04',
          name: 'MEP & Quality Control',
          desc: 'Concealed electrical conduits, CPVC plumbing, waterproofing, and acoustic engineering.',
        },
        {
          stage: '05',
          name: 'Joinery, Interiors & Handover',
          desc: 'Millwork, flooring, fixtures, paint finishing, deep cleaning, and project handover.',
        },
      ],
      benefits: [
        'Guaranteed milestone-based delivery',
        'Itemized transparent BOQ billing with price protection',
        '5-Year structural warranty',
        'Daily on-site senior engineering supervision',
      ],
    },

    interiors: {
      title: 'Interior Architecture & Execution',
      route: '/interiors',
      description:
        'Custom luxury residential and commercial interior design and turnkey execution.',
      spaces: [
        'Living Rooms with bespoke acoustic paneling, Italian marble, and ambient lighting',
        'Modular Kitchens with Blum hardware, quartz/granite counters, and marine ply cabinetry',
        'Master Suites & Bedrooms with walk-in wardrobes, upholstered headboards, and hardwood floors',
        'Executive Commercial Offices with ergonomic modular workstations, acoustic ceilings, and boardroom tech',
      ],
    },
  },

  bangaloreBuildingNorms: {
    standardPlotSizes: [
      { dimensions: '30 × 40 ft', plotArea: '1,200 sq.ft', typicalBuiltUp: '2,400 to 3,600 sq.ft across G+2 / G+3 floors' },
      { dimensions: '30 × 50 ft', plotArea: '1,500 sq.ft', typicalBuiltUp: '3,000 to 4,500 sq.ft across G+2 / G+3 floors' },
      { dimensions: '40 × 60 ft', plotArea: '2,400 sq.ft', typicalBuiltUp: '5,000 to 7,500 sq.ft across G+3 / G+4 floors' },
      { dimensions: '50 × 80 ft', plotArea: '4,000 sq.ft', typicalBuiltUp: '8,000 to 14,000 sq.ft bespoke luxury villa / commercial' },
    ],
    regulationsNote:
      'The exact permitted built-up area and floor count in Bengaluru depend on road width, BBMP/BDA bylaws, Floor Area Ratio (FAR), setbacks, and plot frontage.',
  },

  pricingPhilosophy: {
    policy:
      'Perfect Mason does not use arbitrary flat square-foot pricing because genuine architectural construction requires itemized Bill of Quantities (BOQ) tailored to the specific soil, structural span, floor height, and material specifications.',
    guidance:
      'We prepare an itemized BOQ so the client pays only for actual materials and labor with zero hidden surprises. Clients can share their plot dimensions and requirements to receive a customized preliminary budget breakdown.',
  },

  websiteLinks: [
    { label: 'Residential Construction', path: '/residential' },
    { label: 'Commercial Projects', path: '/commercial' },
    { label: 'Turnkey Execution', path: '/turnkey-project-execution' },
    { label: 'Interior Design', path: '/interiors' },
    { label: 'Project Gallery', path: '/gallery' },
    { label: 'Blogs & Guides', path: '/blogs' },
    { label: 'Contact & Studio Map', path: '/contact' },
  ],
};
