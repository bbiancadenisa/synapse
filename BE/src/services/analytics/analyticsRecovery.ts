import type { RecoveryAnalytics, WellnessTrend } from './analyticsTypes';

type Params = {
  totalStudyMinutes: number;
  totalBreakMinutes: number;
  wellnessTrends: WellnessTrend[];
};

const calculateBreakEfficiency = (
  totalStudyMinutes: number,
  totalBreakMinutes: number,
) => {
  if (totalStudyMinutes <= 0) return 0;

  return Math.round((totalBreakMinutes / totalStudyMinutes) * 100);
};

const calculateRecoveryRate = (
  latestWellness: WellnessTrend | undefined,
): RecoveryAnalytics['recoveryRate'] => {
  if (!latestWellness) return 'moderate';

  if (latestWellness.energy >= 70 && latestWellness.stress <= 40) {
    return 'good';
  }

  if (latestWellness.energy < 50 || latestWellness.stress >= 70) {
    return 'low';
  }

  return 'moderate';
};

const calculateStressRecovery = (
  wellnessTrends: WellnessTrend[],
): RecoveryAnalytics['stressRecovery'] => {
  if (wellnessTrends.length < 2) {
    return 'stable';
  }

  const first = wellnessTrends[0];
  const latest = wellnessTrends[wellnessTrends.length - 1];

  if (latest.stress <= first.stress || latest.stress <= 40) {
    return 'stable';
  }

  return 'needs_attention';
};

const buildSleepImpactMessage = (wellnessTrends: WellnessTrend[]) => {
  if (wellnessTrends.length === 0) {
    return 'Add sleep hours to unlock sleep impact analytics.';
  }

  return 'Sleep and daily energy are being tracked through LifeStats.';
};

export const calculateRecoveryAnalytics = ({
  totalStudyMinutes,
  totalBreakMinutes,
  wellnessTrends,
}: Params): RecoveryAnalytics => {
  const latestWellness = wellnessTrends[wellnessTrends.length - 1];

  return {
    breakEfficiency: calculateBreakEfficiency(
      totalStudyMinutes,
      totalBreakMinutes,
    ),
    recoveryRate: calculateRecoveryRate(latestWellness),
    sleepImpact: buildSleepImpactMessage(wellnessTrends),
    stressRecovery: calculateStressRecovery(wellnessTrends),
  };
};
