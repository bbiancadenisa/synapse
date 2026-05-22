import { describe, expect, it } from 'vitest';

import {
  addSession,
  getSession,
  removeSession,
  updateSession,
} from '../sessionRegistry';

const createSession = (sessionId: number) =>
  ({
    sessionId,
    userId: 1,
    startTime: Date.now(),
    plannedDurationMs: 60_000,
    breakIntervalMs: 30_000,
    breakDurationMs: 10_000,
    status: 'running',
    studyTimeMs: 0,
    lastStartTimestamp: Date.now(),
    nextBreakAtMs: 30_000,
    breakStartedAt: null,
    currentBreakId: null,
    timeReachedAt: null,
    breakCount: 0,
    ignoreCount: 0,
    breakReminderPending: false,
    cooldownUntil: null,
    timeReachedNotified: false,
    penaltyActive: false,
    lastBreakPenaltyAt: null,
  }) as any;

describe('sessionRegistry', () => {
  it('adds and gets a session', () => {
    const session = createSession(1);

    addSession(session);

    expect(getSession(1)).toEqual(session);

    removeSession(1);
  });

  it('updates a session', () => {
    const session = createSession(2);

    addSession(session);

    const updated = {
      ...session,
      studyTimeMs: 5000,
    };

    updateSession(2, updated);

    expect(getSession(2)?.studyTimeMs).toBe(5000);

    removeSession(2);
  });

  it('removes a session', () => {
    const session = createSession(3);

    addSession(session);
    removeSession(3);

    expect(getSession(3)).toBeUndefined();
  });
});
