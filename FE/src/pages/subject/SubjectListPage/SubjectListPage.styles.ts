export const ACCENT_COLOR = '#6C63FF';

export const pageSx = {
  minHeight: '100vh',
  py: 5,
  background: 'linear-gradient(180deg, #f8fafc 0%, #f5f3ff 100%)',
};

export const titleSx = {
  fontWeight: 700,
  letterSpacing: '-0.04em',
  color: '#111827',
};

export const subtitleSx = {
  mt: 0.75,
  color: '#64748b',
  fontSize: 15,
  maxWidth: 560,
  lineHeight: 1.6,
};

export const primaryButtonSx = {
  borderRadius: 2,
  px: 2.75,
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

export const toolbarSx = {
  p: 2,
  borderRadius: 3,
  border: '1px solid #e5e7eb',
  background: 'rgba(255, 255, 255, 0.88)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 12px 36px rgba(15, 23, 42, 0.04)',
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

export const emptyStateSx = {
  p: 6,
  borderRadius: 3,
  border: '1px solid #e5e7eb',
  background: '#ffffff',
  textAlign: 'center',
  boxShadow: '0 18px 50px rgba(15, 23, 42, 0.06)',
};

export const emptyTitleSx = {
  fontSize: 22,
  fontWeight: 700,
  color: '#111827',
  letterSpacing: '-0.03em',
};

export const emptySubtitleSx = {
  mt: 1,
  mb: 3,
  color: '#64748b',
  fontSize: 15,
  lineHeight: 1.6,
};

export const snackbarAlertSx = {
  width: '100%',
  borderRadius: 2,
};
