import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/lib/models/User';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and Password are required.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const normalizedEmail = email.toLowerCase().trim();

    // Query MongoDB Atlas users collection for matching email
    const userDoc = await User.findOne({ email: normalizedEmail });

    if (!userDoc) {
      return NextResponse.json(
        {
          success: false,
          message: `No account found for "${email}" in MongoDB Atlas database. Please Register first!`,
        },
        { status: 404 }
      );
    }

    // Return authenticated user profile from MongoDB Atlas
    return NextResponse.json({
      success: true,
      message: 'Login successful! Authenticated with MongoDB Atlas.',
      user: {
        id: userDoc._id.toString(),
        name: userDoc.name,
        email: userDoc.email,
        role: userDoc.role,
        phone: userDoc.phone,
        address: userDoc.address,
        postcode: userDoc.postcode,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Database error during login authentication.' },
      { status: 500 }
    );
  }
}
