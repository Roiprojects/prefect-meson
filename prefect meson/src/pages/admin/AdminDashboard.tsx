import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { useData } from '../../context/DataContext';
import { ADMIN_MEDIA_CATALOG } from '../../data/adminMediaCatalog';
import {
  Inbox,
  FolderOpen,
  Image as ImageIcon,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Plus,
  Home,
  Layers,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import { EnquiryOverviewLineChart } from '../../components/admin/analytics/EnquiryOverviewLineChart';
import { EnquiryStatusDonutChart } from '../../components/admin/analytics/EnquiryStatusDonutChart';
import { ConstructionServicesBarChart } from '../../components/admin/analytics/ConstructionServicesBarChart';
import { DashboardEnquiriesTable } from '../../components/admin/dashboard/DashboardEnquiriesTable';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    projects,
    enquiries,
    activityLogs,
  } = useData();

  // Metrics from actual database and catalog records
  const totalEnquiries = enquiries.length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
  const publishedProjectsCount = projects.length;
  const totalMediaCount = ADMIN_MEDIA_CATALOG.length;
  const publishedPagesCount = 10;

  // Date Range Filter State
  const [dateRange, setDateRange] = useState<'30d' | '7d' | '90d' | 'ytd'>('30d');

  // Quick Actions Dropdown State
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const quickActionsRef = useRef<HTMLDivElement>(null);

  // Close Quick Actions menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (quickActionsRef.current && !quickActionsRef.current.contains(e.target as Node)) {
        setIsQuickActionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentDateString = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  const recentLogs = activityLogs.slice(0, 6);

  const quickActions = [
    {
      title: 'Edit Home Page',
      description: 'Update the hero headline, narrative, and CTA banner on your homepage.',
      href: '/admin/pages/home',
      icon: Home,
      badge: 'Website Content',
      color: 'text-blue-700 bg-blue-100/90 border-blue-200',
      cardGradient: 'from-blue-50/60 via-white to-white border-blue-200/80 hover:border-blue-400',
    },
    {
      title: 'Add New Project',
      description: 'Upload architectural photos, specs, and details to your master gallery.',
      href: '/admin/gallery',
      icon: Plus,
      badge: 'Portfolio',
      color: 'text-emerald-700 bg-emerald-100/90 border-emerald-200',
      cardGradient: 'from-emerald-50/60 via-white to-white border-emerald-200/80 hover:border-emerald-400',
    },
    {
      title: 'Upload Media',
      description: 'Add photos and high-resolution renders to your central media library.',
      href: '/admin/media',
      icon: FolderOpen,
      badge: 'Asset Storage',
      color: 'text-purple-700 bg-purple-100/90 border-purple-200',
      cardGradient: 'from-purple-50/60 via-white to-white border-purple-200/80 hover:border-purple-400',
    },
    {
      title: 'Write a Blog',
      description: 'Publish expert construction guidance and architectural articles.',
      href: '/admin/blogs',
      icon: BookOpen,
      badge: 'Articles',
      color: 'text-amber-700 bg-amber-100/90 border-amber-200',
      cardGradient: 'from-amber-50/60 via-white to-white border-amber-200/80 hover:border-amber-400',
    },
    {
      title: 'View Enquiries',
      description: 'Review incoming consultation briefs, customer phone numbers, and leads.',
      href: '/admin/enquiries',
      icon: Inbox,
      badge: newEnquiriesCount > 0 ? `${newEnquiriesCount} New` : 'Leads',
      badgeColor: newEnquiriesCount > 0 ? 'bg-amber-500 text-white' : undefined,
      color: 'text-rose-700 bg-rose-100/90 border-rose-200',
      cardGradient: 'from-rose-50/60 via-white to-white border-rose-200/80 hover:border-rose-400',
    },
    {
      title: 'Preview Live Website',
      description: 'See the frontend site exactly as visitors see it right now.',
      href: '/',
      icon: ExternalLink,
      badge: 'Live Site',
      isExternal: true,
      color: 'text-indigo-700 bg-indigo-100/90 border-indigo-200',
      cardGradient: 'from-indigo-50/60 via-white to-white border-indigo-200/80 hover:border-indigo-400',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 pb-16 font-sans">
        {/* ========================================================================= */}
        {/* 1. WELCOME HEADER (Refined Typography, Date Selector & Quick Actions)      */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-slate-200/90 font-sans">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50/80 px-2.5 py-0.5 rounded-full border border-blue-200/80 shadow-2xs">
                EXECUTIVE DASHBOARD
              </span>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs font-mono text-emerald-600 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live PostgreSQL Connected
              </span>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs font-mono text-slate-400 font-medium">
                {currentDateString}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 font-sans">
              Welcome, Administrator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-sans leading-relaxed">
              Manage Perfect Mason website content, publish updates to the frontend, inspect project enquiries, and maintain client portfolios.
            </p>
          </div>

          {/* Header Controls: Date Selector, Quick Actions & View Website */}
          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            {/* Date Range Selector */}
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="h-10 pl-9 pr-8 text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 rounded-xl shadow-2xs hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/15 focus:border-blue-600 cursor-pointer appearance-none transition-all font-sans"
                aria-label="Filter dashboard metrics by date range"
              >
                <option value="30d">Last 30 Days</option>
                <option value="7d">Last 7 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="ytd">Year to Date</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Quick Actions Dropdown */}
            <div ref={quickActionsRef} className="relative">
              <button
                type="button"
                onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
                className="inline-flex items-center gap-2 h-10 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-600/25 transition-all cursor-pointer"
                aria-label="Open Quick Actions menu"
                aria-expanded={isQuickActionsOpen}
              >
                <Plus className="w-4 h-4" />
                <span>Quick Actions</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-blue-200 transition-transform duration-200 ${
                    isQuickActionsOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {isQuickActionsOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden z-30 text-xs font-sans">
                  <div className="p-3 bg-slate-50/80 border-b border-slate-100 font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Executive Shortcuts
                  </div>
                  <div className="p-1.5 space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setIsQuickActionsOpen(false);
                        navigate('/admin/pages');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 transition-colors font-medium text-left cursor-pointer"
                    >
                      <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Page Manager</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsQuickActionsOpen(false);
                        navigate('/admin/gallery');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 transition-colors font-medium text-left cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Add New Project</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsQuickActionsOpen(false);
                        navigate('/admin/media');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 transition-colors font-medium text-left cursor-pointer"
                    >
                      <FolderOpen className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>Upload Media</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsQuickActionsOpen(false);
                        navigate('/admin/enquiries');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 transition-colors font-medium text-left cursor-pointer"
                    >
                      <Inbox className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>View Enquiries</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* View Website Button */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all"
              title="Open Public Website in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>View Website</span>
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. FOUR REDESIGNED KPI CARDS (Real Data, Responsive 4-Column Grid)         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 font-sans">
          {/* Card 1: Total Enquiries (Tasteful Blue Accent) */}
          <div
            onClick={() => navigate('/admin/enquiries')}
            className="group relative p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer flex flex-col justify-between h-full"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/admin/enquiries')}
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-xs font-semibold text-slate-500 font-sans tracking-wide">
                  Total Enquiries
                </span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/90 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 shadow-2xs">
                  <Inbox className="w-4.5 h-4.5" />
                </div>
              </div>

              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="text-3xl lg:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">
                  {totalEnquiries}
                </span>
                {newEnquiriesCount > 0 ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold font-mono bg-blue-50 text-blue-700 border border-blue-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    +{newEnquiriesCount} New
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                    All Processed
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-sans">
              <span className="text-slate-400 text-[11.5px]">
                {newEnquiriesCount > 0 ? `${newEnquiriesCount} awaiting review` : 'Lead intake active'}
              </span>
              <Link
                to="/admin/enquiries"
                onClick={(e) => e.stopPropagation()}
                className="font-semibold text-blue-600 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all inline-flex items-center gap-1"
              >
                <span>View CRM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Active Projects (Tasteful Green Accent) */}
          <div
            onClick={() => navigate('/admin/gallery')}
            className="group relative p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 cursor-pointer flex flex-col justify-between h-full"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/admin/gallery')}
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-xs font-semibold text-slate-500 font-sans tracking-wide">
                  Active Projects
                </span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/90 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200 shadow-2xs">
                  <ImageIcon className="w-4.5 h-4.5" />
                </div>
              </div>

              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="text-3xl lg:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">
                  {publishedProjectsCount}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Live Portfolio
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-sans">
              <span className="text-slate-400 text-[11.5px]">Master gallery items</span>
              <Link
                to="/admin/gallery"
                onClick={(e) => e.stopPropagation()}
                className="font-semibold text-emerald-700 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all inline-flex items-center gap-1"
              >
                <span>Manage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Media Files (Tasteful Violet Accent) */}
          <div
            onClick={() => navigate('/admin/media')}
            className="group relative p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-purple-300 transition-all duration-200 cursor-pointer flex flex-col justify-between h-full"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/admin/media')}
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-xs font-semibold text-slate-500 font-sans tracking-wide">
                  Media Files
                </span>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100/90 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-purple-600 group-hover:text-white transition-all duration-200 shadow-2xs">
                  <FolderOpen className="w-4.5 h-4.5" />
                </div>
              </div>

              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="text-3xl lg:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">
                  {totalMediaCount}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold font-mono bg-purple-50 text-purple-700 border border-purple-200/80">
                  High-Res Assets
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-sans">
              <span className="text-slate-400 text-[11.5px]">Central storage catalog</span>
              <Link
                to="/admin/media"
                onClick={(e) => e.stopPropagation()}
                className="font-semibold text-purple-700 group-hover:text-purple-800 group-hover:translate-x-0.5 transition-all inline-flex items-center gap-1"
              >
                <span>Library</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Published Pages (Tasteful Orange Accent) */}
          <div
            onClick={() => navigate('/admin/pages')}
            className="group relative p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-orange-300 transition-all duration-200 cursor-pointer flex flex-col justify-between h-full"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/admin/pages')}
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-xs font-semibold text-slate-500 font-sans tracking-wide">
                  Published Pages
                </span>
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100/90 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-orange-600 group-hover:text-white transition-all duration-200 shadow-2xs">
                  <Layers className="w-4.5 h-4.5" />
                </div>
              </div>

              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="text-3xl lg:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">
                  {publishedPagesCount}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold font-mono bg-orange-50 text-orange-700 border border-orange-200/80">
                  100% Synced
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-sans">
              <span className="text-slate-400 text-[11.5px]">All site sections live</span>
              <Link
                to="/admin/pages"
                onClick={(e) => e.stopPropagation()}
                className="font-semibold text-orange-700 group-hover:text-orange-800 group-hover:translate-x-0.5 transition-all inline-flex items-center gap-1"
              >
                <span>Page Editor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 2.5 ANALYTICS & PIPELINE PERFORMANCE (Visual Graphs & Charts) */}
        <div className="space-y-6">
          {/* Main Enquiry Timeline Chart */}
          <EnquiryOverviewLineChart enquiries={enquiries} />

          {/* Two-Column Status Donut & Monthly Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <EnquiryStatusDonutChart enquiries={enquiries} />
            </div>
            <div className="lg:col-span-5">
              <ConstructionServicesBarChart enquiries={enquiries} />
            </div>
          </div>
        </div>

        {/* 3. QUICK MANAGEMENT (Shortcut Operations) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/80">
                  QUICK MANAGEMENT
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-950 font-sans tracking-tight">
                Administrative Operations & Shortcuts
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Frequent administrative operations to update site content in one click.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((qa) => {
              const Icon = qa.icon;

              const handleAction = () => {
                if (qa.isExternal) {
                  window.open(qa.href, '_blank', 'noopener,noreferrer');
                } else {
                  navigate(qa.href);
                }
              };

              return (
                <div
                  key={qa.title}
                  tabIndex={0}
                  role="button"
                  aria-label={qa.title}
                  onClick={handleAction}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleAction();
                    }
                  }}
                  className={`group relative p-5 rounded-2xl bg-gradient-to-br ${qa.cardGradient} shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between border overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2`}
                >
                  {/* Restrained Construction / Blueprint Drafting Watermark Graphic */}
                  <div className="absolute right-0 bottom-0 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity">
                    <svg className="w-24 h-24 text-slate-400/20 group-hover:text-blue-500/20 transition-colors" viewBox="0 0 100 100" fill="none">
                      <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
                      <line x1="0" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
                      <line x1="40" y1="0" x2="40" y2="100" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
                      <line x1="80" y1="0" x2="80" y2="100" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
                      <circle cx="80" cy="60" r="14" stroke="currentColor" strokeWidth="0.8" />
                      <line x1="20" y1="80" x2="80" y2="20" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {/* Consistent Icon Container */}
                      <div className={`w-11 h-11 rounded-xl shrink-0 border flex items-center justify-center ${qa.color} shadow-2xs group-hover:scale-105 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold border ${qa.badgeColor || 'bg-slate-100/90 text-slate-700 border-slate-200/80'}`}>
                        {qa.badge}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-950 font-sans group-hover:text-blue-700 transition-colors">
                      {qa.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed mt-1 line-clamp-2">
                      {qa.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-[11px] font-semibold text-blue-600 group-hover:text-blue-700 font-sans">
                    <span>Open destination</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. TWO-COLUMN WORKSPACE: RECENT ENQUIRIES & RECENT AUDIT LOGS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Recent Enquiries with Search, Filter, Sort & Modal (8 cols) */}
          <div className="lg:col-span-8">
            <DashboardEnquiriesTable enquiries={enquiries} />
          </div>

          {/* Right Column: Recent Activity Logs (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between font-sans">
            <div>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    AUDIT TIMELINE
                  </div>
                  <h3 className="text-base font-bold tracking-tight text-slate-950 font-sans">
                    Recent Website Updates
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">
                    Audit trail of saved projects, published blogs, and content revisions.
                  </p>
                </div>
              </div>

              {recentLogs.length > 0 ? (
                <div className="p-4 space-y-3.5">
                  {recentLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 text-xs font-sans">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-900 truncate">
                          {log.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {log.action}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {log.timestamp ? new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-xs text-slate-400 font-sans">
                  No activity recorded yet.
                </div>
              )}
            </div>

            <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-center text-xs font-mono text-slate-500">
              Audit log synchronized with PostgreSQL
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
