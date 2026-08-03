'use client';

import React, { useState } from 'react';
import { UserRole, User } from '@/types';
import NotificationDropdown from '@/components/notifications/NotificationDropdown';
import CustomCursor from '@/components/common/CustomCursor';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  UserCheck,
  BarChart3,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  Settings,
  Plus,
  Wrench,
  Menu,
  X,
  Radio,
  Building2,
  ShieldCheck,
  ChevronRight,
  Sun,
  Moon,
  Sparkles,
  Zap,
  Navigation,
} from 'lucide-react';

interface EnterpriseLayoutProps {
  children: React.ReactNode;
  currentRole: UserRole | 'google_widget';
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentUser: Partial<User> | null;
  onLogout: () => void;
  onNewJobClick?: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export default function EnterpriseLayout({
  children,
  currentRole,
  activeTab,
  onTabChange,
  currentUser,
  onLogout,
  onNewJobClick,
  isDark = true,
  onToggleTheme,
}: EnterpriseLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // STRICT PERSONA-ISOLATED SIDEBAR NAVIGATION PER ROLE
  const getRoleSidebarItems = () => {
    switch (currentRole) {
      case 'super_admin':
        return [
          { id: 'dashboard', label: 'Master SaaS Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { id: 'merchants', label: 'SaaS Merchants', icon: <Building2 className="w-5 h-5" /> },
          { id: 'invoices', label: 'Platform Financials', icon: <FileText className="w-5 h-5" /> },
          { id: 'reports', label: 'Executive Analytics', icon: <BarChart3 className="w-5 h-5" /> },
        ];
      case 'dispatcher':
        return [
          { id: 'dispatch', label: 'AI Dispatch Center', icon: <Zap className="w-5 h-5 text-amber-400" /> },
          { id: 'jobs', label: 'Active Job Queue', icon: <Briefcase className="w-5 h-5" /> },
          { id: 'engineers', label: 'Engineer Map & Gantt', icon: <Wrench className="w-5 h-5" /> },
          { id: 'reports', label: 'Dispatch Performance', icon: <BarChart3 className="w-5 h-5" /> },
        ];
      case 'engineer':
        return [
          { id: 'dashboard', label: 'My Assigned Jobs', icon: <Wrench className="w-5 h-5 text-sky-400" /> },
          { id: 'jobs', label: 'Job Progress Lifecycle', icon: <Briefcase className="w-5 h-5" /> },
          { id: 'support', label: 'Technician Support', icon: <HelpCircle className="w-5 h-5" /> },
        ];
      case 'customer':
        return [
          { id: 'dashboard', label: 'My Bookings & Live Map', icon: <Navigation className="w-5 h-5 text-emerald-400" /> },
          { id: 'new_booking', label: 'Book New Service', icon: <Plus className="w-5 h-5 text-sky-400" /> },
          { id: 'invoices', label: 'My Invoices & Receipts', icon: <FileText className="w-5 h-5" /> },
          { id: 'support', label: 'Customer Help Center', icon: <HelpCircle className="w-5 h-5" /> },
        ];
      case 'business_owner':
      default:
        return [
          { id: 'dashboard', label: 'Company Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
          { id: 'jobs', label: 'Jobs Matrix', icon: <Briefcase className="w-5 h-5" /> },
          { id: 'engineers', label: 'Certified Engineers', icon: <Wrench className="w-5 h-5" /> },
          { id: 'invoices', label: 'Invoices & UK VAT', icon: <FileText className="w-5 h-5" /> },
          { id: 'customers', label: 'Customer Directory', icon: <Users className="w-5 h-5" /> },
          { id: 'reports', label: 'Business Reports', icon: <BarChart3 className="w-5 h-5" /> },
        ];
    }
  };

  const sidebarItems = getRoleSidebarItems();

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Global Interactive Custom Cursor */}
      <CustomCursor />

      <div className="flex-1 flex relative">
        {/* Left Enterprise Navigation Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0b0e14] border-r border-[#1e293b] flex flex-col justify-between p-5 transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="space-y-8">
            {/* Brand Logo & Role Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('dashboard')}>
                <div className="w-9 h-9 rounded-xl bg-sky-500 text-slate-950 font-black flex items-center justify-center text-lg shadow-lg shadow-sky-500/20">
                  <Wrench className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h1 className="font-black text-lg text-white tracking-tight leading-none">
                    TradeFlow <span className="text-sky-400">UK</span>
                  </h1>
                  <span className="px-2 py-0.5 mt-1 rounded text-[9px] font-black uppercase tracking-wider block bg-sky-500/20 text-sky-400 border border-sky-500/30 w-fit">
                    {currentRole.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Role-Specific Navigation Items */}
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = activeTab === item.id || (activeTab === 'dispatch' && item.id === 'jobs');
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-bold text-xs transition-all relative ${
                      isActive
                        ? 'bg-[#121824] text-sky-400 border border-[#1e293b] shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#121824]/50'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
                    )}
                    <span className={isActive ? 'text-sky-400' : 'text-slate-400'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Controls */}
          <div className="pt-6 border-t border-[#1e293b] space-y-2">
            <button
              onClick={() => {
                onTabChange('support');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'support' ? 'bg-[#121824] text-sky-400 border border-[#1e293b]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Support & Docs</span>
            </button>

            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-bold text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Backdrop overlay for mobile menu */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/80 z-40 lg:hidden backdrop-blur-sm"
          />
        )}

        {/* Main Content Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* TOP FIXED STICKY HEADER BAR */}
          <header className="sticky top-0 z-40 bg-[#0b0e14]/90 backdrop-blur-md border-b border-[#1e293b] px-4 sm:px-6 flex items-center justify-between gap-4 h-16 shadow-lg">
            <div className="flex items-center gap-3 w-full max-w-md">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-[#121824] border border-[#1e293b] text-slate-300 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="relative w-full">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Search in ${currentRole.replace('_', ' ')} workstation...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#121824] border border-[#1e293b] text-slate-200 font-medium text-xs outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30 transition-all"
                />
              </div>
            </div>

            {/* Top Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowNotifications(true)}
                className="p-2 rounded-xl bg-[#121824] border border-[#1e293b] text-slate-300 hover:text-white relative transition-all"
                title="Live Event Notifications"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              </button>

              <button
                onClick={() => onTabChange('settings')}
                className={`p-2 rounded-xl border transition-all ${
                  activeTab === 'settings'
                    ? 'bg-sky-500/20 text-sky-400 border-sky-500/40'
                    : 'bg-[#121824] border-[#1e293b] text-slate-300 hover:text-white'
                }`}
                title="System Settings"
              >
                <Settings className="w-4.5 h-4.5" />
              </button>

              {/* Show + New Job / Book Service button for relevant roles */}
              {(currentRole === 'business_owner' || currentRole === 'customer' || currentRole === 'dispatcher') && (
                <button
                  onClick={onNewJobClick || (() => onTabChange('new_booking'))}
                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-slate-950 font-black text-xs shadow-lg shadow-sky-500/20 flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span className="hidden sm:inline">{currentRole === 'customer' ? 'Book Service' : 'New Job'}</span>
                </button>
              )}

              <div className="flex items-center gap-2 pl-2 border-l border-[#1e293b]">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120'}
                  alt={currentUser?.name || 'User'}
                  className="w-9 h-9 rounded-xl object-cover border border-sky-400/40 shadow-sm"
                />
              </div>
            </div>
          </header>

          {/* Page Body View */}
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{children}</main>

          {/* Footer */}
          <footer className="py-3 sm:h-12 bg-[#0b0e14] border-t border-[#1e293b] px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2 sm:gap-4">
              <span>Core v2.4.1</span>
              <span>&bull;</span>
              <span className="text-sky-400 font-bold uppercase">Role: {currentRole.replace('_', ' ')}</span>
              <span>&bull;</span>
              <span>Uptime: 48d 12h 4m</span>
            </div>

            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-slate-200">Privacy</a>
              <a href="#" className="hover:text-slate-200">Terms</a>
              <a href="#" className="hover:text-slate-200">Support</a>
              <span>&copy; 2026 TradeFlow UK</span>
            </div>
          </footer>
        </div>
      </div>

      {/* Live Event Notification Dropdown Drawer */}
      <NotificationDropdown
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onNavigateTab={(tab) => onTabChange(tab)}
      />
    </div>
  );
}
