'use client';

import React, { useState, useEffect } from 'react';
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
  RefreshCw,
} from 'lucide-react';

export default function SuperAdminAuditLogsModule() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLogsFromMongoDB = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/audit-logs');
      const data = await res.json();
      if (data.success && data.logs) {
        setLogs(data.logs);
      }
    } catch (e) {
      console.error('Error fetching audit logs:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogsFromMongoDB();
  }, []);

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
          <p className="text-xs text-slate-400 mt-0.5">
            Immutable audit trail of all platform logins, updates, deletions, and payments.
          </p>
        </div>

        <button
          onClick={fetchLogsFromMongoDB}
          className="p-2.5 rounded-xl bg-[#121824] border border-[#1e293b] text-slate-300 hover:text-white transition-all flex items-center gap-2 text-xs font-bold"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh Atlas Logs
        </button>
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
