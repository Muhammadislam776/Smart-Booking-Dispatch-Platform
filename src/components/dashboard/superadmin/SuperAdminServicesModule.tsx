'use client';

import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Zap,
  Plus,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  Flame,
  Search,
  RefreshCw,
  X,
} from 'lucide-react';

export default function SuperAdminServicesModule() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Form State
  const [editingService, setEditingService] = useState<any | null>(null);
  const [serviceName, setServiceName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Plumbing');
  const [serviceBasePrice, setServiceBasePrice] = useState('150');
  const [serviceEmergencySurcharge, setServiceEmergencySurcharge] = useState('50');
  const [serviceVat, setServiceVat] = useState('20%');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const fetchServicesFromMongoDB = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.success && data.services) {
        setServices(data.services);
      }
    } catch (e) {
      console.error('Error fetching services:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServicesFromMongoDB();
  }, []);

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName) return;

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: serviceName,
          category: serviceCategory,
          basePrice: parseFloat(serviceBasePrice) || 150,
          emergencySurcharge: parseFloat(serviceEmergencySurcharge) || 50,
          vatRate: serviceVat,
        }),
      });

      const data = await res.json();
      if (data.success && data.service) {
        setServices([...services, data.service]);
        showToast(`Service "${serviceName}" created & saved to MongoDB Atlas!`);
      }
    } catch (e) {
      console.error('Create service failed:', e);
    } finally {
      setShowAddModal(false);
      setServiceName('');
    }
  };

  const handleEditPricing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setServices(
      services.map((s) =>
        s.id === editingService.id
          ? {
              ...s,
              name: serviceName,
              category: serviceCategory,
              basePrice: parseFloat(serviceBasePrice),
              emergencySurcharge: parseFloat(serviceEmergencySurcharge),
              vatRate: serviceVat,
            }
          : s
      )
    );

    showToast(`Service "${serviceName}" pricing updated in MongoDB Atlas!`);
    setShowEditModal(false);

    try {
      await fetch('/api/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingService.id,
          name: serviceName,
          category: serviceCategory,
          basePrice: parseFloat(serviceBasePrice),
          emergencySurcharge: parseFloat(serviceEmergencySurcharge),
          vatRate: serviceVat,
        }),
      });
    } catch (e) {
      console.error('Update pricing failed:', e);
    }
  };

  const openEditModal = (s: any) => {
    setEditingService(s);
    setServiceName(s.name);
    setServiceCategory(s.category);
    setServiceBasePrice(s.basePrice.toString());
    setServiceEmergencySurcharge((s.emergencySurcharge || 50).toString());
    setServiceVat(s.vatRate || '20%');
    setShowEditModal(true);
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md animate-in fade-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Services & Dynamic Pricing Management
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
              MongoDB Atlas Live
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage trade categories, base rates, emergency callout surcharges, and UK VAT rules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchServicesFromMongoDB}
            className="p-2.5 rounded-xl bg-[#121824] border border-[#1e293b] text-slate-300 hover:text-white transition-all flex items-center gap-2 text-xs font-bold"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh Atlas Services
          </button>

          <button
            onClick={() => {
              setServiceName('');
              setServiceCategory('Plumbing');
              setServiceBasePrice('150');
              setServiceEmergencySurcharge('50');
              setShowAddModal(true);
            }}
            className="px-4 py-2.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/20"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add New Service Category
          </button>
        </div>
      </div>

      {/* Services Table */}
      <div className="p-6 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-4 shadow-2xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="font-bold uppercase tracking-wider text-slate-400 border-b border-[#1e293b]">
            <tr>
              <th className="py-3 px-4">Service Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Base Callout Rate</th>
              <th className="py-3 px-4">Emergency Surcharge</th>
              <th className="py-3 px-4">VAT Rate</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e293b] font-medium text-slate-300">
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-[#0b0e14]/50 transition-colors">
                <td className="py-4 px-4 font-black text-sm text-white">{s.name}</td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-black uppercase">
                    {s.category}
                  </span>
                </td>
                <td className="py-4 px-4 font-black text-emerald-400 text-sm">£{s.basePrice}.00</td>
                <td className="py-4 px-4 text-amber-400 font-bold">+£{s.emergencySurcharge || 50}.00</td>
                <td className="py-4 px-4 font-mono text-slate-400">{s.vatRate || '20%'}</td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => openEditModal(s)}
                    className="px-3 py-1 rounded-lg bg-[#0b0e14] border border-[#1e293b] text-sky-400 hover:text-white font-bold text-xs"
                  >
                    Edit Pricing
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: ADD SERVICE CATEGORY */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateService}
            className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in"
          >
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base text-white">Add New Service Category</h3>
              </div>
              <button type="button" onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Service Title / Name</label>
                <input
                  type="text"
                  required
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="e.g. EV Charging Point Installation"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Category</label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-bold outline-none focus:border-sky-500"
                >
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Heating & Gas">Heating & Gas</option>
                  <option value="HVAC">HVAC</option>
                  <option value="Locksmith">Locksmith</option>
                  <option value="Cleaning">Cleaning</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Base Callout Rate (£)</label>
                  <input
                    type="number"
                    required
                    value={serviceBasePrice}
                    onChange={(e) => setServiceBasePrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Emergency Surcharge (£)</label>
                  <input
                    type="number"
                    required
                    value={serviceEmergencySurcharge}
                    onChange={(e) => setServiceEmergencySurcharge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#0b0e14] text-slate-400 border border-[#1e293b] font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg"
              >
                Save to MongoDB Atlas
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 2: EDIT PRICING */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleEditPricing}
            className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in"
          >
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base text-white">Edit Service Pricing Rules</h3>
              </div>
              <button type="button" onClick={() => setShowEditModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Base Rate (£)</label>
                  <input
                    type="number"
                    required
                    value={serviceBasePrice}
                    onChange={(e) => setServiceBasePrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Emergency Surcharge (£)</label>
                  <input
                    type="number"
                    required
                    value={serviceEmergencySurcharge}
                    onChange={(e) => setServiceEmergencySurcharge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#0b0e14] text-slate-400 border border-[#1e293b] font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg"
              >
                Update in MongoDB Atlas
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
