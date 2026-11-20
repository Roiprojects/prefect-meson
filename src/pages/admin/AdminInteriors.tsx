import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Edit2,
  Palette,
  X,
  Search,
  Image as ImageIcon,
  Sparkles,
  ChevronDown,
  Calendar,
  Building,
  Home,
} from 'lucide-react';
import { useData, InteriorItem } from '../../context/DataContext';
import { AdminLayout } from './AdminLayout';
import { ImageUploadPicker } from '../../components/admin/ImageUploadPicker';

const RESIDENTIAL_CATEGORIES = [
  'Living Room',
  'Kitchen',
  'Bedroom',
  'Dining',
  'Pooja Room',
  'Wardrobes',
  'Full Home Turnkey',
];

const COMMERCIAL_CATEGORIES = [
  'Office Interiors',
  'Retail & Showroom',
  'Restaurant & Bar',
  'Hospitality Spaces',
  'Commercial Fit-Out',
];

const ALL_INTERIOR_CATEGORIES = [...RESIDENTIAL_CATEGORIES, ...COMMERCIAL_CATEGORIES];

export const AdminInteriors: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { interiorItems, addInteriorItem, updateInteriorItem, deleteInteriorItem, resetMasterCatalog } = useData();
  const [syncNotice, setSyncNotice] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState<boolean>(searchParams.get('action') === 'create');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [spaceTypeFilter, setSpaceTypeFilter] = useState<'All' | 'Residential' | 'Commercial'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Living Room',
    spaceType: 'Residential' as InteriorItem['spaceType'],
    tagline: '',
    description: '',
    heroImage: '/assets/interior_01_living.jpg',
    galleryImages: [
      '/assets/interior_01_living.jpg',
      '/assets/interior_04_office.jpg',
      '/assets/portfolio_04_interior.jpg',
    ],
    materialsText: 'Imported Italian Botticino Marble\nBurma Teak Acoustic Fluting\nDimmable 3000K Warm Cove LED Channels\nMatte Gold Brass Shadowlines',
    featuresText: 'Custom Floating TV & Fireplace Media Feature Wall\nAcoustic Multi-Layer Gypsum False Ceiling\nAutomated Motorized Draping Systems\nConcealed Air-Conditioning Slot Diffusers',
    client: '',
    architect: '',
    builtArea: '1,200 Sq.Ft',
    timeline: '45 Days',
    status: 'Active' as InteriorItem['status'],
    featured: false,
  });

  const handleOpenCreate = () => {
    setSelectedItemId(null);
    setFormData({
      title: '',
      category: 'Living Room',
      spaceType: 'Residential',
      tagline: '',
      description: '',
      heroImage: '',
      galleryImages: [],
      materialsText: '',
      featuresText: '',
      client: '',
      architect: '',
      builtArea: '',
      timeline: '',
      status: 'Active',
      featured: false,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (item: InteriorItem) => {
    setSelectedItemId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      spaceType: item.spaceType || 'Residential',
      tagline: item.tagline,
      description: item.description,
      heroImage: item.heroImage,
      galleryImages: item.galleryImages && item.galleryImages.length > 0 ? item.galleryImages : [item.heroImage],
      materialsText: item.materials?.join('\n') || '',
      featuresText: item.features?.join('\n') || '',
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

    const parsedMaterials = formData.materialsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedFeatures = formData.featuresText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const galleryList = formData.galleryImages.filter(Boolean);

    const payload = {
      title: formData.title.trim(),
      category: formData.category,
      spaceType: formData.spaceType,
      tagline: formData.tagline.trim(),
      description: formData.description.trim(),
      heroImage: formData.heroImage.trim() || galleryList[0] || '/assets/interior_01_living.jpg',
      galleryImages: galleryList.length > 0 ? galleryList : [formData.heroImage || '/assets/interior_01_living.jpg'],
      materials: parsedMaterials,
      features: parsedFeatures,
      client: formData.client.trim(),
      architect: formData.architect.trim(),
      builtArea: formData.builtArea.trim(),
      timeline: formData.timeline.trim(),
      status: formData.status,
      featured: formData.featured,
    };

    if (selectedItemId) {
      updateInteriorItem(selectedItemId, payload);
    } else {
      addInteriorItem(payload);
    }

    setIsEditing(false);
    setSelectedItemId(null);
  };

  const filteredItems = interiorItems.filter((item) => {
    if (spaceTypeFilter !== 'All' && item.spaceType !== spaceTypeFilter) return false;
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

  const availableCategoriesForFilter =
    spaceTypeFilter === 'Residential'
      ? ['All', ...RESIDENTIAL_CATEGORIES]
      : spaceTypeFilter === 'Commercial'
      ? ['All', ...COMMERCIAL_CATEGORIES]
      : ['All', ...ALL_INTERIOR_CATEGORIES];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* 1. HEADER HERO */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-[11px] font-mono font-bold uppercase tracking-wider text-purple-700 border border-purple-200">
                  <Palette className="w-3.5 h-3.5 text-purple-600" />
                  Interiors & Fit-Out CMS
                </span>
                <span className="text-[11px] font-mono text-slate-400">• Residential & Commercial</span>
              </div>
              <h1 className="font-sans font-bold text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Interior Design & Millwork CMS
              </h1>
              <p className="text-xs text-slate-500 mt-1 font-sans max-w-xl">
                Manage modular kitchens, luxury living suites, corporate offices, material palettes, and bespoke joinery showcases.
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
                title="Reset and synchronize all interior projects with full authentic NDL profile PPT data and galleries"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>{syncNotice ? '✓ Catalog Synced' : 'Sync Master PPT Catalog'}</span>
              </button>

              <button
                type="button"
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md shadow-purple-600/20 shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Interior Project</span>
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
                placeholder="Search by space, material, client, or category..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-sans text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all bg-slate-50/50"
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

            {/* Space Type Selector & Category Dropdown */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Space Type Tabs */}
              <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
                {(['All', 'Residential', 'Commercial'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setSpaceTypeFilter(st);
                      setSelectedCategory('All');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      spaceTypeFilter === st
                        ? 'bg-white text-slate-900 shadow-sm font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Category Dropdown (High-Contrast) */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 shrink-0 font-sans">Category:</span>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none pl-3.5 pr-9 py-2 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-sans text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
                  >
                    {availableCategoriesForFilter.map((cat) => (
                      <option key={cat} value={cat} className="bg-white text-slate-900 font-medium py-1">
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
            {availableCategoriesForFilter.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {cat} {cat === 'All' ? `(${interiorItems.length})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* 3. INTERIORS GRID */}
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
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-mono text-[10px] font-bold border border-purple-200">
                    {item.spaceType}
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
                  <h3 className="font-sans font-bold text-base text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-purple-700 font-medium line-clamp-1">
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
                    <span className="truncate">{item.builtArea || 'Floor: Custom'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{item.timeline || '30-60 Days'}</span>
                  </div>
                </div>

                {/* Materials preview tags */}
                {item.materials && item.materials.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Specified Materials ({item.materials.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.materials.slice(0, 3).map((mat, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-mono"
                        >
                          {mat}
                        </span>
                      ))}
                      {item.materials.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-mono">
                          +{item.materials.length - 3} more
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
                      title="Delete Interior Project"
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
            <Palette className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-sans font-bold text-slate-800 text-base">No Interior Projects Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans">
              No interior projects matched your selected filter criteria. Try clearing your search query or add a new space.
            </p>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700"
            >
              <Plus className="w-4 h-4" /> Create Interior Project
            </button>
          </div>
        )}

        {/* 4. CORPORATE MODAL FOR ADD / EDIT INTERIOR PROJECT */}
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
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        {selectedItemId ? 'Edit Interior Project' : 'Create New Interior Project'}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {selectedItemId ? `Project ID: ${selectedItemId}` : 'Configure materials, millwork specs, and spatial design details'}
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
                <form id="interior-form" onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                  {/* Space Classification Selector */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Space Classification <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            spaceType: 'Residential',
                            category: RESIDENTIAL_CATEGORIES[0],
                          });
                        }}
                        className={`p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                          formData.spaceType === 'Residential'
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <Home className={`w-5 h-5 ${formData.spaceType === 'Residential' ? 'text-white' : 'text-slate-400'}`} />
                        <div>
                          <div className="font-bold text-xs">Residential Interiors</div>
                          <div className={`text-[10px] ${formData.spaceType === 'Residential' ? 'text-slate-300' : 'text-slate-500'}`}>Living, Modular Kitchen, Master Suite, Pooja</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            spaceType: 'Commercial',
                            category: COMMERCIAL_CATEGORIES[0],
                          });
                        }}
                        className={`p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                          formData.spaceType === 'Commercial'
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <Building className={`w-5 h-5 ${formData.spaceType === 'Commercial' ? 'text-white' : 'text-slate-400'}`} />
                        <div>
                          <div className="font-bold text-xs">Commercial Interiors</div>
                          <div className={`text-[10px] ${formData.spaceType === 'Commercial' ? 'text-slate-300' : 'text-slate-500'}`}>Executive Suites, Open Office Plates, Retail Showrooms</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* General Project Info */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      Spatial Details & Theme
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Project / Space Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="e.g. Master Bedroom Sanctuary with Walk-in Wardrobe"
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full appearance-none bg-white border border-slate-300 hover:border-slate-400 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none cursor-pointer"
                          >
                            {(formData.spaceType === 'Residential' ? RESIDENTIAL_CATEGORIES : COMMERCIAL_CATEGORIES).map(
                              (cat) => (
                                <option key={cat} value={cat} className="bg-white text-slate-900">
                                  {cat}
                                </option>
                              )
                            )}
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Execution Status
                        </label>
                        <div className="relative">
                          <select
                            value={formData.status}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                status: e.target.value as InteriorItem['status'],
                              })
                            }
                            className="w-full appearance-none bg-white border border-slate-300 hover:border-slate-400 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none cursor-pointer"
                          >
                            <option value="Active">Active (Live Showcase)</option>
                            <option value="Completed">Completed Handover</option>
                            <option value="Upcoming">Upcoming Project</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Tagline / Highlight Hook
                        </label>
                        <input
                          type="text"
                          value={formData.tagline}
                          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                          placeholder="e.g. Acoustic Fluted Panelling, Integrated Glass Wardrobes & Mood Lighting"
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                        />
                      </div>

                      <div className="md:col-span-2 space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Detailed Design Description
                        </label>
                        <textarea
                          rows={3}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Detailed narrative of the interior design concept, tactile finishes, joinery details, and spatial layout..."
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Media & Photography */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-slate-600" />
                      Interior Visuals & Fit-Out Gallery
                    </h3>

                    {/* Main Hero Image */}
                    <ImageUploadPicker
                      mode="single"
                      value={formData.heroImage}
                      onChange={(url) => setFormData({ ...formData, heroImage: url })}
                      label="Primary Interior Showcase Photo"
                      helperText="Primary high-definition image for cards, portfolio, and hero view."
                      categoryFilter="Interiors"
                    />

                    {/* Gallery Images Strip */}
                    <ImageUploadPicker
                      mode="multiple"
                      values={formData.galleryImages}
                      onChange={(urls) => setFormData({ ...formData, galleryImages: urls })}
                      label="Interior Material & Room Gallery"
                      helperText="Upload device photos or select from our curated interior architectural assets."
                      categoryFilter="Interiors"
                    />
                  </div>

                  {/* Materials & Features */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      Material Specs & Architectural Features
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Material & Surface Specifications (One per line)
                        </label>
                        <textarea
                          rows={4}
                          value={formData.materialsText}
                          onChange={(e) => setFormData({ ...formData, materialsText: e.target.value })}
                          placeholder="IS-710 BWP Marine Plywood&#10;Italian Botticino Natural Marble&#10;Seasoned Burma Teak Accents&#10;Blum Soft-Close Tandem Hardware"
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Key Design Features & Layers (One per line)
                        </label>
                        <textarea
                          rows={4}
                          value={formData.featuresText}
                          onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                          placeholder="Custom Floating TV & Fireplace Media Wall&#10;Acoustic Multi-Layer Gypsum False Ceiling&#10;Automated Motorized Draping Systems&#10;Concealed Air-Conditioning Slot Diffusers"
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Spatial Metrics */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Spatial Scale & Studio Metadata
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Floor / Carpet Area
                        </label>
                        <input
                          type="text"
                          value={formData.builtArea}
                          onChange={(e) => setFormData({ ...formData, builtArea: e.target.value })}
                          placeholder="e.g. 1,200 Sq.Ft"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Fit-Out Timeline
                        </label>
                        <input
                          type="text"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          placeholder="e.g. 45 Days"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Client / Residence
                        </label>
                        <input
                          type="text"
                          value={formData.client}
                          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                          placeholder="e.g. Mr. Vittal Das Villa"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Interior Designer / Studio
                        </label>
                        <input
                          type="text"
                          value={formData.architect}
                          onChange={(e) => setFormData({ ...formData, architect: e.target.value })}
                          placeholder="e.g. Keystone Architects, Indiranagar"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-3 border-t border-slate-100">
                      <input
                        type="checkbox"
                        id="featured-interior"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900 border-slate-300 cursor-pointer"
                      />
                      <label htmlFor="featured-interior" className="text-xs font-medium text-slate-700 cursor-pointer">
                        Feature this interior project on the public Interiors Showcase & Homepage
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
                      form="interior-form"
                      className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-black active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      {selectedItemId ? 'Save Changes' : 'Publish Project'}
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
                  <h3 className="font-sans font-bold text-slate-900 text-base">Delete Interior Project?</h3>
                  <p className="text-xs text-slate-500 font-sans mt-1">
                    This action will remove the interior project and its material specifications from the live system.
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
                      deleteInteriorItem(deleteConfirmId);
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
