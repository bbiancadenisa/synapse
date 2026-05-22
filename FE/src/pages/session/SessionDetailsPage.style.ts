export const ACCENT_COLOR = '#6C63FF';

export const pageSx = {
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #f8fafc 0%, #f5f3ff 100%)',
  py: 5,
};

export const titleSx = {
  fontWeight: 800,
  color: '#111827',
  letterSpacing: '-0.05em',
};

export const subtitleSx = {
  mt: 0.75,
  color: '#64748b',
  fontSize: 15,
};

export const infoCardSx = {
  p: 2.5,
  borderRadius: 4,
  border: '1px solid rgba(108, 99, 255, 0.12)',
  background: '#ffffff',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.045)',
};

export const infoTitleSx = {
  fontSize: 14,
  fontWeight: 700,
  color: '#111827',
  mb: 1.5,
};

export const infoChipSx = {
  height: 30,
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 600,
  background: 'rgba(108, 99, 255, 0.1)',
  color: ACCENT_COLOR,
  border: '1px solid rgba(108, 99, 255, 0.22)',
};

export const timerCardSx = (shadowColor: string, isDimmed = false) => ({
  p: 4,
  flex: 1,
  borderRadius: 6,
  textAlign: 'center',
  border: '1px solid rgba(108, 99, 255, 0.1)',
  background: '#ffffff',
  boxShadow: `0 20px 60px ${shadowColor}`,
  opacity: isDimmed ? 0.62 : 1,
  transition: 'all 0.2s ease',
});

export const timerTitleSx = {
  fontWeight: 800,
  color: '#64748b',
  mb: 2,
  fontSize: 13,
  letterSpacing: '0.08em',
};

export const timerWrapperSx = {
  position: 'relative',
  display: 'inline-flex',
};

export const timerBaseProgressSx = (color: string) => ({
  color,
});

export const timerValueProgressSx = (color: string) => ({
  color,
  position: 'absolute',
  left: 0,
});

export const timerCenterSx = {
  inset: 0,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

export const timerLabelSx = {
  fontSize: 12,
  fontWeight: 800,
  color: ACCENT_COLOR,
  letterSpacing: '0.08em',
};

export const breakReminderPanelSx = {
  p: 3,
  borderRadius: 4,
  background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 70%)',
  border: '1px solid #fed7aa',
  boxShadow: '0 14px 38px rgba(249, 115, 22, 0.12)',
};

export const breakReminderTitleSx = {
  fontSize: 18,
  fontWeight: 800,
  color: '#9a3412',
  letterSpacing: '-0.02em',
};

export const breakReminderTextSx = {
  color: '#7c2d12',
  fontSize: 14,
  lineHeight: 1.6,
};

export const acceptBreakButtonSx = {
  borderRadius: 2,
  textTransform: 'none',
  fontWeight: 700,
  background: '#f97316',
  boxShadow: 'none',
  '&:hover': {
    background: '#ea580c',
    boxShadow: 'none',
  },
};

export const ignoreBreakButtonSx = {
  borderRadius: 2,
  textTransform: 'none',
  fontWeight: 700,
  borderColor: '#fed7aa',
  color: '#9a3412',
  '&:hover': {
    borderColor: '#fb923c',
    background: '#fff7ed',
  },
};

export const sessionDonePanelSx = {
  p: 3,
  borderRadius: 4,
  background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.08), #ffffff)',
  border: '1px solid rgba(108, 99, 255, 0.18)',
  boxShadow: '0 14px 38px rgba(108, 99, 255, 0.1)',
};

export const penaltyPanelSx = {
  p: 3,
  borderRadius: 4,
  background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 72%)',
  border: '1px solid #fecaca',
  boxShadow: '0 14px 38px rgba(220, 38, 38, 0.1)',
};

export const penaltyTitleSx = {
  fontSize: 18,
  fontWeight: 800,
  color: '#991b1b',
  letterSpacing: '-0.02em',
};

export const penaltyMessageSx = {
  color: '#7f1d1d',
  fontSize: 14,
  lineHeight: 1.6,
};

export const penaltyChipSx = {
  height: 28,
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
  background: '#ffffff',
  color: '#991b1b',
  border: '1px solid #fecaca',
};

export const actionButtonSx = {
  borderRadius: 999,
  px: 4,
  py: 1,
  textTransform: 'none',
  fontWeight: 700,
  background: ACCENT_COLOR,
  boxShadow: 'none',
  '&:hover': {
    background: '#5b52e8',
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    background: '#cbd5e1',
    color: '#ffffff',
  },
};

export const endSessionButtonSx = {
  borderRadius: 999,
  px: 4,
  py: 1,
  textTransform: 'none',
  fontWeight: 700,
  background: '#ef4444',
  boxShadow: 'none',
  '&:hover': {
    background: '#dc2626',
    boxShadow: 'none',
  },
};

export const shortSessionDialogPaperSx = {
  borderRadius: 4,
  border: '1px solid rgba(239, 68, 68, 0.18)',
  boxShadow: '0 24px 70px rgba(15, 23, 42, 0.18)',
};

export const shortSessionTitleSx = {
  fontSize: 22,
  fontWeight: 800,
  color: '#111827',
  letterSpacing: '-0.03em',
};

export const shortSessionTextSx = {
  color: '#64748b',
  fontSize: 14,
  lineHeight: 1.7,
};

export const continueStudyingButtonSx = {
  borderRadius: 2,
  textTransform: 'none',
  fontWeight: 700,
  color: '#64748b',
  '&:hover': {
    background: '#f8fafc',
  },
};

export const confirmEndButtonSx = {
  borderRadius: 2,
  textTransform: 'none',
  fontWeight: 700,
  background: '#ef4444',
  boxShadow: 'none',
  '&:hover': {
    background: '#dc2626',
    boxShadow: 'none',
  },
};
