import { Router } from 'express';
import { getAnalyticsSummary } from '../controllers/analytics';

const router = Router();

router.get('/summary', getAnalyticsSummary);

export default router;
