import { Router } from 'express';
import { TutorController } from './tutor.controller';
import auth from '../../middleware/auth';
import { UserRole } from '../../constants/role';

const router = Router();

// Public Routes
router.get('/', TutorController.getAllTutors);
router.get('/:id', TutorController.getTutorById);

// Private Routes (Tutor Only)
router.put(
  '/profile',
  auth(UserRole.TUTOR),
  TutorController.updateTutorProfile,
);
router.put(
  '/availability',
  auth(UserRole.TUTOR),
  TutorController.updateAvailability,
);

export default router;
