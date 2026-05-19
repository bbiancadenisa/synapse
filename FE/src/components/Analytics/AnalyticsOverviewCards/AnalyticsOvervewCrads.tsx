import { Grid, Paper, Typography } from '@mui/material';
import type { AnalyticsSummary } from '../../../types/analyticsTypes';
import {
  cardSx,
  helperSx,
  labelSx,
  valueSx,
} from './AnalyticsOverviewCards.styles';

type Props = {
  analytics: AnalyticsSummary;
};

const minutesToHours = (minutes: number) => {
  return `${Math.round((minutes / 60) * 10) / 10}h`;
};

export const AnalyticsOverviewCards = ({ analytics }: Props) => {
  const cards = [
    {
      label: 'Total study time',
      value: minutesToHours(analytics.studyOverview.totalStudyMinutes),
      helper: `${analytics.studyOverview.totalStudyMinutes} minutes`,
    },
    {
      label: 'Current streak',
      value: `${analytics.streaks.currentStreak} days`,
      helper: `Longest: ${analytics.streaks.longestStreak} days`,
    },
    {
      label: 'Average session',
      value: `${analytics.studyOverview.averageSessionMinutes} min`,
      helper: `Longest: ${analytics.studyOverview.longestSessionMinutes} min`,
    },
    {
      label: 'Breaks taken',
      value: analytics.studyOverview.totalBreaks,
      helper: `${analytics.studyOverview.totalBreakMinutes} break minutes`,
    },
    {
      label: 'Studied this month',
      value: `${analytics.streaks.studiedDaysThisMonth} days`,
      helper: 'Active study days',
    },
    {
      label: 'Burnout risk',
      value: analytics.burnoutAnalytics.risk,
      helper: analytics.burnoutAnalytics.mainFactor,
    },
  ];

  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.label}>
          <Paper elevation={0} sx={cardSx}>
            <Typography sx={labelSx}>{card.label}</Typography>

            <Typography sx={valueSx}>{card.value}</Typography>

            <Typography sx={helperSx}>{card.helper}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
