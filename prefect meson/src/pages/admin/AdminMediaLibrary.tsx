import React, { useState, useEffect, useRef } from 'react';
import { AdminLayout } from './AdminLayout';
import { ADMIN_MEDIA_CATALOG } from '../../data/adminMediaCatalog';
import { apiService, StorageFileItem } from '../../services/api';
import {
  FolderOpen,
  Upload,
  Search,
  Copy,
  Check,
  Trash2,
  Eye,
  ExternalLink,
  AlertCircle,
  X,
  FileImage,
} from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  category: string;
  size?: string;
  dimensions?: string;
  uploadedAt?: string;
  tags?: string[];
  isCustom?: boolean;
}

export const AdminMediaLibrary: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [customMedia, setCustomMedia] = useState<MediaItem[]>([]);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<MediaItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'All',
    'Commercial',
    'Residential',
    'Turnkey',
    'Interiors',
    'Projects',
    'General',
  ];

  // Fetch custom uploaded files from PostgreSQL storage
  useEffect(() => {
    let isMounted = true;
    async function loadStorageMedia() {
      try {
        const files: StorageFileItem[] = await apiService.getStorageFiles();
        if (!isMounted) return;
        const mapped: MediaItem[] = files.map((f) => ({
          id: f.id,
          title: f.originalName || f.filename,
          url: f.url,
          category: f.bucketId.charAt(0).toUpperCase() + f.bucketId.slice(1),
          size: `${Math.round(f.sizeBytes / 1024)} KB`,
          uploadedAt: new Date(f.createdAt).toLocaleDateString(),
          isCustom: true,
        }));
        setCustomMedia(mapped);
      } catch (err) {
        console.warn('Storage files load warning:', err);
      }
    }
    loadStorageMedia();
    return () => { isMounted = false; };
  }, []);

  // Merge built-in media catalog with custom database uploads
  const allMedia: MediaItem[] = [
    ...customMedia,
    ...ADMIN_MEDIA_CATALOG.map((item) => ({
      id: item.id,
      title: item.title,
      url: item.url,
      category: item.category,
      size: item.size || '350 KB',
      dimensions: item.dimensions || '1920x1080',
      uploadedAt: 'System Catalog',
      tags: item.tags,
      isCustom: false,
    })),
  ];

  // Filter items
  const filteredItems = allMedia.filter((item) => {
    const matchesCat =
      activeCategory === 'All' ||
      item.category.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCat && matchesSearch;
  });

  // Handle Drag & Drop Upload
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError(null);
    setIsUploading(true);
    setUploadProgress(15);

    const bucketId = activeCategory === 'All' ? 'general' : activeCategory.toLowerCase();

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validation
        if (!file.type.startsWith('image/')) {
          throw new Error(`"${file.name}" is not a supported image file. Please upload JPG, PNG, WEBP, or SVG.`);
        }
        if (file.size > 20 * 1024 * 1024) {
          throw new Error(`"${file.name}" exceeds the 20MB file size limit.`);
        }

        setUploadProgress(50);
        const res = await apiService.uploadFile(file, bucketId);
        setUploadProgress(85);

        const newMedia: MediaItem = {
          id: res.fileId,
          title: res.filename,
          url: res.url,
          category: bucketId.charAt(0).toUpperCase() + bucketId.slice(1),
          size: `${Math.round(res.size / 1024)} KB`,
          uploadedAt: 'Just Now',
          isCustom: true,
        };

        setCustomMedia((prev) => [newMedia, ...prev]);
      }

      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (err: any) {
      setIsUploading(false);
      setUploadProgress(0);
      setUploadError(err.message || 'Failed to upload image. Please try again.');
    }
  };

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (item: MediaItem) => {
    if (item.isCustom) {
      try {
        await apiService.deleteStorageFile(item.id);
        setCustomMedia((prev) => prev.filter((m) => m.id !== item.id));
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
    setDeleteConfirmItem(null);
    if (selectedItem?.id === item.id) setSelectedItem(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-7 pb-16">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                <FolderOpen className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-bold text-slate-950 font-sans tracking-tight">
                Media Asset Library
              </h1>
            </div>
            <p className="text-sm text-slate-600 font-sans max-w-2xl">
              Upload, preview, and organize architectural photos, construction progress captures, and project imagery used across all website pages.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-60"
            >
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'Uploading Image...' : 'Upload New Media'}</span>
            </button>
          </div>
        </div>

        {/* Upload Progress Bar */}
        {isUploading && (
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-sans text-blue-900 font-semibold">
              <span>Storing image directly into database storage...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-blue-200 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Upload Error Banner */}
        {uploadError && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{uploadError}</span>
            </div>
            <button
              type="button"
              onClick={() => setUploadError(null)}
              className="font-bold underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by filename, tag, or path..."
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
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Drag & Drop Upload Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleFileUpload(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-6 text-center bg-white/60 hover:bg-blue-50/30 transition-all cursor-pointer space-y-2"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Upload className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-700 font-sans">
            <strong className="text-blue-700 font-semibold">Click to upload</strong> or drag and drop images here
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Supported: JPG, PNG, WEBP, SVG • Maximum file size: 20MB
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-2xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Image Preview Box */}
              <div
                onClick={() => setSelectedItem(item)}
                className="aspect-square bg-slate-900 relative overflow-hidden cursor-pointer"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="p-2 rounded-xl bg-white/90 text-slate-900 shadow-md">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-md font-mono text-[9px] font-bold uppercase bg-slate-950/70 text-white backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Meta Info */}
              <div className="p-2.5 space-y-1">
                <div className="text-xs font-semibold text-slate-800 truncate" title={item.title}>
                  {item.title}
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{item.size}</span>
                  {item.isCustom && <span className="text-blue-600 font-bold">Custom</span>}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-2.5 pb-2.5 pt-1 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(item)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                  title="Copy URL"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                {item.isCustom && (
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmItem(item)}
                    className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <FileImage className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold text-slate-800 text-sm">No media items found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No images matched your search or category filter. Try clearing the filters or upload new media.
            </p>
          </div>
        )}

        {/* Lightbox / Details Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <FileImage className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-slate-900 text-xs font-sans truncate max-w-md">
                    {selectedItem.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4">
                <div className="max-h-[420px] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-200">
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="max-h-[420px] max-w-full object-contain"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Category</span>
                    <span className="font-semibold text-slate-800">{selectedItem.category}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">File Size</span>
                    <span className="font-semibold text-slate-800">{selectedItem.size}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Dimensions</span>
                    <span className="font-semibold text-slate-800">{selectedItem.dimensions || 'High Resolution'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Uploaded</span>
                    <span className="font-semibold text-slate-800">{selectedItem.uploadedAt}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Image URL</span>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <input
                      type="text"
                      readOnly
                      value={selectedItem.url}
                      className="bg-transparent text-xs text-slate-700 flex-1 outline-none font-mono truncate"
                    />
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(selectedItem)}
                      className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold shrink-0"
                    >
                      {copiedId === selectedItem.id ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <a
                  href={selectedItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Size</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">Delete Media Asset?</h3>
                <p className="text-xs text-slate-500">
                  Are you sure you want to delete <strong className="text-slate-700 font-semibold">{deleteConfirmItem.title}</strong>? If this image is currently used on a page or project, the reference will be removed.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmItem(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(deleteConfirmItem)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-xs"
                >
                  Delete Asset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
