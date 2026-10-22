import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export const LatestBlogsSection: React.FC = () => {
  const navigate = useNavigate();
  const { blogs } = useData();

  const latestBlogs = blogs.slice(0, 3);

  return (
    <section className="relative w-full py-16 sm:py-24 bg-white text-slate-900 overflow-hidden select-none border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-4 ring-slate-200/80" />
                <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950 animate-ping" />
              </div>
              <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.28em] text-slate-800 font-bold flex items-center gap-2">
                EDITORIAL & INSIGHTS
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-950 uppercase tracking-tight leading-[1.1]">
              Construction Intelligence. <br />
              <span className="text-slate-950">Latest Architectural Blogs.</span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-2 flex flex-col items-start lg:items-end">
            <p className="text-base text-slate-600 font-sans leading-relaxed font-normal mb-4">
              Explore our latest publications on sustainable design, turnkey methodology, materials technology, and luxury living.
            </p>
            <button
              type="button"
              onClick={() => navigate('/blogs')}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 hover:text-royal-800 uppercase tracking-wider group"
            >
              <span>VIEW ALL BLOGS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => navigate(`/blogs/${blog.slug}`)}
              className="group rounded-[32px] overflow-hidden bg-slate-50 border border-slate-200/90 hover:border-slate-300 hover:bg-white shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Featured Image */}
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
                        : (blog as any).coverImage || (blog as any).cover_image || fallbackList[idx % fallbackList.length];

                    return (
                      <img
                        src={blogSrc}
                        alt={blog.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = fallbackList[idx % fallbackList.length];
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

                {/* Details */}
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

              {/* Bottom Card Footer */}
              <div className="px-7 pb-7 pt-4 border-t border-slate-200/70 flex items-center justify-between gap-4">
                {(() => {
                  let authorName = 'Vikramaditya Sen';
                  let authorRole = 'Principal Architectural Director';
                  let authorAvatar = '/assets/review_avatar_rahul.jpg';

                  const a: any = blog.author;
                  if (typeof a === 'string') {
                    const trimmed = a.trim();
                    if (trimmed.startsWith('{')) {
                      try {
                        const parsed = JSON.parse(trimmed);
                        authorName = parsed.name || authorName;
                        authorRole = parsed.role || authorRole;
                        authorAvatar = parsed.avatar || authorAvatar;
                      } catch (e) {
                        authorName = trimmed;
                      }
                    } else {
                      authorName = trimmed;
                    }
                  } else if (typeof a === 'object' && a !== null) {
                    authorName = a.name || authorName;
                    authorRole = a.role || authorRole;
                    authorAvatar = a.avatar || authorAvatar;
                    if (typeof authorName === 'string' && authorName.trim().startsWith('{')) {
                      try {
                        const parsed = JSON.parse(authorName.trim());
                        authorName = parsed.name || authorName;
                        authorRole = parsed.role || authorRole;
                        authorAvatar = parsed.avatar || authorAvatar;
                      } catch (e) {}
                    }
                  }

                  return (
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <img
                        src={authorAvatar}
                        alt={authorName}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/assets/review_avatar_rahul.jpg';
                        }}
                        className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-slate-200 shadow-2xs"
                      />
                      <div className="flex flex-col min-w-0 text-left">
                        <span className="text-xs font-bold text-slate-900 truncate block">
                          {authorName}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider truncate block">
                          {authorRole}
                        </span>
                      </div>
                    </div>
                  );
                })()}

                <span className="text-xs font-bold text-slate-950 flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0 font-mono tracking-wider">
                  READ MORE <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
