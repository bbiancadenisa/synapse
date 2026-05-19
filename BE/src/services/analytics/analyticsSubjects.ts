import type {
  SubjectAnalyticsItem,
  SubjectAnalyticsSummary,
} from './analyticsTypes';

const toNumber = (value: unknown) => Number(value || 0);

const calculateCompletionRate = (
  completedTasks: number,
  totalTasks: number,
) => {
  if (totalTasks === 0) return 0;

  return Math.round((completedTasks / totalTasks) * 100);
};

const calculateStressGenerated = (data: {
  upcomingDeadlines: number;
  overdueTasks: number;
  averageTaskProgress: number;
}) => {
  const score =
    data.upcomingDeadlines * 15 +
    data.overdueTasks * 25 +
    (100 - data.averageTaskProgress) * 0.2;

  return Math.min(100, Math.round(score));
};

const calculateProcrastinationScore = (data: {
  upcomingDeadlines: number;
  overdueTasks: number;
  averageTaskProgress: number;
}) => {
  const score =
    data.overdueTasks * 30 +
    data.upcomingDeadlines * 10 +
    (100 - data.averageTaskProgress) * 0.4;

  return Math.min(100, Math.round(score));
};

export const mapSubjectAnalytics = (rows: any[]): SubjectAnalyticsItem[] => {
  return rows.map((row) => {
    const totalTasks = toNumber(row.total_tasks);
    const completedTasks = toNumber(row.completed_tasks);
    const averageTaskProgress = toNumber(row.average_task_progress);
    const overdueTasks = toNumber(row.overdue_tasks);
    const upcomingDeadlines = toNumber(row.upcoming_deadlines);

    return {
      subjectId: row.subject_id,
      subjectName: row.subject_name,
      totalStudyMinutes: toNumber(row.total_study_minutes),
      totalSessions: toNumber(row.total_sessions),
      completedTasks,
      totalTasks,
      completionRate: calculateCompletionRate(completedTasks, totalTasks),
      averageTaskProgress,
      overdueTasks,
      upcomingDeadlines,
      stressGenerated: calculateStressGenerated({
        upcomingDeadlines,
        overdueTasks,
        averageTaskProgress,
      }),
      procrastinationScore: calculateProcrastinationScore({
        upcomingDeadlines,
        overdueTasks,
        averageTaskProgress,
      }),
    };
  });
};

const getMostDemandingSubject = (
  subjects: SubjectAnalyticsItem[],
): SubjectAnalyticsItem | null => {
  if (subjects.length === 0) return null;

  return subjects.reduce((highest, subject) =>
    subject.stressGenerated > highest.stressGenerated ? subject : highest,
  );
};

const getMostNeglectedSubject = (
  subjects: SubjectAnalyticsItem[],
): SubjectAnalyticsItem | null => {
  const eligibleSubjects = subjects.filter((subject) => subject.totalTasks > 0);

  if (eligibleSubjects.length === 0) return null;

  return eligibleSubjects.reduce((worst, subject) => {
    if (subject.procrastinationScore > worst.procrastinationScore) {
      return subject;
    }

    if (
      subject.procrastinationScore === worst.procrastinationScore &&
      subject.totalStudyMinutes < worst.totalStudyMinutes
    ) {
      return subject;
    }

    return worst;
  });
};

const getBestPerformingSubject = (
  subjects: SubjectAnalyticsItem[],
): SubjectAnalyticsItem | null => {
  const eligibleSubjects = subjects.filter((subject) => subject.totalTasks > 0);

  if (eligibleSubjects.length === 0) return null;

  return eligibleSubjects.reduce((best, subject) =>
    subject.completionRate > best.completionRate ? subject : best,
  );
};

export const buildSubjectAnalyticsSummary = (
  rows: any[],
): SubjectAnalyticsSummary => {
  const subjects = mapSubjectAnalytics(rows);

  return {
    subjects,
    mostDemandingSubject: getMostDemandingSubject(subjects),
    mostNeglectedSubject: getMostNeglectedSubject(subjects),
    bestPerformingSubject: getBestPerformingSubject(subjects),
  };
};
