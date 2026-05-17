import { Button, Paper, Stack, Typography } from '@mui/material';
import { breakReminderPanelSx } from '../SessionDetailsPage.style';

type Props = {
  onAccept: () => void;
  onIgnore: () => void;
};

export const BreakReminderPanel = ({ onAccept, onIgnore }: Props) => {
  return (
    <Paper sx={breakReminderPanelSx}>
      <Stack spacing={2}>
        <Typography fontWeight={800}>Time for a break</Typography>
        <Typography color="text.secondary">
          Your focus cycle is complete. Take a short break to recharge.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={onAccept}>
            Accept break
          </Button>
          <Button variant="outlined" onClick={onIgnore}>
            Ignore
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
