import { act, renderHook } from '@testing-library/react';
import dayjs from 'dayjs';
import { describe, expect, it, vi } from 'vitest';

import { updateSubject } from '../../services/subject';
import { useEditSubjectForm } from '../useEditSubjectForm';

vi.mock('../../services/subject', () => ({
  updateSubject: vi.fn(),
}));

const subject = {
  id: 1,
  name: 'Artificial Intelligence',
  description: 'AI basics.',
  difficulty: 'high' as const,
  color: '#6C63FF',
  overall_deadline: '2026-05-25T10:00:00',
};

describe('useEditSubjectForm', () => {
  it('fills form when open', () => {
    const { result } = renderHook(() =>
      useEditSubjectForm({
        open: true,
        subject,
        onClose: vi.fn(),
        onUpdated: vi.fn(),
      }),
    );

    expect(result.current.name).toBe('Artificial Intelligence');
    expect(result.current.description).toBe('AI basics.');
    expect(result.current.difficulty).toBe('high');
  });

  it('calls updateSubject on save', async () => {
    const onClose = vi.fn();
    const onUpdated = vi.fn();

    const { result } = renderHook(() =>
      useEditSubjectForm({
        open: true,
        subject,
        onClose,
        onUpdated,
      }),
    );

    act(() => {
      result.current.setName('AI Updated');
      result.current.setDeadline(dayjs('2026-05-26T10:00:00'));
    });

    await act(async () => {
      await result.current.handleSave();
    });

    expect(updateSubject).toHaveBeenCalled();
    expect(onUpdated).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
