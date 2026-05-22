import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PenaltyPanel } from '../PenaltyPanel';

describe('PenaltyPanel', () => {
  it('renders fallback message without live stats', () => {
    render(<PenaltyPanel message={null} liveStats={null} />);

    expect(screen.getByText(/health stats affected/i)).toBeInTheDocument();
    expect(screen.getByText(/penalty mode is active/i)).toBeInTheDocument();
  });

  it('renders live stats', () => {
    render(
      <PenaltyPanel
        message="Penalty active"
        liveStats={{
          energy: 90,
          focus: 85,
          stress: 20,
          healthPoints: 88,
          burnoutRisk: 'low',
        }}
      />,
    );

    expect(screen.getByText(/penalty active/i)).toBeInTheDocument();
    expect(screen.getByText(/energy: 90%/i)).toBeInTheDocument();
    expect(screen.getByText(/focus: 85%/i)).toBeInTheDocument();
    expect(screen.getByText(/stress: 20%/i)).toBeInTheDocument();
    expect(screen.getByText(/health: 88%/i)).toBeInTheDocument();
    expect(screen.getByText(/risk: low/i)).toBeInTheDocument();
  });
});
