'use client';

import React, { useState } from 'react';
import { X, Award, Cpu, Database, MapPin, ShieldCheck, DollarSign, Layers, CheckCircle2, Code2, Sparkles } from 'lucide-react';

interface FYPInspectorModalProps {
  onClose: () => void;
  isDark?: boolean;
}

export default function FYPInspectorModal({ onClose, isDark = false }: FYPInspectorModalProps) {
  const [activeSection, setActiveSection] = useState<'architecture' | 'ai_math' | 'database' | 'gmb_strategy'>('architecture');

  const cardBgClass = isDark
    ? 'bg-slate-900 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className={`w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 ${cardBgClass}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xl shadow-lg">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black">WEIC TradePro 360 – FYP Architecture Inspector</h2>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  Final Year Project
                </span>
              </div>
              <p className="text-xs text-slate-300">Technical Breakdown & Demonstration Specification</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className={`flex items-center gap-2 px-6 py-3 border-b text-xs font-bold ${isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-100 bg-slate-50'}`}>
          {[
            { id: 'architecture', label: '1. System Stack & Architecture', icon: <Layers className="w-4 h-4" /> },
            { id: 'ai_math', label: '2. AI Dispatch Algorithm & Formulas', icon: <Cpu className="w-4 h-4 text-amber-400" /> },
            { id: 'database', label: '3. PostgreSQL / Supabase ERD', icon: <Database className="w-4 h-4 text-sky-400" /> },
            { id: 'gmb_strategy', label: '4. GMB Selling Strategy', icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeSection === tab.id
                  ? 'bg-sky-600 text-white font-extrabold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6 text-xs">
          {activeSection === 'architecture' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-sky-400">Next.js 14+ Full-Stack SaaS Architecture</h3>
              <p className="text-slate-300 leading-relaxed">
                WEIC TradePro 360 is built as an enterprise-grade multi-tenant SaaS application designed for high availability, zero-config client state execution, and real-time synchronization.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-1">
                  <h4 className="font-extrabold text-white text-sm">Frontend Framework</h4>
                  <p className="text-slate-400">Next.js 14 App Router, React 19, TypeScript, Tailwind CSS, Lucide Icons</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-1">
                  <h4 className="font-extrabold text-white text-sm">Live GPS & Mapping</h4>
                  <p className="text-slate-400">Interactive Satellite Tracking with Leaflet, animated route polyline rendering</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-1">
                  <h4 className="font-extrabold text-white text-sm">Database & Storage</h4>
                  <p className="text-slate-400">PostgreSQL / Supabase client with normalized relational schema & Row Level Security (RLS)</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-1">
                  <h4 className="font-extrabold text-white text-sm">Invoicing & Payments</h4>
                  <p className="text-slate-400">Client/Server PDF Tax Invoice generation (`jsPDF`), Stripe Card Checkout & Pay Later</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'ai_math' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-amber-400">AI Dispatch Engine Scoring Algorithm</h3>
              <p className="text-slate-300 leading-relaxed">
                The smart dispatch engine evaluates field engineers using a multi-factor mathematical scoring model:
              </p>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 font-mono text-xs text-amber-300 space-y-2">
                <p>1. Haversine GPS Distance Calculation:</p>
                <p className="text-slate-300 pl-4">d = 2R · atan2( √a, √(1−a) ) where a = sin²(Δlat/2) + cos(lat1)·cos(lat2)·sin²(Δlon/2)</p>

                <p className="pt-2">2. Multi-Factor Score Weighting:</p>
                <p className="text-slate-300 pl-4">MatchScore = (SkillMatchCount / RequiredSkills)·50 + max(0, 40 − DistanceKm·4) + AvailabilityBonus(5) + RatingBonus(5)</p>
              </div>
            </div>
          )}

          {activeSection === 'database' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-sky-400">PostgreSQL / Supabase Schema (10 Normalized Tables)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                {['businesses', 'users', 'engineers', 'customers', 'services', 'bookings', 'invoices', 'chat_messages', 'reviews', 'live_locations'].map((tbl) => (
                  <div key={tbl} className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sky-300 flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-sky-400" /> {tbl}
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-[11px]">
                Complete PostgreSQL DDL migration script provided in <code className="text-amber-300">src/lib/supabase/schema.sql</code>.
              </p>
            </div>
          )}

          {activeSection === 'gmb_strategy' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-emerald-400">Google Business Profile ("Book a Free Quote") Selling Strategy</h3>
              <p className="text-slate-300 leading-relaxed">
                Small UK trade businesses often lose leads because potential customers leave Google Search without booking. By embedding a direct <strong>"Book a Free Quote"</strong> URL link on their Google Business Profile:
              </p>
              <ul className="list-disc pl-5 text-slate-300 space-y-1">
                <li>Pre-fills customer location via UK postcode URL parameter (e.g. <code className="text-emerald-400">?postcode=W8+4PT</code>).</li>
                <li>Calculates an instant AI price quote in under 30 seconds.</li>
                <li>Dispatches nearest certified engineer with real-time GPS tracking.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-between ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-slate-50'}`}>
          <span className="text-[11px] text-slate-400 font-medium">TradePro 360 &bull; Final Year Project Showcase</span>
          <button onClick={onClose} className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs">
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
