import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import ServiceModel from '@/lib/models/ServiceModel';

const initialServices = [
  { id: 'srv_1', name: 'Boiler Repair & Performance Audit', category: 'Heating & Gas', basePrice: 150, emergencySurcharge: 50, vatRate: '20%' },
  { id: 'srv_2', name: 'Consumer Unit Rewire & Inspection', category: 'Electrical', basePrice: 600, emergencySurcharge: 100, vatRate: '20%' },
  { id: 'srv_3', name: 'High-Pressure Drain Unblocking', category: 'Plumbing', basePrice: 120, emergencySurcharge: 40, vatRate: '20%' },
  { id: 'srv_4', name: 'Commercial HVAC Chiller Servicing', category: 'HVAC', basePrice: 350, emergencySurcharge: 75, vatRate: '20%' },
  { id: 'srv_5', name: 'Emergency Lock Replacement', category: 'Locksmith', basePrice: 180, emergencySurcharge: 60, vatRate: '20%' },
];

export async function GET() {
  try {
    await connectToDatabase();
    let services = await ServiceModel.find().sort({ createdAt: 1 });

    if (services.length === 0) {
      console.log('[MongoDB Atlas] Seeding initial services into collection...');
      services = await ServiceModel.insertMany(initialServices);
    }

    return NextResponse.json({ success: true, count: services.length, services });
  } catch (error: any) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newService = await ServiceModel.create({
      ...body,
      id: body.id || `srv_${Date.now()}`,
    });

    console.log('[MongoDB Atlas] Created new service category:', newService.name);
    return NextResponse.json({ success: true, service: newService }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, name, category, basePrice, emergencySurcharge, vatRate } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 });
    }

    const updateFields: any = {};
    if (name) updateFields.name = name;
    if (category) updateFields.category = category;
    if (basePrice !== undefined) updateFields.basePrice = parseFloat(basePrice);
    if (emergencySurcharge !== undefined) updateFields.emergencySurcharge = parseFloat(emergencySurcharge);
    if (vatRate) updateFields.vatRate = vatRate;

    const updated = await ServiceModel.findOneAndUpdate({ id }, updateFields, { new: true });
    console.log(`[MongoDB Atlas] Updated service ${id}`);

    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    console.error('Error updating service:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
