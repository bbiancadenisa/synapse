import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TasksSection } from './TaskSection';

vi.mock('../../../../../components/TaskCard/TaskCard', () => ({
  TaskCard: ({ task }: any) => <div>{task.title}</div>,
}));

const task = {
  id: 1,
  title: 'Neural Network Fundamentals',
  description: 'Review perceptrons and backpropagation.',
  estimated_hours: 5,
  priority: 'high' as const,
  status: 'todo' as const,
  deadline: '2026-05-25',
  total_study_ms: 0,
};

describe('TasksSection', () => {
  it('renders empty state when there are no tasks', () => {
    render(
      <TasksSection
        tasks={[]}
        onAddTask={vi.fn()}
        onEditTask={vi.fn()}
        onRefreshTasks={vi.fn()}
        onCreateSession={vi.fn()}
      />,
    );

    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it('renders task cards when tasks exist', () => {
    render(
      <TasksSection
        tasks={[task]}
        onAddTask={vi.fn()}
        onEditTask={vi.fn()}
        onRefreshTasks={vi.fn()}
        onCreateSession={vi.fn()}
      />,
    );

    expect(
      screen.getByText(/neural network fundamentals/i),
    ).toBeInTheDocument();
  });

  it('calls onAddTask when Add task is clicked', async () => {
    const user = userEvent.setup();
    const onAddTask = vi.fn();

    render(
      <TasksSection
        tasks={[]}
        onAddTask={onAddTask}
        onEditTask={vi.fn()}
        onRefreshTasks={vi.fn()}
        onCreateSession={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(onAddTask).toHaveBeenCalledTimes(1);
  });
});
