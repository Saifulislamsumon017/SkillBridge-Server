import { Request, Response } from 'express';
import { ReviewService } from './review.service';

import { REVIEW_STATUS } from '../../../generated/prisma/enums';

const createReview = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const payload = {
      ...req.body,
      studentId: user?.id,
      parentId: req.body.parentId,
    };
    const review = await ReviewService.createReview(payload);
    res.status(201).json(review);
  } catch (e) {
    res.status(400).json({ error: 'Review creation failed', details: e });
  }
};

const getReviewById = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const review = await ReviewService.getReviewById(reviewId as string);
    res.status(200).json(review);
  } catch (e) {
    res.status(400).json({ error: 'Fetch review failed', details: e });
  }
};

const getReviewsByTutor = async (req: Request, res: Response) => {
  try {
    const { tutorId } = req.params;
    const reviews = await ReviewService.getReviewsByTutor(tutorId as string);
    res.status(200).json(reviews);
  } catch (e) {
    res.status(400).json({ error: 'Fetch reviews failed', details: e });
  }
};

const updateReview = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { reviewId } = req.params;
    const updated = await ReviewService.updateReview(
      reviewId as string,
      user?.id as string,
      req.body,
    );
    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ error: 'Update review failed', details: e });
  }
};

const deleteReview = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { reviewId } = req.params;
    const deleted = await ReviewService.deleteReview(
      reviewId as string,
      user?.id as string,
    );
    res.status(200).json(deleted);
  } catch (e) {
    res.status(400).json({ error: 'Delete review failed', details: e });
  }
};

const moderateReview = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const { status } = req.body as { status: REVIEW_STATUS };
    const updated = await ReviewService.moderateReview(
      reviewId as string,
      status,
    );
    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ error: 'Moderate review failed', details: e });
  }
};

export const ReviewController = {
  createReview,
  getReviewById,
  getReviewsByTutor,
  updateReview,
  deleteReview,
  moderateReview,
};
