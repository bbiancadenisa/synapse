import { WebSocket } from 'ws';

const sessionRooms = new Map<number, Set<WebSocket>>();

export const joinSessionRoom = (sessionId: number, ws: WebSocket) => {
  if (!sessionRooms.has(sessionId)) {
    sessionRooms.set(sessionId, new Set());
  }

  sessionRooms.get(sessionId)!.add(ws);
};

export const leaveSessionRoom = (sessionId: number, ws: WebSocket) => {
  sessionRooms.get(sessionId)?.delete(ws);
};

export const broadcastToSession = (sessionId: number, message: any) => {
  const room = sessionRooms.get(sessionId);
  if (!room) return;

  const data = JSON.stringify(message);

  room.forEach((ws) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(data);
    }
  });
};
