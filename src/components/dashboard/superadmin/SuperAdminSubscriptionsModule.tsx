'use client';

import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Plus,
  DollarSign,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  Sliders,
  X,
} from 'lucide-react';

export default function SuperAdminSubscriptionsModule() {
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Form State
  const [editingPlan, setEditingPlan] = useState<any | null>(null);
  const [planName, setPlanName] = useState('');
  const [planPrice, setPlanPrice] = useState('199');
  const [planFeatures, setPlanFeatures] = useState('Up to 10 Engineers, AI Dispatch, Stripe Payments');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const fetchPlansFromMongoDB = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/subscription-plans');
      const data = await res.json();
      if (data.success && data.plans) {
        setPlans(data.plans);
      }
    } catch (e) {
      console.error('Error fetching plans:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlansFromMongoDB();
  }, []);

  const handleCreateTier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!planName) return;

    const feats = planFeatures.split(',').map((f) => f.trim());

    try {
      const res = await fetch('/api/subscription-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: planName,
          price: parseFloat(planPrice) || 199,
          period: 'month',
          features: feats,
          activeSubscribers: 0,
        }),
      });

      const data = await res.json();
      if (data.success && data.plan) {
        setPlans([...plans, data.plan]);
        showToast(`New tier "${planName}" created & saved to MongoDB Atlas!`);
      }
    } catch (e) {
      console.error('Create tier failed:', e);
    } finally {
      setShowCreateModal(false);
      setPlanName('');
    }
  };

  const handleEditTier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    const feats = planFeatures.split(',').map((f) => f.trim());

    setPlans(
      plans.map((p) =>
        p.id === editingPlan.id
          ? { ...p, name: planName, price: parseFloat(planPrice), features: feats }
          : p
      )
    );

    showToast(`Tier "${planName}" updated in MongoDB Atlas!`);
    setShowEditModal(false);

    try {
      await fetch('/api/subscription-plans', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingPlan.id,
          name: planName,
          price: parseFloat(planPrice),
          features: feats,
        }),
      });
    } catch (e) {
      console.error('Update tier failed:', e);
    }
  };

  const openEditModal = (p: any) => {
    setEditingPlan(p);
    setPlanName(p.name);
    setPlanPrice(p.price.toString());
    setPlanFeatures(Array.isArray(p.features) ? p.features.join(', ') : p.features);
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
            SaaS Subscription Management
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
              MongoDB Atlas Live
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure subscription tiers, recurring billing intervals, and Stripe product plans.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchPlansFromMongoDB}
            className="p-2.5 rounded-xl bg-[#121824] border border-[#1e293b] text-slate-300 hover:text-white transition-all flex items-center gap-2 text-xs font-bold"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh Atlas Plans
          </button>

          <button
            onClick={() => {
              setPlanName('');
              setPlanPrice('199');
              setPlanFeatures('Up to 10 Engineers, AI Dispatch, Stripe Payments');
              setShowCreateModal(true);
            }}
            className="px-4 py-2.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/20"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Create New Tier
          </button>
        </div>
      </div>

      {/* Plans Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div
            key={p.id}
            className="p-6 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-4 shadow-xl hover:border-sky-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-lg text-white">{p.name}</h3>
                <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-black uppercase">
                  {p.activeSubscribers || 0} Active
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">£{p.price}</span>
                <span className="text-xs text-slate-400 font-bold">/ {p.period || 'month'}</span>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#1e293b] text-xs">
                {Array.isArray(p.features) &&
                  p.features.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
              </div>
            </div>

            <button
              onClick={() => openEditModal(p)}
              className="w-full py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-sky-400 hover:text-white font-bold text-xs"
            >
              Edit Tier Parameters
            </button>
          </div>
        ))}
      </div>

      {/* MODAL 1: CREATE TIER */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateTier}
            className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in"
          >
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base text-white">Create New SaaS Tier</h3>
              </div>
              <button type="button" onClick={() => setShowCreateModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Tier Name</label>
                <input
                  type="text"
                  required
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="e.g. Agency Premier Plan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Monthly Price (£)</label>
                <input
                  type="number"
                  required
                  value={planPrice}
                  onChange={(e) => setPlanPrice(e.target.value)}
                  placeholder="299"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Features (comma separated)</label>
                <input
                  type="text"
                  required
                  value={planFeatures}
                  onChange={(e) => setPlanFeatures(e.target.value)}
                  placeholder="Feature 1, Feature 2, Feature 3"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
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

      {/* MODAL 2: EDIT TIER PARAMETERS */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleEditTier}
            className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in"
          >
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base text-white">Edit Tier Parameters</h3>
              </div>
              <button type="button" onClick={() => setShowEditModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Tier Name</label>
                <input
                  type="text"
                  required
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Monthly Price (£)</label>
                <input
                  type="number"
                  required
                  value={planPrice}
                  onChange={(e) => setPlanPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Features (comma separated)</label>
                <input
                  type="text"
                  required
                  value={planFeatures}
                  onChange={(e) => setPlanFeatures(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
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
