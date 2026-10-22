import React, { useState } from 'react';
import { Sparkles, Star, Quote } from 'lucide-react';
import { reviewsConfig, ClientReviewItem } from '../data/reviewsData';
import { useData } from '../context/DataContext';

interface TestimonialsPageProps {
  onOpenQuoteModal?: () => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = () => {
  const { reviews: dynamicReviews } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Residential', 'Turnkey', 'Interiors', 'Commercial'];

  const expandedReviews: ClientReviewItem[] = [
    ...reviewsConfig.reviews,
    {
      id: 'review-04',
      type: 'standard',
      clientName: 'Sanjay Deshmukh',
      service: 'Commercial Office Complex',
      category: 'Commercial',
      location: 'Bengaluru, Karnataka',
      quote:
        'Perfect Mason managed our 120,000 sq.ft tech facility with impeccable civil accuracy. Their weekly milestone reporting gave our board complete confidence.',
      rating: 5,
      avatar: '/assets/review_avatar_rahul.jpg',
    },
    {
      id: 'review-05',
      type: 'standard',
      clientName: 'Meera Nambiar',
      service: 'Custom Villa Architecture',
      category: 'Residential',
      location: 'Kochi, Kerala',
      quote:
        'The concrete cantilevers and teak shadow lines were executed exactly as rendered. An extraordinary engineering team with rare architectural sensitivity.',
      rating: 5,
      avatar: '/assets/review_avatar_ananya.jpg',
    },
    {
      id: 'review-06',
      type: 'featured',
      clientName: 'Kavita & Aditya Roy',
      service: 'Turnkey Luxury Residence',
      category: 'Turnkey',
      location: 'Sadashivanagar, Bengaluru',
      quote:
        'From deep foundation piling to Italian travertine polishing, Perfect Mason made building our dream villa a seamless, inspiring experience.',
      rating: 5,
      image: '/assets/cinematic_grand_estate.jpg',
    },
  ];

  const effectiveReviews = dynamicReviews && dynamicReviews.length > 0 ? dynamicReviews : expandedReviews;

  const filteredReviews = effectiveReviews.filter((r) => {
    if (selectedCategory === 'All') return true;
    return (r.category || '').toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="w-full bg-white text-slate-900 pt-28 sm:pt-36 select-none overflow-hidden">
      {/* 1. HERO */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-12 sm:pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-4 ring-slate-200/80" />
                <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950 animate-ping" />
              </div>
              <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.28em] text-slate-800 font-bold flex items-center gap-2">
                VERIFIED CLIENT TESTIMONIALS
                <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-slate-950 uppercase tracking-tight leading-[1.05]">
              Real experiences. <br />
              <span className="text-slate-950">Uncompromising trust.</span>
            </h1>
          </div>

          <div className="max-w-md lg:pb-2">
            <p className="text-base text-slate-600 font-sans leading-relaxed font-normal">
              Read authentic reviews from homeowners, commercial developers, and architects who partnered with Perfect Mason for their flagship projects.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 border-t border-slate-200/80">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 ${
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

      {/* 2. TESTIMONIALS GRID */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-24 sm:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((review) => {
            if (review.type === 'featured') {
              return (
                <div
                  key={review.id}
                  className="group relative w-full h-[460px] sm:h-[500px] rounded-[36px] overflow-hidden bg-slate-950 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end"
                >
                  <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                    <img
                      src={review.image}
                      alt={review.clientName}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />
                  </div>

                  <div className="absolute top-6 right-6 z-20">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono">
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative z-30 p-8 sm:p-10">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5 block">
                      FEATURED CLIENT STORY
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-1">
                      {review.clientName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-sans mb-3">
                      <span>{review.service}</span>
                      <span>•</span>
                      <span>{review.location}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-sans italic leading-relaxed">
                      "{review.quote}"
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={review.id}
                className="group p-8 rounded-[36px] bg-slate-50 border border-slate-200/90 hover:border-slate-300 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between h-[460px] sm:h-[500px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <Quote className="w-8 h-8 text-slate-300 group-hover:text-slate-900 transition-colors rotate-180" />
                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-base text-slate-700 font-sans leading-relaxed font-normal">
                    "{review.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-6 border-t border-slate-200/80">
                  {review.avatar && (
                    <img
                      src={review.avatar}
                      alt={review.clientName}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    />
                  )}
                  <div>
                    <div className="font-bold text-slate-950 text-base leading-tight font-sans">
                      {review.clientName}
                    </div>
                    <div className="text-xs font-mono text-slate-500 mt-0.5">
                      {review.service}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
