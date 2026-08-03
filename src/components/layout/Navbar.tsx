'use client';

import React, { useState } from 'react';
import { Business, UserRole, NotificationItem, User } from '@/types';
import {
  Wrench,
  Bell,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  Phone,
  Radio,
  CheckCircle2,
  Calendar,
  LogOut,
  User as UserIcon,
  LogIn,
} from 'lucide-react';

interface NavbarProps {
  business: Business;
  currentRole: UserRole | 'google_widget';
  activeTab: string;
  onTabChange: (tab: string) => void;
  notifications: NotificationItem[];
  onOpenWhiteLabel: () => void;
  onOpenAuth: () => void;
  currentUser: Partial<User> | null;
  onLogout: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export default function Navbar({
  business,
  currentRole,
  activeTab,
  onTabChange,
  notifications,
  onOpenWhiteLabel,
  onOpenAuth,
  currentUser,
  onLogout,
  isDark = false,
}: NavbarProps) {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const roleBadges: Record<string, { label: string; bg: string }> = {
    business_owner: { label: 'BUSINESS OWNER', bg: 'bg-sky-500/20 text-sky-300 border-sky-500/40' },
    dispatcher: { label: 'AI DISPATCH CENTER', bg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' },
    engineer: { label: 'FIELD ENGINEER', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    customer: { label: 'CUSTOMER PORTAL', bg: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
    google_widget: { label: 'GOOGLE WIDGET', bg: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
    super_admin: { label: 'SUPER ADMIN', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  };

  const currentBadge = roleBadges[currentRole] || roleBadges.business_owner;

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${
      isDark
        ? 'bg-slate-900/90 border-slate-800/90 text-slate-100 shadow-lg'
        : 'bg-white/90 border-slate-200/90 text-slate-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/30">
            <Wrench className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight">TradePro <span className="text-sky-500">360</span></span>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${currentBadge.bg}`}>
                {currentBadge.label}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {business.name}
            </p>
          </div>
        </div>

        {/* Dynamic Nav Links for Owner Dashboard */}
        {currentRole === 'business_owner' && (
          <nav className="hidden md:flex items-center gap-1 font-extrabold text-xs">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`px-3 py-2 rounded-xl transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onTabChange('dispatch')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1 ${
                activeTab === 'dispatch'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> AI Dispatch Center
            </button>
          </nav>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${business.phone}`}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-extrabold transition-all ${
              isDark ? 'bg-slate-800 border-slate-700 text-sky-400' : 'bg-slate-50 border-slate-200 text-sky-600'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{business.phone}</span>
          </a>

          {/* Notifications Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className={`p-2 rounded-xl border relative transition-all ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Bell className="w-4 h-4" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[10px] flex items-center justify-center animate-pulse">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {showNotifDropdown && (
              <div className={`absolute right-0 mt-2 w-80 rounded-2xl border shadow-2xl p-4 space-y-3 z-50 animate-in fade-in ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}>
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="font-black text-xs uppercase tracking-wider">System Notifications</h4>
                  <span className="text-[10px] text-sky-400 font-bold">{notifications.length} Total</span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-2.5 rounded-xl text-xs space-y-1 ${isDark ? 'bg-slate-800/80' : 'bg-slate-50'}`}>
                      <div className="flex justify-between font-bold">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* White-Label Settings Trigger */}
          {currentRole === 'business_owner' && (
            <button
              onClick={onOpenWhiteLabel}
              className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Branding</span>
            </button>
          )}

          {/* Authentication State Button */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
              }`}>
                <div className="w-6 h-6 rounded-full bg-sky-600 text-white font-black text-xs flex items-center justify-center">
                  {currentUser.name?.charAt(0) || 'U'}
                </div>
                <div className="hidden md:block text-left text-xs">
                  <div className="font-extrabold truncate max-w-[100px]">{currentUser.name}</div>
                  <div className="text-[9px] text-sky-400 uppercase font-bold">{currentUser.role?.replace('_', ' ')}</div>
                </div>
              </div>

              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20 text-xs font-bold transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
