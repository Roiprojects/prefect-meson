import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Layers,
  GitCommit,
  Check
} from 'lucide-react';
import { ndlCompanyProfile } from '../data/ndlCompanyData';
import { TurnkeyProjectsFilter } from '../components/turnkey/TurnkeyProjectsFilter';

// High-Resolution Turnkey Imagery
import turnkeyHeroImg from '../assets/turnkey_hero.jpg';
import turnkey01Blueprint from '../assets/turnkey_01_blueprint.jpg';
import turnkey02Bim from '../assets/turnkey_02_bim.jpg';
import turnkey03Execution from '../assets/turnkey_03_execution.jpg';
import turnkey04Quality from '../assets/turnkey_04_quality.jpg';
import turnkey05Handover from '../assets/turnkey_05_handover.jpg';
import processPlanningImg from '../assets/process_architectural_planning.jpg';
import processConsultImg from '../assets/process_01_consultation.jpg';
import ctaCompletedImg from '../assets/cinematic_grand_estate.jpg';

interface TurnkeyPageProps {
  onOpenQuoteModal: () => void;
}

// 6.3 All 14 End-to-End Services
interface EndToEndService {
  num: string;
  name: string;
  desc: string;
  tag: string;
}

const endToEndServices: EndToEndService[] = [
  { num: '01', name: 'Requirement Analysis', desc: 'Understand the project requirement.', tag: 'CLIENT BRIEF' },
  { num: '02', name: 'Planning', desc: 'Establish the execution direction.', tag: 'ROADMAP' },
  { num: '03', name: 'Design Coordination', desc: 'Coordinate required design inputs.', tag: 'BIM & CAD' },
  { num: '04', name: 'Estimation', desc: 'Develop project cost requirements.', tag: 'BOQ LOCK' },
  { num: '05', name: 'Procurement', desc: 'Coordinate required project materials and inputs.', tag: 'SUPPLY CHAIN' },
  { num: '06', name: 'Civil Construction', desc: 'Execute the required civil construction works.', tag: 'HEAVY CIVIL' },
  { num: '07', name: 'Electrical', desc: 'Coordinate required electrical works.', tag: 'MEP CONDUIT' },
  { num: '08', name: 'Plumbing', desc: 'Coordinate required plumbing works.', tag: 'HYDRO SUPPLY' },
  { num: '09', name: 'Flooring', desc: 'Execute flooring works as required.', tag: 'STONE & MARBLE' },
  { num: '10', name: 'Painting', desc: 'Execute painting and related finishing works.', tag: 'WEATHER COATING' },
  { num: '11', name: 'Interior Works', desc: 'Coordinate and execute interior works.', tag: 'CUSTOM JOINERY' },
  { num: '12', name: 'Finishing', desc: 'Complete the required finishing works.', tag: 'REVEALS & GLAZING' },
  { num: '13', name: 'Quality Inspection', desc: 'Review quality and completed works.', tag: 'BATCH TESTING' },
  { num: '14', name: 'Final Handover', desc: 'Complete the project and hand over the finished work.', tag: 'KEY DELIVERY' },
];

// 6.4 7-Stage Primary Turnkey Process
interface TurnkeyProcessNode {
  step: string;
  name: string;
  stageName: string;
  summary: string;
  image: string;
  deliverables: string[];
}

const turnkeyProcessNodes: TurnkeyProcessNode[] = [
  {
    step: '01',
    name: 'CONSULT',
    stageName: 'Consultation & Scoping',
    summary: 'Discovery meeting with senior civil engineers to understand project vision, timelines, and site context.',
    image: processConsultImg,
    deliverables: ['Requirement Brief Documentation', 'Execution Strategy Alignment', 'Site Visit Protocol'],
  },
  {
    step: '02',
    name: 'PLAN',
    stageName: 'Planning & Site Investigation',
    summary: 'Geotechnical soil investigation, cadastral survey, statutory zoning review, and baseline schedule formation.',
    image: turnkey01Blueprint,
    deliverables: ['Soil Borehole Analysis', 'Topographical Survey', 'Baseline Construction Timeline'],
  },
  {
    step: '03',
    name: 'DESIGN',
    stageName: 'Design Coordination',
    summary: 'Synchronizing structural RCC calculations, architectural drawings, and MEP service routes without clash.',
    image: turnkey02Bim,
    deliverables: ['Clash-Free MEP Models', 'Working Structural Blueprints', 'Municipal Sanction Approvals'],
  },
  {
    step: '04',
    name: 'ESTIMATE',
    stageName: 'Budget Estimation & BOQ Lock',
    summary: 'Developing itemized Bill of Quantities with specified material grades, transparent unit rates, and zero escalation clauses.',
    image: processPlanningImg,
    deliverables: ['Transparent Itemized BOQ', 'Brand Specification Schedule', 'Milestone Linked Cashflow'],
  },
  {
    step: '05',
    name: 'EXECUTE',
    stageName: 'Turnkey Construction & Execution',
    summary: 'Heavy civil execution, rebar reinforcement, concrete batching, masonry, and interior fit-out under resident engineer supervision.',
    image: turnkey03Execution,
    deliverables: ['Substructure & Core RCC Casting', 'Precision Masonry & Plastering', 'Daily Site Engineering Logs'],
  },
  {
    step: '06',
    name: 'INSPECT',
    stageName: 'Quality Inspection & Testing',
    summary: 'Comprehensive quality control including 7 & 28-day concrete cube testing, 72-hour waterproofing ponding, and 10-bar plumbing pressure tests.',
    image: turnkey04Quality,
    deliverables: ['Concrete Cube Test Certifications', 'Flood Ponding Test Sign-off', 'Pre-Handover Snagging Clearance'],
  },
  {
    step: '07',
    name: 'HANDOVER',
    stageName: 'Final Handover & Commissioning',
    summary: 'Delivery of as-built drawings, structural warranty certificates, deep chemical site cleaning, and formal ceremonial key handover.',
    image: turnkey05Handover,
    deliverables: ['Complete As-Built Documentation', 'Manufacturer Warranty Dossier', 'Ceremonial Key Handover'],
  },
];

// 6.5 7 Core Benefits
interface BenefitItem {
  id: string;
  num: string;
  title: string;
  desc: string;
}

const benefitsList: BenefitItem[] = [
  {
    id: 'single-point',
    num: '01',
    title: 'Single Point of Contact',
    desc: 'One coordinated communication point for the project, eliminating fragmented multi-vendor friction.',
  },
  {
    id: 'better-coordination',
    num: '02',
    title: 'Better Coordination',
    desc: 'Connect the required project activities through a unified execution approach across civil, MEP, and finishes.',
  },
  {
    id: 'reduced-involvement',
    num: '03',
    title: 'Reduced Client Involvement',
    desc: 'Reduce the need for the client to independently coordinate multiple execution activities and site supervisors.',
  },
  {
    id: 'centralized-pm',
    num: '04',
    title: 'Centralized Project Management',
    desc: 'Keep project activities connected through centralized management and direct proprietor supervision.',
  },
  {
    id: 'timeline-mgmt',
    num: '05',
    title: 'Better Timeline Management',
    desc: 'Coordinate successive project stages toward smoother progression without handover lag between trades.',
  },
  {
    id: 'quality-control',
    num: '06',
    title: 'Quality Control',
    desc: 'Maintain quality attention throughout execution and inspection with standardized batch testing protocols.',
  },
  {
    id: 'transparent-execution',
    num: '07',
    title: 'Transparent Execution',
    desc: 'Present project execution through a clear and structured process with locked BOQs and digital reporting.',
  },
];

export const TurnkeyPage: React.FC<TurnkeyPageProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();
  const isReduced = useReducedMotion();
  const easeLuxury = [0.22, 1, 0.36, 1];

  // 6.3 End-to-End active state
  const [activeServiceIdx, setActiveServiceIdx] = useState<number>(0);

  // 6.4 Process active state & auto-cycle
  const [activeProcessIdx, setActiveProcessIdx] = useState<number>(0);
  const [isProcessPlaying, setIsProcessPlaying] = useState<boolean>(true);
  const processTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 6.5 Benefits active state
  const [activeBenefitId, setActiveBenefitId] = useState<string>('single-point');

  // Process autoplay
  useEffect(() => {
    if (!isProcessPlaying) {
      if (processTimerRef.current) clearInterval(processTimerRef.current);
      return;
    }

    processTimerRef.current = setInterval(() => {
      setActiveProcessIdx((prev) => (prev + 1) % turnkeyProcessNodes.length);
    }, 4500);

    return () => {
      if (processTimerRef.current) clearInterval(processTimerRef.current);
    };
  }, [isProcessPlaying]);

  const currentProcess = turnkeyProcessNodes[activeProcessIdx];

  return (
    <div className="w-full bg-white text-slate-900 select-none min-h-screen font-sans">
      
      {/* ============================================================ */}
      {/* 6.1 HERO SECTION — PROJECT EXECUTION CONTROL                 */}
      {/* ============================================================ */}
      <section className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-16 bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        
        {/* Full-Width Architectural Project Image Background */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src={turnkeyHeroImg}
            alt="Turnkey Project Execution Control"
            initial={isReduced ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.65, scale: 1 }}
            transition={{ duration: 1.2, ease: easeLuxury }}
            className="w-full h-full object-cover object-center brightness-90"
            loading="eager"
          />
          {/* Subtle cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,rgba(2,6,23,0.85)_100%)] pointer-events-none" />
        </div>

        {/* Technical Linework Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

        {/* Datum Registration Coordinates */}
        <div className="absolute top-8 left-8 text-white/30 font-mono text-[10px] pointer-events-none hidden sm:flex items-center gap-2">
          <span>+ [DATUM: EPC-06.1]</span>
          <span>// TOTAL PROJECT CONTROL</span>
        </div>
        <div className="absolute top-8 right-8 text-white/30 font-mono text-[10px] pointer-events-none hidden sm:flex items-center gap-2">
          <span>COORDINATION MATRIX</span>
          <span>+ [SEC: 06]</span>
        </div>

        {/* Main Content Stage */}
        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 z-10 my-auto w-full">
          
          {/* Top Tag & Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeLuxury }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C8A96B]">
              06 // TURNKEY PROJECT EXECUTION
            </span>
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeLuxury }}
            className="font-barlow text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight text-white leading-[0.94] max-w-5xl mb-6 drop-shadow-lg"
          >
            Complete Project Execution <br />
            <span className="text-white/80 font-normal">Under One Roof.</span>
          </motion.h1>

          {/* Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeLuxury }}
            className="text-base sm:text-lg lg:text-xl text-slate-300 font-sans max-w-2xl leading-relaxed mb-10"
          >
            The client provides the requirement while Perfect Mason coordinates and executes the project through the required stages until completion.
          </motion.p>

          {/* Execution Control CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeLuxury }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-xl bg-white hover:bg-[#C8A96B] text-slate-950 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-2xl cursor-pointer"
            >
              <span>Initiate Turnkey Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <a
              href="#what-is-turnkey"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>Explore Framework</span>
              <ChevronRight className="w-4 h-4 text-white/50" />
            </a>
          </motion.div>
        </div>

        {/* Hero Execution Path (Bottom Edge) */}
        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 w-full z-10 pt-10 border-t border-white/15">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="font-mono text-xs text-[#C8A96B] font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
              <span>TECHNICAL EXECUTION PATHWAY:</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-none font-mono text-xs font-bold uppercase tracking-wider text-white/80">
              <span>01 REQUIREMENT</span>
              <span className="text-white/30">→</span>
              <span>02 PLAN</span>
              <span className="text-white/30">→</span>
              <span>03 EXECUTE</span>
              <span className="text-white/30">→</span>
              <span>04 INSPECT</span>
              <span className="text-white/30">→</span>
              <span className="text-[#C8A96B]">05 HANDOVER</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6.2 WHAT IS TURNKEY EXECUTION?                               */}
      {/* ============================================================ */}
      <section id="what-is-turnkey" className="relative w-full bg-white text-slate-900 py-20 sm:py-28 border-b border-slate-200 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#071D38]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                06.2 // THE TURNKEY ADVANTAGE
              </span>
            </div>

            <h2 className="font-barlow text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-slate-950 leading-[1.02]">
              What Is Turnkey Execution?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
              The client provides the requirement while Perfect Mason coordinates and executes the project through the required stages until completion.
            </p>
          </div>

          {/* Three-Part Visual: Client Requirement → Coordination + Execution → Completed Project */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* 01 CLIENT REQUIREMENT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeLuxury }}
              className="lg:col-span-3 p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-slate-400 block mb-3">
                  STAGE 01 // INPUT
                </span>
                <h3 className="font-barlow text-2xl font-bold uppercase text-slate-950 mb-3">
                  Client Requirement
                </h3>
                <p className="text-sm text-slate-600 font-sans leading-relaxed">
                  The client defines project scope, lifestyle vision, functional priorities, and target budgetary parameters.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200 mt-6 font-mono text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                CLIENT DRIVEN BRIEF →
              </div>
            </motion.div>

            {/* 02 COORDINATION + EXECUTION (DOMINANT CENTER ELEMENT) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: easeLuxury }}
              className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8A96B]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-[#C8A96B] text-slate-950 rounded-full font-mono text-xs font-black uppercase">
                    STAGE 02 // PERFECT MASON CONTROL CORE
                  </span>
                  <ShieldCheck className="w-5 h-5 text-[#C8A96B]" />
                </div>

                <h3 className="font-barlow text-3xl sm:text-4xl font-bold uppercase text-white mb-4 leading-tight">
                  Coordination + Execution
                </h3>

                <p className="text-base text-slate-300 font-sans leading-relaxed mb-6">
                  Perfect Mason handles the entire continuum: architectural alignment, structural calculations, procurement, civil construction, electrical, plumbing, finishes, and on-site supervision under certified civil engineering leadership.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px] text-slate-300">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">✓ STRUCTURAL CORE</div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">✓ MEP INTEGRATION</div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">✓ PROCUREMENT</div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">✓ QUALITY AUDITS</div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">✓ FINISHING</div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">✓ SITE SAFETY</div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/15 mt-8 font-mono text-xs font-bold text-[#C8A96B] uppercase tracking-wider flex items-center justify-between relative z-10">
                <span>SINGLE-SOURCE RESPONSIBILITY</span>
                <span>B.E. CIVIL SUPERVISION</span>
              </div>
            </motion.div>

            {/* 03 COMPLETED PROJECT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: easeLuxury }}
              className="lg:col-span-3 p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-slate-400 block mb-3">
                  STAGE 03 // OUTCOME
                </span>
                <h3 className="font-barlow text-2xl font-bold uppercase text-slate-950 mb-3">
                  Completed Project
                </h3>
                <p className="text-sm text-slate-600 font-sans leading-relaxed">
                  A fully realized, tested, snag-free architectural structure handed over with as-built drawings and structural warranties.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200 mt-6 font-mono text-[11px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CEREMONIAL KEY HANDOVER</span>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6.3 END-TO-END SERVICES (EXECUTION WALL WITH 14 STAGES)      */}
      {/* ============================================================ */}
      <section className="relative w-full bg-[#071D38] text-white py-20 sm:py-28 overflow-hidden border-b border-white/10">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.04] pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 z-10">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/15">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 border border-white/15 rounded-full mb-4">
                <Layers className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C8A96B]">
                  06.3 // COMPLETE SCOPE CONTINUUM
                </span>
              </div>
              <h2 className="font-barlow text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.02]">
                End-to-End Services.
              </h2>
            </div>

            <p className="max-w-md text-sm sm:text-base text-slate-300 font-sans leading-relaxed lg:text-right">
              All 14 specialized construction and coordination disciplines delivered under one synchronized technical roof.
            </p>
          </div>

          {/* The Execution Wall: Left 14-Stage Architectural Track + Right Live Focus */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Vertical Architectural Construction Line (14 Stages) */}
            <div className="lg:col-span-6 space-y-2 max-h-[620px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
              {endToEndServices.map((service, idx) => {
                const isActive = activeServiceIdx === idx;

                return (
                  <div
                    key={service.num}
                    onClick={() => setActiveServiceIdx(idx)}
                    className={`group relative p-4 rounded-2xl transition-all duration-200 cursor-pointer border flex items-center justify-between ${
                      isActive
                        ? 'bg-white text-slate-950 border-white shadow-xl scale-[1.01]'
                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#071D38]' : 'text-[#C8A96B]'}`}>
                        {service.num}
                      </span>
                      <span className="text-xs opacity-30">—</span>
                      <div>
                        <h4 className={`font-sans text-sm sm:text-base font-bold uppercase tracking-tight ${isActive ? 'text-slate-950' : 'text-white'}`}>
                          {service.name}
                        </h4>
                        <p className={`text-xs font-sans ${isActive ? 'text-slate-600' : 'text-slate-400'}`}>
                          {service.desc}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        isActive ? 'bg-[#071D38] text-white' : 'bg-white/10 text-slate-300'
                      }`}>
                        {service.tag}
                      </span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#071D38]' : 'text-white/40'}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Active Stage Focus Card */}
            <div className="lg:col-span-6 lg:sticky lg:top-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={endToEndServices[activeServiceIdx].num}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: easeLuxury }}
                  className="bg-white/10 backdrop-blur-xl rounded-[32px] p-8 sm:p-10 border border-white/20 shadow-2xl"
                >
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/15">
                    <span className="px-3.5 py-1 bg-[#C8A96B] text-slate-950 rounded-full font-mono text-xs font-black uppercase">
                      DISCIPLINE {endToEndServices[activeServiceIdx].num} OF 14
                    </span>
                    <span className="font-mono text-xs text-slate-300 uppercase tracking-widest">
                      TURNKEY SCOPE
                    </span>
                  </div>

                  <h3 className="font-barlow text-3xl sm:text-4xl font-bold uppercase text-white mb-3 leading-tight">
                    {endToEndServices[activeServiceIdx].name}
                  </h3>

                  <p className="text-lg text-slate-200 font-sans leading-relaxed mb-6">
                    {endToEndServices[activeServiceIdx].desc}
                  </p>

                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 font-sans text-sm text-slate-300">
                    <div className="font-mono text-xs text-[#C8A96B] font-bold uppercase tracking-wider">
                      EXECUTION COMMITMENT:
                    </div>
                    <p>
                      Coordinated directly under NDL Engineers and Contractors with transparent rate agreements and dedicated on-site engineering supervision.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6.4 THE TURNKEY PROCESS (7 NODES ROUTE)                     */}
      {/* ============================================================ */}
      <section className="relative w-full bg-white text-slate-900 py-20 sm:py-28 border-b border-slate-200 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 pb-8 border-b border-slate-200">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full mb-4">
                <GitCommit className="w-3.5 h-3.5 text-[#071D38]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                  06.4 // 7-STAGE TURNKEY JOURNEY
                </span>
              </div>

              <h2 className="font-barlow text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-slate-950 leading-[1.02]">
                The Turnkey Process.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
                A seamless architectural route from initial consultation to final commissioning.
              </p>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsProcessPlaying((prev) => !prev)}
                className="px-4 py-2 rounded-full border border-slate-200 text-xs font-mono font-bold uppercase hover:bg-slate-100 transition-all cursor-pointer"
              >
                {isProcessPlaying ? 'PAUSE ROTATION' : 'RESUME ROTATION'}
              </button>
              
              <div className="font-mono text-xs font-bold bg-slate-100 px-3 py-2 rounded-full border border-slate-200">
                {currentProcess.step} / 07
              </div>
            </div>
          </div>

          {/* Desktop Horizontal Route Navigation */}
          <div className="grid grid-cols-7 gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
            {turnkeyProcessNodes.map((node, idx) => {
              const isActive = activeProcessIdx === idx;
              return (
                <button
                  key={node.step}
                  onClick={() => {
                    setIsProcessPlaying(false);
                    setActiveProcessIdx(idx);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-[1.02]'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#C8A96B]' : 'text-slate-400'}`}>
                    {node.step}
                  </span>
                  <span className="font-barlow text-sm sm:text-base font-bold uppercase tracking-tight truncate mt-2">
                    {node.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Process Stage Showcase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-[32px] p-6 sm:p-10 border border-slate-200">
            
            {/* Left Content */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-[#071D38] text-white rounded-md font-mono text-xs font-bold">
                  STAGE {currentProcess.step}
                </span>
                <span className="font-mono text-xs text-slate-500 font-bold uppercase tracking-widest">
                  {currentProcess.name}
                </span>
              </div>

              <h3 className="font-barlow text-3xl sm:text-4xl font-bold uppercase text-slate-950 mb-4">
                {currentProcess.stageName}
              </h3>

              <p className="text-base text-slate-600 font-sans leading-relaxed mb-6">
                {currentProcess.summary}
              </p>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 mb-6">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  KEY STAGE DELIVERABLES:
                </span>
                <div className="space-y-2">
                  {currentProcess.deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-slate-950 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Chevrons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsProcessPlaying(false);
                    setActiveProcessIdx((prev) => (prev - 1 + turnkeyProcessNodes.length) % turnkeyProcessNodes.length);
                  }}
                  className="px-4 py-2 rounded-full border border-slate-300 text-xs font-mono font-bold uppercase hover:bg-white transition-all cursor-pointer"
                >
                  ← PREVIOUS
                </button>
                <button
                  onClick={() => {
                    setIsProcessPlaying(false);
                    setActiveProcessIdx((prev) => (prev + 1) % turnkeyProcessNodes.length);
                  }}
                  className="px-5 py-2 rounded-full bg-slate-950 text-white text-xs font-mono font-bold uppercase hover:bg-black transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>NEXT STAGE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Supporting Stage Visual */}
            <div className="lg:col-span-6 relative aspect-[16/11] rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 shadow-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentProcess.image}
                  src={currentProcess.image}
                  alt={currentProcess.stageName}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: easeLuxury }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white font-mono text-xs">
                <span className="text-[#C8A96B] font-bold uppercase block mb-0.5">AUTHENTIC EXECUTION STAGE</span>
                <span>{currentProcess.stageName}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6.5 SUPPORTING EXECUTION MODELS (SOURCE BASED)                */}
      {/* ============================================================ */}
      <section className="relative w-full bg-slate-50 text-slate-900 py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-200">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 font-bold block mb-2">
                SOURCE-SUPPORTED CONTRACTUAL FRAMEWORKS
              </span>
              <h2 className="font-barlow text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-slate-950">
                Flexible Execution Models
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-600 font-sans">
              Tailored engagement structures supported by NDL Engineers and Contractors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {ndlCompanyProfile.modesOfExecution.slice(0, 5).map((mode, idx) => (
              <div
                key={mode.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-slate-400 block mb-2">
                    0{idx + 1}
                  </span>
                  <h4 className="font-barlow text-lg font-bold uppercase text-slate-950 mb-2 leading-tight">
                    {mode.title.split('with')[0].split('where')[0]}
                  </h4>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    {mode.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6.5 WHY TURNKEY? (BENEFITS CONTROL CORE)                     */}
      {/* ============================================================ */}
      <section className="relative w-full bg-white text-slate-900 py-20 sm:py-28 border-b border-slate-200 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#071D38]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                06.5 // STRATEGIC VALUE
              </span>
            </div>
            <h2 className="font-barlow text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-slate-950">
              Why Turnkey?
            </h2>
            <p className="mt-4 text-base text-slate-600 font-sans">
              Discover how centralized project control delivers precision, transparency, and peace of mind.
            </p>
          </div>

          {/* Control Core Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitsList.map((benefit) => {
              const isSelected = activeBenefitId === benefit.id;
              return (
                <div
                  key={benefit.id}
                  onClick={() => setActiveBenefitId(benefit.id)}
                  className={`p-8 rounded-3xl transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-950 text-white border-slate-950 shadow-xl scale-[1.02]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#C8A96B]' : 'text-slate-400'}`}>
                        BENEFIT {benefit.num}
                      </span>
                      <Check className={`w-4 h-4 ${isSelected ? 'text-[#C8A96B]' : 'text-slate-400'}`} />
                    </div>

                    <h3 className="font-barlow text-2xl font-bold uppercase tracking-tight mb-3">
                      {benefit.title}
                    </h3>

                    <p className={`text-sm font-sans leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                      {benefit.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t mt-6 border-slate-200/20 font-mono text-[11px] uppercase tracking-wider font-bold">
                    {isSelected ? '✓ ACTIVE FOCUS' : 'SELECT TO EXPAND'}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6.6 EXECUTED TURNKEY PROJECT SHOWCASE                        */}
      {/* ============================================================ */}
      <TurnkeyProjectsFilter />

      {/* ============================================================ */}
      {/* 6.7 FINAL CTA — CINEMATIC WIDE COMPOSITION                   */}
      {/* ============================================================ */}
      <section className="relative w-full py-20 sm:py-28 bg-slate-950 text-white overflow-hidden">
        
        {/* Background Completed Architectural Building */}
        <div className="absolute inset-0 z-0">
          <img
            src={ctaCompletedImg}
            alt="Completed Turnkey Project"
            className="w-full h-full object-cover brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 z-10">
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-[#C8A96B] font-bold uppercase tracking-widest block mb-4">
              06.6 // HASSLE-FREE TURNKEY DELIVERY
            </span>

            <h2 className="font-barlow text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white mb-6 leading-[0.96]">
              Want a Hassle-Free Construction Experience?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed mb-10 max-w-2xl">
              Connect directly with our engineering team to review your architectural requirements, structural estimates, and turnkey timeline.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white hover:bg-[#C8A96B] text-slate-950 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-2xl cursor-pointer"
              >
                <span>Talk to Our Team</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="px-8 py-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Visit Registered Office
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
