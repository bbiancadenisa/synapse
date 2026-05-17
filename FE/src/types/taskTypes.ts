export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type Task = {
  id: number;
  title: string;
  description?: string;
  estimated_hours: number;
  priority: TaskPriority;
  status: TaskStatus;
  deadline?: string;
  total_study_ms?: number;
};

export type CreateTaskPayload = {
  subject_id: number;
  title: string;
  description: string;
  estimated_hours: number;
  priority: TaskPriority;
  deadline: string;
};

export type UpdateTaskPayload = {
  title: string;
  description: string;
  estimated_hours: number;
  priority: TaskPriority;
  status: TaskStatus;
  deadline: string;
};
