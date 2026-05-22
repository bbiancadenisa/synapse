import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AuthProvider } from '../../../context/AuthContext';
import { LoginPage } from '../LoginPage';

const renderPage = () => {
  render(
    <AuthProvider>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </AuthProvider>,
  );
};

describe('LoginPage', () => {
  it('renders login page', () => {
    renderPage();

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('').length).toBeGreaterThan(0);
  });

  it('has login button disabled initially', () => {
    renderPage();

    expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
  });
});
