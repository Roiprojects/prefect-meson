import React, { createContext, useContext, useState, useEffect } from 'react';
import { galleryProjects as defaultGalleryProjects, GalleryProject } from '../data/galleryData';
import { blogsData as defaultBlogs, BlogPost } from '../data/blogsData';
import { EnquirySubmission } from '../data/contactData';
import { reviewsConfig, ClientReviewItem } from '../data/reviewsData';
import { apiService } from '../services/api';

export interface AdminActivityLog {
  id: string;
  type: 'gallery' | 'blog' | 'enquiry' | 'commercial' | 'residential' | 'turnkey' | 'interiors' | 'review' | 'page' | 'settings';
  title: string;
  action: string;
  timestamp: string;
}

export interface CommercialItem {
  id: string;
  slug: string;
  number?: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  capabilities: string[];
  scope: string[];
  client?: string;
  architect?: string;
  builtArea?: string;
  timeline?: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  featured?: boolean;
}

export interface ResidentialItem {
  id: string;
  slug: string;
  number?: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  features: string[];
  specs: string[];
  client?: string;
  architect?: string;
  builtArea?: string;
  pricePerSqFt?: string;
  timeline?: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  featured?: boolean;
}

export interface TurnkeyItem {
  id: string;
  slug: string;
  number?: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  stages: string[];
  deliverables: string[];
  client?: string;
  architect?: string;
  builtArea?: string;
  timeline?: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  featured?: boolean;
}

export interface InteriorItem {
  id: string;
  slug: string;
  number?: string;
  title: string;
  category: string;
  spaceType: 'Residential' | 'Commercial';
  tagline: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  materials: string[];
  features: string[];
  client?: string;
  architect?: string;
  builtArea?: string;
  timeline?: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  featured?: boolean;
}

export interface WebsiteSettings {
  // 1. General Website Information
  companyName: string;
  websiteName?: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  email: string;
  phone: string;
  address: string;
  workingHours: string;
  whatsappNumber: string;
  aboutBrief: string;

  // 2. SEO & Social Media Settings
  seoTitle: string;
  seoDescription: string;
  seoIndexingPreference: string;
  socialShareImage: string;
  socialInstagram: string;
  socialFacebook: string;
  socialLinkedin: string;
  socialTwitter: string;
  socialYoutube: string;

  // 3. Branding & Appearance
  primaryColor: string;
  secondaryColor: string;
  fontHeading: string;
  fontBody: string;
  defaultBannerImage: string;
  footerCopyright: string;
  footerDescription: string;
  footerBadge: string;
  footerLegalNote: string;

  // Preserved Existing Hero Banner Copy & Company Metrics
  heroHeadline: string;
  heroSubheadline: string;
  heroBadge: string;
  experienceYears: string;
  projectsCompleted: string;
  sqftDelivered: string;
  onTimeDeliveryRate: string;
  clientSatisfactionRate: string;
}

interface DataContextType {
  // Gallery
  projects: GalleryProject[];
  addProject: (project: Omit<GalleryProject, 'id' | 'slug'>) => void;
  updateProject: (id: string, updated: Partial<GalleryProject>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;

  // Commercial
  commercialItems: CommercialItem[];
  addCommercialItem: (item: Omit<CommercialItem, 'id' | 'slug'>) => void;
  updateCommercialItem: (id: string, updated: Partial<CommercialItem>) => void;
  deleteCommercialItem: (id: string) => void;

  // Residential
  residentialItems: ResidentialItem[];
  addResidentialItem: (item: Omit<ResidentialItem, 'id' | 'slug'>) => void;
  updateResidentialItem: (id: string, updated: Partial<ResidentialItem>) => void;
  deleteResidentialItem: (id: string) => void;

  // Turnkey
  turnkeyItems: TurnkeyItem[];
  addTurnkeyItem: (item: Omit<TurnkeyItem, 'id' | 'slug'>) => void;
  updateTurnkeyItem: (id: string, updated: Partial<TurnkeyItem>) => void;
  deleteTurnkeyItem: (id: string) => void;

  // Interiors
  interiorItems: InteriorItem[];
  addInteriorItem: (item: Omit<InteriorItem, 'id' | 'slug'>) => void;
  updateInteriorItem: (id: string, updated: Partial<InteriorItem>) => void;
  deleteInteriorItem: (id: string) => void;

  // Blogs
  blogs: BlogPost[];
  addBlog: (blog: Omit<BlogPost, 'id' | 'slug'>) => void;
  updateBlog: (id: string, updated: Partial<BlogPost>) => void;
  deleteBlog: (id: string) => void;

  // Enquiries
  enquiries: EnquirySubmission[];
  addEnquiry: (enquiry: Omit<EnquirySubmission, 'id' | 'createdAt' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: EnquirySubmission['status']) => void;
  deleteEnquiry: (id: string) => void;

  // Testimonials / Client Reviews
  reviews: ClientReviewItem[];
  addReview: (review: Omit<ClientReviewItem, 'id'>) => void;
  updateReview: (id: string, updated: Partial<ClientReviewItem>) => void;
  deleteReview: (id: string) => void;

  // Visual Website Page Manager
  pageContents: Record<string, any>;
  updatePageContent: (pageId: string, pageTitle: string, data: any, status?: string) => void;
  getPageContent: (pageId: string) => any;
  savePageDraft: (pageId: string, pageTitle: string, draftData: any) => Promise<{ success: boolean; error?: string; draftUpdatedAt?: string }>;
  publishPageContent: (pageId: string, pageTitle: string, data: any) => Promise<{ success: boolean; error?: string; updatedAt?: string }>;
  discardPageDraft: (pageId: string) => Promise<{ success: boolean; error?: string }>;
  getPageDraft: (pageId: string) => any;
  getPublishedPageContent: (pageId: string) => any;

  // Global Website Settings
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => Promise<{ success: boolean; error?: string }> | void;

  // Master Data Reset
  resetMasterCatalog: () => void;

  // Admin Auth
  isAdminAuthenticated: boolean;
  adminLogin: (emailOrPassword: string, password?: string) => boolean;
  adminLogout: () => void;

  // Activity Logs
  activityLogs: AdminActivityLog[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROJECTS: 'pm_gallery_projects_v4',
  COMMERCIAL: 'pm_commercial_data_v4',
  RESIDENTIAL: 'pm_residential_data_v4',
  TURNKEY: 'pm_turnkey_data_v4',
  INTERIORS: 'pm_interiors_data_v4',
  BLOGS: 'pm_blogs_data_v4',
  ENQUIRIES: 'pm_enquiries_data_v4',
  SETTINGS: 'pm_site_settings_v4',
  REVIEWS: 'pm_reviews_data_v4',
  PAGES: 'pm_pages_content_v4',
  DRAFTS: 'pm_page_drafts_v1',
  AUTH: 'pm_admin_auth_v1',
  LOGS: 'pm_activity_logs_v4',
};

const defaultWebsiteSettings: WebsiteSettings = {
  companyName: 'PERFECT MASON',
  websiteName: 'PERFECT MASON',
  tagline: 'ARCHITECTURAL & TURNKEY CONSTRUCTION',
  phone: '+91 98863 29424',
  email: 'contact@perfectmason.com',
  address: 'AECS Layout, Hosur Main Road, Bengaluru, Karnataka 560068',
  whatsappNumber: '+919886329424',
  workingHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
  aboutBrief: 'Perfect Mason is one of the finest architectural and turnkey construction firms in South Bangalore, delivering high-precision residential estates, commercial spaces, industrial buildings & detailed interiors across Bangalore.',
  logoUrl: '/logo.png',
  faviconUrl: '/favicon.svg',
  seoTitle: 'PERFECT MASON — Luxury Architectural & Turnkey Construction',
  seoDescription: 'Perfect Mason provides premier architectural design, civil engineering, turnkey luxury villas, and commercial construction across South Bangalore.',
  seoIndexingPreference: 'index, follow',
  socialShareImage: '/assets/cinematic_grand_estate.jpg',
  socialInstagram: 'https://instagram.com',
  socialFacebook: 'https://facebook.com',
  socialLinkedin: 'https://linkedin.com',
  socialTwitter: 'https://x.com',
  socialYoutube: 'https://youtube.com',
  primaryColor: '#1d4ed8',
  secondaryColor: '#d97706',
  fontHeading: 'Plus Jakarta Sans',
  fontBody: 'Inter',
  defaultBannerImage: '/assets/cinematic_grand_estate.jpg',
  footerCopyright: '© 2026 Perfect Mason. All rights reserved.',
  footerDescription: 'Civil engineering, turnkey construction, commercial complexes, luxury residences & interior fit-outs led by certified civil engineering directors.',
  footerBadge: 'ISO 9001:2015 CERTIFIED • HIGH-PRECISION ENGINEERING',
  footerLegalNote: 'Built with engineering precision & integrity.',
  heroHeadline: 'Turnkey Architectural & Civil Construction Excellence',
  heroSubheadline: 'Engineered precision, itemized BOQ billing, and flawless execution for luxury villas, commercial towers, and turnkey interiors.',
  heroBadge: 'ISO 9001:2015 CERTIFIED • HIGH-PRECISION ENGINEERING',
  experienceYears: '18+',
  projectsCompleted: '150+',
  sqftDelivered: '1.5M+',
  onTimeDeliveryRate: '99.4%',
  clientSatisfactionRate: '100%',
};

export const defaultPageContents: Record<string, any> = {
  home: {
    hero: {
      headline: 'Turnkey Architectural & Civil Construction Excellence',
      subheadline: 'Engineered precision, itemized BOQ billing, and flawless execution for luxury villas, commercial towers, and turnkey interiors.',
      badge: 'ISO 9001:2015 CERTIFIED • HIGH-PRECISION ENGINEERING',
      primaryCta: 'REQUEST A QUOTE',
      secondaryCta: 'EXPLORE PROJECTS',
    },
    intro: {
      eyebrow: 'WHO WE ARE',
      heading: 'BUILDING SPACES. CREATING LEGACIES.',
      subtext: 'From residential homes to commercial spaces, turnkey projects and interiors, Perfect Mason brings disciplined planning, quality construction and thoughtful execution to every project.',
      experienceYears: '18+',
      projectsCompleted: '150+',
      sqftDelivered: '1.5M+',
      satisfactionRate: '100%',
    },
    manifesto: {
      heading: 'PRECISION IN EVERY DECISION. QUALITY IN EVERY DETAIL.',
      statement: 'Every project begins with understanding, careful planning and a clear path from concept to execution.',
    },
    cta: {
      heading: "Let's Build Something Special and Unique for You",
      subtext: 'Schedule an on-site consultation with our senior civil engineering directors and receive an itemized BOQ estimate.',
      buttonText: 'Request Consultation',
      phone: '+91 98863 29424',
    },
    seo: {
      metaTitle: 'Perfect Mason — Turnkey Construction & Civil Engineering Studio Bengaluru',
      metaDescription: 'Leading turnkey architectural construction studio in Bengaluru. Luxury residential villas, commercial complexes, and bespoke interiors with itemized BOQ billing.',
    }
  },
  about: {
    hero: {
      label: 'ABOUT US',
      heading: 'Built with precision.\nDesigned for life.',
      supportingText: 'Perfect Mason brings together planning, construction, turnkey execution and interior design under one trusted team.',
    },
    intro: {
      label: 'WHO WE ARE',
      heading: 'Building more than structures.\nCreating places people value.',
      supportingText: 'From residential homes to commercial spaces, turnkey projects and interiors, Perfect Mason brings disciplined planning, quality construction and thoughtful execution to every project.',
      expertise: ['RESIDENTIAL', 'COMMERCIAL', 'TURNKEY', 'INTERIORS'],
    },
    visionMission: {
      visionTitle: 'Our Vision',
      visionStatement: 'To be the most trusted and technically revered construction and turnkey engineering studio, shaping enduring landmarks with craft and sustainability.',
      missionTitle: 'Our Mission',
      missionStatement: 'To deliver transparent, integrated, and hassle-free design-to-build solutions by uniting architectural clarity, structural rigor, and fine interior craftsmanship.',
    },
    statement: {
      heading: 'PRECISION IN EVERY DECISION.\nQUALITY IN EVERY DETAIL.',
      supportingText: 'Every project begins with understanding, careful planning and a clear path from concept to execution.',
    },
    cta: {
      heading: "Let's Build Something Special and Unique for You",
      supportingText: 'Schedule an on-site consultation with our senior civil engineering directors and receive an itemized BOQ estimate.',
      buttonText: 'Schedule Consultation',
    },
    seo: {
      metaTitle: 'About Us — Perfect Mason Architecture & Civil Engineering',
      metaDescription: 'Learn about Perfect Mason practice foundations, ISO 9001 certified engineering methodology, and leadership in Bangalore turnkey construction.',
    }
  },
  contact: {
    hero: {
      sectionLabel: 'CONTACT & CONSULTATION',
      heading: 'Start Your Construction Journey',
      intro: 'Schedule an on-site consultation with our senior civil engineering directors for itemized BOQ estimations and feasibility audits.',
    },
    channels: {
      phone: '+91 98863 29424',
      whatsapp: '+919886329424',
      email: 'contact@perfectmason.com',
      address: 'AECS Layout, Hosur Main Road, Bengaluru, Karnataka 560068',
      workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    },
    seo: {
      metaTitle: 'Contact Perfect Mason — Bangalore Civil & Architectural Office',
      metaDescription: 'Reach out to Perfect Mason for luxury villas, commercial towers, turnkey builds and architectural interior estimations in Bangalore.',
    }
  },
  'header-footer': {
    header: {
      brandName: 'PERFECT MASON',
      tagline: 'ARCHITECTURAL & TURNKEY CONSTRUCTION',
      ctaText: 'REQUEST A QUOTE',
      phone: '+91 98863 29424',
    },
    footer: {
      brandName: 'PERFECT MASON',
      tagline: 'Civil engineering, turnkey construction, commercial complexes, luxury residences & interior fit-outs led by certified civil engineering directors.',
      copyright: '© 2026 Perfect Mason (NDL Engineers & Contractors). All Rights Reserved.',
      address: 'AECS Layout, Hosur Main Road, Bengaluru, Karnataka 560068',
      phone: '+91 98863 29424',
      email: 'contact@perfectmason.com',
    }
  }
};

const defaultCommercialItems: CommercialItem[] = [
  {
    id: 'comm-manappuram',
    slug: 'mr-venkatarama-raju-commercial',
    number: '01',
    title: 'Mr. Venkatarama Raju Commercial Building',
    category: 'Item Rate End to End Services',
    tagline: 'G+4 Commercial Complex with Retail Showroom & Open Floor Plates in JP Nagar 9th Phase',
    description: 'Premier G+4 multi-story commercial building in JP Nagar 9th Phase designed by Meenal Cavale (MJC Architects) engineered for retail and corporate occupancy. Features ground-floor flagship retail showroom (Manappuram Jewellers & Riti Jewelry), wire-cut exposed brick facade with climate-responsive architectural louvers, continuous vertical glazing, and high-efficiency open-span office plates.',
    heroImage: '/projects/mr_venkatarama_raju/raju_01_commercial_facade_retail.jpg',
    galleryImages: [
      '/projects/mr_venkatarama_raju/raju_01_commercial_facade_retail.jpg',
      '/projects/mr_venkatarama_raju/raju_02_corner_street_elevation.jpg',
      '/projects/mr_venkatarama_raju/raju_03_column_free_office_floor_plate.jpg',
      '/projects/mr_venkatarama_raju/raju_04_staircase_atrium_brick_masonry.jpg',
    ],
    capabilities: [
      'G+4 Heavy RCC Framed Superstructure Construction',
      'Exposed Architectural Brick Facade with Integrated Sun Louvers',
      'Structural Glass Curtain Walls & Full-Height Vertical Glazing',
      'Flagship Ground-Floor Showroom Fit-Out with High-Load Capacity',
      'Column-Optimized Open Floor Plates with Marble Flooring & Industrial MEP',
      'Meenal Cavale (MJC Architects) signature architectural design',
    ],
    scope: [
      'Deep foundation earthworks, structural column-beam casting, and post-tensioned slabs.',
      'Precision wire-cut architectural brick masonry and external protective weather sealants.',
      'Full anodized aluminum framing, structural curtain glazing, and operable ventilation windows.',
      'Complete commercial electrical transformer setup, high-capacity lifts, and fire hydrant network.',
    ],
    client: 'Mr. Venkatarama Raju',
    architect: 'Meenal Cavale (MJC Architects)',
    builtArea: '32,000 Sq.Ft (G+4 Floors)',
    timeline: '12 Months',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'comm-1',
    slug: 'item-rate-end-to-end',
    number: '02',
    title: 'Item Rate End-to-End Services',
    category: 'Item Rate End to End Services',
    tagline: 'Turnkey Itemized BOQ Billing & Full Execution',
    description: 'Complete end-to-end commercial project execution under itemized BOQ estimations. From architectural foundations, civil framing, MEP infrastructure, statutory approvals, facade engineering, to final commissioning with complete actual consumption billing transparency.',
    heroImage: '/assets/comm_complex_hero.jpg',
    galleryImages: [
      '/assets/comm_complex_hero.jpg',
      '/ndl_projects/slide_086_img_1.png',
      '/ndl_projects/slide_097_img_1.jpg',
    ],
    capabilities: [
      '100% Itemized BOQ Billing Transparency',
      'Senior Civil & Structural Engineering Oversight',
      'Integrated MEP, HVAC & Fire Protection Infrastructure',
      'Municipal Approvals & Statutory Occupancy Certification',
      'Zero-Friction Milestone Handover Protocol',
    ],
    scope: [
      'Comprehensive site survey, soil testing and earthwork excavation.',
      'RCC superstructure with high-grade M30/M40 concrete mix.',
      'Unitized glass curtain wall and structural glazing facade installation.',
      'High-capacity central chiller HVAC and electrical substation works.',
    ],
    client: 'Mr. Venkatarama Raju Building & Commercial Complex',
    architect: 'Meenal Cavale / MJC Architects',
    builtArea: '45,000 Sq.Ft',
    timeline: '14 Months',
    status: 'Active',
    featured: true,
  },
  {
    id: 'comm-2',
    slug: 'shell-only-package',
    number: '02',
    title: 'Shell Only Package',
    category: 'Shell Only Package',
    tagline: 'Structural RCC Framing, Core & External Envelope',
    description: 'Focused civil structural package delivering the complete RCC framework, basement retention, post-tensioned slabs, masonry blockwork, roof waterproofing, and external envelope. Ideal for commercial developers wanting internal fit-outs managed separately.',
    heroImage: '/assets/service_commercial_corp.jpg',
    galleryImages: [
      '/assets/service_commercial_corp.jpg',
      '/ndl_projects/slide_097_img_1.jpg',
      '/ndl_projects/slide_099_img_1.jpg',
      '/ndl_projects/slide_100_img_1.jpg',
    ],
    capabilities: [
      'Heavy RCC Structural Frame & Post-Tension Slabs',
      'Deep Foundation & Shoring/Basement Retention',
      'AAC/Solid Concrete Block Masonry Walls',
      'Primary Roof Waterproofing & Drainage Systems',
      'Structural Safety Certification & Core Handover',
    ],
    scope: [
      'Deep piling and diaphragm basement retention walls.',
      'Post-tensioned beam-slab system with 12m clear spans.',
      'External weather-resistant plastering and waterproofing.',
    ],
    client: 'Mr. Nataraj Commercial Complex',
    architect: 'Incept Architects',
    builtArea: '28,000 Sq.Ft',
    timeline: '10 Months',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'comm-3',
    slug: 'individual-trade-services',
    number: '03',
    title: 'Individual Trade Services (Large Scale)',
    category: 'Any One Individual Service',
    tagline: 'Flooring, Structural Fabrication, Painting, Plumbing & Electrical',
    description: 'Specialized single-trade or sub-contract execution for large-scale commercial, institutional, and industrial developments. Engage Perfect Mason as your dedicated trade contractor for precision flooring, heavy structural steel fabrication, industrial painting, MEP plumbing, or HT/LT electrical works.',
    heroImage: '/assets/about_active_construction.jpg',
    galleryImages: [
      '/assets/about_active_construction.jpg',
      '/ndl_projects/slide_064_img_1.jpg',
      '/ndl_projects/slide_065_img_1.jpg',
      '/ndl_projects/slide_066_img_1.jpg',
    ],
    capabilities: [
      'High-Performance Epoxy, VDF & Granolithic Commercial Flooring',
      'Heavy Structural Steel Fabrication & Trusses',
      'Industrial Anti-Corrosive Painting & Protective Coatings',
      'Large-Scale Commercial Plumbing & Fire Protection Networks',
      'HT/LT Electrical Substations, Conduit Networks & Cable Trays',
    ],
    scope: [
      'Laser-screed industrial flooring with quartz topping.',
      'Heavy PEB steel truss design and erection.',
      'Complete statutory fire hydrant network and sprinkler grid.',
    ],
    client: 'Farm India Corporate Facility',
    architect: 'Commercial Interior Practice',
    builtArea: '65,000 Sq.Ft',
    timeline: '8 Months',
    status: 'Active',
    featured: false,
  },
  {
    id: 'comm-4',
    slug: 'industrial-shed-construction',
    number: '04',
    title: 'Industrial Shed Construction',
    category: 'Industrial Shed Construction',
    tagline: 'PEB Pre-Engineered Steel Buildings, Warehouses & Factories',
    description: 'Turnkey pre-engineered steel buildings (PEB), industrial warehouses, manufacturing plants, logistics hubs, and heavy-duty factory sheds engineered with high-clearance spans, crane gantry beams, insulated sandwich panels, and industrial VDF flooring.',
    heroImage: '/assets/comm_industrial_hero.jpg',
    galleryImages: [
      '/assets/comm_industrial_hero.jpg',
      '/assets/comm_complex_hero.jpg',
      '/assets/comm_institutional_hero.jpg',
    ],
    capabilities: [
      'Pre-Engineered Steel Building (PEB) Structural Framing',
      'High-Clearance Clear-Span Warehouses & Factory Layouts',
      'Heavy-Duty VDF Industrial Flooring (5T - 20T Load Capacity)',
      'Insulated Polyurethane (PUF) Roof & Wall Cladding',
      'Gantry Crane Rail Integration & Forced Ventilation Systems',
    ],
    scope: [
      '30m column-free clear span PEB steel portal frames.',
      'Heavy equipment machine foundation pits with isolation pads.',
      'Turbo-ventilator arrays and natural daylight polycarbonate roofing sheets.',
    ],
    client: 'Industrial Logistics & Warehouse Park',
    architect: 'Industrial Structural Engineering Practice',
    builtArea: '120,000 Sq.Ft',
    timeline: '12 Months',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'comm-5',
    slug: 'corporate-office-spaces',
    number: '05',
    title: 'High-Tech Corporate Office Parks',
    category: 'Corporate Office Spaces',
    tagline: 'High-Performance Workspaces & Tech Parks',
    description: 'Modern corporate office space developments featuring open-plan workstations, glass cabin partitions, acoustic ceilings, and integrated electrical/data routing.',
    heroImage: '/assets/comm_office_hero.jpg',
    galleryImages: [
      '/assets/comm_office_hero.jpg',
      '/assets/comm_complex_hero.jpg',
      '/projects/farm_india_office/farm_india_01_open_workspace_ducted_ac.png',
    ],
    capabilities: [
      'Executive Cabins & Modular Workstations',
      'Glass Architectural Partitions & Acoustic Ceilings',
      'MEP Coordination & Smart BMS Integration',
      'Tier-3 Server Room Civil & Precision Cooling',
    ],
    scope: [
      'Modular raised flooring system for cable management.',
      'High-STC rated glass partitions and acoustic ceilings.',
      'Tier-3 server room civil and cooling integration.',
    ],
    client: 'Corporate Enterprise Development',
    architect: 'Corporate Architecture Practice',
    builtArea: '50,000 Sq.Ft',
    timeline: '11 Months',
    status: 'Active',
    featured: true,
  },
  {
    id: 'comm-6',
    slug: 'restaurant-hospitality',
    number: '06',
    title: 'TAKE 5 Bar and Restaurant',
    category: 'Restaurant & Hospitality',
    tagline: 'Iconic Hospitality Interior & Civil Execution in Indiranagar',
    description: 'Iconic hospitality interior and civil execution in Defence Colony, Indiranagar featuring custom wood joinery, acoustic bar counters, ambient lighting networks, and specialized commercial MEP layout designed by Kiran & Associates Bombay.',
    heroImage: '/projects/take_5_bar/take_5_bar_01_granite_counter_wine_rack.png',
    galleryImages: [
      '/projects/take_5_bar/take_5_bar_01_granite_counter_wine_rack.png',
      '/projects/take_5_bar/take_5_bar_02_service_counter_dining_partition.jpg',
    ],
    capabilities: [
      'Commercial Bar Joinery & Millwork',
      'Acoustic Hospitality Ceiling & Wall Treatment',
      'Specialized Commercial Kitchen Exhaust & MEP',
      'Kiran and Associate, Bombay Architectural Design',
    ],
    scope: [
      'Stainless steel commercial kitchen trench drainage.',
      'Bespoke marble and solid timber bar counter construction.',
      'Dimmable DALI architectural lighting scene controllers.',
    ],
    client: 'TAKE 5 Bar and Restaurant',
    architect: 'Kiran and Associate, Bombay',
    builtArea: '8,500 Sq.Ft',
    timeline: '4 Months',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'comm-7',
    slug: 'commercial-complexes',
    number: '07',
    title: 'Mr. Nataraj Commercial Cum Residence Complex',
    category: 'Commercial Complexes & Mixed Use',
    tagline: 'G+4 Commercial Complex on 27th Main HSR Layout',
    description: 'Prominent G+4 commercial cum residential complex on 27th Main HSR Layout featuring ground floor retail showroom frontage (AJFAN Dates & Nuts), basement parking ramp, upper corporate office floors, and luxury residential penthouse units designed by Incept Architects.',
    heroImage: '/projects/mr_nataraj/nataraj_01_commercial_complex_street_view.png',
    galleryImages: [
      '/projects/mr_nataraj/nataraj_01_commercial_complex_street_view.png',
      '/projects/mr_nataraj/nataraj_02_retail_showroom_elevation.png',
      '/projects/mr_nataraj/nataraj_03_residential_penthouse_balcony_elevation.png',
      '/projects/mr_nataraj/nataraj_04_hsr_layout_27th_main_avenue_perspective.png',
    ],
    capabilities: [
      'Civil, Electrical and Plumbing Scope Execution',
      'Commercial Retail Ground + Office Floors + Penthouse',
      'Incept Architects Architectural Design',
      'Prime HSR Layout 27th Main Commercial Frontage',
    ],
    scope: [
      'G+4 Heavy RCC superstructure with post-tensioned slabs.',
      'Integrated retail showroom frontage with toughened structural glass.',
      'Upper-level executive office and residential penthouse civil works.',
    ],
    client: 'Mr. Nataraj',
    architect: 'Incept Architects',
    builtArea: '28,000 Sq.Ft',
    timeline: '10 Months',
    status: 'Completed',
    featured: true,
  },
];

const defaultResidentialItems: ResidentialItem[] = [
  {
    id: 'res-1',
    slug: 'luxury-villas-item-rate',
    number: '01',
    title: 'Luxury Villas on Item Rate Basis',
    category: 'Luxury Villas on Item Rate Basis',
    tagline: 'Item-Rate Contract Agreements & Custom Estate Execution',
    description: 'Stately luxury villa construction executed on a transparent item-rate contractual basis for Dr. Anil Kush at # C2, Estate Club, Bangalore with exposed RCC cantilevered slabs, floating teak staircase, stepped water features, modular kitchen, and bespoke estate finishes under Architecture Paradigm, 6th block, Koramangala.',
    heroImage: '/projects/dr_anil_kush/dr_anil_kush_01_facade_elevation.jpg',
    galleryImages: [
      '/projects/dr_anil_kush/dr_anil_kush_01_facade_elevation.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_02_cantilever_portico.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_03_concrete_entrance_portal.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_04_courtyard_louvers.png',
      '/projects/dr_anil_kush/dr_anil_kush_05_reflecting_pool.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_06_reflecting_pool_planter.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_07_rear_courtyard_facade.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_08_board_marked_rcc_hall.png',
      '/projects/dr_anil_kush/dr_anil_kush_09_living_lounge_red_wall.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_10_floating_staircase_atrium.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_11_staircase_detail.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_12_louver_veranda.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_13_mezzanine_panelling.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_14_mezzanine_balustrade.png',
      '/projects/dr_anil_kush/dr_anil_kush_15_marble_corridor_swing.png',
      '/projects/dr_anil_kush/dr_anil_kush_16_bedroom_wooden_swing.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_17_master_bedroom_wide.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_18_master_bedroom.png',
      '/projects/dr_anil_kush/dr_anil_kush_19_kitchen_installation.png',
      '/projects/dr_anil_kush/dr_anil_kush_20_modular_kitchen_finished.png',
      '/projects/dr_anil_kush/dr_anil_kush_21_bathroom_vanity.png',
      '/projects/dr_anil_kush/dr_anil_kush_22_panoramic_bathroom.jpg'
    ],
    features: [
      '100% Itemized BOQ Contract Billing Transparency',
      'Exposed Concrete Cantilevers & Sculptural Facades',
      'Natural Stone Cladding & Teak Woodwork',
      'Smart Home Automation & DGU Glazing',
      '10-Year Structural Civil Warranty',
    ],
    specs: [
      'M30/M35 Structural RCC framed earthquake-resistant structure.',
      'Italian marble and bespoke solid timber flooring.',
      'Double-height living space with motorized acoustic curtains.',
    ],
    client: 'Dr. Anil Kush',
    architect: 'Architecture Paradigm, 6th block, Koramangala',
    builtArea: '12,500 Sq.Ft',
    
    timeline: '14 Months',
    status: 'Active',
    featured: true,
  },
  {
    id: 'res-2',
    slug: 'affordable-homes-packages',
    number: '02',
    title: 'Affordable Homes (Packages as per Specs)',
    category: 'Affordable Homes with Different Packages as per Specs',
    tagline: 'Customized Specification Packages & Family Residences',
    description: 'High-quality affordable family home construction with structured per-sq-ft specification packages: offering robust civil foundations, spatial efficiency, and transparent itemized billing.',
    heroImage: '/projects/mr_amith/amith_01_geometric_elevation_portrait.jpg',
    galleryImages: [
      '/projects/mr_amith/amith_01_geometric_elevation_portrait.jpg',
      '/projects/mr_amith/amith_02_geometric_elevation_street_view.jpg',
    ],
    features: [
      'Structured Fixed Per-Sq-Ft Transparent Pricing Tiers',
      'Zero Hidden Costs with Defined Material Schedule',
      'Fe550D TMT Steel & UltraTech Grade-A Cement',
      'Anti-Termite Subterranean Soil Barrier Guarantee',
      'Dedicated NDL Project Engineer Quality Checks',
    ],
    specs: [
      'Solid concrete block masonry with 1:6 cement mortar.',
      'Vitrified 800x800mm nano-polished double-charge tiles.',
      'Teakwood main door frame with flush interior doors.',
    ],
    client: 'Mr. Amith Residence',
    architect: 'NDL In-House Engineering Coordination',
    builtArea: '4,200 Sq.Ft',
    
    timeline: '9 Months',
    status: 'Active',
    featured: true,
  },
  {
    id: 'res-3',
    slug: 'eco-friendly-homes',
    number: '03',
    title: 'Eco-Friendly Homes (Design & Execution)',
    category: 'Eco Friendly Homes with Consultation Design and Execution',
    tagline: 'Wire-Cut Brick Masonry, SMBs & Sustainable Architecture',
    description: 'Distinctive contemporary private residence at # 17, Mantri Lakeview Talagatpura, Kanakpura Main Road featuring exposed wire-cut brick masonry, geometric cantilevers, split-level layout, cantilevered stone floating staircase, signature bottle-glass light walls, hardwood living areas with bi-fold deck doors, modular kitchen, and complete civil, plumbing, and electrical works designed by Gaurav Roy Chaudary, 7th Sector, HSR Layout.',
    heroImage: '/projects/mr_sarabjith_ghose/sarabjith_ghose_01_corner_elevation_wide.jpg',
    galleryImages: [
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_01_corner_elevation_wide.jpg',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_02_front_facade_elevation.jpg',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_03_cantilever_corner_pavilion.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_04_side_garden_elevation.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_05_entrance_compound_facade.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_06_retaining_wall_lawn.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_07_floating_brick_staircase.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_08_bottle_glass_stairwell.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_09_split_level_atrium.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_10_study_nook_blue_accent.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_11_signature_bottle_glass_wall.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_12_open_riser_stair_flight.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_13_double_height_skylit_atrium.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_14_foyer_bottle_glass_screen.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_15_courtyard_glazing_bridge.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_16_designer_crimson_bathroom.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_17_cantilever_wooden_stair_detail.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_18_hardwood_living_deck.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_19_split_level_foyer_terracotta.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_20_mezzanine_gallery_hallway.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_21_living_frosted_partition.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_22_sunken_courtyard_water_trough.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_23_ground_floor_garden_window.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_24_foyer_kitchen_threshold.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_25_modular_oak_kitchen.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_26_cantilever_stair_floating_cabinets.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_27_bottle_glass_landing_study_cubes.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_28_courtyard_frosted_sliding_door.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_29_sunlit_living_hall_yellow_accent.png'
    ],
    features: [
      'Exposed Wire-Cut Brick Masonry with Weather Pointing',
      'Passive Solar & Cross-Ventilation Architectural Zoning',
      'Perimeter Rainwater Harvesting & Groundwater Recharge',
      'Low-VOC Non-Toxic Organic Paints & Natural Terracotta',
      'End-to-End Architectural Consultation & Turnkey Build',
    ],
    specs: [
      'Exposed terracotta wire-cut brick facing with rat-trap bond.',
      'Filler-slab roof casting reducing concrete thermal mass by 30%.',
      'Integrated solar PV rooftop conduit grid.',
    ],
    client: 'Mr. Sarabjith Ghose',
    architect: 'Gaurav Roy Chaudary, 7th Sector, HSR Layout',
    builtArea: '5,800 Sq.Ft',
    
    timeline: '11 Months',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'res-4',
    slug: 'multi-storey-homes',
    number: '04',
    title: 'Mr. Praveen Kumar Bespoke Residence',
    category: 'Multi-Storey Urban Residences',
    tagline: 'Tiered Terracotta Gables & Carved Teakwood Architecture',
    description: 'Exposed brick architectural residence in Tambuchetti Palya, KR Puram featuring tiered gabled terracotta roofs, handcrafted carved teakwood double entrance door, multi-tier exposed timber rafter truss ceiling atrium, and landscaped driveway executed under Keystone Architects, Indiranagar.',
    heroImage: '/projects/mr_praveen_kumar/praveen_kumar_01_front_gabled_elevation.png',
    galleryImages: [
      '/projects/mr_praveen_kumar/praveen_kumar_01_front_gabled_elevation.png',
      '/projects/mr_praveen_kumar/praveen_kumar_02_timber_rafter_truss_atrium.png',
      '/projects/mr_praveen_kumar/praveen_kumar_03_tiered_roof_side_elevation.png',
      '/projects/mr_praveen_kumar/praveen_kumar_04_driveway_wide_facade_view.jpg',
      '/projects/mr_praveen_kumar/praveen_kumar_05_carved_teak_double_door.png',
      '/projects/mr_praveen_kumar/praveen_kumar_06_pebble_puja_court_krishna_idol.png',
      '/projects/mr_praveen_kumar/praveen_kumar_07_cable_staircase_dining_atrium.png',
      '/projects/mr_praveen_kumar/praveen_kumar_08_understair_pebble_court_warli_mural.png',
      '/projects/mr_praveen_kumar/praveen_kumar_09_modular_kitchen_breakfast_bar.jpg',
      '/projects/mr_praveen_kumar/praveen_kumar_10_master_bedroom_stone_wall_wardrobe.png',
      '/projects/mr_praveen_kumar/praveen_kumar_11_overhead_living_wooden_flooring.jpg',
      '/projects/mr_praveen_kumar/praveen_kumar_12_wooden_slat_gate_compound_wall.png',
      '/projects/mr_praveen_kumar/praveen_kumar_13_verandah_pergola_brick_entrance.png',
      '/projects/mr_praveen_kumar/praveen_kumar_14_tiered_gables_facade_gate_perspective.jpg',
    ],
    features: [
      'Tiered gabled terracotta roof architecture',
      'Handcrafted ornate teakwood entrance doorway',
      'Exposed timber rafter truss ceiling atrium',
      'Double-height dining atrium with steel cable balustrade staircase',
      'Mezzanine overlook lounge with polished timber flooring',
      'Glass pergola entrance portico over wire-cut brickwork',
      'Internal pebble-lined puja sanctuary and landscape court',
      'Exposed wire-cut brick masonry with weather pointing',
      'Contemporary modular kitchen and breakfast counter',
      'Master bedroom with natural stone wall cladding',
      'Architectural compound wall with circular aperture and wooden slat gate',
    ],
    specs: [
      'Heavy RCC framed superstructure with wire-cut brick masonry.',
      'Natural terracotta Mangalore roofing tiles on seasoned timber framework.',
      'Complete civil, electrical, plumbing and sanitary installations.',
    ],
    client: 'Mr. Praveen Kumar',
    architect: 'Keystone Architects, Indiranagar',
    builtArea: '8,400 Sq.Ft',
    timeline: '10 Months',
    status: 'Completed',
    featured: false,
  },
  {
    id: 'res-5',
    slug: 'villas',
    number: '05',
    title: 'Mr. Vittal Das Shetty Luxury Villa',
    category: 'Luxury Villas on Item Rate Basis',
    tagline: 'Monumental Dressed Stone Tower & Bamboo-Pergola Walkway',
    description: 'Contemporary luxury villa in Asha Township, Doddagubbi near Bileshevale, Hosakote featuring a monumental dressed stone-clad pylon tower, tiered terracotta gabled roofs, structural steel pergola walkway with bamboo soffit, and exposed brick plinth designed by Keystone Architects.',
    heroImage: '/projects/mr_vittal_das_shetty/vittal_das_shetty_01_stone_pylon_elevation.jpg',
    galleryImages: [
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_01_stone_pylon_elevation.jpg',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_02_tiered_roof_pergola_view.jpg',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_03_front_entry_steps_gate.jpg',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_04_bamboo_soffit_pergola_walkway.png',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_05_entrance_verandah_brick_foyer.png',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_06_civil_construction_phase.png',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_07_side_front_cantilever_view.png',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_08_side_elevation_steel_staircase.png',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_09_bedroom_sliding_wardrobe.png',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_10_puja_room_brass_bell_doors.jpg',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_11_sunken_bath_emerald_tiles.png',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_12_garden_patio_pergola_paving.png',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_13_clerestory_patio_foliage.png',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_14_floating_steel_timber_staircase.png',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_15_staircase_installation_credenza.png',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_16_entrance_gate_makeshwari_plaque.jpg',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_17_patio_sliding_glass_doors.png',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_18_modular_kitchen_granite_counters.jpg',
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_19_bathroom_vanity_emerald_tiles.png',
    ],
    features: [
      'Monumental dressed grey stone-clad pylon tower',
      'Tiered terracotta gabled roof with black steel brackets',
      'Bamboo-soffit steel pergola walkway along garden border',
      'Granite-bordered entrance verandah & exposed brick foyer',
      'Open floating steel and timber stair system with stainless steel balustrade',
      'Contemporary U-shaped modular kitchen with black granite counters',
      'Designer bathroom vanity suite with emerald green glazed tiles',
      'Aluminum sliding glass patio doors opening to garden verandah',
      'Custom sliding wardrobe with undulating panel woodwork',
      'External structural steel dog-leg terrace staircase',
      'Sunken bath with emerald mosaic tiling',
      'Keystone Architects Indiranagar design',
    ],
    specs: [
      'Earthquake-resistant RCC framing with deep raft foundation.',
      'Imported marble flooring and solid teak woodwork.',
      'Integrated solar water heating and automated irrigation.',
    ],
    client: 'Mr. Vittal Das Shetty',
    architect: 'Keystone Architects, Indiranagar',
    builtArea: '7,500 Sq.Ft',
    
    timeline: '12 Months',
    status: 'Active',
    featured: false,
  },
  {
    id: 'res-6',
    slug: 'independent-houses',
    number: '06',
    title: 'Mr. Uma Shankar Agarwal Residence',
    category: 'Affordable Homes with Different Packages as per Specs',
    tagline: 'Private Luxury Residence in JP Nagar Phase 2',
    description: 'Elegant private residence adjacent to Mini Forest in JP Nagar Phase 2 featuring natural light courtyards, floating staircase elements, premium electrical conduit routing, and fine exterior finishes designed by Still Water Architects.',
    heroImage: '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_06_travertine_facade_entrance_gate.png',
    galleryImages: [
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_06_travertine_facade_entrance_gate.png',
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_01_double_height_living_mezzanine.png',
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_02_living_tv_unit_wood_panelling.png',
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_03_terrace_pergola_roof_garden.png',
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_04_floating_zigzag_staircase_atrium.png',
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_05_bookmatched_italian_marble_wall.png',
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_07_overhead_staircase_landing_atrium.png',
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_08_skylight_portico_water_courtyard.png',
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_09_oval_glass_water_fountain_pebble_deck.jpg',
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_10_pooja_room_teak_mandir_enclosure.png'
    ],
    features: [
      'Natural light internal courtyards',
      'Floating staircase and double-height atrium',
      'Still Water Architects architectural design',
      'JP Nagar Phase 2 near Mini Forest setting',
    ],
    specs: [
      'Precision solid block masonry with elastomeric paint.',
      'Concealed Finolex wiring and Grohe sanitaryware.',
      'Architectural skylight over central floating stair.',
    ],
    client: 'Mr. Uma Shankar Agarwal',
    architect: 'Still Water Architects',
    builtArea: '6,200 Sq.Ft',
    
    timeline: '10 Months',
    status: 'Completed',
    featured: false,
  },
  {
    id: 'res-7',
    slug: 'duplex-houses',
    number: '07',
    title: 'Mr. Mahanthesh Bellad Residence',
    category: 'Eco Friendly Homes with Consultation Design and Execution',
    tagline: 'Sculptural Exposed Brick Residence in Happy Valley Layout, Uttarahalli',
    description: 'Sculptural bespoke residence in Happy Valley Layout, Uttarahalli featuring iconic cantilevered exposed brick jaali masonry, an upper terrace courtyard with water features, an expansive double-height internal living atrium with open-tread staircase, and warm hardwood-floored evening lounge connecting to an outdoor timber deck, executed with complete civil, electrical, and plumbing engineering designed by Mr. Gaurav Roy Choudury (GRC Architects).',
    heroImage: '/projects/mr_mahanthesh_bellad/bellad_01_cantilevered_brick_jaali_facade.png',
    galleryImages: [
      '/projects/mr_mahanthesh_bellad/bellad_01_cantilevered_brick_jaali_facade.png',
      '/projects/mr_mahanthesh_bellad/bellad_02_terrace_brick_screen_courtyard.png',
      '/projects/mr_mahanthesh_bellad/bellad_03_double_height_living_atrium.png',
      '/projects/mr_mahanthesh_bellad/bellad_04_evening_living_lounge_timber_deck.png',
    ],
    features: [
      'Cantilevered exposed brick jaali facade expression',
      'Upper terrace courtyard with water pond feature',
      'Double-height living atrium with open-tread staircase',
      'Hardwood evening lounge opening to outdoor timber deck',
      'Mr. Gaurav Roy Choudury (GRC Architects) design',
      'Full Civil + MEP scope execution',
    ],
    specs: [
      'Wire-cut exposed brick facade with waterproof joint pointing.',
      'Split-level cantilevered balconies and deep eaves.',
      'Perimeter rain catchment and recharge pit.',
    ],
    client: 'Mr. Mahanthesh Bellad',
    architect: 'Mr. Gaurav Roy Choudury / GRC Architects',
    builtArea: '5,800 Sq.Ft',
    
    timeline: '11 Months',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'res-8',
    slug: 'apartments-commercial',
    number: '08',
    title: 'Mrs. Hema Saravanan Urban Residence',
    category: 'Custom Duplex & Townhomes',
    tagline: 'Contemporary Urban Residence near Delmia Circle, JP Nagar',
    description: 'Modern urban contemporary residence near Delmia Circle, JP Nagar featuring a striking vertical slate-clad facade, architectural screening louvers, internal double-height courtyard with a living plumeria tree, and an expansive terrace garden with vertical living green wall, executed with comprehensive civil, plumbing, and electrical infrastructure designed by Parallax Architects.',
    heroImage: '/projects/mrs_hema_saravanan/hema_saravanan_01_contemporary_urban_elevation.jpg',
    galleryImages: [
      '/projects/mrs_hema_saravanan/hema_saravanan_01_contemporary_urban_elevation.jpg',
      '/projects/mrs_hema_saravanan/hema_saravanan_02_terrace_garden_vertical_green_wall.jpg',
      '/projects/mrs_hema_saravanan/hema_saravanan_03_double_height_courtyard_plumeria_tree.jpg',
    ],
    features: [
      'Parallax Architects contemporary design',
      'Delmia Circle JP Nagar location',
      'Vertical slate stone facade & screening louvers',
      'Double-height internal courtyard with live plumeria tree',
      'Terrace garden with lawn and vertical green wall',
    ],
    specs: [
      'High-grade RCC structural framing with acoustic partition walls.',
      'Internal lightwell courtyard with natural ventilation and drainage.',
      'Multi-tier terrace garden with automated irrigation and waterproofing.',
    ],
    client: 'Mrs. Hema Saravanan',
    architect: 'Parallax Architects',
    builtArea: '4,900 Sq.Ft',
    
    timeline: '9 Months',
    status: 'Completed',
    featured: false,
  },
  {
    id: 'res-9',
    slug: 'res-shekar',
    number: '09',
    title: 'Mr. Shekar Residence',
    category: 'Luxury Villas on Item Rate Basis',
    tagline: 'Bespoke Terracotta Villa Residence in Nisarga Layout, Jigani',
    description: 'Bespoke private luxury villa in Nisarga Layout, Jigani featuring traditional pitched terracotta gables, a wide covered verandah with timber-paneled ceiling and granite pillars, polished Italian marble living areas with dual-tone granite inlays, custom teak interior doors, and a double-height staircase atrium executed with complete civil, interiors, electrical, and plumbing works designed by Mr. Raghu Bhat.',
    heroImage: '/projects/mr_shekar/shekar_01_terracotta_villa_elevation.png',
    galleryImages: [
      '/projects/mr_shekar/shekar_01_terracotta_villa_elevation.png',
      '/projects/mr_shekar/shekar_02_verandah_terracotta_timber_ceiling.png',
      '/projects/mr_shekar/shekar_03_marble_living_granite_inlay.png',
      '/projects/mr_shekar/shekar_04_grand_staircase_glass_timber_railing.png',
      '/projects/mr_shekar/shekar_05_teak_woodwork_louvered_doors.png',
      '/projects/mr_shekar/shekar_06_staircase_etched_glass_balustrade.png',
      '/projects/mr_shekar/shekar_07_terrace_spiral_staircase_timber_pergola.png',
    ],
    features: [
      'Pitched terracotta gabled roof villa elevation',
      'Wide verandah with exposed timber ceiling & granite columns',
      'Polished Italian marble flooring with dual-tone granite inlays',
      'Grand staircase atrium with glass balustrade & timber handrail',
      'Custom teak interior woodwork & louvered doors',
      'Mr. Raghu Bhat architectural design',
    ],
    specs: [
      'Full RCC superstructure with water-repellent exterior plaster.',
      'Polished Italian marble flooring with granite border inlays.',
      'Complete sanitary and electrical fixtures commissioning.',
    ],
    client: 'Mr. Shekar',
    architect: 'Mr. Raghu Bhat',
    builtArea: '6,500 Sq.Ft',
    
    timeline: '12 Months',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'res-10',
    slug: 'res-tilak',
    number: '10',
    title: 'Mr. Tilak Residence',
    category: 'Multi-Storey Urban Residences',
    tagline: 'Multi-Level Residence in HSR Layout 7th Sector',
    description: 'Multi-level residential building in HSR Layout 7th Sector with robust RCC framing, fine plastering, structural brickwork, and comprehensive plumbing infrastructure designed by Kumar & Associates Trivandrum.',
    heroImage: '/projects/mr_tilak/tilak_01_terracotta_villa_facade.jpg',
    galleryImages: [
      '/projects/mr_tilak/tilak_01_terracotta_villa_facade.jpg',
    ],
    features: [
      'Multi-level RCC frame with heavy load columns',
      'Kumar and Associates Trivandrum design',
      'HSR Layout 7th Sector prime frontage',
      'Precision plumbing and drainage stack works',
    ],
    specs: [
      'G+3 RCC structure with separate rental apartment units.',
      'Vitrified tile flooring and concealed CPVC plumbing.',
      'Overhead 6,000L water storage with pressure pump.',
    ],
    client: 'Mr. Tilak',
    architect: 'Kumar and Associates, Trivandrum',
    builtArea: '7,200 Sq.Ft',
    
    timeline: '11 Months',
    status: 'Completed',
    featured: false,
  },
  {
    id: 'res-11',
    slug: 'res-sreeram',
    number: '11',
    title: 'Mr. Sreeram Residential Building',
    category: 'Contemporary Residences',
    tagline: 'Multi-Level Exposed Brick Residential Building in Anjanapura',
    description: 'Bespoke multi-level residential building in Anjanapura featuring structural RCC framing, exposed wire-cut red brick exterior facade, double-height interior living atrium, and robust civil engineering designed by Meenal Cavale.',
    heroImage: '/projects/mr_sreeram/sreeram_01_exposed_brick_masonry_elevation.jpg',
    galleryImages: [
      '/projects/mr_sreeram/sreeram_01_exposed_brick_masonry_elevation.jpg',
      '/projects/mr_sreeram/sreeram_02_double_height_brick_atrium_interior.jpg',
    ],
    features: [
      'Heavy RCC framed multi-level structural superstructure',
      'Exposed wire-cut red brick facade cladding',
      'Double-height interior atrium space',
      'Anjanapura prime residential location',
      'Meenal Cavale architectural design',
    ],
    specs: [
      'Reinforced concrete columns, beams, and cantilevered slab overhangs.',
      'High-durability wire-cut brick masonry with precision pointing.',
      'Full civil execution, conduit routing, and sanitary MEP systems.',
    ],
    client: 'Mr. Sreeram',
    architect: 'Meenal Cavale',
    builtArea: '6,200 Sq.Ft',
    
    timeline: '12 Months',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'res-12',
    slug: 'res-kumar',
    number: '12',
    title: 'Mr. Kumar Residence',
    category: 'Contemporary Multi-Tier Residences',
    tagline: 'Contemporary Multi-Tier Residence in Jayanagar 5th Block',
    description: 'Custom luxury private residence in Jayanagar 5th Block featuring multi-tier contemporary facade elevations, expansive Italian marble living lounge, exquisite backlit onyx puja mandir, designer modular kitchen with granite countertops, custom granite staircase with wooden handrail, and acoustic private home theater suite, executed with complete civil, electrical, and plumbing infrastructure designed by Mr. Ragavan.',
    heroImage: '/projects/mr_kumar/kumar_01_contemporary_residence_facade.png',
    galleryImages: [
      '/projects/mr_kumar/kumar_01_contemporary_residence_facade.png',
      '/projects/mr_kumar/kumar_02_italian_marble_living_lounge.png',
      '/projects/mr_kumar/kumar_03_backlit_onyx_puja_mandir.png',
      '/projects/mr_kumar/kumar_04_modular_kitchen_granite_counter.png',
      '/projects/mr_kumar/kumar_05_living_room_balcony_garden.png',
      '/projects/mr_kumar/kumar_06_granite_staircase_wooden_handrail.png',
      '/projects/mr_kumar/kumar_07_private_home_theater_acoustic_suite.png',
    ],
    features: [
      'Multi-tier contemporary facade elevation',
      'Italian marble living lounge with terrace view',
      'Backlit golden onyx puja mandir feature wall',
      'Designer modular kitchen with granite finishes',
      'Mr. Ragavan architectural design and civil MEP scope',
    ],
    specs: [
      'Multi-level RCC frame with basement car parking.',
      'Imported Italian marble flooring throughout formal and family living zones.',
      'Integrated electrical distribution, conduit cabling, and sanitary plumbing systems.',
    ],
    client: 'Mr. Kumar',
    architect: 'Mr. Ragavan',
    builtArea: '5,800 Sq.Ft',
    
    timeline: '10 Months',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'res-13',
    slug: 'res-niranjan',
    number: '13',
    title: 'Dr. Niranjan Residence',
    category: 'Contemporary Residences',
    tagline: 'Modernist Private Villa in 5th Block Jayanagar',
    description: 'High-specification contemporary private villa residence in 5th Block Jayanagar featuring clean white modernist architectural elevations, rich timber-framed louvered windows, expansive open roof viewing terrace, and a beautifully landscaped front lawn with circular floral bedding and permeable grass-cell pavers, executed with complete civil, electrical, and plumbing infrastructure designed by Mr. Ragavan.',
    heroImage: '/projects/dr_niranjan/dr_niranjan_01_contemporary_white_villa_facade.jpg',
    galleryImages: [
      '/projects/dr_niranjan/dr_niranjan_01_contemporary_white_villa_facade.jpg',
      '/projects/dr_niranjan/dr_niranjan_02_landscaped_garden_grass_pavers.jpg',
    ],
    features: [
      'Clean white modernist villa facade',
      'Timber louvered fenestrations & roof viewing terrace',
      'Manicured front lawn garden & permeable grass pavers',
      '5th Block Jayanagar prime location',
      'Mr. Ragavan architectural design & civil MEP execution',
    ],
    specs: [
      'Heavy civil RCC framed structure with waterproof foundation.',
      'Hardwood door frames with premium louvered timber sash windows.',
      'Concealed conduit electrical routing and high-durability plumbing lines.',
    ],
    client: 'Dr. Niranjan',
    architect: 'Mr. Ragavan',
    builtArea: '4,800 Sq.Ft',
    
    timeline: '10 Months',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'res-14',
    slug: 'res-kishore',
    number: '14',
    title: 'Mr. Kishore Residence',
    category: 'Contemporary Residences',
    tagline: 'Custom Brick Facade & Timber Pergola Villa in Yediyur Jayanagar',
    description: 'Custom private residence in Yediyur, Jayanagar featuring warm wire-cut exposed brick cladding, pitched terracotta roof eaves, timber pergola balcony framing, and vertical stone slab compound masonry, executed with comprehensive civil, electrical, and plumbing engineering designed by Meenal J. Cavale.',
    heroImage: '/projects/mr_kishore/kishore_01_exposed_brick_pergola_facade.jpg',
    galleryImages: [
      '/projects/mr_kishore/kishore_01_exposed_brick_pergola_facade.jpg',
    ],
    features: [
      'Wire-cut exposed brick facade cladding',
      'Timber pergola balcony framing & tiled roof eaves',
      'Vertical stone slab compound masonry',
      'Yediyur Jayanagar prime location',
      'Meenal J. Cavale architectural design',
    ],
    specs: [
      'RCC framed structure with exterior exposed brick veneer.',
      'Custom timber pergola posts and terracotta eaves protection.',
      'Full civil, electrical conduit layout, and sanitary plumbing lines.',
    ],
    client: 'Mr. Kishore',
    architect: 'Meenal J. Cavale',
    builtArea: '4,500 Sq.Ft',
    
    timeline: '10 Months',
    status: 'Completed',
    featured: true,
  },
];

const defaultTurnkeyItems: TurnkeyItem[] = [
  {
    id: 'turnkey-1',
    slug: 'end-to-end-epc-execution',
    number: '01',
    title: 'Comprehensive End-to-End Turnkey EPC Execution',
    category: 'Turnkey EPC',
    tagline: 'Single-Window Project Delivery from Bare Land to Handover',
    description: 'Complete turnkey architectural design, statutory approval sanctions, heavy civil execution, synchronized MEP grid, interior joinery, and certified structural handover under a single accountable contract.',
    heroImage: '/ndl_projects/slide_011_img_1.jpg',
    galleryImages: [
      '/ndl_projects/slide_011_img_1.jpg',
      '/ndl_projects/slide_012_img_1.jpg',
      '/ndl_projects/slide_017_img_1.jpg',
      '/ndl_projects/slide_020_img_1.jpg',
    ],
    stages: [
      '01. Requirement Analysis & Geotechnical Soil Testing',
      '02. Architectural BIM & Structural Engineering Calculations',
      '03. Transparent Itemized BOQ Lock & Statutory Sanctions',
      '04. Heavy Substructure & Superstructure Casting',
      '05. MEP, HVAC & Fire Protection Infrastructure',
      '06. Interior Fitout & Architectural Finishes',
      '07. Multi-Point Quality Audit & Ceremonial Key Handover',
    ],
    deliverables: [
      'Single Point Responsibility & Zero Contractor Disputes',
      'Fixed Milestone Linked Payment Schedules',
      'Structural Stability & Waterproofing Warranties',
      'As-Built Drawings & Municipal Occupancy Certificates',
    ],
    client: 'Zenith Tech Center & Corporate Headquarters',
    architect: 'NDL In-House Engineering & Architectural Cell',
    builtArea: '65,000 Sq.Ft',
    timeline: '14 Months',
    status: 'Active',
    featured: true,
  },
  {
    id: 'turnkey-2',
    slug: 'design-and-build-villa-turnkey',
    number: '02',
    title: 'Dr. Anil Kush Luxury Villa Turnkey Design & Build',
    category: 'Residential Turnkey',
    tagline: 'From Concept Blueprints to Finished Furnished Villa',
    description: 'Bespoke residential design-and-build turnkey solution for high-net-worth private residences. Encompassing geotechnical analysis, custom cantilever architecture, premium civil construction, imported marble flooring, custom woodwork, and landscape automation executed under Architecture Paradigm.',
    heroImage: '/projects/dr_anil_kush/dr_anil_kush_01_facade_elevation.jpg',
    galleryImages: [
      '/ndl_projects/slide_012_img_1.jpg',
      '/ndl_projects/slide_015_img_1.jpg',
      '/ndl_projects/slide_018_img_1.jpg',
      '/ndl_projects/slide_022_img_1.jpg',
    ],
    stages: [
      '01. Bespoke Architectural Concept & 3D Renders',
      '02. Statutory Sanction Approvals',
      '03. High-Grade RCC Civil Construction',
      '04. Italian Marble & Teak Joinery Integration',
      '05. Smart Home Automation & Landscape Lighting',
      '06. Deep Chemical Cleaning & Ceremonial Key Handover',
    ],
    deliverables: [
      'Zero-Escalation Itemized BOQ Pricing Guarantee',
      'Dedicated Resident Project Engineer on Site',
      'Comprehensive 10-Year Structural Warranty Dossier',
      'Smart Home Central Control Commissioning',
    ],
    client: 'Dr. Anil Kush',
    architect: 'Architecture Paradigm, 6th block, Koramangala',
    builtArea: '12,500 Sq.Ft',
    timeline: '13 Months',
    status: 'Active',
    featured: true,
  },
  {
    id: 'turnkey-3',
    slug: 'commercial-tech-park-turnkey',
    number: '03',
    title: 'Corporate Tech Campus Turnkey Fit-Out',
    category: 'Commercial Turnkey',
    tagline: 'Fast-Track Commercial Turnkey Delivery with Tier-3 Infrastructure',
    description: 'Fast-track turnkey delivery of commercial corporate office spaces, tech parks, and business campuses. Covers basements, post-tensioned floors, unitized structural glazing facade, central HVAC, high-speed elevators, and acoustic workspaces.',
    heroImage: '/assets/turnkey_hero.jpg',
    galleryImages: [
      '/assets/turnkey_hero.jpg',
      '/assets/turnkey_03_execution.jpg',
      '/assets/turnkey_02_bim.jpg',
    ],
    stages: [
      '01. Soil Borehole & Structural PE Framing Design',
      '02. Basement Retention & Diaphragm Wall Works',
      '03. PT Slab Superstructure Construction',
      '04. Structural Glazing & Weather Envelope',
      '05. HT/LT Substation & Chiller HVAC Networks',
      '06. Integrated BMS & Statutory Fire Sign-off',
    ],
    deliverables: [
      'Fast-Track Schedule with Pre-Engineered Elements',
      'BEE 4-Star Energy Efficient Building Envelope',
      'Certified Fire Clearance & Occupancy Certificate',
      'Complete As-Built MEP Schematics',
    ],
    client: 'Enterprise Corporate Campuses',
    architect: 'Integrated Turnkey Engineering Team',
    builtArea: '50,000 Sq.Ft',
    timeline: '11 Months',
    status: 'Completed',
    featured: true,
  },
];

const defaultInteriorItems: InteriorItem[] = [
  {
    id: 'int-1',
    slug: '24x7-solutions-interiors',
    number: '01',
    title: '24x7 Solutions Office Space',
    category: 'Office Interiors',
    spaceType: 'Commercial',
    tagline: 'High-Performance Workspaces, Acoustic Boardrooms & Glass Cabins',
    description: 'Modern corporate office fit-out near Ulsoor Lake featuring curved reception desk, acoustic ceilings, modular workstation framing, glass executive cubicles, and integrated electrical routing designed by Keystone Architects, Indiranagar.',
    heroImage: '/projects/24x7_solutions/24x7_solutions_01_reception_desk.png',
    galleryImages: [
      '/projects/24x7_solutions/24x7_solutions_01_reception_desk.png',
      '/projects/24x7_solutions/24x7_solutions_02_workstations_ceiling_lighting.png',
      '/projects/24x7_solutions/24x7_solutions_03_glass_cabin_partition_framing.png',
      '/projects/24x7_solutions/24x7_solutions_04_executive_cubicle_sliding_door.png',
      '/projects/24x7_solutions/24x7_solutions_05_interior_finishing_electrical_testing.png',
      '/projects/24x7_solutions/24x7_solutions_06_interior_painting_drywall_finishing.png',
      '/projects/24x7_solutions/24x7_solutions_07_executive_cabin_glass_inspection.png',
      '/projects/24x7_solutions/24x7_solutions_08_glazed_cubicles_corridor_entrance.png',
    ],
    materials: [
      'Curved Brushed Stainless Steel Reception Counter',
      'Acoustic Mineral Fiber Ceiling Grid & Recessed Square LED Panels',
      'Anodized Aluminium Partition Framing with Toughened Glass Paneling',
      'Heavy Commercial Workstation Raceway & Modular Cable Trays',
    ],
    features: [
      'Branded Reception Desk with Integrated Signage',
      'Modular Open-Plan Workstation Grid with High-STC Partitions',
      'Executive Cubicle Suites with Sliding Glass Doors',
      'Integrated Conduit Testing, Lighting & Precision Power',
    ],
    client: '24x7 Solutions',
    architect: 'Keystone Architects, Indiranagar',
    builtArea: '18,500 Sq.Ft',
    timeline: '60 Days',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'int-2',
    slug: 'farm-india-interiors',
    number: '02',
    title: 'Farm India Corporate Office Interiors',
    category: 'Office Interiors',
    spaceType: 'Commercial',
    tagline: 'Turnkey Executive Corporate Interiors in Koramangala',
    description: 'Complete corporate office interior fit-out in Koramangala  featuring executive boardrooms, custom acoustic paneling, glass cubicles, and designer modular workstations.',
    heroImage: '/projects/farm_india_office/farm_india_02_executive_cabin_workstation.png',
    galleryImages: [
      '/projects/farm_india_office/farm_india_02_executive_cabin_workstation.png',
      '/projects/farm_india_office/farm_india_01_open_workspace_ducted_ac.png',
      '/projects/farm_india_office/farm_india_03_l_shaped_modular_desk.png',
      '/projects/farm_india_office/farm_india_04_glass_cabin_timber_partitions.png',
      '/projects/farm_india_office/farm_india_05_workspace_fitout_hardwood_flooring.png',
      '/projects/farm_india_office/farm_india_06_corporate_pantry_kitchenette.png',
      '/projects/farm_india_office/farm_india_07_corporate_restroom_dual_vanity.png',
      '/projects/farm_india_office/farm_india_08_restroom_sanitary_fixtures.png',
      '/projects/farm_india_office/farm_india_09_executive_suite_teak_desk_perspective.png'
    ],
    materials: [
      'Natural Smoked Oak Veneer Wall Panelling',
      'High-NRC Fabric-Wrapped Acoustic Panels',
      'Modular Toughened Glass Cabin Partitions',
      'Concealed Cable-Trough Modular Workstations',
    ],
    features: [
      'Executive Boardroom with Integrated AV Automation',
      'Managing Director Suite with Private Lounge',
      'Zoned Acoustic Ceiling Baffles',
      'Energy-Efficient Dimmable LED Troffer Fixtures',
    ],
    client: 'Farm India Office',
    architect: 'Commercial Interior Practice',
    builtArea: '14,000 Sq.Ft',
    timeline: '45 Days',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'int-4',
    slug: 'dr-anil-kush-villa-interiors',
    number: '04',
    title: 'Dr. Anil Kush Private Estate Bespoke Villa Interiors',
    category: 'Living Room',
    spaceType: 'Residential',
    tagline: 'Refined Contemporary Living with Italian Marble & Custom Joinery',
    description: 'Opulent contemporary residential living environments featuring natural Botticino marble cladding, concealed 3000K warm cove lighting, solid teak fluted accents, acoustic ceiling treatments, and bespoke low-slung Italian leather seating.',
    heroImage: '/ndl_projects/slide_020_img_1.jpg',
    galleryImages: [
      '/ndl_projects/slide_020_img_1.jpg',
      '/ndl_projects/slide_020_img_2.jpg',
      '/ndl_projects/slide_021_img_1.jpg',
      '/ndl_projects/slide_022_img_1.jpg',
    ],
    materials: [
      'Imported Italian Botticino Marble',
      'Burma Teak Acoustic Fluting',
      'Dimmable 3000K Warm Cove LED Channels',
      'Matte Gold Brass Shadowlines',
    ],
    features: [
      'Custom Floating TV & Fireplace Media Feature Wall',
      'Acoustic Multi-Layer Gypsum False Ceiling',
      'Automated Motorized Draping Systems',
      'Concealed Air-Conditioning Slot Diffusers',
    ],
    client: 'Dr. Anil Kush',
    architect: 'Architecture Paradigm, 6th block, Koramangala',
    builtArea: '4,500 Sq.Ft',
    timeline: '45 Days',
    status: 'Active',
    featured: true,
  },
  {
    id: 'int-6',
    slug: 'mr-sarabjith-ghose-interiors',
    number: '06',
    title: 'Mr. Sarabjith Ghose Contemporary Living & Bedroom Suite',
    category: 'Bedroom',
    spaceType: 'Residential',
    tagline: 'Acoustic Panelling, Integrated Fluted Glass Wardrobes & Mood Lighting',
    description: 'Sophisticated master bedroom sanctuary and living spaces featuring custom upholstered headboards, acoustic natural veneer wall panels, floor-to-ceiling tinted fluted glass walk-in wardrobes with sensor illumination, and herringbone hardwood flooring.',
    heroImage: '/ndl_projects/slide_034_img_1.jpg',
    galleryImages: [
      '/ndl_projects/slide_034_img_1.jpg',
      '/ndl_projects/slide_036_img_1.jpg',
      '/ndl_projects/slide_038_img_1.jpg',
    ],
    materials: [
      'Natural Smoked Oak Veneer Wall Panelling',
      'Floor-to-Ceiling Tinted Fluted Toughened Glass',
      'Engineered Herringbone Oak Wood Flooring',
      'Velvet Drawer Inserts & Automatic Sensor LEDs',
    ],
    features: [
      'Custom Floating Bed with Integrated USB & Wireless Docks',
      'Walk-In Dressing Suite with Island Accessory Chest',
      'Acoustic Multi-Layer Wall Insulation (STC 50+)',
      'Motorized Blackout Roller & Sheer Blinds',
    ],
    client: 'Mr. Sarabjith Ghose',
    architect: 'Gaurav Roy Chaudary, 7th Sector, HSR Layout',
    builtArea: '850 Sq.Ft',
    timeline: '35 Days',
    status: 'Completed',
    featured: true,
  },
];

const initialEnquiries: EnquirySubmission[] = [
  {
    id: 'ENQ-1001',
    fullName: 'Rajesh Malhotra',
    phone: '+91 98450 12345',
    email: 'rajesh.malhotra@zenithholdings.in',
    projectType: 'Commercial Construction',
    location: 'Outer Ring Road, Bengaluru',
    requirement: 'Require turnkey EPC contracting for a 75,000 sq.ft Grade-A commercial office building with basement parking.',
    preferredContact: 'Phone',
    message: 'Looking for consultation and initial BOQ estimate.',
    status: 'In Progress',
    createdAt: '2026-08-30T10:15:00.000Z',
  },
  {
    id: 'ENQ-1002',
    fullName: 'Ananya & Suresh Varma',
    phone: '+91 98860 98765',
    email: 'suresh.varma@gmail.com',
    projectType: 'Residential Construction',
    location: 'Sadashivanagar, Bengaluru',
    requirement: 'Contemporary 12,000 sq.ft luxury villa with double-height living areas and private courtyard pool.',
    preferredContact: 'WhatsApp',
    message: 'Site is ready with clear title. Need architecture and construction under one single contract.',
    status: 'New',
    createdAt: '2026-09-02T14:30:00.000Z',
  },
  {
    id: 'ENQ-1003',
    fullName: 'Deepak Nambiar',
    phone: '+91 97400 45678',
    email: 'deepak@nambiarhospitality.com',
    projectType: 'Interiors',
    location: 'Indiranagar, Bengaluru',
    requirement: 'High-end fine dining restaurant interior fitout and acoustics with bespoke woodwork.',
    preferredContact: 'Email',
    message: 'Need execution completed in 4 months.',
    status: 'Contacted',
    createdAt: '2026-09-03T16:45:00.000Z',
  },
];

const initialLogs: AdminActivityLog[] = [
  {
    id: 'log-1',
    type: 'blog',
    title: 'Sustainable Luxury Architecture in South India',
    action: 'Published article',
    timestamp: '2026-08-24 10:30',
  },
  {
    id: 'log-2',
    type: 'gallery',
    title: 'The Pavilion Residence',
    action: 'Updated project photos',
    timestamp: '2026-08-28 15:45',
  },
  {
    id: 'log-3',
    type: 'commercial',
    title: 'Item Rate End-to-End Services',
    action: 'Updated commercial package specs',
    timestamp: '2026-08-29 11:20',
  },
  {
    id: 'log-4',
    type: 'residential',
    title: 'Luxury Villas on Item Rate Basis',
    action: 'Updated luxury villa package',
    timestamp: '2026-08-29 14:10',
  },
  {
    id: 'log-5',
    type: 'enquiry',
    title: 'Rajesh Malhotra (Commercial)',
    action: 'New website enquiry',
    timestamp: '2026-08-30 10:15',
  },
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Safe Storage Helpers
  const safeGet = <T,>(key: string, fallback: T): T => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return fallback;
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const safeSet = (key: string, value: any) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch {
      // Ignore storage write errors
    }
  };

  // Gallery state
  const [projects, setProjects] = useState<GalleryProject[]>(() =>
    safeGet<GalleryProject[]>(STORAGE_KEYS.PROJECTS, defaultGalleryProjects)
  );

  // Commercial state
  const [commercialItems, setCommercialItems] = useState<CommercialItem[]>(() =>
    safeGet<CommercialItem[]>(STORAGE_KEYS.COMMERCIAL, defaultCommercialItems)
  );

  // Residential state
  const [residentialItems, setResidentialItems] = useState<ResidentialItem[]>(() =>
    safeGet<ResidentialItem[]>(STORAGE_KEYS.RESIDENTIAL, defaultResidentialItems)
  );

  // Turnkey state
  const [turnkeyItems, setTurnkeyItems] = useState<TurnkeyItem[]>(() =>
    safeGet<TurnkeyItem[]>(STORAGE_KEYS.TURNKEY, defaultTurnkeyItems)
  );

  // Interiors state
  const [interiorItems, setInteriorItems] = useState<InteriorItem[]>(() =>
    safeGet<InteriorItem[]>(STORAGE_KEYS.INTERIORS, defaultInteriorItems)
  );

  // Helper to safely parse and normalize author objects/strings
  const normalizeAuthor = (rawAuthor: any) => {
    if (!rawAuthor) {
      return { name: 'Vikramaditya Sen', role: 'Principal Architectural Director', avatar: '/assets/review_avatar_rahul.jpg' };
    }
    let current = rawAuthor;
    if (typeof current === 'string') {
      const trimmed = current.trim();
      if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        try {
          current = JSON.parse(trimmed);
        } catch (e) {
          return { name: trimmed, role: 'Principal Architectural Director', avatar: '/assets/review_avatar_rahul.jpg' };
        }
      } else {
        return { name: trimmed, role: 'Principal Architectural Director', avatar: '/assets/review_avatar_rahul.jpg' };
      }
    }
    if (typeof current === 'object' && current !== null) {
      let name = current.name || 'Vikramaditya Sen';
      let role = current.role || 'Principal Architectural Director';
      let avatar = current.avatar || '/assets/review_avatar_rahul.jpg';
      if (typeof name === 'string' && name.trim().startsWith('{')) {
        try {
          const nested = JSON.parse(name.trim());
          name = nested.name || name;
          role = nested.role || role;
          avatar = nested.avatar || avatar;
        } catch (e) {}
      }
      return { name, role, avatar };
    }
    return { name: 'Vikramaditya Sen', role: 'Principal Architectural Director', avatar: '/assets/review_avatar_rahul.jpg' };
  };

  // Blogs state
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const raw = safeGet<BlogPost[]>(STORAGE_KEYS.BLOGS, defaultBlogs);
    const fallbackImages = [
      '/assets/about_hero.jpg',
      '/assets/turnkey_hero.jpg',
      '/assets/interior_01_living.jpg',
      '/assets/comm_complex_hero.jpg',
    ];
    return raw.map((b: any, idx: number) => ({
      ...b,
      image: (b.image && !b.image.includes('undefined')) ? b.image : (b.coverImage || b.cover_image || fallbackImages[idx % fallbackImages.length]),
      publishedDate: b.publishedDate || b.date || 'August 2026',
      readTime: b.readTime || '5 min read',
      author: normalizeAuthor(b.author),
    }));
  });

  // Enquiries state
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>(() =>
    safeGet<EnquirySubmission[]>(STORAGE_KEYS.ENQUIRIES, initialEnquiries)
  );

  // Global Website Settings state
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const cached = safeGet<WebsiteSettings>(STORAGE_KEYS.SETTINGS, defaultWebsiteSettings);
    if (!cached || !cached.aboutBrief || cached.aboutBrief.includes('foremost') || !cached.aboutBrief.toLowerCase().includes('south')) {
      return {
        ...defaultWebsiteSettings,
        ...(cached || {}),
        aboutBrief: defaultWebsiteSettings.aboutBrief,
      };
    }
    return cached;
  });

  // Client Testimonials / Reviews state
  const [reviews, setReviews] = useState<ClientReviewItem[]>(() =>
    safeGet<ClientReviewItem[]>(STORAGE_KEYS.REVIEWS, reviewsConfig.reviews)
  );

  // Visual Website Page Contents state
  const [pageContents, setPageContents] = useState<Record<string, any>>(() =>
    safeGet<Record<string, any>>(STORAGE_KEYS.PAGES, defaultPageContents)
  );

  // Auth state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Logs state
  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(() =>
    safeGet<AdminActivityLog[]>(STORAGE_KEYS.LOGS, initialLogs)
  );

  // 1. Initial Live Data Fetch from PostgreSQL Backend
  useEffect(() => {
    let isMounted = true;
    async function fetchPostgresData() {
      try {
        const [
          projRes,
          commRes,
          resRes,
          turnkeyRes,
          intRes,
          blogRes,
          enqRes,
          setRes,
          logsRes,
          pagesRes,
          testRes,
        ] = await Promise.allSettled([
          apiService.getProjects(),
          apiService.getCommercial(),
          apiService.getResidential(),
          apiService.getTurnkey(),
          apiService.getInteriors(),
          apiService.getBlogs(),
          apiService.getEnquiries(),
          apiService.getSettings(),
          apiService.getActivityLogs(),
          apiService.getPageContents(),
          apiService.getTestimonials(),
        ]);

        if (!isMounted) return;

        if (projRes.status === 'fulfilled' && projRes.value?.length > 0) {
          setProjects(projRes.value);
        }
        if (commRes.status === 'fulfilled' && commRes.value?.length > 0) {
          setCommercialItems(commRes.value);
        }
        if (resRes.status === 'fulfilled' && resRes.value?.length > 0) {
          setResidentialItems(resRes.value);
        }
        if (turnkeyRes.status === 'fulfilled' && turnkeyRes.value?.length > 0) {
          setTurnkeyItems(turnkeyRes.value);
        }
        if (intRes.status === 'fulfilled' && intRes.value?.length > 0) {
          setInteriorItems(intRes.value);
        }
        if (blogRes.status === 'fulfilled' && blogRes.value?.length > 0) {
          const fallbackImages = [
            '/assets/about_hero.jpg',
            '/assets/turnkey_hero.jpg',
            '/assets/interior_01_living.jpg',
            '/assets/comm_complex_hero.jpg',
          ];
          const normalized = blogRes.value.map((b: any, idx: number) => ({
            ...b,
            image: (b.image && !b.image.includes('undefined')) ? b.image : (b.coverImage || b.cover_image || fallbackImages[idx % fallbackImages.length]),
            publishedDate: b.publishedDate || b.date || 'August 2026',
            readTime: b.readTime || '5 min read',
            author: normalizeAuthor(b.author),
          }));
          setBlogs(normalized);
        }
        if (enqRes.status === 'fulfilled') {
          setEnquiries(enqRes.value);
        }
        if (setRes.status === 'fulfilled' && setRes.value) {
          setSettings((prev) => ({
            ...defaultWebsiteSettings,
            ...prev,
            ...setRes.value,
          }));
        }
        if (logsRes.status === 'fulfilled' && logsRes.value?.length > 0) {
          setActivityLogs(logsRes.value);
        }
        if (pagesRes.status === 'fulfilled' && pagesRes.value?.length > 0) {
          const pageMap: Record<string, any> = { ...defaultPageContents };
          for (const p of pagesRes.value) {
            pageMap[p.pageId] = {
              ...(defaultPageContents[p.pageId] || {}),
              ...p.data,
              draftData: p.draftData || null,
              hasDraft: Boolean(p.hasDraft),
              status: p.status || 'Published',
              updatedAt: p.updatedAt,
              draftUpdatedAt: p.draftUpdatedAt || null,
            };
          }
          setPageContents(pageMap);
        }
        if (testRes.status === 'fulfilled' && testRes.value?.length > 0) {
          setReviews(testRes.value as any);
        }
      } catch (err) {
        console.warn('PostgreSQL direct fetch warning (falling back to local cache):', err);
      }
    }
    fetchPostgresData();
    return () => { isMounted = false; };
  }, []);

  // Sync to local storage safely as backup
  useEffect(() => {
    safeSet(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  useEffect(() => {
    safeSet(STORAGE_KEYS.COMMERCIAL, commercialItems);
  }, [commercialItems]);

  useEffect(() => {
    safeSet(STORAGE_KEYS.RESIDENTIAL, residentialItems);
  }, [residentialItems]);

  useEffect(() => {
    safeSet(STORAGE_KEYS.TURNKEY, turnkeyItems);
  }, [turnkeyItems]);

  useEffect(() => {
    safeSet(STORAGE_KEYS.INTERIORS, interiorItems);
  }, [interiorItems]);

  useEffect(() => {
    safeSet(STORAGE_KEYS.BLOGS, blogs);
  }, [blogs]);

  useEffect(() => {
    safeSet(STORAGE_KEYS.REVIEWS, reviews);
  }, [reviews]);

  useEffect(() => {
    safeSet(STORAGE_KEYS.PAGES, pageContents);
  }, [pageContents]);

  useEffect(() => {
    safeSet(STORAGE_KEYS.RESIDENTIAL, residentialItems);
  }, [residentialItems]);

  useEffect(() => {
    safeSet(STORAGE_KEYS.TURNKEY, turnkeyItems);
  }, [turnkeyItems]);

  useEffect(() => {
    safeSet(STORAGE_KEYS.INTERIORS, interiorItems);
  }, [interiorItems]);

  useEffect(() => {
    safeSet(STORAGE_KEYS.BLOGS, blogs);
  }, [blogs]);

  useEffect(() => {
    safeSet(STORAGE_KEYS.ENQUIRIES, enquiries);
  }, [enquiries]);

  useEffect(() => {
    safeSet(STORAGE_KEYS.SETTINGS, settings);
  }, [settings]);

  useEffect(() => {
    safeSet(STORAGE_KEYS.LOGS, activityLogs);
  }, [activityLogs]);

  // Apply dynamic SEO, Favicon, Title, and Brand Colors to DOM
  useEffect(() => {
    if (!settings) return;

    // 1. Favicon
    if (settings.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = settings.faviconUrl;
    }

    // 2. SEO Document Title (on public pages)
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/admin') && settings.seoTitle) {
      document.title = settings.seoTitle;
    }

    // 3. Meta Description
    if (settings.seoDescription) {
      let metaDesc = document.querySelector("meta[name='description']");
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', settings.seoDescription);
    }

    // 4. Meta Robots / Indexing Preference
    if (settings.seoIndexingPreference) {
      let metaRobots = document.querySelector("meta[name='robots']");
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', settings.seoIndexingPreference);
    }

    // 5. Open Graph Image
    if (settings.socialShareImage) {
      let metaOgImage = document.querySelector("meta[property='og:image']");
      if (!metaOgImage) {
        metaOgImage = document.createElement('meta');
        metaOgImage.setAttribute('property', 'og:image');
        document.head.appendChild(metaOgImage);
      }
      metaOgImage.setAttribute('content', settings.socialShareImage);
    }

    // 6. CSS Root Brand Color Variables
    if (settings.primaryColor) {
      document.documentElement.style.setProperty('--color-brand-primary', settings.primaryColor);
    }
    if (settings.secondaryColor) {
      document.documentElement.style.setProperty('--color-brand-secondary', settings.secondaryColor);
    }
  }, [settings]);

  const addLog = (
    type: AdminActivityLog['type'],
    title: string,
    action: string
  ) => {
    const newLog: AdminActivityLog = {
      id: `log-${Date.now()}`,
      type,
      title,
      action,
      timestamp: new Date().toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  };

  // Gallery handlers (Direct PostgreSQL integration)
  const addProject = (projectData: Omit<GalleryProject, 'id' | 'slug'>) => {
    const slug = projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProject: GalleryProject = {
      ...projectData,
      id: `proj-${Date.now()}`,
      slug,
    };
    setProjects((prev) => [newProject, ...prev]);
    addLog('gallery', newProject.title, 'Created new project');
    apiService.createProject(newProject).catch((err) => console.error('PostgreSQL addProject error:', err));
  };

  const updateProject = (id: string, updated: Partial<GalleryProject>) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updatedItem = { ...p, ...updated };
          if (updated.title && updated.title !== p.title) {
            updatedItem.slug = updated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          }
          return updatedItem;
        }
        return p;
      })
    );
    const target = projects.find((p) => p.id === id);
    if (target) addLog('gallery', target.title, 'Updated project');
    apiService.updateProject(id, updated).catch((err) => console.error('PostgreSQL updateProject error:', err));
  };

  const deleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (target) addLog('gallery', target.title, 'Deleted project');
    apiService.deleteProject(id).catch((err) => console.error('PostgreSQL deleteProject error:', err));
  };

  const reorderProjects = (startIndex: number, endIndex: number) => {
    setProjects((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      const payload = result.map((p, idx) => ({ id: p.id, displayOrder: idx }));
      apiService.reorderProjects(payload).catch((err) => console.error('PostgreSQL reorderProjects error:', err));
      return result;
    });
    addLog('gallery', 'Gallery Portfolio', 'Reordered projects list');
  };

  // Commercial handlers (Direct PostgreSQL integration)
  const addCommercialItem = (itemData: Omit<CommercialItem, 'id' | 'slug'>) => {
    const slug = itemData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newItem: CommercialItem = {
      ...itemData,
      id: `comm-${Date.now()}`,
      slug,
    };
    setCommercialItems((prev) => [newItem, ...prev]);
    addLog('commercial', newItem.title, 'Created new commercial service');
    apiService.createCommercial(newItem).catch((err) => console.error('PostgreSQL addCommercial error:', err));
  };

  const updateCommercialItem = (id: string, updated: Partial<CommercialItem>) => {
    setCommercialItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, ...updated };
          if (updated.title && updated.title !== item.title) {
            updatedItem.slug = updated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          }
          return updatedItem;
        }
        return item;
      })
    );
    const target = commercialItems.find((c) => c.id === id);
    if (target) addLog('commercial', target.title, 'Updated commercial service');
    apiService.updateCommercial(id, updated).catch((err) => console.error('PostgreSQL updateCommercial error:', err));
  };

  const deleteCommercialItem = (id: string) => {
    const target = commercialItems.find((c) => c.id === id);
    setCommercialItems((prev) => prev.filter((c) => c.id !== id));
    if (target) addLog('commercial', target.title, 'Deleted commercial service');
    apiService.deleteCommercial(id).catch((err) => console.error('PostgreSQL deleteCommercial error:', err));
  };

  // Residential handlers (Direct PostgreSQL integration)
  const addResidentialItem = (itemData: Omit<ResidentialItem, 'id' | 'slug'>) => {
    const slug = itemData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newItem: ResidentialItem = {
      ...itemData,
      id: `res-${Date.now()}`,
      slug,
    };
    setResidentialItems((prev) => [newItem, ...prev]);
    addLog('residential', newItem.title, 'Created new residential package');
    apiService.createResidential(newItem).catch((err) => console.error('PostgreSQL addResidential error:', err));
  };

  const updateResidentialItem = (id: string, updated: Partial<ResidentialItem>) => {
    setResidentialItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, ...updated };
          if (updated.title && updated.title !== item.title) {
            updatedItem.slug = updated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          }
          return updatedItem;
        }
        return item;
      })
    );
    const target = residentialItems.find((r) => r.id === id);
    if (target) addLog('residential', target.title, 'Updated residential package');
    apiService.updateResidential(id, updated).catch((err) => console.error('PostgreSQL updateResidential error:', err));
  };

  const deleteResidentialItem = (id: string) => {
    const target = residentialItems.find((r) => r.id === id);
    setResidentialItems((prev) => prev.filter((r) => r.id !== id));
    if (target) addLog('residential', target.title, 'Deleted residential package');
    apiService.deleteResidential(id).catch((err) => console.error('PostgreSQL deleteResidential error:', err));
  };

  // Turnkey handlers (Direct PostgreSQL integration)
  const addTurnkeyItem = (itemData: Omit<TurnkeyItem, 'id' | 'slug'>) => {
    const slug = itemData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newItem: TurnkeyItem = {
      ...itemData,
      id: `turnkey-${Date.now()}`,
      slug,
    };
    setTurnkeyItems((prev) => [newItem, ...prev]);
    addLog('turnkey', newItem.title, 'Created new turnkey package');
    apiService.createTurnkey(newItem).catch((err) => console.error('PostgreSQL addTurnkey error:', err));
  };

  const updateTurnkeyItem = (id: string, updated: Partial<TurnkeyItem>) => {
    setTurnkeyItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, ...updated };
          if (updated.title && updated.title !== item.title) {
            updatedItem.slug = updated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          }
          return updatedItem;
        }
        return item;
      })
    );
    const target = turnkeyItems.find((t) => t.id === id);
    if (target) addLog('turnkey', target.title, 'Updated turnkey package');
    apiService.updateTurnkey(id, updated).catch((err) => console.error('PostgreSQL updateTurnkey error:', err));
  };

  const deleteTurnkeyItem = (id: string) => {
    const target = turnkeyItems.find((t) => t.id === id);
    setTurnkeyItems((prev) => prev.filter((t) => t.id !== id));
    if (target) addLog('turnkey', target.title, 'Deleted turnkey package');
    apiService.deleteTurnkey(id).catch((err) => console.error('PostgreSQL deleteTurnkey error:', err));
  };

  // Interiors handlers (Direct PostgreSQL integration)
  const addInteriorItem = (itemData: Omit<InteriorItem, 'id' | 'slug'>) => {
    const slug = itemData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newItem: InteriorItem = {
      ...itemData,
      id: `int-${Date.now()}`,
      slug,
    };
    setInteriorItems((prev) => [newItem, ...prev]);
    addLog('interiors', newItem.title, 'Created new interior design item');
    apiService.createInterior(newItem).catch((err) => console.error('PostgreSQL addInterior error:', err));
  };

  const updateInteriorItem = (id: string, updated: Partial<InteriorItem>) => {
    setInteriorItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, ...updated };
          if (updated.title && updated.title !== item.title) {
            updatedItem.slug = updated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          }
          return updatedItem;
        }
        return item;
      })
    );
    const target = interiorItems.find((i) => i.id === id);
    if (target) addLog('interiors', target.title, 'Updated interior design item');
    apiService.updateInterior(id, updated).catch((err) => console.error('PostgreSQL updateInterior error:', err));
  };

  const deleteInteriorItem = (id: string) => {
    const target = interiorItems.find((i) => i.id === id);
    setInteriorItems((prev) => prev.filter((i) => i.id !== id));
    if (target) addLog('interiors', target.title, 'Deleted interior design item');
    apiService.deleteInterior(id).catch((err) => console.error('PostgreSQL deleteInterior error:', err));
  };

  // Blog handlers (Direct PostgreSQL integration)
  const addBlog = (blogData: Omit<BlogPost, 'id' | 'slug'>) => {
    const slug = blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newBlog: BlogPost = {
      ...blogData,
      id: `blog-${Date.now()}`,
      slug,
      author: normalizeAuthor(blogData.author),
    };
    setBlogs((prev) => [newBlog, ...prev]);
    addLog('blog', newBlog.title, 'Created blog post');
    apiService.createBlog(newBlog).catch((err) => console.error('PostgreSQL addBlog error:', err));
  };

  const updateBlog = (id: string, updated: Partial<BlogPost>) => {
    setBlogs((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const updatedItem = {
            ...b,
            ...updated,
            ...(updated.author ? { author: normalizeAuthor(updated.author) } : {}),
          };
          if (updated.title && updated.title !== b.title) {
            updatedItem.slug = updated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          }
          return updatedItem;
        }
        return b;
      })
    );
    const target = blogs.find((b) => b.id === id);
    if (target) addLog('blog', target.title, 'Updated blog post');
    apiService.updateBlog(id, updated).catch((err) => console.error('PostgreSQL updateBlog error:', err));
  };

  const deleteBlog = (id: string) => {
    const target = blogs.find((b) => b.id === id);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    if (target) addLog('blog', target.title, 'Deleted blog post');
    apiService.deleteBlog(id).catch((err) => console.error('PostgreSQL deleteBlog error:', err));
  };

  // Enquiry handlers (Direct PostgreSQL integration)
  const addEnquiry = (enquiryData: Omit<EnquirySubmission, 'id' | 'createdAt' | 'status'>) => {
    const newEnquiry: EnquirySubmission = {
      ...enquiryData,
      id: `ENQ-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    addLog('enquiry', `${newEnquiry.fullName} (${newEnquiry.projectType})`, 'Submitted new enquiry');
    apiService.createEnquiry(enquiryData).catch((err) => console.error('PostgreSQL addEnquiry error:', err));
  };

  const updateEnquiryStatus = (id: string, status: EnquirySubmission['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    const target = enquiries.find((e) => e.id === id);
    if (target) addLog('enquiry', target.fullName, `Status changed to ${status}`);
    apiService.updateEnquiryStatus(id, status).catch((err) => console.error('PostgreSQL updateEnquiryStatus error:', err));
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    apiService.deleteEnquiry(id).catch((err) => console.error('PostgreSQL deleteEnquiry error:', err));
  };

  // Settings handler (Direct PostgreSQL integration)
  const updateSettings = async (newSettings: Partial<WebsiteSettings>): Promise<{ success: boolean; error?: string }> => {
    try {
      const merged = { ...settings, ...newSettings };
      setSettings(merged);
      safeSet(STORAGE_KEYS.SETTINGS, merged);
      addLog('settings', 'Global Website Settings', 'Updated General, SEO, and Branding configuration');
      await apiService.updateSettings(newSettings);
      return { success: true };
    } catch (err: any) {
      console.error('PostgreSQL updateSettings error:', err);
      return { success: false, error: err?.message || 'Failed to save settings to database' };
    }
  };

  // Auth handlers
  const adminLogin = (emailOrPassword: string, password?: string): boolean => {
    const validPasswords = ['perfectmason2026', 'admin', 'admin123', 'prefectmeson2026'];
    const validEmails = [
      'admin@perfectmason.com',
      'admin@prefectmeson.com',
      'admin',
      'contact@perfectmason.com',
      'info@perfectmason.com',
      'admin@gmail.com',
    ];

    if (password !== undefined) {
      const email = emailOrPassword.trim().toLowerCase();
      const pass = password.trim();

      const isEmailAcceptable =
        validEmails.includes(email) ||
        email.includes('admin') ||
        (email.includes('@') && email.length >= 5);

      if (isEmailAcceptable && validPasswords.includes(pass)) {
        setIsAdminAuthenticated(true);
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
        return true;
      }
      return false;
    }

    // Fallback if only password was passed
    const singlePass = emailOrPassword.trim();
    if (validPasswords.includes(singlePass)) {
      setIsAdminAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const resetMasterCatalog = async () => {
    try {
      await apiService.resetMaster();
      const [proj, comm, res, trn, intr, blg] = await Promise.all([
        apiService.getProjects(),
        apiService.getCommercial(),
        apiService.getResidential(),
        apiService.getTurnkey(),
        apiService.getInteriors(),
        apiService.getBlogs(),
      ]);
      setProjects(proj);
      setCommercialItems(comm);
      setResidentialItems(res);
      setTurnkeyItems(trn);
      setInteriorItems(intr);
      setBlogs(blg);
    } catch {
      setProjects(defaultGalleryProjects);
      setCommercialItems(defaultCommercialItems);
      setResidentialItems(defaultResidentialItems);
      setTurnkeyItems(defaultTurnkeyItems);
      setInteriorItems(defaultInteriorItems);
    }
    addLog('gallery', 'Master Data Catalog', 'Restored complete NDL portfolio directly from PostgreSQL');
  };

  // Review / Testimonial handlers
  const addReview = (reviewData: Omit<ClientReviewItem, 'id'>) => {
    const newReview: ClientReviewItem = {
      ...reviewData,
      id: `rev-${Date.now()}`,
    };
    setReviews((prev) => [newReview, ...prev]);
    addLog('review', newReview.clientName, 'Created client review');
    apiService.createTestimonial(newReview).catch((err) => console.error('PostgreSQL addTestimonial error:', err));
  };

  const updateReview = (id: string, updated: Partial<ClientReviewItem>) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
    );
    const target = reviews.find((r) => r.id === id);
    if (target) addLog('review', target.clientName, 'Updated client review');
    apiService.updateTestimonial(id, updated).catch((err) => console.error('PostgreSQL updateTestimonial error:', err));
  };

  const deleteReview = (id: string) => {
    const target = reviews.find((r) => r.id === id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    if (target) addLog('review', target.clientName, 'Deleted client review');
    apiService.deleteTestimonial(id).catch((err) => console.error('PostgreSQL deleteTestimonial error:', err));
  };

  // Visual Website Page Content handlers
  const updatePageContent = (pageId: string, pageTitle: string, data: any, status: string = 'Published') => {
    setPageContents((prev) => ({
      ...prev,
      [pageId]: { ...(prev[pageId] || {}), ...data, status, updatedAt: new Date().toISOString() },
    }));
    addLog('page', pageTitle, `Updated ${pageTitle} content (${status})`);
    apiService.updatePageContent(pageId, pageTitle, data, status).catch((err) =>
      console.error('PostgreSQL updatePageContent error:', err)
    );
  };

  const savePageDraft = async (pageId: string, pageTitle: string, draftData: any): Promise<{ success: boolean; error?: string; draftUpdatedAt?: string }> => {
    try {
      const now = new Date().toISOString();
      setPageContents((prev) => ({
        ...prev,
        [pageId]: {
          ...(prev[pageId] || {}),
          draftData,
          hasDraft: true,
          draftUpdatedAt: now,
        },
      }));
      // Backup to localStorage draft cache
      try {
        const storedDrafts = safeGet<Record<string, any>>(STORAGE_KEYS.DRAFTS, {});
        storedDrafts[pageId] = { draftData, draftUpdatedAt: now, pageTitle };
        safeSet(STORAGE_KEYS.DRAFTS, storedDrafts);
      } catch (_) {}

      addLog('page', pageTitle, `Saved draft edits for ${pageTitle}`);
      const res = await apiService.savePageDraft(pageId, pageTitle, draftData);
      return { success: true, draftUpdatedAt: res.draftUpdatedAt || now };
    } catch (err: any) {
      console.error('savePageDraft error:', err);
      return { success: false, error: err?.message || 'Failed to save draft' };
    }
  };

  const publishPageContent = async (pageId: string, pageTitle: string, data: any): Promise<{ success: boolean; error?: string; updatedAt?: string }> => {
    try {
      const res = await apiService.publishPageContent(pageId, pageTitle, data);
      const now = res.updatedAt || new Date().toISOString();
      setPageContents((prev) => ({
        ...prev,
        [pageId]: {
          ...(defaultPageContents[pageId] || {}),
          ...data,
          draftData: null,
          hasDraft: false,
          status: 'Published',
          updatedAt: now,
          draftUpdatedAt: null,
        },
      }));
      // Clean up local draft cache upon successful publication
      try {
        const storedDrafts = safeGet<Record<string, any>>(STORAGE_KEYS.DRAFTS, {});
        delete storedDrafts[pageId];
        safeSet(STORAGE_KEYS.DRAFTS, storedDrafts);
      } catch (_) {}

      addLog('page', pageTitle, `Published ${pageTitle} live to website`);
      return { success: true, updatedAt: now };
    } catch (err: any) {
      console.error('publishPageContent error:', err);
      return { success: false, error: err?.message || 'Failed to publish page content' };
    }
  };

  const discardPageDraft = async (pageId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setPageContents((prev) => {
        const cur = prev[pageId] || {};
        return {
          ...prev,
          [pageId]: {
            ...cur,
            draftData: null,
            hasDraft: false,
            draftUpdatedAt: null,
          },
        };
      });
      // Clean up local draft cache
      try {
        const storedDrafts = safeGet<Record<string, any>>(STORAGE_KEYS.DRAFTS, {});
        delete storedDrafts[pageId];
        safeSet(STORAGE_KEYS.DRAFTS, storedDrafts);
      } catch (_) {}

      await apiService.discardPageDraft(pageId);
      return { success: true };
    } catch (err: any) {
      console.error('discardPageDraft error:', err);
      return { success: false, error: err?.message || 'Failed to discard draft' };
    }
  };

  const getPageContent = (pageId: string) => {
    return pageContents[pageId] || defaultPageContents[pageId] || {};
  };

  const getPageDraft = (pageId: string) => {
    const page = pageContents[pageId];
    if (page?.hasDraft && page?.draftData) {
      return page.draftData;
    }
    // Check fallback local draft cache
    try {
      const storedDrafts = safeGet<Record<string, any>>(STORAGE_KEYS.DRAFTS, {});
      if (storedDrafts[pageId]?.draftData) {
        return storedDrafts[pageId].draftData;
      }
    } catch (_) {}
    return null;
  };

  const getPublishedPageContent = (pageId: string) => {
    const page = pageContents[pageId] || defaultPageContents[pageId] || {};
    // Strip draft-specific fields
    const { draftData: _d, hasDraft: _h, draftUpdatedAt: _du, ...published } = page;
    return published;
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        commercialItems,
        addCommercialItem,
        updateCommercialItem,
        deleteCommercialItem,
        residentialItems,
        addResidentialItem,
        updateResidentialItem,
        deleteResidentialItem,
        turnkeyItems,
        addTurnkeyItem,
        updateTurnkeyItem,
        deleteTurnkeyItem,
        interiorItems,
        addInteriorItem,
        updateInteriorItem,
        deleteInteriorItem,
        blogs,
        addBlog,
        updateBlog,
        deleteBlog,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        reviews,
        addReview,
        updateReview,
        deleteReview,
        pageContents,
        updatePageContent,
        getPageContent,
        savePageDraft,
        publishPageContent,
        discardPageDraft,
        getPageDraft,
        getPublishedPageContent,
        settings,
        updateSettings,
        resetMasterCatalog,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        activityLogs,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
