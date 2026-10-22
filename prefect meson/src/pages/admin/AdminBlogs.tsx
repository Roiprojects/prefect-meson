import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Edit2,
  BookOpen,
  Search,
  X,
  ExternalLink,
  ChevronDown,
  Calendar,
  Clock,
  User,
  Tag,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { BlogPost } from '../../data/blogsData';
import { AdminLayout } from './AdminLayout';
import { ImageUploadPicker } from '../../components/admin/ImageUploadPicker';

const categoriesList: BlogPost['category'][] = [
  'Architecture',
  'Commercial Construction',
  'Residential Construction',
  'Construction',
  'Home Building',
  'Interiors',
  'Project Management',
  'Construction Tips',
  'Materials & Technology',
];

export const AdminBlogs: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { blogs, addBlog, updateBlog, deleteBlog } = useData();

  const [isEditing, setIsEditing] = useState<boolean>(searchParams.get('action') === 'create');
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Architecture' as BlogPost['category'],
    status: 'Published' as BlogPost['status'],
    excerpt: '',
    authorName: 'Vikramaditya Sen',
    authorRole: 'Principal Architectural Director',
    authorAvatar: '/assets/review_avatar_rahul.jpg',
    publishedDate: 'September 2026',
    readTime: '5 min read',
    image: '/assets/about_hero.jpg',
    imageAlt: 'Perfect Mason Architectural Construction',
    featured: false,
    tagsText: 'Architecture, Sustainability, Luxury Estates',
    intro: '',
    section1Heading: '1. Bioclimatic Orientation & Thermal Comfort',
    section1Body: 'Detailed analysis of cross-ventilation, overhang shading, and natural lighting optimization.',
    section2Heading: '2. Precision Materials & Execution',
    section2Body: 'Selection of high-grade steel, fair-faced concrete, and regional timber for lasting permanence.',
    conclusion: 'In summary, true luxury lies in the discipline of precision craftsmanship and environmental performance.',
  });

  const handleOpenCreate = () => {
    setSelectedBlogId(null);
    setFormData({
      title: '',
      category: 'Architecture',
      status: 'Published',
      excerpt: '',
      authorName: 'Vikramaditya Sen',
      authorRole: 'Principal Architectural Director',
      authorAvatar: '/assets/review_avatar_rahul.jpg',
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
      image: '',
      imageAlt: '',
      featured: false,
      tagsText: '',
      intro: '',
      section1Heading: '',
      section1Body: '',
      section2Heading: '',
      section2Body: '',
      conclusion: '',
    });
    setIsFormDirty(false);
    setIsEditing(true);
  };

  const handleOpenEdit = (blog: BlogPost) => {
    setSelectedBlogId(blog.id);
    let aName = 'Vikramaditya Sen';
    let aRole = 'Principal Architectural Director';
    let aAvatar = '/assets/review_avatar_rahul.jpg';

    if (typeof blog.author === 'string') {
      const trimmed = (blog.author as string).trim();
      if (trimmed.startsWith('{')) {
        try {
          const parsed = JSON.parse(trimmed);
          aName = parsed.name || aName;
          aRole = parsed.role || aRole;
          aAvatar = parsed.avatar || aAvatar;
        } catch {
          aName = trimmed;
        }
      } else {
        aName = trimmed;
      }
    } else if (blog.author && typeof blog.author === 'object') {
      aName = blog.author.name || aName;
      aRole = blog.author.role || aRole;
      aAvatar = blog.author.avatar || aAvatar;
      if (typeof aName === 'string' && aName.trim().startsWith('{')) {
        try {
          const parsed = JSON.parse(aName.trim());
          aName = parsed.name || aName;
          aRole = parsed.role || aRole;
          aAvatar = parsed.avatar || aAvatar;
        } catch {}
      }
    }

    setFormData({
      title: blog.title,
      category: blog.category,
      status: blog.status || 'Published',
      excerpt: blog.excerpt,
      authorName: aName,
      authorRole: aRole,
      authorAvatar: aAvatar,
      publishedDate: blog.publishedDate,
      readTime: blog.readTime,
      image: blog.image,
      imageAlt: blog.title,
      featured: !!blog.featured,
      tagsText: (blog.tags || []).join(', '),
      intro: blog.content?.intro || '',
      section1Heading: blog.content?.sections?.[0]?.heading || '1. Overview',
      section1Body: blog.content?.sections?.[0]?.body || '',
      section2Heading: blog.content?.sections?.[1]?.heading || '2. Details',
      section2Body: blog.content?.sections?.[1]?.body || '',
      conclusion: blog.content?.conclusion || '',
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
      setSelectedBlogId(null);
    }
  };

  const confirmDiscardModal = () => {
    setShowDiscardConfirm(false);
    setIsEditing(false);
    setIsFormDirty(false);
    setSelectedBlogId(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    try {
      const parsedTags = formData.tagsText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const sections = [];
      if (formData.section1Heading || formData.section1Body) {
        sections.push({
          heading: formData.section1Heading,
          body: formData.section1Body,
        });
      }
      if (formData.section2Heading || formData.section2Body) {
        sections.push({
          heading: formData.section2Heading,
          body: formData.section2Body,
        });
      }

      const payload = {
        title: formData.title.trim(),
        category: formData.category,
        status: formData.status,
        excerpt: formData.excerpt.trim(),
        author: {
          name: formData.authorName.trim(),
          role: formData.authorRole.trim(),
          avatar: formData.authorAvatar.trim() || '/assets/review_avatar_rahul.jpg',
        },
        publishedDate: formData.publishedDate.trim(),
        readTime: formData.readTime.trim(),
        image: formData.image.trim() || '/assets/about_hero.jpg',
        featured: formData.featured,
        tags: parsedTags,
        content: {
          intro: formData.intro.trim(),
          sections,
          conclusion: formData.conclusion.trim(),
        },
      };

      if (selectedBlogId) {
        updateBlog(selectedBlogId, payload);
      } else {
        addBlog(payload);
      }

      setIsFormDirty(false);
      setIsEditing(false);
      setSelectedBlogId(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      if (selectedStatusFilter === 'Published' && blog.status === 'Draft') return false;
      if (selectedStatusFilter === 'Draft' && blog.status !== 'Draft') return false;
      if (selectedCategoryFilter !== 'All' && blog.category !== selectedCategoryFilter) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = blog.title.toLowerCase().includes(query);
        const matchesExcerpt = blog.excerpt.toLowerCase().includes(query);
        const matchesCat = blog.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesExcerpt && !matchesCat) return false;
      }
      return true;
    });
  }, [blogs, selectedStatusFilter, selectedCategoryFilter, searchQuery]);

  return (
    <AdminLayout>
      <div className="space-y-6 pb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>EDITORIAL CMS</span>
            </div>
            <h1 className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-slate-900">
              Blog & Article Management
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-sans max-w-2xl leading-relaxed">
              Publish architectural essays, engineering case studies, material guides, and draft content with rich editorial structure.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-600/20 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </button>
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
                placeholder="Search articles by title, excerpt, category..."
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
                {['All', 'Published', 'Draft'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSelectedStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-all cursor-pointer ${
                      selectedStatusFilter === st
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st === 'All' ? 'All Articles' : st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Quick Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-slate-100 pb-1">
            <span className="text-xs font-medium text-slate-500 font-sans shrink-0 mr-1">Category:</span>
            <button
              type="button"
              onClick={() => setSelectedCategoryFilter('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all shrink-0 cursor-pointer ${
                selectedCategoryFilter === 'All'
                  ? 'bg-blue-600 text-white shadow-xs shadow-blue-600/20'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              All Topics
            </button>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all shrink-0 cursor-pointer ${
                  selectedCategoryFilter === cat
                    ? 'bg-blue-600 text-white shadow-xs shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-sans px-2">
            <span>
              Showing <strong className="text-slate-900 font-mono">{filteredBlogs.length}</strong> of{' '}
              <strong className="text-slate-900 font-mono">{blogs.length}</strong> articles
            </span>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-900 font-sans">No articles found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try adjusting your search criteria or write a new article.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {filteredBlogs.map((blog) => {
                const authorDisplay =
                  typeof blog.author === 'string'
                    ? blog.author
                    : blog.author?.name || 'Editorial Team';

                return (
                  <div
                    key={blog.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-slate-300 hover:shadow-xs transition-all"
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-24 h-20 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/about_hero.jpg';
                        }}
                      />

                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 font-sans border border-blue-100">
                            {blog.category}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              blog.status === 'Draft'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {blog.status === 'Draft' ? 'Draft' : 'Published'}
                          </span>
                          {blog.featured && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                              Featured Highlight
                            </span>
                          )}
                        </div>

                        <h3 className="font-sans font-bold text-sm sm:text-base text-slate-900 line-clamp-1">
                          {blog.title}
                        </h3>

                        <p className="text-xs text-slate-500 font-sans line-clamp-1">
                          {blog.excerpt}
                        </p>

                        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-sans pt-0.5 flex-wrap">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-slate-400" />
                            {authorDisplay}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {blog.publishedDate}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {blog.readTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <Link
                        to={`/blogs/${blog.id}`}
                        target="_blank"
                        className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
                        title="View Live Article"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleOpenEdit(blog)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/40 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      {deleteConfirmId === blog.id ? (
                        <div className="flex items-center gap-1 bg-red-50 p-1 rounded-xl border border-red-200">
                          <button
                            type="button"
                            onClick={() => {
                              deleteBlog(blog.id);
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
                          onClick={() => setDeleteConfirmId(blog.id)}
                          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* ADD / EDIT BLOG POST MODAL */}
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
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900 font-sans tracking-tight">
                        {selectedBlogId ? 'Edit Architectural Article' : 'Draft New Article'}
                      </h2>
                      <p className="text-xs text-slate-500 font-sans">
                        {selectedBlogId ? `Editing: ${formData.title || selectedBlogId}` : 'Publish insights, technical construction guides, and engineering thought leadership'}
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
                <form id="blog-form" onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/60">
                  {/* Section 1: Publication Metadata */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                        01
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                        Publication Identification & Category
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Title */}
                      <div className="sm:col-span-2 lg:col-span-3 space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Article Title <span className="text-blue-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => handleFormChange({ title: e.target.value })}
                          placeholder="e.g. Structural Innovation in High-Rise PEB Steel Construction"
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
                            {categoriesList.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Status */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Publish Status <span className="text-blue-600">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.status}
                            onChange={(e) => handleFormChange({ status: e.target.value as any })}
                            className="w-full h-11 appearance-none bg-white border border-slate-200 rounded-xl px-4 text-xs font-medium text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none cursor-pointer"
                          >
                            <option value="Published">Published Live</option>
                            <option value="Draft">Private Draft</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Read Time */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Estimated Read Time
                        </label>
                        <input
                          type="text"
                          value={formData.readTime}
                          onChange={(e) => handleFormChange({ readTime: e.target.value })}
                          placeholder="e.g. 5 min read"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none placeholder:text-slate-400"
                        />
                      </div>

                      {/* Excerpt */}
                      <div className="sm:col-span-2 lg:col-span-3 space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Article Excerpt / Summary <span className="text-blue-600">*</span>
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={formData.excerpt}
                          onChange={(e) => handleFormChange({ excerpt: e.target.value })}
                          placeholder="Brief 1-2 sentence preview rendered on the blog card and search index..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none leading-relaxed placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Visual Media & Cover Photo */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                        02
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                        Visual Media & Master Cover Photography
                      </h3>
                    </div>

                    <ImageUploadPicker
                      mode="single"
                      value={formData.image}
                      onChange={(url) => handleFormChange({ image: url })}
                      label="Article Hero Cover Photography"
                      helperText="High-resolution banner displayed at the top of the article and on article index cards."
                      categoryFilter="General"
                    />

                    {/* Featured Article Checkbox */}
                    <div className="pt-2 flex items-center gap-3 border-t border-slate-100">
                      <input
                        type="checkbox"
                        id="blog-featured-check"
                        checked={formData.featured}
                        onChange={(e) => handleFormChange({ featured: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 border-slate-300 cursor-pointer"
                      />
                      <label htmlFor="blog-featured-check" className="text-xs font-medium text-slate-700 cursor-pointer select-none">
                        Pin as <strong className="text-slate-900 font-semibold">Featured Spotlight Article</strong> on homepage blog showcase
                      </label>
                    </div>
                  </div>

                  {/* Section 3: Author Details */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                        03
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                        Author Byline & Credentials
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Author Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.authorName}
                          onChange={(e) => handleFormChange({ authorName: e.target.value })}
                          placeholder="e.g. Vikramaditya Sen"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none placeholder:text-slate-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Author Title / Role
                        </label>
                        <input
                          type="text"
                          value={formData.authorRole}
                          onChange={(e) => handleFormChange({ authorRole: e.target.value })}
                          placeholder="e.g. Principal Architectural Director"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Article Content & Structure */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">
                        04
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                        Structured Editorial Content
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Opening Introduction Paragraph
                        </label>
                        <textarea
                          rows={3}
                          value={formData.intro}
                          onChange={(e) => handleFormChange({ intro: e.target.value })}
                          placeholder="Engaging opening thesis introducing the subject matter..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none leading-relaxed placeholder:text-slate-400"
                        />
                      </div>

                      {/* Section 1 */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700 font-sans">
                            Subheading 1
                          </label>
                          <input
                            type="text"
                            value={formData.section1Heading}
                            onChange={(e) => handleFormChange({ section1Heading: e.target.value })}
                            placeholder="e.g. 1. Bioclimatic Orientation & Thermal Comfort"
                            className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700 font-sans">
                            Body Paragraphs 1
                          </label>
                          <textarea
                            rows={3}
                            value={formData.section1Body}
                            onChange={(e) => handleFormChange({ section1Body: e.target.value })}
                            placeholder="Detailed technical insights, materials analysis, and site engineering specifications..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* Section 2 */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700 font-sans">
                            Subheading 2
                          </label>
                          <input
                            type="text"
                            value={formData.section2Heading}
                            onChange={(e) => handleFormChange({ section2Heading: e.target.value })}
                            placeholder="e.g. 2. Precision Materials & Execution"
                            className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700 font-sans">
                            Body Paragraphs 2
                          </label>
                          <textarea
                            rows={3}
                            value={formData.section2Body}
                            onChange={(e) => handleFormChange({ section2Body: e.target.value })}
                            placeholder="Construction methodologies, quality assurance standards..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* Conclusion */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Closing Conclusion Summary
                        </label>
                        <textarea
                          rows={2}
                          value={formData.conclusion}
                          onChange={(e) => handleFormChange({ conclusion: e.target.value })}
                          placeholder="Summary wrap-up or key takeaways for property owners and architects..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none leading-relaxed"
                        />
                      </div>

                      {/* Tags */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-800 font-sans">
                          Topic Tags (Comma-separated)
                        </label>
                        <div className="relative">
                          <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            value={formData.tagsText}
                            onChange={(e) => handleFormChange({ tagsText: e.target.value })}
                            placeholder="e.g. Architecture, Sustainability, Luxury Estates"
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-xs font-sans text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none placeholder:text-slate-400"
                          />
                        </div>
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
                      form="blog-form"
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
                          <span>{selectedBlogId ? 'Save Article' : 'Publish Article'}</span>
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
                    Discard Unsaved Article Changes?
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed">
                    You have modified article sections or metadata. Closing now will discard these modifications.
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
