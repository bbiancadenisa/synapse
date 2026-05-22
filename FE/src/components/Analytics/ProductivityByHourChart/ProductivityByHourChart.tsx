import { Paper, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ProductivityByHour } from '../../../types/analyticsTypes';

import {
  formatChartHour,
  formatMinutes,
} from '../../../utils/analyticsFormatter';
import {
  chartCardSx,
  chartSubtitleSx,
  chartTitleSx,
} from '../AnalyticsChart.styles';

type Props = {
  data: ProductivityByHour[];
};

export const ProductivityByHourChart = ({ data }: Props) => {
  return (
    <Paper elevation={0} sx={chartCardSx}>
      <Typography sx={chartTitleSx}>Productivity by hour</Typography>

      <Typography sx={chartSubtitleSx}>
        X-axis shows the hour of the day. Y-axis shows how many study minutes
        were recorded during that hour.
      </Typography>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="hour" tickFormatter={formatChartHour} />
          <YAxis
            label={{
              value: 'Study minutes',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip
            labelFormatter={(value) => formatChartHour(value as string)}
            formatter={(value) => [formatMinutes(Number(value)), 'Study time']}
          />
          <Bar dataKey="studyMinutes" fill="#6C63FF" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};
