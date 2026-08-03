import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  role: 'business_owner' | 'dispatcher' | 'engineer' | 'customer' | 'super_admin';
  avatar?: string;
  address?: string;
  postcode?: string;
  skills?: string[];
  vehicleRegistration?: string;
  isAvailable?: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ['business_owner', 'dispatcher', 'engineer', 'customer', 'super_admin'],
      required: true,
    },
    avatar: { type: String },
    address: { type: String },
    postcode: { type: String },
    skills: [{ type: String }],
    vehicleRegistration: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
