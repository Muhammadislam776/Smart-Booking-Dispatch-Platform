'use client';

import React, { useState } from 'react';
import { Business } from '@/types';
import {
  ShieldAlert,
  Building2,
  Server,
  Globe,
  DollarSign,
  Activity,
  CheckCircle2,
  Plus,
  Download,
  FileSpreadsheet,
  Cpu,
  Database,
  Lock,
  RefreshCw,
  Search,
  Check,
  Ban,
  Filter,
} from 'lucide-react';

interface SuperAdminDashboardProps {
  businesses: Business[];
  isDark?: boolean;
}

export default function SuperAdminDashboard({ businesses, isDark = false }: SuperAdminDashboardProps) {
  const [tenants, setTenants] = useState([
    {
      id: 'biz_01',
      name: 'WEIC Smart Trade Solutions UK',
      city: 'London (W1U 68A)',
      subdomain: 'weic-trade-uk.tradepro360.co.uk',
      rate: '£65.00/hr',
      plan: 'Enterprise SaaS (£299/mo)',
      status: 'active',
      engineersCount: 4,
      monthlyJobs: 142,
    },
    {
      id: 'biz_02',
      name: 'Apex Heating & Locksmiths Ltd',
      city: 'Manchester (M1 1AE)',
      subdomain: 'apex-manchester.tradepro360.co.uk',
      rate: '£55.00/hr',
      plan: 'Pro Trade SaaS (£149/mo)',
      status: 'active',
      engineersCount: 6,
      monthlyJobs: 198,
    },
    {
      id: 'biz_03',
      name: 'Brum Electricians & HVAC UK',
      city: 'Birmingham (B1 1BB)',
      subdomain: 'brum-elec.tradepro360.co.uk',
      rate: '£60.00/hr',
      plan: 'Pro Trade SaaS (£149/mo)',
      status: 'active',
      engineersCount: 3,
      monthlyJobs: 88,
    },
    {
      id: 'biz_04',
      name: 'Yorkshire Plumbing Services',
      city: 'Leeds (LS1 5HD)',
      subdomain: 'yorkshire-plumb.tradepro360.co.uk',
      rate: '£50.00/hr',
      plan: 'Basic SaaS (£79/mo)',
      status: 'suspended',
      engineersCount: 2,
      monthlyJobs: 42,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [reportExportedMessage, setReportExportedMessage] = useState<string | null>(null);

  const handleToggleTenantStatus = (id: string) => {
    setTenants(
      tenants.map((t) =>
        t.id === id ? { ...t, status: t.status === 'active' ? 'suspended' : 'active' } : t
      )
    );
  };

  const handleExportReport = (type: 'pdf' | 'csv') => {
    setReportExportedMessage(`Master SaaS Platform ${type.toUpperCase()} Analytics Report generated & downloaded successfully!`);
    setTimeout(() => setReportExportedMessage(null), 4000);
  };

  const filteredTenants = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subdomain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardBgClass = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-xl'
    : 'bg-white border-slate-200/90 text-slate-900 shadow-md';

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6">
      {/* Super Admin Top Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col lg:flex-row items-center justify-between gap-4 transition-all ${
        isDark
          ? 'bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 border-rose-900/50 text-white shadow-2xl'
          : 'bg-gradient-to-r from-rose-900 via-slate-900 to-slate-950 border-rose-800/40 text-white shadow-xl'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-black text-2xl shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight">Super Admin SaaS Master Panel</h1>
              <span className="bg-rose-500/20 text-rose-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-rose-500/30">
                Isolated Root Admin
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Multi-tenant architecture monitoring, subscription revenue ledgers, and database instance control across UK.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleExportReport('pdf')}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all hover:scale-105"
          >
            <Download className="w-4 h-4" /> Download PDF Report
          </button>

          <button
            onClick={() => handleExportReport('csv')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-xl text-xs flex items-center gap-2 shadow-md"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> Export CSV Data
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {reportExportedMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-xl animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{reportExportedMessage}</span>
        </div>
      )}

      {/* Global Platform Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-5 rounded-3xl border space-y-2 ${cardBgClass}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Total Active SaaS Tenants</span>
            <Building2 className="w-4 h-4 text-sky-400" />
          </div>
          <h2 className="text-3xl font-black">{tenants.filter((t) => t.status === 'active').length + 14}</h2>
          <span className="text-xs text-emerald-500 font-bold inline-block">+3 New UK Tenants This Month</span>
        </div>

        <div className={`p-5 rounded-3xl border space-y-2 ${cardBgClass}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Platform ARR (Annual Recurring)</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black">£284,500</h2>
          <span className="text-xs text-emerald-500 font-bold inline-block">SaaS Subscriptions Revenue</span>
        </div>

        <div className={`p-5 rounded-3xl border space-y-2 ${cardBgClass}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Total Dispatched Jobs (UK)</span>
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <h2 className="text-3xl font-black">14,290</h2>
          <span className="text-xs text-sky-400 font-bold inline-block">99.8% AI Dispatch Success</span>
        </div>

        <div className={`p-5 rounded-3xl border space-y-2 ${cardBgClass}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">MongoDB & Server Health</span>
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <h2 className="text-3xl font-black text-emerald-500">99.99%</h2>
          <span className="text-xs text-slate-400 inline-block">MongoDB Atlas Cluster0 Online</span>
        </div>
      </div>

      {/* SaaS Tenants Management Table */}
      <div className={`p-6 rounded-3xl border space-y-4 ${cardBgClass}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black">Provisioned SaaS Business Tenants</h3>
            <p className="text-xs text-slate-400">Isolated workspace management and account status toggles.</p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tenant name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-semibold outline-none border ${
                isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`font-bold uppercase tracking-wider ${isDark ? 'bg-slate-800/60 text-slate-400' : 'bg-slate-50 text-slate-500'}`}>
              <tr>
                <th className="p-3">Business Tenant</th>
                <th className="p-3">Location</th>
                <th className="p-3">SaaS Plan</th>
                <th className="p-3">Engineers</th>
                <th className="p-3">Monthly Jobs</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y font-medium ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {filteredTenants.map((t) => (
                <tr key={t.id} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                  <td className="p-3 font-bold">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-sky-500 shrink-0" />
                      <div>
                        <div>{t.name}</div>
                        <div className="text-[10px] font-mono text-sky-400">{t.subdomain}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{t.city}</td>
                  <td className="p-3 font-bold text-amber-400">{t.plan}</td>
                  <td className="p-3 font-bold">{t.engineersCount} Active</td>
                  <td className="p-3 font-bold">{t.monthlyJobs} Jobs</td>
                  <td className="p-3">
                    {t.status === 'active' ? (
                      <span className="bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 w-fit">
                        <Check className="w-3 h-3" /> ACTIVE
                      </span>
                    ) : (
                      <span className="bg-rose-500/10 text-rose-400 font-bold px-2 py-0.5 rounded border border-rose-500/30 flex items-center gap-1 w-fit">
                        <Ban className="w-3 h-3" /> SUSPENDED
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleToggleTenantStatus(t.id)}
                      className={`px-3 py-1.5 font-bold rounded-lg text-[11px] transition-all ${
                        t.status === 'active'
                          ? 'bg-rose-600/20 text-rose-300 border border-rose-500/30 hover:bg-rose-600 hover:text-white'
                          : 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white'
                      }`}
                    >
                      {t.status === 'active' ? 'Suspend Tenant' : 'Activate Tenant'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Audit & Database Log Feed */}
      <div className={`p-6 rounded-3xl border space-y-3 ${cardBgClass}`}>
        <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
          <Database className="w-4 h-4 text-sky-400" /> Live MongoDB Atlas System Audit Feed
        </h3>

        <div className={`p-4 rounded-2xl border font-mono text-[11px] space-y-1.5 ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-900 text-slate-200'}`}>
          <div className="text-emerald-400">[INFO 11:38:12] MongoDB Atlas Cluster0 connection verified. Pool size: 10 connections.</div>
          <div className="text-sky-400">[AUDIT 11:36:04] Tenant 'weic-trade-uk' executed 1-Click AI Dispatch calculation for 2 jobs.</div>
          <div className="text-amber-400">[PAYMENT 11:30:19] Stripe Charge ch_3N8zX2Lkd processed (£720.00 VAT included).</div>
          <div className="text-slate-400">[SYSTEM 11:15:00] Automated PDF Tax Invoice backup completed for 1,429 bookings.</div>
        </div>
      </div>
    </div>
  );
}
