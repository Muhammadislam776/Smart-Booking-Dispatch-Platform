import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import SupportTicketModel from '@/lib/models/SupportTicketModel';

const initialTickets = [
  { id: 'TK-9921', subject: 'Stripe Payout Bank Verification Delay', customer: 'London Heating & Gas Co.', priority: 'HIGH', status: 'Open', assignedTo: 'Super Admin', created: '2026-08-03 14:00' },
  { id: 'TK-8812', subject: 'GPS Satellite Signal Intermittent in Leeds', customer: 'Yorkshire Locksmiths', priority: 'MEDIUM', status: 'In Progress', assignedTo: 'Tech Support', created: '2026-08-02 11:30' },
  { id: 'TK-7740', subject: 'Custom PDF Invoice Logo Alignment Request', customer: 'Elite Plumbing Ltd', priority: 'LOW', status: 'Resolved', assignedTo: 'Design Team', created: '2026-08-01 09:15' },
];

export async function GET() {
  try {
    await connectToDatabase();
    let tickets = await SupportTicketModel.find().sort({ createdAt: -1 });

    if (tickets.length === 0) {
      console.log('[MongoDB Atlas] Seeding initial support tickets into collection...');
      tickets = await SupportTicketModel.insertMany(initialTickets);
    }

    return NextResponse.json({ success: true, count: tickets.length, tickets });
  } catch (error: any) {
    console.error('Error fetching support tickets from MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newTicket = await SupportTicketModel.create({
      ...body,
      id: body.id || `TK-${Math.floor(1000 + Math.random() * 9000)}`,
      created: new Date().toISOString().replace('T', ' ').substring(0, 16),
    });

    return NextResponse.json({ success: true, ticket: newTicket }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating support ticket in MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'id and status are required' }, { status: 400 });
    }

    const updated = await SupportTicketModel.findOneAndUpdate({ id }, { status }, { new: true });

    return NextResponse.json({ success: true, ticket: updated });
  } catch (error: any) {
    console.error('Error updating support ticket in MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
