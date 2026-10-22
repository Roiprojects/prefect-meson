import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { aboutData } from '../../data/aboutData';

export const AboutFAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(aboutData.faq.items[0].id);

  return (
    <section className="relative w-full py-14 md:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Left: Sticky Header */}
          <div className="col-span-1 lg:col-span-5">
            <div className="sticky top-32">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-[6px] h-[6px] rounded-full bg-blue-600"></div>
                <span className="text-[11px] md:text-xs font-semibold tracking-[0.2em] text-slate-800 uppercase">
                  {aboutData.faq.label}
                </span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-4xl md:text-[44px] lg:text-[48px] leading-[1.1] font-light tracking-[-0.03em] text-slate-900 mb-8 whitespace-pre-line"
              >
                {aboutData.faq.heading}
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-lg text-slate-500 font-light leading-relaxed max-w-md"
              >
                {aboutData.faq.supportingText}
              </motion.p>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="col-span-1 lg:col-span-7">
            <div className="flex flex-col gap-4">
              {aboutData.faq.items.map((item, index) => {
                const isOpen = openId === item.id;
                return (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                    className={`rounded-[24px] overflow-hidden transition-colors duration-300 ${
                      isOpen ? 'bg-slate-50' : 'bg-transparent border border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="w-full text-left px-6 py-6 md:px-8 md:py-8 flex items-center justify-between gap-6"
                      aria-expanded={isOpen}
                    >
                      <span className={`text-lg md:text-xl font-light tracking-[-0.01em] transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-slate-900'}`}>
                        {item.question}
                      </span>
                      <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-white shadow-sm text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                        {isOpen ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-6 pb-8 md:px-8 md:pb-8 text-base md:text-lg text-slate-500 font-light leading-relaxed max-w-3xl">
                            {item.answer}
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
      </div>
    </section>
  );
};
