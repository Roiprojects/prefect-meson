import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Clock, ChevronRight } from 'lucide-react';
import { NavItemType } from '../../types/navigation';

interface MegaMenuProps {
  activeItem: NavItemType | null;
  isOpen: boolean;
  onClose: () => void;
  onItemSelect?: (href: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  activeItem,
  isOpen,
  onClose,
  onItemSelect,
}) => {
  if (!activeItem || !activeItem.hasMegaMenu || !isOpen) {
    return null;
  }

  const columns = activeItem.megaMenuColumns || [];
  const featured = activeItem.megaMenuFeatured;

  return (
    <AnimatePresence>
      <div
        id={`mega-menu-${activeItem.id}`}
        role="region"
        aria-label={`${activeItem.label} Specification`}
        className="absolute top-full left-0 w-full z-50 pt-3"
      >
        {/* Dropdown Surface: Solid Luxury Porcelain White */}
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.99 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className={`relative z-50 w-full ${columns.length > 2 ? 'max-w-[1320px]' : 'max-w-[1120px]'} mx-auto rounded-3xl bg-white text-slate-900 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.25)] border border-slate-200 overflow-hidden`}
        >
          {/* Top Subtle Luxury Accent Bar */}
          <div className="w-full h-[3px] bg-gradient-to-r from-slate-950 via-blue-900 to-amber-600" />

          <div className="px-6 sm:px-10 lg:px-12 py-7 lg:py-8">
            {/* Header Meta Strip */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-900 text-xs font-bold font-mono uppercase tracking-wider border border-slate-200/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {activeItem.label} CONSTRUCTION DIRECTORY
                </span>
                <span className="text-xs text-slate-400 font-sans hidden sm:inline">
                  • Precision Engineering & Turnkey Delivery
                </span>
              </div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400 hidden sm:inline-block">
                PERFECT MASON TECHNICAL MATRIX
              </span>
            </div>

            {/* Main Grid: Service Columns + Rich Visual Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Service Columns */}
              <div className={`grid gap-7 ${
                columns.length > 2
                  ? 'lg:col-span-8 sm:grid-cols-3'
                  : columns.length === 2
                  ? 'lg:col-span-7 sm:grid-cols-2'
                  : 'lg:col-span-7 grid-cols-1'
              }`}>
                {columns.map((column, colIdx) => (
                  <div key={colIdx} className="space-y-4">
                    {/* Category Title & Subtitle */}
                    {column.categoryTitle && (
                      <div className="border-b border-slate-200/80 pb-3">
                        <h4 className="font-sans text-xs font-black tracking-[0.14em] uppercase text-slate-950 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-slate-900" />
                          {column.categoryTitle}
                        </h4>
                        {column.categorySubtitle && (
                          <p className="text-[12px] font-sans text-slate-500 mt-1 leading-relaxed font-normal">
                            {column.categorySubtitle}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Service Items */}
                    <ul className="space-y-2.5" role="list">
                      {column.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <a
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              if (onItemSelect) onItemSelect(item.href);
                              onClose();
                            }}
                            className="group/item flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all duration-200 cursor-pointer gap-3"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2.5">
                                <span className="font-sans text-[13.5px] sm:text-[14px] font-bold text-slate-900 group-hover/item:text-blue-900 transition-colors leading-snug">
                                  {item.title}
                                </span>
                              </div>
                              {item.description && (
                                <p className="text-[11.5px] font-sans text-slate-500 mt-1 line-clamp-2 leading-relaxed font-normal">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                              {item.badge && (
                                <span className="font-mono text-[9.5px] px-2.5 py-0.5 rounded-md tracking-wider uppercase bg-slate-100 text-slate-700 font-bold border border-slate-200/80 group-hover/item:bg-slate-900 group-hover/item:text-white transition-colors">
                                  {item.badge}
                                </span>
                              )}
                              <ChevronRight
                                className="w-4 h-4 text-slate-300 group-hover/item:text-slate-950 group-hover/item:translate-x-1 transition-all duration-200"
                                strokeWidth={2.5}
                              />
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Right Showcase Teaser Card */}
              {featured && (
                <div className={`${
                  columns.length > 2 ? 'lg:col-span-4' : 'lg:col-span-5'
                } flex flex-col`}>
                  <div className="relative group/card h-full flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
                    {/* Architectural Image Preview */}
                    <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3.5 border border-slate-200">
                      <img
                        src={featured.imageUrl}
                        alt={featured.title}
                        className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover/card:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      
                      <div className="absolute top-2.5 left-2.5">
                        <span className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-white text-slate-950 border border-slate-200 font-bold shadow-xs">
                          {featured.tag}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <h5 className="font-sans text-xs sm:text-sm font-bold tracking-tight">
                          {featured.title}
                        </h5>
                        <p className="text-[11px] text-slate-300 font-sans line-clamp-1 mt-0.5">
                          {featured.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Key Metric Highlights */}
                    {featured.metrics && (
                      <div className="grid grid-cols-2 gap-2 py-2 border-t border-b border-slate-200/70 mb-3">
                        {featured.metrics.map((metric, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">
                              {metric.label}
                            </span>
                            <span className="font-sans text-xs font-bold text-slate-900">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action link button */}
                    <a
                      href={featured.href}
                      onClick={(e) => {
                        e.preventDefault();
                        if (onItemSelect) onItemSelect(featured.href);
                        onClose();
                      }}
                      className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs group-hover/card:shadow-sm"
                    >
                      <span>Explore Portfolio</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Assistance Banner */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ISO 9001:2015 & LEED Accredited Builders</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-slate-700 font-medium">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Turnkey Feasibility Appraisal within 24 Hours</span>
                </div>
              </div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  if (onItemSelect) onItemSelect('#contact');
                  onClose();
                }}
                className="font-sans text-xs font-bold text-slate-900 hover:text-blue-700 flex items-center gap-1.5 transition-colors group"
              >
                <span>Schedule Architect Consultation</span>
                <span className="group-hover:translate-x-1 transition-transform font-bold">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
