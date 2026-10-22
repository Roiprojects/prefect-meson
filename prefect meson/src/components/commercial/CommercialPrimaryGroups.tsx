import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Layers, Wrench, Factory, CheckCircle2, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../common/StatusBadge';

interface CommercialPrimaryGroupsProps {
  onOpenQuoteModal: () => void;
}

export const CommercialPrimaryGroups: React.FC<CommercialPrimaryGroupsProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();
  const { commercialItems } = useData();

  const iconList = [Building2, Layers, Wrench, Factory];

  const primaryModels = commercialItems.map((item, idx) => ({
    id: item.id || item.slug,
    number: String(idx + 1).padStart(2, '0'),
    badge: item.category.toUpperCase(),
    title: item.title,
    tagline: item.tagline || item.category.toUpperCase(),
    description: item.description,
    image: item.heroImage || '/assets/comm_complex_hero.jpg',
    icon: iconList[idx % iconList.length],
    route: `/commercial-construction/category/${item.slug || item.id}`,
    status: item.status || 'Active',
    features: item.capabilities && item.capabilities.length > 0
      ? item.capabilities
      : item.scope || ['Itemized BOQ Contract', 'Senior Civil Supervision'],
  }));

  return (
    <section id="commercial-primary-models" className="w-full bg-[#070A10] text-white py-20 lg:py-28 border-b border-slate-800/80 font-sans select-none relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#C8A96B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C8A96B]/10 border border-[#C8A96B]/25 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C8A96B]">
              4 PRIMARY COMMERCIAL EXECUTION MODELS
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-[1.05]">
            Commercial Contracting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C8A96B] to-[#DFCA98]">
              & Specialized Trade Models.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-400 font-sans leading-relaxed">
            From end-to-end itemized BOQ commercial contracts and structural shell packages to specialized trade subcontracting and pre-engineered industrial shed construction.
          </p>
        </div>

        {/* 4 CARDS GRID (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {primaryModels.map((model) => {
            const IconComp = model.icon;
            return (
              <div
                key={model.id}
                className="rounded-[28px] bg-[#0B0F19] border border-slate-800 hover:border-[#C8A96B]/80 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl relative group"
              >
                <div>
                  {/* TOP IMAGE CONTAINER WITH BADGES */}
                  <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/9] w-full border border-slate-800">
                    <img
                      src={model.image}
                      alt={model.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-black/40" />

                    {/* Top Left Pill Badges: Category & Dynamic Admin Status */}
                    <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
                      <div className="px-3.5 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[#C8A96B] font-mono text-[11px] font-bold tracking-widest uppercase">
                        {model.badge}
                      </div>
                      <StatusBadge status={model.status} variant="glass" />
                    </div>

                    {/* Top Right Number Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-white/80 font-mono text-xs font-bold">
                      {model.number}
                    </div>

                    {/* Gold Icon Badge at Bottom Right of Image */}
                    <div className="absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-[#C8A96B] text-slate-950 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  {/* SUBTITLE & TITLE */}
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#C8A96B] mb-2">
                    {model.tagline}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#C8A96B] transition-colors">
                    {model.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    {model.description}
                  </p>

                  {/* FEATURE BULLETS */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-800/80">
                    {model.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs text-slate-300 font-mono">
                        <div className="w-5 h-5 rounded-full bg-[#C8A96B]/15 text-[#C8A96B] border border-[#C8A96B]/30 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => navigate(model.route)}
                    className="px-6 py-3 rounded-full bg-[#C8A96B] text-slate-950 font-sans text-xs font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Explore {model.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onOpenQuoteModal}
                    className="px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-bold uppercase transition-all cursor-pointer border border-slate-700"
                  >
                    Request Quote →
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
