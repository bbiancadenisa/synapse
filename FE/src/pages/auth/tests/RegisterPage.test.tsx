import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AuthProvider } from '../../../context/AuthContext';
import { RegisterPage } from '../RegisterPage';

const renderPage = () => {
  render(
    <AuthProvider>
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    </AuthProvider>,
  );
};

describe('RegisterPage', () => {
  it('renders register page', () => {
    renderPage();

    expect(screen.getByText(/create account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('').length).toBeGreaterThan(0);
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it('has register button disabled initially', () => {
    renderPage();

    expect(screen.getByRole('button', { name: /register/i })).toBeDisabled();
  });
});
