import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import AttendanceModel from '@/lib/models/AttendanceModel';

const initialAttendance = [
  { id: 'att_1', engineerId: 'eng_1', engineerName: 'Alex Sterling', date: '2026-08-03', clockInTime: '07:45 AM', clockOutTime: '05:30 PM', totalHours: 9.75, status: 'Present', location: 'London HQ (W1U 68A)' },
  { id: 'att_2', engineerId: 'eng_2', engineerName: 'David Gascoigne', date: '2026-08-03', clockInTime: '08:00 AM', clockOutTime: '05:00 PM', totalHours: 9.0, status: 'Present', location: 'London (E14 5AB)' },
];

export async function GET() {
  try {
    await connectToDatabase();
    let records = await AttendanceModel.find().sort({ createdAt: -1 });

    if (records.length === 0) {
      console.log('[MongoDB Atlas] Seeding initial attendance records...');
      records = await AttendanceModel.insertMany(initialAttendance);
    }

    return NextResponse.json({ success: true, count: records.length, attendance: records });
  } catch (error: any) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newRecord = await AttendanceModel.create({
      ...body,
      id: body.id || `att_${Date.now()}`,
    });

    console.log('[MongoDB Atlas] Saved engineer attendance clock-in:', newRecord.engineerName);
    return NextResponse.json({ success: true, attendance: newRecord }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating attendance record:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
