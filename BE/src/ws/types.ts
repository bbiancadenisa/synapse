export type RuntimeSessionStatus = 'running' | 'break' | 'ended';

export type SessionRuntimeState = {
  sessionId: number;
  startTime: number;

  plannedDurationMs: number;
  breakIntervalMs: number;
  breakDurationMs: number;

  status: RuntimeSessionStatus;

  studyTimeMs: number;
  lastStartTimestamp: number;

  nextBreakAtMs: number;
  breakStartedAt: number | null;
  currentBreakId: number | null;
  timeReachedAt: number | null;

  breakCount: number;
  ignoreCount: number;

  breakReminderPending: boolean;
  cooldownUntil: number | null;
  timeReachedNotified: boolean;

  intervalId?: NodeJS.Timeout;
};

export type SessionEventType =
  | 'SESSION_STARTED'
  | 'SESSION_TIME_REACHED'
  | 'SESSION_ENDED'
  | 'SESSION_TIMEOUT'
  | 'BREAK_REMINDER'
  | 'BREAK_ACCEPTED'
  | 'BREAK_IGNORED'
  | 'BREAK_STARTED'
  | 'BREAK_ENDED'
  | 'STOP_ACCEPTED'
  | 'STOP_IGNORED'
  | 'PENALTY_TRIGGERED';

export interface SessionEvent {
  sessionId: number;
  type: SessionEventType;
  payload?: any;
}
