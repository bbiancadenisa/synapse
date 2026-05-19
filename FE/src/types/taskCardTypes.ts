export type TaskCardStatus = 'todo' | 'in_progress' | 'done';

export type TaskCardTask = {
  id: number;
  title: string;
  description?: string | null;
  deadline?: string;
  status: TaskCardStatus;
  priority: 'low' | 'medium' | 'high';
  estimated_hours: number;
  total_study_ms?: number;
};

export type TaskCardProps = {
  task: TaskCardTask;
  onDeleted?: () => void;
  onEdit: () => void;
  onCreateSession: () => void;
};
