// server/module/booking/booking.controller.ts
import { Request, Response } from 'express';
import { BookingService } from './booking.services';

const createBooking = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, error: 'Unauthorized' });

    const { tutorId, date } = req.body;
    if (!tutorId || !date) throw new Error('tutorId and date are required');

    const booking = await BookingService.createBooking({
      studentId: userId,
      tutorId,
      date: new Date(date),
    });

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, error: 'Booking creation failed', details: err });
  }
};

// Get logged-in user bookings
const getMyBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, error: 'Unauthorized' });

    const bookings = await BookingService.getUserBookings(userId);
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Failed to fetch bookings',
      details: err,
    });
  }
};

// Get single booking details
const getBookingById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, error: 'Unauthorized' });

    const { id } = req.params;
    const booking = await BookingService.getBookingById(id as string, userId);
    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, error: 'Booking not found', details: err });
  }
};

export const BookingController = {
  createBooking,
  getMyBookings,
  getBookingById,
};
