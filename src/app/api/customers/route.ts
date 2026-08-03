import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import CustomerModel from '@/lib/models/CustomerModel';
import { mockCustomers } from '@/lib/mockData';

export async function GET() {
  try {
    await connectToDatabase();
    let customers = await CustomerModel.find().sort({ createdAt: 1 });

    if (customers.length === 0) {
      console.log('[MongoDB Atlas] Seeding initial customers into collection...');
      customers = await CustomerModel.insertMany(mockCustomers as any);
    }

    return NextResponse.json({ success: true, count: customers.length, customers });
  } catch (error: any) {
    console.error('Error fetching customers from MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newCustomer = await CustomerModel.create({
      ...body,
      id: body.id || `cust_${Date.now()}`,
      createdAt: new Date().toISOString(),
    });

    console.log(`[MongoDB Atlas] New Customer Saved:`, newCustomer.name);

    return NextResponse.json({ success: true, customer: newCustomer }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating customer in MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
