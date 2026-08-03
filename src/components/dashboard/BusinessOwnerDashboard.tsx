'use client';

import React, { useState } from 'react';
import { Business, Booking, Invoice, Engineer, ServiceItem } from '@/types';
import { generateInvoicePDF } from '@/lib/pdfGenerator';
import {
  PoundSterling,
  Calendar,
  Wrench,
  Star,
  TrendingUp,
  SlidersHorizontal,
  Users,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Edit,
  Download,
  FileSpreadsheet,
  Building2,
  X,
  Check,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface BusinessOwnerDashboardProps {
  business: Business;
  bookings: Booking[];
  invoices: Invoice[];
  engineers: Engineer[];
  services: ServiceItem[];
  onOpenWhiteLabel: () => void;
  isDark?: boolean;
}

export default function BusinessOwnerDashboard({
  business,
  bookings,
  invoices,
  engineers,
  services: initialServices,
  onOpenWhiteLabel,
  isDark = false,
}: BusinessOwnerDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'pricing' | 'invoices' | 'engineers'>('overview');
  const [servicesList, setServicesList] = useState<ServiceItem[]>(initialServices);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modals for Services
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Service Form State
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceCategory, setServiceCategory] = useState<'plumbing' | 'electrical' | 'hvac' | 'locksmith' | 'cleaning'>('plumbing');
  const [serviceBasePrice, setServiceBasePrice] = useState('95');
  const [serviceDesc, setServiceDesc] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // KPI Calculations
  const totalRevenue = invoices
    .filter((i) => i.status === 'paid')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const activeBookingsCount = bookings.filter(
    (b) => b.status !== 'completed' && b.status !== 'cancelled'
  ).length;

  const completedBookingsCount = bookings.filter((b) => b.status === 'completed').length;

  // Monthly Revenue Data for Recharts
  const monthlyRevenueData = [
    { month: 'Mar', revenue: 14200, jobs: 48 },
    { month: 'Apr', revenue: 18900, jobs: 62 },
    { month: 'May', revenue: 22400, jobs: 74 },
    { month: 'Jun', revenue: 26800, jobs: 89 },
    { month: 'Jul', revenue: 31500, jobs: 104 },
    { month: 'Aug', revenue: 38900, jobs: 128 },
  ];

  const serviceCategoryData = [
    { name: 'Plumbing', revenue: 18500 },
    { name: 'Electrical', revenue: 12400 },
    { name: 'Locksmith', revenue: 8900 },
    { name: 'HVAC', revenue: 6200 },
  ];

  // Add Service Handler
  const handleAddServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle) return;

    const newSrv: ServiceItem = {
      id: `srv_${Date.now()}`,
      businessId: business.id || 'biz_01',
      title: serviceTitle,
      category: serviceCategory,
      description: serviceDesc || 'Professional UK trade service & inspection.',
      basePrice: parseFloat(serviceBasePrice) || 95.0,
      estimatedDurationMins: 90,
      isEmergencyAvailable: true,
      requiredSkills: [serviceCategory],
    };

    setServicesList([...servicesList, newSrv]);
    showToast(`Service "${serviceTitle}" added & saved to MongoDB Atlas!`);
    setShowAddServiceModal(false);

    try {
      await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: serviceTitle,
          category: serviceCategory,
          basePrice: parseFloat(serviceBasePrice) || 95.0,
        }),
      });
    } catch (err) {
      console.error('Service save failed:', err);
    }
  };

  // Edit Service Handler
  const handleEditServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setServicesList(
      servicesList.map((s) =>
        s.id === editingService.id
          ? {
              ...s,
              title: serviceTitle,
              category: serviceCategory,
              description: serviceDesc,
              basePrice: parseFloat(serviceBasePrice),
            }
          : s
      )
    );

    showToast(`Service "${serviceTitle}" pricing updated in MongoDB Atlas!`);
    setShowEditServiceModal(false);

    try {
      await fetch('/api/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingService.id,
          name: serviceTitle,
          category: serviceCategory,
          basePrice: parseFloat(serviceBasePrice),
        }),
      });
    } catch (err) {
      console.error('Service update failed:', err);
    }
  };

  const openEditServiceModal = (srv: ServiceItem) => {
    setEditingService(srv);
    setServiceTitle(srv.title);
    setServiceCategory(srv.category as any);
    setServiceBasePrice(srv.basePrice.toString());
    setServiceDesc(srv.description);
    setShowEditServiceModal(true);
  };

  const handleDownloadPDF = (inv: Invoice) => {
    generateInvoicePDF(inv, business);
    showToast(`PDF Invoice #${inv.invoiceNumber} generated & downloaded!`);
  };

  const cardBgClass = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-xl'
    : 'bg-[#121824] border-[#1e293b] text-white shadow-md';

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6">
      {/* Toast Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2.5 shadow-2xl backdrop-blur-md animate-in fade-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Business Header */}
      <div
        className={`p-6 rounded-3xl border transition-all flex flex-col md:flex-row items-center justify-between gap-4 ${
          isDark
            ? 'bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border-slate-800 text-white shadow-2xl'
            : 'bg-gradient-to-r from-[#0f172a] via-sky-950 to-[#0f172a] border-[#1e293b] text-white shadow-xl'
        }`}
      >
        <div className="flex items-center gap-4">
          <img
            src={business.logo}
            alt={business.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-400 shadow-lg bg-white"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight">{business.name}</h1>
              <span className="bg-sky-400/20 text-sky-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-sky-400/30">
                UK SaaS Tenant
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {business.address}, {business.city} ({business.postcode}) &bull; VAT Reg: GB 928 4102 91
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenWhiteLabel}
            className="px-4 py-2.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all hover:scale-105"
          >
            <SlidersHorizontal className="w-4 h-4" /> White-Label Settings
          </button>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Executive Overview & KPIs' },
          { id: 'pricing', label: 'Service & Pricing Rules' },
          { id: 'invoices', label: 'Invoices & Payments' },
          { id: 'engineers', label: 'Field Engineer Roster' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
              activeSubTab === tab.id
                ? 'bg-[#0ea5e9] text-slate-950 shadow-md'
                : 'bg-[#121824] text-slate-400 hover:text-white border border-[#1e293b]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW SUB TAB */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${cardBgClass}`}>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Total Revenue (YTD)
                </span>
                <h2 className="text-2xl font-black mt-1">£{totalRevenue.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</h2>
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +24.8% vs last month
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xl border border-emerald-500/20">
                <PoundSterling className="w-6 h-6" />
              </div>
            </div>

            <div className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${cardBgClass}`}>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Active Bookings
                </span>
                <h2 className="text-2xl font-black mt-1">{activeBookingsCount}</h2>
                <span className="text-[11px] font-semibold mt-1 inline-block text-slate-400">
                  {completedBookingsCount} Completed Jobs
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-xl border border-sky-500/20">
                <Calendar className="w-6 h-6" />
              </div>
            </div>

            <div className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${cardBgClass}`}>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Active Engineers
                </span>
                <h2 className="text-2xl font-black mt-1">{engineers.length}</h2>
                <span className="text-[11px] font-bold text-emerald-400 mt-1 inline-block">
                  100% Gas Safe / Part P
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xl border border-indigo-500/20">
                <Wrench className="w-6 h-6" />
              </div>
            </div>

            <div className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${cardBgClass}`}>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Google Rating
                </span>
                <h2 className="text-2xl font-black mt-1">★ {business.rating}</h2>
                <span className="text-[11px] font-semibold mt-1 inline-block text-slate-400">
                  Based on {business.reviewCount} Reviews
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xl border border-amber-500/20">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              </div>
            </div>
          </div>

          {/* Revenue Analytics Charts Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className={`lg:col-span-2 p-6 rounded-3xl border space-y-4 ${cardBgClass}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-white">Revenue Growth & Dispatch Trend</h3>
                  <p className="text-xs text-slate-400">Monthly billing total in £ GBP</p>
                </div>
                <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20">
                  2026 Financial Year
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyRevenueData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      formatter={(val: any) => [`£${val.toLocaleString()}`, 'Revenue']}
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid #334155',
                        backgroundColor: '#0f172a',
                        color: '#f8fafc',
                      }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#0284c7" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={`p-6 rounded-3xl border space-y-4 ${cardBgClass}`}>
              <h3 className="text-base font-black text-white">Revenue by Trade Sector</h3>
              <p className="text-xs text-slate-400">Performance breakdown by service type</p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceCategoryData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip formatter={(val: any) => [`£${val.toLocaleString()}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE & PRICING SUB TAB */}
      {activeSubTab === 'pricing' && (
        <div className={`p-6 rounded-3xl border space-y-6 ${cardBgClass}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white">Service Pricing & Rates Management</h3>
              <p className="text-xs text-slate-400">Configure base call-out fees, hourly rates, and emergency multipliers.</p>
            </div>
            <button
              onClick={() => {
                setServiceTitle('');
                setServiceBasePrice('95');
                setServiceDesc('');
                setShowAddServiceModal(true);
              }}
              className="px-4 py-2 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Add New Service
            </button>
          </div>

          <div className="divide-y divide-[#1e293b]">
            {servicesList.map((srv) => (
              <div key={srv.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-black text-sm text-white">{srv.title}</h4>
                  <p className="text-xs mt-0.5 text-slate-400">{srv.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      {srv.category}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Est. Duration: {srv.estimatedDurationMins} mins
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block">Base Price</span>
                    <span className="text-base font-black text-emerald-400">£{srv.basePrice.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => openEditServiceModal(srv)}
                    className="p-2.5 rounded-xl text-xs bg-[#0b0e14] border border-[#1e293b] text-sky-400 hover:text-white transition-all"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INVOICES SUB TAB */}
      {activeSubTab === 'invoices' && (
        <div className={`p-6 rounded-3xl border space-y-4 ${cardBgClass}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white">Invoice & Payment Log</h3>
            <span className="text-xs font-bold text-slate-400">{invoices.length} Total Invoices</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="font-bold uppercase tracking-wider bg-[#0b0e14] text-slate-400 border-b border-[#1e293b]">
                <tr>
                  <th className="p-3">Invoice No</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Issue Date</th>
                  <th className="p-3">Total (£)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e293b] font-medium text-slate-300">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#0b0e14]/50 transition-colors">
                    <td className="p-3 font-bold text-white">{inv.invoiceNumber}</td>
                    <td className="p-3">{inv.customerName}</td>
                    <td className="p-3 font-mono">{inv.issueDate}</td>
                    <td className="p-3 font-black text-emerald-400">£{inv.totalAmount.toFixed(2)}</td>
                    <td className="p-3">
                      {inv.status === 'paid' ? (
                        <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                          PAID
                        </span>
                      ) : (
                        <span className="bg-rose-500/20 text-rose-400 font-bold px-2 py-0.5 rounded border border-rose-500/30">
                          UNPAID
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDownloadPDF(inv)}
                        className="px-3 py-1.5 font-bold rounded-lg text-xs bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 shadow-md transition-all flex items-center gap-1.5 ml-auto"
                      >
                        <Download className="w-3.5 h-3.5" /> View PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ENGINEERS SUB TAB */}
      {activeSubTab === 'engineers' && (
        <div className="grid md:grid-cols-2 gap-4">
          {engineers.map((eng) => (
            <div key={eng.id} className={`p-5 rounded-3xl border flex items-start justify-between ${cardBgClass}`}>
              <div className="flex items-center gap-4">
                <img src={eng.avatar} alt={eng.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-700" />
                <div>
                  <h4 className="font-black text-base text-white">{eng.name}</h4>
                  <p className="text-xs text-sky-400 font-semibold">{eng.vehicleRegistration}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                    <span>★ {eng.rating}</span> &bull; <span>{eng.completedJobsCount} Jobs Completed</span>
                  </div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${eng.isAvailable ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                {eng.isAvailable ? 'Available' : 'On Job'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* MODAL 1: ADD SERVICE */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleAddServiceSubmit}
            className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in text-white"
          >
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base">Add New Service</h3>
              </div>
              <button type="button" onClick={() => setShowAddServiceModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  placeholder="e.g. EV Charging Station Install"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Category</label>
                <select
                  value={serviceCategory}
                  onChange={(e: any) => setServiceCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-bold outline-none focus:border-sky-500"
                >
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="hvac">HVAC</option>
                  <option value="locksmith">Locksmith</option>
                  <option value="cleaning">Cleaning</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Base Price (£)</label>
                <input
                  type="number"
                  required
                  value={serviceBasePrice}
                  onChange={(e) => setServiceBasePrice(e.target.value)}
                  placeholder="95"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Description</label>
                <input
                  type="text"
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                  placeholder="Service scope & details..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddServiceModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#0b0e14] text-slate-400 border border-[#1e293b] font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg"
              >
                Save Service to MongoDB Atlas
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 2: EDIT SERVICE */}
      {showEditServiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleEditServiceSubmit}
            className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in text-white"
          >
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base">Edit Service Rates</h3>
              </div>
              <button type="button" onClick={() => setShowEditServiceModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Base Callout Price (£)</label>
                <input
                  type="number"
                  required
                  value={serviceBasePrice}
                  onChange={(e) => setServiceBasePrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowEditServiceModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#0b0e14] text-slate-400 border border-[#1e293b] font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg"
              >
                Update in MongoDB Atlas
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
