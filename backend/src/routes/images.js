import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { handleAnalyzeImage } from '../controllers/imageController.js';

const router = Router();

// POST /api/images/analyze
router.post('/analyze', upload.single('image'), handleAnalyzeImage);

export default router;
