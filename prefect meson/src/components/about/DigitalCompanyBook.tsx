import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  List,
  Maximize2,
  Minimize2,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import {
  generateBookSpreads,
  bookChapters,
  BookPage as BookPageType,
  BookSpread
} from '../../data/digitalBookData';
import { ndlCompanyProfile } from '../../data/ndlCompanyData';
import imgCoverArchitectural from '/assets/about_completed_project.jpg';
import imgHeroVilla from '/assets/about_hero_villa.jpg';
import imgCorpConstruction from '/assets/corp_main_construction.jpg';
import imgGrandEstate from '/assets/cinematic_grand_estate.jpg';
import imgMachineryPlant from '/assets/process_architectural_planning.jpg';

interface DigitalCompanyBookProps {
  onOpenQuoteModal?: () => void;
}

export const DigitalCompanyBook: React.FC<DigitalCompanyBookProps> = ({ onOpenQuoteModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobilePageSide, setMobilePageSide] = useState<'left' | 'right'>('left');
  const [isTurning, setIsTurning] = useState(false);

  const bookContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const spreads = useRef<BookSpread[]>(generateBookSpreads()).current;
  const totalSpreads = spreads.length;
  const currentSpread = spreads[currentSpreadIndex] || spreads[0];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Escape') {
        if (isTocOpen) {
          setIsTocOpen(false);
        } else if (isFullscreen) {
          toggleFullscreen();
        }
      } else if (e.key === 'Home') {
        goToSpread(0);
      } else if (e.key === 'End') {
        goToSpread(totalSpreads - 1);
      }
    },
    [isOpen, isTocOpen, isFullscreen, currentSpreadIndex, totalSpreads, isMobile, mobilePageSide]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleOpenBook = () => {
    setIsOpen(true);
    setCurrentSpreadIndex(1);
    setMobilePageSide('left');
  };

  const handleCloseBook = () => {
    setIsOpen(false);
    setCurrentSpreadIndex(0);
    setMobilePageSide('left');
    setIsTocOpen(false);
  };

  const triggerTurnAnimation = () => {
    setIsTurning(true);
    setTimeout(() => setIsTurning(false), 450);
  };

  const goToNext = () => {
    if (isTurning) return;
    if (isMobile) {
      if (mobilePageSide === 'left' && currentSpreadIndex > 0 && currentSpreadIndex < totalSpreads - 1) {
        setMobilePageSide('right');
        triggerTurnAnimation();
      } else {
        if (currentSpreadIndex < totalSpreads - 1) {
          triggerTurnAnimation();
          setCurrentSpreadIndex((prev) => prev + 1);
          setMobilePageSide('left');
        }
      }
    } else {
      if (currentSpreadIndex < totalSpreads - 1) {
        triggerTurnAnimation();
        setCurrentSpreadIndex((prev) => prev + 1);
      }
    }
  };

  const goToPrev = () => {
    if (isTurning) return;
    if (isMobile) {
      if (mobilePageSide === 'right') {
        setMobilePageSide('left');
        triggerTurnAnimation();
      } else {
        if (currentSpreadIndex > 1) {
          triggerTurnAnimation();
          setCurrentSpreadIndex((prev) => prev - 1);
          setMobilePageSide('right');
        } else if (currentSpreadIndex === 1) {
          handleCloseBook();
        }
      }
    } else {
      if (currentSpreadIndex > 1) {
        triggerTurnAnimation();
        setCurrentSpreadIndex((prev) => prev - 1);
      } else if (currentSpreadIndex === 1) {
        handleCloseBook();
      }
    }
  };

  const goToSpread = (index: number) => {
    if (index === 0) {
      handleCloseBook();
      return;
    }
    const target = Math.max(0, Math.min(index, totalSpreads - 1));
    triggerTurnAnimation();
    setCurrentSpreadIndex(target);
    setMobilePageSide('left');
    setIsOpen(true);
    setIsTocOpen(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      bookContainerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // Dynamic stack thickness calculation for realistic physical depth
  const progressRatio = totalSpreads > 1 ? (currentSpreadIndex - 1) / (totalSpreads - 2) : 0;
  const leftStackPx = Math.round(2 + progressRatio * 10);
  const rightStackPx = Math.round(12 - progressRatio * 10);

  return (
    <section
      ref={bookContainerRef}
      className="relative w-full bg-[#EFECE6] border-b border-[#DCD6CA] select-none py-10 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-10 overflow-hidden font-sans"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 30%, rgba(255,255,255,0.7) 0%, rgba(239,236,230,0.4) 60%, rgba(220,214,202,0.8) 100%),
          linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 32px 32px, 32px 32px'
      }}
    >
      {/* SECTION HEADER & PUBLICATION INTRO */}
      <div className="max-w-[1480px] mx-auto mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D8D1C2] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#071D38]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#071D38]">
              MONOGRAPH & COMPANY PROFILE // PHYSICAL PUBLICATION
            </span>
          </div>
          <h2 className="font-barlow text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-[#071D38] tracking-tight">
            NDL Engineers and Contractors
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#071D38]/70 uppercase tracking-widest mt-1">
            Official Hardcover Monograph • Est. 2016 • Bangalore, India
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isOpen ? (
            <button
              type="button"
              onClick={handleOpenBook}
              className="px-6 py-3 rounded-lg bg-[#071D38] hover:bg-[#0A274E] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-[#C8A96B]" />
              <span>Open Company Book</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsTocOpen(true)}
                className="px-4 py-2.5 rounded-lg bg-white/90 hover:bg-white border border-[#D5CDC0] text-[#071D38] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <List className="w-4 h-4 text-[#071D38]" />
                <span className="hidden sm:inline">Index / TOC</span>
              </button>
              <button
                type="button"
                onClick={handleCloseBook}
                className="px-4 py-2.5 rounded-lg bg-white/90 hover:bg-white border border-[#D5CDC0] text-[#071D38] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#071D38]" />
                <span className="hidden sm:inline">Close Book</span>
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2.5 rounded-lg bg-white/90 hover:bg-white border border-[#D5CDC0] text-[#071D38] transition-all shadow-xs cursor-pointer"
                title="Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3D BOOK STAGE CONTAINER                                      */}
      {/* ============================================================ */}
      <div className="relative max-w-[1500px] mx-auto flex items-center justify-center min-h-[580px] sm:min-h-[720px] lg:min-h-[820px] [perspective:2400px]">
        
        {/* Soft Ambient Contact Shadow Under Book */}
        <div
          className="absolute -bottom-6 sm:-bottom-10 left-1/2 -translate-x-1/2 w-[92%] sm:w-[86%] h-12 sm:h-20 rounded-[100%] bg-black/25 blur-2xl pointer-events-none transition-all duration-700"
          style={{
            transform: `translateX(-50%) scale(${isOpen ? 1.02 : 0.65})`,
            opacity: isOpen ? 0.35 : 0.45
          }}
        />

        {/* ------------------------------------------------------------ */}
        {/* SCENARIO A: CLOSED HARDCOVER BOOK                            */}
        {/* ------------------------------------------------------------ */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-book"
              initial={{ opacity: 0, scale: 0.94, rotateY: -6 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotateY: -15 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onClick={handleOpenBook}
              className="relative cursor-pointer group select-none"
              style={{
                width: 'min(90vw, 540px)',
                aspectRatio: '1 / 1.38',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Hardcover Outer Thickness Edge (Side Spine & Block) */}
              <div
                className="absolute inset-y-0 -left-4 w-5 bg-gradient-to-r from-[#051120] via-[#091B33] to-[#051120] rounded-l-md shadow-2xl"
                style={{ transform: 'translateZ(-14px)' }}
              />
              
              {/* Bottom & Right Page Block Edge Stack Layers (Paper Thickness Simulation) */}
              <div
                className="absolute -bottom-3 inset-x-2 h-3 bg-gradient-to-b from-[#F2EDE2] via-[#E5DEC9] to-[#C9BEA7] rounded-b-sm border border-[#C5BBA4] shadow-md"
                style={{ transform: 'translateZ(-12px)' }}
              >
                <div className="w-full h-full opacity-60 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_1px,#B5A992_1px,#B5A992_2px)]" />
              </div>
              <div
                className="absolute -right-3 inset-y-2 w-3 bg-gradient-to-r from-[#F2EDE2] via-[#E5DEC9] to-[#C9BEA7] rounded-r-sm border border-[#C5BBA4] shadow-md"
                style={{ transform: 'translateZ(-12px)' }}
              >
                <div className="w-full h-full opacity-60 bg-[repeating-linear-gradient(to_right,transparent,transparent_1px,#B5A992_1px,#B5A992_2px)]" />
              </div>

              {/* Main Hardcover Front Board */}
              <div
                className="relative w-full h-full rounded-r-2xl rounded-l-sm bg-[#07192F] text-white p-7 sm:p-10 flex flex-col justify-between overflow-hidden border border-[#0D2A4D] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),-10px_10px_30px_rgba(0,0,0,0.3)] group-hover:shadow-[0_30px_70px_-12px_rgba(0,0,0,0.6)] transition-all duration-500"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 80% 20%, rgba(200,169,107,0.12) 0%, transparent 60%),
                    linear-gradient(135deg, #0A2240 0%, #061528 100%)
                  `
                }}
              >
                {/* Subtle Spine Deboss Fold Line on Left */}
                <div className="absolute top-0 bottom-0 left-5 w-1.5 bg-gradient-to-r from-black/40 via-transparent to-white/10 pointer-events-none" />

                {/* Top Cover Typography */}
                <div className="relative z-10 pl-4 border-l-2 border-[#C8A96B]">
                  <span className="font-mono text-[11px] sm:text-xs font-bold text-[#C8A96B] tracking-[0.3em] uppercase block mb-1">
                    OFFICIAL COMPANY MONOGRAPH
                  </span>
                  <h1 className="font-barlow text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-[1.02]">
                    NDL Engineers & Contractors
                  </h1>
                  <p className="font-mono text-[11px] text-white/70 uppercase tracking-widest mt-1.5">
                    Civil Engineering • Turnkey Execution • Bengaluru
                  </p>
                </div>

                {/* Cover Center Architectural Inset Image (50-60% of cover) */}
                <div className="relative z-10 my-4 sm:my-6 rounded-lg overflow-hidden border border-[#C8A96B]/30 shadow-2xl bg-[#040C17] group-hover:border-[#C8A96B]/70 transition-colors duration-500">
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={imgCoverArchitectural}
                      alt="NDL Engineers & Contractors Landmark Construction"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out brightness-95"
                    />
                  </div>
                  <div className="bg-[#051424] px-4 py-2 flex items-center justify-between border-t border-white/10">
                    <span className="font-mono text-[10px] text-[#C8A96B] uppercase tracking-wider font-bold">
                      LANDMARK EXECUTION PORTFOLIO
                    </span>
                    <span className="font-mono text-[10px] text-white/60 uppercase">
                      EST. 2016
                    </span>
                  </div>
                </div>

                {/* Bottom Cover Metadata & Open CTA */}
                <div className="relative z-10 flex items-end justify-between pt-4 border-t border-white/15">
                  <div>
                    <span className="font-mono text-[10px] text-white/50 uppercase block tracking-widest">
                      CIVIL & TURNKEY PRACTICE
                    </span>
                    <p className="font-barlow text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                      NDL Engineers & Contractors
                    </p>
                  </div>

                  <div className="px-4 py-2 rounded-md bg-[#C8A96B] text-[#071D38] font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 group-hover:bg-[#DEBE7F] transition-all shadow-md">
                    <span>Click to Open</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Subtle Book Spine Texture Highlight */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-transparent pointer-events-none opacity-50" />
              </div>
            </motion.div>
          ) : (
            /* ------------------------------------------------------------ */
            /* SCENARIO B: OPEN TWO-PAGE PHYSICAL BOOK SPREAD              */
            /* ------------------------------------------------------------ */
            <motion.div
              key="open-book-spread"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[1440px] flex items-center justify-center select-none"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(2.5deg)'
              }}
            >
              {/* HARDCOVER UNDERLAY (Visible along outer margins as backing board) */}
              <div
                className="absolute inset-0 -inset-x-3 -inset-y-3 rounded-2xl bg-[#07172B] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45),0_10px_25px_rgba(0,0,0,0.25)] border border-[#0D2748] pointer-events-none"
                style={{ transform: 'translateZ(-16px)' }}
              />

              {/* DYNAMIC LEFT PAGE STACK (Updates thickness based on page count) */}
              <div
                className="hidden lg:block absolute left-[-10px] inset-y-2 rounded-l-sm bg-gradient-to-r from-[#D0C5AF] via-[#E4DDCB] to-[#F5EFE1] border-l border-y border-[#B5A88F] shadow-sm pointer-events-none"
                style={{
                  width: `${leftStackPx}px`,
                  transform: 'translateZ(-8px)'
                }}
              >
                <div className="w-full h-full opacity-60 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_1px,#A89B82_1px,#A89B82_2px)]" />
              </div>

              {/* DYNAMIC RIGHT PAGE STACK (Updates thickness based on remaining pages) */}
              <div
                className="hidden lg:block absolute right-[-10px] inset-y-2 rounded-r-sm bg-gradient-to-l from-[#D0C5AF] via-[#E4DDCB] to-[#F5EFE1] border-r border-y border-[#B5A88F] shadow-sm pointer-events-none"
                style={{
                  width: `${rightStackPx}px`,
                  transform: 'translateZ(-8px)'
                }}
              >
                <div className="w-full h-full opacity-60 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_1px,#A89B82_1px,#A89B82_2px)]" />
              </div>

              {/* MAIN BOOK TWO-PAGE SPREAD CONTAINER */}
              <div
                className="relative w-full grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden shadow-2xl border border-[#D5CDBD] bg-[#FAF7F0]"
                style={{
                  minHeight: isMobile ? '560px' : '680px',
                  aspectRatio: isMobile ? 'auto' : '1.55 / 1'
                }}
              >
                {/* ------------------------------------------------------ */}
                {/* LEFT BOOK PAGE                                         */}
                {/* ------------------------------------------------------ */}
                {(!isMobile || mobilePageSide === 'left') && (
                  <div
                    onClick={goToPrev}
                    className="relative w-full h-full p-6 sm:p-10 lg:p-12 flex flex-col justify-between cursor-pointer group bg-[#FAF7F0] text-[#1E252D] border-b lg:border-b-0 lg:border-r border-[#D8D0BE] overflow-hidden"
                    style={{
                      background: 'linear-gradient(to right, #FAF7F0 0%, #FAF7F0 88%, #EAE2D0 96%, #D6CBB7 100%)',
                      boxShadow: 'inset -20px 0 30px -15px rgba(0,0,0,0.08)'
                    }}
                  >
                    {/* Running Top Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#D8D0BE] text-[#071D38]">
                      <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em]">
                        NDL ENGINEERS & CONTRACTORS // PRACTICE PROFILE
                      </span>
                      <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#071D38]/60 uppercase">
                        {currentSpread.leftPage.chapterNumber ? `CH. ${currentSpread.leftPage.chapterNumber}` : 'INTRO'}
                      </span>
                    </div>

                    {/* Left Page Editorial Body Content */}
                    <div className="my-auto py-4 sm:py-6 overflow-y-auto max-h-[520px] pr-1">
                      {renderEditorialPage(currentSpread.leftPage, onOpenQuoteModal)}
                    </div>

                    {/* Running Bottom Footer with Page Number */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#D8D0BE] text-[#071D38]">
                      <span className="font-mono text-xs font-bold tracking-wider">
                        PAGE {currentSpread.leftPage.pageNumber.toString().padStart(2, '0')}
                      </span>
                      <span className="font-mono text-[10px] text-[#071D38]/50 uppercase tracking-widest hidden sm:inline">
                        {currentSpread.chapterName}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-[#071D38] font-mono text-[10px]">
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>PREVIOUS SPREAD</span>
                      </div>
                    </div>

                    {/* Subtle Inner Spine Curvature Gradient */}
                    <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black/10 via-black/3 to-transparent pointer-events-none" />
                  </div>
                )}

                {/* ------------------------------------------------------ */}
                {/* CENTER BINDING GUTTER SEAM & STITCH LINE (Desktop)     */}
                {/* ------------------------------------------------------ */}
                <div className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 z-30 pointer-events-none">
                  {/* Center Deep Fold Shadow */}
                  <div className="w-full h-full bg-gradient-to-r from-black/15 via-black/25 to-black/15 shadow-inner" />
                  {/* Spine Crease Line */}
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/40" />
                </div>

                {/* ------------------------------------------------------ */}
                {/* RIGHT BOOK PAGE                                        */}
                {/* ------------------------------------------------------ */}
                {(!isMobile || mobilePageSide === 'right') && (
                  <div
                    onClick={goToNext}
                    className="relative w-full h-full p-6 sm:p-10 lg:p-12 flex flex-col justify-between cursor-pointer group bg-[#FAF7F0] text-[#1E252D] overflow-hidden"
                    style={{
                      background: 'linear-gradient(to left, #FAF7F0 0%, #FAF7F0 88%, #EAE2D0 96%, #D6CBB7 100%)',
                      boxShadow: 'inset 20px 0 30px -15px rgba(0,0,0,0.08)'
                    }}
                  >
                    {/* Running Top Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#D8D0BE] text-[#071D38]">
                      <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#071D38]/60 uppercase">
                        {currentSpread.rightPage.chapterTitle || 'COMPANY PROFILE'}
                      </span>
                      <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em]">
                        EST. 2016 // BENGALURU
                      </span>
                    </div>

                    {/* Right Page Editorial Body Content */}
                    <div className="my-auto py-4 sm:py-6 overflow-y-auto max-h-[520px] pr-1">
                      {renderEditorialPage(currentSpread.rightPage, onOpenQuoteModal)}
                    </div>

                    {/* Running Bottom Footer with Page Number */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#D8D0BE] text-[#071D38]">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-[#071D38] font-mono text-[10px]">
                        <span>NEXT SPREAD</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-mono text-[10px] text-[#071D38]/50 uppercase tracking-widest hidden sm:inline">
                        {currentSpread.rightPage.sectionTag || 'DOCUMENTATION'}
                      </span>
                      <span className="font-mono text-xs font-bold tracking-wider">
                        PAGE {currentSpread.rightPage.pageNumber.toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Subtle Inner Spine Curvature Gradient */}
                    <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/10 via-black/3 to-transparent pointer-events-none" />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ============================================================ */}
      {/* ACCESSIBLE BOOK CONTROLS & SPREAD NAVIGATION BAR             */}
      {/* ============================================================ */}
      {isOpen && (
        <div className="max-w-4xl mx-auto mt-8 sm:mt-10 p-3.5 sm:p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#D5CDC0] shadow-md flex flex-wrap items-center justify-between gap-4">
          {/* Previous Spread Button */}
          <button
            type="button"
            onClick={goToPrev}
            disabled={currentSpreadIndex <= 1 && (!isMobile || mobilePageSide === 'left')}
            className="px-4 py-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F2ECE0] border border-[#D5CDC0] text-[#071D38] font-mono text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Spread Scrubber / Jump Indicator */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-[#071D38] uppercase">
              Spread {currentSpreadIndex} of {totalSpreads - 1}
            </span>
            <input
              type="range"
              min={1}
              max={totalSpreads - 1}
              value={currentSpreadIndex}
              onChange={(e) => goToSpread(parseInt(e.target.value))}
              className="w-24 sm:w-48 accent-[#071D38] cursor-pointer"
            />
          </div>

          {/* Next Spread Button */}
          <button
            type="button"
            onClick={goToNext}
            disabled={currentSpreadIndex >= totalSpreads - 1 && (!isMobile || mobilePageSide === 'right')}
            className="px-4 py-2 rounded-lg bg-[#071D38] hover:bg-[#0A274E] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* TABLE OF CONTENTS MODAL / DRAWER                             */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isTocOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#FAF7F0] rounded-2xl border border-[#D5CDC0] shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#D8D0BE] mb-6">
                <div>
                  <span className="font-mono text-[11px] font-bold text-[#C8A96B] uppercase tracking-widest block">
                    MONOGRAPH INDEX
                  </span>
                  <h3 className="font-barlow text-2xl sm:text-3xl font-bold uppercase text-[#071D38]">
                    Table of Contents
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTocOpen(false)}
                  className="p-2 rounded-lg hover:bg-black/5 text-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {bookChapters.map((ch, idx) => (
                  <button
                    key={ch.key}
                    type="button"
                    onClick={() => goToSpread(ch.spreadIndex)}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      currentSpreadIndex === ch.spreadIndex
                        ? 'bg-[#071D38] text-white border-[#071D38] shadow-md'
                        : 'bg-white hover:bg-[#F4EFE6] border-[#E0D8C8] text-[#071D38]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold opacity-60">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="font-barlow text-base font-bold uppercase tracking-tight">
                        {ch.name}
                      </span>
                    </div>
                    <span className="font-mono text-xs opacity-70">
                      {ch.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ====================================================================
// HELPER: EDITORIAL PAGE RENDERER (NO WEB CARDS, PURE PRINT LAYOUT)
// ====================================================================
function renderEditorialPage(page: BookPageType, onOpenQuoteModal?: () => void) {
  switch (page.type) {
    case 'intro':
      return (
        <div className="space-y-4 text-[#1E252D]">
          <div className="border-b border-[#D8D0BE] pb-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A96B] block mb-1">
              PREFACE & MONOGRAPH OVERVIEW
            </span>
            <h3 className="font-barlow text-2xl sm:text-3xl font-extrabold uppercase text-[#071D38] leading-tight">
              {page.title || 'Built Upon Engineering Integrity'}
            </h3>
          </div>
          
          <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
            {ndlCompanyProfile.companyBackground}
          </p>

          <div className="p-4 rounded-lg bg-[#F2EDE2] border border-[#DDD5C5] space-y-2">
            <span className="font-mono text-[10px] font-bold text-[#071D38] uppercase tracking-wider block">
              PRACTICE PHILOSOPHY
            </span>
            <p className="font-serif italic text-xs sm:text-sm text-slate-800 leading-relaxed">
              "We believe structural excellence is never accidental. Every millimeter of reinforced concrete, masonry, and architectural finishes reflects our unwavering commitment to precision."
            </p>
            <span className="font-mono text-[10px] text-slate-500 uppercase block text-right">
              — ND Lingaraj
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-white border border-[#E0D8C8]">
              <span className="text-slate-400 block text-[9px]">ESTABLISHED</span>
              <span className="font-bold text-[#071D38]">{ndlCompanyProfile.establishedYear}</span>
            </div>
            <div className="p-2.5 rounded bg-white border border-[#E0D8C8]">
              <span className="text-slate-400 block text-[9px]">HEADQUARTERS</span>
              <span className="font-bold text-[#071D38]">Bangalore, Karnataka</span>
            </div>
          </div>
        </div>
      );

    case 'toc':
      return (
        <div className="space-y-4 text-[#1E252D]">
          <div className="border-b border-[#D8D0BE] pb-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A96B] block mb-1">
              DOCUMENT INDEX
            </span>
            <h3 className="font-barlow text-2xl sm:text-3xl font-extrabold uppercase text-[#071D38] leading-tight">
              Publication Index
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            {bookChapters.slice(2, 9).map((ch) => (
              <div key={ch.key} className="flex items-baseline justify-between border-b border-dotted border-[#D5CDC0] pb-1.5 font-sans">
                <span className="font-barlow font-bold uppercase text-[#071D38] tracking-tight">
                  {ch.name}
                </span>
                <span className="font-mono text-[10px] text-slate-500 ml-auto">
                  SPREAD {ch.spreadIndex}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-white border border-[#E0D8C8] text-[11px] font-sans text-slate-600 leading-relaxed">
            <strong className="text-[#071D38] block font-mono text-[10px] uppercase mb-0.5">AUTHENTICITY NOTICE:</strong>
            All project photographs and technical case studies documented herein represent physical projects executed by NDL Engineers & Contractors under premier architectural practices.
          </div>
        </div>
      );

    case 'profile':
      return (
        <div className="space-y-4 text-[#1E252D]">
          <div className="border-b border-[#D8D0BE] pb-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A96B] block mb-0.5">
              CHAPTER 01 // FIRM PROFILE
            </span>
            <h3 className="font-barlow text-2xl sm:text-3xl font-extrabold uppercase text-[#071D38] leading-tight">
              {ndlCompanyProfile.companyName}
            </h3>
            <p className="font-mono text-[11px] text-slate-600 uppercase mt-1">
              {ndlCompanyProfile.businessStructure} • Est. {ndlCompanyProfile.establishedYear}
            </p>
          </div>

          <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
            {ndlCompanyProfile.companyBackground}
          </p>

          {/* Corporate Leadership Spotlight Block */}
          <div className="p-4 rounded-xl bg-white border border-[#DDD5C5] space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase">ENGINEERING PRACTICE DIRECTION</span>
                <h4 className="font-barlow text-lg font-bold uppercase text-[#071D38]">
                  ENGINEERING LEADERSHIP{' '}
                  <mark className="bg-yellow-300 text-slate-950 px-1.5 py-0.5 rounded font-bold inline-block">
                    WITH SOUND TECHNICAL KNOWLEDGE
                  </mark>
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#071D38] text-white font-mono text-xs font-bold">
                {ndlCompanyProfile.proprietor.qualification}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              {ndlCompanyProfile.proprietor.experience}. {ndlCompanyProfile.proprietor.role}.
            </p>
          </div>

          {/* Architectural Elevation Photo Inset */}
          <div className="rounded-lg overflow-hidden border border-[#D5CDC0] shadow-sm">
            <div className="aspect-[16/9] w-full">
              <img
                src={imgCorpConstruction}
                alt="NDL Structural Execution"
                className="w-full h-full object-cover brightness-95"
              />
            </div>
            <div className="p-2 bg-[#F2EDE2] font-mono text-[10px] text-slate-600 flex justify-between">
              <span>PLATE 01.1 // STRUCTURAL EXECUTION</span>
              <span>BENGALURU</span>
            </div>
          </div>
        </div>
      );

    case 'team':
      return (
        <div className="space-y-4 text-[#1E252D]">
          <div className="border-b border-[#D8D0BE] pb-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A96B] block mb-0.5">
              CHAPTER 02 // TECHNICAL TEAM
            </span>
            <h3 className="font-barlow text-2xl sm:text-3xl font-extrabold uppercase text-[#071D38] leading-tight">
              Execution Team Structure
            </h3>
            <p className="font-mono text-[11px] text-slate-600 uppercase mt-1">
              Direct Site Supervision on Every Project
            </p>
          </div>

          <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
            {ndlCompanyProfile.executionTeam.summary}
          </p>

          <div className="space-y-2.5">
            {ndlCompanyProfile.executionTeam.members.map((member, i) => (
              <div key={i} className="p-3 rounded-lg bg-white border border-[#E0D8C8] flex items-center justify-between shadow-2xs">
                <div>
                  <h5 className="font-barlow text-sm font-bold uppercase text-[#071D38]">
                    {member.role}
                  </h5>
                  <p className="text-[11px] text-slate-500 font-sans">
                    {member.desc}
                  </p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F0] border border-[#DDD5C5] font-mono text-[10px] font-bold text-[#071D38] uppercase">
                  {member.badge}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-lg bg-[#071D38] text-white text-xs space-y-1">
            <span className="font-mono text-[10px] text-[#C8A96B] uppercase font-bold block">
              SUPERVISION GUARANTEE
            </span>
            <p className="text-white/80 text-[11px] leading-relaxed">
              Every critical structural stage—including soil compaction, bar bending layout, formwork alignment, and concrete cube compressive testing—is inspected directly by senior engineers.
            </p>
          </div>
        </div>
      );

    case 'services':
      const isFirstHalf = page.id.includes('services-1');
      const servicesSubset = isFirstHalf
        ? ndlCompanyProfile.services.slice(0, 8)
        : ndlCompanyProfile.services.slice(8);

      return (
        <div className="space-y-4 text-[#1E252D]">
          <div className="border-b border-[#D8D0BE] pb-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A96B] block mb-0.5">
              CHAPTER 03 // SERVICES SPECTRUM ({isFirstHalf ? 'PART I' : 'PART II'})
            </span>
            <h3 className="font-barlow text-2xl sm:text-3xl font-extrabold uppercase text-[#071D38] leading-tight">
              {isFirstHalf ? 'Core Civil & Turnkey Works' : 'Interiors & Engineering Systems'}
            </h3>
          </div>

          <p className="font-sans text-xs text-slate-700 leading-relaxed">
            {isFirstHalf
              ? 'Our civil and architectural execution scope encompasses comprehensive ground-up structural construction, municipal drawing compliance, and heavy engineering.'
              : 'Our interior and building engineering services combine bespoke carpentry, acoustic ceilings, MEP synchronization, and specialized renovation works.'}
          </p>

          <div className="space-y-2">
            {servicesSubset.map((service, idx) => {
              const globalIdx = isFirstHalf ? idx + 1 : idx + 9;
              return (
                <div key={idx} className="p-2.5 rounded-lg bg-white border border-[#E0D8C8] flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-[#F2EDE2] text-[#071D38] font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                    {globalIdx.toString().padStart(2, '0')}
                  </span>
                  <span className="font-barlow text-sm font-bold uppercase text-[#071D38]">
                    {service}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="rounded-lg overflow-hidden border border-[#D5CDC0] shadow-sm">
            <div className="aspect-[16/8] w-full">
              <img
                src={isFirstHalf ? imgHeroVilla : imgGrandEstate}
                alt="NDL Service Execution"
                className="w-full h-full object-cover brightness-95"
              />
            </div>
          </div>
        </div>
      );

    case 'execution':
      return (
        <div className="space-y-4 text-[#1E252D]">
          <div className="border-b border-[#D8D0BE] pb-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A96B] block mb-0.5">
              CHAPTER 04 // CONTRACT FRAMEWORKS
            </span>
            <h3 className="font-barlow text-2xl sm:text-3xl font-extrabold uppercase text-[#071D38] leading-tight">
              Mode of Execution
            </h3>
          </div>

          <p className="font-sans text-xs text-slate-700 leading-relaxed">
            NDL Engineers and Contractors offers flexible contractual engagement models tailored to client financial structures and architectural requirements:
          </p>

          <div className="space-y-2.5">
            {ndlCompanyProfile.modesOfExecution.map((mode, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-white border border-[#E0D8C8] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-barlow text-sm font-bold uppercase text-[#071D38]">
                    {mode.title}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[#C8A96B]">
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                  {mode.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'machinery':
      return (
        <div className="space-y-4 text-[#1E252D]">
          <div className="border-b border-[#D8D0BE] pb-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A96B] block mb-0.5">
              CHAPTER 05 // INFRASTRUCTURE
            </span>
            <h3 className="font-barlow text-2xl sm:text-3xl font-extrabold uppercase text-[#071D38] leading-tight">
              Plants & Machinery
            </h3>
          </div>

          <p className="font-sans text-xs text-slate-700 leading-relaxed">
            The firm maintains full in-house ownership of scaffolding, formwork, and heavy mechanical equipment to eliminate subcontractor bottlenecks:
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            {ndlCompanyProfile.plantsAndMachinery.map((item, idx) => {
              const isUpdated = idx === 2 || idx === 4 || idx === 5;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg space-y-1 transition-all ${
                    isUpdated
                      ? 'bg-yellow-100/90 border-2 border-yellow-400 shadow-xs'
                      : 'bg-white border border-[#E0D8C8]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-barlow text-xs font-bold uppercase block leading-tight ${
                      isUpdated ? 'text-yellow-950 bg-yellow-300 px-1 py-0.5 rounded border border-yellow-400' : 'text-[#071D38]'
                    }`}>
                      {item.name}
                    </span>
                    {isUpdated && (
                      <span className="text-[8px] font-mono font-bold bg-yellow-400 text-yellow-950 px-1 py-0.2 rounded uppercase">
                        New
                      </span>
                    )}
                  </div>
                  <span className={`font-mono text-[10px] block ${
                    isUpdated ? 'text-yellow-900 font-semibold' : 'text-slate-500'
                  }`}>
                    {item.category}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="rounded-lg overflow-hidden border border-[#D5CDC0] shadow-sm">
            <div className="aspect-[16/8] w-full">
              <img
                src={imgMachineryPlant}
                alt="Plants & Machinery Infrastructure"
                className="w-full h-full object-cover brightness-95"
              />
            </div>
            <div className="p-2 bg-[#F2EDE2] font-mono text-[10px] text-slate-600 flex justify-between">
              <span>PLATE 05.1 // ON-SITE HEAVY EQUIPMENT</span>
              <span>100% IN-HOUSE</span>
            </div>
          </div>
        </div>
      );

    case 'architects':
      return (
        <div className="space-y-4 text-[#1E252D]">
          <div className="border-b border-[#D8D0BE] pb-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A96B] block mb-0.5">
              CHAPTER 06 // COLLABORATIONS
            </span>
            <h3 className="font-barlow text-2xl sm:text-3xl font-extrabold uppercase text-[#071D38] leading-tight">
              Associated Architects
            </h3>
          </div>

          <p className="font-sans text-xs text-slate-700 leading-relaxed">
            We have had the privilege of executing signature architectural landmarks under renowned design studios across Bangalore:
          </p>

          <div className="space-y-2">
            {ndlCompanyProfile.architectsAssociatedWith.map((arch, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-white border border-[#E0D8C8] flex items-center justify-between">
                <div>
                  <h5 className="font-barlow text-sm font-bold uppercase text-[#071D38]">
                    {arch.name}
                  </h5>
                  <span className="font-mono text-[10px] text-slate-500">{arch.location}</span>
                </div>
                <span className="font-mono text-[10px] text-[#C8A96B] font-bold uppercase">
                  {arch.note || 'Architectural Partner'}
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'consultants':
      return (
        <div className="space-y-4 text-[#1E252D]">
          <div className="border-b border-[#D8D0BE] pb-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A96B] block mb-0.5">
              CHAPTER 07 // ENGINEERING ADVISORY
            </span>
            <h3 className="font-barlow text-2xl sm:text-3xl font-extrabold uppercase text-[#071D38] leading-tight">
              Structural Consultants
            </h3>
          </div>

          <p className="font-sans text-xs text-slate-700 leading-relaxed">
            All structural detailing, seismic zone calculations, and rebar bending schedules are verified in coordination with esteemed engineering consultants:
          </p>

          <div className="space-y-2.5">
            {ndlCompanyProfile.structuralConsultants.map((con, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-white border border-[#E0D8C8] space-y-1">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <div className="flex items-baseline flex-wrap gap-1.5">
                    <h5 className="font-barlow text-sm font-bold uppercase text-[#071D38]">
                      {con.name}
                    </h5>
                    <span className="font-mono text-[9px] font-semibold text-[#C8A96B] uppercase tracking-wide">
                      (B.E, Diploma in Civil Engineering)
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">{con.location}</span>
                </div>
                <p className="text-[11px] text-slate-600 font-sans">
                  Structural Detailing & Design Verification
                </p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-lg bg-[#F2EDE2] border border-[#DDD5C5] text-xs font-mono text-[#071D38] space-y-1">
            <span className="font-bold block uppercase text-[10px]">STRUCTURAL CODE COMPLIANCE:</span>
            <p className="text-[11px] text-slate-700">
              IS 456:2000 (Plain & Reinforced Concrete), IS 1893 (Earthquake Resistant Design), IS 875 (Design Loads).
            </p>
          </div>
        </div>
      );

    case 'strengths':
      return (
        <div className="space-y-4 text-[#1E252D]">
          <div className="border-b border-[#D8D0BE] pb-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A96B] block mb-0.5">
              CHAPTER 08 // COMPETENCIES
            </span>
            <h3 className="font-barlow text-2xl sm:text-3xl font-extrabold uppercase text-[#071D38] leading-tight">
              Core Strengths
            </h3>
          </div>

          <div className="space-y-2.5">
            {ndlCompanyProfile.companyStrengths.map((st, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-white border border-[#E0D8C8] space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A96B] shrink-0" />
                  <h5 className="font-barlow text-sm font-bold uppercase text-[#071D38]">
                    {st.title}
                  </h5>
                </div>
                <p className="text-[11px] text-slate-600 font-sans pl-6 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'goals':
      return (
        <div className="space-y-4 text-[#1E252D]">
          <div className="border-b border-[#D8D0BE] pb-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A96B] block mb-0.5">
              CHAPTER 09 // STRATEGY
            </span>
            <h3 className="font-barlow text-2xl sm:text-3xl font-extrabold uppercase text-[#071D38] leading-tight">
              Immediate & Long-Term Goals
            </h3>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white border border-[#E0D8C8] space-y-2">
              <span className="font-mono text-[10px] font-bold text-[#C8A96B] uppercase tracking-wider block">
                STRATEGIC CORPORATE GOALS
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
                {ndlCompanyProfile.immediateAndLongTermGoals.goals.map((g, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#C8A96B] font-bold">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#071D38] text-white space-y-2">
              <span className="font-mono text-[10px] font-bold text-[#C8A96B] uppercase tracking-wider block">
                FUTURE CAPABILITIES & DOMAIN EXPANSION
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {ndlCompanyProfile.immediateAndLongTermGoals.futureCapabilities.map((fc, i) => {
                  const isHighlighted =
                    fc.toLowerCase().includes('affordable') ||
                    fc.toLowerCase().includes('exquisite') ||
                    fc.toLowerCase().includes('architecturally');
                  return (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded font-mono text-xs font-semibold ${
                        isHighlighted
                          ? 'bg-yellow-300 text-slate-950 font-bold border-2 border-yellow-400 shadow-xs'
                          : 'bg-white/10 text-white border border-white/20'
                      }`}
                    >
                      {fc}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );

    case 'project-spread':
      const p = page.project;
      if (!p) return null;
      return (
        <div className="space-y-4 text-[#1E252D]">
          <div className="border-b border-[#D8D0BE] pb-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A96B] block mb-0.5">
              CHAPTER 10 // FEATURED PROJECT
            </span>
            <h3 className="font-barlow text-2xl sm:text-3xl font-extrabold uppercase text-[#071D38] leading-tight">
              {p.title}
            </h3>
            <p className="font-mono text-[11px] text-slate-600 uppercase mt-1">
              {p.type} • {p.location}
            </p>
          </div>

          <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
            {p.description}
          </p>

          <div className="space-y-2 text-xs font-sans">
            <div className="p-3 rounded-lg bg-white border border-[#E0D8C8] flex justify-between">
              <span className="text-slate-500 font-mono text-[10px] uppercase">ARCHITECTURAL DESIGN</span>
              <strong className="text-[#071D38] font-bold">{p.architect}</strong>
            </div>
            <div className="p-3 rounded-lg bg-white border border-[#E0D8C8] flex justify-between">
              <span className="text-slate-500 font-mono text-[10px] uppercase">SCOPE OF EXECUTION</span>
              <strong className="text-[#071D38] font-bold">{p.scope}</strong>
            </div>
          </div>

          {p.highlights && (
            <div className="p-3.5 rounded-lg bg-[#F2EDE2] border border-[#DDD5C5] space-y-1.5">
              <span className="font-mono text-[10px] font-bold text-[#071D38] uppercase tracking-wider block">
                ENGINEERING HIGHLIGHTS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {p.highlights.map((hl, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white text-[#071D38] font-mono text-[10px] font-semibold border border-[#D5CDC0]">
                    {hl}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );

    case 'project-gallery':
      const prj = page.project;
      const images = page.galleryImages || (prj ? prj.gallery.slice(0, 4) : []);
      return (
        <div className="space-y-3 text-[#1E252D]">
          <div className="border-b border-[#D8D0BE] pb-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A96B] block mb-0.5">
              PHOTOGRAPHIC DOCUMENTATION
            </span>
            <h4 className="font-barlow text-xl font-bold uppercase text-[#071D38]">
              {prj ? prj.client : 'Project Plates'}
            </h4>
          </div>

          {/* Authentic Real Project Photography Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {images.slice(0, 4).map((imgUrl, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-[#D5CDC0] shadow-2xs bg-slate-900 group aspect-[4/3]">
                <img
                  src={imgUrl}
                  alt={`Project Plate ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    if (prj && prj.featuredImage) {
                      (e.target as HTMLImageElement).src = prj.featuredImage;
                    }
                  }}
                />
              </div>
            ))}
          </div>

          <div className="p-2.5 rounded bg-[#F2EDE2] border border-[#DDD5C5] font-mono text-[10px] text-slate-600 flex justify-between">
            <span>AUTHENTIC ON-SITE DOCUMENTATION</span>
            <span>NDL ENGINEERS ARCHIVE</span>
          </div>
        </div>
      );

    case 'back-cover':
      return (
        <div className="space-y-6 text-[#1E252D]">
          <div className="border-b border-[#D8D0BE] pb-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A96B] block mb-1">
              CORPORATE DIRECTORY & REGISTERED OFFICE
            </span>
            <h3 className="font-barlow text-2xl sm:text-3xl font-extrabold uppercase text-[#071D38]">
              NDL Engineers and Contractors
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E0D8C8] space-y-3 text-xs font-sans">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C8A96B] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase block">HEADQUARTERS</span>
                <p className="text-slate-800 font-semibold leading-relaxed">
                  {ndlCompanyProfile.registeredOffice.fullAddress}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
              <Phone className="w-4 h-4 text-[#C8A96B] shrink-0" />
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase block">DIRECT TELEPHONE</span>
                <a href={`tel:${ndlCompanyProfile.contact.phone}`} className="font-bold text-[#071D38] hover:underline">
                  {ndlCompanyProfile.contact.displayPhone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
              <Mail className="w-4 h-4 text-[#C8A96B] shrink-0" />
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase block">DIRECT EMAIL</span>
                <a href={`mailto:${ndlCompanyProfile.contact.email}`} className="font-bold text-[#071D38] hover:underline">
                  {ndlCompanyProfile.contact.email}
                </a>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#071D38] text-white flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] text-[#C8A96B] uppercase font-bold block">
                PROJECT CONSULTATION
              </span>
              <span className="font-barlow text-sm font-bold uppercase text-white">
                Schedule Engineering Review
              </span>
            </div>
            {onOpenQuoteModal && (
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="px-4 py-2 rounded bg-[#C8A96B] hover:bg-[#DEBE7F] text-[#071D38] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Enquire
              </button>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
}
