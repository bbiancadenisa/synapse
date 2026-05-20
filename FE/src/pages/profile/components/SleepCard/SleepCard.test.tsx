import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SleepCard } from './SleepCard';

describe('SleepCard', () => {
  it('renders input and save button when no sleep value exists', () => {
    render(
      <SleepCard sleepHours="" setSleepHours={vi.fn()} onSave={vi.fn()} />,
    );

    expect(screen.getByText(/sleep hours/i)).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('shows saved sleep value and edit button when sleep value exists', () => {
    render(
      <SleepCard sleepHours="7.5" setSleepHours={vi.fn()} onSave={vi.fn()} />,
    );

    expect(screen.getByText(/7.5h/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  it('calls setSleepHours when typing', async () => {
    const user = userEvent.setup();
    const setSleepHours = vi.fn();

    render(
      <SleepCard
        sleepHours=""
        setSleepHours={setSleepHours}
        onSave={vi.fn()}
      />,
    );

    await user.type(screen.getByRole('spinbutton'), '8');

    expect(setSleepHours).toHaveBeenCalledWith('8');
  });

  it('calls onSave when save is clicked', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();

    render(
      <SleepCard sleepHours="8" setSleepHours={vi.fn()} onSave={onSave} />,
    );

    await user.click(screen.getByRole('button', { name: /edit/i }));
    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(onSave).toHaveBeenCalledTimes(1);
  });
});
