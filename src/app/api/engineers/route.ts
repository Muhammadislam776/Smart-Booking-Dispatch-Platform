import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import EngineerModel from '@/lib/models/EngineerModel';
import { mockEngineers } from '@/lib/mockData';

export async function GET() {
  try {
    await connectToDatabase();
    let engineers = await EngineerModel.find().sort({ createdAt: 1 });

    if (engineers.length === 0) {
      console.log('[MongoDB Atlas] Seeding initial engineers into collection...');
      engineers = await EngineerModel.insertMany(mockEngineers as any);
    }

    return NextResponse.json({ success: true, count: engineers.length, engineers });
  } catch (error: any) {
    console.error('Error fetching engineers from MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newEngineer = await EngineerModel.create({
      ...body,
      id: body.id || `eng_${Date.now()}`,
      createdAt: new Date().toISOString(),
    });

    console.log(`[MongoDB Atlas] New Engineer Saved:`, newEngineer.name);

    return NextResponse.json({ success: true, engineer: newEngineer }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating engineer in MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
