import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { DigitalCompanyBook } from '../components/about/DigitalCompanyBook';
import { AboutIntro } from '../components/about/AboutIntro';
import { AboutVisionMission } from '../components/about/AboutVisionMission';
import { AboutApproach } from '../components/about/AboutApproach';
import { AboutStrengthsMachinery } from '../components/about/AboutStrengthsMachinery';
import { AboutCollaborations } from '../components/about/AboutCollaborations';
import { AboutStatement } from '../components/about/AboutStatement';
import { AboutTrust } from '../components/about/AboutTrust';
import { AboutFAQ } from '../components/about/AboutFAQ';
import { AboutCTA } from '../components/about/AboutCTA';

interface AboutPageProps {
  onOpenQuoteModal?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white min-h-screen pt-16 sm:pt-20"
    >
      {/* 1. Interactive Digital Company Profile Book (Centerpiece Showcase) */}
      <DigitalCompanyBook onOpenQuoteModal={onOpenQuoteModal} />

      {/* 2. Structured Overview & Practice Foundations */}
      <AboutIntro />

      {/* 3. Vision, Mission & Quality Policy */}
      <AboutVisionMission />

      {/* 4. Engineering & Execution Methodology */}
      <AboutApproach />

      {/* 5. Core Strengths & Technical Machinery */}
      <AboutStrengthsMachinery />

      {/* 6. Renowned Architectural Collaborations & Consultants */}
      <AboutCollaborations />

      {/* 7. Leadership Statement */}
      <AboutStatement />

      {/* 8. Trust Metrics & Verification */}
      <AboutTrust />

      {/* 9. Frequently Asked Questions */}
      <AboutFAQ />

      {/* 10. Consultation Call-to-Action */}
      <AboutCTA />
    </motion.div>
  );
};
