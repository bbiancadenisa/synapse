import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useDailyStats } from '../../hooks/useDailyStats';
import { UserProfilePage } from './UserProfilePage';

vi.mock('../../hooks/useDailyStats', () => ({
  useDailyStats: vi.fn(),
}));

vi.mock('./components/HealthOverviewCard/HealthOverviewCard', () => ({
  HealthOverviewCard: () => <div>Health overview</div>,
}));

vi.mock('./components/StatCard/StatCard', () => ({
  StatCard: ({ label }: { label: string }) => <div>{label}</div>,
}));

vi.mock('./components/SleepCard/SleepCard', () => ({
  SleepCard: () => <div>Sleep card</div>,
}));

vi.mock('./components/ActivityCard/ActivityCard', () => ({
  ActivityCard: () => <div>Activity card</div>,
}));

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

describe('UserProfilePage', () => {
  it('renders loading state', () => {
    (useDailyStats as any).mockReturnValue({
      stats: null,
      sleepHours: '',
      setSleepHours: vi.fn(),
      loading: true,
      handleSaveSleep: vi.fn(),
    });

    render(<UserProfilePage />);

    expect(screen.getByText(/loading stats/i)).toBeInTheDocument();
  });

  it('renders user profile dashboard', () => {
    (useDailyStats as any).mockReturnValue({
      stats,
      sleepHours: '7',
      setSleepHours: vi.fn(),
      loading: false,
      handleSaveSleep: vi.fn(),
    });

    render(<UserProfilePage />);

    expect(screen.getByText(/today's lifestats/i)).toBeInTheDocument();
    expect(screen.getByText(/health overview/i)).toBeInTheDocument();
    expect(screen.getByText(/health overview/i)).toBeInTheDocument();
    expect(screen.getByText(/sleep card/i)).toBeInTheDocument();
    expect(screen.getByText(/activity card/i)).toBeInTheDocument();
    expect(screen.getByText(/sleep card/i)).toBeInTheDocument();
    expect(screen.getByText(/activity card/i)).toBeInTheDocument();
  });
});
