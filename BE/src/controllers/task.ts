import { Request, Response } from 'express';
import { pool } from '../config/db';

// CREATE TASK
export const createTask = async (req: Request, res: Response) => {
  const { subject_id, title, estimated_hours, deadline } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO tasks (subject_id, title, estimated_hours, deadline)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [subject_id, title, estimated_hours, deadline],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating task' });
  }
};

// GET TASKS BY SUBJECT
export const getTasksBySubject = async (req: Request, res: Response) => {
  const { subjectId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM tasks WHERE subject_id = $1 ORDER BY created_at DESC`,
      [subjectId],
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, estimated_hours, deadline, status } = req.body;

  const warning = estimated_hours
    ? 'Changing estimated time affects progress analytics'
    : null;

  try {
    const result = await pool.query(
      `UPDATE tasks
       SET title=$1,
           description=$2,
           estimated_hours=$3,
           deadline=$4,
           status=$5
       WHERE id=$6
       RETURNING *`,
      [title, description, estimated_hours, deadline, status, id],
    );

    res.json({ data: result.rows[0], warning });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const sessions = await pool.query(
      `SELECT * FROM study_sessions WHERE task_id = $1`,
      [id],
    );

    if (sessions.rows.length > 0) {
      return res.status(400).json({
        error: 'Cannot delete task with study sessions',
      });
    }

    await pool.query(`DELETE FROM tasks WHERE id = $1`, [id]);

    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting task' });
  }
};

export const markTaskDone = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE tasks SET status = 'done' WHERE id = $1 RETURNING *`,
      [id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error marking task done' });
  }
};
