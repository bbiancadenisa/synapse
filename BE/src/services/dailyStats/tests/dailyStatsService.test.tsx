import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  applyBreakIgnorePenalty,
  getOrCreateTodayStats,
  recalculateTodayStats,
  updateTodaySleepHours,
} from '../dailyStatsService';

import * as queries from '../dailyStatsQueries';

vi.mock('../dailyStatsQueries', () => ({
  getTodayStatsQuery: vi.fn(),
  insertTodayStatsQuery: vi.fn(),
  updateSleepHoursQuery: vi.fn(),
  getSessionStudyStatsQuery: vi.fn(),
  getBreakStatsQuery: vi.fn(),
  getUpcomingDeadlinesQuery: vi.fn(),
  getInProgressTasksQuery: vi.fn(),
  updateCalculatedStatsQuery: vi.fn(),
  incrementBreakPenaltyQuery: vi.fn(),
}));

const todayStats = {
  id: 1,
  user_id: 1,
  sleep_hours: 7,
  break_penalty_points: 0,
  energy: 80,
  focus: 100,
  stress: 0,
  total_study_minutes: 0,
  total_break_minutes: 0,
  breaks_taken: 0,
  productivity_score: 0,
  health_points: 90,
  health_message: 'Good',
  burnout_risk: 'low',
};

describe('dailyStatsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns existing stats when today stats already exist', async () => {
    vi.mocked(queries.getTodayStatsQuery).mockResolvedValue({
      rows: [todayStats],
    } as any);

    const result = await getOrCreateTodayStats(1);

    expect(result).toEqual(todayStats);
    expect(queries.insertTodayStatsQuery).not.toHaveBeenCalled();
  });

  it('creates stats when today stats do not exist', async () => {
    vi.mocked(queries.getTodayStatsQuery).mockResolvedValue({
      rows: [],
    } as any);

    vi.mocked(queries.insertTodayStatsQuery).mockResolvedValue({
      rows: [todayStats],
    } as any);

    const result = await getOrCreateTodayStats(1);

    expect(result).toEqual(todayStats);
    expect(queries.insertTodayStatsQuery).toHaveBeenCalled();
  });

  it('updates sleep hours', async () => {
    vi.mocked(queries.getTodayStatsQuery).mockResolvedValue({
      rows: [todayStats],
    } as any);

    vi.mocked(queries.updateSleepHoursQuery).mockResolvedValue({
      rows: [{ ...todayStats, sleep_hours: 8 }],
    } as any);

    const result = await updateTodaySleepHours(1, 8);

    expect(queries.updateSleepHoursQuery).toHaveBeenCalled();
    expect(result.sleep_hours).toBe(8);
  });

  it('recalculates today stats', async () => {
    vi.mocked(queries.getTodayStatsQuery).mockResolvedValue({
      rows: [todayStats],
    } as any);

    vi.mocked(queries.getSessionStudyStatsQuery).mockResolvedValue({
      rows: [{ total_study_ms: 60 * 60 * 1000 }],
    } as any);

    vi.mocked(queries.getBreakStatsQuery).mockResolvedValue({
      rows: [{ total_break_ms: 10 * 60 * 1000, breaks_taken: 1 }],
    } as any);

    vi.mocked(queries.getUpcomingDeadlinesQuery).mockResolvedValue({
      rows: [{ upcoming_deadlines: 0 }],
    } as any);

    vi.mocked(queries.getInProgressTasksQuery).mockResolvedValue({
      rows: [{ in_progress_count: 0 }],
    } as any);

    vi.mocked(queries.updateCalculatedStatsQuery).mockResolvedValue({
      rows: [{ ...todayStats, total_study_minutes: 60 }],
    } as any);

    const result = await recalculateTodayStats(1);

    expect(queries.updateCalculatedStatsQuery).toHaveBeenCalled();
    expect(result.total_study_minutes).toBe(60);
  });

  it('applies break ignore penalty', async () => {
    vi.mocked(queries.getTodayStatsQuery).mockResolvedValue({
      rows: [todayStats],
    } as any);

    vi.mocked(queries.incrementBreakPenaltyQuery).mockResolvedValue({
      rows: [{ ...todayStats, break_penalty_points: 1 }],
    } as any);

    vi.mocked(queries.getSessionStudyStatsQuery).mockResolvedValue({
      rows: [{ total_study_ms: 0 }],
    } as any);

    vi.mocked(queries.getBreakStatsQuery).mockResolvedValue({
      rows: [{ total_break_ms: 0, breaks_taken: 0 }],
    } as any);

    vi.mocked(queries.getUpcomingDeadlinesQuery).mockResolvedValue({
      rows: [{ upcoming_deadlines: 0 }],
    } as any);

    vi.mocked(queries.getInProgressTasksQuery).mockResolvedValue({
      rows: [{ in_progress_count: 0 }],
    } as any);

    vi.mocked(queries.updateCalculatedStatsQuery).mockResolvedValue({
      rows: [{ ...todayStats, energy: 79, focus: 99, stress: 1 }],
    } as any);

    const result = await applyBreakIgnorePenalty(1, 1);

    expect(queries.incrementBreakPenaltyQuery).toHaveBeenCalledWith(
      1,
      expect.any(String),
      1,
    );

    expect(result.penalty).toEqual({
      energyChange: -1,
      focusChange: -1,
      stressChange: 1,
      points: 1,
    });
  });
});
