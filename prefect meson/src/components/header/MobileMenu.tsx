import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { HeaderConfig } from '../../types/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  config: HeaderConfig;
  activeRoute: string;
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
}

const cinematicLinks = [
  { id: 'home', label: 'HOME', href: '/' },
  { id: 'about', label: 'ABOUT US', href: '/about-us' },
  { id: 'commercial', label: 'COMMERCIAL', href: '/commercial-construction' },
  { id: 'residential', label: 'RESIDENTIAL', href: '/residential-construction' },
  { id: 'turnkey', label: 'TURNKEY', href: '/turnkey-project-execution' },
  { id: 'interiors', label: 'INTERIORS', href: '/interiors' },
  { id: 'gallery', label: 'GALLERY', href: '/gallery' },
  { id: 'blogs', label: 'BLOGS', href: '/blogs' },
  { id: 'testimonials', label: 'TESTIMONIALS', href: '/testimonials' },
  { id: 'contact', label: 'CONTACT US', href: '/contact-us' },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  config,
  activeRoute,
  onNavigate,
  onOpenQuoteModal,
}) => {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(href);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="cinematic-navigation-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[rgba(190,225,245,0.78)] backdrop-blur-[28px] backdrop-saturate-[120%] text-slate-900 flex flex-col justify-between overflow-y-auto overflow-x-hidden selection:bg-slate-1000/20"
        >
          {/* ATMOSPHERIC SMOKY HAZE & SKY-BLUE GLASS FORMS */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
            {/* Soft white-sky atmospheric cloud top-left */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{
                scale: [0.95, 1.08, 0.95],
                x: [-10, 20, -10],
                y: [-15, 10, -15],
                opacity: [0.55, 0.75, 0.55],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-white/75 via-sky-100/50 to-transparent blur-[90px]"
            />

            {/* Soft blue-grey mist bottom-right */}
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{
                scale: [1, 1.12, 1],
                x: [15, -20, 15],
                y: [10, -20, 10],
                opacity: [0.45, 0.65, 0.45],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-36 -right-36 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-sky-300/40 via-blue-200/40 to-white/50 blur-[85px]"
            />

            {/* Center soft diffuse ambient glass haze */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-gradient-to-r from-sky-200/30 via-white/40 to-sky-100/25 blur-[110px]" />
          </div>

          {/* TOP BAR (Header inside Menu) */}
          <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 py-6 lg:py-8 shrink-0 relative z-10">
            {/* Logo / Brand Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="flex items-center gap-3.5 cursor-pointer group"
              onClick={(e) => handleLinkClick('/', e)}
            >
              <img
                src="/logo.png"
                alt="Perfect Mason Construction"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform bg-white p-1 ring-2 ring-slate-300/80 shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-display font-black tracking-[0.16em] text-base sm:text-lg lg:text-xl uppercase text-slate-950">
                  PERFECT MASON
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-slate-700 uppercase mt-0.5">
                  BUILD IT RIGHT
                </span>
              </div>
            </motion.div>

            {/* Close Button: Translucent glass circle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              onClick={onClose}
              className="group p-3 sm:p-4 rounded-full bg-white/70 hover:bg-white border border-white/80 text-slate-900 hover:text-slate-950 shadow-sm backdrop-blur-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-90 transition-transform duration-500" strokeWidth={1.75} />
            </motion.button>
          </div>

          {/* MAIN MENU CONTENT (Splits into 2 columns on Desktop) */}
          <div className="flex-1 px-6 sm:px-10 lg:px-16 py-4 flex flex-col lg:flex-row gap-10 lg:gap-16 justify-between relative z-10">
            {/* LEFT: Massive Navigation Links */}
            <nav className="flex-1 flex flex-col justify-center gap-2 sm:gap-2.5 lg:gap-3 my-auto py-4">
              {cinematicLinks.map((item, index) => {
                const isActive = activeRoute === item.href || (item.href !== '/' && activeRoute.startsWith(item.href));

                return (
                    <div key={item.id} className="flex flex-col">
                      <motion.a
                        href={item.href}
                        onClick={(e) => handleLinkClick(item.href, e)}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 + index * 0.035, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="group flex items-center gap-3 sm:gap-5 focus:outline-none py-1 select-none"
                      >
                        {/* Menu Numbering */}
                        <span
                          className={`font-mono text-xs sm:text-sm font-bold tracking-widest hidden md:block transition-colors duration-300 ${
                            isActive ? 'text-slate-950' : 'text-slate-400/90 group-hover:text-slate-950/70'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        {/* Menu Item Label */}
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span
                            className={`font-display text-2xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-bold uppercase tracking-tight leading-none transition-all duration-300 ${
                              isActive
                                ? 'text-slate-950 translate-x-1.5 sm:translate-x-3'
                                : 'text-slate-500/90 hover:text-slate-950 hover:translate-x-1.5 sm:hover:translate-x-3'
                            }`}
                          >
                            {item.label}
                          </span>

                          {/* Active Indicator */}
                          {isActive && (
                            <span className="flex items-center gap-1.5 translate-x-2">
                              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#EA580C] shadow-xs" />
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-950 hidden sm:inline-block" />
                            </span>
                          )}
                        </div>
                      </motion.a>

                      {/* Sub-items for RESIDENTIAL with Font-Display Luxury Serif Typography */}
                      {item.id === 'residential' && (
                        <div className="pl-4 md:pl-10 pt-2 pb-3 flex flex-col gap-2.5 border-l-2 border-slate-950/20 ml-2 md:ml-4 my-2">
                          {/* 1. Luxury Villas on Item Rate Basis */}
                          <a
                            href="/residential-construction/category/luxury-villas-item-rate"
                            onClick={(e) => handleLinkClick('/residential-construction/category/luxury-villas-item-rate', e)}
                            className="group/sub flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white/40 hover:bg-white/90 border border-slate-200/60 transition-all duration-300 shadow-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                              <span className="font-display text-sm sm:text-base font-bold uppercase tracking-wide text-slate-900 group-hover/sub:text-slate-950 transition-colors">
                                Luxury Villas (Item Rate Basis)
                              </span>
                            </div>
                            <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-slate-950 text-white font-bold uppercase tracking-wider shrink-0">
                              ITEM RATE
                            </span>
                          </a>

                          {/* 2. Affordable Homes with Specification Packages */}
                          <div className="p-2.5 sm:p-3 rounded-xl bg-white/50 border border-slate-200/70 flex flex-col gap-2.5">
                            <a
                              href="/residential-construction/category/affordable-homes-packages"
                              onClick={(e) => handleLinkClick('/residential-construction/category/affordable-homes-packages', e)}
                              className="group/sub flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                                <span className="font-display text-sm sm:text-base font-bold uppercase tracking-wide text-slate-900 group-hover/sub:text-slate-950 transition-colors">
                                  Affordable Homes (Packages as per Specs)
                                </span>
                              </div>
                              <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-bold uppercase tracking-wider shrink-0">
                                PACKAGES
                              </span>
                            </a>

                            {/* Package Sub-Tiers with font-display */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-200/60">
                              <a
                                href="/residential-construction/category/affordable-homes-packages#basic-package"
                                onClick={(e) => handleLinkClick('/residential-construction/category/affordable-homes-packages#basic-package', e)}
                                className="p-2 rounded-lg bg-white/80 hover:bg-slate-950 hover:text-white transition-all text-slate-800 flex items-center justify-between group/pkg shadow-2xs"
                              >
                                <span className="font-display text-xs font-bold uppercase tracking-wider">Basic</span>
                                <span className="font-mono text-[11px] font-bold text-slate-900 group-hover/pkg:text-amber-300">₹2,300/sft</span>
                              </a>
                              <a
                                href="/residential-construction/category/affordable-homes-packages#premium-package"
                                onClick={(e) => handleLinkClick('/residential-construction/category/affordable-homes-packages#premium-package', e)}
                                className="p-2 rounded-lg bg-white/80 hover:bg-slate-950 hover:text-white transition-all text-slate-800 flex items-center justify-between group/pkg shadow-2xs"
                              >
                                <span className="font-display text-xs font-bold uppercase tracking-wider">Premium</span>
                                <span className="font-mono text-[11px] font-bold text-slate-900 group-hover/pkg:text-amber-300">₹2,800/sft</span>
                              </a>
                              <a
                                href="/residential-construction/category/affordable-homes-packages#luxury-package"
                                onClick={(e) => handleLinkClick('/residential-construction/category/affordable-homes-packages#luxury-package', e)}
                                className="p-2 rounded-lg bg-white/80 hover:bg-slate-950 hover:text-white transition-all text-slate-800 flex items-center justify-between group/pkg shadow-2xs"
                              >
                                <span className="font-display text-xs font-bold uppercase tracking-wider">Luxury</span>
                                <span className="font-mono text-[11px] font-bold text-slate-900 group-hover/pkg:text-amber-300">₹3,000/sft</span>
                              </a>
                            </div>
                          </div>

                          {/* 3. Eco Friendly Homes */}
                          <a
                            href="/residential-construction/category/eco-friendly-homes"
                            onClick={(e) => handleLinkClick('/residential-construction/category/eco-friendly-homes', e)}
                            className="group/sub flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white/40 hover:bg-white/90 border border-slate-200/60 transition-all duration-300 shadow-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                              <span className="font-display text-sm sm:text-base font-bold uppercase tracking-wide text-slate-900 group-hover/sub:text-slate-950 transition-colors">
                                Eco Friendly Homes (Design & Execution)
                              </span>
                            </div>
                            <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-700 text-white font-bold uppercase tracking-wider shrink-0">
                              SUSTAINABLE
                            </span>
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

            {/* RIGHT: Translucent White Glass Conversation Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="lg:w-[340px] xl:w-[390px] flex flex-col justify-end pb-6 lg:pb-8 shrink-0"
            >
              <div className="p-6 sm:p-7 rounded-3xl bg-white/55 backdrop-blur-xl border border-white/80 shadow-lg shadow-sky-950/5 space-y-6">
                {/* Conversation Header & Description */}
                <div>
                  <h3 className="font-mono text-[10px] sm:text-xs text-slate-900 uppercase tracking-widest font-bold mb-2.5 border-b border-slate-200/80 pb-2">
                    Start a Conversation
                  </h3>
                  <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                    Looking to execute a landmark architectural project? Get in touch with our engineering directors.
                  </p>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuoteModal();
                    }}
                    className="group w-full flex items-center justify-between bg-white hover:bg-slate-950 text-slate-950 hover:text-white border border-slate-200/90 hover:border-slate-950 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all duration-300"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-4 h-4 text-slate-950 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                </div>

                {/* Corporate Office Information */}
                <div className="space-y-3.5">
                  <h3 className="font-mono text-[10px] sm:text-xs text-slate-900 uppercase tracking-widest font-bold border-b border-slate-200/80 pb-2">
                    Corporate Office
                  </h3>

                  <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <MapPin className="w-4 h-4 text-slate-950 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      {config.contactQuickInfo.address}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                    <Phone className="w-4 h-4 text-slate-950 shrink-0" />
                    <a href={`tel:${config.contactQuickInfo.phone}`} className="hover:text-slate-950 font-medium transition-colors">
                      {config.contactQuickInfo.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                    <Mail className="w-4 h-4 text-slate-950 shrink-0" />
                    <a href={`mailto:${config.contactQuickInfo.email}`} className="hover:text-slate-950 font-medium transition-colors">
                      {config.contactQuickInfo.email}
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 border-t border-slate-200/80 pt-3.5">
                  {['LinkedIn', 'Instagram', 'Twitter'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="font-mono text-[10px] sm:text-xs text-slate-500 hover:text-slate-950 uppercase tracking-widest font-semibold transition-colors"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
