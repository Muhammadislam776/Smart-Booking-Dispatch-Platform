import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import BookingModel from '@/lib/models/BookingModel';
import { mockBookings } from '@/lib/mockData';

export async function GET() {
  try {
    await connectToDatabase();
    let bookings = await BookingModel.find().sort({ createdAt: -1 });

    if (bookings.length === 0) {
      console.log('[MongoDB Atlas] Seeding initial bookings into collection...');
      bookings = await BookingModel.insertMany(mockBookings as any);
    }

    return NextResponse.json({ success: true, count: bookings.length, bookings });
  } catch (error: any) {
    console.error('Error fetching bookings from MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newBooking = await BookingModel.create({
      ...body,
      id: body.id || `b_${Date.now()}`,
      bookingRef: body.bookingRef || `TF-${Math.floor(10000 + Math.random() * 90000)}-UK`,
      createdAt: new Date().toISOString(),
    });

    console.log(`[MongoDB Atlas] New Booking Saved in collection 'bookingmodels':`, newBooking.bookingRef);

    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating booking in MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, status, assignedEngineerId, assignedEngineerName, extraData } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Booking id is required' }, { status: 400 });
    }

    const updateFields: any = { ...extraData };
    if (status) updateFields.status = status;
    if (assignedEngineerId) updateFields.assignedEngineerId = assignedEngineerId;
    if (assignedEngineerName) updateFields.assignedEngineerName = assignedEngineerName;

    const updated = await BookingModel.findOneAndUpdate({ id }, updateFields, { new: true });

    console.log(`[MongoDB Atlas] Booking ${id} updated in database.`);

    return NextResponse.json({ success: true, booking: updated });
  } catch (error: any) {
    console.error('Error updating booking in MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
