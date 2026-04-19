import { Request, Response } from 'express';
import { pool } from '../config/db';
type Difficulty = 'low' | 'medium' | 'high';

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name, description, difficulty, estimated_total_hours } = req.body;
    const allowedDifficulty = ['low', 'medium', 'high'];

    if (!allowedDifficulty.includes(difficulty)) {
      return res.status(400).json({
        error: 'Invalid difficulty. Use low | medium | high',
      });
    }

    const result = await pool.query(
      `INSERT INTO subjects (user_id, name, description, difficulty, estimated_total_hours)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [1, name, description, difficulty, estimated_total_hours],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating subject' });
  }
};

export const getSubjects = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM subjects WHERE user_id = $1`,
      [1],
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching subjects' });
  }
};

export const deleteSubject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tasks = await pool.query(
      `SELECT * FROM tasks 
       WHERE subject_id = $1 
       AND status IN ('todo', 'in_progress')`,
      [id],
    );

    if (tasks.rows.length > 0) {
      return res.status(400).json({
        error: 'Cannot delete subject with active tasks',
      });
    }

    await pool.query(`DELETE FROM subjects WHERE id = $1`, [id]);

    res.json({ message: 'Subject deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting subject' });
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, description, difficulty, estimated_total_hours } = req.body;

  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  const allowedDifficulty = ['low', 'medium', 'high'];

  if (difficulty !== undefined) {
    if (!allowedDifficulty.includes(difficulty)) {
      return res.status(400).json({
        error: 'Invalid difficulty',
      });
    }

    fields.push(`difficulty = $${index++}`);
    values.push(difficulty);
  }

  if (name !== undefined) {
    fields.push(`name = $${index++}`);
    values.push(name);
  }

  if (description !== undefined) {
    fields.push(`description = $${index++}`);
    values.push(description);
  }

  if (estimated_total_hours !== undefined) {
    fields.push(`estimated_total_hours = $${index++}`);
    values.push(estimated_total_hours);
  }

  if (fields.length === 0) {
    return res.status(400).json({
      error: 'No fields provided for update',
    });
  }

  values.push(id);

  const query = `
    UPDATE subjects
    SET ${fields.join(', ')}
    WHERE id = $${index}
    RETURNING *
  `;

  const result = await pool.query(query, values);

  res.json({
    data: result.rows[0],
  });
};
