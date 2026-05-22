import type {
  CreateTaskPayload,
  Task,
  TaskStatus,
  UpdateTaskPayload,
} from '../types/taskTypes';
import { api } from './api';

export const createTask = async (data: CreateTaskPayload) => {
  const res = await api.post('/tasks', data);
  return res.data;
};

export const getTasks = async (
  subjectId: number,
  params?: {
    sort?: string;
    status?: TaskStatus;
  },
) => {
  const res = await api.get(`/tasks/${subjectId}`, { params });
  return res.data as Task[];
};

export const getTaskById = async (id: number) => {
  const res = await api.get(`/tasks/task/${id}`);
  return res.data as Task;
};

export const updateTask = async (id: number, data: UpdateTaskPayload) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data as Task;
};

export const deleteTask = async (id: number) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};
