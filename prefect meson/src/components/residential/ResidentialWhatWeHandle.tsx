import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, ShieldCheck, ChevronRight } from 'lucide-react';

interface Discipline {
  step: string;
  name: string;
  scope: string;
  technicalDetails: string;
  materials: string;
  image: string;
  badge: string;
}

const disciplines: Discipline[] = [
  {
    step: '01',
    name: 'Architectural Coordination',
    scope: 'Blueprint Synchronization & Sanction Filings',
    technicalDetails: 'Direct interface with architectural firms (Architecture Paradigm, Keystone, GRC, Still Water) translating 2D drawings and 3D BIM models into site execution lines without tolerance drift.',
    materials: 'Municipal Sanction Drawings • Structural Calculation Sheets • Cadastral Survey',
    image: '/projects/dr_anil_kush/dr_anil_kush_02_concrete_entry_steps.jpg',
    badge: 'STAGE 01 // ARCHITECTURAL DRAWINGS & SANCTIONS',
  },
  {
    step: '02',
    name: 'Structural Construction',
    scope: 'Substructure & Reinforced Concrete Core',
    technicalDetails: 'Isolated footing excavation, anti-termite chemical barrier, reinforced raft slabs, column cages, cantilever beam casting, and vibrator compaction.',
    materials: 'Fe550D TMT Rebar (Tata Tiscon / JSW) • 53-Grade OPC Cement • Hard Blue Granite Aggregates',
    image: '/ndl_projects/slide_018_img_1.jpg',
    badge: 'STAGE 02 // REINFORCED RCC CORE & FORMWORK',
  },
  {
    step: '03',
    name: 'Civil Works',
    scope: 'Masonry, Plastering & Parapets',
    technicalDetails: 'Precision wire-cut exposed brick masonry, stabilized mud block (SMB) bonding, 1:4 cement sand wall plastering with fiberglass mesh at joint junctions to prevent shrinkage cracks.',
    materials: 'Wire-cut Bricks • Stabilized Mud Blocks • M-Sand / River Sand Mortar',
    image: '/ndl_projects/slide_026_img_1.jpg',
    badge: 'STAGE 03 // WIRE-CUT BRICK & PLASTERING',
  },
  {
    step: '04',
    name: 'Electrical Works',
    scope: '3-Phase Conduit Rough-in & Automation',
    technicalDetails: 'Concealed FRLS PVC conduit routing embedded inside slab casting, distribution board zoning, copper earthing pits, EV charger points, and smart home automation backbones.',
    materials: 'Finolex / Havells FRLS Copper Wiring • Schneider / Legrand MCB DBs • Copper Earth Electrodes',
    image: '/ndl_projects/slide_074_img_1.jpg',
    badge: 'STAGE 04 // 3-PHASE CONCEALED MEP CONDUITS',
  },
  {
    step: '05',
    name: 'Plumbing',
    scope: 'Hydro-Pneumatic Supply & Sanitary Drainage',
    technicalDetails: 'Multi-layer CPVC hot/cold distribution lines, acoustic SWR drainage pipes, sump/overhead tank plumbing, rainwater harvesting filters, and 10-bar pressure leak audits.',
    materials: 'Astral / Ashirvad CPVC & SWR Pipes • Grundfos Hydro-Pneumatic Booster Pumps',
    image: '/ndl_projects/slide_069_img_1.jpg',
    badge: 'STAGE 05 // HYDRO-PNEUMATIC WATER SUPPLY',
  },
  {
    step: '06',
    name: 'Flooring',
    scope: 'Italian Marble, Natural Stone & Hardwood',
    technicalDetails: 'Sub-floor leveling screed, anti-fracture membrane, epoxy joint grouting, diamond disc mirror polishing of Italian marble slabs, and custom hardwood tongue-and-groove layout.',
    materials: 'Imported Botticino / Dyna Marble • Honed Flamed Granite • Seasoned Teak Flooring',
    image: '/ndl_projects/slide_014_img_1.jpg',
    badge: 'STAGE 06 // ITALIAN MARBLE & GRANITE SCREEDING',
  },
  {
    step: '07',
    name: 'Painting',
    scope: 'Weatherproof Facades & Luxury Interior Emulsions',
    technicalDetails: 'Exterior silicon elastomer waterproof primer, anti-fungal weather shield coatings, 3-coat acrylic putty leveling, and airless spray interior luxury emulsions.',
    materials: 'Asian Paints Apex Ultima Protek • Royale Aspira Emulsion • Birla White Putty',
    image: '/ndl_projects/slide_057_img_1.jpg',
    badge: 'STAGE 07 // AIRLESS SPRAY & WEATHER COATINGS',
  },
  {
    step: '08',
    name: 'Doors & Windows',
    scope: 'Seasoned Teak Frames & Thermal Break Fenestration',
    technicalDetails: 'Kiln-dried seasoned Burma/CP teak wood door frames (5"x3" section), flush doors with veneer pressing, and heavy-gauge UPVC/Aluminum double-glazed window systems with EPDM gaskets.',
    materials: '100% Seasoned Teak Wood • Fenesta / Schüco Double-Glazed UPVC • Hafele Mortise Locks',
    image: '/ndl_projects/slide_050_img_1.jpg',
    badge: 'STAGE 08 // SEASONED TEAK & THERMAL UPVC',
  },
  {
    step: '09',
    name: 'Finishing',
    scope: 'Waterproofing Audits, Balustrades & Glass Glazing',
    technicalDetails: 'Multi-coat polyurethane elastomeric waterproofing on terraces, sunken toilets, and balconies with 72-hour flood ponding tests. Frameless toughened glass railings with SS316 spigots.',
    materials: 'Dr. Fixit / Fosroc PU Membrane • 12mm Toughened Glass • SS316 Marine Grade Spigots',
    image: '/ndl_projects/slide_011_img_1.jpg',
    badge: 'STAGE 09 // 72-HR WATERPROOFING & BALUSTRADES',
  },
  {
    step: '10',
    name: 'Interior Coordination',
    scope: 'Custom Modular Millwork & Turnkey Handover',
    technicalDetails: 'In-house master carpentry for modular kitchens with Blum soft-close hardware, walk-in wardrobes with LED sensor profile lights, custom pooja room carving, and final snagging.',
    materials: 'BWP Marine Ply (IS 710) • Natural Wood Veneers • Blum / Hafele Hardware',
    image: '/ndl_projects/slide_106_img_1.jpg',
    badge: 'STAGE 10 // CUSTOM MILLWORK & BLUM HARDWARE',
  },
];

export const ResidentialWhatWeHandle: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeDiscipline = disciplines[selectedIdx];
  const easeCubic = [0.22, 1, 0.36, 1];

  return (
    <section className="relative w-full bg-[#071D38] text-white py-20 sm:py-28 overflow-hidden">
      {/* Background Architectural Watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.05] pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 pb-6 border-b border-white/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 border border-white/15 rounded-full mb-4">
              <Wrench className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C8A96B]">
                5.3 // WHAT WE HANDLE -- COMPLETE EXECUTION ANATOMY
              </span>
            </div>
            <h2 className="font-barlow text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-[1.05]">
              10-Layer Construction Discipline
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-slate-300 font-sans leading-relaxed lg:text-right">
            Every residential project is executed through unified engineering control, removing contractor fragmentation across all 10 core execution scopes.
          </p>
        </div>

        {/* Layered Interactive Anatomy: Left Stack (40%) + Right Deep Spec Stage (60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Vertical 10-Layer Navigation Stack */}
          <div className="lg:col-span-5 space-y-2 max-h-[640px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
            {disciplines.map((d, i) => {
              const isActive = i === selectedIdx;

              return (
                <div
                  key={d.step}
                  onClick={() => setSelectedIdx(i)}
                  className={`group relative p-3.5 sm:p-4 rounded-xl transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? 'bg-white text-slate-950 border-white shadow-xl scale-[1.01]'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs font-black ${
                          isActive ? 'text-[#071D38]' : 'text-[#C8A96B]'
                        }`}
                      >
                        {d.step}
                      </span>
                      <span className="text-xs opacity-30">--</span>
                      <span
                        className={`font-sans text-sm sm:text-base font-bold uppercase tracking-tight ${
                          isActive ? 'text-slate-950' : 'text-white'
                        }`}
                      >
                        {d.name}
                      </span>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isActive ? 'translate-x-1 text-[#071D38]' : 'text-white/40'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Detailed Execution Specification Card WITH EMBEDDED VISUAL CANVAS */}
          <div className="lg:col-span-7 lg:sticky lg:top-[100px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDiscipline.step}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: easeCubic }}
                className="bg-white/10 backdrop-blur-xl rounded-[32px] overflow-hidden border border-white/20 shadow-2xl flex flex-col"
              >
                {/* Visual Architectural Canvas for Current Discipline */}
                <div className="relative aspect-[16/8] w-full bg-slate-950 overflow-hidden border-b border-white/15 group">
                  <img
                    src={activeDiscipline.image}
                    alt={activeDiscipline.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

                  {/* Top Layer Tag */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-3 py-1 bg-[#C8A96B] text-slate-950 rounded-full font-mono text-xs font-black uppercase shadow-md">
                      LAYER {activeDiscipline.step} // {activeDiscipline.name.toUpperCase()}
                    </span>
                    <ShieldCheck className="w-5 h-5 text-white drop-shadow-md" />
                  </div>

                  {/* Bottom Image Tagline */}
                  <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center gap-2 text-white font-mono text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="tracking-wider">{activeDiscipline.badge}</span>
                  </div>
                </div>

                {/* Content Specifications Body */}
                <div className="p-6 sm:p-8 space-y-5">
                  <div>
                    <h3 className="font-barlow text-2xl sm:text-3xl font-bold uppercase text-white mb-1.5 leading-tight">
                      {activeDiscipline.name}
                    </h3>
                    <div className="text-xs sm:text-sm font-mono text-[#C8A96B] font-semibold uppercase tracking-wider">
                      {activeDiscipline.scope}
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="bg-black/35 rounded-2xl p-4 sm:p-5 border border-white/10 space-y-2">
                    <span className="font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                      ENGINEERING EXECUTION METHODOLOGY:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                      {activeDiscipline.technicalDetails}
                    </p>
                  </div>

                  {/* Certified Materials */}
                  <div className="bg-black/35 rounded-2xl p-4 sm:p-5 border border-white/10 space-y-2">
                    <span className="font-mono text-[11px] font-bold text-[#C8A96B] uppercase tracking-wider block">
                      CERTIFIED MATERIAL SPECIFICATIONS:
                    </span>
                    <p className="text-xs font-mono text-slate-300 leading-relaxed">
                      {activeDiscipline.materials}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
