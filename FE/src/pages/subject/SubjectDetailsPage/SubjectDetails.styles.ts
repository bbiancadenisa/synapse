import type { Subject } from '../../../types/subjectTypes';

export const ACCENT_COLOR = '#6C63FF';

export const pageSx = {
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #f8fafc 0%, #f5f3ff 100%)',
  py: 5,
};

export const loadingTextSx = {
  color: '#64748b',
};

export const cardSx = {
  borderRadius: 3,
  border: '1px solid #e5e7eb',
  background: 'rgba(255, 255, 255, 0.92)',
  boxShadow: '0 14px 40px rgba(15, 23, 42, 0.05)',
};

export const headerCardSx = {
  ...cardSx,
  overflow: 'hidden',
};

export const subjectAccentSx = (color?: string) => ({
  height: 9,
  background: color || ACCENT_COLOR,
});

export const subjectContentSx = {
  p: { xs: 2.5, md: 3.25 },
};

export const titleSx = {
  fontWeight: 700,
  letterSpacing: '-0.04em',
  color: '#111827',
};

export const chipBaseSx = {
  height: 28,
  borderRadius: 2,
  fontSize: 12,
  fontWeight: 600,
  textTransform: 'capitalize',
};

export const getDifficultyChipSx = (difficulty: Subject['difficulty']) => {
  const colors = {
    low: {
      background: '#ecfdf5',
      color: '#047857',
      border: '1px solid #a7f3d0',
    },
    medium: {
      background: '#fff7ed',
      color: '#c2410c',
      border: '1px solid #fed7aa',
    },
    high: {
      background: '#fef2f2',
      color: '#b91c1c',
      border: '1px solid #fecaca',
    },
  };

  return {
    ...chipBaseSx,
    ...colors[difficulty],
  };
};

export const deadlineChipSx = {
  ...chipBaseSx,
  background: 'rgba(108, 99, 255, 0.1)',
  color: ACCENT_COLOR,
  border: '1px solid rgba(108, 99, 255, 0.22)',
};

export const tasksCountChipSx = {
  ...chipBaseSx,
  background: '#ecfdf5',
  color: '#047857',
  border: '1px solid #a7f3d0',
};

export const outlinedButtonSx = {
  borderRadius: 2,
  px: 2,
  py: 0.85,
  textTransform: 'none',
  fontWeight: 600,
  borderColor: '#d8b4fe',
  color: ACCENT_COLOR,
  '&:hover': {
    borderColor: ACCENT_COLOR,
    background: 'rgba(108, 99, 255, 0.08)',
  },
};

export const primaryButtonSx = {
  borderRadius: 2,
  px: 2.5,
  py: 1,
  textTransform: 'none',
  fontWeight: 600,
  background: ACCENT_COLOR,
  boxShadow: 'none',
  '&:hover': {
    background: '#5b52e8',
    boxShadow: 'none',
  },
};

export const filterCardSx = {
  p: 2,
  ...cardSx,
};

export const mutedTextSx = {
  fontSize: 14,
  color: '#64748b',
  fontWeight: 500,
};

export const selectSx = {
  borderRadius: 2,
  fontSize: 14,
  background: '#ffffff',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e5e7eb',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#c4b5fd',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: ACCENT_COLOR,
  },
};

export const tasksCardSx = {
  p: 2.25,
  ...cardSx,
};

export const sectionTitleSx = {
  fontSize: 21,
  fontWeight: 700,
  color: '#111827',
  letterSpacing: '-0.03em',
};

export const sectionSubtitleSx = {
  mt: 0.5,
  fontSize: 14,
  color: '#64748b',
  lineHeight: 1.6,
};

export const emptyTasksSx = {
  p: 4.5,
  borderRadius: 3,
  border: '1px dashed #c4b5fd',
  textAlign: 'center',
  background: 'rgba(108, 99, 255, 0.035)',
};

export const emptyTitleSx = {
  fontSize: 17,
  fontWeight: 700,
  color: '#111827',
};

export const emptySubtitleSx = {
  mt: 0.75,
  color: '#64748b',
  fontSize: 14,
  lineHeight: 1.6,
};
