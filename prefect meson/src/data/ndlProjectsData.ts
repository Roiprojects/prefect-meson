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
    description: 'Comprehensive private estate residence comprising heavy structural civil construction, board-marked exposed RCC walls, cantilevered portico, stepped water bodies, full MEP infrastructure, custom floating teak staircase, modular kitchen, bespoke interior joinery, and perimeter garden landscaping executed under Architecture Paradigm.',
    featuredImage: '/projects/dr_anil_kush/dr_anil_kush_01_facade_elevation.jpg',
    gallery: [
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
    location: '# 17, Mantri Lakeview Talagatpura, Kanakpura Main Road',
    city: 'Bangalore',
    architect: 'Gaurav Roy Chaudary, 7th Sector, HSR Layout',
    architectPractice: 'GRC Architects / Gaurav Roy Chaudary',
    scope: 'Civil, Plumbing and Electrical Works',
    type: 'Contemporary Residence',
    category: 'Residential',
    description: 'Distinctive contemporary private residence at # 17, Mantri Lakeview Talagatpura, Kanakpura Main Road featuring exposed wire-cut brick masonry, geometric cantilevers, split-level layout, cantilevered stone floating staircase, signature bottle-glass light walls, hardwood living areas with bi-fold deck doors, modular kitchen, and complete civil, plumbing, and electrical works designed by Gaurav Roy Chaudary, 7th Sector, HSR Layout.',
    featuredImage: '/projects/mr_sarabjith_ghose/sarabjith_ghose_01_corner_elevation_wide.jpg',
    gallery: [
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
    title: '24x7 Solutions Office Space',
    location: 'Near Ulsoor Lake, Bangalore',
    city: 'Bangalore',
    architect: 'Keystone Architects, Indiranagar',
    architectPractice: 'Keystone Architects',
    scope: 'Office Interiors & Workspace Fit-Out',
    type: 'Corporate Office Interiors',
    category: 'Interiors',
    description: 'Contemporary corporate office space fit-out near Ulsoor Lake featuring curved reception desk, acoustic ceilings, modular workstation framing, glass executive cubicles, and integrated electrical routing designed by Keystone Architects, Indiranagar.',
    featuredImage: '/projects/24x7_solutions/24x7_solutions_01_reception_desk.png',
    gallery: [
      '/projects/24x7_solutions/24x7_solutions_01_reception_desk.png',
      '/projects/24x7_solutions/24x7_solutions_02_workstations_ceiling_lighting.png',
      '/projects/24x7_solutions/24x7_solutions_03_glass_cabin_partition_framing.png',
      '/projects/24x7_solutions/24x7_solutions_04_executive_cubicle_sliding_door.png',
      '/projects/24x7_solutions/24x7_solutions_05_interior_finishing_electrical_testing.png',
      '/projects/24x7_solutions/24x7_solutions_06_interior_painting_drywall_finishing.png',
      '/projects/24x7_solutions/24x7_solutions_07_executive_cabin_glass_inspection.png',
      '/projects/24x7_solutions/24x7_solutions_08_glazed_cubicles_corridor_entrance.png'
    ],
    highlights: ['Curved branded reception desk', 'Modular workstation framework', 'Glass executive cabins', 'Keystone Architects design'],
    stats: [
      { label: 'Scope', value: 'Office Interiors & Fit-Out' },
      { label: 'Architect', value: 'Keystone Architects, Indiranagar' },
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
    description: 'Exposed brick architectural residence in Tambuchetti Palya, KR Puram featuring tiered gabled terracotta roofs, handcrafted carved teakwood double entrance door, multi-tier exposed timber rafter truss ceiling atrium, and landscaped driveway executed under Keystone Architects, Indiranagar.',
    featuredImage: '/projects/mr_praveen_kumar/praveen_kumar_01_front_gabled_elevation.png',
    gallery: [
      '/projects/mr_praveen_kumar/praveen_kumar_01_front_gabled_elevation.png',
      '/projects/mr_praveen_kumar/praveen_kumar_02_timber_rafter_truss_atrium.png',
      '/projects/mr_praveen_kumar/praveen_kumar_03_tiered_roof_side_elevation.png',
      '/projects/mr_praveen_kumar/praveen_kumar_04_driveway_wide_facade_view.jpg',
      '/projects/mr_praveen_kumar/praveen_kumar_05_carved_teak_double_door.png'
    ],
    highlights: ['Tiered terracotta gabled roof', 'Carved teakwood double entrance door', 'Exposed timber truss atrium', 'Keystone Architects design'],
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
      '/projects/mr_vittal_das_shetty/vittal_das_shetty_13_clerestory_patio_foliage.png'
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
    location: '3rd Main, Defence Colony, Indiranagar',
    city: 'Bangalore',
    architect: 'Kiran and Associate, Bombay',
    architectPractice: 'Kiran and Associates, Bombay',
    scope: 'Civil, Electrical, Plumbing, Interior Work',
    type: 'Restaurant & Bar Hospitality Fit-Out',
    category: 'Interiors',
    description: 'Iconic hospitality interior and civil execution in Defence Colony, Indiranagar featuring custom wood joinery, acoustic bar counters, ambient lighting networks, and specialized commercial MEP layout.',
    featuredImage: '/projects/take_5_bar/take_5_bar_01_granite_counter_wine_rack.png',
    gallery: [
      '/projects/take_5_bar/take_5_bar_01_granite_counter_wine_rack.png',
      '/projects/take_5_bar/take_5_bar_02_service_counter_dining_partition.jpg'
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
      '/projects/mr_tilak/tilak_01_terracotta_villa_facade.jpg'
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
      '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_05_bookmatched_italian_marble_wall.png'
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
      '/projects/mr_amith/amith_02_geometric_elevation_street_view.jpg'
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
    cost: '14,000 SQ.FT',
    type: 'Corporate Office Interiors',
    category: 'Interiors',
    description: 'Complete corporate office interior fit-out in Koramangala featuring executive boardrooms, custom acoustic paneling, glass cubicles, and designer modular workstations.',
    featuredImage: '/projects/farm_india_office/farm_india_01_open_workspace_ducted_ac.png',
    gallery: [
      '/projects/farm_india_office/farm_india_01_open_workspace_ducted_ac.png',
      '/projects/farm_india_office/farm_india_02_executive_cabin_workstation.png',
      '/projects/farm_india_office/farm_india_03_l_shaped_modular_desk.png',
      '/projects/farm_india_office/farm_india_04_glass_cabin_timber_partitions.png',
      '/projects/farm_india_office/farm_india_05_workspace_fitout_hardwood_flooring.png',
      '/projects/farm_india_office/farm_india_06_corporate_pantry_kitchenette.png',
      '/projects/farm_india_office/farm_india_07_corporate_restroom_dual_vanity.png',
      '/projects/farm_india_office/farm_india_08_restroom_sanitary_fixtures.png'
    ],
    highlights: [ 'Executive boardrooms & cabins', 'Acoustic paneling & glass joinery'],
    stats: [
      
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
    description: 'Custom luxury private residence in Jayanagar 5th Block featuring multi-tier contemporary facade elevations, expansive Italian marble living lounge, exquisite backlit onyx puja mandir, designer modular kitchen with granite countertops, and lush balcony garden terraces, executed with complete civil, electrical, and plumbing infrastructure designed by Mr. Ragavan.',
    featuredImage: '/projects/mr_kumar/kumar_01_contemporary_residence_facade.png',
    gallery: [
      '/projects/mr_kumar/kumar_01_contemporary_residence_facade.png',
      '/projects/mr_kumar/kumar_02_italian_marble_living_lounge.png',
      '/projects/mr_kumar/kumar_03_backlit_onyx_puja_mandir.png',
      '/projects/mr_kumar/kumar_04_modular_kitchen_granite_counter.png',
      '/projects/mr_kumar/kumar_05_living_room_balcony_garden.png'
    ],
    highlights: [
      'Prime Jayanagar 5th Block location',
      'Multi-tier contemporary facade elevation',
      'Italian marble living lounge & balcony garden',
      'Backlit golden onyx puja mandir',
      'Designer modular kitchen & granite finishes',
      'Mr. Ragavan architectural design & civil MEP scope'
    ],
    stats: [
      { label: 'Scope', value: 'Civil + Electric + Plumbing' },
      { label: 'Architect', value: 'Mr. Ragavan' },
      { label: 'Location', value: 'Jayanagar 5th Block, Bangalore' }
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
    scope: 'Civil, Electrical, Plumbing',
    cost: '28,000 SQ.FT',
    type: 'Commercial Cum Residential Complex',
    category: 'Commercial',
    description: 'Prominent G+4 commercial cum residential complex on 27th Main HSR Layout featuring ground floor retail showroom frontage (AJFAN Dates & Nuts), basement parking ramp, upper corporate office floors, and luxury residential penthouse units designed by Incept Architects.',
    featuredImage: '/projects/mr_nataraj/nataraj_01_commercial_complex_street_view.png',
    gallery: [
      '/projects/mr_nataraj/nataraj_01_commercial_complex_street_view.png',
      '/projects/mr_nataraj/nataraj_02_retail_showroom_elevation.png',
      '/projects/mr_nataraj/nataraj_03_residential_penthouse_balcony_elevation.png',
      '/projects/mr_nataraj/nataraj_04_hsr_layout_27th_main_avenue_perspective.png'
    ],
    highlights: [
      'Prime HSR Layout 27th Main commercial frontage',
      'G+4 Commercial retail showroom + office + residential penthouse',
      'Incept Architects architectural design',
      'Turnkey civil, electrical, and plumbing infrastructure'
    ],
    stats: [
      
      { label: 'Scope', value: 'Civil + Electric + Plumbing' },
      { label: 'Architect', value: 'Incept Architects' },
      { label: 'Location', value: 'HSR Layout, 27th Main, Bangalore' }
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
      '/ndl_projects/slide_109_img_1.jpg'
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
      '/ndl_projects/slide_114_img_1.jpg'
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
    description: 'Modern urban contemporary residence near Delmia Circle, JP Nagar featuring a striking vertical slate-clad facade, architectural screening louvers, internal double-height courtyard with a living plumeria tree, and an expansive terrace garden with vertical living green wall, executed with comprehensive civil, plumbing, and electrical infrastructure designed by Parallax Architects.',
    featuredImage: '/projects/mrs_hema_saravanan/hema_saravanan_01_contemporary_urban_elevation.jpg',
    gallery: [
      '/projects/mrs_hema_saravanan/hema_saravanan_01_contemporary_urban_elevation.jpg',
      '/projects/mrs_hema_saravanan/hema_saravanan_02_terrace_garden_vertical_green_wall.jpg',
      '/projects/mrs_hema_saravanan/hema_saravanan_03_double_height_courtyard_plumeria_tree.jpg'
    ],
    highlights: [
      'Delmia Circle JP Nagar prime location',
      'Striking slate stone facade & vertical screening louvers',
      'Internal double-height light courtyard with live plumeria tree',
      'Terrace garden with natural lawn & vertical green wall',
      'Parallax Architects design & turnkey civil MEP execution'
    ],
    stats: [
      { label: 'Scope', value: 'Civil + Plumbing + Electric' },
      { label: 'Architect', value: 'Parallax Architects' },
      { label: 'Location', value: 'Delmia Circle, JP Nagar, Bangalore' }
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
    description: 'High-specification contemporary private villa residence in 5th Block Jayanagar featuring clean white modernist architectural elevations, rich timber-framed louvered windows, expansive open roof viewing terrace, and a beautifully landscaped front lawn with circular floral bedding and permeable grass-cell pavers, executed with complete civil, electrical, and plumbing infrastructure designed by Mr. Ragavan.',
    featuredImage: '/projects/dr_niranjan/dr_niranjan_01_contemporary_white_villa_facade.jpg',
    gallery: [
      '/projects/dr_niranjan/dr_niranjan_01_contemporary_white_villa_facade.jpg',
      '/projects/dr_niranjan/dr_niranjan_02_landscaped_garden_grass_pavers.jpg'
    ],
    highlights: [
      '5th Block Jayanagar prime location',
      'Clean white modernist villa facade',
      'Timber louvered fenestrations & roof viewing terrace',
      'Manicured front lawn garden & permeable grass pavers',
      'Mr. Ragavan architectural design & civil MEP execution'
    ],
    stats: [
      { label: 'Scope', value: 'Civil + Electric & Plumbing' },
      { label: 'Architect', value: 'Mr. Ragavan' },
      { label: 'Location', value: '5th Block, Jayanagar, Bangalore' }
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
    description: 'Custom private residence in Yediyur, Jayanagar featuring warm wire-cut exposed brick cladding, pitched terracotta roof eaves, timber pergola balcony framing, and vertical stone slab compound masonry designed by Meenal J. Cavale.',
    featuredImage: '/projects/mr_kishore/kishore_01_exposed_brick_pergola_facade.jpg',
    gallery: [
      '/projects/mr_kishore/kishore_01_exposed_brick_pergola_facade.jpg'
    ],
    highlights: ['Yediyur Jayanagar location', 'Meenal J. Cavale design', 'Wire-cut brick cladding & timber pergolas'],
    stats: [
      { label: 'Scope', value: 'Civil + Electric + Plumbing' },
      { label: 'Architect', value: 'Meenal J. Cavale' },
      { label: 'Location', value: 'Yediyur, Jayanagar' }
    ]
  },
  {
    id: 'mr-venkatarama-raju',
    client: 'Mr. Venkatram Raju',
    title: 'Mr. Venkatarama Raju Commercial Building',
    location: 'JP Nagar 9th Phase, Bangalore',
    city: 'Bangalore',
    architect: 'Meenal Cavale (MJC Architects)',
    architectPractice: 'MJC Architects',
    scope: 'Commercial Building Construction',
    type: 'Commercial Building',
    category: 'Commercial',
    description: 'Premier G+4 commercial complex in JP Nagar 9th Phase designed by Meenal Cavale (MJC Architects), featuring ground-level flagship retail showroom (Manappuram Jewellers), exposed wire-cut brick facade with solar louvers, curtain wall glazing, and column-free flexible floor plates.',
    featuredImage: '/projects/mr_venkatarama_raju/raju_01_commercial_facade_retail.jpg',
    gallery: [
      '/projects/mr_venkatarama_raju/raju_01_commercial_facade_retail.jpg',
      '/projects/mr_venkatarama_raju/raju_02_corner_street_elevation.jpg',
      '/projects/mr_venkatarama_raju/raju_03_column_free_office_floor_plate.jpg',
      '/projects/mr_venkatarama_raju/raju_04_staircase_atrium_brick_masonry.jpg'
    ],
    highlights: ['JP Nagar 9th Phase commercial hub', 'Flagship Manappuram Jewellers showroom', 'Wire-cut brick facade & curtain wall glazing', 'Meenal Cavale (MJC Architects) design'],
    stats: [
      { label: 'Scope', value: 'Commercial Building Construction' },
      { label: 'Architect', value: 'Meenal Cavale (MJC Architects)' },
      { label: 'Location', value: 'JP Nagar 9th Phase, Bangalore' }
    ]
  },
  {
    id: 'mr-sreeram',
    client: 'Mr. Sreeram',
    title: 'Mr. Sreeram Residential Building',
    location: 'Anjanapura, Bangalore',
    city: 'Bangalore',
    architect: 'Meenal Cavale',
    architectPractice: 'Meenal Cavale',
    scope: 'Residential Building Construction',
    type: 'Residential Building',
    category: 'Residential',
    description: 'Bespoke multi-level residential building in Anjanapura featuring structural RCC framing, exposed wire-cut red brick exterior facade, double-height interior living atrium, and robust civil engineering designed by Meenal Cavale.',
    featuredImage: '/projects/mr_sreeram/sreeram_01_exposed_brick_masonry_elevation.jpg',
    gallery: [
      '/projects/mr_sreeram/sreeram_01_exposed_brick_masonry_elevation.jpg',
      '/projects/mr_sreeram/sreeram_02_double_height_brick_atrium_interior.jpg'
    ],
    highlights: ['Anjanapura residential location', 'Exposed wire-cut brick facade & atrium', 'Meenal Cavale design', 'Robust RCC framework'],
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
      '/projects/mr_rakesh_n_rao/rakesh_n_rao_01_villa_facade_gate.jpg'
    ],
    highlights: ['# 210, HSR Layout prime location', 'Gabled roof villa architecture', 'Entrance pergola with colonnade', 'Dressed stone boundary masonry', 'Architecture Paradigm design'],
    stats: [
      { label: 'Scope', value: 'Civil + Structural + Finishing' },
      { label: 'Architect', value: 'Architecture Paradigm, 6th block, Koramangala' },
      { label: 'Location', value: '# 210, HSR Layout, Bangalore' }
    ]
  }
];
