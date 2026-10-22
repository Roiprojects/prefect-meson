import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CommercialIntro } from '../components/commercial/CommercialIntro';
import { CommercialPrimaryGroups } from '../components/commercial/CommercialPrimaryGroups';
import { CommercialServices } from '../components/commercial/CommercialServices';
import { CommercialProcess } from '../components/commercial/CommercialProcess';
import { CommercialProjectsFilter } from '../components/commercial/CommercialProjectsFilter';

interface CommercialPageProps {
  onOpenQuoteModal: () => void;
}

export const CommercialPage: React.FC<CommercialPageProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white text-slate-900 select-none min-h-screen font-sans">
      {/* SECTION 4.1 — COMMERCIAL CONSTRUCTION INTRODUCTION */}
      <CommercialIntro onOpenQuoteModal={onOpenQuoteModal} />

      {/* 4 PRIMARY COMMERCIAL MODELS SHOWCASE */}
      <CommercialPrimaryGroups onOpenQuoteModal={onOpenQuoteModal} />

      {/* SECTION 4.2 — COMMERCIAL CONSTRUCTION SERVICES */}
      <CommercialServices onOpenQuoteModal={onOpenQuoteModal} />

      {/* SECTION 4.3 — 8-STAGE COMMERCIAL PROCESS */}
      <CommercialProcess onOpenQuoteModal={onOpenQuoteModal} />

      {/* SECTION 4.4 — COMMERCIAL PROJECTS SHOWCASE & FILTERS (SIDEBAR FILTER LAYOUT) */}
      <CommercialProjectsFilter />

      {/* 6. BOTTOM CTA */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="rounded-[36px] bg-slate-950 text-white p-10 sm:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-widest block mb-2">
              COMMERCIAL INQUIRIES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-3">
              Have a Commercial Construction Requirement?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Connect directly with senior civil engineering directors for feasibility studies, BOQ estimates, and turnkey commercial project execution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>Request Commercial Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/gallery')}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              View Full Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
