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

import {
  formatChartDate,
  formatMinutes,
} from '../../../utils/analyticsFormatter';
import {
  chartCardSx,
  chartSubtitleSx,
  chartTitleSx,
} from '../AnalyticsChart.styles';

type Props = {
  data: {
    date: string;
    studyMinutes: number;
  }[];
};

export const StudyActivityChart = ({ data }: Props) => {
  return (
    <Paper elevation={0} sx={chartCardSx}>
      <Typography sx={chartTitleSx}>Study activity</Typography>

      <Typography sx={chartSubtitleSx}>
        X-axis shows the study date. Y-axis shows how many minutes you studied
        on that day.
      </Typography>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tickFormatter={formatChartDate} />
          <YAxis
            label={{
              value: 'Study minutes',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip
            labelFormatter={(value) => formatChartDate(String(value))}
            formatter={(value) => [formatMinutes(Number(value)), 'Study time']}
          />
          <Bar dataKey="studyMinutes" fill="#6C63FF" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};
