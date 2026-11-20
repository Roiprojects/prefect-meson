import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Edit2,
  Briefcase,
  X,
  Search,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Loader2,
  Building,
} from 'lucide-react';
import { useData, CommercialItem } from '../../context/DataContext';
import { AdminLayout } from './AdminLayout';
import { ImageUploadPicker } from '../../components/admin/ImageUploadPicker';

const COMMERCIAL_CATEGORIES = [
  'Item Rate End to End Services',
  'Shell Only Package',
  'Any One Individual Service',
  'Industrial Shed Construction',
  'Corporate Office Spaces',
  'Restaurant & Hospitality',
];

export const AdminCommercial: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { commercialItems, addCommercialItem, updateCommercialItem, deleteCommercialItem, resetMasterCatalog } = useData();
  const [syncNotice, setSyncNotice] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState<boolean>(searchParams.get('action') === 'create');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Item Rate End to End Services',
    tagline: '',
    description: '',
    heroImage: '/assets/comm_complex_hero.jpg',
    galleryImages: [
      '/assets/comm_complex_hero.jpg',
      '/assets/comm_office_hero.jpg',
      '/assets/service_commercial_corp.jpg',
    ],
    capabilitiesText: '100% Itemized BOQ Billing Transparency\nSenior Civil & Structural Oversight\nIntegrated MEP & HVAC Infrastructure\nMunicipal Approvals & Occupancy Certificate',
    scopeText: 'Site analysis, soil testing and earthwork excavation.\nRCC superstructure with high-grade concrete mix.\nUnitized glass facade installation and commissioning.',
    client: '',
    architect: '',
    builtArea: '45,000 Sq.Ft',
    timeline: '12 Months',
    status: 'Active' as CommercialItem['status'],
    featured: false,
  });

  const handleOpenCreate = () => {
    setSelectedItemId(null);
    setFormData({
      title: '',
      category: 'Item Rate End to End Services',
      tagline: '',
      description: '',
      heroImage: '',
      galleryImages: [],
      capabilitiesText: '',
      scopeText: '',
      client: '',
      architect: '',
      builtArea: '',
      timeline: '',
      status: 'Active',
      featured: false,
    });
    setIsFormDirty(false);
    setIsEditing(true);
  };

  const handleOpenEdit = (item: CommercialItem) => {
    setSelectedItemId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      tagline: item.tagline,
      description: item.description,
      heroImage: item.heroImage,
      galleryImages: item.galleryImages && item.galleryImages.length > 0 ? item.galleryImages : [item.heroImage],
      capabilitiesText: item.capabilities?.join('\n') || '',
      scopeText: item.scope?.join('\n') || '',
      client: item.client || '',
      architect: item.architect || '',
      builtArea: item.builtArea || '',
      timeline: item.timeline || '',
      status: item.status,
      featured: !!item.featured,
    });
    setIsFormDirty(false);
    setIsEditing(true);
  };

  const handleFormChange = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setIsFormDirty(true);
  };

  const handleCloseModal = () => {
    if (isFormDirty) {
      setShowDiscardConfirm(true);
    } else {
      setIsEditing(false);
      setSelectedItemId(null);
    }
  };

  const confirmDiscardModal = () => {
    setShowDiscardConfirm(false);
    setIsEditing(false);
    setIsFormDirty(false);
    setSelectedItemId(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    try {
      const parsedCapabilities = formData.capabilitiesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const parsedScope = formData.scopeText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const galleryList = formData.galleryImages.filter(Boolean);

      const payload = {
        title: formData.title.trim(),
        category: formData.category,
        tagline: formData.tagline.trim(),
        description: formData.description.trim(),
        heroImage: formData.heroImage.trim() || galleryList[0] || '/assets/comm_complex_hero.jpg',
        galleryImages: galleryList.length > 0 ? galleryList : [formData.heroImage || '/assets/comm_complex_hero.jpg'],
        capabilities: parsedCapabilities,
        scope: parsedScope,
        client: formData.client.trim(),
        architect: formData.architect.trim(),
        builtArea: formData.builtArea.trim(),
        timeline: formData.timeline.trim(),
        status: formData.status,
        featured: formData.featured,
      };

      if (selectedItemId) {
        updateCommercialItem(selectedItemId, payload);
      } else {
        addCommercialItem(payload);
      }

      setIsFormDirty(false);
      setIsEditing(false);
      setSelectedItemId(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const allCategoryFilterOptions = ['All', ...COMMERCIAL_CATEGORIES];

  const filteredItems = useMemo(() => {
    return commercialItems.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesClient = item.client?.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesClient && !matchesCat) return false;
      }
      return true;
    });
  }, [commercialItems, selectedCategory, searchQuery]);

  return (
    <AdminLayout>
      <div className="space-y-6 pb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>COMMERCIAL STUDIO CMS</span>
            </div>
            <h1 className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-slate-900">
              Commercial Construction Management
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-sans max-w-2xl leading-relaxed">
              Manage commercial build packages, turnkey itemized contracting, multi-storey corporate models, and technical specifications.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => {
                resetMasterCatalog();
                setSyncNotice(true);
                setTimeout(() => setSyncNotice(false), 3000);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all border border-slate-200 shadow-2xs shrink-0 cursor-pointer"
              title="Reset and synchronize verified commercial engineering models"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{syncNotice ? '✓ Catalog Synced' : 'Sync Master Catalog'}</span>
            </button>

            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-600/20 transition-all shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Package</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search packages by title, client, or keyword..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <span className="text-xs text-slate-500 font-sans">
              Showing <strong className="text-slate-900 font-mono">{filteredItems.length}</strong> of{' '}
              <strong className="text-slate-900 font-mono">{commercialItems.length}</strong> packages
            </span>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-slate-100 pb-1">
            <span className="text-xs font-medium text-slate-500 font-sans shrink-0 mr-1">Domain:</span>
            {allCategoryFilterOptions.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Commercial Items Cards */}
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <Building className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-900 font-sans">No commercial packages found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try selecting a different domain category or adjust your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-slate-300 hover:shadow-xs transition-all"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <img
                      src={item.heroImage}
                      alt={item.title}
                      className="w-24 h-20 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/comm_complex_hero.jpg';
                      }}
                    />

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 font-sans border border-blue-100">
                          {item.category}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            item.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {item.status}
                        </span>
                        {item.featured && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                            Featured Model
                          </span>
                        )}
                      </div>

                      <h3 className="font-sans font-bold text-sm sm:text-base text-slate-900 line-clamp-1">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-500 font-sans line-clamp-1">
                        {item.tagline || item.description}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-sans pt-0.5 flex-wrap">
                        {item.builtArea && (
                          <span>
                            Scale: <strong className="text-slate-800 font-mono">{item.builtArea}</strong>
                          </span>
                        )}
                        {item.timeline && (
                          <>
                            <span>•</span>
                            <span>
                              Timeline: <strong className="text-slate-800 font-mono">{item.timeline}</strong>
                            </span>
                          </>
                        )}
                        {item.client && (
                          <>
                            <span>•</span>
                            <span>Client: {item.client}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/40 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {deleteConfirmId === item.id ? (
                      <div className="flex items-center gap-1 bg-red-50 p-1 rounded-xl border border-red-200">
                        <button
                          type="button"
                          onClick={() => {
                            deleteCommercialItem(item.id);
                            setDeleteConfirmId(null);
                          }}
                          className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-1.5 py-1 text-slate-500 hover:text-slate-900 text-[10px] cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* ADD / EDIT COMMERCIAL PACKAGE MODAL */}
        {/* ============================================================ */}
        <AnimatePresence>
          {isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-sm animate-fadeIn">
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                transition={{ duration: 0.15 }}
                className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-200/80 bg-white shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900 font-sans tracking-tight">
                        {selectedItemId ? 'Edit Commercial Model' : 'Create Commercial Package'}
                      </h2>
                      <p className="text-xs text-slate-500 font-sans">
                        Configure scope deliverables, structural capabilities, and media galleries.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form Body */}
                <form id="commercial-form" onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/60">
                  {/* Section 1: Package Identification */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                        01
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                        Package Identification & Classification
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Commercial Service / Package Title <span className="text-blue-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => handleFormChange({ title: e.target.value })}
                          placeholder="e.g. Item Rate End-to-End Commercial Construction"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none placeholder:text-slate-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Commercial Category <span className="text-blue-600">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.category}
                            onChange={(e) => handleFormChange({ category: e.target.value })}
                            className="w-full h-11 appearance-none bg-white border border-slate-200 rounded-xl px-4 text-xs font-medium text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none cursor-pointer"
                          >
                            {COMMERCIAL_CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Status
                        </label>
                        <div className="relative">
                          <select
                            value={formData.status}
                            onChange={(e) => handleFormChange({ status: e.target.value as any })}
                            className="w-full h-11 appearance-none bg-white border border-slate-200 rounded-xl px-4 text-xs font-medium text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none cursor-pointer"
                          >
                            <option value="Active">Active Model</option>
                            <option value="Completed">Completed Handover</option>
                            <option value="Upcoming">Upcoming Release</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Subheading / Tagline
                        </label>
                        <input
                          type="text"
                          value={formData.tagline}
                          onChange={(e) => handleFormChange({ tagline: e.target.value })}
                          placeholder="e.g. Turnkey Itemized BOQ Billing & Structural Civil Execution"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Scale, Client & Delivery */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                        02
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                        Scale, Client & Delivery Metrics
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Representative Client / Complex
                        </label>
                        <input
                          type="text"
                          value={formData.client}
                          onChange={(e) => handleFormChange({ client: e.target.value })}
                          placeholder="e.g. Manappuram Commercial Complex"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none placeholder:text-slate-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Architect / Structural Practice
                        </label>
                        <input
                          type="text"
                          value={formData.architect}
                          onChange={(e) => handleFormChange({ architect: e.target.value })}
                          placeholder="e.g. MJC Architects / Commercial Studio"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none placeholder:text-slate-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Built-up Area / Scale
                        </label>
                        <input
                          type="text"
                          value={formData.builtArea}
                          onChange={(e) => handleFormChange({ builtArea: e.target.value })}
                          placeholder="e.g. 32,000 Sq.Ft (G+4 Floors)"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none placeholder:text-slate-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Execution Timeline
                        </label>
                        <input
                          type="text"
                          value={formData.timeline}
                          onChange={(e) => handleFormChange({ timeline: e.target.value })}
                          placeholder="e.g. 14 Months"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none placeholder:text-slate-400"
                        />
                      </div>

                      <div className="flex items-center gap-2.5 pt-6 sm:col-span-2">
                        <input
                          type="checkbox"
                          id="featured-comm-modal"
                          checked={formData.featured}
                          onChange={(e) => handleFormChange({ featured: e.target.checked })}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 border-slate-300 cursor-pointer"
                        />
                        <label htmlFor="featured-comm-modal" className="text-xs font-medium text-slate-700 cursor-pointer select-none">
                          Feature as Highlight Model on Public Commercial Page
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <label className="block text-xs font-semibold text-slate-800 font-sans">
                        Executive Overview & Scope Summary <span className="text-blue-600">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.description}
                        onChange={(e) => handleFormChange({ description: e.target.value })}
                        placeholder="Provide a comprehensive summary of the civil construction, structural frameworks, MEP integration, and BOQ transparency..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none leading-relaxed placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Section 3: Project Media & Photography */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                        03
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                        Project Media & Photography
                      </h3>
                    </div>

                    <ImageUploadPicker
                      mode="single"
                      value={formData.heroImage}
                      onChange={(url) => handleFormChange({ heroImage: url })}
                      label="Primary Package Showcase Image"
                      helperText="Main showcase image rendered on cards and overview grids."
                      categoryFilter="Commercial"
                    />

                    <div className="pt-2 border-t border-slate-100">
                      <ImageUploadPicker
                        mode="multiple"
                        values={formData.galleryImages}
                        onChange={(urls) => handleFormChange({ galleryImages: urls })}
                        label="Commercial Structural & Interior Gallery"
                        helperText="Upload photos or select from commercial project media library."
                        categoryFilter="Commercial"
                      />
                    </div>
                  </div>

                  {/* Section 4: Capabilities & Scope Deliverables */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                        04
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                        Capabilities & Delivered Scope
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Key Capabilities (One per line)
                        </label>
                        <textarea
                          rows={4}
                          value={formData.capabilitiesText}
                          onChange={(e) => handleFormChange({ capabilitiesText: e.target.value })}
                          placeholder="100% Itemized BOQ Billing&#10;Senior Civil & Structural Oversight&#10;Centralized HVAC & Fire Protection&#10;Zero-Friction Milestone Handover"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none leading-relaxed"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Delivered Scope of Work (One per line)
                        </label>
                        <textarea
                          rows={4}
                          value={formData.scopeText}
                          onChange={(e) => handleFormChange({ scopeText: e.target.value })}
                          placeholder="Deep RCC foundation and superstructure.&#10;Unitized glass curtain wall facade.&#10;Centralized chiller plant & electrical substation."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                </form>

                {/* Fixed Footer Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white shrink-0">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <div className="flex items-center gap-2.5">
                    {isFormDirty && (
                      <span className="text-[11px] text-amber-700 font-sans font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Unsaved edits
                      </span>
                    )}
                    <button
                      type="submit"
                      form="commercial-form"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs font-semibold shadow-xs shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{selectedItemId ? 'Save Changes' : 'Publish Model'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Discard Changes Confirmation Dialog */}
        {showDiscardConfirm && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
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
                    You have modified commercial package fields. Closing now will discard these modifications.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowDiscardConfirm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Keep Editing
                </button>
                <button
                  type="button"
                  onClick={confirmDiscardModal}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Discard Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
