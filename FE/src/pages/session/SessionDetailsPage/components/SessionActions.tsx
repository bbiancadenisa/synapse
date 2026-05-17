import { Button, Stack } from '@mui/material';
import { actionButtonSx } from '../SessionDetailsPage.style';

type Props = {
  isOnBreak: boolean;
  sessionDone: boolean;
  onManualBreak: () => void;
  onEndSession: () => void;
};

export const SessionActions = ({
  isOnBreak,
  sessionDone,
  onManualBreak,
  onEndSession,
}: Props) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <Button
        variant="contained"
        disabled={isOnBreak || sessionDone}
        onClick={onManualBreak}
        sx={actionButtonSx}
      >
        Take a break
      </Button>

      <Button
        variant="contained"
        color="error"
        onClick={onEndSession}
        sx={actionButtonSx}
      >
        End Session
      </Button>
    </Stack>
  );
};
