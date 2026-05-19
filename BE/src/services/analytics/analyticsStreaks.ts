const normalizeDate = (date: string | Date) => {
  return new Date(date).toISOString().slice(0, 10);
};

export const calculateCurrentStreak = (dates: Array<string | Date>) => {
  if (dates.length === 0) return 0;

  const dateSet = new Set(dates.map(normalizeDate));

  let streak = 0;
  const cursor = new Date();

  while (true) {
    const key = normalizeDate(cursor);

    if (!dateSet.has(key)) break;

    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

export const calculateLongestStreak = (dates: Array<string | Date>) => {
  if (dates.length === 0) return 0;

  const normalizedDates = [...new Set(dates.map(normalizeDate))].sort();

  let longest = 1;
  let current = 1;

  for (let i = 1; i < normalizedDates.length; i++) {
    const previous = new Date(normalizedDates[i - 1]);
    const currentDate = new Date(normalizedDates[i]);

    previous.setDate(previous.getDate() + 1);

    if (normalizeDate(previous) === normalizeDate(currentDate)) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
};

export const calculateStreaks = (dates: Array<string | Date>) => {
  return {
    currentStreak: calculateCurrentStreak(dates),
    longestStreak: calculateLongestStreak(dates),
  };
};
