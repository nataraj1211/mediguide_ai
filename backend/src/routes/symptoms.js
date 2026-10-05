import { Router } from 'express';
import { handleAnalyzeSymptoms } from '../controllers/symptomController.js';

const router = Router();

// POST /api/symptoms/analyze
router.post('/analyze', handleAnalyzeSymptoms);

export default router;
