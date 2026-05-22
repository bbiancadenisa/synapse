import type { TaskCardStatus } from '../../types/taskCardTypes';

export const ACCENT_COLOR = '#6C63FF';

export const accordionSx = {
  border: '1px solid #e5e7eb',
  borderRadius: '12px !important',
  background: '#ffffff',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
  '&:before': {
    display: 'none',
  },
  '&:hover': {
    borderColor: '#c4b5fd',
    boxShadow: '0 18px 45px rgba(108, 99, 255, 0.12)',
  },
};

export const accordionSummarySx = {
  px: 2.25,
  py: 0.5,
  '& .MuiAccordionSummary-content': {
    my: 1.25,
  },
};

export const taskTitleSx = {
  fontSize: 15.5,
  fontWeight: 700,
  color: '#111827',
  lineHeight: 1.35,
  letterSpacing: '-0.01em',
};

export const metaTextSx = {
  fontSize: 13,
  color: '#64748b',
};

export const progressSx = (progress: number) => ({
  flex: 1,
  height: 8,
  borderRadius: 999,
  background: 'rgba(108, 99, 255, 0.12)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 999,
    background:
      progress >= 100
        ? '#10b981'
        : 'linear-gradient(90deg, #6C63FF 0%, #A78BFA 100%)',
  },
});

export const progressTextSx = {
  width: 42,
  textAlign: 'right',
  fontSize: 12,
  fontWeight: 600,
  color: '#64748b',
};

export const editButtonSx = {
  color: '#64748b',
  '&:hover': {
    background: 'rgba(108, 99, 255, 0.08)',
    color: ACCENT_COLOR,
  },
};

export const deleteButtonSx = {
  color: '#94a3b8',
  '&:hover': {
    background: '#fef2f2',
    color: '#dc2626',
  },
};

export const accordionDetailsSx = {
  px: 2.25,
  pt: 0,
  pb: 2.25,
  borderTop: '1px solid #f1f5f9',
};

export const descriptionSx = {
  fontSize: 14,
  color: '#64748b',
  lineHeight: 1.6,
  mb: 2,
};

export const createSessionButtonSx = (isDone: boolean) => ({
  borderRadius: 2,
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: 'none',
  background: isDone ? '#cbd5e1' : ACCENT_COLOR,
  '&:hover': {
    background: isDone ? '#cbd5e1' : '#5b52e8',
    boxShadow: 'none',
  },
});

export const sessionsTitleSx = {
  fontSize: 14,
  fontWeight: 700,
  color: '#111827',
  mb: 1.5,
};

export const emptySessionsSx = {
  border: '1px dashed #c4b5fd',
  borderRadius: 2,
  p: 2,
  background: 'rgba(108, 99, 255, 0.035)',
};

export const getStatusChipSx = (status: TaskCardStatus) => {
  const styles = {
    done: {
      background: '#ecfdf5',
      color: '#047857',
      border: '1px solid #a7f3d0',
    },
    in_progress: {
      background: 'rgba(108, 99, 255, 0.1)',
      color: ACCENT_COLOR,
      border: '1px solid rgba(108, 99, 255, 0.22)',
    },
    todo: {
      background: '#f1f5f9',
      color: '#475569',
      border: '1px solid #e2e8f0',
    },
  };

  return {
    height: 25,
    borderRadius: 2,
    fontSize: 12,
    fontWeight: 600,
    ...styles[status],
  };
};

export const getPriorityChipSx = (priority: 'low' | 'medium' | 'high') => {
  const styles = {
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
    height: 25,
    borderRadius: 2,
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'capitalize',
    ...styles[priority],
  };
};

export const deadlineChipSx = {
  height: 25,
  borderRadius: 2,
  fontSize: 12,
  fontWeight: 600,
  background: 'rgba(108, 99, 255, 0.1)',
  color: '#6C63FF',
  border: '1px solid rgba(108, 99, 255, 0.22)',
};
