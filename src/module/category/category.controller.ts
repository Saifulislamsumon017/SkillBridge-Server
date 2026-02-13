import { Request, Response } from 'express';
import { CategoryService } from './category.service';

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.createCategory(req.body);

    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: 'Category creation failed',
      details: e instanceof Error ? e.message : e,
    });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.getAllCategories();

    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: 'Category fetch failed',
      details: e,
    });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const result = await CategoryService.getCategoryById(categoryId as string);

    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: 'Category fetch failed',
      details: e,
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const result = await CategoryService.updateCategory(
      categoryId as string,
      req.body,
    );

    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: 'Category update failed',
      details: e instanceof Error ? e.message : e,
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const result = await CategoryService.deleteCategory(categoryId as string);

    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: 'Category delete failed',
      details: e,
    });
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
