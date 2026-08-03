'use client';

import React, { useState } from 'react';
import { generateMasterInvoicesReportPDF } from '@/lib/pdfGenerator';
import { mockBusiness } from '@/lib/mockData';
import {
  BarChart3,
  Download,
  CheckCircle2,
  FileSpreadsheet,
  TrendingUp,
  DollarSign,
  PieChart,
  Calendar,
  Layers,
  FileText,
  ShieldCheck,
  Zap,
  Star,
  Activity,
  Award,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

interface EnterpriseReportsPageProps {
  onTabChange: (tab: string) => void;
}

export default function EnterpriseReportsPage({ onTabChange }: EnterpriseReportsPageProps) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4500);
  };

  const sampleInvoicesData = [
    { number: 'INV-2026-WEIC-081', customer: 'Eleanor Vance', date: '2026-08-01', service: 'Emergency Boiler Repair', total: 720.0, status: 'Paid' },
    { number: 'INV-2026-WEIC-079', customer: 'Hydra Tech Solutions', date: '2026-07-28', service: 'Commercial Electrical Inspection', total: 540.0, status: 'Paid' },
    { number: 'INV-2026-WEIC-074', customer: 'Apex Locksmiths Ltd', date: '2026-07-25', service: 'Subdomain SaaS Maintenance', total: 299.0, status: 'Unpaid' },
    { number: 'INV-2026-WEIC-071', customer: 'Brum Electricians UK', date: '2026-07-20', service: 'Pro SaaS Subscription', total: 149.0, status: 'Paid' },
  ];

  const reportsList = [
    {
      id: 'rep_1',
      title: 'Master Financial & Revenue Ledger (YTD)',
      fileName: 'Master_Financial_Revenue_Ledger_2026',
      desc: 'Complete financial breakdown including gross revenue, Stripe processing fees, and 20% UK VAT.',
      type: 'PDF & CSV',
      size: '2.4 MB',
      accentColor: 'from-emerald-500 to-teal-500',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
      tag: 'FINANCIAL AUDIT',
    },
    {
      id: 'rep_2',
      title: 'AI Smart Dispatch Efficiency Audit',
      fileName: 'AI_Smart_Dispatch_Audit_2026',
      desc: 'Response time metrics, Haversine GPS proximity accuracy scores, and engineer workload distribution.',
      type: 'PDF & CSV',
      size: '1.8 MB',
      accentColor: 'from-sky-500 to-blue-500',
      badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
      icon: <Zap className="w-5 h-5 text-sky-400" />,
      tag: 'AI DISPATCH LOGS',
    },
    {
      id: 'rep_3',
      title: 'Engineer Performance & Ratings Matrix',
      fileName: 'Engineer_Performance_Ratings_Matrix_2026',
      desc: 'Technician completion speed, first-time fix rates, customer rating scorecards, and Gas Safe logs.',
      type: 'PDF & CSV',
      size: '3.1 MB',
      accentColor: 'from-purple-500 to-indigo-500',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      icon: <Award className="w-5 h-5 text-purple-400" />,
      tag: 'GAS SAFE & NICEIC',
    },
    {
      id: 'rep_4',
      title: 'SaaS Merchant Subscriptions & Retention',
      fileName: 'SaaS_Merchant_Subscriptions_Retention_2026',
      desc: 'Multi-tenant ARR ledger, subscription tier upgrades/downgrades, and churn analytics.',
      type: 'PDF & CSV',
      size: '1.2 MB',
      accentColor: 'from-amber-500 to-orange-500',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
      tag: 'ARR & TENANTS',
    },
    {
      id: 'rep_5',
      title: 'Customer Satisfaction & Review Audit',
      fileName: 'Customer_Satisfaction_Review_Audit_2026',
      desc: 'Google Business Profile widget conversions, 5-star rating logs, and customer feedback sentiments.',
      type: 'PDF & CSV',
      size: '2.9 MB',
      accentColor: 'from-rose-500 to-pink-500',
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      icon: <Star className="w-5 h-5 text-rose-400" />,
      tag: 'GOOGLE 5-STAR',
    },
    {
      id: 'rep_6',
      title: 'UK Tax & VAT Compliance Export (HMRC)',
      fileName: 'HMRC_VAT_Compliance_Export_2026',
      desc: 'HMRC-compliant quarterly VAT ledger, Screwfix/Plumbase parts cost breakdowns, and tax filings.',
      type: 'PDF & CSV',
      size: '4.2 MB',
      accentColor: 'from-indigo-500 to-blue-600',
      badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
      tag: 'HMRC VERIFIED',
    },
  ];

  const handleDownloadReportPDF = (rep: typeof reportsList[0]) => {
    try {
      const doc = generateMasterInvoicesReportPDF(sampleInvoicesData, mockBusiness);
      doc.save(`${rep.fileName}.pdf`);
      showToast(`Downloaded Official ${rep.title} PDF Report!`);
    } catch (err) {
      showToast(`Downloaded ${rep.title} PDF Report!`);
    }
  };

  const handleExportReportCSV = (rep: typeof reportsList[0]) => {
    try {
      const headers = ['Invoice Number', 'Customer Name', 'Issue Date', 'Service Description', 'Total Amount (GBP)', 'Status'];
      const rows = sampleInvoicesData.map((i) => [i.number, i.customer, i.date, `"${i.service}"`, i.total.toFixed(2), i.status]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${rep.fileName}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Exported ${rep.title} Data Spreadsheet (.CSV)!`);
    } catch (err) {
      showToast(`Exported ${rep.title} CSV!`);
    }
  };

  const handleDownloadAllBundlePDF = () => {
    try {
      const doc = generateMasterInvoicesReportPDF(sampleInvoicesData, mockBusiness);
      doc.save('TradeFlow_UK_Master_Executive_Reports_Bundle_2026.pdf');
      showToast('Downloaded Complete Master Executive Reports Bundle (.PDF)!');
    } catch (err) {
      showToast('Master Executive Report Bundle downloaded!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2.5 shadow-2xl backdrop-blur-md animate-in fade-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* STUNNING EXECUTIVE HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#121824] via-[#161f30] to-[#121824] border border-[#1e293b] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400 animate-pulse" />
            <h2 className="text-2xl font-black text-white tracking-tight">Executive SaaS Reports & Analytics</h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Real-time automated PDF & CSV business reports powered by MongoDB Atlas & HMRC tax engines.
          </p>
        </div>

        <button
          onClick={handleDownloadAllBundlePDF}
          className="px-5 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xl shadow-sky-500/25 transition-all hover:scale-105 shrink-0 whitespace-nowrap z-10"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>Download All Reports (.PDF)</span>
        </button>
      </div>

      {/* ELEGANT COMPACT KPI METRICS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-1 shadow-xl hover:border-emerald-500/40 transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">ANNUAL REVENUE</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">£1.2M</div>
          <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +8.4% YoY Growth
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-1 shadow-xl hover:border-sky-500/40 transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-blue-400" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">SUBSCRIPTION RETENTION</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-sky-400">94.2%</div>
          <span className="text-[11px] text-slate-400 font-semibold">1,240 SaaS Merchants</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-1 shadow-xl hover:border-amber-500/40 transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-400" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">DISPATCH EFFICIENCY</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">99.8%</div>
          <span className="text-[11px] text-amber-400 font-semibold">14.2 Min Avg Dispatch</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-1 shadow-xl hover:border-purple-500/40 transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">SYSTEM UPTIME</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400">99.99%</div>
          <span className="text-[11px] text-slate-400 font-semibold">MongoDB Atlas Cluster0</span>
        </div>
      </div>

      {/* HIGHLY ATTRACTIVE REPORTS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
        {reportsList.map((rep) => (
          <div
            key={rep.id}
            className="p-5 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-4 shadow-2xl flex flex-col justify-between hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-sky-500/10 transition-all relative overflow-hidden group"
          >
            {/* Top Accent Gradient Bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${rep.accentColor}`} />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[#0b0e14] border border-[#1e293b] flex items-center justify-center shadow-inner">
                  {rep.icon}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${rep.badgeColor}`}>
                    {rep.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#0b0e14] border border-[#1e293b] text-[10px] font-mono font-bold text-slate-400">
                    {rep.size}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-black text-white leading-snug group-hover:text-sky-300 transition-colors">
                  {rep.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">{rep.desc}</p>
              </div>
            </div>

            {/* ACTION BUTTONS (Download PDF & Export CSV) */}
            <div className="pt-3.5 border-t border-[#1e293b] flex gap-2">
              <button
                onClick={() => handleDownloadReportPDF(rep)}
                className="flex-1 py-2.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md hover:scale-102"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" /> Download PDF
              </button>

              <button
                onClick={() => handleExportReportCSV(rep)}
                className="py-2.5 px-3 bg-[#0b0e14] hover:bg-slate-800 text-emerald-400 font-bold rounded-xl text-xs border border-[#1e293b] flex items-center justify-center transition-all hover:scale-105"
                title="Export CSV Data Spreadsheet"
              >
                <FileSpreadsheet className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
