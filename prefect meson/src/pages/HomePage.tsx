import React from 'react';
import { Hero } from '../components/hero/Hero';
import { CompanyIntroduction } from '../components/introduction/CompanyIntroduction';
import { BrandManifesto } from '../components/manifesto/BrandManifesto';
import { CoreServices } from '../components/services/CoreServices';
import { HomePageResidentialHighlights } from '../components/home/HomePageResidentialHighlights';
import { WhyChooseUs } from '../components/trust/WhyChooseUs';
import { PavanCinematicSection } from '../components/experience/PavanCinematicSection';

import { ConstructionProcess } from '../components/process/ConstructionProcess';
import { InteriorsShowcase } from '../components/interiors/InteriorsShowcase';
import { ClientReviews } from '../components/reviews/ClientReviews';
import { LatestBlogsSection } from '../components/blogs/LatestBlogsSection';
import { FAQSection } from '../components/faq/FAQSection';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  onOpenQuoteModal: () => void;
  onSelectProject: (project: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenQuoteModal,
  onSelectProject,
}) => {
  const navigate = useNavigate();

  const handleExploreProjects = () => {
    navigate('/gallery');
  };

  return (
    <div className="w-full">
      {/* 1. HERO CINEMATIC REVEAL (240 Frames + Atmospheric Mist Transition) */}
      <Hero
        onOpenQuoteModal={onOpenQuoteModal}
        onExploreProjects={handleExploreProjects}
      />

      {/* 2. SECTION 2.2: COMPANY INTRODUCTION (Asymmetrical Editorial Craftsmanship Showcase) */}
      <CompanyIntroduction />

      {/* 3. SECTION: BRAND MANIFESTO STATEMENT (Cinematic Volumetric Fog) */}
      <BrandManifesto />

      {/* 4. SECTION 2.3: CORE SERVICES (4 Core Disciplines Showcase) */}
      <CoreServices />

      {/* 4.5 FEATURED RESIDENTIAL HIGHLIGHTS: AFFORDABLE HOMES PACKAGES & ECO-FRIENDLY HOMES */}
      <HomePageResidentialHighlights onOpenQuoteModal={onOpenQuoteModal} />


      {/* 6. SECTION 2.4: WHY CHOOSE PERFECT MASON (Corporate Trust Dashboard) */}
      <WhyChooseUs />

      {/* 7. SECTION: PAVAN CINEMATIC FRAME SEQUENCE (100vw x 100vh Fullscreen Scroll Canvas) */}
      <PavanCinematicSection
        onExploreProjects={handleExploreProjects}
      />

      {/* 9. SECTION: 7-STAGE CONSTRUCTION PROCESS ("FROM IDEA TO BUILT FORM") */}
      <ConstructionProcess />

      {/* 10. SECTION: INTERIORS (Automated 3D Panoramic Interior Slider) */}
      <InteriorsShowcase
        onOpenInteriorModal={(scene) => {
          onSelectProject({
            id: scene.id,
            number: scene.number,
            category: scene.category,
            title: scene.title,
            location: scene.location,
            description: scene.description,
            scope: scene.scope,
            status: 'COMPLETED INTERIOR EXECUTION',
            image: scene.image,
            slug: scene.slug,
            areaSqFt: scene.areaSqFt,
          });
        }}
      />

      {/* 11. SECTION: CLIENT REVIEWS (Editorial 3-Card Layout with Featured Client Story) */}
      <ClientReviews />

      {/* 12. SECTION: LATEST BLOGS */}
      <LatestBlogsSection />

      {/* 13. SECTION: FAQ (Two-Column Editorial Heading & Accordion) */}
      <FAQSection />
    </div>
  );
};
