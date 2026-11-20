import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { footerConfig } from '../../data/footerData';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Sparkles,
  Lock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

interface FooterProps {
  onOpenQuoteModal?: () => void;
  onNavigate?: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const { settings } = useData();
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 4, y: y * 4 });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const handleLink = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    } else {
      navigate(href);
    }
  };

  return (
    <footer
      id="footer"
      className="relative w-full bg-[#050B18] text-slate-300 select-none z-20 overflow-hidden"
    >
      {/* 1. CINEMATIC ARCHITECTURAL IMAGE WITH TRANSLUCENT OVERLAID TEXT */}
      <div
        onMouseMove={handleMouseMove}
        className="relative w-full h-[55vh] sm:h-[65vh] lg:h-[75vh] min-h-[450px] overflow-hidden flex flex-col justify-end"
      >
        {/* Full-Bleed Architectural Photography Layer */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.img
            src={settings?.defaultBannerImage || "/assets/cinematic_grand_estate.jpg"}
            alt="Perfect Mason Completed Architectural Estate"
            animate={{
              scale: 1.02,
              x: mousePos.x,
              y: mousePos.y,
            }}
            transition={{
              scale: { duration: 6.0, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
              x: { duration: 0.2 },
              y: { duration: 0.2 },
            }}
            className="w-full h-full object-cover object-center transform will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050B18]/30 via-[#050B18]/70 to-[#050B18] pointer-events-none" />
        </div>

        {/* GIANT TRANSLUCENT "PERFECT MASON" TYPOGRAPHY */}
        <div className="relative z-20 w-full px-4 sm:px-8 text-center overflow-hidden flex flex-col items-center justify-end pointer-events-none pb-2 sm:pb-4">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.95,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center justify-center w-full leading-[0.78] sm:leading-[0.80]"
          >
            <span
              className="font-serif font-black tracking-[-0.03em] uppercase text-white/60 text-[15vw] sm:text-[16.5vw] lg:text-[18vw] select-none will-change-transform w-full block drop-shadow-md"
              style={{
                textShadow: '0 4px 24px rgba(0,0,0,0.5)',
              }}
            >
              PERFECT
            </span>
            <span
              className="font-serif font-black tracking-[-0.03em] uppercase text-white/55 text-[15vw] sm:text-[16.5vw] lg:text-[18vw] select-none will-change-transform w-full block drop-shadow-md -mt-2 sm:-mt-4"
              style={{
                textShadow: '0 4px 24px rgba(0,0,0,0.5)',
              }}
            >
              MASON
            </span>
          </motion.div>
        </div>
      </div>

      {/* 2. DARK FOOTER INFORMATION AREA (5 SECTIONS REQUIRED) */}
      <div className="relative z-30 bg-[#050B18] pt-12 sm:pt-16 pb-12 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 lg:gap-12 pb-14 sm:pb-16 items-start">
            {/* Column 1: Brand Info & Social (4 Cols) */}
            <div className="md:col-span-4 flex flex-col space-y-6">
              <div className="flex items-center gap-4 sm:gap-5">
                <img
                  src={settings?.logoUrl || "/logo.png"}
                  alt="Perfect Mason Construction"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-contain shadow-2xl ring-2 ring-white/40 bg-white p-1 shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-display text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                    {settings?.companyName || footerConfig.brand.name}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-slate-300 font-extrabold uppercase tracking-widest mt-1">
                    BUILD IT RIGHT
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-sm font-normal">
                {settings?.footerDescription || settings?.tagline || footerConfig.brand.tagline}
              </p>

              {/* Social Icons Strip */}
              <div className="flex items-center gap-3 pt-2">
                {[
                  { platform: 'Instagram', href: settings?.socialInstagram || 'https://instagram.com' },
                  { platform: 'Facebook', href: settings?.socialFacebook || 'https://facebook.com' },
                  { platform: 'LinkedIn', href: settings?.socialLinkedin || 'https://linkedin.com' },
                  { platform: 'YouTube', href: settings?.socialYoutube || 'https://youtube.com' },
                ].map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Perfect Mason on ${social.platform}`}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-slate-950 border border-white/10 hover:border-royal-500 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: COMPANY (2 Cols) */}
            <div className="md:col-span-2">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-white mb-5">
                Company
              </h3>
              <ul className="space-y-3 text-sm">
                {footerConfig.companyLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => handleLink(link.href)}
                      className="text-slate-400 hover:text-white transition-colors duration-200 text-left font-sans text-xs sm:text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: SERVICES (3 Cols) */}
            <div className="md:col-span-3">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-white mb-5">
                Services
              </h3>
              <ul className="space-y-3 text-sm">
                {footerConfig.servicesLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => handleLink(link.href)}
                      className="text-slate-400 hover:text-white transition-colors duration-200 text-left font-sans text-xs sm:text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: EXPLORE & CONTACT (3 Cols) */}
            <div className="md:col-span-3 flex flex-col space-y-6">
              {/* Explore Links */}
              <div>
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-white mb-3">
                  Explore
                </h3>
                <div className="flex gap-4 text-xs sm:text-sm">
                  {footerConfig.exploreLinks.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => handleLink(link.href)}
                      className="text-slate-400 hover:text-white transition-colors duration-200 font-sans"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-white mb-3">
                  Contact
                </h3>
                <div className="space-y-2.5 text-xs text-slate-400">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{settings?.phone || footerConfig.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{settings?.email || footerConfig.contact.email}</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{settings?.address || footerConfig.contact.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. BOTTOM LEGAL ROW */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-500">
            <div>
              {settings?.footerCopyright || footerConfig.legal.copyright}
            </div>

            <div className="text-slate-400 font-medium">
              {settings?.footerLegalNote || footerConfig.legal.builtWith}
            </div>

            <div className="flex items-center gap-4">
              <span className="hover:text-slate-300 transition-colors cursor-pointer">
                {footerConfig.legal.privacy}
              </span>
              <span>•</span>
              <span className="hover:text-slate-300 transition-colors cursor-pointer">
                {footerConfig.legal.terms}
              </span>
              <span>•</span>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="hover:text-slate-400 transition-colors flex items-center gap-1 font-mono text-[11px]"
                title="Admin Management"
              >
                <Lock className="w-3 h-3" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
