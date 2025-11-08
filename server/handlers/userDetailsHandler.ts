import { Request, Response } from 'express';
import { UserDetails } from '../helpers/userDetailsModel';

export const createUserDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, address1, address2, city, county, country, phoneNumber, email } = req.body;

    if (!firstName || !lastName || !address1 || !city || !county || !country || !phoneNumber || !email) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const userDetails = new UserDetails({
      firstName,
      lastName,
      address1,
      address2: address2 || '',
      city,
      county,
      country,
      phoneNumber,
      email
    });

    const savedUserDetails = await userDetails.save();
    res.status(201).json({ message: 'User details saved successfully', data: savedUserDetails });
  } catch (error) {
    console.error('Error saving user details:', error);
    res.status(500).json({ error: 'Failed to save user details' });
  }
};


