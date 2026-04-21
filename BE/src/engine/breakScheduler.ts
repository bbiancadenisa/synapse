import { emitSessionEvent } from '../ws/sessionGateway';
import { getSession } from '../ws/sessionRegistry';

export const scheduleNextBreak = (sessionId: number) => {
  const session = getSession(sessionId);
  if (!session) return;

  const timeout = setTimeout(() => {
    const current = getSession(sessionId);
    if (!current) return;

    if (current.isPaused) return;

    current.breakCount++;

    emitSessionEvent({
      sessionId,
      type: 'BREAK_REMINDER',
    });

    scheduleNextBreak(sessionId);
  }, session.breakIntervalMs);

  session.timeoutId = timeout;
};
