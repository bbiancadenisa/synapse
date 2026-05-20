import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SessionDonePanel } from '../SessionDonePanel';

describe('SessionDonePanel', () => {
  it('renders session done message', () => {
    render(<SessionDonePanel />);

    expect(screen.getByText(/study time reached/i)).toBeInTheDocument();
  });
});
