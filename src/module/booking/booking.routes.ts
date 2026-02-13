// server/module/booking/booking.routes.ts
import { Router } from 'express';
import { BookingController } from './booking.controller';
import auth from '../../middleware/auth';
import { UserRole } from '../../constants/role';

const router = Router();

// All routes require student login
router.post('/', auth(UserRole.USER), BookingController.createBooking);
router.get('/', auth(UserRole.USER), BookingController.getMyBookings);
router.get('/:id', auth(UserRole.USER), BookingController.getBookingById);

export default router;
