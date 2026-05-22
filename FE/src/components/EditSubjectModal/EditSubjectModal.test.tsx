import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { EditSubjectModal } from './EditSubjectModal';

vi.mock('../ColorPicker/ColorPicker', () => ({
  ColorPicker: () => <div>Color picker</div>,
}));

vi.mock('@mui/x-date-pickers/DateTimePicker', () => ({
  DateTimePicker: () => <input aria-label="Deadline" />,
}));

const subject = {
  id: 1,
  name: 'Artificial Intelligence',
  description: 'Machine learning fundamentals.',
  difficulty: 'high' as const,
  color: '#6C63FF',
  overall_deadline: '2026-05-25',
};

describe('EditSubjectModal', () => {
  it('renders modal fields', () => {
    render(
      <EditSubjectModal
        open
        subject={subject}
        onClose={vi.fn()}
        onUpdated={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('heading', {
        name: /edit subject/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/deadline/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText(/color picker/i)).toBeInTheDocument();
  });

  it('renders save changes button', () => {
    render(
      <EditSubjectModal
        open
        subject={subject}
        onClose={vi.fn()}
        onUpdated={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('button', {
        name: /save changes/i,
      }),
    ).toBeInTheDocument();
  });
});
