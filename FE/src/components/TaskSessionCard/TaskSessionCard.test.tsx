import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TaskSessionCard } from './TaskSessionCard';

describe('TaskSessionCard', () => {
  it('renders session information', () => {
    render(
      <TaskSessionCard
        session={{
          id: 1,
          task_id: 10,
          status: 'completed',
          start_time: '2025-05-20T10:00:00.000Z',
          planned_duration_minutes: 60,
          created_at: '2025-05-20T10:00:00.000Z',
          break_count: 2,
          study_time_ms: 30 * 60 * 1000,
          end_time: null,
        }}
      />,
    );

    expect(screen.getByText(/planned study time: 60 min/i)).toBeInTheDocument();

    expect(screen.getByText(/breaks taken: 2/i)).toBeInTheDocument();

    expect(screen.getByText(/completed/i)).toBeInTheDocument();

    expect(screen.getByText(/50%/i)).toBeInTheDocument();
  });
});
