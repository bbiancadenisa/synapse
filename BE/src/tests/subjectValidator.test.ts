import { describe, expect, it } from 'vitest';
import {
  isValidDifficulty,
  parseBooleanQuery,
  validateFutureDate,
} from '../validators/subjectValidator';

describe('subject validators', () => {
  it('validates difficulty correctly', () => {
    expect(isValidDifficulty('low')).toBe(true);
    expect(isValidDifficulty('medium')).toBe(true);
    expect(isValidDifficulty('high')).toBe(true);

    expect(isValidDifficulty('invalid')).toBe(false);
  });

  it('parses boolean query', () => {
    expect(parseBooleanQuery(undefined)).toBeUndefined();
    expect(parseBooleanQuery('true')).toBe(true);
    expect(parseBooleanQuery('false')).toBe(false);
  });

  it('validates future dates', () => {
    const future = new Date(Date.now() + 1000000).toISOString();

    expect(validateFutureDate(future)).toEqual({
      valid: true,
      error: null,
    });
  });

  it('rejects past dates', () => {
    const past = new Date(Date.now() - 1000000).toISOString();

    expect(validateFutureDate(past)).toEqual({
      valid: false,
      error: 'Deadline cannot be in the past',
    });
  });

  it('rejects invalid date format', () => {
    expect(validateFutureDate('abc')).toEqual({
      valid: false,
      error: 'Invalid deadline format',
    });
  });
});
