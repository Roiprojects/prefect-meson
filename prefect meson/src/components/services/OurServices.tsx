import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

import schoolImg from '../../assets/comm_institutional_hero.jpg';
import hospitalImg from '../../assets/comm_office_hero.jpg';
import relatedWorksImg from '../../assets/about_active_construction.jpg';
import demolitionImg from '../../assets/turnkey_03_execution.jpg';
import industrialImg from '../../assets/comm_industrial_hero.jpg';
import electricalImg from '../../assets/turnkey_02_bim.jpg';
import plumbingImg from '../../assets/turnkey_04_quality.jpg';

export type LayerType = 'EXTERIOR' | 'STRUCTURE' | 'INTERIOR' | 'SERVICES';

export interface ServiceNode {
  id: string;
  number: string;
  displayNumber: string;
  name: string;
  layer: LayerType;
  categoryLabel: string;
  shortDescription: string;
  specs: string;
  destination: string;
  image: string;
}

export const services15: ServiceNode[] = [
  {
    id: '01-residential',
    number: '01',
    displayNumber: '01 / 15',
    name: 'Residential Projects',
    layer: 'EXTERIOR',
    categoryLabel: 'RESIDENTIAL',
    shortDescription: 'Residential construction and execution for private luxury villas, contemporary family residences, and independent residential developments.',
    specs: 'RCC SUPERSTRUCTURE • ARCHITECTURAL MASONRY • MEP INTEGRATION',
    destination: '/residential-construction',
    image: '/ndl_projects/slide_026_img_1.jpg',
  },
  {
    id: '02-commercial',
    number: '02',
    displayNumber: '02 / 15',
    name: 'Commercial Projects',
    layer: 'EXTERIOR',
    categoryLabel: 'COMMERCIAL',
    shortDescription: 'Commercial construction and related execution for business hubs, corporate offices, retail spaces, and mixed-use commercial developments.',
    specs: 'POST-TENSIONED SLABS • COMMERCIAL GLAZING • HIGH-LOAD FRAMING',
    destination: '/commercial-construction',
    image: '/ndl_projects/slide_097_img_1.jpg',
  },
  {
    id: '03-schools',
    number: '03',
    displayNumber: '03 / 15',
    name: 'Schools',
    layer: 'EXTERIOR',
    categoryLabel: 'INSTITUTIONAL',
    shortDescription: 'Construction works for educational institutions, multi-tier academic blocks, auditorium spaces, and institutional campus infrastructure.',
    specs: 'INSTITUTIONAL CAMPUSES • AUDITORIUMS • HEAVY FOOTFALL RIGOR',
    destination: '/commercial-construction',
    image: schoolImg,
  },
  {
    id: '04-temples',
    number: '04',
    displayNumber: '04 / 15',
    name: 'Temples',
    layer: 'EXTERIOR',
    categoryLabel: 'SACRED ARCHITECTURE',
    shortDescription: 'Construction and associated works for temple projects, monolithic stone masonry, traditional pilasters, and cultural architecture.',
    specs: 'MONOLITHIC STONE CARVING • TRADITIONAL PILASTERS • MANDAPAS',
    destination: '/turnkey-construction',
    image: '/ndl_projects/slide_074_img_1.jpg',
  },
  {
    id: '05-hospitals',
    number: '05',
    displayNumber: '05 / 15',
    name: 'Hospitals',
    layer: 'EXTERIOR',
    categoryLabel: 'HEALTHCARE',
    shortDescription: 'Construction works for healthcare facilities, multi-specialty clinical blocks, medical diagnostic wings, and sterile care spaces.',
    specs: 'HEALTHCARE INFRASTRUCTURE • STERILE ZONING • HIGH-CAPACITY MEP',
    destination: '/commercial-construction',
    image: hospitalImg,
  },
  {
    id: '06-other-related-works',
    number: '06',
    displayNumber: '06 / 15',
    name: 'Other Related Works',
    layer: 'EXTERIOR',
    categoryLabel: 'CIVIL SUPPORT',
    shortDescription: 'Supporting construction and associated project works, perimeter boundary retaining structures, surface grading, and site civil logistics.',
    specs: 'SITE INFRASTRUCTURE • PERIMETER RETAINING • DRAINAGE LOGISTICS',
    destination: '/turnkey-construction',
    image: relatedWorksImg,
  },
  {
    id: '07-office-interiors',
    number: '07',
    displayNumber: '07 / 15',
    name: 'Office Interiors',
    layer: 'INTERIOR',
    categoryLabel: 'INTERIORS',
    shortDescription: 'Interior execution for professional office environments, acoustic executive boardrooms, custom glass cubicles, and modular workstations.',
    specs: 'ACOUSTIC CEILINGS • GLASS CUBICLES • MODULAR WORKSPACES',
    destination: '/interior-fitout',
    image: '/ndl_projects/slide_086_img_1.png',
  },
  {
    id: '08-residential-interiors',
    number: '08',
    displayNumber: '08 / 15',
    name: 'Residential Interiors',
    layer: 'INTERIOR',
    categoryLabel: 'INTERIORS',
    shortDescription: 'Interior execution for residential living volumes, bespoke teak wood cabinetry, luxury marble flooring, and customized master bedroom suites.',
    specs: 'TEAK WOOD MILLWORK • ITALIAN MARBLE • ARTISAN CABINETRY',
    destination: '/interior-fitout',
    image: '/ndl_projects/slide_014_img_1.jpg',
  },
  {
    id: '09-restaurant-interiors',
    number: '09',
    displayNumber: '09 / 15',
    name: 'Restaurant Interiors',
    layer: 'INTERIOR',
    categoryLabel: 'HOSPITALITY',
    shortDescription: 'Interior execution for restaurant environments, commercial resto-bars, specialized dining lounges, acoustic panelling, and ambient joinery.',
    specs: 'HOSPITALITY JOINERY • ACOUSTIC FIT-OUT • AMBIENT LIGHTING',
    destination: '/interior-fitout',
    image: '/ndl_projects/slide_064_img_1.jpg',
  },
  {
    id: '10-demolition-works',
    number: '10',
    displayNumber: '10 / 15',
    name: 'Demolition Works',
    layer: 'STRUCTURE',
    categoryLabel: 'TECHNICAL WORKS',
    shortDescription: 'Controlled structural demolition, safe building deconstruction, debris evacuation, and site preparation for new civil construction.',
    specs: 'CONTROLLED DEMOLITION • DEBRIS EVACUATION • SITE CLEARANCE',
    destination: '/turnkey-construction',
    image: demolitionImg,
  },
  {
    id: '11-renovation-works',
    number: '11',
    displayNumber: '11 / 15',
    name: 'Renovation Works',
    layer: 'STRUCTURE',
    categoryLabel: 'CIVIL UPGRADE',
    shortDescription: 'Structural renovation, architectural retrofitting, elevation modernization, and adaptive space restructuring for existing buildings.',
    specs: 'STRUCTURAL RETROFITTING • FACADE MODERNIZATION • ADAPTIVE REUSE',
    destination: '/residential-construction',
    image: '/ndl_projects/slide_115_img_1.jpg',
  },
  {
    id: '12-industrial-sheds',
    number: '12',
    displayNumber: '12 / 15',
    name: 'Industrial Sheds',
    layer: 'STRUCTURE',
    categoryLabel: 'INDUSTRIAL',
    shortDescription: 'Industrial shed construction and related structural works, pre-engineered steel buildings, heavy-load flooring, and warehouse facilities.',
    specs: 'PEB STEEL FRAMES • HEAVY INDUSTRIAL FLOORS • WAREHOUSES',
    destination: '/commercial-construction',
    image: industrialImg,
  },
  {
    id: '13-structural-works',
    number: '13',
    displayNumber: '13 / 15',
    name: 'Structural Works',
    layer: 'STRUCTURE',
    categoryLabel: 'CORE ENGINEERING',
    shortDescription: 'Structural construction and associated project execution, heavy reinforced concrete columns, raft foundations, and cantilevered beams.',
    specs: 'REINFORCED RCC CORE • EXPOSED CONCRETE • SEISMIC FRAMING',
    destination: '/turnkey-construction',
    image: '/ndl_projects/slide_020_img_1.jpg',
  },
  {
    id: '14-electrical-works',
    number: '14',
    displayNumber: '14 / 15',
    name: 'Electrical Works',
    layer: 'SERVICES',
    categoryLabel: 'MEP SERVICES',
    shortDescription: 'Building electrical works coordinated with construction, 3-phase distribution panels, concealed conduit routing, and automation wiring.',
    specs: 'CONCEALED CONDUIT ROUTING • 3-PHASE BOARDS • AUTOMATION WIRING',
    destination: '/turnkey-construction',
    image: electricalImg,
  },
  {
    id: '15-plumbing-works',
    number: '15',
    displayNumber: '15 / 15',
    name: 'Plumbing Works',
    layer: 'SERVICES',
    categoryLabel: 'MEP SERVICES',
    shortDescription: 'Plumbing and sanitary works coordinated with construction, high-pressure booster systems, 10-bar hydro testing, and drainage infrastructure.',
    specs: 'HYDRO-PNEUMATIC PUMPING • 10-BAR PRESSURE TESTS • SWR NETWORKS',
    destination: '/turnkey-construction',
    image: plumbingImg,
  },
];

const LAYERS_CONFIG: { id: LayerType; label: string; count: number }[] = [
  { id: 'EXTERIOR', label: 'EXTERIOR ENVELOPE', count: 6 },
  { id: 'STRUCTURE', label: 'STRUCTURAL CORE', count: 4 },
  { id: 'INTERIOR', label: 'INTERIOR FIT-OUT', count: 3 },
  { id: 'SERVICES', label: 'TECHNICAL MEP', count: 2 },
];

interface OurServicesProps {
  onSelectService?: (service: any) => void;
}

export const OurServices: React.FC<OurServicesProps> = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isReduced = useReducedMotion();
  const activeService = services15[activeIndex];
  const easeCubic = [0.22, 1, 0.36, 1];

  // Subtle auto-rotation when user is not hovering
  useEffect(() => {
    if (isHovered || isReduced) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services15.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, isReduced]);

  const leftServices = services15.slice(0, 8);
  const rightServices = services15.slice(8, 15);

  const handleSelectLayer = (layer: LayerType) => {
    const firstInLayer = services15.findIndex((s) => s.layer === layer);
    if (firstInLayer !== -1) {
      setActiveIndex(firstInLayer);
    }
  };

  return (
    <section
      id="services"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full bg-[#FFFFFF] text-slate-900 py-16 sm:py-24 lg:py-28 overflow-hidden select-none border-t border-b border-slate-200"
    >
      {/* Background Architectural Grid & Technical Coordinates */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_65%,transparent_100%)] opacity-35 pointer-events-none" />

      {/* Floating Technical Coordinates (Subtle Architectural Metadata) */}
      <div className="absolute top-6 left-8 text-slate-400 font-mono text-[10px] pointer-events-none select-none tracking-widest hidden sm:block">
        + LAT 12.8912° N • LONG 77.6432° E [GRID: SEC-CAPABILITY-15]
      </div>
      <div className="absolute top-6 right-8 text-slate-400 font-mono text-[10px] pointer-events-none select-none tracking-widest hidden sm:block">
        + SYSTEM REF: 15-CAPABILITIES / ONE CONSTRUCTION SYSTEM
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 z-10">
        
        {/* ============================================================ */}
        {/* 1. SECTION INTRO (CONCISE EDITORIAL HEADLINE)                */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14 pb-6 border-b border-slate-200">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: easeCubic }}
              className="flex items-center gap-2.5 mb-3"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-4 ring-slate-200/80" />
                <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950 animate-ping" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-slate-800 flex items-center gap-1.5">
                SERVICES & CORE SCOPE
                <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06, ease: easeCubic }}
              className="font-display text-3xl sm:text-5xl lg:text-[52px] font-bold text-slate-950 uppercase tracking-tight leading-[1.02]"
            >
              EVERY LAYER. <br />
              <span className="text-slate-950">ONE EXECUTION SYSTEM.</span>
            </motion.h2>
          </div>

          {/* Right Supporting Text + 4 Layer Selector Pills */}
          <div className="max-w-md space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12, ease: easeCubic }}
              className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed font-normal"
            >
              NDL Engineers and Contractors undertakes a broad range of construction, interior, structural and technical works across residential, commercial, institutional and specialized projects.
            </motion.p>

            {/* 4 Architectural Layer Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {LAYERS_CONFIG.map((layer) => {
                const isActive = activeService.layer === layer.id;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => handleSelectLayer(layer.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-slate-950 text-white shadow-sm scale-102 ring-2 ring-slate-950/20'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-950'
                    }`}
                  >
                    {layer.id} ({layer.count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. MAIN 15-CAPABILITY ARCHITECTURAL INSTALLATION STAGE       */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* ========================================================== */}
          {/* LEFT FLANK: SERVICE NODES 01 - 08 (3 COLS)                */}
          {/* ========================================================== */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-2.5">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1 pl-1">
              DISCIPLINES 01 — 08
            </span>

            {leftServices.map((service, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => {
                    setActiveIndex(idx);
                    setIsHovered(true);
                  }}
                  onClick={() => navigate(service.destination)}
                  className={`group relative p-3 sm:p-3.5 rounded-xl transition-all duration-300 cursor-pointer border flex items-center justify-between ${
                    isActive
                      ? 'bg-slate-950 text-white border-slate-950 shadow-lg -translate-x-1'
                      : 'bg-slate-50/80 text-slate-800 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md shrink-0 transition-colors ${
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'bg-slate-200 text-slate-700 group-hover:bg-slate-300'
                      }`}
                    >
                      {service.number}
                    </span>
                    <span
                      className={`font-sans text-xs font-bold uppercase tracking-tight truncate ${
                        isActive ? 'text-white' : 'text-slate-900 group-hover:text-black'
                      }`}
                    >
                      {service.name}
                    </span>
                  </div>

                  {/* Architectural Connector Line / Indicator */}
                  <div className="flex items-center gap-1.5 shrink-0 pl-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        isActive ? 'bg-orange-400 scale-125' : 'bg-slate-300 group-hover:bg-slate-400'
                      }`}
                    />
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isActive ? 'text-orange-400 translate-x-0.5' : 'text-transparent'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================== */}
          {/* CENTER: CENTRAL ARCHITECTURAL COMPOSITION & IMAGE WINDOW   */}
          {/* ========================================================== */}
          <div className="lg:col-span-6">
            <div
              onClick={() => navigate(activeService.destination)}
              className="group relative w-full h-[380px] sm:h-[480px] lg:h-[540px] rounded-[32px] overflow-hidden bg-slate-950 border border-slate-300/80 shadow-2xl cursor-pointer"
            >
              {/* Dynamic Masked Image Reveal with Smooth Scale Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.65, ease: easeCubic }}
                  className="relative w-full h-full"
                >
                  <img
                    src={activeService.image}
                    alt={activeService.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-1000 ease-out"
                    loading="eager"
                  />

                  {/* Atmospheric Vignette Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Central Architectural Framing Overlay (HUD Wireframe Grid) */}
              <div className="absolute inset-0 pointer-events-none z-20 p-5 sm:p-7 flex flex-col justify-between">
                
                {/* Top HUD Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                      <span>{activeService.layer} LAYER</span>
                    </span>

                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-mono text-[11px] font-bold">
                      {activeService.displayNumber}
                    </span>
                  </div>

                  <div className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-wider border border-white/15">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>NDL IN-HOUSE EXECUTION</span>
                  </div>
                </div>

                {/* Central Decorative Crosshair / Registration Target */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="relative w-28 h-28 border border-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white/60" />
                    <div className="absolute top-0 w-full h-[1px] bg-white/20" />
                    <div className="absolute left-0 w-[1px] h-full bg-white/20" />
                  </div>
                </div>

                {/* Bottom HUD Information Overlay */}
                <div className="space-y-3 pt-4">
                  <div>
                    <span className="font-mono text-[10.5px] uppercase text-orange-400 font-bold tracking-[0.2em] block mb-1">
                      {activeService.specs}
                    </span>
                    <h3 className="font-display text-2xl sm:text-4xl lg:text-[40px] font-bold uppercase tracking-tight text-white leading-tight drop-shadow-md">
                      {activeService.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-[13px] text-slate-200 font-sans leading-relaxed line-clamp-2 max-w-xl font-normal drop-shadow">
                    {activeService.shortDescription}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(activeService.destination);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-orange-400 hover:text-slate-950 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xl cursor-pointer"
                    >
                      <span>EXPLORE SERVICE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <span className="font-mono text-[11px] text-slate-300 uppercase tracking-widest hidden sm:inline-block">
                      TAP TO VIEW SPECIFICATION
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT FLANK: SERVICE NODES 09 - 15 (3 COLS)               */}
          {/* ========================================================== */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-2.5">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1 pl-1">
              DISCIPLINES 09 — 15
            </span>

            {rightServices.map((service, idx) => {
              const actualIdx = idx + 8;
              const isActive = actualIdx === activeIndex;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => {
                    setActiveIndex(actualIdx);
                    setIsHovered(true);
                  }}
                  onClick={() => navigate(service.destination)}
                  className={`group relative p-3 sm:p-3.5 rounded-xl transition-all duration-300 cursor-pointer border flex items-center justify-between ${
                    isActive
                      ? 'bg-slate-950 text-white border-slate-950 shadow-lg translate-x-1'
                      : 'bg-slate-50/80 text-slate-800 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Left Indicator */}
                  <div className="flex items-center gap-1.5 shrink-0 pr-2">
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isActive ? 'text-orange-400 translate-x-0.5' : 'text-transparent'
                      }`}
                    />
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        isActive ? 'bg-orange-400 scale-125' : 'bg-slate-300 group-hover:bg-slate-400'
                      }`}
                    />
                  </div>

                  <div className="flex items-center gap-3 overflow-hidden justify-end">
                    <span
                      className={`font-sans text-xs font-bold uppercase tracking-tight truncate ${
                        isActive ? 'text-white' : 'text-slate-900 group-hover:text-black'
                      }`}
                    >
                      {service.name}
                    </span>
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md shrink-0 transition-colors ${
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'bg-slate-200 text-slate-700 group-hover:bg-slate-300'
                      }`}
                    >
                      {service.number}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ============================================================ */}
        {/* 3. MOBILE & TABLET RESPONSIVE SERVICE SELECTOR INDEX         */}
        {/* ============================================================ */}
        <div className="lg:hidden mt-8 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
              15 SERVICE DISCIPLINES
            </span>
            <span className="font-mono text-xs text-slate-400">
              TAP TO EXPLORE
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
            {services15.map((service, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl shrink-0 font-sans text-xs font-bold uppercase tracking-tight transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                    isActive
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">{service.number}</span>
                  <span>{service.name}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
