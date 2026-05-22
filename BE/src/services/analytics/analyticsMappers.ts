import type {
  BurnoutRisk,
  IgnoredBreaksByHour,
  ProductivityByHour,
  WellnessTrend,
} from './analyticsTypes';

export const toNumber = (value: unknown) => Number(value || 0);

export const mapWellnessTrends = (rows: any[]): WellnessTrend[] => {
  return rows.map((row) => ({
    date: row.date,
    energy: toNumber(row.energy),
    focus: toNumber(row.focus),
    stress: toNumber(row.stress),
    healthPoints: toNumber(row.health_points),
    burnoutRisk: row.burnout_risk as BurnoutRisk,
  }));
};

export const mapProductivityByHour = (rows: any[]): ProductivityByHour[] => {
  return rows.map((row) => ({
    hour: toNumber(row.hour),
    studyMinutes: toNumber(row.study_minutes),
    sessionCount: toNumber(row.session_count),
  }));
};

export const mapIgnoredBreaksByHour = (rows: any[]): IgnoredBreaksByHour[] => {
  return rows.map((row) => ({
    hour: toNumber(row.hour),
    ignoredBreaks: toNumber(row.ignored_breaks),
  }));
};

export const mapStudyMinutesPerDay = (rows: any[]) => {
  return rows.map((row) => ({
    date: row.date,
    studyMinutes: toNumber(row.study_minutes),
  }));
};

export const mapStudyHoursPerWeek = (rows: any[]) => {
  return rows.map((row) => ({
    weekStart: row.week_start,
    studyHours: toNumber(row.study_hours),
  }));
};

export const getBestStudyHour = (items: ProductivityByHour[]) => {
  return items.reduce<{
    hour: number | null;
    studyMinutes: number;
  }>(
    (best, item) =>
      item.studyMinutes > best.studyMinutes
        ? {
            hour: item.hour,
            studyMinutes: item.studyMinutes,
          }
        : best,
    {
      hour: null,
      studyMinutes: 0,
    },
  );
};

export const getMostIgnoredBreakHour = (items: IgnoredBreaksByHour[]) => {
  return items.reduce<{
    hour: number | null;
    ignoredBreaks: number;
  }>(
    (highest, item) =>
      item.ignoredBreaks > highest.ignoredBreaks
        ? {
            hour: item.hour,
            ignoredBreaks: item.ignoredBreaks,
          }
        : highest,
    {
      hour: null,
      ignoredBreaks: 0,
    },
  );
};

export const getWorstFocusPeriod = (wellnessTrends: WellnessTrend[]) => {
  if (wellnessTrends.length === 0) return null;

  return wellnessTrends.reduce((worst, item) =>
    item.focus < worst.focus ? item : worst,
  );
};
