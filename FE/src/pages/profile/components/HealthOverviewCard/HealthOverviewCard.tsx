import { InfoOutlined } from '@mui/icons-material';
import {
  Box,
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
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
          <Stack direction="row" spacing={0.75} alignItems="center">
            <Typography sx={titleSx}>Health points</Typography>

            <Tooltip
              arrow
              title={
                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>
                    How health points work
                  </Typography>

                  <Typography sx={{ fontSize: 12, lineHeight: 1.6 }}>
                    Health points are calculated using your study time, breaks,
                    sleep, stress, focus, and burnout indicators.
                  </Typography>

                  <Typography sx={{ fontSize: 12, lineHeight: 1.6, mt: 1 }}>
                    Ignoring breaks, low sleep, and excessive study sessions can
                    reduce your overall health score.
                  </Typography>
                </Box>
              }
            >
              <IconButton
                size="small"
                sx={{
                  color: '#6C63FF',
                  p: 0.4,
                }}
              >
                <InfoOutlined sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </Stack>

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
