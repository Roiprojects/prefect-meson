import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { commercialCategories, CommercialCategory } from '../../data/ndlCommercialCategories';

export const CommercialProjectTypes: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = commercialCategories.filter((cat) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      cat.title.toLowerCase().includes(query) ||
      cat.description.toLowerCase().includes(query) ||
      cat.representativeClient.toLowerCase().includes(query)
    );
  });

  return (
    <section
      id="commercial-project-types"
      aria-label="Commercial Project Types Directory"
      className="relative w-full bg-white text-slate-900 py-20 sm:py-28 overflow-hidden select-none border-b border-slate-200"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* ============================================================ */}
        {/* 1. SECTION HEADER (FIRST LEVEL: PROJECT TYPES)               */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 pb-8 border-b border-slate-200">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-950" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-900 font-bold flex items-center gap-2">
                04.4 // COMMERCIAL PORTFOLIO DIRECTORY
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-slate-950 leading-[1.04]">
              Commercial Project <br className="hidden sm:inline" />
              Types & Typologies.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-2xl">
              Select a commercial project category below to explore verified NDL case studies, architectural blueprints, and authentic site photographs.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72 lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search commercial typologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-slate-950 focus:bg-white transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. FIRST-LEVEL COMMERCIAL PROJECT TYPES GRID                 */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat: CommercialCategory, idx: number) => {
            const projectCount = cat.projectIds.length;

            return (
              <motion.div
                key={cat.slug}
                onClick={() => navigate(`/commercial-construction/${cat.slug}`)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                className="group relative rounded-[28px] overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:border-slate-950 transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                {/* Visual Header with Real NDL Project Photo */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <img
                    src={cat.representativeImage}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                  {/* Top Badge: Number & Type */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-[11px] font-bold tracking-widest border border-white/10 uppercase">
                      TYPE {cat.number}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-950 font-mono text-[11px] font-bold shadow-sm">
                      {projectCount} {projectCount === 1 ? 'Project' : 'Projects'}
                    </span>
                  </div>

                  {/* Bottom Image Sub-label */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <span className="font-mono text-[10px] text-[#C8A96B] font-bold uppercase tracking-widest block mb-0.5">
                      FEATURED PROJECT
                    </span>
                    <p className="font-sans text-xs font-semibold text-white/90 truncate">
                      {cat.representativeClient} • {cat.representativeArchitect}
                    </p>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-slate-950 group-hover:text-slate-900 transition-colors leading-tight mb-1">
                      {cat.title}
                    </h3>
                    <span className="font-mono text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
                      {cat.tagline}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase text-slate-900 group-hover:text-black transition-colors flex items-center gap-1.5">
                      <span>Explore Projects</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      VIEW CATEGORY →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
