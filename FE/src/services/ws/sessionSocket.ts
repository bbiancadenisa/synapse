let socket: WebSocket | null = null;

let currentSessionId: number | null = null;
let onEventCallback: ((data: any) => void) | null = null;

let isConnecting = false;

export const connectSessionSocket = (
  sessionId: number,
  onEvent: (data: any) => void,
) => {
  currentSessionId = sessionId;
  onEventCallback = onEvent;

  if (isConnecting) return;

  if (socket) {
    disconnectSessionSocket();
  }

  isConnecting = true;

  socket = new WebSocket('ws://localhost:3001');

  socket.onopen = () => {
    isConnecting = false;

    socket?.send(
      JSON.stringify({
        type: 'JOIN_SESSION',
        sessionId,
      }),
    );

    console.log('WS connected');
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log('WS EVENT:', data);
      onEventCallback?.(data);
    } catch (err) {
      console.error('Invalid WS message', err);
    }
  };

  socket.onerror = (err) => {
    console.error('WS error', err);
    isConnecting = false;
  };

  socket.onclose = () => {
    console.log('WS closed');
    isConnecting = false;
  };
};

export const sendSessionAction = (type: string) => {
  if (!socket || socket.readyState !== WebSocket.OPEN || !currentSessionId) {
    return;
  }

  socket.send(
    JSON.stringify({
      type,
      sessionId: currentSessionId,
    }),
  );
};

export const disconnectSessionSocket = () => {
  if (!socket) return;

  try {
    if (socket.readyState === WebSocket.OPEN && currentSessionId) {
      socket.send(
        JSON.stringify({
          type: 'LEAVE_SESSION',
          sessionId: currentSessionId,
        }),
      );
    }
  } catch {}

  socket.onopen = null;
  socket.onmessage = null;
  socket.onerror = null;
  socket.onclose = null;

  try {
    socket.close();
  } catch {}

  socket = null;
  currentSessionId = null;
  onEventCallback = null;
  isConnecting = false;
};
