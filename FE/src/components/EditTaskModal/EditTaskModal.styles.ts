export const dialogPaperSx = {
  borderRadius: 2,
  border: '1px solid #e5e7eb',
  boxShadow: '0 24px 60px rgba(15, 23, 42, 0.16)',
};

export const titleSx = {
  fontSize: 22,
  fontWeight: 600,
  color: '#111827',
  letterSpacing: '-0.02em',
};

export const subtitleSx = {
  mt: 0.5,
  fontSize: 14,
  color: '#64748b',
};

export const helperTextSx = {
  fontSize: 13,
  color: '#64748b',
};

export const cancelButtonSx = {
  borderRadius: 2,
  textTransform: 'none',
  color: '#64748b',
};

export const saveButtonSx = (isFormValid: boolean, isDirty: boolean) => ({
  borderRadius: 2,
  textTransform: 'none',
  fontWeight: 500,
  background: isFormValid && isDirty ? '#5b52e8' : '#cbd5e1',
  boxShadow: 'none',
  '&:hover': {
    background: isFormValid ? '#4338ca' : '#cbd5e1',
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    color: '#ffffff',
    background: '#cbd5e1',
  },
});
