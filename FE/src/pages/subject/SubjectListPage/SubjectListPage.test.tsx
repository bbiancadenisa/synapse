import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSubjectsList } from '../../../hooks/useSubjectList';
import { SubjectsListPage } from './SubjectsListPage';

vi.mock('../../../hooks/useSubjectList', () => ({
  useSubjectsList: vi.fn(),
}));

vi.mock('../../../components/CreateSubjectModal/CreateSubjectModal', () => ({
  CreateSubjectModal: ({ open }: { open: boolean }) =>
    open ? <div>Create Subject Modal</div> : null,
}));

const baseHookValue = {
  sort: 'created_desc',
  setSort: vi.fn(),
  createModalOpen: false,
  setCreateModalOpen: vi.fn(),
  deleteError: null,
  setDeleteError: vi.fn(),
  handleCreate: vi.fn(),
  handleDelete: vi.fn(),
};

const renderPage = () => {
  render(
    <MemoryRouter>
      <SubjectsListPage />
    </MemoryRouter>,
  );
};

describe('SubjectsListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders page title', () => {
    vi.mocked(useSubjectsList).mockReturnValue({
      ...baseHookValue,
      subjects: [],
    });

    renderPage();

    expect(
      screen.getByRole('heading', {
        name: /subjects/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders empty state when there are no subjects', () => {
    vi.mocked(useSubjectsList).mockReturnValue({
      ...baseHookValue,
      subjects: [],
    });

    renderPage();

    expect(screen.getByText(/no subjects yet/i)).toBeInTheDocument();
  });

  it('renders subject cards when subjects exist', () => {
    vi.mocked(useSubjectsList).mockReturnValue({
      ...baseHookValue,
      subjects: [
        {
          id: 1,
          name: 'Mathematics',
          description: 'Algebra and geometry',
          difficulty: 'medium' as const,
          color: '#6C63FF',
          overall_deadline: '2026-06-01T00:00:00.000Z',
        },
      ],
    });

    renderPage();

    expect(screen.getByText(/mathematics/i)).toBeInTheDocument();
    expect(screen.getByText(/algebra and geometry/i)).toBeInTheDocument();
  });

  it('opens create subject modal when button is clicked', async () => {
    const user = userEvent.setup();
    const setCreateModalOpen = vi.fn();

    vi.mocked(useSubjectsList).mockReturnValue({
      ...baseHookValue,
      subjects: [],
      setCreateModalOpen,
    });

    renderPage();

    const buttons = screen.getAllByRole('button', {
      name: /create subject/i,
    });

    await user.click(buttons[0]);

    expect(setCreateModalOpen).toHaveBeenCalledWith(true);
  });
});
