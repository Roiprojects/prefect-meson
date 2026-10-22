// SOURCE OF TRUTH: Perfect Mason & NDL Engineers and Contractors Company Profile Book

import { ndlProjects, NDLProject } from './ndlProjectsData';

export interface BookPage {
  id: string;
  pageNumber: number;
  chapterNumber?: string;
  chapterTitle?: string;
  sectionTag?: string;
  type: 'front-cover' | 'toc' | 'intro' | 'profile' | 'team' | 'services' | 'execution' | 'machinery' | 'architects' | 'consultants' | 'strengths' | 'goals' | 'project-spread' | 'project-gallery' | 'back-cover';
  title?: string;
  subtitle?: string;
  content?: any;
  project?: NDLProject;
  galleryImages?: string[];
}

export interface BookSpread {
  id: string;
  spreadIndex: number;
  chapterKey: string;
  chapterName: string;
  leftPage: BookPage;
  rightPage: BookPage;
}

// Generate all Spreads for the Digital Company Profile Monograph
export const generateBookSpreads = (): BookSpread[] => {
  const spreads: BookSpread[] = [];
  let pageCounter = 1;

  // SPREAD 0: Front Cover
  spreads.push({
    id: 'spread-cover',
    spreadIndex: 0,
    chapterKey: 'cover',
    chapterName: 'Cover',
    leftPage: {
      id: 'page-inside-cover-left',
      pageNumber: 0,
      type: 'intro',
      title: 'PERFECT MASON',
      subtitle: 'NDL ENGINEERS & CONTRACTORS • COMPANY PROFILE & PRACTICE MONOGRAPH',
      sectionTag: 'DOCUMENT REF: PM-NDL-BLR-2016-PRF'
    },
    rightPage: {
      id: 'page-cover',
      pageNumber: pageCounter++,
      type: 'front-cover',
      title: 'PERFECT MASON',
      subtitle: 'NDL ENGINEERS AND CONTRACTORS',
      sectionTag: 'COMPANY PROFILE • EST. 2016 • BANGALORE'
    }
  });

  // SPREAD 1: Table of Contents & Introductory Preface
  spreads.push({
    id: 'spread-toc',
    spreadIndex: 1,
    chapterKey: 'contents',
    chapterName: 'Contents',
    leftPage: {
      id: 'page-preface',
      pageNumber: pageCounter++,
      type: 'intro',
      chapterNumber: 'INTRO',
      chapterTitle: 'PRACTICE INTRODUCTION',
      sectionTag: 'PERFECT MASON • CIVIL EXCELLENCE',
      title: 'Built Upon Engineering Integrity',
      subtitle: 'Delivering precision structural works, turnkey executions, and bespoke architectural finishes across Bangalore since 2016.'
    },
    rightPage: {
      id: 'page-toc',
      pageNumber: pageCounter++,
      type: 'toc',
      chapterNumber: 'INDEX',
      chapterTitle: 'CONTENTS',
      sectionTag: 'TABLE OF CONTENTS',
      title: 'Company Monograph Contents'
    }
  });

  // SPREAD 2: Chapter 01 - Company Profile & Chapter 02 - Execution Team
  spreads.push({
    id: 'spread-profile-team',
    spreadIndex: 2,
    chapterKey: 'profile',
    chapterName: 'Profile & Team',
    leftPage: {
      id: 'page-ch1-profile',
      pageNumber: pageCounter++,
      type: 'profile',
      chapterNumber: '01',
      chapterTitle: 'COMPANY PROFILE',
      sectionTag: 'ORGANIZATIONAL IDENTITY',
      title: 'NDL Engineers and Contractors',
      subtitle: 'Proprietorship Civil Engineering Firm • Perfect Mason Practice'
    },
    rightPage: {
      id: 'page-ch2-team',
      pageNumber: pageCounter++,
      type: 'team',
      chapterNumber: '02',
      chapterTitle: 'EXECUTION TEAM',
      sectionTag: 'ON-SITE HUMAN CAPITAL',
      title: 'Dedicated Engineering & Supervisory Core',
      subtitle: 'Over 14 Years of Technical Civil Engineering Leadership'
    }
  });

  // SPREAD 3: Chapter 03 - Services
  spreads.push({
    id: 'spread-services',
    spreadIndex: 3,
    chapterKey: 'services',
    chapterName: 'Services',
    leftPage: {
      id: 'page-ch3-services-1',
      pageNumber: pageCounter++,
      type: 'services',
      chapterNumber: '03',
      chapterTitle: 'SERVICES',
      sectionTag: 'CIVIL & STRUCTURAL PORTFOLIO',
      title: 'Civil Construction & Institutional Works',
      subtitle: 'Complete Spectrum of Construction Services'
    },
    rightPage: {
      id: 'page-ch3-services-2',
      pageNumber: pageCounter++,
      type: 'services',
      chapterNumber: '03',
      chapterTitle: 'SERVICES (CONT.)',
      sectionTag: 'INTERIORS & MEP SYSTEMS',
      title: 'Specialized Interiors & Engineering Works',
      subtitle: 'Precision Architectural Finishes & MEP Infrastructure'
    }
  });

  // SPREAD 4: Chapter 04 - Mode of Execution & Chapter 05 - Plants & Machinery
  spreads.push({
    id: 'spread-execution-machinery',
    spreadIndex: 4,
    chapterKey: 'execution',
    chapterName: 'Execution & Equipment',
    leftPage: {
      id: 'page-ch4-execution',
      pageNumber: pageCounter++,
      type: 'execution',
      chapterNumber: '04',
      chapterTitle: 'MODE OF EXECUTION',
      sectionTag: 'CONTRACTUAL FRAMEWORKS',
      title: 'Flexible Project Agreement Models',
      subtitle: 'Tailored Contract Structures for Diverse Client Requirements'
    },
    rightPage: {
      id: 'page-ch5-machinery',
      pageNumber: pageCounter++,
      type: 'machinery',
      chapterNumber: '05',
      chapterTitle: 'PLANTS & MACHINERY',
      sectionTag: 'EQUIPMENT & CAPABILITIES',
      title: 'In-House Shuttering & Machinery',
      subtitle: 'Rigorous On-Site Engineering Infrastructure'
    }
  });

  // SPREAD 5: Chapter 06 - Associated Architects & Chapter 07 - Structural Consultants
  spreads.push({
    id: 'spread-architects-consultants',
    spreadIndex: 5,
    chapterKey: 'architects',
    chapterName: 'Collaborations',
    leftPage: {
      id: 'page-ch6-architects',
      pageNumber: pageCounter++,
      type: 'architects',
      chapterNumber: '06',
      chapterTitle: 'ARCHITECTS ASSOCIATED WITH',
      sectionTag: 'ARCHITECTURAL COLLABORATIONS',
      title: 'Executed Under Leading Design Practices',
      subtitle: 'Realizing Complex Architectural Visions Across Bangalore'
    },
    rightPage: {
      id: 'page-ch7-consultants',
      pageNumber: pageCounter++,
      type: 'consultants',
      chapterNumber: '07',
      chapterTitle: 'STRUCTURAL CONSULTANTS',
      sectionTag: 'ENGINEERING ADVISORY',
      title: 'Engineered Under Premier Structural Practices',
      subtitle: 'Structural Rigor, Code Compliance & Stability'
    }
  });

  // SPREAD 6: Chapter 08 - Strengths & Chapter 09 - Goals
  spreads.push({
    id: 'spread-strengths-goals',
    spreadIndex: 6,
    chapterKey: 'strengths',
    chapterName: 'Strengths & Goals',
    leftPage: {
      id: 'page-ch8-strengths',
      pageNumber: pageCounter++,
      type: 'strengths',
      chapterNumber: '08',
      chapterTitle: 'STRENGTH',
      sectionTag: 'TECHNICAL COMPETENCIES',
      title: 'Core Technical & Execution Strengths',
      subtitle: 'Structural Precision, Advanced Finishes & Eco Materials'
    },
    rightPage: {
      id: 'page-ch9-goals',
      pageNumber: pageCounter++,
      type: 'goals',
      chapterNumber: '09',
      chapterTitle: 'IMMEDIATE & LONG-TERM GOALS',
      sectionTag: 'STRATEGIC DIRECTION',
      title: 'Expanding Scope with Unwavering Quality',
      subtitle: 'Vision for Growth, Brand Integrity & Institutional Projects'
    }
  });

  // PROJECT PORTFOLIO SPREADS (Chapter 10)
  ndlProjects.forEach((proj, index) => {
    const projNumStr = (index + 1).toString().padStart(2, '0');
    spreads.push({
      id: `spread-project-${proj.id}`,
      spreadIndex: spreads.length,
      chapterKey: 'projects',
      chapterName: `Project ${projNumStr}`,
      leftPage: {
        id: `page-proj-${proj.id}-left`,
        pageNumber: pageCounter++,
        type: 'project-spread',
        chapterNumber: '10',
        chapterTitle: 'PROJECTS EXECUTED BY OUR TEAM',
        sectionTag: `PROJECT ${projNumStr} • ${proj.category.toUpperCase()}`,
        title: proj.title,
        subtitle: proj.type,
        project: proj
      },
      rightPage: {
        id: `page-proj-${proj.id}-right`,
        pageNumber: pageCounter++,
        type: 'project-gallery',
        chapterNumber: '10',
        chapterTitle: 'PHOTOGRAPHIC DOCUMENTATION',
        sectionTag: `PLATES ${projNumStr}.1 - ${projNumStr}.4`,
        title: proj.client,
        subtitle: proj.location,
        project: proj,
        galleryImages: proj.gallery.slice(0, 4)
      }
    });
  });

  // FINAL SPREAD: Monograph Conclusion & Back Cover
  spreads.push({
    id: 'spread-back-cover',
    spreadIndex: spreads.length,
    chapterKey: 'contact',
    chapterName: 'Back Cover',
    leftPage: {
      id: 'page-monograph-summary',
      pageNumber: pageCounter++,
      type: 'intro',
      chapterNumber: 'APPENDIX',
      chapterTitle: 'PRACTICE COMMITMENT',
      sectionTag: 'QUALITY VERIFICATION',
      title: 'Structural Durability & Client Trust',
      subtitle: 'Direct leadership involvement on every square foot.'
    },
    rightPage: {
      id: 'page-back-cover',
      pageNumber: pageCounter++,
      type: 'back-cover',
      title: 'PERFECT MASON',
      subtitle: 'NDL ENGINEERS AND CONTRACTORS',
      sectionTag: 'REGISTERED OFFICE & CONTACT • BANGALORE, INDIA'
    }
  });

  return spreads;
};

export const bookChapters = [
  { key: 'cover', name: 'Cover', spreadIndex: 0, label: 'COVER' },
  { key: 'contents', name: 'Contents', spreadIndex: 1, label: 'CONTENTS' },
  { key: 'profile', name: 'Profile & Team', spreadIndex: 2, label: 'PROFILE' },
  { key: 'services', name: 'Services', spreadIndex: 3, label: 'SERVICES' },
  { key: 'execution', name: 'Execution & Plants', spreadIndex: 4, label: 'EXECUTION' },
  { key: 'architects', name: 'Architects & Consultants', spreadIndex: 5, label: 'COLLABORATIONS' },
  { key: 'strengths', name: 'Strengths & Goals', spreadIndex: 6, label: 'STRENGTHS' },
  { key: 'projects', name: 'Projects Portfolio', spreadIndex: 7, label: 'PROJECTS' },
  { key: 'contact', name: 'Back Cover', spreadIndex: 7 + ndlProjects.length, label: 'CONTACT' }
];
