import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/lib/models/User';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role, phone, address, postcode } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: 'Full Name, Email and Password are required.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists in MongoDB Atlas users collection
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Account with this email already exists in MongoDB Atlas! Please Sign In instead.',
        },
        { status: 400 }
      );
    }

    // Save new user in MongoDB Atlas users collection
    const newUser = await User.create({
      name,
      email: normalizedEmail,
      phone: phone || '+44 20 7946 0912',
      role: role || 'business_owner',
      address: address || '102 Baker Street',
      postcode: postcode || 'W1U 68A',
      isAvailable: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Account registered successfully in MongoDB Atlas!',
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        address: newUser.address,
        postcode: newUser.postcode,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Database error during registration.' },
      { status: 500 }
    );
  }
}
