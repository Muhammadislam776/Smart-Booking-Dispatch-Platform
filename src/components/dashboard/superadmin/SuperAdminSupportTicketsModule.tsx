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

  // Modal
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCustomer, setTicketCustomer] = useState('London Heating & Gas Co.');
  const [ticketPriority, setTicketPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

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

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject) return;

    try {
      const res = await fetch('/api/support-tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: ticketSubject,
          customer: ticketCustomer,
          priority: ticketPriority,
          status: 'Open',
          assignedTo: 'Super Admin',
        }),
      });

      const data = await res.json();
      if (data.success && data.ticket) {
        setTickets([data.ticket, ...tickets]);
        showToast(`Support Ticket #${data.ticket.id} created & saved to MongoDB Atlas!`);
      }
    } catch (e) {
      console.error('Create ticket failed:', e);
    } finally {
      setShowCreateModal(false);
      setTicketSubject('');
    }
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
            onClick={() => {
              setTicketSubject('');
              setShowCreateModal(true);
            }}
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

      {/* MODAL: CREATE SUPPORT TICKET */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateTicket}
            className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in"
          >
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <LifeBuoy className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base text-white">Create Support Ticket</h3>
              </div>
              <button type="button" onClick={() => setShowCreateModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Ticket Subject / Complaint</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Stripe Account Verification Pending"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Merchant / Customer Name</label>
                <input
                  type="text"
                  required
                  value={ticketCustomer}
                  onChange={(e) => setTicketCustomer(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Priority Level</label>
                <select
                  value={ticketPriority}
                  onChange={(e: any) => setTicketPriority(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-bold outline-none focus:border-sky-500"
                >
                  <option value="HIGH">HIGH Priority</option>
                  <option value="MEDIUM">MEDIUM Priority</option>
                  <option value="LOW">LOW Priority</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#0b0e14] text-slate-400 border border-[#1e293b] font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg"
              >
                Save to MongoDB Atlas
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
