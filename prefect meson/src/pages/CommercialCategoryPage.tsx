import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Maximize2, ChevronRight } from 'lucide-react';
import { commercialCategories, getCommercialCategoryBySlug, getProjectsByCommercialCategory } from '../data/ndlCommercialCategories';
import { NDLProject } from '../data/ndlProjectsData';
import { useData } from '../context/DataContext';
import { StatusBadge } from '../components/common/StatusBadge';

interface CommercialCategoryPageProps {
  onOpenQuoteModal: () => void;
}

export const CommercialCategoryPage: React.FC<CommercialCategoryPageProps> = ({ onOpenQuoteModal }) => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  const { commercialItems } = useData();

  // Find matching dynamic commercial item by slug, id, or category
  const dynamicItem = commercialItems.find(
    (item) =>
      item.slug === categorySlug ||
      item.id === categorySlug ||
      item.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === categorySlug
  );

  const staticCategory = getCommercialCategoryBySlug(categorySlug || '');

  const category = dynamicItem
    ? {
        slug: dynamicItem.slug || dynamicItem.id,
        number: dynamicItem.number || '01',
        title: dynamicItem.title || dynamicItem.category,
        tagline: dynamicItem.tagline || dynamicItem.category.toUpperCase(),
        description: dynamicItem.description,
        heroImage: dynamicItem.heroImage,
        galleryImages: dynamicItem.galleryImages,
        features: dynamicItem.capabilities && dynamicItem.capabilities.length > 0 ? dynamicItem.capabilities : dynamicItem.scope,
        capabilities: dynamicItem.capabilities,
        scope: dynamicItem.scope,
        timeline: dynamicItem.timeline,
        client: dynamicItem.client,
        architect: dynamicItem.architect,
        builtArea: dynamicItem.builtArea,
      }
    : staticCategory;

  const staticProjects: NDLProject[] = getProjectsByCommercialCategory(categorySlug || '');

  // Merge dynamic gallery images as projects
  const dynamicProjectsAsNDL: NDLProject[] = dynamicItem && dynamicItem.galleryImages && dynamicItem.galleryImages.length > 0
    ? dynamicItem.galleryImages.map((img, i) => ({
        id: dynamicItem.slug || dynamicItem.id,
        title: `${dynamicItem.title} - View #${i + 1}`,
        client: dynamicItem.client || dynamicItem.title,
        architect: dynamicItem.architect || 'Perfect Mason Commercial Studio',
        architectPractice: dynamicItem.architect || 'Perfect Mason Commercial Studio',
        location: dynamicItem.builtArea ? `${dynamicItem.builtArea} • Bangalore` : 'Bangalore, India',
        city: 'Bangalore',
        type: dynamicItem.category,
        scope: dynamicItem.tagline || dynamicItem.description || 'Turnkey Execution',
        category: 'Commercial' as const,
        cost: dynamicItem.builtArea,
        description: dynamicItem.description || '',
        featuredImage: img,
        gallery: dynamicItem.galleryImages,
        highlights: dynamicItem.capabilities || [],
        stats: [
          { label: 'Built Area', value: dynamicItem.builtArea || 'Custom' },
          { label: 'Timeline', value: dynamicItem.timeline || 'On Schedule' },
          { label: 'Category', value: dynamicItem.category }
        ],
      }))
    : [];

  const projects: NDLProject[] = dynamicProjectsAsNDL.length > 0
    ? dynamicProjectsAsNDL
    : staticProjects;

  if (!category) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
        <h2 className="font-display text-3xl font-bold uppercase text-slate-950 mb-4">
          Category Not Found
        </h2>
        <p className="text-slate-600 mb-6">
          The requested commercial category could not be located in our verified archives.
        </p>
        <button
          onClick={() => navigate('/commercial-construction')}
          className="px-6 py-3 rounded-full bg-slate-950 text-white font-mono text-xs font-bold uppercase tracking-wider"
        >
          ← Return to Commercial Construction
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white text-slate-900 pt-28 sm:pt-32 pb-24 font-sans select-none min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* ============================================================ */}
        {/* 1. BREADCRUMBS & BACK NAVIGATION                            */}
        {/* ============================================================ */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 mb-6 pb-4 border-b border-slate-100">
          <Link
            to="/commercial-construction"
            className="hover:text-slate-950 transition-colors flex items-center gap-1 font-semibold uppercase"
          >
            Commercial Construction
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            to="/commercial-construction#commercial-primary-models"
            className="hover:text-slate-950 transition-colors uppercase"
          >
            Primary Models
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-950 font-bold uppercase truncate">
            {category.title}
          </span>
        </div>

        {/* 1.5 INTERACTIVE CATEGORY PILLS SWITCHER STRIP */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-2">COMMERCIAL SECTORS:</span>
          {commercialCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => navigate(`/commercial-construction/category/${cat.slug}`)}
              className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase whitespace-nowrap transition-all cursor-pointer ${
                cat.slug === category.slug
                  ? 'bg-slate-950 text-white shadow-md scale-102'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Back Button Bar */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/commercial-construction')}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Commercial Types</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* 2. CATEGORY HERO BANNER                                      */}
        {/* ============================================================ */}
        <div className="mb-14 pb-8 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-900 font-mono text-xs font-bold uppercase tracking-wider">
              TYPE {category.number}
            </span>
            <span className="font-mono text-xs text-slate-500 font-bold uppercase tracking-widest">
              {category.tagline}
            </span>
            <StatusBadge status={dynamicItem?.status || 'Active'} variant="light" />
          </div>

          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6">
            <div className="flex-1">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-slate-950 leading-[1.02]">
                {category.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-sans">
                {category.description}
              </p>

              {/* CATEGORY KEY FEATURES BULLETS */}
              {category.features && category.features.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
                  {category.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="shrink-0 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right font-mono text-xs">
              <span className="text-slate-400 block text-[10px] uppercase">VERIFIED CASE STUDIES</span>
              <span className="text-2xl font-bold text-slate-950">{projects.length > 0 ? `${projects.length} Projects` : 'Available on Request'}</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. PROJECTS GRID WITHIN CATEGORY (LEVEL 2)                  */}
        {/* ============================================================ */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-900">
              FEATURED PROJECTS IN THIS CATEGORY
            </h2>
            <span className="text-xs font-mono text-slate-400">
              CLICK ANY PROJECT FOR FULL GALLERY & BLUEPRINTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project: NDLProject, idx: number) => (
              <motion.div
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="group relative rounded-[28px] overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-2xl hover:border-slate-950 transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                {/* Large Project Image */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.featuredImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-[11px] font-bold tracking-widest border border-white/10 uppercase">
                        {project.type}
                      </span>
                      <StatusBadge status={dynamicItem?.status || 'Active'} variant="glass" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-950 font-mono text-[11px] font-bold shadow-sm flex items-center gap-1">
                      <Maximize2 className="w-3 h-3" />
                      {project.gallery.length} Photos
                    </span>
                  </div>

                  {/* Bottom Overlay Title on Image */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-400" />
                      <span>{project.location}</span>
                      {project.cost && (
                        <>
                          <span className="text-white/40">•</span>
                          <span className="font-mono text-emerald-400 font-bold">Cost: {project.cost}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight leading-tight">
                      {project.client}
                    </h3>
                  </div>
                </div>

                {/* Scope & Details Box */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                      SCOPE OF WORK:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                      {project.scope}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">ARCHITECT</span>
                      <span className="text-slate-900 font-bold">{project.architect}</span>
                    </div>

                    <span className="px-4 py-2 rounded-full bg-slate-950 text-white font-mono text-xs font-bold uppercase tracking-wider group-hover:bg-black transition-colors flex items-center gap-1.5 shadow-sm">
                      <span>View Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. BOTTOM ACTION STRIP                                       */}
        {/* ============================================================ */}
        <div className="rounded-[32px] bg-[#F8F9FA] border border-slate-200 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs font-bold text-slate-950 uppercase tracking-widest block mb-1">
              CUSTOM COMMERCIAL SPECIFICATIONS
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-slate-950">
              Have a similar {category.title} project?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans mt-1">
              Consult directly with our engineering team for site assessment, zoning bylaws, and itemized estimation.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3 rounded-full bg-slate-950 hover:bg-black text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/commercial-construction')}
              className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              All Categories
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
