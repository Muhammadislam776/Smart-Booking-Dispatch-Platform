import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Message from '@/lib/models/Message';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get('bookingId');

    const query = bookingId ? { bookingId } : {};
    const messages = await Message.find(query).sort({ createdAt: 1 });

    return NextResponse.json({ success: true, count: messages.length, messages });
  } catch (error: any) {
    console.error('Error fetching messages from MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { bookingId, senderId, senderName, senderRole, content } = body;
    if (!bookingId || !content) {
      return NextResponse.json({ success: false, error: 'bookingId and content are required' }, { status: 400 });
    }

    const newMessage = await Message.create({
      id: `msg_${Date.now()}`,
      bookingId,
      senderId: senderId || 'user_anon',
      senderName: senderName || 'User',
      senderRole: senderRole || 'customer',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    });

    console.log(`[MongoDB Atlas] New Message Saved in collection 'messages':`, newMessage.id);

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error: any) {
    console.error('Error saving message in MongoDB Atlas:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
