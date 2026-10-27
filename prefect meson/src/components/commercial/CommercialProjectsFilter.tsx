import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../common/StatusBadge';

interface CommercialCardItem {
  id: string;
  client: string;
  statHeadline: string;
  badge: 'Turnkey' | 'Civil & Core' | 'Interiors' | 'Commercial Fit-Out';
  height: string;
  timeline: string;
  rating: string;
  location: string;
  city: string;
  sector: 'Office' | 'Retail' | 'Hospitality' | 'Industrial' | 'Institutional';
  timelineCategory: '< 12 Mo' | '12–24 Mo' | '24+ Mo';
  image: string;
  status?: string;
}

const commercialShowcaseList: CommercialCardItem[] = [
  {
    id: 'nexus-corporate-park',
    client: 'Nexus Corporate Park',
    statHeadline: '180,000 SQ.FT',
    badge: 'Turnkey',
    height: 'G+8',
    timeline: '18 Mo',
    rating: 'LEED Gold',
    location: 'Outer Ring Road, Bangalore',
    city: 'Bangalore',
    sector: 'Office',
    timelineCategory: '12–24 Mo',
    image: '/ndl_projects/slide_042_img_1.jpg'
  },
  {
    id: 'aura-commercial-hub',
    client: 'Aura Commercial Hub',
    statHeadline: '220,000 SQ.FT',
    badge: 'Civil & Core',
    height: 'G+12',
    timeline: '24 Mo',
    rating: 'Platinum',
    location: 'Whitefield Commercial Zone, Bangalore',
    city: 'Bangalore',
    sector: 'Retail',
    timelineCategory: '12–24 Mo',
    image: '/ndl_projects/slide_097_img_1.jpg'
  },
  {
    id: '24x7-solutions',
    client: '24x7 Solutions',
    statHeadline: '140,000 SQ.FT',
    badge: 'Turnkey',
    height: 'G+5',
    timeline: '10 Mo',
    rating: 'Keystone Architects, Indiranagar',
    location: 'Near Ulsoor Lake, Bangalore',
    city: 'Bangalore',
    sector: 'Office',
    timelineCategory: '< 12 Mo',
    image: '/projects/24x7_solutions/24x7_solutions_01_reception_desk.png'
  },
  {
    id: 'mr-nataraj',
    client: 'Mr. Nataraj Complex',
    statHeadline: '₹1.80 CRORE',
    badge: 'Civil & Core',
    height: 'G+4',
    timeline: '18 Mo',
    rating: 'NDL Civil + MEP',
    location: 'HSR Layout, 27th Main, Bangalore',
    city: 'Bangalore',
    sector: 'Retail',
    timelineCategory: '12–24 Mo',
    image: '/ndl_projects/slide_097_img_2.jpg'
  },
  {
    id: 'take-5-bar',
    client: 'TAKE 5 Bar & Restaurant',
    statHeadline: 'HOSPITALITY FIT-OUT',
    badge: 'Turnkey',
    height: 'G+2',
    timeline: '8 Mo',
    rating: 'Acoustic Spec',
    location: 'Defence Colony, Indiranagar, Bangalore',
    city: 'Bangalore',
    sector: 'Hospitality',
    timelineCategory: '< 12 Mo',
    image: '/projects/take_5_bar/take_5_bar_01_granite_counter_wine_rack.png'
  },
  {
    id: 'farm-india-office',
    client: 'Farm India Office',
    statHeadline: '₹52 LAKHS',
    badge: 'Interiors',
    height: 'G+3',
    timeline: '6 Mo',
    rating: 'Corporate Spec',
    location: 'Koramangala, Bangalore',
    city: 'Bangalore',
    sector: 'Office',
    timelineCategory: '< 12 Mo',
    image: '/projects/farm_india_office/farm_india_01_open_workspace_ducted_ac.png'
  },
  {
    id: 'mr-venkatarama-raju',
    client: 'Mr. Venkatarama Raju Commercial',
    statHeadline: 'G+4 COMMERCIAL',
    badge: 'Civil & Core',
    height: 'G+4',
    timeline: '14 Mo',
    rating: 'MJC Architects',
    location: 'JP Nagar 9th Phase, Bangalore',
    city: 'Bangalore',
    sector: 'Retail',
    timelineCategory: '12–24 Mo',
    image: '/ndl_projects/slide_124_img_1.jpg'
  },
  {
    id: 'zenith-tech-tower',
    client: 'Zenith Tech Tower',
    statHeadline: '260,000 SQ.FT',
    badge: 'Turnkey',
    height: 'G+14',
    timeline: '26 Mo',
    rating: 'IGBC Platinum',
    location: 'Electronic City Phase 1, Bangalore',
    city: 'Bangalore',
    sector: 'Industrial',
    timelineCategory: '24+ Mo',
    image: '/ndl_projects/slide_046_img_1.jpg'
  }
];

const locations = ['All', 'Bangalore', 'Indiranagar', 'Koramangala', 'HSR Layout', 'Electronic City'];
const sectors = ['Office', 'Retail', 'Hospitality', 'Industrial', 'Institutional'];
const timelines = ['All', '< 12 Mo', '12–24 Mo', '24+ Mo'];

export const CommercialProjectsFilter: React.FC = () => {
  const navigate = useNavigate();
  const { commercialItems, projects } = useData();
  const [activeLocation, setActiveLocation] = useState('All');
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [activeTimeline, setActiveTimeline] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const dynamicCommercialCards: CommercialCardItem[] = commercialItems.map((item) => ({
    id: item.id || item.slug,
    client: item.client || item.title,
    statHeadline: item.builtArea || 'COMMERCIAL SCALE',
    badge: (item.category.includes('Turnkey') ? 'Turnkey' : item.category.includes('Shell') ? 'Civil & Core' : 'Commercial Fit-Out') as any,
    height: 'G+4',
    timeline: item.timeline || '12 Mo',
    rating: item.architect || 'Commercial Studio',
    location: item.builtArea ? `${item.builtArea} • Bangalore` : 'Bangalore, India',
    city: 'Bangalore',
    sector: (item.category.includes('Office') ? 'Office' : item.category.includes('Retail') ? 'Retail' : item.category.includes('Industrial') ? 'Industrial' : 'Office') as any,
    timelineCategory: '12–24 Mo',
    image: item.heroImage || '/assets/comm_complex_hero.jpg',
    status: item.status || 'Active',
  }));

  const galleryCommercialCards: CommercialCardItem[] = projects
    .filter((p) => p.category === 'Commercial' || p.secondaryCategories?.includes('Commercial'))
    .map((p) => ({
      id: p.id || p.slug,
      client: p.client || p.title,
      statHeadline: p.areaSqFt || 'COMMERCIAL SCALE',
      badge: (p.secondaryCategories?.includes('Turnkey') ? 'Turnkey' : 'Civil & Core') as any,
      height: 'G+4',
      timeline: '14 Mo',
      rating: p.architect || 'Perfect Mason Commercial Studio',
      location: p.location || 'Bengaluru, Karnataka',
      city: p.city || 'Bangalore',
      sector: 'Retail',
      timelineCategory: '12–24 Mo',
      image: p.image || '/assets/comm_complex_hero.jpg',
      status: p.status || 'Active',
    }));

  const combinedCards = [
    ...dynamicCommercialCards,
    ...galleryCommercialCards.filter(g => !dynamicCommercialCards.some(d => d.id === g.id || d.client === g.client)),
  ];

  const allCommercialCards = [
    ...combinedCards,
    ...commercialShowcaseList.filter(s => !combinedCards.some(d => d.id === s.id || d.client.toLowerCase() === s.client.toLowerCase()))
  ];

  const clearFilters = () => {
    setActiveLocation('All');
    setActiveSector(null);
    setActiveTimeline('All');
    setSearchQuery('');
  };

  const filteredItems = allCommercialCards.filter((item) => {
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
    <section className="relative w-full bg-white text-slate-900 py-12 sm:py-16 border-b border-slate-200">
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
                placeholder="Search commercial..."
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

            {/* SECTOR FILTER */}
            <div className="mb-5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 font-sans">
                SECTOR
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
                  No commercial projects match the selected filter criteria.
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
                            <span>{project.rating}</span>
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
