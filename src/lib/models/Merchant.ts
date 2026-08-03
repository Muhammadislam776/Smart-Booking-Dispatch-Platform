import mongoose, { Schema, Document } from 'mongoose';

export interface IMerchant extends Document {
  id: string;
  name: string;
  tier: string;
  status: 'active' | 'suspended';
  monthlyRevenue: number;
  commissionCollected: number;
  joinedDate: string;
  postcode: string;
  engineersCount: number;
  stripeConnected: boolean;
  slaScore: string;
}

const MerchantSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tier: { type: String, required: true },
    status: { type: String, enum: ['active', 'suspended'], default: 'active' },
    monthlyRevenue: { type: Number, required: true },
    commissionCollected: { type: Number, required: true },
    joinedDate: { type: String, required: true },
    postcode: { type: String, required: true },
    engineersCount: { type: Number, required: true },
    stripeConnected: { type: Boolean, default: true },
    slaScore: { type: String, default: '99.9%' },
  },
  { timestamps: true }
);

export default mongoose.models.Merchant || mongoose.model<IMerchant>('Merchant', MerchantSchema);
