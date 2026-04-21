import { api } from './config/api';

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
