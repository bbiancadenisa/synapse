import { Router } from 'express';
import {
  getTodayStats,
  recalculateTodayStats,
  updateTodaySleep,
} from '../controllers/dailyStats';

const router = Router();

router.get('/today', getTodayStats);
router.patch('/today/sleep', updateTodaySleep);
router.post('/today/recalculate', recalculateTodayStats);

export default router;
