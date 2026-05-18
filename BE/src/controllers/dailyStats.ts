import { Request, Response } from 'express';
import * as dailyStatsService from '../services/dailyStats/dailyStatsService';
import { DEMO_USER_ID } from '../utils/demoUser';
import { parseSleepHours } from '../validators/dailyStatsValidator';

export const getTodayStats = async (_req: Request, res: Response) => {
  try {
    await dailyStatsService.getOrCreateTodayStats(DEMO_USER_ID);
    const stats = await dailyStatsService.recalculateTodayStats(DEMO_USER_ID);

    return res.json(stats);
  } catch (err) {
    console.error('Failed to fetch daily stats:', err);
    return res.status(500).json({ error: 'Failed to fetch daily stats' });
  }
};

export const updateTodaySleep = async (req: Request, res: Response) => {
  try {
    const sleepHours = parseSleepHours(req.body.sleepHours);

    if (sleepHours === null) {
      return res.status(400).json({ error: 'Invalid sleep hours' });
    }

    await dailyStatsService.updateTodaySleepHours(DEMO_USER_ID, sleepHours);
    const stats = await dailyStatsService.recalculateTodayStats(DEMO_USER_ID);

    return res.json(stats);
  } catch (err) {
    console.error('Failed to update sleep hours:', err);
    return res.status(500).json({ error: 'Failed to update sleep hours' });
  }
};

export const recalculateTodayStats = async (_req: Request, res: Response) => {
  try {
    const stats = await dailyStatsService.recalculateTodayStats(DEMO_USER_ID);
    return res.json(stats);
  } catch (err) {
    console.error('Failed to recalculate stats:', err);
    return res.status(500).json({ error: 'Failed to recalculate stats' });
  }
};
