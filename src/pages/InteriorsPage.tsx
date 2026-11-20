import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Home,
  Building2,
  ChevronRight,
  Palette
} from 'lucide-react';
import { InteriorProjectsFilter } from '../components/interiors/InteriorProjectsFilter';
import { useData } from '../context/DataContext';

// High-Resolution Authentic Architectural Interiors Imagery
import interior01Living from '../assets/interior_01_living.jpg';
import interior02Kitchen from '../assets/interior_02_kitchen.jpg';
import interior03Bedroom from '../assets/interior_03_bedroom.jpg';
import interior04Office from '../assets/interior_04_office.jpg';
import commOfficeImg from '../assets/comm_office_hero.jpg';
import commRetailImg from '../assets/comm_retail_hero.jpg';
import commShowroomImg from '../assets/comm_showroom_hero.jpg';
import commRestaurantImg from '../assets/comm_restaurant_hero.jpg';
import commHospitalityImg from '../assets/comm_hospitality_hero.jpg';
import ctaInteriorsImg from '../assets/about_hero_villa.jpg';

interface InteriorsPageProps {
  onOpenQuoteModal: () => void;
}

// 7.2 Service Item Interface
interface InteriorServiceItem {
  id: string;
  num: string;
  name: string;
  shortDescription: string;
  materialTag: string;
  image: string;
}

// 7.2 Residential Interior Categories (7 items)
const residentialInteriorCategories: InteriorServiceItem[] = [
  {
    id: 'living-room',
    num: '01',
    name: 'Living Room',
    shortDescription: 'Elegant contemporary Indian living room with refined furniture, natural stone cladding, concealed cove lighting, and bespoke media wall units.',
    materialTag: 'NATURAL STONE • COVE LIGHTING • TEAK ACCENTS',
    image: interior01Living,
  },
  {
    id: 'bedroom',
    num: '02',
    name: 'Bedroom',
    shortDescription: 'Premium Indian bedroom interior with sophisticated acoustic wall panelling, restrained millwork detailing, integrated headboards, and warm ambient reveals.',
    materialTag: 'ACOUSTIC PANELLING • VENEER • AMBIENT REVEALS',
    image: interior03Bedroom,
  },
  {
    id: 'kitchen',
    num: '03',
    name: 'Kitchen',
    shortDescription: 'Contemporary Indian modular kitchen with realistic cabinetry, quartz/granite worktops, Blum soft-close hardware, integrated spice pullouts, and architectural task lighting.',
    materialTag: 'BWP MARINE PLY • QUARTZ COUNTERS • BLUM HARDWARE',
    image: interior02Kitchen,
  },
  {
    id: 'dining',
    num: '04',
    name: 'Dining',
    shortDescription: 'Sophisticated Indian dining environment with custom solid wood tables, statement pendant fixtures, crockery displays, and intimate spatial zoning.',
    materialTag: 'SOLID WOOD • PENDANT FIXTURES • GLASS CROCKERY',
    image: '/ndl_projects/slide_014_img_1.jpg',
  },
  {
    id: 'pooja-room',
    num: '05',
    name: 'Pooja Room',
    shortDescription: 'Culturally authentic pooja room execution with carved seasoned teak wood elements, CNC lattice jaali work, brass inlays, and ambient warm backlighting.',
    materialTag: 'SEASONED TEAK • CNC JAALI • BRASS INLAYS',
    image: '/ndl_projects/slide_017_img_1.jpg',
  },
  {
    id: 'wardrobes',
    num: '06',
    name: 'Wardrobes',
    shortDescription: 'Floor-to-ceiling built-in wardrobe and walk-in dressing systems featuring tinted fluted glass, sensor LED profile lighting, velvet drawer dividers, and veneer finishes.',
    materialTag: 'FLUTED TINTED GLASS • SENSOR PROFILES • SOFT CLOSERS',
    image: '/ndl_projects/slide_106_img_1.jpg',
  },
  {
    id: 'complete-home-interiors',
    num: '07',
    name: 'Complete Home Interiors',
    shortDescription: 'Cohesive turnkey residential interior coordination synchronizing civil modifications, false ceilings, electrical loops, modular joinery, painting, and decor.',
    materialTag: 'FULL TURNKEY SCOPE • CIVIL + MEP + MILLWORK',
    image: '/assets/portfolio_04_interior.jpg',
  },
];

// 7.2 Commercial Interior Categories (5 items)
const commercialInteriorCategories: InteriorServiceItem[] = [
  {
    id: 'office-interiors',
    num: '01',
    name: 'Office Interiors',
    shortDescription: 'Modern corporate office fit-out with ergonomic workstations, acoustic boardrooms, executive glass cabins, and structured networking infrastructure.',
    materialTag: 'ACOUSTIC CEILINGS • TOUGHENED GLASS • DATA ROUTING',
    image: commOfficeImg,
  },
  {
    id: 'retail-interiors',
    num: '02',
    name: 'Retail Interiors',
    shortDescription: 'High-impact retail environments with durable vitrified flooring, perimeter architectural display shelving, high-CRI track spotlights, and cashier islands.',
    materialTag: 'HIGH-CRI TRACK LIGHTING • PERIMETER RACKS • CASHIER PODIUMS',
    image: commRetailImg,
  },
  {
    id: 'showrooms',
    num: '03',
    name: 'Showrooms',
    shortDescription: 'Sophisticated commercial experiential showrooms with large-span column-free layouts, specialized product accentuation lighting, and client lounges.',
    materialTag: 'LARGE-SPAN LAYOUTS • PRODUCT ACCENTUATION • LOUNGES',
    image: commShowroomImg,
  },
  {
    id: 'restaurants',
    num: '04',
    name: 'Restaurants',
    shortDescription: 'Bespoke restaurant, bar, and hospitality interiors coordinated around mood lighting, custom bar counters, acoustic dampening, and heavy-duty kitchen MEP.',
    materialTag: 'CUSTOM BAR JOINERY • MOOD LIGHTING • ACOUSTIC BAFFLES',
    image: commRestaurantImg,
  },
  {
    id: 'hospitality-spaces',
    num: '05',
    name: 'Hospitality Spaces',
    shortDescription: 'High-end hospitality lounges and reception spaces designed for durability, luxurious sensory comfort, fine stone wall finishes, and integrated climate control.',
    materialTag: 'FINE STONE CLADDING • LOBBY MILLWORK • RECEPTION DESKS',
    image: commHospitalityImg,
  },
];

// 7.3 Interior Execution Layers (All 10 Capabilities)
interface ExecutionLayer {
  step: string;
  name: string;
  desc: string;
  layerFocus: string;
  technicalDetails: string;
}

const executionLayers: ExecutionLayer[] = [
  {
    step: '01',
    name: 'Space Planning',
    desc: 'Organize spaces for practical and effective use.',
    layerFocus: 'CIRCULATION & ERGONOMICS',
    technicalDetails: '2D spatial zoning, architectural circulation paths, clearance tolerances, and furniture ergonomics without visual clutter.',
  },
  {
    step: '02',
    name: 'Material Selection',
    desc: 'Coordinate appropriate materials and finishes.',
    layerFocus: 'TACTILE SAMPLE MATRIX',
    technicalDetails: 'Physical mood-board curation: IS-710 BWP marine plywood, natural Italian marble, seasoned Burma teak, and durable surface laminates.',
  },
  {
    step: '03',
    name: 'Flooring',
    desc: 'Execute flooring works as part of the overall interior finish.',
    layerFocus: 'SURFACE TRANSITIONS',
    technicalDetails: 'Level screeding, anti-fracture membranes, diamond mirror polishing of Italian marble, and zero-expansion joint laying.',
  },
  {
    step: '04',
    name: 'False Ceiling',
    desc: 'Coordinate and execute ceiling treatment.',
    layerFocus: 'ACOUSTIC & HVAC CONCEALMENT',
    technicalDetails: 'Gyproc GI perimeter channels, moisture-resistant gypsum boards, shadowline perimeter grooves, and AC ducting concealment.',
  },
  {
    step: '05',
    name: 'Lighting',
    desc: 'Coordinate lighting as part of the interior environment.',
    layerFocus: 'ARCHITECTURAL ILLUMINATION',
    technicalDetails: 'Synchronized warm 3000K ambient cove lighting, architectural anti-glare downlights, profile LED channels, and 2-way automation switching.',
  },
  {
    step: '06',
    name: 'Wall Finishes',
    desc: 'Execute wall finishes and surface treatments.',
    layerFocus: 'TEXTURE & VERTICAL PLANES',
    technicalDetails: 'Veneer panelling with solid wood beadings, lime plaster textures, flute wall cladding, and anti-fungal acrylic base leveling.',
  },
  {
    step: '07',
    name: 'Furniture',
    desc: 'Coordinate furniture requirements within the interior.',
    layerFocus: 'CUSTOM & LOOSE ELEMENTS',
    technicalDetails: 'Master carpenter crafted solid wood sofas, dining suites, accent lounge chairs, and upholstered fabric detailing.',
  },
  {
    step: '08',
    name: 'Modular Solutions',
    desc: 'Integrate practical modular solutions where required.',
    layerFocus: 'PRECISION FACTORY FINISH',
    technicalDetails: 'Factory-pressed modular carcass joinery, PUR edge-banded shutters, tandem drawer boxes, and Blum motion hardware.',
  },
  {
    step: '09',
    name: 'Painting',
    desc: 'Complete interior painting and related finish works.',
    layerFocus: 'LUXURY SURFACE COATING',
    technicalDetails: '3-coat acrylic putty application, primer sealing, airless spray application of Asian Paints Royale luxury interior emulsions.',
  },
  {
    step: '10',
    name: 'Custom Works',
    desc: 'Execute project-specific custom interior works.',
    layerFocus: 'BESPOKE ARTISANAL DETAIL',
    technicalDetails: 'CNC carved lattice jaalis, brass metal inlay trims, tinted mirror feature walls, and bespoke pooja mandapam carving.',
  },
];

export const InteriorsPage: React.FC<InteriorsPageProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();
  const isReduced = useReducedMotion();
  const easeLuxury = [0.22, 1, 0.36, 1];
  const { interiorItems } = useData();

  // 7.2 Tab Switch: Residential vs Commercial
  const [activeTab, setActiveTab] = useState<'residential' | 'commercial'>('residential');
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0);

  // 7.3 Active Execution Layer
  const [activeLayerIdx, setActiveLayerIdx] = useState<number>(0);

  const dynamicResidential: InteriorServiceItem[] = interiorItems
    .filter((it) => it.spaceType === 'Residential')
    .map((it, idx) => ({
      id: it.id || it.slug,
      num: String(idx + 1).padStart(2, '0'),
      name: it.title || it.category,
      shortDescription: it.description,
      materialTag: it.materials && it.materials.length > 0 ? it.materials.join(' • ').toUpperCase() : (it.tagline || 'CUSTOM RESIDENTIAL INTERIORS').toUpperCase(),
      image: it.heroImage || '/assets/interior_01_living.jpg',
    }));

  const dynamicCommercial: InteriorServiceItem[] = interiorItems
    .filter((it) => it.spaceType === 'Commercial')
    .map((it, idx) => ({
      id: it.id || it.slug,
      num: String(idx + 1).padStart(2, '0'),
      name: it.title || it.category,
      shortDescription: it.description,
      materialTag: it.materials && it.materials.length > 0 ? it.materials.join(' • ').toUpperCase() : (it.tagline || 'CORPORATE FITOUT ARCHITECTURE').toUpperCase(),
      image: it.heroImage || '/assets/comm_office_hero.jpg',
    }));

  const currentCategories = activeTab === 'residential'
    ? (dynamicResidential.length > 0 ? dynamicResidential : residentialInteriorCategories)
    : (dynamicCommercial.length > 0 ? dynamicCommercial : commercialInteriorCategories);

  const activeService = currentCategories[activeCategoryIdx] || currentCategories[0];
  const activeLayer = executionLayers[activeLayerIdx];

  return (
    <div className="w-full bg-white text-slate-900 select-none min-h-screen font-sans">
      
      {/* ============================================================ */}
      {/* 7.1 INTRODUCTION -- IMMERSIVE SPACE FRAME HERO               */}
      {/* ============================================================ */}
      <section className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-16 bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        
        {/* Full-Width Architectural Interior Photograph Background */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src={interior04Office}
            alt="Interior Architecture & Execution"
            initial={isReduced ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.65, scale: 1 }}
            transition={{ duration: 1.2, ease: easeLuxury }}
            className="w-full h-full object-cover object-center brightness-90"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/75 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_45%,transparent_0%,rgba(2,6,23,0.85)_100%)] pointer-events-none" />
        </div>

        {/* Linework & Space Frame Datum Markings */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] pointer-events-none" />

        <div className="absolute top-8 left-8 text-white/30 font-mono text-[10px] pointer-events-none hidden sm:flex items-center gap-2">
          <span>+ [DATUM: INT-07.1]</span>
          <span>// SPATIAL VOLUMETRIC HARMONY</span>
        </div>
        <div className="absolute top-8 right-8 text-white/30 font-mono text-[10px] pointer-events-none hidden sm:flex items-center gap-2">
          <span>MATERIAL MATRIX</span>
          <span>+ [SEC: 07]</span>
        </div>

        {/* Center Architectural Content */}
        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 z-10 my-auto w-full">
          
          {/* Top Pill Marker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeLuxury }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C8A96B]">
              07 // ARCHITECTURAL INTERIORS
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeLuxury }}
            className="font-barlow text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight text-white leading-[0.94] max-w-5xl mb-4 drop-shadow-lg"
          >
            Interiors. <br />
            <span className="text-white/80 font-normal">Spaces Designed to Feel Complete.</span>
          </motion.h1>

          {/* Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeLuxury }}
            className="text-base sm:text-lg lg:text-xl text-slate-300 font-sans max-w-2xl leading-relaxed mb-10"
          >
            NDL Engineers and Contractors provides comprehensive interior solutions covering office interiors, residential homes, restaurants, associated civil works, electrical coordination, plumbing, and precision finishing.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeLuxury }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-xl bg-white hover:bg-[#C8A96B] text-slate-950 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-2xl cursor-pointer"
            >
              <span>Consult on Interior Project</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <a
              href="#interior-services"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>Explore Space Selector</span>
              <ChevronRight className="w-4 h-4 text-white/50" />
            </a>
          </motion.div>
        </div>

        {/* Space Frame Technical Annotations (Bottom Row) */}
        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 w-full z-10 pt-8 border-t border-white/15">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
            <span className="text-[#C8A96B] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
              TECHNICAL ATTRIBUTES:
            </span>
            <span>RESIDENTIAL</span>
            <span className="text-white/20">•</span>
            <span>COMMERCIAL</span>
            <span className="text-white/20">•</span>
            <span>MATERIAL</span>
            <span className="text-white/20">•</span>
            <span>LIGHTING</span>
            <span className="text-white/20">•</span>
            <span>FINISHING</span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7.2 INTERIOR SERVICES -- INTERACTIVE SPACE SELECTOR          */}
      {/* ============================================================ */}
      <section id="interior-services" className="relative w-full bg-white text-slate-900 py-20 sm:py-28 border-b border-slate-200 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 pb-6 border-b border-slate-200">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#071D38]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                  07.2 // INTERIOR SERVICES DIRECTORY
                </span>
              </div>
              <h2 className="font-barlow text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-slate-950 leading-[1.02]">
                Interior Services.
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
                Select between Residential and Commercial disciplines to explore specialized interior execution spaces.
              </p>
            </div>

            {/* Top-Level Switch: RESIDENTIAL vs COMMERCIAL */}
            <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 self-start lg:self-end">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('residential');
                  setActiveCategoryIdx(0);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'residential'
                    ? 'bg-[#071D38] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Residential Interiors (07)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('commercial');
                  setActiveCategoryIdx(0);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'commercial'
                    ? 'bg-[#071D38] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Commercial Interiors (05)</span>
              </button>
            </div>
          </div>

          {/* Space Selector: Left Interactive Index (40%) + Right Dominant Preview Canvas (60%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Category Index */}
            <div className="lg:col-span-5 space-y-2">
              {currentCategories.map((cat, idx) => {
                const isActive = idx === activeCategoryIdx;
                return (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setActiveCategoryIdx(idx)}
                    onClick={() => setActiveCategoryIdx(idx)}
                    className={`group relative p-4 rounded-2xl transition-all duration-200 cursor-pointer border ${
                      isActive
                        ? 'bg-slate-950 text-white border-slate-950 shadow-lg scale-[1.01]'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#C8A96B]' : 'text-slate-400'}`}>
                          {cat.num}
                        </span>
                        <span className="text-slate-400 text-xs">—</span>
                        <span className={`font-barlow text-lg sm:text-xl font-bold uppercase tracking-tight ${isActive ? 'text-white' : 'text-slate-950'}`}>
                          {cat.name}
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-[#C8A96B]' : 'text-slate-300'}`} />
                    </div>

                    <p className={`text-xs font-sans pl-7 leading-relaxed line-clamp-2 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                      {cat.shortDescription}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right Dominant Preview Stage */}
            <div className="lg:col-span-7">
              <div className="group relative w-full h-[460px] sm:h-[560px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: easeLuxury }}
                    className="relative w-full h-full"
                  >
                    <img
                      src={activeService.image}
                      alt={activeService.name}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('interior_01_living')) {
                          target.src = '/assets/interior_01_living.jpg';
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Top Badge */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 pointer-events-none">
                  <div className="px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-mono text-xs font-bold uppercase tracking-wider border border-white/20">
                    <span className="text-[#C8A96B]">{activeTab.toUpperCase()}</span> // {activeService.num}
                  </div>
                  <div className="bg-white/90 text-slate-950 px-3 py-1 rounded-full text-xs font-mono font-bold">
                    SPACE PREVIEW
                  </div>
                </div>

                {/* Bottom In-Image Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-10 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-6 pointer-events-none">
                  <div className="max-w-md">
                    <span className="font-mono text-[10.5px] uppercase text-[#C8A96B] font-bold tracking-[0.2em] block mb-1.5">
                      {activeService.materialTag}
                    </span>
                    <h3 className="font-barlow text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-2 leading-none">
                      {activeService.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed line-clamp-2">
                      {activeService.shortDescription}
                    </p>
                  </div>

                  <div className="shrink-0 pointer-events-auto">
                    <button
                      type="button"
                      onClick={onOpenQuoteModal}
                      className="px-6 py-3.5 rounded-full bg-white hover:bg-[#C8A96B] text-slate-950 font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-xl cursor-pointer flex items-center gap-2"
                    >
                      <span>Plan This Space</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 7.3 INTERIOR EXECUTION -- ALL 10 EXECUTION LAYERS            */}
      {/* ============================================================ */}
      <section className="relative w-full bg-[#071D38] text-white py-20 sm:py-28 overflow-hidden border-b border-white/10">
        
        <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.04] pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 z-10">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/15">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 border border-white/15 rounded-full mb-4">
                <Palette className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C8A96B]">
                  07.3 // 10-LAYER INTERIOR EXECUTION ANATOMY
                </span>
              </div>
              <h2 className="font-barlow text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.02]">
                Interior Execution.
              </h2>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-slate-300">
                FROM SPACE PLANNING TO FINAL DETAIL
              </p>
            </div>

            <p className="max-w-md text-sm sm:text-base text-slate-300 font-sans leading-relaxed lg:text-right">
              Explore how all 10 specialized execution disciplines integrate seamlessly under single-source engineering supervision.
            </p>
          </div>

          {/* 10-Layer Cross Section Interactive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 10-Layer Stack */}
            <div className="lg:col-span-5 space-y-2 max-h-[580px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
              {executionLayers.map((layer, idx) => {
                const isActive = idx === activeLayerIdx;
                return (
                  <div
                    key={layer.step}
                    onClick={() => setActiveLayerIdx(idx)}
                    className={`group p-4 rounded-2xl transition-all duration-200 cursor-pointer border flex items-center justify-between ${
                      isActive
                        ? 'bg-white text-slate-950 border-white shadow-xl scale-[1.01]'
                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#071D38]' : 'text-[#C8A96B]'}`}>
                        {layer.step}
                      </span>
                      <span className="text-xs opacity-30">—</span>
                      <div>
                        <h4 className={`font-sans text-sm sm:text-base font-bold uppercase tracking-tight ${isActive ? 'text-slate-950' : 'text-white'}`}>
                          {layer.name}
                        </h4>
                        <p className={`text-xs font-sans ${isActive ? 'text-slate-600' : 'text-slate-400'}`}>
                          {layer.desc}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#071D38]' : 'text-white/40'}`} />
                  </div>
                );
              })}
            </div>

            {/* Right Execution Detail Showcase */}
            <div className="lg:col-span-7 lg:sticky lg:top-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLayer.step}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: easeLuxury }}
                  className="bg-white/10 backdrop-blur-xl rounded-[32px] p-8 sm:p-10 border border-white/20 shadow-2xl"
                >
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/15">
                    <span className="px-3.5 py-1 bg-[#C8A96B] text-slate-950 rounded-full font-mono text-xs font-black uppercase">
                      LAYER {activeLayer.step} OF 10
                    </span>
                    <span className="font-mono text-xs text-[#C8A96B] uppercase tracking-widest font-bold">
                      {activeLayer.layerFocus}
                    </span>
                  </div>

                  <h3 className="font-barlow text-3xl sm:text-4xl font-bold uppercase text-white mb-2 leading-tight">
                    {activeLayer.name}
                  </h3>
                  <div className="text-sm font-sans text-slate-300 mb-6 font-medium">
                    {activeLayer.desc}
                  </div>

                  {/* Technical Execution Detail Box */}
                  <div className="bg-black/40 rounded-2xl p-6 border border-white/10 space-y-3">
                    <span className="font-mono text-xs text-[#C8A96B] font-bold uppercase tracking-wider block">
                      ENGINEERING SPECIFICATION & EXECUTION:
                    </span>
                    <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed">
                      {activeLayer.technicalDetails}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 7.4 EXECUTED INTERIOR PROJECT SHOWCASE                       */}
      {/* ============================================================ */}
      <InteriorProjectsFilter />

      {/* ============================================================ */}
      {/* 7.5 FINAL CTA -- TRANSFORM YOUR SPACE                        */}
      {/* ============================================================ */}
      <section className="relative w-full py-20 sm:py-28 bg-slate-950 text-white overflow-hidden">
        
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <img
            src={ctaInteriorsImg}
            alt="Transform Your Space with Perfect Mason"
            className="w-full h-full object-cover brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 z-10">
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-[#C8A96B] font-bold uppercase tracking-widest block mb-4">
              07.5 // INTERIOR DESIGN & EXECUTION
            </span>

            <h2 className="font-barlow text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white mb-6 leading-[0.96]">
              Transform Your Space With Perfect Mason.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed mb-10 max-w-2xl">
              Connect directly with our interior engineering team to coordinate your space planning, custom millwork, and turnkey finishes.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white hover:bg-[#C8A96B] text-slate-950 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-2xl cursor-pointer"
              >
                <span>Start Your Interior Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="px-8 py-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Visit Design Office
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
