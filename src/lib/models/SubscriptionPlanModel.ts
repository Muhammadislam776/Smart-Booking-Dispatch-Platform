import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriptionPlanModel extends Document {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  activeSubscribers: number;
}

const SubscriptionPlanSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    period: { type: String, default: 'month' },
    features: { type: [String], default: [] },
    activeSubscribers: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.SubscriptionPlanModel || mongoose.model<ISubscriptionPlanModel>('SubscriptionPlanModel', SubscriptionPlanSchema);
