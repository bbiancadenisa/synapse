export type InsightType = 'success' | 'warning' | 'info';

export type Insight = {
  type: InsightType;
  message: string;
};

export type BurnoutRisk = 'low' | 'medium' | 'high';

export type BurnoutAnalytics = {
  risk: BurnoutRisk;
  score: number;
  mainFactor: string;
  factors: string[];
  ignoredBreaks: number;
  penalties: number;
};

export type WellnessTrend = {
  date: string;
  energy: number;
  focus: number;
  stress: number;
  healthPoints: number;
  burnoutRisk: BurnoutRisk;
};

export type ProductivityByHour = {
  hour: number;
  studyMinutes: number;
  sessionCount: number;
};

export type IgnoredBreaksByHour = {
  hour: number;
  ignoredBreaks: number;
};

export type SubjectAnalyticsItem = {
  subjectId: number;
  subjectName: string;
  totalStudyMinutes: number;
  totalSessions: number;
  completedTasks: number;
  totalTasks: number;
  completionRate: number;
  averageTaskProgress: number;
  overdueTasks: number;
  upcomingDeadlines: number;
  stressGenerated: number;
  procrastinationScore: number;
};

export type SubjectAnalyticsSummary = {
  subjects: SubjectAnalyticsItem[];
  mostDemandingSubject: SubjectAnalyticsItem | null;
  mostNeglectedSubject: SubjectAnalyticsItem | null;
  bestPerformingSubject: SubjectAnalyticsItem | null;
};

export type RecoveryAnalytics = {
  breakEfficiency: number;
  recoveryRate: 'good' | 'moderate' | 'low';
  sleepImpact: string;
  stressRecovery: 'stable' | 'needs_attention';
};
