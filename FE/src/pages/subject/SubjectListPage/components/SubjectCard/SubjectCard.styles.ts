import type { Subject } from '../../types/subjectTypes';

export const cardSx = {
  height: 210,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 2,
  overflow: 'hidden',
  border: '1px solid #e5e7eb',
  boxShadow: 'none',
  background: '#ffffff',
  cursor: 'pointer',
  transition:
    'transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: '#c7d2fe',
    boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)',
  },
};

export const accentSx = (color?: string) => ({
  height: 8,
  width: '100%',
  background: color || '#4f46e5',
});

export const contentSx = {
  flex: 1,
  p: 2,
};

export const titleSx = {
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1.35,
  color: '#111827',
  letterSpacing: '-0.01em',
};

export const descriptionSx = {
  fontSize: 14,
  lineHeight: 1.55,
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
    height: 24,
    borderRadius: 1.5,
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'capitalize',
    ...colors[difficulty],
  };
};
