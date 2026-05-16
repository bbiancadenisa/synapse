export const clamp = (value: number) => Math.max(0, Math.min(100, value));

export const getToday = () => new Date().toISOString().slice(0, 10);

export const calculateEnergyFromSleep = (sleepHours: number | null) => {
  // SET SPECIFIC ENERGY LEVEL BASED ON HOURS OF SLEEP
  if (sleepHours === null || sleepHours === undefined) return 100;
  if (sleepHours >= 8) return 100;
  if (sleepHours >= 7) return 80;
  if (sleepHours >= 6) return 60;
  if (sleepHours >= 5) return 50;
  return 35;
};

// SPECIFIC HEALTH MESSAGES BASED ON HEALTH POINTS
export const getHealthMessage = (healthPoints: number) => {
  if (healthPoints < 50) {
    return 'Burnout risk detected. You should slow down and recover.';
  }
  if (healthPoints < 60) {
    return 'Your brain needs recovery time. Consider reducing workload today.';
  }
  if (healthPoints < 70) {
    return 'Take it a bit easier today. You are pushing your limits.';
  }
  if (healthPoints < 80) {
    return 'You are doing okay. Keep a balanced pace.';
  }
  return 'You are doing great. Way to go.';
};

// BURNOUT RISK BASED ON TOTAL HEALTH POINTS
export const getBurnoutRisk = (healthPoints: number) => {
  if (healthPoints < 45) return 'high';
  if (healthPoints < 60) return 'medium';
  if (healthPoints < 75) return 'low';
  return 'low';
};
