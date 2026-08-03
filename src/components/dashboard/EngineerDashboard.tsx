'use client';

import React, { useState } from 'react';
import { Engineer, Booking, JobStatus } from '@/types';
import LiveTrackingMap from '@/components/maps/LiveTrackingMap';
import {
  Wrench,
  Navigation,
  CheckCircle2,
  Camera,
  Plus,
  PenTool,
  Phone,
  MapPin,
  Clock,
  AlertTriangle,
  Play,
  Check,
  PackageCheck,
  FileText,
  ShieldCheck,
  Award,
  Zap,
  DollarSign,
  Upload,
  X,
  PlusCircle,
  ExternalLink,
} from 'lucide-react';

interface EngineerDashboardProps {
  engineer: Engineer;
  bookings: Booking[];
  onUpdateJobStatus: (bookingId: string, status: JobStatus, extraData?: any) => void;
  isDark?: boolean;
}

export default function EngineerDashboard({
  engineer,
  bookings,
  onUpdateJobStatus,
  isDark = true,
}: EngineerDashboardProps) {
  const assignedJobs = bookings.filter((b) => b.assignedEngineerId === engineer.id || b.assignedEngineerName === engineer.name) || bookings;
  const activeJob = assignedJobs.find((b) => b.status !== 'completed' && b.status !== 'cancelled') || bookings[0];

  const [materialName, setMaterialName] = useState('');
  const [materialCost, setMaterialCost] = useState('');
  const [materialsList, setMaterialsList] = useState<{ name: string; cost: number }[]>(
    activeJob?.materialsUsed || [
      { name: 'Worcester Pressure Release Sensor Valve', cost: 35.0 },
      { name: 'Screwfix 15mm Copper Compression Elbows (Pack of 5)', cost: 12.5 },
    ]
  );

  const [engineerNotes, setEngineerNotes] = useState(
    'Replaced faulty pressure release valve, repressurised central heating loop to 1.5 bar. System fully operational.'
  );
  const [signatureCaptured, setSignatureCaptured] = useState(false);
  const [photosUploaded, setPhotosUploaded] = useState<string[]>([
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=300',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300',
  ]);
  const [showNavigationModal, setShowNavigationModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleAddMaterial = () => {
    if (materialName && materialCost) {
      setMaterialsList([...materialsList, { name: materialName, cost: parseFloat(materialCost) }]);
      setMaterialName('');
      setMaterialCost('');
      showToast(`Added part: ${materialName} (£${materialCost})`);
    }
  };

  const handleQuickAddPart = (name: string, cost: number) => {
    setMaterialsList([...materialsList, { name, cost }]);
    showToast(`Quick added ${name} (£${cost.toFixed(2)})`);
  };

  const handleStatusChange = (newStatus: JobStatus) => {
    if (activeJob) {
      onUpdateJobStatus(activeJob.id, newStatus, {
        materialsUsed: materialsList,
        engineerNotes,
        signatureUrl: signatureCaptured ? 'https://example.com/signature-captured.png' : undefined,
      });
      showToast(`Job #${activeJob.bookingRef} status updated to ${newStatus.replace('_', ' ')}!`);
    }
  };

  const totalMaterialsCost = materialsList.reduce((acc, m) => acc + m.cost, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2.5 shadow-2xl backdrop-blur-md animate-in fade-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* COMPACT ENGINEER PROFILE HEADER */}
      <div className="p-5 rounded-3xl bg-[#121824] border border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-4">
          <img
            src={engineer.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120'}
            alt={engineer.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-400/80 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white tracking-tight">{engineer.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-black border border-emerald-500/30 flex items-center gap-1">
                ★ {engineer.rating || 4.98}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Vehicle: <span className="font-mono text-sky-400 font-bold">{engineer.vehicleRegistration || 'BD68 WXY'}</span> &bull; Gas Safe Certified #592810
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="px-3.5 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md">
            <Navigation className="w-3.5 h-3.5 animate-pulse" /> Live GPS Sharing Active
          </button>
        </div>
      </div>

      {/* COMPACT FIELD METRICS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">COMPLETED JOBS TODAY</span>
          <div className="text-2xl font-black text-emerald-400">4 Jobs</div>
          <span className="text-[11px] text-slate-400 font-medium block">£340.00 Earned</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">FIRST-TIME FIX RATE</span>
          <div className="text-2xl font-black text-sky-400">99.2%</div>
          <span className="text-[11px] text-sky-400 font-medium block">HMRC & Gas Safe Logged</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">PARTS RECORDED</span>
          <div className="text-2xl font-black text-purple-400">£{totalMaterialsCost.toFixed(2)}</div>
          <span className="text-[11px] text-slate-400 font-medium block">{materialsList.length} Items Used</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">CUSTOMER SIGNATURE</span>
          <div className={`text-xl font-black ${signatureCaptured ? 'text-emerald-400' : 'text-amber-400'}`}>
            {signatureCaptured ? 'SIGNED' : 'PENDING'}
          </div>
          <span className="text-[11px] text-slate-400 font-medium block">Digital Worksheet</span>
        </div>
      </div>

      {/* ACTIVE FIELD WORKSTATION CARD */}
      {activeJob && (
        <div className="p-6 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-6 shadow-2xl">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e293b] pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-sky-400">ASSIGNED JOB #{activeJob.bookingRef}</span>
              <h2 className="text-xl font-black text-white mt-0.5">{activeJob.serviceTitle}</h2>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap ${
              activeJob.status === 'completed'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
            }`}>
              STATUS: {activeJob.status.replace('_', ' ')}
            </span>
          </div>

          {/* Customer Property Contact & GPS Navigation Box */}
          <div className="p-4.5 rounded-2xl bg-[#0b0e14] border border-[#1e293b] grid md:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">CUSTOMER PROPERTY</span>
              <h3 className="font-black text-base text-white mt-0.5">{activeJob.customerName}</h3>
              <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" /> {activeJob.address}, {activeJob.postcode}
              </p>
            </div>

            <div className="flex flex-col justify-center sm:items-end gap-2">
              <a
                href={`tel:${activeJob.customerPhone}`}
                className="px-4 py-2 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-md transition-all whitespace-nowrap"
              >
                <Phone className="w-4 h-4" /> Call Customer ({activeJob.customerPhone})
              </a>

              <button
                onClick={() => setShowNavigationModal(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs flex items-center gap-2 shadow-md transition-all whitespace-nowrap"
              >
                <Navigation className="w-4 h-4" /> Launch Live GPS Navigation
              </button>
            </div>
          </div>

          {/* JOB STATUS LIFECYCLE PROGRESS BUTTONS */}
          <div className="space-y-2">
            <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider">
              UPDATE JOB STATUS PROGRESS
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => handleStatusChange('en_route')}
                className={`py-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all ${
                  activeJob.status === 'en_route'
                    ? 'bg-[#0ea5e9] text-slate-950 ring-2 ring-sky-400 shadow-lg'
                    : 'bg-[#0b0e14] text-slate-400 hover:text-white border border-[#1e293b]'
                }`}
              >
                <Navigation className="w-4 h-4" /> En Route
              </button>

              <button
                onClick={() => handleStatusChange('arrived')}
                className={`py-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all ${
                  activeJob.status === 'arrived'
                    ? 'bg-purple-600 text-white ring-2 ring-purple-400 shadow-lg'
                    : 'bg-[#0b0e14] text-slate-400 hover:text-white border border-[#1e293b]'
                }`}
              >
                <MapPin className="w-4 h-4" /> Arrived Site
              </button>

              <button
                onClick={() => handleStatusChange('in_progress')}
                className={`py-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all ${
                  activeJob.status === 'in_progress'
                    ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 shadow-lg'
                    : 'bg-[#0b0e14] text-slate-400 hover:text-white border border-[#1e293b]'
                }`}
              >
                <Wrench className="w-4 h-4" /> In Progress
              </button>

              <button
                onClick={() => handleStatusChange('completed')}
                className={`py-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all ${
                  activeJob.status === 'completed'
                    ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400 shadow-lg'
                    : 'bg-[#0b0e14] text-slate-400 hover:text-white border border-[#1e293b]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" /> Complete Job
              </button>
            </div>
          </div>

          {/* SCREWFIX / TOOLSTATION PARTS CATALOG & MATERIALS RECORDER */}
          <div className="space-y-3 pt-4 border-t border-[#1e293b]">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-sky-400" /> Record Materials & Parts Used
              </h3>
              <span className="text-xs font-mono font-bold text-sky-400">Total: £{totalMaterialsCost.toFixed(2)}</span>
            </div>

            {/* Quick Catalog Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 shrink-0">Quick Add:</span>
              <button
                onClick={() => handleQuickAddPart('Vaillant Pressure Sensor', 35.0)}
                className="px-2.5 py-1 rounded-lg bg-[#0b0e14] border border-[#1e293b] text-slate-300 hover:text-white whitespace-nowrap"
              >
                + Pressure Sensor (£35)
              </button>
              <button
                onClick={() => handleQuickAddPart('15mm Copper Pipe 2m', 18.5)}
                className="px-2.5 py-1 rounded-lg bg-[#0b0e14] border border-[#1e293b] text-slate-300 hover:text-white whitespace-nowrap"
              >
                + Copper Pipe 2m (£18.50)
              </button>
              <button
                onClick={() => handleQuickAddPart('100A Main Switch Fuse', 28.0)}
                className="px-2.5 py-1 rounded-lg bg-[#0b0e14] border border-[#1e293b] text-slate-300 hover:text-white whitespace-nowrap"
              >
                + 100A Switch Fuse (£28)
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Material description (e.g. Screwfix 22mm Compression Elbow)"
                value={materialName}
                onChange={(e) => setMaterialName(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white text-xs font-semibold outline-none focus:border-sky-500"
              />
              <input
                type="number"
                placeholder="Cost (£)"
                value={materialCost}
                onChange={(e) => setMaterialCost(e.target.value)}
                className="w-28 px-3 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white text-xs font-semibold outline-none focus:border-sky-500"
              />
              <button
                onClick={handleAddMaterial}
                className="px-4 py-2.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1 shadow-md"
              >
                <Plus className="w-4 h-4" /> Add Part
              </button>
            </div>

            {materialsList.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-[#0b0e14] border border-[#1e293b] space-y-1.5 text-xs">
                {materialsList.map((m, idx) => (
                  <div key={idx} className="flex justify-between font-bold text-slate-200">
                    <span>{m.name}</span>
                    <span className="font-mono text-sky-400">£{m.cost.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SITE PHOTOS & DIGITAL SIGNATURE */}
          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-[#1e293b]">
            {/* Photo Upload Gallery */}
            <div className="space-y-2">
              <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider">
                SITE PHOTOS (BEFORE & AFTER)
              </label>
              <div className="flex gap-2">
                {photosUploaded.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Site Photo"
                    className="w-20 h-20 rounded-xl object-cover border border-[#1e293b] shadow-md"
                  />
                ))}
                <button
                  onClick={() => {
                    setPhotosUploaded([
                      ...photosUploaded,
                      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=300',
                    ]);
                    showToast('Captured and uploaded new site photo!');
                  }}
                  className="w-20 h-20 rounded-xl bg-[#0b0e14] border border-dashed border-[#1e293b] hover:border-sky-500 flex flex-col items-center justify-center text-slate-400 hover:text-white transition-all text-[10px] font-bold gap-1"
                >
                  <Camera className="w-4 h-4 text-sky-400" /> Upload
                </button>
              </div>
            </div>

            {/* Digital Signature Sign-Off Pad */}
            <div className="space-y-2">
              <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider">
                DIGITAL CUSTOMER SIGN-OFF
              </label>
              <div
                onClick={() => {
                  setSignatureCaptured(!signatureCaptured);
                  showToast(!signatureCaptured ? 'Customer digital signature captured!' : 'Signature reset.');
                }}
                className={`h-20 rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all ${
                  signatureCaptured
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-[#1e293b] bg-[#0b0e14] text-slate-400 hover:border-sky-500'
                }`}
              >
                {signatureCaptured ? (
                  <div className="flex items-center gap-2 font-black text-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Customer Signature Verified & Saved!
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <PenTool className="w-4 h-4 text-sky-400" /> Click to Capture Digital Customer Signature
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WORKING LIVE GPS NAVIGATION MODAL DRAWER */}
      {showNavigationModal && activeJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-emerald-400 animate-pulse" />
                <h3 className="font-black text-base text-white">Google Maps Live GPS Navigation - Job #{activeJob.bookingRef}</h3>
              </div>
              <button onClick={() => setShowNavigationModal(null as any)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden border border-[#1e293b] relative">
              <LiveTrackingMap
                booking={{
                  id: activeJob.id,
                  bookingRef: activeJob.bookingRef,
                  customerName: activeJob.customerName,
                  customerPhone: activeJob.customerPhone,
                  postcode: activeJob.postcode,
                  assignedEngineerId: engineer.id,
                  assignedEngineerName: engineer.name,
                  assignedEngineerVehicle: engineer.vehicleRegistration,
                  assignedEngineerPhone: engineer.phone,
                  etaMins: 12,
                  lat: 51.5074,
                  lng: -0.1278,
                } as any}
                engineers={[engineer]}
                height="h-64"
              />
            </div>

            <div className="flex justify-between items-center text-xs pt-2">
              <div className="space-y-0.5">
                <div className="font-black text-white">{activeJob.customerName} ({activeJob.address})</div>
                <div className="text-emerald-400 font-mono font-bold">2.4 Miles Away &bull; 12 Mins Remaining</div>
              </div>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeJob.address)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl flex items-center gap-1.5 shadow-md"
              >
                Open Google Maps App <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
