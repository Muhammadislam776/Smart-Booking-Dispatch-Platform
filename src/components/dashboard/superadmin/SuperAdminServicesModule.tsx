'use client';

import React, { useState } from 'react';
import {
  Wrench,
  Zap,
  Plus,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  Flame,
  Search,
} from 'lucide-react';

export default function SuperAdminServicesModule() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [services, setServices] = useState([
    { id: 'srv_1', name: 'Boiler Repair & Performance Audit', category: 'Heating & Gas', basePrice: 150, emergencySurcharge: 50, vatRate: '20%' },
    { id: 'srv_2', name: 'Consumer Unit Rewire & Inspection', category: 'Electrical', basePrice: 600, emergencySurcharge: 100, vatRate: '20%' },
    { id: 'srv_3', name: 'High-Pressure Drain Unblocking', category: 'Plumbing', basePrice: 120, emergencySurcharge: 40, vatRate: '20%' },
    { id: 'srv_4', name: 'Commercial HVAC Chiller Servicing', category: 'HVAC', basePrice: 350, emergencySurcharge: 75, vatRate: '20%' },
    { id: 'srv_5', name: 'Emergency Lock Replacement', category: 'Locksmith', basePrice: 180, emergencySurcharge: 60, vatRate: '20%' },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md animate-in fade-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Services & Dynamic Pricing Management</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage trade categories, base rates, emergency callout surcharges, and UK VAT rules.</p>
        </div>

        <button
          onClick={() => showToast('New Service Category Modal Opened!')}
          className="px-4 py-2.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Add New Service Category
        </button>
      </div>

      {/* Services Table */}
      <div className="p-6 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-4 shadow-2xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="font-bold uppercase tracking-wider text-slate-400 border-b border-[#1e293b]">
            <tr>
              <th className="py-3 px-4">Service Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Base Callout Rate</th>
              <th className="py-3 px-4">Emergency Surcharge</th>
              <th className="py-3 px-4">VAT Rate</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e293b] font-medium text-slate-300">
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-[#0b0e14]/50 transition-colors">
                <td className="py-4 px-4 font-black text-sm text-white">{s.name}</td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-black uppercase">
                    {s.category}
                  </span>
                </td>
                <td className="py-4 px-4 font-black text-emerald-400 text-sm">£{s.basePrice}.00</td>
                <td className="py-4 px-4 text-amber-400 font-bold">+£{s.emergencySurcharge}.00</td>
                <td className="py-4 px-4 font-mono text-slate-400">{s.vatRate}</td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => showToast(`Service ${s.name} pricing updated!`)}
                    className="px-3 py-1 rounded-lg bg-[#0b0e14] border border-[#1e293b] text-sky-400 hover:text-white font-bold text-xs"
                  >
                    Edit Pricing
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
