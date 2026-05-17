import { Chip, Paper, Stack } from '@mui/material';
import type { SessionConfig } from '../../../../hooks/useSessionRuntime';
import { infoCardSx } from '../SessionDetailsPage.style';

type Props = {
  config?: SessionConfig;
};

export const SessionInfoChips = ({ config }: Props) => {
  return (
    <Paper sx={infoCardSx}>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip label={`Task ID: ${config?.taskId ?? '-'}`} />
        <Chip label={`Study: ${config?.plannedDuration ?? '-'} min`} />
        <Chip label={`Break every: ${config?.breakInterval ?? '-'} min`} />
        <Chip label={`Break duration: ${config?.breakDuration ?? '-'} min`} />
      </Stack>
    </Paper>
  );
};
