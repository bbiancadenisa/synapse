import { pool } from '../../config/db';

export const getStudyMinutesPerDayQuery = async (
  userId: number,
  range: number,
) => {
  return pool.query(
    `
    SELECT
      DATE(start_time) AS date,
      FLOOR(COALESCE(SUM(study_time_ms), 0) / 60000)::int AS study_minutes
    FROM study_sessions
    WHERE user_id = $1
      AND start_time >= CURRENT_DATE - ($2::int - 1) * INTERVAL '1 day'
    GROUP BY DATE(start_time)
    ORDER BY date ASC
    `,
    [userId, range],
  );
};

export const getStudyHoursPerWeekQuery = async (
  userId: number,
  range: number,
) => {
  return pool.query(
    `
    SELECT
      DATE_TRUNC('week', start_time)::date AS week_start,
      ROUND(
        (COALESCE(SUM(study_time_ms), 0) / 3600000.0)::numeric,
        2
      )::float AS study_hours
    FROM study_sessions
    WHERE user_id = $1
      AND start_time >= CURRENT_DATE - ($2::int - 1) * INTERVAL '1 day'
    GROUP BY DATE_TRUNC('week', start_time)
    ORDER BY week_start ASC
    `,
    [userId, range],
  );
};

export const getCurrentMonthStudyDaysQuery = async (userId: number) => {
  return pool.query(
    `
    SELECT COUNT(DISTINCT DATE(start_time))::int AS studied_days_this_month
    FROM study_sessions
    WHERE user_id = $1
      AND start_time >= DATE_TRUNC('month', CURRENT_DATE)
      AND COALESCE(study_time_ms, 0) > 0
    `,
    [userId],
  );
};

export const getSessionOverviewQuery = async (
  userId: number,
  range: number,
) => {
  return pool.query(
    `
    SELECT
      COUNT(*)::int AS total_sessions,
      FLOOR(COALESCE(SUM(study_time_ms), 0) / 60000)::int AS total_study_minutes,
      FLOOR(COALESCE(AVG(NULLIF(study_time_ms, 0)), 0) / 60000)::int AS average_session_minutes,
      FLOOR(COALESCE(MAX(study_time_ms), 0) / 60000)::int AS longest_session_minutes
    FROM study_sessions
    WHERE user_id = $1
      AND start_time >= CURRENT_DATE - ($2::int - 1) * INTERVAL '1 day'
    `,
    [userId, range],
  );
};

export const getBreakOverviewQuery = async (userId: number, range: number) => {
  return pool.query(
    `
    SELECT
      COUNT(b.id)::int AS total_breaks,
      FLOOR(COALESCE(SUM(b.duration_ms), 0) / 60000)::int AS total_break_minutes
    FROM study_session_breaks b
    JOIN study_sessions s
      ON s.id = b.session_id
    WHERE s.user_id = $1
      AND s.start_time >= CURRENT_DATE - ($2::int - 1) * INTERVAL '1 day'
      AND b.status = 'ended'
    `,
    [userId, range],
  );
};

export const getWellnessTrendsQuery = async (userId: number, range: number) => {
  return pool.query(
    `
    SELECT
      date,
      energy,
      focus,
      stress,
      health_points,
      burnout_risk
    FROM daily_stats
    WHERE user_id = $1
      AND date >= CURRENT_DATE - ($2::int - 1) * INTERVAL '1 day'
    ORDER BY date ASC
    `,
    [userId, range],
  );
};

export const getLast7VsPrevious7Query = async (userId: number) => {
  return pool.query(
    `
    SELECT
      FLOOR(
        COALESCE(SUM(study_time_ms) FILTER (
          WHERE start_time >= CURRENT_DATE - INTERVAL '6 days'
        ), 0) / 60000
      )::int AS last_7_days_minutes,

      FLOOR(
        COALESCE(SUM(study_time_ms) FILTER (
          WHERE start_time >= CURRENT_DATE - INTERVAL '13 days'
            AND start_time < CURRENT_DATE - INTERVAL '6 days'
        ), 0) / 60000
      )::int AS previous_7_days_minutes
    FROM study_sessions
    WHERE user_id = $1
      AND start_time >= CURRENT_DATE - INTERVAL '13 days'
    `,
    [userId],
  );
};

export const getSubjectAnalyticsQuery = async (
  userId: number,
  range: number,
) => {
  return pool.query(
    `
    SELECT
      s.id AS subject_id,
      s.name AS subject_name,

      FLOOR(COALESCE(SUM(ss.study_time_ms), 0) / 60000)::int AS total_study_minutes,

      COUNT(DISTINCT ss.id)::int AS total_sessions,

      COUNT(DISTINCT t.id)::int AS total_tasks,

      COUNT(DISTINCT t.id) FILTER (
        WHERE t.status = 'done'
      )::int AS completed_tasks,

      ROUND(
        COALESCE(
          AVG(
            CASE
              WHEN t.estimated_hours > 0 THEN
                LEAST(
                  COALESCE(task_study.total_task_study_ms, 0)
                  / (t.estimated_hours * 3600000.0) * 100,
                  200
                )
              ELSE 0
            END
          ),
          0
        )::numeric,
        1
      )::float AS average_task_progress,

      COUNT(DISTINCT t.id) FILTER (
        WHERE t.status != 'done'
          AND t.deadline IS NOT NULL
          AND t.deadline < NOW()
      )::int AS overdue_tasks,

      COUNT(DISTINCT t.id) FILTER (
        WHERE t.status != 'done'
          AND t.deadline IS NOT NULL
          AND t.deadline >= NOW()
          AND t.deadline <= NOW() + INTERVAL '7 days'
      )::int AS upcoming_deadlines

    FROM subjects s
    LEFT JOIN tasks t
      ON t.subject_id = s.id

    LEFT JOIN study_sessions ss
      ON ss.task_id = t.id
      AND ss.user_id = s.user_id
      AND ss.start_time >= CURRENT_DATE - ($2::int - 1) * INTERVAL '1 day'

    LEFT JOIN (
      SELECT
        task_id,
        SUM(study_time_ms) AS total_task_study_ms
      FROM study_sessions
      WHERE user_id = $1
      GROUP BY task_id
    ) task_study
      ON task_study.task_id = t.id

    WHERE s.user_id = $1
      AND s.is_archived = false

    GROUP BY s.id, s.name
    ORDER BY total_study_minutes DESC
    `,
    [userId, range],
  );
};

export const getProductivityByHourQuery = async (
  userId: number,
  range: number,
) => {
  return pool.query(
    `
    SELECT
      EXTRACT(HOUR FROM start_time)::int AS hour,
      FLOOR(COALESCE(SUM(study_time_ms), 0) / 60000)::int AS study_minutes,
      COUNT(*)::int AS session_count
    FROM study_sessions
    WHERE user_id = $1
      AND start_time >= CURRENT_DATE - ($2::int - 1) * INTERVAL '1 day'
      AND COALESCE(study_time_ms, 0) > 0
    GROUP BY EXTRACT(HOUR FROM start_time)
    ORDER BY hour ASC
    `,
    [userId, range],
  );
};

export const getIgnoredBreaksByHourQuery = async (
  userId: number,
  range: number,
) => {
  return pool.query(
    `
    SELECT
      EXTRACT(HOUR FROM se.created_at)::int AS hour,
      COUNT(*)::int AS ignored_breaks
    FROM session_events se
    JOIN study_sessions ss
      ON ss.id = se.session_id
    WHERE ss.user_id = $1
      AND se.created_at >= CURRENT_DATE - ($2::int - 1) * INTERVAL '1 day'
      AND se.type = 'break_ignored'
    GROUP BY EXTRACT(HOUR FROM se.created_at)
    ORDER BY hour ASC
    `,
    [userId, range],
  );
};

export const getBurnoutEventsQuery = async (userId: number, range: number) => {
  return pool.query(
    `
    SELECT
      se.type,
      se.created_at
    FROM session_events se
    JOIN study_sessions ss
      ON ss.id = se.session_id
    WHERE ss.user_id = $1
      AND se.created_at >= CURRENT_DATE - ($2::int - 1) * INTERVAL '1 day'
      AND se.type IN ('break_ignored', 'penalty_triggered')
    ORDER BY se.created_at ASC
    `,
    [userId, range],
  );
};

export const getStudyDatesQuery = async (userId: number, range: number) => {
  return pool.query(
    `
    SELECT DISTINCT DATE(start_time) AS date
    FROM study_sessions
    WHERE user_id = $1
      AND start_time >= CURRENT_DATE - ($2::int - 1) * INTERVAL '1 day'
      AND COALESCE(study_time_ms, 0) > 0
    ORDER BY date ASC
    `,
    [userId, range],
  );
};
