'use client';

import React, { useState, useEffect } from 'react';
import { Business } from '@/types';
import { X, SlidersHorizontal, Image, Check } from 'lucide-react';

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
  const [phone, setPhone] = useState(business.phone);
  const [email, setEmail] = useState(business.email);

  useEffect(() => {
    // Remove any custom dynamic theme style overrides to restore pristine clean UI
    const themeStyle = document.getElementById('dynamic-enterprise-theme');
    if (themeStyle) {
      themeStyle.remove();
    }
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clean up dynamic style element completely
    const themeStyle = document.getElementById('dynamic-enterprise-theme');
    if (themeStyle) {
      themeStyle.remove();
    }

    onSaveBranding({ name, logo, phone, email });

    // Persist White-Label Branding to MongoDB Atlas
    try {
      await fetch('/api/merchants', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: business.id || 'biz_01',
          name,
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
            <Check className="w-4 h-4" /> Save White-Label Settings (MongoDB Atlas)
          </button>
        </form>
      </div>
    </div>
  );
}
