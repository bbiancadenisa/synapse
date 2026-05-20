import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SessionActions } from '../SessionActions';

describe('SessionActions', () => {
  it('calls manual break and end session actions', async () => {
    const user = userEvent.setup();
    const onManualBreak = vi.fn();
    const onEndSession = vi.fn();

    render(
      <SessionActions
        isOnBreak={false}
        onManualBreak={onManualBreak}
        onEndSession={onEndSession}
      />,
    );

    await user.click(screen.getByRole('button', { name: /take a break/i }));
    await user.click(screen.getByRole('button', { name: /end session/i }));

    expect(onManualBreak).toHaveBeenCalledTimes(1);
    expect(onEndSession).toHaveBeenCalledTimes(1);
  });

  it('disables take break button while on break', () => {
    render(
      <SessionActions
        isOnBreak
        onManualBreak={vi.fn()}
        onEndSession={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('button', { name: /take a break/i }),
    ).toBeDisabled();
  });
});
