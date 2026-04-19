import { api } from './config/api';

export const getSubjects = async () => {
  const res = await api.get('/subjects');
  return res.data;
};

export const createSubject = async (data: {
  name: string;
  description: string;
  difficulty: 'low' | 'medium' | 'high';
  estimated_total_hours: number;
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
    difficulty: number;
    estimated_total_hours: number;
  },
) => {
  const res = await api.put(`/subjects/${id}`, data);
  return res.data;
};
