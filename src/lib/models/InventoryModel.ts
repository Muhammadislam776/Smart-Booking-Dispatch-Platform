import mongoose, { Schema, Document } from 'mongoose';

export interface IInventoryModel extends Document {
  id: string;
  businessId: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minStockLevel: number;
  unitPrice: number;
  supplier: string;
  location: string;
}

const InventorySchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    businessId: { type: String, required: true, default: 'biz_01' },
    name: { type: String, required: true },
    sku: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, default: 10 },
    minStockLevel: { type: Number, required: true, default: 5 },
    unitPrice: { type: Number, required: true, default: 25.0 },
    supplier: { type: String, default: 'Screwfix UK' },
    location: { type: String, default: 'Kensington Warehouse' },
  },
  { timestamps: true }
);

export default mongoose.models.InventoryModel || mongoose.model<IInventoryModel>('InventoryModel', InventorySchema);
