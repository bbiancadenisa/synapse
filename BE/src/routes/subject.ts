import express from 'express';
import {
  createSubject,
  deleteSubject,
  getSubjectById,
  getSubjects,
  updateSubject,
} from '../controllers/subject';

const router = express.Router();

router.post('/', createSubject);
router.get('/', getSubjects);
router.put('/:id', updateSubject);
router.delete('/:id', deleteSubject);
router.get('/:id', getSubjectById);

export default router;
