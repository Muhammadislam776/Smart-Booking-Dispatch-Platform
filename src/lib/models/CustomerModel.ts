import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomerModel extends Document {
  id: string;
  businessId: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  postcode: string;
  totalBookings: number;
}

const CustomerSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    businessId: { type: String, required: true },
    role: { type: String, default: 'customer' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    avatar: { type: String, required: true },
    address: { type: String, required: true },
    postcode: { type: String, required: true },
    totalBookings: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.models.CustomerModel || mongoose.model<ICustomerModel>('CustomerModel', CustomerSchema);
