import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SubjectHeader } from './SubjectHeader';

const subject = {
  id: 1,
  name: 'Artificial Intelligence',
  description: 'Machine learning fundamentals and AI ethics.',
  difficulty: 'high' as const,
  color: '#6C63FF',
  overall_deadline: '2026-05-25',
};

describe('SubjectHeader', () => {
  it('renders subject information', () => {
    render(<SubjectHeader subject={subject} tasksCount={3} onEdit={vi.fn()} />);

    expect(screen.getByText(/artificial intelligence/i)).toBeInTheDocument();
    expect(
      screen.getByText(/machine learning fundamentals/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/difficulty: high/i)).toBeInTheDocument();
    expect(screen.getByText(/3 tasks/i)).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(<SubjectHeader subject={subject} tasksCount={1} onEdit={onEdit} />);

    await user.click(screen.getByRole('button', { name: /edit subject/i }));

    expect(onEdit).toHaveBeenCalledTimes(1);
  });
});
