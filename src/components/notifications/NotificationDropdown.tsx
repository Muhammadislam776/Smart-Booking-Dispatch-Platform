'use client';

import React, { useState, useEffect } from 'react';
import { NotificationItem } from '@/types';
import { mockNotifications } from '@/lib/mockData';
import {
  Bell,
  X,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Clock,
  ExternalLink,
  RefreshCw,
  Zap,
} from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
}

export default function NotificationDropdown({ isOpen, onClose, onNavigateTab }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch real notifications from MongoDB Atlas
  const fetchLiveNotifications = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      if (data.success && data.notifications && data.notifications.length > 0) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.log('Using mock notifications fallback');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLiveNotifications();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div className="w-full max-w-md bg-[#121824] border-l border-[#1e293b] h-full flex flex-col justify-between p-6 shadow-2xl space-y-4">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-white tracking-tight">Live Event Stream</h3>
              <p className="text-[11px] text-slate-400">MongoDB Atlas Connected Notifications</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLiveNotifications}
              className="p-1.5 rounded-lg bg-[#0b0e14] text-slate-400 hover:text-white"
              title="Refresh Notifications"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button onClick={onClose} className="p-1.5 rounded-lg bg-[#0b0e14] text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between text-xs border-b border-[#1e293b] pb-3">
          <span className="font-bold text-slate-300">
            Unread Notifications: <span className="text-sky-400 font-mono font-black">{unreadCount}</span>
          </span>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-sky-400 hover:text-sky-300 font-bold transition-all"
            >
              Mark All Read
            </button>
          )}
        </div>

        {/* Notification Feed Stream */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onClose();
                onNavigateTab('jobs');
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 relative ${
                n.read
                  ? 'bg-[#0b0e14]/60 border-[#1e293b] opacity-80'
                  : 'bg-[#0b0e14] border-sky-500/40 ring-1 ring-sky-500/20'
              }`}
            >
              {!n.read && (
                <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
              )}

              <div className="flex items-center gap-2">
                {n.type === 'dispatch' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                ) : n.type === 'booking' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Info className="w-4 h-4 text-sky-400 shrink-0" />
                )}

                <h4 className="font-black text-xs text-white">{n.title}</h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pl-6">{n.message}</p>

              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 pl-6">
                <span>{n.timestamp}</span>
                <span className="text-sky-400 font-bold flex items-center gap-1">
                  View Details <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#1e293b]">
          <button
            onClick={() => {
              onClose();
              onNavigateTab('jobs');
            }}
            className="w-full py-2.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg"
          >
            <Zap className="w-4 h-4" /> Open Full Jobs Matrix
          </button>
        </div>
      </div>
    </div>
  );
}
