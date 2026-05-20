import {
  calculateEnergyFromSleep,
  clamp,
  getBurnoutRisk,
  getHealthMessage,
} from './dailyStatsHelpers';

type CalculateInput = {
  sleepHours: number | null;
  totalStudyMinutes: number;
  totalBreakMinutes: number;
  upcomingDeadlines: number;
  inProgressCount: number;
  breakPenaltyPoints: number;
};

export const calculateDailyStats = ({
  sleepHours,
  totalStudyMinutes,
  totalBreakMinutes,
  upcomingDeadlines,
  inProgressCount,
  breakPenaltyPoints,
}: CalculateInput) => {
  // INITIAL VALUES AT THE BEGINNING OF THE DAY
  let energy = calculateEnergyFromSleep(sleepHours);
  let focus = 100;
  let stress = 0;

  // IMPACT ON ENERGY AND FOCUS BASED ON HOW MANY HOURS YOU ALREADY STUDIED
  const studiedHours = Math.floor(totalStudyMinutes / 60);
  energy -= studiedHours * 10;
  focus -= studiedHours * 10;

  // IMPACT ON STRESS AND FOCUS BASED ON HOW MANY UPCOMING DEADLINES YOU HAVE
  if (upcomingDeadlines > 3) stress += 20;
  if (upcomingDeadlines > 5) stress += 10;

  // IMPACT ON FOCUS BASED ON HOW MANY TASKS YOU HAVE IN PROGRESS AT  THE SAME TIME
  if (inProgressCount > 3) focus -= 15;
  if (inProgressCount > 5) focus -= 25;

  // RESTORE FOCUS AND ENERGY BASED ON THE RATIO BETWEEN BREAKS AND STUDY TIME
  const breakRatio =
    totalStudyMinutes > 0 ? totalBreakMinutes / totalStudyMinutes : 0;

  if (breakRatio >= 0.5) {
    energy += 15;
    focus += 8;
  } else if (breakRatio >= 0.45) {
    energy += 10;
    focus += 6;
  } else if (breakRatio >= 0.35) {
    energy += 5;
    focus += 2;
  }

  // IMPACT ON ALL STATS BASED ON PENALTIES
  energy -= breakPenaltyPoints;
  focus -= breakPenaltyPoints;
  stress += breakPenaltyPoints;

  // AVOID VALUES GOING > 100 AND <0
  energy = clamp(energy);
  focus = clamp(focus);
  stress = clamp(stress);

  //  study time contributes positively
  // focus contributes positively
  // stress contributes negatively
  let productivityScore = 0;

  if (totalStudyMinutes >= 10) {
    const studyScore = clamp(Math.round((totalStudyMinutes / 180) * 100));

    const breakRatio =
      totalStudyMinutes > 0 ? totalBreakMinutes / totalStudyMinutes : 0;

    const breakScore =
      breakRatio >= 0.15 && breakRatio <= 0.4
        ? 100
        : breakRatio > 0 && breakRatio < 0.15
          ? 60
          : breakRatio > 0.4
            ? 75
            : 40;

    productivityScore = clamp(
      Math.round(
        studyScore * 0.35 +
          focus * 0.3 +
          (100 - stress) * 0.25 +
          breakScore * 0.1,
      ),
    );
  }

  // HEALTH POINTS CALCULATED, ENERGY IS 35% FOCUS 35% AND 100- STRESS
  const healthPoints = clamp(
    Math.round(energy * 0.25 + focus * 0.25 + (100 - stress) * 0.5),
  );

  return {
    energy,
    focus,
    stress,
    productivityScore,
    healthPoints,
    healthMessage: getHealthMessage(healthPoints),
    burnoutRisk: getBurnoutRisk(healthPoints),
  };
};
