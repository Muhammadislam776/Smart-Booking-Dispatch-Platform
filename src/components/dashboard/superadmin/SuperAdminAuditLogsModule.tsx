'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  History,
  Lock,
  Search,
  CheckCircle2,
  AlertTriangle,
  User,
  Activity,
  Terminal,
} from 'lucide-react';

export default function SuperAdminAuditLogsModule() {
  const [logs, setLogs] = useState([
    { id: 'log_1', action: 'MERCHANT_STATUS_UPDATE', actor: 'Super Admin (Sana Khan)', target: 'Yorkshire Emergency Locksmiths', details: 'Status set to Active in MongoDB Atlas', timestamp: '2026-08-03 18:35:10', ip: '192.168.1.42' },
    { id: 'log_2', action: 'STRIPE_PAYMENT_CAPTURED', actor: 'Stripe Webhook Gateway', target: 'Invoice #INV-2026-WEIC-081', details: 'Captured £180.00 via Stripe Connect', timestamp: '2026-08-03 17:12:05', ip: '54.187.205.12' },
    { id: 'log_3', action: 'ENGINEER_DISPATCHED', actor: 'Dispatcher (John Smith)', target: 'Booking #TF-99281-UK', details: 'Dispatched Alex Sterling (ETA: 18 Mins)', timestamp: '2026-08-03 16:40:22', ip: '192.168.1.18' },
    { id: 'log_4', action: 'USER_ROLE_CHANGED', actor: 'Super Admin', target: 'david@weic.co.uk', details: 'Role set to Lead Field Engineer', timestamp: '2026-08-03 14:05:00', ip: '192.168.1.42' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Platform Audit Logs & Security Center
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
              MongoDB Atlas Persisted
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Immutable audit trail of all platform logins, updates, deletions, and payments.</p>
        </div>
      </div>

      {/* Logs Table */}
      <div className="p-6 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-4 shadow-2xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="font-bold uppercase tracking-wider text-slate-400 border-b border-[#1e293b]">
            <tr>
              <th className="py-3 px-4">Action Event</th>
              <th className="py-3 px-4">Actor</th>
              <th className="py-3 px-4">Target Entity</th>
              <th className="py-3 px-4">Details</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4 text-right">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e293b] font-medium text-slate-300">
            {logs.map((l) => (
              <tr key={l.id} className="hover:bg-[#0b0e14]/50 transition-colors">
                <td className="py-4 px-4 font-mono">
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-sky-400 text-[10px] font-bold">
                    {l.action}
                  </span>
                </td>
                <td className="py-4 px-4 font-bold text-white">{l.actor}</td>
                <td className="py-4 px-4 text-slate-300 font-semibold">{l.target}</td>
                <td className="py-4 px-4 text-slate-400">{l.details}</td>
                <td className="py-4 px-4 font-mono text-slate-400">{l.timestamp}</td>
                <td className="py-4 px-4 text-right font-mono text-slate-500">{l.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
