import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Minus,
  Send,
  RotateCcw,
  Building2,
  ExternalLink,
  Shield,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestions?: Array<{ label: string; query?: string; link?: string; action?: string }>;
  enquiryForm?: boolean;
}

interface AiChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal?: () => void;
  onToggle?: () => void;
}

const INITIAL_GREETING: ChatMessage = {
  id: 'msg_welcome',
  role: 'assistant',
  content: `Hello! Welcome to **Perfect Mason**. I'm here to help you explore our construction and interior services, understand the project planning process, and get started with your project. What are you planning to build?`,
  timestamp: 'Just now',
  suggestions: [
    { label: '🏡 Villa Construction (30x40 / 40x60)', query: 'What can I build on a 30x40 plot in Bangalore?' },
    { label: '🏗️ 5-Stage Turnkey Process', query: 'How does turnkey project execution work?' },
    { label: '🏢 Commercial Workspaces', query: 'Tell me about commercial office and complex construction.' },
    { label: '📐 Sizing & BBMP Setback Norms', query: 'What are the setback and built-up area rules in Bengaluru?' },
    { label: '📍 Studio Office Location', query: 'Where is your AECS Layout studio located?' },
  ],
};

export const AiChatAssistant: React.FC<AiChatAssistantProps> = ({
  isOpen,
  onClose,
  onOpenQuoteModal,
}) => {
  const navigate = useNavigate();
  const { addEnquiry } = useData();

  // Load chat history from sessionStorage
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('pm_ai_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [INITIAL_GREETING];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // In-chat enquiry submission state
  const [showEnquiryCard, setShowEnquiryCard] = useState(false);
  const [enquiryData, setEnquiryData] = useState({
    name: '',
    phone: '',
    projectType: 'Residential Construction',
    location: '',
    budget: '',
    message: '',
  });
  const [enquirySuccessId, setEnquirySuccessId] = useState<string | null>(null);
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Persist messages to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('pm_ai_chat_history', JSON.stringify(messages));
    } catch {
      // ignore
    }
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  // Handle sending message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      // Send conversation to backend /api/ai/chat
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const aiContent = data.message?.content || 'I could not generate a response. Please try again.';
      const suggestions = data.actionSuggestions || [];

      // Check if user is asking to submit an enquiry
      const lowerText = text.toLowerCase();
      const triggerEnquiry =
        lowerText.includes('enquiry') ||
        lowerText.includes('quote') ||
        lowerText.includes('submit') ||
        lowerText.includes('contact me') ||
        lowerText.includes('call me');

      const aiMsg: ChatMessage = {
        id: 'msg_' + Date.now(),
        role: 'assistant',
        content: aiContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: suggestions.length > 0 ? suggestions : undefined,
        enquiryForm: triggerEnquiry,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.warn('AI Chat failed, adding friendly fallback message:', err);
      const fallbackMsg: ChatMessage = {
        id: 'msg_err_' + Date.now(),
        role: 'assistant',
        content: `I'm having a brief connection delay with our AI server. However, you can reach our Principal Architect directly at **+91 98863 29424** or visit our Design Studio in AECS Layout, Hosur Main Road. Would you like to submit a quick project enquiry?`,
        timestamp: 'Just now',
        suggestions: [
          { label: 'Submit Project Enquiry', action: 'open_enquiry' },
          { label: 'View Residential Projects', link: '/residential' },
          { label: 'Studio Office Map', link: '/contact' },
        ],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle clicking on suggestion pills
  const handleSuggestionClick = (suggestion: { label: string; query?: string; link?: string; action?: string }) => {
    if (suggestion.link) {
      if (suggestion.link.startsWith('http')) {
        window.open(suggestion.link, '_blank');
      } else {
        navigate(suggestion.link);
        if (window.innerWidth < 640) onClose();
      }
      return;
    }

    if (suggestion.action === 'open_enquiry') {
      setShowEnquiryCard(true);
      scrollToBottom();
      return;
    }

    if (suggestion.action === 'open_quote_modal') {
      if (onOpenQuoteModal) onOpenQuoteModal();
      onClose();
      return;
    }

    if (suggestion.query) {
      handleSendMessage(suggestion.query);
    }
  };

  // Reset chat
  const handleResetChat = () => {
    if (window.confirm('Start a fresh consultation session?')) {
      setMessages([INITIAL_GREETING]);
      setShowEnquiryCard(false);
      setEnquirySuccessId(null);
      sessionStorage.removeItem('pm_ai_chat_history');
    }
  };

  // Handle In-Chat Enquiry Submission
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryData.name.trim() || !enquiryData.phone.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }

    setEnquirySubmitting(true);
    try {
      const payload = {
        fullName: enquiryData.name,
        phone: enquiryData.phone,
        email: 'ai-lead@perfectmason.com',
        projectType: enquiryData.projectType,
        location: enquiryData.location || 'Bangalore',
        requirement: `AI Assistant Consultation: ${enquiryData.budget ? 'Budget: ' + enquiryData.budget + '. ' : ''}${enquiryData.message || 'Customer requested consultation via AI assistant.'}`,
        preferredContact: 'Phone' as const,
        message: enquiryData.message || 'Consultation generated from Perfect Mason AI Assistant.',
        status: 'New' as const,
      };

      // Use DataContext addEnquiry which also POSTs to PostgreSQL /api/enquiries
      await addEnquiry(payload);

      const enqId = 'PM-' + Math.floor(1000 + Math.random() * 9000);
      setEnquirySuccessId(enqId);
      setShowEnquiryCard(false);

      // Add confirmation message to chat
      const confirmationMsg: ChatMessage = {
        id: 'msg_confirm_' + Date.now(),
        role: 'assistant',
        content: `🎉 **Enquiry Submitted Successfully! (Reference: #${enqId})**\n\nThank you, **${enquiryData.name}**. Our senior project engineer has received your requirements and will reach out to you on **${enquiryData.phone}** to discuss your architectural drawings and prepare a preliminary BOQ breakdown.`,
        timestamp: 'Just now',
        suggestions: [
          { label: 'Explore Turnkey Execution', link: '/turnkey-project-execution' },
          { label: 'View Completed Villas', link: '/residential' },
          { label: 'Studio Office Map', link: '/contact' },
        ],
      };
      setMessages((prev) => [...prev, confirmationMsg]);
    } catch (err) {
      console.error('Failed to submit enquiry via AI:', err);
      alert('Could not submit enquiry. Please call us directly at +91 98863 29424.');
    } finally {
      setEnquirySubmitting(false);
    }
  };

  // Helper to format markdown text simply
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Bold syntax **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className={line.startsWith('- ') ? 'pl-3.5 relative my-1' : 'my-1'}>
          {line.startsWith('- ') && (
            <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
          )}
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={j} className="font-bold text-slate-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={j}>{line.startsWith('- ') ? part.replace(/^- /, '') : part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? '72px' : '620px',
            }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[430px] max-h-[85vh] bg-white rounded-[32px] border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.3)] flex flex-col overflow-hidden font-sans select-none`}
          >
            {/* 2.1 HEADER BAR */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-[#0B132B] to-[#1456D8] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner">
                    <Building2 className="w-5 h-5 text-orange-400" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-bold text-sm text-white tracking-wide uppercase">
                      Perfect Mason AI
                    </h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/30">
                      LIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-light flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active • Architectural Consultant</span>
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Start New Consultation"
                  className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? 'Expand' : 'Minimize'}
                  className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  title="Close Assistant"
                  className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2.2 BODY (MESSAGES) — Hidden when minimized */}
            {!isMinimized && (
              <>
                <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                          msg.role === 'user'
                            ? 'bg-slate-950 text-white rounded-tr-xs'
                            : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                        }`}
                      >
                        {msg.role === 'assistant' ? (
                          renderFormattedText(msg.content)
                        ) : (
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        )}
                      </div>

                      {/* Message Timestamp */}
                      <span className="text-[10px] font-mono text-slate-400 mt-1 px-1">
                        {msg.timestamp}
                      </span>

                      {/* Contextual Action Chips / Suggestions */}
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                          {msg.suggestions.map((sugg, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSuggestionClick(sugg)}
                              className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-950 text-slate-800 hover:text-white border border-slate-200 hover:border-slate-950 text-[11px] font-semibold tracking-wide transition-all shadow-2xs flex items-center gap-1 active:scale-95"
                            >
                              <span>{sugg.label}</span>
                              {sugg.link && <ExternalLink className="w-2.5 h-2.5 opacity-70" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isLoading && (
                    <div className="flex items-start gap-2">
                      <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 rounded-tl-xs shadow-xs flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-2 h-2 rounded-full bg-slate-950 animate-bounce" />
                        <span className="text-[11px] font-mono text-slate-400 ml-1">
                          Consultant typing...
                        </span>
                      </div>
                    </div>
                  )}

                  {/* In-Chat Structured Enquiry Form Card */}
                  {showEnquiryCard && !enquirySuccessId && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 rounded-2xl bg-white border-2 border-blue-600/40 shadow-xl space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                          <span className="font-mono text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                            Direct Project Enquiry
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowEnquiryCard(false)}
                          className="text-slate-400 hover:text-slate-900"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleEnquirySubmit} className="space-y-2.5 text-xs">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={enquiryData.name}
                            onChange={(e) => setEnquiryData({ ...enquiryData, name: e.target.value })}
                            placeholder="e.g. Anand Sharma"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            value={enquiryData.phone}
                            onChange={(e) => setEnquiryData({ ...enquiryData, phone: e.target.value })}
                            placeholder="e.g. +91 98863 29424"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                              Project Type
                            </label>
                            <select
                              value={enquiryData.projectType}
                              onChange={(e) => setEnquiryData({ ...enquiryData, projectType: e.target.value })}
                              className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-slate-900 bg-white"
                            >
                              <option>Residential Construction</option>
                              <option>Commercial Project</option>
                              <option>Turnkey Execution</option>
                              <option>Interior Architecture</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                              Locality in BLR
                            </label>
                            <input
                              type="text"
                              value={enquiryData.location}
                              onChange={(e) => setEnquiryData({ ...enquiryData, location: e.target.value })}
                              placeholder="e.g. HSR Layout"
                              className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-slate-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                            Brief Requirements
                          </label>
                          <textarea
                            rows={2}
                            value={enquiryData.message}
                            onChange={(e) => setEnquiryData({ ...enquiryData, message: e.target.value })}
                            placeholder="e.g. 30x40 site, looking for G+2 modern villa with 4 bedrooms."
                            className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-slate-900 resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={enquirySubmitting}
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5"
                        >
                          {enquirySubmitting ? (
                            <span>Submitting to Database...</span>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Submit Formal Enquiry</span>
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* 2.3 FOOTER (INPUT BOX & QUICK PROMPTS) */}
                <div className="p-3.5 sm:p-4 bg-white border-t border-slate-100 shrink-0 space-y-2">
                  {/* Quick Action Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
                    <button
                      type="button"
                      onClick={() => setShowEnquiryCard(true)}
                      className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold whitespace-nowrap border border-blue-200/80 transition-colors"
                    >
                      ✍️ Submit Enquiry
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendMessage('Can you estimate a 30x40 duplex villa?')}
                      className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium whitespace-nowrap transition-colors"
                    >
                      30x40 Villa Estimate
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendMessage('What are your office hours and studio address?')}
                      className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium whitespace-nowrap transition-colors"
                    >
                      Studio Office Info
                    </button>
                  </div>

                  {/* Message Input Bar */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about villa construction, plots, costs..."
                      className="flex-1 px-4 py-3 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-sans text-slate-900 focus:outline-none focus:bg-white focus:border-slate-950 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="w-11 h-11 rounded-full bg-slate-950 hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-slate-950 text-white flex items-center justify-center transition-all shadow-md shrink-0 active:scale-95"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Privacy Microcopy */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono px-1">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3 text-emerald-500" />
                      <span>Zero spam • Official Perfect Mason Consultant</span>
                    </span>
                    <a
                      href="tel:+919886329424"
                      className="text-blue-600 font-bold hover:underline"
                    >
                      +91 98863 29424
                    </a>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
  );
};
