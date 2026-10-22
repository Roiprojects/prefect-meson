import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, CheckCircle2 } from 'lucide-react';
import { ndlCompanyProfile } from '../../data/ndlCompanyData';
import { useData } from '../../context/DataContext';
import imgCorporateProfile from '/assets/about_completed_project.jpg';

const coreValues = [
  'STRUCTURAL INTEGRITY',
  'MATERIAL AUTHENTICITY',
  'ARCHITECTURAL PRECISION',
  'TRANSPARENT BOQ',
  'PROPRIETOR SUPERVISION'
];

export const AboutIntro: React.FC = () => {
  const { pageContents } = useData();
  const easeCorporate = [0.22, 1, 0.36, 1];

  const aboutHero = pageContents?.about?.hero || {};
  const aboutIntro = pageContents?.about?.intro || {};
  const eyebrowText = aboutIntro.label || aboutHero.label || '01 // COMPANY OVERVIEW & PROFILE';
  const headingText = aboutIntro.heading || aboutHero.heading || ndlCompanyProfile.companyName;
  const supportingText = aboutIntro.supportingText || aboutHero.supportingText || ndlCompanyProfile.companyBackground;

  return (
    <section
      id="about-introduction"
      className="relative w-full bg-[#FFFFFF] text-[#242A30] py-20 sm:py-28 lg:py-32 overflow-hidden select-none border-b border-[#E2E8F0]"
    >
      {/* 0. SUBTLE ARCHITECTURAL GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#F1F5F9_1px,transparent_1px),linear-gradient(to_bottom,#F1F5F9_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] opacity-60 pointer-events-none" />

      <div className="relative max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 z-10">
        
        {/* ============================================================ */}
        {/* 1. TOP INTRODUCTION (AUTHORITATIVE CORPORATE HEADLINE)       */}
        {/* ============================================================ */}
        <div className="max-w-4xl mb-14 sm:mb-18 pb-8 border-b border-[#E2E8F0]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeCorporate }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#071D38]" />
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#071D38]">
              {eyebrowText}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: easeCorporate }}
            className="font-barlow text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#071D38] tracking-tight leading-[1.02]"
          >
            {headingText}
          </motion.h2>

          <p className="font-mono text-xs sm:text-sm font-bold text-[#071D38]/70 uppercase tracking-widest mt-2">
            {ndlCompanyProfile.businessStructure} • ESTABLISHED {ndlCompanyProfile.establishedYear} • BANGALORE
          </p>

          <p className="mt-4 text-base sm:text-lg text-slate-700 font-sans leading-relaxed">
            {supportingText}
          </p>
        </div>

        {/* ============================================================ */}
        {/* 2. THREE-TIER NDL COMPANY ATTRIBUTES (PPT DATA SOURCE)       */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20 sm:mb-24">
          
          {/* Left Column (5 Cols) - Proprietor & Real Project Visual */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeCorporate }}
              className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-md group aspect-[4/3] bg-slate-900"
            >
              <img
                src={imgCorporateProfile}
                alt="NDL Engineers and Contractors Landmark Architectural Execution"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071D38]/90 via-[#071D38]/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="font-mono text-[10px] font-bold text-[#C8A96B] uppercase tracking-widest block mb-0.5">
                  LANDMARK ARCHITECTURAL EXECUTION
                </span>
                <p className="font-barlow text-base font-bold uppercase tracking-tight text-white">
                  NDL Engineers & Contractors • Structural & Civil Mastery
                </p>
              </div>
            </motion.div>

            {/* Corporate Leadership Card */}
            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#071D38] text-white flex items-center justify-center font-bold font-mono text-sm">
                  BE
                </div>
                <div>
                  <h4 className="font-barlow text-lg font-bold uppercase text-slate-950">
                    {ndlCompanyProfile.proprietor.name}
                  </h4>
                  <span className="font-mono text-xs font-semibold text-[#071D38] block">
                    {ndlCompanyProfile.proprietor.qualification}
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                {ndlCompanyProfile.proprietor.experience}. {ndlCompanyProfile.proprietor.role}.
              </p>
            </div>
          </div>

          {/* Right Column (7 Cols) - Execution Team & Office Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Execution Team Composition */}
            <div className="p-7 sm:p-8 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#071D38]" />
                  <span className="font-mono text-xs font-bold text-[#071D38] uppercase tracking-[0.2em]">
                    TECHNICAL EXECUTION STRUCTURE
                  </span>
                </div>
                <span className="font-mono text-xs text-slate-500 font-semibold uppercase">
                  DIRECT SITE SUPERVISION
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                {ndlCompanyProfile.executionTeam.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ndlCompanyProfile.executionTeam.members.map((member, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-barlow text-sm font-bold uppercase text-slate-950">
                        {member.role}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[#071D38] font-mono text-[10px] font-bold uppercase">
                        {member.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Registered Office & Establishment */}
            <div className="p-7 sm:p-8 rounded-2xl bg-[#071D38] text-white shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C8A96B]" />
                  <span className="font-mono text-xs font-bold text-[#C8A96B] uppercase tracking-[0.2em]">
                    REGISTERED OFFICE & HEADQUARTERS
                  </span>
                </div>
                <span className="font-mono text-xs text-slate-400">EST. {ndlCompanyProfile.establishedYear}</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-barlow text-xl font-bold uppercase text-white tracking-tight">
                  {ndlCompanyProfile.companyName}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {ndlCompanyProfile.registeredOffice.fullAddress}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-6 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">PHONE / MOBILE</span>
                  <span className="text-white font-bold">{ndlCompanyProfile.contact.displayPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">DIRECT EMAIL</span>
                  <span className="text-white font-bold">{ndlCompanyProfile.contact.email}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* 3. CORE SERVICE SCOPE (15 CATEGORIES)                        */}
        {/* ============================================================ */}
        <div className="mb-18 pb-12 border-b border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#071D38]">
              SERVICES & CORE SCOPE
            </span>
            <span className="font-mono text-[11px] text-slate-500 uppercase">
              15 COMPLETE CATEGORIES FROM SOURCE
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {ndlCompanyProfile.services.map((service, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200/90 hover:border-[#071D38] hover:bg-white transition-all shadow-2xs flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#071D38] shrink-0" />
                <span className="font-sans text-xs font-semibold text-slate-800 leading-snug">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. FOUNDATIONAL VALUES PREVIEW                               */}
        {/* ============================================================ */}
        <div className="flex flex-wrap items-center gap-y-3 gap-x-4 sm:gap-x-6 text-sm sm:text-base lg:text-lg font-barlow font-bold uppercase tracking-wider text-[#071D38] pt-2">
          {coreValues.map((val, idx) => (
            <React.Fragment key={idx}>
              <span className="hover:text-slate-950 transition-colors">
                {val}
              </span>
              {idx < coreValues.length - 1 && (
                <span className="text-[#071D38]/30 font-light select-none">/</span>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};
