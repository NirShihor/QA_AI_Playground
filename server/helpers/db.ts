import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const MONGODB_URI = process.env.MONGODB_API_KEY || process.env.MONGODB_URI || 'mongodb://localhost:27017/qa_ai_playground';

if (process.env.MONGODB_API_KEY || process.env.MONGODB_URI) {
  console.log('MongoDB connection string loaded from .env file');
} else {
  console.warn(`Warning: MONGODB_API_KEY or MONGODB_URI not found in .env file at ${envPath}. Using default local MongoDB connection.`);
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


