import { WebSocketServer } from 'ws';
import { joinSessionRoom, leaveSessionRoom } from './sessionRooms';

export const wss = new WebSocketServer({ port: 3001 });

console.log('WebSocket server running on ws://localhost:3001');

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (raw) => {
    try {
      const data = JSON.parse(raw.toString());

      if (data.type === 'JOIN_SESSION') {
        joinSessionRoom(data.sessionId, ws);
      }

      if (data.type === 'LEAVE_SESSION') {
        leaveSessionRoom(data.sessionId, ws);
      }
    } catch (err) {
      console.error('Invalid WS message', err);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
