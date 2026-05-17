import type { StudySession } from '../../services/session';
import type { TaskCardStatus, TaskCardTask } from '../../types/taskCardTypes';

export const getTaskProgress = (task: TaskCardTask) => {
  const estimatedMs = task.estimated_hours * 60 * 60 * 1000;

  if (!estimatedMs) return 0;

  return Math.round(((task.total_study_ms ?? 0) / estimatedMs) * 100);
};

export const getSessionProgress = (session: StudySession) => {
  const plannedMs = session.planned_duration_minutes * 60 * 1000;

  if (!plannedMs) return 0;

  return Math.round((session.study_time_ms / plannedMs) * 100);
};

export const formatStatus = (status: TaskCardStatus) => {
  if (status === 'in_progress') return 'In progress';
  if (status === 'todo') return 'To do';
  if (status === 'done') return 'Done';

  return status;
};

export const formatSessionStatus = (status: string) => {
  if (status === 'timed_out') return 'Timed out';
  if (status === 'completed') return 'Completed';
  if (status === 'paused') return 'Paused';
  if (status === 'running') return 'Running';

  return status;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
