export interface ContactLocation {
  lat: number;
  lng: number;
  zoom: number;
  title: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  googleMapsUrl: string;
}

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  description?: string;
  actionText: string;
}

export interface ConsultationStep {
  number: string;
  title: string;
  description: string;
}

export interface NextStepItem {
  step: string;
  title: string;
  description: string;
}

export interface ContactDataConfig {
  sectionLabel: string;
  heroHeading: string;
  heroIntro: string;
  taglines: {
    clarity: string;
    confidence: string;
    precision: string;
  };
  commitment: {
    badge: string;
    heading: string;
    description: string;
    image: string;
  };
  consultationSteps: ConsultationStep[];
  nextSteps: NextStepItem[];
  trustPoints: string[];
  contactInfo: {
    phone: ContactChannel;
    email: ContactChannel;
    office: ContactChannel;
    hours: ContactChannel;
    whatsapp: ContactChannel;
  };
  mapLocation: ContactLocation;
  projectTypes: string[];
  socialLinks?: { label: string; href: string; icon: string }[];
  projectStages: string[];
  timelineOptions: string[];
  budgetRanges: string[];
  contactMethods: { id: 'Phone' | 'WhatsApp' | 'Email'; label: string }[];
  finalCta: {
    heading: string;
    supportingText: string;
    primaryBtn: string;
    secondaryBtn: string;
  };
}

export interface EnquirySubmission {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  projectStage?: string;
  plotSize?: string;
  plotDimensions?: string;
  timeline?: string;
  location: string;
  requirement: string;
  preferredContact: 'Phone' | 'WhatsApp' | 'Email';
  message: string;
  budget?: string;
  notes?: string;
  source?: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed';
  createdAt: string;
}

export const contactData: ContactDataConfig = {
  sectionLabel: 'PROJECT CONSULTATION DESK',
  heroHeading: "Let's build\nsomething meaningful.",
  heroIntro:
    "Whether you're planning a bespoke private residence, commercial complex, turnkey facility or corporate interior fit-out, Our senior civil engineering team are ready to guide you from foundation to handover.",
  taglines: {
    clarity: 'BUILD WITH CLARITY.',
    confidence: 'PLAN WITH CONFIDENCE.',
    precision: 'EXECUTE WITH PRECISION.',
  },
  commitment: {
    badge: 'PROJECT CONSULTATION • NDL ENGINEERS & CONTRACTORS',
    heading: 'OUR COMMITMENT',
    description:
      'Every project is approached with direct engineering oversight, certified material batch testing, transparent itemized BOQ billing, and uncompromised structural integrity.',
    image: '/assets/contact_commitment.jpg',
  },
  consultationSteps: [
    {
      number: '01',
      title: 'INITIAL CONSULTATION & SITE INSPECTION',
      description:
        'Understand your architectural requirements, site topography, soil characteristics, and project timeline expectations.',
    },
    {
      number: '02',
      title: 'MODE OF EXECUTION SELECTION',
      description:
        'Choose from Item Rate, Turnkey Contract, Construction Supervision, Per Sq Ft basis, or Engineering Consultation.',
    },
    {
      number: '03',
      title: 'BOQ ESTIMATION & STRUCTURAL PLANNING',
      description:
        'Coordinate with renowned architects and structural consultants for verified drawings, Bar Bending Schedules, and itemized cost locks.',
    },
    {
      number: '04',
      title: 'RIGOROUS CIVIL EXECUTION & HANDOVER',
      description:
        'Site execution with in-house machinery, concrete cube compression testing, milestone inspections, and key handover.',
    },
  ],
  nextSteps: [
    {
      step: '01',
      title: 'We review your enquiry',
      description: 'Senior project engineers review your requirements and location within 24 hours.',
    },
    {
      step: '02',
      title: 'Our team contacts you',
      description: 'We connect via Phone, WhatsApp, or Email for direct technical discussion.',
    },
    {
      step: '03',
      title: 'Site Visit & Requirement Analysis',
      description: 'On-site technical evaluation of plot dimensions, approach road, water levels, and architectural drawings.',
    },
    {
      step: '04',
      title: 'Comprehensive Proposal & BOQ',
      description: 'Receive an itemized rate estimate, execution timeline, and material quality assurance charter.',
    },
  ],
  trustPoints: [
    'Proprietor Direct Oversight (B.E. Civil)',
    'In-House Plants & Heavy Machinery',
    'Transparent Itemized Billing',
  ],
  contactInfo: {
    phone: {
      label: 'CALL US',
      value: '+91 98863 29424',
      href: 'tel:+919886329424',
      description: 'Direct Line — Project Engineering Desk',
      actionText: 'CALL NOW',
    },
    whatsapp: {
      label: 'WHATSAPP',
      value: '+91 98863 29424',
      href: 'https://wa.me/919886329424?text=Hello%20NDL%20Engineers%2C%20I%20would%20like%20to%20enquire%20about%20a%20construction%20project.',
      description: 'Instant WhatsApp Chat & Drawing Sharing',
      actionText: 'CHAT ON WHATSAPP',
    },
    email: {
      label: 'EMAIL',
      value: 'contact@perfectmason.com',
      href: 'mailto:contact@perfectmason.com',
      description: 'Project Inquiries, Drawings & Commercial Tenders',
      actionText: 'SEND EMAIL',
    },
    office: {
      label: 'REGISTERED OFFICE',
      value: 'No: 2041, 18th Cross, AECS Layout, A Block, Hosur Main Road, Bangalore - 560068',
      href: 'https://maps.google.com/?q=No+2041+18th+Cross+AECS+Layout+A+Block+Hosur+Main+Road+Bangalore+560068',
      description: 'Perfect Mason Studio & Executive Office',
      actionText: 'GET DIRECTIONS',
    },
    hours: {
      label: 'WORKING HOURS',
      value: 'Mon – Sat: 9:00 AM – 6:00 PM',
      href: '#',
      description: 'Sunday by prior appointment',
      actionText: 'SCHEDULE VISIT',
    },
  },
  mapLocation: {
    lat: 12.8912,
    lng: 77.6432,
    zoom: 15,
    title: 'PERFECT MASON STUDIO',
    address: 'No: 2041, 18th Cross, AECS Layout, A Block, Hosur Main Road',
    city: 'Bangalore',
    pincode: '560068',
    state: 'Karnataka',
    googleMapsUrl: 'https://maps.google.com/?q=No+2041+18th+Cross+AECS+Layout+A+Block+Hosur+Main+Road+Bangalore+560068',
  },
  projectTypes: [
    'Residential Construction',
    'Commercial Construction',
    'Turnkey Project',
    'Interiors',
    'Other',
  ],
  socialLinks: [
    { label: 'WhatsApp', href: 'https://wa.me/919886329424', icon: 'WhatsApp' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'LinkedIn' },
    { label: 'Instagram', href: 'https://instagram.com', icon: 'Instagram' },
    { label: 'Facebook', href: 'https://facebook.com', icon: 'Facebook' },
  ],
  projectStages: [
    'Planning & Architectural Drawings',
    'Sanction & Estimation Finalized',
    'Ready for Groundbreaking',
    'Structure in Progress',
    'Interior Fit-Out Stage',
    'Just Exploring & Feasibility',
  ],
  timelineOptions: [
    'Immediately',
    'Within 1 month',
    '1–3 months',
    '3–6 months',
    '6+ months',
  ],
  budgetRanges: [
    '₹30 Lakhs – ₹50 Lakhs',
    '₹50 Lakhs – ₹1 Crore',
    '₹1 Crore – ₹3 Crores',
    '₹3 Crores – ₹5 Crores',
    '₹5 Crores+',
    'Undecided / Item Rate Basis',
  ],
  contactMethods: [
    { id: 'Phone', label: 'Phone' },
    { id: 'WhatsApp', label: 'WhatsApp' },
    { id: 'Email', label: 'Email' },
  ],
  finalCta: {
    heading: 'Ready to build with engineering excellence?',
    supportingText: "Tell us about your project requirements and let's structure an optimal execution strategy together.",
    primaryBtn: 'REQUEST QUOTE',
    secondaryBtn: 'VIEW PROJECTS',
  },
};
