import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { turnkeyData } from '../data/turnkeyData';

interface TurnkeyServicePageProps {
  onOpenQuoteModal: () => void;
}

export const TurnkeyServicePage: React.FC<TurnkeyServicePageProps> = ({ onOpenQuoteModal }) => {
  const { serviceId } = useParams<{ serviceId: string }>();

  // Find the matching service item from turnkeyData
  const serviceItem = useMemo(() => {
    for (const phase of turnkeyData.matrix.phases) {
      const match = phase.items.find(item => item.href?.endsWith(serviceId || ''));
      if (match) return match;
    }
    return null;
  }, [serviceId]);

  if (!serviceItem) {
    return <Navigate to="/turnkey-project-execution" replace />;
  }

  return (
    <div className="w-full bg-white text-slate-900 pt-28 sm:pt-36 select-none min-h-screen">
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-16 sm:pb-24">
        
        {/* Simple Top Navigation breadcrumb equivalent */}
        <div className="flex items-center gap-2 mb-8">
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-950 font-bold uppercase tracking-widest">
            TURNKEY EXECUTION
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-widest">
            {serviceItem.title}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-slate-950 uppercase tracking-tight leading-[1.05] mb-6"
            >
              {serviceItem.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed font-light mb-10"
            >
              {serviceItem.desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-slate-950 hover:bg-black text-white font-sans text-sm font-bold uppercase tracking-wider transition-all"
              >
                <span>REQUEST CONSULTATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
             <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl relative"
             >
               <img 
                 src="/assets/showcase_03_turnkey.jpg" 
                 alt={serviceItem.title}
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply"></div>
               {serviceItem.badge && (
                 <div className="absolute top-6 right-6">
                    <span className="border border-orange-200 text-slate-900 bg-orange-50/90 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
                      {serviceItem.badge}
                    </span>
                 </div>
               )}
             </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
