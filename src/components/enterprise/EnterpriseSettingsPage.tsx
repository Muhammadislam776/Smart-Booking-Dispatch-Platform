'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  MousePointer,
  Sparkles,
  Sliders,
  ShieldCheck,
  Key,
  Volume2,
  CheckCircle2,
  Lock,
  Database,
  Moon,
  Sun,
  Eye,
  RefreshCw,
  ArrowLeft,
  Palette,
} from 'lucide-react';

interface EnterpriseSettingsPageProps {
  onTabChange: (tab: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export default function EnterpriseSettingsPage({ onTabChange, isDark = true, onToggleTheme }: EnterpriseSettingsPageProps) {
  const [cursorStyle, setCursorStyle] = useState<'default' | 'glow' | 'bubble' | 'crosshair'>('glow');
  const [colorScheme, setColorScheme] = useState<'cyan' | 'emerald' | 'purple' | 'amber'>('cyan');
  const [blurRadius, setBlurRadius] = useState<number>(12);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSelectCursorStyle = (style: 'default' | 'glow' | 'bubble' | 'crosshair', name: string) => {
    setCursorStyle(style);
    showToast(`Cursor shape updated to ${name}!`);

    // Dispatch global custom event for CustomCursor follower component
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cursorStyleChange', { detail: style }));
    }
  };

  // INSTANT REAL-TIME GLOBAL THEME RE-COLORING ENGINE
  const handleSelectColorScheme = (scheme: 'cyan' | 'emerald' | 'purple' | 'amber', name: string) => {
    setColorScheme(scheme);
    showToast(`Theme color updated to ${name}! Whole website re-colored.`);

    if (typeof window !== 'undefined') {
      let styleTag = document.getElementById('dynamic-enterprise-theme') as HTMLStyleElement;
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'dynamic-enterprise-theme';
        document.head.appendChild(styleTag);
      }

      let primaryHex = '#0ea5e9';
      let hoverHex = '#0284c7';
      let glowHex = 'rgba(56, 189, 248, 0.4)';

      if (scheme === 'emerald') {
        primaryHex = '#10b981';
        hoverHex = '#059669';
        glowHex = 'rgba(16, 185, 129, 0.4)';
      } else if (scheme === 'purple') {
        primaryHex = '#8b5cf6';
        hoverHex = '#7c3aed';
        glowHex = 'rgba(139, 92, 246, 0.4)';
      } else if (scheme === 'amber') {
        primaryHex = '#f59e0b';
        hoverHex = '#d97706';
        glowHex = 'rgba(245, 158, 11, 0.4)';
      }

      styleTag.innerHTML = `
        :root {
          --theme-primary: ${primaryHex} !important;
          --theme-hover: ${hoverHex} !important;
          --theme-glow: ${glowHex} !important;
        }
        .bg-\\[\\#0ea5e9\\], .bg-sky-500, .bg-sky-600 {
          background-color: ${primaryHex} !important;
        }
        .hover\\:bg-\\[\\#0284c7\\]:hover, .hover\\:bg-sky-400:hover, .hover\\:bg-sky-500:hover {
          background-color: ${hoverHex} !important;
        }
        .text-sky-400, .text-sky-500 {
          color: ${primaryHex} !important;
        }
        .border-sky-500, .border-sky-400, .border-sky-500\\/40, .border-sky-500\\/50 {
          border-color: ${primaryHex} !important;
        }
        .shadow-sky-500\\/20, .shadow-sky-500\\/25 {
          box-shadow: 0 10px 25px -5px ${glowHex} !important;
        }
      `;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2.5 shadow-2xl backdrop-blur-md animate-in fade-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar with Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onTabChange('dashboard')}
            className="p-2.5 bg-[#121824] hover:bg-[#1e293b] text-sky-400 border border-[#1e293b] hover:border-sky-500/50 font-bold rounded-2xl text-xs flex items-center gap-2 transition-all shadow-md hover:scale-105"
            title="Back to Main Executive Dashboard"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Back to Dashboard</span>
          </button>

          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">System Settings & Controls</h2>
            <p className="text-xs text-slate-400 mt-0.5">Personalize your cursor shape, color schemes, and backdrop intensity.</p>
          </div>
        </div>
      </div>

      {/* 1. ENTERPRISE THEME COLOR SCHEME SELECTOR */}
      <div className="p-6 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base text-white">Enterprise Color Scheme (Global Website Theme)</h3>
            <p className="text-xs text-slate-400">Select custom primary theme accent colors that apply throughout the entire website.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Scheme 1: Midnight Cyan */}
          <div
            onClick={() => handleSelectColorScheme('cyan', 'Midnight Cyan')}
            className={`p-4.5 rounded-2xl bg-[#0b0e14] border transition-all cursor-pointer space-y-3 relative ${
              colorScheme === 'cyan'
                ? 'border-sky-500 ring-2 ring-sky-500/30 shadow-lg shadow-sky-500/10'
                : 'border-[#1e293b] hover:border-slate-700'
            }`}
          >
            {colorScheme === 'cyan' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#0ea5e9] shadow-[0_0_10px_#38bdf8]" />
              <div className="w-6 h-6 rounded-full bg-[#0284c7]" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Midnight Cyan</h4>
              <span className="text-[11px] text-slate-400 font-medium block mt-0.5">Primary Electric Cyan</span>
            </div>
          </div>

          {/* Scheme 2: Emerald Electric */}
          <div
            onClick={() => handleSelectColorScheme('emerald', 'Emerald Electric')}
            className={`p-4.5 rounded-2xl bg-[#0b0e14] border transition-all cursor-pointer space-y-3 relative ${
              colorScheme === 'emerald'
                ? 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/10'
                : 'border-[#1e293b] hover:border-slate-700'
            }`}
          >
            {colorScheme === 'emerald' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#10b981] shadow-[0_0_10px_#34d399]" />
              <div className="w-6 h-6 rounded-full bg-[#059669]" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Emerald Electric</h4>
              <span className="text-[11px] text-slate-400 font-medium block mt-0.5">Gas Safe Trade Green</span>
            </div>
          </div>

          {/* Scheme 3: Royal Purple */}
          <div
            onClick={() => handleSelectColorScheme('purple', 'Royal Purple')}
            className={`p-4.5 rounded-2xl bg-[#0b0e14] border transition-all cursor-pointer space-y-3 relative ${
              colorScheme === 'purple'
                ? 'border-purple-500 ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/10'
                : 'border-[#1e293b] hover:border-slate-700'
            }`}
          >
            {colorScheme === 'purple' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#8b5cf6] shadow-[0_0_10px_#a78bfa]" />
              <div className="w-6 h-6 rounded-full bg-[#7c3aed]" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Royal Purple</h4>
              <span className="text-[11px] text-slate-400 font-medium block mt-0.5">Executive SaaS Violet</span>
            </div>
          </div>

          {/* Scheme 4: Amber Gold */}
          <div
            onClick={() => handleSelectColorScheme('amber', 'Amber Gold')}
            className={`p-4.5 rounded-2xl bg-[#0b0e14] border transition-all cursor-pointer space-y-3 relative ${
              colorScheme === 'amber'
                ? 'border-amber-500 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10'
                : 'border-[#1e293b] hover:border-slate-700'
            }`}
          >
            {colorScheme === 'amber' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#f59e0b] shadow-[0_0_10px_#fbbf24]" />
              <div className="w-6 h-6 rounded-full bg-[#d97706]" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Amber Gold</h4>
              <span className="text-[11px] text-slate-400 font-medium block mt-0.5">High Priority Surcharge</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. POINTER TRAIL & CURSOR SETTINGS */}
      <div className="p-6 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
            <MousePointer className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base text-white">Pointer Trail & Cursor settings</h3>
            <p className="text-xs text-slate-400">Select how your cursor moves and glows across the screen.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Option 1: Default System */}
          <div
            onClick={() => handleSelectCursorStyle('default', 'Default System Pointer')}
            className={`p-5 rounded-2xl bg-[#0b0e14] border transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-3 relative ${
              cursorStyle === 'default'
                ? 'border-sky-500 ring-2 ring-sky-500/30 shadow-lg shadow-sky-500/10'
                : 'border-[#1e293b] hover:border-slate-700'
            }`}
          >
            {cursorStyle === 'default' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
              <MousePointer className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Default System</h4>
              <span className="text-[11px] text-slate-400 font-medium block mt-0.5">Classic pointer</span>
            </div>
          </div>

          {/* Option 2: Glow Trail */}
          <div
            onClick={() => handleSelectCursorStyle('glow', 'Glow Trail Halo')}
            className={`p-5 rounded-2xl bg-[#0b0e14] border transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-3 relative ${
              cursorStyle === 'glow'
                ? 'border-sky-500 ring-2 ring-sky-500/30 shadow-lg shadow-sky-500/10'
                : 'border-[#1e293b] hover:border-slate-700'
            }`}
          >
            {cursorStyle === 'glow' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Glow Trail</h4>
              <span className="text-[11px] text-slate-400 font-medium block mt-0.5">Glowing indigo halo</span>
            </div>
          </div>

          {/* Option 3: Glass Bubble */}
          <div
            onClick={() => handleSelectCursorStyle('bubble', 'Glass Bubble Follower')}
            className={`p-5 rounded-2xl bg-[#0b0e14] border transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-3 relative ${
              cursorStyle === 'bubble'
                ? 'border-sky-500 ring-2 ring-sky-500/30 shadow-lg shadow-sky-500/10'
                : 'border-[#1e293b] hover:border-slate-700'
            }`}
          >
            {cursorStyle === 'bubble' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Glass Bubble</h4>
              <span className="text-[11px] text-slate-400 font-medium block mt-0.5">Trailing air bubble</span>
            </div>
          </div>

          {/* Option 4: Retro Crosshair */}
          <div
            onClick={() => handleSelectCursorStyle('crosshair', 'Retro Crosshair Targeter')}
            className={`p-5 rounded-2xl bg-[#0b0e14] border transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-3 relative ${
              cursorStyle === 'crosshair'
                ? 'border-sky-500 ring-2 ring-sky-500/30 shadow-lg shadow-sky-500/10'
                : 'border-[#1e293b] hover:border-slate-700'
            }`}
          >
            {cursorStyle === 'crosshair' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Retro Crosshair</h4>
              <span className="text-[11px] text-slate-400 font-medium block mt-0.5">Tactical UI targeter</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. GLASSMORPHISM INTENSITY */}
      <div className="p-6 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">Glassmorphism Intensity</h3>
              <p className="text-xs text-slate-400">Adjust panel backdrop blur amounts to suit your system graphics speed.</p>
            </div>
          </div>

          <span className="font-mono font-black text-sky-400 text-base">{blurRadius}px</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>Backdrop Blur Radius</span>
            <span className="text-sky-400">{blurRadius}px</span>
          </div>

          <input
            type="range"
            min="4"
            max="24"
            value={blurRadius}
            onChange={(e) => setBlurRadius(parseInt(e.target.value))}
            className="w-full accent-sky-400 cursor-pointer h-2 bg-[#0b0e14] rounded-lg"
          />

          <div className="flex justify-between text-[11px] font-semibold text-slate-400 pt-1">
            <span>Fast Graphics (4px)</span>
            <span>Super Glassmorphic (24px)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
