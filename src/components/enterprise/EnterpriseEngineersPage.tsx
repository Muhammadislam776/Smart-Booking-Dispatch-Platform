'use client';

import React, { useState } from 'react';
import { Engineer } from '@/types';
import LiveTrackingMap from '@/components/maps/LiveTrackingMap';
import {
  Wrench,
  Search,
  Plus,
  Star,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Phone,
  Mail,
  Award,
  X,
  User,
  Truck,
  Zap,
} from 'lucide-react';

interface EnterpriseEngineersPageProps {
  engineers: Engineer[];
  onTabChange: (tab: string) => void;
}

export default function EnterpriseEngineersPage({ engineers, onTabChange }: EnterpriseEngineersPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modals state
  const [showAddEngineerModal, setShowAddEngineerModal] = useState(false);
  const [selectedGpsEngineer, setSelectedGpsEngineer] = useState<any | null>(null);
  const [selectedAssignEngineer, setSelectedAssignEngineer] = useState<any | null>(null);

  // New Engineer Form State
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Gas & Boiler Engineer');
  const [newCert, setNewCert] = useState('Gas Safe Certified #928104');
  const [newVehicle, setNewVehicle] = useState('WEIC-409 (Ford Transit)');
  const [newPhone, setNewPhone] = useState('+44 7911 888999');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const [engineerRoster, setEngineerRoster] = useState([
    {
      id: 'eng_1',
      name: 'Alex Sterling',
      role: 'Senior Gas & Boiler Engineer',
      skills: ['Gas Safe Certified #592810', 'Vaillant Certified', 'Unvented Cylinders'],
      vehicle: 'Ford Transit - WEIC 882',
      location: 'London (W1U 68A)',
      postcode: 'W1U 68A',
      rating: 4.98,
      jobsCompleted: 142,
      status: 'En Route',
      phone: '+44 7911 123456',
      email: 'alex@weic.co.uk',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120',
      lat: 51.5074,
      lng: -0.1278,
    },
    {
      id: 'eng_2',
      name: 'David Gascoigne',
      role: 'Master Gas Safe Specialist',
      skills: ['Gas Safe Certified #449102', 'Worcester Bosch Accredited', 'Commercial Gas'],
      vehicle: 'Mercedes Vito - WEIC 901',
      location: 'London (E14 5AB)',
      postcode: 'E14 5AB',
      rating: 4.96,
      jobsCompleted: 198,
      status: 'Available',
      phone: '+44 7911 654321',
      email: 'david.g@weic.co.uk',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120',
      lat: 51.5174,
      lng: -0.1078,
    },
    {
      id: 'eng_3',
      name: 'Sarah Jenkins',
      role: '18th Edition Master Electrician',
      skills: ['NICEIC Approved Contractor', 'EV Charger Certified', 'Part P Registered'],
      vehicle: 'Vauxhall Vivaro - WEIC 304',
      location: 'Manchester (M1 1AE)',
      postcode: 'M1 1AE',
      rating: 4.99,
      jobsCompleted: 215,
      status: 'In Progress',
      phone: '+44 7911 987654',
      email: 'sarah.j@weic.co.uk',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120',
      lat: 53.4808,
      lng: -2.2426,
    },
    {
      id: 'eng_4',
      name: 'Mike Chen',
      role: 'HVAC & Refrigeration Lead',
      skills: ['F-Gas Certified', 'Daikin VRV Master', 'Heat Pump Specialist'],
      vehicle: 'VW Transporter - WEIC 512',
      location: 'Birmingham (B1 1BB)',
      postcode: 'B1 1BB',
      rating: 4.92,
      jobsCompleted: 110,
      status: 'Available',
      phone: '+44 7911 345678',
      email: 'mike.c@weic.co.uk',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120',
      lat: 52.4862,
      lng: -1.8904,
    },
  ]);

  const handleAddEngineerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newEng = {
      id: `eng_${Date.now()}`,
      name: newName,
      role: newRole,
      skills: [newCert, 'Certified UK Trade Technician'],
      vehicle: newVehicle,
      location: 'London (W1U 68A)',
      postcode: 'W1U 68A',
      rating: 5.0,
      jobsCompleted: 0,
      status: 'Available',
      phone: newPhone,
      email: `${newName.toLowerCase().replace(/\s+/g, '.')}@weic.co.uk`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120',
      lat: 51.5074,
      lng: -0.1278,
    };

    setEngineerRoster([newEng, ...engineerRoster]);
    setShowAddEngineerModal(false);
    setNewName('');
    showToast(`New certified technician ${newName} added to active roster!`);
  };

  const filteredEngineers = engineerRoster.filter(
    (eng) =>
      eng.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eng.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eng.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-2xl animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Field Engineer Roster & Certifications</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage verified UK trade technicians, certifications, and live availability.</p>
        </div>

        {/* Working + Add New Engineer Button */}
        <button
          onClick={() => setShowAddEngineerModal(true)}
          className="px-4 py-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Add New Engineer
        </button>
      </div>

      {/* COMPACT KPI METRICS ROW (Reduced Card Size) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">TOTAL CERTIFIED ENGINEERS</span>
          <div className="text-2xl font-black text-sky-400">{engineerRoster.length} Active</div>
          <span className="text-[11px] text-emerald-400 font-medium block">100% Verified Gas Safe/Part P</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">ONLINE & ACTIVE NOW</span>
          <div className="text-2xl font-black text-emerald-400">38 GPS Active</div>
          <span className="text-[11px] text-slate-400 font-medium block">Live Location Sync</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">AVG CUSTOMER RATING</span>
          <div className="text-2xl font-black text-amber-400">★ 4.96</div>
          <span className="text-[11px] text-amber-400 font-medium block">Based on 1,429 Reviews</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">COMPLETED JOBS YTD</span>
          <div className="text-2xl font-black text-purple-400">665 Jobs</div>
          <span className="text-[11px] text-slate-400 font-medium block">99.2% First-Time Fix</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search engineer name, role, or city location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#121824] border border-[#1e293b] text-slate-200 text-xs font-medium outline-none focus:border-sky-500"
        />
      </div>

      {/* Engineer Cards Grid (Compact & Fully Responsive) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredEngineers.map((eng) => (
          <div
            key={eng.id}
            className="p-5 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-4 shadow-xl hover:border-sky-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={eng.avatar}
                    alt={eng.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-sky-400/60 shadow-md shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-black text-white">{eng.name}</h3>
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                    <p className="text-xs text-sky-400 font-bold mt-0.5">{eng.role}</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-rose-400" /> {eng.location}
                    </p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 ${
                  eng.status === 'Available'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                }`}>
                  {eng.status}
                </span>
              </div>

              {/* Skills & Certifications Tags */}
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">CERTIFICATIONS & SKILLS</span>
                <div className="flex flex-wrap gap-1.5">
                  {eng.skills.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-[#0b0e14] border border-[#1e293b] text-slate-300 text-[11px] font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Vehicle & Metrics Footer */}
            <div className="space-y-3 pt-3 border-t border-[#1e293b]">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase block">VEHICLE & REG</span>
                  <span className="font-mono text-slate-200 font-bold">{eng.vehicle}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase block">RATING / JOBS</span>
                  <span className="font-bold text-amber-400">★ {eng.rating} ({eng.jobsCompleted} Jobs)</span>
                </div>
              </div>

              {/* Working Action Buttons (Track Live GPS & Assign Job) */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedGpsEngineer(eng)}
                  className="flex-1 py-2.5 bg-[#0b0e14] hover:bg-slate-800 text-sky-400 font-black rounded-xl text-xs border border-[#1e293b] flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" /> Track Live GPS
                </button>

                <button
                  onClick={() => setSelectedAssignEngineer(eng)}
                  className="flex-1 py-2.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <Zap className="w-3.5 h-3.5 stroke-[2.5]" /> Assign Job
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* WORKING MODAL 1: ADD NEW ENGINEER MODAL */}
      {showAddEngineerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base text-white">Add New Certified Technician</h3>
              </div>
              <button onClick={() => setShowAddEngineerModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEngineerSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Engineer Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. James Wright"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Role / Specialization</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-bold outline-none focus:border-sky-500"
                >
                  <option value="Gas & Boiler Engineer">Gas & Boiler Engineer</option>
                  <option value="18th Edition Electrician">18th Edition Electrician</option>
                  <option value="Master Locksmith">Master Locksmith</option>
                  <option value="HVAC Technician">HVAC Technician</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Gas Safe / NICEIC Certification No.</label>
                <input
                  type="text"
                  required
                  value={newCert}
                  onChange={(e) => setNewCert(e.target.value)}
                  placeholder="e.g. Gas Safe Certified #928104"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Vehicle Model & Registration</label>
                <input
                  type="text"
                  required
                  value={newVehicle}
                  onChange={(e) => setNewVehicle(e.target.value)}
                  placeholder="e.g. WEIC-409 (Ford Transit)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black shadow-lg transition-all"
              >
                Add Certified Technician to Roster
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WORKING MODAL 2: TRACK LIVE GPS MODAL DRAWER */}
      {selectedGpsEngineer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-sky-400 animate-pulse" />
                <h3 className="font-black text-base text-white">Live GPS Tracking - {selectedGpsEngineer.name}</h3>
              </div>
              <button onClick={() => setSelectedGpsEngineer(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden border border-[#1e293b] relative">
              <LiveTrackingMap
                engineers={[
                  {
                    id: selectedGpsEngineer.id,
                    businessId: 'biz_01',
                    name: selectedGpsEngineer.name,
                    role: 'engineer',
                    email: selectedGpsEngineer.email,
                    phone: selectedGpsEngineer.phone,
                    avatar: selectedGpsEngineer.avatar,
                    skills: selectedGpsEngineer.skills,
                    certifications: ['Certified'],
                    vehicleRegistration: selectedGpsEngineer.vehicle,
                    isAvailable: selectedGpsEngineer.status === 'Available',
                    currentLat: selectedGpsEngineer.lat,
                    currentLng: selectedGpsEngineer.lng,
                    rating: selectedGpsEngineer.rating,
                    completedJobsCount: selectedGpsEngineer.jobsCompleted,
                    createdAt: '2026-01-01',
                  },
                ]}
                height="h-64"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0b0e14] border border-[#1e293b]">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Status</span>
                <span className="font-bold text-emerald-400 mt-0.5 block">{selectedGpsEngineer.status}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0b0e14] border border-[#1e293b]">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Vehicle Reg</span>
                <span className="font-mono font-bold text-sky-400 mt-0.5 block">{selectedGpsEngineer.vehicle}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0b0e14] border border-[#1e293b]">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Phone Hotline</span>
                <span className="font-bold text-slate-200 mt-0.5 block">{selectedGpsEngineer.phone}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WORKING MODAL 3: ASSIGN JOB MODAL DRAWER */}
      {selectedAssignEngineer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h3 className="font-black text-base text-white">Assign Job to {selectedAssignEngineer.name}</h3>
              </div>
              <button onClick={() => setSelectedAssignEngineer(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">Select an active pending UK trade booking to dispatch to this engineer:</p>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {[
                { ref: 'TF-99281-UK', title: 'Boiler Performance Audit & Service', area: 'London W8 4PT', priority: 'Emergency' },
                { ref: 'TF-48291-UK', title: '18th Edition Fuse Box Replacement', area: 'London EC1A 1BB', priority: 'Standard' },
                { ref: 'TF-11029-UK', title: 'Ultion 3* Anti-Snap Lock Fitting', area: 'Manchester M1 1AE', priority: 'Emergency' },
              ].map((j, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#0b0e14] border border-[#1e293b] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <span className="font-mono text-sky-400">#{j.ref}</span>
                      <span>{j.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{j.area} &bull; {j.priority}</div>
                  </div>

                  <button
                    onClick={() => {
                      showToast(`Dispatched ${selectedAssignEngineer.name} to Job #${j.ref}!`);
                      setSelectedAssignEngineer(null);
                    }}
                    className="px-3 py-1.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-lg text-xs transition-all shadow-md shrink-0"
                  >
                    Dispatch Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
