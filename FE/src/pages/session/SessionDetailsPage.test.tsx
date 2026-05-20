import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { SessionPage } from './SessionDetailsPage';

vi.mock('../../hooks/useSessionRuntime', () => ({
  useSessionRuntime: () => ({
    studySeconds: 120,
    studyProgress: 40,
    breakSecondsLeft: 60,
    breakTotalSeconds: 60,
    breakProgress: 0,
    isOnBreak: false,
    breakReminder: false,
    sessionDone: false,
    penaltyTriggered: false,
    penaltyMessage: null,
    liveStats: null,
    handleAcceptBreak: vi.fn(),
    handleIgnoreBreak: vi.fn(),
    handleManualBreak: vi.fn(),
    handleEndSession: vi.fn(),
  }),
}));

vi.mock('./components/TimeCard', () => ({
  TimerCard: ({ title }: { title: string }) => <div>{title}</div>,
}));

vi.mock('./components/SessionInfChips', () => ({
  SessionInfoChips: () => <div>Session info</div>,
}));

vi.mock('./components/SessionActions', () => ({
  SessionActions: ({ onEndSession }: { onEndSession: () => void }) => (
    <button onClick={onEndSession}>End Session</button>
  ),
}));

describe('SessionPage', () => {
  it('renders session page content', () => {
    render(
      <MemoryRouter>
        <SessionPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/study session/i)).toBeInTheDocument();
    expect(screen.getByText(/session info/i)).toBeInTheDocument();
    expect(screen.getByText(/study timer/i)).toBeInTheDocument();
    expect(screen.getByText(/break timer/i)).toBeInTheDocument();
  });

  it('opens short session modal for sessions under 5 minutes', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <SessionPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByText(/end session/i));

    expect(screen.getByText(/session too short/i)).toBeInTheDocument();

    expect(
      screen.getByText(/will not be saved to your statistics/i),
    ).toBeInTheDocument();
  });
});
