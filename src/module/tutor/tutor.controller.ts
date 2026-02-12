import { Request, Response } from 'express';
import { TutorService } from './tutor.service';

/**
 * Create Tutor Profile
 */
const createTutorProfile = async (req: Request, res: Response) => {
  try {
    const result = await TutorService.createTutorProfile(
      req.user!.id,
      req.body,
    );

    res.status(201).json({
      success: true,
      message: 'Tutor profile created successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Create Tutor Error:', error);

    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create tutor profile',
    });
  }
};

/**
 * Get All Tutors
 */
const getAllTutors = async (req: Request, res: Response) => {
  try {
    const result = await TutorService.getAllTutors();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Get All Tutors Error:', error);

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch tutors',
    });
  }
};

/**
 * Get Single Tutor
 */
const getSingleTutor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await TutorService.getSingleTutor(id as string);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Get Single Tutor Error:', error);

    res.status(404).json({
      success: false,
      message: error.message || 'Tutor not found',
    });
  }
};

/**
 * Update Tutor
 */
const updateTutorProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await TutorService.updateTutorProfile(
      id as string,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: 'Tutor profile updated successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Update Tutor Error:', error);

    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update tutor profile',
    });
  }
};

/**
 * Delete Tutor
 */
const deleteTutorProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await TutorService.deleteTutorProfile(id as string);

    res.status(200).json({
      success: true,
      message: 'Tutor profile deleted successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Delete Tutor Error:', error);

    res.status(400).json({
      success: false,
      message: error.message || 'Failed to delete tutor profile',
    });
  }
};

export const TutorController = {
  createTutorProfile,
  getAllTutors,
  getSingleTutor,
  updateTutorProfile,
  deleteTutorProfile,
};
