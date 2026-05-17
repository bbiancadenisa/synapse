export const cardSx = {
  p: 2,
  borderRadius: 2,
  border: '1px solid #e5e7eb',
  background: '#ffffff',
};

export const labelSx = {
  fontSize: 14,
  color: '#64748b',
};

export const valueSx = {
  mt: 1,
  fontSize: 28,
  fontWeight: 600,
  color: '#111827',
  letterSpacing: '-0.03em',
};

export const progressSx = (color: string) => ({
  mt: 1.5,
  height: 8,
  borderRadius: 999,
  background: '#e5e7eb',
  '& .MuiLinearProgress-bar': {
    borderRadius: 999,
    background: color,
  },
});
