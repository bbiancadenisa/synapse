export type StudySessionStatus =
  | 'running'
  | 'paused'
  | 'completed'
  | 'timed_out';

export type SessionEventType =
  | 'session_started'
  | 'session_time_reached'
  | 'session_ended'
  | 'session_timeout'
  | 'break_reminder'
  | 'break_accepted'
  | 'break_ignored'
  | 'break_started'
  | 'break_ended'
  | 'stop_accepted'
  | 'stop_ignored'
  | 'penalty_triggered';

export const allowedStudySessionStatuses: StudySessionStatus[] = [
  'running',
  'paused',
  'completed',
  'timed_out',
];

export const allowedSessionEventTypes: SessionEventType[] = [
  'session_started',
  'session_time_reached',
  'session_ended',
  'session_timeout',
  'break_reminder',
  'break_accepted',
  'break_ignored',
  'break_started',
  'break_ended',
  'stop_accepted',
  'stop_ignored',
  'penalty_triggered',
];

export const isValidStudySessionStatus = (
  value: unknown,
): value is StudySessionStatus => {
  return allowedStudySessionStatuses.includes(value as StudySessionStatus);
};

export const isValidSessionEventType = (
  value: unknown,
): value is SessionEventType => {
  return allowedSessionEventTypes.includes(value as SessionEventType);
};

export const validateStartSessionConfig = (data: {
  taskId?: number;
  plannedDurationMinutes?: number;
  breakIntervalMinutes?: number;
  breakDurationMinutes?: number;
}) => {
  const taskId = Number(data.taskId);
  const plannedDurationMinutes = Number(data.plannedDurationMinutes);
  const breakIntervalMinutes = Number(data.breakIntervalMinutes);
  const breakDurationMinutes = Number(data.breakDurationMinutes);

  if (
    !taskId ||
    Number.isNaN(taskId) ||
    !plannedDurationMinutes ||
    Number.isNaN(plannedDurationMinutes) ||
    !breakIntervalMinutes ||
    Number.isNaN(breakIntervalMinutes) ||
    !breakDurationMinutes ||
    Number.isNaN(breakDurationMinutes)
  ) {
    return null;
  }

  return {
    taskId,
    plannedDurationMinutes,
    breakIntervalMinutes,
    breakDurationMinutes,
  };
};
