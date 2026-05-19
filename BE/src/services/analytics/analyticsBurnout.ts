import type { BurnoutRisk } from './analyticsTypes';

type BurnoutInput = {
  latestStress: number;
  latestEnergy: number;
  latestFocus: number;
  ignoredBreaks: number;
  penalties: number;
  averageSessionMinutes: number;
  studiedDays: number;
  range: number;
};

type BurnoutResult = {
  risk: BurnoutRisk;
  score: number;
  mainFactor: string;
  factors: string[];
};

export const calculateBurnoutRisk = ({
  latestStress,
  latestEnergy,
  latestFocus,
  ignoredBreaks,
  penalties,
  averageSessionMinutes,
  studiedDays,
  range,
}: BurnoutInput): BurnoutResult => {
  let score = 0;
  const factors: string[] = [];

  if (latestStress >= 70) {
    score += 25;
    factors.push('High stress level');
  }

  if (latestEnergy <= 45) {
    score += 20;
    factors.push('Low energy');
  }

  if (latestFocus <= 50) {
    score += 15;
    factors.push('Low focus');
  }

  if (ignoredBreaks >= 5) {
    score += 20;
    factors.push('Too many ignored breaks');
  }

  if (penalties > 0) {
    score += 20;
    factors.push('Penalty mode was triggered');
  }

  if (averageSessionMinutes >= 90) {
    score += 15;
    factors.push('Long sessions without enough recovery');
  }

  if (studiedDays >= Math.min(range, 6)) {
    score += 10;
    factors.push('Intense study streak');
  }

  if (score >= 70) {
    return {
      risk: 'high',
      score,
      mainFactor: factors[0] || 'High workload',
      factors,
    };
  }

  if (score >= 40) {
    return {
      risk: 'medium',
      score,
      mainFactor: factors[0] || 'Moderate workload',
      factors,
    };
  }

  return {
    risk: 'low',
    score,
    mainFactor: factors[0] || 'Balanced study rhythm',
    factors,
  };
};
