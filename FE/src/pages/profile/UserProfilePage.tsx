import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useDailyStats } from '../../hooks/useDailyStats';
import { ActivityCard } from './components/ActivityCard/ActivityCard';
import { HealthOverviewCard } from './components/HealthOverviewCard/HealthOverviewCard';
import { SleepCard } from './components/SleepCard/SleepCard';
import { StatCard } from './components/StatCard/StatCard';
import {
  loadingTextSx,
  pageSubtitleSx,
  pageSx,
  pageTitleSx,
} from './UserProfilePage.styles';

export const UserProfilePage = () => {
  const { stats, sleepHours, setSleepHours, loading, handleSaveSleep } =
    useDailyStats();

  if (loading || !stats) {
    return (
      <Box sx={pageSx}>
        <Container maxWidth="lg">
          <Typography sx={loadingTextSx}>Loading stats...</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={pageSx}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
          >
            <Box>
              <Typography variant="h4" sx={pageTitleSx}>
                Today&apos;s LifeStats
              </Typography>

              <Typography sx={pageSubtitleSx}>
                Track your energy, focus, stress, study balance, and burnout
                risk for today.
              </Typography>
            </Box>
          </Stack>

          <HealthOverviewCard stats={stats} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <StatCard label="Energy" value={stats.energy} color="#10b981" />
            </Grid>

            <Grid item xs={12} md={4}>
              <StatCard label="Focus" value={stats.focus} color="#6C63FF" />
            </Grid>

            <Grid item xs={12} md={4}>
              <StatCard label="Stress" value={stats.stress} color="#ef4444" />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <SleepCard
                sleepHours={sleepHours}
                setSleepHours={setSleepHours}
                onSave={handleSaveSleep}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <ActivityCard stats={stats} />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};
