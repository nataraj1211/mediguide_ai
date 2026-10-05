import { Router } from 'express';
import {
  getNearby,
  searchFacilities,
  getFacilityById,
  getEmergencyResources
} from '../controllers/healthcareController.js';

const router = Router();

// GET /api/healthcare/emergency
router.get('/emergency', getEmergencyResources);

// GET /api/healthcare/nearby
router.get('/nearby', getNearby);

// GET /api/healthcare/search
router.get('/search', searchFacilities);

// GET /api/healthcare/:id
router.get('/:id', getFacilityById);

export default router;
