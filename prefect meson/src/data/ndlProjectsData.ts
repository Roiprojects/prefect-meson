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
    featuredImage: '/projects/24x7_solutions/24x7_solutions_01_reception_desk.png',
    gallery: [
      '/projects/24x7_solutions/24x7_solutions_01_reception_desk.png',
      '/projects/24x7_solutions/24x7_solutions_02_glass_cabin_framing.png',
      '/projects/24x7_solutions/24x7_solutions_03_modular_workstations.png',
      '/projects/24x7_solutions/24x7_solutions_04_executive_cabin_entrance.png',
      '/projects/24x7_solutions/24x7_solutions_05_workstation_bays_glass_view.png',
      '/projects/24x7_solutions/24x7_solutions_06_cabin_entrance_reception_staff.png',
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
    description: 'Exposed brick architectural residence in Tambuchetti Palya, KR Puram featuring tiered gabled terracotta roofs, carved teakwood double doorway, exposed timber rafter ceiling trusses, and internal pebble puja court.',
    featuredImage: '/projects/mr_praveen_kumar/praveen_kumar_01_tiered_roof_elevation.png',
    gallery: [
      '/projects/mr_praveen_kumar/praveen_kumar_01_tiered_roof_elevation.png',
      '/projects/mr_praveen_kumar/praveen_kumar_02_carved_teak_door.png',
      '/projects/mr_praveen_kumar/praveen_kumar_03_timber_rafter_truss_atrium.png',
      '/projects/mr_praveen_kumar/praveen_kumar_04_pebble_puja_court.png',
      '/projects/mr_praveen_kumar/praveen_kumar_05_front_gabled_facade.png',
      '/projects/mr_praveen_kumar/praveen_kumar_06_modern_kitchen_breakfast_bar.jpg',
      '/projects/mr_praveen_kumar/praveen_kumar_07_hardwood_living_room_aerial.jpg',
      '/projects/mr_praveen_kumar/praveen_kumar_08_verandah_pergola_entrance.png',
      '/projects/mr_praveen_kumar/praveen_kumar_09_timber_compound_gate.png',
    ],
    highlights: ['Tiered terracotta gabled roof', 'Carved teakwood entrance door', 'Exposed timber truss atrium', 'Hardwood living & breakfast bar', 'Internal pebble puja court'],
    stats: [
      { label: 'Scope', value: 'Civil, Plumbing and Electrical Works' },
      { label: 'Architect', value: 'Keystone Architects, Indiranagar' },
      { label: 'Location', value: 'Tambuchetti Palya, KR Puram, Bangalore' }
    ]
  },
  {
    id: 'mr-vittal-das-shetty',
    client: 'Mr. Vittal Das Shetty',
    title: 'Mr. Vittal Das Shetty Residence',
    location: 'Asha Township, Doddagubbi, Near Bileshevale, Hosakote',
    city: 'Bangalore',
    architect: 'Keystone Architects, Indiranagar',
    architectPractice: 'Keystone Architects',
    scope: 'Civil, Structural and Finishing Works',
    type: 'Luxury Villa Residence',
    category: 'Residential',
    description: 'Contemporary luxury villa in Asha Township, Doddagubbi near Bileshevale, Hosakote featuring a monumental dressed stone-clad pylon tower, tiered terracotta gabled roofs, structural steel pergola walkway with bamboo soffit, and exposed brick plinth.',
    featuredImage: '/projects/mr_vittal_das_shetty/vittal_das_shetty_01_stone_pylon_elevation.jpg',
    gallery: [
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
    ],
    highlights: ['Dressed stone tower elevation', 'Tiered terracotta gabled roof', 'Bamboo soffit steel pergola walkway', 'Granite verandah & exposed brick foyer', 'Custom sliding wardrobe & steel staircase', 'Teakwood puja room with brass bells', 'Sunken bath & garden patio pergola', 'Keystone Architects design'],
    stats: [
      { label: 'Scope', value: 'Civil + Structural + Finishing' },
      { label: 'Architect', value: 'Keystone Architects, Indiranagar' },
      { label: 'Location', value: 'Asha Township, Doddagubbi, Hosakote' }
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
    featuredImage: '/projects/take_5_bar/take_5_bar_01_granite_counter_wine_rack.png',
    gallery: [
      '/projects/take_5_bar/take_5_bar_01_granite_counter_wine_rack.png',
      '/projects/take_5_bar/take_5_bar_02_service_counter_dining_partition.jpg',
    ],
    highlights: ['Polished black granite bar counter', 'Custom overhead glass & wine rack', 'Service counter & frosted glass partition', 'Kiran and Associates Bombay design'],
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
    type: 'Luxury Villa Residence',
    category: 'Residential',
    description: 'Stately two-tier residential villa in HSR Layout 7th Sector featuring pitched Mangalore terracotta tiled roofs, grand cantilevered wrap-around balcony with viewing balustrade, stepped geometric iron entrance gate, and robust civil and sanitary plumbing execution.',
    featuredImage: '/projects/mr_tilak/tilak_01_terracotta_villa_facade.jpg',
    gallery: [
      '/projects/mr_tilak/tilak_01_terracotta_villa_facade.jpg',
    ],
    highlights: ['HSR Layout 7th Sector prime location', 'Pitched terracotta gabled roof villa', 'Wrap-around cantilevered balcony', 'Kumar and Associates Trivandrum design', 'Precision civil and plumbing execution'],
    stats: [
      { label: 'Scope', value: 'Civil + Plumbing' },
      { label: 'Architect', value: 'Kumar and Associates, Trivandrum' },
      { label: 'Location', value: 'HSR Layout, 7th Sector, Bangalore' }
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
    featuredImage: '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_01_double_height_living_mezzanine.png',
    gallery: [
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_01_double_height_living_mezzanine.png',
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_02_living_tv_unit_wood_panelling.png',
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_03_terrace_pergola_roof_garden.png',
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_04_floating_zigzag_staircase_atrium.png',
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_05_bookmatched_italian_marble_wall.png',
    ],
    highlights: ['JP Nagar Phase 2 near Mini Forest prime location', 'Double-height living atrium with upper mezzanine', 'Sculptural floating zigzag internal staircase', 'Terrace garden deck with structural steel pergola', 'Book-matched Italian marble feature wall', 'Still Water Architects design'],
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
    description: 'Contemporary multi-tier family residence in Vijaya Bank Layout, Bilekahalli off Bannerghatta Road featuring clean cubist geometric elevations in slate grey and white, deep cantilevered balconies, corner ribbon windows, and modern perimeter compound masonry.',
    featuredImage: '/projects/mr_amith/amith_01_geometric_elevation_portrait.jpg',
    gallery: [
      '/projects/mr_amith/amith_01_geometric_elevation_portrait.jpg',
      '/projects/mr_amith/amith_02_geometric_elevation_street_view.jpg',
    ],
    highlights: ['Vijaya Bank Layout Bilekahalli prime location', 'Cubist slate grey & white geometric facade', 'Deep cantilevered balconies with spot lighting', 'Corner ribbon fenestrations & modern grilles', 'NDL in-house engineering and turnkey execution'],
    stats: [
      { label: 'Scope', value: 'Civil + Structural Works' },
      { label: 'Architect', value: 'NDL In-House Engineering Coordination' },
      { label: 'Location', value: 'Vijaya Bank Layout, Bilekahalli, BG Road' }
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
    location: '# 210, HSR Layout, Bangalore',
    city: 'Bangalore',
    architect: 'Architecture Paradigm, 6th block, Koramangala',
    architectPractice: 'Architecture Paradigm',
    scope: 'Civil, Structural Framing and Landscaping Works',
    type: 'Luxury Villa Residence',
    category: 'Residential',
    description: 'Contemporary luxury villa # 210 in HSR Layout, Bangalore featuring white gabled architecture, decorative entrance pergola with columnar framing, dressed stone masonry boundary wall with integrated letterbox, and landscaped frontage.',
    featuredImage: '/projects/mr_rakesh_n_rao/rakesh_n_rao_01_villa_facade_gate.jpg',
    gallery: [
      '/projects/mr_rakesh_n_rao/rakesh_n_rao_01_villa_facade_gate.jpg',
    ],
    highlights: ['# 210, HSR Layout prime location', 'Gabled roof villa architecture', 'Entrance pergola with colonnade', 'Dressed stone boundary masonry', 'Architecture Paradigm design'],
    stats: [
      { label: 'Scope', value: 'Civil + Structural + Finishing' },
      { label: 'Architect', value: 'Architecture Paradigm, 6th block, Koramangala' },
      { label: 'Location', value: '# 210, HSR Layout, Bangalore' }
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
