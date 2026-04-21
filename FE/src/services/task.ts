import { api } from './config/api';

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

// CREATE
export const createTask = async (data: {
  subject_id: number;
  title: string;
  description?: string;
  estimated_hours: number;
  priority: TaskPriority;
  deadline?: string;
}) => {
  const res = await api.post('/tasks', data);
  return res.data;
};

// GET TASKS BY SUBJECT (cu sort + filter)
export const getTasks = async (
  subjectId: number,
  params?: {
    sort?: string;
    status?: TaskStatus;
  },
) => {
  const res = await api.get(`/tasks/${subjectId}`, { params });
  return res.data;
};

// GET SINGLE TASK
export const getTaskById = async (id: number) => {
  const res = await api.get(`/tasks/task/${id}`);
  return res.data;
};

// UPDATE TASK
export const updateTask = async (
  id: number,
  data: {
    title?: string;
    description?: string;
    estimated_hours?: number;
    deadline?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
  },
) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};

// DELETE TASK
export const deleteTask = async (id: number) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};
