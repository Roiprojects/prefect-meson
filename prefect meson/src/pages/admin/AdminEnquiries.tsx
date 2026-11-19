import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Phone,
  Mail,
  Trash2,
  Search,
  MessageSquareText,
  MapPin,
  ChevronDown,
  MessageCircle,
  Compass,
  Download,
  Eye,
  Check,
  Building,
  Calendar,
  X,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EnquirySubmission, EnquiryStatus } from '../../data/contactData';
import { AdminLayout } from './AdminLayout';

const ALL_STATUSES: EnquiryStatus[] = [
  'New',
  'Contacted',
  'Follow-up Required',
  'Site Visit Scheduled',
  'Interested',
  'Converted',
  'Not Interested',
  'Closed',
];

const CATEGORIES = [
  'All',
  'Commercial',
  'Residential',
  'Turnkey',
  'Interiors',
  'Other',
];

export const AdminEnquiries: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlStatus = searchParams.get('status');
  const { enquiries, updateEnquiry, deleteEnquiry } = useData();

  // Search & Filter state
  const [selectedStatus, setSelectedStatus] = useState<string>(urlStatus || 'All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDateRange, setSelectedDateRange] = useState<'all' | 'today' | '7d' | '30d'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [propertyNameFilter, setPropertyNameFilter] = useState<string>('');

  // Active Enquiry Modal State
  const [detailModalEnquiry, setDetailModalEnquiry] = useState<EnquirySubmission | null>(null);
  const [adminNotesDraft, setAdminNotesDraft] = useState<string>('');
  const [isSavingNotes, setIsSavingNotes] = useState<boolean>(false);
  const [notesSaveSuccess, setNotesSaveSuccess] = useState<boolean>(false);

  // Delete Confirmation State
  const [enquiryToDelete, setEnquiryToDelete] = useState<EnquirySubmission | null>(null);

  // Status updating inline indicator
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (urlStatus) {
      setSelectedStatus(urlStatus);
    }
  }, [urlStatus]);

  useEffect(() => {
    if (detailModalEnquiry) {
      // Keep notes draft in sync when selecting an enquiry
      setAdminNotesDraft(detailModalEnquiry.adminNotes || (detailModalEnquiry as any).notes || '');
      setNotesSaveSuccess(false);
    }
  }, [detailModalEnquiry]);

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    if (status === 'All') {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('status');
      setSearchParams(newParams);
    } else {
      setSearchParams({ status });
    }
  };

  // Status badge styling helper
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Contacted':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Follow-up Required':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Site Visit Scheduled':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Interested':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Converted':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Not Interested':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'Closed':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Filtered Enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enq) => {
      // 1. Status Filter
      if (selectedStatus !== 'All' && enq.status !== selectedStatus) {
        return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'All') {
        const cat = (enq.category || enq.propertyCategory || enq.projectType || '').toLowerCase();
        if (!cat.includes(selectedCategory.toLowerCase())) {
          return false;
        }
      }

      // 3. Property Name Filter
      if (propertyNameFilter.trim()) {
        const pName = (enq.propertyName || enq.projectName || enq.projectType || '').toLowerCase();
        if (!pName.includes(propertyNameFilter.trim().toLowerCase())) {
          return false;
        }
      }

      // 4. Date Range Filter
      if (selectedDateRange !== 'all') {
        const enqDate = new Date(enq.createdAt).getTime();
        const now = Date.now();
        if (selectedDateRange === 'today') {
          const startOfToday = new Date();
          startOfToday.setHours(0, 0, 0, 0);
          if (enqDate < startOfToday.getTime()) return false;
        } else if (selectedDateRange === '7d') {
          if (now - enqDate > 7 * 24 * 60 * 60 * 1000) return false;
        } else if (selectedDateRange === '30d') {
          if (now - enqDate > 30 * 24 * 60 * 60 * 1000) return false;
        }
      }

      // 5. Search Query Filter (Name, Mobile, Email, Property)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = (enq.customerName || enq.fullName || '').toLowerCase().includes(q);
        const matchPhone = (enq.phone || '').includes(q);
        const matchEmail = (enq.email || '').toLowerCase().includes(q);
        const matchProperty = (enq.propertyName || enq.projectName || enq.projectType || '').toLowerCase().includes(q);
        const matchId = (enq.id || '').toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchEmail && !matchProperty && !matchId) {
          return false;
        }
      }

      return true;
    });
  }, [enquiries, selectedStatus, selectedCategory, propertyNameFilter, selectedDateRange, searchQuery]);

  // Status counts for top badges
  const totalEnquiriesCount = enquiries.length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
  const contactedCount = enquiries.filter((e) => e.status === 'Contacted').length;
  const followUpCount = enquiries.filter((e) => e.status === 'Follow-up Required').length;
  const siteVisitsCount = enquiries.filter((e) => e.status === 'Site Visit Scheduled').length;
  const convertedCount = enquiries.filter((e) => e.status === 'Converted').length;

  // Inline status update with immediate PostgreSQL persistence
  const handleInlineStatusChange = async (enquiryId: string, newStatus: EnquiryStatus) => {
    try {
      setUpdatingId(enquiryId);
      await updateEnquiry(enquiryId, { status: newStatus });
      if (detailModalEnquiry && detailModalEnquiry.id === enquiryId) {
        setDetailModalEnquiry({ ...detailModalEnquiry, status: newStatus });
      }
    } catch (err) {
      console.error('Failed to update enquiry status in DB:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Save admin notes to PostgreSQL
  const handleSaveNotes = async () => {
    if (!detailModalEnquiry) return;
    try {
      setIsSavingNotes(true);
      await updateEnquiry(detailModalEnquiry.id, { adminNotes: adminNotesDraft });
      setDetailModalEnquiry({ ...detailModalEnquiry, adminNotes: adminNotesDraft });
      setNotesSaveSuccess(true);
      setTimeout(() => setNotesSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save admin notes to DB:', err);
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Export filtered enquiries to CSV
  const handleExportCSV = () => {
    if (filteredEnquiries.length === 0) {
      alert('No enquiry records to export.');
      return;
    }

    const headers = [
      'Enquiry ID',
      'Customer Name',
      'Mobile Number',
      'Email',
      'Property Name',
      'Property Category',
      'Location',
      'Enquiry Date',
      'Enquiry Status',
      'Admin Notes',
      'Client Message / Requirement',
    ];

    const rows = filteredEnquiries.map((e) => [
      `"${e.id || ''}"`,
      `"${(e.customerName || e.fullName || '').replace(/"/g, '""')}"`,
      `"${(e.phone || '').replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${(e.propertyName || e.projectName || e.projectType || '').replace(/"/g, '""')}"`,
      `"${(e.propertyCategory || e.category || 'General').replace(/"/g, '""')}"`,
      `"${(e.location || '').replace(/"/g, '""')}"`,
      `"${new Date(e.createdAt).toLocaleString()}"`,
      `"${e.status || 'New'}"`,
      `"${(e.adminNotes || '').replace(/"/g, '""')}"`,
      `"${(e.message || e.requirement || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `perfect_mason_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Open customer WhatsApp chat
  const openCustomerWhatsApp = (enq: EnquirySubmission) => {
    const rawPhone = (enq.phone || '').replace(/\D/g, '');
    const cleanPhone = rawPhone.startsWith('91') || rawPhone.length > 10 ? rawPhone : `91${rawPhone}`;
    const custName = enq.customerName || enq.fullName || 'Valued Client';
    const propName = enq.propertyName || enq.projectName || 'your property project';
    const msg = `Hello ${custName}, thank you for contacting Perfect Mason. We are reaching out regarding your enquiry (${enq.id}) for ${propName}. When would be a convenient time for a brief discussion?`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12 font-sans">
        {/* ========================================================================= */}
        {/* 1. HEADER & KPI SUMMARY STRIP                                             */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1.5">
              <MessageSquareText className="w-3.5 h-3.5 text-blue-600" />
              <span>PROPERTY ENQUIRY & LEAD PIPELINE</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
              Customer Enquiries Management
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-sans max-w-2xl">
              Track incoming consultation requests, manage customer pipeline statuses in PostgreSQL, open direct calls or WhatsApp chats, and export CSV logs.
            </p>
          </div>

          {/* Quick Actions (Export CSV) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Export to CSV ({filteredEnquiries.length})</span>
            </button>
          </div>
        </div>

        {/* Dynamic Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div
            onClick={() => handleStatusChange('All')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedStatus === 'All' ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
            }`}
          >
            <div className="text-[10.5px] font-mono uppercase font-bold text-slate-400">Total Enquiries</div>
            <div className="text-xl font-extrabold mt-0.5">{totalEnquiriesCount}</div>
          </div>

          <div
            onClick={() => handleStatusChange('New')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedStatus === 'New' ? 'bg-amber-600 text-white border-amber-600 shadow-sm' : 'bg-white border-slate-200 text-slate-800 hover:border-amber-300'
            }`}
          >
            <div className="text-[10.5px] font-mono uppercase font-bold text-amber-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>New</span>
            </div>
            <div className="text-xl font-extrabold mt-0.5">{newEnquiriesCount}</div>
          </div>

          <div
            onClick={() => handleStatusChange('Contacted')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedStatus === 'Contacted' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white border-slate-200 text-slate-800 hover:border-blue-300'
            }`}
          >
            <div className="text-[10.5px] font-mono uppercase font-bold text-blue-500">Contacted</div>
            <div className="text-xl font-extrabold mt-0.5">{contactedCount}</div>
          </div>

          <div
            onClick={() => handleStatusChange('Follow-up Required')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedStatus === 'Follow-up Required' ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-white border-slate-200 text-slate-800 hover:border-purple-300'
            }`}
          >
            <div className="text-[10.5px] font-mono uppercase font-bold text-purple-500">Follow-up</div>
            <div className="text-xl font-extrabold mt-0.5">{followUpCount}</div>
          </div>

          <div
            onClick={() => handleStatusChange('Site Visit Scheduled')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedStatus === 'Site Visit Scheduled' ? 'bg-sky-600 text-white border-sky-600 shadow-sm' : 'bg-white border-slate-200 text-slate-800 hover:border-sky-300'
            }`}
          >
            <div className="text-[10.5px] font-mono uppercase font-bold text-sky-500">Site Visits</div>
            <div className="text-xl font-extrabold mt-0.5">{siteVisitsCount}</div>
          </div>

          <div
            onClick={() => handleStatusChange('Converted')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedStatus === 'Converted' ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-300'
            }`}
          >
            <div className="text-[10.5px] font-mono uppercase font-bold text-emerald-500">Converted</div>
            <div className="text-xl font-extrabold mt-0.5">{convertedCount}</div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. FILTER & SEARCH CONTROLS                                               */}
        {/* ========================================================================= */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => handleStatusChange('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all shrink-0 cursor-pointer ${
                selectedStatus === 'All'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Statuses ({totalEnquiriesCount})
            </button>
            {ALL_STATUSES.map((st) => {
              const count = enquiries.filter((e) => e.status === st).length;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleStatusChange(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    selectedStatus === st
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{st}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedStatus === st ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Dropdown Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search name, mobile, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-xs bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-sans"
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

            {/* Property Category Filter */}
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 pl-9 pr-8 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:border-blue-600 cursor-pointer appearance-none transition-all font-sans"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All Categories' : `${c} Projects`}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Property Name Filter */}
            <div className="relative">
              <Compass className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Filter by property/project..."
                value={propertyNameFilter}
                onChange={(e) => setPropertyNameFilter(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-xs bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-sans"
              />
              {propertyNameFilter && (
                <button
                  type="button"
                  onClick={() => setPropertyNameFilter('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Date Range Filter */}
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value as any)}
                className="w-full h-10 pl-9 pr-8 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:border-blue-600 cursor-pointer appearance-none transition-all font-sans"
              >
                <option value="all">All Dates</option>
                <option value="today">Today Only</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. DYNAMIC ENQUIRIES TABLE (10 Columns strictly per prompt)                */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-bold">Enquiry ID</th>
                  <th className="py-3.5 px-4 font-bold">Customer Name</th>
                  <th className="py-3.5 px-4 font-bold">Mobile Number</th>
                  <th className="py-3.5 px-4 font-bold">Email</th>
                  <th className="py-3.5 px-4 font-bold">Property Name</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Location</th>
                  <th className="py-3.5 px-4 font-bold">Enquiry Date</th>
                  <th className="py-3.5 px-4 font-bold">Enquiry Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-12 text-center text-slate-400 font-sans text-xs">
                      No customer enquiries found matching current filters.
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((enq) => {
                    const custName = enq.customerName || enq.fullName || 'Valued Client';
                    const propName = enq.propertyName || enq.projectName || enq.projectType || 'General Consultation';
                    const propCat = enq.propertyCategory || enq.category || 'General';
                    const isUpdatingThis = updatingId === enq.id;

                    return (
                      <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* 1. Enquiry ID */}
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/90 text-[11px] text-slate-800">
                            {enq.id}
                          </span>
                        </td>

                        {/* 2. Customer Name */}
                        <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                              {custName.charAt(0).toUpperCase()}
                            </div>
                            <span className="truncate max-w-[140px] sm:max-w-[180px]">{custName}</span>
                          </div>
                        </td>

                        {/* 3. Mobile Number (Clickable call) */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <a
                            href={`tel:${enq.phone.replace(/\s+/g, '')}`}
                            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-mono font-semibold"
                            title="Call customer directly"
                          >
                            <Phone className="w-3.5 h-3.5 text-blue-500" />
                            <span>{enq.phone}</span>
                          </a>
                        </td>

                        {/* 4. Email */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 font-mono text-[11.5px]">
                          {enq.email ? (
                            <a
                              href={`mailto:${enq.email}`}
                              className="inline-flex items-center gap-1 text-slate-700 hover:text-blue-600 truncate max-w-[140px]"
                              title={enq.email}
                            >
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span className="truncate">{enq.email}</span>
                            </a>
                          ) : (
                            <span className="text-slate-400 italic">Not provided</span>
                          )}
                        </td>

                        {/* 5. Property Name */}
                        <td className="py-3.5 px-4 font-semibold text-slate-800 max-w-[160px] truncate" title={propName}>
                          {propName}
                        </td>

                        {/* 6. Property Category */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10.5px] font-mono font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                            {propCat}
                          </span>
                        </td>

                        {/* 7. Location */}
                        <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate max-w-[120px]">{enq.location || 'Bengaluru, India'}</span>
                          </span>
                        </td>

                        {/* 8. Enquiry Date */}
                        <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                          {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>

                        {/* 9. Enquiry Status (Direct Dropdown with PostgreSQL save) */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="relative inline-block">
                            <select
                              value={enq.status || 'New'}
                              disabled={isUpdatingThis}
                              onChange={(e) => handleInlineStatusChange(enq.id, e.target.value as EnquiryStatus)}
                              className={`appearance-none text-[11px] font-mono font-bold uppercase py-1 pl-2.5 pr-6 rounded-lg border cursor-pointer focus:outline-none transition-all ${getStatusBadgeClass(
                                enq.status || 'New'
                              )} ${isUpdatingThis ? 'opacity-50' : ''}`}
                            >
                              {ALL_STATUSES.map((st) => (
                                <option key={st} value={st} className="bg-white text-slate-900 font-sans py-1 normal-case">
                                  {st}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                          </div>
                        </td>

                        {/* 10. Actions */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {/* View Details */}
                            <button
                              type="button"
                              onClick={() => setDetailModalEnquiry(enq)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                              title="View full enquiry details & notes"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {/* Open Customer WhatsApp */}
                            <button
                              type="button"
                              onClick={() => openCustomerWhatsApp(enq)}
                              className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer"
                              title="Open Customer WhatsApp chat"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => setEnquiryToDelete(enq)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                              title="Delete enquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. DETAIL & ADMIN NOTES MODAL                                             */}
        {/* ========================================================================= */}
        {detailModalEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-8">
              {/* Header */}
              <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                      {detailModalEnquiry.id}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs font-mono text-slate-500">
                      {new Date(detailModalEnquiry.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-slate-900">
                    {detailModalEnquiry.customerName || detailModalEnquiry.fullName}
                  </h2>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">
                    {detailModalEnquiry.propertyName || detailModalEnquiry.projectName || 'General Consultation'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setDetailModalEnquiry(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto font-sans text-xs">
                {/* Status Selector in Modal */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Enquiry Pipeline Status
                    </label>
                    <span className="text-xs font-semibold text-slate-700">
                      Current status in PostgreSQL database
                    </span>
                  </div>
                  <div className="relative">
                    <select
                      value={detailModalEnquiry.status || 'New'}
                      onChange={(e) => handleInlineStatusChange(detailModalEnquiry.id, e.target.value as EnquiryStatus)}
                      className={`appearance-none text-xs font-mono font-bold uppercase py-2 pl-3 pr-8 rounded-xl border cursor-pointer focus:outline-none shadow-2xs ${getStatusBadgeClass(
                        detailModalEnquiry.status || 'New'
                      )}`}
                    >
                      {ALL_STATUSES.map((st) => (
                        <option key={st} value={st} className="bg-white text-slate-900 font-sans py-1">
                          {st}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                  </div>
                </div>

                {/* Direct Action Channels */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href={`tel:${(detailModalEnquiry.phone || '').replace(/\s+/g, '')}`}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/90 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 truncate max-w-[120px]">{detailModalEnquiry.phone}</div>
                        <div className="text-[10px] text-slate-400 font-mono">Call Direct</div>
                      </div>
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={() => openCustomerWhatsApp(detailModalEnquiry)}
                    className="p-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-between transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <MessageCircle className="w-4 h-4 fill-current" />
                      </div>
                      <div>
                        <div className="font-bold text-emerald-950">WhatsApp</div>
                        <div className="text-[10px] text-emerald-700 font-mono">Open Customer Chat</div>
                      </div>
                    </div>
                  </button>

                  <a
                    href={`mailto:${detailModalEnquiry.email || ''}`}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/90 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 truncate max-w-[120px]">
                          {detailModalEnquiry.email || 'No email'}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">Send Email</div>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Property Specification Details */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Property Specifications
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Category:</span>
                      <span className="font-bold text-slate-900">
                        {detailModalEnquiry.propertyCategory || detailModalEnquiry.category || 'General'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Location:</span>
                      <span className="font-bold text-slate-900">
                        {detailModalEnquiry.location || 'Bengaluru, India'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Area / Plot:</span>
                      <span className="font-bold text-slate-900">
                        {detailModalEnquiry.plotSize || (detailModalEnquiry as any).estimatedArea || 'Not specified'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Budget Range:</span>
                      <span className="font-bold text-slate-900">
                        {detailModalEnquiry.budget || 'Not specified'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Timeline:</span>
                      <span className="font-bold text-slate-900">
                        {detailModalEnquiry.timeline || 'Flexible'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Preferred Contact:</span>
                      <span className="font-bold text-slate-900">
                        {detailModalEnquiry.preferredContact || 'WhatsApp'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Client Requirement Message */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Client Enquiry Message / Brief
                  </label>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans">
                    {detailModalEnquiry.message || detailModalEnquiry.requirement || 'No custom message entered.'}
                  </div>
                </div>

                {/* Internal Admin Notes (Persisted to PostgreSQL) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>Internal Admin Notes (Saved to PostgreSQL)</span>
                    </label>
                    {notesSaveSuccess && (
                      <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Notes saved!
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={3}
                    value={adminNotesDraft}
                    onChange={(e) => setAdminNotesDraft(e.target.value)}
                    placeholder="Add internal notes on client budget, architect discussion, site visit date, or follow-up schedule..."
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={isSavingNotes}
                      onClick={handleSaveNotes}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                    >
                      {isSavingNotes ? 'Saving to Database...' : 'Save Notes to Database'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setEnquiryToDelete(detailModalEnquiry);
                    setDetailModalEnquiry(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Enquiry</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDetailModalEnquiry(null)}
                  className="px-5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. DELETE CONFIRMATION DIALOG                                             */}
        {/* ========================================================================= */}
        {enquiryToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">Delete Enquiry Record?</h3>
                <p className="text-xs text-slate-600 font-sans mt-1 leading-relaxed">
                  Are you sure you want to permanently delete enquiry <strong className="font-mono text-slate-900">{enquiryToDelete.id}</strong> from{' '}
                  <strong className="text-slate-900">{enquiryToDelete.customerName || enquiryToDelete.fullName}</strong>? This action will remove the record from PostgreSQL and cannot be undone.
                </p>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEnquiryToDelete(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteEnquiry(enquiryToDelete.id);
                    setEnquiryToDelete(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
