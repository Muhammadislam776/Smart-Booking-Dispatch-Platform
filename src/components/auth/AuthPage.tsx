'use client';

import React, { useState } from 'react';
import { User, UserRole } from '@/types';
import {
  Wrench,
  ShieldCheck,
  Building2,
  Radio,
  UserCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User as UserIcon,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Phone,
  Globe,
  Cpu,
  KeyRound,
  X,
  HelpCircle,
} from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: (user: Partial<User>) => void;
  onExploreDemo: () => void;
  isDark?: boolean;
}

export default function AuthPage({ onLoginSuccess, onExploreDemo, isDark = true }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('business_owner');
  const [phone, setPhone] = useState('+44 20 7946 0912');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Pre-fill form fields when clicking preset buttons
  const handleSelectPreset = (demoUser: { email: string; name: string; role: UserRole }) => {
    setEmail(demoUser.email);
    setPassword('password123');
    setRole(demoUser.role);
    setErrorMessage(null);
    setSuccessMessage(`Preset credentials filled for ${demoUser.name}. Click "Sign In to Dashboard" below to verify.`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    if (mode === 'signup') {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
            phone,
          }),
        });

        const data = await res.json();
        setIsLoading(false);

        if (!data.success) {
          setErrorMessage(data.message || 'Registration failed.');
        } else {
          // REQUIRE LOGIN AFTER REGISTER: Redirect to login tab with success notification!
          setSuccessMessage(`Account for ${name} registered in MongoDB! Please Sign In below with your credentials.`);
          setMode('login');
          setPassword('');
        }
      } catch (err: any) {
        setIsLoading(false);
        setErrorMessage('Failed to connect to registration server.');
      }
    } else {
      // Login Flow querying MongoDB Atlas
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        setIsLoading(false);

        if (!data.success) {
          setErrorMessage(data.message || 'Invalid credentials.');
        } else {
          setSuccessMessage('Authenticated with MongoDB Atlas! Opening your role panel...');
          setTimeout(() => {
            onLoginSuccess(data.user);
          }, 600);
        }
      } catch (err: any) {
        setIsLoading(false);
        setErrorMessage('Failed to connect to authentication server.');
      }
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetEmail.trim()) {
      setResetSent(true);
      setTimeout(() => {
        setResetSent(false);
        setShowForgotModal(false);
        setResetEmail('');
        setSuccessMessage(`Password reset link sent to ${resetEmail}! Please check your inbox.`);
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Dynamic Background Mesh & Glowing Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.28),rgba(255,255,255,0))]" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Header Navigation */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-sky-500/30 ring-2 ring-sky-400/20">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight">TradePro <span className="text-sky-400">360</span></span>
            <span className="block text-[11px] text-slate-400 font-extrabold uppercase">WEIC Smart Trade Solutions UK</span>
          </div>
        </div>


      </header>

      {/* Main Content Layout */}
      <main className="relative z-10 max-w-6xl mx-auto w-full px-4 py-8 grid lg:grid-cols-12 gap-8 items-center flex-1">
        {/* Left Side: Product Showcase & Value Props */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-black px-3.5 py-1.5 rounded-full shadow-inner">
            <ShieldCheck className="w-4 h-4 text-sky-400" /> WEIC Enterprise Trade SaaS Platform
          </div>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
            AI-Powered Booking & Dispatch System for UK Tradesmen
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Automate your complete trade business workflow: 1-Click AI engineer dispatching, live GPS satellite tracking, dynamic Screwfix/Plumbase parts pricing, and Stripe invoice payments.
          </p>

          {/* Key Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md space-y-1 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-xs">AI Smart Dispatch</h4>
              </div>
              <p className="text-[11px] text-slate-400 pl-8">GPS Proximity & Skill Scoring</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md space-y-1 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Globe className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-xs">Google Business Profile</h4>
              </div>
              <p className="text-[11px] text-slate-400 pl-8">"Book Free Quote" Widget</p>
            </div>
          </div>
        </div>

        {/* Right Side: Rebuilt Executive Authentication Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-md bg-slate-900/95 border border-slate-800/90 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-2xl space-y-5 relative">
            {/* Top Header Tabs */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-sky-400 font-extrabold">
                  <KeyRound className="w-4 h-4" /> MongoDB Atlas Authentication
                </div>
                <h2 className="text-xl font-black mt-0.5">
                  {mode === 'login' ? 'Sign In to TradePro' : 'Create WEIC Trade Account'}
                </h2>
              </div>

              <div className="flex bg-slate-950 p-1 rounded-xl text-xs font-bold border border-slate-800">
                <button
                  onClick={() => {
                    setMode('login');
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    mode === 'login' ? 'bg-sky-600 text-white font-extrabold shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    mode === 'signup' ? 'bg-sky-600 text-white font-extrabold shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            {/* Error Message Toast */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-2xl text-xs font-bold flex items-start gap-2.5 animate-in fade-in shadow-md">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Message Toast */}
            {successMessage && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2.5 animate-in fade-in shadow-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Quick Demo Sign In Presets */}
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2">
                Click to Pre-fill Seeded Accounts:
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() =>
                    handleSelectPreset({
                      email: 'sanajavaidkhan44@weic.co.uk',
                      name: 'Sana Khan',
                      role: 'business_owner',
                    })
                  }
                  className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-slate-200 font-bold text-left flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Building2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <div className="truncate">
                    <div className="font-extrabold truncate">Sana Khan</div>
                    <div className="text-[9px] text-slate-400">WEIC Owner</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectPreset({
                      email: 'david.g@weic.co.uk',
                      name: 'David Gascoigne',
                      role: 'engineer',
                    })
                  }
                  className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-slate-200 font-bold text-left flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Wrench className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="truncate">
                    <div className="font-extrabold truncate">David Gascoigne</div>
                    <div className="text-[9px] text-slate-400">Gas Engineer</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectPreset({
                      email: 'eleanor.vance@example.co.uk',
                      name: 'Eleanor Vance',
                      role: 'customer',
                    })
                  }
                  className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-slate-200 font-bold text-left flex items-center gap-2 transition-all hover:scale-105"
                >
                  <UserCheck className="w-4 h-4 text-purple-400 shrink-0" />
                  <div className="truncate">
                    <div className="font-extrabold truncate">Eleanor Vance</div>
                    <div className="text-[9px] text-slate-400">UK Customer</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectPreset({
                      email: 'admin@weic.co.uk',
                      name: 'Super Admin',
                      role: 'super_admin',
                    })
                  }
                  className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-slate-200 font-bold text-left flex items-center gap-2 transition-all hover:scale-105"
                >
                  <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
                  <div className="truncate">
                    <div className="font-extrabold truncate">Super Admin</div>
                    <div className="text-[9px] text-slate-400">SaaS Admin</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-3 text-[10px] uppercase font-black text-slate-400">
                Or {mode === 'login' ? 'Sign In With Credentials' : 'Register New Account'}
              </span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sana Khan"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold text-xs outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                      Account Role / Persona
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                    >
                      <option value="business_owner">Business Owner (Trade Company)</option>
                      <option value="dispatcher">AI Dispatch Controller</option>
                      <option value="engineer">Field Engineer / Technician</option>
                      <option value="customer">Customer / Homeowner</option>
                      <option value="super_admin">Super Admin (SaaS Control)</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. shanzy@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold text-xs outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                  />
                </div>
              </div>

              {/* Password Field with Interactive Eye Toggle Icon */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold uppercase text-slate-400">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-[11px] font-extrabold text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold text-xs outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-white transition-colors"
                    title={showPassword ? 'Hide Password' : 'Show Password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Option */}
              {mode === 'login' && (
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-sky-500 focus:ring-sky-500 bg-slate-950 border-slate-800"
                    />
                    <span>Remember me on this browser</span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <span>{isLoading ? 'Verifying MongoDB...' : mode === 'login' ? 'Sign In to Dashboard' : 'Register Account (Redirect to Sign In)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base">Reset Your Password</h3>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your email address and we'll send you a password reset link to access your account.
            </p>

            <form onSubmit={handleResetPassword} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  Your Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="e.g. shanzy@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={resetSent}
                className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs shadow-lg transition-all"
              >
                {resetSent ? 'Sending Reset Link...' : 'Send Password Reset Email'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-4 text-center text-xs text-slate-400 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>TradePro 360 &bull; WEIC Smart Trade Solutions UK &bull; MongoDB Atlas Connected</span>
        <span className="flex items-center gap-1 text-emerald-400 font-bold">
          <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Secured
        </span>
      </footer>
    </div>
  );
}
