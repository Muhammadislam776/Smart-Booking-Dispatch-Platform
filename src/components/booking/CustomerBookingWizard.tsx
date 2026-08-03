'use client';

import React, { useState } from 'react';
import { Business, ServiceItem, Booking, PricingBreakdown } from '@/types';
import { mockUKTradeParts, TradePart } from '@/lib/partsCatalog';
import { calculateBookingPrice } from '@/lib/pricingEngine';
import {
  Wrench,
  Zap,
  Lock,
  Wind,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Camera,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Tag,
  ShieldCheck,
  CreditCard,
  Package,
  Plus,
  Trash2,
  ShoppingBag,
} from 'lucide-react';

interface CustomerBookingWizardProps {
  business: Business;
  services: ServiceItem[];
  initialPostcode?: string;
  onCompleteBooking: (newBooking: Booking) => void;
  isDark?: boolean;
}

export default function CustomerBookingWizard({
  business,
  services,
  initialPostcode = 'W8 4PT',
  onCompleteBooking,
  isDark = false,
}: CustomerBookingWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<ServiceItem>(services[0]);
  const [customerName, setCustomerName] = useState('Eleanor Vance');
  const [customerEmail, setCustomerEmail] = useState('eleanor.vance@example.co.uk');
  const [customerPhone, setCustomerPhone] = useState('+44 7890 123456');
  const [address, setAddress] = useState('42 Kensington High Street, London');
  const [postcode, setPostcode] = useState(initialPostcode);
  const [issueDescription, setIssueDescription] = useState(
    'Worcester Bosch boiler displaying Error EA (no spark). Radiators freezing cold.'
  );
  const [scheduledDate, setScheduledDate] = useState('2026-08-01');
  const [scheduledTime, setScheduledTime] = useState('09:00 AM');
  const [isEmergency, setIsEmergency] = useState(true);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string[]>([]);
  const [selectedParts, setSelectedParts] = useState<TradePart[]>([]);

  const totalPartsCost = selectedParts.reduce((sum, p) => sum + p.price, 0);

  const pricing: PricingBreakdown = calculateBookingPrice({
    business,
    service: selectedService,
    distanceKm: 3.5,
    isEmergency,
    isWeekend: false,
    materialsCost: totalPartsCost,
    discountCode: appliedDiscount,
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPhotoPreview([...photoPreview, url]);
    }
  };

  const handleTogglePart = (part: TradePart) => {
    if (selectedParts.some((p) => p.id === part.id)) {
      setSelectedParts(selectedParts.filter((p) => p.id !== part.id));
    } else {
      setSelectedParts([...selectedParts, part]);
    }
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      setAppliedDiscount(discountCode.trim());
    }
  };

  const handleFinalSubmit = () => {
    const bookingRef = `TP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: Booking = {
      id: `bk_${Date.now()}`,
      bookingRef,
      businessId: business.id,
      customerId: 'cust_301',
      customerName,
      customerPhone,
      customerEmail,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      category: selectedService.category,
      status: 'pending',
      scheduledDate,
      scheduledTime,
      address,
      postcode,
      lat: 51.5010,
      lng: -0.1915,
      issueDescription,
      photos: photoPreview,
      isEmergency,
      pricing,
      materialsUsed: selectedParts.map((p) => ({ name: p.name, cost: p.price })),
      createdAt: new Date().toISOString(),
    };

    onCompleteBooking(newBooking);
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    plumbing: <Wrench className="w-5 h-5 text-sky-500" />,
    electrical: <Zap className="w-5 h-5 text-amber-500" />,
    locksmith: <Lock className="w-5 h-5 text-purple-500" />,
    hvac: <Wind className="w-5 h-5 text-emerald-500" />,
  };

  const relevantParts = mockUKTradeParts.filter(
    (p) => p.category === selectedService.category || p.category === 'plumbing'
  );

  const cardBgClass = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-xl'
    : 'bg-white border-slate-200/90 text-slate-900 shadow-md';

  const inputBgClass = isDark
    ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-400'
    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400';

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Step Indicator Header */}
      <div className={`p-6 rounded-3xl border mb-6 transition-all ${cardBgClass}`}>
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Service' },
            { num: 2, label: 'Location' },
            { num: 3, label: 'Issue & Parts' },
            { num: 4, label: 'Schedule' },
            { num: 5, label: 'Review & Pay' },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-xl font-bold flex items-center justify-center text-sm transition-all ${
                  step === s.num
                    ? 'bg-sky-600 text-white ring-4 ring-sky-500/20 shadow-md scale-110'
                    : step > s.num
                    ? 'bg-emerald-500 text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-400 border border-slate-700'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
              </div>
              <span className={`text-xs font-bold hidden sm:inline ${step === s.num ? 'text-sky-400 font-extrabold' : 'text-slate-400'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: SELECT SERVICE */}
      {step === 1 && (
        <div className={`p-6 md:p-8 rounded-3xl border space-y-6 ${cardBgClass}`}>
          <div>
            <h2 className="text-2xl font-black">Select UK Trade Service</h2>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Choose the service required for your property.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedService.id === srv.id
                    ? 'border-sky-500 bg-sky-500/10 shadow-lg ring-2 ring-sky-500/20'
                    : isDark
                    ? 'border-slate-800 bg-slate-800/60 hover:bg-slate-800'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                      {categoryIcons[srv.category] || <Wrench className="w-5 h-5 text-sky-500" />}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base">{srv.title}</h3>
                      <span className="text-xs text-sky-400 font-bold capitalize">{srv.category} Trade</span>
                    </div>
                  </div>
                  <span className="font-black text-lg">£{srv.basePrice}</span>
                </div>
                <p className={`text-xs mt-3 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{srv.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold shadow-lg shadow-sky-600/30 flex items-center gap-2 text-sm transition-all"
            >
              <span>Next: Property Location</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: LOCATION & CONTACT */}
      {step === 2 && (
        <div className={`p-6 md:p-8 rounded-3xl border space-y-6 ${cardBgClass}`}>
          <div>
            <h2 className="text-2xl font-black">Property & Contact Details</h2>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Where should our certified engineer be dispatched?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Full Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none ${inputBgClass}`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">UK Phone Number</label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none ${inputBgClass}`}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Street Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none ${inputBgClass}`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">UK Postcode</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm font-bold outline-none ${inputBgClass}`}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Email Address</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none ${inputBgClass}`}
              />
            </div>
          </div>

          <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <button
              onClick={() => setStep(1)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-1.5 ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold shadow-lg flex items-center gap-2 text-sm"
            >
              <span>Next: Issue & UK Parts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: ISSUE DESCRIPTION & PARTS */}
      {step === 3 && (
        <div className={`p-6 md:p-8 rounded-3xl border space-y-6 ${cardBgClass}`}>
          <div>
            <h2 className="text-2xl font-black">Describe Issue & Select UK Spare Parts</h2>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Live UK supplier lookup (Screwfix / Toolstation / Plumbase).</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">
              Problem Description
            </label>
            <textarea
              rows={3}
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              className={`w-full p-4 rounded-xl border text-sm font-medium outline-none ${inputBgClass}`}
              placeholder="e.g. Boiler error EA, no spark..."
            />
          </div>

          {/* Dynamic UK Parts Selector Box */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-sky-500" /> Live UK Parts Price Lookup
              </span>
              <span className="text-xs font-extrabold text-sky-400">
                {selectedParts.length} Selected (£{totalPartsCost.toFixed(2)})
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {relevantParts.map((part) => {
                const isSelected = selectedParts.some((p) => p.id === part.id);
                return (
                  <div
                    key={part.id}
                    onClick={() => handleTogglePart(part)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-sky-500 bg-sky-500/10 shadow-md ring-2 ring-sky-500/20'
                        : isDark
                        ? 'border-slate-800 bg-slate-800/60 hover:bg-slate-800'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={part.image} alt={part.name} className="w-10 h-10 rounded-xl object-cover border border-slate-700 bg-white" />
                      <div>
                        <h4 className="font-extrabold text-xs leading-snug">{part.name}</h4>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          {part.supplier} &bull; Ref: {part.partNumber}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-black text-xs block">£{part.price.toFixed(2)}</span>
                      <span className={`text-[10px] font-bold ${isSelected ? 'text-sky-400' : 'text-slate-400'}`}>
                        {isSelected ? 'Added ✓' : '+ Add Part'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <button
              onClick={() => setStep(2)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-1.5 ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold shadow-lg flex items-center gap-2 text-sm"
            >
              <span>Next: Schedule & Emergency</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SCHEDULING & EMERGENCY OPTION */}
      {step === 4 && (
        <div className={`p-6 md:p-8 rounded-3xl border space-y-6 ${cardBgClass}`}>
          <div>
            <h2 className="text-2xl font-black">Schedule Date & Time</h2>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Choose your arrival window or trigger emergency call-out.</p>
          </div>

          <div
            onClick={() => setIsEmergency(!isEmergency)}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
              isEmergency
                ? 'border-amber-500 bg-amber-500/10 shadow-lg ring-2 ring-amber-500/20'
                : isDark
                ? 'border-slate-800 bg-slate-800/60'
                : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500 text-slate-950 font-bold">
                <Zap className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h3 className="font-extrabold text-base flex items-center gap-2">
                  Emergency 24/7 Rapid Dispatch
                  <span className="bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded border border-amber-400/30">
                    Priority ETA &lt; 30 Mins
                  </span>
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Nearest engineer dispatched immediately to your property.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isEmergency}
              onChange={() => {}}
              className="w-6 h-6 text-amber-600 rounded focus:ring-amber-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Preferred Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm font-bold outline-none ${inputBgClass}`}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Arrival Time Slot</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <select
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm font-bold outline-none ${inputBgClass}`}
                >
                  <option value="ASAP Emergency">ASAP Emergency (&lt; 30 Mins)</option>
                  <option value="08:30 AM">08:30 AM - 10:30 AM</option>
                  <option value="11:00 AM">11:00 AM - 01:00 PM</option>
                  <option value="02:00 PM">02:00 PM - 04:00 PM</option>
                  <option value="05:00 PM">05:00 PM - 07:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <button
              onClick={() => setStep(3)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-1.5 ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(5)}
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold shadow-lg flex items-center gap-2 text-sm"
            >
              <span>Next: Instant AI Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: REVIEW & DYNAMIC PRICE BREAKDOWN */}
      {step === 5 && (
        <div className={`p-6 md:p-8 rounded-3xl border space-y-6 ${cardBgClass}`}>
          <div>
            <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md uppercase border border-sky-500/20">
              Instant AI Price Breakdown
            </span>
            <h2 className="text-2xl font-black mt-2">Job Quotation & Instant Confirmation</h2>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Live itemized calculation including UK trade parts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className={`p-5 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'}`}>
                <h3 className="font-extrabold text-sm uppercase tracking-wider">Booking Summary</h3>
                <div className={`text-xs space-y-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Service:</span>
                    <span className="font-bold">{selectedService.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Property:</span>
                    <span className="font-bold">{address}, {postcode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time Slot:</span>
                    <span className="font-bold">{scheduledDate} ({scheduledTime})</span>
                  </div>
                </div>
              </div>

              {/* Promo Code Entry */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Promo Code (e.g. TRADEPRO10)"
                  className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-bold outline-none uppercase ${inputBgClass}`}
                />
                <button
                  onClick={handleApplyDiscount}
                  className="px-4 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800"
                >
                  Apply
                </button>
              </div>

              {appliedDiscount && (
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Promo '{appliedDiscount}' Applied (10% Off Subtotal)!
                </div>
              )}
            </div>

            {/* Dynamic Price Card */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Dynamic Price Breakdown</h3>

                <div className="mt-4 text-xs space-y-2 text-slate-300">
                  <div className="flex justify-between">
                    <span>Base Call-Out Fee:</span>
                    <span className="font-bold">£{pricing.basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Certified Labour:</span>
                    <span className="font-bold">£{pricing.labourCost.toFixed(2)}</span>
                  </div>
                  {pricing.materialsCost > 0 && (
                    <div className="flex justify-between text-sky-400 font-bold">
                      <span>Screwfix/Plumbase Parts:</span>
                      <span>£{pricing.materialsCost.toFixed(2)}</span>
                    </div>
                  )}
                  {isEmergency && (
                    <div className="flex justify-between text-amber-400">
                      <span>Emergency Fee (1.5x):</span>
                      <span className="font-bold">£{pricing.emergencyFee.toFixed(2)}</span>
                    </div>
                  )}
                  {pricing.discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount:</span>
                      <span className="font-bold">-£{pricing.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-slate-800">
                    <span>Subtotal:</span>
                    <span className="font-bold">£{pricing.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>UK VAT (20%):</span>
                    <span className="font-bold">£{pricing.vatAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-baseline justify-between">
                  <span className="text-xs font-extrabold uppercase text-sky-400">Total Payable:</span>
                  <span className="text-2xl font-black text-white">£{pricing.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleFinalSubmit}
                className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black shadow-lg text-sm flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-amber-300" /> Confirm & Dispatch Engineer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
