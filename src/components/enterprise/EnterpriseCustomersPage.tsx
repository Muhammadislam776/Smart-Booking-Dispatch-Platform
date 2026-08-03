'use client';

import React, { useState } from 'react';
import { Customer } from '@/types';
import {
  Users,
  Search,
  Plus,
  Star,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  X,
  Wrench,
  Clock,
  ShieldCheck,
  Send,
  Building2,
} from 'lucide-react';

interface EnterpriseCustomersPageProps {
  customers: Customer[];
  onTabChange: (tab: string) => void;
}

export default function EnterpriseCustomersPage({ customers, onTabChange }: EnterpriseCustomersPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modals state
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [selectedCustomerForBooking, setSelectedCustomerForBooking] = useState<any | null>(null);
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState<any | null>(null);

  // New Customer Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('+44 20 7946 0512');
  const [newLocation, setNewLocation] = useState('Chelsea, London (SW3 3HA)');

  // Booking Form State
  const [selectedService, setSelectedService] = useState('Boiler Performance Audit & Service');
  const [selectedTime, setSelectedTime] = useState('14:00 - 16:00');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const [customerList, setCustomerList] = useState([
    {
      id: 'cust_1',
      name: 'Eleanor Vance',
      email: 'eleanor.vance@example.co.uk',
      phone: '+44 20 7946 0912',
      location: 'Kensington, London (W8 4PT)',
      address: '14 Kensington Palace Gardens, London',
      totalBookings: 5,
      totalSpent: '£1,450.00',
      rating: 5.0,
      initials: 'EV',
      color: 'bg-indigo-600',
      status: 'Active Client',
    },
    {
      id: 'cust_2',
      name: 'John Harrison',
      email: 'john.harrison@hydratech.co.uk',
      phone: '+44 161 496 0123',
      location: 'Deansgate, Manchester (M1 1AE)',
      address: '88 Deansgate Avenue, Manchester',
      totalBookings: 8,
      totalSpent: '£3,890.00',
      rating: 4.9,
      initials: 'JH',
      color: 'bg-sky-600',
      status: 'VIP Enterprise',
    },
    {
      id: 'cust_3',
      name: 'Maria Kelly',
      email: 'm.kelly@brumlogistics.co.uk',
      phone: '+44 121 496 0456',
      location: 'Jewellery Qtr, Birmingham (B1 1BB)',
      address: '10 Vyse Street, Birmingham',
      totalBookings: 3,
      totalSpent: '£870.00',
      rating: 5.0,
      initials: 'MK',
      color: 'bg-purple-600',
      status: 'Active Client',
    },
    {
      id: 'cust_4',
      name: 'Simon Leigh',
      email: 'simon.l@yorkshireplumb.co.uk',
      phone: '+44 113 496 0789',
      location: 'City Centre, Leeds (LS1 5HD)',
      address: '42 Briggate, Leeds',
      totalBookings: 4,
      totalSpent: '£1,120.00',
      rating: 4.8,
      initials: 'SL',
      color: 'bg-emerald-600',
      status: 'Active Client',
    },
  ]);

  const handleAddCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const initials = newName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const newCust = {
      id: `cust_${Date.now()}`,
      name: newName,
      email: newEmail,
      phone: newPhone,
      location: newLocation,
      address: newLocation,
      totalBookings: 1,
      totalSpent: '£0.00',
      rating: 5.0,
      initials: initials || 'UK',
      color: 'bg-rose-600',
      status: 'Active Client',
    };

    setCustomerList([newCust, ...customerList]);
    setShowAddCustomerModal(false);
    setNewName('');
    setNewEmail('');
    showToast(`New UK customer ${newName} registered successfully!`);
  };

  const handleBookServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerForBooking) return;

    showToast(
      `New trade booking created for ${selectedCustomerForBooking.name} (${selectedService})! Dispatched to AI queue.`
    );
    setSelectedCustomerForBooking(null);
  };

  const filteredCustomers = customerList.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-2xl animate-in fade-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Customer Relationship Management & Property Hub</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage customer profiles, property service records, and billing history.</p>
        </div>

        {/* Working Add New Customer Button */}
        <button
          onClick={() => setShowAddCustomerModal(true)}
          className="px-4 py-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Add New Customer
        </button>
      </div>

      {/* COMPACT KPI METRICS ROW (Reduced Height & Spacing) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">TOTAL REGISTERED CUSTOMERS</span>
          <div className="text-2xl font-black text-sky-400">{customerList.length * 355} Users</div>
          <span className="text-[11px] text-emerald-400 font-medium block">+18 New This Week</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">RETENTION RATE</span>
          <div className="text-2xl font-black text-emerald-400">94.2%</div>
          <span className="text-[11px] text-slate-400 font-medium block">Repeat Trade Bookings</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">AVG SPENT PER CLIENT</span>
          <div className="text-2xl font-black text-amber-400">£1,820</div>
          <span className="text-[11px] text-amber-400 font-medium block">High LTV Accounts</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#121824] border border-[#1e293b] space-y-0.5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">SATISFACTION SCORE</span>
          <div className="text-2xl font-black text-purple-400">98.6%</div>
          <span className="text-[11px] text-slate-400 font-medium block">★ 4.95 Rating Average</span>
        </div>
      </div>

      {/* Customer Directory Table Card */}
      <div className="p-5 rounded-3xl bg-[#121824] border border-[#1e293b] space-y-5 shadow-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search customer name, email, or property location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-slate-200 text-xs font-medium outline-none focus:border-sky-500"
          />
        </div>

        {/* Data Table with Clean Single Line Names & Working Action Buttons */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="font-bold uppercase tracking-wider text-slate-400 border-b border-[#1e293b]">
              <tr>
                <th className="py-3 px-3 min-w-[160px]">Customer Name</th>
                <th className="py-3 px-3">Contact Info</th>
                <th className="py-3 px-3">Property Location</th>
                <th className="py-3 px-3">Total Bookings</th>
                <th className="py-3 px-3">Rating Given</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Total Lifetime Spent</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b] font-medium text-slate-300">
              {filteredCustomers.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCustomerDetails(c)}
                  className="hover:bg-[#0b0e14]/60 cursor-pointer transition-colors"
                >
                  {/* Clean No-Wrap Single Line Customer Name */}
                  <td className="py-3.5 px-3 font-bold whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl ${c.color} text-white font-black flex items-center justify-center text-xs shrink-0 shadow-md`}>
                        {c.initials}
                      </div>
                      <div>
                        <div className="font-black text-sm text-white whitespace-nowrap">{c.name}</div>
                        <div className="text-[10px] text-slate-400 whitespace-nowrap">UK Customer Account</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-200">{c.email}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{c.phone}</div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" /> {c.location}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 font-bold text-sky-400 whitespace-nowrap">{c.totalBookings} Bookings</td>

                  <td className="py-3.5 px-3 font-black text-amber-400 whitespace-nowrap">★ {c.rating}</td>

                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {c.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right font-black text-white text-sm whitespace-nowrap">{c.totalSpent}</td>

                  {/* WORKING BOOK SERVICE BUTTON */}
                  <td className="py-3.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedCustomerForBooking(c)}
                      className="px-3 py-1.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-md whitespace-nowrap"
                    >
                      Book Service
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* WORKING MODAL 1: ADD NEW CUSTOMER MODAL */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base text-white">Register New UK Customer</h3>
              </div>
              <button onClick={() => setShowAddCustomerModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomerSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Sophie Turner"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. sophie.t@example.co.uk"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Property Location & Postcode</label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Chelsea, London (SW3 3HA)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black shadow-lg transition-all"
              >
                Register Customer Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WORKING MODAL 2: BOOK SERVICE FOR CUSTOMER MODAL */}
      {selectedCustomerForBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base text-white">Book Trade Service for {selectedCustomerForBooking.name}</h3>
              </div>
              <button onClick={() => setSelectedCustomerForBooking(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookServiceSubmit} className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#0b0e14] border border-[#1e293b] space-y-1">
                <div className="font-bold text-white">{selectedCustomerForBooking.name}</div>
                <div className="text-[11px] text-slate-400">{selectedCustomerForBooking.location} &bull; {selectedCustomerForBooking.phone}</div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Trade Service Category</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-bold outline-none focus:border-sky-500"
                >
                  <option value="Boiler Performance Audit & Service">Boiler Performance Audit & Service (£180.00)</option>
                  <option value="18th Edition Fuse Box Replacement">18th Edition Fuse Box Replacement (£380.00)</option>
                  <option value="Ultion 3* Anti-Snap Lock Fitting">Ultion 3* Anti-Snap Lock Fitting (£145.00)</option>
                  <option value="Commercial AC Servicing">Commercial AC Servicing (£290.00)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Time Window</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white font-bold outline-none focus:border-sky-500"
                >
                  <option value="09:00 - 11:00">09:00 - 11:00 (Morning)</option>
                  <option value="14:00 - 16:00">14:00 - 16:00 (Afternoon)</option>
                  <option value="24/7 Emergency Immediate">24/7 Emergency Immediate</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black shadow-lg transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" /> Create & Dispatch Trade Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WORKING MODAL 3: CUSTOMER DETAILS MODAL DRAWER */}
      {selectedCustomerDetails && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div>
                <h3 className="font-black text-lg text-white">{selectedCustomerDetails.name}</h3>
                <span className="text-xs text-sky-400 font-bold">{selectedCustomerDetails.status}</span>
              </div>
              <button onClick={() => setSelectedCustomerDetails(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#0b0e14] border border-[#1e293b] space-y-2">
                <div className="text-slate-300 font-bold">Email: {selectedCustomerDetails.email}</div>
                <div className="text-slate-300 font-bold">Phone: {selectedCustomerDetails.phone}</div>
                <div className="text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> {selectedCustomerDetails.address}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b0e14] border border-[#1e293b] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Lifetime Spent</span>
                  <div className="text-xl font-black text-emerald-400">{selectedCustomerDetails.totalSpent}</div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Total Bookings</span>
                  <div className="text-xl font-black text-sky-400">{selectedCustomerDetails.totalBookings} Bookings</div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCustomerForBooking(selectedCustomerDetails);
                  setSelectedCustomerDetails(null);
                }}
                className="w-full py-3 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg"
              >
                <Wrench className="w-4 h-4 stroke-[2.5]" /> Book Trade Service Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
