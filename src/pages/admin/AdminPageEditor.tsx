import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { useData } from '../../context/DataContext';
import { ImageUploadPicker } from '../../components/admin/ImageUploadPicker';
import {
  Save,
  Send,
  Eye,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  Home,
  Info,
  PhoneCall,
  PanelTop,
  RotateCcw,
  ExternalLink,
  Smartphone,
  Tablet,
  Monitor,
  X,
  AlertTriangle,
  Loader2,
  Sparkles,
  Clock,
  ShieldCheck,
  Trash2,
} from 'lucide-react';

export const AdminPageEditor: React.FC = () => {
  const { pageId = 'home' } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const {
    getPageContent,
    savePageDraft,
    publishPageContent,
    discardPageDraft,
    getPageDraft,
    getPublishedPageContent,
    updateSettings,
    settings,
    pageContents,
  } = useData();

  const pageRecord = pageContents?.[pageId] || {};
  const hasDraft = Boolean(pageRecord.hasDraft || pageRecord.draftData);
  const draftUpdatedAt = pageRecord.draftUpdatedAt;
  const lastPublishedAt = pageRecord.updatedAt;

  // Load existing page data from context (prioritize draft if exists, else published)
  const [formData, setFormData] = useState<any>(() => {
    const draft = getPageDraft(pageId);
    if (draft) return draft;
    return getPageContent(pageId) || {};
  });

  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [draftState, setDraftState] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle');
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showDiscardModal, setShowDiscardModal] = useState<boolean>(false);
  const [showDiscardDraftModal, setShowDiscardDraftModal] = useState<boolean>(false);
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [showValidationModal, setShowValidationModal] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    const draft = getPageDraft(pageId);
    if (draft) {
      setFormData(draft);
    } else {
      setFormData(getPageContent(pageId));
    }
    setIsDirty(false);
    setDraftState('idle');
    setFeedback(null);
  }, [pageId]);

  // Warn users before leaving the page with unsaved edits
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Page titles and human-readable metadata
  const pageMeta: Record<string, { title: string; route: string; icon: React.ComponentType<{ className?: string }>; description: string }> = {
    home: {
      title: 'Home Page',
      route: '/',
      icon: Home,
      description: 'Configure hero headline, hero background imagery, credibility badges, company metrics, and consultation intake banners.',
    },
    about: {
      title: 'About Us Page',
      route: '/about-us',
      icon: Info,
      description: 'Manage architectural foundations, vision & mission statements, practice philosophy, and leadership collaboration call-to-action.',
    },
    contact: {
      title: 'Contact Page',
      route: '/contact-us',
      icon: PhoneCall,
      description: 'Update verified telephone numbers, WhatsApp business channels, physical studio address, operating hours, and consultation intake.',
    },
    'header-footer': {
      title: 'Header & Footer Elements',
      route: '/',
      icon: PanelTop,
      description: 'Control global website elements including top navigation branding, taglines, direct quote buttons, and footer copyright.',
    },
  };

  const meta = pageMeta[pageId] || {
    title: `${pageId.toUpperCase()} Page`,
    route: `/${pageId}`,
    icon: Layers,
    description: 'Edit page content, headlines, narrative copy, and call-to-action sections.',
  };

  const PageIcon = meta.icon;

  const formatDateTime = (isoString?: string | null) => {
    if (!isoString) return 'recently';
    try {
      const d = new Date(isoString);
      return d.toLocaleString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return isoString;
    }
  };

  const handleChange = (section: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value,
      },
    }));
    setIsDirty(true);
    setFeedback(null);
  };

  const handleDiscardChanges = () => {
    const draft = getPageDraft(pageId);
    if (draft) {
      setFormData(draft);
    } else {
      setFormData(getPublishedPageContent(pageId));
    }
    setIsDirty(false);
    setShowDiscardModal(false);
    setFeedback({
      type: 'success',
      message: 'Unsaved modifications discarded. Content restored to the last saved state.',
    });
  };

  const handleNavigateBack = () => {
    if (isDirty) {
      setShowDiscardModal(true);
    } else {
      navigate('/admin/pages');
    }
  };

  // 1. SAVE DRAFT ACTION
  const handleSaveDraft = async () => {
    if (draftState === 'saving' || isPublishing) return;
    setDraftState('saving');
    try {
      const res = await savePageDraft(pageId, meta.title, formData);
      if (res.success) {
        setDraftState('saved');
        setIsDirty(false);
        const savedTime = formatDateTime(res.draftUpdatedAt || new Date().toISOString());
        setFeedback({
          type: 'success',
          message: `Draft successfully saved to database at ${savedTime}! The live published website remains untouched.`,
        });
        setTimeout(() => {
          setDraftState('idle');
        }, 3000);
      } else {
        throw new Error(res.error || 'Server rejected draft');
      }
    } catch (err: any) {
      setDraftState('failed');
      setFeedback({
        type: 'error',
        message: `Draft save failed: ${err.message || 'Please check your connection and retry.'}`,
      });
      setTimeout(() => {
        setDraftState('idle');
      }, 4000);
    }
  };

  // VALIDATION PROTOCOL BEFORE PUBLISHING
  const validatePageData = (): string[] => {
    const errors: string[] = [];

    if (pageId === 'home') {
      if (!formData?.hero?.headline?.trim()) {
        errors.push('Hero Main Headline is required.');
      }
      if (!formData?.intro?.heading?.trim()) {
        errors.push('Company Intro Heading is required.');
      }
      if (!formData?.cta?.phone?.trim()) {
        errors.push('Consultation CTA Phone Number is required.');
      }
    } else if (pageId === 'about') {
      if (!formData?.hero?.heading?.trim()) {
        errors.push('About Us Main Heading is required.');
      }
      if (!formData?.visionMission?.visionTitle?.trim() || !formData?.visionMission?.visionStatement?.trim()) {
        errors.push('Vision Title and Statement are required.');
      }
      if (!formData?.visionMission?.missionTitle?.trim() || !formData?.visionMission?.missionStatement?.trim()) {
        errors.push('Mission Title and Statement are required.');
      }
      if (!formData?.cta?.heading?.trim()) {
        errors.push('Consultation CTA Heading is required.');
      }
    } else if (pageId === 'contact') {
      if (!formData?.channels?.phone?.trim()) {
        errors.push('Official Phone Number is required.');
      }
      if (!formData?.channels?.email?.trim()) {
        errors.push('Official Email Address is required.');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.channels.email.trim())) {
        errors.push('Official Email Address must be a valid email format.');
      }
      if (!formData?.channels?.address?.trim()) {
        errors.push('Studio Physical Address is required.');
      }
    } else if (pageId === 'header-footer') {
      if (!formData?.header?.brandName?.trim()) {
        errors.push('Header Brand / Company Name is required.');
      }
      if (!formData?.footer?.copyright?.trim()) {
        errors.push('Footer Copyright Notice is required.');
      }
    }

    return errors;
  };

  const handleOpenPublishModal = () => {
    if (isPublishing || draftState === 'saving') return;
    const errors = validatePageData();
    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowValidationModal(true);
      return;
    }
    setValidationErrors([]);
    setShowPublishModal(true);
  };

  // 2. CONFIRM & PUBLISH CHANGES ACTION (Live sync only upon server confirmation)
  const handleConfirmPublish = async () => {
    if (isPublishing || draftState === 'saving') return;
    setIsPublishing(true);
    try {
      const res = await publishPageContent(pageId, meta.title, formData);
      if (!res.success) {
        throw new Error(res.error || 'Publication rejected by backend');
      }

      // Also sync global settings if on Home, Contact, or Header-Footer
      if (pageId === 'home') {
        const h = formData.hero || {};
        const c = formData.cta || {};
        const i = formData.intro || {};
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
        const ch = formData.channels || {};
        updateSettings({
          phone: ch.phone || settings.phone,
          whatsappNumber: ch.whatsapp || settings.whatsappNumber,
          email: ch.email || settings.email,
          address: ch.address || settings.address,
          workingHours: ch.workingHours || settings.workingHours,
        });
      } else if (pageId === 'header-footer') {
        const hdr = formData.header || {};
        const ftr = formData.footer || {};
        updateSettings({
          companyName: hdr.brandName || settings.companyName,
          tagline: hdr.tagline || settings.tagline,
          phone: hdr.phone || settings.phone,
          address: ftr.address || settings.address,
          email: ftr.email || settings.email,
        });
      }

      setIsPublishing(false);
      setIsDirty(false);
      setShowPublishModal(false);
      const serverTime = formatDateTime(res.updatedAt || new Date().toISOString());
      setFeedback({
        type: 'success',
        message: `Content successfully published live on ${serverTime}! Changes confirmed by PostgreSQL server and active for all visitors.`,
      });
    } catch (err: any) {
      setIsPublishing(false);
      setFeedback({
        type: 'error',
        message: `Publication failed: ${err.message || 'Please check your connection and retry.'}`,
      });
    }
  };

  const handleDiscardDraft = async () => {
    try {
      await discardPageDraft(pageId);
      const published = getPublishedPageContent(pageId);
      setFormData(published);
      setIsDirty(false);
      setShowDiscardDraftModal(false);
      setFeedback({
        type: 'success',
        message: 'Draft discarded. Content restored to the live published version.',
      });
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: `Failed to discard draft: ${err.message || 'Please retry.'}`,
      });
    }
  };

  // Helper Input Component with corporate styling
  const FormField: React.FC<{
    label: string;
    helperText?: string;
    section: string;
    field: string;
    type?: 'text' | 'textarea';
    rows?: number;
    placeholder?: string;
    required?: boolean;
  }> = ({ label, helperText, section, field, type = 'text', rows = 3, placeholder, required }) => {
    const value = formData?.[section]?.[field] ?? '';

    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-slate-800 font-sans">
            {label} {required && <span className="text-blue-600">*</span>}
          </label>
          {helperText && (
            <span className="text-[11px] text-slate-400 font-sans flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-slate-400" />
              {helperText}
            </span>
          )}
        </div>
        {type === 'textarea' ? (
          <textarea
            rows={rows}
            value={value}
            placeholder={placeholder}
            onChange={(e) => handleChange(section, field, e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-sans leading-relaxed focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition-all placeholder:text-slate-400"
          />
        ) : (
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => handleChange(section, field, e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-sans focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition-all placeholder:text-slate-400"
          />
        )}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-20">
        {/* ============================================================ */}
        {/* STICKY TOP ACTION BAR */}
        {/* ============================================================ */}
        <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-16 z-20 transition-all">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleNavigateBack}
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Return to Pages Manager"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <PageIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-slate-900 font-sans tracking-tight">
                    {meta.title}
                  </h1>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wide ${
                      isDirty
                        ? 'bg-amber-50 text-amber-800 border border-amber-300'
                        : hasDraft
                        ? 'bg-amber-50 text-amber-800 border border-amber-300'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {isDirty
                      ? '● Unsaved Changes'
                      : hasDraft
                      ? '● Unpublished Draft'
                      : `✓ Live (${formData?.status || 'Published'})`}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-500 font-sans">
                    Public route:
                  </span>
                  <a
                    href={meta.route}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    {meta.route}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex flex-wrap items-center gap-2.5 self-end sm:self-auto">
            {isDirty && (
              <button
                type="button"
                onClick={() => setShowDiscardModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition-all cursor-pointer"
                title="Discard your recent unsaved edits"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Discard</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-slate-600" />
              <span>Preview Changes</span>
            </button>

            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={draftState === 'saving' || isPublishing}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border shadow-2xs transition-all cursor-pointer disabled:opacity-60 ${
                draftState === 'saved'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : draftState === 'failed'
                  ? 'bg-red-50 text-red-800 border-red-300'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
              }`}
            >
              {draftState === 'saving' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-slate-600 animate-spin" />
                  <span>Saving Draft...</span>
                </>
              ) : draftState === 'saved' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Draft Saved</span>
                </>
              ) : draftState === 'failed' ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <span>Save Failed</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-slate-600" />
                  <span>Save Draft</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleOpenPublishModal}
              disabled={isPublishing || draftState === 'saving'}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-60"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Publishing Live...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Unpublished Draft Restoration Banner */}
        {hasDraft && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-amber-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wide font-sans">
                    Unpublished Draft Available
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-amber-100 text-amber-800 border border-amber-200">
                    Active Draft
                  </span>
                </div>
                <p className="text-xs text-amber-800 font-sans mt-0.5 leading-relaxed">
                  You are editing an unpublished draft saved {formatDateTime(draftUpdatedAt)}. The live public website is still displaying your published version {lastPublishedAt ? `(published ${formatDateTime(lastPublishedAt)})` : ''}.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-amber-950 bg-white hover:bg-amber-100/70 border border-amber-300 transition-all cursor-pointer shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5 text-amber-700" />
                <span>Preview Draft</span>
              </button>
              <button
                type="button"
                onClick={() => setShowDiscardDraftModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-red-700 bg-white hover:bg-red-50 border border-red-200 transition-all cursor-pointer shadow-2xs"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-600" />
                <span>Discard Draft</span>
              </button>
            </div>
          </div>
        )}

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs font-sans transition-all animate-fadeIn ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span className="font-medium">{feedback.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="text-xs font-semibold hover:opacity-75 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Page Description Intro Card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Live Website CMS Module
            </h2>
            <p className="text-xs text-slate-600 font-sans mt-0.5 leading-relaxed">
              {meta.description} Modifications made here can be saved as private drafts or immediately published live to your production visitors.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 1. HOME PAGE EDITOR */}
        {/* ============================================================ */}
        {pageId === 'home' && (
          <div className="space-y-6">
            {/* Section 1: Hero Cinematic Reveal */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                    01
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                      Hero Showcase & Primary Value Proposition
                    </h2>
                    <p className="text-xs text-slate-500 font-sans">
                      The primary viewpoint and conversion focal point visitors see upon opening Perfect Mason.
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full font-bold">
                  Above The Fold
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <FormField
                    label="Hero Main Headline"
                    helperText="Rendered in prominent architectural serif/sans display typography"
                    section="hero"
                    field="headline"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <FormField
                    label="Hero Subheadline & Narrative"
                    helperText="Supporting narrative describing Perfect Mason engineering"
                    section="hero"
                    field="subheadline"
                    type="textarea"
                    rows={2}
                  />
                </div>
                <FormField
                  label="Credibility Badge Text"
                  helperText="Appears above headline"
                  section="hero"
                  field="badge"
                />
                <FormField
                  label="Primary Button Text"
                  helperText="Opens Consultation Quote modal"
                  section="hero"
                  field="primaryCta"
                />
                <FormField
                  label="Secondary Button Text"
                  helperText="Navigates to Project Portfolio"
                  section="hero"
                  field="secondaryCta"
                />
              </div>

              {/* Hero Background Banner Manager */}
              <div className="pt-4 border-t border-slate-100">
                <ImageUploadPicker
                  mode="single"
                  value={formData?.hero?.bannerImage || '/assets/cinematic_grand_estate.jpg'}
                  onChange={(url) => handleChange('hero', 'bannerImage', url)}
                  label="Homepage Hero Background Visual"
                  helperText="Replace hero background photograph or select from high-resolution architectural assets."
                  categoryFilter="Projects"
                />
              </div>
            </div>

            {/* Section 2: Company Introduction & Corporate Stats */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                    02
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                      Company Introduction & Track Record Metrics
                    </h2>
                    <p className="text-xs text-slate-500 font-sans">
                      Firm craftsmanship showcase narrative and key track record statistics.
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-semibold">
                  Section 2
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  label="Introduction Eyebrow Label"
                  section="intro"
                  field="eyebrow"
                />
                <FormField
                  label="Main Section Heading"
                  section="intro"
                  field="heading"
                />
                <div className="md:col-span-2">
                  <FormField
                    label="Craftsmanship Narrative Description"
                    section="intro"
                    field="subtext"
                    type="textarea"
                    rows={3}
                  />
                </div>
                <FormField
                  label="Years of Civil Experience"
                  helperText="e.g. 18+"
                  section="intro"
                  field="experienceYears"
                />
                <FormField
                  label="Completed Architectural Projects"
                  helperText="e.g. 150+"
                  section="intro"
                  field="projectsCompleted"
                />
                <FormField
                  label="Delivered Built-Up Area"
                  helperText="e.g. 1.5M+ Sq.Ft"
                  section="intro"
                  field="sqftDelivered"
                />
                <FormField
                  label="Client Satisfaction Rate"
                  helperText="e.g. 100%"
                  section="intro"
                  field="satisfactionRate"
                />
              </div>
            </div>

            {/* Section 3: Brand Manifesto */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                    03
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                      Brand Quality & Engineering Manifesto
                    </h2>
                    <p className="text-xs text-slate-500 font-sans">
                      Formal declaration on precision engineering and zero subcontracting compromise.
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-semibold">
                  Section 3
                </span>
              </div>

              <div className="space-y-4">
                <FormField
                  label="Manifesto Headline"
                  section="manifesto"
                  field="heading"
                />
                <FormField
                  label="Manifesto Statement"
                  section="manifesto"
                  field="statement"
                  type="textarea"
                  rows={3}
                />
              </div>
            </div>

            {/* Section 4: Home Call-To-Action Banner */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                    04
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                      Consultation Banner (Conversion CTA)
                    </h2>
                    <p className="text-xs text-slate-500 font-sans">
                      Bottom conversion banner encouraging visitors to request an itemized BOQ estimate.
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-semibold">
                  Section 4
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <FormField
                    label="Banner Title"
                    section="cta"
                    field="heading"
                  />
                </div>
                <div className="md:col-span-2">
                  <FormField
                    label="Supporting Instructions"
                    section="cta"
                    field="subtext"
                    type="textarea"
                    rows={2}
                  />
                </div>
                <FormField
                  label="Button Text"
                  section="cta"
                  field="buttonText"
                />
                <FormField
                  label="Direct Contact Phone"
                  section="cta"
                  field="phone"
                />
              </div>
            </div>

            {/* Section 5: SEO Metadata */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                    05
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                      Search Engine Optimization (SEO & Meta)
                    </h2>
                    <p className="text-xs text-slate-500 font-sans">
                      Controls how Perfect Mason appears in Google search engine snippets and social previews.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <FormField
                  label="Page Meta Title"
                  helperText="Recommended length: 50-60 characters"
                  section="seo"
                  field="metaTitle"
                />
                <FormField
                  label="Page Meta Description"
                  helperText="Recommended length: 150-160 characters"
                  section="seo"
                  field="metaDescription"
                  type="textarea"
                  rows={2}
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. ABOUT US PAGE EDITOR */}
        {/* ============================================================ */}
        {pageId === 'about' && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                    01
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                      About Us Hero Section
                    </h2>
                    <p className="text-xs text-slate-500 font-sans">
                      Opening architectural statement and headline on the About Us page.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <FormField
                  label="Section Eyebrow Label"
                  section="hero"
                  field="label"
                />
                <FormField
                  label="Main Heading"
                  section="hero"
                  field="heading"
                />
                <FormField
                  label="Supporting Statement"
                  section="hero"
                  field="supportingText"
                  type="textarea"
                  rows={2}
                />
              </div>

              {/* About Hero Banner Image */}
              <div className="pt-4 border-t border-slate-100">
                <ImageUploadPicker
                  mode="single"
                  value={formData?.hero?.heroImage || '/assets/about_hero_villa.jpg'}
                  onChange={(url) => handleChange('hero', 'heroImage', url)}
                  label="About Hero Architectural Banner"
                  helperText="Primary architectural showcase image for the About Us hero section."
                  categoryFilter="Residential"
                />
              </div>
            </div>

            {/* Foundations & Vision / Mission */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                    02
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                      Strategic Vision & Mission Statements
                    </h2>
                    <p className="text-xs text-slate-500 font-sans">
                      Core institutional principles that guide Perfect Mason engineering.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <FormField
                  label="Vision Title"
                  section="visionMission"
                  field="visionTitle"
                />
                <FormField
                  label="Vision Statement"
                  section="visionMission"
                  field="visionStatement"
                  type="textarea"
                  rows={3}
                />
                <FormField
                  label="Mission Title"
                  section="visionMission"
                  field="missionTitle"
                />
                <FormField
                  label="Mission Statement"
                  section="visionMission"
                  field="missionStatement"
                  type="textarea"
                  rows={3}
                />
              </div>
            </div>

            {/* Collaboration Call to Action */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                    03
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                      Collaboration Call-to-Action
                    </h2>
                    <p className="text-xs text-slate-500 font-sans">
                      Closing consultation banner on the About page.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <FormField
                    label="Heading"
                    section="cta"
                    field="heading"
                  />
                </div>
                <div className="md:col-span-2">
                  <FormField
                    label="Supporting Text"
                    section="cta"
                    field="supportingText"
                    type="textarea"
                    rows={2}
                  />
                </div>
                <FormField
                  label="Button Text"
                  section="cta"
                  field="buttonText"
                />
              </div>
            </div>

            {/* SEO */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                    04
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                      About Page SEO Settings
                    </h2>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <FormField
                  label="Meta Title"
                  section="seo"
                  field="metaTitle"
                />
                <FormField
                  label="Meta Description"
                  section="seo"
                  field="metaDescription"
                  type="textarea"
                  rows={2}
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. CONTACT PAGE EDITOR */}
        {/* ============================================================ */}
        {pageId === 'contact' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                    01
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                      Contact Header & Introductory Headline
                    </h2>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <FormField
                  label="Section Eyebrow Label"
                  section="hero"
                  field="sectionLabel"
                />
                <FormField
                  label="Hero Heading"
                  section="hero"
                  field="heading"
                />
                <FormField
                  label="Introductory Paragraph"
                  section="hero"
                  field="intro"
                  type="textarea"
                  rows={2}
                />
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                    02
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                      Verified Business Contact Channels
                    </h2>
                    <p className="text-xs text-slate-500 font-sans">
                      These values sync directly to the interactive quick actions and official contact cards.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  label="Primary Phone Number"
                  section="channels"
                  field="phone"
                />
                <FormField
                  label="WhatsApp Number (with country code)"
                  section="channels"
                  field="whatsapp"
                />
                <FormField
                  label="Official Studio Email Address"
                  section="channels"
                  field="email"
                />
                <FormField
                  label="Consultation Studio Working Hours"
                  section="channels"
                  field="workingHours"
                />
                <div className="md:col-span-2">
                  <FormField
                    label="Physical Bangalore Office Address"
                    section="channels"
                    field="address"
                    type="textarea"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                    03
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                      Contact Page SEO Settings
                    </h2>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <FormField
                  label="Meta Title"
                  section="seo"
                  field="metaTitle"
                />
                <FormField
                  label="Meta Description"
                  section="seo"
                  field="metaDescription"
                  type="textarea"
                  rows={2}
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. HEADER & FOOTER EDITOR */}
        {/* ============================================================ */}
        {pageId === 'header-footer' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                    01
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                      Global Navigation Header Elements
                    </h2>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  label="Company Brand Name"
                  section="header"
                  field="brandName"
                />
                <FormField
                  label="Tagline / Practice Descriptor"
                  section="header"
                  field="tagline"
                />
                <FormField
                  label="Header Quote Button Label"
                  section="header"
                  field="ctaText"
                />
                <FormField
                  label="Direct Contact Phone"
                  section="header"
                  field="phone"
                />
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                    02
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                      Global Footer Information & Disclaimers
                    </h2>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <FormField
                    label="Footer Brand Statement"
                    section="footer"
                    field="tagline"
                    type="textarea"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <FormField
                    label="Copyright Notice"
                    section="footer"
                    field="copyright"
                  />
                </div>
                <div className="md:col-span-2">
                  <FormField
                    label="Official Studio Address in Footer"
                    section="footer"
                    field="address"
                    type="textarea"
                    rows={2}
                  />
                </div>
                <FormField
                  label="Footer Phone Number"
                  section="footer"
                  field="phone"
                />
                <FormField
                  label="Footer Official Email"
                  section="footer"
                  field="email"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* DISCARD CHANGES CONFIRMATION MODAL */}
        {/* ============================================================ */}
        {showDiscardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm font-sans">
                    Discard Unsaved Changes?
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed">
                    You have unsaved edits in this page editor. If you discard or leave now, these modifications will be lost and reverted.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowDiscardModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Keep Editing
                </button>
                <button
                  type="button"
                  onClick={handleDiscardChanges}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Yes, Discard Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* LIVE VISUAL PREVIEW MODAL */}
        {/* ============================================================ */}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
              {/* Modal Top Bar */}
              <div className="p-4 sm:p-5 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/90 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm font-sans">
                      Live Content Preview — {meta.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-sans">
                      Simulated rendering of current edits before publishing live.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Device Switcher */}
                  <div className="hidden sm:flex items-center bg-slate-200/70 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                        previewDevice === 'desktop'
                          ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Desktop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('tablet')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                        previewDevice === 'tablet'
                          ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Tablet className="w-3.5 h-3.5" />
                      <span>Tablet</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                        previewDevice === 'mobile'
                          ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsPreviewOpen(false);
                      navigate(`/admin/preview/${pageId}`);
                    }}
                    className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
                    title="Open dedicated full-screen preview page"
                  >
                    <span>Full-Page View</span>
                    <ExternalLink className="w-3 h-3 text-blue-600" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPreviewOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Preview Canvas */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100 flex justify-center">
                <div
                  className={`bg-white rounded-2xl shadow-md border border-slate-200 transition-all duration-300 overflow-hidden ${
                    previewDevice === 'mobile'
                      ? 'w-[375px]'
                      : previewDevice === 'tablet'
                      ? 'w-[768px]'
                      : 'w-full'
                  }`}
                >
                  {/* Mock Browser Header */}
                  <div className="bg-slate-900 px-4 py-3 flex items-center justify-between text-white border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-mono text-slate-400 ml-2">
                        perfectmason.com{meta.route}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                      LIVE PREVIEW
                    </span>
                  </div>

                  {/* Rendered Visual Content based on pageId */}
                  <div className="p-6 sm:p-8 space-y-8 font-sans">
                    {pageId === 'home' && (
                      <div className="space-y-8">
                        {/* Hero Simulated Preview */}
                        <div className="relative rounded-2xl p-8 text-white overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 min-h-[300px] flex flex-col justify-center">
                          {formData?.hero?.bannerImage && (
                            <img
                              src={formData.hero.bannerImage}
                              alt="Hero preview"
                              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                            />
                          )}
                          <div className="relative z-10 space-y-3">
                            {formData?.hero?.badge && (
                              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
                                {formData.hero.badge}
                              </span>
                            )}
                            <h1 className="text-xl sm:text-3xl font-bold tracking-tight leading-tight text-white">
                              {formData?.hero?.headline || 'Hero Headline'}
                            </h1>
                            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                              {formData?.hero?.subheadline || 'Hero subheadline description...'}
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                              <span className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white">
                                {formData?.hero?.primaryCta || 'Request Quote'}
                              </span>
                              <span className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white border border-white/20">
                                {formData?.hero?.secondaryCta || 'Explore Projects'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Intro Metrics Preview */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                          <div>
                            <span className="text-lg font-bold font-mono text-slate-900 block">
                              {formData?.intro?.experienceYears || '18+'}
                            </span>
                            <span className="text-[11px] text-slate-500 font-sans">Experience</span>
                          </div>
                          <div>
                            <span className="text-lg font-bold font-mono text-slate-900 block">
                              {formData?.intro?.projectsCompleted || '150+'}
                            </span>
                            <span className="text-[11px] text-slate-500 font-sans">Completed Projects</span>
                          </div>
                          <div>
                            <span className="text-lg font-bold font-mono text-slate-900 block">
                              {formData?.intro?.sqftDelivered || '1.5M+'}
                            </span>
                            <span className="text-[11px] text-slate-500 font-sans">Delivered Area</span>
                          </div>
                          <div>
                            <span className="text-lg font-bold font-mono text-slate-900 block">
                              {formData?.intro?.satisfactionRate || '100%'}
                            </span>
                            <span className="text-[11px] text-slate-500 font-sans">Satisfaction</span>
                          </div>
                        </div>

                        {/* CTA Banner Preview */}
                        <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-base font-bold">
                              {formData?.cta?.heading || 'Consultation Banner'}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">
                              {formData?.cta?.subtext || 'Contact our directors...'}
                            </p>
                          </div>
                          <span className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shrink-0 self-start sm:self-auto">
                            {formData?.cta?.buttonText || 'Schedule'}
                          </span>
                        </div>
                      </div>
                    )}

                    {pageId === 'about' && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-200 pb-5">
                          <span className="text-xs font-mono font-bold text-blue-600 uppercase">
                            {formData?.hero?.label || 'ABOUT US'}
                          </span>
                          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 whitespace-pre-line">
                            {formData?.hero?.heading || 'About Heading'}
                          </h1>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                            {formData?.hero?.supportingText || 'Supporting text...'}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                            <h4 className="font-bold text-xs text-slate-900 uppercase">
                              {formData?.visionMission?.visionTitle || 'Our Vision'}
                            </h4>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {formData?.visionMission?.visionStatement}
                            </p>
                          </div>
                          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                            <h4 className="font-bold text-xs text-slate-900 uppercase">
                              {formData?.visionMission?.missionTitle || 'Our Mission'}
                            </h4>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {formData?.visionMission?.missionStatement}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {pageId === 'contact' && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-200 pb-5">
                          <span className="text-xs font-mono font-bold text-blue-600 uppercase">
                            {formData?.hero?.sectionLabel || 'CONTACT & CONSULTATION'}
                          </span>
                          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                            {formData?.hero?.heading || 'Start Your Journey'}
                          </h1>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                            {formData?.hero?.intro || 'Contact details...'}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                            <span className="font-semibold text-slate-500 block">Phone</span>
                            <span className="font-bold text-slate-900 font-mono mt-0.5 block">
                              {formData?.channels?.phone}
                            </span>
                          </div>
                          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                            <span className="font-semibold text-slate-500 block">WhatsApp</span>
                            <span className="font-bold text-slate-900 font-mono mt-0.5 block">
                              {formData?.channels?.whatsapp}
                            </span>
                          </div>
                          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                            <span className="font-semibold text-slate-500 block">Email</span>
                            <span className="font-bold text-slate-900 mt-0.5 block">
                              {formData?.channels?.email}
                            </span>
                          </div>
                          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                            <span className="font-semibold text-slate-500 block">Working Hours</span>
                            <span className="font-bold text-slate-900 mt-0.5 block">
                              {formData?.channels?.workingHours}
                            </span>
                          </div>
                          <div className="sm:col-span-2 p-4 rounded-xl border border-slate-200 bg-slate-50">
                            <span className="font-semibold text-slate-500 block">Studio Address</span>
                            <span className="text-slate-800 mt-0.5 block leading-relaxed">
                              {formData?.channels?.address}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {pageId === 'header-footer' && (
                      <div className="space-y-6">
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                          <span className="font-mono text-[10px] font-bold uppercase text-slate-500 block mb-2">
                            Header Elements
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-sm">
                              {formData?.header?.brandName || 'PERFECT MASON'}
                            </span>
                            <span className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold">
                              {formData?.header?.ctaText || 'Get Quote'}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 block mt-1">
                            {formData?.header?.tagline}
                          </span>
                        </div>

                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-900 text-white space-y-3">
                          <span className="font-mono text-[10px] font-bold uppercase text-slate-400 block">
                            Footer Elements
                          </span>
                          <p className="text-xs text-slate-300">
                            {formData?.footer?.tagline}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {formData?.footer?.address}
                          </p>
                          <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                            {formData?.footer?.copyright}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPreviewOpen(false);
                    handleOpenPublishModal();
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Changes Now</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 1. CONFIRM PUBLISH MODAL */}
        {/* ============================================================ */}
        {showPublishModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-scaleUp font-sans">
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Confirm Live Publication
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    You are publishing <strong className="text-slate-900">{meta.title}</strong> directly to production.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 space-y-2.5 text-xs text-slate-700 leading-relaxed">
                <div className="flex items-center gap-2 font-bold text-blue-900">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Production Publishing Protocol</span>
                </div>
                <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                  <li>Your changes will be written directly into the PostgreSQL live database.</li>
                  <li>All visitors visiting <strong className="text-slate-900">{meta.route}</strong> will immediately see these updates.</li>
                  <li>Any active draft will be cleared and the page will be officially marked as Published.</li>
                </ul>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
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
                  onClick={handleConfirmPublish}
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

        {/* ============================================================ */}
        {/* 2. VALIDATION ERROR MODAL */}
        {/* ============================================================ */}
        {showValidationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp font-sans">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Required Fields Incomplete
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Please complete the following fields before publishing live:
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-red-50/70 border border-red-100 space-y-2">
                <ul className="space-y-1.5 list-disc list-inside text-xs text-red-800 font-medium">
                  {validationErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowValidationModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Got It, I'll Complete These
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. UNSAVED CHANGES NAVIGATION WARNING MODAL */}
        {/* ============================================================ */}
        {showDiscardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp font-sans">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Unsaved Edits Detected
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    You have unsaved edits in this page editor.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Leaving without saving will discard your latest modifications. You can save your progress as a private draft or discard changes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDiscardModal(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Stay & Keep Editing
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDiscardChanges();
                    navigate('/admin/pages');
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
                >
                  Discard & Leave
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await handleSaveDraft();
                    navigate('/admin/pages');
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Save Draft & Leave
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. DISCARD UNPUBLISHED DRAFT CONFIRMATION MODAL */}
        {/* ============================================================ */}
        {showDiscardDraftModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp font-sans">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Discard Unpublished Draft?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Reverting <strong className="text-slate-900">{meta.title}</strong> to live published version
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                This will permanently remove the saved draft from the database. The editor will be reset to match the currently published live website version.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDiscardDraftModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDiscardDraft}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/30 transition-all cursor-pointer"
                >
                  Yes, Discard Draft
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
