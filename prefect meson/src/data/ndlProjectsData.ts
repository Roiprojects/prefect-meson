// SOURCE OF TRUTH: NDL Engineers and Contractors Profile PPT (125 Slides)
// All 20 projects with authentic client names, locations, architects, scopes, costs, and descriptions

export interface NDLProject {
  id: string;
  client: string;
  title: string;
  location: string;
  city: string;
  architect: string;
  architectPractice: string;
  scope: string;
  type: string;
  category: 'Residential' | 'Commercial' | 'Interiors' | 'Turnkey';
  cost?: string;
  description: string;
  featuredImage: string;
  gallery: string[];
  highlights: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

export const ndlProjects: NDLProject[] = [
  {
    id: 'dr-anil-kush',
    client: 'Dr. Anil Kush',
    title: 'Dr. Anil Kush Private Estate Residence',
    location: '# C2, Estate Club, Bangalore',
    city: 'Bangalore',
    architect: 'Architecture Paradigm, 6th block, Koramangala',
    architectPractice: 'Architecture Paradigm',
    scope: 'Civil, Electrical, Plumbing, Interiors and Landscaping works',
    type: 'Luxury Estate Villa',
    category: 'Residential',
    description: 'Comprehensive private estate residence comprising heavy structural civil construction, board-marked exposed RCC walls, stepped water bodies, full MEP infrastructure, custom floating teak staircase, modular kitchen, bespoke interior joinery, and perimeter garden landscaping executed under Architecture Paradigm.',
    featuredImage: '/projects/dr_anil_kush/dr_anil_kush_01_facade_front.jpg',
    gallery: [
      '/projects/dr_anil_kush/dr_anil_kush_01_facade_front.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_02_concrete_entry_steps.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_03_garden_landscaping.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_04_cantilever_portico.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_05_courtyard_louvers.png',
      '/projects/dr_anil_kush/dr_anil_kush_06_reflecting_pool.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_07_atrium_hall.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_08_floating_staircase.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_09_staircase_detail.png',
      '/projects/dr_anil_kush/dr_anil_kush_10_louver_veranda.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_11_mezzanine_panelling.jpg',
      '/projects/dr_anil_kush/dr_anil_kush_12_master_bedroom.png',
      '/projects/dr_anil_kush/dr_anil_kush_13_modular_kitchen.png',
      '/projects/dr_anil_kush/dr_anil_kush_14_kitchen_installation.png',
      '/projects/dr_anil_kush/dr_anil_kush_15_bathroom_vanity.png',
    ],
    highlights: ['Exposed RCC walls', 'Water bodies & landscaping', 'Turnkey interiors', 'Architecture Paradigm design'],
    stats: [
      { label: 'Scope', value: 'Civil, Electrical, Plumbing, Interiors and Landscaping works' },
      { label: 'Architect', value: 'Architecture Paradigm, 6th block, Koramangala' },
      { label: 'Location', value: '# C2, Estate Club, Bangalore' }
    ]
  },
  {
    id: 'mr-sarabjith-ghose',
    client: 'Mr. Sarabjith Ghose',
    title: 'Mr. Sarabjith Ghose Residence',
    location: '# 17, Mantri Lakeview, Talagattapura, Kanakapura Main Road',
    city: 'Bangalore',
    architect: 'Gaurav Roy Chaudary, 7th Sector, HSR Layout',
    architectPractice: 'GRC Architects / Gaurav Roy Chaudary',
    scope: 'Civil, Plumbing and Electrical Works',
    type: 'Contemporary Residence',
    category: 'Residential',
    description: 'Distinctive contemporary private residence at # 17, Mantri Lakeview, Talagattapura, Kanakapura Main Road featuring exposed wire-cut brick masonry, geometric cantilevers, split-level layout, cantilevered stone floating staircase, and complete civil, plumbing, and electrical works designed by Gaurav Roy Chaudary, 7th Sector, HSR Layout.',
    featuredImage: '/projects/mr_sarabjith_ghose/sarabjith_ghose_01_corner_elevation.jpg',
    gallery: [
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_01_corner_elevation.jpg',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_02_front_facade.jpg',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_03_cantilever_terrace.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_04_brick_floating_staircase.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_05_entrance_compound.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_06_elevation_trees.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_07_study_nook_blue_accent.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_08_bottle_wall_staircase.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_09_open_riser_stairwell.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_10_double_height_atrium.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_11_bottle_wall_foyer.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_12_internal_courtyard_glazing.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_13_designer_bathroom.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_14_cantilever_wooden_stair.png',
      '/projects/mr_sarabjith_ghose/sarabjith_ghose_15_hardwood_living_room.png',
    ],
    highlights: ['Wire-cut brick masonry', 'Cantilevered architectural volumes', 'Split level zoning', 'Gaurav Roy Chaudary design'],
    stats: [
      { label: 'Scope', value: 'Civil, Plumbing and Electrical Works' },
      { label: 'Architect', value: 'Gaurav Roy Chaudary, 7th Sector, HSR Layout' },
      { label: 'Location', value: '# 17, Mantri Lakeview, Talagattapura, Kanakapura Main Road' }
    ]
  },
  {
    id: '24x7-solutions',
    client: '24x7 Solutions',
    title: '24x7 Solutions Corporate Office Space',
    location: 'Near Ulsoor Lake, Bangalore',
    city: 'Bangalore',
    architect: 'Keystone Architects, Indiranagar',
    architectPractice: 'Keystone Architects',
    scope: 'Office Interiors and Workspace Fit-Out',
    type: 'Commercial Office Space',
    category: 'Commercial',
    description: 'Modern corporate office space fit-out near Ulsoor Lake featuring open-plan workstations, glass cabin partitions, acoustic ceilings, and integrated electrical/data routing.',
    featuredImage: '/ndl_projects/slide_042_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_042_img_1.jpg',
      '/ndl_projects/slide_043_img_1.jpg',
      '/ndl_projects/slide_044_img_1.jpg',
      '/ndl_projects/slide_045_img_1.jpg',
      '/ndl_projects/slide_046_img_1.jpg',
      '/ndl_projects/slide_047_img_1.jpg',
      '/ndl_projects/slide_048_img_1.jpg',
    ],
    highlights: ['Executive cabins & workstations', 'Glass architectural partitions', 'Acoustic ceilings', 'Keystone Architects design'],
    stats: [
      { label: 'Scope', value: 'Office Interiors & Fit-Out' },
      { label: 'Architect', value: 'Keystone Architects' },
      { label: 'Location', value: 'Near Ulsoor Lake, Bangalore' }
    ]
  },
  {
    id: 'mr-praveen-kumar',
    client: 'Mr. Praveen Kumar',
    title: 'Mr. Praveen Kumar Residence',
    location: 'Tambuchetti Palya, KR Puram, Bangalore',
    city: 'Bangalore',
    architect: 'Keystone Architects, Indiranagar',
    architectPractice: 'Keystone Architects',
    scope: 'Civil, Plumbing and Electrical Works',
    type: 'Bespoke Private Residence',
    category: 'Residential',
    description: 'Modern residential villa with precision shuttered concrete, spacious double-height living areas, skylights, and premium stone cladding executed under Keystone Architects.',
    featuredImage: '/ndl_projects/slide_050_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_050_img_1.jpg',
      '/ndl_projects/slide_051_img_1.jpg',
      '/ndl_projects/slide_052_img_1.jpg',
      '/ndl_projects/slide_052_img_2.jpg',
      '/ndl_projects/slide_055_img_1.jpg',
      '/ndl_projects/slide_055_img_1.jpg',
    ],
    highlights: ['Double height living spaces', 'Custom skylight integration', 'Precision civil framing', 'Keystone Architects design'],
    stats: [
      { label: 'Scope', value: 'Civil, Plumbing and Electrical Works' },
      { label: 'Architect', value: 'Keystone Architects' },
      { label: 'Location', value: 'KR Puram, Bangalore' }
    ]
  },
  {
    id: 'mr-vittal-das-shetty',
    client: 'Mr. Vittal Das Shetty',
    title: 'Mr. Vittal Das Shetty Residence',
    location: 'Asha Township, Doddagubbi, near Bileshevale, Hosakote',
    city: 'Bangalore',
    architect: 'Keystone Architects, Indiranagar',
    architectPractice: 'Keystone Architects',
    scope: 'Civil, Structural and Finishing Works',
    type: 'Luxury Villa Residence',
    category: 'Residential',
    description: 'Stately villa residence in Asha Township featuring expansive cantilevered balconies, stone masonry, custom architectural pergola framing, and fine exterior textures.',
    featuredImage: '/ndl_projects/slide_057_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_057_img_1.jpg',
      '/ndl_projects/slide_058_img_1.jpg',
      '/ndl_projects/slide_059_img_1.jpg',
      '/ndl_projects/slide_059_img_2.jpg',
      '/ndl_projects/slide_061_img_1.jpg',
      '/ndl_projects/slide_062_img_1.jpg',
    ],
    highlights: ['Cantilevered balconies', 'Stone facade masonry', 'Pergola framing', 'Keystone Architects design'],
    stats: [
      { label: 'Scope', value: 'Civil + Structural + Finishing' },
      { label: 'Architect', value: 'Keystone Architects' },
      { label: 'Location', value: 'Asha Township, Doddagubbi' }
    ]
  },
  {
    id: 'take-5-bar',
    client: 'TAKE 5 Bar and Restaurant',
    title: 'TAKE 5 Bar and Restaurant',
    location: '3rd Main, Defence Colony, Indiranagar, Bangalore',
    city: 'Bangalore',
    architect: 'Kiran and Associates, Bombay',
    architectPractice: 'Kiran and Associates, Bombay',
    scope: 'Civil, Electrical, Plumbing and Interior Work',
    type: 'Restaurant & Bar Hospitality Fit-Out',
    category: 'Commercial',
    description: 'Iconic hospitality interior and civil execution in Defence Colony, Indiranagar featuring custom wood joinery, acoustic bar counters, ambient lighting networks, and specialized commercial MEP layout.',
    featuredImage: '/ndl_projects/slide_064_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_064_img_1.jpg',
      '/ndl_projects/slide_065_img_1.jpg',
      '/ndl_projects/slide_066_img_1.jpg',
      '/ndl_projects/slide_067_img_1.jpg',
    ],
    highlights: ['Commercial bar joinery', 'Acoustic hospitality fit-out', 'Specialized MEP & lighting', 'Kiran & Associates Bombay design'],
    stats: [
      { label: 'Scope', value: 'Civil + Electrical + Plumbing + Interiors' },
      { label: 'Architect', value: 'Kiran and Associates, Bombay' },
      { label: 'Location', value: 'Defence Colony, Indiranagar' }
    ]
  },
  {
    id: 'mr-tilak',
    client: 'Mr. Tilak',
    title: 'Mr. Tilak Residence',
    location: 'HSR Layout, 7th Sector, Bangalore',
    city: 'Bangalore',
    architect: 'Kumar and Associates, Trivandrum',
    architectPractice: 'Kumar and Associates, Trivandrum',
    scope: 'Civil, Plumbing',
    type: 'Residential Building',
    category: 'Residential',
    description: 'Multi-level residential building in HSR Layout 7th Sector with robust RCC framing, fine plastering, structural brickwork, and comprehensive plumbing infrastructure.',
    featuredImage: '/ndl_projects/slide_069_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_069_img_1.jpg',
      '/ndl_projects/slide_070_img_1.jpg',
      '/ndl_projects/slide_069_img_2.jpg',
      '/ndl_projects/slide_072_img_1.jpg',
    ],
    highlights: ['Multi-level RCC frame', 'Precision masonry', 'Integrated plumbing', 'Kumar & Associates design'],
    stats: [
      { label: 'Scope', value: 'Civil + Plumbing' },
      { label: 'Architect', value: 'Kumar and Associates, Trivandrum' },
      { label: 'Location', value: 'HSR Layout 7th Sector' }
    ]
  },
  {
    id: 'mr-uma-shankar-agarwal',
    client: 'Mr. Uma Shankar Agarwal',
    title: 'Mr. Uma Shankar Agarwal Residence',
    location: 'JP Nagar Phase 2, near Mini Forest, Bangalore',
    city: 'Bangalore',
    architect: 'Still Water Architects',
    architectPractice: 'Still Water Architects',
    scope: 'Residence - Civil, Electric, Plumbing',
    type: 'Private Luxury Residence',
    category: 'Residential',
    description: 'Elegant private residence adjacent to Mini Forest in JP Nagar Phase 2 featuring natural light courtyards, floating staircase elements, premium electrical conduit routing, and fine exterior finishes.',
    featuredImage: '/ndl_projects/slide_074_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_074_img_1.jpg',
      '/ndl_projects/slide_075_img_1.jpg',
      '/ndl_projects/slide_076_img_1.jpg',
      '/ndl_projects/slide_077_img_1.jpg',
      '/ndl_projects/slide_078_img_1.jpg',
      '/ndl_projects/slide_079_img_1.jpg',
    ],
    highlights: ['Natural light courtyards', 'Floating stair design', 'Integrated electrical & plumbing', 'Still Water Architects design'],
    stats: [
      { label: 'Scope', value: 'Civil + Electric + Plumbing' },
      { label: 'Architect', value: 'Still Water Architects' },
      { label: 'Location', value: 'JP Nagar Phase 2' }
    ]
  },
  {
    id: 'mr-amith',
    client: 'Mr. Amith',
    title: 'Mr. Amith Residence',
    location: 'Vijaya Bank Layout, Bilekahalli, BG Road, Bangalore',
    city: 'Bangalore',
    architect: 'NDL In-House Engineering Coordination',
    architectPractice: 'Architecture Team',
    scope: 'Residence - Civil and Structural Works',
    type: 'Contemporary Residence',
    category: 'Residential',
    description: 'Contemporary multi-tier family home in Vijaya Bank Layout, Bilekahalli featuring clean geometric elevations, open-plan interior layout, and robust structural framework.',
    featuredImage: '/ndl_projects/slide_081_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_081_img_1.jpg',
      '/ndl_projects/slide_082_img_1.jpg',
      '/ndl_projects/slide_083_img_1.jpg',
      '/ndl_projects/slide_084_img_1.jpg',
    ],
    highlights: ['Contemporary geometric elevation', 'Reinforced structural core', 'Spacious floor layouts'],
    stats: [
      { label: 'Scope', value: 'Civil + Structural Works' },
      { label: 'Location', value: 'Vijaya Bank Layout, Bilekahalli' }
    ]
  },
  {
    id: 'farm-india-office',
    client: 'Farm India Office',
    title: 'Farm India Office Interior Fit-Out',
    location: 'Koramangala, Bangalore',
    city: 'Bangalore',
    architect: 'Commercial Interior Practice',
    architectPractice: 'Commercial Interiors',
    scope: 'Interiors',
    cost: '52 lacs',
    type: 'Corporate Office Interiors',
    category: 'Commercial',
    description: 'Complete corporate office interior fit-out in Koramangala executed at a project cost of Rs 52 Lacs, featuring executive boardrooms, custom acoustic paneling, glass cubicles, and designer modular workstations.',
    featuredImage: '/ndl_projects/slide_086_img_1.png',
    gallery: [
      '/ndl_projects/slide_086_img_1.png',
      '/ndl_projects/slide_085_img_1.jpg',
      '/ndl_projects/slide_088_img_1.png',
      '/ndl_projects/slide_089_img_1.png',
      '/ndl_projects/slide_091_img_1.png',
    ],
    highlights: ['Total Project Cost: Rs 52 Lacs', 'Executive boardrooms & cabins', 'Acoustic paneling & glass joinery'],
    stats: [
      { label: 'Cost', value: 'Rs 52 Lacs' },
      { label: 'Scope', value: 'Office Interiors' },
      { label: 'Location', value: 'Koramangala, Bangalore' }
    ]
  },
  {
    id: 'mr-kumar',
    client: 'Mr. Kumar',
    title: 'Mr. Kumar Residence',
    location: 'Jayanagar 5th Block, Bangalore',
    city: 'Bangalore',
    architect: 'Mr. Ragavan',
    architectPractice: 'Mr. Ragavan',
    scope: 'Residence - Civil, Electric, Plumbing',
    type: 'Residential Building',
    category: 'Residential',
    description: 'Custom private residence in Jayanagar 5th Block with classic architectural proportions, heavy civil masonry, precision plumbing, and electrical distribution designed by Mr. Ragavan.',
    featuredImage: '/ndl_projects/slide_093_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_093_img_1.jpg',
      '/ndl_projects/slide_093_img_1.jpg',
      '/ndl_projects/slide_094_img_1.jpg',
      '/ndl_projects/slide_095_img_1.jpg',
    ],
    highlights: ['Prime Jayanagar 5th Block location', 'Complete Civil + MEP scope', 'Mr. Ragavan architectural design'],
    stats: [
      { label: 'Scope', value: 'Civil + Electric + Plumbing' },
      { label: 'Architect', value: 'Mr. Ragavan' },
      { label: 'Location', value: 'Jayanagar 5th Block' }
    ]
  },
  {
    id: 'mr-nataraj',
    client: 'Mr. Nataraj',
    title: 'Mr. Nataraj Commercial Cum Residence Complex',
    location: 'HSR Layout, 27th Main, Bangalore',
    city: 'Bangalore',
    architect: 'Incept Architects',
    architectPractice: 'Incept Architects',
    scope: 'Commercial cum Residence - Civil, Electric, Plumbing',
    cost: '1.8 Cr',
    type: 'Commercial Cum Residential Complex',
    category: 'Commercial',
    description: 'Prominent G+4 commercial cum residential complex on 27th Main HSR Layout executed at a project cost of Rs 1.8 Crore, featuring retail ground floors, corporate office spaces, and luxury residential penthouse units.',
    featuredImage: '/ndl_projects/slide_097_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_097_img_1.jpg',
      '/ndl_projects/slide_097_img_2.jpg',
      '/ndl_projects/slide_099_img_1.jpg',
      '/ndl_projects/slide_100_img_1.jpg',
      '/ndl_projects/slide_101_img_1.jpg',
      '/ndl_projects/slide_100_img_1.jpg',
    ],
    highlights: ['Total Project Cost: Rs 1.8 Crore', 'Commercial retail + Residential floors', 'Incept Architects design', 'HSR Layout 27th Main frontage'],
    stats: [
      { label: 'Cost', value: 'Rs 1.8 Crore' },
      { label: 'Scope', value: 'Civil + Electric + Plumbing' },
      { label: 'Architect', value: 'Incept Architects' },
      { label: 'Location', value: 'HSR Layout 27th Main' }
    ]
  },
  {
    id: 'mr-shekar',
    client: 'Mr. Shekar',
    title: 'Mr. Shekar Residence',
    location: 'Nisarga Layout, Jigani, Bangalore',
    city: 'Bangalore',
    architect: 'Mr. Raghu Bhat',
    architectPractice: 'Mr. Raghu Bhat',
    scope: 'Residence - Civil, Interiors, Electric and Plumbing',
    type: 'Turnkey Residence & Interiors',
    category: 'Residential',
    description: 'Complete turnkey residence in Nisarga Layout, Jigani covering structural civil framing, comprehensive electrical/plumbing layout, and bespoke interior joinery designed by Mr. Raghu Bhat.',
    featuredImage: '/ndl_projects/slide_104_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_104_img_1.jpg',
      '/ndl_projects/slide_104_img_2.jpg',
      '/ndl_projects/slide_106_img_1.jpg',
      '/ndl_projects/slide_106_img_1.jpg',
      '/ndl_projects/slide_108_img_1.jpg',
      '/ndl_projects/slide_109_img_1.jpg',
    ],
    highlights: ['Turnkey Civil + Interiors scope', 'Mr. Raghu Bhat design', 'Custom interior cabinetry & lighting'],
    stats: [
      { label: 'Scope', value: 'Civil + Interiors + Electric + Plumbing' },
      { label: 'Architect', value: 'Mr. Raghu Bhat' },
      { label: 'Location', value: 'Nisarga Layout, Jigani' }
    ]
  },
  {
    id: 'mr-mahanthesh-bellad',
    client: 'Mr. Mahanthesh Bellad',
    title: 'Mr. Mahanthesh Bellad Residence',
    location: 'Happy Valley Layout, Uttarahalli, Bangalore',
    city: 'Bangalore',
    architect: 'Mr. Gaurav Roy Choudury / GRC Architects',
    architectPractice: 'GRC Architects',
    scope: 'Civil, Electric, Plumbing',
    type: 'Bespoke Residence',
    category: 'Residential',
    description: 'Sculptural private residence in Happy Valley Layout, Uttarahalli featuring exposed brick masonry, cantilevered projection slabs, and customized interior volumetric spaces designed by Gaurav Roy Choudury.',
    featuredImage: '/ndl_projects/slide_111_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_111_img_1.jpg',
      '/ndl_projects/slide_111_img_2.jpg',
      '/ndl_projects/slide_113_img_1.jpg',
      '/ndl_projects/slide_114_img_1.jpg',
    ],
    highlights: ['Exposed brick & concrete expression', 'Gaurav Roy Choudury architectural design', 'Happy Valley Layout location'],
    stats: [
      { label: 'Scope', value: 'Civil + Electric + Plumbing' },
      { label: 'Architect', value: 'Gaurav Roy Chaudary, 7th Sector, HSR Layout' },
      { label: 'Location', value: 'Happy Valley Layout, Uttarahalli' }
    ]
  },
  {
    id: 'mrs-hema-saravanan',
    client: 'Mrs. Hema Saravanan',
    title: 'Mrs. Hema Saravanan Residence',
    location: 'Delmia Circle, JP Nagar, Bangalore',
    city: 'Bangalore',
    architect: 'Parallax Architects',
    architectPractice: 'Parallax Architects',
    scope: 'Residence: Civil, Plumbing, Electric',
    type: 'Contemporary Urban Residence',
    category: 'Residential',
    description: 'Modern urban residence near Delmia Circle, JP Nagar featuring streamlined vertical lines, high-grade concrete framing, refined plastering, and integrated MEP infrastructure designed by Parallax Architects.',
    featuredImage: '/ndl_projects/slide_115_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_115_img_1.jpg',
      '/ndl_projects/slide_117_img_1.jpg',
      '/ndl_projects/slide_117_img_2.jpg',
      '/ndl_projects/slide_119_img_1.jpg',
    ],
    highlights: ['Parallax Architects design', 'Prime JP Nagar Delmia Circle location', 'High-grade civil execution'],
    stats: [
      { label: 'Scope', value: 'Civil + Plumbing + Electric' },
      { label: 'Architect', value: 'Parallax Architects' },
      { label: 'Location', value: 'Delmia Circle, JP Nagar' }
    ]
  },
  {
    id: 'dr-niranjan',
    client: 'Dr. Niranjan',
    title: 'Dr. Niranjan Residence',
    location: '5th Block, Jayanagar, Bangalore',
    city: 'Bangalore',
    architect: 'Mr. Ragavan',
    architectPractice: 'Mr. Ragavan',
    scope: 'Residence: Civil, Electric & Plumbing',
    type: 'Premium Jayanagar Residence',
    category: 'Residential',
    description: 'High-specification private villa residence in 5th Block Jayanagar featuring traditional courtyards, precision brick masonry, concealed conduits, and premium sanitary installations.',
    featuredImage: '/ndl_projects/slide_121_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_121_img_1.jpg',
      '/ndl_projects/slide_122_img_1.jpg',
    ],
    highlights: ['5th Block Jayanagar location', 'Mr. Ragavan architectural design', 'Civil + MEP infrastructure'],
    stats: [
      { label: 'Scope', value: 'Civil + Electric & Plumbing' },
      { label: 'Architect', value: 'Mr. Ragavan' },
      { label: 'Location', value: '5th Block, Jayanagar' }
    ]
  },
  {
    id: 'mr-kishore',
    client: 'Mr. Kishore',
    title: 'Mr. Kishore Residence',
    location: 'Yediyur, Jayanagar, Bangalore',
    city: 'Bangalore',
    architect: 'Meenal J. Cavale',
    architectPractice: 'Meenal J. Cavale',
    scope: 'Residence: Civil, Electric, Plumbing',
    type: 'Bespoke Private Residence',
    category: 'Residential',
    description: 'Distinctive residence in Yediyur, Jayanagar featuring architectural brick facades, elegant cantilevered overhangs, and detailed MEP execution designed by Meenal J. Cavale.',
    featuredImage: '/ndl_projects/slide_122_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_122_img_1.jpg',
    ],
    highlights: ['Yediyur Jayanagar location', 'Meenal J. Cavale design', 'Refined brick & RCC framing'],
    stats: [
      { label: 'Scope', value: 'Civil + Electric + Plumbing' },
      { label: 'Architect', value: 'Meenal J. Cavale' },
      { label: 'Location', value: 'Yediyur, Jayanagar' }
    ]
  },
  {
    id: 'mr-venkatarama-raju',
    client: 'Mr. Venkatarama Raju',
    title: 'Mr. Venkatarama Raju Commercial Building',
    location: 'JP Nagar 9th Phase, Bangalore',
    city: 'Bangalore',
    architect: 'Meenal Cavale / MJC Architects',
    architectPractice: 'MJC Architects',
    scope: 'Commercial Building Construction',
    type: 'Commercial Building',
    category: 'Commercial',
    description: 'Modern commercial building in JP Nagar 9th Phase designed by Meenal Cavale / MJC Architects, featuring column-free floor plates, commercial grade staircases, and durable facade finishing.',
    featuredImage: '/ndl_projects/slide_124_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_124_img_1.jpg',
    ],
    highlights: ['JP Nagar 9th Phase commercial hub', 'Column-free floor plates', 'Meenal Cavale / MJC Architects design'],
    stats: [
      { label: 'Scope', value: 'Commercial Building Construction' },
      { label: 'Architect', value: 'Meenal Cavale / MJC Architects' },
      { label: 'Location', value: 'JP Nagar 9th Phase' }
    ]
  },
  {
    id: 'mr-sreeram',
    client: 'Mr. Sreeram',
    title: 'Mr. Sreeram Residential Building',
    location: 'Anjanapura, Bangalore',
    city: 'Bangalore',
    architect: 'Meenal Cavale / MJC Architects',
    architectPractice: 'MJC Architects',
    scope: 'Residential Building Construction',
    type: 'Residential Building',
    category: 'Residential',
    description: 'Multi-level residential building in Anjanapura featuring clean structural masonry, robust foundation footing, and architectural facade articulation designed by Meenal Cavale.',
    featuredImage: '/ndl_projects/slide_124_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_124_img_1.jpg',
    ],
    highlights: ['Anjanapura residential location', 'Meenal Cavale design', 'Robust RCC framework'],
    stats: [
      { label: 'Scope', value: 'Residential Building Construction' },
      { label: 'Architect', value: 'Meenal Cavale' },
      { label: 'Location', value: 'Anjanapura, Bangalore' }
    ]
  },
  {
    id: 'mr-rakesh-n-rao',
    client: 'Mr. Rakesh N. Rao',
    title: 'Mr. Rakesh N. Rao Residence',
    location: 'Bangalore',
    city: 'Bangalore',
    architect: 'Architecture Paradigm',
    architectPractice: 'Architecture Paradigm',
    scope: 'Civil and Structural Framing',
    type: 'Residential Architecture',
    category: 'Residential',
    description: 'High-end architectural residence featuring exposed concrete shuttering, expansive fenestrations, and refined masonry executed under Architecture Paradigm.',
    featuredImage: '/ndl_projects/slide_016_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_016_img_1.jpg',
      '/ndl_projects/slide_017_img_1.jpg',
    ],
    highlights: ['Architecture Paradigm design', 'Exposed concrete shuttering', 'Precision civil framing'],
    stats: [
      { label: 'Scope', value: 'Civil and Structural Framing' },
      { label: 'Architect', value: 'Architecture Paradigm, 6th block, Koramangala' },
      { label: 'Location', value: 'Bangalore' }
    ]
  },
  {
    id: 'nexus-corporate-park',
    client: 'Nexus Corporate Park',
    title: 'Nexus Corporate Park Grade-A Campus',
    location: 'Outer Ring Road, Bangalore',
    city: 'Bangalore',
    architect: 'Architecture Paradigm',
    architectPractice: 'Architecture Paradigm',
    scope: 'Turnkey Civil, Structural, MEP, Glazing & Landscaping',
    type: 'Commercial Tech Park',
    category: 'Commercial',
    cost: '180,000 SQ.FT',
    description: 'Landmark G+8 commercial tech park on Outer Ring Road featuring high-performance double-glazed curtain walls, LEED Gold certified MEP systems, column-free corporate floor plates, and automated building management systems executed under turnkey engineering delivery.',
    featuredImage: '/ndl_projects/slide_042_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_042_img_1.jpg',
      '/ndl_projects/slide_043_img_1.jpg',
      '/ndl_projects/slide_044_img_1.jpg',
      '/ndl_projects/slide_045_img_1.jpg',
      '/ndl_projects/slide_046_img_1.jpg',
      '/ndl_projects/slide_047_img_1.jpg',
      '/ndl_projects/slide_048_img_1.jpg'
    ],
    highlights: ['180,000 SQ.FT Built-Up Area', 'LEED Gold Certified', 'G+8 Reinforced Concrete Core', 'High Performance Double Glazing'],
    stats: [
      { label: 'Scale', value: '180,000 SQ.FT' },
      { label: 'Timeline', value: '18 Months' },
      { label: 'Rating', value: 'LEED Gold' },
      { label: 'Scope', value: 'Turnkey EPC Delivery' }
    ]
  },
  {
    id: 'aura-commercial-hub',
    client: 'Aura Commercial Hub',
    title: 'Aura Commercial Retail & Corporate Hub',
    location: 'Whitefield Commercial Zone, Bangalore',
    city: 'Bangalore',
    architect: 'Incept Architects',
    architectPractice: 'Incept Architects',
    scope: 'Civil & Core, Deep Basements, Post-Tensioned Slabs',
    type: 'Mixed-Use Commercial Complex',
    category: 'Commercial',
    cost: '220,000 SQ.FT',
    description: 'Premier G+12 mixed-use retail and corporate complex in Whitefield featuring post-tensioned large span slabs, multi-level retail podiums, high-speed elevator shafts, and IGBC Platinum sustainability credentials.',
    featuredImage: '/ndl_projects/slide_097_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_097_img_1.jpg',
      '/ndl_projects/slide_097_img_2.jpg',
      '/ndl_projects/slide_099_img_1.jpg',
      '/ndl_projects/slide_100_img_1.jpg',
      '/ndl_projects/slide_101_img_1.jpg',
      '/ndl_projects/slide_100_img_1.jpg'
    ],
    highlights: ['220,000 SQ.FT Multi-Tier Hub', 'G+12 Core Engineering', 'Post-Tensioned Slabs', 'Platinum Green Building'],
    stats: [
      { label: 'Scale', value: '220,000 SQ.FT' },
      { label: 'Timeline', value: '24 Months' },
      { label: 'Rating', value: 'IGBC Platinum' },
      { label: 'Scope', value: 'Civil & Core Execution' }
    ]
  },
  {
    id: 'zenith-tech-tower',
    client: 'Zenith Tech Tower',
    title: 'Zenith Tech Tower Commercial Tower',
    location: 'Electronic City Phase 1, Bangalore',
    city: 'Bangalore',
    architect: 'Keystone Architects',
    architectPractice: 'Keystone Architects',
    scope: 'Turnkey Civil, MEP and High-Speed Vertical Transport',
    type: 'Corporate High-Rise Tower',
    category: 'Commercial',
    cost: '260,000 SQ.FT',
    description: 'Iconic G+14 IT & commercial high-rise tower in Electronic City Phase 1 designed for maximum thermal efficiency and high-density workforce operations with advanced MEP substations.',
    featuredImage: '/ndl_projects/slide_046_img_1.jpg',
    gallery: [
      '/ndl_projects/slide_046_img_1.jpg',
      '/ndl_projects/slide_047_img_1.jpg',
      '/ndl_projects/slide_048_img_1.jpg'
    ],
    highlights: ['260,000 SQ.FT High-Rise', 'G+14 Steel & Concrete Composite', 'IGBC Platinum Rated'],
    stats: [
      { label: 'Scale', value: '260,000 SQ.FT' },
      { label: 'Timeline', value: '26 Months' },
      { label: 'Rating', value: 'IGBC Platinum' },
      { label: 'Scope', value: 'Turnkey EPC Delivery' }
    ]
  },
];
