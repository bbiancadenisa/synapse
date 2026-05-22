import { api } from './api';

export type StudySession = {
  id: number;
  task_id: number;
  status: 'running' | 'paused' | 'completed' | 'timed_out';
  start_time: string;
  end_time?: string | null;
  planned_duration_minutes: number;
  created_at: string;
  break_count: number;
  study_time_ms: number;
};

export const startStudySession = async (data: {
  taskId: number;
  plannedDurationMinutes: number;
  breakIntervalMinutes: number;
  breakDurationMinutes: number;
}) => {
  const res = await api.post('/study-sessions/start', data);
  return res.data;
};

export const endStudySession = async (sessionId: number) => {
  const res = await api.post(`/study-sessions/${sessionId}/end`);
  return res.data;
};

export const getSessionsByTaskId = async (taskId: number) => {
  const res = await api.get(`/study-sessions/task/${taskId}`);
  return res.data as StudySession[];
};
