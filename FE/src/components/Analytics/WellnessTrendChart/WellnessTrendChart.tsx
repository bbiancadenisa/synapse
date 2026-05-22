import { Paper, Typography } from '@mui/material';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { WellnessTrend } from '../../../types/analyticsTypes';
import { formatChartDate } from '../../../utils/analyticsFormatter';
import {
  chartCardSx,
  chartSubtitleSx,
  chartTitleSx,
} from '../AnalyticsChart.styles';

type Props = {
  data: WellnessTrend[];
};

export const WellnessTrendChart = ({ data }: Props) => {
  return (
    <Paper elevation={0} sx={chartCardSx}>
      <Typography sx={chartTitleSx}>Wellness trend</Typography>

      <Typography sx={chartSubtitleSx}>
        X-axis shows the date. Y-axis shows your score from 0 to 100 for energy,
        focus, and stress.
      </Typography>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tickFormatter={formatChartDate} />
          <YAxis
            domain={[0, 100]}
            label={{
              value: 'Score',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip
            labelFormatter={(value) => formatChartDate(String(value))}
            formatter={(value, name) => [
              `${value}%`,
              String(name).charAt(0).toUpperCase() + String(name).slice(1),
            ]}
          />
          <Line
            type="monotone"
            dataKey="energy"
            stroke="#10b981"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="focus"
            stroke="#6C63FF"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="stress"
            stroke="#ef4444"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};
