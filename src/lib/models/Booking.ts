import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  bookingRef: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceTitle: string;
  category: string;
  status: 'pending' | 'assigned' | 'en_route' | 'arrived' | 'in_progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  postcode: string;
  issueDescription: string;
  isEmergency: boolean;
  assignedEngineerName?: string;
  pricing: {
    basePrice: number;
    labourCost: number;
    materialsCost: number;
    emergencyFee: number;
    subtotal: number;
    vatAmount: number;
    total: number;
  };
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingRef: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerEmail: { type: String, required: true },
    serviceTitle: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'assigned', 'en_route', 'arrived', 'in_progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    scheduledDate: { type: String, required: true },
    scheduledTime: { type: String, required: true },
    address: { type: String, required: true },
    postcode: { type: String, required: true },
    issueDescription: { type: String, required: true },
    isEmergency: { type: Boolean, default: false },
    assignedEngineerName: { type: String },
    pricing: {
      basePrice: Number,
      labourCost: Number,
      materialsCost: Number,
      emergencyFee: Number,
      subtotal: Number,
      vatAmount: Number,
      total: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
