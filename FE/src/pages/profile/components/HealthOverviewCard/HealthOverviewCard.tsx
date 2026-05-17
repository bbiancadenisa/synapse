import {
  Box,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { getRiskColor } from '../../../../hooks/userProfilePageUtils';
import type { DailyStats } from '../../../../services/dailyStats';
import {
  cardSx,
  healthProgressSx,
  healthValueSx,
  messageSx,
  riskChipSx,
  titleSx,
} from './HealthOverviewCard.styles';

type Props = {
  stats: DailyStats;
};

export const HealthOverviewCard = ({ stats }: Props) => {
  const riskStyle = getRiskColor(stats.burnout_risk);

  return (
    <Paper elevation={0} sx={cardSx}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', md: 'center' }}
        spacing={3}
      >
        <Box>
          <Typography sx={titleSx}>Health points</Typography>

          <Typography sx={messageSx}>{stats.health_message}</Typography>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography sx={healthValueSx}>{stats.health_points}%</Typography>

          <Chip
            label={`${stats.burnout_risk} risk`}
            size="small"
            sx={riskChipSx(riskStyle)}
          />
        </Stack>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={stats.health_points}
        sx={healthProgressSx(stats.health_points)}
      />
    </Paper>
  );
};
