import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SessionInfoChips } from '../SessionInfChips';

describe('SessionInfoChips', () => {
  it('renders session setup values', () => {
    render(
      <SessionInfoChips
        config={{
          subjectId: 1,
          taskId: 2,
          plannedDuration: 30,
          breakInterval: 10,
          breakDuration: 5,
        }}
      />,
    );

    expect(screen.getByText(/session setup/i)).toBeInTheDocument();
    expect(screen.getByText(/study time: 30 min/i)).toBeInTheDocument();
    expect(screen.getByText(/break every: 10 min/i)).toBeInTheDocument();
    expect(screen.getByText(/break duration: 5 min/i)).toBeInTheDocument();
  });

  it('renders fallback values without config', () => {
    render(<SessionInfoChips />);

    expect(screen.getByText(/study time: - min/i)).toBeInTheDocument();
  });
});
