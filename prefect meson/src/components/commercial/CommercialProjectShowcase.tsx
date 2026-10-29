import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { ndlProjects, NDLProject } from '../../data/ndlProjectsData';

const commercialProjectsList: NDLProject[] = ndlProjects.filter(
  (p) => p.category === 'Commercial'
);

const commercialCategories = [
  'All Commercial',
  'Corporate Offices',
  'Commercial Complexes',
  'Retail & Showrooms',
  'Hospitality & Dining',
];

export const CommercialProjectShowcase: React.FC = () => {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState('All Commercial');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = commercialProjectsList.filter((p) => {
    if (activeType === 'Corporate Offices') {
      if (!['nexus-corporate-park', 'zenith-tech-tower'].includes(p.id)) return false;
    } else if (activeType === 'Commercial Complexes') {
      if (!['aura-commercial-hub', 'mr-nataraj', 'mr-venkatarama-raju'].includes(p.id)) return false;
    } else if (activeType === 'Retail & Showrooms') {
      if (!['mr-nataraj', 'aura-commercial-hub'].includes(p.id)) return false;
    } else if (activeType === 'Hospitality & Dining') {
      if (!['take-5-bar'].includes(p.id)) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchClient = p.client.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      const matchArch = p.architect.toLowerCase().includes(q);
      const matchType = p.type.toLowerCase().includes(q);
      if (!matchClient && !matchLoc && !matchArch && !matchType) return false;
    }
    return true;
  });

  return (
    <section 
      id="commercial-showcase" 
      className="relative w-full bg-white text-slate-900 pt-24 sm:pt-32 pb-20 sm:pb-28 border-b border-slate-200 scroll-mt-28 sm:scroll-mt-36"
      aria-label="Executed Commercial Projects Portfolio"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-[#071D38]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                04.4 // COMMERCIAL PROJECT PORTFOLIO
              </span>
            </div>
            <h2 className="font-barlow text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#071D38] leading-[1.05]">
              Executed Commercial Projects
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-slate-600 font-sans leading-relaxed lg:text-right">
            Corporate campuses, retail hubs, commercial complexes, and hospitality spaces executed by NDL across Bangalore. Click any project for complete engineering details.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {commercialCategories.map((type) => {
              const isSelected = activeType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#071D38] text-white shadow-sm'
                      : 'bg-[#F8FAFC] text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search commercial project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-full py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-[#071D38] focus:bg-white transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* 2-Column Responsive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.04, duration: 0.4 }}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="group relative h-[380px] sm:h-[440px] rounded-[28px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 bg-slate-950 border border-slate-200/90"
              >
                {/* Project Photograph */}
                <img
                  src={project.featuredImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                {/* Top Badge: Commercial Scope */}
                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md text-slate-950 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md z-10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#071D38]" />
                  <span>{project.type.split('/')[0]}</span>
                </div>

                {/* Top Left Location Pill */}
                <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 border border-white/10 z-10">
                  <MapPin className="w-3 h-3 text-[#C8A96B]" />
                  <span className="truncate max-w-[150px]">{project.location.split(',')[0]}</span>
                </div>

                {/* Bottom Card Content */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white z-10">
                  <div className="text-sm font-normal text-white/90 drop-shadow-sm font-sans mb-1">
                    {project.client}
                  </div>

                  <div className="text-2xl sm:text-3xl font-barlow font-bold text-white uppercase tracking-tight leading-tight mb-2 drop-shadow-md">
                    {project.title}
                  </div>

                  <p className="text-xs text-slate-300 font-sans line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  {/* Metadata Row */}
                  <div className="flex items-center justify-between text-xs text-white/85 font-mono pt-3 border-t border-white/15">
                    <span className="text-[#C8A96B] truncate max-w-[180px]">
                      {project.architectPractice}
                    </span>
                    <div className="flex items-center gap-1 font-mono text-xs text-white group-hover:text-[#C8A96B] transition-colors">
                      <span>VIEW PROJECT</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
