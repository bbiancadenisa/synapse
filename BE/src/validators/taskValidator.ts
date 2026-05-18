export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export const allowedTaskStatuses: TaskStatus[] = [
  'todo',
  'in_progress',
  'done',
];

export const allowedTaskPriorities: TaskPriority[] = ['low', 'medium', 'high'];

export const isValidTaskStatus = (value: unknown): value is TaskStatus => {
  return allowedTaskStatuses.includes(value as TaskStatus);
};

export const isValidTaskPriority = (value: unknown): value is TaskPriority => {
  return allowedTaskPriorities.includes(value as TaskPriority);
};

// CHECK FOR DEADLINE TO BE IN FUTURE DATE
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

export const parseEstimatedHours = (value: unknown) => {
  const parsed = Number(value);

  if (
    value === undefined ||
    value === null ||
    Number.isNaN(parsed) ||
    parsed <= 0
  ) {
    return null;
  }

  return parsed;
};
