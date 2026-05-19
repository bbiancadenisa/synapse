import { calculateBurnoutRisk } from './analyticsBurnout';
import { buildInsights } from './analyticsInsights';
import {
  getBestStudyHour,
  getMostIgnoredBreakHour,
  getWorstFocusPeriod,
  mapIgnoredBreaksByHour,
  mapProductivityByHour,
  mapStudyHoursPerWeek,
  mapStudyMinutesPerDay,
  mapWellnessTrends,
  toNumber,
} from './analyticsMappers';
import {
  getBreakOverviewQuery,
  getBurnoutEventsQuery,
  getCurrentMonthStudyDaysQuery,
  getIgnoredBreaksByHourQuery,
  getLast7VsPrevious7Query,
  getProductivityByHourQuery,
  getSessionOverviewQuery,
  getStudyDatesQuery,
  getStudyHoursPerWeekQuery,
  getStudyMinutesPerDayQuery,
  getSubjectAnalyticsQuery,
  getWellnessTrendsQuery,
} from './analyticsQueries';
import { calculateRecoveryAnalytics } from './analyticsRecovery';
import { calculateStreaks } from './analyticsStreaks';
import { buildSubjectAnalyticsSummary } from './analyticsSubjects';

export const getAnalyticsSummary = async (userId: number, range: number) => {
  const [
    dailyStudyResult,
    weeklyStudyResult,
    monthStudyDaysResult,
    overviewResult,
    breakOverviewResult,
    wellnessResult,
    comparisonResult,
    subjectsResult,
    productivityByHourResult,
    ignoredBreaksByHourResult,
    burnoutEventsResult,
    studyDatesResult,
  ] = await Promise.all([
    getStudyMinutesPerDayQuery(userId, range),
    getStudyHoursPerWeekQuery(userId, range),
    getCurrentMonthStudyDaysQuery(userId),
    getSessionOverviewQuery(userId, range),
    getBreakOverviewQuery(userId, range),
    getWellnessTrendsQuery(userId, range),
    getLast7VsPrevious7Query(userId),
    getSubjectAnalyticsQuery(userId, range),
    getProductivityByHourQuery(userId, range),
    getIgnoredBreaksByHourQuery(userId, range),
    getBurnoutEventsQuery(userId, range),
    getStudyDatesQuery(userId, range),
  ]);

  const overview = overviewResult.rows[0] || {};
  const breakOverview = breakOverviewResult.rows[0] || {};
  const comparison = comparisonResult.rows[0] || {};

  const wellnessTrends = mapWellnessTrends(wellnessResult.rows);
  const latestWellness = wellnessTrends[wellnessTrends.length - 1];

  const productivityByHour = mapProductivityByHour(
    productivityByHourResult.rows,
  );

  const ignoredBreaksByHour = mapIgnoredBreaksByHour(
    ignoredBreaksByHourResult.rows,
  );

  const bestStudyHour = getBestStudyHour(productivityByHour);
  const mostIgnoredBreakHour = getMostIgnoredBreakHour(ignoredBreaksByHour);
  const worstFocusPeriod = getWorstFocusPeriod(wellnessTrends);

  const burnoutEvents = burnoutEventsResult.rows;

  const ignoredBreaks = burnoutEvents.filter(
    (event: { type: string }) => event.type === 'break_ignored',
  ).length;

  const penalties = burnoutEvents.filter(
    (event: { type: string }) => event.type === 'penalty_triggered',
  ).length;

  const studyDates = studyDatesResult.rows.map(
    (row: { date: any }) => row.date,
  );
  const streaks = calculateStreaks(studyDates);

  const subjectAnalytics = buildSubjectAnalyticsSummary(subjectsResult.rows);

  const totalStudyMinutes = toNumber(overview.total_study_minutes);
  const totalBreakMinutes = toNumber(breakOverview.total_break_minutes);
  const totalSessions = toNumber(overview.total_sessions);
  const totalBreaks = toNumber(breakOverview.total_breaks);
  const averageSessionMinutes = toNumber(overview.average_session_minutes);

  const burnoutAnalytics = calculateBurnoutRisk({
    latestStress: latestWellness?.stress ?? 0,
    latestEnergy: latestWellness?.energy ?? 100,
    latestFocus: latestWellness?.focus ?? 100,
    ignoredBreaks,
    penalties,
    averageSessionMinutes,
    studiedDays: studyDates.length,
    range,
  });

  const insights = buildInsights({
    currentStreak: streaks.currentStreak,
    longestStreak: streaks.longestStreak,
    last7Minutes: toNumber(comparison.last_7_days_minutes),
    previous7Minutes: toNumber(comparison.previous_7_days_minutes),
    latestStress: latestWellness?.stress ?? 0,
    latestEnergy: latestWellness?.energy ?? 100,
    latestFocus: latestWellness?.focus ?? 100,
    ignoredBreaks,
    penalties,
    totalBreaks,
    totalSessions,
    bestStudyHour: bestStudyHour.hour,
    mostDemandingSubject: subjectAnalytics.mostDemandingSubject?.subjectName,
    mostNeglectedSubject: subjectAnalytics.mostNeglectedSubject?.subjectName,
  });

  return {
    range,

    streaks: {
      ...streaks,
      studiedDaysThisMonth: toNumber(
        monthStudyDaysResult.rows[0]?.studied_days_this_month,
      ),
    },

    studyOverview: {
      totalStudyMinutes,
      totalSessions,
      averageSessionMinutes,
      longestSessionMinutes: toNumber(overview.longest_session_minutes),
      totalBreaks,
      totalBreakMinutes,
      last7DaysMinutes: toNumber(comparison.last_7_days_minutes),
      previous7DaysMinutes: toNumber(comparison.previous_7_days_minutes),
    },

    charts: {
      studyMinutesPerDay: mapStudyMinutesPerDay(dailyStudyResult.rows),
      studyHoursPerWeek: mapStudyHoursPerWeek(weeklyStudyResult.rows),
      wellnessTrends,
      productivityByHour,
      ignoredBreaksByHour,
    },

    burnoutAnalytics: {
      ...burnoutAnalytics,
      ignoredBreaks,
      penalties,
    },

    subjectAnalytics,

    productivityPatterns: {
      bestStudyHour: bestStudyHour.hour,
      worstFocusPeriod,
      mostIgnoredBreakHour: mostIgnoredBreakHour.hour,
    },

    recoveryAnalytics: calculateRecoveryAnalytics({
      totalStudyMinutes,
      totalBreakMinutes,
      wellnessTrends,
    }),

    insights,
  };
};
