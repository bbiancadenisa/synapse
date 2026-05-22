export const cardSx = {
  p: 3,
  borderRadius: 4,
  border: '1px solid rgba(108, 99, 255, 0.12)',
  background: 'linear-gradient(135deg, rgba(108,99,255,0.05) 0%, #ffffff 55%)',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
  transition: 'all 0.2s ease',

  '&:hover': {
    boxShadow: '0 14px 36px rgba(15, 23, 42, 0.08)',
  },
};

export const titleSx = {
  fontSize: 20,
  fontWeight: 700,
  color: '#111827',
  letterSpacing: '-0.03em',
};

export const messageSx = {
  mt: 1,
  fontSize: 14,
  color: '#64748b',
  maxWidth: 560,
  lineHeight: 1.7,
};

export const healthValueSx = {
  fontSize: 42,
  fontWeight: 700,
  color: '#6C63FF',
  letterSpacing: '-0.05em',
};

export const riskChipSx = (riskStyle: { bg: string; color: string }) => ({
  borderRadius: 999,
  px: 0.5,
  fontWeight: 600,
  textTransform: 'capitalize',
  background: riskStyle.bg,
  color: riskStyle.color,
  border: `1px solid ${riskStyle.color}22`,
});

export const healthProgressSx = (healthPoints: number) => ({
  mt: 3,
  height: 12,
  borderRadius: 999,
  background: '#ede9fe',

  '& .MuiLinearProgress-bar': {
    borderRadius: 999,
    background:
      healthPoints < 50 ? '#ef4444' : healthPoints < 70 ? '#f59e0b' : '#6C63FF',
  },
});
