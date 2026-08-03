const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://sanajavaidkhan44_db_user:Qs7WuDpnh5JnP0Z9@cluster0.2eke6iv.mongodb.net/TradePro?retryWrites=true&w=majority';

async function main() {
  console.log('Connecting to MongoDB Atlas Cluster0 TradePro database...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB Atlas TradePro Database!');

  const db = mongoose.connection.db;

  // 1. Inventory Collection
  const inventoryCol = db.collection('inventorymodels');
  if (await inventoryCol.countDocuments() === 0) {
    await inventoryCol.insertMany([
      { id: 'inv_item_1', businessId: 'biz_01', name: 'Commercial Boiler Pressure Relief Valve (15mm)', sku: 'SFX-9921-BOILER', category: 'Boiler Parts', quantity: 24, minStockLevel: 5, unitPrice: 45.5, supplier: 'Screwfix UK', location: 'London Warehouse' },
      { id: 'inv_item_2', businessId: 'biz_01', name: 'NICEIC 100A Dual RCD Consumer Unit', sku: 'SFX-4412-ELEC', category: 'Electrical', quantity: 8, minStockLevel: 3, unitPrice: 180.0, supplier: 'Toolstation UK', location: 'London Warehouse' },
      { id: 'inv_item_3', businessId: 'biz_01', name: 'High-Velocity Drain Jetter Nozzle Kit', sku: 'SFX-1102-PLUMB', category: 'Plumbing Tools', quantity: 15, minStockLevel: 4, unitPrice: 85.0, supplier: 'Plumbfix UK', location: 'Van #WEIC-882' }
    ]);
    console.log('✅ Seeded inventorymodels collection!');
  }

  // 2. Vehicles Collection
  const vehiclesCol = db.collection('vehiclemodels');
  if (await vehiclesCol.countDocuments() === 0) {
    await vehiclesCol.insertMany([
      { id: 'veh_1', businessId: 'biz_01', registration: 'WEIC-882', makeModel: 'Ford Transit Custom EcoBlue 2024', assignedEngineer: 'Alex Sterling', motExpiry: '2027-05-15', insuranceExpiry: '2027-02-10', status: 'Operational', fuelLevel: '85%' },
      { id: 'veh_2', businessId: 'biz_01', registration: 'BD68 WXY', makeModel: 'Mercedes-Benz Sprinter 314 CDI', assignedEngineer: 'David Gascoigne', motExpiry: '2026-11-20', insuranceExpiry: '2026-09-30', status: 'Operational', fuelLevel: '92%' }
    ]);
    console.log('✅ Seeded vehiclemodels collection!');
  }

  const collections = await db.listCollections().toArray();
  console.log('\n🔥 ALL LIVE COLLECTIONS IN YOUR MONGODB ATLAS DATABASE (TradePro):');
  collections.forEach(c => console.log(`   - ${c.name}`));

  await mongoose.disconnect();
}

main().catch(console.error);
