import { Button, Stack } from '@mui/material';
import {
  actionButtonSx,
  endSessionButtonSx,
} from '../SessionDetailsPage.style';

type Props = {
  isOnBreak: boolean;
  onManualBreak: () => void;
  onEndSession: () => void;
};

export const SessionActions = ({
  isOnBreak,
  onManualBreak,
  onEndSession,
}: Props) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <Button
        variant="contained"
        disabled={isOnBreak}
        onClick={onManualBreak}
        sx={actionButtonSx}
      >
        Take a break
      </Button>

      <Button
        variant="contained"
        onClick={onEndSession}
        sx={endSessionButtonSx}
      >
        End Session
      </Button>
    </Stack>
  );
};
