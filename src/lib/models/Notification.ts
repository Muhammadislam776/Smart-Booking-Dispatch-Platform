import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: string;
  roleTarget?: string;
}

const NotificationSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: String, required: true },
    read: { type: Boolean, default: false },
    type: { type: String, default: 'info' },
    roleTarget: { type: String, default: 'all' },
  },
  { timestamps: true }
);

export default mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);
