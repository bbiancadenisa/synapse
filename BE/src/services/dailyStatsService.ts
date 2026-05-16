import { pool } from '../config/db';

const clamp = (value: number) => Math.max(0, Math.min(100, value));

const getToday = () => new Date().toISOString().slice(0, 10);

const calculateEnergyFromSleep = (sleepHours: number | null) => {
  if (sleepHours === null || sleepHours === undefined) return 100;

  if (sleepHours >= 8) return 100;
  if (sleepHours >= 7) return 80;
  if (sleepHours >= 6) return 60;
  if (sleepHours >= 5) return 50;

  return 40;
};

const getHealthMessage = (healthPoints: number) => {
  if (healthPoints < 50) {
    return 'Burnout risk detected. You should slow down and recover.';
  }

  if (healthPoints < 60) {
    return 'Your brain needs recovery time. Consider reducing workload today.';
  }

  if (healthPoints < 70) {
    return 'Take it a bit easier today. You are pushing your limits.';
  }

  return 'You are doing okay. Keep a balanced pace.';
};

const getBurnoutRisk = (healthPoints: number) => {
  if (healthPoints < 50) return 'high';
  if (healthPoints < 70) return 'medium';
  return 'low';
};

export const getOrCreateTodayStats = async (userId: number) => {
  const today = getToday();

  const existing = await pool.query(
    `
    SELECT *
    FROM daily_stats
    WHERE user_id = $1 AND date = $2
    `,
    [userId, today],
  );

  if (existing.rows[0]) {
    return existing.rows[0];
  }

  const created = await pool.query(
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
      burnout_risk
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
      100,
      100,
      'You are doing okay. Keep a balanced pace.',
      'low'
    )
    RETURNING *
    `,
    [userId, today],
  );

  return created.rows[0];
};

export const updateTodaySleepHours = async (
  userId: number,
  sleepHours: number,
) => {
  await getOrCreateTodayStats(userId);

  const today = getToday();

  const result = await pool.query(
    `
    UPDATE daily_stats
    SET sleep_hours = $3
    WHERE user_id = $1 AND date = $2
    RETURNING *
    `,
    [userId, today, sleepHours],
  );

  return result.rows[0];
};

export const recalculateTodayStats = async (userId: number) => {
  const today = getToday();

  const stats = await getOrCreateTodayStats(userId);

  const sessionsResult = await pool.query(
    `
    SELECT COALESCE(SUM(study_time_ms), 0)::int AS total_study_ms
    FROM study_sessions
    WHERE user_id = $1
      AND DATE(start_time) = $2
    `,
    [userId, today],
  );

  const breaksResult = await pool.query(
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

  const deadlinesResult = await pool.query(
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

  const inProgressResult = await pool.query(
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

  const totalStudyMs = Number(sessionsResult.rows[0].total_study_ms || 0);
  const totalBreakMs = Number(breaksResult.rows[0].total_break_ms || 0);

  const totalStudyMinutes = Math.floor(totalStudyMs / 60_000);
  const totalBreakMinutes = Math.floor(totalBreakMs / 60_000);
  const breaksTaken = Number(breaksResult.rows[0].breaks_taken || 0);

  const upcomingDeadlines = Number(
    deadlinesResult.rows[0].upcoming_deadlines || 0,
  );
  const inProgressCount = Number(
    inProgressResult.rows[0].in_progress_count || 0,
  );

  const sleepHours =
    stats.sleep_hours === null || stats.sleep_hours === undefined
      ? null
      : Number(stats.sleep_hours);

  const breakPenaltyPoints = Number(stats.break_penalty_points || 0);

  let energy = calculateEnergyFromSleep(sleepHours);
  let focus = 100;
  let stress = 0;

  const studiedHours = Math.floor(totalStudyMinutes / 60);

  energy -= studiedHours * 10;
  focus -= studiedHours * 10;

  if (upcomingDeadlines > 3) stress += 20;
  if (upcomingDeadlines > 5) stress += 10;

  if (inProgressCount > 3) focus -= 15;
  if (inProgressCount > 5) focus -= 25;

  const breakRatio =
    totalStudyMinutes > 0 ? totalBreakMinutes / totalStudyMinutes : 0;

  if (breakRatio >= 0.5) {
    energy += 15;
    focus += 15;
  } else if (breakRatio >= 0.45) {
    energy += 10;
    focus += 10;
  } else if (breakRatio >= 0.35) {
    energy += 5;
    focus += 5;
  }

  energy -= breakPenaltyPoints;
  focus -= breakPenaltyPoints;
  stress += breakPenaltyPoints;

  energy = clamp(energy);
  focus = clamp(focus);
  stress = clamp(stress);

  energy = clamp(energy);
  focus = clamp(focus);
  stress = clamp(stress);

  const productivityScore = clamp(
    Math.round(totalStudyMinutes * 0.5 + focus * 0.4 - stress * 0.3),
  );

  const healthPoints = clamp(
    Math.round(energy * 0.35 + focus * 0.35 + (100 - stress) * 0.3),
  );

  const healthMessage = getHealthMessage(healthPoints);
  const burnoutRisk = getBurnoutRisk(healthPoints);

  const result = await pool.query(
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
      userId,
      today,
      energy,
      stress,
      focus,
      totalStudyMinutes,
      totalBreakMinutes,
      breaksTaken,
      productivityScore,
      healthPoints,
      healthMessage,
      burnoutRisk,
    ],
  );

  return result.rows[0];
};

export const applyBreakIgnorePenalty = async (userId: number, points = 1) => {
  await getOrCreateTodayStats(userId);

  const today = getToday();

  await pool.query(
    `
    UPDATE daily_stats
    SET break_penalty_points = COALESCE(break_penalty_points, 0) + $3
    WHERE user_id = $1 AND date = $2
    `,
    [userId, today, points],
  );

  const updatedStats = await recalculateTodayStats(userId);

  return {
    stats: updatedStats,
    penalty: {
      energyChange: -points,
      focusChange: -points,
      stressChange: points,
      points,
    },
  };
};
