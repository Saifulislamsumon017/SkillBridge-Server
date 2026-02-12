import { TUTOR_STATUS } from '../../../generated/prisma/enums';
import { prisma } from '../../lib/prisma';
import { ICreateTutorProfile, IUpdateTutorProfile } from './tutor.interface';

/**
 * Create Tutor Profile
 */
const createTutorProfile = async (
  userId: string,
  payload: ICreateTutorProfile,
) => {
  const existingTutor = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (existingTutor) {
    throw new Error('Tutor profile already exists');
  }

  const data = {
    userId,
    hourlyRate: payload.hourlyRate,
    bio: payload.bio as string,
  };

  const result = await prisma.tutorProfile.create({
    data,
  });

  // update user role to TUTOR
  await prisma.user.update({
    where: { id: userId },
    data: {
      role: 'TUTOR',
      tutorStatus: TUTOR_STATUS.ACTIVE,
    },
  });

  return result;
};

/**
 * Get All Tutors
 */
const getAllTutors = async () => {
  const result = await prisma.tutorProfile.findMany({
    where: {
      status: TUTOR_STATUS.ACTIVE,
    },
    include: {
      subjects: {
        include: { category: true },
      },
    },
    orderBy: {
      rating: 'desc',
    },
  });

  return result;
};

/**
 * Get Single Tutor
 */
const getSingleTutor = async (id: string) => {
  const result = await prisma.tutorProfile.findUnique({
    where: { id },
    include: {
      subjects: { include: { category: true } },
      availability: true,
      reviews: true,
    },
  });

  if (!result) {
    throw new Error('Tutor not found');
  }

  return result;
};

/**
 * Update Tutor
 */
const updateTutorProfile = async (id: string, payload: IUpdateTutorProfile) => {
  const data: any = {};

  if (payload.bio) {
    data.bio = payload.bio;
  }

  if (payload.hourlyRate) {
    data.hourlyRate = payload.hourlyRate;
  }

  if (payload.status) {
    data.status = payload.status;
  }

  const result = await prisma.tutorProfile.update({
    where: { id },
    data,
  });

  return result;
};

/**
 * Delete Tutor
 */
const deleteTutorProfile = async (id: string) => {
  const result = await prisma.tutorProfile.delete({
    where: { id },
  });

  return result;
};

export const TutorService = {
  createTutorProfile,
  getAllTutors,
  getSingleTutor,
  updateTutorProfile,
  deleteTutorProfile,
};
