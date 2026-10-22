import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Eye,
  EyeOff,
  ShieldCheck,
  Building2,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const SHOWCASE_IMAGES = [
  {
    src: '/assets/project_01_residential.jpg',
    title: 'The Pavilion Estate',
    category: 'Luxury Residential',
    location: 'Bengaluru, India',
  },
  {
    src: '/assets/comm_office_hero.jpg',
    title: 'Horizon Corporate Park',
    category: 'Commercial High-Rise',
    location: 'Outer Ring Road, Bengaluru',
  },
  {
    src: '/assets/interior_01_living.jpg',
    title: 'Minimalist Penthouse',
    category: 'Turnkey Interiors',
    location: 'Indiranagar, Bengaluru',
  },
];

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { adminLogin, isAdminAuthenticated } = useData();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // If already logged in, redirect to dashboard
  React.useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAdminAuthenticated, navigate]);

  // Rotate images every 6 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % SHOWCASE_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your administrator email address.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your administrator password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = adminLogin(email, password);
      setIsLoading(false);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid administrator email or password. Please verify credentials.');
      }
    }, 350);
  };

  const handleFillDemo = () => {
    setEmail('admin@perfectmason.com');
    setPassword('perfectmason2026');
    setError('');
  };

  const activeImage = SHOWCASE_IMAGES[activeImageIndex];

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-10 selection:bg-slate-900 selection:text-white">
      {/* Background Decorative Patterns */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-5xl bg-white border border-slate-200/80 rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]"
      >
        {/* LEFT COLUMN: Visual Showcase with Image Carousel */}
        <div className="lg:col-span-6 relative bg-slate-900 min-h-[320px] lg:min-h-full flex flex-col justify-between p-6 sm:p-10 overflow-hidden text-white">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.85, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Gradient Overlays for High Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent" />

          {/* Top Brand Pill */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>PERFECT MASON STUDIO</span>
            </div>
            <div className="flex items-center gap-1.5">
              {SHOWCASE_IMAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImageIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Project Caption & Feature Pill */}
          <div className="relative z-10 space-y-4 pt-16">
            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[11px] font-mono uppercase tracking-wider text-amber-200">
                {activeImage.category}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {activeImage.title}
              </h2>
              <p className="text-xs text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeImage.location}</span>
              </p>
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Admin Gateway</span>
              </div>
              <span className="text-slate-400 text-[11px]">v2.6 Live CMS</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Light Themed Login Form */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div>
            {/* Logo and Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3.5">
                <img
                  src="/logo.png"
                  alt="Perfect Mason"
                  className="w-14 h-14 rounded-full object-contain shadow-md shadow-slate-300/60 border border-slate-200 bg-white p-1"
                />
                <div>
                  <h1 className="font-display font-bold text-lg uppercase tracking-wider text-slate-900">
                    Perfect Mason
                  </h1>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                    Admin Portal
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Public Site</span>
              </button>
            </div>

            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
                Sign in to Admin
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-sans">
                Manage architectural portfolio, client enquiries, and editorial blogs.
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Address Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 font-mono">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@perfectmason.com"
                    autoComplete="email"
                    autoFocus
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 font-mono">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password..."
                    autoComplete="current-password"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-10 pr-11 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-black active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-slate-900/15 flex items-center justify-center gap-2 mt-2 disabled:opacity-75"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Autofill Helper */}
            <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
              <div className="text-[11px] text-slate-500 font-mono leading-tight">
                <span>Default: </span>
                <span className="font-semibold text-slate-800">admin@perfectmason.com</span>
                <span className="text-slate-400"> / </span>
                <span className="font-semibold text-slate-800">perfectmason2026</span>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-[11px] font-semibold text-slate-700 transition-colors shadow-sm"
              >
                Auto-fill
              </button>
            </div>
          </div>

          {/* Bottom Secure Badge */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1 text-slate-500">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>TLS 256-bit Encrypted Session</span>
            </div>
            <span>© 2026 Perfect Mason</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
