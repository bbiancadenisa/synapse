export const formatDeadline = (date?: string) => {
  if (!date) return 'No deadline';

  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
