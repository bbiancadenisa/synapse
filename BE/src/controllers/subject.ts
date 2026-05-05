import { Request, Response } from 'express';
import { pool } from '../config/db';

type Difficulty = 'low' | 'medium' | 'high';

const allowedDifficulty: Difficulty[] = ['low', 'medium', 'high'];

//CREATE SUBJECT
export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name, description, difficulty, color, overall_deadline } = req.body;

    const allowedDifficulty: Difficulty[] = ['low', 'medium', 'high'];

    if (!name || !difficulty) {
      return res.status(400).json({
        error: 'Name and difficulty are required',
      });
    }

    if (!allowedDifficulty.includes(difficulty)) {
      return res.status(400).json({
        error: 'Invalid difficulty. Use low | medium | high',
      });
    }

    // check duplicate name per user
    const existing = await pool.query(
      `SELECT id FROM subjects WHERE user_id = $1 AND name = $2`,
      [1, name],
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        error: 'Subject name already exists',
      });
    }

    const result = await pool.query(
      `
      INSERT INTO subjects (
        user_id,
        name,
        description,
        difficulty,
        color,
        overall_deadline,
        estimated_total_hours,
        actual_hours_spent
      )
      VALUES ($1, $2, $3, $4, $5, $6, 0, 0)
      RETURNING *
      `,
      [
        1,
        name,
        description || null,
        difficulty,
        color || null,
        overall_deadline || null,
      ],
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error creating subject' });
  }
};

//GET SUBJECTS
export const getSubjects = async (req: Request, res: Response) => {
  try {
    const { difficulty, archived, sort } = req.query;

    let query = `
      SELECT *
      FROM subjects
      WHERE user_id = $1
    `;

    const values: any[] = [1];
    let index = 2;

    if (difficulty) {
      query += ` AND difficulty = $${index++}`;
      values.push(difficulty);
    }

    if (archived !== undefined) {
      query += ` AND is_archived = $${index++}`;
      values.push(archived === 'true');
    } else {
      query += ` AND is_archived = false`;
    }

    const sortMap: Record<string, string> = {
      // DATE
      created_desc: 'created_at DESC',
      created_asc: 'created_at ASC',

      // NAME
      name_asc: 'name ASC',
      name_desc: 'name DESC',

      // DEADLINE
      deadline_asc: 'overall_deadline ASC NULLS LAST',
      deadline_desc: 'overall_deadline DESC NULLS LAST',

      // DIFFICULTY (low < medium < high)
      difficulty_asc: `
        CASE difficulty
          WHEN 'low' THEN 1
          WHEN 'medium' THEN 2
          WHEN 'high' THEN 3
        END ASC
      `,
      difficulty_desc: `
        CASE difficulty
          WHEN 'low' THEN 1
          WHEN 'medium' THEN 2
          WHEN 'high' THEN 3
        END DESC
      `,
    };

    const orderBy = sortMap[sort as string] || sortMap.created_desc;

    query += ` ORDER BY ${orderBy}`;

    const result = await pool.query(query, values);

    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching subjects' });
  }
};

//DELETE SUBJECT
export const deleteSubject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tasks = await pool.query(
      `SELECT status FROM tasks WHERE subject_id = $1`,
      [id],
    );

    const hasProgress = tasks.rows.some(
      (t) => t.status === 'in_progress' || t.status === 'done',
    );

    if (hasProgress) {
      return res.status(400).json({
        error:
          'Cannot delete subject with started or completed tasks. Archive instead.',
      });
    }

    // safe delete all tasks (optional cleanup)
    await pool.query(`DELETE FROM tasks WHERE subject_id = $1`, [id]);

    await pool.query(`DELETE FROM subjects WHERE id = $1`, [id]);

    res.json({ message: 'Subject deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting subject' });
  }
};

// UPDATE SUBJECT
export const updateSubject = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, description, difficulty, color, overall_deadline } = req.body;

  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  try {
    if (difficulty !== undefined) {
      if (!allowedDifficulty.includes(difficulty)) {
        return res.status(400).json({ error: 'Invalid difficulty' });
      }

      fields.push(`difficulty = $${index++}`);
      values.push(difficulty);
    }

    if (name !== undefined) {
      const existing = await pool.query(
        `SELECT id FROM subjects WHERE user_id = $1 AND name = $2 AND id != $3`,
        [1, name, id],
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
      const deadlineDate = new Date(overall_deadline);

      if (isNaN(deadlineDate.getTime())) {
        return res.status(400).json({
          error: 'Invalid deadline format',
        });
      }

      if (deadlineDate < new Date()) {
        return res.status(400).json({
          error: 'Deadline cannot be in the past',
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

    values.push(id);

    const query = `
      UPDATE subjects
      SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $${index}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    return res.json({ data: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error updating subject' });
  }
};

// GET SUBJECT BY ID
export const getSubjectById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const subject = await pool.query(
    `SELECT * FROM subjects WHERE id = $1 AND user_id = $2`,
    [id, 1],
  );

  const tasks = await pool.query(
    `SELECT * FROM tasks WHERE subject_id = $1 ORDER BY created_at DESC`,
    [id],
  );

  res.json({
    subject: subject.rows[0],
    tasks: tasks.rows,
  });
};
