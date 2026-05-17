import { Grid, Paper, Typography } from '@mui/material';
import type { DailyStats } from '../../services/dailyStats';
import { cardSx, labelSx, titleSx, valueSx } from './ActivityCard.styles';

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

            <Typography sx={labelSx}>{item.label}</Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
