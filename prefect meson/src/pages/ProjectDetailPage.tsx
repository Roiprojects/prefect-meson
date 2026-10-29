import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Building2,
  Layers,
  Wrench,
  Calendar,
} from 'lucide-react';
import { ndlProjects, NDLProject } from '../data/ndlProjectsData';
import { useData } from '../context/DataContext';
import { GalleryProject } from '../data/galleryData';
import { StatusBadge } from '../components/common/StatusBadge';

interface ProjectDetailPageProps {
  onOpenQuoteModal: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ onOpenQuoteModal }) => {
  const { slug, categorySlug } = useParams<{ slug?: string; categorySlug?: string }>();
  const navigate = useNavigate();
  const {
    projects: legacyProjects,
    commercialItems,
    residentialItems,
    turnkeyItems,
    interiorItems,
  } = useData();

  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const targetSlug = (slug || categorySlug || '').trim();
  const cleanTarget = targetSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // 1. Check Commercial Items (Admin Commercial)
  const foundCommercial = commercialItems.find(
    (c) =>
      c.id === targetSlug ||
      c.slug === targetSlug ||
      c.slug === cleanTarget ||
      c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === cleanTarget ||
      c.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === cleanTarget ||
      (targetSlug.startsWith('comm-dyn-') && commercialItems.length > 0)
  );

  // 2. Check Residential Items (Admin Residential)
  const foundResidential = residentialItems.find(
    (r) =>
      r.id === targetSlug ||
      r.slug === targetSlug ||
      r.slug === cleanTarget ||
      r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === cleanTarget ||
      r.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === cleanTarget ||
      (targetSlug.startsWith('res-dyn-') && residentialItems.length > 0)
  );

  // 3. Check Turnkey Items (Admin Turnkey)
  const foundTurnkey = turnkeyItems.find(
    (t) =>
      t.id === targetSlug ||
      t.slug === targetSlug ||
      t.slug === cleanTarget ||
      t.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === cleanTarget ||
      t.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === cleanTarget
  );

  // 4. Check Interior Items (Admin Interiors)
  const foundInterior = interiorItems.find(
    (i) =>
      i.id === targetSlug ||
      i.slug === targetSlug ||
      i.slug === cleanTarget ||
      i.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === cleanTarget ||
      i.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === cleanTarget
  );

  // 5. Check dynamic projects from DataContext (Admin Gallery)
  const foundGalleryProj: GalleryProject | undefined = legacyProjects.find(
    (p) =>
      p.id === targetSlug ||
      p.slug === targetSlug ||
      p.slug === cleanTarget ||
      p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === cleanTarget
  );

  // 6. Check NDL projects archives
  const ndlProj: NDLProject | undefined = ndlProjects.find(
    (p) =>
      p.id === targetSlug ||
      p.id === cleanTarget ||
      p.client.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === cleanTarget ||
      p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === cleanTarget
  );

  const activeDynamicItem = foundCommercial || foundResidential || foundTurnkey || foundInterior;
  const fallbackLegacy: GalleryProject = foundGalleryProj || legacyProjects[0];

  const clientName = activeDynamicItem
    ? (activeDynamicItem.client || activeDynamicItem.title)
    : (foundGalleryProj ? (foundGalleryProj.client || foundGalleryProj.title) : (ndlProj ? ndlProj.client : fallbackLegacy?.title));

  const projectTitle = activeDynamicItem
    ? activeDynamicItem.title
    : (foundGalleryProj ? foundGalleryProj.title : (ndlProj ? ndlProj.title : fallbackLegacy?.title));

  const projectLocation = activeDynamicItem
    ? (('builtArea' in activeDynamicItem && activeDynamicItem.builtArea ? `${activeDynamicItem.builtArea} • ` : '') + 'Bengaluru, India')
    : (foundGalleryProj ? foundGalleryProj.location : (ndlProj ? ndlProj.location : fallbackLegacy?.location || 'Bengaluru, Karnataka'));

  const projectCategory = activeDynamicItem
    ? (foundCommercial ? 'Commercial' : foundResidential ? 'Residential' : foundTurnkey ? 'Turnkey' : 'Interiors')
    : (foundGalleryProj ? foundGalleryProj.category : (ndlProj ? ndlProj.category : fallbackLegacy?.category || 'Commercial'));

  const projectType = activeDynamicItem
    ? activeDynamicItem.category
    : (foundGalleryProj ? foundGalleryProj.category : (ndlProj ? ndlProj.type : fallbackLegacy?.category || 'Turnkey Execution'));

  const projectArchitect = activeDynamicItem
    ? (activeDynamicItem.architect || 'Perfect Mason Architectural Studio')
    : (foundGalleryProj ? (foundGalleryProj.architect || 'Perfect Mason Architectural Studio') : (ndlProj ? ndlProj.architect : 'Architectural Engineering Team'));

  const projectScope = activeDynamicItem
    ? ('tagline' in activeDynamicItem && activeDynamicItem.tagline ? activeDynamicItem.tagline : activeDynamicItem.description)
    : (foundGalleryProj ? (foundGalleryProj.scope || foundGalleryProj.description) : (ndlProj ? ndlProj.scope : fallbackLegacy?.description || 'Itemized Civil & Architectural Execution'));

  // Verified Architectural Scale Metric (Strictly non-price: no prices or promotional cost figures)
  const projectScale: string = (() => {
    let scaleVal = (activeDynamicItem && 'builtArea' in activeDynamicItem && activeDynamicItem.builtArea)
      ? activeDynamicItem.builtArea
      : (foundGalleryProj?.areaSqFt || ndlProj?.cost || fallbackLegacy?.areaSqFt || '');
    
    if (typeof scaleVal === 'string') {
      scaleVal = scaleVal
        .replace(/\(Cost:[^)]+\)/gi, '')
        .replace(/₹[\d.,\s\w]+/gi, '')
        .replace(/(?:Rs\.?|INR)\s*[\d.,\s\w]+/gi, '')
        .trim();
    }
    return scaleVal || (projectCategory === 'Commercial' ? 'COMMERCIAL SCALE' : 'RESIDENTIAL ESTATE');
  })();

  const projectDescription = activeDynamicItem
    ? activeDynamicItem.description
    : (foundGalleryProj ? foundGalleryProj.description : (ndlProj ? ndlProj.description : fallbackLegacy?.description));

  const projectStatus: string = activeDynamicItem
    ? (activeDynamicItem.status || 'Active')
    : (foundGalleryProj ? (foundGalleryProj.status || 'Active') : (ndlProj ? 'Completed' : (fallbackLegacy?.status || 'Active')));

  // Resolved Project Images List
  const projectImages: string[] = (() => {
    if (activeDynamicItem) {
      if (activeDynamicItem.galleryImages && activeDynamicItem.galleryImages.length > 0) {
        return activeDynamicItem.galleryImages.filter(Boolean);
      }
      if ('heroImage' in activeDynamicItem && activeDynamicItem.heroImage) {
        return [activeDynamicItem.heroImage];
      }
    }
    if (foundGalleryProj) {
      if (foundGalleryProj.galleryImages && foundGalleryProj.galleryImages.length > 0) {
        return foundGalleryProj.galleryImages.filter(Boolean);
      }
      if (foundGalleryProj.image) return [foundGalleryProj.image];
    }
    if (ndlProj) {
      if (ndlProj.gallery && ndlProj.gallery.length > 0) return ndlProj.gallery;
      if (ndlProj.featuredImage) return [ndlProj.featuredImage];
    }
    return fallbackLegacy?.galleryImages || [fallbackLegacy?.image || '/assets/comm_complex_hero.jpg'];
  })();

  // Specific scope tags
  const scopePills: string[] = (() => {
    if (foundCommercial) {
      if (foundCommercial.capabilities && foundCommercial.capabilities.length > 0) return foundCommercial.capabilities;
      if (foundCommercial.scope && foundCommercial.scope.length > 0) return foundCommercial.scope;
    }
    if (foundResidential) {
      if (foundResidential.features && foundResidential.features.length > 0) return foundResidential.features;
      if (foundResidential.specs && foundResidential.specs.length > 0) return foundResidential.specs;
    }
    if (foundTurnkey) {
      if (foundTurnkey.stages && foundTurnkey.stages.length > 0) return foundTurnkey.stages;
      if (foundTurnkey.deliverables && foundTurnkey.deliverables.length > 0) return foundTurnkey.deliverables;
    }
    if (foundInterior) {
      if (foundInterior.features && foundInterior.features.length > 0) return foundInterior.features;
      if (foundInterior.materials && foundInterior.materials.length > 0) return foundInterior.materials;
    }
    if (ndlProj) {
      return [
        'Civil Construction',
        'Structural Engineering',
        'MEP Integration',
        'Turnkey Execution',
        ...(ndlProj.category === 'Interiors' || ndlProj.scope.includes('Interior') ? ['Bespoke Interiors'] : []),
        ...(ndlProj.scope.includes('Landscaping') ? ['Perimeter Landscaping'] : []),
      ];
    }
    return ['Architectural Design', 'Structural Engineering', 'Civil Framing', 'Turnkey Execution'];
  })();

  // Specifications items
  const specs = [
    {
      icon: Building2,
      label: 'Typology & Nature of Work',
      value: projectType,
    },
    {
      icon: Layers,
      label: 'Scope of Execution',
      value: projectScope,
    },
    {
      icon: Wrench,
      label: 'Architectural / Engineering Association',
      value: projectArchitect,
    },
    {
      icon: Calendar,
      label: 'Project Status & Certification',
      value: projectStatus === 'Completed'
        ? 'Completed Handover with Structural Quality Assurance'
        : projectStatus === 'Upcoming'
        ? 'Upcoming Architectural Release & Approvals'
        : 'Active Model in Progress / Live Execution',
    },
  ];

  // Related projects
  const relatedProjects = ndlProjects
    .filter((p) => p.id !== ndlProj?.id && p.category === projectCategory)
    .slice(0, 3);

  const openLightbox = (idx: number) => {
    setActiveImgIndex(idx);
    setIsLightboxOpen(true);
  };

  return (
    <div className="w-full bg-white text-slate-900 pt-28 sm:pt-32 pb-24 font-sans select-none min-h-screen">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* ============================================================ */}
        {/* 0. BREADCRUMB & BACK BUTTON                                  */}
        {/* ============================================================ */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 hover:text-slate-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link
              to={projectCategory === 'Commercial' ? '/commercial-construction' : '/residential-construction'}
              className="hover:text-slate-900 uppercase"
            >
              {projectCategory}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold uppercase truncate max-w-[200px]">
              {clientName}
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 1. HEADER SECTION (EXACT REFERENCE SCREENSHOT DESIGN)         */}
        {/* ============================================================ */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8">
          <div>
            {/* Category & Status Pills */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-900 font-mono text-[11px] font-bold uppercase tracking-wider border border-slate-200">
                {projectCategory}
              </span>
              <StatusBadge status={projectStatus} size="sm" />
            </div>

            {/* Main Display Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[52px] font-black uppercase text-slate-950 tracking-tight leading-[1.04]">
              {projectTitle}
            </h1>

            {/* Location with Pin */}
            <div className="flex items-center gap-1.5 text-slate-600 text-xs sm:text-sm font-sans mt-2.5 font-medium">
              <MapPin className="w-4 h-4 text-slate-900 shrink-0" />
              <span>{projectLocation}</span>
              {projectArchitect && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-sans">Architect: <strong className="text-slate-900">{projectArchitect}</strong></span>
                </>
              )}
            </div>
          </div>

          {/* Large Area / Cost Metric (Top Right) */}
          <div className="text-right shrink-0">
            <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight block">
              {projectScale}
            </span>
            <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 block">
              'VERIFIED PROJECT SCALE'
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. IMAGE GALLERY HERO GRID (LEFT BIG 2/3, RIGHT STACKED 1/3) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-14">
          {/* Main Large Hero Image (Left 8 Cols) */}
          <div
            onClick={() => openLightbox(0)}
            className="md:col-span-8 relative aspect-[16/11] rounded-[24px] overflow-hidden bg-slate-950 shadow-md cursor-pointer group"
          >
            <img
              src={projectImages[0]}
              alt={`${clientName} main elevation`}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/comm_complex_hero.jpg';
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg">
                <Maximize2 className="w-3.5 h-3.5" /> View Photo ({projectImages.length} Available)
              </span>
            </div>
          </div>

          {/* Right 2 Stacked Smaller Images (Right 4 Cols) */}
          <div className="md:col-span-4 flex flex-row md:flex-col gap-4">
            {projectImages[1] && (
              <div
                onClick={() => openLightbox(1)}
                className="flex-1 relative aspect-[16/10] md:aspect-auto rounded-[20px] overflow-hidden bg-slate-950 shadow-md cursor-pointer group"
              >
                <img
                  src={projectImages[1]}
                  alt={`${clientName} interior view 1`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/comm_office_hero.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>
            )}

            {projectImages[2] ? (
              <div
                onClick={() => openLightbox(2)}
                className="flex-1 relative aspect-[16/10] md:aspect-auto rounded-[20px] overflow-hidden bg-slate-950 shadow-md cursor-pointer group"
              >
                <img
                  src={projectImages[2]}
                  alt={`${clientName} interior view 2`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/portfolio_01_residence.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>
            ) : (
              <div
                onClick={() => openLightbox(0)}
                className="flex-1 rounded-[20px] bg-slate-100 border border-slate-200 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-200 transition-colors"
              >
                <Maximize2 className="w-6 h-6 text-slate-400 mb-2" />
                <span className="font-mono text-xs font-bold uppercase text-slate-700">
                  Explore Full Gallery
                </span>
                <span className="text-[11px] text-slate-400 font-sans mt-0.5">
                  {projectImages.length} Photographs
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. MAIN CONTENT: 2-COLUMN ASYMMETRIC EDITORIAL LAYOUT        */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
          
          {/* LEFT COLUMN (7-8 Cols): Overview + Specs Table + Scope Pills */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Section 1: PROJECT OVERVIEW */}
            <div className="space-y-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold uppercase text-slate-950 tracking-wider">
                Project Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                {projectDescription}
              </p>
            </div>

            {/* Section 2: ENGINEERING & EXECUTION SPECIFICATIONS */}
            <div className="p-6 sm:p-8 rounded-[24px] bg-[#F9FAFB] border border-slate-200/90 space-y-5">
              <span className="font-mono text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] block pb-2 border-b border-slate-200/70">
                ENGINEERING & EXECUTION SPECIFICATIONS
              </span>

              <div className="space-y-4">
                {specs.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start justify-between gap-4 text-xs font-sans pb-3 border-b border-slate-200/50 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2.5 text-slate-500 shrink-0">
                        <Icon className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <div className="font-bold text-slate-900 text-right">
                        {item.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: PROJECT SCOPE & EXECUTION MODEL */}
            <div className="space-y-3">
              <h3 className="font-serif text-base sm:text-lg font-bold uppercase text-slate-950 tracking-wider">
                Project Scope & Execution Model
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {scopePills.map((pill, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 font-sans shadow-2xs"
                  >
                    {pill}
                  </span>
                ))}
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 font-sans flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Status: Completed
                </span>
              </div>
            </div>

            {/* Section 4: ARCHITECTURAL PERSPECTIVE (WIDE PHOTOGRAPH) */}
            {projectImages[3] && (
              <div className="space-y-3 pt-2">
                <h3 className="font-serif text-base sm:text-lg font-bold uppercase text-slate-950 tracking-wider">
                  Architectural Perspective
                </h3>
                <div
                  onClick={() => openLightbox(3)}
                  className="relative aspect-[16/9] rounded-[24px] overflow-hidden bg-slate-950 shadow-md cursor-pointer group"
                >
                  <img
                    src={projectImages[3]}
                    alt={`${clientName} perspective`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/service_commercial_corp.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Complete Project Photo Gallery Strip */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base sm:text-lg font-bold uppercase text-slate-950 tracking-wider">
                  All Project Photographs ({projectImages.length})
                </h3>
                <span className="font-mono text-[11px] text-slate-400">
                  CLICK TO ENLARGE
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {projectImages.map((img: string, i: number) => (
                  <div
                    key={i}
                    onClick={() => openLightbox(i)}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                  >
                    <img
                      src={img}
                      alt={`${clientName} slide photo ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/comm_complex_hero.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (4-5 Cols): EXECUTE A SIMILAR PROJECT CARD */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            {/* DARK EXECUTE A SIMILAR PROJECT CARD (EXACT REFERENCE SCREENSHOT) */}
            <div className="p-8 sm:p-9 rounded-[32px] bg-[#071328] text-white shadow-2xl space-y-6 text-center flex flex-col items-center border border-slate-800">
              
              {/* Top Circular Building Icon */}
              <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner mb-1">
                <Building2 className="w-6 h-6 text-white" />
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold uppercase tracking-wide text-white">
                  Execute a Similar Project?
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-300 font-sans leading-relaxed max-w-xs mx-auto">
                  Connect directly with our engineering team for custom architectural design, BOQ estimation, and turnkey handover.
                </p>
              </div>

              {/* 3 Core Value Pills with Outline */}
              <div className="w-full space-y-2.5 pt-2">
                {[
                  'Guaranteed Fixed BOQ Price',
                  'Single-Source Accountability',
                  'On-Time Milestone Delivery',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/15 text-xs font-semibold text-slate-200 text-center tracking-wide"
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="w-full py-4 rounded-full bg-slate-900 hover:bg-black border border-white/20 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Direct Call Link */}
              <div className="pt-2 text-xs font-mono text-slate-400">
                <span>Or call direct: </span>
                <a href="tel:+919886329424" className="text-[#C8A96B] font-bold hover:underline">
                  +91 98863 29424
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* 4. RELATED PROJECTS SECTION (BOTTOM REFERENCE SCREENSHOT)    */}
        {/* ============================================================ */}
        <div className="pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-lg sm:text-xl font-bold uppercase text-slate-950 tracking-wider">
              Related {projectCategory} Projects
            </h3>
            <Link
              to={projectCategory === 'Commercial' ? '/commercial-construction' : '/residential-construction'}
              className="text-xs font-mono font-bold uppercase text-slate-900 hover:text-black transition-colors flex items-center gap-1.5"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rel: NDLProject) => (
              <div
                key={rel.id}
                onClick={() => {
                  navigate(`/projects/${rel.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group p-4 rounded-2xl bg-[#F9FAFB] border border-slate-200 hover:border-slate-950 hover:bg-white transition-all duration-300 cursor-pointer flex gap-4 items-center shadow-2xs"
              >
                <div className="w-24 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={rel.featuredImage}
                    alt={rel.client}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/comm_complex_hero.jpg';
                    }}
                  />
                </div>
                <div className="overflow-hidden">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block truncate">
                    {rel.category} • {rel.location.split(',')[0]}
                  </span>
                  <h4 className="font-serif text-sm font-bold uppercase text-slate-950 truncate group-hover:text-black">
                    {rel.client}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-sans line-clamp-1 mt-0.5">
                    {rel.scope}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 5. FULL-SCREEN LIGHTBOX MODAL                                */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-2 right-2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-[16/10] w-full max-h-[80vh] flex items-center justify-center">
                <img
                  src={projectImages[activeImgIndex]}
                  alt={`${clientName} photo ${activeImgIndex + 1}`}
                  className="w-full h-full object-contain"
                />

                {projectImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImgIndex((prev) =>
                          prev === 0 ? projectImages.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImgIndex((prev) =>
                          prev === projectImages.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              <div className="mt-4 font-mono text-xs text-white/80">
                {clientName} • Photo {activeImgIndex + 1} of {projectImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
