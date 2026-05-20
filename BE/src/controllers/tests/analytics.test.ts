import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as analyticsService from '../../services/analytics/analyticsService';

import { getAnalyticsSummary } from '../analytics';

vi.mock('../../services/analytics/analyticsService', () => ({
  getAnalyticsSummary: vi.fn(),
}));

describe('getAnalyticsSummary', () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      user: {
        id: 1,
      },
      query: {},
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  it('returns analytics summary', async () => {
    const summary = {
      productivity: 80,
    };

    (analyticsService.getAnalyticsSummary as any).mockResolvedValue(summary);

    req.query.range = '7';

    await getAnalyticsSummary(req, res);

    expect(analyticsService.getAnalyticsSummary).toHaveBeenCalledWith(1, 7);

    expect(res.json).toHaveBeenCalledWith(summary);
  });

  it('returns 400 for invalid range', async () => {
    req.query.range = '100';

    await getAnalyticsSummary(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      error: 'Invalid range. Use 1, 7, or 30.',
    });
  });

  it('returns 500 when service throws', async () => {
    (analyticsService.getAnalyticsSummary as any).mockRejectedValue(
      new Error('DB failed'),
    );

    req.query.range = '7';

    await getAnalyticsSummary(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({
      error: 'Failed to fetch analytics summary',
    });
  });
});
