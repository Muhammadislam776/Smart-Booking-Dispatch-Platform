'use client';

import React, { useState } from 'react';
import { User, UserRole } from '@/types';
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  ShieldCheck,
  Building2,
  Wrench,
  UserCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  KeyRound,
  Key,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: Partial<User>) => void;
  isDark?: boolean;
}

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  isDark = false,
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('sanajavaidkhan44@weic.co.uk');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Sana Khan');
  const [role, setRole] = useState<UserRole>('business_owner');
  const [phone, setPhone] = useState('+44 20 7946 0912');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickLogin = (demoUser: { email: string; name: string; role: UserRole }) => {
    setEmail(demoUser.email);
    setName(demoUser.name);
    setRole(demoUser.role);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: `usr_${Date.now()}`,
        email: demoUser.email,
        name: demoUser.name,
        role: demoUser.role,
      });
      onClose();
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: `usr_${Date.now()}`,
        email,
        name: mode === 'signup' ? name : email.split('@')[0],
        role,
        phone,
      });
      onClose();
    }, 800);
  };

  const cardBgClass = isDark
    ? 'bg-slate-900 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900';

  const inputBgClass = isDark
    ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-400'
    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className={`w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 ${cardBgClass}`}>
        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 font-black text-xl shadow-lg">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] text-sky-400 font-black uppercase tracking-wider">
                WEIC Trade Solutions UK
              </span>
              <h2 className="text-xl font-black">
                {mode === 'login' ? 'Account Sign In' : 'Create Trade Account'}
              </h2>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-800/80 p-1 rounded-xl mt-4 text-xs font-bold border border-slate-700/60">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'login' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'signup' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Quick Demo Login Preset Buttons */}
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">
              1-Click Quick Demo Sign In:
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() =>
                  handleQuickLogin({
                    email: 'sanajavaidkhan44@weic.co.uk',
                    name: 'Sana Khan',
                    role: 'business_owner',
                  })
                }
                className={`p-2.5 rounded-xl border font-bold text-left flex items-center gap-2 transition-all ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-4 h-4 text-sky-500 shrink-0" />
                <div className="truncate">
                  <div className="font-extrabold truncate">Sana Khan</div>
                  <div className="text-[9px] text-slate-400">Business Owner</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickLogin({
                    email: 'david.g@weic.co.uk',
                    name: 'David Gascoigne',
                    role: 'engineer',
                  })
                }
                className={`p-2.5 rounded-xl border font-bold text-left flex items-center gap-2 transition-all ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Wrench className="w-4 h-4 text-emerald-500 shrink-0" />
                <div className="truncate">
                  <div className="font-extrabold truncate">David Gascoigne</div>
                  <div className="text-[9px] text-slate-400">Gas Safe Engineer</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickLogin({
                    email: 'eleanor.vance@example.co.uk',
                    name: 'Eleanor Vance',
                    role: 'customer',
                  })
                }
                className={`p-2.5 rounded-xl border font-bold text-left flex items-center gap-2 transition-all ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <UserCheck className="w-4 h-4 text-purple-500 shrink-0" />
                <div className="truncate">
                  <div className="font-extrabold truncate">Eleanor Vance</div>
                  <div className="text-[9px] text-slate-400">UK Customer</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickLogin({
                    email: 'admin@weic.co.uk',
                    name: 'Super Admin',
                    role: 'super_admin',
                  })
                }
                className={`p-2.5 rounded-xl border font-bold text-left flex items-center gap-2 transition-all ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
                <div className="truncate">
                  <div className="font-extrabold truncate">Super Admin</div>
                  <div className="text-[9px] text-slate-400">SaaS Admin</div>
                </div>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-700/50"></div>
            <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-slate-400">
              Or {mode === 'login' ? 'Sign In With Credentials' : 'Register New Account'}
            </span>
            <div className="flex-grow border-t border-slate-700/50"></div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sana Khan"
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-semibold outline-none ${inputBgClass}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Account Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold outline-none ${inputBgClass}`}
                  >
                    <option value="business_owner">Business Owner (Trade Company)</option>
                    <option value="dispatcher">AI Dispatch Controller</option>
                    <option value="engineer">Field Engineer / Technician</option>
                    <option value="customer">Customer / Homeowner</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.co.uk"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-semibold outline-none ${inputBgClass}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-semibold outline-none ${inputBgClass}`}
                />
              </div>
            </div>

            {authError && (
              <p className="text-xs text-rose-500 font-bold">{authError}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <span>{isLoading ? 'Authenticating...' : mode === 'login' ? 'Sign In to TradePro' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
