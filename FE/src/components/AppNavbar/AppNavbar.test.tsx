import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { AuthProvider } from '../../context/AuthContext';
import { AppNavbar } from './AppNavbar';

const renderNavbar = () => {
  localStorage.setItem('token', 'mock-token');
  localStorage.setItem(
    'user',
    JSON.stringify({
      id: 1,
      email: 'test@example.com',
    }),
  );

  render(
    <AuthProvider>
      <MemoryRouter>
        <AppNavbar />
      </MemoryRouter>
    </AuthProvider>,
  );
};

describe('AppNavbar', () => {
  it('renders brand, nav links and user email', () => {
    renderNavbar();

    expect(screen.getByText(/synapse/i)).toBeInTheDocument();
    expect(screen.getByText(/lifestats/i)).toBeInTheDocument();
    expect(screen.getByText(/subjects/i)).toBeInTheDocument();
    expect(screen.getByText(/analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  it('renders logout button', () => {
    renderNavbar();

    expect(
      screen.getByRole('button', {
        name: /logout/i,
      }),
    ).toBeInTheDocument();
  });
});
