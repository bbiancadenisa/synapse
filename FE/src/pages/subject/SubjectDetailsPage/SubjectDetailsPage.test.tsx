import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSubjectDetails } from '../../../hooks/useSubjectDetails';
import { SubjectDetailsPage } from './SubjectDetailsPage';

vi.mock('../../../hooks/useSubjectDetails', () => ({
  useSubjectDetails: vi.fn(),
}));

vi.mock('../../../components/CreateTaskModal/CreateTaskModal', () => ({
  CreateTaskModal: () => null,
}));

vi.mock('../../../components/CreateSessionModal/CreateSessionModal', () => ({
  CreateSessionModal: () => null,
}));

vi.mock('../../../components/EditSubjectModal/EditSubjectModal', () => ({
  EditSubjectModal: () => null,
}));

vi.mock('../../../components/EditTaskModal/EditTaskModal', () => ({
  EditTaskModal: () => null,
}));

const baseDetails = {
  numericSubjectId: 1,
  subject: {
    id: 1,
    name: 'Artificial Intelligence',
    description: 'Machine learning fundamentals and AI ethics.',
    difficulty: 'high' as const,
    color: '#6C63FF',
    overall_deadline: '2026-05-25',
  },
  tasks: [],
  sort: 'created_desc',
  status: '' as const,
  createTaskOpen: false,
  setCreateTaskOpen: vi.fn(),
  createSessionOpen: false,
  setCreateSessionOpen: vi.fn(),
  selectedTask: null,
  editSubjectOpen: false,
  setEditSubjectOpen: vi.fn(),
  editTaskOpen: false,
  setEditTaskOpen: vi.fn(),
  fetchTasks: vi.fn(),
  fetchSubject: vi.fn(),
  handleStartSession: vi.fn(),
  setSort: vi.fn(),
  setStatus: vi.fn(),
  openEditTask: vi.fn(),
  openCreateSession: vi.fn(),
};

const renderPage = () => {
  render(
    <MemoryRouter>
      <SubjectDetailsPage />
    </MemoryRouter>,
  );
};

describe('SubjectDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state when subject is missing', () => {
    (useSubjectDetails as any).mockReturnValue({
      ...baseDetails,
      subject: null,
    });

    renderPage();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders subject header when subject exists', () => {
    (useSubjectDetails as any).mockReturnValue(baseDetails);

    renderPage();

    expect(screen.getByText(/artificial intelligence/i)).toBeInTheDocument();
    expect(
      screen.getByText(/machine learning fundamentals and ai ethics/i),
    ).toBeInTheDocument();
  });

  it('renders empty tasks state when there are no tasks', () => {
    (useSubjectDetails as any).mockReturnValue(baseDetails);

    renderPage();

    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it('renders tasks section title', () => {
    (useSubjectDetails as any).mockReturnValue(baseDetails);

    renderPage();

    expect(
      screen.getByRole('button', {
        name: /add task/i,
      }),
    ).toBeInTheDocument();
  });
});
