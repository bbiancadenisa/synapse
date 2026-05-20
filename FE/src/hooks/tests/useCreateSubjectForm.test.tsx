import { act, renderHook } from '@testing-library/react';
import dayjs from 'dayjs';
import { describe, expect, it, vi } from 'vitest';

import { useCreateSubjectForm } from '../useCreateSubjectForm';

describe('useCreateSubjectForm', () => {
  it('starts invalid', () => {
    const { result } = renderHook(() => useCreateSubjectForm(vi.fn(), vi.fn()));

    expect(result.current.isFormValid).toBe(false);
  });

  it('becomes valid with name and deadline', () => {
    const { result } = renderHook(() => useCreateSubjectForm(vi.fn(), vi.fn()));

    act(() => {
      result.current.setName('Artificial Intelligence');
      result.current.setDeadline(dayjs('2026-05-25T10:00:00'));
    });

    expect(result.current.isFormValid).toBe(true);
  });

  it('calls onCreate and onClose on submit', () => {
    const onCreate = vi.fn();
    const onClose = vi.fn();

    const { result } = renderHook(() =>
      useCreateSubjectForm(onCreate, onClose),
    );

    act(() => {
      result.current.setName('AI');
      result.current.setDeadline(dayjs('2026-05-25T10:00:00'));
    });

    act(() => {
      result.current.handleSubmit();
    });

    expect(onCreate).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
