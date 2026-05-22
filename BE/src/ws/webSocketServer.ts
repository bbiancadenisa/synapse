import { WebSocketServer } from 'ws';
import { handleSessionAction } from '../engine/breakActions';
import { joinSessionRoom, leaveSessionRoom } from './sessionRooms';

export const wss = new WebSocketServer({ port: 3001 });

console.log('WebSocket server running on ws://localhost:3001');

wss.on('connection', (ws) => {
  console.log('Client connected');

  const joinedSessions = new Set<number>();

  ws.on('message', (raw) => {
    try {
      const data = JSON.parse(raw.toString());
      const sessionId = Number(data.sessionId);

      switch (data.type) {
        case 'JOIN_SESSION':
          if (!sessionId) return;

          joinSessionRoom(sessionId, ws);
          joinedSessions.add(sessionId);
          break;

        case 'LEAVE_SESSION':
          if (!sessionId) return;

          leaveSessionRoom(sessionId, ws);
          joinedSessions.delete(sessionId);
          break;

        case 'BREAK_ACCEPTED':
        case 'BREAK_IGNORED':
        case 'TAKE_MANUAL_BREAK':
          if (!sessionId) return;

          void handleSessionAction({
            type: data.type,
            sessionId,
          });
          break;

        default:
          ws.send(
            JSON.stringify({
              type: 'WS_ERROR',
              message: 'Unknown WebSocket event type',
            }),
          );
          break;
      }
    } catch (err) {
      console.error('Invalid WS message', err);

      ws.send(
        JSON.stringify({
          type: 'WS_ERROR',
          message: 'Invalid WebSocket message',
        }),
      );
    }
  });

  ws.on('close', () => {
    joinedSessions.forEach((sessionId) => {
      leaveSessionRoom(sessionId, ws);
    });

    joinedSessions.clear();

    console.log('Client disconnected');
  });
});
