import { Router } from 'express';
import { getHistory, getHistoryDetail, deleteHistoryItem } from '../controllers/historyController.js';

const router = Router();

// GET /api/history
router.get('/', getHistory);

// GET /api/history/:id
router.get('/:id', getHistoryDetail);

// DELETE /api/history/:id
router.delete('/:id', deleteHistoryItem);

export default router;
