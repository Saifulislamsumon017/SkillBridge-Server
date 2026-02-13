import express from 'express';
import { CategoryController } from './category.controller';

import { UserRole } from '../../constants/role';
import auth from '../../middleware/auth';

const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:categoryId', CategoryController.getCategoryById);

router.post('/', auth(UserRole.ADMIN), CategoryController.createCategory);

router.patch(
  '/:categoryId',
  auth(UserRole.ADMIN),
  CategoryController.updateCategory,
);

router.delete(
  '/:categoryId',
  auth(UserRole.ADMIN),
  CategoryController.deleteCategory,
);

export default router;
