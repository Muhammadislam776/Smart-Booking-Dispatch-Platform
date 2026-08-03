import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLogModel extends Document {
  id: string;
  action: string;
  actor: string;
  target: string;
  details: string;
  ip: string;
  timestamp: string;
}

const AuditLogSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    action: { type: String, required: true },
    actor: { type: String, required: true },
    target: { type: String, required: true },
    details: { type: String, required: true },
    ip: { type: String, default: '192.168.1.1' },
    timestamp: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.AuditLogModel || mongoose.model<IAuditLogModel>('AuditLogModel', AuditLogSchema);
