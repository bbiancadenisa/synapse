import { api } from './config/api';

export const createTask = async (data: any) => {
  const res = await api.post('/tasks', data);
  return res.data;
};

export const getTasks = async (subjectId: number) => {
  const res = await api.get(`/tasks/${subjectId}`);
  return res.data;
};

export const deleteTask = async (id: number) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};

export const markTaskDone = async (id: number) => {
  const res = await api.patch(`/tasks/${id}/done`);
  return res.data;
};
