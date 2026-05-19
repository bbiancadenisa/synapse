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

type Props = {
  data: {
    date: string;
    studyMinutes: number;
  }[];
};

export const StudyActivityChart = ({ data }: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{ p: 2, borderRadius: 2, border: '1px solid #e5e7eb' }}
    >
      <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 2 }}>
        Study minutes per day
      </Typography>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="studyMinutes" fill="#4f46e5" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};
