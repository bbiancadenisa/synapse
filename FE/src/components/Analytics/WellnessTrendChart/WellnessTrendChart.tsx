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

type Props = {
  data: WellnessTrend[];
};

export const WellnessTrendChart = ({ data }: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{ p: 2, borderRadius: 2, border: '1px solid #e5e7eb' }}
    >
      <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 2 }}>
        Energy, focus & stress over time
      </Typography>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="energy"
            stroke="#10b981"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="focus"
            stroke="#4f46e5"
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
