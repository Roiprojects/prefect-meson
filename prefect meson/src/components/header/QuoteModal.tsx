import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  FileText,
  HardHat,
  Play,
  Plus,
  Home,
  Building,
  Key,
  Armchair,
  CheckCircle2,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

// Authentic high-resolution approved architectural photography assets
import modalLuxEstate from '../../assets/modal_lux_estate.jpg';
import resVilla from '../../assets/about_hero_villa.jpg';
import commHero from '../../assets/commercial_hero.jpg';
import turnkeyHero from '../../assets/turnkey_hero.jpg';
import interiorHero from '../../assets/interior_01_living.jpg';
import complexHero from '../../assets/comm_complex_hero.jpg';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CategoryType = 'residential' | 'commercial' | 'turnkey' | 'interiors';

interface CategoryCard {
  id: CategoryType;
  title: string;
  desc: string;
  image: string;
  icon: any;
  subtypes: string[];
}

const categoriesData: CategoryCard[] = [
  {
    id: 'residential',
    title: 'Residential Construction',
    desc: 'Homes, villas, duplexes and residences',
    image: resVilla,
    icon: Home,
    subtypes: ['Independent House', 'Villa', 'Duplex', 'Multi-Storey', 'Renovation', 'Other'],
  },
  {
    id: 'commercial',
    title: 'Commercial Construction',
    desc: 'Offices, shops, showrooms and commercial spaces',
    image: commHero,
    icon: Building,
    subtypes: ['Office Building', 'Commercial Complex', 'Retail Space', 'Showroom', 'Hospitality', 'Other'],
  },
  {
    id: 'turnkey',
    title: 'Turnkey Project',
    desc: 'Complete project execution from planning to handover',
    image: turnkeyHero,
    icon: Key,
    subtypes: ['Residential Turnkey', 'Commercial Turnkey', 'Civil + Interiors', 'Structural Package', 'Other'],
  },
  {
    id: 'interiors',
    title: 'Interior Design & Execution',
    desc: 'Home and commercial interiors',
    image: interiorHero,
    icon: Armchair,
    subtypes: ['Complete Home', 'Living Room', 'Modular Kitchen', 'Master Bedroom', 'Office Interiors', 'Other'],
  },
];

const areaOptions = [
  'Under 1,500 Sq.Ft',
  '1,500 – 3,000 Sq.Ft',
  '3,000 – 5,000 Sq.Ft',
  '5,000 – 10,000 Sq.Ft',
  'Above 10,000 Sq.Ft',
  'Not sure yet',
];

const siteStatusOptions = [
  'I already own the plot',
  'I have an existing building',
  'Construction has started',
  'Renovation / Extension',
  'Early planning stage',
];

const locationOptions = [
  'Karnataka',
  'Bengaluru (Central)',
  'Bengaluru (East / Whitefield / Sarjapur)',
  'Bengaluru (South / JP Nagar / HSR)',
  'Bengaluru (North / Hebbal / Yelahanka)',
  'Other Location',
];

const budgetRanges = [
  'Below ₹25 Lakhs',
  '₹25 – ₹50 Lakhs',
  '₹50 Lakhs – ₹1 Crore',
  '₹1 Crore – ₹3 Crores',
  'Above ₹3 Crores',
  'Not sure yet',
];

const timelineRanges = [
  'Immediately',
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  'Later / Flexible',
  'Not decided',
];

const serviceOptions = [
  'Architecture & Design Coordination',
  'Structural Construction',
  'Civil Construction',
  'Electrical & Plumbing Coordination',
  'Flooring & Painting',
  'Interior Millwork & Fitout',
  'Complete Turnkey Handover',
];

const progressSteps = [
  { id: 1, label: 'Project Type' },
  { id: 2, label: 'Project Details' },
  { id: 3, label: 'Location & Scope' },
  { id: 4, label: 'Budget & Timeline' },
  { id: 5, label: 'Contact Details' },
];

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const { addEnquiry } = useData();

  // Active step flow: 1 (Type & Details) -> 2 (Scope, Budget & Contact)
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [isContactStep, setIsContactStep] = useState<boolean>(false);

  // Form selections
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('residential');
  const [selectedSubtype, setSelectedSubtype] = useState<string>('Independent House');
  const [customSubtype, setCustomSubtype] = useState<string>('');

  const [builtUpArea, setBuiltUpArea] = useState<string>('3,000 – 5,000 Sq.Ft');
  const [exactArea, setExactArea] = useState<string>('');

  const [projectLocationState, setProjectLocationState] = useState<string>('Karnataka');
  const [locality, setLocality] = useState<string>('');
  const [siteStatus, setSiteStatus] = useState<string>('I already own the plot');

  // Expandable additional requirements
  const [isAdditionalExpanded, setIsAdditionalExpanded] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Civil Construction',
    'Structural Construction',
  ]);
  const [budget, setBudget] = useState<string>('₹50 Lakhs – ₹1 Crore');
  const [timeline, setTimeline] = useState<string>('1–3 months');

  // Contact details
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [preferredContact, setPreferredContact] = useState<'Phone' | 'WhatsApp' | 'Email'>('WhatsApp');
  const [clientMessage, setClientMessage] = useState<string>('');

  // Status
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const activeCategoryObj =
    categoriesData.find((c) => c.id === selectedCategory) || categoriesData[0];

  const handleCategorySelect = (catId: CategoryType) => {
    setSelectedCategory(catId);
    const cat = categoriesData.find((c) => c.id === catId);
    if (cat && cat.subtypes.length > 0) {
      setSelectedSubtype(cat.subtypes[0]);
    }
  };

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (isContactStep) {
      if (!fullName.trim()) errs.fullName = 'Full name is required';
      if (!phone.trim()) {
        errs.phone = 'Phone number is required';
      } else if (!/^[0-9+ \-()]{7,16}$/.test(phone.trim())) {
        errs.phone = 'Please enter a valid phone number';
      }
      if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errs.email = 'Please enter a valid email address';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = () => {
    if (!isContactStep) {
      setIsContactStep(true);
      setActiveStepId(5);
    } else {
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    if (isContactStep) {
      setIsContactStep(false);
      setActiveStepId(1);
    } else {
      handleClose();
    }
  };

  const handleFinalSubmit = () => {
    if (!validate()) return;

    setIsSubmitting(true);

    const effectiveSubtype =
      selectedSubtype === 'Other' && customSubtype.trim() ? customSubtype.trim() : selectedSubtype;
    const effectiveArea = exactArea.trim() ? `${exactArea.trim()} Sq.Ft (${builtUpArea})` : builtUpArea;
    const finalLocation = locality.trim() ? `${locality.trim()}, ${projectLocationState}` : projectLocationState;

    const requirements = `Subtype: ${effectiveSubtype} | Site: ${siteStatus} | Area: ${effectiveArea} | Services: ${selectedServices.join(', ')} | Budget: ${budget}`;

    try {
      addEnquiry({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || 'Not Provided',
        projectType: `${activeCategoryObj.title} — ${effectiveSubtype}`,
        projectStage: siteStatus,
        plotSize: effectiveArea,
        timeline: timeline,
        location: finalLocation,
        requirement: requirements,
        preferredContact: preferredContact,
        message: clientMessage.trim() || 'Project brief initiated through luxury consultation interface.',
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Enquiry submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setIsContactStep(false);
    setActiveStepId(1);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
        {/* Soft luxury backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* ======================================================================= */}
        {/* MAIN LUXURY CONSULTATION CONTAINER (Split ~48% Left / ~52% Right)       */}
        {/* ======================================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[1360px] h-[92vh] max-h-[880px] bg-slate-950 rounded-[28px] sm:rounded-[36px] shadow-2xl z-10 overflow-hidden flex flex-col lg:flex-row my-auto border border-white/10"
        >
          
          {/* ===================================================================== */}
          {/* LEFT ZONE (~48%): FULL BLEED LUXURY VILLA AT DUSK WITH EDITORIAL COPY */}
          {/* ===================================================================== */}
          <div className="relative lg:w-[48%] h-64 lg:h-full shrink-0 overflow-hidden flex flex-col justify-between p-6 sm:p-8 lg:p-10 select-none">
            
            {/* Background Photographic Canvas: Contemporary Indian Luxury Villa at Dusk */}
            <div className="absolute inset-0 z-0">
              <img
                src={modalLuxEstate}
                alt="Contemporary Luxury Villa at Sunset"
                className="w-full h-full object-cover object-center"
              />
              {/* Refined gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40" />
            </div>

            {/* Top Brand Identity */}
            <div className="relative z-10 space-y-5">
              {/* Logo */}
              <div className="flex items-center gap-4">
                <img
                  src="/logo.png"
                  alt="Perfect Mason Construction"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-contain ring-2 ring-amber-400/60 shadow-xl bg-white p-1 shrink-0"
                />
                <div>
                  <h1 className="font-barlow text-xl sm:text-2xl font-black tracking-[0.18em] text-white uppercase leading-none">
                    PERFECT MASON
                  </h1>
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] text-amber-300 uppercase block mt-1.5 font-bold">
                    BUILD IT RIGHT
                  </span>
                </div>
              </div>

              {/* Eyebrow & Editorial Headline */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                    PROJECT CONSULTATION
                  </span>
                </div>
                <h2 className="font-editorial text-4xl sm:text-5xl lg:text-[3.4rem] font-normal text-white leading-[1.04] tracking-tight">
                  Your Vision <br />
                  <span className="italic font-light">Our Expertise</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm text-slate-300 font-light leading-relaxed mt-3 max-w-md">
                  Share your project idea and our team will help you plan, design and execute with clarity, quality and confidence.
                </p>
              </div>

              {/* Three Vertically Aligned Consultation Stages */}
              <div className="hidden lg:flex flex-col space-y-4 pt-3">
                
                {/* Stage 01 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full border border-[#D4AF37]/60 flex items-center justify-center shrink-0 bg-black/20 text-[#D4AF37]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white tracking-wider">01</span>
                      <span className="font-barlow text-xs font-bold uppercase tracking-wider text-amber-100">CONSULT</span>
                    </div>
                    <p className="font-sans text-xs text-slate-300 font-light mt-0.5">
                      Tell us what you want to build or transform.
                    </p>
                  </div>
                </div>

                {/* Stage 02 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full border border-[#D4AF37]/60 flex items-center justify-center shrink-0 bg-black/20 text-[#D4AF37]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white tracking-wider">02</span>
                      <span className="font-barlow text-xs font-bold uppercase tracking-wider text-amber-100">PLAN</span>
                    </div>
                    <p className="font-sans text-xs text-slate-300 font-light mt-0.5">
                      We study your requirements and provide the right approach.
                    </p>
                  </div>
                </div>

                {/* Stage 03 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full border border-[#D4AF37]/60 flex items-center justify-center shrink-0 bg-black/20 text-[#D4AF37]">
                    <HardHat className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white tracking-wider">03</span>
                      <span className="font-barlow text-xs font-bold uppercase tracking-wider text-amber-100">EXECUTE</span>
                    </div>
                    <p className="font-sans text-xs text-slate-300 font-light mt-0.5">
                      Our team guides you through every step.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Section: Company Metrics & Translucent Portfolio Strip */}
            <div className="relative z-10 hidden lg:flex flex-col space-y-4 pt-4 border-t border-white/15">
              
              {/* 3 Metrics */}
              <div className="flex items-center justify-between text-white max-w-md">
                <div>
                  <div className="font-barlow text-xl sm:text-2xl font-bold tracking-tight">100+</div>
                  <div className="font-sans text-[10.5px] text-slate-300 uppercase tracking-wider font-light">Projects Completed</div>
                </div>
                <div className="w-[1px] h-8 bg-white/20" />
                <div>
                  <div className="font-barlow text-xl sm:text-2xl font-bold tracking-tight">10+</div>
                  <div className="font-sans text-[10.5px] text-slate-300 uppercase tracking-wider font-light">Years of Experience</div>
                </div>
                <div className="w-[1px] h-8 bg-white/20" />
                <div>
                  <div className="font-barlow text-xl sm:text-2xl font-bold tracking-tight text-amber-300">4.8★</div>
                  <div className="font-sans text-[10.5px] text-slate-300 uppercase tracking-wider font-light">Client Satisfaction</div>
                </div>
              </div>

              {/* Translucent Architectural Portfolio Strip */}
              <div className="p-3 rounded-2xl bg-black/45 backdrop-blur-md border border-white/10 flex items-center justify-between gap-4">
                <div className="max-w-[200px]">
                  <span className="text-[#D4AF37] font-editorial text-xl leading-none">“</span>
                  <p className="font-editorial italic text-xs text-slate-200 leading-snug">
                    Well planned spaces create better living, better work and a better tomorrow.
                  </p>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] block mt-1">
                    — PERFECT MASON
                  </span>
                </div>

                {/* 3 Small Thumbnails */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-14 h-12 rounded-lg overflow-hidden border border-white/20">
                    <img src={complexHero} alt="Commercial" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-14 h-12 rounded-lg overflow-hidden border border-white/20 relative group">
                    <img src={interiorHero} alt="Interior" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-white fill-white" />
                    </div>
                  </div>
                  <div className="w-14 h-12 rounded-lg overflow-hidden border border-white/20">
                    <img src={resVilla} alt="Villa" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* ===================================================================== */}
          {/* RIGHT ZONE (~52%): ELEVATED LUXURY WARM-WHITE CONSULTATION PANEL      */}
          {/* ===================================================================== */}
          <div className="relative lg:w-[52%] h-full bg-[#FAF9F6] lg:rounded-l-[36px] flex flex-col overflow-hidden text-slate-900 shadow-2xl">
            
            {/* Top Bar inside Right Panel */}
            <div className="px-6 sm:px-10 pt-6 pb-4 border-b border-slate-200/80 flex items-center justify-between shrink-0 bg-white/70 backdrop-blur-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-[1.5px] bg-[#D4AF37]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#071D38] font-bold">
                    PROJECT ENQUIRY
                  </span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight leading-tight">
                  Let's Bring Your Project to Life
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden sm:inline-block font-editorial italic text-base text-[#D4AF37] select-none font-medium">
                  Build Better Spaces
                </span>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-900 flex items-center justify-center text-slate-500 hover:text-slate-950 transition-colors bg-white shadow-2xs cursor-pointer"
                  aria-label="Close consultation modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!submitted ? (
              <div className="flex-1 flex overflow-hidden">
                
                {/* --------------------------------------------------------------- */}
                {/* SLIM VERTICAL PROGRESS RAIL (Architectural connecting line)     */}
                {/* --------------------------------------------------------------- */}
                <div className="hidden sm:flex flex-col items-center py-8 px-4 border-r border-slate-200/80 bg-white/40 shrink-0 w-24">
                  <div className="flex flex-col items-center justify-between h-full space-y-4">
                    {progressSteps.map((step, idx) => {
                      const isActive = step.id <= activeStepId;
                      const isCurrent = step.id === activeStepId;

                      return (
                        <div key={step.id} className="flex flex-col items-center text-center">
                          <button
                            type="button"
                            onClick={() => {
                              if (step.id === 5) {
                                setIsContactStep(true);
                                setActiveStepId(5);
                              } else {
                                setIsContactStep(false);
                                setActiveStepId(step.id);
                              }
                            }}
                            className="flex flex-col items-center text-center group cursor-pointer"
                          >
                            {/* Circle Indicator */}
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-all ${
                                isCurrent
                                  ? 'bg-[#071D38] text-white shadow-md ring-2 ring-[#D4AF37]'
                                  : isActive
                                  ? 'bg-[#071D38] text-white'
                                  : 'bg-slate-100 border border-slate-300 text-slate-400'
                              }`}
                            >
                              {step.id < activeStepId ? (
                                <Check className="w-3.5 h-3.5 text-white" />
                              ) : (
                                `0${step.id}`
                              )}
                            </div>

                            {/* Step Label */}
                            <span
                              className={`font-sans text-[10px] leading-tight mt-1.5 font-medium max-w-[68px] ${
                                isCurrent ? 'text-[#071D38] font-bold' : 'text-slate-400'
                              }`}
                            >
                              {step.label}
                            </span>
                          </button>

                          {/* Connecting Line */}
                          {idx < progressSteps.length - 1 && (
                            <div className="w-[1px] h-8 bg-slate-200 my-1 border-dashed border-l" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* --------------------------------------------------------------- */}
                {/* MAIN SCROLLABLE FORM BODY                                       */}
                {/* --------------------------------------------------------------- */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 relative">
                  
                  {/* Faint Architectural Villa Elevation Watermark in Bottom-Right */}
                  <div className="absolute right-2 bottom-2 pointer-events-none opacity-20 hidden md:block">
                    <svg width="220" height="150" viewBox="0 0 220 150" fill="none" stroke="#071D38" strokeWidth="1">
                      <rect x="20" y="50" width="180" height="90" />
                      <line x1="10" y1="50" x2="210" y2="50" />
                      <rect x="35" y="65" width="45" height="50" />
                      <rect x="100" y="65" width="85" height="50" />
                      <line x1="20" y1="20" x2="160" y2="20" />
                      <line x1="160" y1="20" x2="160" y2="50" />
                      <line x1="30" y1="20" x2="30" y2="50" />
                      <line x1="0" y1="140" x2="220" y2="140" />
                    </svg>
                  </div>

                  {!isContactStep ? (
                    <>
                      {/* ========================================================= */}
                      {/* SECTION 01: WHAT WOULD YOU LIKE TO BUILD?                 */}
                      {/* ========================================================= */}
                      <div className="space-y-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-mono text-xs font-bold text-slate-800">
                            01
                          </div>
                          <div>
                            <h4 className="font-sans font-bold text-slate-900 text-sm sm:text-base">
                              What would you like to build?
                            </h4>
                            <p className="font-sans text-xs text-slate-500 font-normal">
                              Choose the option that best matches your project. You can share more details in the next step.
                            </p>
                          </div>
                        </div>

                        {/* 4 Large Image Cards in a single row on desktop */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {categoriesData.map((cat) => {
                            const isSelected = selectedCategory === cat.id;
                            const Icon = cat.icon;

                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => handleCategorySelect(cat.id)}
                                className={`rounded-xl border text-left overflow-hidden transition-all duration-200 cursor-pointer flex flex-col bg-white ${
                                  isSelected
                                    ? 'border-[#071D38] ring-2 ring-[#071D38] shadow-md -translate-y-0.5'
                                    : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                                }`}
                              >
                                {/* Top Photo */}
                                <div className="relative h-22 sm:h-26 w-full overflow-hidden bg-slate-900">
                                  <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover"
                                  />
                                  {/* Selection Check Circle badge */}
                                  {isSelected && (
                                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#071D38] border border-white flex items-center justify-center text-white shadow-xs">
                                      <Check className="w-3 h-3 text-[#E6C665]" />
                                    </div>
                                  )}
                                </div>

                                {/* Content */}
                                <div className="p-3 flex-1 flex flex-col justify-between space-y-1">
                                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#071D38]' : 'text-slate-500'}`} />
                                  <h5 className="font-sans text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                                    {cat.title}
                                  </h5>
                                  <p className="font-sans text-[11px] text-slate-500 leading-tight line-clamp-2">
                                    {cat.desc}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* ========================================================= */}
                      {/* SECTION 02: TELL US ABOUT YOUR PROJECT                    */}
                      {/* ========================================================= */}
                      <div className="space-y-4 pt-4 border-t border-slate-200/80">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-mono text-xs font-bold text-slate-800">
                            02
                          </div>
                          <div>
                            <h4 className="font-sans font-bold text-slate-900 text-sm sm:text-base">
                              Tell us about your project
                            </h4>
                            <p className="font-sans text-xs text-slate-500 font-normal">
                              Help us understand your requirements. You can select multiple options.
                            </p>
                          </div>
                        </div>

                        {/* Project Subtype Pills */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700 font-sans">
                            Project Type
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {activeCategoryObj.subtypes.map((sub) => {
                              const isSelected = selectedSubtype === sub;
                              return (
                                <button
                                  key={sub}
                                  type="button"
                                  onClick={() => setSelectedSubtype(sub)}
                                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer border ${
                                    isSelected
                                      ? 'bg-[#071D38] text-white border-[#071D38] font-bold shadow-2xs'
                                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                                  }`}
                                >
                                  {sub}
                                </button>
                              );
                            })}
                          </div>

                          {selectedSubtype === 'Other' && (
                            <input
                              type="text"
                              value={customSubtype}
                              onChange={(e) => setCustomSubtype(e.target.value)}
                              placeholder="Please specify your project type..."
                              className="w-full mt-2 h-9 px-3 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#071D38]"
                            />
                          )}
                        </div>

                        {/* Area Selector Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="space-y-1">
                            <label className="block text-xs font-bold text-slate-700 font-sans">
                              Approx. Built-up Area <span className="font-normal text-slate-400">(Optional)</span>
                            </label>
                            <select
                              value={builtUpArea}
                              onChange={(e) => setBuiltUpArea(e.target.value)}
                              aria-label="Approx. Built-up Area"
                              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#071D38]"
                            >
                              {areaOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-xs font-bold text-slate-700 font-sans">
                              Or enter exact area
                            </label>
                            <div className="flex items-center">
                              <input
                                type="text"
                                value={exactArea}
                                onChange={(e) => setExactArea(e.target.value)}
                                placeholder="e.g. 3500"
                                className="w-full h-10 px-3 rounded-l-lg border border-r-0 border-slate-300 text-xs bg-white focus:outline-none focus:border-[#071D38]"
                              />
                              <div className="h-10 px-3 rounded-r-lg border border-slate-300 bg-slate-100 text-slate-500 font-mono text-xs flex items-center justify-center shrink-0">
                                Sq.Ft
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Location & Site Status Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="block text-xs font-bold text-slate-700 font-sans">
                              Project Location
                            </label>
                            <select
                              value={projectLocationState}
                              onChange={(e) => setProjectLocationState(e.target.value)}
                              aria-label="Project Location"
                              className="w-full h-10 px-2.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#071D38]"
                            >
                              {locationOptions.map((loc) => (
                                <option key={loc} value={loc}>
                                  {loc}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-xs font-bold text-slate-700 font-sans">
                              Area / Locality
                            </label>
                            <input
                              type="text"
                              value={locality}
                              onChange={(e) => setLocality(e.target.value)}
                              placeholder="e.g. Bengaluru, Whitefield"
                              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#071D38]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-xs font-bold text-slate-700 font-sans">
                              Site Status
                            </label>
                            <select
                              value={siteStatus}
                              onChange={(e) => setSiteStatus(e.target.value)}
                              aria-label="Site Status"
                              className="w-full h-10 px-2.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#071D38]"
                            >
                              {siteStatusOptions.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* ========================================================= */}
                      {/* EXPANDABLE SECTION: ADDITIONAL REQUIREMENTS (OPTIONAL)    */}
                      {/* ========================================================= */}
                      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => setIsAdditionalExpanded(!isAdditionalExpanded)}
                          className="w-full p-3.5 bg-slate-50/80 hover:bg-slate-100 flex items-center justify-between text-left transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#071D38] flex items-center justify-center text-white shrink-0">
                              <Plus className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="font-sans text-xs font-bold text-slate-900">
                                Additional Requirements (Optional)
                              </div>
                              <p className="font-sans text-[11px] text-slate-500 font-normal">
                                Services, budget, timeline and more.
                              </p>
                            </div>
                          </div>
                          {isAdditionalExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          )}
                        </button>

                        {isAdditionalExpanded && (
                          <div className="p-4 bg-white border-t border-slate-200 space-y-4">
                            {/* Services Checkboxes */}
                            <div className="space-y-1.5">
                              <label className="block text-xs font-bold text-slate-800 font-sans">
                                Services Required:
                              </label>
                              <div className="flex flex-wrap gap-1.5">
                                {serviceOptions.map((srv) => {
                                  const isSelected = selectedServices.includes(srv);
                                  return (
                                    <button
                                      key={srv}
                                      type="button"
                                      onClick={() => toggleService(srv)}
                                      className={`px-2.5 py-1 rounded text-xs font-sans transition-all cursor-pointer border flex items-center gap-1.5 ${
                                        isSelected
                                          ? 'bg-[#071D38] text-white border-[#071D38] font-medium'
                                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                                      }`}
                                    >
                                      {isSelected && <Check className="w-3 h-3 text-[#E6C665]" />}
                                      <span>{srv}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Budget & Timeline Selectors */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                              <div className="space-y-1">
                                <label className="block text-xs font-bold text-slate-800 font-sans">
                                  Estimated Budget
                                </label>
                                <select
                                  value={budget}
                                  onChange={(e) => setBudget(e.target.value)}
                                  aria-label="Estimated Budget"
                                  className="w-full h-9 px-2.5 rounded border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#071D38]"
                                >
                                  {budgetRanges.map((b) => (
                                    <option key={b} value={b}>
                                      {b}
                                    </option>
                                  ))}
                                </select>
                                <span className="text-[10px] text-slate-400 font-sans block">
                                  Indicative preliminary estimate, not a quotation.
                                </span>
                              </div>

                              <div className="space-y-1">
                                <label className="block text-xs font-bold text-slate-800 font-sans">
                                  Expected Timeline
                                </label>
                                <select
                                  value={timeline}
                                  onChange={(e) => setTimeline(e.target.value)}
                                  aria-label="Expected Timeline"
                                  className="w-full h-9 px-2.5 rounded border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#071D38]"
                                >
                                  {timelineRanges.map((t) => (
                                    <option key={t} value={t}>
                                      {t}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    /* ========================================================= */
                    /* STEP 05: CONTACT DETAILS (Smooth Transition)              */
                    /* ========================================================= */
                    <div className="space-y-5 animate-in fade-in duration-300">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-5 h-[1.5px] bg-[#D4AF37]" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#071D38] font-bold">
                            STEP 05 OF 05
                          </span>
                        </div>
                        <h4 className="font-editorial text-2xl sm:text-3xl font-semibold text-slate-950">
                          Your Contact Information
                        </h4>
                        <p className="font-sans text-xs text-slate-500 mt-1">
                          Share your details so our Principal Project Engineer can transmit your feasibility appraisal.
                        </p>
                      </div>

                      {/* Brief Selection Summary Card */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Selected Project:</span>
                          <span className="font-bold text-[#071D38]">
                            {activeCategoryObj.title} ({selectedSubtype})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Location & Area:</span>
                          <span className="font-semibold text-slate-800">
                            {locality ? `${locality}, ` : ''}{projectLocationState} • {exactArea ? `${exactArea} Sq.Ft` : builtUpArea}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-bold text-slate-800 font-sans mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                              if (errors.fullName) setErrors({ ...errors, fullName: '' });
                            }}
                            placeholder="e.g. Alexander Wright"
                            className={`w-full h-10 px-3 rounded-lg border text-xs bg-white text-slate-900 focus:outline-none focus:border-[#071D38] ${
                              errors.fullName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'
                            }`}
                          />
                          {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                        </div>

                        {/* Phone Number */}
                        <div>
                          <label className="block text-xs font-bold text-slate-800 font-sans mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (errors.phone) setErrors({ ...errors, phone: '' });
                            }}
                            placeholder="+91 98765 43210"
                            className={`w-full h-10 px-3 rounded-lg border text-xs bg-white text-slate-900 focus:outline-none focus:border-[#071D38] ${
                              errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'
                            }`}
                          />
                          {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 font-sans mb-1">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: '' });
                          }}
                          placeholder="alex@enterprise.com"
                          className={`w-full h-10 px-3 rounded-lg border text-xs bg-white text-slate-900 focus:outline-none focus:border-[#071D38] ${
                            errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'
                          }`}
                        />
                        {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                      </div>

                      {/* Preferred Contact Mode */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 font-sans mb-1.5">
                          Preferred Contact Method
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['Phone', 'WhatsApp', 'Email'] as const).map((mode) => (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => setPreferredContact(mode)}
                              className={`h-9 px-3 rounded-lg text-xs font-sans transition-all text-center border cursor-pointer flex items-center justify-center gap-1.5 ${
                                preferredContact === mode
                                  ? 'bg-[#071D38] text-white border-[#071D38] font-bold shadow-2xs'
                                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              {mode === 'Phone' ? 'Phone Call' : mode}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 font-sans mb-1">
                          Anything else you'd like us to know? (Optional)
                        </label>
                        <textarea
                          rows={2}
                          value={clientMessage}
                          onChange={(e) => setClientMessage(e.target.value)}
                          placeholder="Tell us about your requirements, preferences or questions…"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white text-slate-900 focus:outline-none focus:border-[#071D38]"
                        />
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ) : (
              /* ================================================================= */
              /* SUCCESS STATE (Identical corporate confirmation)                 */
              /* ================================================================= */
              <div className="p-8 sm:p-14 text-center space-y-6 bg-white overflow-y-auto my-auto">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                  <CheckCircle2 className="w-9 h-9 text-emerald-600" />
                </div>

                <div className="space-y-2 max-w-lg mx-auto">
                  <span className="font-mono text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    CONSULTATION REQUEST CONFIRMED
                  </span>
                  <h3 className="font-editorial text-3xl sm:text-4xl text-[#071D38] font-semibold mt-1">
                    Thank You, {fullName || 'Valued Client'}
                  </h3>
                  <p className="text-sm text-slate-600 font-sans leading-relaxed">
                    Perfect Mason has received your project details for{' '}
                    <span className="font-semibold text-slate-900">
                      {activeCategoryObj.title} ({selectedSubtype})
                    </span>
                    . Our Senior Project Engineer will review your requirements and get in touch within 24 hours via{' '}
                    <span className="font-bold text-[#071D38]">{preferredContact}</span>.
                  </p>
                </div>

                {/* Instant Action Channels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-2">
                  <a
                    href={`https://wa.me/919886329424?text=${encodeURIComponent(
                      `Hello Perfect Mason team, I just submitted an enquiry for ${activeCategoryObj.title} (${selectedSubtype}) in ${projectLocationState}. My name is ${fullName}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 rounded-lg border border-slate-300 hover:border-slate-400 bg-slate-50 text-slate-900 text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <a
                    href="tel:+919886329424"
                    className="h-11 rounded-lg border border-slate-300 hover:border-slate-400 bg-slate-50 text-slate-900 text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-[#071D38]" />
                    <span>Call Direct: +91 98863 29424</span>
                  </a>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="h-10 px-8 rounded-lg bg-[#071D38] text-white hover:bg-slate-900 font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
                  >
                    Return to Website
                  </button>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* BOTTOM ACTION BAR (Matching reference: Back & Continue buttons)    */}
            {/* ----------------------------------------------------------------- */}
            {!submitted && (
              <div className="px-6 sm:px-10 py-4 border-t border-slate-200/80 bg-white flex items-center justify-between gap-4 shrink-0">
                <button
                  type="button"
                  onClick={handleBack}
                  className="h-11 px-5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-sans text-xs font-bold uppercase transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={isSubmitting}
                  className="h-11 px-8 rounded-lg bg-[#071D38] hover:bg-[#0C2340] active:scale-[0.99] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 group cursor-pointer"
                >
                  <span>
                    {isContactStep
                      ? isSubmitting
                        ? 'Sending Enquiry...'
                        : 'Send Project Enquiry'
                      : 'Continue to Next Step'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#E6C665] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
