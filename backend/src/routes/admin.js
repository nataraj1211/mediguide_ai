import { Router } from 'express';
import {
  getDashboardStats,
  createFacility,
  updateFacility,
  deleteFacility,
  toggleVerifyFacility
} from '../controllers/adminController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// In development / demo environment, allow admin dashboard access with requireAdmin
router.get('/stats', requireAdmin, getDashboardStats);
router.post('/facilities', requireAdmin, createFacility);
router.put('/facilities/:id', requireAdmin, updateFacility);
router.delete('/facilities/:id', requireAdmin, deleteFacility);
router.patch('/facilities/:id/toggle-verify', requireAdmin, toggleVerifyFacility);

export default router;
