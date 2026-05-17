export const pageSx = {
  minHeight: '100vh',
  background: '#f8fafc',
  py: 5,
};

export const loadingTextSx = {
  color: '#64748b',
};

export const cardSx = {
  borderRadius: 2,
  border: '1px solid #e5e7eb',
  background: '#ffffff',
};

export const headerCardSx = {
  ...cardSx,
  overflow: 'hidden',
};

export const subjectAccentSx = (color?: string) => ({
  height: 8,
  background: color || '#4f46e5',
});

export const subjectContentSx = {
  p: { xs: 2.5, md: 3 },
};

export const titleSx = {
  fontWeight: 600,
  letterSpacing: '-0.03em',
  color: '#111827',
};

export const chipBaseSx = {
  borderRadius: 1.5,
};

export const difficultyChipSx = {
  ...chipBaseSx,
  textTransform: 'capitalize',
  background: '#f1f5f9',
  color: '#475569',
};

export const deadlineChipSx = {
  ...chipBaseSx,
  background: '#eef2ff',
  color: '#4f46e5',
};

export const tasksCountChipSx = {
  ...chipBaseSx,
  background: '#ecfdf5',
  color: '#047857',
};

export const outlinedButtonSx = {
  borderRadius: 2,
  textTransform: 'none',
  fontWeight: 500,
  borderColor: '#cbd5e1',
  color: '#334155',
  '&:hover': {
    borderColor: '#94a3b8',
    background: '#f8fafc',
  },
};

export const primaryButtonSx = {
  borderRadius: 2,
  px: 2.5,
  py: 1,
  textTransform: 'none',
  fontWeight: 500,
  background: '#4f46e5',
  boxShadow: 'none',
  '&:hover': {
    background: '#4338ca',
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
};

export const selectSx = {
  borderRadius: 2,
  fontSize: 14,
};

export const tasksCardSx = {
  p: 2,
  ...cardSx,
};

export const sectionTitleSx = {
  fontSize: 20,
  fontWeight: 600,
  color: '#111827',
  letterSpacing: '-0.02em',
};

export const sectionSubtitleSx = {
  mt: 0.5,
  fontSize: 14,
  color: '#64748b',
};

export const emptyTasksSx = {
  p: 4,
  borderRadius: 2,
  border: '1px dashed #cbd5e1',
  textAlign: 'center',
  background: '#f8fafc',
};

export const emptyTitleSx = {
  fontSize: 16,
  fontWeight: 500,
};

export const emptySubtitleSx = {
  mt: 0.75,
  color: '#64748b',
  fontSize: 14,
};
