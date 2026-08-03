import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import InvoiceModel from '@/lib/models/InvoiceModel';
import { mockInvoices } from '@/lib/mockData';

export async function GET() {
  try {
    await connectToDatabase();
    let invoices = await InvoiceModel.find().sort({ createdAt: -1 });

    if (invoices.length === 0) {
      console.log('[MongoDB Atlas] Seeding initial invoices into collection...');
      invoices = await InvoiceModel.insertMany(mockInvoices as any);
    }

    return NextResponse.json({ success: true, count: invoices.length, invoices });
  } catch (error: any) {
    console.error('Error fetching invoices from MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newInvoice = await InvoiceModel.create({
      ...body,
      id: body.id || `inv_${Date.now()}`,
      invoiceNumber: body.invoiceNumber || `INV-2026-WEIC-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
    });

    console.log(`[MongoDB Atlas] New Invoice Saved:`, newInvoice.invoiceNumber);

    return NextResponse.json({ success: true, invoice: newInvoice }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating invoice in MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, status, stripePaymentId } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Invoice id is required' }, { status: 400 });
    }

    const updated = await InvoiceModel.findOneAndUpdate(
      { id },
      { status: status || 'paid', paidAt: new Date().toISOString(), stripePaymentId: stripePaymentId || `ch_${Date.now()}` },
      { new: true }
    );

    console.log(`[MongoDB Atlas] Invoice ${id} marked as PAID.`);

    return NextResponse.json({ success: true, invoice: updated });
  } catch (error: any) {
    console.error('Error updating invoice in MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
