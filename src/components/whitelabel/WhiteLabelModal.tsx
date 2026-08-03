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
  const [primaryColor, setPrimaryColor] = useState(business.primaryColor);
  const [phone, setPhone] = useState(business.phone);
  const [email, setEmail] = useState(business.email);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBranding({ name, logo, primaryColor, phone, email });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-sky-400" />
            <h2 className="font-black text-sm">White-Label Branding Customization</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4 text-xs font-semibold text-slate-700">
          <div>
            <label className="block uppercase tracking-wider mb-1">Company Trading Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider mb-1">Brand Logo Image URL</label>
            <input
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider mb-1">Primary Theme Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border border-slate-300"
              />
              <span className="font-mono text-slate-900 font-bold">{primaryColor}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider mb-1">Support Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs outline-none"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider mb-1">Dispatch Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs shadow-md flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" /> Save White-Label Branding Settings
          </button>
        </form>
      </div>
    </div>
  );
}
