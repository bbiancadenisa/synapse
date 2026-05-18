export const appBarSx = {
  background: '#ffffff',
  color: '#111827',
  borderBottom: '1px solid #e5e7eb',
  boxShadow: 'none',
};

export const brandSx = {
  fontSize: 18,
  fontWeight: 600,
  letterSpacing: '-0.02em',
  color: '#111827',
};

export const navButtonSx = {
  textTransform: 'none',
  fontWeight: 500,
  color: '#475569',
  '&:hover': {
    background: '#f8fafc',
    color: '#111827',
  },
};

export const activeNavButtonSx = {
  ...navButtonSx,
  color: '#4f46e5',
  background: '#eef2ff',
};

export const logoutButtonSx = {
  borderRadius: 2,
  textTransform: 'none',
  fontWeight: 500,
  color: '#dc2626',
  '&:hover': {
    background: '#fef2f2',
  },
};
