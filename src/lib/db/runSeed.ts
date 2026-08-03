import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://sanajavaidkhan44_db_user:Qs7WuDpnh5JnP0Z9@cluster0.2eke6iv.mongodb.net/TradePro?retryWrites=true&w=majority';

async function seedMongo() {
  console.log('Connecting to MongoDB Atlas Cluster0...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to TradePro DB!');

  const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    role: String,
    avatar: String,
    address: String,
    postcode: String,
    skills: [String],
    vehicleRegistration: String,
    isAvailable: Boolean,
  }, { timestamps: true });

  const BookingSchema = new mongoose.Schema({
    bookingRef: String,
    customerName: String,
    customerPhone: String,
    customerEmail: String,
    serviceTitle: String,
    category: String,
    status: String,
    scheduledDate: String,
    scheduledTime: String,
    address: String,
    postcode: String,
    issueDescription: String,
    isEmergency: Boolean,
    assignedEngineerName: String,
    pricing: Object,
  }, { timestamps: true });

  const User = mongoose.models.User || mongoose.model('User', UserSchema);
  const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

  await User.deleteMany({});
  const sampleUsers = [
    {
      name: 'Sana Khan (WEIC Owner)',
      email: 'sanajavaidkhan44@weic.co.uk',
      phone: '+44 20 7946 0912',
      role: 'business_owner',
      address: '102 Baker Street, Marylebone',
      postcode: 'W1U 68A',
    },
    {
      name: 'David Gascoigne',
      email: 'david.g@weic.co.uk',
      phone: '+44 7700 900123',
      role: 'engineer',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
      skills: ['Gas Safe Certified', 'Boiler Installation', 'Heat Pump Repair'],
      vehicleRegistration: 'BD68 WXY (Ford Transit)',
      isAvailable: true,
    },
    {
      name: 'James Wright (Part P Electrician)',
      email: 'james.w@weic.co.uk',
      phone: '+44 7700 900456',
      role: 'engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      skills: ['Part P Registered', 'Consumer Unit Upgrade'],
      vehicleRegistration: 'LN21 KJL (Vauxhall Vivaro)',
      isAvailable: true,
    },
    {
      name: 'Eleanor Vance',
      email: 'eleanor.vance@example.co.uk',
      phone: '+44 7890 123456',
      role: 'customer',
      address: '42 Kensington High Street',
      postcode: 'W8 4PT',
    },
  ];

  const createdUsers = await User.insertMany(sampleUsers);
  console.log(`Seeded ${createdUsers.length} users into MongoDB Atlas!`);

  await Booking.deleteMany({});
  const sampleBookings = [
    {
      bookingRef: 'WEIC-94821',
      customerName: 'Eleanor Vance',
      customerPhone: '+44 7890 123456',
      customerEmail: 'eleanor.vance@example.co.uk',
      serviceTitle: 'Emergency Boiler Repair & Diagnostics',
      category: 'plumbing',
      status: 'en_route',
      scheduledDate: '2026-08-01',
      scheduledTime: '08:30 AM',
      address: '42 Kensington High Street, London',
      postcode: 'W8 4PT',
      issueDescription: 'Worcester Bosch boiler displaying Error EA (no spark).',
      isEmergency: true,
      assignedEngineerName: 'David Gascoigne',
      pricing: { subtotal: 247.5, vatAmount: 49.5, total: 297.0 },
    },
    {
      bookingRef: 'WEIC-94822',
      customerName: 'Robert Sterling',
      customerPhone: '+44 7890 654321',
      customerEmail: 'r.sterling@example.co.uk',
      serviceTitle: 'Emergency Lock Out & Cylinders Upgrade',
      category: 'locksmith',
      status: 'assigned',
      scheduledDate: '2026-08-01',
      scheduledTime: '10:00 AM',
      address: '15 Piccadilly Circus, London',
      postcode: 'W1J 0DA',
      issueDescription: 'Front door Yale lock snapped key inside.',
      isEmergency: true,
      assignedEngineerName: "Sarah O'Connor",
      pricing: { subtotal: 247.5, vatAmount: 49.5, total: 297.0 },
    },
  ];

  const createdBookings = await Booking.insertMany(sampleBookings);
  console.log(`Seeded ${createdBookings.length} bookings into MongoDB Atlas!`);

  await mongoose.disconnect();
  console.log('Done!');
}

seedMongo().catch(console.error);
