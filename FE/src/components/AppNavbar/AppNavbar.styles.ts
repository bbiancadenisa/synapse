export const ACCENT_COLOR = '#6C63FF';

export const appBarSx = {
  background: 'rgba(255, 255, 255, 0.88)',
  color: '#111827',
  borderBottom: '1px solid #e5e7eb',
  boxShadow: 'none',
  backdropFilter: 'blur(14px)',
};

export const toolbarSx = {
  minHeight: '68px !important',
};

export const brandWrapperSx = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

export const logoSx = {
  width: 80,
  height: 80,
};

export const brandSx = {
  fontSize: 20,
  fontWeight: 600,
  letterSpacing: '-0.04em',
  color: '#111827',
};

export const navStackSx = {
  ml: 5,
};

export const navButtonSx = {
  px: 1.75,
  py: 0.85,
  borderRadius: 2,
  textTransform: 'none',
  fontWeight: 600,
  fontSize: 14,
  color: '#64748b',
  '&:hover': {
    background: '#f8fafc',
    color: '#111827',
  },
};

export const activeNavButtonSx = {
  ...navButtonSx,
  color: ACCENT_COLOR,
  background: 'rgba(108, 99, 255, 0.1)',
  '&:hover': {
    background: 'rgba(108, 99, 255, 0.14)',
    color: ACCENT_COLOR,
  },
};

export const userEmailSx = {
  fontSize: 14,
  color: '#64748b',
  maxWidth: 220,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export const logoutButtonSx = {
  px: 1.75,
  py: 0.85,
  borderRadius: 2,
  textTransform: 'none',
  fontWeight: 600,
  color: '#dc2626',
  '&:hover': {
    background: '#fef2f2',
  },
};
