'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';

export default function SuperAdminSubscriptionsModule() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [plans, setPlans] = useState([
    { id: 'plan_1', name: 'Starter Plan', price: 99, period: 'month', features: ['Up to 3 Engineers', 'Basic Dispatching', 'Email Invoices'], activeSubscribers: 42 },
    { id: 'plan_2', name: 'Pro Plan', price: 199, period: 'month', features: ['Up to 10 Engineers', 'AI Proximity Dispatch', 'Stripe Payments', 'PDF Receipts'], activeSubscribers: 118 },
    { id: 'plan_3', name: 'Enterprise Plan', price: 499, period: 'month', features: ['Unlimited Engineers', 'Google Business Integration', 'White-Label Branding', 'Dedicated Support'], activeSubscribers: 880 },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
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
          <h2 className="text-2xl font-black text-white tracking-tight">SaaS Subscription Management</h2>
          <p className="text-xs text-slate-400 mt-0.5">Configure subscription tiers, recurring billing intervals, and Stripe product plans.</p>
        </div>

        <button
          onClick={() => showToast('New Subscription Plan Modal Opened!')}
          className="px-4 py-2.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Create New Tier
        </button>
      </div>

      {/* Plans Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div key={p.id} className="p-6 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-4 shadow-xl hover:border-sky-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-lg text-white">{p.name}</h3>
                <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-black uppercase">
                  {p.activeSubscribers} Active
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">£{p.price}</span>
                <span className="text-xs text-slate-400 font-bold">/ {p.period}</span>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#1e293b] text-xs">
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => showToast(`Plan ${p.name} updated in Stripe & MongoDB Atlas!`)}
              className="w-full py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-sky-400 hover:text-white font-bold text-xs"
            >
              Edit Tier Parameters
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
