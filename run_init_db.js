const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://sanajavaidkhan44_db_user:Qs7WuDpnh5JnP0Z9@cluster0.2eke6iv.mongodb.net/TradePro?retryWrites=true&w=majority';

async function main() {
  console.log('Connecting to MongoDB Atlas Cluster0 TradePro database...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB Atlas TradePro Database!');

  const db = mongoose.connection.db;

  // 1. Merchants Collection
  const merchantsCol = db.collection('merchants');
  if (await merchantsCol.countDocuments() === 0) {
    await merchantsCol.insertMany([
      { id: 'biz_01', name: 'London Heating & Gas Co.', tier: 'Enterprise (£499/mo)', status: 'active', monthlyRevenue: 28450, commissionCollected: 3556.25, joinedDate: '2025-03-15', postcode: 'W8 4PT', engineersCount: 14, stripeConnected: true, slaScore: '99.9%' },
      { id: 'biz_02', name: 'Manchester Electrical Pro Services', tier: 'Enterprise (£499/mo)', status: 'active', monthlyRevenue: 19200, commissionCollected: 2400.0, joinedDate: '2025-06-20', postcode: 'M1 1AE', engineersCount: 8, stripeConnected: true, slaScore: '99.8%' },
      { id: 'biz_03', name: 'Birmingham HVAC & Climate Solutions', tier: 'Pro (£199/mo)', status: 'active', monthlyRevenue: 14800, commissionCollected: 1850.0, joinedDate: '2025-09-10', postcode: 'B1 1BB', engineersCount: 5, stripeConnected: true, slaScore: '99.5%' },
      { id: 'biz_04', name: 'Yorkshire Emergency Locksmiths', tier: 'Starter (£99/mo)', status: 'suspended', monthlyRevenue: 6200, commissionCollected: 775.0, joinedDate: '2026-01-05', postcode: 'LS1 5HD', engineersCount: 2, stripeConnected: false, slaScore: '94.2%' }
    ]);
    console.log('✅ Seeded merchants collection!');
  } else {
    console.log(`ℹ️ merchants collection already has ${await merchantsCol.countDocuments()} documents.`);
  }

  // 2. Notifications Collection
  const notifsCol = db.collection('notifications');
  if (await notifsCol.countDocuments() === 0) {
    await notifsCol.insertMany([
      { id: 'notif_1', title: 'New Booking Created', message: 'Eleanor Vance booked Boiler Performance Audit & Service (#TF-99281-UK)', timestamp: '14:10', read: false, type: 'booking', roleTarget: 'all' },
      { id: 'notif_2', title: 'Engineer Dispatched', message: 'Alex Sterling dispatched to Kensington High Street (ETA: 12 Mins)', timestamp: '14:12', read: false, type: 'dispatch', roleTarget: 'all' },
      { id: 'notif_3', title: 'Stripe Payment Received', message: 'Invoice #INV-2026-WEIC-081 paid £180.00 via Stripe Card', timestamp: '13:45', read: true, type: 'invoice', roleTarget: 'all' },
      { id: 'notif_4', title: 'Gas Safe Compliance Verified', message: 'Annual Gas Safe Audit passed 100% for London Heating & Gas Co.', timestamp: '12:00', read: true, type: 'system', roleTarget: 'all' }
    ]);
    console.log('✅ Seeded notifications collection!');
  } else {
    console.log(`ℹ️ notifications collection already has ${await notifsCol.countDocuments()} documents.`);
  }

  // 3. Invoices Collection
  const invoicesCol = db.collection('invoices');
  if (await invoicesCol.countDocuments() === 0) {
    await invoicesCol.insertMany([
      { id: 'inv_1', invoiceNumber: 'INV-2026-WEIC-081', bookingId: 'b1', businessId: 'biz_01', customerId: 'c1', customerName: 'Eleanor Vance', customerEmail: 'eleanor@vance.co.uk', customerAddress: '42 Kensington High Street, London W8 4PT', issueDate: '2026-08-01', dueDate: '2026-08-15', items: [{ description: 'Emergency Boiler Repair & Diagnostics', quantity: 1, unitPrice: 150.0, amount: 150.0 }], subtotal: 150.0, vatAmount: 30.0, totalAmount: 180.0, status: 'paid', paidAt: '2026-08-01T14:30:00Z', stripePaymentId: 'ch_3N8zX_9921' },
      { id: 'inv_2', invoiceNumber: 'INV-2026-WEIC-082', bookingId: 'b2', businessId: 'biz_01', customerId: 'c2', customerName: 'John Harrison', customerEmail: 'john@harrison.co.uk', customerAddress: '15 Deansgate, Manchester M1 1AE', issueDate: '2026-08-02', dueDate: '2026-08-16', items: [{ description: 'Full Consumer Unit Rewire', quantity: 1, unitPrice: 600.0, amount: 600.0 }], subtotal: 600.0, vatAmount: 120.0, totalAmount: 720.0, status: 'unpaid' }
    ]);
    console.log('✅ Seeded invoices collection!');
  } else {
    console.log(`ℹ️ invoices collection already has ${await invoicesCol.countDocuments()} documents.`);
  }

  // 4. Engineers Collection
  const engineersCol = db.collection('engineers');
  if (await engineersCol.countDocuments() === 0) {
    await engineersCol.insertMany([
      { id: 'eng_1', businessId: 'biz_01', role: 'engineer', name: 'Alex Sterling', email: 'alex@weic.co.uk', phone: '+44 7911 123456', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120', skills: ['Gas Safe', 'Boiler Systems'], certifications: ['Gas Safe Certified #592810'], vehicleRegistration: 'WEIC-882', isAvailable: false, currentLat: 51.5074, currentLng: -0.1278, rating: 4.98, completedJobsCount: 142 },
      { id: 'eng_2', businessId: 'biz_01', role: 'engineer', name: 'David Gascoigne', email: 'david@weic.co.uk', phone: '+44 7890 123456', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120', skills: ['NICEIC Electrical', 'EV Chargers'], certifications: ['NICEIC Approved Contractor'], vehicleRegistration: 'BD68 WXY', isAvailable: true, currentLat: 51.515, currentLng: -0.141, rating: 4.95, completedJobsCount: 98 }
    ]);
    console.log('✅ Seeded engineers collection!');
  } else {
    console.log(`ℹ️ engineers collection already has ${await engineersCol.countDocuments()} documents.`);
  }

  // 5. Customers Collection
  const customersCol = db.collection('customers');
  if (await customersCol.countDocuments() === 0) {
    await customersCol.insertMany([
      { id: 'c1', businessId: 'biz_01', role: 'customer', name: 'Eleanor Vance', email: 'eleanor@vance.co.uk', phone: '+44 7700 900123', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120', address: '42 Kensington High Street, London', postcode: 'W8 4PT', totalBookings: 3 },
      { id: 'c2', businessId: 'biz_01', role: 'customer', name: 'John Harrison', email: 'john@harrison.co.uk', phone: '+44 7700 900456', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120', address: '15 Deansgate, Manchester', postcode: 'M1 1AE', totalBookings: 1 }
    ]);
    console.log('✅ Seeded customers collection!');
  } else {
    console.log(`ℹ️ customers collection already has ${await customersCol.countDocuments()} documents.`);
  }

  const collections = await db.listCollections().toArray();
  console.log('\n🔥 ALL LIVE COLLECTIONS IN YOUR MONGODB ATLAS DATABASE (TradePro):');
  collections.forEach(c => console.log(`   - ${c.name}`));

  await mongoose.disconnect();
}

main().catch(console.error);
