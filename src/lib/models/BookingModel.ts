import mongoose, { Schema, Document } from 'mongoose';

export interface IBookingModel extends Document {
  id: string;
  bookingRef: string;
  businessId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceId: string;
  serviceTitle: string;
  category: string;
  status: string;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  issueDescription: string;
  photos: string[];
  isEmergency: boolean;
  assignedEngineerId?: string;
  assignedEngineerName?: string;
  assignedEngineerPhone?: string;
  assignedEngineerAvatar?: string;
  assignedEngineerVehicle?: string;
  etaMins?: number;
  pricing: any;
  materialsUsed?: any[];
  engineerNotes?: string;
  signatureUrl?: string;
}

const BookingSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    bookingRef: { type: String, required: true },
    businessId: { type: String, required: true },
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerEmail: { type: String, required: true },
    serviceId: { type: String, required: true },
    serviceTitle: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' },
    scheduledDate: { type: String, required: true },
    scheduledTime: { type: String, required: true },
    address: { type: String, required: true },
    postcode: { type: String, required: true },
    lat: { type: Number, default: 51.5074 },
    lng: { type: Number, default: -0.1278 },
    issueDescription: { type: String, default: '' },
    photos: { type: [String], default: [] },
    isEmergency: { type: Boolean, default: false },
    assignedEngineerId: { type: String },
    assignedEngineerName: { type: String },
    assignedEngineerPhone: { type: String },
    assignedEngineerAvatar: { type: String },
    assignedEngineerVehicle: { type: String },
    etaMins: { type: Number, default: 15 },
    pricing: { type: Schema.Types.Mixed, required: true },
    materialsUsed: { type: Schema.Types.Mixed, default: [] },
    engineerNotes: { type: String, default: '' },
    signatureUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.BookingModel || mongoose.model<IBookingModel>('BookingModel', BookingSchema);
