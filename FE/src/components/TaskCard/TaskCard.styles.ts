import type { TaskCardStatus } from '../../types/taskCardTypes';

export const accordionSx = {
  border: '1px solid #e5e7eb',
  borderRadius: '8px !important',
  background: '#ffffff',
  overflow: 'hidden',
  '&:before': {
    display: 'none',
  },
  '&:hover': {
    borderColor: '#c7d2fe',
    boxShadow: '0 10px 28px rgba(15, 23, 42, 0.06)',
  },
};

export const accordionSummarySx = {
  px: 2,
  py: 0.5,
  '& .MuiAccordionSummary-content': {
    my: 1.25,
  },
};

export const taskTitleSx = {
  fontSize: 15,
  fontWeight: 600,
  color: '#111827',
  lineHeight: 1.35,
};

export const metaTextSx = {
  fontSize: 13,
  color: '#64748b',
};

export const progressSx = (progress: number) => ({
  flex: 1,
  height: 7,
  borderRadius: 999,
  background: '#e5e7eb',
  '& .MuiLinearProgress-bar': {
    borderRadius: 999,
    background: progress >= 100 ? '#10b981' : '#4f46e5',
  },
});

export const progressTextSx = {
  width: 42,
  textAlign: 'right',
  fontSize: 12,
  color: '#64748b',
};

export const editButtonSx = {
  color: '#64748b',
  '&:hover': {
    background: '#f1f5f9',
    color: '#334155',
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
  px: 2,
  pt: 0,
  pb: 2,
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
  fontWeight: 500,
  boxShadow: 'none',
  background: isDone ? '#cbd5e1' : '#4f46e5',
  '&:hover': {
    background: isDone ? '#cbd5e1' : '#4338ca',
    boxShadow: 'none',
  },
});

export const sessionsTitleSx = {
  fontSize: 14,
  fontWeight: 600,
  color: '#111827',
  mb: 1.5,
};

export const emptySessionsSx = {
  border: '1px dashed #cbd5e1',
  borderRadius: 2,
  p: 2,
  background: '#f8fafc',
};

export const getStatusChipSx = (status: TaskCardStatus) => {
  const styles = {
    done: {
      background: '#ecfdf5',
      color: '#047857',
    },
    in_progress: {
      background: '#eef2ff',
      color: '#4f46e5',
    },
    todo: {
      background: '#f1f5f9',
      color: '#475569',
    },
  };

  return {
    height: 24,
    borderRadius: 1.5,
    fontSize: 12,
    fontWeight: 500,
    ...styles[status],
  };
};
