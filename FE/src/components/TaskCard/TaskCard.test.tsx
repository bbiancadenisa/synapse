import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TaskCard } from './TaskCard';

vi.mock('../TaskSessionCard/TaskSessionCard', () => ({
  TaskSessionCard: () => <div>Session card</div>,
}));

vi.mock('./useTaskSession', () => ({
  useTaskSessions: () => ({
    sessions: [],
    loadingSessions: false,
    loadSessions: vi.fn(),
  }),
}));

const task = {
  id: 1,
  title: 'Neural Networks',
  description: 'Study backpropagation and CNNs.',
  estimated_hours: 5,
  priority: 'high' as const,
  status: 'todo' as const,
  deadline: '2026-05-25T10:00:00',
  total_study_ms: 7200000,
};

describe('TaskCard', () => {
  it('renders task information', () => {
    render(
      <TaskCard
        task={task}
        onDeleted={vi.fn()}
        onEdit={vi.fn()}
        onCreateSession={vi.fn()}
      />,
    );

    expect(screen.getByText(/neural networks/i)).toBeInTheDocument();

    expect(
      screen.getByText(/study backpropagation and cnns/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/priority: high/i)).toBeInTheDocument();

    expect(screen.getByText(/5h estimated/i)).toBeInTheDocument();

    expect(screen.getByText(/40%/i)).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();

    const onEdit = vi.fn();

    render(
      <TaskCard
        task={task}
        onDeleted={vi.fn()}
        onEdit={onEdit}
        onCreateSession={vi.fn()}
      />,
    );

    const buttons = screen.getAllByRole('button');

    await user.click(buttons[1]);

    expect(onEdit).toHaveBeenCalled();
  });

  it('calls onDeleted when delete button is clicked', async () => {
    const user = userEvent.setup();

    const onDeleted = vi.fn();

    render(
      <TaskCard
        task={task}
        onDeleted={onDeleted}
        onEdit={vi.fn()}
        onCreateSession={vi.fn()}
      />,
    );

    const buttons = screen.getAllByRole('button');

    await user.click(buttons[2]);

    expect(onDeleted).toHaveBeenCalled();
  });
});
