import * as sessionBreakService from '../services/sessionBreakService';
import * as sessionService from '../services/sessionService';
import { emitSessionEvent } from '../ws/sessionGateway';
import {
  addSession,
  getSession,
  removeSession,
  updateSession,
} from '../ws/sessionRegistry';
import { SessionRuntimeState } from '../ws/types';

const TICK_MS = 1000;
const IGNORE_COOLDOWN_MS = 5000;
const MAX_IGNORE_COUNT = 3;
const TEST_TIMEOUT_MS = 3 * 60 * 1000;

const persistEvent = async (sessionId: number, type: string) => {
  try {
    await sessionService.insertEvent(sessionId, type);
  } catch (err) {
    console.error('Failed to persist session event:', type, err);
  }
};

const stopInterval = (session: SessionRuntimeState) => {
  if (session.intervalId) {
    clearInterval(session.intervalId);
    session.intervalId = undefined;
  }
};

const emitAndPersist = async (sessionId: number, type: any, payload?: any) => {
  emitSessionEvent({ sessionId, type, payload });
  await persistEvent(sessionId, type);
};

export const startSessionEngine = ({
  sessionId,
  plannedDurationMinutes,
  breakIntervalMinutes,
  breakDurationMinutes,
}: {
  sessionId: number;
  plannedDurationMinutes: number;
  breakIntervalMinutes: number;
  breakDurationMinutes: number;
}) => {
  const now = Date.now();

  const state: SessionRuntimeState = {
    sessionId,
    startTime: now,

    plannedDurationMs: plannedDurationMinutes * 60 * 1000,
    breakIntervalMs: breakIntervalMinutes * 60 * 1000,
    breakDurationMs: breakDurationMinutes * 60 * 1000,

    status: 'running',

    studyTimeMs: 0,
    lastStartTimestamp: now,

    nextBreakAtMs: breakIntervalMinutes * 60 * 1000,
    breakStartedAt: null,
    currentBreakId: null,
    timeReachedAt: null,

    breakCount: 0,
    ignoreCount: 0,

    breakReminderPending: false,
    cooldownUntil: null,
    timeReachedNotified: false,
  };

  const intervalId = setInterval(() => {
    void tickSession(sessionId);
  }, TICK_MS);

  state.intervalId = intervalId;

  addSession(state);

  void emitAndPersist(sessionId, 'SESSION_STARTED');
};

const tickSession = async (sessionId: number) => {
  const session = getSession(sessionId);
  if (!session || session.status === 'ended') return;

  const now = Date.now();

  if (
    session.timeReachedNotified &&
    session.timeReachedAt !== null &&
    now - session.timeReachedAt >= TEST_TIMEOUT_MS
  ) {
    await timeoutSession(sessionId);
    return;
  }

  if (session.status === 'running') {
    session.studyTimeMs += now - session.lastStartTimestamp;
    session.lastStartTimestamp = now;

    if (
      session.studyTimeMs >= session.plannedDurationMs &&
      !session.timeReachedNotified
    ) {
      session.timeReachedNotified = true;
      session.timeReachedAt = now;

      session.breakReminderPending = false;
      session.cooldownUntil = null;

      updateSession(sessionId, session);

      await emitAndPersist(sessionId, 'SESSION_TIME_REACHED');
      return;
    }

    if (
      !session.timeReachedNotified &&
      !session.breakReminderPending &&
      session.studyTimeMs >= session.nextBreakAtMs
    ) {
      session.breakReminderPending = true;
      updateSession(sessionId, session);

      await emitAndPersist(sessionId, 'BREAK_REMINDER');
      return;
    }

    if (
      session.breakReminderPending &&
      session.cooldownUntil !== null &&
      now >= session.cooldownUntil
    ) {
      session.cooldownUntil = null;
      updateSession(sessionId, session);

      await emitAndPersist(sessionId, 'BREAK_REMINDER');
      return;
    }

    updateSession(sessionId, session);
    return;
  }

  if (session.status === 'break' && session.breakStartedAt !== null) {
    if (now - session.breakStartedAt >= session.breakDurationMs) {
      await endBreak(sessionId);
    }
  }
};

export const acceptBreak = async (sessionId: number) => {
  const session = getSession(sessionId);

  if (!session || session.status !== 'running') return;
  if (!session.breakReminderPending) return;

  await startBreak(sessionId);
};

export const takeManualBreak = async (sessionId: number) => {
  const session = getSession(sessionId);

  if (!session || session.status !== 'running') return;
  if (session.timeReachedNotified) return;

  await startBreak(sessionId);
};

const startBreak = async (sessionId: number) => {
  const session = getSession(sessionId);
  if (!session || session.status !== 'running') return;

  const now = Date.now();

  const breakResult = await sessionBreakService.createBreak(
    sessionId,
    Math.round(session.breakDurationMs / 60_000),
  );

  const breakRow = breakResult.rows[0];

  await sessionBreakService.markBreakAccepted(breakRow.id);
  await sessionService.updateSessionStatus(sessionId, 'paused');

  session.status = 'break';
  session.breakStartedAt = now;
  session.currentBreakId = breakRow.id;
  session.breakReminderPending = false;
  session.cooldownUntil = null;
  session.ignoreCount = 0;
  session.breakCount += 1;

  updateSession(sessionId, session);

  await emitAndPersist(sessionId, 'BREAK_ACCEPTED');
  await emitAndPersist(sessionId, 'BREAK_STARTED', {
    breakId: breakRow.id,
    breakDurationMs: session.breakDurationMs,
  });
};

export const ignoreBreak = async (sessionId: number) => {
  const session = getSession(sessionId);

  if (!session || session.status !== 'running') return;
  if (!session.breakReminderPending) return;

  session.ignoreCount += 1;

  await emitAndPersist(sessionId, 'BREAK_IGNORED');

  if (session.ignoreCount >= MAX_IGNORE_COUNT) {
    session.breakReminderPending = false;
    session.cooldownUntil = null;
    session.ignoreCount = 0;

    session.nextBreakAtMs = session.studyTimeMs + session.breakIntervalMs;

    updateSession(sessionId, session);

    await emitAndPersist(sessionId, 'PENALTY_TRIGGERED');
    return;
  }

  session.cooldownUntil = Date.now() + IGNORE_COOLDOWN_MS;

  updateSession(sessionId, session);
};

const endBreak = async (sessionId: number) => {
  const session = getSession(sessionId);

  if (!session || session.status !== 'break') return;

  if (session.currentBreakId !== null) {
    await sessionBreakService.endBreak(session.currentBreakId);
  }

  await sessionService.updateSessionStatus(sessionId, 'running');

  session.status = 'running';
  session.breakStartedAt = null;
  session.currentBreakId = null;
  session.lastStartTimestamp = Date.now();

  session.nextBreakAtMs = session.studyTimeMs + session.breakIntervalMs;

  updateSession(sessionId, session);

  await emitAndPersist(sessionId, 'BREAK_ENDED');
};

export const endSessionByUser = async (sessionId: number) => {
  const session = getSession(sessionId);

  if (session) {
    session.status = 'ended';
    stopInterval(session);
    updateSession(sessionId, session);
  }

  await sessionService.endSession(sessionId, 'completed');
  await emitAndPersist(sessionId, 'STOP_ACCEPTED');
  await emitAndPersist(sessionId, 'SESSION_ENDED');

  removeSession(sessionId);
};

export const timeoutSession = async (sessionId: number) => {
  const session = getSession(sessionId);

  if (session) {
    session.status = 'ended';
    stopInterval(session);
    updateSession(sessionId, session);
  }

  await sessionService.endSession(sessionId, 'timed_out');
  await emitAndPersist(sessionId, 'SESSION_TIMEOUT');

  removeSession(sessionId);
};
