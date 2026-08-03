'use client';

import React, { useState } from 'react';
import { Customer, Business, Booking, Invoice, ChatMessage, Engineer } from '@/types';
import LiveTrackingMap from '@/components/maps/LiveTrackingMap';
import { generateInvoicePDF } from '@/lib/pdfGenerator';
import {
  PhoneCall,
  Calendar,
  Download,
  Upload,
  Send,
  CheckCircle2,
  Clock,
  FileText,
  Star,
  MessageSquare,
  ShieldCheck,
  Navigation,
  X,
  CreditCard,
  Phone,
} from 'lucide-react';

interface CustomerDashboardProps {
  customer: Customer;
  business: Business;
  bookings: Booking[];
  invoices: Invoice[];
  chatMessages: ChatMessage[];
  onSendMessage: (msg: string) => void;
  onPayInvoice: (invId: string) => void;
  onNewBookingClick: () => void;
  isDark?: boolean;
}

export default function CustomerDashboard({
  customer,
  business,
  bookings,
  invoices,
  chatMessages,
  onSendMessage,
  onPayInvoice,
  onNewBookingClick,
  isDark = true,
}: CustomerDashboardProps) {
  const [inputText, setInputText] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showMotionAlert, setShowMotionAlert] = useState(true);
  const [selectedRescheduleDate, setSelectedRescheduleDate] = useState('2026-08-05');
  const [selectedRescheduleTime, setSelectedRescheduleTime] = useState('10:00 - 11:30 AM');

  const activeBooking = bookings[0] || {
    id: 'b1',
    bookingRef: 'TF-99281-UK',
    serviceTitle: 'Boiler Performance Audit & Service',
    serviceCategory: 'Plumbing & Gas',
    scheduledDate: '2026-08-01',
    scheduledTime: '14:15 - 14:30',
    status: 'assigned',
    assignedEngineerId: 'eng_1',
    assignedEngineerName: 'Alex Sterling',
    assignedEngineerPhone: '+44 7911 123456',
    assignedEngineerVehicle: 'WEIC-882 (Ford Transit)',
    etaMins: 12,
  };

  const dummyEngineer: Engineer = {
    id: 'eng_1',
    businessId: 'biz_01',
    name: 'Alex Sterling',
    role: 'engineer',
    email: 'alex@weic.co.uk',
    phone: '+44 7911 123456',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120',
    skills: ['Gas Safe', 'Boiler Systems'],
    certifications: ['Gas Safe Certified #592810'],
    vehicleRegistration: 'WEIC-882',
    isAvailable: false,
    currentLat: 51.5074,
    currentLng: -0.1278,
    rating: 4.98,
    completedJobsCount: 142,
    createdAt: '2026-01-01',
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
      showToast('Message sent to Alex! Saved to MongoDB Atlas database.');
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleDownloadDocument = (fileName: string) => {
    const mockInvoice: Invoice = {
      id: 'inv_doc_01',
      invoiceNumber: 'INV-2026-DOC-882',
      bookingId: activeBooking.id,
      businessId: 'biz_01',
      customerId: customer.id || 'cust_01',
      customerName: customer.name || 'Eleanor Vance',
      customerEmail: customer.email || 'eleanor@vance.co.uk',
      customerAddress: '42 Kensington High Street, London, W8 4PT',
      issueDate: '2026-08-01',
      dueDate: '2026-08-15',
      items: [
        { description: `${activeBooking.serviceTitle} (${fileName})`, quantity: 1, unitPrice: 150.0, amount: 150.0 },
      ],
      subtotal: 150.0,
      vatAmount: 30.0,
      totalAmount: 180.0,
      status: 'paid',
    };

    generateInvoicePDF(mockInvoice, business);
    showToast(`Downloaded official PDF document: ${fileName}`);
  };

  const handleConfirmReschedule = () => {
    setShowRescheduleModal(false);
    showToast(`Appointment successfully rescheduled to ${selectedRescheduleDate} at ${selectedRescheduleTime}!`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2.5 shadow-2xl backdrop-blur-md animate-in fade-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* TWO COLUMN GRID */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (7 cols): LIVE GPS MAP + CHAT + ENGINEER PROFILE */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live GPS Tracking Map */}
          <div className="rounded-3xl bg-[#121824] border border-[#1e293b] overflow-hidden shadow-2xl relative">
            <LiveTrackingMap
              booking={activeBooking as any}
              engineers={[dummyEngineer]}
              height="h-96"
            />

            {/* Proximity Badge overlay */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-[#0b0e14]/90 backdrop-blur-md text-sky-400 border border-sky-500/40 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" /> Live Tracking Engineer Proximity
              </span>
            </div>

            {/* Engineer Distance Tooltip overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="px-4 py-2 rounded-xl bg-[#0b0e14]/95 border border-sky-500/50 text-white font-bold text-xs shadow-2xl flex items-center gap-2 backdrop-blur-md">
                <Navigation className="w-4 h-4 text-sky-400" />
                <span>Alex is 1.2 miles away &bull; 12 mins ETA</span>
              </div>
            </div>
          </div>

          {/* Real-Time Chat Card */}
          <div className="rounded-3xl bg-[#121824] border border-[#1e293b] p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120"
                  alt="Alex Sterling"
                  className="w-10 h-10 rounded-xl object-cover border border-sky-400/40"
                />
                <div>
                  <h3 className="font-black text-sm text-white">Chat with Alex</h3>
                  <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online & Driving
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              <div className="max-w-[80%] p-3.5 rounded-2xl bg-slate-800 text-slate-200 text-xs leading-relaxed space-y-1">
                <div>Hi there! I'm just about to wrap up my previous job. I'm roughly 15 minutes away from your location.</div>
                <div className="text-[10px] text-slate-400 text-right">13:45</div>
              </div>

              <div className="max-w-[80%] ml-auto p-3.5 rounded-2xl bg-sky-950 border border-sky-500/30 text-sky-100 text-xs leading-relaxed space-y-1">
                <div>Perfect, thanks Alex. The side gate is open, so you can head straight to the back where the external unit is.</div>
                <div className="text-[10px] text-sky-300 text-right">13:48</div>
              </div>

              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-1 ${
                    msg.senderRole === 'customer'
                      ? 'ml-auto bg-sky-950 border border-sky-500/30 text-sky-100'
                      : 'bg-slate-800 text-slate-200'
                  }`}
                >
                  <div>{msg.content}</div>
                  <div className="text-[10px] text-slate-400 text-right">{msg.timestamp}</div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message to Alex..."
                className="w-full pl-4 pr-12 py-3 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-slate-200 font-medium text-xs outline-none focus:border-sky-500 transition-all"
              />
              <button type="submit" className="absolute right-2 top-2 p-1.5 rounded-lg bg-[#0ea5e9] text-slate-950 hover:bg-sky-400 transition-colors">
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>

          {/* Engineer Profile Card */}
          <div className="rounded-3xl bg-[#121824] border border-[#1e293b] p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120"
                alt="Alex Sterling"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-400 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-white">Alex Sterling</h3>
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-black uppercase">
                    CERTIFIED
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Senior Systems Engineer &bull; 8 Years Exp.</p>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-black mt-1">
                  <span>★ ★ ★ ★ ★</span>
                  <span className="text-white ml-1">4.98 Rating</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 border-t sm:border-t-0 sm:border-l border-[#1e293b] pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">SUCCESS RATE</span>
                <div className="text-2xl font-black text-sky-400 mt-0.5">99.2%</div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">AVG. ARRIVAL</span>
                <div className="text-2xl font-black text-emerald-400 mt-0.5">-2m Early</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 cols): JOB SUMMARY + DOCUMENTS + MOTION TOAST */}
        <div className="lg:col-span-5 space-y-6">
          {/* Job Summary Card */}
          <div className="rounded-3xl bg-[#121824] border border-[#1e293b] p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-4">
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">Job Summary</h3>
                <span className="text-xs font-mono text-slate-400">Reference: #TF-99281-UK</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-black uppercase">
                ACTIVE
              </span>
            </div>

            {/* Estimated Arrival Banner */}
            <div className="p-4 rounded-2xl bg-[#0b0e14] border border-[#1e293b] flex items-center gap-3">
              <div className="p-3 rounded-xl bg-sky-500/20 text-sky-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">ESTIMATED ARRIVAL</span>
                <div className="text-xl font-black text-white">14:15 – 14:30</div>
              </div>
            </div>

            {/* Service Details */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">SERVICE TYPE</span>
              <h4 className="font-extrabold text-base text-white">Boiler Performance Audit & Service</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Annual maintenance check and efficiency calibration for eco-boiler systems.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => setShowSupportModal(true)}
                className="w-full py-3.5 rounded-2xl bg-[#0ea5e9] hover:bg-[#0284c7] text-slate-950 font-black text-xs shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-102"
              >
                <PhoneCall className="w-4 h-4 stroke-[2.5]" />
                <span>Speak with Support</span>
              </button>

              <button
                onClick={() => setShowRescheduleModal(true)}
                className="w-full py-3.5 rounded-2xl bg-[#0b0e14] hover:bg-slate-900 border border-[#1e293b] text-slate-200 font-bold text-xs transition-all hover:border-sky-500/50"
              >
                Reschedule Appointment
              </button>
            </div>
          </div>

          {/* Job Documents Card */}
          <div className="rounded-3xl bg-[#121824] border border-[#1e293b] p-6 space-y-4 shadow-xl">
            <div>
              <h3 className="text-lg font-black text-white">Job Documents</h3>
              <p className="text-xs text-slate-400 mt-0.5">Pre-arrival checklist and shared photos.</p>
            </div>

            <div className="space-y-2">
              {/* Document 1: Service_Guide.pdf */}
              <div className="p-3.5 rounded-2xl bg-[#0b0e14] border border-[#1e293b] flex items-center justify-between text-xs hover:border-sky-500/50 transition-all">
                <div className="flex items-center gap-2.5 text-slate-200 font-bold">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>Service_Guide.pdf</span>
                </div>
                <button
                  onClick={() => handleDownloadDocument('Service_Guide.pdf')}
                  className="p-2 rounded-xl bg-[#121824] text-sky-400 hover:text-white border border-[#1e293b] transition-all flex items-center gap-1 font-bold text-[11px]"
                  title="Download Service_Guide.pdf"
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </div>

              {/* Document 2: Safety_Report.pdf */}
              <div className="p-3.5 rounded-2xl bg-[#0b0e14] border border-[#1e293b] flex items-center justify-between text-xs hover:border-sky-500/50 transition-all">
                <div className="flex items-center gap-2.5 text-slate-200 font-bold">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>Safety_Report.pdf</span>
                </div>
                <button
                  onClick={() => handleDownloadDocument('Safety_Report.pdf')}
                  className="p-2 rounded-xl bg-[#121824] text-sky-400 hover:text-white border border-[#1e293b] transition-all flex items-center gap-1 font-bold text-[11px]"
                  title="Download Safety_Report.pdf"
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
            </div>

            {/* Live Vehicle Motion Toast Card */}
            {showMotionAlert && (
              <div className="p-4 rounded-2xl bg-sky-950/80 border border-sky-500/50 space-y-2 relative shadow-lg">
                <div className="flex items-center justify-between text-sky-300 font-black text-xs">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-sky-400 animate-pulse" />
                    <span>Alex is moving</span>
                  </div>
                  <button
                    onClick={() => setShowMotionAlert(false)}
                    className="p-1 text-sky-400 hover:text-white transition-colors"
                    title="Dismiss alert"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-sky-200">
                  Update: Vehicle in motion towards your site. ETA: 12 Mins.
                </p>
              </div>
            )}
          </div>

          {/* MY BOOKINGS & SERVICE RECORDS HISTORY CARD */}
          <div className="rounded-3xl bg-[#121824] border border-[#1e293b] p-6 space-y-4 shadow-xl text-white">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div>
                <h3 className="text-lg font-black tracking-tight">My Bookings & Service History ({bookings.length})</h3>
                <p className="text-xs text-slate-400 mt-0.5">All active and previous trade bookings saved in MongoDB Atlas.</p>
              </div>
              <button
                onClick={onNewBookingClick}
                className="px-3.5 py-1.5 bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1 shadow-md"
              >
                + Book New Service
              </button>
            </div>

            <div className="divide-y divide-[#1e293b] max-h-72 overflow-y-auto pr-1">
              {bookings.map((b) => (
                <div key={b.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sky-400 font-bold">#{b.bookingRef}</span>
                      <h4 className="font-bold text-white">{b.serviceTitle}</h4>
                    </div>
                    <p className="text-slate-400 mt-0.5">{b.address}, {b.postcode} &bull; {b.scheduledDate}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
                    <span className="font-mono font-bold text-emerald-400">£{(b.pricing?.total || 150).toFixed(2)}</span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        b.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : b.status === 'assigned' || b.status === 'en_route'
                          ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 1. WORKING RESCHEDULE APPOINTMENT MODAL */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base text-white">Reschedule Appointment</h3>
              </div>
              <button onClick={() => setShowRescheduleModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">Select New Date</label>
                <input
                  type="date"
                  value={selectedRescheduleDate}
                  onChange={(e) => setSelectedRescheduleDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white text-xs font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">Select Arrival Time Window</label>
                <select
                  value={selectedRescheduleTime}
                  onChange={(e) => setSelectedRescheduleTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1e293b] text-white text-xs font-semibold outline-none focus:border-sky-500"
                >
                  <option value="08:00 - 09:30 AM">Morning Slot (08:00 - 09:30 AM)</option>
                  <option value="10:00 - 11:30 AM">Midday Slot (10:00 - 11:30 AM)</option>
                  <option value="14:00 - 15:30 PM">Afternoon Slot (14:00 - 15:30 PM)</option>
                  <option value="16:00 - 17:30 PM">Evening Slot (16:00 - 17:30 PM)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="flex-1 py-3 rounded-xl bg-[#0b0e14] text-slate-400 hover:text-white border border-[#1e293b] font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="flex-1 py-3 rounded-xl bg-[#0ea5e9] hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. WORKING SPEAK WITH SUPPORT MODAL */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121824] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-emerald-400" />
                <h3 className="font-black text-base text-white">UK Trade Support Hotline</h3>
              </div>
              <button onClick={() => setShowSupportModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#0b0e14] border border-[#1e293b] space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-white">24/7 Direct Hotline</h4>
                  <p className="text-xs text-slate-400">+44 20 7946 0912</p>
                </div>
              </div>
              <p className="text-xs text-slate-300">
                Connected to priority UK dispatch agents for urgent booking queries or engineer ETA updates.
              </p>
            </div>

            <div className="flex gap-2">
              <a
                href="tel:+442079460912"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs text-center shadow-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> Dial Hotline Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
