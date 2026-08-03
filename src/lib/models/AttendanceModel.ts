import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendanceModel extends Document {
  id: string;
  engineerId: string;
  engineerName: string;
  date: string;
  clockInTime: string;
  clockOutTime?: string;
  totalHours: number;
  status: string;
  location: string;
}

const AttendanceSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    engineerId: { type: String, required: true },
    engineerName: { type: String, required: true },
    date: { type: String, required: true },
    clockInTime: { type: String, required: true },
    clockOutTime: { type: String },
    totalHours: { type: Number, default: 8.0 },
    status: { type: String, default: 'Present' },
    location: { type: String, default: 'London HQ (W1U 68A)' },
  },
  { timestamps: true }
);

export default mongoose.models.AttendanceModel || mongoose.model<IAttendanceModel>('AttendanceModel', AttendanceSchema);
