export type SessionEventType =
  | 'SESSION_STARTED'
  | 'BREAK_REMINDER'
  | 'BREAK_STARTED'
  | 'BREAK_ENDED'
  | 'STOP_REMINDER'
  | 'SESSION_COMPLETED'
  | 'SESSION_TIMEOUT'
  | 'PENALTY_TRIGGERED';

export interface SessionEvent {
  sessionId: number;
  type: SessionEventType;
  payload?: any;
}
