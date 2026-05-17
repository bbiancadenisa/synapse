export type TaskCardStatus = 'todo' | 'in_progress' | 'done';

export type TaskCardTask = {
  id: number;
  title: string;
  status: TaskCardStatus;
  estimated_hours: number;
  description?: string;
  total_study_ms?: number;
};

export type TaskCardProps = {
  task: TaskCardTask;
  onDeleted?: () => void;
  onEdit: () => void;
  onCreateSession: () => void;
};
