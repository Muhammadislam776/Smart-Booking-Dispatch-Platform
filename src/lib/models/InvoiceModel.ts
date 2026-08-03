import mongoose, { Schema, Document } from 'mongoose';

export interface IInvoiceModel extends Document {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  businessId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  issueDate: string;
  dueDate: string;
  items: any[];
  subtotal: number;
  vatAmount: number;
  totalAmount: number;
  status: string;
  stripePaymentId?: string;
  paidAt?: string;
}

const InvoiceSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    invoiceNumber: { type: String, required: true },
    bookingId: { type: String, required: true },
    businessId: { type: String, required: true },
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerAddress: { type: String, required: true },
    issueDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    items: { type: Schema.Types.Mixed, default: [] },
    subtotal: { type: Number, required: true },
    vatAmount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'unpaid' },
    stripePaymentId: { type: String },
    paidAt: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.InvoiceModel || mongoose.model<IInvoiceModel>('InvoiceModel', InvoiceSchema);
