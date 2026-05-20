import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  getTodayStats,
  updateTodaySleepHours,
} from '../../services/dailyStats';
import { useDailyStats } from '../useDailyStats';

vi.mock('../../services/dailyStats', () => ({
  getTodayStats: vi.fn(),
  updateTodaySleepHours: vi.fn(),
}));

const stats = {
  energy: 80,
  focus: 75,
  stress: 30,
  sleep_hours: 7,
  total_study_minutes: 120,
  total_break_minutes: 20,
  breaks_taken: 2,
  productivity_score: 70,
  health_points: 82,
  health_message: 'Good',
  burnout_risk: 'low',
};

describe('useDailyStats', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads today stats', async () => {
    vi.mocked(getTodayStats).mockResolvedValue(stats as any);

    const { result } = renderHook(() => useDailyStats());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.stats).toEqual(stats);
    expect(result.current.sleepHours).toBe('7');
  });

  it('updates sleep hours', async () => {
    vi.mocked(getTodayStats).mockResolvedValue(stats as any);
    vi.mocked(updateTodaySleepHours).mockResolvedValue({
      ...stats,
      sleep_hours: 8,
    } as any);

    const { result } = renderHook(() => useDailyStats());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setSleepHours('8');
    });

    await act(async () => {
      await result.current.handleSaveSleep();
    });

    expect(updateTodaySleepHours).toHaveBeenCalledWith(8);
  });
});
