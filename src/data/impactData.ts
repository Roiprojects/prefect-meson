export interface ImpactStatistic {
  id: string;
  numericValue: number;
  suffix: string;
  label: string;
  description?: string;
}

export interface ImpactSectionData {
  eyebrow: string;
  headline: {
    line1: string;
    line2: string;
  };
  description: string;
  leftImage: {
    src: string;
    alt: string;
    badge: string;
  };
  rightImage: {
    src: string;
    alt: string;
    badge: string;
  };
  statistics: ImpactStatistic[];
}

export const impactConfig: ImpactSectionData = {
  eyebrow: 'OUR IMPACT',
  headline: {
    line1: 'Building Better.',
    line2: 'Creating Lasting Impact.',
  },
  description:
    'From residential construction to commercial projects, turnkey execution and interiors, we bring disciplined planning, quality craftsmanship and end-to-end execution to every project.',
  leftImage: {
    src: '/assets/impact_active_construction.jpg',
    alt: 'Active reinforced concrete construction project in India by Perfect Mason',
    badge: 'STAGE 01 • ACTIVE CONSTRUCTION',
  },
  rightImage: {
    src: '/assets/impact_completed_architecture.jpg',
    alt: 'Completed luxury commercial glass and stone development by Perfect Mason',
    badge: 'STAGE 02 • COMPLETED DELIVERY',
  },
  statistics: [
    {
      id: 'experience',
      numericValue: 12,
      suffix: '+',
      label: 'YEARS OF EXPERIENCE',
      description: 'Decade-long legacy of engineering excellence across India',
    },
    {
      id: 'projects',
      numericValue: 150,
      suffix: '+',
      label: 'PROJECTS DELIVERED',
      description: 'Luxury residences, corporate hubs, and turnkey spaces',
    },
    {
      id: 'satisfaction',
      numericValue: 98,
      suffix: '%',
      label: 'CLIENT SATISFACTION',
      description: 'Zero-cost overrun guarantee & on-time milestone delivery',
    },
  ],
};
