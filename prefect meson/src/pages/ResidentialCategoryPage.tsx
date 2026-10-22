import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Maximize2, ChevronRight } from 'lucide-react';
import { residentialCategories, getResidentialCategoryBySlug, getProjectsByResidentialCategory } from '../data/ndlResidentialCategories';
import { NDLProject } from '../data/ndlProjectsData';
import { useData } from '../context/DataContext';

interface ResidentialCategoryPageProps {
  onOpenQuoteModal: () => void;
}

export const ResidentialCategoryPage: React.FC<ResidentialCategoryPageProps> = ({ onOpenQuoteModal }) => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  const { residentialItems } = useData();

  // Look for dynamic residential item matching slug or id
  const dynamicItem = residentialItems.find(
    (item) =>
      item.slug === categorySlug ||
      item.id === categorySlug ||
      item.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === categorySlug
  );

  const staticCategory = getResidentialCategoryBySlug(categorySlug || '');

  const category = dynamicItem
    ? {
        slug: dynamicItem.slug || dynamicItem.id,
        number: dynamicItem.number || '01',
        title: dynamicItem.title || dynamicItem.category,
        tagline: dynamicItem.tagline || dynamicItem.category.toUpperCase(),
        description: dynamicItem.description,
        heroImage: dynamicItem.heroImage,
        galleryImages: dynamicItem.galleryImages,
        features: dynamicItem.features,
        specs: dynamicItem.specs,
        pricePerSqFt: dynamicItem.pricePerSqFt,
        timeline: dynamicItem.timeline,
        client: dynamicItem.client,
        architect: dynamicItem.architect,
        builtArea: dynamicItem.builtArea,
      }
    : staticCategory;

  const staticProjects: NDLProject[] = getProjectsByResidentialCategory(categorySlug || '');

  // Merge dynamic projects and gallery photos
  const dynamicProjectsAsNDL: NDLProject[] = dynamicItem && dynamicItem.galleryImages && dynamicItem.galleryImages.length > 0
    ? dynamicItem.galleryImages.map((img, i) => ({
        id: dynamicItem.slug || dynamicItem.id,
        title: `${dynamicItem.title} - View #${i + 1}`,
        client: dynamicItem.client || dynamicItem.title,
        architect: dynamicItem.architect || 'Perfect Mason Residential Studio',
        architectPractice: dynamicItem.architect || 'Perfect Mason Residential Studio',
        location: dynamicItem.builtArea ? `${dynamicItem.builtArea} • Bangalore` : 'Bangalore, India',
        city: 'Bangalore',
        type: dynamicItem.category,
        scope: dynamicItem.tagline || dynamicItem.description || 'Residential Construction',
        category: 'Residential' as const,
        cost: dynamicItem.pricePerSqFt || dynamicItem.builtArea,
        description: dynamicItem.description || '',
        featuredImage: img,
        gallery: dynamicItem.galleryImages,
        highlights: dynamicItem.specs || dynamicItem.features || [],
        stats: [
          { label: 'Built Area', value: dynamicItem.builtArea || 'Custom' },
          { label: 'Price / sq.ft', value: dynamicItem.pricePerSqFt || 'Custom' },
          { label: 'Timeline', value: dynamicItem.timeline || 'On Schedule' }
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
          The requested residential category could not be located in our verified archives.
        </p>
        <button
          onClick={() => navigate('/residential-construction')}
          className="px-6 py-3 rounded-full bg-slate-950 text-white font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          ← Return to Residential Construction
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
            to="/residential-construction"
            className="hover:text-slate-950 transition-colors flex items-center gap-1 font-semibold uppercase"
          >
            Residential Construction
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            to="/residential-construction#residential-primary-groups"
            className="hover:text-slate-950 transition-colors uppercase"
          >
            Primary Groups
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-950 font-bold uppercase truncate">
            {category.title}
          </span>
        </div>

        {/* 1.5 INTERACTIVE CATEGORY PILLS SWITCHER STRIP */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-2">RESIDENTIAL SECTORS:</span>
          {residentialCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => navigate(`/residential-construction/category/${cat.slug}`)}
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
            onClick={() => navigate('/residential-construction')}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Residential Types</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* 2. CATEGORY HERO BANNER                                      */}
        {/* ============================================================ */}
        <div className="mb-14 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-900 font-mono text-xs font-bold uppercase tracking-wider">
              TYPE {category.number}
            </span>
            <span className="font-mono text-xs text-slate-500 font-bold uppercase tracking-widest">
              {category.tagline}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-slate-950 leading-[1.02]">
                {category.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-sans">
                {category.description}
              </p>
            </div>

            <div className="shrink-0 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right font-mono text-xs">
              <span className="text-slate-400 block text-[10px] uppercase">AVAILABLE PROJECTS</span>
              <span className="text-xl font-bold text-slate-950">
                {projects.length} Verified {projects.length === 1 ? 'Project' : 'Projects'}
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* AFFORDABLE HOMES SPECIFICATION PACKAGES MATRIX                */}
        {/* ============================================================ */}
        {category.slug === 'affordable-homes-packages' && (
          <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-slate-950 text-white shadow-2xl border border-slate-800">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold text-[#C8A96B] uppercase tracking-widest block mb-1">
                  SPECIFICATION PACKAGES & PRICING
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                  Affordable Homes Construction Packages
                </h2>
              </div>
              <span className="font-mono text-xs text-slate-400">
                All packages calculated on built-up area (Per Sq.Ft basis)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Package */}
              <div id="basic-package" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#C8A96B] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-blue-500/30">
                      PACKAGE 01
                    </span>
                    <span className="font-mono text-xs text-slate-400 font-semibold">BASIC</span>
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-white mb-2">Basic Package</h3>
                  <div className="text-3xl font-bold text-white font-mono mb-4">
                    ₹2,300 <span className="text-xs text-slate-400 font-sans font-normal">/ sq.ft</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300 font-sans">
                    <li className="flex items-start gap-2">• Solid concrete block / wire-cut brick masonry</li>
                    <li className="flex items-start gap-2">• Premium vitrified floor tiling (2' x 2')</li>
                    <li className="flex items-start gap-2">• Standard ISI grade steel & cement (Fe550)</li>
                    <li className="flex items-start gap-2">• Teak frame main door with flush internal doors</li>
                    <li className="flex items-start gap-2">• Standard sanitary & CP fittings</li>
                  </ul>
                </div>
                <button
                  onClick={onOpenQuoteModal}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-white hover:text-slate-950 font-sans text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                >
                  Select Basic Package →
                </button>
              </div>

              {/* Premium Package */}
              <div id="premium-package" className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-[#C8A96B] transition-all flex flex-col justify-between relative shadow-xl">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C8A96B] text-slate-950 font-mono text-[9px] font-bold uppercase tracking-widest shadow-md">
                  MOST POPULAR
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                      PACKAGE 02
                    </span>
                    <span className="font-mono text-xs text-[#C8A96B] font-semibold">PREMIUM</span>
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-white mb-2">Premium Package</h3>
                  <div className="text-3xl font-bold text-[#C8A96B] font-mono mb-4">
                    ₹2,800 <span className="text-xs text-slate-400 font-sans font-normal">/ sq.ft</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-200 font-sans">
                    <li className="flex items-start gap-2">• High-strength RCC frame with engineered SMB blocks</li>
                    <li className="flex items-start gap-2">• Large format vitrified tiles (4' x 2') & granite counters</li>
                    <li className="flex items-start gap-2">• Teakwood main door & UPVC 3-track sliding windows</li>
                    <li className="flex items-start gap-2">• Kohler / Jaguar premium sanitaryware & CP fittings</li>
                    <li className="flex items-start gap-2">• Modular copper wiring with Schneider switches</li>
                  </ul>
                </div>
                <button
                  onClick={onOpenQuoteModal}
                  className="mt-6 w-full py-2.5 rounded-xl bg-[#C8A96B] hover:bg-white text-slate-950 font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Select Premium Package →
                </button>
              </div>

              {/* Luxury Package */}
              <div id="luxury-package" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#C8A96B] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                      PACKAGE 03
                    </span>
                    <span className="font-mono text-xs text-slate-400 font-semibold">LUXURY</span>
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-white mb-2">Luxury Package</h3>
                  <div className="text-3xl font-bold text-white font-mono mb-4">
                    ₹3,000 <span className="text-xs text-slate-400 font-sans font-normal">/ sq.ft</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300 font-sans">
                    <li className="flex items-start gap-2">• Exposed brickwork / Italian marble & granite flooring</li>
                    <li className="flex items-start gap-2">• Teakwood doors & custom wooden window frames</li>
                    <li className="flex items-start gap-2">• Grohe / Toto luxury bath fixtures & glass enclosures</li>
                    <li className="flex items-start gap-2">• Solar water heating, rainwater harvesting & elevation design</li>
                    <li className="flex items-start gap-2">• Full 3D architectural design consultation included</li>
                  </ul>
                </div>
                <button
                  onClick={onOpenQuoteModal}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-white hover:text-slate-950 font-sans text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                >
                  Select Luxury Package →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. VERIFIED PROJECTS IN CATEGORY                             */}
        {/* ============================================================ */}
        {projects.length === 0 ? (
          <div className="bg-slate-50 rounded-3xl p-12 text-center border border-dashed border-slate-300">
            <p className="text-slate-600 mb-4">
              Additional verified NDL projects under this typology are currently being digitized from engineering archives.
            </p>
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3 rounded-full bg-slate-950 text-white font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Consult with Proprietor on This Typology →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                onClick={() => navigate(`/residential-construction/${category.slug}/${project.id}`)}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:border-slate-950 transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                {/* Project Image Canvas */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.featuredImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[10px] font-bold tracking-wider border border-white/10 uppercase">
                      {project.type}
                    </span>
                    <span className="p-2 rounded-full bg-white/90 text-slate-950 hover:bg-white transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* In-Image Location */}
                  <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center gap-1.5 text-white/90 text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#C8A96B] shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                </div>

                {/* Card Info Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-tight text-slate-950 group-hover:text-slate-900 transition-colors mb-1">
                      {project.client}
                    </h3>
                    
                    <div className="flex flex-col gap-1 text-xs text-slate-600 mb-3 font-sans">
                      <p className="font-semibold text-slate-900">
                        Architect: <span className="font-normal text-slate-600">{project.architect}</span>
                      </p>
                      <p className="text-slate-500 line-clamp-2">
                        <span className="font-semibold text-slate-700">Scope:</span> {project.scope}
                      </p>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase text-slate-950 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>View Project Detail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {project.gallery?.length || 1} PHOTOS
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. BOTTOM DIRECT CONSULTATION BANNER                         */}
        {/* ============================================================ */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="font-mono text-xs text-[#C8A96B] font-bold uppercase tracking-widest block mb-1">
              PROPRIETOR CIVIL CONSULTATION
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
              Planning a {category.title} Project?
            </h3>
            <p className="text-sm text-slate-300 mt-1 max-w-xl font-sans">
              Discuss structural feasibility, material specifications, and turnkey execution with senior civil engineering directors.
            </p>
          </div>

          <button
            onClick={onOpenQuoteModal}
            className="px-8 py-4 rounded-full bg-white hover:bg-[#C8A96B] text-slate-950 font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-lg shrink-0 cursor-pointer"
          >
            Discuss Your Requirement →
          </button>
        </div>

      </div>
    </div>
  );
};
