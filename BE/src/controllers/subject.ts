import { Request, Response } from 'express';
import * as subjectService from '../services/subjectService';
import { DEMO_USER_ID } from '../utils/demoUser';
import {
  isValidDifficulty,
  parseBooleanQuery,
  validateFutureDate,
} from '../validators/subjectValidator';

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name, description, difficulty, color, overall_deadline } = req.body;

    if (!name || !difficulty) {
      return res.status(400).json({
        error: 'Name and difficulty are required',
      });
    }

    if (!isValidDifficulty(difficulty)) {
      return res.status(400).json({
        error: 'Invalid difficulty. Use low | medium | high',
      });
    }

    const existing = await subjectService.findSubjectByName(DEMO_USER_ID, name);

    if (existing.rows.length > 0) {
      return res.status(400).json({
        error: 'Subject name already exists',
      });
    }

    if (overall_deadline) {
      const deadlineValidation = validateFutureDate(overall_deadline);

      if (!deadlineValidation.valid) {
        return res.status(400).json({
          error: deadlineValidation.error,
        });
      }
    }

    const result = await subjectService.createSubject({
      userId: DEMO_USER_ID,
      name,
      description,
      difficulty,
      color,
      overallDeadline: overall_deadline,
    });

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error creating subject' });
  }
};

export const getSubjects = async (req: Request, res: Response) => {
  try {
    const { difficulty, archived, sort } = req.query;

    if (difficulty && !isValidDifficulty(difficulty)) {
      return res.status(400).json({
        error: 'Invalid difficulty. Use low | medium | high',
      });
    }

    const result = await subjectService.getSubjects({
      userId: DEMO_USER_ID,
      difficulty: difficulty as string | undefined,
      archived: parseBooleanQuery(archived),
      sort: sort as string | undefined,
    });

    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching subjects' });
  }
};

export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subjectId = Number(id);

    const subject = await subjectService.getSubjectById(
      subjectId,
      DEMO_USER_ID,
    );

    if (!subject.rows[0]) {
      return res.status(404).json({
        error: 'Subject not found',
      });
    }

    const tasks = await subjectService.getTasksForDeleteCheck(subjectId);

    const hasProgress = tasks.rows.some(
      (task) => task.status === 'in_progress' || task.status === 'done',
    );

    if (hasProgress) {
      return res.status(400).json({
        error:
          'Cannot delete subject with started or completed tasks. Archive instead.',
      });
    }

    await subjectService.deleteTasksBySubjectId(subjectId);
    await subjectService.deleteSubjectById(subjectId);

    return res.json({
      message: 'Subject deleted successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error deleting subject' });
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subjectId = Number(id);

    const { name, description, difficulty, color, overall_deadline } = req.body;

    const subject = await subjectService.getSubjectById(
      subjectId,
      DEMO_USER_ID,
    );

    if (!subject.rows[0]) {
      return res.status(404).json({
        error: 'Subject not found',
      });
    }

    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    if (difficulty !== undefined) {
      if (!isValidDifficulty(difficulty)) {
        return res.status(400).json({ error: 'Invalid difficulty' });
      }

      fields.push(`difficulty = $${index++}`);
      values.push(difficulty);
    }

    if (name !== undefined) {
      const existing = await subjectService.findSubjectByName(
        DEMO_USER_ID,
        name,
        subjectId,
      );

      if (existing.rows.length > 0) {
        return res.status(400).json({
          error: 'Subject name already exists',
        });
      }

      fields.push(`name = $${index++}`);
      values.push(name);
    }

    if (description !== undefined) {
      fields.push(`description = $${index++}`);
      values.push(description);
    }

    if (color !== undefined) {
      fields.push(`color = $${index++}`);
      values.push(color);
    }

    if (overall_deadline !== undefined) {
      const deadlineValidation = validateFutureDate(overall_deadline);

      if (!deadlineValidation.valid) {
        return res.status(400).json({
          error: deadlineValidation.error,
        });
      }

      fields.push(`overall_deadline = $${index++}`);
      values.push(overall_deadline);
    }

    if (fields.length === 0) {
      return res.status(400).json({
        error: 'No fields provided for update',
      });
    }

    const result = await subjectService.updateSubject(
      subjectId,
      fields,
      values,
      index,
    );

    return res.json({ data: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error updating subject' });
  }
};

export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subjectId = Number(id);

    const subject = await subjectService.getSubjectById(
      subjectId,
      DEMO_USER_ID,
    );

    if (!subject.rows[0]) {
      return res.status(404).json({
        error: 'Subject not found',
      });
    }

    const tasks = await subjectService.getSubjectTasks(subjectId);

    return res.json({
      subject: subject.rows[0],
      tasks: tasks.rows,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching subject' });
  }
};
