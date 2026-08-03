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
  MapPin,
  FileText,
  Star,
  Bell,
  Smartphone,
  Shield,
  Lightbulb,
  ExternalLink,
} from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: (user: Partial<User>) => void;
  onExploreDemo: () => void;
  isDark?: boolean;
}

export default function AuthPage({ onLoginSuccess, onExploreDemo, isDark = true }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [activeNav, setActiveNav] = useState<string>('home');
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

  const scrollToSection = (sectionId: string) => {
    setActiveNav(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Pre-fill form fields when clicking preset buttons
  const handleSelectPreset = (demoUser: { email: string; name: string; role: UserRole }) => {
    setEmail(demoUser.email);
    setPassword('password123');
    setRole(demoUser.role);
    setErrorMessage(null);
    setSuccessMessage(`Preset filled for ${demoUser.name}. Click "Sign In to Dashboard" below.`);
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
          setSuccessMessage(`Account for ${name} registered in MongoDB! Please Sign In below with credentials.`);
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
    <div className="min-h-screen bg-[#080b11] text-white flex flex-col justify-between relative overflow-hidden font-sans scroll-smooth">
      {/* Background Glow Orbs & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.25),transparent)]" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      {/* FIXED ALWAYS-VISIBLE TOP NAVBAR HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 border-b border-[#1e293b]/90 backdrop-blur-2xl bg-[#080b11]/95 shadow-2xl shadow-slate-950/90 transition-all duration-300">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/30 ring-2 ring-sky-400/20 group-hover:scale-110 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-white">
                TradePro <span className="text-sky-400">360</span>
              </span>
            </div>
          </div>

          {/* Center Navigation Links with Active Pill Glow Indicator */}
          <nav className="hidden md:flex items-center gap-2 text-xs font-bold">
            {[
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'ideas', label: 'Ideas' },
              { id: 'features', label: 'Features' },
              { id: 'resources', label: 'Resources' },
              { id: 'team', label: 'Team' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeNav === item.id
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50 font-extrabold shadow-[0_0_20px_rgba(56,189,248,0.35)] scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/80 hover:border-sky-500/30 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Header Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setMode('signup');
                setShowAuthModal(true);
              }}
              className="px-5 py-2 rounded-full border border-sky-500/40 text-sky-300 hover:bg-sky-500/20 font-bold text-xs transition-all shadow-md cursor-pointer hover:scale-105 hover:border-sky-400"
            >
              Register
            </button>
            <button
              onClick={() => {
                setMode('login');
                setShowAuthModal(true);
              }}
              className="px-5.5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs transition-all shadow-lg shadow-sky-500/35 cursor-pointer hover:scale-105"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LANDING BODY SECTIONS WITH GENEROUS SPACIOUS MARGINS */}
      <main className="relative z-10 max-w-6xl mx-auto w-full px-4 pt-36 pb-24 space-y-48 sm:space-y-60 flex-1">
        {/* 1. HERO SECTION (#home) */}
        <section id="home" className="text-center space-y-8 max-w-4xl mx-auto pt-4 animate-slide-up scroll-mt-36">
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setMode('login');
                setShowAuthModal(true);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-sky-500/30 hover:scale-105 transition-all cursor-pointer"
            >
              <span>🔑 Sign In →</span>
            </button>

            <button
              onClick={() => {
                setMode('signup');
                setShowAuthModal(true);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#121824] hover:bg-slate-800 border border-[#1e293b] text-slate-200 font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:border-sky-500/50 transition-all cursor-pointer hover:scale-105"
            >
              <span>✨ Register</span>
            </button>
          </div>

          {/* ONE-CLICK ROLE PRESET CARDS */}
          <div className="pt-10">
            <div className="rounded-3xl bg-[#121824]/90 border border-[#1e293b] p-6 shadow-2xl space-y-4 max-w-4xl mx-auto backdrop-blur-xl hover:border-sky-500/40 transition-all">
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
          </div>
        </section>

        {/* 2. HOW IT WORKS SECTION (#how-it-works) */}
        <section id="how-it-works" className="space-y-12 scroll-mt-36 pt-20 sm:pt-28 border-t border-[#1e293b]/60 animate-slide-up">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase text-sky-400 tracking-wider">AUTOMATED WORKFLOW</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">How TradePro 360 Works</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              From customer service booking to live satellite engineer dispatching and instant PDF invoicing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Customer Booking', desc: 'Real-time booking wizard with postcode validation & instant price quotes.', icon: <UserCheck className="w-6 h-6 text-sky-400" /> },
              { step: '02', title: 'AI Smart Dispatch', desc: 'Nearest engineer matching, Gas Safe skill scoring, & route calculations.', icon: <Cpu className="w-6 h-6 text-indigo-400" /> },
              { step: '03', title: 'GPS Live Tracking', desc: 'Live satellite map telemetry, vehicle proximity alerts & ETA updates.', icon: <MapPin className="w-6 h-6 text-emerald-400" /> },
              { step: '04', title: 'Invoice & Payment', desc: 'Automated UK 20% VAT invoices, Screwfix part logger & Stripe checkout.', icon: <FileText className="w-6 h-6 text-purple-400" /> },
            ].map((st, i) => (
              <div
                key={i}
                className="rounded-3xl bg-[#121824] border border-[#1e293b] p-6 space-y-4 shadow-xl hover:border-sky-500/50 transition-all hover:-translate-y-2 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-[#0b0e14] border border-[#1e293b] shadow-md group-hover:scale-110 transition-transform">
                    {st.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-700 group-hover:text-sky-400 transition-colors font-mono">{st.step}</span>
                </div>
                <h3 className="font-black text-base text-white">{st.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. IDEAS SECTION (#ideas - MATCHING REFERENCE SCREENSHOT) */}
        <section id="ideas" className="space-y-12 scroll-mt-36 pt-20 sm:pt-28 border-t border-[#1e293b]/60 animate-slide-up">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase text-amber-400 tracking-wider">CUTTING-EDGE MODULES</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">Institutional Features & Ideas</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Advanced SaaS architecture modules designed to modernize trade field operations across the UK.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Module 1 */}
            <div className="rounded-[2rem] bg-[#0c1220]/95 border border-[#1e293b] p-8 space-y-6 shadow-2xl hover:border-sky-500/50 transition-all hover:-translate-y-2 relative overflow-hidden group">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-black uppercase">
                  AI/ML DISPATCH
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase">
                  PREMIUM
                </span>
              </div>

              <h3 className="text-2xl font-black text-white">AI-Powered Dispatch Desk</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Advanced AI-powered assistant designed to calculate nearest engineer travel times, match Gas Safe/EICR skill certifications, and balance shift workloads.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase">TYPE</span>
                  <div className="font-extrabold text-white">AI Smart Dispatch</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase">IMPACT</span>
                  <div className="font-extrabold text-emerald-400">High Efficiency</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase">STATUS</span>
                  <div className="font-extrabold text-sky-400">Live in Production</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase">RELEASE</span>
                  <div className="font-extrabold text-white">v2.4.1 Active</div>
                </div>
              </div>
            </div>

            {/* Module 2 */}
            <div className="rounded-[2rem] bg-[#0c1220]/95 border border-[#1e293b] p-8 space-y-6 shadow-2xl hover:border-purple-500/50 transition-all hover:-translate-y-2 relative overflow-hidden group">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[10px] font-black uppercase">
                  SUPPLY CHAIN
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[10px] font-black uppercase">
                  LIVE API
                </span>
              </div>

              <h3 className="text-2xl font-black text-white">Screwfix & Plumbase Inventory Sync</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Real-time spare parts logger synchronizing unit prices, stock levels, supplier SKU numbers, and UK 20% VAT calculations straight onto invoices.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase">CATALOG</span>
                  <div className="font-extrabold text-white">5,000+ Trade Parts</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase">VAT CALC</span>
                  <div className="font-extrabold text-purple-400">UK Standard 20%</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase">STATUS</span>
                  <div className="font-extrabold text-emerald-400">Active Database</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase">DATABASE</span>
                  <div className="font-extrabold text-white">MongoDB Atlas</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PLATFORM FEATURES SECTION (#features - MATCHING REFERENCE SCREENSHOT) */}
        <section id="features" className="space-y-12 scroll-mt-36 pt-20 sm:pt-28 border-t border-[#1e293b]/60 animate-slide-up">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase text-sky-400 tracking-wider">ENTERPRISE SUITE</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">Platform Features</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Everything you need to manage your trade business efficiently across the UK.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Secure & Reliable', desc: 'Enterprise-grade security with encrypted submissions and MongoDB Atlas database isolation.', icon: <Shield className="w-6 h-6 text-rose-400" />, glow: 'shadow-rose-500/20' },
              { title: 'Live Telemetry & GPS', desc: 'Real-time satellite GPS tracking with detailed route telemetry and automated arrival alerts.', icon: <MapPin className="w-6 h-6 text-emerald-400" />, glow: 'shadow-emerald-500/20' },
              { title: 'Digital PDF Invoicing', desc: 'Generate instant PDF tax invoices with itemized parts breakdown, UK VAT, and Stripe payment links.', icon: <FileText className="w-6 h-6 text-sky-400" />, glow: 'shadow-sky-500/20' },
              { title: 'Customer Reviews', desc: 'Integrated review collection system with 4.98/5 star rating tracking for certified engineers.', icon: <Star className="w-6 h-6 text-amber-400" />, glow: 'shadow-amber-500/20' },
              { title: 'Mobile & Tablet Ready', desc: 'Fully responsive workstation layout optimized for field engineers on smartphones & tablets.', icon: <Smartphone className="w-6 h-6 text-indigo-400" />, glow: 'shadow-indigo-500/20' },
              { title: 'Smart Live Alerts', desc: 'Real-time live notification stream broadcasting job assignments, ETA delays, and payments.', icon: <Bell className="w-6 h-6 text-purple-400" />, glow: 'shadow-purple-500/20' },
            ].map((ft, i) => (
              <div
                key={i}
                className="rounded-3xl bg-[#121824] border border-[#1e293b] p-6 space-y-4 shadow-xl hover:border-sky-500/50 transition-all hover:-translate-y-2 relative group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-[#0b0e14] border border-[#1e293b] flex items-center justify-center shadow-lg ${ft.glow} group-hover:scale-110 transition-transform`}>
                  {ft.icon}
                </div>
                <h3 className="font-black text-lg text-white">{ft.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{ft.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. RESOURCES SECTION (#resources) */}
        <section id="resources" className="space-y-12 scroll-mt-36 pt-20 sm:pt-28 border-t border-[#1e293b]/60 animate-slide-up">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">CERTIFICATIONS & STANDARDS</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">UK Trade Standards & Compliance</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Pre-integrated compliance forms, Gas Safe registers, and safety audit reports.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-[#121824] border border-[#1e293b] p-6 space-y-3 shadow-xl hover:border-emerald-500/50 transition-all hover:-translate-y-1.5">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
                GAS SAFE REGISTERED
              </span>
              <h3 className="text-lg font-black text-white">CP12 Gas Safety Certificates</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Annual landlord gas safety inspection certificates with instant PDF generation and email delivery.
              </p>
            </div>

            <div className="rounded-3xl bg-[#121824] border border-[#1e293b] p-6 space-y-3 shadow-xl hover:border-sky-500/50 transition-all hover:-translate-y-1.5">
              <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-black uppercase">
                ELECTRICAL 18TH EDITION
              </span>
              <h3 className="text-lg font-black text-white">EICR Electrical Inspection Reports</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                NICEIC / NAPIT compliant electrical installation condition reporting for commercial & domestic sites.
              </p>
            </div>

            <div className="rounded-3xl bg-[#121824] border border-[#1e293b] p-6 space-y-3 shadow-xl hover:border-purple-500/50 transition-all hover:-translate-y-1.5">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[10px] font-black uppercase">
                PLUMBING & HVAC
              </span>
              <h3 className="text-lg font-black text-white">Boiler Performance Audit</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Combustion efficiency calibration logging for eco-boiler systems across UK residential properties.
              </p>
            </div>
          </div>
        </section>

        {/* 6. DEVELOPER TEAM SECTION (#team - MATCHING REFERENCE SCREENSHOT) */}
        <section id="team" className="space-y-12 scroll-mt-36 pt-20 sm:pt-28 border-t border-[#1e293b]/60 animate-slide-up">
          <div className="text-center space-y-3">
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
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer"
                  >
                    <span>🔗 View Portfolio</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. CONTACT & HELP SECTION (#contact - MATCHING REFERENCE SCREENSHOT) */}
        <section id="contact" className="space-y-12 scroll-mt-36 pt-20 sm:pt-28 border-t border-[#1e293b]/60 animate-slide-up">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-black px-4 py-1.5 rounded-full shadow-inner">
              <Mail className="w-4 h-4" /> Get In Touch
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Contact & Technical Support</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Need assistance? We're here to help you optimize your trade business dispatch workflow.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card 1: Email Support */}
            <div className="rounded-[2rem] bg-[#0c1220]/95 border border-[#1e293b] p-6 flex items-center gap-4 shadow-xl hover:border-purple-500/50 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">EMAIL SUPPORT</span>
                <h4 className="font-extrabold text-sm text-white mt-0.5">sanajavaidkhan44@weic.co.uk</h4>
                <p className="text-[11px] text-purple-400 font-medium">Response within 24 hours</p>
              </div>
            </div>

            {/* Card 2: Institutional Support */}
            <div className="rounded-[2rem] bg-[#0c1220]/95 border border-[#1e293b] p-6 flex items-center gap-4 shadow-xl hover:border-sky-500/50 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">SUPPORT HOTLINE</span>
                <h4 className="font-extrabold text-sm text-white mt-0.5">+44 20 7946 0912</h4>
                <p className="text-[11px] text-sky-400 font-medium">Direct line for urgent trade dispatch issues</p>
              </div>
            </div>

            {/* Card 3: Location */}
            <div className="rounded-[2rem] bg-[#0c1220]/95 border border-[#1e293b] p-6 flex items-center gap-4 shadow-xl hover:border-emerald-500/50 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">UK HEADQUARTERS</span>
                <h4 className="font-extrabold text-sm text-white mt-0.5">42 Kensington High Street</h4>
                <p className="text-[11px] text-emerald-400 font-medium">London, W8 4PT, United Kingdom</p>
              </div>
            </div>

            {/* Card 4: Official Portal */}
            <div className="rounded-[2rem] bg-[#0c1220]/95 border border-[#1e293b] p-6 flex items-center gap-4 shadow-xl hover:border-rose-500/50 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30 shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">OFFICIAL SAAS PORTAL</span>
                <h4 className="font-extrabold text-sm text-white mt-0.5">www.tradepro360.co.uk</h4>
                <p className="text-[11px] text-rose-400 font-medium">Official cloud portal & resources</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* AUTHENTICATION MODAL DIALOG */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-scale-in relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#0b0e14] text-slate-400 hover:text-white cursor-pointer"
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
