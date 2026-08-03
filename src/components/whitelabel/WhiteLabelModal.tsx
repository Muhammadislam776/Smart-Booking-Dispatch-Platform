'use client';

import React, { useState, useRef } from 'react';
import { Business } from '@/types';
import { X, SlidersHorizontal, Image as ImageIcon, Check, Upload, Trash2 } from 'lucide-react';

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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Direct Photo Upload via FileReader (Base64 Data URL)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogo(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    onSaveBranding({ name, logo, phone, email });

    // Persist Settings & Logo to MongoDB Atlas
    try {
      await fetch('/api/merchants', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: business.id || 'biz_01',
          name,
          logo,
        }),
      });
    } catch (err) {
      console.error('Settings save to MongoDB Atlas failed:', err);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121824] rounded-3xl shadow-2xl border border-[#1e293b] w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 text-white">
        <div className="bg-[#0b0e14] text-white p-6 flex items-center justify-between border-b border-[#1e293b]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-sky-400" />
            <h2 className="font-black text-base tracking-tight">Company & Brand Settings</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4 text-xs font-semibold text-slate-300">
          {/* Brand Photo Direct Upload Section */}
          <div className="p-4 rounded-2xl bg-[#0b0e14] border border-[#1e293b] space-y-3">
            <label className="block uppercase tracking-wider text-slate-400 text-[10px] font-black">
              Brand Logo / Company Photo
            </label>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#121824] border-2 border-sky-500/40 overflow-hidden flex items-center justify-center shrink-0 shadow-md">
                {logo ? (
                  <img src={logo} alt="Brand Logo Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-500" />
                )}
              </div>

              <div className="space-y-2 flex-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 hover:bg-sky-500/30 font-bold text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Upload className="w-3.5 h-3.5" /> Upload Photo Direct
                  </button>

                  {logo && (
                    <button
                      type="button"
                      onClick={() => setLogo('')}
                      className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all"
                      title="Remove Logo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <p className="text-[10px] text-slate-400 font-normal">
                  Upload image directly from your computer (PNG, JPG, SVG).
                </p>
              </div>
            </div>

            {/* Optional URL Input Fallback */}
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">Or paste Image URL:</label>
              <input
                type="text"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl bg-[#121824] border border-[#1e293b] font-mono text-white text-xs outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider mb-1 text-slate-400 text-[10px] font-bold">Company Trading Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <Check className="w-4 h-4" /> Save Settings (MongoDB Atlas)
          </button>
        </form>
      </div>
    </div>
  );
}
