import { Router } from 'express';
import {
  createSessionEvent,
  endStudySession,
  getSessionEvents,
  getStudySessionById,
  startStudySession,
  timeoutStudySession,
  updateStudySession,
} from '../controllers/studySession';

const router = Router();

router.post('/start', startStudySession);
router.get('/:id', getStudySessionById);
router.patch('/:id', updateStudySession);
router.post('/:id/end', endStudySession);
router.post('/:id/timeout', timeoutStudySession);

router.post('/:id/events', createSessionEvent);
router.get('/:id/events', getSessionEvents);

export default router;
