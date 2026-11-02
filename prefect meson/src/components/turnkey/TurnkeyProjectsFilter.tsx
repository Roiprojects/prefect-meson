import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../common/StatusBadge';

interface TurnkeyCardItem {
  id: string;
  client: string;
  statHeadline: string;
  badge: 'EPC Turnkey' | 'Commercial EPC' | 'Residential Turnkey' | 'Fit-Out EPC';
  height: string;
  timeline: string;
  rating: string;
  location: string;
  city: string;
  sector: 'Commercial EPC' | 'Residential Turnkey';
  timelineCategory: '< 12 Mo' | '12–24 Mo' | '24+ Mo';
  image: string;
  status?: string;
}

const turnkeyShowcaseList: TurnkeyCardItem[] = [
  {
    id: 'turnkey-luxury-residential-villa',
    client: 'Turnkey Luxury Residential Villa & Estate',
    statHeadline: 'RESIDENTIAL TURNKEY',
    badge: 'Residential Turnkey',
    height: 'G+2',
    timeline: '14 Months',
    rating: 'Single-Source Delivery',
    location: 'Bengaluru, India',
    city: 'Bangalore',
    sector: 'Residential Turnkey',
    timelineCategory: '12–24 Mo',
    image: '/assets/about_hero_villa.jpg',
    status: 'Active'
  },
  {
    id: 'turnkey-commercial-complex',
    client: 'Turnkey Commercial Complex & Corporate Facility',
    statHeadline: 'COMMERCIAL EPC',
    badge: 'Commercial EPC',
    height: 'G+4',
    timeline: '16 Months',
    rating: 'Integrated EPC Cell',
    location: 'Bengaluru, India',
    city: 'Bangalore',
    sector: 'Commercial EPC',
    timelineCategory: '12–24 Mo',
    image: '/assets/commercial_hero.jpg',
    status: 'Active'
  }
];

const locations = ['All', 'Bangalore', 'Whitefield', 'Indiranagar', 'Sadashivanagar', 'HSR Layout', 'Electronic City'];
const sectors = ['Commercial EPC', 'Residential Turnkey'];
const timelines = ['All', '< 12 Mo', '12–24 Mo', '24+ Mo'];

export const TurnkeyProjectsFilter: React.FC = () => {
  const navigate = useNavigate();
  const { turnkeyItems } = useData();
  const [activeLocation, setActiveLocation] = useState('All');
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [activeTimeline, setActiveTimeline] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const dynamicTurnkeyCards: TurnkeyCardItem[] = turnkeyItems.slice(0, 2).map((item) => ({
    id: item.id || item.slug || 'turnkey-project',
    client: item.title || item.client || 'Turnkey Project',
    statHeadline: item.category?.toUpperCase() || 'TURNKEY PROJECT',
    badge: (item.category?.includes('Commercial') ? 'Commercial EPC' : 'Residential Turnkey') as any,
    height: (item.category?.includes('Commercial') ? 'G+4' : 'G+2'),
    timeline: item.timeline || (item.category?.includes('Commercial') ? '16 Months' : '14 Months'),
    rating: item.architect || (item.category?.includes('Commercial') ? 'Integrated EPC Cell' : 'Single-Source Delivery'),
    location: 'Bengaluru, India',
    city: 'Bangalore',
    sector: (item.category?.includes('Commercial') ? 'Commercial EPC' : 'Residential Turnkey') as any,
    timelineCategory: '12–24 Mo',
    image: item.heroImage || (item.category?.includes('Commercial') ? '/assets/commercial_hero.jpg' : '/assets/about_hero_villa.jpg'),
    status: item.status || 'Active',
  }));

  const allTurnkeyCards = dynamicTurnkeyCards.length === 2 ? dynamicTurnkeyCards : turnkeyShowcaseList;

  const clearFilters = () => {
    setActiveLocation('All');
    setActiveSector(null);
    setActiveTimeline('All');
    setSearchQuery('');
  };

  const filteredItems = allTurnkeyCards.filter((item) => {
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
      const matchLoc = item.location.toLowerCase().includes(q);
      const matchSec = item.sector.toLowerCase().includes(q);
      if (!matchClient && !matchLoc && !matchSec) return false;
    }
    return true;
  });

  return (
    <section id="turnkey-showcase" className="relative w-full bg-white text-slate-900 py-12 sm:py-16 border-b border-slate-200 scroll-mt-28 sm:scroll-mt-36">
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
                placeholder="Search turnkey..."
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

            {/* SECTOR / SCOPE FILTER */}
            <div className="mb-5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 font-sans">
                SCOPE TYPE
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
                  No turnkey projects match the selected filter criteria.
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
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (project.badge?.includes('Commercial') || project.sector?.includes('Commercial')) {
                            target.src = '/assets/commercial_hero.jpg';
                          } else {
                            target.src = '/assets/about_hero_villa.jpg';
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="eager"
                      />

                      {/* Smooth Dark Bottom Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                      {/* Top Left Status Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <StatusBadge status={project.status || 'Active'} variant="glass" />
                      </div>

                      {/* Top Right Badge */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-slate-900 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md z-10">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
                        <span>{project.badge}</span>
                      </div>

                      {/* Bottom Content Area - Clean Title & Metadata without SQ.FT Headline */}
                      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white z-10">
                        <div className="text-xs font-mono font-bold tracking-widest text-[#C8A96B] uppercase mb-1 drop-shadow-sm">
                          {project.badge}
                        </div>

                        <h3 className="text-xl sm:text-2xl lg:text-[1.65rem] font-bold text-white uppercase tracking-tight leading-snug my-1 drop-shadow-md font-barlow">
                          {project.client}
                        </h3>

                        {/* Metadata Strip */}
                        <div className="flex items-center gap-4 text-xs sm:text-sm text-white/85 font-normal pt-2 font-sans">
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
                            <span className="truncate max-w-[180px]">{project.rating}</span>
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
