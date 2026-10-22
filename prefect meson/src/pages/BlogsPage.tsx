import React, { useState } from 'react';
import { Sparkles, Search, Clock, Calendar, ArrowRight } from 'lucide-react';
import { BlogPost } from '../data/blogsData';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

export const BlogsPage: React.FC = () => {
  const navigate = useNavigate();
  const { blogs } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Construction',
    'Home Building',
    'Commercial Construction',
    'Residential Construction',
    'Interiors',
    'Architecture',
    'Project Management',
    'Construction Tips',
    'Materials & Technology',
  ];

  const publishedBlogs = blogs.filter((b) => b.status !== 'Draft');

  const filteredBlogs = publishedBlogs.filter((blog) => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = publishedBlogs.find((b) => b.featured) || publishedBlogs[0];

  return (
    <div className="w-full bg-white text-slate-900 pt-28 sm:pt-36 select-none overflow-hidden min-h-screen">
      {/* 1. BLOG HERO & FEATURED */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-12 sm:pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-4 ring-slate-200/80" />
                <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950 animate-ping" />
              </div>
              <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.28em] text-slate-800 font-bold flex items-center gap-2">
                INSIGHTS & ARCHITECTURAL PAPERS
                <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-slate-950 uppercase tracking-tight leading-[1.05]">
              Construction intelligence. <br />
              <span className="text-slate-950">Thought leadership.</span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-slate-50 border border-slate-200/90 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500 text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Featured Blog Card */}
        {featuredBlog && selectedCategory === 'All' && !searchQuery && (
          <div
            onClick={() => navigate(`/blogs/${featuredBlog.slug}`)}
            className="rounded-[36px] overflow-hidden bg-slate-950 text-white p-8 sm:p-12 lg:p-14 cursor-pointer shadow-2xl relative group mb-16"
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={featuredBlog.image || (featuredBlog as any).coverImage || '/assets/about_hero.jpg'}
                alt={featuredBlog.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/about_hero.jpg';
                }}
                className="w-full h-full object-cover opacity-40 group-hover:scale-103 group-hover:opacity-50 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            </div>

            <div className="relative z-20 max-w-3xl flex flex-col justify-end min-h-[320px] sm:min-h-[360px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3.5 py-1 rounded-full bg-slate-950 font-mono text-[11px] font-bold uppercase tracking-wider">
                  FEATURED EDITORIAL
                </span>
                <span className="text-xs font-mono text-slate-300">{featuredBlog.readTime}</span>
              </div>

              <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight mb-4 group-hover:text-slate-300 transition-colors">
                {featuredBlog.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed mb-6 line-clamp-2">
                {featuredBlog.excerpt}
              </p>

              <div className="flex items-center gap-3">
                {(() => {
                  let authorName = 'Vikramaditya Sen';
                  let authorAvatar = '/assets/review_avatar_rahul.jpg';

                  const a: any = featuredBlog.author;
                  if (typeof a === 'string') {
                    const trimmed = a.trim();
                    if (trimmed.startsWith('{')) {
                      try {
                        const parsed = JSON.parse(trimmed);
                        authorName = parsed.name || authorName;
                        authorAvatar = parsed.avatar || authorAvatar;
                      } catch (e) {
                        authorName = trimmed;
                      }
                    } else {
                      authorName = trimmed;
                    }
                  } else if (typeof a === 'object' && a !== null) {
                    authorName = a.name || authorName;
                    authorAvatar = a.avatar || authorAvatar;
                    if (typeof authorName === 'string' && authorName.trim().startsWith('{')) {
                      try {
                        const parsed = JSON.parse(authorName.trim());
                        authorName = parsed.name || authorName;
                        authorAvatar = parsed.avatar || authorAvatar;
                      } catch (e) {}
                    }
                  }

                  return (
                    <>
                      <img
                        src={authorAvatar}
                        alt={authorName}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/assets/review_avatar_rahul.jpg';
                        }}
                        className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0"
                      />
                      <div className="text-xs min-w-0">
                        <div className="font-bold text-white truncate">{authorName}</div>
                        <div className="text-slate-400">{featuredBlog.publishedDate}</div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-slate-950 text-white shadow-md'
                  : 'bg-slate-100/80 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 2. BLOG LISTING GRID */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-24 sm:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog: BlogPost) => (
            <div
              key={blog.id}
              onClick={() => navigate(`/blogs/${blog.slug}`)}
              className="group rounded-[32px] overflow-hidden bg-slate-50 border border-slate-200/90 hover:border-slate-300 hover:bg-white shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="h-[220px] overflow-hidden bg-slate-900 relative">
                  {(() => {
                    const fallbackList = [
                      '/assets/comm_complex_hero.jpg',
                      '/assets/interior_01_living.jpg',
                      '/assets/turnkey_hero.jpg',
                      '/assets/about_hero.jpg',
                    ];
                    const blogSrc =
                      blog.image && typeof blog.image === 'string' && blog.image.trim() !== '' && !blog.image.includes('undefined')
                        ? blog.image
                        : (blog as any).coverImage || (blog as any).cover_image || fallbackList[0];

                    return (
                      <img
                        src={blogSrc}
                        alt={blog.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = fallbackList[0];
                        }}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                      />
                    );
                  })()}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] uppercase tracking-wider font-bold">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-3">
                    <Calendar className="w-3.5 h-3.5 text-slate-900" />
                    <span>{blog.publishedDate}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-slate-900" />
                    <span>{blog.readTime}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-slate-950 uppercase tracking-tight mb-3 group-hover:text-slate-950 transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-4 border-t border-slate-200/70 flex items-center justify-between gap-4">
                {(() => {
                  let authorName = 'Vikramaditya Sen';
                  let authorAvatar = '/assets/review_avatar_rahul.jpg';

                  const a: any = blog.author;
                  if (typeof a === 'string') {
                    const trimmed = a.trim();
                    if (trimmed.startsWith('{')) {
                      try {
                        const parsed = JSON.parse(trimmed);
                        authorName = parsed.name || authorName;
                        authorAvatar = parsed.avatar || authorAvatar;
                      } catch (e) {
                        authorName = trimmed;
                      }
                    } else {
                      authorName = trimmed;
                    }
                  } else if (typeof a === 'object' && a !== null) {
                    authorName = a.name || authorName;
                    authorAvatar = a.avatar || authorAvatar;
                    if (typeof authorName === 'string' && authorName.trim().startsWith('{')) {
                      try {
                        const parsed = JSON.parse(authorName.trim());
                        authorName = parsed.name || authorName;
                        authorAvatar = parsed.avatar || authorAvatar;
                      } catch (e) {}
                    }
                  }

                  return (
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <img
                        src={authorAvatar}
                        alt={authorName}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/assets/review_avatar_rahul.jpg';
                        }}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <span className="text-xs font-semibold text-slate-900 truncate block">
                        {authorName}
                      </span>
                    </div>
                  );
                })()}

                <span className="text-xs font-bold text-slate-950 flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0 font-mono tracking-wider">
                  READ <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
