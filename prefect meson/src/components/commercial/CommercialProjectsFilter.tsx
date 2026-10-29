import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../common/StatusBadge';

interface CommercialCardItem {
  id: string;
  client: string;
  statHeadline: string;
  badge: 'Turnkey' | 'Civil & Core' | 'Interiors' | 'Commercial Fit-Out' | 'Commercial';
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

// 5 Approved Commercial & Business Projects with strict image isolation and NO prices
const commercialShowcaseList: CommercialCardItem[] = [
  {
    id: 'mr-venkatarama-raju',
    client: 'Mr. Venkatarama Raju',
    statHeadline: 'G+4 COMMERCIAL',
    badge: 'Civil & Core',
    height: 'G+4',
    timeline: '12 Mo',
    rating: 'Meenal Cavale (MJC Architects)',
    location: 'JP Nagar 9th Phase, Bangalore',
    city: 'Bangalore',
    sector: 'Retail',
    timelineCategory: '12–24 Mo',
    image: '/projects/mr_venkatarama_raju/raju_01_commercial_facade_retail.jpg'
  },
  {
    id: 'mr-nataraj',
    client: 'Mr. Nataraj',
    statHeadline: 'COMMERCIAL CUM RESIDENCE',
    badge: 'Civil & Core',
    height: 'G+4',
    timeline: '10 Mo',
    rating: 'Incept Architects',
    location: 'HSR Layout, 27th Main, Bangalore',
    city: 'Bangalore',
    sector: 'Retail',
    timelineCategory: '< 12 Mo',
    image: '/projects/mr_nataraj/nataraj_01_commercial_complex_street_view.png'
  },
  {
    id: 'take-5-bar',
    client: 'TAKE 5 Bar and Restaurant',
    statHeadline: 'COMMERCIAL BAR & RESTAURANT',
    badge: 'Commercial',
    height: 'G+2',
    timeline: '4 Mo',
    rating: 'Kiran and Associate, Bombay',
    location: '3rd Main, Defence Colony, Indiranagar, Bangalore',
    city: 'Bangalore',
    sector: 'Hospitality',
    timelineCategory: '< 12 Mo',
    image: '/projects/take_5_bar/take_5_bar_01_granite_counter_wine_rack.png'
  },
];

const locations = ['All', 'Bangalore', 'JP Nagar', 'HSR Layout', 'Indiranagar', 'Koramangala', 'Ulsoor Lake'];
const sectors = ['Office', 'Retail', 'Hospitality'];
const timelines = ['All', '< 12 Mo', '12–24 Mo'];

export const CommercialProjectsFilter: React.FC = () => {
  const navigate = useNavigate();
  const { commercialItems, projects } = useData();
  const [activeLocation, setActiveLocation] = useState('All');
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [activeTimeline, setActiveTimeline] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Restrict strictly to the 5 approved commercial / business projects
  const allowedCommercialIds = [
    'mr-venkatarama-raju',
    'mr-nataraj',
    '24x7-solutions',
    'take-5-bar',
  ];

  const dynamicCommercialCards: CommercialCardItem[] = commercialItems
    .filter(item => allowedCommercialIds.includes(item.id || item.slug))
    .map((item) => ({
      id: item.id || item.slug,
      client: item.client || item.title,
      statHeadline: item.builtArea ? `${item.builtArea} SCALE` : 'COMMERCIAL SCALE',
      badge: (item.category.includes('Turnkey') ? 'Turnkey' : item.category.includes('Shell') ? 'Civil & Core' : 'Interiors') as any,
      height: 'G+4',
      timeline: item.timeline || '12 Mo',
      rating: item.architect || 'Commercial Studio',
      location: item.builtArea ? `${item.builtArea} • Bangalore` : 'Bangalore, India',
      city: 'Bangalore',
      sector: (item.category.includes('Office') ? 'Office' : item.category.includes('Retail') ? 'Retail' : item.category.includes('Hospitality') ? 'Hospitality' : 'Office') as any,
      timelineCategory: '12–24 Mo',
      image: item.heroImage || '/projects/mr_venkatarama_raju/raju_01_commercial_facade_retail.jpg',
      status: item.status || 'Completed',
    }));

  const galleryCommercialCards: CommercialCardItem[] = projects
    .filter((p) => allowedCommercialIds.includes(p.id))
    .map((p) => ({
      id: p.id || p.slug,
      client: p.client || p.title,
      statHeadline: p.areaSqFt ? `${p.areaSqFt} SCALE` : 'COMMERCIAL SCALE',
      badge: (p.category === 'Interiors' || p.secondaryCategories?.includes('Interiors') ? 'Interiors' : 'Civil & Core') as any,
      height: 'G+4',
      timeline: '12 Mo',
      rating: p.architect || 'Perfect Mason Commercial Studio',
      location: p.location || 'Bengaluru, Karnataka',
      city: 'Bangalore',
      sector: (p.id === 'take-5-bar' ? 'Hospitality' : p.id === '24x7-solutions' ? 'Office' : 'Retail') as any,
      timelineCategory: '12–24 Mo',
      image: p.image || '/projects/mr_venkatarama_raju/raju_01_commercial_facade_retail.jpg',
      status: p.status || 'Completed',
    }));

  const combinedCards = [
    ...dynamicCommercialCards,
    ...galleryCommercialCards.filter(g => !dynamicCommercialCards.some(d => d.id === g.id || d.client === g.client)),
  ];

  // Prioritize commercialShowcaseList with exact approved data
  const allCommercialCards = [
    ...commercialShowcaseList,
    ...combinedCards.filter(c => !commercialShowcaseList.some(s => s.id === c.id))
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
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-950" />
                Filter Projects
              </span>
              {(activeLocation !== 'All' || activeSector !== null || activeTimeline !== 'All' || searchQuery !== '') && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[11px] font-mono font-medium text-slate-500 hover:text-slate-950 transition-colors cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* SEARCH INPUT */}
            <div className="mb-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-950 transition-colors"
                />
              </div>
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
                      {/* FULL BACKGROUND IMAGE */}
                      <img
                        src={project.image}
                        alt={project.client}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/projects/mr_venkatarama_raju/raju_01_commercial_facade_retail.jpg';
                        }}
                      />

                      {/* MULTI-STAGE GRADIENT OVERLAYS */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />

                      {/* TOP BADGES ROW */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-white/95 text-slate-900 font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                            {project.badge}
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-mono text-[10px] font-medium border border-white/10">
                            {project.height}
                          </span>
                        </div>
                        <StatusBadge status={project.status || 'Completed'} size="sm" variant="glass" />
                      </div>

                      {/* BOTTOM CONTENT CONTAINER */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
                        {/* STAT HEADLINE (BUILT SCALE - NO PRICES) */}
                        <div className="font-mono text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#C8A96B]" />
                          <span>{project.statHeadline}</span>
                        </div>

                        {/* CLIENT / PROJECT TITLE */}
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide leading-tight mb-2 group-hover:text-[#DFCA98] transition-colors">
                          {project.client}
                        </h3>

                        {/* ARCHITECT & SCOPE METADATA */}
                        <div className="flex items-center gap-2 text-xs font-sans text-slate-300 mb-3">
                          <span className="text-[#C8A96B] font-medium">{project.rating}</span>
                          <span className="text-slate-500">•</span>
                          <span className="truncate">{project.location}</span>
                        </div>

                        {/* TIMELINE & COMPLETION BADGE */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/15 text-[11px] font-mono text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {project.timeline} Duration
                          </span>
                          <span className="text-white font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            View Case Study →
                          </span>
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
