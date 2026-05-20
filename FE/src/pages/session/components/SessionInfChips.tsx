import { Chip, Paper, Stack, Typography } from '@mui/material';
import type { SessionConfig } from '../../../hooks/useSessionRuntime';
import {
  infoCardSx,
  infoChipSx,
  infoTitleSx,
} from '../SessionDetailsPage.style';

type Props = {
  config?: SessionConfig;
};

export const SessionInfoChips = ({ config }: Props) => {
  return (
    <Paper elevation={0} sx={infoCardSx}>
      <Typography sx={infoTitleSx}>Session setup</Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip
          label={`Study time: ${config?.plannedDuration ?? '-'} min`}
          sx={infoChipSx}
        />

        <Chip
          label={`Break every: ${config?.breakInterval ?? '-'} min`}
          sx={infoChipSx}
        />

        <Chip
          label={`Break duration: ${config?.breakDuration ?? '-'} min`}
          sx={infoChipSx}
        />
      </Stack>
    </Paper>
  );
};
