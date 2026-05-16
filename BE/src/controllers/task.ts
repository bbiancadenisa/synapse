import { Request, Response } from 'express';
import { pool } from '../config/db';

// CREATE TASK
export const createTask = async (req: Request, res: Response) => {
  const { subject_id, title, estimated_hours, priority, deadline } = req.body;

  if (!subject_id || !title || estimated_hours == null || !priority) {
    return res.status(400).json({
      error: 'subject_id, title, estimated_hours and priority are required',
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks 
        (subject_id, title, estimated_hours, priority, deadline, status, actual_hours_spent)
       VALUES ($1, $2, $3, $4, $5, 'todo', 0)
       RETURNING *`,
      [subject_id, title, estimated_hours, priority, deadline || null],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating task' });
  }
};

// GET TASKS BY SUBJECT
// GET TASKS BY SUBJECT
export const getTasksBySubject = async (req: Request, res: Response) => {
  const { subjectId } = req.params;
  const { sort = 'created_desc', status } = req.query;

  let orderBy = 't.created_at DESC';

  switch (sort) {
    case 'created_asc':
      orderBy = 't.created_at ASC';
      break;
    case 'deadline_asc':
      orderBy = 't.deadline ASC NULLS LAST';
      break;
    case 'deadline_desc':
      orderBy = 't.deadline DESC NULLS LAST';
      break;
    case 'priority_asc':
      orderBy = 't.priority ASC';
      break;
    case 'priority_desc':
      orderBy = 't.priority DESC';
      break;
  }

  const values: any[] = [subjectId];

  let query = `
    SELECT
      t.*,
      COALESCE(SUM(ss.study_time_ms), 0)::int AS total_study_ms
    FROM tasks t
    LEFT JOIN study_sessions ss
      ON ss.task_id = t.id
    WHERE t.subject_id = $1
  `;

  if (status) {
    query += ` AND t.status = $2`;
    values.push(status);
  }

  query += `
    GROUP BY t.id
    ORDER BY ${orderBy}
  `;

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching task' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, estimated_hours, deadline, status, priority } =
    req.body;

  try {
    const existing = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [
      id,
    ]);

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = existing.rows[0];

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1,
           description = $2,
           estimated_hours = $3,
           deadline = $4,
           status = $5,
           priority = $6
       WHERE id = $7
       RETURNING *`,
      [
        title ?? task.title,
        description ?? task.description,
        estimated_hours ?? task.estimated_hours,
        deadline ?? task.deadline,
        status ?? task.status,
        priority ?? task.priority,
        id,
      ],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const activeSession = await pool.query(
      `SELECT 1 FROM study_sessions 
       WHERE task_id = $1 AND end_time IS NULL 
       LIMIT 1`,
      [id],
    );

    if (activeSession.rows.length > 0) {
      return res.status(400).json({
        error: 'Cannot delete task with active study session',
      });
    }

    await pool.query(`DELETE FROM study_sessions WHERE task_id = $1`, [id]);

    await pool.query(`DELETE FROM tasks WHERE id = $1`, [id]);

    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting task' });
  }
};
