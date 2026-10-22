import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { HeaderConfig, NavItemType } from '../../types/navigation';
import { navigationConfig } from '../../data/navigationData';
import { BrandLogo } from './BrandLogo';
import { NavItem } from './NavItem';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { CTAButton } from './CTAButton';
import { QuoteModal } from './QuoteModal';
import { useData } from '../../context/DataContext';

interface NavbarProps {
  config?: HeaderConfig;
  activeRoute?: string;
  onNavigate?: (href: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config = navigationConfig,
  activeRoute = '#home',
  onNavigate,
}) => {
  const { pageContents } = useData();
  const headerCtaText = pageContents?.['header-footer']?.header?.ctaText || config.ctaButton.label;
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeMegaMenuId, setActiveMegaMenuId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);

  const navRef = useRef<HTMLElement>(null);
  const menuCloseTimeoutRef = useRef<number | null>(null);

  // Throttled scroll listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click & ESC to close mega menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMegaMenuId(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMegaMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnter = useCallback((item: NavItemType) => {
    if (menuCloseTimeoutRef.current) {
      window.clearTimeout(menuCloseTimeoutRef.current);
      menuCloseTimeoutRef.current = null;
    }
    if (item.hasMegaMenu) {
      setActiveMegaMenuId(item.id);
    } else {
      setActiveMegaMenuId(null);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    menuCloseTimeoutRef.current = window.setTimeout(() => {
      setActiveMegaMenuId(null);
    }, 200);
  }, []);

  const handleItemClick = (item: NavItemType) => {
    setActiveMegaMenuId(null);
    if (onNavigate) {
      onNavigate(item.href);
    }
  };

  const activeMegaMenuItem = config.navItems.find(
    (item) => item.id === activeMegaMenuId && item.hasMegaMenu
  ) || null;

  return (
    <>
      {/* FLOATING TOP LIGHT NAVBAR WRAPPER */}
      <div
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none flex justify-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 transition-all duration-500"
      >
        <motion.header
          ref={navRef}
          role="banner"
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`relative pointer-events-auto w-full max-w-[1440px] 2xl:max-w-[1560px] rounded-full transition-all duration-400 ease-out flex items-center justify-between select-none ${
            isScrolled
              ? 'nav-floating-capsule-scrolled py-2 sm:py-2.5 px-4 sm:px-6'
              : 'nav-floating-capsule py-2.5 sm:py-3 px-4 sm:px-6'
          }`}
        >
          {/* 1. LEFT: PERFECT MASON LOGO / WORDMARK */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="shrink-0 mr-3 lg:mr-4 xl:mr-6 z-30 relative"
          >
            <BrandLogo
              onClick={() => {
                setActiveMegaMenuId(null);
                if (onNavigate) onNavigate('#home');
              }}
            />
          </motion.div>

          {/* 2. CENTER-RIGHT: DESKTOP NAVIGATION LINKS */}
          <nav
            role="navigation"
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 2xl:gap-3 ml-auto shrink-0 mr-2 xl:mr-4"
          >
            {config.navItems
              .filter((item) => item.id !== 'contact' && item.id !== 'blogs' && item.id !== 'testimonials')
              .map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.12 + idx * 0.04,
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="shrink-0"
                >
                  <NavItem
                    item={item}
                    isActive={
                      activeRoute === item.href || 
                      (item.id === 'commercial' && activeRoute.startsWith('/commercial')) ||
                      (item.id === 'turnkey' && activeRoute.startsWith('/turnkey'))
                    }
                    isOpen={activeMegaMenuId === item.id}
                    onMouseEnter={() => handleMouseEnter(item)}
                    onMouseLeave={() => {}}
                    onClick={() => handleItemClick(item)}
                  />
                </motion.div>
              ))}
          </nav>

          {/* 3. FAR RIGHT: GET A QUOTE BUTTON & MOBILE HAMBURGER TOGGLE */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop Contact Us Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="hidden sm:block"
            >
              <CTAButton
                label={headerCtaText}
                onClick={() => {
                  setActiveMegaMenuId(null);
                  if (onNavigate) onNavigate(config.ctaButton.href || '/contact-us');
                }}
              />
            </motion.div>

            {/* Mobile-only Hamburger Button (lg:hidden) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden flex items-center justify-center p-2 rounded-xl text-slate-900 hover:bg-slate-100/80 active:bg-slate-200/80 transition-colors cursor-pointer focus:outline-none"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6 text-slate-900" strokeWidth={2.2} />
            </motion.button>
          </div>

          {/* MEGA MENU CONTAINER IN LIGHT THEME */}
          <MegaMenu
            activeItem={activeMegaMenuItem}
            isOpen={!!activeMegaMenuItem}
            onClose={() => setActiveMegaMenuId(null)}
            onItemSelect={(href) => {
              if (onNavigate) onNavigate(href);
            }}
          />
        </motion.header>
      </div>

      {/* MOBILE LIGHT NAVIGATION OVERLAY */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        config={config}
        activeRoute={activeRoute}
        onNavigate={(href) => {
          if (onNavigate) onNavigate(href);
        }}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      {/* INTERACTIVE LIGHT THEME INQUIRY MODAL */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
};
