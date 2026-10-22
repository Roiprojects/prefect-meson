import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  ArrowLeft,
  Send,
  ShieldCheck,
  Smartphone,
  Tablet,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Award,
  Sparkles,
} from 'lucide-react';

export const AdminPagePreview: React.FC = () => {
  const { pageId = 'home' } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const { pageContents, publishPageContent, updateSettings, settings } = useData();

  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const pageRecord = pageContents?.[pageId] || {};
  // Use draft data if available, otherwise fall back to published data
  const data = (pageRecord.hasDraft && pageRecord.draftData) ? pageRecord.draftData : pageRecord;
  const isDraft = Boolean(pageRecord.hasDraft);

  const pageNames: Record<string, { title: string; route: string }> = {
    home: { title: 'Home Page', route: '/' },
    about: { title: 'About Us Page', route: '/about-us' },
    contact: { title: 'Contact Page', route: '/contact-us' },
    'header-footer': { title: 'Header & Footer Elements', route: '/' },
  };

  const info = pageNames[pageId] || { title: `${pageId.toUpperCase()} Page`, route: `/${pageId}` };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await publishPageContent(pageId, info.title, data);
      if (!res.success) throw new Error(res.error || 'Server error');

      // Sync settings if relevant
      if (pageId === 'home') {
        const h = data.hero || {};
        const c = data.cta || {};
        const i = data.intro || {};
        updateSettings({
          heroHeadline: h.headline || settings.heroHeadline,
          heroSubheadline: h.subheadline || settings.heroSubheadline,
          heroBadge: h.badge || settings.heroBadge,
          phone: c.phone || settings.phone,
          experienceYears: i.experienceYears || settings.experienceYears,
          projectsCompleted: i.projectsCompleted || settings.projectsCompleted,
          sqftDelivered: i.sqftDelivered || settings.sqftDelivered,
          clientSatisfactionRate: i.satisfactionRate || settings.clientSatisfactionRate,
        });
      } else if (pageId === 'contact') {
        const ch = data.channels || {};
        updateSettings({
          phone: ch.phone || settings.phone,
          whatsappNumber: ch.whatsapp || settings.whatsappNumber,
          email: ch.email || settings.email,
          address: ch.address || settings.address,
          workingHours: ch.workingHours || settings.workingHours,
        });
      }

      setIsPublishing(false);
      setShowPublishModal(false);
      setFeedback({
        type: 'success',
        message: 'Content successfully published live! Website is now updated for public visitors.',
      });
    } catch (err: any) {
      setIsPublishing(false);
      setFeedback({
        type: 'error',
        message: `Publication failed: ${err.message || 'Please retry.'}`,
      });
    }
  };

  const getContainerWidth = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-[390px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 flex flex-col font-sans">
      {/* ============================================================ */}
      {/* 1. TOP STICKY ADMIN PREVIEW CONTROL BAR */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white px-4 sm:px-6 py-3 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left: Identification & Notice */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(`/admin/pages/${pageId}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Editor</span>
            </button>
            <div className="h-5 w-px bg-slate-800 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-tight">
                  {info.title} Preview
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <ShieldCheck className="w-3 h-3 text-blue-400" />
                  {isDraft ? 'Private Unpublished Draft' : 'Published Content'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                This preview is private to authenticated administrators and does not alter the live public route ({info.route}).
              </p>
            </div>
          </div>

          {/* Center: Device Simulation Switcher */}
          <div className="flex items-center justify-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 self-center">
            <button
              type="button"
              onClick={() => setDeviceView('desktop')}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                deviceView === 'desktop'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop Screen Simulation (100% Canvas)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceView('tablet')}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                deviceView === 'tablet'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet Simulation (768px Width)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceView('mobile')}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                deviceView === 'mobile'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile Simulation (390px Width)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Mobile</span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <a
              href={info.route}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors"
            >
              <span>View Current Live Site</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <button
              type="button"
              onClick={() => setShowPublishModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Live</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert in Preview */}
        {feedback && (
          <div className="max-w-7xl mx-auto mt-2.5">
            <div
              className={`p-3 rounded-xl flex items-center justify-between text-xs transition-all ${
                feedback.type === 'success'
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-200'
                  : 'bg-red-500/20 border border-red-500/40 text-red-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span>{feedback.message}</span>
              </div>
              <button
                type="button"
                onClick={() => setFeedback(null)}
                className="hover:opacity-75 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================ */}
      {/* 2. PREVIEW CANVAS CONTAINER */}
      {/* ============================================================ */}
      <main className="flex-1 overflow-x-hidden flex items-center justify-center p-2 sm:p-6 bg-slate-900/60">
        <div
          className={`${getContainerWidth()} bg-white shadow-2xl transition-all duration-300 overflow-hidden ${
            deviceView !== 'desktop'
              ? 'rounded-3xl border-8 border-slate-800 shadow-slate-950/80 my-4'
              : 'w-full'
          }`}
        >
          {/* Top Simulated Browser Chrome (for mobile/tablet) */}
          {deviceView !== 'desktop' && (
            <div className="bg-slate-800 text-slate-400 px-4 py-2 flex items-center justify-between text-[11px] font-mono border-b border-slate-700">
              <span className="truncate max-w-[200px]">https://perfectmason.com{info.route}</span>
              <span className="text-[10px] text-blue-400 font-bold">PREVIEW DRAFT</span>
            </div>
          )}

          {/* ============================================================ */}
          {/* PREVIEW CONTENT RENDERING ACCORDING TO PAGE ID */}
          {/* ============================================================ */}

          {/* A. HOME PAGE PREVIEW */}
          {pageId === 'home' && (
            <div className="space-y-0 text-slate-900 bg-white">
              {/* Hero Section */}
              <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 px-6 text-center overflow-hidden">
                <div className="max-w-4xl mx-auto space-y-6 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono font-bold tracking-wider uppercase">
                    <Award className="w-3.5 h-3.5 text-blue-400" />
                    <span>{data?.hero?.badge || 'ISO 9001:2015 CERTIFIED • HIGH-PRECISION ENGINEERING'}</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight font-display">
                    {data?.hero?.headline || 'BUILDING SPACES. CREATING LEGACIES.'}
                  </h1>

                  <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {data?.hero?.subheadline || 'From residential homes to commercial spaces and turnkey projects, Perfect Mason brings disciplined planning, quality construction and thoughtful execution.'}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <span className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30">
                      {data?.hero?.primaryCta || 'REQUEST A QUOTE'}
                    </span>
                    <span className="px-6 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider">
                      {data?.hero?.secondaryCta || 'EXPLORE PROJECTS'}
                    </span>
                  </div>
                </div>
              </section>

              {/* Company Introduction Section */}
              <section className="py-16 px-6 sm:px-12 bg-slate-50 border-y border-slate-200">
                <div className="max-w-5xl mx-auto space-y-8">
                  <div className="text-center space-y-2">
                    <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest">
                      {data?.intro?.eyebrow || 'WHO WE ARE'}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                      {data?.intro?.heading || 'PRECISION IN ARCHITECTURE & BUILD'}
                    </h2>
                    <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {data?.intro?.subtext}
                    </p>
                  </div>

                  {/* 4 Corporate Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center">
                      <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-display block">
                        {data?.intro?.experienceYears || '18+'}
                      </span>
                      <span className="text-xs font-semibold text-slate-600 mt-1 block">Years of Excellence</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center">
                      <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-display block">
                        {data?.intro?.projectsCompleted || '150+'}
                      </span>
                      <span className="text-xs font-semibold text-slate-600 mt-1 block">Projects Completed</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center">
                      <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-display block">
                        {data?.intro?.sqftDelivered || '1.5M+'}
                      </span>
                      <span className="text-xs font-semibold text-slate-600 mt-1 block">Sq.Ft Delivered</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center">
                      <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-display block">
                        {data?.intro?.satisfactionRate || '100%'}
                      </span>
                      <span className="text-xs font-semibold text-slate-600 mt-1 block">Client Satisfaction</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Brand Manifesto */}
              {data?.manifesto && (
                <section className="py-14 px-6 sm:px-12 bg-slate-900 text-white text-center">
                  <div className="max-w-3xl mx-auto space-y-4">
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                      PERFECT MASON MANIFESTO
                    </span>
                    <h3 className="text-xl sm:text-3xl font-bold font-display uppercase tracking-tight">
                      {data.manifesto.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {data.manifesto.statement}
                    </p>
                  </div>
                </section>
              )}

              {/* Consultation CTA Banner */}
              <section className="py-14 px-6 sm:px-12 bg-blue-600 text-white text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-bold font-display">
                    {data?.cta?.heading || "Let's Build Something Special Together"}
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
                    {data?.cta?.subtext}
                  </p>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-xs uppercase tracking-wider shadow-lg">
                      <Phone className="w-4 h-4" />
                      <span>{data?.cta?.buttonText || 'Request Consultation'} • {data?.cta?.phone || '+91 98863 29424'}</span>
                    </span>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* B. ABOUT US PAGE PREVIEW */}
          {pageId === 'about' && (
            <div className="space-y-0 text-slate-900 bg-white">
              {/* Hero Banner */}
              <section className="py-16 sm:py-20 px-6 sm:px-12 bg-slate-950 text-white text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                    {data?.hero?.label || 'ABOUT US'}
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display whitespace-pre-line leading-tight">
                    {data?.hero?.heading || 'Built with precision.\nDesigned for life.'}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                    {data?.hero?.supportingText}
                  </p>
                </div>
              </section>

              {/* Practice Introduction */}
              <section className="py-14 px-6 sm:px-12 bg-white">
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="text-center space-y-2">
                    <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest">
                      {data?.intro?.label || 'WHO WE ARE'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display whitespace-pre-line leading-snug">
                      {data?.intro?.heading}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                      {data?.intro?.supportingText}
                    </p>
                  </div>
                </div>
              </section>

              {/* Vision & Mission Dual Cards */}
              <section className="py-14 px-6 sm:px-12 bg-slate-50 border-y border-slate-200">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase font-sans">
                      {data?.visionMission?.visionTitle || 'Our Vision'}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {data?.visionMission?.visionStatement}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase font-sans">
                      {data?.visionMission?.missionTitle || 'Our Mission'}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {data?.visionMission?.missionStatement}
                    </p>
                  </div>
                </div>
              </section>

              {/* Leadership Statement */}
              {data?.statement && (
                <section className="py-14 px-6 sm:px-12 bg-slate-900 text-white text-center">
                  <div className="max-w-3xl mx-auto space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight">
                      {data.statement.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {data.statement.supportingText}
                    </p>
                  </div>
                </section>
              )}

              {/* CTA Banner */}
              <section className="py-14 px-6 sm:px-12 bg-blue-600 text-white text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-bold font-display">
                    {data?.cta?.heading || "Let's Build Something Special Together"}
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
                    {data?.cta?.supportingText}
                  </p>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-xs uppercase tracking-wider shadow-lg">
                      <span>{data?.cta?.buttonText || 'Schedule Consultation'}</span>
                    </span>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* C. CONTACT PAGE PREVIEW */}
          {pageId === 'contact' && (
            <div className="space-y-0 text-slate-900 bg-white">
              <section className="py-16 px-6 sm:px-12 bg-slate-950 text-white text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                    {data?.hero?.sectionLabel || 'CONTACT & CONSULTATION'}
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display">
                    {data?.hero?.heading || 'Start Your Construction Journey'}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                    {data?.hero?.intro}
                  </p>
                </div>
              </section>

              <section className="py-14 px-6 sm:px-12 bg-slate-50">
                <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Phone Channel</span>
                    <span className="text-xs font-bold font-mono text-slate-900 block">{data?.channels?.phone}</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">WhatsApp Direct</span>
                    <span className="text-xs font-bold font-mono text-slate-900 block">{data?.channels?.whatsapp}</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Official Email</span>
                    <span className="text-xs font-bold text-slate-900 block truncate">{data?.channels?.email}</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 sm:col-span-2">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Office & Studio Address</span>
                    <span className="text-xs font-medium text-slate-800 block leading-relaxed">{data?.channels?.address}</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Working Hours</span>
                    <span className="text-xs font-bold text-slate-900 block">{data?.channels?.workingHours}</span>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* D. HEADER & FOOTER PREVIEW */}
          {pageId === 'header-footer' && (
            <div className="space-y-12 text-slate-900 bg-slate-100 p-6 sm:p-12">
              {/* Header Component Simulation */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-md p-6 space-y-4">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block">
                  Top Header & Navbar Preview
                </span>
                <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                      PM
                    </div>
                    <div>
                      <span className="font-extrabold text-sm tracking-tight text-white block">
                        {data?.header?.brandName || 'PERFECT MASON'}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {data?.header?.tagline || 'ARCHITECTURAL & TURNKEY CONSTRUCTION'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
                    <span className="hover:text-white">Services</span>
                    <span className="hover:text-white">Portfolio</span>
                    <span className="hover:text-white">About</span>
                    <span className="hover:text-white">Contact</span>
                    <span className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs shadow-xs">
                      {data?.header?.ctaText || 'Get Quote'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Component Simulation */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-md p-6 space-y-4">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block">
                  Corporate Footer Preview
                </span>
                <div className="p-6 rounded-xl bg-slate-950 text-white space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    <div>
                      <span className="font-bold text-sm text-white block">PERFECT MASON</span>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                        {data?.footer?.tagline}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-300 uppercase tracking-wider block">Bangalore Studio</span>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                        {data?.footer?.address}
                      </p>
                      <p className="text-blue-400 font-mono text-xs mt-1">
                        {data?.footer?.email}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-300 uppercase tracking-wider block">Quick Links</span>
                      <ul className="text-slate-400 text-xs space-y-1 mt-2">
                        <li>Luxury Villas & Duplexes</li>
                        <li>Commercial Complexes</li>
                        <li>Turnkey Project Handover</li>
                        <li>Verified Client Reviews</li>
                      </ul>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <span>{data?.footer?.copyright || '© 2026 Perfect Mason. All rights reserved.'}</span>
                    <span className="text-slate-600">ISO 9001:2015 Registered • South Bangalore</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ============================================================ */}
      {/* 3. CONFIRM PUBLISH MODAL */}
      {/* ============================================================ */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-scaleUp">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight">
                  Confirm Live Publication
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Publishing <strong className="text-slate-900">{info.title}</strong> to production
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 space-y-2 text-xs text-slate-700 leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Production Synchronisation Protocol</span>
              </div>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                <li>Your draft content will be written directly into the live PostgreSQL database.</li>
                <li>Updates will be visible to all live website visitors instantly at <strong className="text-slate-800">{info.route}</strong>.</li>
                <li>The draft status will be cleared and marked as Published.</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowPublishModal(false)}
                disabled={isPublishing}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-60"
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Publishing to Live Site...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm & Publish Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
