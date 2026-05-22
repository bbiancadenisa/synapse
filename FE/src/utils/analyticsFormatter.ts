export const formatChartDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
};

export const formatChartHour = (value: number | string) => {
  const hour = Number(value);

  if (Number.isNaN(hour)) return String(value);

  return `${String(hour).padStart(2, '0')}:00`;
};

export const formatMinutes = (minutes: number) => {
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.round((minutes / 60) * 10) / 10;
  return `${hours}h`;
};
