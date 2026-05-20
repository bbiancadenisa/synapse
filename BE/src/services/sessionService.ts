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

export const getSessionById = async (id: number, userId: number) => {
  return pool.query(
    `
    SELECT *
    FROM study_sessions
    WHERE id = $1
      AND user_id = $2
    `,
    [id, userId],
  );
};

export const updateSessionStatus = async (
  id: number,
  userId: number,
  status: string,
) => {
  return pool.query(
    `
    UPDATE study_sessions
    SET status = $3,
        updated_at = NOW()
    WHERE id = $1
      AND user_id = $2
    RETURNING *
    `,
    [id, userId, status],
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

export const getSessionEvents = async (sessionId: number, userId: number) => {
  return pool.query(
    `
    SELECT se.*
    FROM session_events se
    JOIN study_sessions ss
      ON ss.id = se.session_id
    WHERE se.session_id = $1
      AND ss.user_id = $2
    ORDER BY se.created_at ASC
    `,
    [sessionId, userId],
  );
};

export const markTaskAsInProgress = async (taskId: number, userId: number) => {
  return pool.query(
    `
    UPDATE tasks t
    SET status = 'in_progress',
        updated_at = NOW()
    FROM subjects s
    WHERE t.subject_id = s.id
      AND t.id = $1
      AND s.user_id = $2
      AND t.status = 'todo'
    RETURNING t.*
    `,
    [taskId, userId],
  );
};

export const getSessionsByTaskId = async (taskId: number, userId: number) => {
  return pool.query(
    `
    SELECT
      ss.id,
      ss.task_id,
      ss.status,
      ss.start_time,
      ss.end_time,
      ss.planned_duration_minutes,
      ss.study_time_ms,
      ss.created_at,
      COALESCE(COUNT(ssb.id), 0)::int AS break_count
    FROM study_sessions ss
    LEFT JOIN study_session_breaks ssb
      ON ssb.session_id = ss.id
      AND ssb.status = 'ended'
    WHERE ss.task_id = $1
      AND ss.user_id = $2
    GROUP BY ss.id
    ORDER BY ss.created_at DESC
    `,
    [taskId, userId],
  );
};

export const deleteSessionCompletely = async (sessionId: number) => {
  await pool.query(
    `
    DELETE FROM session_events
    WHERE session_id = $1
    `,
    [sessionId],
  );

  await pool.query(
    `
    DELETE FROM study_session_breaks
    WHERE session_id = $1
    `,
    [sessionId],
  );

  await pool.query(
    `
    DELETE FROM study_session_settings
    WHERE session_id = $1
    `,
    [sessionId],
  );

  return pool.query(
    `
    DELETE FROM study_sessions
    WHERE id = $1
    RETURNING *
    `,
    [sessionId],
  );
};
