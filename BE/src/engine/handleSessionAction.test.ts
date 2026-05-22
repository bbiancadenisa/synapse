import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./sessionEngine', () => ({
  acceptBreak: vi.fn(),
  ignoreBreak: vi.fn(),
  takeManualBreak: vi.fn(),
}));

import { handleSessionAction } from './breakActions';
import { acceptBreak, ignoreBreak, takeManualBreak } from './sessionEngine';

describe('handleSessionAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls acceptBreak for BREAK_ACCEPTED', async () => {
    await handleSessionAction({
      type: 'BREAK_ACCEPTED',
      sessionId: 1,
    });

    expect(acceptBreak).toHaveBeenCalledWith(1);
  });

  it('calls ignoreBreak for BREAK_IGNORED', async () => {
    await handleSessionAction({
      type: 'BREAK_IGNORED',
      sessionId: 2,
    });

    expect(ignoreBreak).toHaveBeenCalledWith(2);
  });

  it('calls takeManualBreak for TAKE_MANUAL_BREAK', async () => {
    await handleSessionAction({
      type: 'TAKE_MANUAL_BREAK',
      sessionId: 3,
    });

    expect(takeManualBreak).toHaveBeenCalledWith(3);
  });

  it('does nothing for unknown event type', async () => {
    await handleSessionAction({
      type: 'UNKNOWN',
      sessionId: 4,
    });

    expect(acceptBreak).not.toHaveBeenCalled();
    expect(ignoreBreak).not.toHaveBeenCalled();
    expect(takeManualBreak).not.toHaveBeenCalled();
  });
});
