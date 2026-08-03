import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Merchant from '@/lib/models/Merchant';
import Notification from '@/lib/models/Notification';
import Message from '@/lib/models/Message';
import InvoiceModel from '@/lib/models/InvoiceModel';
import EngineerModel from '@/lib/models/EngineerModel';
import CustomerModel from '@/lib/models/CustomerModel';
import BookingModel from '@/lib/models/BookingModel';

import {
  mockBusiness,
  mockEngineers,
  mockCustomers,
  mockBookings,
  mockInvoices,
  mockNotifications,
  mockChatMessages,
} from '@/lib/mockData';

const seedMerchants = [
  {
    id: 'biz_01',
    name: 'London Heating & Gas Co.',
    tier: 'Enterprise (£499/mo)',
    status: 'active',
    monthlyRevenue: 28450,
    commissionCollected: 3556.25,
    joinedDate: '2025-03-15',
    postcode: 'W8 4PT',
    engineersCount: 14,
    stripeConnected: true,
    slaScore: '99.9%',
  },
  {
    id: 'biz_02',
    name: 'Manchester Electrical Pro Services',
    tier: 'Enterprise (£499/mo)',
    status: 'active',
    monthlyRevenue: 19200,
    commissionCollected: 2400.0,
    joinedDate: '2025-06-20',
    postcode: 'M1 1AE',
    engineersCount: 8,
    stripeConnected: true,
    slaScore: '99.8%',
  },
  {
    id: 'biz_03',
    name: 'Birmingham HVAC & Climate Solutions',
    tier: 'Pro (£199/mo)',
    status: 'active',
    monthlyRevenue: 14800,
    commissionCollected: 1850.0,
    joinedDate: '2025-09-10',
    postcode: 'B1 1BB',
    engineersCount: 5,
    stripeConnected: true,
    slaScore: '99.5%',
  },
  {
    id: 'biz_04',
    name: 'Yorkshire Emergency Locksmiths',
    tier: 'Starter (£99/mo)',
    status: 'suspended',
    monthlyRevenue: 6200,
    commissionCollected: 775.0,
    joinedDate: '2026-01-05',
    postcode: 'LS1 5HD',
    engineersCount: 2,
    stripeConnected: false,
    slaScore: '94.2%',
  },
];

export async function GET() {
  return handleInitDatabase();
}

export async function POST() {
  return handleInitDatabase();
}

async function handleInitDatabase() {
  try {
    await connectToDatabase();
    console.log('[MongoDB Atlas] Initializing all collections in database TradePro...');

    const summary: Record<string, number> = {};

    // 1. Merchants Collection
    const merchantCount = await Merchant.countDocuments();
    if (merchantCount === 0) {
      const seeded = await Merchant.insertMany(seedMerchants);
      summary['merchants'] = seeded.length;
    } else {
      summary['merchants'] = merchantCount;
    }

    // 2. Notifications Collection
    const notifCount = await Notification.countDocuments();
    if (notifCount === 0) {
      const seededNotifs = mockNotifications.map((n) => ({
        id: n.id,
        title: n.title,
        message: n.message,
        timestamp: n.timestamp,
        read: n.read,
        type: n.type,
        roleTarget: 'all',
      }));
      const seeded = await Notification.insertMany(seededNotifs);
      summary['notifications'] = seeded.length;
    } else {
      summary['notifications'] = notifCount;
    }

    // 3. Invoices Collection
    const invoiceCount = await InvoiceModel.countDocuments();
    if (invoiceCount === 0) {
      const seeded = await InvoiceModel.insertMany(mockInvoices as any);
      summary['invoices'] = seeded.length;
    } else {
      summary['invoices'] = invoiceCount;
    }

    // 4. Engineers Collection
    const engCount = await EngineerModel.countDocuments();
    if (engCount === 0) {
      const seeded = await EngineerModel.insertMany(mockEngineers as any);
      summary['engineers'] = seeded.length;
    } else {
      summary['engineers'] = engCount;
    }

    // 5. Customers Collection
    const custCount = await CustomerModel.countDocuments();
    if (custCount === 0) {
      const seeded = await CustomerModel.insertMany(mockCustomers as any);
      summary['customers'] = seeded.length;
    } else {
      summary['customers'] = custCount;
    }

    // 6. Bookings Collection
    const bookingCount = await BookingModel.countDocuments();
    if (bookingCount === 0) {
      const seeded = await BookingModel.insertMany(mockBookings as any);
      summary['bookings'] = seeded.length;
    } else {
      summary['bookings'] = bookingCount;
    }

    // 7. Messages Collection
    const msgCount = await Message.countDocuments();
    if (msgCount === 0) {
      const seededMsgs = mockChatMessages.map((m) => ({
        id: m.id,
        bookingId: m.bookingId,
        senderId: m.senderId,
        senderName: m.senderName,
        senderRole: m.senderRole,
        content: m.content,
        timestamp: m.timestamp,
        read: m.read,
      }));
      const seeded = await Message.insertMany(seededMsgs);
      summary['messages'] = seeded.length;
    } else {
      summary['messages'] = msgCount;
    }

    console.log('[MongoDB Atlas] Database Initialization Summary:', summary);

    return NextResponse.json({
      success: true,
      message: 'MongoDB Atlas collections initialized & populated successfully in database TradePro!',
      database: 'TradePro',
      collections: summary,
    });
  } catch (error: any) {
    console.error('Error initializing MongoDB Atlas database:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
