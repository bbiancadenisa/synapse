import { WebSocketServer } from 'ws';
import { handleSessionAction } from '../engine/breakActions';
import { joinSessionRoom, leaveSessionRoom } from './sessionRooms';

export const wss = new WebSocketServer({ port: 3001 });

console.log('WebSocket server running on ws://localhost:3001');

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (raw) => {
    try {
      const data = JSON.parse(raw.toString());

      switch (data.type) {
        case 'JOIN_SESSION':
          joinSessionRoom(data.sessionId, ws);
          break;

        case 'LEAVE_SESSION':
          leaveSessionRoom(data.sessionId, ws);
          break;

        case 'BREAK_ACCEPTED':
        case 'BREAK_IGNORED':
        case 'TAKE_MANUAL_BREAK':
          void handleSessionAction(data);
          break;

        default:
          break;
      }
    } catch (err) {
      console.error('Invalid WS message', err);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
