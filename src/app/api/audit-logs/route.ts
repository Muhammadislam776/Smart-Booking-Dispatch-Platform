import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import AuditLogModel from '@/lib/models/AuditLogModel';

const initialLogs = [
  { id: 'log_1', action: 'MERCHANT_STATUS_UPDATE', actor: 'Super Admin (Sana Khan)', target: 'Yorkshire Emergency Locksmiths', details: 'Status set to Active in MongoDB Atlas', ip: '192.168.1.42', timestamp: '2026-08-03 18:35:10' },
  { id: 'log_2', action: 'STRIPE_PAYMENT_CAPTURED', actor: 'Stripe Webhook Gateway', target: 'Invoice #INV-2026-WEIC-081', details: 'Captured £180.00 via Stripe Connect', ip: '54.187.205.12', timestamp: '2026-08-03 17:12:05' },
  { id: 'log_3', action: 'ENGINEER_DISPATCHED', actor: 'Dispatcher (John Smith)', target: 'Booking #TF-99281-UK', details: 'Dispatched Alex Sterling (ETA: 18 Mins)', ip: '192.168.1.18', timestamp: '2026-08-03 16:40:22' },
  { id: 'log_4', action: 'USER_ROLE_CHANGED', actor: 'Super Admin', target: 'david@weic.co.uk', details: 'Role set to Lead Field Engineer', ip: '192.168.1.42', timestamp: '2026-08-03 14:05:00' },
];

export async function GET() {
  try {
    await connectToDatabase();
    let logs = await AuditLogModel.find().sort({ createdAt: -1 });

    if (logs.length === 0) {
      console.log('[MongoDB Atlas] Seeding initial audit logs into collection...');
      logs = await AuditLogModel.insertMany(initialLogs);
    }

    return NextResponse.json({ success: true, count: logs.length, logs });
  } catch (error: any) {
    console.error('Error fetching audit logs from MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newLog = await AuditLogModel.create({
      ...body,
      id: body.id || `log_${Date.now()}`,
      timestamp: body.timestamp || new Date().toISOString().replace('T', ' ').substring(0, 19),
    });

    return NextResponse.json({ success: true, log: newLog }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating audit log in MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
