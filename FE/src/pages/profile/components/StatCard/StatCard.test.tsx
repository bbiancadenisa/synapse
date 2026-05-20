import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="Energy" value={80} />);

    expect(screen.getByText(/energy/i)).toBeInTheDocument();
    expect(screen.getByText(/80%/i)).toBeInTheDocument();
  });

  it('renders info button', () => {
    render(<StatCard label="Focus" value={75} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders custom suffix', () => {
    render(<StatCard label="Study time" value={120} suffix=" min" />);

    expect(screen.getByText(/120 min/i)).toBeInTheDocument();
  });
});
