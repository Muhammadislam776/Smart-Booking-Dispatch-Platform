import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Merchant from '@/lib/models/Merchant';

const initialSeedMerchants = [
  {
    id: 'biz_01',
    name: 'London Heating & Gas Co.',
    tier: 'Enterprise (£499/mo)',
    status: 'active',
    monthlyRevenue: 28450,
    commissionCollected: 3556.25,
    joinedDate: '2025-03-15',
    postcode: 'W8 4PT',
    engineersCount: 14,
    stripeConnected: true,
    slaScore: '99.9%',
  },
  {
    id: 'biz_02',
    name: 'Manchester Electrical Pro Services',
    tier: 'Enterprise (£499/mo)',
    status: 'active',
    monthlyRevenue: 19200,
    commissionCollected: 2400.0,
    joinedDate: '2025-06-20',
    postcode: 'M1 1AE',
    engineersCount: 8,
    stripeConnected: true,
    slaScore: '99.8%',
  },
  {
    id: 'biz_03',
    name: 'Birmingham HVAC & Climate Solutions',
    tier: 'Pro (£199/mo)',
    status: 'active',
    monthlyRevenue: 14800,
    commissionCollected: 1850.0,
    joinedDate: '2025-09-10',
    postcode: 'B1 1BB',
    engineersCount: 5,
    stripeConnected: true,
    slaScore: '99.5%',
  },
  {
    id: 'biz_04',
    name: 'Yorkshire Emergency Locksmiths',
    tier: 'Starter (£99/mo)',
    status: 'suspended',
    monthlyRevenue: 6200,
    commissionCollected: 775.0,
    joinedDate: '2026-01-05',
    postcode: 'LS1 5HD',
    engineersCount: 2,
    stripeConnected: false,
    slaScore: '94.2%',
  },
];

export async function GET() {
  try {
    await connectToDatabase();
    let merchants = await Merchant.find().sort({ createdAt: 1 });

    if (merchants.length === 0) {
      console.log('[MongoDB Atlas] Seeding initial merchant accounts into collection...');
      merchants = await Merchant.insertMany(initialSeedMerchants);
    }

    return NextResponse.json({ success: true, count: merchants.length, merchants });
  } catch (error: any) {
    console.error('Error fetching merchants from MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { name, tier, postcode, monthlyRevenue, engineersCount } = body;
    if (!name || !postcode) {
      return NextResponse.json({ success: false, error: 'name and postcode are required' }, { status: 400 });
    }

    const rev = parseFloat(monthlyRevenue) || 12000;
    const comm = rev * 0.125;

    const newMerchant = await Merchant.create({
      id: `biz_${Date.now()}`,
      name,
      tier: tier || 'Enterprise (£499/mo)',
      status: 'active',
      monthlyRevenue: rev,
      commissionCollected: comm,
      joinedDate: new Date().toISOString().split('T')[0],
      postcode,
      engineersCount: parseInt(engineersCount) || 4,
      stripeConnected: true,
      slaScore: '99.9%',
    });

    console.log(`[MongoDB Atlas] New Merchant Created & Saved:`, newMerchant.name);

    return NextResponse.json({ success: true, merchant: newMerchant }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating merchant in MongoDB Atlas:', error);
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

    const updated = await Merchant.findOneAndUpdate({ id }, { status }, { new: true });

    console.log(`[MongoDB Atlas] Merchant ${id} status updated to ${status}`);

    return NextResponse.json({ success: true, merchant: updated });
  } catch (error: any) {
    console.error('Error updating merchant in MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
