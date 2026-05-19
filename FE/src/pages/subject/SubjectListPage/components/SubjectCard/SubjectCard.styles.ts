import type { Subject } from '../../../../../types/subjectTypes';

export const ACCENT_COLOR = '#6C63FF';

export const cardSx = {
  height: 220,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 3,
  overflow: 'hidden',
  border: '1px solid #e5e7eb',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
  background: '#ffffff',
  cursor: 'pointer',
  transition:
    'transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    borderColor: '#c4b5fd',
    boxShadow: '0 18px 45px rgba(108, 99, 255, 0.14)',
  },
};

export const accentSx = (color?: string) => ({
  height: 8,
  width: '100%',
  background: color || ACCENT_COLOR,
});

export const contentSx = {
  flex: 1,
  p: 2.25,
};

export const titleSx = {
  fontSize: 17,
  fontWeight: 700,
  lineHeight: 1.35,
  color: '#111827',
  letterSpacing: '-0.02em',
};

export const descriptionSx = {
  fontSize: 14,
  lineHeight: 1.6,
  color: '#64748b',
};

export const footerSx = {
  mt: 'auto',
  pt: 2,
};

export const deleteButtonSx = {
  color: '#94a3b8',
  transition: 'color 0.18s ease, background-color 0.18s ease',
  '&:hover': {
    color: '#dc2626',
    background: '#fef2f2',
  },
};

export const getDifficultyChipSx = (difficulty: Subject['difficulty']) => {
  const colors = {
    low: {
      background: '#ecfdf5',
      color: '#047857',
    },
    medium: {
      background: '#fffbeb',
      color: '#b45309',
    },
    high: {
      background: '#fef2f2',
      color: '#b91c1c',
    },
  };

  return {
    height: 25,
    borderRadius: 2,
    px: 0.75,
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'capitalize',
    ...colors[difficulty],
  };
};
