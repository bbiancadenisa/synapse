import { Chip, Paper, Stack, Typography } from '@mui/material';
import type { LiveStats } from '../../../../types/dailyStatsTypes';
import {
  penaltyMessageSx,
  penaltyPanelSx,
  penaltyTitleSx,
} from '../SessionDetailsPage.style';

type Props = {
  message: string | null;
  liveStats: LiveStats | null;
};

export const PenaltyPanel = ({ message, liveStats }: Props) => {
  return (
    <Paper sx={penaltyPanelSx}>
      <Stack spacing={1.5}>
        <Typography sx={penaltyTitleSx}>Health stats affected</Typography>

        <Typography sx={penaltyMessageSx}>
          {message ||
            'You ignored too many break reminders. Penalty mode is active.'}
        </Typography>

        {liveStats && (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label={`Energy: ${liveStats.energy ?? '-'}%`} />
            <Chip label={`Focus: ${liveStats.focus ?? '-'}%`} />
            <Chip label={`Stress: ${liveStats.stress ?? '-'}%`} />
            <Chip label={`Health: ${liveStats.healthPoints ?? '-'}%`} />

            {liveStats.burnoutRisk && (
              <Chip label={`Risk: ${liveStats.burnoutRisk}`} />
            )}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};
