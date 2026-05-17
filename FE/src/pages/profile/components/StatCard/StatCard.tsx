import { LinearProgress, Paper, Typography } from '@mui/material';
import { cardSx, labelSx, progressSx, valueSx } from './StatCard.styles';

type Props = {
  label: string;
  value: number;
  suffix?: string;
  color?: string;
};

export const StatCard = ({
  label,
  value,
  suffix = '%',
  color = '#4f46e5',
}: Props) => {
  return (
    <Paper elevation={0} sx={cardSx}>
      <Typography sx={labelSx}>{label}</Typography>

      <Typography sx={valueSx}>
        {value}
        {suffix}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={Math.min(value, 100)}
        sx={progressSx(color)}
      />
    </Paper>
  );
};
