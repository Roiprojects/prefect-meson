import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Edit2,
  Briefcase,
  X,
  Search,
  Image as ImageIcon,
  Sparkles,
  ChevronDown,
  Calendar,
  Building,
  ShieldCheck,
} from 'lucide-react';
import { useData, TurnkeyItem } from '../../context/DataContext';
import { AdminLayout } from './AdminLayout';
import { ImageUploadPicker } from '../../components/admin/ImageUploadPicker';

const TURNKEY_CATEGORIES = [
  'Turnkey EPC',
  'Residential Turnkey',
  'Commercial Turnkey',
  'Industrial Turnkey',
  'Design & Build',
  'Project Management',
];

export const AdminTurnkey: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { turnkeyItems, addTurnkeyItem, updateTurnkeyItem, deleteTurnkeyItem, resetMasterCatalog } = useData();
  const [syncNotice, setSyncNotice] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState<boolean>(searchParams.get('action') === 'create');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Turnkey EPC',
    tagline: '',
    description: '',
    heroImage: '/assets/turnkey_hero.jpg',
    galleryImages: [
      '/assets/turnkey_hero.jpg',
      '/assets/turnkey_03_execution.jpg',
      '/assets/turnkey_04_quality.jpg',
      '/assets/turnkey_05_handover.jpg',
    ],
    stagesText: '01. Requirement Analysis & Site Survey\n02. Architectural BIM & Structural Calculations\n03. Transparent Itemized BOQ Lock\n04. Heavy Substructure & Superstructure Casting\n05. MEP, HVAC & Fire Infrastructure\n06. Multi-Point Quality Audit & Key Handover',
    deliverablesText: 'Single Point Responsibility & Zero Contractor Disputes\nFixed Milestone Linked Payment Schedules\nStructural Stability & Waterproofing Warranties\nAs-Built Drawings & Municipal Occupancy Certificates',
    client: '',
    architect: '',
    builtArea: '50,000 Sq.Ft',
    timeline: '14 Months',
    status: 'Active' as TurnkeyItem['status'],
    featured: false,
  });

  const handleOpenCreate = () => {
    setSelectedItemId(null);
    setFormData({
      title: '',
      category: 'Turnkey EPC',
      tagline: '',
      description: '',
      heroImage: '',
      galleryImages: [],
      stagesText: '',
      deliverablesText: '',
      client: '',
      architect: '',
      builtArea: '',
      timeline: '',
      status: 'Active',
      featured: false,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (item: TurnkeyItem) => {
    setSelectedItemId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      tagline: item.tagline,
      description: item.description,
      heroImage: item.heroImage,
      galleryImages: item.galleryImages && item.galleryImages.length > 0 ? item.galleryImages : [item.heroImage],
      stagesText: item.stages?.join('\n') || '',
      deliverablesText: item.deliverables?.join('\n') || '',
      client: item.client || '',
      architect: item.architect || '',
      builtArea: item.builtArea || '',
      timeline: item.timeline || '',
      status: item.status,
      featured: !!item.featured,
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const parsedStages = formData.stagesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedDeliverables = formData.deliverablesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const galleryList = formData.galleryImages.filter(Boolean);

    const payload = {
      title: formData.title.trim(),
      category: formData.category,
      tagline: formData.tagline.trim(),
      description: formData.description.trim(),
      heroImage: formData.heroImage.trim() || galleryList[0] || '/assets/turnkey_hero.jpg',
      galleryImages: galleryList.length > 0 ? galleryList : [formData.heroImage || '/assets/turnkey_hero.jpg'],
      stages: parsedStages,
      deliverables: parsedDeliverables,
      client: formData.client.trim(),
      architect: formData.architect.trim(),
      builtArea: formData.builtArea.trim(),
      timeline: formData.timeline.trim(),
      status: formData.status,
      featured: formData.featured,
    };

    if (selectedItemId) {
      updateTurnkeyItem(selectedItemId, payload);
    } else {
      addTurnkeyItem(payload);
    }

    setIsEditing(false);
    setSelectedItemId(null);
  };

  const allCategoryFilterOptions = ['All', ...TURNKEY_CATEGORIES];

  const filteredItems = turnkeyItems.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(item.client && item.client.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* 1. HEADER HERO */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 border border-amber-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  Turnkey EPC Management
                </span>
                <span className="text-[11px] font-mono text-slate-400">• Single-Window Contracts</span>
              </div>
              <h1 className="font-sans font-bold text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Turnkey Projects & Execution CMS
              </h1>
              <p className="text-xs text-slate-500 mt-1 font-sans max-w-xl">
                Manage end-to-end design & build packages, milestone stages, structural scopes, and public turnkey showcases.
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
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs uppercase tracking-wider transition-all border border-slate-300 shrink-0 cursor-pointer"
                title="Reset and synchronize all turnkey packages with full authentic NDL profile PPT data and galleries"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{syncNotice ? '✓ Catalog Synced' : 'Sync Master PPT Catalog'}</span>
              </button>

              <button
                type="button"
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-600/20 shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Turnkey Package</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. SEARCH & FILTER CONTROLS */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by package title, scope, client, or category..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Dropdown (High-Contrast) */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 shrink-0 font-sans">Category:</span>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none pl-3.5 pr-9 py-2 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-sans text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 cursor-pointer"
                >
                  {allCategoryFilterOptions.map((cat) => (
                    <option key={cat} value={cat} className="bg-white text-slate-900 font-medium py-1">
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
            {allCategoryFilterOptions.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {cat} {cat === 'All' ? `(${turnkeyItems.length})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* 3. TURNKEY PACKAGES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src={item.heroImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                  <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-[11px] font-mono font-bold text-slate-900 border border-slate-200/80 shadow-sm">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white font-mono text-[10px] font-bold flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-2.5 h-2.5" /> Featured
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 z-10">
                  <span
                    className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold shadow-sm ${
                      item.status === 'Completed'
                        ? 'bg-emerald-500 text-white'
                        : item.status === 'Active'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-white'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Gallery Count Preview */}
                {item.galleryImages && item.galleryImages.length > 1 && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-white font-mono text-[10px] font-medium flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" />
                    <span>+{item.galleryImages.length - 1} photos</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-amber-700 font-medium line-clamp-1">
                    {item.tagline}
                  </p>
                  <p className="text-xs text-slate-500 font-sans line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Specs Box */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 font-mono text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{item.builtArea || 'Scale: Custom'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{item.timeline || '12-16 Months'}</span>
                  </div>
                </div>

                {/* Stages preview tags */}
                {item.stages && item.stages.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Execution Stages ({item.stages.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.stages.slice(0, 3).map((stage, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono"
                        >
                          {stage}
                        </span>
                      ))}
                      {item.stages.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-mono">
                          +{item.stages.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[10px] font-mono text-slate-400 truncate max-w-[120px]">
                    Client: {item.client || 'Perfect Mason'}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-slate-600" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Turnkey Package"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/90 p-8 space-y-3">
            <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-sans font-bold text-slate-800 text-base">No Turnkey Packages Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans">
              No turnkey packages matched your search filters. Try clearing your search query or add a new package.
            </p>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700"
            >
              <Plus className="w-4 h-4" /> Create Package
            </button>
          </div>
        )}

        {/* 4. CORPORATE MODAL FOR ADD / EDIT TURNKEY PACKAGE */}
        <AnimatePresence>
          {isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ duration: 0.15 }}
                className="w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
              >
                {/* Fixed Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 bg-white shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        {selectedItemId ? 'Edit Turnkey Package' : 'Create New Turnkey Package'}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {selectedItemId ? `Contract ID: ${selectedItemId}` : 'Configure full-scope turnkey project, milestones & guarantees'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrollable Form Body */}
                <form id="turnkey-form" onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                  {/* General Information */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      Package Overview & Metadata
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Package Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="e.g. End-to-End Turnkey Villa Construction Contract"
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Turnkey Category <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full appearance-none bg-white border border-slate-300 hover:border-slate-400 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none cursor-pointer"
                          >
                            {TURNKEY_CATEGORIES.map((cat) => (
                              <option key={cat} value={cat} className="bg-white text-slate-900">
                                {cat}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Delivery Status
                        </label>
                        <div className="relative">
                          <select
                            value={formData.status}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                status: e.target.value as TurnkeyItem['status'],
                              })
                            }
                            className="w-full appearance-none bg-white border border-slate-300 hover:border-slate-400 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none cursor-pointer"
                          >
                            <option value="Active">Active (Ongoing Showcase)</option>
                            <option value="Completed">Completed Handover</option>
                            <option value="Upcoming">Upcoming Project</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Tagline / Key Value Hook
                        </label>
                        <input
                          type="text"
                          value={formData.tagline}
                          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                          placeholder="e.g. Single-Window Project Delivery from Bare Land to Complete Handover"
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                        />
                      </div>

                      <div className="md:col-span-2 space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Detailed Scope & Methodology
                        </label>
                        <textarea
                          rows={3}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Comprehensive description of the turnkey methodology, structural guarantees, and contractor responsibilities..."
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Media & Photography */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-slate-600" />
                      Visual Media & Photography
                    </h3>

                    {/* Main Hero Image */}
                    <ImageUploadPicker
                      mode="single"
                      value={formData.heroImage}
                      onChange={(url) => setFormData({ ...formData, heroImage: url })}
                      label="Primary Turnkey Hero Image"
                      helperText="Primary high-definition image for project showcase cards and hero banners."
                      categoryFilter="Turnkey"
                    />

                    {/* Gallery Images Strip */}
                    <ImageUploadPicker
                      mode="multiple"
                      values={formData.galleryImages}
                      onChange={(urls) => setFormData({ ...formData, galleryImages: urls })}
                      label="Site Progress & Turnkey Execution Gallery"
                      helperText="Upload site inspection photos or pick from the project asset library."
                      categoryFilter="Turnkey"
                    />
                  </div>

                  {/* Execution Stages & Deliverables */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Milestones & Warranties
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Execution Stages (One milestone per line)
                        </label>
                        <textarea
                          rows={4}
                          value={formData.stagesText}
                          onChange={(e) => setFormData({ ...formData, stagesText: e.target.value })}
                          placeholder="01. Requirement Analysis & BIM&#10;02. Fixed BOQ & Engineering Lock&#10;03. Heavy Civil & RCC Framework&#10;04. Premium Finishes & Handover"
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Key Deliverables & Guarantees (One per line)
                        </label>
                        <textarea
                          rows={4}
                          value={formData.deliverablesText}
                          onChange={(e) => setFormData({ ...formData, deliverablesText: e.target.value })}
                          placeholder="Single Point Contractor Responsibility&#10;Milestone-Linked Escrow Payment Schedules&#10;10-Year Structural Stability Warranties&#10;Zero Cost Overrun Guarantee"
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Technical Specifications */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Technical Metrics & Engineering Cell
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Built Area Scale
                        </label>
                        <input
                          type="text"
                          value={formData.builtArea}
                          onChange={(e) => setFormData({ ...formData, builtArea: e.target.value })}
                          placeholder="e.g. 50,000 Sq.Ft"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Execution Timeline
                        </label>
                        <input
                          type="text"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          placeholder="e.g. 14 Months"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Representative Client
                        </label>
                        <input
                          type="text"
                          value={formData.client}
                          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                          placeholder="e.g. Zenith Tech Center"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Architect / Engineering Cell
                        </label>
                        <input
                          type="text"
                          value={formData.architect}
                          onChange={(e) => setFormData({ ...formData, architect: e.target.value })}
                          placeholder="e.g. NDL Architecture Cell"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-3 border-t border-slate-100">
                      <input
                        type="checkbox"
                        id="featured-turnkey"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900 border-slate-300 cursor-pointer"
                      />
                      <label htmlFor="featured-turnkey" className="text-xs font-medium text-slate-700 cursor-pointer">
                        Feature this turnkey project on the public Turnkey Showcase & Homepage
                      </label>
                    </div>
                  </div>
                </form>

                {/* Fixed Footer Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Discard Changes
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      form="turnkey-form"
                      className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-black active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      {selectedItemId ? 'Save Changes' : 'Publish Package'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 5. DELETE CONFIRMATION DIALOG */}
        <AnimatePresence>
          {deleteConfirmId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-slate-900 text-base">Delete Turnkey Package?</h3>
                  <p className="text-xs text-slate-500 font-sans mt-1">
                    This action will remove the package and its linked stages from the live system.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteTurnkeyItem(deleteConfirmId);
                      setDeleteConfirmId(null);
                    }}
                    className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-md shadow-red-600/20"
                  >
                    Confirm Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};
