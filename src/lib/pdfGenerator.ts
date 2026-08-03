import { jsPDF } from 'jspdf';
import { Invoice, Business } from '@/types';

export function generateInvoicePDF(invoice: Invoice, business: Business): jsPDF {
  const doc = new jsPDF();

  // Primary Theme Colors (Deep Sky Blue & Slate)
  doc.setFillColor(2, 132, 199); // #0284c7
  doc.rect(0, 0, 210, 28, 'F');

  // Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(business?.name || 'WEIC Smart Trade Solutions UK', 14, 18);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('TAX INVOICE', 165, 18);

  // Business Meta (Left Side)
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`${business?.address || '102 Baker Street'}, ${business?.city || 'London'}, ${business?.postcode || 'W1U 68A'}`, 14, 38);
  doc.text(`Phone: ${business?.phone || '+44 20 7946 0912'} | Email: ${business?.email || 'contact@weic.co.uk'}`, 14, 44);
  doc.text(`VAT Reg No: GB 928 4102 91`, 14, 50);

  // Invoice Meta (Right Side)
  doc.setFont('helvetica', 'bold');
  doc.text(`Invoice No:`, 140, 38);
  doc.text(`Issue Date:`, 140, 44);
  doc.text(`Due Date:`, 140, 50);
  doc.text(`Status:`, 140, 56);

  doc.setFont('helvetica', 'normal');
  doc.text(invoice?.invoiceNumber || 'INV-2026-WEIC-94821', 170, 38);
  doc.text(invoice?.issueDate || new Date().toISOString().split('T')[0], 170, 44);
  doc.text(invoice?.dueDate || new Date().toISOString().split('T')[0], 170, 50);

  if (invoice?.status === 'paid') {
    doc.setTextColor(16, 185, 129); // Green
    doc.text('PAID IN FULL', 170, 56);
  } else {
    doc.setTextColor(239, 68, 68); // Red
    doc.text('PAYMENT DUE', 170, 56);
  }

  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(14, 62, 196, 62);

  // Bill To Section
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('BILL TO:', 14, 70);

  doc.setFont('helvetica', 'bold');
  doc.text(invoice?.customerName || 'Eleanor Vance', 14, 76);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice?.customerEmail || 'customer@weic.co.uk', 14, 82);
  doc.text(invoice?.customerAddress || '42 Kensington High Street, London, W8 4PT', 14, 88);

  // Table Header
  doc.setFillColor(241, 245, 249);
  doc.rect(14, 98, 182, 9, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('DESCRIPTION', 18, 104);
  doc.text('QTY', 125, 104);
  doc.text('UNIT PRICE (£)', 145, 104);
  doc.text('AMOUNT (£)', 175, 104);

  // Table Rows
  let currentY = 114;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);

  const itemsList = invoice?.items || [
    { description: 'Emergency Trade Service Callout', quantity: 1, unitPrice: 180, amount: 180 },
  ];

  itemsList.forEach((item: any) => {
    const desc = item.description || 'Trade Service';
    const qty = item.quantity || 1;
    const unitPrice = typeof item.unitPrice === 'number' ? item.unitPrice : 180;
    const itemAmt = typeof item.amount === 'number' ? item.amount : typeof item.total === 'number' ? item.total : unitPrice * qty;

    doc.text(desc, 18, currentY);
    doc.text(qty.toString(), 128, currentY);
    doc.text(`£${unitPrice.toFixed(2)}`, 147, currentY);
    doc.text(`£${itemAmt.toFixed(2)}`, 175, currentY);

    currentY += 8;
  });

  // Table Divider Line
  doc.setDrawColor(226, 232, 240);
  doc.line(14, currentY + 2, 196, currentY + 2);
  currentY += 10;

  // Summary Totals Right Aligned
  const subtotalVal = typeof invoice?.subtotal === 'number' ? invoice.subtotal : 180;
  const vatVal = typeof invoice?.vatAmount === 'number' ? invoice.vatAmount : subtotalVal * 0.2;
  const totalVal = typeof invoice?.totalAmount === 'number' ? invoice.totalAmount : subtotalVal + vatVal;

  doc.setFont('helvetica', 'bold');
  doc.text('Subtotal:', 135, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(`£${subtotalVal.toFixed(2)}`, 175, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'bold');
  doc.text(`UK VAT (${business?.vatRate || 20}%):`, 135, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(`£${vatVal.toFixed(2)}`, 175, currentY);

  currentY += 8;
  doc.setFillColor(2, 132, 199);
  doc.rect(130, currentY - 5, 66, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL AMOUNT:', 134, currentY + 1);
  doc.text(`£${totalVal.toFixed(2)}`, 175, currentY + 1);

  // Footer Note & Stripe Reference
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for choosing TradePro 360 platform! All work is guaranteed under 12-month UK trade warranty.', 14, 275);
  if (invoice?.stripePaymentId) {
    doc.text(`Stripe Payment Ref: ${invoice.stripePaymentId}`, 14, 280);
  }

  return doc;
}

export function generateMasterInvoicesReportPDF(invoices: any[], business: Business): jsPDF {
  const doc = new jsPDF();
  return doc;
}
