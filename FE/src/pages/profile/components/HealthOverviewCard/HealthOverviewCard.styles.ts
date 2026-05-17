export const cardSx = {
  p: 3,
  borderRadius: 2,
  border: '1px solid #e5e7eb',
  background: '#ffffff',
};

export const titleSx = {
  fontSize: 20,
  fontWeight: 600,
  color: '#111827',
  letterSpacing: '-0.02em',
};

export const messageSx = {
  mt: 0.75,
  fontSize: 14,
  color: '#64748b',
};

export const healthValueSx = {
  fontSize: 36,
  fontWeight: 600,
  color: '#111827',
  letterSpacing: '-0.04em',
};

export const riskChipSx = (riskStyle: { bg: string; color: string }) => ({
  borderRadius: 1.5,
  textTransform: 'capitalize',
  background: riskStyle.bg,
  color: riskStyle.color,
});

export const healthProgressSx = (healthPoints: number) => ({
  mt: 2.5,
  height: 10,
  borderRadius: 999,
  background: '#e5e7eb',
  '& .MuiLinearProgress-bar': {
    borderRadius: 999,
    background:
      healthPoints < 50 ? '#dc2626' : healthPoints < 70 ? '#f59e0b' : '#10b981',
  },
});
