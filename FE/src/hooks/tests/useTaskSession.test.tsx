import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getSessionsByTaskId } from '../../services/session';
import { useTaskSessions } from '../useTaskSession';

vi.mock('../../services/session', () => ({
  getSessionsByTaskId: vi.fn(),
}));

const sessions = [
  {
    id: 1,
    task_id: 1,
    status: 'completed',
    start_time: '2026-05-20T10:00:00',
    end_time: null,
    planned_duration_minutes: 30,
    created_at: '2026-05-20T10:00:00',
    break_count: 1,
    study_time_ms: 1200000,
  },
];

describe('useTaskSessions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads sessions once', async () => {
    vi.mocked(getSessionsByTaskId).mockResolvedValue(sessions as any);

    const { result } = renderHook(() => useTaskSessions(1));

    await act(async () => {
      await result.current.loadSessions();
    });

    expect(result.current.sessions).toEqual(sessions);
    expect(getSessionsByTaskId).toHaveBeenCalledTimes(1);
  });
});
