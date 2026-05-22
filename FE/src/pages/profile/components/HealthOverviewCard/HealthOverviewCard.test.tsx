import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HealthOverviewCard } from './HealthOverviewCard';

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

describe('HealthOverviewCard', () => {
  it('renders health information', () => {
    render(<HealthOverviewCard stats={stats as any} />);

    expect(screen.getByText(/health points/i)).toBeInTheDocument();

    expect(screen.getByText(/you are doing okay/i)).toBeInTheDocument();

    expect(screen.getByText(/82%/i)).toBeInTheDocument();

    expect(screen.getByText(/low risk/i)).toBeInTheDocument();
  });
});
