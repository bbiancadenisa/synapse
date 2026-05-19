import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CreateSubjectModal } from './CreateSubjectModal';

vi.mock('../ColorPicker/ColorPicker', () => ({
  ColorPicker: () => <div>Color picker</div>,
}));

vi.mock('@mui/x-date-pickers', async () => {
  const actual = await vi.importActual<typeof import('@mui/x-date-pickers')>(
    '@mui/x-date-pickers',
  );

  return {
    ...actual,
    DateTimePicker: () => <input aria-label="Deadline" />,
  };
});

describe('CreateSubjectModal', () => {
  it('does not render when closed', () => {
    render(
      <CreateSubjectModal open={false} onClose={vi.fn()} onCreate={vi.fn()} />,
    );

    expect(screen.queryByText(/create subject/i)).not.toBeInTheDocument();
  });

  it('renders modal fields when open', () => {
    render(<CreateSubjectModal open onClose={vi.fn()} onCreate={vi.fn()} />);

    expect(
      screen.getByRole('heading', {
        name: /create subject/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/color picker/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/deadline/i)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/difficulty/i)[0]).toBeInTheDocument();
  });

  it('has create button disabled initially', () => {
    render(<CreateSubjectModal open onClose={vi.fn()} onCreate={vi.fn()} />);

    expect(
      screen.getByRole('button', {
        name: /create subject/i,
      }),
    ).toBeDisabled();
  });
});
