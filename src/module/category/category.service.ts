import { prisma } from '../../lib/prisma';

const createCategory = async (payload: { name: string }) => {
  const existing = await prisma.category.findUnique({
    where: {
      name: payload.name,
    },
    select: { id: true },
  });

  if (existing) {
    throw new Error('Category already exists!');
  }

  return await prisma.category.create({
    data: payload,
  });
};

const getAllCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

const getCategoryById = async (id: string) => {
  return await prisma.category.findUniqueOrThrow({
    where: { id },
    include: {
      subjects: {
        include: {
          tutor: {
            include: {
              reviews: true,
            },
          },
        },
      },
    },
  });
};

const updateCategory = async (id: string, data: { name?: string }) => {
  await prisma.category.findUniqueOrThrow({
    where: { id },
  });

  return await prisma.category.update({
    where: { id },
    data,
  });
};

const deleteCategory = async (id: string) => {
  await prisma.category.findUniqueOrThrow({
    where: { id },
  });

  return await prisma.category.delete({
    where: { id },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
