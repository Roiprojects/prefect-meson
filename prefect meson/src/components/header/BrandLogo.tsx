import React from 'react';
import { useData } from '../../context/DataContext';

interface BrandLogoProps {
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ onClick }) => {
  const { settings } = useData();

  const companyName = settings?.companyName || 'PERFECT MASON';
  const logoUrl = settings?.logoUrl || '/logo.png';
  const words = companyName.trim().split(' ');
  const firstWord = words[0] || 'PERFECT';
  const restWords = words.slice(1).join(' ') || (words.length === 1 ? '' : 'MASON');

  return (
    <a
      href="#home"
      onClick={onClick}
      className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-500 rounded-2xl transition-all duration-300 select-none py-1 shrink-0"
      aria-label={`${companyName} — Architectural & Construction Excellence`}
    >
      <img
        src={logoUrl}
        alt={`${companyName} Logo`}
        className="h-14 w-14 sm:h-16 sm:w-16 lg:h-[68px] lg:w-[68px] xl:h-[76px] xl:w-[76px] 2xl:h-[84px] 2xl:w-[84px] object-contain rounded-full shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0 ring-2 ring-slate-200/90 bg-white p-0.5"
      />
      <div className="flex flex-col ml-3 sm:ml-3.5 xl:ml-4 tracking-tight shrink-0">
        <div className="flex items-center leading-none whitespace-nowrap">
          <span className="font-display text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] font-black tracking-[0.04em] uppercase text-slate-950 group-hover:text-slate-900 transition-colors duration-300">
            {firstWord}
          </span>
          {restWords ? (
            <span className="font-display text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] font-black tracking-[0.04em] uppercase text-slate-950 ml-1.5 group-hover:text-slate-800 transition-colors duration-300">
              {restWords}
            </span>
          ) : null}
        </div>
        <span className="font-mono text-[9px] sm:text-[10px] lg:text-[10.5px] xl:text-[11.5px] 2xl:text-[12px] font-extrabold tracking-[0.2em] uppercase text-slate-600 group-hover:text-slate-950 transition-colors mt-1 whitespace-nowrap">
          {settings?.tagline ? (settings.tagline.length > 25 ? 'BUILD IT RIGHT' : settings.tagline) : 'BUILD IT RIGHT'}
        </span>
      </div>
    </a>
  );
};
