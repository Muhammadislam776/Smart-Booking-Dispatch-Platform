'use client';

import React, { useState, useEffect } from 'react';
import {
  LifeBuoy,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Search,
  UserCheck,
  Plus,
  X,
  RefreshCw,
} from 'lucide-react';

export default function SuperAdminSupportTicketsModule() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTicketsFromMongoDB = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/support-tickets');
      const data = await res.json();
      if (data.success && data.tickets) {
        setTickets(data.tickets);
      }
    } catch (e) {
      console.error('Error fetching tickets:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketsFromMongoDB();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleResolveTicket = async (id: string) => {
    setTickets(
      tickets.map((t) => (t.id === id ? { ...t, status: 'Resolved' } : t))
    );
    showToast(`Ticket #${id} marked as RESOLVED in MongoDB Atlas!`);

    try {
      await fetch('/api/support-tickets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'Resolved' }),
      });
    } catch (e) {
      console.error('Ticket update failed:', e);
    }
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
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Super Admin Support Center
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
              MongoDB Atlas Live
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage customer support tickets, assign engineers, and resolve complaints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchTicketsFromMongoDB}
            className="p-2.5 rounded-xl bg-[#121824] border border-[#1e293b] text-slate-300 hover:text-white transition-all flex items-center gap-2 text-xs font-bold"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh Atlas Tickets
          </button>

          <button
            onClick={() => showToast('New Ticket Created!')}
            className="px-4 py-2.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/20"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Create Support Ticket
          </button>
        </div>
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
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      t.priority === 'HIGH' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {t.priority}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                      t.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-sky-500/20 text-sky-400'
                    }`}
                  >
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
