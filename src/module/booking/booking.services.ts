import { BOOKING_STATUS } from '../../../generated/prisma/enums';
import { prisma } from '../../lib/prisma';

interface BookingInput {
  studentId: string;
  tutorId: string;
  date: Date;
}

const createBooking = async (payload: BookingInput) => {
  // check tutor exists
  await prisma.tutorProfile.findUniqueOrThrow({
    where: { id: payload.tutorId },
  });

  return await prisma.booking.create({
    data: {
      studentId: payload.studentId,
      tutorId: payload.tutorId,
      date: payload.date,
      status: BOOKING_STATUS.PENDING,
    },
  });
};

const getUserBookings = async (studentId: string) => {
  return await prisma.booking.findMany({
    where: { studentId },
    include: {
      tutor: {
        include: {
          subjects: { include: { category: true } },
        },
      },
      review: true,
    },
    orderBy: { date: 'desc' },
  });
};

const getBookingById = async (bookingId: string, userId: string) => {
  return await prisma.booking.findFirstOrThrow({
    where: {
      id: bookingId,
      studentId: userId,
    },
    include: {
      tutor: true,
      review: true,
    },
  });
};

export const BookingService = {
  createBooking,
  getUserBookings,
  getBookingById,
};
