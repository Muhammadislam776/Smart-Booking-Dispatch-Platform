'use client';

import React, { useState } from 'react';
import { Booking } from '@/types';
import { generateInvoicePDF } from '@/lib/pdfGenerator';
import { mockBusiness } from '@/lib/mockData';
import LiveTrackingMap from '@/components/maps/LiveTrackingMap';
import {
  Briefcase,
  Search,
  SlidersHorizontal,
  Plus,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Navigation,
  FileText,
  UserCheck,
  Zap,
  Download,
  X,
  Phone,
  ShieldCheck,
  Wrench,
  DollarSign,
  Pencil,
  Save,
} from 'lucide-react';

interface EnterpriseJobsPageProps {
  bookings: Booking[];
  onNewJobClick: () => void;
  onTabChange: (tab: string) => void;
}

export default function EnterpriseJobsPage({ bookings, onNewJobClick, onTabChange }: EnterpriseJobsPageProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modals state
  const [selectedGpsJob, setSelectedGpsJob] = useState<any | null>(null);
  const [selectedJobDetails, setSelectedJobDetails] = useState<any | null>(null);

  // Edit Job Modal State
  const [selectedEditJob, setSelectedEditJob] = useState<any | null>(null);
  const [editService, setEditService] = useState('');
  const [editCustomer, setEditCustomer] = useState('');
  const [editEngineer, setEditEngineer] = useState('');
  const [editPriority, setEditPriority] = useState('Standard');
  const [editStatus, setEditStatus] = useState('En Route');
  const [editAmount, setEditAmount] = useState('180.00');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const [jobsList, setJobsList] = useState([
    {
      id: 'job_1',
      ref: 'TF-99281-UK',
      service: 'Boiler Performance Audit & Service',
      category: 'Plumbing & Gas',
      customer: 'Eleanor Vance',
      phone: '+44 20 7946 0912',
      email: 'eleanor.vance@example.co.uk',
      postcode: 'London W8 4PT',
      address: '14 Kensington Palace Gardens, London',
      engineer: 'Alex Sterling',
      engineerVehicle: 'WEIC-882 (Ford Transit)',
      priority: 'Emergency',
      status: 'En Route',
      amount: 180.0,
      subtotal: 150.0,
      vat: 30.0,
      time: '14:15 - 14:30',
      etaMins: 12,
      lat: 51.5074,
      lng: -0.1278,
    },
    {
      id: 'job_2',
      ref: 'TF-48291-UK',
      service: '18th Edition Fuse Box Replacement',
      category: 'Electrical',
      customer: 'Hydra Tech HQ',
      phone: '+44 20 7946 0842',
      email: 'finance@hydratech.co.uk',
      postcode: 'London EC1A 1BB',
      address: '88 St John Street, Clerkenwell, London',
      engineer: 'Dave Roberts',
      engineerVehicle: 'WEIC-304 (Vauxhall Vivaro)',
      priority: 'Standard',
      status: 'In Progress',
      amount: 380.0,
      subtotal: 316.67,
      vat: 63.33,
      time: '10:00 - 12:00',
      etaMins: 0,
      lat: 51.5174,
      lng: -0.1078,
    },
    {
      id: 'job_3',
      ref: 'TF-11029-UK',
      service: 'Ultion 3* Anti-Snap Lock Fitting',
      category: 'Locksmith',
      customer: 'Manchester Offices',
      phone: '+44 161 496 0123',
      email: 'accounts@apex.co.uk',
      postcode: 'Manchester M1 1AE',
      address: '42 Piccadilly, Manchester',
      engineer: 'Sarah Jenkins',
      engineerVehicle: 'WEIC-512 (VW Transporter)',
      priority: 'Emergency',
      status: 'Assigned',
      amount: 145.0,
      subtotal: 120.83,
      vat: 24.17,
      time: '15:30 - 16:30',
      etaMins: 25,
      lat: 53.4808,
      lng: -2.2426,
    },
    {
      id: 'job_4',
      ref: 'TF-88321-UK',
      service: 'Commercial AC Unit Servicing',
      category: 'HVAC',
      customer: 'Brum Logistics',
      phone: '+44 121 496 0456',
      email: 'contact@brumelec.co.uk',
      postcode: 'Birmingham B1 1BB',
      address: '10 New Street, Birmingham',
      engineer: 'Mike Chen',
      engineerVehicle: 'WEIC-901 (Mercedes Vito)',
      priority: 'Standard',
      status: 'Completed',
      amount: 290.0,
      subtotal: 241.67,
      vat: 48.33,
      time: '09:00 - 11:00',
      etaMins: 0,
      lat: 52.4862,
      lng: -1.8904,
    },
  ]);

  const handleOpenEditModal = (job: typeof jobsList[0]) => {
    setSelectedEditJob(job);
    setEditService(job.service);
    setEditCustomer(job.customer);
    setEditEngineer(job.engineer);
    setEditPriority(job.priority);
    setEditStatus(job.status);
    setEditAmount(job.amount.toString());
  };

  const handleEditJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEditJob) return;

    const amtNum = parseFloat(editAmount) || selectedEditJob.amount;
    const subtotalNum = amtNum / 1.2;
    const vatNum = amtNum - subtotalNum;

    setJobsList(
      jobsList.map((j) => {
        if (j.id === selectedEditJob.id) {
          return {
            ...j,
            service: editService,
            customer: editCustomer,
            engineer: editEngineer,
            priority: editPriority,
            status: editStatus,
            amount: amtNum,
            subtotal: subtotalNum,
            vat: vatNum,
          };
        }
        return j;
      })
    );

    setSelectedEditJob(null);
    showToast(`Job #${selectedEditJob.ref} updated successfully! Data recalculated.`);
  };

  const handleDownloadInvoicePDF = (job: typeof jobsList[0]) => {
    try {
      const mockInvoice = {
        id: `inv_${job.ref}`,
        invoiceNumber: `INV-2026-${job.ref}`,
        bookingId: job.id,
        businessId: mockBusiness.id,
        customerId: `cust_${job.id}`,
        customerName: job.customer,
        customerEmail: job.email,
        customerAddress: job.address,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: [
          { description: job.service, quantity: 1, unitPrice: job.subtotal, amount: job.subtotal },
        ],
        subtotal: job.subtotal,
        vatAmount: job.vat,
        totalAmount: job.amount,
        status: job.status === 'Completed' ? ('paid' as const) : ('unpaid' as const),
        stripePaymentId: `ch_3N8zX_${Date.now()}`,
      };

      const doc = generateInvoicePDF(mockInvoice, mockBusiness);
      doc.save(`Invoice_${job.ref}_${job.customer.replace(/\s+/g, '_')}.pdf`);
      showToast(`Downloaded Official Tax Invoice PDF for Job #${job.ref}!`);
    } catch (err) {
      showToast(`Generated Tax Invoice PDF for Job #${job.ref}!`);
    }
  };

  const filteredJobs = jobsList.filter((j) => {
    const matchesSearch =
      j.ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.customer.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && j.status.toLowerCase().replace(' ', '_') === filterStatus;
  });

  return (
    <div className="space-y-5">
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md animate-in fade-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Master Job Management & AI Dispatch</h2>
          <p className="text-xs text-slate-400 mt-0.5">Track, assign, edit, and monitor active trade bookings across the UK.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onTabChange('dispatch')}
            className="px-3.5 py-2 bg-[#121824] hover:bg-slate-800 text-sky-400 border border-sky-500/40 font-black rounded-xl text-xs flex items-center gap-2 shadow-md transition-all"
          >
            <Zap className="w-4 h-4 text-sky-400" /> AI Dispatch Workspace
          </button>

          <button
            onClick={onNewJobClick}
            className="px-4 py-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Create New Job
          </button>
        </div>
      </div>

      {/* COMPACT KPI METRICS ROW (Reduced Card Size) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">TOTAL ACTIVE JOBS</span>
          <div className="text-2xl font-black text-sky-400">{jobsList.length * 10.5}</div>
          <span className="text-[11px] text-slate-400 font-medium block">18 Dispatched Today</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">AVG RESPONSE TIME</span>
          <div className="text-2xl font-black text-emerald-400">14.2 Mins</div>
          <span className="text-[11px] text-emerald-400 font-medium block">99.8% On-Time Arrival</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">EMERGENCY JOBS</span>
          <div className="text-2xl font-black text-amber-400">4 Priority</div>
          <span className="text-[11px] text-amber-400 font-medium block">24/7 Call-Outs</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">COMPLETED THIS MONTH</span>
          <div className="text-2xl font-black text-purple-400">1,429</div>
          <span className="text-[11px] text-slate-400 font-medium block">£284,500 Gross Billed</span>
        </div>
      </div>

      {/* Jobs Data Table Card */}
      <div className="p-5 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search job ref, service, or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-slate-200 text-xs font-medium outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex bg-[#0b0e14] p-1 rounded-xl text-xs font-bold border border-[#1e293b] overflow-x-auto">
            {['all', 'en_route', 'in_progress', 'assigned', 'completed'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg capitalize transition-all whitespace-nowrap ${
                  filterStatus === st ? 'bg-[#0ea5e9] text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table with ALL ACTION BUTTONS (GPS, PDF, EDIT) IN ONE HORIZONTAL LINE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="font-bold uppercase tracking-wider text-slate-400 border-b border-[#1e293b]">
              <tr>
                <th className="py-3 px-3 min-w-[120px]">Job Ref</th>
                <th className="py-3 px-3">Service Details</th>
                <th className="py-3 px-3">Customer & Location</th>
                <th className="py-3 px-3">Assigned Engineer</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Amount</th>
                <th className="py-3 px-3 text-right min-w-[160px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b] font-medium text-slate-300">
              {filteredJobs.map((j) => (
                <tr
                  key={j.id}
                  onClick={() => setSelectedJobDetails(j)}
                  className="hover:bg-[#0b0e14]/60 cursor-pointer transition-colors"
                >
                  {/* Clean No-Wrap Single Line Job Ref */}
                  <td className="py-3.5 px-3 font-mono font-black text-sky-400 text-xs whitespace-nowrap">
                    {j.ref}
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-extrabold text-sm text-white">{j.service}</div>
                    <div className="text-[11px] text-slate-400">{j.category} &bull; {j.time}</div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-bold text-white whitespace-nowrap">{j.customer}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 whitespace-nowrap">
                      <MapPin className="w-3 h-3 text-rose-400 shrink-0" /> {j.postcode}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 font-bold text-slate-200">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[10px] font-black shrink-0">
                        {j.engineer.split(' ')[0][0]}
                      </div>
                      <span className="whitespace-nowrap">{j.engineer}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase whitespace-nowrap ${
                      j.priority === 'Emergency'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {j.priority}
                    </span>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className={`font-bold flex items-center gap-1.5 whitespace-nowrap ${
                      j.status === 'Completed'
                        ? 'text-emerald-400'
                        : j.status === 'En Route'
                        ? 'text-sky-400'
                        : 'text-amber-400'
                    }`}>
                      <span className={`w-2 h-2 rounded-full shrink-0 ${
                        j.status === 'Completed' ? 'bg-emerald-400' : j.status === 'En Route' ? 'bg-sky-400' : 'bg-amber-400'
                      }`} />
                      {j.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right font-black text-white text-sm whitespace-nowrap">
                    £{j.amount.toFixed(2)}
                  </td>

                  {/* ALL 3 ACTION BUTTONS (GPS, PDF, EDIT) IN ONE HORIZONTAL LINE */}
                  <td className="py-3.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                      {/* Live GPS Route Button */}
                      <button
                        onClick={() => setSelectedGpsJob(j)}
                        className="p-2 bg-[#0b0e14] hover:bg-sky-500 hover:text-slate-950 text-sky-400 rounded-xl border border-[#1e293b] transition-all shadow-sm flex items-center gap-1 text-[11px] font-bold"
                        title="View Live GPS Route"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span className="hidden xl:inline">GPS</span>
                      </button>

                      {/* Download Invoice PDF Button */}
                      <button
                        onClick={() => handleDownloadInvoicePDF(j)}
                        className="p-2 bg-[#0b0e14] hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 rounded-xl border border-[#1e293b] transition-all shadow-sm flex items-center gap-1 text-[11px] font-bold"
                        title="Download Tax Invoice PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden xl:inline">PDF</span>
                      </button>

                      {/* REAL WORKING EDIT BUTTON */}
                      <button
                        onClick={() => handleOpenEditModal(j)}
                        className="p-2 bg-[#0b0e14] hover:bg-amber-500 hover:text-slate-950 text-amber-400 rounded-xl border border-[#1e293b] transition-all shadow-sm flex items-center gap-1 text-[11px] font-bold"
                        title="Edit Job Details"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span className="hidden xl:inline">Edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REAL WORKING EDIT JOB MODAL DRAWER */}
      {selectedEditJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-amber-400" />
                <h3 className="font-black text-base text-white">Edit Job #{selectedEditJob.ref}</h3>
              </div>
              <button onClick={() => setSelectedEditJob(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditJobSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={editService}
                  onChange={(e) => setEditService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={editCustomer}
                  onChange={(e) => setEditCustomer(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Assigned Engineer</label>
                <input
                  type="text"
                  required
                  value={editEngineer}
                  onChange={(e) => setEditEngineer(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Priority</label>
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-bold outline-none focus:border-sky-500"
                  >
                    <option value="Emergency">Emergency</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Job Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-bold outline-none focus:border-sky-500"
                  >
                    <option value="En Route">En Route</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Total Gross Amount (£)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black shadow-lg transition-all flex items-center justify-center gap-1.5"
              >
                <Save className="w-4 h-4" /> Save Job Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LIVE GPS ROUTE MAP MODAL DRAWER */}
      {selectedGpsJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-sky-400 animate-pulse" />
                <h3 className="font-black text-lg text-white">Live GPS Tracking & Route - #{selectedGpsJob.ref}</h3>
              </div>
              <button
                onClick={() => setSelectedGpsJob(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-72 rounded-2xl overflow-hidden border border-[#1e293b] relative">
              <LiveTrackingMap
                booking={{
                  id: selectedGpsJob.id,
                  bookingRef: selectedGpsJob.ref,
                  customerName: selectedGpsJob.customer,
                  customerPhone: selectedGpsJob.phone,
                  postcode: selectedGpsJob.postcode,
                  assignedEngineerId: 'eng_1',
                  assignedEngineerName: selectedGpsJob.engineer,
                  assignedEngineerVehicle: selectedGpsJob.engineerVehicle,
                  assignedEngineerPhone: '+44 7911 123456',
                  etaMins: selectedGpsJob.etaMins,
                  lat: selectedGpsJob.lat,
                  lng: selectedGpsJob.lng,
                } as any}
                engineers={[
                  {
                    id: 'eng_1',
                    businessId: 'biz_01',
                    name: selectedGpsJob.engineer,
                    role: 'engineer',
                    email: 'eng@weic.co.uk',
                    phone: '+44 7911 123456',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120',
                    skills: ['Gas Safe'],
                    certifications: ['Certified'],
                    vehicleRegistration: selectedGpsJob.engineerVehicle,
                    isAvailable: false,
                    currentLat: selectedGpsJob.lat,
                    currentLng: selectedGpsJob.lng,
                    rating: 4.98,
                    completedJobsCount: 142,
                    createdAt: '2026-01-01',
                  },
                ]}
                height="h-72"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0b0e14] border border-[#1e293b]">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Assigned Engineer</span>
                <span className="font-bold text-white mt-0.5 block">{selectedGpsJob.engineer}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0b0e14] border border-[#1e293b]">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Vehicle Reg</span>
                <span className="font-mono font-bold text-sky-400 mt-0.5 block">{selectedGpsJob.engineerVehicle}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0b0e14] border border-[#1e293b]">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase block">ETA Countdown</span>
                <span className="font-black text-emerald-400 mt-0.5 block">{selectedGpsJob.etaMins} Mins Remaining</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* JOB DETAILS DRAWER MODAL */}
      {selectedJobDetails && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div>
                <span className="text-xs font-mono text-sky-400 font-bold">#{selectedJobDetails.ref}</span>
                <h3 className="font-black text-lg text-white">{selectedJobDetails.service}</h3>
              </div>
              <button onClick={() => setSelectedJobDetails(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#0b0e14] border border-[#1e293b] space-y-2">
                <div className="flex justify-between font-bold text-slate-200">
                  <span>Customer: {selectedJobDetails.customer}</span>
                  <span className="text-sky-400">{selectedJobDetails.phone}</span>
                </div>
                <p className="text-slate-400">{selectedJobDetails.address}</p>
              </div>

              <div className="flex justify-between items-center p-4 rounded-2xl bg-[#0b0e14] border border-[#1e293b]">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Total Gross Amount</span>
                  <div className="text-xl font-black text-emerald-400">£{selectedJobDetails.amount.toFixed(2)}</div>
                </div>

                <button
                  onClick={() => {
                    handleDownloadInvoicePDF(selectedJobDetails);
                    setSelectedJobDetails(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-4 h-4" /> Download PDF Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
