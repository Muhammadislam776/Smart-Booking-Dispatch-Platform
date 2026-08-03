import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceModel extends Document {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  emergencySurcharge: number;
  vatRate: string;
}

const ServiceSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    basePrice: { type: Number, required: true },
    emergencySurcharge: { type: Number, default: 40 },
    vatRate: { type: String, default: '20%' },
  },
  { timestamps: true }
);

export default mongoose.models.ServiceModel || mongoose.model<IServiceModel>('ServiceModel', ServiceSchema);
