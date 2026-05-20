import { Button, Paper, Stack, Typography } from '@mui/material';
import {
  acceptBreakButtonSx,
  breakReminderPanelSx,
  breakReminderTextSx,
  breakReminderTitleSx,
  ignoreBreakButtonSx,
} from '../SessionDetailsPage.style';

type Props = {
  onAccept: () => void;
  onIgnore: () => void;
};

export const BreakReminderPanel = ({ onAccept, onIgnore }: Props) => {
  return (
    <Paper elevation={0} sx={breakReminderPanelSx}>
      <Stack spacing={2}>
        <Typography sx={breakReminderTitleSx}>Time for a break</Typography>

        <Typography sx={breakReminderTextSx}>
          Your focus cycle is complete. Take a short break to recharge before
          continuing.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={onAccept}
            sx={acceptBreakButtonSx}
          >
            Accept break
          </Button>

          <Button
            variant="outlined"
            onClick={onIgnore}
            sx={ignoreBreakButtonSx}
          >
            Ignore
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
