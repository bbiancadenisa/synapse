import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { endStudySession } from '../../services/session';
import {
  connectSessionSocket,
  disconnectSessionSocket,
  sendSessionAction,
} from '../../services/ws/sessionSocket';
import { useSessionRuntime } from '../useSessionRuntime';

const navigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useParams: () => ({ sessionId: '1' }),
  useNavigate: () => navigate,
}));

vi.mock('../../services/session', () => ({
  endStudySession: vi.fn(),
}));

vi.mock('../../services/ws/sessionSocket', () => ({
  connectSessionSocket: vi.fn(),
  disconnectSessionSocket: vi.fn(),
  sendSessionAction: vi.fn(),
}));

const config = {
  subjectId: 10,
  taskId: 20,
  plannedDuration: 30,
  breakInterval: 10,
  breakDuration: 5,
};

describe('useSessionRuntime', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('connects socket on mount', () => {
    renderHook(() => useSessionRuntime(config));

    expect(connectSessionSocket).toHaveBeenCalledWith(1, expect.any(Function));
  });

  it('handles break reminder event', () => {
    let socketCallback: any;

    vi.mocked(connectSessionSocket).mockImplementation((_id, callback) => {
      socketCallback = callback;
    });

    const { result } = renderHook(() => useSessionRuntime(config));

    act(() => {
      socketCallback({ type: 'BREAK_REMINDER' });
    });

    expect(result.current.breakReminder).toBe(true);
  });

  it('handles break started event', () => {
    let socketCallback: any;

    vi.mocked(connectSessionSocket).mockImplementation((_id, callback) => {
      socketCallback = callback;
    });

    const { result } = renderHook(() => useSessionRuntime(config));

    act(() => {
      socketCallback({
        type: 'BREAK_STARTED',
        payload: {
          breakDurationMs: 60_000,
        },
      });
    });

    expect(result.current.isOnBreak).toBe(true);
    expect(result.current.breakReminder).toBe(false);
    expect(result.current.breakSecondsLeft).toBe(60);
  });

  it('handles session time reached event', () => {
    let socketCallback: any;

    vi.mocked(connectSessionSocket).mockImplementation((_id, callback) => {
      socketCallback = callback;
    });

    const { result } = renderHook(() => useSessionRuntime(config));

    act(() => {
      socketCallback({
        type: 'SESSION_TIME_REACHED',
        payload: {
          message: 'Planned study time completed.',
        },
      });
    });

    expect(result.current.sessionDone).toBe(true);
    expect(result.current.penaltyMessage).toBe('Planned study time completed.');
  });

  it('handles penalty event with live stats', () => {
    let socketCallback: any;

    vi.mocked(connectSessionSocket).mockImplementation((_id, callback) => {
      socketCallback = callback;
    });

    const { result } = renderHook(() => useSessionRuntime(config));

    act(() => {
      socketCallback({
        type: 'PENALTY_TRIGGERED',
        payload: {
          message: 'Penalty active',
          stats: {
            energy: 90,
            focus: 85,
            stress: 20,
            health_points: 88,
            burnout_risk: 'low',
          },
        },
      });
    });

    expect(result.current.penaltyTriggered).toBe(true);
    expect(result.current.penaltyMessage).toBe('Penalty active');
    expect(result.current.liveStats).toEqual({
      energy: 90,
      focus: 85,
      stress: 20,
      healthPoints: 88,
      burnoutRisk: 'low',
    });
  });

  it('sends session actions', () => {
    const { result } = renderHook(() => useSessionRuntime(config));

    act(() => {
      result.current.handleAcceptBreak();
      result.current.handleIgnoreBreak();
      result.current.handleManualBreak();
    });

    expect(sendSessionAction).toHaveBeenCalledWith('BREAK_ACCEPTED');
    expect(sendSessionAction).toHaveBeenCalledWith('BREAK_IGNORED');
    expect(sendSessionAction).toHaveBeenCalledWith('TAKE_MANUAL_BREAK');
  });

  it('ends session and navigates to subject page', async () => {
    vi.mocked(endStudySession).mockResolvedValue({} as any);

    const { result } = renderHook(() => useSessionRuntime(config));

    await act(async () => {
      await result.current.handleEndSession();
    });

    expect(endStudySession).toHaveBeenCalledWith(1);
    expect(disconnectSessionSocket).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/subjects/10');
  });

  it('disconnects socket on unmount', () => {
    const { unmount } = renderHook(() => useSessionRuntime(config));

    unmount();

    expect(disconnectSessionSocket).toHaveBeenCalled();
  });
});
