import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import VehicleModel from '@/lib/models/VehicleModel';

const initialVehicles = [
  { id: 'veh_1', businessId: 'biz_01', registration: 'WEIC-882', makeModel: 'Ford Transit Custom EcoBlue 2024', assignedEngineer: 'Alex Sterling', motExpiry: '2027-05-15', insuranceExpiry: '2027-02-10', status: 'Operational', fuelLevel: '85%' },
  { id: 'veh_2', businessId: 'biz_01', registration: 'BD68 WXY', makeModel: 'Mercedes-Benz Sprinter 314 CDI', assignedEngineer: 'David Gascoigne', motExpiry: '2026-11-20', insuranceExpiry: '2026-09-30', status: 'Operational', fuelLevel: '92%' },
];

export async function GET() {
  try {
    await connectToDatabase();
    let vehicles = await VehicleModel.find().sort({ createdAt: 1 });

    if (vehicles.length === 0) {
      console.log('[MongoDB Atlas] Seeding initial vehicles into collection...');
      vehicles = await VehicleModel.insertMany(initialVehicles);
    }

    return NextResponse.json({ success: true, count: vehicles.length, vehicles });
  } catch (error: any) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newVehicle = await VehicleModel.create({
      ...body,
      id: body.id || `veh_${Date.now()}`,
    });

    console.log('[MongoDB Atlas] Saved vehicle:', newVehicle.registration);
    return NextResponse.json({ success: true, vehicle: newVehicle }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating vehicle:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
