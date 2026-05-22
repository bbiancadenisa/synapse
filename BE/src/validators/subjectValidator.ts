export type Difficulty = 'low' | 'medium' | 'high';

export const allowedDifficulty: Difficulty[] = ['low', 'medium', 'high'];

export const isValidDifficulty = (value: unknown): value is Difficulty => {
  return allowedDifficulty.includes(value as Difficulty);
};

export const parseBooleanQuery = (value: unknown) => {
  if (value === undefined) return undefined;
  return value === 'true';
};

// MAKE SURE DEADLINE IS IN FUTURE
export const validateFutureDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return {
      valid: false,
      error: 'Invalid deadline format',
    };
  }

  if (date < new Date()) {
    return {
      valid: false,
      error: 'Deadline cannot be in the past',
    };
  }

  return {
    valid: true,
    error: null,
  };
};
