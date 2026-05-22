import { describe, expect, it } from 'vitest';
import {
  isValidTaskPriority,
  isValidTaskStatus,
  parseEstimatedHours,
  validateFutureDate,
} from '../validators/taskValidator';

describe('task validators', () => {
  it('validates task status', () => {
    expect(isValidTaskStatus('todo')).toBe(true);
    expect(isValidTaskStatus('in_progress')).toBe(true);
    expect(isValidTaskStatus('done')).toBe(true);

    expect(isValidTaskStatus('random')).toBe(false);
  });

  it('validates task priority', () => {
    expect(isValidTaskPriority('low')).toBe(true);
    expect(isValidTaskPriority('medium')).toBe(true);
    expect(isValidTaskPriority('high')).toBe(true);

    expect(isValidTaskPriority('random')).toBe(false);
  });

  it('parses estimated hours', () => {
    expect(parseEstimatedHours(2)).toBe(2);
    expect(parseEstimatedHours('3')).toBe(3);
  });

  it('rejects invalid estimated hours', () => {
    expect(parseEstimatedHours(undefined)).toBeNull();
    expect(parseEstimatedHours(null)).toBeNull();
    expect(parseEstimatedHours('abc')).toBeNull();
    expect(parseEstimatedHours(0)).toBeNull();
    expect(parseEstimatedHours(-1)).toBeNull();
  });

  it('validates future dates', () => {
    const future = new Date(Date.now() + 1000000).toISOString();

    expect(validateFutureDate(future)).toEqual({
      valid: true,
      error: null,
    });
  });
});
