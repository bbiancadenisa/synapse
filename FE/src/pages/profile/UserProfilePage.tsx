import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DailyStats } from '../../services/dailyStats';
import {
  getTodayStats,
  updateTodaySleepHours,
} from '../../services/dailyStats';

const getRiskColor = (risk?: string) => {
  if (risk === 'high') return { bg: '#fef2f2', color: '#dc2626' };
  if (risk === 'medium') return { bg: '#fffbeb', color: '#b45309' };
  return { bg: '#ecfdf5', color: '#047857' };
};

const StatCard = ({
  label,
  value,
  suffix = '%',
  color = '#4f46e5',
}: {
  label: string;
  value: number;
  suffix?: string;
  color?: string;
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid #e5e7eb',
        background: '#ffffff',
      }}
    >
      <Typography sx={{ fontSize: 14, color: '#64748b' }}>{label}</Typography>

      <Typography
        sx={{
          mt: 1,
          fontSize: 28,
          fontWeight: 600,
          color: '#111827',
          letterSpacing: '-0.03em',
        }}
      >
        {value}
        {suffix}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={Math.min(value, 100)}
        sx={{
          mt: 1.5,
          height: 8,
          borderRadius: 999,
          background: '#e5e7eb',
          '& .MuiLinearProgress-bar': {
            borderRadius: 999,
            background: color,
          },
        }}
      />
    </Paper>
  );
};

export const UserProfilePage = () => {
  const [stats, setStats] = useState<DailyStats | null>(null);
  const [sleepHours, setSleepHours] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getTodayStats();
      setStats(data);
      setSleepHours(data.sleep_hours !== null ? String(data.sleep_hours) : '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSaveSleep = async () => {
    if (!sleepHours.trim()) return;

    const value = Number(sleepHours);

    if (Number.isNaN(value) || value < 0 || value > 24) return;

    const updated = await updateTodaySleepHours(value);
    setStats(updated);
  };

  if (loading || !stats) {
    return (
      <Box sx={{ minHeight: '100vh', background: '#f8fafc', py: 5 }}>
        <Container maxWidth="lg">
          <Typography sx={{ color: '#64748b' }}>Loading stats...</Typography>
        </Container>
      </Box>
    );
  }

  const riskStyle = getRiskColor(stats.burnout_risk);

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8fafc', py: 5 }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#111827',
                }}
              >
                Today&apos;s LifeStats
              </Typography>

              <Typography
                sx={{
                  mt: 0.75,
                  color: '#64748b',
                  fontSize: 15,
                  maxWidth: 560,
                }}
              >
                Track your energy, focus, stress, study balance, and burnout
                risk for today.
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={() => navigate('/subjects')}
              sx={{
                borderRadius: 2,
                px: 2.5,
                py: 1,
                textTransform: 'none',
                fontWeight: 500,
                background: '#4f46e5',
                boxShadow: 'none',
                '&:hover': {
                  background: '#4338ca',
                  boxShadow: 'none',
                },
              }}
            >
              Go to subjects
            </Button>
          </Stack>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: '1px solid #e5e7eb',
              background: '#ffffff',
            }}
          >
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'stretch', md: 'center' }}
              spacing={3}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#111827',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Health points
                </Typography>

                <Typography sx={{ mt: 0.75, fontSize: 14, color: '#64748b' }}>
                  {stats.health_message}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  sx={{
                    fontSize: 36,
                    fontWeight: 600,
                    color: '#111827',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {stats.health_points}%
                </Typography>

                <Chip
                  label={`${stats.burnout_risk} risk`}
                  size="small"
                  sx={{
                    borderRadius: 1.5,
                    textTransform: 'capitalize',
                    background: riskStyle.bg,
                    color: riskStyle.color,
                  }}
                />
              </Stack>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={stats.health_points}
              sx={{
                mt: 2.5,
                height: 10,
                borderRadius: 999,
                background: '#e5e7eb',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 999,
                  background:
                    stats.health_points < 50
                      ? '#dc2626'
                      : stats.health_points < 70
                        ? '#f59e0b'
                        : '#10b981',
                },
              }}
            />
          </Paper>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <StatCard label="Energy" value={stats.energy} color="#10b981" />
            </Grid>

            <Grid item xs={12} md={4}>
              <StatCard label="Focus" value={stats.focus} color="#4f46e5" />
            </Grid>

            <Grid item xs={12} md={4}>
              <StatCard label="Stress" value={stats.stress} color="#ef4444" />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid #e5e7eb',
                  background: '#ffffff',
                  height: '100%',
                }}
              >
                <Typography sx={{ fontSize: 14, color: '#64748b' }}>
                  Sleep hours
                </Typography>

                <Stack direction="row" spacing={1.5} sx={{ mt: 1.5 }}>
                  <TextField
                    size="small"
                    type="number"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(e.target.value)}
                    inputProps={{ min: 0, max: 24, step: 0.5 }}
                    sx={{ maxWidth: 140 }}
                  />

                  <Button
                    variant="contained"
                    onClick={handleSaveSleep}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500,
                      background: '#4f46e5',
                      boxShadow: 'none',
                      '&:hover': {
                        background: '#4338ca',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    Save
                  </Button>
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid #e5e7eb',
                  background: '#ffffff',
                  height: '100%',
                }}
              >
                <Typography sx={{ fontSize: 14, color: '#64748b', mb: 2 }}>
                  Today&apos;s activity
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
                      {stats.total_study_minutes}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: '#64748b' }}>
                      study minutes
                    </Typography>
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
                      {stats.total_break_minutes}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: '#64748b' }}>
                      break minutes
                    </Typography>
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
                      {stats.breaks_taken}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: '#64748b' }}>
                      breaks taken
                    </Typography>
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
                      {stats.productivity_score}%
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: '#64748b' }}>
                      productivity
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};
