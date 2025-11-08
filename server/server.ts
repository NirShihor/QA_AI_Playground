import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from './helpers/db';
import { createUserDetails } from './handlers/userDetailsHandler';
import { createOrder } from './handlers/orderHandler';

const app: Express = express();
const PORT = 3085;

app.use(cors({
  origin: 'http://localhost:4085',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.post('/api/user-details', createUserDetails);
app.post('/api/orders', createOrder);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

