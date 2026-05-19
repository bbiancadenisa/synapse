import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import { AnalyticsOverviewCards } from '../../components/Analytics/AnalyticsOverviewCards/AnalyticsOvervewCrads';
import { ProductivityByHourChart } from '../../components/Analytics/ProductivityByHourChart/ProductivityByHourChart';
import { StudyActivityChart } from '../../components/Analytics/StudyActivityChart/StudyActivityChart';
import { WellnessTrendChart } from '../../components/Analytics/WellnessTrendChart/WellnessTrendChart';
import {
  loadingTextSx,
  pageSx,
  sectionTitleSx,
  selectSx,
  subtitleSx,
  titleSx,
} from './AnalyticsPage.styles';
import { useAnalytics } from './useAnalytics';

export const AnalyticsPage = () => {
  const { analytics, loading, range, setRange } = useAnalytics();

  if (loading || !analytics) {
    return (
      <Box sx={pageSx}>
        <Container maxWidth="lg">
          <Typography sx={loadingTextSx}>Loading analytics...</Typography>
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
              <Typography variant="h4" sx={titleSx}>
                Analytics
              </Typography>

              <Typography sx={subtitleSx}>
                Understand your study patterns, focus trends, burnout signals,
                recovery balance, and subject performance.
              </Typography>
            </Box>

            <FormControl size="small" sx={selectSx}>
              <InputLabel>Range</InputLabel>

              <Select
                value={range}
                label="Range"
                onChange={(e) => setRange(e.target.value as 1 | 7 | 30)}
              >
                <MenuItem value={1}>Today</MenuItem>
                <MenuItem value={7}>Last 7 days</MenuItem>
                <MenuItem value={30}>Last 30 days</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Typography sx={sectionTitleSx}>Overview</Typography>

          <AnalyticsOverviewCards analytics={analytics} />
          <StudyActivityChart data={analytics.charts.studyMinutesPerDay} />

          <WellnessTrendChart data={analytics.charts.wellnessTrends} />

          <ProductivityByHourChart data={analytics.charts.productivityByHour} />
        </Stack>
      </Container>
    </Box>
  );
};
