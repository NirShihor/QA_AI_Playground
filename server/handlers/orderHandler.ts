import { Request, Response } from 'express';
import { Order } from '../helpers/orderModel';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, phone, address, city, postalCode, country, items, total } = req.body;

    if (!fullName || !email || !phone || !address || !city || !postalCode || !country || !items || !total) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'Items array is required and must not be empty' });
      return;
    }

    const order = new Order({
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
      country,
      items,
      total
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: 'Order created successfully', orderId: savedOrder._id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

