import { prisma } from '../../lib/prisma';

export interface TutorFilters {
  categoryId?: string;
  minRate?: number;
  maxRate?: number;
  minRating?: number;
}

const getAllTutors = async (filters: TutorFilters) => {
  const where: any = {
    status: 'ACTIVE',
  };

  // Hourly Rate Filter
  if (filters.minRate || filters.maxRate) {
    where.hourlyRate = {};
    if (filters.minRate) where.hourlyRate.gte = filters.minRate;
    if (filters.maxRate) where.hourlyRate.lte = filters.maxRate;
  }

  // Rating Filter
  if (filters.minRating) {
    where.rating = { gte: filters.minRating };
  }

  // Category Filter
  if (filters.categoryId) {
    where.subjects = {
      some: {
        categoryId: filters.categoryId,
      },
    };
  }

  return await prisma.tutorProfile.findMany({
    where,
    include: {
      subjects: {
        include: { category: true },
      },
      availability: true,
    },
    orderBy: { rating: 'desc' },
  });
};

const getTutorById = async (id: string) => {
  return await prisma.tutorProfile.findUniqueOrThrow({
    where: { id },
    include: {
      subjects: { include: { category: true } },
      availability: true,
      reviews: true,
    },
  });
};

const updateTutorProfile = async (
  tutorId: string,
  data: Partial<{
    bio: string;
    hourlyRate: number;
    status: 'ACTIVE' | 'INACTIVE';
  }>,
) => {
  return await prisma.tutorProfile.update({
    where: { id: tutorId },
    data,
  });
};

const updateAvailability = async (
  tutorId: string,
  slots: { day: string; start: string; end: string }[],
) => {
  // Delete old slots first
  await prisma.availability.deleteMany({ where: { tutorId } });

  // Insert new slots
  const created = await prisma.availability.createMany({
    data: slots.map(s => ({ ...s, tutorId })),
  });

  return created;
};

export const TutorService = {
  getAllTutors,
  getTutorById,
  updateTutorProfile,
  updateAvailability,
};
