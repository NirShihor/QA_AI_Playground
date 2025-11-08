import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  items: Array<{
    productId: number;
    productName: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  items: [{
    productId: { type: Number, required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);

