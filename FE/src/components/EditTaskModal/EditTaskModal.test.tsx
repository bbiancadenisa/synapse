import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EditTaskModal } from './EditTaskModal';

vi.mock('@mui/x-date-pickers', () => ({
  DateTimePicker: () => <input aria-label="Deadline" />,
}));

const task = {
  id: 1,
  title: 'Neural Networks',
  description: 'Study backpropagation.',
  estimated_hours: 5,
  priority: 'high' as const,
  status: 'todo' as const,
  deadline: '2026-05-25T10:00:00',
  total_study_ms: 0,
};

describe('EditTaskModal', () => {
  it('renders modal fields', () => {
    render(
      <EditTaskModal open task={task} onClose={vi.fn()} onUpdated={vi.fn()} />,
    );

    expect(
      screen.getByRole('heading', {
        name: /edit task/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/estimated hours/i)).toBeInTheDocument();

    expect(screen.getAllByRole('combobox')).toHaveLength(2);

    expect(screen.getAllByLabelText(/deadline/i)[0]).toBeInTheDocument();
  });

  it('has save button disabled initially', () => {
    render(
      <EditTaskModal open task={task} onClose={vi.fn()} onUpdated={vi.fn()} />,
    );

    expect(
      screen.getByRole('button', {
        name: /save changes/i,
      }),
    ).toBeDisabled();
  });

  it('enables save button after editing title', async () => {
    const user = userEvent.setup();

    render(
      <EditTaskModal open task={task} onClose={vi.fn()} onUpdated={vi.fn()} />,
    );

    const input = screen.getByLabelText(/title/i);

    await user.clear(input);
    await user.type(input, 'Updated Neural Networks');

    expect(
      screen.getByRole('button', {
        name: /save changes/i,
      }),
    ).toBeEnabled();
  });
});
