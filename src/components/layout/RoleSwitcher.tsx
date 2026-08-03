'use client';

import React from 'react';
import { UserRole } from '@/types';
import { ShieldAlert, Building2, Radio, Wrench, UserCheck, ExternalLink, Sparkles, Sun, Moon } from 'lucide-react';

interface RoleSwitcherProps {
  currentRole: UserRole | 'google_widget';
  onRoleChange: (role: UserRole | 'google_widget') => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function RoleSwitcher({
  currentRole,
  onRoleChange,
  isDark,
  onToggleTheme,
}: RoleSwitcherProps) {
  const roles: { id: UserRole | 'google_widget'; label: string; icon: React.ReactNode; activeBg: string }[] = [
    {
      id: 'business_owner',
      label: 'Business Owner',
      icon: <Building2 className="w-3.5 h-3.5" />,
      activeBg: 'bg-sky-600 text-white shadow-md shadow-sky-600/30',
    },
    {
      id: 'dispatcher',
      label: 'AI Dispatcher',
      icon: <Radio className="w-3.5 h-3.5 text-amber-300 animate-pulse" />,
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30',
    },
    {
      id: 'engineer',
      label: 'Field Engineer',
      icon: <Wrench className="w-3.5 h-3.5" />,
      activeBg: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30',
    },
    {
      id: 'customer',
      label: 'Customer Portal',
      icon: <UserCheck className="w-3.5 h-3.5" />,
      activeBg: 'bg-purple-600 text-white shadow-md shadow-purple-600/30',
    },
    {
      id: 'google_widget',
      label: 'Google Business Widget',
      icon: <ExternalLink className="w-3.5 h-3.5" />,
      activeBg: 'bg-blue-600 text-white shadow-md shadow-blue-600/30',
    },
    {
      id: 'super_admin',
      label: 'Super Admin',
      icon: <ShieldAlert className="w-3.5 h-3.5" />,
      activeBg: 'bg-rose-600 text-white shadow-md shadow-rose-600/30',
    },
  ];

  return (
    <div className={`py-1.5 px-4 border-b text-xs transition-colors z-50 ${
      isDark ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-slate-900 border-slate-800 text-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex items-center gap-1.5 bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/30 font-bold text-[11px]">
            <Sparkles className="w-3 h-3" /> Live Demo Mode
          </span>
          <span className="hidden lg:inline text-slate-400 text-[11px]">Preview SaaS persona:</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1">
          {roles.map((r) => {
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => onRoleChange(r.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  isActive
                    ? `${r.activeBg} font-bold scale-105`
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
                }`}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            );
          })}

          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 transition-all ml-1"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5 text-amber-200" />}
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
