import type {
  CreateSubjectPayload,
  Difficulty,
  Subject,
  UpdateSubjectPayload,
} from '../types/subjectTypes';
import { api } from './api';

export const getSubjects = async (params?: {
  sort?: string;
  difficulty?: Difficulty;
  archived?: boolean;
}) => {
  const res = await api.get('/subjects', { params });
  return res.data as Subject[];
};

export const createSubject = async (data: CreateSubjectPayload) => {
  const res = await api.post('/subjects', data);
  return res.data as Subject;
};

export const deleteSubject = async (id: number) => {
  const res = await api.delete(`/subjects/${id}`);
  return res.data;
};

export const updateSubject = async (id: number, data: UpdateSubjectPayload) => {
  const res = await api.put(`/subjects/${id}`, data);
  return res.data as Subject;
};

export const getSubjectById = async (id: number) => {
  const res = await api.get(`/subjects/${id}`);
  return res.data as {
    subject: Subject;
  };
};
