import express from 'express';
import {
  createTask,
  deleteTask,
  getTasksBySubject,
  markTaskDone,
  updateTask,
} from '../controllers/task';

const router = express.Router();

router.post('/', createTask);
router.get('/:subjectId', getTasksBySubject);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/done', markTaskDone);

export default router;
