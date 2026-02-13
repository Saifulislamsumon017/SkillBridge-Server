// server/module/tutor/tutor.controller.ts
import { Request, Response } from 'express';
import { TutorService, TutorFilters } from './tutor.service';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
    emailVerified: boolean;
  };
}

// Get all tutors
const getAllTutors = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const filters: TutorFilters = {};

    if (typeof req.query.categoryId === 'string')
      filters.categoryId = req.query.categoryId;
    if (req.query.minRate) filters.minRate = Number(req.query.minRate);
    if (req.query.maxRate) filters.maxRate = Number(req.query.maxRate);
    if (req.query.minRating) filters.minRating = Number(req.query.minRating);

    const tutors = await TutorService.getAllTutors(filters);
    res.status(200).json({ success: true, data: tutors });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, error: 'Failed to fetch tutors', details: err });
  }
};

// Get tutor by ID
const getTutorById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const tutor = await TutorService.getTutorById(id as string);
    res.status(200).json({ success: true, data: tutor });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, error: 'Tutor not found', details: err });
  }
};

// Update Tutor Profile
const updateTutorProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const tutorId = req.user?.id;
    if (!tutorId)
      return res.status(401).json({ success: false, error: 'Unauthorized' });

    const data = req.body;
    const updated = await TutorService.updateTutorProfile(tutorId, data);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, error: 'Update failed', details: err });
  }
};

// Update Availability
const updateAvailability = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const tutorId = req.user?.id;
    if (!tutorId)
      return res.status(401).json({ success: false, error: 'Unauthorized' });

    const slots = req.body.slots;
    if (!Array.isArray(slots)) throw new Error('Slots must be an array');

    const result = await TutorService.updateAvailability(tutorId, slots);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Update availability failed',
      details: err,
    });
  }
};

export const TutorController = {
  getAllTutors,
  getTutorById,
  updateTutorProfile,
  updateAvailability,
};
