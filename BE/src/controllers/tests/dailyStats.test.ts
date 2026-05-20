import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as dailyStatsService from '../../services/dailyStats/dailyStatsService';
import {
  getTodayStats,
  recalculateTodayStats,
  updateTodaySleep,
} from '../dailyStats';

vi.mock('../../services/dailyStats/dailyStatsService', () => ({
  getOrCreateTodayStats: vi.fn(),
  recalculateTodayStats: vi.fn(),
  updateTodaySleepHours: vi.fn(),
}));

const createRes = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

const stats = {
  energy: 80,
  focus: 75,
  stress: 20,
  sleep_hours: 7,
};

describe('dailyStats controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('gets today stats', async () => {
    const req: any = {
      user: { id: 1 },
    };

    const res = createRes();

    vi.mocked(dailyStatsService.getOrCreateTodayStats).mockResolvedValue(
      stats as any,
    );
    vi.mocked(dailyStatsService.recalculateTodayStats).mockResolvedValue(
      stats as any,
    );

    await getTodayStats(req, res);

    expect(dailyStatsService.getOrCreateTodayStats).toHaveBeenCalledWith(1);
    expect(dailyStatsService.recalculateTodayStats).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(stats);
  });

  it('updates sleep hours', async () => {
    const req: any = {
      user: { id: 1 },
      body: {
        sleepHours: 8,
      },
    };

    const res = createRes();

    vi.mocked(dailyStatsService.updateTodaySleepHours).mockResolvedValue(
      stats as any,
    );
    vi.mocked(dailyStatsService.recalculateTodayStats).mockResolvedValue({
      ...stats,
      sleep_hours: 8,
    } as any);

    await updateTodaySleep(req, res);

    expect(dailyStatsService.updateTodaySleepHours).toHaveBeenCalledWith(1, 8);
    expect(res.json).toHaveBeenCalledWith({
      ...stats,
      sleep_hours: 8,
    });
  });

  it('returns 400 for invalid sleep hours', async () => {
    const req: any = {
      user: { id: 1 },
      body: {
        sleepHours: 30,
      },
    };

    const res = createRes();

    await updateTodaySleep(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Invalid sleep hours',
    });
  });

  it('recalculates today stats', async () => {
    const req: any = {
      user: { id: 1 },
    };

    const res = createRes();

    vi.mocked(dailyStatsService.recalculateTodayStats).mockResolvedValue(
      stats as any,
    );

    await recalculateTodayStats(req, res);

    expect(dailyStatsService.recalculateTodayStats).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(stats);
  });

  it('returns 500 when service fails', async () => {
    const req: any = {
      user: { id: 1 },
    };

    const res = createRes();

    vi.mocked(dailyStatsService.recalculateTodayStats).mockRejectedValue(
      new Error('Failed'),
    );

    await recalculateTodayStats(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Failed to recalculate stats',
    });
  });
});
