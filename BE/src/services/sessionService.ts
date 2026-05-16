import { pool } from '../config/db';

export const createSession = async (data: {
  userId: number;
  taskId: number;
  plannedDurationMinutes: number;
}) => {
  return pool.query(
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
    [data.userId, data.taskId, data.plannedDurationMinutes],
  );
};

export const createSessionSettings = async (data: {
  sessionId: number;
  breakIntervalMinutes: number;
  breakDurationMinutes: number;
}) => {
  return pool.query(
    `
    INSERT INTO study_session_settings (
      session_id,
      break_interval_minutes,
      break_duration_minutes,
      created_at
    )
    VALUES ($1, $2, $3, NOW())
    RETURNING *
    `,
    [data.sessionId, data.breakIntervalMinutes, data.breakDurationMinutes],
  );
};

export const getSessionById = async (id: number, userId = 1) => {
  return pool.query(
    `
    SELECT *
    FROM study_sessions
    WHERE id = $1 AND user_id = $2
    `,
    [id, userId],
  );
};

export const updateSessionStatus = async (id: number, status: string) => {
  return pool.query(
    `
    UPDATE study_sessions
    SET status = $2,
        updated_at = NOW()
    WHERE id = $1
    RETURNING *
    `,
    [id, status],
  );
};

export const endSession = async (
  id: number,
  status: string,
  studyTimeMs = 0,
) => {
  return pool.query(
    `
    UPDATE study_sessions
    SET status = $2,
        study_time_ms = $3,
        end_time = NOW(),
        updated_at = NOW()
    WHERE id = $1
    RETURNING *
    `,
    [id, status, studyTimeMs],
  );
};

export const insertEvent = async (sessionId: number, type: string) => {
  return pool.query(
    `
    INSERT INTO session_events (session_id, type, created_at)
    VALUES ($1, $2, NOW())
    RETURNING *
    `,
    [sessionId, type],
  );
};

export const getSessionEvents = async (sessionId: number) => {
  return pool.query(
    `
    SELECT *
    FROM session_events
    WHERE session_id = $1
    ORDER BY created_at ASC
    `,
    [sessionId],
  );
};

export const markTaskAsInProgress = async (taskId: number) => {
  return pool.query(
    `
    UPDATE tasks
    SET status = 'in_progress',
        updated_at = NOW()
    WHERE id = $1
      AND status = 'todo'
    RETURNING *
    `,
    [taskId],
  );
};
