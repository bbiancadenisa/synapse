import { Paper, Typography } from '@mui/material';
import { sessionDonePanelSx } from '../SessionDetailsPage.style';

export const SessionDonePanel = () => {
  return (
    <Paper sx={sessionDonePanelSx}>
      <Typography fontWeight={800}>
        Study time reached. You can end the session now.
      </Typography>
    </Paper>
  );
};
