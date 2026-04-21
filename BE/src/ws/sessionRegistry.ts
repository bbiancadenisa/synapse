type SessionRuntimeState = {
  sessionId: number;
  startTime: number;
  plannedDurationMs: number;
  breakIntervalMs: number;
  breakDurationMs: number;

  breakCount: number;
  isPaused: boolean;
  timeoutId?: NodeJS.Timeout;
};

const sessions = new Map<number, SessionRuntimeState>();

export const addSession = (state: SessionRuntimeState) => {
  sessions.set(state.sessionId, state);
};

export const getSession = (id: number) => sessions.get(id);

export const removeSession = (id: number) => {
  sessions.delete(id);
};
