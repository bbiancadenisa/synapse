export const pageSx = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f7f7ff 0%, #eef2ff 50%, #f8fafc 100%)',
  py: 6,
};

export const titleSx = {
  fontWeight: 800,
};

export const infoCardSx = {
  p: 3,
  borderRadius: 5,
  boxShadow: '0 20px 60px rgba(15, 23, 42, 0.08)',
};

export const timerCardSx = (shadowColor: string, isDimmed = false) => ({
  p: 4,
  flex: 1,
  borderRadius: 6,
  textAlign: 'center',
  boxShadow: `0 20px 60px ${shadowColor}`,
  opacity: isDimmed ? 0.75 : 1,
});

export const timerTitleSx = {
  fontWeight: 700,
  color: 'text.secondary',
  mb: 2,
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
  color: 'text.secondary',
};

export const breakReminderPanelSx = {
  p: 3,
  borderRadius: 5,
  background: '#fff7ed',
};

export const sessionDonePanelSx = {
  p: 3,
  borderRadius: 5,
  background: '#eff6ff',
};

export const penaltyPanelSx = {
  p: 3,
  borderRadius: 3,
  background: '#fef2f2',
  border: '1px solid #fecaca',
};

export const penaltyTitleSx = {
  fontWeight: 600,
  color: '#991b1b',
};

export const penaltyMessageSx = {
  color: '#7f1d1d',
  fontSize: 14,
};

export const actionButtonSx = {
  borderRadius: 999,
  px: 4,
};
