import { api } from './config/api';

export type DailyStats = {
  id: number;
  user_id: number;
  date: string;
  energy: number;
  stress: number;
  focus: number;
  sleep_hours: number | null;
  total_study_minutes: number;
  total_break_minutes: number;
  breaks_taken: number;
  productivity_score: number;
  health_points: number;
  health_message: string;
  burnout_risk: 'low' | 'medium' | 'high';
};

export const getTodayStats = async () => {
  const res = await api.get('/daily-stats/today');
  return res.data as DailyStats;
};

export const updateTodaySleepHours = async (sleepHours: number) => {
  const res = await api.patch('/daily-stats/today/sleep', {
    sleepHours,
  });

  return res.data as DailyStats;
};

export const recalculateTodayStats = async () => {
  const res = await api.post('/daily-stats/today/recalculate');
  return res.data as DailyStats;
};
