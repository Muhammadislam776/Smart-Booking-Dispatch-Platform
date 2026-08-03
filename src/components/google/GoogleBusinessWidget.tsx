'use client';

import React, { useState } from 'react';
import { Business } from '@/types';
import {
  Search,
  MapPin,
  Star,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Phone,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Shield,
  ThumbsUp,
  Award,
  Navigation,
  Globe,
  Share2,
} from 'lucide-react';

interface GoogleBusinessWidgetProps {
  business: Business;
  onStartBooking: (postcode: string) => void;
  isDark?: boolean;
}

export default function GoogleBusinessWidget({ business, onStartBooking, isDark = false }: GoogleBusinessWidgetProps) {
  const [postcode, setPostcode] = useState('W8 4PT');
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'photos'>('overview');

  const presetPostcodes = [
    { code: 'W8 4PT', area: 'Kensington & Chelsea, London' },
    { code: 'M1 1AE', area: 'Piccadilly, Manchester' },
    { code: 'B1 1BB', area: 'City Centre, Birmingham' },
    { code: 'LS1 5HD', area: 'Central Leeds' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartBooking(postcode);
  };

  const cardBgClass = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-xl'
    : 'bg-white border-slate-200/90 text-slate-900 shadow-md';

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
      {/* Search Header simulating Google Search */}
      <div className={`p-4 md:p-6 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${cardBgClass}`}>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-black flex items-center justify-center text-xl shadow-lg shadow-blue-500/20">
            G
          </div>
          <div>
            <span className="text-[10px] text-sky-400 font-extrabold uppercase tracking-wider">
              Google Business Profile Sync
            </span>
            <h2 className="text-base font-black">Google Business Profile Widget</h2>
          </div>
        </div>

        <div className={`w-full md:w-96 border rounded-full px-4 py-2.5 text-xs flex items-center gap-2 shadow-inner ${
          isDark ? 'bg-slate-800/80 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-700'
        }`}>
          <Search className="w-4 h-4 text-slate-400" />
          <span className="font-semibold truncate">
            "Emergency Boiler Repair Near Me London" &bull; {business.name}
          </span>
        </div>
      </div>

      {/* Main GMB Listing Card */}
      <div className={`rounded-3xl border overflow-hidden transition-all ${cardBgClass}`}>
        {/* Cover Banner */}
        <div className="h-44 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 relative p-6 flex items-end justify-between">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 flex items-center gap-4">
            <img
              src={business.logo}
              alt={business.name}
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-2xl bg-white"
            />
            <div className="text-white">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight">{business.name}</h1>
                <CheckCircle2 className="w-6 h-6 text-sky-400 fill-sky-400 text-slate-900" />
              </div>
              <p className="text-xs text-sky-200 mt-1 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> {business.address}, {business.city} ({business.postcode})
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 relative z-10">
            <button className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md text-xs font-bold border border-white/20 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5" /> Share Listing
            </button>
          </div>
        </div>

        {/* Action Bar & GMB Tabs */}
        <div className="p-6 md:p-8 space-y-6">
          <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <div className="flex items-center gap-3">
              <div className="flex text-amber-400 text-lg">
                {'★'.repeat(5)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black">{business.rating}</span>
                  <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    ({business.reviewCount} Google Customer Reviews)
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-500">Top Rated UK Field Service 2026</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {['overview', 'reviews', 'photos'].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    activeTab === t
                      ? 'bg-blue-600 text-white shadow-md'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* GMB Call-To-Action Booking Box */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-9xl pointer-events-none">
              GMB
            </div>

            <div className="relative z-10 grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-2">
                <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-md">
                  <Sparkles className="w-3 h-3" /> Book a Free Quote Widget
                </span>
                <h3 className="text-2xl font-black">Need an Engineer Dispatched Today?</h3>
                <p className="text-xs text-sky-100 leading-relaxed">
                  Click below to open our smart booking system, pre-fill your UK location, and calculate an instant AI quotation with zero obligation.
                </p>

                {/* Preset Postcode Chips */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-sky-200 font-bold">Quick Select UK Postcode:</span>
                  {presetPostcodes.map((p) => (
                    <button
                      key={p.code}
                      onClick={() => setPostcode(p.code)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        postcode === p.code
                          ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {p.code} ({p.area.split(',')[0]})
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-3">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-sky-100 mb-1">Your Postcode</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        placeholder="Enter Postcode (e.g. W8 4PT)"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105"
                  >
                    <span>Book Free Quote Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* GMB Trust Badges & Trade Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className={`p-4 rounded-2xl border flex items-start gap-3 ${isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'}`}>
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs">Gas Safe & Part P</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">100% Certified UK Engineers</p>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border flex items-start gap-3 ${isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'}`}>
              <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs">20-30 Min Average ETA</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Live GPS Satellite Tracking</p>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border flex items-start gap-3 ${isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'}`}>
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs">12-Month Guarantee</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Full UK Trade Warranty</p>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border flex items-start gap-3 ${isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'}`}>
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                <ThumbsUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs">Fixed Price Promise</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">No Hidden Fees or Surprises</p>
              </div>
            </div>
          </div>

          {/* GMB Verified Reviews Section */}
          {activeTab === 'reviews' && (
            <div className={`space-y-4 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <h3 className="font-extrabold text-sm uppercase tracking-wider">
                Google Business Reviews
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">Eleanor Vance</span>
                    <span className="text-amber-400 text-xs">★★★★★</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    "Boiler error EA fixed within 45 mins of booking on Google! Engineer David arrived promptly with replacement Worcester Bosch parts. Outstanding service."
                  </p>
                  <span className="text-[10px] text-slate-400 font-semibold block">Posted 2 days ago &bull; Verified Google Review</span>
                </div>

                <div className={`p-4 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">Robert Sterling</span>
                    <span className="text-amber-400 text-xs">★★★★★</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    "Emergency lock out at 10 PM. Sarah arrived in 20 minutes and fitted an Ultion anti-snap cylinder lock. Highly recommended!"
                  </p>
                  <span className="text-[10px] text-slate-400 font-semibold block">Posted 1 week ago &bull; Verified Google Review</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
