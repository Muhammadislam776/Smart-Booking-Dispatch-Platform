import mongoose, { Schema, Document } from 'mongoose';

export interface IVehicleModel extends Document {
  id: string;
  businessId: string;
  registration: string;
  makeModel: string;
  assignedEngineer: string;
  motExpiry: string;
  insuranceExpiry: string;
  status: string;
  fuelLevel: string;
}

const VehicleSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    businessId: { type: String, required: true, default: 'biz_01' },
    registration: { type: String, required: true },
    makeModel: { type: String, required: true },
    assignedEngineer: { type: String, default: 'Alex Sterling' },
    motExpiry: { type: String, default: '2027-03-15' },
    insuranceExpiry: { type: String, default: '2027-01-20' },
    status: { type: String, default: 'Operational' },
    fuelLevel: { type: String, default: '85%' },
  },
  { timestamps: true }
);

export default mongoose.models.VehicleModel || mongoose.model<IVehicleModel>('VehicleModel', VehicleSchema);
