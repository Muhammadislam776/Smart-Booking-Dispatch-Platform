'use client';

import React, { useState } from 'react';
import { UserRole } from '@/types';
import {
  Users,
  UserCheck,
  Plus,
  Search,
  CheckCircle2,
  ShieldCheck,
  Key,
  Lock,
  Smartphone,
  History,
  MoreVertical,
  X,
} from 'lucide-react';

export default function SuperAdminUsersModule() {
  const [filterRole, setFilterRole] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [usersList, setUsersList] = useState([
    { id: 'u_1', name: 'Sana Khan', email: 'sanajavaidkhan44@weic.co.uk', role: 'business_owner', status: 'Active', lastLogin: '2026-08-03 18:30', device: 'Chrome / Windows 11' },
    { id: 'u_2', name: 'Alex Sterling', email: 'alex@weic.co.uk', role: 'engineer', status: 'Active', lastLogin: '2026-08-03 17:45', device: 'Android App / Mobile' },
    { id: 'u_3', name: 'Eleanor Vance', email: 'eleanor@vance.co.uk', role: 'customer', status: 'Active', lastLogin: '2026-08-03 14:15', device: 'Safari / iPhone 15' },
    { id: 'u_4', name: 'David Gascoigne', email: 'david@weic.co.uk', role: 'engineer', status: 'Active', lastLogin: '2026-08-02 09:20', device: 'Android App / Mobile' },
    { id: 'u_5', name: 'Master Admin', email: 'superadmin@weic.co.uk', role: 'super_admin', status: 'Active', lastLogin: '2026-08-03 18:40', device: 'Edge / Windows 11' },
    { id: 'u_6', name: 'Yorkshire Operations', email: 'yorkshire@weic.co.uk', role: 'dispatcher', status: 'Suspended', lastLogin: '2026-07-28 11:10', device: 'Firefox / macOS' },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleToggleStatus = (id: string) => {
    setUsersList(
      usersList.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          showToast(`User ${u.name} status updated to ${nextStatus}!`);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const filteredUsers = usersList.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

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
          <h2 className="text-2xl font-black text-white tracking-tight">Platform User Management</h2>
          <p className="text-xs text-slate-400 mt-0.5">Control role-based permissions, device login history, and account statuses.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Add New User
        </button>
      </div>

      {/* Filters & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#121824] border border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search users by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white text-xs font-semibold outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold text-slate-400">
          {['all', 'super_admin', 'business_owner', 'dispatcher', 'engineer', 'customer'].map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-3 py-1.5 rounded-xl font-black uppercase text-[10px] whitespace-nowrap transition-all ${
                filterRole === role
                  ? 'bg-[#0ea5e9] text-slate-950 shadow-md'
                  : 'bg-[#0b0e14] text-slate-400 border border-[#1e293b] hover:text-white'
              }`}
            >
              {role.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Users Data Table */}
      <div className="p-6 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-4 shadow-2xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="font-bold uppercase tracking-wider text-slate-400 border-b border-[#1e293b]">
            <tr>
              <th className="py-3 px-4">User Details</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Last Login</th>
              <th className="py-3 px-4">Device & IP</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e293b] font-medium text-slate-300">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-[#0b0e14]/50 transition-colors">
                <td className="py-4 px-4 font-bold">
                  <div className="font-black text-sm text-white">{u.name}</div>
                  <div className="text-[11px] text-slate-400">{u.email}</div>
                </td>

                <td className="py-4 px-4">
                  <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-black uppercase">
                    {u.role.replace('_', ' ')}
                  </span>
                </td>

                <td className="py-4 px-4">
                  <button
                    onClick={() => handleToggleStatus(u.id)}
                    className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase border transition-all ${
                      u.status === 'Active'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border-rose-500/30 hover:bg-rose-500/30'
                    }`}
                  >
                    {u.status}
                  </button>
                </td>

                <td className="py-4 px-4 font-mono text-slate-300">{u.lastLogin}</td>

                <td className="py-4 px-4 text-slate-400 flex items-center gap-1 mt-3">
                  <Smartphone className="w-3.5 h-3.5 text-sky-400" /> {u.device}
                </td>

                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => showToast(`Password reset link sent to ${u.email}!`)}
                    className="px-3 py-1 rounded-lg bg-[#0b0e14] border border-[#1e293b] text-sky-400 hover:text-white font-bold text-xs"
                  >
                    Reset Password
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
