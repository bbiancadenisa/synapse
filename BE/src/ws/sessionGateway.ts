import { broadcastToSession } from './sessionRooms';
import { SessionEvent } from './types';

export const emitSessionEvent = (event: SessionEvent) => {
  broadcastToSession(event.sessionId, event);
};
