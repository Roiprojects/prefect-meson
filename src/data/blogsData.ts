export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category:
    | 'Construction'
    | 'Home Building'
    | 'Commercial Construction'
    | 'Residential Construction'
    | 'Interiors'
    | 'Architecture'
    | 'Project Management'
    | 'Construction Tips'
    | 'Materials & Technology';
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  } | any;
  publishedDate: string;
  readTime: string;
  image: string;
  featured?: boolean;
  tags?: string[];
  status?: 'Draft' | 'Published';
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
    }[];
    conclusion: string;
  };
}

export const blogsData: BlogPost[] = [
  {
    id: 'blog-01',
    slug: 'future-of-sustainable-architecture-india',
    title: 'The Future of Sustainable Luxury Architecture in South India',
    category: 'Architecture',
    excerpt:
      'How modern climate-responsive building design, daylight orientation, and regional material palettes are redefining contemporary Indian homes.',
    author: {
      name: 'Vikramaditya Sen',
      role: 'Principal Architectural Director',
      avatar: '/assets/review_avatar_rahul.jpg',
    },
    publishedDate: 'August 24, 2026',
    readTime: '6 min read',
    image: '/assets/about_hero.jpg',
    featured: true,
    status: 'Published',
    tags: ['Architecture', 'Sustainability', 'Luxury Estates', 'South India'],
    content: {
      intro:
        'As urbanization accelerates across Bengaluru and premier regional architectural hubs, the definition of luxury living is experiencing a profound paradigm shift. It is no longer defined solely by imported finishes or sprawling square footage, but by thermal comfort, energy independence, and bioclimatic intelligence.',
      sections: [
        {
          heading: '1. Bioclimatic Orientation & Natural Cross-Ventilation',
          body:
            'By carefully positioning building volumes to capture prevailing southwest monsoon winds and shading west-facing facades with cantilevered concrete louvers, structural cooling loads can be reduced by up to 35% without sacrificing architectural grandeur.',
        },
        {
          heading: '2. Regional Materiality: Travertine, Teak, and Cast Concrete',
          body:
            'Pairing exposed fair-faced concrete with indigenous stones such as Sadarahalli granite and sustainably sourced Karnataka teak creates an organic dialogue between modern minimalism and timeless Indian craftsmanship.',
        },
        {
          heading: '3. Integrated Water Management & Solar Microgrids',
          body:
            'Modern turnkey estates now incorporate multi-stage rainwater harvesting tanks integrated invisibly into basement footings alongside high-efficiency solar photovoltaic canopies that power HVAC and EV infrastructure seamlessly.',
        },
      ],
      conclusion:
        'At Perfect Mason, we believe true architectural luxury is the seamless confluence of structural permanence, climatic comfort, and bespoke craftsmanship.',
    },
  },
  {
    id: 'blog-02',
    slug: 'turnkey-construction-vs-traditional-contracting',
    title: 'Turnkey Construction vs. Traditional Contracting: What Modern Homeowners Must Know',
    category: 'Project Management',
    excerpt:
      'Understanding how single-source accountability, transparent BOQ engineering, and integrated 3D BIM eliminate project delays and budget escalations.',
    author: {
      name: 'Ananya Rao',
      role: 'Chief Project Engineer',
      avatar: '/assets/review_avatar_ananya.jpg',
    },
    publishedDate: 'August 18, 2026',
    readTime: '5 min read',
    image: '/assets/turnkey_hero.jpg',
    status: 'Published',
    tags: ['Turnkey', 'Project Management', 'BOQ', 'Quality Control'],
    content: {
      intro:
        'Building a bespoke home or commercial facility is among the most significant investments a client undertakes. Yet the traditional multi-vendor fragmented contracting model frequently results in misaligned coordination, finger-pointing, and substantial cost overruns.',
      sections: [
        {
          heading: 'Single-Source Responsibility',
          body:
            'In a unified Turnkey execution model, one dedicated engineering firm handles architectural planning, structural design, civil execution, MEP coordination, and final interior fit-out under a single contractual warranty.',
        },
        {
          heading: 'Milestone-Based Quality Assurances',
          body:
            'Digital laser leveling, slump testing of concrete batches, and multi-point non-destructive testing at each RCC slab casting stage ensure engineering precision that lasts for generations.',
        },
      ],
      conclusion:
        'Turnkey execution transforms the construction journey from a stressful logistical hurdle into an inspiring, well-choreographed architectural realization.',
    },
  },
  {
    id: 'blog-03',
    slug: 'mastering-interior-lighting-design',
    title: 'Mastering Interior Lighting Design: Warmth, Contrast, and DALI Controls',
    category: 'Interiors',
    excerpt:
      'A deep dive into layered architectural lighting, cove illumination, and smart automated scenes that elevate contemporary residential interiors.',
    author: {
      name: 'Priya Sharma',
      role: 'Head of Interior Design',
      avatar: '/assets/review_featured_priya.jpg',
    },
    publishedDate: 'August 10, 2026',
    readTime: '4 min read',
    image: '/assets/interior_01_living.jpg',
    status: 'Published',
    tags: ['Interiors', 'Lighting Design', 'DALI', 'Luxury Living'],
    content: {
      intro:
        'Light is the invisible material that sculpts every architectural space. Without thoughtful illumination design, even the most exquisite marble and fine joinery appear flat and uninviting.',
      sections: [
        {
          heading: 'The Three-Tier Lighting Hierarchy',
          body:
            'Balancing ambient background wash (2700K warm LEDs), directional task lighting (high CRI 95+), and dramatic accent spot beams on art pieces creates volumetric depth in living zones.',
        },
        {
          heading: 'Smart Scene Automation',
          body:
            'DALI-controlled automated lighting presets effortlessly transition a home from bright morning productivity mode to intimate evening lounge warmth with a single touch.',
        },
      ],
      conclusion:
        'Lighting is not an afterthought; it is an intrinsic dimension of interior architecture that defines how spaces feel and breathe.',
    },
  },
  {
    id: 'blog-04',
    slug: 'concrete-grade-selection-multi-storey-buildings',
    title: 'Precision Structural Engineering: Grade M35 vs M40 Concrete in High-Rise Execution',
    category: 'Materials & Technology',
    excerpt:
      'An engineering breakdown of compressive strength, curing cycles, and slump test parameters essential for commercial and high-rise structural permanence.',
    author: {
      name: 'Karthik Ramanathan',
      role: 'Lead Structural Consultant',
      avatar: '/assets/review_avatar_rahul.jpg',
    },
    publishedDate: 'August 02, 2026',
    readTime: '7 min read',
    image: '/assets/comm_complex_hero.jpg',
    status: 'Published',
    tags: ['Materials & Technology', 'RCC', 'Civil Engineering', 'Structural'],
    content: {
      intro:
        'The foundation of every enduring landmark lies in the chemistry of its concrete and the metallurgical grade of its thermo-mechanically treated (TMT) steel reinforcement.',
      sections: [
        {
          heading: 'High-Performance Ready Mix Mix Design',
          body:
            'Using computerized batching plants and micro-silica additives achieves high early-age strength, allowing post-tensioning strands to be stressed sooner and reducing cycle times safely.',
        },
        {
          heading: 'Thermal Crack Control in Mass Pours',
          body:
            'During massive raft pours exceeding 1.5m thickness, hydration temperatures are closely monitored using embedded thermocouple probes to prevent micro-cracking.',
        },
      ],
      conclusion:
        'Structural durability is never an accident; it is the calculated result of meticulous material testing and relentless on-site supervision.',
    },
  },
];
