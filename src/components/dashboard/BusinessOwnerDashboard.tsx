'use client';

import React, { useState } from 'react';
import { Business, Booking, Invoice, Engineer, ServiceItem } from '@/types';
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
  services,
  onOpenWhiteLabel,
  isDark = false,
}: BusinessOwnerDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'pricing' | 'invoices' | 'engineers'>('overview');

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

  const cardBgClass = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-xl'
    : 'bg-white border-slate-200/90 text-slate-900 shadow-md';

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6">
      {/* Top Business Header */}
      <div className={`p-6 rounded-3xl border transition-all flex flex-col md:flex-row items-center justify-between gap-4 ${
        isDark
          ? 'bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border-slate-800 text-white shadow-2xl'
          : 'bg-gradient-to-r from-slate-900 via-sky-900 to-indigo-950 border-slate-800 text-white shadow-xl'
      }`}>
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
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all hover:scale-105"
          >
            <SlidersHorizontal className="w-4 h-4" /> White-Label Settings
          </button>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
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
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                : isDark
                ? 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
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
                <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Total Revenue (YTD)
                </span>
                <h2 className="text-2xl font-black mt-1">£{totalRevenue.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</h2>
                <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +24.8% vs last month
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xl border border-emerald-500/20">
                <PoundSterling className="w-6 h-6" />
              </div>
            </div>

            <div className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${cardBgClass}`}>
              <div>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Active Bookings
                </span>
                <h2 className="text-2xl font-black mt-1">{activeBookingsCount}</h2>
                <span className={`text-[11px] font-semibold mt-1 inline-block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {completedBookingsCount} Completed Jobs
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-xl border border-sky-500/20">
                <Calendar className="w-6 h-6" />
              </div>
            </div>

            <div className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${cardBgClass}`}>
              <div>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Active Engineers
                </span>
                <h2 className="text-2xl font-black mt-1">{engineers.length}</h2>
                <span className="text-[11px] font-bold text-emerald-500 mt-1 inline-block">
                  100% Gas Safe / Part P
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-xl border border-indigo-500/20">
                <Wrench className="w-6 h-6" />
              </div>
            </div>

            <div className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${cardBgClass}`}>
              <div>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Google Rating
                </span>
                <h2 className="text-2xl font-black mt-1">★ {business.rating}</h2>
                <span className={`text-[11px] font-semibold mt-1 inline-block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Based on {business.reviewCount} Reviews
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xl border border-amber-500/20">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              </div>
            </div>
          </div>

          {/* Revenue Analytics Charts Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Area Chart */}
            <div className={`lg:col-span-2 p-6 rounded-3xl border space-y-4 ${cardBgClass}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black">Revenue Growth & Dispatch Trend</h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Monthly billing total in £ GBP</p>
                </div>
                <span className="text-xs font-bold text-sky-500 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20">
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
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1e293b' : '#f1f5f9'} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      formatter={(val: any) => [`£${val.toLocaleString()}`, 'Revenue']}
                      contentStyle={{
                        borderRadius: '12px',
                        border: isDark ? '1px solid #334155' : 'none',
                        backgroundColor: isDark ? '#0f172a' : '#ffffff',
                        color: isDark ? '#f8fafc' : '#0f172a',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                      }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#0284c7" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Bar Chart */}
            <div className={`p-6 rounded-3xl border space-y-4 ${cardBgClass}`}>
              <h3 className="text-base font-black">Revenue by Trade Sector</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Performance breakdown by service type</p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceCategoryData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1e293b' : '#f1f5f9'} />
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
              <h3 className="text-lg font-black">Service Pricing & Rates Management</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Configure base call-out fees, hourly rates, and emergency multipliers.</p>
            </div>
            <button className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md">
              <Plus className="w-4 h-4" /> Add New Service
            </button>
          </div>

          <div className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
            {services.map((srv) => (
              <div key={srv.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-black text-sm">{srv.title}</h4>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{srv.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
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
                    <span className="text-base font-black">£{srv.basePrice.toFixed(2)}</span>
                  </div>
                  <button className={`p-2 rounded-xl text-xs ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
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
            <h3 className="text-lg font-black">Invoice & Payment Log</h3>
            <span className="text-xs font-bold text-slate-400">{invoices.length} Total Invoices</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`font-bold uppercase tracking-wider ${isDark ? 'bg-slate-800/60 text-slate-400' : 'bg-slate-50 text-slate-500'}`}>
                <tr>
                  <th className="p-3">Invoice No</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Issue Date</th>
                  <th className="p-3">Total (£)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y font-medium ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                {invoices.map((inv) => (
                  <tr key={inv.id} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                    <td className="p-3 font-bold">{inv.invoiceNumber}</td>
                    <td className="p-3">{inv.customerName}</td>
                    <td className="p-3">{inv.issueDate}</td>
                    <td className="p-3 font-black">£{inv.totalAmount.toFixed(2)}</td>
                    <td className="p-3">
                      {inv.status === 'paid' ? (
                        <span className="bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                          PAID
                        </span>
                      ) : (
                        <span className="bg-rose-500/10 text-rose-500 font-bold px-2 py-0.5 rounded border border-rose-500/30">
                          UNPAID
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <button className={`px-3 py-1 font-bold rounded-lg text-[11px] ${isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                        View PDF
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
                  <h4 className="font-black text-base">{eng.name}</h4>
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
    </div>
  );
}
