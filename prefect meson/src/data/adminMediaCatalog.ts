export interface MediaAsset {
  id: string;
  url: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Turnkey' | 'Interiors' | 'Projects' | 'General';
  tags?: string[];
  size?: string;
  dimensions?: string;
}

export const ADMIN_MEDIA_CATALOG: MediaAsset[] = [
  // ========================================================
  // 1. AUTHENTIC CLIENT PROJECTS (LIVE REAL-WORLD PORTFOLIO)
  // ========================================================
  {
    id: "proj-24x7_solutions-24x7-solutions-01-reception-desk-png",
    url: "/projects/24x7_solutions/24x7_solutions_01_reception_desk.png",
    title: "24x7 Solutions - Curved Reception Desk & Signage",
    category: "Interiors",
    tags: ["24x7 solutions", "interiors", "ulsoor lake", "reception", "authentic", "client-photo"],
    size: "918 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-24x7_solutions-24x7-solutions-02-workstations-ceiling-lighting-png",
    url: "/projects/24x7_solutions/24x7_solutions_02_workstations_ceiling_lighting.png",
    title: "24x7 Solutions - Open Workstation Bays & Acoustic Ceilings",
    category: "Interiors",
    tags: ["24x7 solutions", "interiors", "ulsoor lake", "workstations", "authentic", "client-photo"],
    size: "679 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-24x7_solutions-24x7-solutions-03-glass-cabin-partition-framing-png",
    url: "/projects/24x7_solutions/24x7_solutions_03_glass_cabin_partition_framing.png",
    title: "24x7 Solutions - Workstation Metal Partition & Meeting Room Glass",
    category: "Interiors",
    tags: ["24x7 solutions", "interiors", "ulsoor lake", "glass-cabin", "authentic", "client-photo"],
    size: "542 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-24x7_solutions-24x7-solutions-04-executive-cubicle-sliding-door-png",
    url: "/projects/24x7_solutions/24x7_solutions_04_executive_cubicle_sliding_door.png",
    title: "24x7 Solutions - Executive Cubicle with Purple Sliding Door",
    category: "Interiors",
    tags: ["24x7 solutions", "interiors", "ulsoor lake", "executive-cubicle", "authentic", "client-photo"],
    size: "682 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-24x7_solutions-24x7-solutions-05-interior-finishing-electrical-testing-png",
    url: "/projects/24x7_solutions/24x7_solutions_05_interior_finishing_electrical_testing.png",
    title: "24x7 Solutions - Interior Finishing & Electrical Conduit Testing",
    category: "Interiors",
    tags: ["24x7 solutions", "interiors", "ulsoor lake", "electrical-testing", "authentic", "client-photo"],
    size: "549 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-24x7_solutions-24x7-solutions-06-interior-painting-drywall-finishing-png",
    url: "/projects/24x7_solutions/24x7_solutions_06_interior_painting_drywall_finishing.png",
    title: "24x7 Solutions - Office Painting & Drywall Partition Finishing",
    category: "Interiors",
    tags: ["24x7 solutions", "interiors", "ulsoor lake", "painting", "authentic", "client-photo"],
    size: "745 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-24x7_solutions-24x7-solutions-07-executive-cabin-glass-inspection-png",
    url: "/projects/24x7_solutions/24x7_solutions_07_executive_cabin_glass_inspection.png",
    title: "24x7 Solutions - Glazed Executive Cabin Quality Inspection",
    category: "Interiors",
    tags: ["24x7 solutions", "interiors", "ulsoor lake", "cabin-inspection", "authentic", "client-photo"],
    size: "626 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-24x7_solutions-24x7-solutions-08-glazed-cubicles-corridor-entrance-png",
    url: "/projects/24x7_solutions/24x7_solutions_08_glazed_cubicles_corridor_entrance.png",
    title: "24x7 Solutions - Glazed Workstation Cubicles & Corridor Entrance",
    category: "Interiors",
    tags: ["24x7 solutions", "interiors", "ulsoor lake", "corridor", "authentic", "client-photo"],
    size: "456 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-commercial_complex-commercial-construction-scaffolding-jpg",
    url: "/projects/commercial_complex/commercial_construction_scaffolding.jpg",
    title: "Commercial Complex - Commercial Construction Scaffolding",
    category: "Commercial",
    tags: ["commercial complex","commercial","jp nagar","authentic","client-photo"],
    size: "319 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-commercial_complex-commercial-facade-front-jpg",
    url: "/projects/commercial_complex/commercial_facade_front.jpg",
    title: "Commercial Complex - Commercial Facade Front",
    category: "Commercial",
    tags: ["commercial complex","commercial","jp nagar","authentic","client-photo"],
    size: "337 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-commercial_complex-commercial-interior-floor-plate-jpg",
    url: "/projects/commercial_complex/commercial_interior_floor_plate.jpg",
    title: "Commercial Complex - Commercial Interior Floor Plate",
    category: "Commercial",
    tags: ["commercial complex","commercial","jp nagar","authentic","client-photo"],
    size: "177 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-commercial_complex-commercial-rcc-structure-shell-jpg",
    url: "/projects/commercial_complex/commercial_rcc_structure_shell.jpg",
    title: "Commercial Complex - Commercial Rcc Structure Shell",
    category: "Commercial",
    tags: ["commercial complex","commercial","jp nagar","authentic","client-photo"],
    size: "320 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-commercial_complex-commercial-side-elevation-jpg",
    url: "/projects/commercial_complex/commercial_side_elevation.jpg",
    title: "Commercial Complex - Commercial Side Elevation",
    category: "Commercial",
    tags: ["commercial complex","commercial","jp nagar","authentic","client-photo"],
    size: "275 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-commercial_complex-commercial-slab-casting-stage-jpg",
    url: "/projects/commercial_complex/commercial_slab_casting_stage.jpg",
    title: "Commercial Complex - Commercial Slab Casting Stage",
    category: "Commercial",
    tags: ["commercial complex","commercial","jp nagar","authentic","client-photo"],
    size: "200 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-commercial_complex-commercial-staircase-glazing-jpg",
    url: "/projects/commercial_complex/commercial_staircase_glazing.jpg",
    title: "Commercial Complex - Commercial Staircase Glazing",
    category: "Commercial",
    tags: ["commercial complex","commercial","jp nagar","authentic","client-photo"],
    size: "243 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-commercial_complex-commercial-street-view-jpg",
    url: "/projects/commercial_complex/commercial_street_view.jpg",
    title: "Commercial Complex - Commercial Street View",
    category: "Commercial",
    tags: ["commercial complex","commercial","jp nagar","authentic","client-photo"],
    size: "363 KB",
    dimensions: "1920x1080"
  },  {
    id: "proj-dr_anil_kush-01-facade-elevation-jpg",
    url: "/projects/dr_anil_kush/dr_anil_kush_01_facade_elevation.jpg",
    title: "Dr. Anil Kush - Villa Front Elevation & Landscape",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "291 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-02-cantilever-portico-jpg",
    url: "/projects/dr_anil_kush/dr_anil_kush_02_cantilever_portico.jpg",
    title: "Dr. Anil Kush - Upper Cantilever Box & Carport",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "278 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-03-concrete-entrance-portal-jpg",
    url: "/projects/dr_anil_kush/dr_anil_kush_03_concrete_entrance_portal.jpg",
    title: "Dr. Anil Kush - Exposed RCC Entrance Portal & Pavers",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "293 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-04-courtyard-louvers-png",
    url: "/projects/dr_anil_kush/dr_anil_kush_04_courtyard_louvers.png",
    title: "Dr. Anil Kush - Courtyard & Louvered Pergola",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "484 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-05-reflecting-pool-jpg",
    url: "/projects/dr_anil_kush/dr_anil_kush_05_reflecting_pool.jpg",
    title: "Dr. Anil Kush - Stepped Reflecting Pool & Garden",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "222 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-06-reflecting-pool-planter-jpg",
    url: "/projects/dr_anil_kush/dr_anil_kush_06_reflecting_pool_planter.jpg",
    title: "Dr. Anil Kush - Stepped Pool & Aquatic Planter",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "197 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-07-rear-courtyard-facade-jpg",
    url: "/projects/dr_anil_kush/dr_anil_kush_07_rear_courtyard_facade.jpg",
    title: "Dr. Anil Kush - Rear Garden Facade & Cylindrical Pillars",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "245 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-08-board-marked-rcc-hall-png",
    url: "/projects/dr_anil_kush/dr_anil_kush_08_board_marked_rcc_hall.png",
    title: "Dr. Anil Kush - Double Height Exposed RCC Hall",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "486 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-09-living-lounge-red-wall-jpg",
    url: "/projects/dr_anil_kush/dr_anil_kush_09_living_lounge_red_wall.jpg",
    title: "Dr. Anil Kush - Crimson Living Lounge",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "201 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-10-floating-staircase-atrium-jpg",
    url: "/projects/dr_anil_kush/dr_anil_kush_10_floating_staircase_atrium.jpg",
    title: "Dr. Anil Kush - Floating Teak Staircase & Atrium",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "215 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-11-staircase-detail-jpg",
    url: "/projects/dr_anil_kush/dr_anil_kush_11_staircase_detail.jpg",
    title: "Dr. Anil Kush - Floating Staircase Detail & Tension Rods",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "229 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-12-louver-veranda-jpg",
    url: "/projects/dr_anil_kush/dr_anil_kush_12_louver_veranda.jpg",
    title: "Dr. Anil Kush - Louvered Veranda Seating Lounge",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "252 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-13-mezzanine-panelling-jpg",
    url: "/projects/dr_anil_kush/dr_anil_kush_13_mezzanine_panelling.jpg",
    title: "Dr. Anil Kush - Mezzanine Wood Panelling Passage",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "189 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-14-mezzanine-balustrade-png",
    url: "/projects/dr_anil_kush/dr_anil_kush_14_mezzanine_balustrade.png",
    title: "Dr. Anil Kush - Upper Balustrade Overlooking Atrium",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "736 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-15-marble-corridor-swing-png",
    url: "/projects/dr_anil_kush/dr_anil_kush_15_marble_corridor_swing.png",
    title: "Dr. Anil Kush - Marble Corridor & Wooden Swing",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "690 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-16-bedroom-wooden-swing-jpg",
    url: "/projects/dr_anil_kush/dr_anil_kush_16_bedroom_wooden_swing.jpg",
    title: "Dr. Anil Kush - Bedroom Platform & Balcony Swing",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "190 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-17-master-bedroom-wide-jpg",
    url: "/projects/dr_anil_kush/dr_anil_kush_17_master_bedroom_wide.jpg",
    title: "Dr. Anil Kush - Master Bedroom Wide View & French Doors",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "193 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-18-master-bedroom-png",
    url: "/projects/dr_anil_kush/dr_anil_kush_18_master_bedroom.png",
    title: "Dr. Anil Kush - Master Bedroom & Platform Bed Detail",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "393 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-19-kitchen-installation-png",
    url: "/projects/dr_anil_kush/dr_anil_kush_19_kitchen_installation.png",
    title: "Dr. Anil Kush - Modular Kitchen Joinery Installation",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "356 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-20-modular-kitchen-finished-png",
    url: "/projects/dr_anil_kush/dr_anil_kush_20_modular_kitchen_finished.png",
    title: "Dr. Anil Kush - Finished Modular Kitchen & Breakfast Bar",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "836 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-21-bathroom-vanity-png",
    url: "/projects/dr_anil_kush/dr_anil_kush_21_bathroom_vanity.png",
    title: "Dr. Anil Kush - Granite Counter Bathroom Vanity",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "362 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_anil_kush-22-panoramic-bathroom-jpg",
    url: "/projects/dr_anil_kush/dr_anil_kush_22_panoramic_bathroom.jpg",
    title: "Dr. Anil Kush - Panoramic Bathroom Overlooking Landscape",
    category: "Residential",
    tags: ["dr. anil kush", "residential", "estate club", "authentic", "client-photo"],
    size: "226 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_niranjan-dr-niranjan-01-contemporary-white-villa-facade-jpg",
    url: "/projects/dr_niranjan/dr_niranjan_01_contemporary_white_villa_facade.jpg",
    title: "Dr. Niranjan - Contemporary White Villa Facade",
    category: "Residential",
    tags: ["dr. niranjan","residential","jayanagar 5th block","authentic","client-photo"],
    size: "269 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-dr_niranjan-dr-niranjan-02-landscaped-garden-grass-pavers-jpg",
    url: "/projects/dr_niranjan/dr_niranjan_02_landscaped_garden_grass_pavers.jpg",
    title: "Dr. Niranjan - Landscaped Garden Grass Pavers",
    category: "Residential",
    tags: ["dr. niranjan","residential","jayanagar 5th block","authentic","client-photo"],
    size: "410 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-farm_india_office-farm-india-01-open-workspace-ducted-ac-png",
    url: "/projects/farm_india_office/farm_india_01_open_workspace_ducted_ac.png",
    title: "Farm India Office - Open Workspace Ducted Ac",
    category: "Interiors",
    tags: ["farm india office","interiors","koramangala","authentic","client-photo"],
    size: "517 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-farm_india_office-farm-india-02-executive-cabin-workstation-png",
    url: "/projects/farm_india_office/farm_india_02_executive_cabin_workstation.png",
    title: "Farm India Office - Executive Cabin Workstation",
    category: "Interiors",
    tags: ["farm india office","interiors","koramangala","authentic","client-photo"],
    size: "354 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-farm_india_office-farm-india-03-l-shaped-modular-desk-png",
    url: "/projects/farm_india_office/farm_india_03_l_shaped_modular_desk.png",
    title: "Farm India Office - L Shaped Modular Desk",
    category: "Interiors",
    tags: ["farm india office","interiors","koramangala","authentic","client-photo"],
    size: "567 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-farm_india_office-farm-india-04-glass-cabin-timber-partitions-png",
    url: "/projects/farm_india_office/farm_india_04_glass_cabin_timber_partitions.png",
    title: "Farm India Office - Glass Cabin Timber Partitions",
    category: "Interiors",
    tags: ["farm india office","interiors","koramangala","authentic","client-photo"],
    size: "401 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-farm_india_office-farm-india-05-workspace-fitout-hardwood-flooring-png",
    url: "/projects/farm_india_office/farm_india_05_workspace_fitout_hardwood_flooring.png",
    title: "Farm India Office - Workspace Fitout Hardwood Flooring",
    category: "Interiors",
    tags: ["farm india office","interiors","koramangala","authentic","client-photo"],
    size: "697 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-farm_india_office-farm-india-06-corporate-pantry-kitchenette-png",
    url: "/projects/farm_india_office/farm_india_06_corporate_pantry_kitchenette.png",
    title: "Farm India Office - Corporate Pantry Kitchenette",
    category: "Interiors",
    tags: ["farm india office","interiors","koramangala","authentic","client-photo"],
    size: "328 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-farm_india_office-farm-india-07-corporate-restroom-dual-vanity-png",
    url: "/projects/farm_india_office/farm_india_07_corporate_restroom_dual_vanity.png",
    title: "Farm India Office - Corporate Restroom Dual Vanity",
    category: "Interiors",
    tags: ["farm india office","interiors","koramangala","authentic","client-photo"],
    size: "335 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-farm_india_office-farm-india-08-restroom-sanitary-fixtures-png",
    url: "/projects/farm_india_office/farm_india_08_restroom_sanitary_fixtures.png",
    title: "Farm India Office - Restroom Sanitary Fixtures",
    category: "Interiors",
    tags: ["farm india office","interiors","koramangala","authentic","client-photo"],
    size: "354 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_amith-amith-01-geometric-elevation-portrait-jpg",
    url: "/projects/mr_amith/amith_01_geometric_elevation_portrait.jpg",
    title: "Mr. Amith - Geometric Elevation Portrait",
    category: "Residential",
    tags: ["mr. amith","residential","bilekahalli, bg road","authentic","client-photo"],
    size: "312 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_amith-amith-02-geometric-elevation-street-view-jpg",
    url: "/projects/mr_amith/amith_02_geometric_elevation_street_view.jpg",
    title: "Mr. Amith - Geometric Elevation Street View",
    category: "Residential",
    tags: ["mr. amith","residential","bilekahalli, bg road","authentic","client-photo"],
    size: "296 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_kishore-kishore-01-exposed-brick-pergola-facade-jpg",
    url: "/projects/mr_kishore/kishore_01_exposed_brick_pergola_facade.jpg",
    title: "Mr. Kishore - Exposed Brick Pergola Facade",
    category: "Residential",
    tags: ["mr. kishore","residential","yediyur, jayanagar","authentic","client-photo"],
    size: "379 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_kumar-kumar-01-contemporary-residence-facade-png",
    url: "/projects/mr_kumar/kumar_01_contemporary_residence_facade.png",
    title: "Mr. Kumar - Contemporary Residence Facade",
    category: "Residential",
    tags: ["mr. kumar","residential","jayanagar 5th block","authentic","client-photo"],
    size: "567 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_kumar-kumar-02-italian-marble-living-lounge-png",
    url: "/projects/mr_kumar/kumar_02_italian_marble_living_lounge.png",
    title: "Mr. Kumar - Italian Marble Living Lounge",
    category: "Residential",
    tags: ["mr. kumar","residential","jayanagar 5th block","authentic","client-photo"],
    size: "801 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_kumar-kumar-03-backlit-onyx-puja-mandir-png",
    url: "/projects/mr_kumar/kumar_03_backlit_onyx_puja_mandir.png",
    title: "Mr. Kumar - Backlit Onyx Puja Mandir",
    category: "Residential",
    tags: ["mr. kumar","residential","jayanagar 5th block","authentic","client-photo"],
    size: "658 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_kumar-kumar-04-modular-kitchen-granite-counter-png",
    url: "/projects/mr_kumar/kumar_04_modular_kitchen_granite_counter.png",
    title: "Mr. Kumar - Modular Kitchen Granite Counter",
    category: "Residential",
    tags: ["mr. kumar","residential","jayanagar 5th block","authentic","client-photo"],
    size: "340 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_kumar-kumar-05-living-room-balcony-garden-png",
    url: "/projects/mr_kumar/kumar_05_living_room_balcony_garden.png",
    title: "Mr. Kumar - Living Room Balcony Garden",
    category: "Residential",
    tags: ["mr. kumar","residential","jayanagar 5th block","authentic","client-photo"],
    size: "778 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_nataraj-nataraj-01-commercial-complex-street-view-png",
    url: "/projects/mr_nataraj/nataraj_01_commercial_complex_street_view.png",
    title: "Mr. Nataraj - Commercial Complex Street View",
    category: "Commercial",
    tags: ["mr. nataraj","commercial","hsr layout","authentic","client-photo"],
    size: "797 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_nataraj-nataraj-02-retail-showroom-elevation-png",
    url: "/projects/mr_nataraj/nataraj_02_retail_showroom_elevation.png",
    title: "Mr. Nataraj - Retail Showroom Elevation",
    category: "Commercial",
    tags: ["mr. nataraj","commercial","hsr layout","authentic","client-photo"],
    size: "482 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_nataraj-nataraj-03-residential-penthouse-balcony-elevation-png",
    url: "/projects/mr_nataraj/nataraj_03_residential_penthouse_balcony_elevation.png",
    title: "Mr. Nataraj - Residential Penthouse Balcony Elevation",
    category: "Commercial",
    tags: ["mr. nataraj","commercial","hsr layout","authentic","client-photo"],
    size: "527 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_nataraj-nataraj-04-hsr-layout-27th-main-avenue-perspective-png",
    url: "/projects/mr_nataraj/nataraj_04_hsr_layout_27th_main_avenue_perspective.png",
    title: "Mr. Nataraj - Hsr Layout 27th Main Avenue Perspective",
    category: "Commercial",
    tags: ["mr. nataraj","commercial","hsr layout","authentic","client-photo"],
    size: "741 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_praveen_kumar-praveen-kumar-01-front-gabled-elevation-png",
    url: "/projects/mr_praveen_kumar/praveen_kumar_01_front_gabled_elevation.png",
    title: "Mr. Praveen Kumar - Front Gabled Facade & Terracotta Roof",
    category: "Residential",
    tags: ["mr. praveen kumar", "residential", "kr puram", "elevation", "authentic", "client-photo"],
    size: "912 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_praveen_kumar-praveen-kumar-02-timber-rafter-truss-atrium-png",
    url: "/projects/mr_praveen_kumar/praveen_kumar_02_timber_rafter_truss_atrium.png",
    title: "Mr. Praveen Kumar - Multi-Tier Timber Rafter Truss Atrium",
    category: "Residential",
    tags: ["mr. praveen kumar", "residential", "kr puram", "atrium", "authentic", "client-photo"],
    size: "689 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_praveen_kumar-praveen-kumar-03-tiered-roof-side-elevation-png",
    url: "/projects/mr_praveen_kumar/praveen_kumar_03_tiered_roof_side_elevation.png",
    title: "Mr. Praveen Kumar - Tiered Mangalore Tile Gable Side Elevation",
    category: "Residential",
    tags: ["mr. praveen kumar", "residential", "kr puram", "side-elevation", "authentic", "client-photo"],
    size: "654 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_praveen_kumar-praveen-kumar-04-driveway-wide-facade-view-jpg",
    url: "/projects/mr_praveen_kumar/praveen_kumar_04_driveway_wide_facade_view.jpg",
    title: "Mr. Praveen Kumar - Gated Compound Driveway & Architectural Perspective",
    category: "Residential",
    tags: ["mr. praveen kumar", "residential", "kr puram", "driveway", "authentic", "client-photo"],
    size: "288 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_praveen_kumar-praveen-kumar-05-carved-teak-double-door-png",
    url: "/projects/mr_praveen_kumar/praveen_kumar_05_carved_teak_double_door.png",
    title: "Mr. Praveen Kumar - Handcrafted Carved Teakwood Double Entry Door",
    category: "Residential",
    tags: ["mr. praveen kumar", "residential", "kr puram", "teak-door", "authentic", "client-photo"],
    size: "771 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_sreeram-sreeram-01-exposed-brick-masonry-elevation-jpg",
    url: "/projects/mr_sreeram/sreeram_01_exposed_brick_masonry_elevation.jpg",
    title: "Mr. Sreeram - Exposed Brick Masonry Elevation",
    category: "Residential",
    tags: ["mr. sreeram","residential","anjanapura","authentic","client-photo"],
    size: "390 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_sreeram-sreeram-02-double-height-brick-atrium-interior-jpg",
    url: "/projects/mr_sreeram/sreeram_02_double_height_brick_atrium_interior.jpg",
    title: "Mr. Sreeram - Double Height Brick Atrium Interior",
    category: "Residential",
    tags: ["mr. sreeram","residential","anjanapura","authentic","client-photo"],
    size: "287 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_tilak-tilak-01-terracotta-villa-facade-jpg",
    url: "/projects/mr_tilak/tilak_01_terracotta_villa_facade.jpg",
    title: "Mr. Tilak - Terracotta Villa Facade",
    category: "Residential",
    tags: ["mr. tilak","residential","hsr layout","authentic","client-photo"],
    size: "308 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_uma_shankar_agarwal-uma-shankar-agarwal-01-double-height-living-mezzanine-png",
    url: "/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_01_double_height_living_mezzanine.png",
    title: "Mr. Uma Shankar Agarwal - Double Height Living Mezzanine",
    category: "Residential",
    tags: ["mr. uma shankar agarwal","residential","jp nagar","authentic","client-photo"],
    size: "633 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_uma_shankar_agarwal-uma-shankar-agarwal-02-living-tv-unit-wood-panelling-png",
    url: "/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_02_living_tv_unit_wood_panelling.png",
    title: "Mr. Uma Shankar Agarwal - Living Tv Unit Wood Panelling",
    category: "Residential",
    tags: ["mr. uma shankar agarwal","residential","jp nagar","authentic","client-photo"],
    size: "672 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_uma_shankar_agarwal-uma-shankar-agarwal-03-terrace-pergola-roof-garden-png",
    url: "/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_03_terrace_pergola_roof_garden.png",
    title: "Mr. Uma Shankar Agarwal - Terrace Pergola Roof Garden",
    category: "Residential",
    tags: ["mr. uma shankar agarwal","residential","jp nagar","authentic","client-photo"],
    size: "841 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_uma_shankar_agarwal-uma-shankar-agarwal-04-floating-zigzag-staircase-atrium-png",
    url: "/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_04_floating_zigzag_staircase_atrium.png",
    title: "Mr. Uma Shankar Agarwal - Floating Zigzag Staircase Atrium",
    category: "Residential",
    tags: ["mr. uma shankar agarwal","residential","jp nagar","authentic","client-photo"],
    size: "641 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_uma_shankar_agarwal-uma-shankar-agarwal-05-bookmatched-italian-marble-wall-png",
    url: "/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_05_bookmatched_italian_marble_wall.png",
    title: "Mr. Uma Shankar Agarwal - Bookmatched Italian Marble Wall",
    category: "Residential",
    tags: ["mr. uma shankar agarwal","residential","jp nagar","authentic","client-photo"],
    size: "535 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_venkatarama_raju-raju-01-commercial-facade-retail-jpg",
    url: "/projects/mr_venkatarama_raju/raju_01_commercial_facade_retail.jpg",
    title: "Mr. Venkatarama Raju - Commercial Facade Retail",
    category: "Commercial",
    tags: ["mr. venkatarama raju","commercial","jp nagar 9th phase","authentic","client-photo"],
    size: "519 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_venkatarama_raju-raju-02-corner-street-elevation-jpg",
    url: "/projects/mr_venkatarama_raju/raju_02_corner_street_elevation.jpg",
    title: "Mr. Venkatarama Raju - Corner Street Elevation",
    category: "Commercial",
    tags: ["mr. venkatarama raju","commercial","jp nagar 9th phase","authentic","client-photo"],
    size: "464 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_venkatarama_raju-raju-03-column-free-office-floor-plate-jpg",
    url: "/projects/mr_venkatarama_raju/raju_03_column_free_office_floor_plate.jpg",
    title: "Mr. Venkatarama Raju - Column Free Office Floor Plate",
    category: "Commercial",
    tags: ["mr. venkatarama raju","commercial","jp nagar 9th phase","authentic","client-photo"],
    size: "287 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_venkatarama_raju-raju-04-staircase-atrium-brick-masonry-jpg",
    url: "/projects/mr_venkatarama_raju/raju_04_staircase_atrium_brick_masonry.jpg",
    title: "Mr. Venkatarama Raju - Staircase Atrium Brick Masonry",
    category: "Commercial",
    tags: ["mr. venkatarama raju","commercial","jp nagar 9th phase","authentic","client-photo"],
    size: "308 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_vittal_das_shetty-vittal-das-shetty-01-stone-pylon-elevation-jpg",
    url: "/projects/mr_vittal_das_shetty/vittal_das_shetty_01_stone_pylon_elevation.jpg",
    title: "Mr. Vittal Das Shetty - Stone Pylon Elevation",
    category: "Residential",
    tags: ["mr. vittal das shetty","residential","doddagubbi","authentic","client-photo"],
    size: "330 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_vittal_das_shetty-vittal-das-shetty-02-tiered-roof-pergola-view-jpg",
    url: "/projects/mr_vittal_das_shetty/vittal_das_shetty_02_tiered_roof_pergola_view.jpg",
    title: "Mr. Vittal Das Shetty - Tiered Roof Pergola View",
    category: "Residential",
    tags: ["mr. vittal das shetty","residential","doddagubbi","authentic","client-photo"],
    size: "296 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_vittal_das_shetty-vittal-das-shetty-03-front-entry-steps-gate-jpg",
    url: "/projects/mr_vittal_das_shetty/vittal_das_shetty_03_front_entry_steps_gate.jpg",
    title: "Mr. Vittal Das Shetty - Front Entry Steps Gate",
    category: "Residential",
    tags: ["mr. vittal das shetty","residential","doddagubbi","authentic","client-photo"],
    size: "256 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_vittal_das_shetty-vittal-das-shetty-04-bamboo-soffit-pergola-walkway-png",
    url: "/projects/mr_vittal_das_shetty/vittal_das_shetty_04_bamboo_soffit_pergola_walkway.png",
    title: "Mr. Vittal Das Shetty - Bamboo Soffit Pergola Walkway",
    category: "Residential",
    tags: ["mr. vittal das shetty","residential","doddagubbi","authentic","client-photo"],
    size: "641 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_vittal_das_shetty-vittal-das-shetty-05-entrance-verandah-brick-foyer-png",
    url: "/projects/mr_vittal_das_shetty/vittal_das_shetty_05_entrance_verandah_brick_foyer.png",
    title: "Mr. Vittal Das Shetty - Entrance Verandah Brick Foyer",
    category: "Residential",
    tags: ["mr. vittal das shetty","residential","doddagubbi","authentic","client-photo"],
    size: "522 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_vittal_das_shetty-vittal-das-shetty-06-civil-construction-phase-png",
    url: "/projects/mr_vittal_das_shetty/vittal_das_shetty_06_civil_construction_phase.png",
    title: "Mr. Vittal Das Shetty - Civil Construction Phase",
    category: "Residential",
    tags: ["mr. vittal das shetty","residential","doddagubbi","authentic","client-photo"],
    size: "715 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_vittal_das_shetty-vittal-das-shetty-07-side-front-cantilever-view-png",
    url: "/projects/mr_vittal_das_shetty/vittal_das_shetty_07_side_front_cantilever_view.png",
    title: "Mr. Vittal Das Shetty - Side Front Cantilever View",
    category: "Residential",
    tags: ["mr. vittal das shetty","residential","doddagubbi","authentic","client-photo"],
    size: "776 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_vittal_das_shetty-vittal-das-shetty-08-side-elevation-steel-staircase-png",
    url: "/projects/mr_vittal_das_shetty/vittal_das_shetty_08_side_elevation_steel_staircase.png",
    title: "Mr. Vittal Das Shetty - Side Elevation Steel Staircase",
    category: "Residential",
    tags: ["mr. vittal das shetty","residential","doddagubbi","authentic","client-photo"],
    size: "749 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_vittal_das_shetty-vittal-das-shetty-09-bedroom-sliding-wardrobe-png",
    url: "/projects/mr_vittal_das_shetty/vittal_das_shetty_09_bedroom_sliding_wardrobe.png",
    title: "Mr. Vittal Das Shetty - Bedroom Sliding Wardrobe",
    category: "Residential",
    tags: ["mr. vittal das shetty","residential","doddagubbi","authentic","client-photo"],
    size: "523 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_vittal_das_shetty-vittal-das-shetty-10-puja-room-brass-bell-doors-jpg",
    url: "/projects/mr_vittal_das_shetty/vittal_das_shetty_10_puja_room_brass_bell_doors.jpg",
    title: "Mr. Vittal Das Shetty - Puja Room Brass Bell Doors",
    category: "Residential",
    tags: ["mr. vittal das shetty","residential","doddagubbi","authentic","client-photo"],
    size: "274 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_vittal_das_shetty-vittal-das-shetty-11-sunken-bath-emerald-tiles-png",
    url: "/projects/mr_vittal_das_shetty/vittal_das_shetty_11_sunken_bath_emerald_tiles.png",
    title: "Mr. Vittal Das Shetty - Sunken Bath Emerald Tiles",
    category: "Residential",
    tags: ["mr. vittal das shetty","residential","doddagubbi","authentic","client-photo"],
    size: "964 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_vittal_das_shetty-vittal-das-shetty-12-garden-patio-pergola-paving-png",
    url: "/projects/mr_vittal_das_shetty/vittal_das_shetty_12_garden_patio_pergola_paving.png",
    title: "Mr. Vittal Das Shetty - Garden Patio Pergola Paving",
    category: "Residential",
    tags: ["mr. vittal das shetty","residential","doddagubbi","authentic","client-photo"],
    size: "497 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mr_vittal_das_shetty-vittal-das-shetty-13-clerestory-patio-foliage-png",
    url: "/projects/mr_vittal_das_shetty/vittal_das_shetty_13_clerestory_patio_foliage.png",
    title: "Mr. Vittal Das Shetty - Clerestory Patio Foliage",
    category: "Residential",
    tags: ["mr. vittal das shetty","residential","doddagubbi","authentic","client-photo"],
    size: "851 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mrs_hema_saravanan-hema-saravanan-01-contemporary-urban-elevation-jpg",
    url: "/projects/mrs_hema_saravanan/hema_saravanan_01_contemporary_urban_elevation.jpg",
    title: "Mrs. Hema Saravanan - Contemporary Urban Elevation",
    category: "Residential",
    tags: ["mrs. hema saravanan","residential","jp nagar","authentic","client-photo"],
    size: "334 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mrs_hema_saravanan-hema-saravanan-02-terrace-garden-vertical-green-wall-jpg",
    url: "/projects/mrs_hema_saravanan/hema_saravanan_02_terrace_garden_vertical_green_wall.jpg",
    title: "Mrs. Hema Saravanan - Terrace Garden Vertical Green Wall",
    category: "Residential",
    tags: ["mrs. hema saravanan","residential","jp nagar","authentic","client-photo"],
    size: "411 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-mrs_hema_saravanan-hema-saravanan-03-double-height-courtyard-plumeria-tree-jpg",
    url: "/projects/mrs_hema_saravanan/hema_saravanan_03_double_height_courtyard_plumeria_tree.jpg",
    title: "Mrs. Hema Saravanan - Double Height Courtyard Plumeria Tree",
    category: "Residential",
    tags: ["mrs. hema saravanan","residential","jp nagar","authentic","client-photo"],
    size: "402 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-take_5_bar-take-5-bar-01-granite-counter-wine-rack-png",
    url: "/projects/take_5_bar/take_5_bar_01_granite_counter_wine_rack.png",
    title: "Take 5 Bar & Restaurant - Granite Counter Wine Rack",
    category: "Commercial",
    tags: ["take 5 bar & restaurant","commercial","indiranagar","authentic","client-photo"],
    size: "867 KB",
    dimensions: "1920x1080"
  },
  {
    id: "proj-take_5_bar-take-5-bar-02-service-counter-dining-partition-jpg",
    url: "/projects/take_5_bar/take_5_bar_02_service_counter_dining_partition.jpg",
    title: "Take 5 Bar & Restaurant - Service Counter Dining Partition",
    category: "Commercial",
    tags: ["take 5 bar & restaurant","commercial","indiranagar","authentic","client-photo"],
    size: "220 KB",
    dimensions: "1920x1080"
  },

  // ========================================================
  // 2. RESIDENTIAL CORE ASSETS
  // ========================================================
  { id: 'res-1', url: '/assets/project_01_residential.jpg', title: 'Luxury Villa Horizon Residence', category: 'Residential', tags: ['villa', 'residential', 'luxury'] },
  { id: 'res-2', url: '/assets/residential_hero.jpg', title: 'Grand Residential Pavilion', category: 'Residential', tags: ['villa', 'estate', 'hero'] },
  { id: 'res-3', url: '/assets/res_main_hero.jpg', title: 'Modern Sustainable Villa', category: 'Residential', tags: ['villa', 'modern', 'facade'] },
  { id: 'res-4', url: '/assets/showcase_01_residential.jpg', title: 'Bespoke Private Residence', category: 'Residential', tags: ['villa', 'private', 'luxury'] },
  { id: 'res-5', url: '/assets/portfolio_01_residence.jpg', title: 'Modernist Bungalow', category: 'Residential', tags: ['bungalow', 'modern'] },
  { id: 'res-6', url: '/assets/cinematic_grand_estate.jpg', title: 'Cinematic Grand Estate', category: 'Residential', tags: ['estate', 'grand', 'luxury'] },
  { id: 'res-7', url: '/assets/modal_lux_estate.jpg', title: 'Contemporary Villa Architecture', category: 'Residential', tags: ['contemporary', 'villa'] },
  { id: 'res-8', url: '/assets/about_hero_villa.jpg', title: 'Architectural Residence Facade', category: 'Residential', tags: ['villa', 'facade'] },
  { id: 'res-9', url: '/assets/service_residential_corp.jpg', title: 'Residential Engineering Core', category: 'Residential', tags: ['residential', 'structure'] },
  { id: 'res-10', url: '/assets/service_residential_generated.jpg', title: 'Luxury Living Exterior', category: 'Residential', tags: ['exterior', 'residence'] },

  // ========================================================
  // 3. COMMERCIAL CORE ASSETS
  // ========================================================
  { id: 'comm-1', url: '/assets/commercial_hero.jpg', title: 'Corporate Tech Hub', category: 'Commercial', tags: ['commercial', 'tech', 'glass'] },
  { id: 'comm-2', url: '/assets/comm_main_hero.jpg', title: 'Metropolitan Commercial Plaza', category: 'Commercial', tags: ['commercial', 'plaza', 'highrise'] },
  { id: 'comm-3', url: '/assets/comm_complex_hero.jpg', title: 'Commercial Complex & Retail Park', category: 'Commercial', tags: ['retail', 'complex', 'mall'] },
  { id: 'comm-4', url: '/assets/comm_hospitality_hero.jpg', title: 'Luxury Hospitality & Resort Hotel', category: 'Commercial', tags: ['hotel', 'hospitality', 'resort'] },
  { id: 'comm-5', url: '/assets/comm_office_hero.jpg', title: 'Modern Corporate Office Headquarters', category: 'Commercial', tags: ['office', 'corporate', 'workspace'] },
  { id: 'comm-6', url: '/assets/comm_retail_hero.jpg', title: 'Flagship Retail Experience Hub', category: 'Commercial', tags: ['retail', 'showroom', 'store'] },
  { id: 'comm-7', url: '/assets/comm_industrial_hero.jpg', title: 'Industrial Logistics & Smart Warehouse', category: 'Commercial', tags: ['industrial', 'warehouse', 'logistics'] },
  { id: 'comm-8', url: '/assets/comm_institutional_hero.jpg', title: 'Institutional Education Campus', category: 'Commercial', tags: ['institutional', 'campus', 'education'] },
  { id: 'comm-9', url: '/assets/comm_restaurant_hero.jpg', title: 'Fine Dining & Hospitality Space', category: 'Commercial', tags: ['restaurant', 'dining', 'lounge'] },
  { id: 'comm-10', url: '/assets/comm_showroom_hero.jpg', title: 'Premium Automobile Showroom', category: 'Commercial', tags: ['showroom', 'auto', 'commercial'] },
  { id: 'comm-11', url: '/assets/project_02_commercial.jpg', title: 'Business Tower Architecture', category: 'Commercial', tags: ['tower', 'business', 'commercial'] },
  { id: 'comm-12', url: '/assets/showcase_02_commercial.jpg', title: 'Steel & Glass Commercial Facade', category: 'Commercial', tags: ['facade', 'steel', 'glass'] },
  { id: 'comm-13', url: '/assets/service_commercial_corp.jpg', title: 'Commercial Heavy Construction', category: 'Commercial', tags: ['construction', 'heavy'] },

  // ========================================================
  // 4. TURNKEY EPC ASSETS
  // ========================================================
  { id: 'tk-1', url: '/assets/turnkey_hero.jpg', title: 'Full EPC Turnkey Infrastructure', category: 'Turnkey', tags: ['turnkey', 'epc', 'engineering'] },
  { id: 'tk-2', url: '/assets/turnkey_main_hero.jpg', title: 'End-to-End Civil & Structural Site', category: 'Turnkey', tags: ['turnkey', 'site', 'infrastructure'] },
  { id: 'tk-3', url: '/assets/project_03_turnkey.jpg', title: 'Integrated Development Complex', category: 'Turnkey', tags: ['turnkey', 'development'] },
  { id: 'tk-4', url: '/assets/showcase_03_turnkey.jpg', title: 'Precision Steel Construction Site', category: 'Turnkey', tags: ['turnkey', 'steel', 'structure'] },
  { id: 'tk-5', url: '/assets/service_turnkey_corp.jpg', title: 'EPC Project Engineering Control', category: 'Turnkey', tags: ['engineering', 'control', 'turnkey'] },
  { id: 'tk-6', url: '/assets/corp_main_construction.jpg', title: 'Foundation & Structural Works', category: 'Turnkey', tags: ['foundation', 'civil', 'heavy'] },
  { id: 'tk-7', url: '/assets/impact_active_construction.jpg', title: 'Active Construction Project Site', category: 'Turnkey', tags: ['active', 'site', 'cranes'] },

  // ========================================================
  // 5. INTERIORS ASSETS
  // ========================================================
  { id: 'int-1', url: '/assets/interior_01_living.jpg', title: 'Opulent Marble Living Suite', category: 'Interiors', tags: ['interior', 'living', 'marble'] },
  { id: 'int-2', url: '/assets/interior_02_kitchen.jpg', title: 'Bespoke Gourmet German Kitchen', category: 'Interiors', tags: ['interior', 'kitchen', 'island'] },
  { id: 'int-3', url: '/assets/interior_03_bedroom.jpg', title: 'Master Sanctuary Suite & Walk-In', category: 'Interiors', tags: ['interior', 'bedroom', 'sanctuary'] },
  { id: 'int-4', url: '/assets/interior_04_office.jpg', title: 'Executive Boardroom & Private Office', category: 'Interiors', tags: ['interior', 'office', 'executive'] },
  { id: 'int-5', url: '/assets/portfolio_04_interior.jpg', title: 'Modern Minimalist Lounge', category: 'Interiors', tags: ['interior', 'minimalist', 'lounge'] },
  { id: 'int-6', url: '/assets/service_interiors_corp.jpg', title: 'Turnkey Architectural Interiors', category: 'Interiors', tags: ['interior', 'architecture', 'fitout'] },
  { id: 'int-7', url: '/assets/service_interior_generated.jpg', title: 'Custom Wood & Brass Millwork', category: 'Interiors', tags: ['interior', 'millwork', 'wood'] },

  // ========================================================
  // 6. GENERAL & BRANDING
  // ========================================================
  { id: 'gen-1', url: '/images/hero-desktop.jpg', title: 'Perfect Mason Main Architectural Hero', category: 'General', tags: ['hero', 'main', 'brand'] },
  { id: 'gen-2', url: '/assets/about_trust_stack.jpg', title: 'Engineering Precision Stack', category: 'General', tags: ['engineering', 'trust'] },
  { id: 'gen-3', url: '/assets/why_choose_trust_craft.jpg', title: 'Master Craftsman Site Work', category: 'General', tags: ['craftsmanship', 'quality'] },
  { id: 'gen-4', url: '/assets/company_introduction_craftsmanship.jpg', title: 'Craftsmanship Heritage', category: 'General', tags: ['heritage', 'masonry'] },
  { id: 'gen-5', url: '/assets/impact_completed_architecture.jpg', title: 'Landmark Architecture', category: 'General', tags: ['architecture', 'landmark'] },
];
