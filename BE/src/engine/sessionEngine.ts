import { emitSessionEvent } from '../ws/sessionGateway';
import { addSession } from '../ws/sessionRegistry';
import { scheduleNextBreak } from './breakScheduler';

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
  const state = {
    sessionId,
    startTime: Date.now(),
    plannedDurationMs: plannedDurationMinutes * 60 * 1000,
    breakIntervalMs: breakIntervalMinutes * 60 * 1000,
    breakDurationMs: breakDurationMinutes * 60 * 1000,
    breakCount: 0,
    isPaused: false,
  };

  addSession(state);

  emitSessionEvent({
    sessionId,
    type: 'SESSION_STARTED',
  });

  scheduleNextBreak(sessionId);
};
