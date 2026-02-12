import express from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../../constants/role';
import { TutorController } from './tutor.controller';

const router = express.Router();

/**
 * Create Tutor Profile
 */
router.post('/', auth(UserRole.USER), TutorController.createTutorProfile);

/**
 * Public Routes
 */
router.get('/', TutorController.getAllTutors);
router.get('/:id', TutorController.getSingleTutor);

/**
 * Update Tutor
 */
router.patch(
  '/:id',
  auth(UserRole.TUTOR, UserRole.ADMIN),
  TutorController.updateTutorProfile,
);

/**
 * Delete Tutor
 */
router.delete('/:id', auth(UserRole.ADMIN), TutorController.deleteTutorProfile);

export default router;
