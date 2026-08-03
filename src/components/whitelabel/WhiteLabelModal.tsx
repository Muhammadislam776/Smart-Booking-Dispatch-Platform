'use client';

import React, { useState } from 'react';
import { Business } from '@/types';
import { X, SlidersHorizontal, Image, Palette, Check } from 'lucide-react';

interface WhiteLabelModalProps {
  business: Business;
  onClose: () => void;
  onSaveBranding: (updated: Partial<Business>) => void;
}

export default function WhiteLabelModal({
  business,
  onClose,
  onSaveBranding,
}: WhiteLabelModalProps) {
  const [name, setName] = useState(business.name);
  const [logo, setLogo] = useState(business.logo);
  const [primaryColor, setPrimaryColor] = useState(business.primaryColor || '#0ea5e9');
  const [phone, setPhone] = useState(business.phone);
  const [email, setEmail] = useState(business.email);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dynamically inject white-label theme primary color into document.head
    let themeStyle = document.getElementById('dynamic-enterprise-theme');
    if (!themeStyle) {
      themeStyle = document.createElement('style');
      themeStyle.id = 'dynamic-enterprise-theme';
      document.head.appendChild(themeStyle);
    }
    themeStyle.innerHTML = `
      .bg-\\[\\#0ea5e9\\], .bg-sky-600, .bg-sky-500 { background-color: ${primaryColor} !important; }
      .text-sky-400, .text-sky-500, .text-sky-600 { color: ${primaryColor} !important; }
      .border-sky-500, .border-sky-600 { border-color: ${primaryColor} !important; }
    `;

    onSaveBranding({ name, logo, primaryColor, phone, email });

    // Persist White-Label Branding to MongoDB Atlas
    try {
      await fetch('/api/merchants', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: business.id || 'biz_01',
          name,
          primaryColor,
        }),
      });
    } catch (err) {
      console.error('Branding save to MongoDB Atlas failed:', err);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#121824] rounded-3xl shadow-2xl border border-[#1e293b] w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 text-white">
        <div className="bg-[#0b0e14] text-white p-6 flex items-center justify-between border-b border-[#1e293b]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-sky-400" />
            <h2 className="font-black text-sm">White-Label Branding Customization</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4 text-xs font-semibold text-slate-300">
          <div>
            <label className="block uppercase tracking-wider mb-1 text-slate-400 text-[10px] font-bold">Company Trading Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] font-bold text-white text-xs outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider mb-1 text-slate-400 text-[10px] font-bold">Brand Logo Image URL</label>
            <input
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] font-bold text-white text-xs outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider mb-1 text-slate-400 text-[10px] font-bold">Primary Theme Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border border-[#1e293b] bg-transparent"
              />
              <span className="font-mono text-sky-400 font-bold">{primaryColor}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider mb-1 text-slate-400 text-[10px] font-bold">Support Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] font-bold text-white text-xs outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider mb-1 text-slate-400 text-[10px] font-bold">Dispatch Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] font-bold text-white text-xs outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-xl bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all"
          >
            <Check className="w-4 h-4" /> Save White-Label Settings (MongoDB Atlas & Dynamic Theme)
          </button>
        </form>
      </div>
    </div>
  );
}
