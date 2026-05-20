import { InfoOutlined } from '@mui/icons-material';
import {
  Box,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import {
  cardSx,
  infoButtonSx,
  labelSx,
  progressSx,
  tooltipTextSx,
  tooltipTitleSx,
  valueSx,
} from './StatCard.styles';

type Props = {
  label: string;
  value: number;
  suffix?: string;
  color?: string;
};

const getStatInfo = (label: string) => {
  const normalized = label.toLowerCase();

  if (normalized === 'energy') {
    return {
      title: 'What energy means',
      description:
        'Energy reflects how physically and mentally ready you are to study today.',
      affectedBy:
        'It can be affected by sleep, long study sessions, ignored breaks, and overall workload.',
      improve:
        'Improve it by sleeping enough, taking breaks, avoiding very long sessions, and keeping a balanced study pace.',
    };
  }

  if (normalized === 'focus') {
    return {
      title: 'What focus means',
      description:
        'Focus shows how well you are maintaining attention during study sessions.',
      affectedBy:
        'It can drop when sessions are too long, breaks are skipped, stress is high, or tasks are overloaded.',
      improve:
        'Improve it by using shorter focused sessions, taking recovery breaks, reducing distractions, and working on one task at a time.',
    };
  }

  if (normalized === 'stress') {
    return {
      title: 'What stress means',
      description:
        'Stress estimates how much pressure your current study activity may be creating.',
      affectedBy:
        'It can increase because of close deadlines, too many active tasks, low sleep, or intense study streaks.',
      improve:
        'Reduce it by planning earlier, splitting tasks into smaller parts, taking breaks, and balancing difficult subjects.',
    };
  }

  return {
    title: label,
    description: 'This metric helps summarize your current study balance.',
    affectedBy:
      'It may be affected by your study time, breaks, workload, and sleep.',
    improve: 'Improve it by keeping a consistent and balanced routine.',
  };
};

export const StatCard = ({
  label,
  value,
  suffix = '%',
  color = '#6C63FF',
}: Props) => {
  const info = getStatInfo(label);

  return (
    <Paper elevation={0} sx={cardSx}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={labelSx}>{label}</Typography>

        <Tooltip
          arrow
          title={
            <Box>
              <Typography sx={tooltipTitleSx}>{info.title}</Typography>

              <Typography sx={tooltipTextSx}>{info.description}</Typography>

              <Typography sx={tooltipTextSx}>
                <strong>Affected by:</strong> {info.affectedBy}
              </Typography>

              <Typography sx={tooltipTextSx}>
                <strong>Improve it:</strong> {info.improve}
              </Typography>
            </Box>
          }
        >
          <IconButton size="small" sx={infoButtonSx}>
            <InfoOutlined sx={{ fontSize: 17 }} />
          </IconButton>
        </Tooltip>
      </Stack>

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
