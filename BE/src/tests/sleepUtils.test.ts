import { describe, expect, it } from 'vitest';
import { parseSleepHours } from '../validators/dailyStatsValidator';

describe('parseSleepHours', () => {
  it('returns parsed number for valid value', () => {
    expect(parseSleepHours(8)).toBe(8);
    expect(parseSleepHours('7')).toBe(7);
  });

  it('returns null for invalid values', () => {
    expect(parseSleepHours(undefined)).toBeNull();
    expect(parseSleepHours(null)).toBeNull();
    expect(parseSleepHours('abc')).toBeNull();
    expect(parseSleepHours(-1)).toBeNull();
    expect(parseSleepHours(25)).toBeNull();
  });
});
