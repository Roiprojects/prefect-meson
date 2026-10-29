import { ndlProjects, NDLProject } from './ndlProjectsData';

export interface CommercialCategory {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  representativeImage: string;
  representativeClient: string;
  representativeArchitect: string;
  projectIds: string[];
  features?: string[];
}

export const commercialCategories: CommercialCategory[] = [
  {
    slug: 'item-rate-end-to-end',
    number: '01',
    title: 'Item Rate End-to-End Services',
    tagline: 'Turnkey Itemized BOQ Billing & Full Execution',
    description: 'Complete end-to-end commercial project execution under itemized BOQ estimations. From architectural foundations, civil framing, MEP infrastructure, statutory approvals, facade engineering, to final commissioning with complete actual consumption billing transparency.',
    representativeImage: '/projects/mr_venkatarama_raju/raju_01_commercial_facade_retail.jpg',
    representativeClient: 'Mr. Venkatarama Raju Commercial Building',
    representativeArchitect: 'Meenal Cavale / MJC Architects',
    projectIds: ['mr-venkatarama-raju'],
    features: [
      '100% Itemized BOQ Billing Transparency',
      'Senior Civil & Structural Engineering Oversight',
      'Integrated MEP, HVAC & Fire Protection Infrastructure',
      'Municipal Approvals & Statutory Occupancy Certification',
      'Zero-Friction Milestone Handover Protocol',
    ],
  },
  {
    slug: 'shell-only-package',
    number: '02',
    title: 'Shell Only Package',
    tagline: 'Structural RCC Framing, Core & External Envelope',
    description: 'Focused civil structural package delivering the complete RCC framework, basement retention, post-tensioned slabs, masonry blockwork, roof waterproofing, and external envelope. Ideal for commercial developers wanting internal fit-outs managed separately.',
    representativeImage: '/projects/mr_nataraj/nataraj_01_commercial_complex_street_view.png',
    representativeClient: 'Mr. Nataraj Commercial Cum Residence Complex',
    representativeArchitect: 'Incept Architects',
    projectIds: ['mr-nataraj'],
    features: [
      'Heavy RCC Structural Frame & Post-Tension Slabs',
      'Deep Foundation & Shoring/Basement Retention',
      'AAC/Solid Concrete Block Masonry Walls',
      'Primary Roof Waterproofing & Drainage Systems',
      'Structural Safety Certification & Core Handover',
    ],
  },
  {
    slug: 'individual-trade-services',
    number: '03',
    title: 'Individual Trade Services (Large Scale Projects)',
    tagline: 'Flooring, Structural Fabrication, Painting, Plumbing & Electrical',
    description: 'Specialized single-trade or sub-contract execution for large-scale commercial, institutional, and industrial developments. Engage Perfect Mason as your dedicated trade contractor for precision flooring, heavy structural steel fabrication, industrial painting, MEP plumbing, or HT/LT electrical works.',
    representativeImage: '/projects/mr_venkatarama_raju/raju_03_column_free_office_floor_plate.jpg',
    representativeClient: 'Mr. Venkatarama Raju Commercial Floor Plates',
    representativeArchitect: 'Meenal Cavale / MJC Architects',
    projectIds: ['mr-venkatarama-raju'],
    features: [
      'High-Performance Epoxy, VDF & Granolithic Commercial Flooring',
      'Heavy Structural Steel Fabrication & Trusses',
      'Industrial Anti-Corrosive Painting & Protective Coatings',
      'Large-Scale Commercial Plumbing & Fire Protection Networks',
      'HT/LT Electrical Substations, Conduit Networks & Cable Trays',
    ],
  },
  {
    slug: 'industrial-shed-construction',
    number: '04',
    title: 'Industrial Shed Construction',
    tagline: 'PEB Pre-Engineered Steel Buildings, Warehouses & Factories',
    description: 'Turnkey pre-engineered steel buildings (PEB), industrial warehouses, manufacturing plants, logistics hubs, and heavy-duty factory sheds engineered with high-clearance spans, crane gantry beams, insulated sandwich panels, and industrial VDF flooring.',
    representativeImage: '/projects/mr_nataraj/nataraj_02_retail_showroom_elevation.png',
    representativeClient: 'Mr. Nataraj Commercial Complex',
    representativeArchitect: 'Incept Architects',
    projectIds: ['mr-nataraj'],
    features: [
      'Pre-Engineered Steel Building (PEB) Structural Framing',
      'High-Clearance Clear-Span Warehouses & Factory Layouts',
      'Heavy-Duty VDF Industrial Flooring (5T - 20T Load Capacity)',
      'Insulated Polyurethane (PUF) Roof & Wall Cladding',
      'Gantry Crane Rail Integration & Forced Ventilation Systems',
    ],
  },
  {
    slug: 'corporate-office-spaces',
    number: '05',
    title: 'Corporate / Office Spaces',
    tagline: 'High-Performance Workspaces & Tech Parks',
    description: 'Modern commercial workspaces featuring open-plan workstations, glass architectural partitions, acoustic meeting rooms, and synchronized MEP infrastructure.',
    representativeImage: '/projects/24x7_solutions/24x7_solutions_01_reception_desk.png',
    representativeClient: '24x7 Solutions',
    representativeArchitect: 'Keystone Architects, Indiranagar',
    projectIds: ['24x7-solutions'],
  },
  {
    slug: 'restaurant-hospitality',
    number: '06',
    title: 'Restaurant & Hospitality',
    tagline: 'Bespoke Dining, Bars & Resto-Lounges',
    description: 'Comprehensive hospitality civil engineering, specialized acoustics, custom bar joinery, ambient lighting networks, and high-specification commercial MEP installations.',
    representativeImage: '/projects/take_5_bar/take_5_bar_01_granite_counter_wine_rack.png',
    representativeClient: 'TAKE 5 Bar and Restaurant',
    representativeArchitect: 'Kiran and Associates, Bombay',
    projectIds: ['take-5-bar'],
  },
  {
    slug: 'office-interiors-fit-out',
    number: '07',
    title: 'Office Interiors / Fit-Out',
    tagline: 'Turnkey Commercial Millwork & Interior Architecture',
    description: 'High-end commercial and corporate interior fit-outs featuring executive boardrooms, acoustic wall paneling, modular workstations, and complete interior infrastructure.',
    representativeImage: '/projects/farm_india_office/farm_india_01_open_workspace_ducted_ac.png',
    representativeClient: 'Farm India Office',
    representativeArchitect: 'Commercial Interior Practice',
    projectIds: ['farm-india-office'],
  },
  {
    slug: 'commercial-cum-residential',
    number: '08',
    title: 'Commercial-cum-Residential',
    tagline: 'Mixed-Use Commercial Complexes & Penthouses',
    description: 'Multi-level commercial-cum-residential structures with commercial retail / office floors below and private residential units above, executed with high-specification civil framing.',
    representativeImage: '/projects/mr_nataraj/nataraj_01_commercial_complex_street_view.png',
    representativeClient: 'Mr. Nataraj Complex',
    representativeArchitect: 'Incept Architects',
    projectIds: ['mr-nataraj'],
  },
  {
    slug: 'commercial-buildings',
    number: '09',
    title: 'Commercial Buildings',
    tagline: 'Standalone Commercial Facilities & Business Hubs',
    description: 'Column-free commercial complexes, retail showrooms, institutional floors, and multi-tenant business structures with durable civil engineering.',
    representativeImage: '/ndl_projects/slide_124_img_1.jpg',
    representativeClient: 'Mr. Venkatarama Raju Building',
    representativeArchitect: 'Meenal Cavale / MJC Architects',
    projectIds: ['mr-venkatarama-raju'],
  },
];

export function getCommercialCategoryBySlug(slug: string): CommercialCategory | undefined {
  return commercialCategories.find((c) => c.slug === slug);
}

export function getProjectsByCommercialCategory(categorySlug: string): NDLProject[] {
  const category = getCommercialCategoryBySlug(categorySlug);
  if (!category) return [];
  return ndlProjects.filter((p) => category.projectIds.includes(p.id));
}
