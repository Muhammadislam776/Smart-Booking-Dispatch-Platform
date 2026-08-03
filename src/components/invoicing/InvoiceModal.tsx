'use client';

import React from 'react';
import { Invoice, Business } from '@/types';
import { generateInvoicePDF } from '@/lib/pdfGenerator';
import { X, Download, FileText, CheckCircle2, PoundSterling } from 'lucide-react';

interface InvoiceModalProps {
  invoice: Invoice;
  business: Business;
  onClose: () => void;
}

export default function InvoiceModal({ invoice, business, onClose }: InvoiceModalProps) {
  const handleDownloadPDF = () => {
    const doc = generateInvoicePDF(invoice, business);
    doc.save(`${invoice.invoiceNumber}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-lg font-black">{invoice.invoiceNumber}</h2>
              <p className="text-xs text-slate-400">UK Tax Invoice &bull; Issued {invoice.issueDate}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice PDF Body Preview */}
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start border-b border-slate-200 pb-6">
            <div>
              <h3 className="text-xl font-black text-slate-900">{business.name}</h3>
              <p className="text-xs text-slate-600 mt-1">{business.address}, {business.city}, {business.postcode}</p>
              <p className="text-xs text-slate-500">VAT Reg: GB 928 4102 91</p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${invoice.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {invoice.status}
              </span>
              <p className="text-xs text-slate-500 mt-2">Due Date: {invoice.dueDate}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Bill To</h4>
            <p className="font-extrabold text-slate-900 text-sm mt-1">{invoice.customerName}</p>
            <p className="text-xs text-slate-600">{invoice.customerEmail}</p>
            <p className="text-xs text-slate-600">{invoice.customerAddress}</p>
          </div>

          {/* Items Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                {invoice.items.map((item, i) => (
                  <tr key={i}>
                    <td className="p-3">{item.description}</td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-right">£{item.unitPrice.toFixed(2)}</td>
                    <td className="p-3 text-right font-bold">£{item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="space-y-1.5 text-xs text-right max-w-xs ml-auto font-medium">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-bold">£{invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>UK VAT ({business.vatRate}%):</span>
              <span className="font-bold">£{invoice.vatAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Amount:</span>
              <span className="text-sky-600">£{invoice.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">Official UK PDF Invoice Format</span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs"
            >
              Close
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md"
            >
              <Download className="w-4 h-4" /> Download Official PDF Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
