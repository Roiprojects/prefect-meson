import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/header/Navbar';
import { Footer } from './components/footer/Footer';
import { QuoteModal } from './components/header/QuoteModal';
import { ProjectModal } from './components/showcase/ProjectModal';
import { ScrollToTop } from './components/common/ScrollToTop';
import { FloatingActions } from './components/common/FloatingActions';
import { AiChatAssistant } from './components/chat/AiChatAssistant';
import { navigationConfig } from './data/navigationData';
import { ShowcaseProject } from './data/showcaseData';
import { DataProvider, useData } from './context/DataContext';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CommercialPage } from './pages/CommercialPage';
import { ResidentialPage } from './pages/ResidentialPage';
import { TurnkeyPage } from './pages/TurnkeyPage';
import { InteriorsPage } from './pages/InteriorsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TurnkeyServicePage } from './pages/TurnkeyServicePage';
import { CommercialServicePage } from './pages/CommercialServicePage';
import { CommercialCategoryPage } from './pages/CommercialCategoryPage';
import { ResidentialCategoryPage } from './pages/ResidentialCategoryPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPagesManager } from './pages/admin/AdminPagesManager';
import { AdminPageEditor } from './pages/admin/AdminPageEditor';
import { AdminPagePreview } from './pages/admin/AdminPagePreview';
import { AdminResidential } from './pages/admin/AdminResidential';
import { AdminCommercial } from './pages/admin/AdminCommercial';
import { AdminTurnkey } from './pages/admin/AdminTurnkey';
import { AdminInteriors } from './pages/admin/AdminInteriors';
import { AdminGallery } from './pages/admin/AdminGallery';
import { AdminBlogs } from './pages/admin/AdminBlogs';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminAiChat } from './pages/admin/AdminAiChat';
import { AdminMediaLibrary } from './pages/admin/AdminMediaLibrary';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminUsers } from './pages/admin/AdminUsers';

// Admin Protected Route Guard
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdminAuthenticated } = useData();
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);

  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleNavigate = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate(`/${href}`);
      } else {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-slate-1000/20 selection:text-royal-800 antialiased flex flex-col justify-between">
      <ScrollToTop />

      {/* 1. GLOBAL FLOATING LIGHT NAVBAR (Hidden on Admin routes) */}
      {!isAdminRoute && (
        <Navbar
          config={navigationConfig}
          activeRoute={location.pathname}
          onNavigate={handleNavigate}
        />
      )}

      {/* 2. MAIN ROUTED PAGE CONTENT */}
      <main className="w-full flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <HomePage
                onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
                onSelectProject={(project) => setSelectedProject(project)}
              />
            }
          />
          <Route
            path="/home"
            element={
              <HomePage
                onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
                onSelectProject={(project) => setSelectedProject(project)}
              />
            }
          />
          <Route
            path="/about-us"
            element={<AboutPage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route
            path="/commercial-construction"
            element={<CommercialPage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route
            path="/commercial-construction/:categorySlug"
            element={<CommercialCategoryPage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route
            path="/commercial-construction/category/:categorySlug"
            element={<CommercialCategoryPage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route
            path="/item-rate-end-to-end"
            element={<Navigate to="/commercial-construction/category/item-rate-end-to-end" replace />}
          />
          <Route
            path="/shell-only-package"
            element={<Navigate to="/commercial-construction/category/shell-only-package" replace />}
          />
          <Route
            path="/individual-trade-services"
            element={<Navigate to="/commercial-construction/category/individual-trade-services" replace />}
          />
          <Route
            path="/industrial-shed-construction"
            element={<Navigate to="/commercial-construction/category/industrial-shed-construction" replace />}
          />
          <Route
            path="/commercial-construction/:categorySlug/:slug"
            element={<ProjectDetailPage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route
            path="/commercial/:serviceId"
            element={<CommercialServicePage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
                    <Route
            path="/residential-construction"
            element={<ResidentialPage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route
            path="/residential-construction/:categorySlug"
            element={<ResidentialCategoryPage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route
            path="/residential-construction/category/:categorySlug"
            element={<ResidentialCategoryPage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route
            path="/luxury-villas-item-rate"
            element={<Navigate to="/residential-construction/category/luxury-villas-item-rate" replace />}
          />
          <Route
            path="/affordable-homes-packages"
            element={<Navigate to="/residential-construction/category/affordable-homes-packages" replace />}
          />
          <Route
            path="/eco-friendly-homes"
            element={<Navigate to="/residential-construction/category/eco-friendly-homes" replace />}
          />
          <Route
            path="/residential-construction/:categorySlug/:slug"
            element={<ProjectDetailPage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route
            path="/turnkey-project-execution"
            element={<TurnkeyPage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route
            path="/turnkey/:serviceId"
            element={<TurnkeyServicePage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route
            path="/interiors"
            element={<InteriorsPage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route
            path="/gallery"
            element={<GalleryPage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route
            path="/projects/:slug"
            element={<ProjectDetailPage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route
            path="/blogs/:slug"
            element={<BlogDetailPage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route
            path="/testimonials"
            element={<TestimonialsPage onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
          />
          <Route path="/contact-us" element={<ContactPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/pages"
            element={
              <ProtectedAdminRoute>
                <AdminPagesManager />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/pages/:pageId"
            element={
              <ProtectedAdminRoute>
                <AdminPageEditor />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/preview/:pageId"
            element={
              <ProtectedAdminRoute>
                <AdminPagePreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/residential"
            element={
              <ProtectedAdminRoute>
                <AdminResidential />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/commercial"
            element={
              <ProtectedAdminRoute>
                <AdminCommercial />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/turnkey"
            element={
              <ProtectedAdminRoute>
                <AdminTurnkey />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/interiors"
            element={
              <ProtectedAdminRoute>
                <AdminInteriors />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <ProtectedAdminRoute>
                <AdminGallery />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <ProtectedAdminRoute>
                <AdminBlogs />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <ProtectedAdminRoute>
                <AdminTestimonials />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/enquiries"
            element={
              <ProtectedAdminRoute>
                <AdminEnquiries />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/ai-chat"
            element={
              <ProtectedAdminRoute>
                <AdminAiChat />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/media"
            element={
              <ProtectedAdminRoute>
                <AdminMediaLibrary />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedAdminRoute>
                <AdminSettings />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedAdminRoute>
                <AdminUsers />
              </ProtectedAdminRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* 3. FLOATING QUICK ACTIONS (WhatsApp, Call, Quote, AI Assistant - Public only) */}
      {!isAdminRoute && (
        <FloatingActions
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onOpenAiChat={() => setIsAiChatOpen(true)}
        />
      )}

      {/* 4. PERFECT MASON AI CUSTOMER ASSISTANT */}
      {!isAdminRoute && (
        <AiChatAssistant
          isOpen={isAiChatOpen}
          onToggle={() => setIsAiChatOpen(!isAiChatOpen)}
          onClose={() => setIsAiChatOpen(false)}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />
      )}

      {/* 4. GLOBAL PRODUCTION FOOTER (Hidden on Admin routes) */}
      {!isAdminRoute && (
        <Footer
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onNavigate={handleNavigate}
        />
      )}

      {/* 5. MODAL CONSULTATION BRIEF */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      {/* 6. DETAILED PROJECT BRIEF MODAL */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestConsultation={() => {
          setSelectedProject(null);
          setIsQuoteModalOpen(true);
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <AppContent />
      </Router>
    </DataProvider>
  );
};

export default App;
