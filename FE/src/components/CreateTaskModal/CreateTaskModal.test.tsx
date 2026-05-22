import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CreateTaskModal } from './CreateTaskModal';

vi.mock('@mui/x-date-pickers', () => ({
  DateTimePicker: () => <input aria-label="Deadline" />,
}));

describe('CreateTaskModal', () => {
  it('does not render when closed', () => {
    render(
      <CreateTaskModal
        open={false}
        subjectId={1}
        onClose={vi.fn()}
        onCreated={vi.fn()}
      />,
    );

    expect(screen.queryByText(/create task/i)).not.toBeInTheDocument();
  });

  it('renders modal fields when open', () => {
    render(
      <CreateTaskModal
        open
        subjectId={1}
        onClose={vi.fn()}
        onCreated={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('heading', { name: /create task/i }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/estimated hours/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getAllByLabelText(/deadline/i)[0]).toBeInTheDocument();
  });

  it('has create button disabled initially', () => {
    render(
      <CreateTaskModal
        open
        subjectId={1}
        onClose={vi.fn()}
        onCreated={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: /create task/i })).toBeDisabled();
  });
});
