import { Request, Response } from 'express';
import * as dailyStatsService from '../services/dailyStatsService';

const DEMO_USER_ID = 1;

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
    const { sleepHours } = req.body;

    const parsedSleepHours = Number(sleepHours);

    if (
      sleepHours === undefined ||
      sleepHours === null ||
      Number.isNaN(parsedSleepHours) ||
      parsedSleepHours < 0 ||
      parsedSleepHours > 24
    ) {
      return res.status(400).json({ error: 'Invalid sleep hours' });
    }

    await dailyStatsService.updateTodaySleepHours(
      DEMO_USER_ID,
      parsedSleepHours,
    );

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
