import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  id: string;
  bookingId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  timestamp: string;
  read: boolean;
}

const MessageSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    bookingId: { type: String, required: true },
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    senderRole: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
