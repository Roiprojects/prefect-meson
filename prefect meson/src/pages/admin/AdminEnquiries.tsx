import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Clock,
  Compass,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EnquirySubmission } from '../../data/contactData';
import { AdminLayout } from './AdminLayout';

export const AdminEnquiries: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlStatus = searchParams.get('status');
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useData();
  const [selectedStatus, setSelectedStatus] = useState<string>(urlStatus || 'All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeEnquiry, setActiveEnquiry] = useState<EnquirySubmission | null>(
    enquiries[0] || null
  );

  useEffect(() => {
    if (urlStatus) {
      setSelectedStatus(urlStatus);
    }
  }, [urlStatus]);

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

  const filteredEnquiries = enquiries.filter((enq) => {
    if (selectedStatus !== 'All' && enq.status !== selectedStatus) return false;
    if (
      searchQuery &&
      !enq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !enq.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !enq.phone.includes(searchQuery) &&
      !enq.projectType.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1.5">
              <MessageSquareText className="w-3.5 h-3.5 text-amber-600" />
              <span>CLIENT LEAD PIPELINE</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Website Enquiries & Consultations
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-sans max-w-2xl">
              Review incoming project inquiries, update pipeline statuses, and initiate client consultations.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {['All', 'New', 'In Progress', 'Contacted', 'Closed'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => handleStatusChange(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Split: Enquiries List + Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search leads by name, phone, type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 shadow-sm"
              />
            </div>

            <div className="space-y-2.5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
              {filteredEnquiries.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-400">
                  No enquiries found matching filter.
                </div>
              ) : (
                filteredEnquiries.map((enq) => {
                  const isSelected = activeEnquiry?.id === enq.id;

                  return (
                    <div
                      key={enq.id}
                      onClick={() => setActiveEnquiry(enq)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-white border-slate-900 shadow-md ring-1 ring-slate-900/10'
                          : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-slate-900">{enq.fullName}</span>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                            enq.status === 'New'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : enq.status === 'In Progress'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-700 font-semibold mb-1">
                        {enq.projectType}
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>{enq.phone}</span>
                        <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Detail Card */}
          <div className="lg:col-span-7">
            {activeEnquiry ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
                {/* Top Info */}
                <div className="flex items-start justify-between pb-6 border-b border-slate-100 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-slate-400">{activeEnquiry.id}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-mono text-slate-500">
                        {new Date(activeEnquiry.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-slate-900">
                      {activeEnquiry.fullName}
                    </h2>
                    <span className="inline-block mt-1 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      {activeEnquiry.projectType}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="shrink-0 text-right">
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                      Change Status
                    </label>
                    <div className="relative">
                      <select
                        value={activeEnquiry.status}
                        onChange={(e) =>
                          updateEnquiryStatus(activeEnquiry.id, e.target.value as any)
                        }
                        className="appearance-none bg-white border-2 border-slate-300 hover:border-slate-400 rounded-xl py-2 pl-3 pr-8 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer shadow-xs"
                      >
                        <option value="New" className="bg-white text-slate-900 py-1 font-sans">New</option>
                        <option value="In Progress" className="bg-white text-slate-900 py-1 font-sans">In Progress</option>
                        <option value="Contacted" className="bg-white text-slate-900 py-1 font-sans">Contacted</option>
                        <option value="Closed" className="bg-white text-slate-900 py-1 font-sans">Closed</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-600 absolute right-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Direct Contact Buttons (Phone, WhatsApp, Email) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href={`tel:${activeEnquiry.phone}`}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/90 flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 truncate max-w-[100px] sm:max-w-[120px]">{activeEnquiry.phone}</div>
                        <div className="text-[10px] text-slate-400">Click to Call</div>
                      </div>
                    </div>
                  </a>

                  {(() => {
                    const raw = activeEnquiry.phone.replace(/[^0-9]/g, '');
                    const cleanPhone = raw.startsWith('91') ? raw : `91${raw}`;
                    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      `Hello ${activeEnquiry.fullName}, thank you for contacting Perfect Mason. We are reaching out regarding your ${activeEnquiry.projectType} inquiry.`
                    )}`;
                    return (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-xl bg-emerald-50/60 hover:bg-emerald-100/80 border border-emerald-200/80 flex items-center justify-between text-xs transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                            <MessageCircle className="w-4 h-4 fill-current" />
                          </div>
                          <div>
                            <div className="font-semibold text-emerald-950">WhatsApp</div>
                            <div className="text-[10px] text-emerald-600 font-mono">Chat Direct</div>
                          </div>
                        </div>
                      </a>
                    );
                  })()}

                  <a
                    href={`mailto:${activeEnquiry.email}`}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/90 flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 truncate max-w-[100px] sm:max-w-[120px]">
                          {activeEnquiry.email}
                        </div>
                        <div className="text-[10px] text-slate-400">Send Email</div>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Lead Specifications & Context Badges */}
                <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                  {activeEnquiry.location && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{activeEnquiry.location}</span>
                    </span>
                  )}
                  {(activeEnquiry.plotSize || (activeEnquiry as any).plotDimensions) && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                      <Compass className="w-3 h-3 text-blue-500" />
                      <span>Plot: {activeEnquiry.plotSize || (activeEnquiry as any).plotDimensions}</span>
                    </span>
                  )}
                  {(activeEnquiry.budget || (activeEnquiry as any).budget) && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                      <span>Budget: {activeEnquiry.budget || (activeEnquiry as any).budget}</span>
                    </span>
                  )}
                  {activeEnquiry.timeline && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
                      <Clock className="w-3 h-3 text-purple-500" />
                      <span>{activeEnquiry.timeline}</span>
                    </span>
                  )}
                  {activeEnquiry.preferredContact && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
                      <span>Preferred: {activeEnquiry.preferredContact}</span>
                    </span>
                  )}
                  {(activeEnquiry as any).notes?.includes('AI Assistant') ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                      <Sparkles className="w-3 h-3 text-indigo-500" />
                      <span>AI Assistant Lead</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
                      <span>Website Form</span>
                    </span>
                  )}
                </div>

                {/* Requirement & Message */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1">
                      Project Requirement
                    </label>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-800 leading-relaxed font-sans">
                      {activeEnquiry.requirement || 'No detailed requirement provided.'}
                    </div>
                  </div>

                  {(activeEnquiry.message || (activeEnquiry as any).notes) && (
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1">
                        Client Message / Notes
                      </label>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 leading-relaxed font-sans">
                        {activeEnquiry.message || (activeEnquiry as any).notes}
                      </div>
                    </div>
                  )}
                </div>

                {/* Delete button */}
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      deleteEnquiry(activeEnquiry.id);
                      setActiveEnquiry(null);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Enquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-400">
                Select an enquiry from the list to view complete consultation brief.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
