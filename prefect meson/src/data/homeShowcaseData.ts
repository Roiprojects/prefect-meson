export interface HomeShowcaseSlide {
  id: string;
  image: string;
  title?: string;
  category?: string;
  location?: string;
  architect?: string;
  timeline?: string;
  scope?: string;
  order: number;
  active: boolean;
}

export const defaultHomeShowcaseSlides: HomeShowcaseSlide[] = [
  {
    id: 'proj-slide-01',
    image: '/projects/dr_anil_kush/dr_anil_kush_01_facade_elevation.jpg',
    order: 1,
    active: true,
  },
  {
    id: 'proj-slide-02',
    image: '/projects/mr_sarabjith_ghose/sarabjith_ghose_01_corner_elevation_wide.jpg',
    order: 2,
    active: true,
  },
  {
    id: 'proj-slide-03',
    image: '/projects/24x7_solutions/24x7_solutions_01_reception_desk.png',
    order: 3,
    active: true,
  },
  {
    id: 'proj-slide-04',
    image: '/projects/mr_praveen_kumar/praveen_kumar_01_front_gabled_elevation.png',
    order: 4,
    active: true,
  },
  {
    id: 'proj-slide-05',
    image: '/projects/mr_vittal_das_shetty/vittal_das_shetty_01_stone_pylon_elevation.jpg',
    order: 5,
    active: true,
  },
  {
    id: 'proj-slide-06',
    image: '/projects/take_5_bar/take_5_bar_01_granite_counter_wine_rack.png',
    order: 6,
    active: true,
  },
  {
    id: 'proj-slide-07',
    image: '/projects/mr_tilak/tilak_01_terracotta_villa_facade.jpg',
    order: 7,
    active: true,
  },
  {
    id: 'proj-slide-08',
    image: '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_06_travertine_facade_entrance_gate.png',
    order: 8,
    active: true,
  },
  {
    id: 'proj-slide-09',
    image: '/projects/mr_amith/amith_01_geometric_elevation_portrait.jpg',
    order: 9,
    active: true,
  },
  {
    id: 'proj-slide-10',
    image: '/projects/farm_india_office/farm_india_02_executive_cabin_workstation.png',
    order: 10,
    active: true,
  },
  {
    id: 'proj-slide-11',
    image: '/projects/mr_kumar/kumar_01_contemporary_residence_facade.png',
    order: 11,
    active: true,
  },
  {
    id: 'proj-slide-12',
    image: '/projects/mr_nataraj/nataraj_01_commercial_complex_street_view.png',
    order: 12,
    active: true,
  },
  {
    id: 'proj-slide-13',
    image: '/projects/mr_shekar/shekar_01_terracotta_villa_elevation.png',
    order: 13,
    active: true,
  },
  {
    id: 'proj-slide-14',
    image: '/projects/mr_mahanthesh_bellad/bellad_01_cantilevered_brick_jaali_facade.png',
    order: 14,
    active: true,
  },
  {
    id: 'proj-slide-15',
    image: '/projects/mrs_hema_saravanan/hema_saravanan_01_contemporary_urban_elevation.jpg',
    order: 15,
    active: true,
  },
  {
    id: 'proj-slide-16',
    image: '/projects/dr_niranjan/dr_niranjan_01_contemporary_white_villa_facade.jpg',
    order: 16,
    active: true,
  },
  {
    id: 'proj-slide-17',
    image: '/projects/mr_kishore/kishore_01_exposed_brick_pergola_facade.jpg',
    order: 17,
    active: true,
  },
  {
    id: 'proj-slide-18',
    image: '/projects/mr_venkatarama_raju/raju_01_commercial_facade_retail.jpg',
    order: 18,
    active: true,
  },
  {
    id: 'proj-slide-19',
    image: '/projects/mr_sreeram/sreeram_01_exposed_brick_masonry_elevation.jpg',
    order: 19,
    active: true,
  },
  {
    id: 'proj-slide-20',
    image: '/projects/mr_rakesh_n_rao/rakesh_n_rao_01_villa_facade_gate.jpg',
    order: 20,
    active: true,
  },
];
