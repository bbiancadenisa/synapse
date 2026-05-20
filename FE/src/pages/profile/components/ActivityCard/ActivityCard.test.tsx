import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ActivityCard } from './ActivityCard';

const stats = {
  energy: 80,
  focus: 75,
  stress: 35,
  sleep_hours: 7,
  total_study_minutes: 120,
  total_break_minutes: 20,
  breaks_taken: 2,
  productivity_score: 78,
  health_points: 82,
  health_message: 'You are doing okay.',
  burnout_risk: 'low',
};

describe('ActivityCard', () => {
  it('renders activity stats', () => {
    render(<ActivityCard stats={stats as any} />);

    expect(screen.getByText(/today's activity/i)).toBeInTheDocument();

    expect(screen.getByText(/study minutes/i)).toBeInTheDocument();

    expect(screen.getByText(/break minutes/i)).toBeInTheDocument();

    expect(screen.getByText(/breaks taken/i)).toBeInTheDocument();

    expect(screen.getByText(/productivity/i)).toBeInTheDocument();

    expect(screen.getByText(/78%/i)).toBeInTheDocument();
  });

  it('renders productivity info button', () => {
    render(<ActivityCard stats={stats as any} />);

    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});
