import { describe, expect, it } from 'vitest';

import {
  calculateEnergyFromSleep,
  clamp,
  getBurnoutRisk,
  getHealthMessage,
} from '../dailyStatsHelpers';

describe('dailyStatsHelpers', () => {
  it('clamps values between 0 and 100', () => {
    expect(clamp(-10)).toBe(0);
    expect(clamp(50)).toBe(50);
    expect(clamp(120)).toBe(100);
  });

  it('calculates energy from sleep hours', () => {
    expect(calculateEnergyFromSleep(null)).toBe(100);
    expect(calculateEnergyFromSleep(8)).toBe(100);
    expect(calculateEnergyFromSleep(7)).toBe(80);
    expect(calculateEnergyFromSleep(6)).toBe(60);
    expect(calculateEnergyFromSleep(5)).toBe(50);
    expect(calculateEnergyFromSleep(4)).toBe(35);
  });

  it('returns correct health messages', () => {
    expect(getHealthMessage(40)).toMatch(/burnout risk/i);
    expect(getHealthMessage(55)).toMatch(/recovery time/i);
    expect(getHealthMessage(65)).toMatch(/take it a bit easier/i);
    expect(getHealthMessage(75)).toMatch(/balanced pace/i);
    expect(getHealthMessage(90)).toMatch(/doing great/i);
  });

  it('returns burnout risk', () => {
    expect(getBurnoutRisk(40)).toBe('high');
    expect(getBurnoutRisk(55)).toBe('medium');
    expect(getBurnoutRisk(70)).toBe('low');
    expect(getBurnoutRisk(90)).toBe('low');
  });
});
