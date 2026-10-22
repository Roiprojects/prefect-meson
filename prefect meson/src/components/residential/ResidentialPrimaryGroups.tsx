import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../common/StatusBadge';

interface ResidentialPrimaryGroupsProps {
  onOpenQuoteModal: () => void;
}

export const ResidentialPrimaryGroups: React.FC<ResidentialPrimaryGroupsProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();
  const { residentialItems } = useData();

  return (
    <section className="w-full bg-slate-50 py-20 lg:py-28 border-b border-slate-200/80 font-sans select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-slate-950" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
              05.1B / 3 PRIMARY RESIDENTIAL EXECUTION GROUPS
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-slate-950 leading-[1.05]">
            Primary Execution Models <br className="hidden sm:inline" />
            & Specification Frameworks.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Choose between transparent item-rate contracts for luxury estates, per-sq-ft specification packages for family residences, or sustainable eco-friendly architectural design & execution.
          </p>
        </div>

        {/* DYNAMIC RESIDENTIAL EXECUTION MODELS */}
        <div className="space-y-16">
          {residentialItems.map((item, index) => {
            const isDark = index % 2 === 1;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={item.id}
                className={`rounded-3xl p-8 sm:p-12 shadow-xl border transition-all duration-300 flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch ${
                  isDark
                    ? 'bg-slate-950 text-white border-slate-800'
                    : 'bg-white text-slate-900 border-slate-200/90'
                }`}
              >
                {/* Text Content */}
                <div className={`flex-1 flex flex-col justify-between ${isReversed ? 'order-1 lg:order-2' : 'order-1'}`}>
                  <div>
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`w-8 h-8 rounded-full font-mono text-xs font-bold flex items-center justify-center ${
                        isDark ? 'bg-blue-600 text-white' : 'bg-slate-950 text-white'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className={`font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                        isDark
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                          : 'bg-amber-50 text-amber-900 border-amber-200/70'
                      }`}>
                        {item.category}
                      </span>

                      {item.pricePerSqFt && (
                        <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          {item.pricePerSqFt}
                        </span>
                      )}

                      {/* Dynamic Admin Status Badge (Active Model / Completed Handover / Upcoming Release) */}
                      <StatusBadge status={item.status} variant={isDark ? 'dark' : 'light'} />
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase mb-2">
                      {item.title}
                    </h3>

                    {item.tagline && (
                      <div className={`font-mono text-xs font-semibold uppercase tracking-wider mb-4 ${
                        isDark ? 'text-amber-400' : 'text-slate-500'
                      }`}>
                        {item.tagline}
                      </div>
                    )}

                    <p className={`text-sm sm:text-base leading-relaxed mb-6 font-sans ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {item.description}
                    </p>

                    {/* Features Grid */}
                    {item.features && item.features.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {item.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold">
                            <CheckCircle2 className={`w-4 h-4 shrink-0 ${isDark ? 'text-blue-400' : 'text-amber-600'}`} />
                            <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Specs Tags */}
                    {item.specs && item.specs.length > 0 && (
                      <div className={`p-4 rounded-2xl mb-6 border ${
                        isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-2">
                          Engineering Specifications & Standards:
                        </span>
                        <ul className={`space-y-1.5 text-xs font-sans ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {item.specs.map((sp, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2">
                              <span className="text-amber-500 font-bold">•</span>
                              <span>{sp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className={`flex flex-wrap items-center gap-4 pt-4 border-t ${
                    isDark ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    <button
                      onClick={() => navigate(`/residential-construction/category/${item.slug || item.id}`)}
                      className={`px-6 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                        isDark
                          ? 'bg-white hover:bg-slate-200 text-slate-950'
                          : 'bg-slate-950 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <span>Explore {item.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={onOpenQuoteModal}
                      className={`px-6 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                        isDark
                          ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-950 border-slate-200'
                      }`}
                    >
                      Request Quote →
                    </button>
                  </div>
                </div>

                {/* Media Image Box */}
                <div className={`lg:w-1/2 relative rounded-2xl overflow-hidden min-h-[320px] border border-slate-200 shadow-md ${
                  isReversed ? 'order-2 lg:order-1' : 'order-2'
                }`}>
                  <img
                    src={item.heroImage || '/assets/project_01_residential.jpg'}
                    alt={item.title}
                    className="w-full h-full object-cover brightness-95"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/project_01_residential.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Badges on Image */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-bold tracking-widest uppercase">
                      {item.status || 'Active Build'}
                    </span>
                    {item.galleryImages && item.galleryImages.length > 0 && (
                      <span className="px-3 py-1 rounded-full bg-white text-slate-950 font-mono text-[10px] font-bold">
                        {item.galleryImages.length} Gallery Photos
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    {item.client && (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300 block mb-1">
                        ESTATE: {item.client}
                      </span>
                    )}
                    <h4 className="font-display text-xl font-bold uppercase">
                      {item.title}
                    </h4>
                    {item.architect && (
                      <span className="text-xs text-slate-300 font-sans block mt-1">
                        Architect: {item.architect}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
