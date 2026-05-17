export const sessionCardSx = {
  border: '1px solid #e5e7eb',
  borderRadius: 2,
  p: 1.5,
  background: '#ffffff',
};

export const sessionTitleSx = {
  fontSize: 14,
  fontWeight: 500,
  color: '#111827',
};

export const sessionMetaSx = {
  fontSize: 13,
  color: '#64748b',
};

export const progressSx = {
  flex: 1,
  height: 8,
  borderRadius: 999,
  background: '#e5e7eb',
  '& .MuiLinearProgress-bar': {
    borderRadius: 999,
    background: '#4f46e5',
  },
};

export const progressTextSx = {
  width: 42,
  textAlign: 'right',
  fontSize: 13,
  color: '#64748b',
};

export const getSessionStatusChipSx = (status: string) => {
  if (status === 'completed') {
    return {
      height: 24,
      borderRadius: 1.5,
      fontSize: 12,
      background: '#ecfdf5',
      color: '#047857',
    };
  }

  if (status === 'timed_out') {
    return {
      height: 24,
      borderRadius: 1.5,
      fontSize: 12,
      background: '#fef2f2',
      color: '#dc2626',
    };
  }

  return {
    height: 24,
    borderRadius: 1.5,
    fontSize: 12,
    background: '#eef2ff',
    color: '#4f46e5',
  };
};
