import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TaskFilters } from './TaskFilters';

describe('TaskFilters', () => {
  it('renders filters component', () => {
    render(
      <TaskFilters
        sort="created_desc"
        status=""
        onSortChange={vi.fn()}
        onStatusChange={vi.fn()}
      />,
    );

    expect(screen.getByText(/filter and organize tasks/i)).toBeInTheDocument();
  });
});
