import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SubjectCard } from './SubjectCard';

const subject = {
  id: 1,
  name: 'Mathematics',
  description: 'Study algebra, geometry and problem solving.',
  difficulty: 'medium' as const,
  color: '#6C63FF',
  overall_deadline: '2026-06-01T00:00:00.000Z',
};

describe('SubjectCard', () => {
  it('renders subject information', () => {
    render(
      <SubjectCard subject={subject} onView={vi.fn()} onDelete={vi.fn()} />,
    );

    expect(screen.getByText(/mathematics/i)).toBeInTheDocument();

    expect(
      screen.getByText(/study algebra, geometry and problem solving/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/medium/i)).toBeInTheDocument();
  });

  it('calls onView when card is clicked', async () => {
    const user = userEvent.setup();
    const onView = vi.fn();

    render(
      <SubjectCard subject={subject} onView={onView} onDelete={vi.fn()} />,
    );

    await user.click(screen.getByText(/mathematics/i));

    expect(onView).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <SubjectCard subject={subject} onView={vi.fn()} onDelete={onDelete} />,
    );

    await user.click(
      screen.getByRole('button', {
        name: /delete subject/i,
      }),
    );

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
