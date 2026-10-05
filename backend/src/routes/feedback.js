import { Router } from 'express';
import { submitFeedback, getFeedbacks } from '../controllers/feedbackController.js';

const router = Router();

// POST /api/feedback
router.post('/', submitFeedback);

// GET /api/feedback
router.get('/', getFeedbacks);

export default router;
