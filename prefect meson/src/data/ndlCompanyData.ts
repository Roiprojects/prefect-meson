// SOURCE OF TRUTH: NDL Engineers and Contractors Company Profile

export interface TeamMember {
  role: string;
  badge: string;
  desc: string;
}

export interface ExecutionMode {
  id: string;
  title: string;
  desc: string;
}

export interface PlantMachinery {
  name: string;
  category: string;
}

export interface AssociatedArchitect {
  name: string;
  location: string;
  note?: string;
}

export interface StructuralConsultant {
  name: string;
  location: string;
}

export const ndlCompanyProfile = {
  companyName: 'NDL Engineers and Contractors',
  registeredName: 'NDL Engineers and Contractors',
  businessStructure: 'Proprietorship Civil Engineering Firm',
  proprietor: {
    name: 'Engineering Leadership with Sound Technical Knowledge',
    qualification: 'Civil Engineering Practice',
    experience: 'Over 14 years of experience in construction and interior projects',
    role: 'Active On-Site Structural Supervision & Quality Control'
  },
  registeredOffice: {
    addressLine1: 'No. 2041, 18th Cross',
    addressLine2: 'AECS Layout, A Block, Hosur Main Road',
    city: 'Bangalore',
    pincode: '560068',
    pinShort: 'Bangalore - 68',
    fullAddress: 'No. 2041, 18th Cross, AECS Layout, A Block, Hosur Main Road, Bangalore - 68'
  },
  establishedYear: 2016,
  companyBackground: 'The firm was established in 2016 and has maintained a consistent growth trajectory in financial turnover, structural engineering capabilities, and diverse project execution.',
  contact: {
    phone: '9886329424',
    displayPhone: '+91 98863 29424',
    email: 'contact@perfectmason.com'
  },
  executionTeam: {
    summary: 'The firm operates with a structured execution team dedicated to technical precision, quality control, and on-site project supervision.',
    members: [
      { role: 'Civil Engineering Staff', badge: 'TECHNICAL CORE', desc: 'Technical layout, structural alignment, and on-site quality control.' },
      { role: 'Site Supervisory Team', badge: 'SUPERVISION', desc: 'Daily site supervision, labor management, and execution monitoring.' },
      { role: 'Procurement Officer', badge: 'LOGISTICS', desc: 'Material procurement, supplier coordination, and quality verification.' },
      { role: 'Project Accounts Executive', badge: 'ADMINISTRATION', desc: 'Handling material accounts, vendor coordination, and project documentation.' }
    ]
  },
  // Complete 15 Services from Source
  services: [
    'Residential Projects',
    'Commercial Projects',
    'Schools',
    'Temples',
    'Hospitals',
    'Other related works',
    'Office Interiors',
    'Residential Interiors',
    'Restaurant Interiors',
    'Demolition Works',
    'Renovation Works',
    'Industrial Sheds',
    'Structural Works',
    'Electrical Works',
    'Plumbing Works'
  ],
  // Complete 6 Modes of Execution from Source
  modesOfExecution: [
    {
      id: 'item-rate',
      title: 'Item-rate agreements with tendered rates',
      desc: 'Transparent itemized rate agreements based on tendered rates and standard measurements.'
    },
    {
      id: 'turnkey',
      title: 'Turnkey projects',
      desc: 'Complete end-to-end execution covering civil construction, MEP systems, interiors, and finishing works.'
    },
    {
      id: 'supervision-only',
      title: 'Supervision-only execution where materials are supplied by clients',
      desc: 'Professional engineering supervision and labor management where materials are provided directly by clients.'
    },
    {
      id: 'per-sqft',
      title: 'Per-square-foot basis agreements with related terms and conditions',
      desc: 'Structured per-square-foot agreements tailored with mutually defined terms, specifications, and milestones.'
    },
    {
      id: 'design-consultation',
      title: 'Design and consultation services',
      desc: 'Technical consultation, drawing review, structural coordination, and pre-construction engineering advice.'
    },
    {
      id: 'locate-and-build',
      title: 'Locate and Build',
      desc: 'Comprehensive site identification assistance, architectural feasibility analysis, and turnkey construction from ground up.'
    }
  ],
  // Available Technical Resources (No invented quantities)
  plantsAndMachinery: [
    { name: 'Shuttering material', category: 'Formwork & Shuttering' },
    { name: 'Concrete mixers', category: 'Batching & Mixing' },
    { name: 'Vibrators', category: 'Concrete Compaction' },
    { name: 'Cube testing equipment', category: 'Quality Testing' },
    { name: 'Cutting and drilling tools', category: 'For rebar and masonary process' },
    { name: 'Digital marking equipments', category: 'Precise levels and alignments' },
    { name: 'Own vehicle for transportation', category: 'Logistics & Site Movement' }
  ],
  // Architects Associated With
  architectsAssociatedWith: [
    { name: 'Architecture Paradigm', location: 'Koramangala', note: 'Association on landmark residential estate villas' },
    { name: 'Keystone Architects', location: 'Indiranagar', note: 'Association on commercial workspaces and residences' },
    { name: 'Gaurav Roy Chaudary / GRC Architects', location: 'Bangalore', note: 'Association on contemporary residential projects' },
    { name: 'Design Mode Architects', location: 'Chamarajpet', note: 'Association on bespoke architectural residences' },
    { name: 'Cadence Architects', location: 'Basavanagudi', note: 'Association on unique sculptural and modern residences' }
  ],
  // Structural Consultants
  structuralConsultants: [
    { name: 'Arun Associates', location: 'Jayanagar' },
    { name: 'Naresh Associates', location: 'Malleshwaram' },
    { name: 'Xntrik Consultants', location: 'Shanthi Nagar' },
    { name: 'Integrated Structural Associates', location: 'Malleshwaram' },
    { name: 'Manjunath and Co. Structural Consultants', location: 'Bangalore' }
  ],
  // Source-Supported Strengths
  companyStrengths: [
    {
      title: 'Technically Qualified Engineering Leadership',
      desc: '14+ years of hands-on civil engineering expertise actively overseeing site execution.'
    },
    {
      title: 'Importance Given to Structural Aspects',
      desc: 'Rigorous attention to structural engineering, soil considerations, rebar detailing, and concrete compaction.'
    },
    {
      title: 'Experience Working Under Leading Architects',
      desc: 'Proven track record executing intricate drawings for renowned architectural practices.'
    },
    {
      title: 'High Quality Standards for Finishes and Structure',
      desc: 'Strict quality control from foundation shuttering to final surface polishing and joinery.'
    },
    {
      title: 'Experience with Challenging Architectural Features',
      desc: 'Expertise in constructing water bodies, waterfalls, floating slabs, exposed RCC walls, and split levels.'
    },
    {
      title: 'Awareness of Current Construction Techniques',
      desc: 'Up-to-date construction methodologies, modern formwork systems, and quality testing procedures.'
    },
    {
      title: 'Experience with Eco-Friendly Construction Materials',
      desc: 'Hands-on execution with wire-cut bricks, stabilized mud blocks (SMB), and architectural stone works.'
    }
  ],
  challengingFeatures: [
    'Water bodies',
    'Waterfalls',
    'Floating slabs',
    'Exposed RCC walls',
    'Split levels'
  ],
  ecoFriendlyMaterials: [
    'Wire-cut bricks',
    'Stabilized mud blocks',
    'Stone works'
  ],
  // Immediate and Long-Term Goals
  immediateAndLongTermGoals: {
    goals: [
      'Expand services across broader construction domains',
      'Scale up quantitatively while maintaining stringent engineering standards',
      'Expand technical capabilities to support larger project pipelines',
      'Ensure good quality and adherence to verified specifications on every project',
      'Ensure smooth project execution through coordinated planning and supervision',
      'Establish the company as a brand known for quality, commitment, credibility, and innovative approach'
    ],
    futureCapabilities: [
      'Schools',
      'Hospitals',
      'Larger commercial projects'
    ]
  }
};
