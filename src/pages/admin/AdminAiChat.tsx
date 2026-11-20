import React, { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { apiService, AiChatSessionRecord } from '../../services/api';
import {
  Bot,
  User,
  MapPin,
  Search,
  Phone,
  FileText,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminAiChat: React.FC = () => {
  const { addEnquiry } = useData();
  const [sessions, setSessions] = useState<AiChatSessionRecord[]>([]);
  const [selectedSession, setSelectedSession] = useState<AiChatSessionRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'New' | 'Reviewed'>('All');
  const [convertedId, setConvertedId] = useState<string | null>(null);

  // Default seed conversations for immediate review
  const defaultSessions: AiChatSessionRecord[] = [
    {
      id: 'chat-001',
      visitorName: 'Suresh Kumar',
      visitorPhone: '+91 98450 12345',
      projectType: 'Luxury Villa G+2',
      location: 'HSR Layout Sector 2, Bengaluru',
      budget: '₹1.8 Cr - ₹2.2 Cr',
      timeline: 'Next 30 Days',
      summary: 'Customer planning 40x60 plot luxury contemporary villa with double-height living room and home automation.',
      messages: [
        { role: 'user', content: 'Hello, I have a 40x60 plot in HSR Layout and want to build a G+2 villa. Can you give me an idea of built-up area and structural specifications?' },
        { role: 'assistant', content: 'Welcome to Perfect Mason! A 40×60 ft plot provides 2,400 sq.ft land footprint. Under BBMP setback guidelines, a G+2 design typically accommodates ~4,800 to 5,500 sq.ft of luxurious built-up area. We engineer custom villas with Fe550D TMT steel, certified M25/M30 concrete, and itemized BOQ billing.' },
        { role: 'user', content: 'That sounds solid. Can someone visit the site next week? My name is Suresh Kumar, phone is +91 98450 12345.' },
        { role: 'assistant', content: 'Thank you Mr. Suresh Kumar! I have logged your site visit request for HSR Layout Sector 2. Our Senior Civil Engineering Director will call you at +91 98450 12345 to schedule an on-site feasibility review.' }
      ],
      status: 'New',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'chat-002',
      visitorName: 'Anand Varma',
      visitorPhone: '+91 99000 88776',
      projectType: 'Commercial Showroom Fit-Out',
      location: 'Koramangala 5th Block, Bengaluru',
      budget: '₹85 Lakhs',
      timeline: 'Immediate',
      summary: 'Retail showroom fit-out requiring post-tensioned open floor plates and unitized structural glazing.',
      messages: [
        { role: 'user', content: 'Do you execute commercial retail buildings? We have a commercial plot in Koramangala.' },
        { role: 'assistant', content: 'Yes! Perfect Mason has completed landmark retail complexes including the flagship Manappuram Commercial Complex (32,000 Sq.Ft) in Bengaluru. We execute column-optimized open spans, structural glazing, and itemized billing.' },
        { role: 'user', content: 'Great, please have your team reach out to Anand Varma at +91 99000 88776.' },
        { role: 'assistant', content: 'Recorded! Mr. Anand Varma, our commercial project team will reach out at +91 99000 88776.' }
      ],
      status: 'Reviewed',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    }
  ];

  useEffect(() => {
    let isMounted = true;
    async function loadSessions() {
      try {
        const data = await apiService.getAiConversations();
        if (!isMounted) return;
        if (data && data.length > 0) {
          setSessions(data);
          setSelectedSession(data[0]);
        } else {
          setSessions(defaultSessions);
          setSelectedSession(defaultSessions[0]);
        }
      } catch {
        if (isMounted) {
          setSessions(defaultSessions);
          setSelectedSession(defaultSessions[0]);
        }
      }
    }
    loadSessions();
    return () => { isMounted = false; };
  }, []);

  const filteredSessions = sessions.filter((s) => {
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      (s.visitorName && s.visitorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.visitorPhone && s.visitorPhone.includes(searchQuery)) ||
      (s.location && s.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.projectType && s.projectType.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleToggleStatus = async (session: AiChatSessionRecord) => {
    const newStatus = session.status === 'New' ? 'Reviewed' : 'New';
    setSessions((prev) =>
      prev.map((s) => (s.id === session.id ? { ...s, status: newStatus } : s))
    );
    if (selectedSession?.id === session.id) {
      setSelectedSession({ ...session, status: newStatus });
    }
    try {
      await apiService.updateAiConversationStatus(session.id, newStatus);
    } catch (e) {
      console.warn('Status update warning:', e);
    }
  };

  const handleConvertToEnquiry = (session: AiChatSessionRecord) => {
    addEnquiry({
      fullName: session.visitorName || 'AI Web Lead',
      phone: session.visitorPhone || 'Not provided',
      email: '',
      projectType: session.projectType || 'General Construction',
      location: session.location || 'Bengaluru',
      requirement: session.budget ? `Budget: ${session.budget}` : 'AI Chat Intake',
      preferredContact: 'Phone',
      message: `[AI Chatbot Lead] Summary: ${session.summary || 'Customer expressed interest via AI Chat Assistant.'}`,
    });
    setConvertedId(session.id);
    handleToggleStatus(session);
    setTimeout(() => setConvertedId(null), 3500);
  };

  return (
    <AdminLayout>
      <div className="space-y-7 pb-16">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                <Bot className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-bold text-slate-950 font-sans tracking-tight">
                AI Chatbot Conversations
              </h1>
            </div>
            <p className="text-sm text-slate-600 font-sans max-w-2xl">
              Review live client interactions with the Perfect Mason AI Assistant. Extract architectural plot briefs, contact information, and convert discussions directly into verified project enquiries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-semibold text-slate-700 font-mono">
              Total Sessions: {sessions.length}
            </span>
          </div>
        </div>

        {/* Master Workspace: Left Sessions List + Right Transcript */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[620px]">
          {/* Left Column: Session Selector (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 flex flex-col space-y-4">
            {/* Search and Status Pills */}
            <div className="space-y-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search visitor, phone, area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 outline-none font-sans"
                />
              </div>

              <div className="flex items-center gap-1.5">
                {(['All', 'New', 'Reviewed'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      statusFilter === st
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredSessions.map((session) => {
                const isSelected = selectedSession?.id === session.id;

                return (
                  <div
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-blue-50/60 border-blue-500 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="font-bold text-xs text-slate-900 truncate">
                        {session.visitorName || 'Anonymous Visitor'}
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono ${
                          session.status === 'New'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {session.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 font-sans line-clamp-2 mb-2 leading-relaxed">
                      {session.summary || session.messages?.[0]?.content}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                      <span>{session.messages?.length || 0} msgs</span>
                    </div>
                  </div>
                );
              })}

              {filteredSessions.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-400">
                  No chat sessions match your search.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Chat Transcript & Structured Lead Extraction (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between overflow-hidden">
            {selectedSession ? (
              <>
                {/* Header Summary */}
                <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-900 font-sans">
                        {selectedSession.visitorName || 'Prospective Client'}
                      </h2>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                          selectedSession.status === 'New'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {selectedSession.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-sans mt-1">
                      {selectedSession.visitorPhone && (
                        <span className="flex items-center gap-1 font-semibold text-slate-800">
                          <Phone className="w-3.5 h-3.5 text-blue-600" />
                          {selectedSession.visitorPhone}
                        </span>
                      )}
                      {selectedSession.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {selectedSession.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(selectedSession)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      {selectedSession.status === 'New' ? 'Mark Reviewed' : 'Mark as New'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleConvertToEnquiry(selectedSession)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-600/30 transition-all"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{convertedId === selectedSession.id ? 'Converted to Enquiry!' : 'Convert to Lead'}</span>
                    </button>
                  </div>
                </div>

                {/* Structured Requirements Brief */}
                <div className="p-4 bg-blue-50/50 border-b border-blue-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] uppercase text-blue-800 font-bold block">
                      Project Type
                    </span>
                    <span className="font-semibold text-slate-900">
                      {selectedSession.projectType || 'Custom Architecture'}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] uppercase text-blue-800 font-bold block">
                      Target Area
                    </span>
                    <span className="font-semibold text-slate-900">
                      {selectedSession.location || 'Bengaluru'}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] uppercase text-blue-800 font-bold block">
                      Budget Indication
                    </span>
                    <span className="font-semibold text-slate-900">
                      {selectedSession.budget || 'To be itemized'}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] uppercase text-blue-800 font-bold block">
                      Start Timeline
                    </span>
                    <span className="font-semibold text-slate-900">
                      {selectedSession.timeline || 'Immediate'}
                    </span>
                  </div>
                </div>

                {/* Chat Messages Transcript */}
                <div className="p-5 flex-1 overflow-y-auto space-y-4 max-h-[460px] bg-slate-50/30">
                  {selectedSession.messages?.map((msg, idx) => {
                    const isAi = msg.role === 'assistant';

                    return (
                      <div
                        key={idx}
                        className={`flex gap-3 ${isAi ? 'items-start' : 'items-start flex-row-reverse'}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                            isAi
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-900 text-white'
                          }`}
                        >
                          {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>

                        <div
                          className={`max-w-[78%] p-3.5 rounded-2xl text-xs font-sans leading-relaxed ${
                            isAi
                              ? 'bg-white border border-slate-200 text-slate-800 shadow-2xs'
                              : 'bg-blue-600 text-white shadow-xs'
                          }`}
                        >
                          <div className={`text-[10px] font-mono mb-1 ${isAi ? 'text-blue-600 font-bold' : 'text-blue-100'}`}>
                            {isAi ? 'Perfect Mason AI Assistant' : 'Customer'}
                          </div>
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Note */}
                <div className="p-3.5 border-t border-slate-100 bg-slate-50 text-[11px] font-mono text-slate-500 text-center">
                  Live interaction transcript recorded via Perfect Mason customer assistant
                </div>
              </>
            ) : (
              <div className="p-16 text-center text-slate-400">
                Select a conversation on the left to view the full dialogue.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
