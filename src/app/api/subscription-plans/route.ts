import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import SubscriptionPlanModel from '@/lib/models/SubscriptionPlanModel';

const initialPlans = [
  { id: 'plan_1', name: 'Starter Plan', price: 99, period: 'month', features: ['Up to 3 Engineers', 'Basic Dispatching', 'Email Invoices'], activeSubscribers: 42 },
  { id: 'plan_2', name: 'Pro Plan', price: 199, period: 'month', features: ['Up to 10 Engineers', 'AI Proximity Dispatch', 'Stripe Payments', 'PDF Receipts'], activeSubscribers: 118 },
  { id: 'plan_3', name: 'Enterprise Plan', price: 499, period: 'month', features: ['Unlimited Engineers', 'Google Business Integration', 'White-Label Branding', 'Dedicated Support'], activeSubscribers: 880 },
];

export async function GET() {
  try {
    await connectToDatabase();
    let plans = await SubscriptionPlanModel.find().sort({ createdAt: 1 });

    if (plans.length === 0) {
      console.log('[MongoDB Atlas] Seeding initial subscription plans into collection...');
      plans = await SubscriptionPlanModel.insertMany(initialPlans);
    }

    return NextResponse.json({ success: true, count: plans.length, plans });
  } catch (error: any) {
    console.error('Error fetching subscription plans:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newPlan = await SubscriptionPlanModel.create({
      ...body,
      id: body.id || `plan_${Date.now()}`,
    });

    console.log('[MongoDB Atlas] Created new subscription plan:', newPlan.name);
    return NextResponse.json({ success: true, plan: newPlan }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating subscription plan:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, name, price, features } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 });
    }

    const updateFields: any = {};
    if (name) updateFields.name = name;
    if (price !== undefined) updateFields.price = parseFloat(price);
    if (features) updateFields.features = features;

    const updated = await SubscriptionPlanModel.findOneAndUpdate({ id }, updateFields, { new: true });
    console.log(`[MongoDB Atlas] Updated subscription plan ${id}`);

    return NextResponse.json({ success: true, plan: updated });
  } catch (error: any) {
    console.error('Error updating subscription plan:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
