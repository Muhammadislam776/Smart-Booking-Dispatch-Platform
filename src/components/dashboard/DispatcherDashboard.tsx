'use client';

import React, { useState } from 'react';
import { Business, Booking, Engineer, ServiceItem } from '@/types';
import LiveTrackingMap from '@/components/maps/LiveTrackingMap';
import {
  Radio,
  Zap,
  MapPin,
  Clock,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Sparkles,
  Layers,
  Search,
} from 'lucide-react';

interface DispatcherDashboardProps {
  business: Business;
  bookings: Booking[];
  engineers: Engineer[];
  services: ServiceItem[];
  onAssignEngineer: (bookingId: string, engineerId: string) => void;
  isDark?: boolean;
}

export default function DispatcherDashboard({
  business,
  bookings,
  engineers,
  services,
  onAssignEngineer,
  isDark = true,
}: DispatcherDashboardProps) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-2xl animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* TOP AI DISPATCH CONTAINER MATCHING SCREENSHOT 3 */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* LEFT PANEL (5 cols): AI DISPATCH QUEUE */}
        <div className="lg:col-span-5 space-y-4">
          {/* Header matching Screenshot 3 */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#121824] border border-[#1e293b]">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-sky-400 animate-pulse" />
              <h2 className="text-lg font-black text-white">AI Dispatch Queue</h2>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-black">
              8 PENDING
            </span>
          </div>

          {/* Emergency Repair Job Card matching Screenshot 3 */}
          <div className="p-5 rounded-2xl bg-[#121824] border border-sky-500/50 space-y-3 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-sky-400 uppercase tracking-wider">EMERGENCY REPAIR</span>
              <span className="text-[11px] text-slate-400 font-bold">2m ago</span>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-white">Burst Pipe - Canary Wharf</h3>
              <p className="text-xs text-slate-300 mt-1">
                Unit 4, One Canada Square. High priority flood risk.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120" alt="Eng" className="w-7 h-7 rounded-full border-2 border-[#121824] object-cover" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120" alt="Eng" className="w-7 h-7 rounded-full border-2 border-[#121824] object-cover" />
                <span className="w-7 h-7 rounded-full bg-slate-800 text-[10px] text-slate-300 font-bold flex items-center justify-center border-2 border-[#121824]">+2</span>
              </div>

              <button
                onClick={() => {
                  onAssignEngineer(bookings[0]?.id || 'b1', engineers[0]?.id || 'e1');
                  showToast('AI Auto-Dispatched Alex Sterling to Canary Wharf!');
                }}
                className="px-4 py-2 rounded-xl bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black text-xs shadow-md transition-all"
              >
                Assign Now
              </button>
            </div>
          </div>

          {/* Scheduled Maintenance Card matching Screenshot 3 */}
          <div className="p-5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider">SCHEDULED MAINTENANCE</span>
              <span className="text-[11px] text-slate-400 font-bold">15m ago</span>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-white">Boiler Service - Greenwich</h3>
              <p className="text-xs text-slate-400 mt-1">
                Annual certification for residential complex B.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-slate-400 pt-1">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-sky-400" /> 14:00 Today</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-rose-400" /> SE10</span>
            </div>
          </div>

          {/* Load Prediction Micro Chart Card matching Screenshot 3 */}
          <div className="p-5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-3 shadow-md">
            <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">LOAD PREDICTION</span>

            <div className="flex items-end gap-2 h-12 pt-1">
              {[40, 55, 70, 100, 60, 45, 30].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`flex-1 rounded-sm ${i === 3 ? 'bg-sky-400 shadow-[0_0_12px_#38bdf8]' : 'bg-slate-800'}`}
                />
              ))}
            </div>

            <div className="pt-2 border-t border-[#1e293b]">
              <h4 className="font-bold text-xs text-white">HVAC Diagnostic - Soho</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Report of unusual noise in central ventilation unit.</p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (7 cols): LIVE DISPATCH MAP */}
        <div className="lg:col-span-7 rounded-3xl bg-[#121824] border border-[#1e293b] overflow-hidden shadow-2xl relative min-h-[460px]">
          <LiveTrackingMap
            booking={bookings[0]}
            engineers={engineers}
            height="h-[460px]"
          />

          {/* Active / Idle Pills matching Screenshot 3 */}
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <span className="px-3 py-1.5 rounded-full bg-[#0b0e14]/90 text-sky-400 border border-sky-500/30 text-xs font-black">
              ● 42 ACTIVE
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#0b0e14]/90 text-slate-400 border border-slate-700 text-xs font-black">
              ● 12 IDLE
            </span>
          </div>
        </div>
      </div>

      {/* RESOURCE WORKLOAD SCHEDULE GANTT TIMELINE MATCHING SCREENSHOT 3 */}
      <div className="p-6 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e293b] pb-4">
          <div className="flex items-center gap-6">
            <h3 className="text-base font-black text-white">Resource Workload</h3>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-sky-400"><span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> In Progress</span>
              <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-slate-600" /> Travel</span>
              <span className="flex items-center gap-1.5 text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-slate-800" /> Breaks</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <button className="p-1 rounded bg-[#0b0e14] border border-[#1e293b]"><ChevronLeft className="w-4 h-4" /></button>
            <span>Today, Oct 24</span>
            <button className="p-1 rounded bg-[#0b0e14] border border-[#1e293b]"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Timeline Table Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px] space-y-3 text-xs font-bold">
            {/* Hours Header */}
            <div className="grid grid-cols-12 gap-2 pl-36 text-slate-400 font-mono text-[11px] pb-2 border-b border-[#1e293b]">
              <span>08:00</span>
              <span>09:00</span>
              <span>10:00</span>
              <span>11:00</span>
              <span>12:00</span>
              <span>13:00</span>
              <span>14:00</span>
              <span>15:00</span>
            </div>

            {/* Engineer 1: Dave Roberts */}
            <div className="flex items-center gap-4">
              <div className="w-32 flex items-center gap-2 shrink-0">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120" alt="Dave" className="w-7 h-7 rounded-full object-cover" />
                <span className="text-white truncate">Dave Roberts</span>
              </div>
              <div className="flex-1 grid grid-cols-12 gap-2 bg-[#0b0e14] p-1.5 rounded-xl border border-[#1e293b]">
                <div className="col-span-3 bg-slate-700/60 text-slate-300 p-2 rounded-lg text-[10px] truncate">Travel (E14)</div>
                <div className="col-span-5 bg-sky-500 text-slate-950 font-black p-2 rounded-lg text-[10px] truncate shadow-md">JOB #4829 - Repair</div>
              </div>
            </div>

            {/* Engineer 2: Sarah Jenkins */}
            <div className="flex items-center gap-4">
              <div className="w-32 flex items-center gap-2 shrink-0">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120" alt="Sarah" className="w-7 h-7 rounded-full object-cover" />
                <span className="text-white truncate">Sarah Jenkins</span>
              </div>
              <div className="flex-1 grid grid-cols-12 gap-2 bg-[#0b0e14] p-1.5 rounded-xl border border-[#1e293b]">
                <div className="col-start-3 col-span-5 bg-sky-500 text-slate-950 font-black p-2 rounded-lg text-[10px] truncate shadow-md">JOB #4831 - Install</div>
                <div className="col-span-2 bg-slate-900 text-slate-500 p-2 rounded-lg text-[10px] text-center border border-slate-800">Break</div>
              </div>
            </div>

            {/* Engineer 3: Mike Chen */}
            <div className="flex items-center gap-4">
              <div className="w-32 flex items-center gap-2 shrink-0">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120" alt="Mike" className="w-7 h-7 rounded-full object-cover" />
                <span className="text-white truncate">Mike Chen</span>
              </div>
              <div className="flex-1 grid grid-cols-12 gap-2 bg-[#0b0e14] p-1.5 rounded-xl border border-[#1e293b]">
                <div className="col-span-4 bg-slate-800 text-slate-300 p-2 rounded-lg text-[10px] truncate">JOB #4820 (Done)</div>
                <div className="col-span-5 bg-sky-500 text-slate-950 font-black p-2 rounded-lg text-[10px] truncate shadow-md">JOB #4835 - URGENT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
