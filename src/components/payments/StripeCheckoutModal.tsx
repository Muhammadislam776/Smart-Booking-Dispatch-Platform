'use client';

import React, { useState } from 'react';
import { Invoice, Business } from '@/types';
import { X, CreditCard, Lock, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface StripeCheckoutModalProps {
  invoice: Invoice;
  business: Business;
  onClose: () => void;
  onSuccessPayment: () => void;
}

export default function StripeCheckoutModal({
  invoice,
  business,
  onClose,
  onSuccessPayment,
}: StripeCheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'pay_later'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccessPayment();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-xs">
              S
            </div>
            <span className="font-extrabold text-sm tracking-tight">Stripe Secure Checkout</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="text-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Amount Due</span>
            <h2 className="text-3xl font-black text-slate-900 mt-0.5">£{invoice.totalAmount.toFixed(2)}</h2>
            <p className="text-xs text-sky-600 font-semibold mt-1">Paying {business.name}</p>
          </div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'card', label: 'Card', icon: <CreditCard className="w-4 h-4" /> },
              { id: 'apple_pay', label: 'Apple Pay', icon: <Sparkles className="w-4 h-4 text-slate-900" /> },
              { id: 'pay_later', label: 'Pay Later', icon: <Lock className="w-4 h-4" /> },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPaymentMethod(m.id as any)}
                className={`p-3 rounded-xl border text-xs font-extrabold flex flex-col items-center gap-1 transition-all ${
                  paymentMethod === m.id
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-200'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {m.icon}
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-xs font-bold text-slate-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Expiry</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-xs font-bold text-slate-900 outline-none text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">CVC</label>
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-xs font-bold text-slate-900 outline-none text-center"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> 256-Bit SSL Encryption via Stripe
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-lg text-sm transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? 'Processing Payment...' : `Pay £${invoice.totalAmount.toFixed(2)} Now`}
          </button>
        </form>
      </div>
    </div>
  );
}
