import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TimerCard } from '../TimeCard';

describe('TimerCard', () => {
  it('renders timer title, label and time', () => {
    render(
      <TimerCard
        title="STUDY TIMER"
        label="FOCUS"
        seconds={125}
        progress={50}
        baseColor="#eee"
        progressColor="#6C63FF"
        shadowColor="rgba(0,0,0,0.1)"
      />,
    );

    expect(screen.getByText(/study timer/i)).toBeInTheDocument();
    expect(screen.getByText(/focus/i)).toBeInTheDocument();
    expect(screen.getByText(/2:05|02:05/i)).toBeInTheDocument();
  });
});
