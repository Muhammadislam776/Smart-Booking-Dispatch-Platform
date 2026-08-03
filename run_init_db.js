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
  }

  // 3. Invoices Collection
  const invoicesCol = db.collection('invoices');
  if (await invoicesCol.countDocuments() === 0) {
    await invoicesCol.insertMany([
      { id: 'inv_1', invoiceNumber: 'INV-2026-WEIC-081', bookingId: 'b1', businessId: 'biz_01', customerId: 'c1', customerName: 'Eleanor Vance', customerEmail: 'eleanor@vance.co.uk', customerAddress: '42 Kensington High Street, London W8 4PT', issueDate: '2026-08-01', dueDate: '2026-08-15', items: [{ description: 'Emergency Boiler Repair & Diagnostics', quantity: 1, unitPrice: 150.0, amount: 150.0 }], subtotal: 150.0, vatAmount: 30.0, totalAmount: 180.0, status: 'paid', paidAt: '2026-08-01T14:30:00Z', stripePaymentId: 'ch_3N8zX_9921' },
      { id: 'inv_2', invoiceNumber: 'INV-2026-WEIC-082', bookingId: 'b2', businessId: 'biz_01', customerId: 'c2', customerName: 'John Harrison', customerEmail: 'john@harrison.co.uk', customerAddress: '15 Deansgate, Manchester M1 1AE', issueDate: '2026-08-02', dueDate: '2026-08-16', items: [{ description: 'Full Consumer Unit Rewire', quantity: 1, unitPrice: 600.0, amount: 600.0 }], subtotal: 600.0, vatAmount: 120.0, totalAmount: 720.0, status: 'unpaid' }
    ]);
    console.log('✅ Seeded invoices collection!');
  }

  // 4. Audit Logs Collection
  const auditCol = db.collection('auditlogmodels');
  if (await auditCol.countDocuments() === 0) {
    await auditCol.insertMany([
      { id: 'log_1', action: 'MERCHANT_STATUS_UPDATE', actor: 'Super Admin (Sana Khan)', target: 'Yorkshire Emergency Locksmiths', details: 'Status set to Active in MongoDB Atlas', ip: '192.168.1.42', timestamp: '2026-08-03 18:35:10' },
      { id: 'log_2', action: 'STRIPE_PAYMENT_CAPTURED', actor: 'Stripe Webhook Gateway', target: 'Invoice #INV-2026-WEIC-081', details: 'Captured £180.00 via Stripe Connect', ip: '54.187.205.12', timestamp: '2026-08-03 17:12:05' },
      { id: 'log_3', action: 'ENGINEER_DISPATCHED', actor: 'Dispatcher (John Smith)', target: 'Booking #TF-99281-UK', details: 'Dispatched Alex Sterling (ETA: 18 Mins)', ip: '192.168.1.18', timestamp: '2026-08-03 16:40:22' },
      { id: 'log_4', action: 'USER_ROLE_CHANGED', actor: 'Super Admin', target: 'david@weic.co.uk', details: 'Role set to Lead Field Engineer', ip: '192.168.1.42', timestamp: '2026-08-03 14:05:00' }
    ]);
    console.log('✅ Seeded auditlogmodels collection!');
  }

  // 5. Support Tickets Collection
  const ticketsCol = db.collection('supportticketmodels');
  if (await ticketsCol.countDocuments() === 0) {
    await ticketsCol.insertMany([
      { id: 'TK-9921', subject: 'Stripe Payout Bank Verification Delay', customer: 'London Heating & Gas Co.', priority: 'HIGH', status: 'Open', assignedTo: 'Super Admin', created: '2026-08-03 14:00' },
      { id: 'TK-8812', subject: 'GPS Satellite Signal Intermittent in Leeds', customer: 'Yorkshire Locksmiths', priority: 'MEDIUM', status: 'In Progress', assignedTo: 'Tech Support', created: '2026-08-02 11:30' },
      { id: 'TK-7740', subject: 'Custom PDF Invoice Logo Alignment Request', customer: 'Elite Plumbing Ltd', priority: 'LOW', status: 'Resolved', assignedTo: 'Design Team', created: '2026-08-01 09:15' }
    ]);
    console.log('✅ Seeded supportticketmodels collection!');
  }

  const collections = await db.listCollections().toArray();
  console.log('\n🔥 ALL LIVE COLLECTIONS IN YOUR MONGODB ATLAS DATABASE (TradePro):');
  collections.forEach(c => console.log(`   - ${c.name}`));

  await mongoose.disconnect();
}

main().catch(console.error);
