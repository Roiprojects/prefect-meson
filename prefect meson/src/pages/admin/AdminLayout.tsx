import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  LayoutDashboard,
  Layers,
  Home,
  Info,
  Building2,
  Briefcase,
  Palette,
  Image as ImageIcon,
  BookOpen,
  Star,
  PhoneCall,
  PanelTop,
  Inbox,
  Bot,
  FolderOpen,
  Settings,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Search,
  Bell,
  ChevronDown,
} from 'lucide-react';

interface NavSubItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeColor?: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeColor?: string;
  children?: NavSubItem[];
}

interface NavGroup {
  groupTitle: string;
  items: NavItem[];
}

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminLogout, enquiries, blogs, projects, reviews, activityLogs } = useData();

  // Responsive & Interactive States
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pm_admin_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  // Collapsible Page Manager Submenu State
  const [isPageManagerExpanded, setIsPageManagerExpanded] = useState<boolean>(() => {
    return true;
  });

  useEffect(() => {
    if (location.pathname.startsWith('/admin/pages')) {
      setIsPageManagerExpanded(true);
    }
  }, [location.pathname]);

  // Top Nav Dropdowns
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Toggle and persist sidebar collapse
  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('pm_admin_sidebar_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut support: Cmd+K / Ctrl+K to focus search, Esc to close dropdowns
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K opens and focuses search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
        return;
      }

      // / opens search when not already focused on an input/textarea
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
        return;
      }

      // Escape key closes open dropdowns
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
        setIsProfileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setIsMobileNavOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const pendingEnquiries = enquiries.filter((e) => e.status === 'New').length;

  // Exact navigation groups and items preserved in order
  const navGroups: NavGroup[] = [
    {
      groupTitle: 'OVERVIEW',
      items: [
        { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      groupTitle: 'WEBSITE CONTENT',
      items: [
        {
          label: 'Page Manager',
          href: '/admin/pages',
          icon: Layers,
          children: [
            { label: 'Home Page', href: '/admin/pages/home', icon: Home },
            { label: 'About Us', href: '/admin/pages/about', icon: Info },
            { label: 'Contact Page', href: '/admin/pages/contact', icon: PhoneCall },
            { label: 'Header & Footer', href: '/admin/pages/header-footer', icon: PanelTop },
          ],
        },
        { label: 'Commercial Construction', href: '/admin/commercial', icon: Building2 },
        { label: 'Residential Construction', href: '/admin/residential', icon: Home },
        { label: 'Turnkey Projects', href: '/admin/turnkey', icon: Briefcase },
        { label: 'Interiors', href: '/admin/interiors', icon: Palette },
        { label: 'Gallery & Projects', href: '/admin/gallery', icon: ImageIcon, badge: projects.length },
        { label: 'Blogs', href: '/admin/blogs', icon: BookOpen, badge: blogs.length },
        { label: 'Testimonials', href: '/admin/testimonials', icon: Star, badge: reviews?.length || 5 },
      ],
    },
    {
      groupTitle: 'BUSINESS',
      items: [
        {
          label: 'Project Enquiries',
          href: '/admin/enquiries',
          icon: Inbox,
          badge: pendingEnquiries > 0 ? `${pendingEnquiries} New` : enquiries.length,
          badgeColor: pendingEnquiries > 0 ? 'bg-amber-500 text-white font-bold' : undefined,
        },
        {
          label: 'AI Chatbot Conversations',
          href: '/admin/ai-chat',
          icon: Bot,
        },
        {
          label: 'Media Library',
          href: '/admin/media',
          icon: FolderOpen,
        },
      ],
    },
    {
      groupTitle: 'SYSTEM',
      items: [
        { label: 'Website Settings', href: '/admin/settings', icon: Settings },
        { label: 'Admin Users', href: '/admin/users', icon: Users },
      ],
    },
  ];

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  // Find active nav item and group title for breadcrumbs (exact matching + child matching)
  let activePageName = 'Dashboard';
  let activeGroupName = 'OVERVIEW';
  for (const g of navGroups) {
    for (const item of g.items) {
      if (location.pathname === item.href) {
        activePageName = item.label;
        activeGroupName = g.groupTitle;
        break;
      }
      if (item.children) {
        const matchingChild = item.children.find((c) => location.pathname === c.href);
        if (matchingChild) {
          activePageName = matchingChild.label;
          activeGroupName = g.groupTitle;
          break;
        }
      }
      if (item.href !== '/admin/pages' && location.pathname.startsWith(item.href)) {
        activePageName = item.label;
        activeGroupName = g.groupTitle;
        break;
      }
    }
  }

  // Live Search Results (Searches routes, enquiries, projects, and blogs)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();

    const results: Array<{ title: string; subtitle: string; href: string; category: string }> = [];

    // 1. Search Admin Navigation Items (including submenus)
    navGroups.forEach((g) => {
      g.items.forEach((item) => {
        if (item.label.toLowerCase().includes(q)) {
          results.push({
            title: item.label,
            subtitle: `${g.groupTitle} Section`,
            href: item.href,
            category: 'Admin Navigation',
          });
        }
        if (item.children) {
          item.children.forEach((child) => {
            if (child.label.toLowerCase().includes(q)) {
              results.push({
                title: child.label,
                subtitle: `${item.label} Submenu`,
                href: child.href,
                category: 'Admin Navigation',
              });
            }
          });
        }
      });
    });

    // 2. Search Enquiries
    enquiries.forEach((enq) => {
      if (
        enq.fullName?.toLowerCase().includes(q) ||
        enq.projectType?.toLowerCase().includes(q) ||
        enq.phone?.includes(q)
      ) {
        results.push({
          title: enq.fullName,
          subtitle: `${enq.projectType} • ${enq.status}`,
          href: '/admin/enquiries',
          category: 'Customer Enquiries',
        });
      }
    });

    // 3. Search Projects
    projects.forEach((proj) => {
      if (proj.title?.toLowerCase().includes(q) || proj.category?.toLowerCase().includes(q)) {
        results.push({
          title: proj.title,
          subtitle: `${proj.category} Project`,
          href: '/admin/gallery',
          category: 'Portfolio Gallery',
        });
      }
    });

    // 4. Search Blogs
    blogs.forEach((b) => {
      if (b.title?.toLowerCase().includes(q)) {
        results.push({
          title: b.title,
          subtitle: `Article (${b.status})`,
          href: '/admin/blogs',
          category: 'Blog Articles',
        });
      }
    });

    return results.slice(0, 8);
  }, [searchQuery, navGroups, enquiries, projects, blogs]);

  // Notifications List (Real database data)
  const notificationItems = useMemo(() => {
    const list: Array<{ id: string; title: string; subtitle: string; time: string; href: string; isNew: boolean }> = [];

    // Add unreviewed enquiries
    enquiries
      .filter((e) => e.status === 'New')
      .slice(0, 4)
      .forEach((e) => {
        list.push({
          id: `enq-${e.id}`,
          title: `New Enquiry: ${e.fullName}`,
          subtitle: `${e.projectType} • ${e.location || 'Bengaluru'}`,
          time: e.createdAt
            ? new Date(e.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
            : 'Recent',
          href: '/admin/enquiries',
          isNew: true,
        });
      });

    // Add recent activity logs
    activityLogs.slice(0, 3).forEach((log) => {
      list.push({
        id: `log-${log.id}`,
        title: log.title,
        subtitle: log.action,
        time: log.timestamp ? log.timestamp.split(' ')[0] : 'Recent',
        href: log.type === 'gallery' ? '/admin/gallery' : log.type === 'blog' ? '/admin/blogs' : '/admin/dashboard',
        isNew: false,
      });
    });

    return list;
  }, [enquiries, activityLogs]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col md:flex-row font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* ========================================================================= */}
      {/* 1. DESKTOP SIDEBAR (Clean White Background + Deep Navy + Blue Accents)     */}
      {/* ========================================================================= */}
      <aside
        className={`hidden md:flex flex-col justify-between bg-white text-slate-900 border-r border-slate-200/90 shrink-0 min-h-screen sticky top-0 h-screen shadow-xs z-30 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'w-[76px]' : 'w-72'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Header */}
          <div className="p-4 sm:p-4.5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-3 group transition-all min-w-0 ${
                isSidebarCollapsed ? 'justify-center w-full' : ''
              }`}
              title="Perfect Mason Enterprise CMS"
            >
              <div className="relative shrink-0">
                <img
                  src="/logo.png"
                  alt="Perfect Mason"
                  className="w-10 h-10 rounded-xl object-contain shadow-2xs border border-slate-200/90 bg-white p-1 group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>

              {!isSidebarCollapsed && (
                <div className="min-w-0">
                  <div className="font-sans font-bold text-xs uppercase tracking-wider text-slate-950 truncate">
                    PERFECT MASON
                  </div>
                  <div className="font-mono text-[9.5px] text-blue-600 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <span>ENTERPRISE CMS</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400">v3.2</span>
                  </div>
                </div>
              )}
            </Link>

            {/* Collapse/Expand Toggle Button */}
            {!isSidebarCollapsed && (
              <button
                type="button"
                onClick={toggleSidebarCollapse}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                title="Collapse Sidebar"
                aria-label="Collapse Sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Collapsed Expand Toggle Button (when collapsed) */}
          {isSidebarCollapsed && (
            <div className="p-2 border-b border-slate-100 flex justify-center bg-white">
              <button
                type="button"
                onClick={toggleSidebarCollapse}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                title="Expand Sidebar"
                aria-label="Expand Sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Navigation Groups with Scroll */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5 custom-clean-scrollbar">
            {navGroups.map((group) => (
              <div key={group.groupTitle} className="space-y-1">
                {/* Group Heading */}
                {!isSidebarCollapsed ? (
                  <div className="px-3.5 pb-1.5 pt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400/90 select-none">
                    {group.groupTitle}
                  </div>
                ) : (
                  <div className="w-8 mx-auto h-[1px] bg-slate-200/80 my-2" />
                )}

                {/* Group Items */}
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;

                    if (item.children && !isSidebarCollapsed) {
                      return (
                        <div key={item.href} className="space-y-0.5">
                          <div className="flex items-center gap-1">
                            <Link
                              to={item.href}
                              onClick={() => setIsPageManagerExpanded(true)}
                              className={`group relative flex-1 flex items-center justify-between rounded-xl text-xs tracking-normal transition-all duration-150 px-3.5 py-2.5 ${
                                isActive
                                  ? 'bg-blue-600 text-white font-semibold shadow-xs shadow-blue-600/30'
                                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 font-medium'
                              } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/25 active:scale-[0.99]`}
                            >
                              {/* Slim Left Active Indicator Bar */}
                              {isActive && (
                                <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-md bg-white/90" />
                              )}

                              <div className="flex items-center gap-3 min-w-0">
                                <Icon
                                  className={`w-4 h-4 shrink-0 transition-colors ${
                                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                                  }`}
                                />
                                <span className="truncate">{item.label}</span>
                              </div>

                              {item.badge !== undefined && (
                                <span
                                  className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold shrink-0 transition-colors ${
                                    isActive
                                      ? 'bg-white/20 text-white'
                                      : item.badgeColor
                                      ? item.badgeColor
                                      : 'bg-slate-100 text-slate-600 border border-slate-200/80 group-hover:bg-slate-200/60'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </Link>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsPageManagerExpanded((prev) => !prev);
                              }}
                              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100/80 border border-transparent hover:border-slate-200 transition-colors cursor-pointer shrink-0"
                              title={isPageManagerExpanded ? 'Collapse Submenu' : 'Expand Submenu'}
                              aria-label={isPageManagerExpanded ? 'Collapse Submenu' : 'Expand Submenu'}
                            >
                              <ChevronDown
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                  isPageManagerExpanded ? 'rotate-0' : '-rotate-90'
                                }`}
                              />
                            </button>
                          </div>

                          {/* Submenu Items */}
                          {isPageManagerExpanded && (
                            <div className="pl-4 pr-1 py-0.5 space-y-0.5 ml-3 border-l-2 border-slate-200/80">
                              {item.children.map((child) => {
                                const isChildActive = location.pathname === child.href;
                                const ChildIcon = child.icon;

                                return (
                                  <Link
                                    key={child.href}
                                    to={child.href}
                                    className={`group relative flex items-center justify-between rounded-lg text-[11.5px] tracking-normal transition-all duration-150 px-2.5 py-2 ${
                                      isChildActive
                                        ? 'bg-blue-600 text-white font-semibold shadow-xs shadow-blue-600/30'
                                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 font-medium'
                                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/25 active:scale-[0.99]`}
                                  >
                                    {isChildActive && (
                                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-md bg-white/90" />
                                    )}
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <ChildIcon
                                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                                          isChildActive
                                            ? 'text-white'
                                            : 'text-slate-400 group-hover:text-slate-700'
                                        }`}
                                      />
                                      <span className="truncate">{child.label}</span>
                                    </div>
                                    {child.badge !== undefined && (
                                      <span
                                        className={`px-1.5 py-0.2 rounded-full font-mono text-[9px] font-bold shrink-0 ${
                                          isChildActive
                                            ? 'bg-white/20 text-white'
                                            : 'bg-slate-100 text-slate-600'
                                        }`}
                                      >
                                        {child.badge}
                                      </span>
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        title={isSidebarCollapsed ? `${item.label}${item.badge !== undefined ? ` (${item.badge})` : ''}` : undefined}
                        className={`group relative flex items-center justify-between rounded-xl text-xs tracking-normal transition-all duration-150 ${
                          isSidebarCollapsed
                            ? 'p-2.5 justify-center'
                            : 'px-3.5 py-2.5'
                        } ${
                          isActive
                            ? 'bg-blue-600 text-white font-semibold shadow-xs shadow-blue-600/30'
                            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 font-medium'
                        } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/25 active:scale-[0.99]`}
                      >
                        {/* Slim Left Active Indicator Bar */}
                        {isActive && (
                          <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-md bg-white/90" />
                        )}

                        <div className={`flex items-center gap-3 min-w-0 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                            }`}
                          />
                          {!isSidebarCollapsed && (
                            <span className="truncate">{item.label}</span>
                          )}
                        </div>

                        {/* Notification / Count Badge */}
                        {!isSidebarCollapsed && item.badge !== undefined && (
                          <span
                            className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold shrink-0 transition-colors ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : item.badgeColor
                                ? item.badgeColor
                                : 'bg-slate-100 text-slate-600 border border-slate-200/80 group-hover:bg-slate-200/60'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}

                        {/* Dot indicator when collapsed and has badge */}
                        {isSidebarCollapsed && item.badge !== undefined && (
                          <span
                            className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${
                              item.badgeColor ? 'bg-amber-500 animate-pulse' : 'bg-blue-600'
                            }`}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Sidebar Footer / User Profile & Actions */}
          <div className="p-3.5 border-t border-slate-100 bg-slate-50/70 space-y-2 shrink-0">
            {!isSidebarCollapsed ? (
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-xs shadow-blue-600/20">
                    PM
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate font-sans">Administrator</div>
                    <div className="text-[10px] font-mono text-slate-400 truncate">admin@perfectmason.com</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs shadow-blue-600/20 cursor-pointer"
                  title="Administrator (admin@perfectmason.com)"
                >
                  PM
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {!isSidebarCollapsed ? (
              <Link
                to="/"
                target="_blank"
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/90 shadow-2xs transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                <span>Preview Live Website</span>
              </Link>
            ) : (
              <Link
                to="/"
                target="_blank"
                className="w-full flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-blue-600 bg-white hover:bg-slate-100 border border-slate-200/90 transition-all cursor-pointer"
                title="Preview Live Website"
              >
                <ExternalLink className="w-4 h-4 text-blue-600" />
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MOBILE TOP BAR & NAVIGATION DRAWER (Clean White + Deep Navy)           */}
      {/* ========================================================================= */}
      <div className="md:hidden flex items-center justify-between p-3.5 bg-white text-slate-900 border-b border-slate-200/90 sticky top-0 z-50 shadow-xs">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="Perfect Mason"
            className="w-9 h-9 rounded-xl object-contain border border-slate-200 bg-white p-0.5 shadow-2xs"
          />
          <div>
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-slate-950 block">
              PERFECT MASON
            </span>
            <span className="text-[9px] font-mono text-blue-600 uppercase font-semibold tracking-wider">
              ADMIN CMS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Notification Bell on Mobile */}
          <Link
            to="/admin/enquiries"
            className="relative p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100"
            title="Enquiries"
          >
            <Bell className="w-4 h-4" />
            {pendingEnquiries > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </Link>

          <Link
            to="/"
            target="_blank"
            className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 border border-slate-200"
            title="Preview Website"
          >
            <ExternalLink className="w-4 h-4 text-blue-600" />
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-xl cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {isMobileNavOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs flex flex-col justify-end"
          onClick={() => setIsMobileNavOpen(false)}
        >
          <div
            className="bg-white text-slate-900 border-t border-slate-200 p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto rounded-t-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                NAVIGATION MENU
              </span>
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search admin pages, leads, articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8.5 pr-8 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Search Results */}
            {searchQuery.trim() && (
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 space-y-1 max-h-48 overflow-y-auto text-xs">
                {searchResults.length > 0 ? (
                  searchResults.map((res, idx) => (
                    <div
                      key={`mob-${res.title}-${idx}`}
                      onClick={() => {
                        navigate(res.href);
                        setIsMobileNavOpen(false);
                        setSearchQuery('');
                      }}
                      className="p-2 bg-white rounded-lg border border-slate-100 hover:bg-blue-50/50 cursor-pointer flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 block truncate">{res.title}</span>
                        <span className="text-[10px] text-slate-500 block truncate">{res.subtitle}</span>
                      </div>
                      <span className="font-mono text-[8.5px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                        {res.category}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-[11px] text-slate-400">
                    No results found for "{searchQuery}".
                  </div>
                )}
              </div>
            )}

            {navGroups.map((group) => (
              <div key={group.groupTitle} className="space-y-1">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2">
                  {group.groupTitle}
                </div>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;

                  if (item.children) {
                    return (
                      <div key={item.href} className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Link
                            to={item.href}
                            onClick={() => {
                              setIsMobileNavOpen(false);
                              setIsPageManagerExpanded(true);
                            }}
                            className={`flex-1 flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold ${
                              isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                              <span>{item.label}</span>
                            </div>
                            {item.badge !== undefined && (
                              <span
                                className={`px-2 py-0.5 rounded-full font-mono text-[10px] ${
                                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </Link>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setIsPageManagerExpanded((prev) => !prev);
                            }}
                            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                            aria-label={isPageManagerExpanded ? 'Collapse Submenu' : 'Expand Submenu'}
                          >
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isPageManagerExpanded ? 'rotate-0' : '-rotate-90'
                              }`}
                            />
                          </button>
                        </div>

                        {isPageManagerExpanded && (
                          <div className="pl-4 pr-1 py-1 space-y-0.5 border-l-2 border-slate-200/80 ml-3">
                            {item.children.map((child) => {
                              const isChildActive = location.pathname === child.href;
                              const ChildIcon = child.icon;

                              return (
                                <Link
                                  key={child.href}
                                  to={child.href}
                                  onClick={() => setIsMobileNavOpen(false)}
                                  className={`flex items-center justify-between p-2 rounded-lg text-xs font-medium ${
                                    isChildActive
                                      ? 'bg-blue-600 text-white font-semibold'
                                      : 'text-slate-600 hover:bg-slate-100'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <ChildIcon
                                      className={`w-3.5 h-3.5 shrink-0 ${isChildActive ? 'text-white' : 'text-slate-400'}`}
                                    />
                                    <span className="truncate">{child.label}</span>
                                  </div>
                                  {child.badge !== undefined && (
                                    <span
                                      className={`px-1.5 py-0.2 rounded-full font-mono text-[9px] ${
                                        isChildActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                                      }`}
                                    >
                                      {child.badge}
                                    </span>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMobileNavOpen(false)}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <Link
                to="/"
                target="_blank"
                className="flex-1 flex items-center justify-center gap-1.5 p-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <span>Public Website</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-1.5 p-2.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MAIN WORKSPACE CONTAINER + REDESIGNED TOP NAVIGATION                   */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto">
        {/* Top Navigation Bar (Clean Corporate White + Deep Navy + Royal Blue Accents) */}
        <header className="hidden md:flex items-center justify-between px-6 lg:px-8 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 sticky top-0 z-20 font-sans shadow-2xs shrink-0">
          {/* Left: Breadcrumb Navigation & View Hierarchy */}
          <div className="flex items-center gap-2.5 text-xs text-slate-500 font-sans">
            <span className="text-slate-400 font-medium">Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            <span className="font-mono uppercase text-[10px] font-bold tracking-wider text-slate-500 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded-md">
              {activeGroupName}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            <h1 className="font-sans font-bold text-slate-900 text-sm tracking-tight m-0 truncate">
              {activePageName}
            </h1>
          </div>

          {/* Right: Functional Search, Notifications & Profile Controls */}
          <div className="flex items-center gap-3">
            {/* 1. Global Connected Search Field */}
            <div ref={searchRef} className="relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search pages, enquiries, projects..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-56 lg:w-72 h-10 pl-9 pr-9 rounded-xl border border-slate-200/90 bg-slate-50/80 hover:border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/15 focus:border-blue-600 focus:bg-white transition-all font-sans shadow-2xs"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-md hover:bg-slate-200/60 transition-colors"
                    aria-label="Clear search query"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="absolute right-2.5 hidden sm:inline-flex items-center gap-0.5 font-mono text-[10px] text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded-md border border-slate-300/80 pointer-events-none font-medium">
                    ⌘K
                  </kbd>
                )}
              </div>

              {/* Live Search Results Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-84 lg:w-96 bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden z-50 text-xs font-sans">
                  <div className="p-3 bg-slate-50/90 border-b border-slate-100 font-mono text-[10.5px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>
                      {searchQuery.trim() ? `Search Results (${searchResults.length})` : 'Quick Navigation'}
                    </span>
                    <span className="text-slate-400 font-normal">Esc to close</span>
                  </div>

                  {searchQuery.trim() ? (
                    searchResults.length > 0 ? (
                      <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                        {searchResults.map((res, idx) => {
                          const badgeStyle =
                            res.category === 'Admin Navigation'
                              ? 'bg-blue-50 text-blue-700 border-blue-200/80'
                              : res.category === 'Customer Enquiries'
                              ? 'bg-amber-50 text-amber-700 border-amber-200/80'
                              : res.category === 'Portfolio Gallery'
                              ? 'bg-purple-50 text-purple-700 border-purple-200/80'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200/80';

                          return (
                            <div
                              key={`${res.title}-${idx}`}
                              onClick={() => {
                                navigate(res.href);
                                setIsSearchOpen(false);
                                setSearchQuery('');
                              }}
                              className="p-3 hover:bg-blue-50/50 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                            >
                              <div className="min-w-0">
                                <span className="font-bold text-slate-900 group-hover:text-blue-700 block truncate text-xs">
                                  {res.title}
                                </span>
                                <span className="text-[11px] text-slate-500 block truncate">
                                  {res.subtitle}
                                </span>
                              </div>
                              <span
                                className={`font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded-md border shrink-0 ${badgeStyle}`}
                              >
                                {res.category}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-400">
                        No matching records found for "{searchQuery}".
                      </div>
                    )
                  ) : (
                    /* Suggested quick destinations when search is opened without typing */
                    <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto p-1.5">
                      <div className="px-2.5 py-1.5 text-[10.5px] font-mono text-slate-400 uppercase font-semibold">
                        Common Destinations
                      </div>
                      {[
                        { label: 'Dashboard Overview', href: '/admin/dashboard', desc: 'Analytics & KPIs' },
                        { label: 'Website Page Manager', href: '/admin/pages', desc: 'Edit all website sections' },
                        { label: 'Project Enquiries', href: '/admin/enquiries', desc: 'Customer leads & quotes' },
                        { label: 'Portfolio Gallery', href: '/admin/gallery', desc: 'Project showcase and photos' },
                        { label: 'Website Settings', href: '/admin/settings', desc: 'SEO, branding & contacts' },
                      ].map((item) => (
                        <div
                          key={item.href}
                          onClick={() => {
                            navigate(item.href);
                            setIsSearchOpen(false);
                          }}
                          className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between gap-2 group"
                        >
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 group-hover:text-blue-600 block text-xs">
                              {item.label}
                            </span>
                            <span className="text-[10.5px] text-slate-400 block">{item.desc}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2. Interactive Notifications Bell Dropdown */}
            <div ref={notifRef} className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative h-10 w-10 rounded-xl transition-all cursor-pointer border flex items-center justify-center ${
                  isNotificationsOpen
                    ? 'bg-slate-100/90 border-slate-300 text-slate-950 shadow-xs'
                    : 'bg-white border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 text-slate-600 hover:text-slate-900 shadow-2xs'
                }`}
                title="Notifications"
                aria-label="View notifications"
                aria-expanded={isNotificationsOpen}
              >
                <Bell className="w-4 h-4" />
                {pendingEnquiries > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white font-mono text-[9px] font-bold flex items-center justify-center ring-2 ring-white shadow-xs">
                    {pendingEnquiries}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Card */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-84 sm:w-96 bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden z-50 text-xs font-sans">
                  <div className="p-3.5 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">Notifications</span>
                        {pendingEnquiries > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-mono text-[9.5px] font-bold">
                            {pendingEnquiries} Unread
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {pendingEnquiries > 0 ? `${pendingEnquiries} customer leads pending review` : 'All customer leads up to date'}
                      </span>
                    </div>
                    <Link
                      to="/admin/enquiries"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-[11px] text-blue-600 hover:text-blue-700 hover:underline font-semibold font-mono"
                    >
                      Open CRM
                    </Link>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {notificationItems.length > 0 ? (
                      notificationItems.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            navigate(n.href);
                            setIsNotificationsOpen(false);
                          }}
                          className={`p-3 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-2.5 ${
                            n.isNew ? 'bg-blue-50/40' : ''
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                              n.isNew ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'
                            }`}
                          />
                          <div className="flex-1 min-w-0 space-y-0.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-slate-900 truncate text-xs">{n.title}</span>
                              <span className="font-mono text-[9px] text-slate-400 shrink-0">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">{n.subtitle}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-400">
                        No notifications currently available.
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 bg-slate-50/80 border-t border-slate-100 text-center">
                    <Link
                      to="/admin/enquiries"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
                    >
                      <span>View all customer enquiries</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Live Website Shortcut Button */}
            <Link
              to="/"
              target="_blank"
              className="hidden lg:inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl bg-blue-50/80 hover:bg-blue-100/90 text-blue-700 text-xs font-semibold transition-all border border-blue-200/80 shadow-2xs"
              title="Open Public Website in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </Link>

            {/* 4. Administrator Avatar & Profile Dropdown */}
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className={`flex items-center gap-2.5 h-10 px-2 rounded-xl transition-all cursor-pointer border ${
                  isProfileMenuOpen
                    ? 'bg-slate-100/90 border-slate-300 text-slate-950 shadow-xs ring-2 ring-blue-500/10'
                    : 'bg-white border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 text-slate-700 shadow-2xs'
                }`}
                aria-label="User profile menu"
                aria-expanded={isProfileMenuOpen}
              >
                <div className="w-7.5 h-7.5 rounded-lg bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs ring-2 ring-blue-100">
                  PM
                </div>
                <div className="hidden sm:block text-left pr-0.5">
                  <span className="font-bold text-xs text-slate-900 block leading-tight font-sans">
                    Administrator
                  </span>
                  <span className="font-mono text-[9.5px] text-blue-600 block leading-tight font-semibold">
                    Super Admin
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    isProfileMenuOpen ? 'rotate-180 text-slate-700' : ''
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-68 bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden z-50 text-xs font-sans">
                  {/* Account Header */}
                  <div className="p-4 bg-slate-50/80 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-mono text-sm font-bold flex items-center justify-center shadow-xs ring-2 ring-blue-100 shrink-0">
                        PM
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-950 text-xs truncate">Administrator</div>
                        <div className="font-mono text-[10.5px] text-slate-500 truncate">admin@perfectmason.com</div>
                        <div className="flex items-center gap-1.5 pt-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                            Active • Super Admin
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Functional Links */}
                  <div className="p-2 space-y-0.5">
                    <Link
                      to="/admin/settings"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 transition-colors font-medium"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Website Settings</span>
                    </Link>

                    <Link
                      to="/admin/users"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 transition-colors font-medium"
                    >
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>Admin Team & Access</span>
                    </Link>

                    <Link
                      to="/"
                      target="_blank"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 transition-colors font-medium"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                      <span>Preview Live Website</span>
                    </Link>
                  </div>

                  {/* Sign Out Action */}
                  <div className="p-2 border-t border-slate-100 bg-slate-50/50">
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-5 sm:p-7 lg:p-9 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
