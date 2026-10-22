import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Edit2,
  Star,
  ArrowUp,
  ArrowDown,
  X,
  MapPin,
  ChevronDown,
  Image as ImageIcon,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Loader2,
  Calendar,
  Building,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GalleryProject } from '../../data/galleryData';
import { AdminLayout } from './AdminLayout';
import { ImageUploadPicker } from '../../components/admin/ImageUploadPicker';

const GALLERY_CATEGORIES = ['All', 'Commercial', 'Residential', 'Turnkey', 'Interiors'];

export const AdminGallery: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { projects, addProject, updateProject, deleteProject, reorderProjects, resetMasterCatalog } = useData();
  const [syncNotice, setSyncNotice] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState<boolean>(searchParams.get('action') === 'create');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Commercial' as GalleryProject['category'],
    status: 'Completed' as GalleryProject['status'],
    location: '',
    areaSqFt: '',
    year: '2026',
    description: '',
    scope: 'End-to-End Civil & Interiors',
    featured: false,
    image: '/assets/comm_office_hero.jpg',
    galleryImages: [
      '/assets/comm_office_hero.jpg',
      '/assets/comm_complex_hero.jpg',
      '/assets/comm_retail_hero.jpg',
    ],
    specsText: 'Built Area: 180,000 Sq.Ft\nTimeline: 18 Months\nStructural: G+8 Levels',
  });

  const handleOpenCreate = () => {
    setSelectedProjectId(null);
    setFormData({
      title: '',
      category: 'Commercial',
      status: 'Completed',
      location: '',
      areaSqFt: '',
      year: new Date().getFullYear().toString(),
      description: '',
      scope: 'Turnkey Civil Engineering & Architectural Construction',
      featured: false,
      image: '',
      galleryImages: [],
      specsText: '',
    });
    setIsFormDirty(false);
    setIsEditing(true);
  };

  const handleOpenEdit = (project: GalleryProject) => {
    setSelectedProjectId(project.id);
    setFormData({
      title: project.title,
      category: project.category,
      status: project.status,
      location: project.location,
      areaSqFt: project.areaSqFt || '',
      year: project.year || '2026',
      description: project.description,
      scope: project.scope,
      featured: !!project.featured,
      image: project.image,
      galleryImages: project.galleryImages && project.galleryImages.length > 0 ? project.galleryImages : [project.image],
      specsText: project.specs?.map((s) => `${s.label}: ${s.value}`).join('\n') || '',
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
      setSelectedProjectId(null);
    }
  };

  const confirmDiscardModal = () => {
    setShowDiscardConfirm(false);
    setIsEditing(false);
    setIsFormDirty(false);
    setSelectedProjectId(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    try {
      const parsedSpecs = formData.specsText
        .split('\n')
        .map((line) => {
          const parts = line.split(':');
          return {
            label: parts[0]?.trim() || 'Detail',
            value: parts.slice(1).join(':')?.trim() || 'Included',
          };
        })
        .filter((s) => s.label && s.value);

      const galleryList = formData.galleryImages.filter(Boolean);

      const projectPayload = {
        number: `.${String(projects.length + 1).padStart(2, '0')}`,
        title: formData.title.trim(),
        category: formData.category,
        status: formData.status,
        location: formData.location.trim(),
        areaSqFt: formData.areaSqFt.trim(),
        year: formData.year.trim(),
        description: formData.description.trim(),
        scope: formData.scope.trim(),
        featured: formData.featured,
        image: formData.image.trim() || galleryList[0] || '/assets/comm_complex_hero.jpg',
        galleryImages: galleryList.length > 0 ? galleryList : [formData.image || '/assets/comm_complex_hero.jpg'],
        specs: parsedSpecs,
      };

      if (selectedProjectId) {
        updateProject(selectedProjectId, projectPayload);
      } else {
        addProject(projectPayload);
      }

      setIsFormDirty(false);
      setIsEditing(false);
      setSelectedProjectId(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      reorderProjects(index, index - 1);
    } else if (direction === 'down' && index < projects.length - 1) {
      reorderProjects(index, index + 1);
    }
  };

  // Filtered and searched projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedStatus !== 'All' && p.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesLoc = p.location.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesYear = p.year?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesCat && !matchesYear) return false;
      }
      return true;
    });
  }, [projects, selectedCategory, selectedStatus, searchQuery]);

  return (
    <AdminLayout>
      <div className="space-y-6 pb-16">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>CMS MEDIA & PORTFOLIO</span>
            </div>
            <h1 className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-slate-900">
              Gallery & Portfolio Management
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-sans max-w-2xl leading-relaxed">
              Curate architectural photography, multi-angle project galleries, spatial metrics, and showcase order across the live website.
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
              title="Reset and synchronize verified architectural projects with full photo galleries"
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
              <span>Add New Project</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by title, location, category, year..."
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

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 font-sans">Status:</span>
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                {['All', 'Completed', 'Ongoing'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSelectedStatus(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-all cursor-pointer ${
                      selectedStatus === st
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-slate-100">
            <span className="text-xs font-medium text-slate-500 font-sans mr-1">Category:</span>
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer ${
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

        {/* Project List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-sans px-2">
            <span>
              Showing <strong className="text-slate-900 font-mono">{filteredProjects.length}</strong> of{' '}
              <strong className="text-slate-900 font-mono">{projects.length}</strong> total projects
            </span>
            <span className="hidden sm:inline text-slate-400">Use arrow controls to reorder portfolio sequence</span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <Building className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-900 font-sans">No projects found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try adjusting your search query or category filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 hover:shadow-xs transition-all"
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    {/* Thumbnail */}
                    <div className="relative shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-24 h-20 rounded-xl object-cover bg-slate-100 border border-slate-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/comm_complex_hero.jpg';
                        }}
                      />
                      {project.featured && (
                        <span className="absolute -top-1.5 -right-1.5 p-1 bg-amber-500 text-white rounded-full shadow-xs" title="Featured Project">
                          <Star className="w-3 h-3 fill-white" />
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 font-sans">
                          {project.category}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            project.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {project.status === 'Completed' ? 'Completed Handover' : 'Ongoing Execution'}
                        </span>
                        {project.year && (
                          <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                            <Calendar className="w-3 h-3" />
                            {project.year}
                          </span>
                        )}
                      </div>

                      <h3 className="font-sans font-bold text-sm sm:text-base text-slate-900 truncate">
                        {project.title}
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-slate-500 font-sans flex-wrap">
                        {project.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {project.location}
                          </span>
                        )}
                        {project.areaSqFt && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-[11px]">{project.areaSqFt}</span>
                          </>
                        )}
                        {project.galleryImages && project.galleryImages.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                              {project.galleryImages.length} Gallery Photos
                            </span>
                          </>
                        )}
                      </div>

                      {/* Photo Gallery Mini Strip */}
                      {project.galleryImages && project.galleryImages.length > 0 && (
                        <div className="flex items-center gap-1.5 pt-1 overflow-x-auto">
                          {project.galleryImages.slice(0, 6).map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt=""
                              className="w-7 h-7 rounded-md object-cover border border-slate-200 bg-slate-100 shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ))}
                          {project.galleryImages.length > 6 && (
                            <span className="text-[10px] font-mono text-slate-400 font-semibold px-1">
                              +{project.galleryImages.length - 6}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions & Position Ordering */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {/* Position Arrows */}
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                      <button
                        type="button"
                        onClick={() => handleMove(index, 'up')}
                        disabled={index === 0}
                        className="p-2 hover:bg-slate-200 text-slate-600 disabled:opacity-25 transition-colors cursor-pointer"
                        title="Move Higher in Portfolio List"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-[1px] h-4 bg-slate-200" />
                      <button
                        type="button"
                        onClick={() => handleMove(index, 'down')}
                        disabled={index === projects.length - 1}
                        className="p-2 hover:bg-slate-200 text-slate-600 disabled:opacity-25 transition-colors cursor-pointer"
                        title="Move Lower in Portfolio List"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(project)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/40 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {deleteConfirmId === project.id ? (
                      <div className="flex items-center gap-1 bg-red-50 p-1 rounded-xl border border-red-200">
                        <button
                          type="button"
                          onClick={() => {
                            deleteProject(project.id);
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
                        onClick={() => setDeleteConfirmId(project.id)}
                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Project"
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
        {/* ADD / EDIT PROJECT CORPORATE MODAL */}
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
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900 font-sans tracking-tight">
                        {selectedProjectId ? 'Edit Portfolio Project' : 'Create New Portfolio Project'}
                      </h2>
                      <p className="text-xs text-slate-500 font-sans">
                        {selectedProjectId ? `Editing project: ${formData.title || selectedProjectId}` : 'Add high-res photography, spatial metadata and gallery exhibits'}
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
                <form id="gallery-form" onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/60">
                  {/* Section 1: Identification & Classification */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                        01
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                        Project Identification & Classification
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Title */}
                      <div className="sm:col-span-2 lg:col-span-3 space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Project Title <span className="text-blue-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => handleFormChange({ title: e.target.value })}
                          placeholder="e.g. The Courtyard Villa / Apex Corporate Park / Manappuram Commercial Complex"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none placeholder:text-slate-400"
                        />
                      </div>

                      {/* Category */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Primary Domain <span className="text-blue-600">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.category}
                            onChange={(e) => handleFormChange({ category: e.target.value as any })}
                            className="w-full h-11 appearance-none bg-white border border-slate-200 rounded-xl px-4 text-xs font-medium text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none cursor-pointer"
                          >
                            <option value="Commercial">Commercial</option>
                            <option value="Residential">Residential</option>
                            <option value="Turnkey">Turnkey</option>
                            <option value="Interiors">Interiors</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Status */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Delivery Status <span className="text-blue-600">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.status}
                            onChange={(e) => handleFormChange({ status: e.target.value as any })}
                            className="w-full h-11 appearance-none bg-white border border-slate-200 rounded-xl px-4 text-xs font-medium text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none cursor-pointer"
                          >
                            <option value="Completed">Completed Handover</option>
                            <option value="Ongoing">Ongoing Construction</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Location */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Project Location
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleFormChange({ location: e.target.value })}
                          placeholder="e.g. Sadashivanagar, Bengaluru"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none placeholder:text-slate-400"
                        />
                      </div>

                      {/* Built Area */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Built Scale / Footprint
                        </label>
                        <input
                          type="text"
                          value={formData.areaSqFt}
                          onChange={(e) => handleFormChange({ areaSqFt: e.target.value })}
                          placeholder="e.g. 180,000 Sq.Ft / G+8 Levels"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none placeholder:text-slate-400"
                        />
                      </div>

                      {/* Year */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Delivery Year
                        </label>
                        <input
                          type="text"
                          value={formData.year}
                          onChange={(e) => handleFormChange({ year: e.target.value })}
                          placeholder="e.g. 2026"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none placeholder:text-slate-400"
                        />
                      </div>

                      {/* Scope */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Contract Scope
                        </label>
                        <input
                          type="text"
                          value={formData.scope}
                          onChange={(e) => handleFormChange({ scope: e.target.value })}
                          placeholder="e.g. End-to-End Civil & Interiors"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Visual Media & Master Photography */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                        02
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                        Visual Media & Master Photography
                      </h3>
                    </div>

                    {/* Main Cover Image */}
                    <ImageUploadPicker
                      mode="single"
                      value={formData.image}
                      onChange={(url) => handleFormChange({ image: url })}
                      label="Primary Project Cover Image"
                      helperText="Main showcase image rendered on portfolio grids, featured carousels, and lightbox hero view."
                      categoryFilter="Projects"
                    />

                    {/* Gallery Images */}
                    <div className="pt-2 border-t border-slate-100">
                      <ImageUploadPicker
                        mode="multiple"
                        values={formData.galleryImages}
                        onChange={(urls) => handleFormChange({ galleryImages: urls })}
                        label="Multi-Angle Project Gallery Exhibits"
                        helperText="Upload additional progress or finished photos from your computer or pick from the asset library."
                        categoryFilter="Projects"
                      />
                    </div>

                    {/* Featured Checkbox */}
                    <div className="pt-3 flex items-center gap-3 border-t border-slate-100">
                      <input
                        type="checkbox"
                        id="featured-check"
                        checked={formData.featured}
                        onChange={(e) => handleFormChange({ featured: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 border-slate-300 cursor-pointer"
                      />
                      <label htmlFor="featured-check" className="text-xs font-medium text-slate-700 cursor-pointer select-none">
                        Highlight as a <strong className="text-slate-900 font-semibold">Featured Showcase Project</strong> on homepage portfolio grids
                      </label>
                    </div>
                  </div>

                  {/* Section 3: Description & Specifications */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                        03
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                        Scope Narrative & Technical Specifications
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Short Architectural Description
                        </label>
                        <textarea
                          rows={4}
                          value={formData.description}
                          onChange={(e) => handleFormChange({ description: e.target.value })}
                          placeholder="High-level architectural overview, facade styling, engineering highlights..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none leading-relaxed placeholder:text-slate-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Specifications (Label: Value per line)
                        </label>
                        <textarea
                          rows={4}
                          value={formData.specsText}
                          onChange={(e) => handleFormChange({ specsText: e.target.value })}
                          placeholder="Structural System: Post-Tensioned RCC Framework&#10;Glazing: Acoustic Low-E Double Glazed Unit&#10;Flooring: Polished Italian Botticino Marble"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none leading-relaxed placeholder:text-slate-400"
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
                      form="gallery-form"
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
                          <span>{selectedProjectId ? 'Save Changes' : 'Publish Project'}</span>
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
                    Discard Unsaved Project Changes?
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed">
                    You have modified project fields or images. Closing now will discard these modifications.
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
