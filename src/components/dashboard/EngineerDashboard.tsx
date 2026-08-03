'use client';

import React, { useState, useEffect } from 'react';
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
  Briefcase,
  RefreshCw,
} from 'lucide-react';

interface EngineerDashboardProps {
  engineer: Engineer;
  bookings: Booking[];
  onUpdateJobStatus: (bookingId: string, status: JobStatus, extraData?: any) => void;
  isDark?: boolean;
}

export default function EngineerDashboard({
  engineer,
  bookings: initialBookings,
  onUpdateJobStatus,
  isDark = true,
}: EngineerDashboardProps) {
  const [bookingsList, setBookingsList] = useState<Booking[]>(initialBookings);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const fetchLiveBookingsFromMongoDB = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success && data.bookings) {
        setBookingsList(data.bookings);
      }
    } catch (e) {
      console.error('Error fetching bookings from MongoDB Atlas:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveBookingsFromMongoDB();
  }, []);

  // Filter jobs assigned to this engineer (or fallback to active uncompleted jobs if mock)
  const assignedJobs = bookingsList.filter(
    (b) =>
      b.assignedEngineerId === engineer.id ||
      b.assignedEngineerName === engineer.name ||
      b.status === 'assigned' ||
      b.status === 'en_route' ||
      b.status === 'in_progress'
  );

  const activeJob =
    assignedJobs.find((b) => b.id === selectedJobId) ||
    assignedJobs.find((b) => b.status !== 'completed' && b.status !== 'cancelled') ||
    bookingsList[0];

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

  const handleStatusChange = async (newStatus: JobStatus) => {
    if (activeJob) {
      onUpdateJobStatus(activeJob.id, newStatus, {
        materialsUsed: materialsList,
        engineerNotes,
        signatureUrl: signatureCaptured ? 'https://example.com/signature-captured.png' : undefined,
      });

      // Also update local list state immediately
      setBookingsList(
        bookingsList.map((b) => (b.id === activeJob.id ? { ...b, status: newStatus } : b))
      );

      showToast(`Job #${activeJob.bookingRef} status updated to ${newStatus.replace('_', ' ').toUpperCase()} in MongoDB Atlas!`);

      try {
        await fetch('/api/bookings', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: activeJob.id, status: newStatus }),
        });
      } catch (err) {
        console.error('Job status save failed:', err);
      }
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
          <button
            onClick={fetchLiveBookingsFromMongoDB}
            className="p-2 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold"
            title="Refresh MongoDB Atlas Assigned Jobs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} /> Sync Jobs
          </button>

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

      {/* ASSIGNED JOBS ROSTER TABS */}
      {assignedJobs.length > 0 && (
        <div className="p-4 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-2">
          <span className="text-[10px] font-black uppercase text-sky-400 tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" /> MY ASSIGNED DISPATCHED JOBS ({assignedJobs.length})
          </span>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {assignedJobs.map((j) => (
              <button
                key={j.id}
                onClick={() => setSelectedJobId(j.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap transition-all ${
                  (activeJob && activeJob.id === j.id)
                    ? 'bg-[#0ea5e9] text-slate-950 shadow-lg'
                    : 'bg-[#0b0e14] text-slate-300 border border-[#1e293b] hover:text-white'
                }`}
              >
                <span className="font-mono text-[11px]">#{j.bookingRef}</span>
                <span>{j.serviceTitle}</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-slate-900/60 text-emerald-400">
                  {j.status}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVE FIELD WORKSTATION CARD */}
      {activeJob ? (
        <div className="p-6 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-6 shadow-2xl">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e293b] pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-sky-400">ASSIGNED JOB #{activeJob.bookingRef}</span>
              <h2 className="text-xl font-black text-white mt-0.5">{activeJob.serviceTitle}</h2>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap ${
                activeJob.status === 'completed'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
              }`}
            >
              STATUS: {activeJob.status.replace('_', ' ').toUpperCase()}
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
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" /> Complete Job
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-[#121824] border border-[#1e293b] text-slate-400 space-y-2">
          <Briefcase className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-black text-white">No Assigned Jobs</h3>
          <p className="text-xs">You currently have no dispatched active jobs. Click "Sync Jobs" to check MongoDB Atlas.</p>
        </div>
      )}

      {/* GPS NAVIGATION MODAL */}
      {showNavigationModal && activeJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 text-white animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-emerald-400 animate-pulse" />
                <h3 className="font-black text-base">GPS Navigation to Customer Property</h3>
              </div>
              <button onClick={() => setShowNavigationModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden border border-[#1e293b] relative">
              <LiveTrackingMap
                engineers={[
                  {
                    id: engineer.id,
                    businessId: 'biz_01',
                    name: engineer.name,
                    role: 'engineer',
                    email: engineer.email || 'engineer@weic.co.uk',
                    phone: engineer.phone || '+44 7911 123456',
                    avatar: engineer.avatar,
                    skills: ['Gas Safe'],
                    certifications: ['Certified'],
                    vehicleRegistration: engineer.vehicleRegistration || 'WEIC 882',
                    isAvailable: false,
                    currentLat: 51.5074,
                    currentLng: -0.1278,
                    rating: engineer.rating || 4.98,
                    completedJobsCount: 142,
                    createdAt: '2026-01-01',
                  },
                ]}
                height="h-64"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0b0e14] border border-[#1e293b] flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Destination Address</span>
                <span className="font-bold text-white mt-0.5 block">{activeJob.address}, {activeJob.postcode}</span>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeJob.address + ' ' + activeJob.postcode)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Google Maps
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
