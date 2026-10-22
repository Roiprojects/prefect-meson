import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EnquirySubmission } from '../../../data/contactData';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  X,
  Inbox,
  ArrowRight,
} from 'lucide-react';

interface DashboardEnquiriesTableProps {
  enquiries: EnquirySubmission[];
}

export const DashboardEnquiriesTable: React.FC<DashboardEnquiriesTableProps> = ({
  enquiries,
}) => {
  const navigate = useNavigate();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Detail Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquirySubmission | null>(null);

  // Status Badge Helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          pulse: true,
        };
      case 'In Progress':
        return {
          bg: 'bg-purple-50 text-purple-800 border-purple-200',
          dot: 'bg-purple-500',
          pulse: false,
        };
      case 'Contacted':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          dot: 'bg-blue-600',
          pulse: false,
        };
      case 'Closed':
      case 'Completed':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          pulse: false,
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
          pulse: false,
        };
    }
  };

  // Filtered & Sorted Enquiries (Immutable)
  const filteredEnquiries = useMemo(() => {
    return enquiries
      .filter((enq) => {
        // Status filter
        if (statusFilter !== 'All' && enq.status !== statusFilter) return false;

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = enq.fullName?.toLowerCase().includes(q);
          const matchEmail = enq.email?.toLowerCase().includes(q);
          const matchPhone = enq.phone?.includes(q);
          const matchType = enq.projectType?.toLowerCase().includes(q);
          const matchLoc = enq.location?.toLowerCase().includes(q);
          if (!matchName && !matchEmail && !matchPhone && !matchType && !matchLoc) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        }
        if (sortBy === 'name') {
          return (a.fullName || '').localeCompare(b.fullName || '');
        }
        return 0;
      });
  }, [enquiries, statusFilter, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredEnquiries.length / pageSize));
  const paginatedEnquiries = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredEnquiries.slice(startIndex, startIndex + pageSize);
  }, [filteredEnquiries, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden font-sans">
      {/* 1. Header Toolbar */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100">
              <Inbox className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700">
              LEAD PIPELINE
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight">
            Recent Project Enquiries
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Incoming consultation briefs, villa projects, and commercial inquiries.
          </p>
        </div>

        {/* Action Link to Full CRM */}
        <Link
          to="/admin/enquiries"
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1.5 self-start md:self-auto"
        >
          <span>Open Full CRM Pipeline</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 2. Interactive Search, Filter & Sort Bar */}
      <div className="p-4 bg-slate-50/60 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, phone, project, location..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans text-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters & Sort Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Statuses ({enquiries.length})</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Contacted">Contacted</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Client Name (A–Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Main Content: Desktop Table + Mobile Stacked Cards */}
      {paginatedEnquiries.length > 0 ? (
        <>
          {/* Desktop Table View (md+) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/40 text-[10.5px] font-mono uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-5 font-bold">Client / Contact</th>
                  <th className="py-3 px-4 font-bold">Project Details</th>
                  <th className="py-3 px-4 font-bold">Location</th>
                  <th className="py-3 px-4 font-bold">Date Received</th>
                  <th className="py-3 px-4 font-bold">Pipeline Status</th>
                  <th className="py-3 px-5 text-right font-bold">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedEnquiries.map((enq) => {
                  const badge = getStatusBadge(enq.status);
                  const initials = (enq.fullName || 'CL')
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase();

                  return (
                    <tr
                      key={enq.id}
                      onClick={() => setSelectedEnquiry(enq)}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                    >
                      {/* Client / Contact */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold font-mono text-xs flex items-center justify-center shrink-0 border border-blue-200">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-slate-950 group-hover:text-blue-700 transition-colors block truncate">
                              {enq.fullName}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono block truncate">
                              {enq.phone}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Project Details */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 block truncate max-w-[170px]">
                          {enq.projectType}
                        </span>
                        {enq.email && (
                          <span className="text-[11px] text-slate-400 truncate block max-w-[170px]">
                            {enq.email}
                          </span>
                        )}
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[140px]">
                            {enq.location || 'Bengaluru'}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {enq.createdAt
                          ? new Date(enq.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : 'Recent'}
                      </td>

                      {/* Pipeline Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${badge.bg}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${badge.dot} ${
                              badge.pulse ? 'animate-pulse' : ''
                            }`}
                          />
                          <span>{enq.status}</span>
                        </span>
                      </td>

                      {/* Quick Actions */}
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        <div
                          className="inline-flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(enq)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-white border border-transparent hover:border-slate-200 transition-all"
                            title="View Enquiry Brief"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {enq.phone && (
                            <a
                              href={`tel:${enq.phone}`}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-white border border-transparent hover:border-slate-200 transition-all"
                              title="Call Client"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() => navigate('/admin/enquiries')}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition-all"
                            title="Manage in CRM"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Card View (<md) */}
          <div className="md:hidden divide-y divide-slate-100">
            {paginatedEnquiries.map((enq) => {
              const badge = getStatusBadge(enq.status);

              return (
                <div
                  key={enq.id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className="p-4 hover:bg-blue-50/30 transition-colors cursor-pointer space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="font-bold text-slate-900 text-xs block truncate">
                        {enq.fullName}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono block">
                        {enq.phone}
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-mono font-bold border shrink-0 ${badge.bg}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${badge.dot} ${
                          badge.pulse ? 'animate-pulse' : ''
                        }`}
                      />
                      <span>{enq.status}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                    <span className="font-medium text-slate-800 truncate max-w-[180px]">
                      {enq.projectType}
                    </span>
                    <span className="font-mono text-slate-400 shrink-0">
                      {enq.location || 'Bengaluru'}
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="font-mono text-[10px] text-slate-400">
                      {enq.createdAt
                        ? new Date(enq.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })
                        : 'Recent'}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedEnquiry(enq)}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold text-[11px] hover:bg-blue-100 transition-colors"
                      >
                        View Details
                      </button>
                      {enq.phone && (
                        <a
                          href={`tel:${enq.phone}`}
                          className="p-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. Pagination & Record Count Footer */}
          <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
            <span className="text-slate-500 font-mono text-[11px]">
              Showing{' '}
              <strong className="text-slate-800">
                {(currentPage - 1) * pageSize + 1}–
                {Math.min(currentPage * pageSize, filteredEnquiries.length)}
              </strong>{' '}
              of <strong className="text-slate-800">{filteredEnquiries.length}</strong>{' '}
              enquiries
            </span>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1.5 self-center sm:self-auto font-mono text-xs">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-all"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-all"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="p-12 text-center text-xs text-slate-400 space-y-2">
          <Inbox className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="font-medium text-slate-600">No matching enquiries found.</p>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
              }}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Clear Search & Filter
            </button>
          )}
        </div>
      )}

      {/* 5. Detailed Enquiry Brief Modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans animate-fadeIn"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden p-6 space-y-5 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
                  CLIENT CONSULTATION BRIEF
                </span>
                <h4 className="text-xl font-bold text-slate-950">
                  {selectedEnquiry.fullName}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                      getStatusBadge(selectedEnquiry.status).bg
                    }`}
                  >
                    <span>{selectedEnquiry.status}</span>
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-mono">
                    ID: {selectedEnquiry.id}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Bar */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={`tel:${selectedEnquiry.phone}`}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-2.5 text-slate-800 font-mono transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span className="truncate">{selectedEnquiry.phone}</span>
              </a>

              {selectedEnquiry.email ? (
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-2.5 text-slate-800 font-mono transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="truncate">{selectedEnquiry.email}</span>
                </a>
              ) : (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-slate-400 font-mono">
                  <Mail className="w-4 h-4 text-slate-300" />
                  <span>No email</span>
                </div>
              )}
            </div>

            {/* Project Specs */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block">
                    PROJECT CATEGORY
                  </span>
                  <span className="font-semibold text-slate-900 block mt-0.5">
                    {selectedEnquiry.projectType}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block">
                    LOCATION / PLOT
                  </span>
                  <span className="font-semibold text-slate-900 block mt-0.5">
                    {selectedEnquiry.location || 'Bengaluru'}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block">
                  REQUIREMENT / SCOPE
                </span>
                <p className="text-slate-700 mt-1 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/80">
                  {selectedEnquiry.requirement || 'No custom requirement specified.'}
                </p>
              </div>

              {selectedEnquiry.message && (
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block">
                    CLIENT MESSAGE
                  </span>
                  <p className="text-slate-600 mt-1 italic text-[11.5px]">
                    "{selectedEnquiry.message}"
                  </p>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] font-mono text-slate-400">
                Received:{' '}
                {selectedEnquiry.createdAt
                  ? new Date(selectedEnquiry.createdAt).toLocaleString('en-IN')
                  : 'N/A'}
              </span>

              <button
                type="button"
                onClick={() => {
                  setSelectedEnquiry(null);
                  navigate('/admin/enquiries');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>Manage in CRM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
