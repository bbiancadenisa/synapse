import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { AuthProvider, useAuth } from './AuthContext';

const TestComponent = () => {
  const { user, token, isAuthenticated, loginUser, logoutUser } = useAuth();

  return (
    <div>
      <div>Token: {token || 'none'}</div>
      <div>User: {user?.email || 'none'}</div>
      <div>Authenticated: {isAuthenticated ? 'yes' : 'no'}</div>

      <button
        onClick={() =>
          loginUser('mock-token', {
            id: 1,
            email: 'test@test.com',
          })
        }
      >
        Login
      </button>

      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts unauthenticated', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByText(/token: none/i)).toBeInTheDocument();
    expect(screen.getByText(/user: none/i)).toBeInTheDocument();
    expect(screen.getByText(/authenticated: no/i)).toBeInTheDocument();
  });

  it('logs user in', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/token: mock-token/i)).toBeInTheDocument();
    expect(screen.getByText(/user: test@test.com/i)).toBeInTheDocument();
    expect(screen.getByText(/authenticated: yes/i)).toBeInTheDocument();
  });

  it('logs user out', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await user.click(screen.getByRole('button', { name: /login/i }));
    await user.click(screen.getByRole('button', { name: /logout/i }));

    expect(screen.getByText(/token: none/i)).toBeInTheDocument();
    expect(screen.getByText(/user: none/i)).toBeInTheDocument();
    expect(screen.getByText(/authenticated: no/i)).toBeInTheDocument();
  });
});
