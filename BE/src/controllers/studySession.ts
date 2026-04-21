import { Request, Response } from 'express';
import { pool } from '../config/db';
import { startSessionEngine } from '../engine/sessionEngine';

export const startStudySession = async (req: Request, res: Response) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const {
      taskId,
      plannedDurationMinutes,
      breakIntervalMinutes,
      breakDurationMinutes,
    } = req.body;

    // 1. CREATE SESSION
    const sessionResult = await client.query(
      `
      INSERT INTO study_sessions (
        user_id,
        task_id,
        status,
        start_time,
        planned_duration_minutes,
        created_at,
        updated_at
      )
      VALUES ($1, $2, 'running', NOW(), $3, NOW(), NOW())
      RETURNING *
      `,
      [1, taskId, plannedDurationMinutes],
    );

    const session = sessionResult.rows[0];

    // 2. CREATE SETTINGS
    await client.query(
      `
      INSERT INTO study_session_settings (
        session_id,
        break_interval_minutes,
        break_duration_minutes,
        created_at
      )
      VALUES ($1, $2, $3, NOW())
      `,
      [session.id, breakIntervalMinutes, breakDurationMinutes],
    );

    await client.query('COMMIT');
    startSessionEngine({
      sessionId: session.id,
      plannedDurationMinutes,
      breakIntervalMinutes,
      breakDurationMinutes,
    });

    return res.status(201).json(session);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    return res.status(500).json({ error: 'Failed to start session' });
  } finally {
    client.release();
  }
};

export const getStudySessionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT * 
      FROM study_sessions
      WHERE id = $1 AND user_id = $2
      `,
      [id, 1],
    );

    return res.json(result.rows[0] || null);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch session' });
  }
};

export const updateStudySession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ['running', 'paused', 'completed', 'timed_out'];

    if (!allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await pool.query(
      `
      UPDATE study_sessions
      SET status = $1,
          updated_at = NOW()
      WHERE id = $2 AND user_id = $3
      RETURNING *
      `,
      [status, id, 1],
    );

    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to update session' });
  }
};

export const endStudySession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const session = await pool.query(
      `SELECT * FROM study_sessions WHERE id = $1 AND user_id = $2`,
      [id, 1],
    );

    if (!session.rows[0]) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (session.rows[0].status === 'completed') {
      return res.status(400).json({ error: 'Session already completed' });
    }

    const result = await pool.query(
      `
      UPDATE study_sessions
      SET status = 'completed',
          end_time = NOW(),
          updated_at = NOW()
      WHERE id = $1 AND user_id = $2
      RETURNING *
      `,
      [id, 1],
    );

    await pool.query(
      `
      INSERT INTO session_events (session_id, type, created_at)
      VALUES ($1, 'STOP_ACCEPTED', NOW())
      `,
      [id],
    );

    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to end session' });
  }
};

export const timeoutStudySession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE study_sessions
      SET status = 'timed_out',
          end_time = NOW(),
          updated_at = NOW()
      WHERE id = $1 AND status = 'running'
      RETURNING *
      `,
      [id],
    );

    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to timeout session' });
  }
};

export const createSessionEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    const allowedTypes = [
      'BREAK_REMINDER',
      'BREAK_ACCEPTED',
      'BREAK_IGNORED',
      'BREAK_STARTED',
      'BREAK_ENDED',
      'STOP_REMINDER',
      'STOP_ACCEPTED',
      'STOP_IGNORED',
      'PENALTY_TRIGGERED',
      'TIMEOUT',
    ];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid event type' });
    }

    const event = await pool.query(
      `
      INSERT INTO session_events (
        session_id,
        type,
        created_at
      )
      VALUES ($1, $2, NOW())
      RETURNING *
      `,
      [id, type],
    );

    return res.status(201).json(event.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create event' });
  }
};

export const getSessionEvents = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM session_events
      WHERE session_id = $1
      ORDER BY created_at ASC
      `,
      [id],
    );

    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
};
