import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { useData } from '../../context/DataContext';
import { ClientReviewItem } from '../../data/reviewsData';
import {
  Star,
  Plus,
  Trash2,
  Edit2,
  Search,
  MapPin,
  Sparkles,
  Quote,
  X,
} from 'lucide-react';
import { ImageUploadPicker } from '../../components/admin/ImageUploadPicker';

export const AdminTestimonials: React.FC = () => {
  const { reviews, addReview, updateReview, deleteReview } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<ClientReviewItem, 'id'>>({
    clientName: '',
    service: 'Residential Construction',
    category: 'Residential',
    location: 'Bengaluru, Karnataka',
    quote: '',
    rating: 5,
    type: 'standard',
    avatar: '/assets/review_avatar_rahul.jpg',
  });

  const categories = ['All', 'Residential', 'Commercial', 'Turnkey', 'Interiors'];

  const filteredReviews = reviews.filter((r) => {
    const matchesCat = categoryFilter === 'All' || r.category === categoryFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      r.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingReviewId(null);
    setFormData({
      clientName: '',
      service: 'Residential Construction',
      category: 'Residential',
      location: 'Bengaluru, Karnataka',
      quote: '',
      rating: 5,
      type: 'standard',
      avatar: '/assets/review_avatar_rahul.jpg',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (review: ClientReviewItem) => {
    setEditingReviewId(review.id);
    setFormData({
      clientName: review.clientName,
      service: review.service,
      category: review.category,
      location: review.location,
      quote: review.quote,
      rating: review.rating || 5,
      type: review.type || 'standard',
      avatar: review.avatar || '/assets/review_avatar_rahul.jpg',
      image: review.image,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.quote.trim()) {
      return;
    }

    if (editingReviewId) {
      updateReview(editingReviewId, formData);
    } else {
      addReview(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteReview(id);
    setDeleteConfirmId(null);
  };

  const toggleFeatured = (review: ClientReviewItem) => {
    updateReview(review.id, {
      type: review.type === 'featured' ? 'standard' : 'featured',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-7">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                <Star className="w-5 h-5 fill-blue-600" />
              </span>
              <h1 className="text-2xl font-bold text-slate-950 font-sans tracking-tight">
                Client Testimonials & Reviews
              </h1>
            </div>
            <p className="text-sm text-slate-600 font-sans max-w-2xl">
              Manage client endorsements, verified project quotes, ratings, and featured reviews that appear on the homepage and testimonials page.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Review</span>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client name, quote, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-sans"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.map((review) => {
            const isFeatured = review.type === 'featured';

            return (
              <div
                key={review.id}
                className={`p-5 rounded-2xl bg-white border transition-all flex flex-col justify-between shadow-2xs ${
                  isFeatured
                    ? 'border-blue-300 ring-1 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.avatar || '/assets/review_avatar_rahul.jpg'}
                        alt={review.clientName}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/assets/review_avatar_rahul.jpg';
                        }}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 text-xs font-sans">
                          {review.clientName}
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-sans">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{review.location}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFeatured(review)}
                      className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isFeatured
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-400 hover:text-amber-600'
                      }`}
                      title={isFeatured ? 'Featured on Homepage' : 'Mark as Featured'}
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Rating Stars & Category Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: review.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {review.category}
                    </span>
                  </div>

                  {/* Review Quote */}
                  <div className="relative mb-4">
                    <Quote className="w-4 h-4 text-slate-300 absolute -top-1 -left-1 opacity-50" />
                    <p className="text-xs text-slate-700 font-sans leading-relaxed italic pl-3">
                      "{review.quote}"
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-500 font-sans font-medium mb-3">
                    Service: <span className="text-slate-800 font-semibold">{review.service}</span>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    ID: {review.id}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(review)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                      title="Edit Review"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(review.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <Quote className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold text-slate-800 text-sm">No reviews found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No client testimonials matched your search or category filters.
            </p>
          </div>
        )}

        {/* Add / Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                <h3 className="font-bold text-slate-900 text-sm font-sans">
                  {editingReviewId ? 'Edit Client Review' : 'Add New Client Review'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-800 font-sans">
                    Client Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Kavitha Reddy"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-sans focus:border-blue-600 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-800 font-sans">
                      Service Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-sans focus:border-blue-600 outline-none bg-white"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Turnkey">Turnkey</option>
                      <option value="Interiors">Interiors</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-800 font-sans">
                      Star Rating (1-5)
                    </label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-sans focus:border-blue-600 outline-none bg-white"
                    >
                      <option value="5">5 Stars ★★★★★</option>
                      <option value="4">4 Stars ★★★★☆</option>
                      <option value="3">3 Stars ★★★☆☆</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-800 font-sans">
                    Specific Service Delivered
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Luxury Villa Construction"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-sans focus:border-blue-600 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-800 font-sans">
                    Client Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sadashivanagar, Bengaluru"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-sans focus:border-blue-600 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-800 font-sans">
                    Review Quote / Testimonial
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write client testimonial here..."
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-sans focus:border-blue-600 outline-none leading-relaxed"
                  />
                </div>

                {/* Avatar Picker */}
                <ImageUploadPicker
                  mode="single"
                  label="Client Avatar Photo"
                  helperText="Upload or choose portrait avatar thumbnail"
                  value={formData.avatar || ''}
                  onChange={(url) => setFormData({ ...formData, avatar: url })}
                />

                <div className="p-3 border-t border-slate-100 flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs"
                  >
                    {editingReviewId ? 'Save Updates' : 'Add Testimonial'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">Delete Testimonial?</h3>
                <p className="text-xs text-slate-500">
                  Are you sure you want to delete this client review? This action cannot be undone.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-xs"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
