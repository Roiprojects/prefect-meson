import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Sparkles, HardHat, Crown, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../common/StatusBadge';

interface HomePageResidentialHighlightsProps {
  onOpenQuoteModal: () => void;
}

export const HomePageResidentialHighlights: React.FC<HomePageResidentialHighlightsProps> = ({ onOpenQuoteModal: _onOpenQuoteModal }) => {
  const navigate = useNavigate();
  const { residentialItems } = useData();

  // Find the 3 primary group items from live DataContext
  const luxuryItem = residentialItems.find((r) =>
    r.category.includes('Luxury Villas') || r.title.toLowerCase().includes('luxury villa')
  ) || residentialItems[0];

  const affordableItem = residentialItems.find((r) =>
    r.category.includes('Affordable Homes') || r.title.toLowerCase().includes('affordable home')
  ) || residentialItems[1];

  const ecoItem = residentialItems.find((r) =>
    r.category.includes('Eco Friendly') || r.title.toLowerCase().includes('eco')
  ) || residentialItems[2];

  const groups = [
    {
      id: 'luxury',
      groupNo: '01',
      tag: 'ITEM RATE CONTRACT',
      eyebrow: 'GROUP 01 • LUXURY ESTATES',
      title: luxuryItem?.title || 'Luxury Villas on Item Rate Basis',
      tagline: 'Custom architectural estates executed with 100% itemized BOQ rate transparency.',
      image: luxuryItem?.heroImage || '/projects/dr_anil_kush/dr_anil_kush_01_facade_front.jpg',
      status: luxuryItem?.status || 'Active',
      badgeColor: 'text-amber-900 bg-amber-100/90 border-amber-300/80',
      icon: Crown,
      iconBg: 'bg-amber-500 text-slate-950',
      href: '/residential-construction/category/luxury-villas-item-rate',
      featureHighlight: '100% Itemized BOQ Contract Transparency',
      chips: ['Item-Rate BOQ', 'Exposed RCC', 'Senior Civil Supervision'],
    },
    {
      id: 'affordable',
      groupNo: '02',
      tag: 'SPEC PACKAGES',
      eyebrow: 'GROUP 02 • PER SQ.FT PACKAGES',
      title: affordableItem?.title || 'Affordable Homes with Packages as per Specs',
      tagline: 'Standardized structural and finishing specification packages tailored to your budget.',
      image: affordableItem?.heroImage || '/assets/residential_hero.jpg',
      status: affordableItem?.status || 'Active',
      badgeColor: 'text-blue-900 bg-blue-100/90 border-blue-300/80',
      icon: HardHat,
      iconBg: 'bg-blue-600 text-white',
      href: '/residential-construction/category/affordable-homes-packages',
      featureHighlight: 'Turnkey Packages from ₹2,300 / sq.ft',
      pricingTiers: [
        { name: 'BASIC', price: '₹2,300' },
        { name: 'PREMIUM', price: '₹2,800' },
        { name: 'LUXURY', price: '₹3,000' },
      ],
    },
    {
      id: 'eco',
      groupNo: '03',
      tag: 'SUSTAINABLE BUILD',
      eyebrow: 'GROUP 03 • ECO ARCHITECTURE',
      title: ecoItem?.title || 'Eco-Friendly Homes (Consultation, Design & Execution)',
      tagline: 'Climate-responsive green homes with exposed brick, SMB mud blocks and passive solar design.',
      image: ecoItem?.heroImage || '/assets/portfolio_01_residence.jpg',
      status: ecoItem?.status || 'Active',
      badgeColor: 'text-emerald-900 bg-emerald-100/90 border-emerald-300/80',
      icon: Leaf,
      iconBg: 'bg-emerald-600 text-white',
      href: '/residential-construction/category/eco-friendly-homes',
      featureHighlight: 'Turnkey Green Design & Execution',
      chips: ['Wire-Cut Brick', 'Stabilized Mud Blocks', 'Passive Cooling'],
    },
  ];

  return (
    <section className="relative w-full bg-slate-50/70 text-slate-900 py-16 lg:py-24 border-t border-b border-slate-200/80 overflow-hidden font-sans">
      {/* Subtle Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 z-10">
        
        {/* Section Header: Clean, Architectural & Spacious */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-14 gap-6 pb-6 border-b border-slate-200/90">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-900 font-mono text-xs uppercase tracking-widest mb-3 font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>3 PRIMARY RESIDENTIAL EXECUTION MODELS</span>
            </div>
            
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-950 leading-tight">
              Residential Architecture <br />
              & Specification Packages.
            </h2>
          </div>

          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-md">
            Visual highlights of our 3 primary residential models — from item-rate luxury villas to specification-driven homes and sustainable eco architecture.
          </p>
        </div>

        {/* 3 HERO IMAGE-CENTRIC CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-8">
          {groups.map((group) => {
            const IconComponent = group.icon;
            return (
              <div
                key={group.id}
                className="group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 hover:border-slate-400/90 p-4 sm:p-5 transition-all duration-300 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_55px_-12px_rgba(0,0,0,0.14)]"
              >
                <div>
                  {/* EXPANSIVE HERO IMAGE CONTAINER */}
                  <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden mb-5 bg-slate-100 border border-slate-200/80 shadow-xs">
                    <img
                      src={group.image}
                      alt={group.title}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />
                    
                    {/* Subtle Cinematic Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-black/20" />

                    {/* Top Floating Glass Badges: Tag & Dynamic Admin Status */}
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2 z-10">
                      <span className="font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/95 text-slate-950 backdrop-blur-md shadow-xs border border-white/80">
                        {group.tag}
                      </span>
                      <StatusBadge status={group.status} variant="glass" />
                    </div>

                    <div className="absolute top-3.5 right-3.5">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-slate-950/80 text-white backdrop-blur-md">
                        {group.groupNo}
                      </span>
                    </div>

                    {/* Floating Thematic Discipline Icon */}
                    <div className={`absolute bottom-3.5 right-3.5 w-10 h-10 rounded-xl ${group.iconBg} flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Bottom Feature Pill Overlay on Image */}
                    <div className="absolute bottom-3.5 left-3.5 right-16">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white font-mono text-[11px] font-medium border border-white/10">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{group.featureHighlight}</span>
                      </div>
                    </div>
                  </div>

                  {/* HIGHLIGHTED TITLE & HEADER SECTION */}
                  <div className="px-1 pb-2">
                    {/* Eyebrow Pill Highlight */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className={`inline-flex items-center gap-1.5 font-mono text-[10.5px] font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs ${group.badgeColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          group.id === 'luxury' ? 'bg-amber-600' : group.id === 'affordable' ? 'bg-blue-600' : 'bg-emerald-600'
                        }`} />
                        {group.eyebrow}
                      </span>
                    </div>

                    {/* Main Prominent Highlighted Title */}
                    <h3 className="font-display text-xl sm:text-[22px] font-black uppercase tracking-tight text-slate-950 leading-snug mb-2.5 group-hover:text-blue-950 transition-colors">
                      <span className="relative inline-block pb-1">
                        {group.title}
                        {/* Colored Accent Underline Bar */}
                        <span className={`absolute bottom-0 left-0 w-12 h-[3px] rounded-full ${
                          group.id === 'luxury' ? 'bg-amber-500' : group.id === 'affordable' ? 'bg-blue-600' : 'bg-emerald-500'
                        } group-hover:w-full transition-all duration-300`} />
                      </span>
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal mb-4 pt-1">
                      {group.tagline}
                    </p>

                    {/* Group 2 Pricing Bar or Feature Chips */}
                    {group.pricingTiers ? (
                      <div className="grid grid-cols-3 gap-1.5 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-4">
                        {group.pricingTiers.map((tier, idx) => (
                          <div key={idx} className="text-center">
                            <span className="font-mono text-[9px] text-slate-500 font-bold block uppercase tracking-wider">{tier.name}</span>
                            <span className="font-mono text-xs font-bold text-slate-950 block">{tier.price}</span>
                            <span className="text-[9px] text-slate-400 font-sans">/ sq.ft</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {group.chips?.map((chip, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 font-mono text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* SLIM HIGH-END ACTION BUTTON */}
                <div className="pt-2 px-1.5">
                  <button
                    type="button"
                    onClick={() => navigate(group.href)}
                    className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-between shadow-xs group-hover:shadow-md cursor-pointer"
                  >
                    <span>Explore Specifications</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
