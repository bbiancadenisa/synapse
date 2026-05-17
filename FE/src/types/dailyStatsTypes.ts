export type BurnoutRisk = 'low' | 'medium' | 'high';

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
  burnout_risk: BurnoutRisk;
  break_penalty_points?: number;
};

export type LiveStats = {
  energy?: number;
  focus?: number;
  stress?: number;
  healthPoints?: number;
  burnoutRisk?: string;
};
