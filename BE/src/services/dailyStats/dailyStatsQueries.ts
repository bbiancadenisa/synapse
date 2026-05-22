import { pool } from '../../config/db';

export const getTodayStatsQuery = async (userId: number, today: string) => {
  return pool.query(
    `
    SELECT *
    FROM daily_stats
    WHERE user_id = $1 AND date = $2
    `,
    [userId, today],
  );
};

export const insertTodayStatsQuery = async (userId: number, today: string) => {
  return pool.query(
    `
    INSERT INTO daily_stats (
      user_id,
      date,
      energy,
      stress,
      focus,
      sleep_hours,
      total_study_minutes,
      total_break_minutes,
      breaks_taken,
      productivity_score,
      health_points,
      health_message,
      burnout_risk,
      break_penalty_points
    )
    VALUES (
      $1,
      $2,
      100,
      0,
      100,
      NULL,
      0,
      0,
      0,
      0,
      100,
      'You are doing okay. Keep a balanced pace.',
      'low',
      0
    )
    RETURNING *
    `,
    [userId, today],
  );
};

export const updateSleepHoursQuery = async (
  userId: number,
  today: string,
  sleepHours: number,
) => {
  return pool.query(
    `
    UPDATE daily_stats
    SET sleep_hours = $3
    WHERE user_id = $1 AND date = $2
    RETURNING *
    `,
    [userId, today, sleepHours],
  );
};

export const getSessionStudyStatsQuery = async (
  userId: number,
  today: string,
) => {
  return pool.query(
    `
    SELECT COALESCE(SUM(study_time_ms), 0)::int AS total_study_ms
    FROM study_sessions
    WHERE user_id = $1
      AND DATE(start_time) = $2
    `,
    [userId, today],
  );
};

export const getBreakStatsQuery = async (userId: number, today: string) => {
  return pool.query(
    `
    SELECT
      COALESCE(COUNT(b.id), 0)::int AS breaks_taken,
      COALESCE(SUM(b.duration_ms), 0)::int AS total_break_ms
    FROM study_session_breaks b
    JOIN study_sessions s
      ON s.id = b.session_id
    WHERE s.user_id = $1
      AND DATE(s.start_time) = $2
      AND b.status = 'ended'
    `,
    [userId, today],
  );
};

export const getUpcomingDeadlinesQuery = async (userId: number) => {
  return pool.query(
    `
    SELECT COUNT(*)::int AS upcoming_deadlines
    FROM tasks t
    JOIN subjects s
      ON s.id = t.subject_id
    WHERE s.user_id = $1
      AND t.status != 'done'
      AND t.deadline >= NOW()
      AND t.deadline <= NOW() + INTERVAL '7 days'
    `,
    [userId],
  );
};

export const getInProgressTasksQuery = async (userId: number) => {
  return pool.query(
    `
    SELECT COUNT(*)::int AS in_progress_count
    FROM tasks t
    JOIN subjects s
      ON s.id = t.subject_id
    WHERE s.user_id = $1
      AND t.status = 'in_progress'
    `,
    [userId],
  );
};

export const updateCalculatedStatsQuery = async (data: {
  userId: number;
  today: string;
  energy: number;
  stress: number;
  focus: number;
  totalStudyMinutes: number;
  totalBreakMinutes: number;
  breaksTaken: number;
  productivityScore: number;
  healthPoints: number;
  healthMessage: string;
  burnoutRisk: string;
}) => {
  return pool.query(
    `
    UPDATE daily_stats
    SET
      energy = $3,
      stress = $4,
      focus = $5,
      total_study_minutes = $6,
      total_break_minutes = $7,
      breaks_taken = $8,
      productivity_score = $9,
      health_points = $10,
      health_message = $11,
      burnout_risk = $12
    WHERE user_id = $1 AND date = $2
    RETURNING *
    `,
    [
      data.userId,
      data.today,
      data.energy,
      data.stress,
      data.focus,
      data.totalStudyMinutes,
      data.totalBreakMinutes,
      data.breaksTaken,
      data.productivityScore,
      data.healthPoints,
      data.healthMessage,
      data.burnoutRisk,
    ],
  );
};

export const incrementBreakPenaltyQuery = async (
  userId: number,
  today: string,
  points: number,
) => {
  return pool.query(
    `
    UPDATE daily_stats
    SET break_penalty_points = COALESCE(break_penalty_points, 0) + $3
    WHERE user_id = $1 AND date = $2
    RETURNING *
    `,
    [userId, today, points],
  );
};
