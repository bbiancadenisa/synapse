import { InfoOutlined } from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import type { DailyStats } from '../../../../services/dailyStats';
import {
  cardSx,
  infoButtonSx,
  labelSx,
  titleSx,
  tooltipTextSx,
  tooltipTitleSx,
  valueSx,
} from './ActivityCard.styles';

type Props = {
  stats: DailyStats;
};

const activityItems = (stats: DailyStats) => [
  {
    value: stats.total_study_minutes,
    label: 'study minutes',
  },
  {
    value: stats.total_break_minutes,
    label: 'break minutes',
  },
  {
    value: stats.breaks_taken,
    label: 'breaks taken',
  },
  {
    value: `${stats.productivity_score}%`,
    label: 'productivity',
    hasInfo: true,
  },
];

export const ActivityCard = ({ stats }: Props) => {
  return (
    <Paper elevation={0} sx={cardSx}>
      <Typography sx={titleSx}>Today&apos;s activity</Typography>

      <Grid container spacing={2}>
        {activityItems(stats).map((item) => (
          <Grid item xs={6} md={3} key={item.label}>
            <Typography sx={valueSx}>{item.value}</Typography>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography sx={labelSx}>{item.label}</Typography>

              {item.hasInfo && (
                <Tooltip
                  arrow
                  title={
                    <Box>
                      <Typography sx={tooltipTitleSx}>
                        Productivity score
                      </Typography>

                      <Typography sx={tooltipTextSx}>
                        Productivity is calculated only after you have studied
                        for at least 10 minutes.
                      </Typography>

                      <Typography sx={tooltipTextSx}>
                        It combines study time, focus, stress level, and break
                        balance into one simple score.
                      </Typography>
                    </Box>
                  }
                >
                  <IconButton size="small" sx={infoButtonSx}>
                    <InfoOutlined sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
