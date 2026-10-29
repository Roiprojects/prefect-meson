import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../common/StatusBadge';

interface ResidentialCardItem {
  id: string;
  client: string;
  statHeadline: string;
  badge: 'Luxury Villa' | 'Contemporary' | 'Multi-Storey' | 'Residential Complex';
  height: string;
  timeline: string;
  rating: string;
  location: string;
  city: string;
  sector: 'Luxury Villa' | 'Contemporary' | 'Multi-Storey' | 'Residential Complex';
  timelineCategory: '< 12 Mo' | '12–24 Mo' | '24+ Mo';
  image: string;
  status?: string;
}

const residentialShowcaseList: ResidentialCardItem[] = [
  {
    id: 'dr-anil-kush',
    client: 'Dr. Anil Kush',
    statHeadline: '12,500 SQ.FT',
    badge: 'Luxury Villa',
    height: 'G+2',
    timeline: '14 Mo',
    rating: 'Architecture Paradigm, 6th block, Koramangala',
    location: '# C2, Estate Club, Bangalore',
    city: 'Bangalore',
    sector: 'Luxury Villa',
    timelineCategory: '12–24 Mo',
    image: '/projects/dr_anil_kush/dr_anil_kush_01_facade_elevation.jpg'
  },
  {
    id: 'mr-sarabjith-ghose',
    client: 'Mr. Sarabjith Ghose',
    statHeadline: '5,800 SQ.FT',
    badge: 'Contemporary',
    height: 'G+2',
    timeline: '11 Mo',
    rating: 'Gaurav Roy Chaudary, 7th Sector, HSR Layout',
    location: '# 17, Mantri Lakeview Talagatpura, Kanakpura Main Road',
    city: 'Bangalore',
    sector: 'Contemporary',
    timelineCategory: '12–24 Mo',
    image: '/projects/mr_sarabjith_ghose/sarabjith_ghose_01_corner_elevation_wide.jpg'
  },
  {
    id: 'mr-vittal-das-shetty',
    client: 'Mr. Vittal Das Shetty',
    statHeadline: '9,500 SQ.FT',
    badge: 'Luxury Villa',
    height: 'G+2',
    timeline: '18 Mo',
    rating: 'Keystone Architects, Indiranagar',
    location: 'Asha Township, Doddagubbi, Hosakote',
    city: 'Bangalore',
    sector: 'Luxury Villa',
    timelineCategory: '12–24 Mo',
    image: '/projects/mr_vittal_das_shetty/vittal_das_shetty_01_stone_pylon_elevation.jpg'
  },
  {
    id: 'mr-praveen-kumar',
    client: 'Mr. Praveen Kumar',
    statHeadline: '7,800 SQ.FT',
    badge: 'Luxury Villa',
    height: 'G+2',
    timeline: '12 Mo',
    rating: 'Keystone Architects, Indiranagar',
    location: 'Tambuchetti Palya, KR Puram, Bangalore',
    city: 'Bangalore',
    sector: 'Luxury Villa',
    timelineCategory: '12–24 Mo',
    image: '/projects/mr_praveen_kumar/praveen_kumar_01_tiered_roof_elevation.png'
  },
  {
    id: 'mr-uma-shankar-agarwal',
    client: 'Mr. Uma Shankar Agarwal Residence',
    statHeadline: '6,200 SQ.FT',
    badge: 'Luxury Villa',
    height: 'G+2',
    timeline: '10 Mo',
    rating: 'Still Water Architects',
    location: 'JP Nagar Phase 2, Near Mini Forest, Bangalore',
    city: 'Bangalore',
    sector: 'Luxury Villa',
    timelineCategory: '12–24 Mo',
    image: '/projects/mr_uma_shankar_agarwal/uma_shankar_agarwal_01_double_height_living_mezzanine.png'
  },
  {
    id: 'mr-mahanthesh-bellad',
    client: 'Mr. Mahanthesh Bellad Residence',
    statHeadline: '7,200 SQ.FT',
    badge: 'Contemporary',
    height: 'G+2',
    timeline: '11 Mo',
    rating: 'MJC Architects',
    location: 'Jayanagar, Bangalore',
    city: 'Bangalore',
    sector: 'Contemporary',
    timelineCategory: '< 12 Mo',
    image: '/ndl_projects/slide_104_img_2.jpg'
  },
  {
    id: 'mr-tilak',
    client: 'Mr. Tilak Residence',
    statHeadline: '4,200 SQ.FT',
    badge: 'Multi-Storey',
    height: 'G+3',
    timeline: '10 Mo',
    rating: 'Kerala Gabled Spec',
    location: 'HSR Layout, 7th Sector, Bangalore',
    city: 'Bangalore',
    sector: 'Multi-Storey',
    timelineCategory: '< 12 Mo',
    image: '/projects/mr_tilak/tilak_01_terracotta_villa_facade.jpg'
  },
  {
    id: 'mr-kumar',
    client: 'Mr. Kumar',
    statHeadline: '5,800 SQ.FT',
    badge: 'Contemporary',
    height: 'G+3',
    timeline: '10 Mo',
    rating: 'Civil + MEP Spec',
    location: 'Jayanagar 5th Block, Bangalore',
    city: 'Bangalore',
    sector: 'Contemporary',
    timelineCategory: '< 12 Mo',
    image: '/projects/mr_kumar/kumar_01_contemporary_residence_facade.png'
  },
  {
    id: 'mrs-hema-saravanan',
    client: 'Mrs. Hema Saravanan',
    statHeadline: '4,900 SQ.FT',
    badge: 'Contemporary',
    height: 'G+3',
    timeline: '9 Mo',
    rating: 'Parallax Architects',
    location: 'Delmia Circle, JP Nagar, Bangalore',
    city: 'Bangalore',
    sector: 'Contemporary',
    timelineCategory: '< 12 Mo',
    image: '/projects/mrs_hema_saravanan/hema_saravanan_01_contemporary_urban_elevation.jpg'
  },
  {
    id: 'dr-niranjan',
    client: 'Dr. Niranjan',
    statHeadline: '4,800 SQ.FT',
    badge: 'Contemporary',
    height: 'G+2',
    timeline: '10 Mo',
    rating: 'Modernist Villa',
    location: '5th Block, Jayanagar, Bangalore',
    city: 'Bangalore',
    sector: 'Contemporary',
    timelineCategory: '< 12 Mo',
    image: '/projects/dr_niranjan/dr_niranjan_01_contemporary_white_villa_facade.jpg'
  },
  {
    id: 'mr-kishore',
    client: 'Mr. Kishore Residence',
    statHeadline: '4,500 SQ.FT',
    badge: 'Contemporary',
    height: 'G+2',
    timeline: '10 Mo',
    rating: 'Meenal J. Cavale',
    location: 'Yediyur, Jayanagar, Bangalore',
    city: 'Bangalore',
    sector: 'Contemporary',
    timelineCategory: '< 12 Mo',
    image: '/projects/mr_kishore/kishore_01_exposed_brick_pergola_facade.jpg'
  },
  {
    id: 'mr-sreeram',
    client: 'Mr. Sreeram Residential Building',
    statHeadline: '6,200 SQ.FT',
    badge: 'Multi-Storey',
    height: 'G+2',
    timeline: '12 Mo',
    rating: 'Meenal Cavale',
    location: 'Anjanapura, Bangalore',
    city: 'Bangalore',
    sector: 'Contemporary',
    timelineCategory: '12–24 Mo',
    image: '/projects/mr_sreeram/sreeram_01_exposed_brick_masonry_elevation.jpg'
  }
];

const locations = ['All', 'Bangalore', 'Sadashivanagar', 'Indiranagar', 'HSR Layout', 'Koramangala', 'Jayanagar', 'Anjanapura', 'Whitefield'];
const sectors = ['Luxury Villa', 'Contemporary', 'Multi-Storey', 'Residential Complex'];
const timelines = ['All', '< 12 Mo', '12–24 Mo', '24+ Mo'];

export const ResidentialProjectsFilter: React.FC = () => {
  const navigate = useNavigate();
  const { residentialItems, projects } = useData();
  const [activeLocation, setActiveLocation] = useState('All');
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [activeTimeline, setActiveTimeline] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const dynamicResidentialCards: ResidentialCardItem[] = residentialItems.map((item) => ({
    id: item.id || item.slug,
    client: item.client || item.title,
    statHeadline: item.builtArea || 'RESIDENTIAL ESTATE',
    badge: (item.category.includes('Villa') ? 'Luxury Villa' : item.category.includes('Eco') ? 'Contemporary' : 'Luxury Villa') as any,
    height: 'G+2',
    timeline: item.timeline || '14 Mo',
    rating: item.architect || 'Residential Studio',
    location: item.builtArea ? `${item.builtArea} • Bangalore` : 'Bangalore, India',
    city: 'Bangalore',
    sector: (item.category.includes('Villa') ? 'Luxury Villa' : item.category.includes('Eco') ? 'Contemporary' : 'Luxury Villa') as any,
    timelineCategory: '12–24 Mo',
    image: item.heroImage || '/assets/project_01_residential.jpg',
    status: item.status || 'Active',
  }));

  const galleryResidentialCards: ResidentialCardItem[] = projects
    .filter((p) => (p.category === 'Residential' || p.secondaryCategories?.includes('Residential')) && p.category !== 'Commercial' && !['mr-nataraj', 'mr-venkatarama-raju'].includes(p.id))
    .map((p) => ({
      id: p.id || p.slug,
      client: p.client || p.title,
      statHeadline: p.areaSqFt || 'RESIDENTIAL ESTATE',
      badge: 'Luxury Villa' as any,
      height: 'G+2',
      timeline: '12 Mo',
      rating: p.architect || 'Perfect Mason Residential Studio',
      location: p.location || 'Bengaluru, Karnataka',
      city: p.city || 'Bangalore',
      sector: 'Luxury Villa' as any,
      timelineCategory: '12–24 Mo',
      image: p.image || '/assets/project_01_residential.jpg',
      status: p.status || 'Active',
    }));

  const combinedCards = [
    ...dynamicResidentialCards,
    ...galleryResidentialCards.filter(g => !dynamicResidentialCards.some(d => d.id === g.id || d.client === g.client)),
  ];

  const allResidentialCards = [
    ...combinedCards,
    ...residentialShowcaseList.filter(s => !combinedCards.some(d => d.id === s.id || d.client.toLowerCase() === s.client.toLowerCase()))
  ];

  const clearFilters = () => {
    setActiveLocation('All');
    setActiveSector(null);
    setActiveTimeline('All');
    setSearchQuery('');
  };

  const filteredItems = allResidentialCards.filter((item) => {
    if (activeLocation !== 'All' && item.city !== activeLocation && !item.location.toLowerCase().includes(activeLocation.toLowerCase())) {
      return false;
    }
    if (activeSector !== null && item.sector !== activeSector) {
      return false;
    }
    if (activeTimeline !== 'All' && item.timelineCategory !== activeTimeline) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchClient = item.client.toLowerCase().includes(q);
      const matchStat = item.statHeadline.toLowerCase().includes(q);
      const matchLoc = item.location.toLowerCase().includes(q);
      const matchSec = item.sector.toLowerCase().includes(q);
      if (!matchClient && !matchStat && !matchLoc && !matchSec) return false;
    }
    return true;
  });

  return (
    <section id="residential-showcase" className="relative w-full bg-white text-slate-900 py-12 sm:py-16 border-b border-slate-200 scroll-mt-28 sm:scroll-mt-36">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* 2-COLUMN LAYOUT: STICKY FILTERS SIDEBAR + 2-COLUMN PROJECT GRID */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* LEFT SIDEBAR: FILTERS */}
          <aside className="w-full lg:w-[280px] xl:w-[300px] shrink-0 bg-[#F8FAFC] rounded-2xl sm:rounded-3xl p-6 border border-slate-200/80 shadow-xs lg:sticky lg:top-[100px]">
            {/* Header row: Filters + Clear all */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight">Filters</h3>
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-slate-500 hover:text-slate-900 font-medium transition-colors cursor-pointer"
              >
                Clear all
              </button>
            </div>

            {/* Search Box */}
            <div className="relative mb-5">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search residential..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 shadow-2xs"
              />
            </div>

            {/* LOCATION FILTER */}
            <div className="mb-5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 font-sans">
                LOCATION
              </div>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc) => {
                  const isSelected = activeLocation === loc;
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setActiveLocation(loc)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#0B132B] text-white font-semibold shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {loc}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTOR / TYPOLOGY FILTER */}
            <div className="mb-5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 font-sans">
                TYPOLOGY
              </div>
              <div className="flex flex-wrap gap-2">
                {sectors.map((sec) => {
                  const isSelected = activeSector === sec;
                  return (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setActiveSector(isSelected ? null : sec)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#0B132B] text-white font-semibold shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {sec}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TIMELINE FILTER */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 font-sans">
                TIMELINE
              </div>
              <div className="flex flex-wrap gap-2">
                {timelines.map((time) => {
                  const isSelected = activeTimeline === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setActiveTimeline(time)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#0B132B] text-white font-semibold shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* RIGHT GRID: 2-COLUMN PROJECT CARDS */}
          <div className="flex-1 w-full">
            {filteredItems.length === 0 ? (
              <div className="bg-[#F8FAFC] rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-base text-slate-600 font-medium mb-3">
                  No residential projects match the selected filter criteria.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-5 py-2.5 rounded-full bg-[#0B132B] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {filteredItems.map((project, idx) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.03, duration: 0.35 }}
                      onClick={() => navigate(`/projects/${project.id}`)}
                      className="group relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-slate-950"
                    >
                      {/* Full-bleed Project Image */}
                      <img
                        src={project.image}
                        alt={project.client}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />

                      {/* Smooth Dark Bottom Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                      {/* Top Left Status Badge (Active Model / Completed Handover / Upcoming Release) */}
                      <div className="absolute top-4 left-4 z-10">
                        <StatusBadge status={project.status || 'Active'} variant="glass" />
                      </div>

                      {/* Top Right Badge */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-slate-900 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md z-10">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
                        <span>{project.badge}</span>
                      </div>

                      {/* Bottom Content Area */}
                      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white z-10">
                        <div className="text-sm font-normal text-white/90 drop-shadow-sm font-sans">
                          {project.client}
                        </div>

                        <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight my-1.5 drop-shadow-md font-sans">
                          {project.statHeadline}
                        </div>

                        {/* Metadata Strip */}
                        <div className="flex items-center gap-4 text-xs sm:text-sm text-white/85 font-normal pt-1.5 font-sans">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 opacity-80" />
                            <span>{project.height}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 opacity-80" />
                            <span>{project.timeline}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 opacity-80" />
                            <span className="truncate max-w-[140px]">{project.rating}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
