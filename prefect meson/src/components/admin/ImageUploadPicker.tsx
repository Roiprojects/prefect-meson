import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  X,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
  Check,
  Plus,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { ADMIN_MEDIA_CATALOG } from '../../data/adminMediaCatalog';

import { apiService } from '../../services/api';

interface SingleImagePickerProps {
  mode: 'single';
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  categoryFilter?: 'Residential' | 'Commercial' | 'Turnkey' | 'Interiors' | 'Projects' | 'General';
}

interface MultipleImagePickerProps {
  mode: 'multiple';
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  helperText?: string;
  categoryFilter?: 'Residential' | 'Commercial' | 'Turnkey' | 'Interiors' | 'Projects' | 'General';
}

export type ImageUploadPickerProps = SingleImagePickerProps | MultipleImagePickerProps;

export const ImageUploadPicker: React.FC<ImageUploadPickerProps> = (props) => {
  const { mode, label, helperText, categoryFilter } = props;
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(categoryFilter || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUrlFallback, setShowUrlFallback] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter media library items
  const filteredCatalog = ADMIN_MEDIA_CATALOG.filter((item) => {
    const matchesCat =
      activeCategory === 'All' ||
      item.category === activeCategory ||
      (activeCategory === 'Portfolio' && item.category === 'Projects');

    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCat && matchesSearch;
  });

  // Handle direct PostgreSQL Storage upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const bucketId = (categoryFilter || 'general').toLowerCase();

    try {
      if (mode === 'single') {
        const file = files[0];
        try {
          const res = await apiService.uploadFile(file, bucketId);
          props.onChange(res.url);
        } catch (uploadErr) {
          console.warn('Backend storage upload error, using direct FileReader fallback:', uploadErr);
          const reader = new FileReader();
          reader.onload = (uploadEvent) => {
            const result = uploadEvent.target?.result as string;
            if (result) props.onChange(result);
          };
          reader.readAsDataURL(file);
        }
      } else {
        const uploadedUrls: string[] = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          try {
            const res = await apiService.uploadFile(file, bucketId);
            uploadedUrls.push(res.url);
          } catch {
            const reader = new FileReader();
            await new Promise((resolve) => {
              reader.onload = (uploadEvent) => {
                const result = uploadEvent.target?.result as string;
                if (result) uploadedUrls.push(result);
                resolve(true);
              };
              reader.readAsDataURL(file);
            });
          }
        }
        if (uploadedUrls.length > 0) {
          props.onChange([...props.values, ...uploadedUrls]);
        }
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    if (mode === 'single') {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const res = ev.target?.result as string;
          if (res) props.onChange(res);
        };
        reader.readAsDataURL(file);
      }
    } else {
      const newUrls: string[] = [];
      let loaded = 0;
      const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
      if (validFiles.length === 0) return;

      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const res = ev.target?.result as string;
          if (res) newUrls.push(res);
          loaded++;
          if (loaded === validFiles.length) {
            props.onChange([...props.values, ...newUrls]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Multiple mode reorder / delete helpers
  const handleMoveGallery = (index: number, direction: 'left' | 'right') => {
    if (mode !== 'multiple') return;
    const items = [...props.values];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;
    props.onChange(items);
  };

  const handleRemoveGalleryItem = (index: number) => {
    if (mode !== 'multiple') return;
    const items = props.values.filter((_, i) => i !== index);
    props.onChange(items);
  };

  // Toggle selection from media catalog modal
  const handleSelectFromLibrary = (url: string) => {
    if (mode === 'single') {
      props.onChange(url);
      setIsLibraryOpen(false);
    } else {
      if (props.values.includes(url)) {
        props.onChange(props.values.filter((u) => u !== url));
      } else {
        props.onChange([...props.values, url]);
      }
    }
  };

  // Fallback direct URL add
  const handleAddCustomUrl = () => {
    if (!urlInput.trim()) return;
    if (mode === 'single') {
      props.onChange(urlInput.trim());
    } else {
      props.onChange([...props.values, urlInput.trim()]);
    }
    setUrlInput('');
    setShowUrlFallback(false);
  };

  const categories = [
    'All',
    'Residential',
    'Commercial',
    'Turnkey',
    'Interiors',
    'Portfolio',
    'General',
  ];

  return (
    <div className="space-y-3">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={mode === 'multiple'}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Label and Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
            {label || (mode === 'single' ? 'Main Hero Image' : 'Gallery Photography')}
          </label>
          {helperText && <p className="text-[11px] text-slate-500 mt-0.5">{helperText}</p>}
        </div>

        <div className="flex items-center gap-2">
          {/* Pick from Library Button */}
          <button
            type="button"
            onClick={() => setIsLibraryOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-500/30 text-xs font-semibold cursor-pointer transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
            <span>Select from Project Assets ({ADMIN_MEDIA_CATALOG.length})</span>
          </button>

          {/* Upload Button */}
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs disabled:opacity-60"
          >
            {isUploading ? (
              <>
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>{mode === 'single' ? 'Upload Image' : 'Upload Images'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* SINGLE IMAGE PREVIEW / UPLOAD DROPZONE */}
      {mode === 'single' && (
        <div>
          {props.value ? (
            <div className="relative group rounded-2xl border-2 border-slate-200 overflow-hidden bg-slate-900/5 p-2 transition-all hover:border-slate-400">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Image Box */}
                <div className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-inner">
                  <img
                    src={props.value}
                    alt="Hero Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/project_01_residential.jpg';
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                    Active Hero Image
                  </div>
                </div>

                {/* Details & Actions */}
                <div className="flex-1 w-full space-y-2">
                  <div className="text-xs font-mono text-slate-600 truncate max-w-md bg-white border border-slate-200 rounded-lg p-2">
                    <span className="text-slate-400 select-none mr-1.5 font-sans">Source:</span>
                    {props.value.startsWith('data:image')
                      ? `Uploaded File (Base64 Data ~${Math.round(props.value.length / 1024)} KB)`
                      : props.value}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer"
                    >
                      <Upload className="w-3 h-3 text-slate-500" />
                      <span>Replace File</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsLibraryOpen(true)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer"
                    >
                      <ImageIcon className="w-3 h-3 text-amber-600" />
                      <span>Change from Assets</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => props.onChange('')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State Dropzone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]'
                  : 'border-slate-300 bg-white hover:bg-slate-50/80 hover:border-slate-400'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-900">
                Drag & drop your image here, or <span className="text-amber-600 underline">browse device</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Supports PNG, JPG, WebP, SVG (Unlimited resolution)
              </p>
            </div>
          )}
        </div>
      )}

      {/* MULTIPLE GALLERY IMAGES MANAGER */}
      {mode === 'multiple' && (
        <div className="space-y-3">
          {/* Gallery Items Grid */}
          {props.values.length > 0 ? (
            <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-mono font-semibold text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>{props.values.length} Gallery Photos Attached</span>
                </span>
                <button
                  type="button"
                  onClick={() => props.onChange([])}
                  className="text-[11px] font-mono text-red-600 hover:text-red-700 cursor-pointer hover:underline"
                >
                  Remove All
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {props.values.map((imgUrl, index) => (
                  <div
                    key={`${index}-${imgUrl.slice(0, 30)}`}
                    className="relative group rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shadow-xs hover:shadow-md transition-all aspect-4/3"
                  >
                    <img
                      src={imgUrl}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/project_01_residential.jpg';
                      }}
                    />

                    {/* Order Badge */}
                    <div className="absolute top-1.5 left-1.5 bg-slate-900/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded shadow-xs">
                      #{index + 1}
                    </div>

                    {/* Overlay Action Buttons */}
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveGallery(index, 'left');
                          }}
                          title="Move Left"
                          className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-900 cursor-pointer transition-transform active:scale-95"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveGalleryItem(index);
                        }}
                        title="Delete Image"
                        className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white cursor-pointer transition-transform active:scale-95"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {index < props.values.length - 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveGallery(index, 'right');
                          }}
                          title="Move Right"
                          className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-900 cursor-pointer transition-transform active:scale-95"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Quick Add Square Card */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl border-2 border-dashed border-slate-300 hover:border-slate-500 bg-slate-50/50 hover:bg-slate-100 flex flex-col items-center justify-center gap-1 aspect-4/3 cursor-pointer transition-colors text-slate-600 hover:text-slate-900"
                >
                  <Plus className="w-5 h-5 text-slate-400" />
                  <span className="text-[11px] font-mono font-semibold">Add More</span>
                </button>
              </div>
            </div>
          ) : (
            /* Empty State Multiple */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]'
                  : 'border-slate-300 bg-white hover:bg-slate-50/80 hover:border-slate-400'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mb-3">
                <Layers className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-900">
                Upload Gallery Photos or drag & drop files here
              </p>
              <p className="text-xs text-slate-500 mt-1">
                You can select multiple photos at once or pick from the existing website media library
              </p>
            </div>
          )}
        </div>
      )}

      {/* Quick Toggle for Custom URL paste */}
      <div className="pt-1">
        {!showUrlFallback ? (
          <button
            type="button"
            onClick={() => setShowUrlFallback(true)}
            className="text-[11px] font-mono text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Or enter direct image web link / path</span>
          </button>
        ) : (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-700 font-semibold">
                Direct Image URL or Path:
              </span>
              <button
                type="button"
                onClick={() => setShowUrlFallback(false)}
                className="text-[11px] text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Hide
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="/assets/project_01_residential.jpg or https://images.unsplash.com/..."
                className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <button
                type="button"
                onClick={handleAddCustomUrl}
                className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer hover:bg-black transition-colors"
              >
                Apply URL
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 🖼️ INTERACTIVE VISUAL MEDIA ASSET LIBRARY MODAL */}
      {isLibraryOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div
            className="bg-white border border-slate-200 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    Website Media & Project Assets
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Browse and select high-resolution project photography from the website catalog
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsLibraryOpen(false)}
                className="w-9 h-9 rounded-xl border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category & Search Toolbar */}
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search image name or tag..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* Media Grid Content */}
            <div className="p-5 flex-1 overflow-y-auto max-h-[60vh]">
              {filteredCatalog.length === 0 ? (
                <div className="py-16 text-center text-slate-400">
                  <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-medium">No images match your filter</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredCatalog.map((item) => {
                    const isSelected =
                      mode === 'single'
                        ? props.value === item.url
                        : props.values.includes(item.url);

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectFromLibrary(item.url)}
                        className={`group relative rounded-2xl border-2 overflow-hidden bg-slate-50 cursor-pointer transition-all flex flex-col ${
                          isSelected
                            ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                            : 'border-slate-200 hover:border-slate-400 hover:shadow-sm'
                        }`}
                      >
                        {/* Image Preview */}
                        <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/assets/project_01_residential.jpg';
                            }}
                          />

                          {/* Selected Checkmark Badge */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md">
                              <Check className="w-4 h-4" />
                            </div>
                          )}

                          {/* Category Tag */}
                          <div className="absolute bottom-2 left-2 bg-slate-950/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                            {item.category}
                          </div>
                        </div>

                        {/* Title & Tag Info */}
                        <div className="p-2.5 bg-white flex-1 flex flex-col justify-between">
                          <h4 className="text-xs font-semibold text-slate-900 line-clamp-1">
                            {item.title}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 truncate mt-1">
                            {item.url}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="text-xs text-slate-500 font-mono">
                {mode === 'multiple'
                  ? `${props.values.length} images currently selected for gallery`
                  : props.value
                  ? 'Click any image to set as hero'
                  : 'Select an image to set as hero'}
              </div>

              <button
                type="button"
                onClick={() => setIsLibraryOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
              >
                Done Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
