export interface InteriorScene {
  id: string;
  number: string;
  category: string;
  title: string;
  location: string;
  description: string;
  scope: string;
  image: string;
  slug: string;
  areaSqFt?: string;
}

export interface InteriorsData {
  intro: {
    eyebrow: string;
    headline: {
      line1: string;
      line2: string;
    };
    description: string;
    capabilities: string[];
    residentialServices: string[];
    commercialServices: string[];
  };
  scenes: InteriorScene[];
}

export const interiorsConfig: InteriorsData = {
  intro: {
    eyebrow: 'INTERIORS',
    headline: {
      line1: 'Spaces designed to feel',
      line2: 'as good as they look.',
    },
    description:
      'From space planning and material selection to lighting, flooring, furniture and custom finishes, Perfect Mason brings design and execution together under one team.',
    capabilities: [
      'RESIDENTIAL INTERIORS',
      'COMMERCIAL INTERIORS',
      'OFFICE INTERIORS',
      'MODULAR SOLUTIONS',
      'CUSTOM INTERIOR EXECUTION',
    ],
    residentialServices: [
      'Living Room Architecture',
      'Modular Kitchens',
      'Master Suites',
      'Dining Spaces',
      'Walk-in Wardrobes',
      'Pooja Room Details',
    ],
    commercialServices: [
      'Corporate Headquarters',
      'Executive Boardrooms',
      'Retail Showrooms',
      'Hospitality Lounges',
    ],
  },
  scenes: [
    {
      id: 'interior-01',
      number: '01',
      category: 'RESIDENTIAL INTERIORS',
      title: 'Contemporary Living Residence',
      location: 'Bengaluru, Karnataka',
      description:
        'A refined interior environment combining natural travertine stone, bespoke teak wood wall fluting, architectural cove lighting and open-concept spatial planning.',
      scope: 'Complete Turnkey Residential Interior Execution',
      image: '/assets/interior_01_living.jpg',
      slug: 'residential-interiors',
      areaSqFt: '5,800 sq.ft',
    },
    {
      id: 'interior-02',
      number: '02',
      category: 'COMMERCIAL INTERIORS',
      title: 'Flagship Commercial & Retail Showroom',
      location: 'Sadashivanagar, Bangalore',
      description:
        'Immersive commercial interior environment engineered for premium retail and showroom hospitality, featuring bespoke acoustic paneling, display vitrines, and dynamic illumination.',
      scope: 'Turnkey Commercial Interior Fit-Out',
      image: '/assets/comm_showroom_hero.jpg',
      slug: 'commercial-interiors',
      areaSqFt: '14,500 sq.ft',
    },
    {
      id: 'interior-03',
      number: '03',
      category: 'OFFICE INTERIORS',
      title: 'Executive Corporate Headquarters',
      location: 'Bengaluru, Karnataka',
      description:
        'High-performance modern corporate interior featuring ergonomic benching, private acoustic glass meeting suites, biophilic living green walls, and linear magnetic track lighting.',
      scope: 'Turnkey Commercial Office Interior & Fit-Out',
      image: '/assets/interior_04_office.jpg',
      slug: 'office-interiors',
      areaSqFt: '28,000 sq.ft',
    },
    {
      id: 'interior-04',
      number: '04',
      category: 'MODULAR SOLUTIONS',
      title: 'Curated Modular Kitchen & Storage Systems',
      location: 'Koramangala, Bangalore',
      description:
        'Precision-engineered modular kitchen and wardrobe architecture featuring soft-close German hardware, scratch-resistant acrylic shutters, and ergonomic space optimization.',
      scope: 'Modular Kitchen Engineering & Storage Execution',
      image: '/assets/interior_02_kitchen.jpg',
      slug: 'modular-solutions',
      areaSqFt: '1,450 sq.ft',
    },
    {
      id: 'interior-05',
      number: '05',
      category: 'CUSTOM INTERIOR EXECUTION',
      title: 'Master Architectural Suite & Custom Joinery',
      location: 'Indiranagar, Bangalore',
      description:
        'Handcrafted custom interior woodwork, fluted acoustic timber paneling, bespoke walk-in wardrobes, low-slung platform beds, and illuminated glass vitrines.',
      scope: 'Artisanal On-Site & Workshop Custom Execution',
      image: '/assets/interior_03_bedroom.jpg',
      slug: 'custom-interior-execution',
      areaSqFt: '2,200 sq.ft',
    },
  ],
};
