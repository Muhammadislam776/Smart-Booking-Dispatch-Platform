'use client';

import React, { useState } from 'react';
import { User, UserRole } from '@/types';
import {
  Wrench,
  ShieldCheck,
  Building2,
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
  Code2,
  Database,
  Layers,
  Zap,
  Server,
  Terminal,
} from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: (user: Partial<User>) => void;
  onExploreDemo: () => void;
  isDark?: boolean;
}

export default function AuthPage({ onLoginSuccess, onExploreDemo, isDark = true }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [activeNav, setActiveNav] = useState<'home' | 'how_it_works' | 'features' | 'team' | 'contact'>('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
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
    setSuccessMessage(`Preset filled for ${demoUser.name}. Click "Sign In to Dashboard" to verify.`);
    setShowAuthModal(true);
    setMode('login');
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
          body: JSON.stringify({ name, email, password, role, phone }),
        });

        const data = await res.json();
        setIsLoading(false);

        if (!data.success) {
          setErrorMessage(data.message || 'Registration failed.');
        } else {
          setSuccessMessage(`Account for ${name} registered in MongoDB! Please Sign In with your credentials.`);
          setMode('login');
          setPassword('');
        }
      } catch (err: any) {
        setIsLoading(false);
        setErrorMessage('Failed to connect to registration server.');
      }
    } else {
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

  const devTeam = [
    {
      name: 'Muhammad Abdullah',
      roleBadge: '⚡ Super Admin & Lead Developer',
      bio: 'Full-stack developer specializing in modern web technologies and scalable systems architecture.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250',
      borderColor: 'border-purple-500',
      glowColor: 'shadow-[0_0_30px_rgba(168,85,247,0.4)]',
      badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      portfolioUrl: 'https://muhammadabdullahcv.vercel.app/',
      skills: [
        { icon: '🤖', title: 'AI Consultant' },
        { icon: '🎯', title: 'FYP to Product Specialist' },
        { icon: '📚', title: 'CS Career & Research Mentor' },
        { icon: '💼', title: '12+ Years in Development, Automation & Freelancing' },
        { icon: '🎓', title: 'Lecturer @ COMSATS' },
      ],
    },
    {
      name: 'Muhammad Islam',
      roleBadge: '🎓 Student & MERN Stack Developer',
      bio: 'COMSATS University Islamabad | Full-Stack JavaScript developer passionate about building scalable web applications with modern frameworks.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250',
      borderColor: 'border-sky-500',
      glowColor: 'shadow-[0_0_30px_rgba(56,189,248,0.4)]',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      portfolioUrl: 'https://muhammadislamcv.vercel.app/',
      skills: [
        { icon: '⚛️', title: 'React & Next.js Specialist' },
        { icon: '🔧', title: 'Node.js & Express Backend' },
        { icon: '💾', title: 'MongoDB & Database Design' },
        { icon: '🚀', title: 'Full-Stack Web Development' },
        { icon: '🎨', title: 'UI/UX & Responsive Design' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#080b11] text-white flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Glow Orbs & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.22),transparent)]" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      {/* TOP NAVBAR HEADER (MATCHING SMART CLEARANCE STYLE) */}
      <header className="relative z-20 max-w-7xl mx-auto w-full px-6 py-5 flex items-center justify-between border-b border-[#1e293b]/60 backdrop-blur-md">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveNav('home')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/30 ring-2 ring-sky-400/20">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight text-white">
              TradePro <span className="text-sky-400">360</span>
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-300">
          <button
            onClick={() => setActiveNav('home')}
            className={`hover:text-white transition-colors ${activeNav === 'home' ? 'text-sky-400 font-extrabold' : ''}`}
          >
            How It Works
          </button>
          <button
            onClick={() => setActiveNav('features')}
            className={`hover:text-white transition-colors ${activeNav === 'features' ? 'text-sky-400 font-extrabold' : ''}`}
          >
            Features
          </button>

          <button
            onClick={() => setActiveNav('team')}
            className={`hover:text-white transition-colors ${activeNav === 'team' ? 'text-sky-400 font-extrabold' : ''}`}
          >
            Developer Team
          </button>
          <button
            onClick={() => setActiveNav('contact')}
            className={`hover:text-white transition-colors ${activeNav === 'contact' ? 'text-sky-400 font-extrabold' : ''}`}
          >
            Contact
          </button>
        </nav>

        {/* Right Header Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setMode('signup');
              setShowAuthModal(true);
            }}
            className="px-5 py-2 rounded-full border border-sky-500/40 text-sky-300 hover:bg-sky-500/10 font-bold text-xs transition-all shadow-md"
          >
            Register
          </button>
          <button
            onClick={() => {
              setMode('login');
              setShowAuthModal(true);
            }}
            className="px-5 py-2 rounded-full bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-sky-500/30"
          >
            Login
          </button>
        </div>
      </header>

      {/* MAIN LANDING BODY CONTENT */}
      <main className="relative z-10 max-w-6xl mx-auto w-full px-4 py-10 space-y-16 flex-1">
        {/* HERO SECTION */}
        <div className="text-center space-y-6 max-w-4xl mx-auto pt-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-[#0b0e14] border border-sky-500/30 text-sky-400 text-xs font-black px-4 py-1.5 rounded-full shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>WEIC SMART TRADE SOLUTIONS UK — Official SaaS Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
            Smart Booking & <br />
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              AI Dispatch System for UK Tradesmen
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            Streamline your trade business. Apply for bookings, track live engineer GPS, and receive instant invoices — all in one secure platform.
          </p>

          {/* CTA Buttons (Matching Smart Clearance Hero) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setMode('login');
                setShowAuthModal(true);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-sky-500/30 hover:scale-105 transition-all"
            >
              <span>🔑 Sign In →</span>
            </button>

            <button
              onClick={() => {
                setMode('signup');
                setShowAuthModal(true);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#121824] hover:bg-slate-800 border border-[#1e293b] text-slate-200 font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:border-sky-500/50 transition-all"
            >
              <span>✨ Register</span>
            </button>
          </div>
        </div>

        {/* QUICK ONE-CLICK LOGIN ROLE PRESETS BAR */}
        <div className="rounded-3xl bg-[#121824]/90 border border-[#1e293b] p-6 shadow-2xl space-y-4 max-w-4xl mx-auto backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
            <span className="text-xs font-black uppercase text-sky-400 tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> One-Click Persona Login Portals:
            </span>
            <span className="text-[11px] text-slate-400">Connected to MongoDB Atlas</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* 1. Business Owner */}
            <button
              onClick={() =>
                handleSelectPreset({
                  email: 'sanajavaidkhan44@weic.co.uk',
                  name: 'Sana Khan (Business Owner)',
                  role: 'business_owner',
                })
              }
              className="p-3.5 rounded-2xl bg-[#0b0e14] hover:bg-[#182234] border border-[#1e293b] hover:border-sky-500/60 text-left flex flex-col justify-between gap-2 transition-all hover:scale-105 shadow-md group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30 group-hover:scale-110 transition-all">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-black text-white text-xs">Business Owner</div>
                <div className="text-[10px] text-sky-400 font-bold">Sana Khan</div>
              </div>
            </button>

            {/* 2. Field Engineer */}
            <button
              onClick={() =>
                handleSelectPreset({
                  email: 'david.g@weic.co.uk',
                  name: 'David Gascoigne (Engineer)',
                  role: 'engineer',
                })
              }
              className="p-3.5 rounded-2xl bg-[#0b0e14] hover:bg-[#182234] border border-[#1e293b] hover:border-emerald-500/60 text-left flex flex-col justify-between gap-2 transition-all hover:scale-105 shadow-md group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-all">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <div className="font-black text-white text-xs">Field Engineer</div>
                <div className="text-[10px] text-emerald-400 font-bold">David Gascoigne</div>
              </div>
            </button>

            {/* 3. Customer */}
            <button
              onClick={() =>
                handleSelectPreset({
                  email: 'eleanor.vance@example.co.uk',
                  name: 'Eleanor Vance (Customer)',
                  role: 'customer',
                })
              }
              className="p-3.5 rounded-2xl bg-[#0b0e14] hover:bg-[#182234] border border-[#1e293b] hover:border-purple-500/60 text-left flex flex-col justify-between gap-2 transition-all hover:scale-105 shadow-md group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 group-hover:scale-110 transition-all">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-black text-white text-xs">UK Customer</div>
                <div className="text-[10px] text-purple-400 font-bold">Eleanor Vance</div>
              </div>
            </button>

            {/* 4. Super Admin */}
            <button
              onClick={() =>
                handleSelectPreset({
                  email: 'admin@weic.co.uk',
                  name: 'Super Admin',
                  role: 'super_admin',
                })
              }
              className="p-3.5 rounded-2xl bg-[#0b0e14] hover:bg-[#182234] border border-[#1e293b] hover:border-rose-500/60 text-left flex flex-col justify-between gap-2 transition-all hover:scale-105 shadow-md group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30 group-hover:scale-110 transition-all">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-black text-white text-xs">Super Admin</div>
                <div className="text-[10px] text-rose-400 font-bold">SaaS HQ</div>
              </div>
            </button>
          </div>
        </div>

        {/* DEVELOPER TEAM SECTION (MATCHING REFERENCE DESIGN) */}
        <section className="space-y-8 pt-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase text-purple-400 tracking-wider">ENGINEERING EXCELLENCE</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Meet Our Developer & AI Team</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Architecting TradePro 360 with next-generation real-time telemetry, AI dispatching algorithms, and MongoDB Atlas database security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {devTeam.map((member, idx) => (
              <div
                key={idx}
                className="rounded-[2.5rem] bg-[#0c1220]/95 border border-purple-500/30 p-8 flex flex-col items-center text-center space-y-6 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/60 transition-all hover:-translate-y-2"
              >
                {/* Background Ambient Glow */}
                <div className="absolute -top-16 -left-16 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Circular Avatar with Glowing Ring */}
                <div className="relative">
                  <div className={`w-32 h-32 rounded-full border-4 ${member.borderColor} ${member.glowColor} overflow-hidden p-1 bg-[#0b0e14] shadow-2xl`}>
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Name & Role Badge */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white tracking-tight">{member.name}</h3>
                  <div className={`px-4 py-1.5 rounded-full border ${member.badgeBg} text-xs font-bold inline-flex items-center gap-1.5 shadow-md`}>
                    <span>{member.roleBadge}</span>
                  </div>
                </div>

                {/* Bio Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-medium max-w-md">
                  {member.bio}
                </p>

                {/* Skill List */}
                <div className="w-full space-y-2.5 pt-2 text-left">
                  {member.skills.map((s, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-2xl bg-[#0b0e14]/90 border border-[#1e293b] text-xs font-semibold text-slate-200 flex items-center gap-3 hover:border-purple-500/50 transition-all shadow-md"
                    >
                      <span className="text-base">{s.icon}</span>
                      <span className="text-slate-200">{s.title}</span>
                    </div>
                  ))}
                </div>

                {/* View Portfolio Action Button */}
                <div className="pt-4 w-full">
                  <a
                    href={member.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition-all hover:scale-102"
                  >
                    <span>🔗 View Portfolio</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* AUTHENTICATION MODAL DIALOG */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-scale-in relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#0b0e14] text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="border-b border-[#1e293b] pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                <KeyRound className="w-4 h-4" /> MongoDB Atlas Authentication
              </div>
              <h2 className="text-xl font-black text-white mt-1">
                {mode === 'login' ? 'Sign In to TradePro 360' : 'Create Trade Account'}
              </h2>
            </div>

            {/* Error & Success Toasts */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-2xl text-xs font-bold flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="text-xs font-extrabold text-slate-300 block mb-1.5">FULL NAME</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sana Khan"
                    className="w-full px-4 py-3 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-slate-200 text-xs font-medium outline-none focus:border-sky-500 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-extrabold text-slate-300 block mb-1.5">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sanajavaidkhan44@weic.co.uk"
                  className="w-full px-4 py-3 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-slate-200 text-xs font-medium outline-none focus:border-sky-500 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-300 block mb-1.5">PASSWORD</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-slate-200 text-xs font-medium outline-none focus:border-sky-500 transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black text-xs shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <span>Connecting to MongoDB...</span>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In to Dashboard' : 'Register Account'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-[#1e293b] py-6 px-6 text-center text-xs text-slate-500 font-medium">
        <span>&copy; 2026 TradePro 360 — AI-Powered Smart Booking & Dispatch Platform. All rights reserved.</span>
      </footer>
    </div>
  );
}
