import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { reviewsConfig, ClientReviewItem } from '../../data/reviewsData';
import { useData } from '../../context/DataContext';
import {
  Sparkles,
  Quote,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const ClientReviews: React.FC = () => {
  const { reviews: dynamicReviews } = useData();
  const effectiveReviews = dynamicReviews && dynamicReviews.length > 0 ? dynamicReviews : reviewsConfig.reviews;
  const { eyebrow, headline, description } = reviewsConfig;

  const standardReviews = effectiveReviews.filter((r) => r.type === 'standard');
  const featuredReview = effectiveReviews.find((r) => r.type === 'featured') || effectiveReviews[effectiveReviews.length - 1] || reviewsConfig.reviews[0];

  const totalReviews = standardReviews.length > 0 ? standardReviews.length : 1;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Auto-advance slider every 4.2 seconds
  useEffect(() => {
    if (isHovered || totalReviews <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalReviews);
    }, 4200);

    return () => clearInterval(timer);
  }, [isHovered, totalReviews]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  // Render a loop of cards for continuous infinite sliding
  const displayCards = standardReviews.length > 0 ? [...standardReviews, ...standardReviews] : [];

  return (
    <section
      id="reviews"
      className="relative w-full bg-white text-slate-900 py-16 sm:py-24 border-t border-slate-100 select-none z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* ============================================================ */}
        {/* 1. TOP EDITORIAL INTRO AREA                                  */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          {/* Left: Eyebrow + Large Heading */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-4 ring-slate-200/80" />
                <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950 animate-ping" />
              </div>

              <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.28em] text-slate-800 font-bold flex items-center gap-2">
                {eyebrow}
                <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-950 uppercase tracking-tight leading-[1.06]">
              <span className="block text-slate-950">{headline.line1}</span>
              <span className="block text-slate-950">{headline.line2}</span>
            </h2>
          </div>

          {/* Right: Supporting Paragraph & Minimal Carousel Controls */}
          <div className="max-w-md flex flex-col items-start lg:items-end gap-5 lg:text-right">
            <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed font-normal">
              {description}
            </p>

            {/* Premium Pill Controls */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/90 px-4 py-2 rounded-full shadow-xs">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-800">
                <span className="text-slate-950">0{currentIndex + 1}</span>
                <span className="text-slate-300">/</span>
                <span>0{totalReviews}</span>
              </div>

              <div className="w-px h-3.5 bg-slate-200" />

              {/* Progress Dots */}
              <div className="flex items-center gap-1.5">
                {standardReviews.map((_, idx) => (
                  <button
                    key={`dot-${idx}`}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx
                        ? 'w-5 bg-slate-950'
                        : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="w-px h-3.5 bg-slate-200" />

              {/* Previous / Next Arrow Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-950 hover:bg-white transition-colors active:scale-95"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-950 hover:bg-white transition-colors active:scale-95"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. MAIN TESTIMONIAL LAYOUT: PHYSICAL SLIDING TRACK + FEATURED*/}
        {/* ============================================================ */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* ========================================================== */}
          {/* LEFT: Physical Continuous Sliding Track (Col span 8)       */}
          {/* ========================================================== */}
          <div className="lg:col-span-8 overflow-hidden rounded-[36px] relative p-1 -m-1">
            {/* Smooth Motion Horizontal Conveyor Track */}
            <motion.div
              className="flex gap-5 sm:gap-6 cursor-grab active:cursor-grabbing"
              animate={{
                x: `calc(-${currentIndex * 50}% - ${currentIndex * 12}px)`,
              }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 18,
                mass: 0.8,
              }}
              drag="x"
              dragConstraints={{ left: -600, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -40) handleNext();
                else if (info.offset.x > 40) handlePrev();
              }}
            >
              {displayCards.map((review: ClientReviewItem, index: number) => {
                const isActive = index % totalReviews === currentIndex;

                return (
                  <div
                    key={`track-card-${review.id}-${index}`}
                    className={`w-[100%] sm:w-[calc(50%-12px)] flex-shrink-0 h-[440px] sm:h-[480px] lg:h-[500px] rounded-[32px] sm:rounded-[36px] p-7 sm:p-9 flex flex-col justify-between transition-all duration-500 ${
                      isActive
                        ? 'bg-white border-2 border-royal-400 shadow-xl shadow-royal-600/5 ring-4 ring-royal-50/70'
                        : 'bg-slate-50/90 border border-slate-200/90 shadow-xs hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      {/* Top Quote Icon & 5-Star Rating */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-royal-100">
                          <Quote className="w-5 h-5 text-slate-950 rotate-180" />
                        </div>

                        <div className="flex items-center gap-1 text-amber-400 bg-white px-2.5 py-1 rounded-full border border-slate-200/70 shadow-xs">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      {/* Testimonial Quote */}
                      <p className="text-base sm:text-lg text-slate-800 font-sans leading-relaxed font-normal">
                        "{review.quote}"
                      </p>
                    </div>

                    {/* Bottom Client Info with Avatar */}
                    <div className="flex items-center gap-3.5 pt-5 border-t border-slate-200/70">
                      {review.avatar && (
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0 ring-2 ring-slate-100">
                          <img
                            src={review.avatar}
                            alt={review.clientName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex flex-col">
                        <span className="font-sans font-bold text-slate-950 text-base leading-tight">
                          {review.clientName}
                        </span>
                        <span className="font-mono text-xs text-slate-950 font-bold mt-0.5">
                          {review.service}
                        </span>
                        <span className="font-sans text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-slate-400" />
                          {review.location}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT: Featured Client Story Card (Col span 4)             */}
          {/* ========================================================== */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="group relative w-full h-[440px] sm:h-[480px] lg:h-[500px] rounded-[32px] sm:rounded-[36px] overflow-hidden bg-slate-950 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end"
            >
              {/* Full-Bleed Client Portrait */}
              <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <img
                  src={featuredReview.image}
                  alt={featuredReview.clientName}
                  className="w-full h-full object-cover object-top transform scale-100 group-hover:scale-103 transition-transform duration-700 ease-out will-change-transform"
                />

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Top-Right Star Rating Badge */}
              <div className="absolute top-6 right-6 z-20 pointer-events-none">
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Information Overlay */}
              <div className="relative z-30 p-8 sm:p-10 flex flex-col justify-end transform transition-transform duration-300 group-hover:-translate-y-1">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5 block">
                  FEATURED CLIENT STORY
                </span>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight leading-tight mb-1">
                  {featuredReview.clientName}
                </h3>

                <div className="flex items-center gap-2 text-xs sm:text-sm font-sans text-slate-200 font-medium">
                  <span>{featuredReview.service}</span>
                  <span className="text-white/40">•</span>
                  <span className="inline-flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {featuredReview.location}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};


