import { calculateDailyStats } from './dailyStatsCalculator';
import { getToday } from './dailyStatsHelpers';
import {
  getBreakStatsQuery,
  getInProgressTasksQuery,
  getSessionStudyStatsQuery,
  getTodayStatsQuery,
  getUpcomingDeadlinesQuery,
  incrementBreakPenaltyQuery,
  insertTodayStatsQuery,
  updateCalculatedStatsQuery,
  updateSleepHoursQuery,
} from './dailyStatsQueries';

export const getOrCreateTodayStats = async (userId: number) => {
  const today = getToday();
  const existing = await getTodayStatsQuery(userId, today);

  if (existing.rows[0]) {
    return existing.rows[0];
  }

  const created = await insertTodayStatsQuery(userId, today);
  return created.rows[0];
};

export const updateTodaySleepHours = async (
  userId: number,
  sleepHours: number,
) => {
  const today = getToday();

  await getOrCreateTodayStats(userId);
  const result = await updateSleepHoursQuery(userId, today, sleepHours);

  return result.rows[0];
};

export const recalculateTodayStats = async (userId: number) => {
  const today = getToday();

  const stats = await getOrCreateTodayStats(userId);

  const sessionsResult = await getSessionStudyStatsQuery(userId, today);
  const breaksResult = await getBreakStatsQuery(userId, today);
  const deadlinesResult = await getUpcomingDeadlinesQuery(userId);
  const inProgressResult = await getInProgressTasksQuery(userId);

  const totalStudyMs = Number(sessionsResult.rows[0]?.total_study_ms || 0);
  const totalBreakMs = Number(breaksResult.rows[0]?.total_break_ms || 0);

  const totalStudyMinutes = Math.floor(totalStudyMs / 60_000);
  const totalBreakMinutes = Math.floor(totalBreakMs / 60_000);
  const breaksTaken = Number(breaksResult.rows[0]?.breaks_taken || 0);

  const upcomingDeadlines = Number(
    deadlinesResult.rows[0]?.upcoming_deadlines || 0,
  );

  const inProgressCount = Number(
    inProgressResult.rows[0]?.in_progress_count || 0,
  );

  const sleepHours =
    stats.sleep_hours === null || stats.sleep_hours === undefined
      ? null
      : Number(stats.sleep_hours);

  const breakPenaltyPoints = Number(stats.break_penalty_points || 0);

  const calculated = calculateDailyStats({
    sleepHours,
    totalStudyMinutes,
    totalBreakMinutes,
    upcomingDeadlines,
    inProgressCount,
    breakPenaltyPoints,
  });

  const result = await updateCalculatedStatsQuery({
    userId,
    today,
    energy: calculated.energy,
    stress: calculated.stress,
    focus: calculated.focus,
    totalStudyMinutes,
    totalBreakMinutes,
    breaksTaken,
    productivityScore: calculated.productivityScore,
    healthPoints: calculated.healthPoints,
    healthMessage: calculated.healthMessage,
    burnoutRisk: calculated.burnoutRisk,
  });

  return result.rows[0] || (await getOrCreateTodayStats(userId));
};

export const applyBreakIgnorePenalty = async (userId: number, points = 1) => {
  const today = getToday();
  await getOrCreateTodayStats(userId);
  await incrementBreakPenaltyQuery(userId, today, points);
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
