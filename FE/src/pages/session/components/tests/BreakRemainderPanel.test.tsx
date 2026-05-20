import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { BreakReminderPanel } from '../BreakReminderPanel';

describe('BreakReminderPanel', () => {
  it('renders break reminder message', () => {
    render(<BreakReminderPanel onAccept={vi.fn()} onIgnore={vi.fn()} />);

    expect(screen.getByText(/time for a break/i)).toBeInTheDocument();
    expect(screen.getByText(/focus cycle is complete/i)).toBeInTheDocument();
  });

  it('calls accept and ignore handlers', async () => {
    const user = userEvent.setup();
    const onAccept = vi.fn();
    const onIgnore = vi.fn();

    render(<BreakReminderPanel onAccept={onAccept} onIgnore={onIgnore} />);

    await user.click(screen.getByRole('button', { name: /accept break/i }));
    await user.click(screen.getByRole('button', { name: /ignore/i }));

    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onIgnore).toHaveBeenCalledTimes(1);
  });
});
