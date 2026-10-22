import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import {
  Layers,
  Home,
  Info,
  Building2,
  Briefcase,
  Palette,
  Image as ImageIcon,
  Star,
  PhoneCall,
  PanelTop,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Search,
  X,
  FileCheck,
  FileEdit,
  Database,
  Filter,
  RotateCcw,
  Eye,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface PageCard {
  id: string;
  title: string;
  category: 'Core Pages' | 'Service Lines' | 'Portfolio & Social' | 'Global Elements';
  route: string;
  editUrl: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  sections: string[];
  status: 'Published' | 'Draft';
  hasDraft?: boolean;
  lastUpdated: string;
  itemsBadge?: string;
}

export const AdminPagesManager: React.FC = () => {
  const navigate = useNavigate();
  const {
    pageContents,
    updatePageContent,
    projects,
    commercialItems,
    residentialItems,
    turnkeyItems,
    interiorItems,
    reviews,
  } = useData();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Published' | 'Draft'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  // Format real timestamps from PostgreSQL or context
  const formatLastUpdated = (dateString?: string) => {
    if (!dateString) return 'Live Synced';
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return 'Live Synced';
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Live Synced';
    }
  };

  // Complete list of all 10 authentic website pages and editors
  const pages: PageCard[] = [
    {
      id: 'home',
      title: 'Home Page',
      category: 'Core Pages',
      route: '/',
      editUrl: '/admin/pages/home',
      icon: Home,
      description: 'Hero headline, credibility badge, company intro narrative, corporate metrics, trust badges, and CTA banner.',
      sections: ['Hero Headline', 'Company Intro', 'Corporate Stats', 'Manifesto', 'CTA Banner', 'SEO'],
      status: (pageContents?.home?.status as 'Published' | 'Draft') || 'Published',
      hasDraft: Boolean(pageContents?.home?.hasDraft || pageContents?.home?.draftData),
      lastUpdated: formatLastUpdated(pageContents?.home?.updatedAt),
      itemsBadge: '6 Sections',
    },
    {
      id: 'about',
      title: 'About Us',
      category: 'Core Pages',
      route: '/about-us',
      editUrl: '/admin/pages/about',
      icon: Info,
      description: 'Practice foundations, vision, mission statements, core engineering values, leadership text, and collaboration CTA.',
      sections: ['Hero Section', 'Practice Overview', 'Vision & Mission', 'Core Values', 'Collaboration CTA', 'SEO'],
      status: (pageContents?.about?.status as 'Published' | 'Draft') || 'Published',
      hasDraft: Boolean(pageContents?.about?.hasDraft || pageContents?.about?.draftData),
      lastUpdated: formatLastUpdated(pageContents?.about?.updatedAt),
      itemsBadge: '6 Sections',
    },
    {
      id: 'commercial',
      title: 'Commercial Construction',
      category: 'Service Lines',
      route: '/commercial-construction',
      editUrl: '/admin/commercial',
      icon: Building2,
      description: 'G+4 commercial complexes, retail flagship showrooms, PEB industrial builds, and itemized BOQ capabilities.',
      sections: ['Project Packages', 'Technical Scope', 'Capabilities', 'Galleries', 'Consultation CTA'],
      status: (pageContents?.commercial?.status as 'Published' | 'Draft') || 'Published',
      lastUpdated: formatLastUpdated(pageContents?.commercial?.updatedAt),
      itemsBadge: `${commercialItems?.length || 4} Packages`,
    },
    {
      id: 'residential',
      title: 'Residential Construction',
      category: 'Service Lines',
      route: '/residential-construction',
      editUrl: '/admin/residential',
      icon: Home,
      description: 'Luxury contemporary villas, duplexes, multi-storey residences, and turnkey residential packages.',
      sections: ['Villa Packages', 'Technical Specs', 'Pricing / SqFt', 'Galleries', 'Consultation CTA'],
      status: (pageContents?.residential?.status as 'Published' | 'Draft') || 'Published',
      lastUpdated: formatLastUpdated(pageContents?.residential?.updatedAt),
      itemsBadge: `${residentialItems?.length || 3} Villa Packages`,
    },
    {
      id: 'turnkey',
      title: 'Turnkey Projects',
      category: 'Service Lines',
      route: '/turnkey-project-execution',
      editUrl: '/admin/turnkey',
      icon: Briefcase,
      description: '5-stage turnkey lifecycle (Consultation -> Engineering -> Civil -> MEP -> Interiors) and milestone handovers.',
      sections: ['5-Stage Process', 'Deliverables', 'Milestones', 'Galleries', 'Warranty Brief'],
      status: (pageContents?.turnkey?.status as 'Published' | 'Draft') || 'Published',
      lastUpdated: formatLastUpdated(pageContents?.turnkey?.updatedAt),
      itemsBadge: `${turnkeyItems?.length || 5} Lifecycle Stages`,
    },
    {
      id: 'interiors',
      title: 'Interiors',
      category: 'Service Lines',
      route: '/interiors',
      editUrl: '/admin/interiors',
      icon: Palette,
      description: 'Architectural joinery, Italian marble fit-outs, modular kitchens with Blum hardware, and turnkey styling.',
      sections: ['Space Types', 'Materials', 'Joinery Features', 'Galleries', 'Snagging Protocol'],
      status: (pageContents?.interiors?.status as 'Published' | 'Draft') || 'Published',
      lastUpdated: formatLastUpdated(pageContents?.interiors?.updatedAt),
      itemsBadge: `${interiorItems?.length || 4} Space Types`,
    },
    {
      id: 'gallery',
      title: 'Gallery & Projects',
      category: 'Portfolio & Social',
      route: '/gallery',
      editUrl: '/admin/gallery',
      icon: ImageIcon,
      description: 'Full architectural portfolio catalog, project photography, completion status badges, and project details.',
      sections: ['Projects Grid', 'Secondary Tags', 'Hero & Gallery Images', 'Specs', 'Architect Credits'],
      status: (pageContents?.gallery?.status as 'Published' | 'Draft') || 'Published',
      lastUpdated: formatLastUpdated(pageContents?.gallery?.updatedAt),
      itemsBadge: `${projects?.length || 12} Showcase Works`,
    },
    {
      id: 'testimonials',
      title: 'Testimonials & Reviews',
      category: 'Portfolio & Social',
      route: '/testimonials',
      editUrl: '/admin/testimonials',
      icon: Star,
      description: 'Client reviews, star ratings, verified client locations, quotes, and featured client story.',
      sections: ['Standard Reviews', 'Featured Client Story', 'Star Ratings', 'Review Avatars'],
      status: (pageContents?.testimonials?.status as 'Published' | 'Draft') || 'Published',
      lastUpdated: formatLastUpdated(pageContents?.testimonials?.updatedAt),
      itemsBadge: `${reviews?.length || 5} Verified Reviews`,
    },
    {
      id: 'contact',
      title: 'Contact Page',
      category: 'Core Pages',
      route: '/contact-us',
      editUrl: '/admin/pages/contact',
      icon: PhoneCall,
      description: 'Verified phone numbers, WhatsApp, official office address, landmark, working hours, and consultation intake.',
      sections: ['Hero & Taglines', 'Verified Contacts', 'Office Location', 'Consultation Steps', 'SEO'],
      status: (pageContents?.contact?.status as 'Published' | 'Draft') || 'Published',
      hasDraft: Boolean(pageContents?.contact?.hasDraft || pageContents?.contact?.draftData),
      lastUpdated: formatLastUpdated(pageContents?.contact?.updatedAt),
      itemsBadge: '5 Intake Channels',
    },
    {
      id: 'header-footer',
      title: 'Header & Footer',
      category: 'Global Elements',
      route: '/',
      editUrl: '/admin/pages/header-footer',
      icon: PanelTop,
      description: 'Global site elements: top navigation bar, contact phone, quote button, verified footer info, and legal copyright.',
      sections: ['Navbar Elements', 'Footer Brand Info', 'Verified Contacts', 'Social Media Links', 'Copyright'],
      status: (pageContents?.['header-footer']?.status as 'Published' | 'Draft') || 'Published',
      hasDraft: Boolean(pageContents?.['header-footer']?.hasDraft || pageContents?.['header-footer']?.draftData),
      lastUpdated: formatLastUpdated(pageContents?.['header-footer']?.updatedAt),
      itemsBadge: 'Global Framework',
    },
  ];

  // Quick publication status toggle connected directly to PostgreSQL
  const handleToggleStatus = (p: PageCard) => {
    const nextStatus = p.status === 'Published' ? 'Draft' : 'Published';
    const currentData = pageContents?.[p.id] || {};
    updatePageContent(p.id, p.title, currentData, nextStatus);
    setStatusFeedback(`"${p.title}" status updated to ${nextStatus}`);
    setTimeout(() => setStatusFeedback(null), 3500);
  };

  // Filtered and searched pages
  const filteredPages = useMemo(() => {
    return pages.filter((p) => {
      // 1. Status Filter
      if (selectedStatus !== 'All' && p.status !== selectedStatus) {
        return false;
      }
      // 2. Category Filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesRoute = p.route.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesSections = p.sections.some((s) => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesRoute && !matchesDesc && !matchesSections) {
          return false;
        }
      }
      return true;
    });
  }, [pages, selectedStatus, selectedCategory, searchQuery]);

  // Derived KPI metrics
  const totalCount = pages.length;
  const publishedCount = pages.filter((p) => p.status === 'Published').length;
  const draftCount = pages.filter((p) => p.status === 'Draft').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Toast Feedback Notification */}
        {statusFeedback && (
          <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-sans animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusFeedback}</span>
          </div>
        )}

        {/* 1. Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-2 rounded-xl bg-blue-100 text-blue-700 shadow-2xs">
                <Layers className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-bold text-slate-950 font-sans tracking-tight">
                Website Pages Manager
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl leading-relaxed">
              Overview and editorial control of all public-facing website sections, service pages, and portfolio showcases. Changes can be saved as drafts or published directly to the live website.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-medium text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{publishedCount} of {totalCount} Live</span>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-600/30 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Website</span>
            </a>
          </div>
        </div>

        {/* 2. Executive KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 font-sans uppercase tracking-wider block mb-1">
                Total Pages
              </span>
              <span className="text-2xl font-extrabold text-slate-950 font-sans">{totalCount}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 font-sans uppercase tracking-wider block mb-1">
                Published
              </span>
              <span className="text-2xl font-extrabold text-emerald-600 font-sans">{publishedCount}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 font-sans uppercase tracking-wider block mb-1">
                Drafts
              </span>
              <span className="text-2xl font-extrabold text-amber-600 font-sans">{draftCount}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <FileEdit className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 font-sans uppercase tracking-wider block mb-1">
                Database Sync
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                PostgreSQL
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 3. Search and Filtering Controls Bar */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pages by title, route, or section keywords..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0 self-start md:self-auto text-xs">
              <button
                type="button"
                onClick={() => setSelectedStatus('All')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedStatus === 'All'
                    ? 'bg-white text-slate-950 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({totalCount})
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus('Published')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  selectedStatus === 'Published'
                    ? 'bg-white text-emerald-700 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Published ({publishedCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus('Draft')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  selectedStatus === 'Draft'
                    ? 'bg-white text-amber-700 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Drafts ({draftCount})</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills and Result Counter */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 font-semibold mr-1">
                <Filter className="w-3 h-3" />
                <span>Category:</span>
              </span>
              {['All', 'Core Pages', 'Service Lines', 'Portfolio & Social', 'Global Elements'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-[11px] font-mono text-slate-400">
              Showing {filteredPages.length} of {totalCount} pages
            </div>
          </div>
        </div>

        {/* 4. Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPages.map((p) => {
            const Icon = p.icon;
            const isPublished = p.status === 'Published';

            return (
              <div
                key={p.id}
                className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Top Row: Icon, Title, Route & Status */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-base font-bold text-slate-900 font-sans group-hover:text-blue-700 transition-colors truncate">
                          {p.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-[11px] text-slate-400 font-medium">
                            {p.route}
                          </span>
                          {p.itemsBadge && (
                            <span className="font-mono text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                              {p.itemsBadge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {p.hasDraft && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-amber-50 text-amber-800 border border-amber-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          <span>Draft Available</span>
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(p)}
                        title={`Click to switch to ${isPublished ? 'Draft' : 'Published'}`}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold font-mono border transition-all cursor-pointer ${
                          isPublished
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isPublished ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                        <span>{p.status}</span>
                      </button>
                    </div>
                  </div>

                  {/* Narrative Description */}
                  <p className="text-xs text-slate-600 font-sans leading-relaxed mb-4">
                    {p.description}
                  </p>

                  {/* Section Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.sections.map((sec) => (
                      <span
                        key={sec}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium font-mono border border-slate-200/50"
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
                    <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>Updated: {p.lastUpdated}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Preview Button */}
                    {['home', 'about', 'contact', 'header-footer'].includes(p.id) ? (
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/preview/${p.id}`)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:text-blue-700 hover:bg-blue-50/70 hover:border-blue-200 transition-colors font-medium text-xs shadow-2xs cursor-pointer"
                        title="Interactive Device Preview"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Preview</span>
                      </button>
                    ) : (
                      <a
                        href={p.route}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:text-blue-700 hover:bg-blue-50/70 hover:border-blue-200 transition-colors font-medium text-xs shadow-2xs cursor-pointer"
                        title="Preview live public section"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                        <span>Preview</span>
                      </a>
                    )}

                    {/* Edit Content Button */}
                    <button
                      type="button"
                      onClick={() => navigate(p.editUrl)}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs shadow-blue-600/20 transition-all cursor-pointer"
                      title="Edit this section's content"
                    >
                      <span>Edit Content</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5. Empty State when filters return 0 results */}
        {filteredPages.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 font-sans">No pages match your criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No pages found matching &ldquo;{searchQuery}&rdquo; with the selected status. Try searching for something else or reset the filters.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('All');
                setSelectedCategory('All');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
