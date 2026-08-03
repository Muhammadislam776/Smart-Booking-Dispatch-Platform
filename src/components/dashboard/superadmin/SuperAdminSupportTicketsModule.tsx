'use client';

import React, { useState } from 'react';
import {
  LifeBuoy,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Search,
  UserCheck,
  Plus,
  X,
} from 'lucide-react';

export default function SuperAdminSupportTicketsModule() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [tickets, setTickets] = useState([
    { id: 'TK-9921', subject: 'Stripe Payout Bank Verification Delay', customer: 'London Heating & Gas Co.', priority: 'HIGH', status: 'Open', assignedTo: 'Super Admin', created: '2026-08-03 14:00' },
    { id: 'TK-8812', subject: 'GPS Satellite Signal Intermittent in Leeds', customer: 'Yorkshire Locksmiths', priority: 'MEDIUM', status: 'In Progress', assignedTo: 'Tech Support', created: '2026-08-02 11:30' },
    { id: 'TK-7740', subject: 'Custom PDF Invoice Logo Alignment Request', customer: 'Elite Plumbing Ltd', priority: 'LOW', status: 'Resolved', assignedTo: 'Design Team', created: '2026-08-01 09:15' },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleResolveTicket = (id: string) => {
    setTickets(
      tickets.map((t) => (t.id === id ? { ...t, status: 'Resolved' } : t))
    );
    showToast(`Ticket #${id} marked as RESOLVED! Notification sent to customer.`);
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
          <h2 className="text-2xl font-black text-white tracking-tight">Super Admin Support Center</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage customer support tickets, assign engineers, and resolve complaints.</p>
        </div>

        <button
          onClick={() => showToast('New Ticket Created!')}
          className="px-4 py-2.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Create Support Ticket
        </button>
      </div>

      {/* Tickets Table */}
      <div className="p-6 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-4 shadow-2xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="font-bold uppercase tracking-wider text-slate-400 border-b border-[#1e293b]">
            <tr>
              <th className="py-3 px-4">Ticket ID</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Merchant / Customer</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e293b] font-medium text-slate-300">
            {tickets.map((t) => (
              <tr key={t.id} className="hover:bg-[#0b0e14]/50 transition-colors">
                <td className="py-4 px-4 font-mono text-sky-400 font-bold">{t.id}</td>
                <td className="py-4 px-4 font-black text-white">{t.subject}</td>
                <td className="py-4 px-4 text-slate-300 font-semibold">{t.customer}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    t.priority === 'HIGH' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {t.priority}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                    t.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-sky-500/20 text-sky-400'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  {t.status !== 'Resolved' && (
                    <button
                      onClick={() => handleResolveTicket(t.id)}
                      className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 font-bold text-xs"
                    >
                      Resolve Ticket
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
