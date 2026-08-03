'use client';

import React, { useState, useEffect } from 'react';
import { Business } from '@/types';
import {
  Building2,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Users,
  Database,
  ExternalLink,
  MoreVertical,
  Sliders,
  Filter,
  RefreshCw,
  Lock,
  X,
} from 'lucide-react';

interface SuperAdminMerchantsPageProps {
  businesses?: Business[];
  isDark?: boolean;
}

export default function SuperAdminMerchantsPage({ isDark = true }: SuperAdminMerchantsPageProps) {
  const [filterTier, setFilterTier] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Merchant Form state
  const [newMerchantName, setNewMerchantName] = useState('');
  const [newMerchantTier, setNewMerchantTier] = useState('Enterprise (£499/mo)');
  const [newMerchantPostcode, setNewMerchantPostcode] = useState('');
  const [newMerchantRevenue, setNewMerchantRevenue] = useState('15000');
  const [newMerchantEngineers, setNewMerchantEngineers] = useState('5');

  const [merchantsList, setMerchantsList] = useState<any[]>([]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Fetch real merchants from MongoDB Atlas
  const fetchMerchantsFromMongoDB = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/merchants');
      const data = await res.json();
      if (data.success && data.merchants) {
        setMerchantsList(data.merchants);
      }
    } catch (e) {
      console.error('Error fetching merchants from MongoDB Atlas:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchantsFromMongoDB();
  }, []);

  // Update merchant status in MongoDB Atlas
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    setMerchantsList(
      merchantsList.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );

    try {
      await fetch('/api/merchants', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      showToast(`Merchant status updated to ${newStatus.toUpperCase()} in MongoDB Atlas!`);
    } catch (e) {
      showToast('Status updated locally.');
    }
  };

  // Add new merchant to MongoDB Atlas
  const handleCreateMerchant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMerchantName || !newMerchantPostcode) return;

    try {
      const res = await fetch('/api/merchants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newMerchantName,
          tier: newMerchantTier,
          postcode: newMerchantPostcode,
          monthlyRevenue: newMerchantRevenue,
          engineersCount: newMerchantEngineers,
        }),
      });

      const data = await res.json();
      if (data.success && data.merchant) {
        setMerchantsList([data.merchant, ...merchantsList]);
        showToast(`Merchant "${newMerchantName}" saved to MongoDB Atlas!`);
      }
    } catch (e) {
      console.error('Save failed:', e);
    } finally {
      setShowAddModal(false);
      setNewMerchantName('');
      setNewMerchantPostcode('');
    }
  };

  const filteredMerchants = merchantsList.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.postcode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = filterTier === 'all' || m.tier.toLowerCase().includes(filterTier.toLowerCase());
    return matchesSearch && matchesTier;
  });

  const totalRevenue = merchantsList.reduce((acc, m) => acc + (m.monthlyRevenue || 0), 0);
  const totalCommission = merchantsList.reduce((acc, m) => acc + (m.commissionCollected || 0), 0);

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2.5 shadow-2xl backdrop-blur-md animate-in fade-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            SaaS Merchant Directory
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
              MongoDB Atlas Live
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time multi-tenant trade business management saved in MongoDB Atlas cluster.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchMerchantsFromMongoDB}
            className="p-2.5 rounded-xl bg-[#121824] border border-[#1e293b] text-slate-300 hover:text-white transition-all"
            title="Refresh MongoDB Atlas"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/20 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add New Merchant
          </button>
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4.5 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-1 shadow-xl">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">TOTAL MERCHANTS</span>
          <div className="text-2xl font-black text-white">{merchantsList.length} Businesses</div>
          <span className="text-[11px] text-emerald-400 font-bold block">
            {merchantsList.filter((m) => m.status === 'active').length} Active &bull; {merchantsList.filter((m) => m.status === 'suspended').length} Suspended
          </span>
        </div>

        <div className="p-4.5 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-1 shadow-xl">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">SAAS RECURRING (MRR)</span>
          <div className="text-2xl font-black text-emerald-400">£{totalRevenue.toLocaleString()}.00</div>
          <span className="text-[11px] text-slate-400 font-medium block">MongoDB Atlas Synced</span>
        </div>

        <div className="p-4.5 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-1 shadow-xl">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">COMMISSION COLLECTED</span>
          <div className="text-2xl font-black text-sky-400">£{totalCommission.toFixed(2)}</div>
          <span className="text-[11px] text-slate-400 font-medium block">12.5% Platform Rate</span>
        </div>

        <div className="p-4.5 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-1 shadow-xl">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">DATABASE CLUSTER</span>
          <div className="text-2xl font-black text-purple-400">Atlas DB</div>
          <span className="text-[11px] text-emerald-400 font-bold block">Cluster0 Connected</span>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="p-4 rounded-2xl bg-[#121824] border border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search merchant name, postcode, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white text-xs font-semibold outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span>Filter Tier:</span>
          {['all', 'enterprise', 'pro', 'starter'].map((tier) => (
            <button
              key={tier}
              onClick={() => setFilterTier(tier)}
              className={`px-3 py-1.5 rounded-xl font-black uppercase text-[11px] transition-all ${
                filterTier === tier
                  ? 'bg-[#0ea5e9] text-slate-950 shadow-md'
                  : 'bg-[#0b0e14] text-slate-400 border border-[#1e293b] hover:text-white'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* MERCHANTS GRID CARDS */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredMerchants.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-4 shadow-xl hover:border-sky-500/40 transition-all"
          >
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white">{m.name}</h3>
                  <span className="text-[10px] font-mono text-slate-400">
                    Postcode: {m.postcode} &bull; Joined {m.joinedDate}
                  </span>
                </div>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  m.status === 'active'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {m.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  SUBSCRIPTION TIER
                </span>
                <div className="font-extrabold text-white mt-0.5">{m.tier}</div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  MONTHLY REVENUE
                </span>
                <div className="font-extrabold text-emerald-400 mt-0.5">
                  £{(m.monthlyRevenue || 0).toLocaleString()}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  COMMISSION (12.5%)
                </span>
                <div className="font-extrabold text-sky-400 mt-0.5">
                  £{(m.commissionCollected || 0).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1e293b] text-xs">
              <span className="text-slate-400 text-[11px] font-bold">
                Engineers Roster: <span className="text-white font-mono">{m.engineersCount} Active</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(m.id, m.status)}
                  className={`px-3 py-1.5 rounded-xl font-black text-[11px] transition-all ${
                    m.status === 'active'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                  }`}
                >
                  {m.status === 'active' ? 'Suspend Merchant' : 'Activate Merchant'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD NEW MERCHANT MODAL DRAWER */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateMerchant}
            className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in"
          >
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base text-white">Add New Merchant (MongoDB Atlas)</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300">Company / Business Name</label>
                <input
                  type="text"
                  placeholder="e.g. Bristol Plumbing & Boiler Experts"
                  value={newMerchantName}
                  onChange={(e) => setNewMerchantName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white text-xs font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300">UK Postcode</label>
                <input
                  type="text"
                  placeholder="e.g. BS1 4DJ"
                  value={newMerchantPostcode}
                  onChange={(e) => setNewMerchantPostcode(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white text-xs font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300">SaaS Subscription Tier</label>
                <select
                  value={newMerchantTier}
                  onChange={(e) => setNewMerchantTier(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white text-xs font-semibold outline-none focus:border-sky-500"
                >
                  <option value="Enterprise (£499/mo)">Enterprise Tier (£499/mo)</option>
                  <option value="Pro (£199/mo)">Pro Tier (£199/mo)</option>
                  <option value="Starter (£99/mo)">Starter Tier (£99/mo)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-300">Est. Monthly Revenue (£)</label>
                  <input
                    type="number"
                    value={newMerchantRevenue}
                    onChange={(e) => setNewMerchantRevenue(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white text-xs font-semibold outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-300">Engineers Count</label>
                  <input
                    type="number"
                    value={newMerchantEngineers}
                    onChange={(e) => setNewMerchantEngineers(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white text-xs font-semibold outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#0b0e14] text-slate-400 hover:text-white border border-[#1e293b] font-bold text-xs"
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
    </div>
  );
}
