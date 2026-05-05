import { pool } from '../config/db';

export const createBreak = async (
  sessionId: number,
  plannedBreakMinutes: number,
) => {
  return pool.query(
    `
    INSERT INTO study_session_breaks (
      session_id,
      start_time,
      planned_break_minutes,
      status,
      created_at
    )
    VALUES ($1, NOW(), $2, 'active', NOW())
    RETURNING *
    `,
    [sessionId, plannedBreakMinutes],
  );
};

export const markBreakAccepted = async (breakId: number) => {
  return pool.query(
    `
    UPDATE study_session_breaks
    SET status = 'accepted'
    WHERE id = $1
    RETURNING *
    `,
    [breakId],
  );
};

export const endBreak = async (breakId: number) => {
  return pool.query(
    `
    UPDATE study_session_breaks
    SET end_time = NOW(),
        status = 'ended',
        duration_ms = FLOOR(EXTRACT(EPOCH FROM (NOW() - start_time)) * 1000)
    WHERE id = $1
    RETURNING *
    `,
    [breakId],
  );
};

export const getSessionBreaks = async (sessionId: number) => {
  return pool.query(
    `
    SELECT *
    FROM study_session_breaks
    WHERE session_id = $1
    ORDER BY created_at ASC
    `,
    [sessionId],
  );
};
