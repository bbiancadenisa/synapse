import { Request, Response } from 'express';
import * as dailyStatsService from '../services/dailyStats/dailyStatsService';
import { parseSleepHours } from '../validators/dailyStatsValidator';

export const getTodayStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    await dailyStatsService.getOrCreateTodayStats(userId);
    const stats = await dailyStatsService.recalculateTodayStats(userId);

    return res.json(stats);
  } catch (err) {
    console.error('Failed to fetch daily stats:', err);

    return res.status(500).json({
      error: 'Failed to fetch daily stats',
    });
  }
};

export const updateTodaySleep = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const parsedSleepHours = parseSleepHours(req.body.sleepHours);

    if (parsedSleepHours === null) {
      return res.status(400).json({
        error: 'Invalid sleep hours',
      });
    }

    await dailyStatsService.updateTodaySleepHours(userId, parsedSleepHours);
    const stats = await dailyStatsService.recalculateTodayStats(userId);

    return res.json(stats);
  } catch (err) {
    console.error('Failed to update sleep hours:', err);
    return res.status(500).json({
      error: 'Failed to update sleep hours',
    });
  }
};

export const recalculateTodayStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const stats = await dailyStatsService.recalculateTodayStats(userId);
    return res.json(stats);
  } catch (err) {
    console.error('Failed to recalculate stats:', err);
    return res.status(500).json({
      error: 'Failed to recalculate stats',
    });
  }
};
