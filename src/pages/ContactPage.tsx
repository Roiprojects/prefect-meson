import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Building2,
  Compass,
  Layers,
  Award,
  Instagram,
  Facebook,
  Linkedin,
  Calendar,
  X,
  User,
} from 'lucide-react';
import { contactData } from '../data/contactData';
import { ContactMap } from '../components/contact/ContactMap';
import { useData } from '../context/DataContext';
import commitmentImg from '../assets/contact_commitment.jpg';

interface ContactPageProps {
  onOpenQuoteModal?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [searchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const { addEnquiry, pageContents, settings } = useData();

  const contactHero = pageContents?.contact?.hero || {};
  const contactChannels = pageContents?.contact?.channels || {};
  const phoneDisplay = contactChannels.phone || settings.phone || contactData.contactInfo.phone.value;
  const whatsappDisplay = contactChannels.whatsapp || settings.whatsappNumber || contactData.contactInfo.whatsapp.value;
  const emailDisplay = contactChannels.email || settings.email || contactData.contactInfo.email.value;
  const addressDisplay = contactChannels.address || settings.address || contactData.contactInfo.office.value;
  const hoursDisplay = contactChannels.workingHours || settings.workingHours || 'Mon – Sat: 9:00 AM – 7:00 PM';
  const heroHeading = contactHero.heading || "Let's build something meaningful.";
  const heroIntro = contactHero.intro || contactData.heroIntro;
  const sectionLabel = contactHero.sectionLabel || contactData.sectionLabel;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectType: 'Residential Construction',
    location: '',
    requirement: '',
    estimatedBudget: '₹1 Crore – ₹3 Crores',
    projectStage: 'Planning',
    plotSize: '',
    timeline: '1–3 months',
    preferredContact: 'Phone' as 'Phone' | 'WhatsApp' | 'Email',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isConveyorPaused, setIsConveyorPaused] = useState<boolean>(false);

  // Studio Visit Booking Modal State
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false);
  const [studioBookingData, setStudioBookingData] = useState({
    name: '',
    phone: '',
    date: '',
    timeSlot: '10:00 AM – 12:00 PM',
    projectType: 'Residential Construction',
    notes: '',
  });
  const [studioBookingSubmitted, setStudioBookingSubmitted] = useState(false);
  const [studioBookingError, setStudioBookingError] = useState('');

  const handleStudioBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studioBookingData.name.trim()) {
      setStudioBookingError('Please enter your full name.');
      return;
    }
    if (!studioBookingData.phone.trim() || studioBookingData.phone.trim().length < 8) {
      setStudioBookingError('Please enter a valid phone or WhatsApp number.');
      return;
    }

    setStudioBookingError('');

    try {
      addEnquiry({
        fullName: studioBookingData.name,
        phone: studioBookingData.phone,
        email: 'studio-visit@perfectmason.com',
        projectType: studioBookingData.projectType,
        location: 'Bangalore Studio Visit',
        requirement: `Studio Visit on ${studioBookingData.date || 'Earliest Available'} (${studioBookingData.timeSlot})`,
        preferredContact: 'WhatsApp',
        message: `Studio Consultation: ${studioBookingData.notes || 'In-person meeting at AECS Layout studio'}`,
        timeline: 'Scheduled Visit',
      });
    } catch {
      // ignore
    }

    const formattedMsg = `*PERFECT MASON — STUDIO VISIT CONSULTATION*

👤 *Name:* ${studioBookingData.name}
📱 *Phone / WhatsApp:* ${studioBookingData.phone}
📅 *Preferred Date:* ${studioBookingData.date || 'Earliest available date'}
⏰ *Time Slot:* ${studioBookingData.timeSlot}
🏗️ *Project Interest:* ${studioBookingData.projectType}
${studioBookingData.notes ? `📝 *Notes:* ${studioBookingData.notes}\n` : ''}
📍 *Meeting Venue:* Perfect Mason Studio, No: 2041, 18th Cross, AECS Layout, A Block, Hosur Main Road, Bangalore - 560068

_Looking forward to meeting your senior architectural & engineering team._`;

    const whatsappUrl = `https://wa.me/919886329424?text=${encodeURIComponent(formattedMsg)}`;
    window.open(whatsappUrl, '_blank');
    setStudioBookingSubmitted(true);
  };

  // Auto-scroll on ?type=quote
  useEffect(() => {
    const queryType = searchParams.get('type');
    if (queryType === 'quote') {
      const el = document.getElementById('consultation-intake-card');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [searchParams]);

  // Calculate form completion step
  const calculateActiveStep = () => {
    if (!formData.projectType || !formData.projectStage) return 1;
    if (!formData.location || !formData.plotSize) return 2;
    if (!formData.message) return 3;
    return 4;
  };

  const activeStep = calculateActiveStep();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^[0-9+ \-()]{7,16}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about your project requirements';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const fieldEl = document.querySelector(`[name="${firstError}"]`);
        fieldEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    // Save to global dynamic DataContext / Admin enquiry pool
    addEnquiry({
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      projectType: formData.projectType,
      location: formData.location.trim(),
      requirement: formData.requirement.trim() || `[Stage: ${formData.projectStage}] [Timeline: ${formData.timeline}] [Plot: ${formData.plotSize || 'N/A'}] [Budget: ${formData.estimatedBudget}]`,
      preferredContact: formData.preferredContact,
      message: formData.message.trim(),
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const intakeCard = document.getElementById('consultation-intake-card');
      intakeCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      projectType: 'Residential Construction',
      location: '',
      requirement: '',
      estimatedBudget: '₹1 Crore – ₹3 Crores',
      projectStage: 'Planning',
      plotSize: '',
      timeline: '1–3 months',
      preferredContact: 'Phone',
      message: '',
    });
    setErrors({});
  };

  return (
    <div className="w-full bg-white text-slate-900 pt-20 sm:pt-24 select-none overflow-hidden min-h-screen">
      {/* 1. EDITORIAL HERO / INTRO HEADER */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left: Section Label & Large Editorial Heading */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-4 ring-slate-200/80" />
                <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950 animate-ping" />
              </div>
              <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.25em] text-slate-800 font-bold flex items-center gap-2">
                {sectionLabel}
                <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-bold text-slate-950 uppercase tracking-tight leading-[1.06]"
            >
              {typeof heroHeading === 'string' && heroHeading.includes('\n') ? (
                heroHeading.split('\n').map((line: string, idx: number) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <br />}
                    <span className={idx > 0 ? "text-slate-950" : ""}>{line}</span>
                  </React.Fragment>
                ))
              ) : (
                heroHeading
              )}
            </motion.h1>
          </div>

          {/* Right: Taglines & Supporting Intro */}
          <div className="lg:col-span-5 lg:pb-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="flex flex-wrap items-center gap-2 font-mono text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest"
            >
              <span className="text-slate-950">{contactData.taglines.clarity}</span>
              <span>•</span>
              <span className="text-slate-800">{contactData.taglines.confidence}</span>
              <span>•</span>
              <span className="text-slate-900">{contactData.taglines.precision}</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed font-normal"
            >
              {heroIntro}
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONSULTATION DESK: ASYMMETRIC EDITORIAL LAYOUT */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT PANEL: ARCHITECTURAL VISUAL + CONSULTATION PROCESS + DIRECT CONTACT */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 1. Integrated Architectural Visual & Editorial Commitment Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-[32px] sm:rounded-[40px] bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xl shadow-slate-900/5 space-y-5 overflow-hidden"
            >
              {/* Top: Cinematic Architectural Image Viewport with Floating Badges */}
              <div className="relative w-full rounded-[24px] sm:rounded-[30px] overflow-hidden aspect-[16/11] bg-slate-900 shadow-inner">
                <img
                  src={commitmentImg}
                  alt="Perfect Mason Project Consultation Architecture"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/30 pointer-events-none" />

                {/* Floating Header Badges on Image */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-slate-1000 animate-pulse" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                      PROJECT CONSULTATION
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xs font-mono font-bold">
                    PM
                  </div>
                </div>

                {/* Bottom Image Tag */}
                <div className="absolute bottom-3.5 left-4 z-10 flex items-center gap-2 font-mono text-[10px] text-white/90 uppercase tracking-widest font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  <span>STUDIO ARCHITECTURAL EXCELLENCE</span>
                </div>
              </div>

              {/* Bottom: Crisp Editorial Commitment Body */}
              <div className="px-3 sm:px-4 pb-2 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-950 uppercase tracking-[0.22em]">
                      PERFECT MASON PROMISE
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 font-semibold uppercase">
                    EST. 2012
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 uppercase tracking-tight leading-tight">
                  {contactData.commitment.heading}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed font-normal">
                  {contactData.commitment.description}
                </p>

                {/* Value Pillars / Badges */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {['Clear Communication', 'Milestone Planning', 'Quality Craft', 'Flawless Finish'].map((pillar, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-medium text-slate-700 font-sans"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 2. Premium 4-Step Consultation Information Rail */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 sm:p-9 rounded-[32px] sm:rounded-[36px] bg-[#F8FAFC] border border-slate-200/80 shadow-xs space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/70">
                <span className="font-mono text-[11px] font-bold text-slate-950 uppercase tracking-[0.2em]">
                  CONSULTATION FRAMEWORK
                </span>
                <span className="font-mono text-[11px] text-slate-400 font-medium">
                  4 STAGES
                </span>
              </div>

              <div className="space-y-6">
                {contactData.consultationSteps.map((step) => (
                  <div key={step.number} className="flex items-start gap-4 group">
                    <span className="font-mono text-xs font-bold text-slate-950 bg-white border border-slate-200 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs group-hover:border-royal-400 group-hover:bg-slate-100 transition-colors">
                      {step.number}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-display text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide group-hover:text-slate-950 transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-slate-500 font-sans leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3. Compact Direct Contact Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-7 sm:p-8 rounded-[32px] bg-white border border-slate-200 shadow-sm space-y-5"
            >
              <span className="font-mono text-[11px] font-bold text-slate-800 uppercase tracking-[0.2em] block">
                DIRECT CONTACT DESK
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                {/* Call */}
                <a
                  href={`tel:${phoneDisplay.replace(/[^+\d]/g, '')}`}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 border border-slate-100 hover:border-slate-300 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-950 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase font-bold text-slate-400 block">
                      CALL US
                    </span>
                    <span className="font-bold text-slate-900 group-hover:text-slate-950">
                      {phoneDisplay}
                    </span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${whatsappDisplay.replace(/[^+\d]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-100 hover:border-emerald-200 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase font-bold text-slate-400 block">
                      WHATSAPP
                    </span>
                    <span className="font-bold text-slate-900 group-hover:text-emerald-600">
                      {whatsappDisplay}
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${emailDisplay}`}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 border border-slate-100 hover:border-slate-300 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-950 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-mono text-[9px] uppercase font-bold text-slate-400 block">
                      EMAIL
                    </span>
                    <span className="font-bold text-slate-900 truncate block group-hover:text-slate-950">
                      {emailDisplay}
                    </span>
                  </div>
                </a>

                {/* Working Hours */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-slate-900 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase font-bold text-slate-400 block">
                      WORKING HOURS
                    </span>
                    <span className="font-bold text-slate-900">
                      {hoursDisplay}
                    </span>
                  </div>
                </div>
              </div>

              {/* Office Address */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase font-bold text-slate-400 block">
                    STUDIO OFFICE
                  </span>
                  <span className="text-xs text-slate-800 font-medium leading-relaxed">
                    {addressDisplay}
                  </span>
                </div>
              </div>

              {/* 11.1 Social Media Links */}
              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  SOCIAL CONNECT
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/919886329424"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 border border-slate-200 flex items-center justify-center transition-colors"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-950 border border-slate-200 flex items-center justify-center transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-pink-50 text-slate-600 hover:text-pink-600 border border-slate-200 flex items-center justify-center transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-950 border border-slate-200 flex items-center justify-center transition-colors"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* 4. Architectural Quality Assurance & Private Studio Walkthrough Booking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-7 sm:p-8 rounded-[32px] bg-slate-900 text-white shadow-xl space-y-6 relative overflow-hidden border border-slate-800"
            >
              {/* Decorative Glow Elements */}
              <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-slate-950/20 blur-3xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-950/10 blur-2xl pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-400" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400">
                    STUDIO ASSURANCE
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 font-semibold uppercase">
                  PERFECT MASON STANDARDS
                </span>
              </div>

              {/* Guarantees List */}
              <div className="relative z-10 space-y-3.5 text-xs font-sans">
                {[
                  {
                    title: '100% On-Time Project Handover',
                    desc: 'Rigorous milestone tracking with schedule-backed delivery commitments.',
                  },
                  {
                    title: 'Transparent Itemized BOQ Billing',
                    desc: 'Complete cost breakdown with zero hidden fees or mid-project price escalations.',
                  },
                  {
                    title: '5-Year Structural Warranty',
                    desc: 'Enduring structural protection & post-handover preventative maintenance care.',
                  },
                  {
                    title: 'Senior Site Supervision Daily',
                    desc: 'Dedicated architectural oversight and ISO grade civil engineering standards.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-1000/20 text-orange-400 border border-royal-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-white uppercase text-[12px] tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-slate-300 font-light text-[11px] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* In-Person Studio Consultation Booking */}
              <div className="relative z-10 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="space-y-0.5 text-left w-full sm:w-auto">
                  <span className="font-mono text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                    PREFER IN-PERSON MEETING?
                  </span>
                  <p className="text-xs font-semibold text-white">
                    Visit our Design Studio
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsStudioModalOpen(true);
                    setStudioBookingSubmitted(false);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-950 hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 shrink-0 hover:scale-[1.02] active:scale-[0.98] border border-slate-800"
                >
                  <span>BOOK STUDIO VISIT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT PANEL: ADVANCED PROJECT INTAKE FORM + CONTINUOUS ANGLED SLIDING TRACK */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-8">
            
            <motion.div
              id="consultation-intake-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-8 sm:p-12 rounded-[32px] sm:rounded-[40px] border border-slate-200/90 shadow-lg shadow-slate-900/5 space-y-8"
            >
              
              {/* Form Header */}
              <div className="space-y-3 pb-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-slate-950 uppercase tracking-[0.2em]">
                    PROJECT INTAKE
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-royal-100 text-[11px] font-bold text-slate-900">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    CONFIDENTIAL
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-950 uppercase tracking-tight">
                  Start Your Project
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                  Tell us about your construction or interior requirement and our senior team will help you define the next step.
                </p>

                {/* 4-Step Progress Indicator */}
                <div className="pt-3">
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { step: 1, label: 'PROJECT' },
                      { step: 2, label: 'LOCATION' },
                      { step: 3, label: 'REQUIREMENT' },
                      { step: 4, label: 'CONTACT' },
                    ].map((item) => (
                      <div key={item.step} className="space-y-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            activeStep >= item.step
                              ? 'bg-slate-950'
                              : 'bg-slate-200'
                          }`}
                        />
                        <span
                          className={`font-mono text-[10px] sm:text-[11px] font-bold tracking-wider block text-center truncate ${
                            activeStep >= item.step
                              ? 'text-slate-950'
                              : 'text-slate-400'
                          }`}
                        >
                          0{item.step} {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="py-12 sm:py-16 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 shadow-inner">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 uppercase tracking-tight">
                        Consultation Request Received
                      </h3>
                      <p className="font-mono text-xs text-slate-950 font-bold uppercase tracking-wider">
                        LOGGED IN PERFECT MASON PROJECT QUEUE
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 font-sans max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Our senior architectural team is reviewing your project details and will connect via{' '}
                      <strong className="text-slate-900">{formData.preferredContact}</strong> within 24 hours.
                    </p>

                    <div className="pt-4 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-8 py-3.5 rounded-full bg-slate-950 hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
                      >
                        SUBMIT ANOTHER PROJECT
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-8"
                  >
                    
                    {/* ======================================================== */}
                    {/* GROUP 01: PROJECT DETAILS */}
                    {/* ======================================================== */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                        <Building2 className="w-4 h-4 text-slate-950" />
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-800">
                          GROUP 01 • PROJECT DETAILS
                        </span>
                      </div>

                      {/* Project Type Selection */}
                      <div>
                        <label className="block text-xs font-sans font-semibold text-slate-700 mb-1.5">
                          PROJECT TYPE <span className="text-slate-900">*</span>
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/90 text-sm focus:outline-none focus:bg-white focus:border-slate-950 focus:ring-4 focus:ring-royal-50 transition-all text-slate-900"
                        >
                          {contactData.projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Project Stage Selection */}
                      <div>
                        <label className="block text-xs font-sans font-semibold text-slate-700 mb-2">
                          PROJECT STAGE
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {contactData.projectStages.map((stage) => (
                            <button
                              key={stage}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({ ...prev, projectStage: stage }))
                              }
                              className={`py-2 px-3 rounded-xl text-xs font-sans font-medium transition-all text-center border ${
                                formData.projectStage === stage
                                  ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                                  : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
                              }`}
                            >
                              {stage}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Project Location & Requirement */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-sans font-semibold text-slate-700 mb-1.5">
                            LOCATION
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. HSR Layout, Bengaluru"
                            className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/90 text-sm focus:outline-none focus:bg-white focus:border-slate-950 focus:ring-4 focus:ring-royal-50 transition-all text-slate-900 placeholder:text-slate-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-sans font-semibold text-slate-700 mb-1.5">
                            REQUIREMENT
                          </label>
                          <input
                            type="text"
                            name="requirement"
                            value={formData.requirement}
                            onChange={handleChange}
                            placeholder="e.g. Full Construction / Interior Fitout"
                            className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/90 text-sm focus:outline-none focus:bg-white focus:border-slate-950 focus:ring-4 focus:ring-royal-50 transition-all text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      {/* Estimated Budget */}
                      <div>
                        <label className="block text-xs font-sans font-semibold text-slate-700 mb-1.5">
                          ESTIMATED BUDGET
                        </label>
                        <select
                          name="estimatedBudget"
                          value={formData.estimatedBudget}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/90 text-sm focus:outline-none focus:bg-white focus:border-slate-950 focus:ring-4 focus:ring-royal-50 transition-all text-slate-900"
                        >
                          {contactData.budgetRanges.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* ======================================================== */}
                    {/* GROUP 02: PROJECT REQUIREMENT & TIMELINE */}
                    {/* ======================================================== */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                        <Layers className="w-4 h-4 text-slate-950" />
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-800">
                          GROUP 02 • PROJECT REQUIREMENT & TIMELINE
                        </span>
                      </div>

                      {/* Plot Size & Timeline */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-sans font-semibold text-slate-700 mb-1.5">
                            PLOT SIZE / BUILT-UP AREA
                          </label>
                          <input
                            type="text"
                            name="plotSize"
                            value={formData.plotSize}
                            onChange={handleChange}
                            placeholder="e.g. 2,400 sq.ft / 40x60"
                            className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/90 text-sm focus:outline-none focus:bg-white focus:border-slate-950 focus:ring-4 focus:ring-royal-50 transition-all text-slate-900 placeholder:text-slate-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-sans font-semibold text-slate-700 mb-1.5">
                            PROJECT TIMELINE (START)
                          </label>
                          <select
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/90 text-sm focus:outline-none focus:bg-white focus:border-slate-950 focus:ring-4 focus:ring-royal-50 transition-all text-slate-900"
                          >
                            {contactData.timelineOptions.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Requirement / Message */}
                      <div>
                        <label className="block text-xs font-sans font-semibold text-slate-700 mb-1.5">
                          REQUIREMENT / MESSAGE <span className="text-slate-900">*</span>
                        </label>
                        <textarea
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Describe your architectural vision, floor plans, number of levels, materials, or specific site constraints..."
                          className={`w-full px-4 py-3.5 rounded-2xl bg-slate-50/70 border text-sm focus:outline-none focus:bg-white focus:border-slate-950 focus:ring-4 focus:ring-royal-50 transition-all text-slate-900 placeholder:text-slate-400 ${
                            errors.message ? 'border-red-400 bg-red-50/20' : 'border-slate-200/90'
                          }`}
                        />
                        {errors.message && (
                          <span className="text-[11px] text-red-500 mt-1 block font-sans">
                            {errors.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* ======================================================== */}
                    {/* GROUP 03: CONTACT DETAILS */}
                    {/* ======================================================== */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                        <Compass className="w-4 h-4 text-slate-950" />
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-800">
                          GROUP 03 • CONTACT DETAILS
                        </span>
                      </div>

                      {/* Full Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-sans font-semibold text-slate-700 mb-1.5">
                            FULL NAME <span className="text-slate-900">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="e.g. Vikramaditya Sharma"
                            className={`w-full px-4 py-3.5 rounded-2xl bg-slate-50/70 border text-sm focus:outline-none focus:bg-white focus:border-slate-950 focus:ring-4 focus:ring-royal-50 transition-all text-slate-900 placeholder:text-slate-400 ${
                              errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-200/90'
                            }`}
                          />
                          {errors.fullName && (
                            <span className="text-[11px] text-red-500 mt-1 block font-sans">
                              {errors.fullName}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-sans font-semibold text-slate-700 mb-1.5">
                            PHONE NUMBER <span className="text-slate-900">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 00000"
                            className={`w-full px-4 py-3.5 rounded-2xl bg-slate-50/70 border text-sm focus:outline-none focus:bg-white focus:border-slate-950 focus:ring-4 focus:ring-royal-50 transition-all text-slate-900 placeholder:text-slate-400 ${
                              errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-200/90'
                            }`}
                          />
                          {errors.phone && (
                            <span className="text-[11px] text-red-500 mt-1 block font-sans">
                              {errors.phone}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Email & Preferred Contact */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-sans font-semibold text-slate-700 mb-1.5">
                            EMAIL ADDRESS <span className="text-slate-900">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@domain.com"
                            className={`w-full px-4 py-3.5 rounded-2xl bg-slate-50/70 border text-sm focus:outline-none focus:bg-white focus:border-slate-950 focus:ring-4 focus:ring-royal-50 transition-all text-slate-900 placeholder:text-slate-400 ${
                              errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200/90'
                            }`}
                          />
                          {errors.email && (
                            <span className="text-[11px] text-red-500 mt-1 block font-sans">
                              {errors.email}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-sans font-semibold text-slate-700 mb-1.5">
                            PREFERRED CONTACT METHOD
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {(['Phone', 'WhatsApp', 'Email'] as const).map((method) => (
                              <button
                                key={method}
                                type="button"
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    preferredContact: method,
                                  }))
                                }
                                className={`py-3 px-2 rounded-xl text-xs font-sans font-medium transition-all text-center border ${
                                  formData.preferredContact === method
                                    ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                                    : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
                                }`}
                              >
                                {method}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ======================================================== */}
                    {/* SUBMIT BUTTON & TRUST SIGNALS */}
                    {/* ======================================================== */}
                    <div className="pt-2 space-y-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full py-4 sm:py-5 px-6 rounded-full bg-slate-950 hover:bg-black active:bg-royal-800 text-white font-sans text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-royal-500/20 flex items-center justify-center gap-3 relative overflow-hidden"
                      >
                        {isSubmitting ? (
                          <span>TRANSMITTING CONSULTATION BRIEF...</span>
                        ) : (
                          <>
                            <span>START PROJECT CONSULTATION</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 text-orange-400" />
                          </>
                        )}
                      </button>

                      {/* Trust Information */}
                      <div className="text-center space-y-2 pt-2">
                        <p className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          YOUR INFORMATION IS USED ONLY TO UNDERSTAND AND RESPOND TO YOUR PROJECT REQUIREMENT.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 font-medium">
                          {contactData.trustPoints.map((tp) => (
                            <span key={tp} className="inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              {tp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </form>
                )}
              </AnimatePresence>

            </motion.div>

            {/* Response Expectation: CONTINUOUS SLIDING TRACK WITH 20-DEGREE ARCHITECTURAL PERSPECTIVE */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-7 sm:p-9 rounded-[32px] sm:rounded-[36px] bg-[#F8FAFC] border border-slate-200/80 shadow-xs space-y-5 overflow-hidden"
              onMouseEnter={() => setIsConveyorPaused(true)}
              onMouseLeave={() => setIsConveyorPaused(false)}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                  <span className="font-mono text-[11px] font-bold text-slate-950 uppercase tracking-[0.2em]">
                    RESPONSE EXPECTATION
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                    WHAT HAPPENS NEXT?
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-900 font-semibold">
                    CONTINUOUS TRACK
                  </span>
                </div>
              </div>

              {/* Continuous 20-degree Angle / Slanted Ribbon Carousel */}
              <div className="relative w-full py-4 overflow-hidden [perspective:1200px]">
                {/* Atmospheric Edge Fade Gradients */}
                <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent pointer-events-none z-10" />

                {/* Angled Ribbon Motion Track (slanted 3D plane) */}
                <div 
                  className="w-full transform -rotate-2 -skew-x-3 sm:-rotate-3 sm:-skew-x-6 hover:rotate-0 hover:skew-x-0 transition-transform duration-700 ease-out origin-center"
                >
                  <motion.div
                    className="flex gap-4 sm:gap-6 w-max cursor-grab active:cursor-grabbing"
                    animate={isConveyorPaused ? {} : { x: ['0%', '-50%'] }}
                    transition={{
                      x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 22,
                        ease: 'linear',
                      },
                    }}
                  >
                    {/* Quadrupled items for seamless looping */}
                    {[
                      ...contactData.nextSteps,
                      ...contactData.nextSteps,
                      ...contactData.nextSteps,
                      ...contactData.nextSteps,
                    ].map((item, idx) => (
                      <div
                        key={`${item.step}-${idx}`}
                        className="w-[280px] sm:w-[320px] p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-royal-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shrink-0 group select-none"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-mono text-xs font-bold text-slate-950 bg-slate-100 border border-royal-100 w-9 h-9 rounded-xl flex items-center justify-center shadow-2xs group-hover:bg-slate-950 group-hover:text-white transition-colors duration-300">
                            {item.step}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                            STEP 0{item.step}
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          <h4 className="font-display text-xs sm:text-sm font-bold text-slate-900 uppercase group-hover:text-slate-950 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 font-sans leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. DIRECT ACTION CHANNELS (CALL, WHATSAPP, EMAIL) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-16 sm:pb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-950 font-bold block mb-2">
            DIRECT ACTION CHANNELS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-950 uppercase tracking-tight">
            Connect With Our Studio Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Call Channel */}
          <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-200/90 flex flex-col justify-between h-[230px] hover:border-royal-300 hover:bg-white transition-all shadow-xs group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-slate-200 text-slate-950 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                {contactData.contactInfo.phone.label}
              </span>
              <h3 className="font-display text-base font-bold text-slate-950 uppercase">
                {contactData.contactInfo.phone.value}
              </h3>
              <p className="text-xs text-slate-500 font-sans mt-1">
                {contactData.contactInfo.phone.description}
              </p>
            </div>
            <a
              href={contactData.contactInfo.phone.href}
              className="text-xs font-bold text-slate-950 hover:text-royal-800 uppercase tracking-wider flex items-center gap-1"
            >
              <span>{contactData.contactInfo.phone.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* WhatsApp Channel */}
          <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-200/90 flex flex-col justify-between h-[230px] hover:border-emerald-300 hover:bg-white transition-all shadow-xs group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                {contactData.contactInfo.whatsapp.label}
              </span>
              <h3 className="font-display text-base font-bold text-slate-950 uppercase">
                {contactData.contactInfo.whatsapp.value}
              </h3>
              <p className="text-xs text-slate-500 font-sans mt-1">
                {contactData.contactInfo.whatsapp.description}
              </p>
            </div>
            <a
              href={contactData.contactInfo.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-wider flex items-center gap-1"
            >
              <span>{contactData.contactInfo.whatsapp.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Email Channel */}
          <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-200/90 flex flex-col justify-between h-[230px] hover:border-royal-300 hover:bg-white transition-all shadow-xs group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-slate-200 text-slate-950 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                {contactData.contactInfo.email.label}
              </span>
              <h3 className="font-display text-base font-bold text-slate-950 uppercase truncate">
                {contactData.contactInfo.email.value}
              </h3>
              <p className="text-xs text-slate-500 font-sans mt-1">
                {contactData.contactInfo.email.description}
              </p>
            </div>
            <a
              href={contactData.contactInfo.email.href}
              className="text-xs font-bold text-slate-950 hover:text-royal-800 uppercase tracking-wider flex items-center gap-1"
            >
              <span>{contactData.contactInfo.email.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. FULL-WIDTH ARCHITECTURAL MAP SECTION */}
      <ContactMap />

      {/* 5. IN-PERSON STUDIO VISIT CONSULTATION MODAL */}
      <AnimatePresence>
        {isStudioModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStudioModalOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-lg bg-white rounded-[32px] border border-slate-200/90 shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsStudioModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {studioBookingSubmitted ? (
                /* Success State */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
                      Studio Visit Initiated!
                    </h3>
                    <p className="text-sm text-slate-600 font-sans mt-2 max-w-sm mx-auto leading-relaxed">
                      We have opened WhatsApp to confirm your appointment details directly with our Principal Architect.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left text-xs space-y-1.5 font-sans">
                    <div className="flex justify-between text-slate-500">
                      <span>Name:</span>
                      <span className="font-semibold text-slate-900">{studioBookingData.name}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Phone:</span>
                      <span className="font-semibold text-slate-900">{studioBookingData.phone}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Date & Time:</span>
                      <span className="font-semibold text-slate-900">
                        {studioBookingData.date || 'Earliest available'} • {studioBookingData.timeSlot}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Project Interest:</span>
                      <span className="font-semibold text-slate-900">{studioBookingData.projectType}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/919886329424?text=${encodeURIComponent(
                        `*PERFECT MASON — STUDIO VISIT CONSULTATION*\n\n👤 *Name:* ${studioBookingData.name}\n📱 *Phone:* ${studioBookingData.phone}\n📅 *Date:* ${studioBookingData.date || 'Earliest'}\n⏰ *Time:* ${studioBookingData.timeSlot}\n🏗️ *Interest:* ${studioBookingData.projectType}\n\n📍 Studio: No: 2041, 18th Cross, AECS Layout, A Block, Hosur Main Road, Bangalore`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Re-Open WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsStudioModalOpen(false)}
                      className="py-3 px-6 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                /* Booking Form */
                <form onSubmit={handleStudioBookingSubmit} className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                      <span className="font-mono text-[10px] font-bold text-orange-600 uppercase tracking-widest">
                        IN-PERSON CONSULTATION
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      Book a Studio Visit
                    </h3>
                    <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed">
                      Enter your details below to schedule a one-on-one architectural consultation at our AECS Layout, Hosur Main Road design studio.
                    </p>
                  </div>

                  {studioBookingError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600">
                      {studioBookingError}
                    </div>
                  )}

                  <div className="space-y-3 pt-1">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={studioBookingData.name}
                          onChange={(e) => setStudioBookingData({ ...studioBookingData, name: e.target.value })}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950/20 focus:border-slate-950 transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={studioBookingData.phone}
                          onChange={(e) => setStudioBookingData({ ...studioBookingData, phone: e.target.value })}
                          placeholder="e.g. +91 98863 29424"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950/20 focus:border-slate-950 transition-all"
                        />
                      </div>
                    </div>

                    {/* Preferred Date & Time Slot */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Preferred Date
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="date"
                            value={studioBookingData.date}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setStudioBookingData({ ...studioBookingData, date: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950/20 focus:border-slate-950 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Time Slot
                        </label>
                        <div className="relative">
                          <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <select
                            value={studioBookingData.timeSlot}
                            onChange={(e) => setStudioBookingData({ ...studioBookingData, timeSlot: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950/20 focus:border-slate-950 transition-all bg-white"
                          >
                            <option value="10:00 AM – 12:00 PM">10:00 AM – 12:00 PM (Morning)</option>
                            <option value="02:00 PM – 04:00 PM">02:00 PM – 04:00 PM (Afternoon)</option>
                            <option value="04:00 PM – 06:00 PM">04:00 PM – 06:00 PM (Evening)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Project Interest */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Project Interest
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          'Residential Construction',
                          'Commercial Project',
                          'Interior Architecture',
                          'Turnkey Execution',
                        ].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setStudioBookingData({ ...studioBookingData, projectType: type })}
                            className={`p-2 rounded-xl text-left text-xs font-medium border transition-all ${
                              studioBookingData.projectType === type
                                ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Specific Discussion / Site Details (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={studioBookingData.notes}
                        onChange={(e) => setStudioBookingData({ ...studioBookingData, notes: e.target.value })}
                        placeholder="e.g. 30x40 site in HSR Layout, looking for modern duplex villa design."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950/20 focus:border-slate-950 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Confirm & Book via WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[10px] text-center text-slate-400 font-sans">
                      Opens WhatsApp with your details pre-formatted for direct confirmation with our team.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
