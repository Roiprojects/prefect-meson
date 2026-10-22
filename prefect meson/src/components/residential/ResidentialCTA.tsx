import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ResidentialCTAProps {
  onOpenQuoteModal: () => void;
}

export const ResidentialCTA: React.FC<ResidentialCTAProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-white py-16 sm:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="rounded-[36px] bg-[#071D38] text-white p-10 sm:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Radial Gradient Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A96B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <span className="font-mono text-xs text-[#C8A96B] font-bold uppercase tracking-widest block mb-3">
              5.6 // DIRECT CIVIL PROPRIETOR CONSULTATION
            </span>
            <h2 className="font-barlow text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-4 leading-[1.05]">
              Planning to Build Your Dream Home?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Consult directly with senior civil engineering directors for structural feasibility, locked Bill of Quantities (BOQ) estimations, and turnkey execution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 relative z-10">
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="px-8 py-4 rounded-full bg-white hover:bg-[#C8A96B] text-slate-950 font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>Discuss Your Requirement</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Visit Office
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
