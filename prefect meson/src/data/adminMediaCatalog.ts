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
  // Residential
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

  // Commercial
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

  // Turnkey EPC
  { id: 'tk-1', url: '/assets/turnkey_hero.jpg', title: 'Full EPC Turnkey Infrastructure', category: 'Turnkey', tags: ['turnkey', 'epc', 'engineering'] },
  { id: 'tk-2', url: '/assets/turnkey_main_hero.jpg', title: 'End-to-End Civil & Structural Site', category: 'Turnkey', tags: ['turnkey', 'site', 'infrastructure'] },
  { id: 'tk-3', url: '/assets/project_03_turnkey.jpg', title: 'Integrated Development Complex', category: 'Turnkey', tags: ['turnkey', 'development'] },
  { id: 'tk-4', url: '/assets/showcase_03_turnkey.jpg', title: 'Precision Steel Construction Site', category: 'Turnkey', tags: ['turnkey', 'steel', 'structure'] },
  { id: 'tk-5', url: '/assets/service_turnkey_corp.jpg', title: 'EPC Project Engineering Control', category: 'Turnkey', tags: ['engineering', 'control', 'turnkey'] },
  { id: 'tk-6', url: '/assets/corp_main_construction.jpg', title: 'Foundation & Structural Works', category: 'Turnkey', tags: ['foundation', 'civil', 'heavy'] },
  { id: 'tk-7', url: '/assets/impact_active_construction.jpg', title: 'Active Construction Project Site', category: 'Turnkey', tags: ['active', 'site', 'cranes'] },

  // Interiors
  { id: 'int-1', url: '/assets/interior_01_living.jpg', title: 'Opulent Marble Living Suite', category: 'Interiors', tags: ['interior', 'living', 'marble'] },
  { id: 'int-2', url: '/assets/interior_02_kitchen.jpg', title: 'Bespoke Gourmet German Kitchen', category: 'Interiors', tags: ['interior', 'kitchen', 'island'] },
  { id: 'int-3', url: '/assets/interior_03_bedroom.jpg', title: 'Master Sanctuary Suite & Walk-In', category: 'Interiors', tags: ['interior', 'bedroom', 'sanctuary'] },
  { id: 'int-4', url: '/assets/interior_04_office.jpg', title: 'Executive Boardroom & Private Office', category: 'Interiors', tags: ['interior', 'office', 'executive'] },
  { id: 'int-5', url: '/assets/portfolio_04_interior.jpg', title: 'Modern Minimalist Lounge', category: 'Interiors', tags: ['interior', 'minimalist', 'lounge'] },
  { id: 'int-6', url: '/assets/service_interiors_corp.jpg', title: 'Turnkey Architectural Interiors', category: 'Interiors', tags: ['interior', 'architecture', 'fitout'] },
  { id: 'int-7', url: '/assets/service_interior_generated.jpg', title: 'Custom Wood & Brass Millwork', category: 'Interiors', tags: ['interior', 'millwork', 'wood'] },

  // Projects & Architectural Gallery (NDL Series)
  { id: 'proj-1', url: '/ndl_projects/slide_011_img_1.jpg', title: 'Modern Facade Elevation', category: 'Projects', tags: ['facade', 'elevation'] },
  { id: 'proj-2', url: '/ndl_projects/slide_012_img_1.jpg', title: 'Villa Grand Entrance Gate', category: 'Projects', tags: ['entrance', 'gate'] },
  { id: 'proj-3', url: '/ndl_projects/slide_013_img_1.jpg', title: 'Landscape Courtyard Villa', category: 'Projects', tags: ['courtyard', 'landscape'] },
  { id: 'proj-4', url: '/ndl_projects/slide_014_img_1.jpg', title: 'Double Height Living Room', category: 'Projects', tags: ['living', 'interior'] },
  { id: 'proj-5', url: '/ndl_projects/slide_016_img_1.jpg', title: 'Cantilever Balcony Architecture', category: 'Projects', tags: ['balcony', 'structure'] },
  { id: 'proj-6', url: '/ndl_projects/slide_018_img_1.jpg', title: 'Infinity Pool & Decking', category: 'Projects', tags: ['pool', 'deck', 'luxury'] },
  { id: 'proj-7', url: '/ndl_projects/slide_021_img_1.jpg', title: 'Pergola Garden Dining Area', category: 'Projects', tags: ['pergola', 'garden'] },
  { id: 'proj-8', url: '/ndl_projects/slide_025_img_1.jpg', title: 'Modern Steel Staircase Atrium', category: 'Projects', tags: ['staircase', 'atrium'] },
  { id: 'proj-9', url: '/ndl_projects/slide_028_img_1.jpg', title: 'Master Bed Panorama View', category: 'Projects', tags: ['bedroom', 'view'] },
  { id: 'proj-10', url: '/ndl_projects/slide_034_img_1.jpg', title: 'Acoustic Home Cinema Lounge', category: 'Projects', tags: ['cinema', 'entertainment'] },
  { id: 'proj-11', url: '/ndl_projects/slide_038_img_1.jpg', title: 'Commercial Plaza Night Elevation', category: 'Projects', tags: ['night', 'lighting', 'plaza'] },
  { id: 'proj-12', url: '/ndl_projects/slide_042_img_1.jpg', title: 'Corporate Double Height Lobby', category: 'Projects', tags: ['lobby', 'reception'] },
  { id: 'proj-13', url: '/ndl_projects/slide_046_img_1.jpg', title: 'Smart Automated Conference Suite', category: 'Projects', tags: ['conference', 'meeting'] },
  { id: 'proj-14', url: '/ndl_projects/slide_050_img_1.jpg', title: 'Industrial Grade Heavy Steel Truss', category: 'Projects', tags: ['industrial', 'steel', 'truss'] },
  { id: 'proj-15', url: '/ndl_projects/slide_056_img_1.jpg', title: 'Pre-Engineered Building Framework', category: 'Projects', tags: ['peb', 'framework'] },
  { id: 'proj-16', url: '/ndl_projects/slide_062_img_1.jpg', title: 'Structural Concrete Pouring Phase', category: 'Projects', tags: ['concrete', 'construction'] },
  { id: 'proj-17', url: '/ndl_projects/slide_068_img_1.jpg', title: 'Finished Architectural Exterior', category: 'Projects', tags: ['exterior', 'completed'] },
  { id: 'proj-18', url: '/ndl_projects/slide_074_img_1.jpg', title: 'Bespoke Lighting Design Ceiling', category: 'Projects', tags: ['lighting', 'ceiling'] },
  { id: 'proj-19', url: '/ndl_projects/slide_080_img_1.jpg', title: 'Architectural Stone Cladding Details', category: 'Projects', tags: ['stone', 'cladding'] },
  { id: 'proj-20', url: '/ndl_projects/slide_094_img_1.jpg', title: 'Turnkey Handover Masterpiece', category: 'Projects', tags: ['handover', 'turnkey'] },

  // General & Branding
  { id: 'gen-1', url: '/images/hero-desktop.jpg', title: 'Perfect Mason Main Architectural Hero', category: 'General', tags: ['hero', 'main', 'brand'] },
  { id: 'gen-2', url: '/assets/about_trust_stack.jpg', title: 'Engineering Precision Stack', category: 'General', tags: ['engineering', 'trust'] },
  { id: 'gen-3', url: '/assets/why_choose_trust_craft.jpg', title: 'Master Craftsman Site Work', category: 'General', tags: ['craftsmanship', 'quality'] },
  { id: 'gen-4', url: '/assets/company_introduction_craftsmanship.jpg', title: 'Craftsmanship Heritage', category: 'General', tags: ['heritage', 'masonry'] },
  { id: 'gen-5', url: '/assets/impact_completed_architecture.jpg', title: 'Landmark Architecture', category: 'General', tags: ['architecture', 'landmark'] },
];
