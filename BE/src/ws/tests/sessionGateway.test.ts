import { describe, expect, it, vi } from 'vitest';

import { emitSessionEvent } from '../sessionGateway';
import { broadcastToSession } from '../sessionRooms';

vi.mock('../sessionRooms', () => ({
  broadcastToSession: vi.fn(),
}));

describe('sessionGateway', () => {
  it('broadcasts session event to session room', () => {
    const event = {
      sessionId: 1,
      type: 'BREAK_REMINDER',
      payload: {
        message: 'Take a break',
      },
    };

    emitSessionEvent(event as any);

    expect(broadcastToSession).toHaveBeenCalledWith(1, event);
  });
});
