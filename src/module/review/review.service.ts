import { REVIEW_STATUS } from '../../../generated/prisma/enums';
import { prisma } from '../../lib/prisma';

// payload interface
interface CreateReviewPayload {
  rating: number;
  comment: string;
  studentId: string;
  tutorId: string;
  bookingId: string;
  parentId?: string;
}

const createReview = async (payload: CreateReviewPayload) => {
  // 1. Booking must exist
  await prisma.booking.findUniqueOrThrow({
    where: { id: payload.bookingId },
  });

  // 2. parent review exists if parentId is provided
  if (payload.parentId) {
    await prisma.review.findUniqueOrThrow({ where: { id: payload.parentId } });
  }

  const review = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      studentId: payload.studentId,
      tutorId: payload.tutorId,
      bookingId: payload.bookingId,
      parentId: payload.parentId ?? null, // fix undefined -> null
    },
  });

  return review;
};

const getReviewById = async (id: string) => {
  return await prisma.review.findUnique({
    where: { id },
    include: { replies: true },
  });
};

const getReviewsByTutor = async (tutorId: string) => {
  return await prisma.review.findMany({
    where: { tutorId, parentId: null },
    include: { replies: true },
    orderBy: { createdAt: 'desc' },
  });
};

// Student can update own review
const updateReview = async (
  id: string,
  studentId: string,
  data: Partial<{ rating: number; comment: string }>,
) => {
  const review = await prisma.review.findFirst({
    where: { id, studentId },
  });
  if (!review) throw new Error('Review not found or unauthorized');
  return await prisma.review.update({ where: { id }, data });
};

// Student can delete own review
const deleteReview = async (id: string, studentId: string) => {
  const review = await prisma.review.findFirst({ where: { id, studentId } });
  if (!review) throw new Error('Review not found or unauthorized');
  return await prisma.review.delete({ where: { id } });
};

// Admin can moderate review status
const moderateReview = async (id: string, status: REVIEW_STATUS) => {
  const review = await prisma.review.findUniqueOrThrow({ where: { id } });
  if (review.status === status) throw new Error('Status already set');
  return await prisma.review.update({ where: { id }, data: { status } });
};

export const ReviewService = {
  createReview,
  getReviewById,
  getReviewsByTutor,
  updateReview,
  deleteReview,
  moderateReview,
};
