import express from 'express';
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasksBySubject,
  updateTask,
} from '../controllers/task';

const router = express.Router();

router.post('/', createTask);
router.get('/:subjectId', getTasksBySubject);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/task/:id', getTaskById);

export default router;
