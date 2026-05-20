export const cardSx = {
  p: 2.5,
  borderRadius: 4,
  border: '1px solid rgba(108, 99, 255, 0.1)',
  background: '#ffffff',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.045)',
  transition: 'all 0.2s ease',

  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 16px 38px rgba(108, 99, 255, 0.1)',
    borderColor: 'rgba(108, 99, 255, 0.22)',
  },
};

export const labelSx = {
  fontSize: 14,
  fontWeight: 700,
  color: '#64748b',
  letterSpacing: '-0.01em',
};

export const valueSx = {
  mt: 1.25,
  fontSize: 34,
  fontWeight: 700,
  color: '#111827',
  letterSpacing: '-0.05em',
};

export const infoButtonSx = {
  color: '#6C63FF',
  p: 0.4,

  '&:hover': {
    background: 'rgba(108, 99, 255, 0.08)',
  },
};

export const progressSx = (color: string) => ({
  mt: 1.75,
  height: 9,
  borderRadius: 999,
  background: 'rgba(108, 99, 255, 0.1)',

  '& .MuiLinearProgress-bar': {
    borderRadius: 999,
    background: color,
  },
});

export const tooltipTitleSx = {
  fontSize: 13,
  fontWeight: 700,
  mb: 0.75,
};

export const tooltipTextSx = {
  fontSize: 12,
  lineHeight: 1.6,
  mt: 0.75,
};
