const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://sanajavaidkhan44_db_user:Qs7WuDpnh5JnP0Z9@cluster0.2eke6iv.mongodb.net/TradePro?retryWrites=true&w=majority';

async function main() {
  console.log('Connecting to MongoDB Atlas Cluster0 TradePro database...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB Atlas TradePro Database!');

  const db = mongoose.connection.db;

  // 1. Attendance Collection
  const attCol = db.collection('attendancemodels');
  if (await attCol.countDocuments() === 0) {
    await attCol.insertMany([
      { id: 'att_1', engineerId: 'eng_1', engineerName: 'Alex Sterling', date: '2026-08-03', clockInTime: '07:45 AM', clockOutTime: '05:30 PM', totalHours: 9.75, status: 'Present', location: 'London HQ (W1U 68A)' },
      { id: 'att_2', engineerId: 'eng_2', engineerName: 'David Gascoigne', date: '2026-08-03', clockInTime: '08:00 AM', clockOutTime: '05:00 PM', totalHours: 9.0, status: 'Present', location: 'London (E14 5AB)' }
    ]);
    console.log('✅ Seeded attendancemodels collection!');
  }

  const collections = await db.listCollections().toArray();
  console.log('\n🔥 ALL LIVE COLLECTIONS IN YOUR MONGODB ATLAS DATABASE (TradePro):');
  collections.forEach(c => console.log(`   - ${c.name}`));

  await mongoose.disconnect();
}

main().catch(console.error);
