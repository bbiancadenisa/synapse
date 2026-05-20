import { act, renderHook } from '@testing-library/react';
import dayjs from 'dayjs';
import { describe, expect, it, vi } from 'vitest';

import { createTask } from '../../services/task';
import { useCreateTaskForm } from '../useCreateTaskForm';

vi.mock('../../services/task', () => ({
  createTask: vi.fn(),
}));

vi.mock('../services/task', () => ({
  createTask: vi.fn(),
}));

describe('useCreateTaskForm', () => {
  it('starts invalid without title and deadline', () => {
    const { result } = renderHook(() =>
      useCreateTaskForm({
        subjectId: 1,
        onClose: vi.fn(),
        onCreated: vi.fn(),
      }),
    );

    expect(result.current.isFormValid).toBe(false);
  });

  it('becomes valid with title and deadline', () => {
    const { result } = renderHook(() =>
      useCreateTaskForm({
        subjectId: 1,
        onClose: vi.fn(),
        onCreated: vi.fn(),
      }),
    );

    act(() => {
      result.current.setTitle('Neural Networks');
      result.current.setDeadline(dayjs('2026-05-25T10:00:00'));
    });

    expect(result.current.isFormValid).toBe(true);
  });

  it('calls createTask on submit', async () => {
    const onClose = vi.fn();
    const onCreated = vi.fn();

    const { result } = renderHook(() =>
      useCreateTaskForm({
        subjectId: 1,
        onClose,
        onCreated,
      }),
    );

    act(() => {
      result.current.setTitle('Neural Networks');
      result.current.setDeadline(dayjs('2026-05-25T10:00:00'));
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(createTask).toHaveBeenCalled();
    expect(onCreated).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
