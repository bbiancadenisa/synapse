import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as sessionService from '../../services/session';
import * as subjectService from '../../services/subject';
import * as taskService from '../../services/task';
import { useSubjectDetails } from '../useSubjectDetails';

const navigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

vi.mock('../../services/subject', () => ({
  getSubjectById: vi.fn(),
}));

vi.mock('../../services/task', () => ({
  getTasks: vi.fn(),
}));

vi.mock('../../services/session', () => ({
  startStudySession: vi.fn(),
}));

const subject = {
  id: 1,
  name: 'AI',
  description: 'AI subject',
  difficulty: 'high' as const,
  color: '#6C63FF',
  overall_deadline: '2026-05-25',
};

const task = {
  id: 10,
  subject_id: 1,
  title: 'Neural Networks',
  description: '',
  estimated_hours: 3,
  priority: 'high' as const,
  status: 'todo' as const,
  deadline: '2026-05-25',
  total_study_ms: 0,
};

describe('useSubjectDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(subjectService.getSubjectById).mockResolvedValue({
      subject,
    } as any);

    vi.mocked(taskService.getTasks).mockResolvedValue([task] as any);

    vi.mocked(sessionService.startStudySession).mockResolvedValue({
      id: 99,
    } as any);
  });

  it('loads subject and tasks', async () => {
    const { result } = renderHook(() => useSubjectDetails('1'));

    await waitFor(() => {
      expect(result.current.subject).toEqual(subject);
    });

    expect(result.current.tasks).toEqual([task]);
  });

  it('opens edit task modal', () => {
    const { result } = renderHook(() => useSubjectDetails('1'));

    act(() => {
      result.current.openEditTask(task as any);
    });

    expect(result.current.selectedTask).toEqual(task);
    expect(result.current.editTaskOpen).toBe(true);
  });

  it('starts session and navigates', async () => {
    const { result } = renderHook(() => useSubjectDetails('1'));

    act(() => {
      result.current.openCreateSession(task as any);
    });

    await act(async () => {
      await result.current.handleStartSession({
        plannedDuration: 30,
        breakInterval: 10,
        breakDuration: 5,
      });
    });

    expect(sessionService.startStudySession).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/session/99', expect.any(Object));
  });
});
