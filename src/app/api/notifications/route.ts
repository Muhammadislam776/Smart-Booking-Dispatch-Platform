import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Notification from '@/lib/models/Notification';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(20);

    return NextResponse.json({ success: true, count: notifications.length, notifications });
  } catch (error: any) {
    console.error('Error fetching notifications from MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { title, message, type, roleTarget } = body;
    if (!title || !message) {
      return NextResponse.json({ success: false, error: 'title and message are required' }, { status: 400 });
    }

    const newNotification = await Notification.create({
      id: `notif_${Date.now()}`,
      title,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: type || 'info',
      roleTarget: roleTarget || 'all',
    });

    console.log(`[MongoDB Atlas] New Notification Saved in collection 'notifications':`, newNotification.id);

    return NextResponse.json({ success: true, notification: newNotification }, { status: 201 });
  } catch (error: any) {
    console.error('Error saving notification in MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
