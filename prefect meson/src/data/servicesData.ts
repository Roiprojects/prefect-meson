import residentialImg from '../assets/services/residential.jpg';
import commercialImg from '../assets/services/commercial.jpg';
import turnkeyImg from '../assets/services/turnkey.jpg';
import interiorImg from '../assets/services/interior.jpg';

export interface ServiceItem {
  id: string;
  number: string;
  displayNumber: string;
  category: string;
  title: string;
  description: string;
  ctaText: string;
  image: string;
  slug: string;
}

export interface ServicesSectionData {
  eyebrow: string;
  headline: {
    line1: string;
    line2: string;
  };
  description: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesSectionData = {
  eyebrow: 'OUR SERVICES',
  headline: {
    line1: 'Everything you need',
    line2: 'to build with confidence.',
  },
  description:
    'From construction to turnkey execution and interiors, Perfect Mason brings every essential capability together under one trusted team.',
  services: [
    {
      id: 'service-01',
      number: '01',
      displayNumber: '.01',
      category: 'RESIDENTIAL CONSTRUCTION',
      title: 'Build Your Dream Home',
      description:
        'From architectural planning and structural RCC engineering to premium finishes and zero-defect handover, we build bespoke luxury residences.',
      ctaText: 'EXPLORE SERVICE',
      image: residentialImg,
      slug: 'residential-construction',
    },
    {
      id: 'service-02',
      number: '02',
      displayNumber: '.02',
      category: 'COMMERCIAL CONSTRUCTION',
      title: 'Build For Business',
      description:
        'From high-load structural frameworks to facade engineering and MEP commissioning, we execute Grade-A commercial spaces with disciplined delivery.',
      ctaText: 'EXPLORE SERVICE',
      image: commercialImg,
      slug: 'commercial-construction',
    },
    {
      id: 'service-03',
      number: '03',
      displayNumber: '.03',
      category: 'TURNKEY PROJECT EXECUTION',
      title: 'From Plan To Handover',
      description:
        'Single-source accountability across design, civil engineering, material procurement, regulatory approvals, and on-time key handover.',
      ctaText: 'EXPLORE SERVICE',
      image: turnkeyImg,
      slug: 'turnkey-project-execution',
    },
    {
      id: 'service-04',
      number: '04',
      displayNumber: '.04',
      category: 'INTERIOR DESIGN & FIT-OUT',
      title: 'Artisanal Interior Spaces',
      description:
        'Bespoke modular joinery, Italian marble craftsmanship, acoustic ceilings, and turnkey interior fit-outs engineered to perfection.',
      ctaText: 'EXPLORE SERVICE',
      image: interiorImg,
      slug: 'interiors',
    },
  ],
};
