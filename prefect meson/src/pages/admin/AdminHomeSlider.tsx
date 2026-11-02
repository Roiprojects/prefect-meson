import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  X,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Building2,
      } from 'lucide-react';
import { useData, HomeShowcaseSlide } from '../../context/DataContext';
import { AdminLayout } from './AdminLayout';
import { ImageUploadPicker } from '../../components/admin/ImageUploadPicker';

const SLIDE_CATEGORIES: HomeShowcaseSlide['category'][] = [
  'Residential',
  'Commercial',
  'Turnkey',
  'Interiors',
  'Structural',
];

export const AdminHomeSlider: React.FC = () => {
  const {
    homeShowcaseSlides,
    addHomeShowcaseSlide,
    updateHomeShowcaseSlide,
    deleteHomeShowcaseSlide,
    reorderHomeShowcaseSlides,
    resetHomeShowcaseSlides,
  } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Residential' as HomeShowcaseSlide['category'],
    location: '',
    image: '/assets/about_hero_villa.jpg',
    architect: '',
    timeline: '',
    scope: '',
    order: 1,
    active: true,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAddModal = () => {
    setEditingSlideId(null);
    setFormData({
      title: '',
      category: 'Residential',
      location: 'Bengaluru, India',
      image: '/assets/about_hero_villa.jpg',
      architect: 'Perfect Mason EPC Cell',
      timeline: '12 Months',
      scope: 'End-to-End Architectural & Structural Execution',
      order: homeShowcaseSlides.length + 1,
      active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (slide: HomeShowcaseSlide) => {
    setEditingSlideId(slide.id);
    setFormData({
      title: slide.title || '',
      category: (slide.category as HomeShowcaseSlide['category']) || 'Residential',
      location: slide.location || '',
      image: slide.image,
      architect: slide.architect || '',
      timeline: slide.timeline || '',
      scope: slide.scope || '',
      order: slide.order,
      active: slide.active !== false,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a project title');
      return;
    }
    if (!formData.image.trim()) {
      alert('Please select or upload a project image');
      return;
    }

    if (editingSlideId) {
      updateHomeShowcaseSlide(editingSlideId, formData);
      showToast(`Updated slide "${formData.title}"`);
    } else {
      addHomeShowcaseSlide(formData);
      showToast(`Added new slide "${formData.title}"`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteHomeShowcaseSlide(id);
    setDeleteConfirmId(null);
    showToast('Slide deleted successfully');
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= homeShowcaseSlides.length) return;
    reorderHomeShowcaseSlides(index, targetIndex);
    showToast('Slide order updated');
  };

  const handleToggleActive = (slide: HomeShowcaseSlide) => {
    updateHomeShowcaseSlide(slide.id, { active: !slide.active });
    showToast(
      slide.active
        ? `Hidden slide "${slide.title}" from Home Page`
        : `Activated slide "${slide.title}" on Home Page`
    );
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Are you sure you want to reset the Home Showcase Slider to the 12 curated default projects? Any custom slides will be replaced.'
      )
    ) {
      resetHomeShowcaseSlides();
      showToast('Reset to 12 curated default projects');
    }
  };

  // Stats calculation
  const totalSlides = homeShowcaseSlides.length;
  const activeSlides = homeShowcaseSlides.filter((s) => s.active !== false).length;
  const uniqueCategories = new Set(homeShowcaseSlides.map((s) => s.category)).size;

  return (
    <AdminLayout>
      <div className="space-y-8 pb-16">
        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-2xl font-medium text-sm"
            >
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A96B]/20 border border-[#C8A96B]/40 text-[#E2C992] text-xs font-mono tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
              HOME PAGE AUTO-SLIDER
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-barlow tracking-tight text-white uppercase">
              Home Showcase Slider Management
            </h1>
            <p className="mt-2 text-sm text-slate-300 font-sans leading-relaxed">
              Curate, replace, and order high-resolution architectural project images displayed in
              the auto-sliding showcase on the Home Page. All changes update instantly on the live
              site.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <button
              onClick={handleResetDefaults}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono tracking-wider uppercase transition-colors"
              title="Reset to 12 curated projects"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>

            <Link
              to="/#architectural-masterworks"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono tracking-wider uppercase transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Site
            </Link>

            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C8A96B] hover:bg-[#d4b77d] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#C8A96B]/25"
            >
              <Plus className="w-4 h-4" />
              Add Project Slide
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-mono uppercase text-slate-500">Total Portfolio Slides</div>
            <div className="mt-2 text-3xl font-black text-slate-900 dark:text-white font-barlow">
              {totalSlides}
            </div>
            <div className="mt-1 text-xs text-slate-400">In database storage</div>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-mono uppercase text-slate-500">Active in Auto-Slider</div>
            <div className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400 font-barlow">
              {activeSlides}
            </div>
            <div className="mt-1 text-xs text-slate-400">Sliding on live home page</div>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-mono uppercase text-slate-500">Disciplines Covered</div>
            <div className="mt-2 text-3xl font-black text-[#C8A96B] font-barlow">
              {uniqueCategories}
            </div>
            <div className="mt-1 text-xs text-slate-400">Residential, Commercial, Turnkey, Interiors</div>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-mono uppercase text-slate-500">Display Engine</div>
            <div className="mt-2 text-xl font-bold text-slate-900 dark:text-white font-mono">
              60 FPS Ticker
            </div>
            <div className="mt-1 text-xs text-emerald-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Continuous Marquee Active
            </div>
          </div>
        </div>

        {/* Live Mini Preview Ribbon */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
                Live Home Page Slider Preview (Scroll horizontally)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#C8A96B]">
              {activeSlides} Active Cards
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 scrollbar-thin">
            {homeShowcaseSlides
              .filter((s) => s.active !== false)
              .map((slide) => (
                <div
                  key={slide.id}
                  className="flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden relative border border-slate-800 group shadow-md"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded bg-black/70 border border-white/20 text-[9px] font-mono text-[#C8A96B] uppercase font-bold">
                      {slide.category}
                    </span>
                  </div>
                  <div className="absolute bottom-2 inset-x-2">
                    <p className="text-xs font-bold text-white truncate">{slide.title}</p>
                    <p className="text-[10px] text-slate-300 truncate">{slide.location}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Slide List / Grid Management */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Showcase Slides Catalog
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Drag or use arrows to change the order. Click edit to replace images or update titles.
              </p>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C8A96B] hover:bg-[#d4b77d] text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Slide
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {homeShowcaseSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                  slide.active === false
                    ? 'bg-slate-50/50 dark:bg-slate-900/50 opacity-60'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-center gap-4">
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-1 text-slate-400">
                    <button
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0}
                      className="p-1 hover:text-slate-900 dark:hover:text-white disabled:opacity-20 transition-opacity"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-mono text-center font-bold text-slate-500">
                      {index + 1}
                    </span>
                    <button
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === homeShowcaseSlides.length - 1}
                      className="p-1 hover:text-slate-900 dark:hover:text-white disabled:opacity-20 transition-opacity"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="w-24 sm:w-32 h-16 sm:h-20 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 relative border border-slate-200 dark:border-slate-700">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 left-1">
                      <span className="px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-[#C8A96B] uppercase font-bold">
                        {slide.category}
                      </span>
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="min-w-0 max-w-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                        {slide.title}
                      </h4>
                      {slide.active === false && (
                        <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-[10px] font-mono font-semibold uppercase">
                          Hidden
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C8A96B]" />
                        <span>{slide.location}</span>
                      </div>
                      {slide.timeline && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{slide.timeline}</span>
                        </div>
                      )}
                      {slide.architect && (
                        <div className="flex items-center gap-1 hidden sm:flex">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          <span className="truncate max-w-[200px]">{slide.architect}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end md:self-center">
                  {/* Visibility Toggle */}
                  <button
                    onClick={() => handleToggleActive(slide)}
                    className={`p-2 rounded-lg border text-xs font-mono transition-colors ${
                      slide.active !== false
                        ? 'border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                        : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600'
                    }`}
                    title={slide.active !== false ? 'Hide from slider' : 'Show in slider'}
                  >
                    {slide.active !== false ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleOpenEditModal(slide)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#C8A96B]" />
                    <span>Edit / Replace Image</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => setDeleteConfirmId(slide.id)}
                    className="p-2 rounded-lg border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Delete slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add / Edit Slide Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-barlow uppercase">
                      {editingSlideId ? 'Edit Showcase Slide' : 'Add New Showcase Slide'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Upload or replace the project image and specify details for the home page
                      slider.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Picker */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Project Showcase Image (Select, Upload, or Enter URL) *
                    </label>
                    <ImageUploadPicker
                      mode="single"
                      value={formData.image}
                      onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
                      label="Showcase Photography"
                      helperText="Choose an unblurred, high-resolution architectural image from library or upload from computer."
                    />
                  </div>

                  {/* Title & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. The Grand Cantilever Villa"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A96B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Discipline / Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value as HomeShowcaseSlide['category'],
                          }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A96B]"
                      >
                        {SLIDE_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Location & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g. Sadashivanagar, Bengaluru"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A96B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Timeline
                      </label>
                      <input
                        type="text"
                        value={formData.timeline}
                        onChange={(e) => setFormData((prev) => ({ ...prev, timeline: e.target.value }))}
                        placeholder="e.g. 14 Months"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A96B]"
                      />
                    </div>
                  </div>

                  {/* Architect & Scope */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Architect / Delivery Cell
                      </label>
                      <input
                        type="text"
                        value={formData.architect}
                        onChange={(e) => setFormData((prev) => ({ ...prev, architect: e.target.value }))}
                        placeholder="e.g. Perfect Mason EPC Cell"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A96B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Scope of Work Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.scope}
                        onChange={(e) => setFormData((prev) => ({ ...prev, scope: e.target.value }))}
                        placeholder="e.g. RCC Cantilever Framing, Exposed Concrete Walls, and Turnkey Civil Handover"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A96B]"
                      />
                    </div>
                  </div>

                  {/* Active Toggle */}
                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="slide-active-toggle"
                      checked={formData.active}
                      onChange={(e) => setFormData((prev) => ({ ...prev, active: e.target.checked }))}
                      className="w-4 h-4 rounded text-[#C8A96B] focus:ring-[#C8A96B] border-slate-300"
                    />
                    <label
                      htmlFor="slide-active-toggle"
                      className="text-xs font-mono uppercase text-slate-700 dark:text-slate-300 cursor-pointer"
                    >
                      Active on Home Page Slider
                    </label>
                  </div>

                  {/* Submit Actions */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono uppercase hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#C8A96B] hover:bg-[#d4b77d] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#C8A96B]/20"
                    >
                      {editingSlideId ? 'Save Changes' : 'Create Slide'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirmId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setDeleteConfirmId(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl"
              >
                <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-4">
                  <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950/60">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold">Delete Slide?</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                  Are you sure you want to remove this slide from the Home Page Auto-Slider? This
                  action cannot be undone.
                </p>
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono uppercase text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirmId)}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono uppercase font-bold"
                  >
                    Delete Permanently
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};
