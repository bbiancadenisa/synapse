import { Request, Response } from 'express';
import * as analyticsService from '../services/analytics/analyticsService';

export const getAnalyticsSummary = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const range = Number(req.query.range || 7);

    const allowedRanges = [1, 7, 30];

    if (!allowedRanges.includes(range)) {
      return res.status(400).json({
        error: 'Invalid range. Use 1, 7, or 30.',
      });
    }

    const summary = await analyticsService.getAnalyticsSummary(userId, range);

    return res.json(summary);
  } catch (err) {
    console.error('Failed to fetch analytics summary:', err);

    return res.status(500).json({
      error: 'Failed to fetch analytics summary',
    });
  }
};
