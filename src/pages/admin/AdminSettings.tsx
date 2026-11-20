import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Building2,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
  Save,
  CheckCircle2,
  Clock,
  Award,
  RefreshCw,
  Search,
  Share2,
  Palette,
  Globe,
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
  ExternalLink,
  Sliders,
  Type,
  Eye,
  X,
} from 'lucide-react';
import { useData, WebsiteSettings } from '../../context/DataContext';
import { AdminLayout } from './AdminLayout';
import { apiService } from '../../services/api';
import { ADMIN_MEDIA_CATALOG, MediaAsset } from '../../data/adminMediaCatalog';

type TabKey = 'general' | 'seo' | 'branding' | 'hero-metrics' | 'all';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useData();

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabKey>('general');

  // Form State
  const [formData, setFormData] = useState<WebsiteSettings>({ ...settings });

  // Async Save States
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // File Upload State
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Media Catalog Modal State
  const [catalogModalTarget, setCatalogModalTarget] = useState<keyof WebsiteSettings | null>(null);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategory, setCatalogCategory] = useState<string>('All');

  // Hidden File Inputs
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  const ogImageInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // Sync with context settings on mount / update
  useEffect(() => {
    setFormData({ ...settings });
  }, [settings]);

  // Track if changes have been made
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(settings);

  // Handle Save Submission
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // Validate email format
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error('Please provide a valid official email address.');
      }

      // Persist to PostgreSQL backend via DataContext
      const result = await updateSettings(formData);
      if (result && !result.success) {
        throw new Error(result.error || 'Failed to save settings.');
      }

      // Confirmed success
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4500);
    } catch (err: any) {
      console.error('Settings save error:', err);
      setSaveError(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  // Discard changes
  const handleReset = () => {
    setFormData({ ...settings });
    setSaveError(null);
    setSaveSuccess(false);
  };

  // Upload handler for logos, favicons, OG images, banners
  const handleFileUpload = async (
    file: File,
    targetField: keyof WebsiteSettings,
    bucketId: string = 'general'
  ) => {
    setUploadingTarget(targetField);
    setUploadProgress(15);
    setUploadError(null);

    try {
      setUploadProgress(45);
      const res = await apiService.uploadFile(file, bucketId);
      setUploadProgress(85);

      if (res && res.url) {
        setFormData((prev) => ({
          ...prev,
          [targetField]: res.url,
        }));
        setUploadProgress(100);
        setTimeout(() => setUploadingTarget(null), 500);
      } else {
        throw new Error('Upload succeeded but no asset URL was returned.');
      }
    } catch (err: any) {
      console.error('File upload error:', err);
      setUploadError(err.message || 'Failed to upload image. Please try again.');
      setUploadingTarget(null);
    }
  };

  // Filtered Media Catalog for Picker Modal
  const filteredCatalog = ADMIN_MEDIA_CATALOG.filter((asset) => {
    if (catalogCategory !== 'All' && asset.category !== catalogCategory) return false;
    if (!catalogSearch) return true;
    const q = catalogSearch.toLowerCase();
    return (
      asset.title.toLowerCase().includes(q) ||
      asset.category.toLowerCase().includes(q) ||
      asset.tags?.some((t) => t.toLowerCase().includes(q))
    );
  });

  const selectCatalogAsset = (asset: MediaAsset) => {
    if (catalogModalTarget) {
      setFormData((prev) => ({
        ...prev,
        [catalogModalTarget]: asset.url,
      }));
      setCatalogModalTarget(null);
    }
  };

  // Architectural Brand Preset Colors
  const architecturalPresets = [
    { label: 'Royal Blue', primary: '#1d4ed8', secondary: '#d97706' },
    { label: 'Slate Navy', primary: '#0f172a', secondary: '#2563eb' },
    { label: 'Steel Bronze', primary: '#1e293b', secondary: '#b45309' },
    { label: 'Emerald EPC', primary: '#064e3b', secondary: '#059669' },
    { label: 'Warm Stone', primary: '#292524', secondary: '#d97706' },
    { label: 'Deep Indigo', primary: '#312e81', secondary: '#6366f1' },
  ];

  const tabs: Array<{ id: TabKey; label: string; icon: any; count?: string }> = [
    { id: 'general', label: '1. General Website Info', icon: Globe },
    { id: 'seo', label: '2. SEO & Social Media', icon: Search },
    { id: 'branding', label: '3. Branding & Appearance', icon: Palette },
    { id: 'hero-metrics', label: '4. Hero Copy & Metrics', icon: Award },
    { id: 'all', label: 'All Settings (Full View)', icon: Sliders },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl pb-20 font-sans">
        {/* ========================================================================= */}
        {/* 1. HEADER HERO (Title, Live Status & Global Actions)                      */}
        {/* ========================================================================= */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 border border-blue-200/80 shadow-2xs">
                  <SettingsIcon className="w-3.5 h-3.5 text-blue-600" />
                  SYSTEM CONFIGURATION
                </span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs font-mono text-emerald-600 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  PostgreSQL Synchronized
                </span>
                {hasChanges && (
                  <>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      ● Unsaved Changes
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 font-sans">
                Global Website Settings & CMS
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-sans leading-relaxed">
                Manage firm identity, SEO graph metadata, primary brand colors, typography, and public footer specifications with instant frontend synchronization.
              </p>
            </div>

            {/* Quick Actions in Header */}
            <div className="flex items-center gap-2.5 flex-wrap shrink-0">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                title="Open live website in a new tab"
              >
                <span>View Live Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              {hasChanges && (
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Discard</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm shadow-blue-600/20"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Feedback Banners */}
          <AnimatePresence>
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Settings successfully saved to PostgreSQL database! Public website and meta tags updated.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSaveSuccess(false)}
                  className="text-emerald-700 hover:text-emerald-950 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}

            {saveError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{saveError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSaveError(null)}
                  className="text-rose-700 hover:text-rose-950 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}

            {uploadError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Upload error: {uploadError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadError(null)}
                  className="text-amber-700 hover:text-amber-950 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* 2. TAB NAVIGATION BAR                                                     */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 border-b border-slate-200/90 pb-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white border border-transparent hover:border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3. SETTINGS FORMS & SECTIONS                                              */}
        {/* ========================================================================= */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ======================================================================= */}
          {/* GROUP 1: GENERAL WEBSITE INFORMATION                                    */}
          {/* ======================================================================= */}
          {(activeTab === 'general' || activeTab === 'all') && (
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-950 font-sans tracking-tight">
                      1. General Website Information
                    </h2>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">
                      Core organization identity, brand logos, favicon, physical headquarters, and business hours.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  PUBLIC WEBSITE CORE
                </span>
              </div>

              {/* Logo & Favicon Management Strip */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
                {/* Website Logo Field */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                      Website Brand Logo *
                    </label>
                    <span className="text-[11px] font-mono text-slate-400">Header & Footer</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                      {formData.logoUrl ? (
                        <img
                          src={formData.logoUrl}
                          alt="Website Logo Preview"
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/logo.png';
                          }}
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-slate-300" />
                      )}
                    </div>

                    <div className="space-y-2 flex-1 min-w-0">
                      <input
                        type="text"
                        value={formData.logoUrl || ''}
                        onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                        placeholder="/logo.png"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                      />
                      <div className="flex items-center gap-2 flex-wrap">
                        <input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0], 'logoUrl', 'general');
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => logoInputRef.current?.click()}
                          disabled={uploadingTarget === 'logoUrl'}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                        >
                          <Upload className="w-3 h-3" />
                          <span>{uploadingTarget === 'logoUrl' ? `Uploading ${uploadProgress}%` : 'Upload New'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, logoUrl: '/logo.png' })}
                          className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
                        >
                          Reset Default
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Website Favicon Field */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                      Browser Favicon (.ico / .svg / .png) *
                    </label>
                    <span className="text-[11px] font-mono text-slate-400">Browser Tab Icon</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                      {formData.faviconUrl ? (
                        <img
                          src={formData.faviconUrl}
                          alt="Favicon Preview"
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/favicon.svg';
                          }}
                        />
                      ) : (
                        <Globe className="w-6 h-6 text-slate-300" />
                      )}
                    </div>

                    <div className="space-y-2 flex-1 min-w-0">
                      <input
                        type="text"
                        value={formData.faviconUrl || ''}
                        onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
                        placeholder="/favicon.svg"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                      />
                      <div className="flex items-center gap-2 flex-wrap">
                        <input
                          ref={faviconInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0], 'faviconUrl', 'general');
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => faviconInputRef.current?.click()}
                          disabled={uploadingTarget === 'faviconUrl'}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                        >
                          <Upload className="w-3 h-3" />
                          <span>{uploadingTarget === 'faviconUrl' ? `Uploading ${uploadProgress}%` : 'Upload Favicon'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, faviconUrl: '/favicon.svg' })}
                          className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
                        >
                          Reset Default
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Fields: Website Name, Tagline, Phone, Email, Address, Hours */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Website Name / Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value, websiteName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-400">Used across top navbar brand, email notifications, and footer.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Tagline / Subtitle *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-400">Display tagline shown beneath brand name and in metadata.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Official Contact Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Primary Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    WhatsApp Direct Booking Number (with Country Code)
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Working Hours / Office Timing
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.workingHours}
                      onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                      placeholder="Mon - Sat: 9:00 AM - 6:00 PM"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Headquarters Business Address *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Company About Brief / Mission Statement
                  </label>
                  <textarea
                    rows={3}
                    value={formData.aboutBrief}
                    onChange={(e) => setFormData({ ...formData, aboutBrief: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* GROUP 2: SEO & SOCIAL MEDIA SETTINGS                                    */}
          {/* ======================================================================= */}
          {(activeTab === 'seo' || activeTab === 'all') && (
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-950 font-sans tracking-tight">
                      2. SEO & Social Media Settings
                    </h2>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">
                      Search engine metadata, crawler indexing preferences, Open Graph sharing cards, and social profiles.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  DISCOVERABILITY & META
                </span>
              </div>

              {/* Meta Tags: Title, Description & Indexing */}
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Default SEO Meta Title *
                    </label>
                    <span className={`text-[11px] font-mono ${formData.seoTitle?.length > 60 ? 'text-amber-600' : 'text-slate-400'}`}>
                      {formData.seoTitle?.length || 0} / 60 recommended characters
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.seoTitle || ''}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    placeholder="PERFECT MASON — Luxury Architectural & Turnkey Construction"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-400">Displayed in browser tabs and as the main headline link in Google search results.</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Default SEO Meta Description *
                    </label>
                    <span className={`text-[11px] font-mono ${formData.seoDescription?.length > 160 ? 'text-amber-600' : 'text-slate-400'}`}>
                      {formData.seoDescription?.length || 0} / 160 recommended characters
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    required
                    value={formData.seoDescription || ''}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    placeholder="Perfect Mason provides premier architectural design, civil engineering, turnkey luxury villas, and commercial construction across South Bangalore."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Search Engine Indexing Preference */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Search Engine Indexing Preference *
                    </label>
                    <select
                      value={formData.seoIndexingPreference || 'index, follow'}
                      onChange={(e) => setFormData({ ...formData, seoIndexingPreference: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none bg-white cursor-pointer"
                    >
                      <option value="index, follow">Allow Indexing & Ranking (index, follow) — Production Live</option>
                      <option value="noindex, nofollow">Disallow Search Crawlers (noindex, nofollow) — Private / Staging</option>
                      <option value="index, nofollow">Index Only, Do Not Follow Links (index, nofollow)</option>
                    </select>
                    <p className="text-[11px] text-slate-400">Controls the robots meta tag for Google, Bing, and search crawlers.</p>
                  </div>

                  {/* Social Sharing Image (OG Image) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Social Sharing Image (OG Image) *
                      </label>
                      <span className="text-[11px] font-mono text-slate-400">1200x630px recommended</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {formData.socialShareImage ? (
                          <img
                            src={formData.socialShareImage}
                            alt="OG Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Share2 className="w-4 h-4 text-slate-400" />
                        )}
                      </div>

                      <input
                        type="text"
                        value={formData.socialShareImage || ''}
                        onChange={(e) => setFormData({ ...formData, socialShareImage: e.target.value })}
                        placeholder="/assets/cinematic_grand_estate.jpg"
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none min-w-0"
                      />

                      <input
                        ref={ogImageInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0], 'socialShareImage', 'general');
                          }
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => ogImageInputRef.current?.click()}
                        disabled={uploadingTarget === 'socialShareImage'}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 shrink-0"
                      >
                        <Upload className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setCatalogModalTarget('socialShareImage')}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 shrink-0"
                        title="Pick from gallery catalog"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live Simulation Card: Google Search & Social Preview */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      LIVE SEARCH ENGINE SNIPPET SIMULATION
                    </span>
                    <span className="text-[11px] text-slate-400">Google Mobile & Desktop Preview</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-600">
                        PM
                      </div>
                      <span className="text-[11px] text-slate-600 font-sans">
                        https://perfectmason.com
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-blue-700 hover:underline cursor-pointer leading-snug">
                      {formData.seoTitle || 'PERFECT MASON — Luxury Architectural & Turnkey Construction'}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-2">
                      {formData.seoDescription || 'Perfect Mason provides premier architectural design, civil engineering, turnkey luxury villas, and commercial construction across South Bangalore.'}
                    </p>
                  </div>
                </div>

                {/* Social Media Profile Links */}
                <div className="pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-purple-600" />
                    <span>Social Media Profile Links (Synced to Navbar & Footer)</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-semibold text-slate-600">
                        Instagram Profile URL
                      </label>
                      <input
                        type="url"
                        value={formData.socialInstagram || ''}
                        onChange={(e) => setFormData({ ...formData, socialInstagram: e.target.value })}
                        placeholder="https://instagram.com/perfectmason"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-semibold text-slate-600">
                        Facebook Page URL
                      </label>
                      <input
                        type="url"
                        value={formData.socialFacebook || ''}
                        onChange={(e) => setFormData({ ...formData, socialFacebook: e.target.value })}
                        placeholder="https://facebook.com/perfectmason"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-semibold text-slate-600">
                        LinkedIn Company URL
                      </label>
                      <input
                        type="url"
                        value={formData.socialLinkedin || ''}
                        onChange={(e) => setFormData({ ...formData, socialLinkedin: e.target.value })}
                        placeholder="https://linkedin.com/company/perfectmason"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-semibold text-slate-600">
                        Twitter / X Profile URL
                      </label>
                      <input
                        type="url"
                        value={formData.socialTwitter || ''}
                        onChange={(e) => setFormData({ ...formData, socialTwitter: e.target.value })}
                        placeholder="https://x.com/perfectmason"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-semibold text-slate-600">
                        YouTube Channel URL
                      </label>
                      <input
                        type="url"
                        value={formData.socialYoutube || ''}
                        onChange={(e) => setFormData({ ...formData, socialYoutube: e.target.value })}
                        placeholder="https://youtube.com/@perfectmason"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* GROUP 3: BRANDING & APPEARANCE                                          */}
          {/* ======================================================================= */}
          {(activeTab === 'branding' || activeTab === 'all') && (
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-950 font-sans tracking-tight">
                      3. Branding & Appearance Controls
                    </h2>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">
                      Brand color palette, typography font pairings, default public banner, and footer copyright text.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  DESIGN SYSTEM
                </span>
              </div>

              {/* Color Pickers Strip */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Primary & Secondary Brand Colors
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">CSS Root Variables</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Primary Brand Color */}
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Primary Brand Color</span>
                      <span className="font-mono text-xs font-bold text-slate-700">{formData.primaryColor || '#1d4ed8'}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.primaryColor || '#1d4ed8'}
                        onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                        className="w-12 h-12 rounded-xl cursor-pointer border border-slate-200 p-0.5 bg-white"
                      />
                      <input
                        type="text"
                        value={formData.primaryColor || '#1d4ed8'}
                        onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                        placeholder="#1d4ed8"
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">Used for primary action buttons, active navigation states, and key highlights.</p>
                  </div>

                  {/* Secondary Brand Color */}
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Secondary Accent Color</span>
                      <span className="font-mono text-xs font-bold text-slate-700">{formData.secondaryColor || '#d97706'}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.secondaryColor || '#d97706'}
                        onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                        className="w-12 h-12 rounded-xl cursor-pointer border border-slate-200 p-0.5 bg-white"
                      />
                      <input
                        type="text"
                        value={formData.secondaryColor || '#d97706'}
                        onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                        placeholder="#d97706"
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">Used for badges, secondary accents, metric counters, and status indicators.</p>
                  </div>
                </div>

                {/* Preset Palettes Quick Click */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-semibold text-slate-500">Quick Architectural Palettes:</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {architecturalPresets.map((palette) => (
                      <button
                        key={palette.label}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            primaryColor: palette.primary,
                            secondaryColor: palette.secondary,
                          })
                        }
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: palette.primary }}
                        />
                        <span
                          className="w-3 h-3 rounded-full border border-black/10 -ml-1"
                          style={{ backgroundColor: palette.secondary }}
                        />
                        <span>{palette.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Typography Preferences */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Type className="w-4 h-4 text-slate-600" />
                    <span>Typography Font Preferences</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">Google Fonts Loaded</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Headings & Display Typography
                    </label>
                    <select
                      value={formData.fontHeading || 'Plus Jakarta Sans'}
                      onChange={(e) => setFormData({ ...formData, fontHeading: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none bg-white cursor-pointer"
                    >
                      <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Corporate Executive)</option>
                      <option value="Barlow Condensed">Barlow Condensed (Architectural Blueprint)</option>
                      <option value="Outfit">Outfit (Geometric Contemporary)</option>
                      <option value="Cinzel">Cinzel (Luxury Classical Masonry)</option>
                      <option value="Cormorant Garamond">Cormorant Garamond (Editorial Serif Elegance)</option>
                      <option value="IBM Plex Sans">IBM Plex Sans (Industrial Engineering)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Body & Interface Typography
                    </label>
                    <select
                      value={formData.fontBody || 'Inter'}
                      onChange={(e) => setFormData({ ...formData, fontBody: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none bg-white cursor-pointer"
                    >
                      <option value="Inter">Inter (Ultra-Legible Enterprise Sans)</option>
                      <option value="IBM Plex Sans">IBM Plex Sans (Precision Technical Sans)</option>
                      <option value="Plus Jakarta Sans">Plus Jakarta Sans (Consistent Clean Line)</option>
                      <option value="Outfit">Outfit (Airy Open Geometry)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Default Banner Image */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Default Public Banner & Footer Cinematic Backdrop
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">High-Resolution Render / Photo</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-28 h-18 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-2xs">
                    {formData.defaultBannerImage ? (
                      <img
                        src={formData.defaultBannerImage}
                        alt="Banner Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-300" />
                    )}
                  </div>

                  <div className="space-y-2 flex-1 min-w-0">
                    <input
                      type="text"
                      value={formData.defaultBannerImage || ''}
                      onChange={(e) => setFormData({ ...formData, defaultBannerImage: e.target.value })}
                      placeholder="/assets/cinematic_grand_estate.jpg"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    />

                    <div className="flex items-center gap-2 flex-wrap">
                      <input
                        ref={bannerInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0], 'defaultBannerImage', 'general');
                          }
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => bannerInputRef.current?.click()}
                        disabled={uploadingTarget === 'defaultBannerImage'}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                      >
                        <Upload className="w-3 h-3" />
                        <span>{uploadingTarget === 'defaultBannerImage' ? `Uploading ${uploadProgress}%` : 'Upload Banner'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCatalogModalTarget('defaultBannerImage')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Choose From Catalog</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, defaultBannerImage: '/assets/cinematic_grand_estate.jpg' })}
                        className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
                      >
                        Reset Default
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Settings */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-600" />
                  <span>Public Footer Configuration</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Footer Copyright Text
                    </label>
                    <input
                      type="text"
                      value={formData.footerCopyright || ''}
                      onChange={(e) => setFormData({ ...formData, footerCopyright: e.target.value })}
                      placeholder="© 2026 Perfect Mason. All rights reserved."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Footer Quality & Registration Badge
                    </label>
                    <input
                      type="text"
                      value={formData.footerBadge || ''}
                      onChange={(e) => setFormData({ ...formData, footerBadge: e.target.value })}
                      placeholder="ISO 9001:2015 CERTIFIED • HIGH-PRECISION ENGINEERING"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Footer Legal / Built-With Note
                    </label>
                    <input
                      type="text"
                      value={formData.footerLegalNote || ''}
                      onChange={(e) => setFormData({ ...formData, footerLegalNote: e.target.value })}
                      placeholder="Built with engineering precision & integrity."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Footer Narrative Description
                    </label>
                    <textarea
                      rows={2}
                      value={formData.footerDescription || ''}
                      onChange={(e) => setFormData({ ...formData, footerDescription: e.target.value })}
                      placeholder="Civil engineering, turnkey construction, commercial complexes, luxury residences & interior fit-outs led by certified civil engineering directors."
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* GROUP 4: PRESERVED HERO BANNER COPY & KEY METRICS                       */}
          {/* ======================================================================= */}
          {(activeTab === 'hero-metrics' || activeTab === 'all') && (
            <div className="space-y-8">
              {/* Homepage Hero Banner Copy */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-950 font-sans tracking-tight">
                      Homepage Hero Banner Copy
                    </h2>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">
                      The primary headline and trust certifications displayed upon visiting the homepage.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Top Certification Pill Badge
                    </label>
                    <input
                      type="text"
                      value={formData.heroBadge}
                      onChange={(e) => setFormData({ ...formData, heroBadge: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Hero Main Headline *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.heroHeadline}
                      onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans font-bold text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Hero Sub-Headline / Supporting Paragraph *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.heroSubheadline}
                      onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Proven Credentials & Metrics */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-950 font-sans tracking-tight">
                      Company Metrics & Key Statistics
                    </h2>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">
                      Quantifiable performance metrics showcased across trust dashboards and hero counters.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Years Experience
                    </label>
                    <input
                      type="text"
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      placeholder="18+"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-900 text-center focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Projects Delivered
                    </label>
                    <input
                      type="text"
                      value={formData.projectsCompleted}
                      onChange={(e) => setFormData({ ...formData, projectsCompleted: e.target.value })}
                      placeholder="150+"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-900 text-center focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Sq.Ft Delivered
                    </label>
                    <input
                      type="text"
                      value={formData.sqftDelivered}
                      onChange={(e) => setFormData({ ...formData, sqftDelivered: e.target.value })}
                      placeholder="1.5M+"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-900 text-center focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      On-Time Rate %
                    </label>
                    <input
                      type="text"
                      value={formData.onTimeDeliveryRate}
                      onChange={(e) => setFormData({ ...formData, onTimeDeliveryRate: e.target.value })}
                      placeholder="99.4%"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-900 text-center focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Client Satisfaction
                    </label>
                    <input
                      type="text"
                      value={formData.clientSatisfactionRate}
                      onChange={(e) => setFormData({ ...formData, clientSatisfactionRate: e.target.value })}
                      placeholder="100%"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-900 text-center focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* STICKY SAVE / DISCARD BAR                                              */}
          {/* ======================================================================= */}
          <div className="sticky bottom-6 z-20 bg-white/95 backdrop-blur-md border border-slate-200/90 p-4 rounded-2xl shadow-lg flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {hasChanges ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Unsaved changes pending
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  All settings up to date with live database
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                disabled={!hasChanges || isSaving}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Discard Changes</span>
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-black active:scale-95 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-slate-950/20"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Saving to Database...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-white" />
                    <span>Save & Publish Live</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* ========================================================================= */}
        {/* 4. MEDIA CATALOG PICKER MODAL                                             */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {catalogModalTarget && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-950 font-sans">
                      Select Architectural Asset from Media Catalog
                    </h3>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">
                      Target field: <span className="font-mono font-bold text-blue-600">{catalogModalTarget}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCatalogModalTarget(null)}
                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Search & Categories */}
                <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={catalogSearch}
                      onChange={(e) => setCatalogSearch(e.target.value)}
                      placeholder="Search renders, villas, offices..."
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    {['All', 'Residential', 'Commercial', 'Turnkey', 'Interiors'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCatalogCategory(cat)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                          catalogCategory === cat
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Modal Media Grid */}
                <div className="p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredCatalog.map((asset) => (
                    <div
                      key={asset.id}
                      onClick={() => selectCatalogAsset(asset)}
                      className="group relative rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:border-blue-500 hover:shadow-md transition-all bg-white flex flex-col justify-between"
                    >
                      <div className="aspect-4/3 w-full bg-slate-100 overflow-hidden">
                        <img
                          src={asset.url}
                          alt={asset.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-2.5">
                        <div className="text-[11px] font-bold text-slate-900 truncate">
                          {asset.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {asset.category}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};
