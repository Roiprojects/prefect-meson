import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Home, HardHat, Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface CoreServiceItem {
  id: string;
  number: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  icon: React.ElementType;
  route: string;
  highlights: string[];
}

const CORE_SERVICES: CoreServiceItem[] = [
  {
    id: 'commercial',
    number: '01',
    badge: 'COMMERCIAL',
    title: 'Commercial Construction',
    tagline: 'High-Performance Corporate & Retail Hubs',
    description: 'Corporate campuses, multi-storey commercial complexes, hospitality venues, and retail developments engineered with industrial precision, statutory compliance, and structural permanence.',
    image: '/assets/commercial_hero.jpg',
    icon: Building2,
    route: '/commercial-construction',
    highlights: ['Corporate Headquarter Campuses', 'Retail Showrooms & Commercial Malls', 'Hospitality & Dining Developments'],
  },
  {
    id: 'residential',
    number: '02',
    badge: 'RESIDENTIAL',
    title: 'Residential Construction',
    tagline: 'Item Rate Villas, Affordable Packages & Eco Homes',
    description: 'Bespoke luxury estates on item-rate BOQ, structured per-sq-ft specification packages, and sustainable eco-friendly residences built with structural permanence.',
    image: '/assets/residential_hero.jpg',
    icon: Home,
    route: '/residential-construction',
    highlights: [
      'Luxury Villas on Item Rate Contract Basis',
      'Affordable Homes Packages (₹2,300 - ₹3,000 / sft)',
      'Eco-Friendly Homes (Consultation, Design & Execution)'
    ],
  },
  {
    id: 'turnkey',
    number: '03',
    badge: 'TURNKEY',
    title: 'Turnkey Project Execution',
    tagline: 'End-to-End Single-Point Delivery',
    description: 'Unified project delivery from architectural design, municipal approvals, and procurement to civil engineering, commissioning, and final keys handover without coordination friction.',
    image: '/assets/turnkey_hero.jpg',
    icon: HardHat,
    route: '/turnkey-construction',
    highlights: ['Single-Point Responsibility', 'Zero Friction Handover Protocol', 'Comprehensive EPC Contracting'],
  },
  {
    id: 'interiors',
    number: '04',
    badge: 'INTERIORS',
    title: 'Interiors',
    tagline: 'Architectural Fit-Outs & Custom Millwork',
    description: 'Sophisticated interior environments, bespoke joinery, acoustic engineering, and premium material curation combining refined aesthetics with functional ergonomics.',
    image: '/assets/interior_01_living.jpg',
    icon: Sparkles,
    route: '/interior-fitout',
    highlights: ['Bespoke Architectural Millwork', 'Turnkey Corporate & Luxury Fit-Outs', 'Premium Material & Light Curation'],
  },
];

export const CoreServices: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-[#FFFFFF] py-24 md:py-32 lg:py-36 border-b border-stone-200/90 overflow-hidden text-slate-900">
      {/* Subtle Background Architectural Ambience */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C8A96B]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Section Header (Light Theme with Dark Navy & Gold Typography) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8A96B]/10 border border-[#C8A96B]/25 text-[#9A7B38] font-mono text-xs uppercase tracking-widest mb-4 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B] animate-pulse" />
              2.3 Core Services
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-light tracking-tight text-[#0F172A] leading-tight">
              <span className="bg-yellow-300 text-slate-950 px-2 py-0.5 rounded border border-yellow-500 inline-block mb-1 font-normal">
                Conceived with Vision.
              </span>{' '}
              <br />
              <span className="font-serif italic bg-yellow-200 text-yellow-950 px-2 py-0.5 rounded border border-yellow-400 inline-block mt-1">
                Realised with Passion.
              </span>
            </h2>
          </div>
          <div className="max-w-lg bg-yellow-50/90 border-2 border-yellow-400 p-4 rounded-2xl shadow-sm">
            <span className="inline-block px-2 py-0.5 mb-2 text-[9px] font-mono font-bold bg-yellow-400 text-yellow-950 rounded uppercase tracking-wider">
              Updated Text
            </span>
            <p className="text-yellow-950 text-sm md:text-base font-medium leading-relaxed">
              From commercial developments and residential architecture to turnkey project execution and bespoke interiors, Perfect Mason brings diverse construction disciplines together through one integrated approach — delivering spaces built around quality, precision and lasting value.
            </p>
          </div>
        </div>

        {/* 2 CARDS PER ROW (1 Row = 2 Cards Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {CORE_SERVICES.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => navigate(service.route)}
                className="group relative bg-[#0B0F19] rounded-3xl border border-slate-800/90 hover:border-[#C8A96B]/70 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_60px_-15px_rgba(200,169,107,0.25)] cursor-pointer"
              >
                {/* Image Container: 100% Bright, Crystal-Clear Architectural Photography */}
                <div className="relative h-72 sm:h-80 lg:h-96 w-full overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105 opacity-100"
                  />
                  {/* Minimal subtle bottom fade only at the base seam */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B0F19] to-transparent pointer-events-none" />

                  {/* Top Badge & Number */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-mono tracking-widest text-[#C8A96B] uppercase font-bold shadow-md">
                      {service.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 shadow-md">
                      {service.number}
                    </span>
                  </div>

                  {/* Floating Icon */}
                  <div className="absolute -bottom-5 right-6 w-14 h-14 rounded-2xl bg-[#0F172A] border border-slate-700/90 group-hover:border-[#C8A96B] flex items-center justify-center text-[#C8A96B] shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C8A96B] group-hover:text-slate-950">
                    <IconComponent className="w-6 h-6 transition-transform duration-300" />
                  </div>
                </div>

                {/* Card Content (Dark Card Interior with Crisp White/Slate Typography) */}
                <div className="p-8 pt-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-[#C8A96B] uppercase tracking-wider font-semibold mb-2">
                      {service.tagline}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-medium text-white group-hover:text-[#C8A96B] transition-colors mb-3 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-300/85 font-light leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Scope Highlights */}
                    <div className="space-y-2.5 mb-8 border-t border-slate-800/80 pt-5">
                      {service.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs text-slate-300 font-mono">
                          <CheckCircle2 className="w-4 h-4 text-[#C8A96B] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learn More CTA */}
                  <div className="pt-5 border-t border-slate-800/90 flex items-center justify-between text-xs font-mono tracking-widest text-slate-300 group-hover:text-[#C8A96B] transition-colors">
                    <span className="font-bold">LEARN MORE & EXPLORE SECTOR</span>
                    <div className="w-9 h-9 rounded-full bg-slate-800/90 group-hover:bg-[#C8A96B] group-hover:text-slate-950 flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 shadow-lg">
                      <ArrowUpRight className="w-4.5 h-4.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom Highlight Accent Bar */}
                <div className="h-1.5 w-0 bg-gradient-to-r from-[#C8A96B] via-[#DFCA98] to-[#C8A96B] group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
