import { describe, expect, it } from 'vitest';

import { calculateDailyStats } from '../dailyStatsCalculator';

const baseInput = {
  sleepHours: 8,
  totalStudyMinutes: 0,
  totalBreakMinutes: 0,
  upcomingDeadlines: 0,
  inProgressCount: 0,
  breakPenaltyPoints: 0,
};

describe('calculateDailyStats', () => {
  it('returns healthy default stats at the beginning of the day', () => {
    const result = calculateDailyStats(baseInput);

    expect(result.energy).toBe(100);
    expect(result.focus).toBe(100);
    expect(result.stress).toBe(0);
    expect(result.productivityScore).toBe(0);
    expect(result.healthPoints).toBe(100);
    expect(result.burnoutRisk).toBe('low');
  });

  it('reduces energy and focus based on study hours', () => {
    const result = calculateDailyStats({
      ...baseInput,
      totalStudyMinutes: 120,
    });

    expect(result.energy).toBeLessThan(100);
    expect(result.focus).toBeLessThan(100);
  });

  it('keeps productivity at 0 if study time is under 10 minutes', () => {
    const result = calculateDailyStats({
      ...baseInput,
      totalStudyMinutes: 5,
    });

    expect(result.productivityScore).toBe(0);
  });

  it('calculates productivity when minimum study time is reached', () => {
    const result = calculateDailyStats({
      ...baseInput,
      totalStudyMinutes: 60,
      totalBreakMinutes: 10,
    });

    expect(result.productivityScore).toBeGreaterThan(0);
  });

  it('increases stress when there are many upcoming deadlines', () => {
    const result = calculateDailyStats({
      ...baseInput,
      upcomingDeadlines: 6,
    });

    expect(result.stress).toBeGreaterThan(0);
  });

  it('applies break penalty points', () => {
    const result = calculateDailyStats({
      ...baseInput,
      breakPenaltyPoints: 10,
    });

    expect(result.energy).toBe(90);
    expect(result.focus).toBe(90);
    expect(result.stress).toBe(10);
  });

  it('keeps values between 0 and 100', () => {
    const result = calculateDailyStats({
      sleepHours: 1,
      totalStudyMinutes: 1000,
      totalBreakMinutes: 0,
      upcomingDeadlines: 20,
      inProgressCount: 20,
      breakPenaltyPoints: 200,
    });

    expect(result.energy).toBeGreaterThanOrEqual(0);
    expect(result.energy).toBeLessThanOrEqual(100);

    expect(result.focus).toBeGreaterThanOrEqual(0);
    expect(result.focus).toBeLessThanOrEqual(100);

    expect(result.stress).toBeGreaterThanOrEqual(0);
    expect(result.stress).toBeLessThanOrEqual(100);
  });
});
