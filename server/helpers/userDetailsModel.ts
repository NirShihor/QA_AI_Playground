import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDetails extends Document {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  county: string;
  country: string;
  phoneNumber: string;
  email: string;
  createdAt: Date;
}

const userDetailsSchema = new Schema<IUserDetails>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: false },
  city: { type: String, required: true },
  county: { type: String, required: true },
  country: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const UserDetails = mongoose.model<IUserDetails>('UserDetails', userDetailsSchema);


