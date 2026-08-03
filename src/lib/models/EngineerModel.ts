import mongoose, { Schema, Document } from 'mongoose';

export interface IEngineerModel extends Document {
  id: string;
  businessId: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  skills: string[];
  certifications: string[];
  vehicleRegistration: string;
  isAvailable: boolean;
  currentLat: number;
  currentLng: number;
  rating: number;
  completedJobsCount: number;
}

const EngineerSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    businessId: { type: String, required: true },
    role: { type: String, default: 'engineer' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    avatar: { type: String, required: true },
    skills: { type: [String], default: [] },
    certifications: { type: [String], default: [] },
    vehicleRegistration: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    currentLat: { type: Number, default: 51.5074 },
    currentLng: { type: Number, default: -0.1278 },
    rating: { type: Number, default: 4.9 },
    completedJobsCount: { type: Number, default: 50 },
  },
  { timestamps: true }
);

export default mongoose.models.EngineerModel || mongoose.model<IEngineerModel>('EngineerModel', EngineerSchema);
