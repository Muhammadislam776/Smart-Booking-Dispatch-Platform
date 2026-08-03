import mongoose, { Schema, Document } from 'mongoose';

export interface ISupportTicketModel extends Document {
  id: string;
  subject: string;
  customer: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'Open' | 'In Progress' | 'Resolved';
  assignedTo: string;
  created: string;
}

const SupportTicketSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    customer: { type: String, required: true },
    priority: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'MEDIUM' },
    status: { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' },
    assignedTo: { type: String, default: 'Super Admin' },
    created: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.SupportTicketModel || mongoose.model<ISupportTicketModel>('SupportTicketModel', SupportTicketSchema);
