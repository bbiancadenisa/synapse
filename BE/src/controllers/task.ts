import { Request, Response } from 'express';
import * as subjectService from '../services/subjectService';
import * as taskService from '../services/taskService';
import {
  isValidTaskPriority,
  isValidTaskStatus,
  parseEstimatedHours,
  validateFutureDate,
} from '../validators/taskValidator';

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const {
      subject_id,
      title,
      description,
      estimated_hours,
      priority,
      deadline,
    } = req.body;

    const parsedEstimatedHours = parseEstimatedHours(estimated_hours);

    if (!subject_id || !title || parsedEstimatedHours === null || !priority) {
      return res.status(400).json({
        error: 'subject_id, title, estimated_hours and priority are required',
      });
    }

    const subjectId = Number(subject_id);

    const subject = await subjectService.getSubjectById(subjectId, userId);

    if (!subject.rows[0]) {
      return res.status(404).json({
        error: 'Subject not found',
      });
    }

    if (!isValidTaskPriority(priority)) {
      return res.status(400).json({
        error: 'Invalid priority. Use low | medium | high',
      });
    }

    if (deadline) {
      const deadlineValidation = validateFutureDate(deadline);

      if (!deadlineValidation.valid) {
        return res.status(400).json({
          error: deadlineValidation.error,
        });
      }
    }

    const result = await taskService.createTask({
      subjectId,
      title,
      description,
      estimatedHours: parsedEstimatedHours,
      priority,
      deadline,
    });

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error creating task' });
  }
};

export const getTasksBySubject = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const { subjectId } = req.params;
    const { sort = 'created_desc', status } = req.query;

    if (status && !isValidTaskStatus(status)) {
      return res.status(400).json({
        error: 'Invalid status. Use todo | in_progress | done',
      });
    }

    const result = await taskService.getTasksBySubject({
      subjectId: Number(subjectId),
      userId,
      sort: sort as string,
      status: status as string | undefined,
    });

    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching tasks' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const result = await taskService.getTaskById(Number(id), userId);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Task not found',
      });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching task' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const { id } = req.params;
    const taskId = Number(id);

    const { title, description, estimated_hours, deadline, status, priority } =
      req.body;

    const existing = await taskService.getTaskById(taskId, userId);

    if (existing.rows.length === 0) {
      return res.status(404).json({
        error: 'Task not found',
      });
    }

    const task = existing.rows[0];

    let parsedEstimatedHours = task.estimated_hours;

    if (estimated_hours !== undefined) {
      const parsed = parseEstimatedHours(estimated_hours);

      if (parsed === null) {
        return res.status(400).json({
          error: 'Invalid estimated_hours',
        });
      }

      parsedEstimatedHours = parsed;
    }

    if (priority !== undefined && !isValidTaskPriority(priority)) {
      return res.status(400).json({
        error: 'Invalid priority. Use low | medium | high',
      });
    }

    if (status !== undefined && !isValidTaskStatus(status)) {
      return res.status(400).json({
        error: 'Invalid status. Use todo | in_progress | done',
      });
    }

    if (deadline !== undefined && deadline !== null) {
      const deadlineValidation = validateFutureDate(deadline);

      if (!deadlineValidation.valid) {
        return res.status(400).json({
          error: deadlineValidation.error,
        });
      }
    }

    const result = await taskService.updateTask(taskId, {
      title: title ?? task.title,
      description: description ?? task.description,
      estimatedHours: parsedEstimatedHours,
      deadline: deadline ?? task.deadline,
      status: status ?? task.status,
      priority: priority ?? task.priority,
    });

    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error updating task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const { id } = req.params;
    const taskId = Number(id);

    const existing = await taskService.getTaskById(taskId, userId);

    if (existing.rows.length === 0) {
      return res.status(404).json({
        error: 'Task not found',
      });
    }

    const activeSession = await taskService.getActiveSessionForTask(
      taskId,
      userId,
    );

    if (activeSession.rows.length > 0) {
      return res.status(400).json({
        error: 'Cannot delete task with active study session',
      });
    }

    const existingSessions = await taskService.getStudySessionsForTask(
      taskId,
      userId,
    );

    if (existingSessions.rows.length > 0) {
      return res.status(400).json({
        error:
          'Cannot delete task with existing study sessions. Archive instead.',
      });
    }

    await taskService.deleteTaskById(taskId);

    return res.json({
      message: 'Task deleted',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error deleting task' });
  }
};
