'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  Search,
  BookOpen,
  FileText,
  CheckCircle2,
  Send,
  ShieldCheck,
  Zap,
  LifeBuoy,
  Clock,
  ArrowRight,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

interface EnterpriseSupportPageProps {
  onTabChange?: (tab: string) => void;
}

export default function EnterpriseSupportPage({ onTabChange }: EnterpriseSupportPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [chatLogs, setChatLogs] = useState([
    { sender: 'AI Assistant', text: 'Hello! I am TradeFlow UK 24/7 AI Support. How can I assist you with dispatches, invoices, or Gas Safe compliance today?', time: '15:00' },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = { sender: 'You', text: chatMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const aiResponse = {
      sender: 'AI Assistant',
      text: `Got your query: "${chatMessage}". Our AI dispatch system and UK technical support team have logged Ticket #TK-9921. An agent will respond in under 2 minutes.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatLogs([...chatLogs, userMsg, aiResponse]);
    setChatMessage('');
    showToast('Support query sent! AI ticket #TK-9921 generated.');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2.5 shadow-2xl backdrop-blur-md animate-in fade-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar with Attractive Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onTabChange && (
            <button
              onClick={() => onTabChange('dashboard')}
              className="p-2.5 bg-[#121824] hover:bg-[#1e293b] text-sky-400 border border-[#1e293b] hover:border-sky-500/50 font-bold rounded-2xl text-xs flex items-center gap-2 transition-all shadow-md hover:scale-105"
              title="Back to Main Executive Dashboard"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Back to Dashboard</span>
            </button>
          )}

          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Support & Knowledge Center</h2>
            <p className="text-xs text-slate-400 mt-0.5">24/7 UK trade support, AI assistant chat, and Gas Safe / NICEIC knowledge base.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+442079460912"
            className="px-4 py-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all hover:scale-105"
          >
            <Phone className="w-4 h-4 stroke-[2.5]" /> Call UK Hotline (+44 20 7946 0912)
          </a>
        </div>
      </div>

      {/* 24/7 AI SUPPORT CHAT & TICKET SYSTEM */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Chat Drawer */}
        <div className="md:col-span-2 p-6 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-4 shadow-xl flex flex-col justify-between h-[480px]">
          <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400 animate-pulse" />
              <h3 className="font-black text-base text-white">24/7 AI Dispatch & Technical Assistant</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
              Online
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {chatLogs.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs ${
                    msg.sender === 'You'
                      ? 'bg-sky-500 text-slate-950 font-bold rounded-tr-none'
                      : 'bg-[#0b0e14] border border-[#1e293b] text-slate-200 rounded-tl-none'
                  }`}
                >
                  <div className="text-[10px] font-extrabold text-slate-400 mb-1">{msg.sender} &bull; {msg.time}</div>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="flex gap-2 pt-3 border-t border-[#1e293b]">
            <input
              type="text"
              placeholder="Ask AI support about bookings, invoices, or engineer dispatch..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white text-xs font-medium outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </form>
        </div>

        {/* Quick Contact Cards */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-3 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">Emergency Trade Hotline</h4>
                <p className="text-xs text-slate-400">+44 20 7946 0912 (24/7)</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">Direct phone line for priority gas leaks, electrical outages & urgent dispatch emergency call-outs.</p>
          </div>

          <div className="p-5 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-3 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">Email Technical Support</h4>
                <p className="text-xs text-slate-400">support@tradepro360.co.uk</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">Response time under 15 minutes for HMRC VAT compliance & Stripe billing inquiries.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
