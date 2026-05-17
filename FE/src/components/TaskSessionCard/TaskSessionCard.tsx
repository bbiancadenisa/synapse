import { Box, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import type { StudySession } from '../../services/session';

import {
  formatDate,
  formatSessionStatus,
  getSessionProgress,
} from '../TaskCard/TaskCard.utils';
import {
  getSessionStatusChipSx,
  progressSx,
  progressTextSx,
  sessionCardSx,
  sessionMetaSx,
  sessionTitleSx,
} from './TaskSessionCard.styles';

type Props = {
  session: StudySession;
};

export const TaskSessionCard = ({ session }: Props) => {
  const progress = getSessionProgress(session);

  return (
    <Box sx={sessionCardSx}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={1}
        sx={{ mb: 1 }}
      >
        <Stack spacing={0.25}>
          <Typography sx={sessionTitleSx}>
            Planned study time: {session.planned_duration_minutes} min
          </Typography>

          <Typography sx={sessionMetaSx}>
            Breaks taken: {session.break_count} · Started:{' '}
            {formatDate(session.start_time)}
          </Typography>
        </Stack>

        <Chip
          size="small"
          label={formatSessionStatus(session.status)}
          sx={getSessionStatusChipSx(session.status)}
        />
      </Stack>

      <Stack direction="row" spacing={1.5} alignItems="center">
        <LinearProgress
          variant="determinate"
          value={Math.min(progress, 100)}
          sx={progressSx}
        />

        <Typography sx={progressTextSx}>{progress}%</Typography>
      </Stack>
    </Box>
  );
};
