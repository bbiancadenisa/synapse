import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  createSubject,
  deleteSubject,
  getSubjects,
} from '../../services/subject';
import { useSubjectsList } from '../useSubjectList';

vi.mock('../../services/subject', () => ({
  getSubjects: vi.fn(),
  createSubject: vi.fn(),
  deleteSubject: vi.fn(),
}));

const subjects = [
  {
    id: 1,
    name: 'AI',
    description: 'AI subject',
    difficulty: 'high',
    color: '#6C63FF',
    overall_deadline: '2026-05-25',
  },
];

describe('useSubjectsList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getSubjects).mockResolvedValue(subjects as any);
  });

  it('loads subjects', async () => {
    const { result } = renderHook(() => useSubjectsList());

    await waitFor(() => {
      expect(result.current.subjects).toEqual(subjects);
    });
  });

  it('creates subject and refetches', async () => {
    const { result } = renderHook(() => useSubjectsList());

    await act(async () => {
      await result.current.handleCreate({
        name: 'AI',
        description: '',
        difficulty: 'high',
        color: '#6C63FF',
        overall_deadline: '2026-05-25',
      });
    });

    expect(createSubject).toHaveBeenCalledTimes(1);
    expect(getSubjects).toHaveBeenCalled();
  });

  it('sets delete error when delete fails', async () => {
    vi.mocked(deleteSubject).mockRejectedValue({
      response: { data: { error: 'Cannot delete subject' } },
    });

    const { result } = renderHook(() => useSubjectsList());

    await act(async () => {
      await result.current.handleDelete(1);
    });

    expect(result.current.deleteError).toBe('Cannot delete subject');
  });
});
