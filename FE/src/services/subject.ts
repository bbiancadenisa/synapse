import { api } from './config/api';

export const getSubjects = async (params?: {
  sort?: string;
  difficulty?: 'low' | 'medium' | 'high';
  archived?: boolean;
}) => {
  const res = await api.get('/subjects', { params });
  return res.data;
};

export const createSubject = async (data: {
  name: string;
  description: string;
  difficulty: 'low' | 'medium' | 'high';
  color: string;
  overall_deadline: string;
}) => {
  const res = await api.post('/subjects', data);
  return res.data;
};

export const deleteSubject = async (id: number) => {
  const res = await api.delete(`/subjects/${id}`);
  return res.data;
};

export const updateSubject = async (
  id: number,
  data: {
    name: string;
    description: string;
    difficulty: 'low' | 'medium' | 'high';
    color: string;
    overall_deadline: string;
  },
) => {
  const res = await api.put(`/subjects/${id}`, data);
  return res.data;
};

export const getSubjectById = async (id: number) => {
  const res = await api.get(`/subjects/${id}`);
  return res.data;
};
