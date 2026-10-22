import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  MapPin,
  ArrowRight,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Search,
  RotateCcw,
  CheckCircle2,
  Building2,
  SlidersHorizontal,
} from 'lucide-react';
import { GalleryProject, galleryProjects as defaultGalleryProjects } from '../data/galleryData';
import { useData } from '../context/DataContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface GalleryPageProps {
  onOpenQuoteModal?: () => void;
}

const CATEGORY_MAP: Record<string, string> = {
  'ALL PROJECTS': 'ALL',
  'COMMERCIAL CONSTRUCTION': 'Commercial',
  'RESIDENTIAL CONSTRUCTION': 'Residential',
  'TURNKEY PROJECTS': 'Turnkey',
  'INTERIORS': 'Interiors',
};

export const GalleryPage: React.FC<GalleryPageProps> = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { projects: dynamicProjects } = useData();
  const galleryProjects = dynamicProjects && dynamicProjects.length > 0 ? dynamicProjects : defaultGalleryProjects;

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL PROJECTS');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Pagination / Progressive Loading
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Lightbox State
  const [lightboxProject, setLightboxProject] = useState<GalleryProject | null>(null);
  const [lightboxImgIndex, setLightboxImgIndex] = useState<number>(0);

  // Sync URL query params with filter state
  useEffect(() => {
    const catQuery = searchParams.get('category');
    if (catQuery) {
      const match = Object.keys(CATEGORY_MAP).find(
        (key) => CATEGORY_MAP[key].toLowerCase() === catQuery.toLowerCase()
      );
      if (match) setSelectedCategory(match);
    }
  }, [searchParams]);

  // Extract distinct locations and types dynamically from real database
  const distinctLocations = useMemo(() => {
    const locSet = new Set<string>();
    galleryProjects.forEach((p) => {
      if (p.area) locSet.add(p.area);
      else if (p.location) locSet.add(p.location.split(',')[0].trim());
    });
    return Array.from(locSet).sort();
  }, []);

  const distinctTypes = useMemo(() => {
    const typeSet = new Set<string>();
    galleryProjects.forEach((p) => {
      if (p.projectType) typeSet.add(p.projectType);
    });
    return Array.from(typeSet).sort();
  }, []);

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return galleryProjects.filter((project) => {
      // 1. Primary Category Filter
      const mappedCat = CATEGORY_MAP[selectedCategory];
      if (mappedCat && mappedCat !== 'ALL') {
        const matchesPrimary = project.category === mappedCat;
        const matchesSecondary = project.secondaryCategories?.includes(
          mappedCat as 'Residential' | 'Commercial' | 'Turnkey' | 'Interiors'
        );
        if (!matchesPrimary && !matchesSecondary) return false;
      }

      // 2. Status Filter
      if (selectedStatus !== 'ALL') {
        if (project.status !== selectedStatus) return false;
      }

      // 3. Location Filter
      if (selectedLocation !== 'ALL') {
        const matchesArea = project.area === selectedLocation;
        const matchesLocString = project.location.includes(selectedLocation);
        if (!matchesArea && !matchesLocString) return false;
      }

      // 4. Project Type Filter
      if (selectedType !== 'ALL') {
        if (project.projectType !== selectedType) return false;
      }

      // 5. Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = (project.title || '').toLowerCase().includes(q);
        const inClient = (project.client || '').toLowerCase().includes(q);
        const inLocation = (project.location || '').toLowerCase().includes(q);
        const inArchitect = (project.architect || '').toLowerCase().includes(q);
        const inScope = (project.scope || '').toLowerCase().includes(q);
        const inCategory = (project.category || '').toLowerCase().includes(q);
        const inType = (project.projectType || '').toLowerCase().includes(q);

        if (!inTitle && !inClient && !inLocation && !inArchitect && !inScope && !inCategory && !inType) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedStatus, selectedLocation, selectedType, searchQuery]);

  const hasActiveFilters =
    selectedCategory !== 'ALL PROJECTS' ||
    searchQuery.trim() !== '' ||
    selectedLocation !== 'ALL' ||
    selectedType !== 'ALL' ||
    selectedStatus !== 'ALL';

  const handleResetFilters = () => {
    setSelectedCategory('ALL PROJECTS');
    setSearchQuery('');
    setSelectedLocation('ALL');
    setSelectedType('ALL');
    setSelectedStatus('ALL');
    setVisibleCount(12);
    setSearchParams({});
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(12);
    const catCode = CATEGORY_MAP[cat];
    if (catCode && catCode !== 'ALL') {
      setSearchParams({ category: catCode.toLowerCase() });
    } else {
      setSearchParams({});
    }
  };

  // Lightbox handlers
  const openLightbox = (project: GalleryProject, imgIdx = 0, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLightboxProject(project);
    setLightboxImgIndex(imgIdx);
  };

  const closeLightbox = () => {
    setLightboxProject(null);
  };

  const handlePrevImg = useCallback(() => {
    if (!lightboxProject) return;
    setLightboxImgIndex((prev) =>
      prev === 0 ? lightboxProject.galleryImages.length - 1 : prev - 1
    );
  }, [lightboxProject]);

  const handleNextImg = useCallback(() => {
    if (!lightboxProject) return;
    setLightboxImgIndex((prev) =>
      prev === lightboxProject.galleryImages.length - 1 ? 0 : prev + 1
    );
  }, [lightboxProject]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxProject) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrevImg();
      if (e.key === 'ArrowRight') handleNextImg();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxProject, handlePrevImg, handleNextImg]);

  return (
    <div className="w-full bg-white text-slate-900 pt-24 sm:pt-28 select-none overflow-hidden min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1. GALLERY HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-8 border-b border-slate-200/80">
          
          {/* Left Hero Title & Badge */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-4 ring-slate-200/80" />
                <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950 animate-ping" />
              </div>
              <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.25em] text-slate-800 font-bold flex items-center gap-2">
                PROJECT PORTFOLIO
                <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[58px] font-bold text-slate-950 uppercase tracking-tight leading-[1.05]"
            >
              PROJECTS <br />
              <span className="text-slate-950">THAT SPEAK THROUGH</span> <br />
              <span className="text-slate-800">THEIR DETAILS.</span>
            </motion.h1>
          </div>

          {/* Right Supporting Copy & Live Counter */}
          <div className="lg:col-span-4 space-y-4 lg:pb-2">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed font-normal"
            >
              Explore selected construction, residential, commercial and interior projects represented through the Perfect Mason project portfolio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-900 font-mono text-xs font-bold uppercase tracking-wider"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-950" />
              <span>
                {filteredProjects.length} OF {galleryProjects.length} VERIFIED ARCHITECTURAL PROJECTS
              </span>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SOPHISTICATED HORIZONTAL FILTER RAIL                                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-10">
        <div className="space-y-4">
          
          {/* Line 1: Primary Category Pills */}
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {Object.keys(CATEGORY_MAP).map((catName) => {
                const isActive = selectedCategory === catName;
                return (
                  <button
                    key={catName}
                    type="button"
                    onClick={() => handleCategorySelect(catName)}
                    className={`px-4 sm:px-5 py-2.5 rounded-full font-sans text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-slate-950 text-white shadow-md shadow-slate-900/10 scale-102'
                        : 'bg-slate-100/90 hover:bg-slate-200/90 text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    {catName}
                  </button>
                );
              })}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer border border-red-200/60"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>CLEAR ALL</span>
              </button>
            )}
          </div>

          {/* Line 2: Search + Secondary Filters (Location, Project Type, Status) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* Search Input (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(12);
                }}
                placeholder="Search by client, architect, location or scope..."
                className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Location Selector (3 Cols) */}
            <div className="lg:col-span-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setVisibleCount(12);
                  }}
                  className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:border-slate-950 transition-all cursor-pointer truncate appearance-none"
                >
                  <option value="ALL">ALL LOCATIONS ({distinctLocations.length})</option>
                  {distinctLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            {/* Project Type Selector (2.5 Cols) */}
            <div className="lg:col-span-2">
              <div className="relative">
                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setVisibleCount(12);
                  }}
                  className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:border-slate-950 transition-all cursor-pointer truncate appearance-none"
                >
                  <option value="ALL">ALL TYPOLOGIES</option>
                  {distinctTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            {/* Status Selector (1.5 Cols) */}
            <div className="lg:col-span-2">
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setVisibleCount(12);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:border-slate-950 transition-all cursor-pointer appearance-none text-center"
                >
                  <option value="ALL">STATUS: ALL</option>
                  <option value="Completed">COMPLETED</option>
                  <option value="Ongoing">ONGOING</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. IMAGE-FIRST ARCHITECTURAL PROJECT GRID (EDITORIAL MASONRY)             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-24 sm:pb-32">
        {filteredProjects.length === 0 ? (
          /* Empty State */
          <div className="py-20 text-center rounded-[32px] bg-slate-50 border border-dashed border-slate-300 p-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-xl font-bold uppercase text-slate-950">
                NO PROJECTS FOUND
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-sans max-w-md mx-auto">
                No architectural projects matched your selected filter criteria or search query.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full bg-slate-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence>
                {filteredProjects.slice(0, visibleCount).map((project, idx) => {
                  const isFeaturedSpan = idx === 0 && selectedCategory === 'ALL PROJECTS' && !hasActiveFilters;

                  return (
                    <motion.div
                      layout
                      key={project.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.5,
                        delay: Math.min(idx * 0.04, 0.3),
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`group rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white border border-slate-200/90 hover:border-slate-400 shadow-xs hover:shadow-2xl transition-all duration-500 flex flex-col justify-between ${
                        isFeaturedSpan ? 'md:col-span-2 lg:col-span-2' : ''
                      }`}
                    >
                      {/* Top: Image Viewport with Smooth Hover */}
                      <div
                        onClick={() => navigate(`/projects/${project.slug}`)}
                        className={`relative w-full overflow-hidden bg-slate-950 cursor-pointer ${
                          isFeaturedSpan
                            ? 'aspect-[16/10] sm:aspect-[16/9]'
                            : 'aspect-[16/11]'
                        }`}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/comm_complex_hero.jpg';
                          }}
                        />

                        {/* Subtle Cinematic Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity" />

                        {/* Top Floating Badges */}
                        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] uppercase tracking-wider font-bold shadow-sm">
                              {project.category}
                            </span>
                            {project.cost && (
                              <span className="px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 font-mono text-[10px] uppercase tracking-wider font-bold shadow-sm">
                                {project.cost}
                              </span>
                            )}
                          </div>

                          {/* Quick Lightbox Action Icon */}
                          <button
                            type="button"
                            onClick={(e) => openLightbox(project, 0, e)}
                            className="w-8 h-8 rounded-full bg-slate-950/70 hover:bg-white text-white hover:text-slate-950 border border-white/20 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-md"
                            title={`Preview ${project.galleryImages.length} Photographs`}
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Bottom Image Overlay Details */}
                        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between">
                          <div>
                            <span className="font-mono text-[11px] font-bold text-slate-300 block mb-0.5">
                              {project.number || `.0${idx + 1}`}
                            </span>
                            <span className="font-mono text-[10px] text-white/90 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              {project.galleryImages.length} PHOTOGRAPHS
                            </span>
                          </div>

                          {project.status && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[9px] uppercase font-bold tracking-wider">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              {project.status}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom: Crisp Architectural Information Body */}
                      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                        <div className="space-y-2">
                          
                          {/* Location & Architect Row */}
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-sans flex-wrap">
                            <div className="flex items-center gap-1 text-slate-800 font-semibold">
                              <MapPin className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                              <span className="truncate max-w-[200px]">{project.location.split(',')[0]}</span>
                            </div>
                            {project.architect && (
                              <>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-600 font-medium truncate max-w-[180px]">
                                  {project.architect}
                                </span>
                              </>
                            )}
                          </div>

                          {/* Project Client / Title */}
                          <h3
                            onClick={() => navigate(`/projects/${project.slug}`)}
                            className="font-display text-lg sm:text-xl font-bold text-slate-950 uppercase tracking-tight leading-snug cursor-pointer group-hover:text-slate-800 transition-colors"
                          >
                            {project.title}
                          </h3>

                          {/* Scope / Description */}
                          <p className="text-xs sm:text-[13px] text-slate-600 font-sans leading-relaxed line-clamp-2">
                            {project.scope || project.description}
                          </p>
                        </div>

                        {/* Interactive Footer Row */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => navigate(`/projects/${project.slug}`)}
                            className="text-xs font-bold text-slate-950 hover:text-black uppercase tracking-wider flex items-center gap-1.5 group-hover:translate-x-1 transition-transform cursor-pointer"
                          >
                            <span>VIEW PROJECT</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                          </button>

                          <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            {project.projectType}
                          </span>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Progressive Loading: LOAD MORE BUTTON */}
            {visibleCount < filteredProjects.length && (
              <div className="text-center pt-6">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 9)}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-950 hover:bg-black active:scale-98 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                >
                  <span>LOAD MORE ARCHITECTURAL PROJECTS</span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-white/20 text-white">
                    +{filteredProjects.length - visibleCount}
                  </span>
                </button>
                <p className="font-mono text-[11px] text-slate-400 mt-2 uppercase tracking-wider">
                  SHOWING {Math.min(visibleCount, filteredProjects.length)} OF {filteredProjects.length} PROJECTS
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 4. FULL-SCREEN LIGHTBOX MODAL (NEXT / PREV / KEYBOARD / MOBILE GESTURE)  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center justify-between"
            >
              {/* Lightbox Header Bar */}
              <div className="w-full flex items-center justify-between pb-3 text-white">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/10 font-mono text-[10px] uppercase font-bold text-slate-300">
                      {lightboxProject.category}
                    </span>
                    <span className="font-mono text-xs text-slate-300 font-bold">
                      {lightboxProject.number}
                    </span>
                  </div>
                  <h4 className="font-display text-sm sm:text-base font-bold uppercase text-white tracking-wide">
                    {lightboxProject.title}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/projects/${lightboxProject.slug}`);
                      closeLightbox();
                    }}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>OPEN PROJECT DETAIL</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Stage */}
              <div className="relative w-full aspect-[16/10] max-h-[74vh] flex items-center justify-center bg-black/40 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={lightboxProject.galleryImages[lightboxImgIndex]}
                  alt={`${lightboxProject.title} photo ${lightboxImgIndex + 1}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/comm_complex_hero.jpg';
                  }}
                />

                {/* Left / Right Buttons */}
                {lightboxProject.galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImg}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer border border-white/10 hover:scale-105"
                      title="Previous Image (Left Arrow)"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImg}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer border border-white/10 hover:scale-105"
                      title="Next Image (Right Arrow)"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Lightbox Footer Bar */}
              <div className="w-full pt-3 flex items-center justify-between text-slate-400 text-xs font-mono">
                <span className="truncate max-w-md">
                  {lightboxProject.location} {lightboxProject.architect ? `• Arch: ${lightboxProject.architect}` : ''}
                </span>

                <span className="font-bold text-white shrink-0">
                  {lightboxImgIndex + 1} / {lightboxProject.galleryImages.length} PHOTOGRAPHS
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
