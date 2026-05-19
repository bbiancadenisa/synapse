export const ACCENT_COLOR = '#6C63FF';

export const pageSx = {
  height: '100vh',
  maxHeight: '100vh',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f5f3ff 100%)',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
};

export const shellSx = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    md: '0.95fr 1.05fr',
  },
  width: '100%',
  maxHeight: 'calc(100vh - 48px)',
  borderRadius: 5,
  overflow: 'hidden',
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  boxShadow: '0 30px 80px rgba(15, 23, 42, 0.14)',
};

export const formPanelSx = {
  display: 'flex',
  alignItems: 'center',
  px: {
    xs: 3,
    sm: 5,
    md: 6,
  },
  py: {
    xs: 2.5,
    md: 4,
  },
};

export const illustrationPanelSx = {
  display: {
    xs: 'none',
    md: 'flex',
  },
  alignItems: 'center',
  justifyContent: 'center',
  background:
    'linear-gradient(135deg, rgba(108, 99, 255, 0.16), rgba(167, 139, 250, 0.22))',
  p: 5,
};

export const illustrationSx = {
  width: '100%',
  maxWidth: 520,
};

export const titleSx = {
  fontSize: 34,
  fontWeight: 700,
  color: '#111827',
  letterSpacing: '-0.05em',
};

export const subtitleSx = {
  mt: 1,
  color: '#64748b',
  fontSize: 16,
  lineHeight: 1.6,
  maxWidth: 420,
};

export const primaryButtonSx = {
  borderRadius: 2,
  py: 1,
  textTransform: 'none',
  fontWeight: 600,
  background: ACCENT_COLOR,
  boxShadow: 'none',
  '&:hover': {
    background: '#5b52e8',
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    background: '#c7d2fe',
    color: '#ffffff',
  },
};

export const secondaryTextSx = {
  fontSize: 14,
  color: '#64748b',
  textAlign: 'center',
};

export const linkSx = {
  color: ACCENT_COLOR,
  fontWeight: 600,
};
