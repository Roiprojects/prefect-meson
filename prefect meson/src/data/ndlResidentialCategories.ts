import { ndlProjects, NDLProject } from './ndlProjectsData';

export interface ResidentialCategory {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  representativeImage: string;
  representativeClient: string;
  representativeArchitect: string;
  projectIds: string[];
}

export const residentialCategories: ResidentialCategory[] = [
  {
    slug: 'luxury-villas-item-rate',
    number: '01',
    title: 'Luxury Villas on Item Rate Basis',
    tagline: 'Item-Rate Contract Agreements & Custom Estate Execution',
    description: 'Stately luxury villa construction executed on a transparent item-rate contractual basis with itemized BOQ estimations, exposed RCC cantilevered slabs, natural stone masonry, water bodies, and bespoke estate finishes.',
    representativeImage: '/projects/dr_anil_kush/dr_anil_kush_01_courtyard_louvers.png',
    representativeClient: 'Dr. Anil Kush',
    representativeArchitect: 'Architecture Paradigm, 6th block, Koramangala',
    projectIds: ['dr-anil-kush', 'mr-vittal-das-shetty', 'mr-rakesh-n-rao'],
  },
  {
    slug: 'affordable-homes-packages',
    number: '02',
    title: 'Affordable Homes (Packages as per Specs)',
    tagline: 'Customized Specification Packages & Family Residences',
    description: 'High-quality affordable family home construction with structured per-sq-ft specification packages: offering robust civil foundations, spatial efficiency, and transparent itemized billing.',
    representativeImage: '/projects/mr_amith/amith_01_geometric_elevation_portrait.jpg',
    representativeClient: 'Mr. Amith Residence',
    representativeArchitect: 'NDL In-House Engineering Coordination',
    projectIds: ['mr-amith', 'mr-praveen-kumar', 'mr-uma-shankar-agarwal', 'dr-niranjan'],
  },
  {
    slug: 'eco-friendly-homes',
    number: '03',
    title: 'Eco-Friendly Homes (Design & Execution)',
    tagline: 'Wire-Cut Brick Masonry, SMBs & Sustainable Architecture',
    description: 'Environmentally conscious sustainable residences featuring wire-cut brick masonry, stabilized mud blocks (SMB), passive thermal planning, natural courtyards, rainwater harvesting, end-to-end engineering consultation, architectural design, and turnkey civil execution.',
    representativeImage: '/projects/mr_sarabjith_ghose/sarabjith_ghose_01_corner_elevation.jpg',
    representativeClient: 'Mr. Sarabjith Ghose',
    representativeArchitect: 'Gaurav Roy Chaudary, 7th Sector, HSR Layout',
    projectIds: ['mr-sarabjith-ghose', 'mr-mahanthesh-bellad', 'mrs-hema-saravanan'],
  },
  {
    slug: 'villas',
    number: '04',
    title: 'Villas',
    tagline: 'Stately Gated Townships & Private Plot Residences',
    description: 'Stately villa construction across gated townships and private plots, featuring cantilevered balconies, stone masonry, pergola framing, and expansive perimeter landscaping.',
    representativeImage: '/projects/mr_vittal_das_shetty/vittal_das_shetty_01_stone_pylon_elevation.jpg',
    representativeClient: 'Mr. Vittal Das Shetty Residence',
    representativeArchitect: 'Keystone Architects, Indiranagar',
    projectIds: ['mr-vittal-das-shetty'],
  },
  {
    slug: 'independent-houses',
    number: '05',
    title: 'Independent Houses',
    tagline: 'Custom Private Homes & Family Residences',
    description: 'Custom private independent homes tailored to family lifestyle, offering bespoke architectural spatial zoning, natural light courtyards, and robust structural foundations.',
    representativeImage: '/ndl_projects/slide_081_img_1.jpg',
    representativeClient: 'Mr. Amith Residence',
    representativeArchitect: 'NDL In-House Engineering Coordination',
    projectIds: ['mr-amith'],
  },
  {
    slug: 'luxury-homes',
    number: '06',
    title: 'Luxury Homes',
    tagline: 'Exposed RCC, Floating Cantilevers & Bespoke Finishes',
    description: 'Signature architectural residences built with exposed RCC finishes, floating cantilever slabs, natural water bodies, and bespoke interior woodwork.',
    representativeImage: '/ndl_projects/slide_012_img_1.jpg',
    representativeClient: 'Dr. Anil Kush',
    representativeArchitect: 'Architecture Paradigm, 6th block, Koramangala',
    projectIds: ['dr-anil-kush', 'mr-rakesh-n-rao'],
  },
  {
    slug: 'duplex-houses',
    number: '07',
    title: 'Duplex Houses',
    tagline: 'Sculptural Split-Level Living & Exposed Brick Masonry',
    description: 'Sculptural multi-tier split-level duplex residences featuring exposed wire-cut brick masonry, geometric cantilevers, double-height living areas, and internal staircases.',
    representativeImage: '/ndl_projects/slide_026_img_1.jpg',
    representativeClient: 'Mr. Sarabjith Ghose',
    representativeArchitect: 'Gaurav Roy Chaudary, 7th Sector, HSR Layout',
    projectIds: ['mr-sarabjith-ghose', 'mr-mahanthesh-bellad'],
  },
  {
    slug: 'multi-storey-homes',
    number: '08',
    title: 'Multi-Storey Homes',
    tagline: 'High-Specification Urban G+3 Family Residences',
    description: 'High-specification multi-storey urban family residences in prime neighborhoods with heavy structural framing, concealed conduits, and integrated lift shafts.',
    representativeImage: '/projects/mr_praveen_kumar/praveen_kumar_01_tiered_roof_elevation.png',
    representativeClient: 'Mr. Praveen Kumar Residence',
    representativeArchitect: 'Keystone Architects, Indiranagar',
    projectIds: ['mr-praveen-kumar', 'mr-uma-shankar-agarwal', 'dr-niranjan', 'mr-kishore'],
  },
  {
    slug: 'residential-buildings',
    number: '09',
    title: 'Residential Buildings',
    tagline: 'Multi-Tenant Apartment Blocks & Rental Infrastructure',
    description: 'Complete residential apartment complexes and multi-tenant buildings designed for durable long-term rental income and structural longevity.',
    representativeImage: '/ndl_projects/slide_124_img_1.jpg',
    representativeClient: 'Mr. Sreeram Residential Building',
    representativeArchitect: 'Meenal Cavale / MJC Architects',
    projectIds: ['mr-sreeram', 'mr-tilak', 'mr-kumar', 'mr-shekar'],
  },
  {
    slug: 'renovation-extension',
    number: '10',
    title: 'Renovation & Extension',
    tagline: 'Structural Retrofitting & Facade Modernization',
    description: 'Professional structural retrofitting, vertical floor additions, facade modernization, and civil remodeling of existing residential properties.',
    representativeImage: '/projects/mrs_hema_saravanan/hema_saravanan_01_contemporary_urban_elevation.jpg',
    representativeClient: 'Mrs. Hema Saravanan Residence',
    representativeArchitect: 'Parallax Architects, JP Nagar',
    projectIds: ['mrs-hema-saravanan'],
  },
];

export function getResidentialCategoryBySlug(slug: string): ResidentialCategory | undefined {
  return residentialCategories.find((c) => c.slug === slug);
}

export function getProjectsByResidentialCategory(categorySlug: string): NDLProject[] {
  const category = getResidentialCategoryBySlug(categorySlug);
  if (!category) return [];
  return ndlProjects.filter((p) => category.projectIds.includes(p.id));
}
