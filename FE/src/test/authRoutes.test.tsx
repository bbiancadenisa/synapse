import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { PublicRoute } from '../components/PublicRoute/PublicRoute';
import { AuthProvider } from '../context/AuthContext';

const renderWithAuthProvider = (initialPath: string) => {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<div>Login Page</div>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<div>LifeStats Page</div>} />
            <Route path="/subjects" element={<div>Subjects Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
};

describe('Auth routing integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects unauthenticated users from protected routes to login', async () => {
    renderWithAuthProvider('/subjects');

    expect(await screen.findByText(/login page/i)).toBeInTheDocument();
  });

  it('allows authenticated users to access protected routes', async () => {
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: 1,
        email: 'test@example.com',
      }),
    );

    renderWithAuthProvider('/subjects');

    expect(await screen.findByText(/subjects page/i)).toBeInTheDocument();
  });

  it('redirects authenticated users away from public login route', async () => {
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: 1,
        email: 'test@example.com',
      }),
    );

    renderWithAuthProvider('/login');

    expect(await screen.findByText(/lifestats page/i)).toBeInTheDocument();
  });
});
