import type { Insight } from './analyticsTypes';

type BuildInsightsInput = {
  currentStreak: number;
  longestStreak: number;
  last7Minutes: number;
  previous7Minutes: number;
  latestStress: number;
  latestEnergy: number;
  latestFocus: number;
  ignoredBreaks: number;
  penalties: number;
  totalBreaks: number;
  totalSessions: number;
  bestStudyHour: number | null;
  mostDemandingSubject?: string;
  mostNeglectedSubject?: string;
};

export const buildInsights = ({
  currentStreak,
  longestStreak,
  last7Minutes,
  previous7Minutes,
  latestStress,
  latestEnergy,
  latestFocus,
  ignoredBreaks,
  penalties,
  totalBreaks,
  totalSessions,
  bestStudyHour,
  mostDemandingSubject,
  mostNeglectedSubject,
}: BuildInsightsInput): Insight[] => {
  const insights: Insight[] = [];

  if (currentStreak >= 3) {
    insights.push({
      type: 'success',
      message: `You are on a ${currentStreak}-day study streak.`,
    });
  }

  if (longestStreak >= 5) {
    insights.push({
      type: 'success',
      message: `Your longest streak is ${longestStreak} days.`,
    });
  }

  if (last7Minutes > previous7Minutes) {
    insights.push({
      type: 'success',
      message:
        'You studied more in the last 7 days than in the previous 7 days.',
    });
  }

  if (last7Minutes < previous7Minutes) {
    insights.push({
      type: 'info',
      message: 'Your study time dropped compared with the previous 7 days.',
    });
  }

  if (latestStress >= 70) {
    insights.push({
      type: 'warning',
      message: 'Your stress level is high. Consider reducing study intensity.',
    });
  }

  if (latestEnergy <= 45) {
    insights.push({
      type: 'warning',
      message: 'Your energy is low. Recovery should be prioritized.',
    });
  }

  if (latestFocus <= 50) {
    insights.push({
      type: 'warning',
      message: 'Your focus is low. Shorter sessions may work better today.',
    });
  }

  if (ignoredBreaks >= 3) {
    insights.push({
      type: 'warning',
      message: `You ignored ${ignoredBreaks} break reminders recently.`,
    });
  }

  if (penalties > 0) {
    insights.push({
      type: 'warning',
      message:
        'Penalty mode was triggered recently, which affected your health stats.',
    });
  }

  if (totalSessions > 0 && totalBreaks === 0) {
    insights.push({
      type: 'warning',
      message: 'You completed study sessions without taking breaks.',
    });
  }

  if (bestStudyHour !== null) {
    insights.push({
      type: 'info',
      message: `Your best study hour appears to be around ${bestStudyHour}:00.`,
    });
  }

  if (mostDemandingSubject) {
    insights.push({
      type: 'info',
      message: `${mostDemandingSubject} is currently your most demanding subject.`,
    });
  }

  if (mostNeglectedSubject) {
    insights.push({
      type: 'warning',
      message: `${mostNeglectedSubject} looks neglected compared with your other subjects.`,
    });
  }

  if (insights.length === 0) {
    insights.push({
      type: 'info',
      message: 'Keep studying consistently to unlock more analytics insights.',
    });
  }

  return insights;
};
