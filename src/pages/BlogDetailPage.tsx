import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPost } from '../data/blogsData';
import { useData } from '../context/DataContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  ArrowRight,
  MessageCircle,
  Linkedin,
  Twitter,
} from 'lucide-react';

interface BlogDetailPageProps {
  onOpenQuoteModal?: () => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ onOpenQuoteModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { blogs } = useData();
  const [copied, setCopied] = useState(false);

  const blog: BlogPost = blogs.find((b) => b.slug === slug) || blogs[0];
  const relatedBlogs = blogs.filter((b) => b.slug !== blog.slug).slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = encodeURIComponent(`${blog.title} - Perfect Mason Insights`);
  const currentUrl = encodeURIComponent(window.location.href);

  return (
    <div className="w-full bg-white text-slate-900 pt-28 sm:pt-36 select-none overflow-hidden min-h-screen">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 mb-8">
        <button
          type="button"
          onClick={() => navigate('/blogs')}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 hover:text-slate-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ALL INSIGHTS</span>
        </button>
      </div>

      {/* 1. ARTICLE HEADER */}
      <article className="max-w-4xl mx-auto px-6 sm:px-10 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-900 border border-slate-300/80 font-mono text-xs font-bold uppercase tracking-wider">
              {blog.category}
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-slate-900" />
              <span>{blog.publishedDate}</span>
              <span>•</span>
              <Clock className="w-3.5 h-3.5 text-slate-900" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-950 uppercase tracking-tight leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Author Badge + Social Share Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-slate-200/80">
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
                <div className="flex items-center gap-4">
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/assets/review_avatar_rahul.jpg';
                    }}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="font-bold text-slate-950 text-sm font-sans">{authorName}</div>
                    <div className="text-xs font-mono text-slate-500">{authorRole}</div>
                  </div>
                </div>
              );
            })()}

            {/* Social Share Strip */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 font-bold uppercase mr-1">
                Share:
              </span>
              <a
                href={`https://wa.me/?text=${shareText}%20${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-colors"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-950 text-slate-950 hover:text-white transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white transition-colors"
                title="Share on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 text-xs font-mono"
                title="Copy Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Feature Image */}
        <div className="w-full h-[360px] sm:h-[480px] rounded-[36px] overflow-hidden bg-slate-900 mb-12 shadow-xl">
          <img
            src={blog.image || (blog as any).coverImage || '/assets/about_hero.jpg'}
            alt={blog.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/assets/about_hero.jpg';
            }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-slate max-w-none space-y-8 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
          <p className="font-medium text-slate-900 text-lg sm:text-xl leading-relaxed border-l-4 border-slate-950 pl-6 py-1 bg-slate-100/40 rounded-r-2xl">
            {blog.content.intro}
          </p>

          {blog.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4 pt-4">
              <h2 className="font-display text-2xl font-bold text-slate-950 uppercase tracking-tight">
                {section.heading}
              </h2>
              <p>{section.body}</p>
            </div>
          ))}

          <div className="p-8 rounded-3xl bg-[#F6F8FA] border border-slate-200/90 mt-10">
            <h3 className="font-display text-lg font-bold text-slate-950 uppercase tracking-tight mb-2">
              Summary & Architectural Outlook
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-sans">
              {blog.content.conclusion}
            </p>
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-10 pt-6 border-t border-slate-200/80">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase mr-2">Tags:</span>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Enquiry CTA Card */}
        <div className="mt-14 p-8 sm:p-12 rounded-[36px] bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
              START YOUR JOURNEY
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-white mb-2">
              Have an Architectural Requirement?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-md">
              Speak directly with our team to explore design feasibility and turnkey execution for your project.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenQuoteModal}
            className="px-8 py-4 rounded-full bg-slate-950 hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </article>

      {/* 2. RELATED ARTICLES */}
      <section className="w-full bg-[#F6F8FA] border-t border-slate-200/80 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <h2 className="font-display text-2xl font-bold text-slate-950 uppercase tracking-tight mb-8">
            Related Architectural Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedBlogs.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/blogs/${rel.slug}`)}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col sm:flex-row gap-6 items-center"
              >
                <img
                  src={rel.image}
                  alt={rel.title}
                  className="w-full sm:w-40 h-32 rounded-2xl object-cover shrink-0"
                />
                <div>
                  <span className="font-mono text-xs text-slate-950 font-bold uppercase block mb-1">
                    {rel.category}
                  </span>
                  <h3 className="font-display text-lg font-bold text-slate-950 uppercase mb-1">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
