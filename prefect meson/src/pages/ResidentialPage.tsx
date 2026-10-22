import React from 'react';
import { ResidentialIntro } from '../components/residential/ResidentialIntro';
import { ResidentialPrimaryGroups } from '../components/residential/ResidentialPrimaryGroups';
import { ResidentialServices } from '../components/residential/ResidentialServices';
import { ResidentialWhatWeHandle } from '../components/residential/ResidentialWhatWeHandle';
import { ResidentialProcess } from '../components/residential/ResidentialProcess';
import { ResidentialProjectsFilter } from '../components/residential/ResidentialProjectsFilter';
import { ResidentialCTA } from '../components/residential/ResidentialCTA';

interface ResidentialPageProps {
  onOpenQuoteModal: () => void;
}

export const ResidentialPage: React.FC<ResidentialPageProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="w-full bg-white text-slate-900 select-none min-h-screen font-sans">
      {/* 5.1 INTRODUCTION */}
      <ResidentialIntro onOpenQuoteModal={onOpenQuoteModal} />

      {/* 5.1B 3 PRIMARY RESIDENTIAL GROUPS FEATURED BREAKDOWN */}
      <ResidentialPrimaryGroups onOpenQuoteModal={onOpenQuoteModal} />

      {/* 5.2 RESIDENTIAL SERVICES / 7 PROJECT TYPES EXPLORER */}
      <ResidentialServices />

      {/* 5.3 WHAT WE HANDLE / 10-DISCIPLINE CONSTRUCTION ANATOMY */}
      <ResidentialWhatWeHandle />

      {/* 5.4 9-STAGE HOME CONSTRUCTION PROCESS */}
      <ResidentialProcess />

      {/* 5.5 RESIDENTIAL PROJECT SHOWCASE WITH SIDEBAR FILTERS */}
      <ResidentialProjectsFilter />

      {/* 5.6 CTA */}
      <ResidentialCTA onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};
