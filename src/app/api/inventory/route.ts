import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import InventoryModel from '@/lib/models/InventoryModel';

const initialInventory = [
  { id: 'inv_item_1', businessId: 'biz_01', name: 'Commercial Boiler Pressure Relief Valve (15mm)', sku: 'SFX-9921-BOILER', category: 'Boiler Parts', quantity: 24, minStockLevel: 5, unitPrice: 45.5, supplier: 'Screwfix UK', location: 'London Warehouse' },
  { id: 'inv_item_2', businessId: 'biz_01', name: 'NICEIC 100A Dual RCD Consumer Unit', sku: 'SFX-4412-ELEC', category: 'Electrical', quantity: 8, minStockLevel: 3, unitPrice: 180.0, supplier: 'Toolstation UK', location: 'London Warehouse' },
  { id: 'inv_item_3', businessId: 'biz_01', name: 'High-Velocity Drain Jetter Nozzle Kit', sku: 'SFX-1102-PLUMB', category: 'Plumbing Tools', quantity: 15, minStockLevel: 4, unitPrice: 85.0, supplier: 'Plumbfix UK', location: 'Van #WEIC-882' },
];

export async function GET() {
  try {
    await connectToDatabase();
    let items = await InventoryModel.find().sort({ createdAt: 1 });

    if (items.length === 0) {
      console.log('[MongoDB Atlas] Seeding initial inventory items...');
      items = await InventoryModel.insertMany(initialInventory);
    }

    return NextResponse.json({ success: true, count: items.length, items });
  } catch (error: any) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newItem = await InventoryModel.create({
      ...body,
      id: body.id || `inv_item_${Date.now()}`,
    });

    console.log('[MongoDB Atlas] Saved inventory item:', newItem.name);
    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating inventory item:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
