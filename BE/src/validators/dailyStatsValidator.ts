export const parseSleepHours = (value: unknown) => {
  const parsed = Number(value);

  if (
    value === undefined ||
    value === null ||
    Number.isNaN(parsed) ||
    parsed < 0 ||
    parsed > 24
  ) {
    return null;
  }

  return parsed;
};
