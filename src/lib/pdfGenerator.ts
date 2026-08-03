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
  doc.text(business.name, 14, 18);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('TAX INVOICE', 165, 18);

  // Business Meta (Left Side)
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`${business.address}, ${business.city}, ${business.postcode}`, 14, 38);
  doc.text(`Phone: ${business.phone} | Email: ${business.email}`, 14, 44);
  doc.text(`VAT Reg No: GB 928 4102 91`, 14, 50);

  // Invoice Meta (Right Side)
  doc.setFont('helvetica', 'bold');
  doc.text(`Invoice No:`, 140, 38);
  doc.text(`Issue Date:`, 140, 44);
  doc.text(`Due Date:`, 140, 50);
  doc.text(`Status:`, 140, 56);

  doc.setFont('helvetica', 'normal');
  doc.text(invoice.invoiceNumber, 170, 38);
  doc.text(invoice.issueDate, 170, 44);
  doc.text(invoice.dueDate, 170, 50);

  if (invoice.status === 'paid') {
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
  doc.text(invoice.customerName, 14, 76);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.customerEmail, 14, 82);
  doc.text(invoice.customerAddress, 14, 88);

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

  invoice.items.forEach((item) => {
    doc.text(item.description, 18, currentY);
    doc.text(item.quantity.toString(), 128, currentY);
    doc.text(`£${item.unitPrice.toFixed(2)}`, 147, currentY);
    doc.text(`£${item.amount.toFixed(2)}`, 175, currentY);

    currentY += 8;
  });

  // Table Divider Line
  doc.setDrawColor(226, 232, 240);
  doc.line(14, currentY + 2, 196, currentY + 2);
  currentY += 10;

  // Summary Totals Right Aligned
  doc.setFont('helvetica', 'bold');
  doc.text('Subtotal:', 135, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(`£${invoice.subtotal.toFixed(2)}`, 175, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'bold');
  doc.text(`UK VAT (${business.vatRate}%):`, 135, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(`£${invoice.vatAmount.toFixed(2)}`, 175, currentY);

  currentY += 8;
  doc.setFillColor(2, 132, 199);
  doc.rect(130, currentY - 5, 66, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL AMOUNT:', 134, currentY + 1);
  doc.text(`£${invoice.totalAmount.toFixed(2)}`, 175, currentY + 1);

  // Footer Note & Stripe Reference
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for choosing TradePro 360 platform! All work is guaranteed under 12-month UK trade warranty.', 14, 275);
  if (invoice.stripePaymentId) {
    doc.text(`Stripe Payment Ref: ${invoice.stripePaymentId}`, 14, 280);
  }

  return doc;
}

export function generateMasterInvoicesReportPDF(invoices: any[], business: Business): jsPDF {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(15, 23, 42); // Dark Navy
  doc.rect(0, 0, 210, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(`${business.name} - FINANCIAL INVOICES LEDGER`, 14, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Master Executive SaaS Report | 20% UK VAT Compliance', 14, 26);

  // KPI Summary Bar
  doc.setFillColor(241, 245, 249);
  doc.rect(14, 40, 182, 18, 'F');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Total Gross Billed: £284,500.00', 18, 51);
  doc.text('Stripe Settled: £276,100.00', 78, 51);
  doc.text('UK VAT Collected: £56,900.00', 138, 51);

  // Table Header
  doc.setFillColor(2, 132, 199);
  doc.rect(14, 66, 182, 9, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('INVOICE NO.', 18, 72);
  doc.text('CUSTOMER', 65, 72);
  doc.text('DATE', 115, 72);
  doc.text('STATUS', 140, 72);
  doc.text('TOTAL (£)', 172, 72);

  // Rows
  let currentY = 83;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);

  invoices.forEach((inv) => {
    doc.text(inv.number, 18, currentY);
    doc.text(inv.customer, 65, currentY);
    doc.text(inv.date, 115, currentY);

    if (inv.status === 'Paid') {
      doc.setTextColor(16, 185, 129);
      doc.text('PAID', 140, currentY);
    } else {
      doc.setTextColor(239, 68, 68);
      doc.text('UNPAID', 140, currentY);
    }

    doc.setTextColor(30, 41, 59);
    doc.text(`£${typeof inv.total === 'number' ? inv.total.toFixed(2) : inv.total}`, 172, currentY);

    currentY += 10;
  });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Report Generated: ${new Date().toLocaleString()} | WEIC Smart Trade Solutions UK`, 14, 280);

  return doc;
}
