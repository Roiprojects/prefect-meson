import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqConfig, FAQItem } from '../../data/faqData';
import { Sparkles, Plus, Minus } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { eyebrow, headline, description, faqs } = faqConfig;
  const [openId, setOpenId] = useState<string>('faq-01');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-white text-slate-900 py-16 sm:py-24 border-t border-slate-100 select-none z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* ============================================================ */}
        {/* TWO-COLUMN LAYOUT: LEFT EDITORIAL HEADER / RIGHT ACCORDION   */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ========================================================== */}
          {/* LEFT COLUMN: EDITORIAL HEADING & SUPPORTING NARRATIVE      */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            {/* Small Eyebrow Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-4 ring-slate-200/80" />
                <span className="absolute -right-0.5 -bottom-0.5 w-1 h-1 rounded-full bg-slate-950 animate-ping" />
              </div>

              <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.28em] text-slate-800 font-bold flex items-center gap-2">
                {eyebrow}
                <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-950 uppercase tracking-tight leading-[1.06] mb-6">
              <span className="block text-slate-950">{headline.line1}</span>
              <span className="block text-slate-950">{headline.line2}</span>
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed font-normal max-w-md">
              {description}
            </p>
          </div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: VERTICAL ACCORDION LIST                      */}
          {/* ========================================================== */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-3.5">
            {faqs.map((faq: FAQItem, index: number) => {
              const isOpen = openId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-slate-100/40 border-slate-300/90 shadow-xs'
                      : 'bg-[#F6F8FA] hover:bg-slate-100/80 border-slate-200/70 shadow-none'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full text-left px-6 sm:px-7 py-5 sm:py-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-500 rounded-2xl group"
                  >
                    <span
                      className={`font-sans text-base sm:text-[17px] font-semibold tracking-tight transition-colors duration-200 ${
                        isOpen
                          ? 'text-royal-900'
                          : 'text-slate-900 group-hover:text-slate-950'
                      }`}
                    >
                      {faq.question}
                    </span>

                    {/* Geometric Plus/Minus Toggle Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-slate-950 text-white shadow-xs rotate-180'
                          : 'bg-white text-slate-500 group-hover:text-slate-950 border border-slate-200/80'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Answer Collapse/Expand Area */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25, ease: 'easeOut' },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-[90%]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
