import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import Booking from '@/lib/models/Booking';
import { mockCustomers, mockEngineers, mockBookings } from '@/lib/mockData';

export async function GET() {
  try {
    await connectToDatabase();

    // Clear and Seed Users collection
    await User.deleteMany({});
    const sampleUsers = [
      {
        name: 'Sana Khan (WEIC Owner)',
        email: 'sanajavaidkhan44@weic.co.uk',
        phone: '+44 20 7946 0912',
        role: 'business_owner',
        address: '102 Baker Street, Marylebone',
        postcode: 'W1U 68A',
      },
      ...mockEngineers.map((e) => ({
        name: e.name,
        email: e.email,
        phone: e.phone,
        role: 'engineer' as const,
        avatar: e.avatar,
        skills: e.skills,
        vehicleRegistration: e.vehicleRegistration,
        isAvailable: e.isAvailable,
      })),
      ...mockCustomers.map((c) => ({
        name: c.name,
        email: c.email,
        phone: c.phone,
        role: 'customer' as const,
        avatar: c.avatar,
        address: c.address,
        postcode: c.postcode,
      })),
    ];
    const createdUsers = await User.insertMany(sampleUsers);

    // Clear and Seed Bookings collection
    await Booking.deleteMany({});
    const sampleBookings = mockBookings.map((b) => ({
      bookingRef: b.bookingRef,
      customerName: b.customerName,
      customerPhone: b.customerPhone,
      customerEmail: b.customerEmail,
      serviceTitle: b.serviceTitle,
      category: b.category,
      status: b.status,
      scheduledDate: b.scheduledDate,
      scheduledTime: b.scheduledTime,
      address: b.address,
      postcode: b.postcode,
      issueDescription: b.issueDescription,
      isEmergency: b.isEmergency,
      assignedEngineerName: b.assignedEngineerName,
      pricing: b.pricing,
    }));
    const createdBookings = await Booking.insertMany(sampleBookings);

    return NextResponse.json({
      success: true,
      message: 'MongoDB Atlas TradePro database successfully seeded with initial WEIC data!',
      usersCount: createdUsers.length,
      bookingsCount: createdBookings.length,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
