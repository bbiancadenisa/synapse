import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { formatTime } from '../../../utils/sessionDetailsPageUtils';
import {
  timerBaseProgressSx,
  timerCardSx,
  timerCenterSx,
  timerLabelSx,
  timerTitleSx,
  timerValueProgressSx,
  timerWrapperSx,
} from '../SessionDetailsPage.style';

type Props = {
  title: string;
  label: string;
  seconds: number;
  progress: number;
  baseColor: string;
  progressColor: string;
  shadowColor: string;
  isDimmed?: boolean;
};

export const TimerCard = ({
  title,
  label,
  seconds,
  progress,
  baseColor,
  progressColor,
  shadowColor,
  isDimmed = false,
}: Props) => {
  return (
    <Paper sx={timerCardSx(shadowColor, isDimmed)}>
      <Typography sx={timerTitleSx}>{title}</Typography>

      <Box sx={timerWrapperSx}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={210}
          thickness={4}
          sx={timerBaseProgressSx(baseColor)}
        />

        <CircularProgress
          variant="determinate"
          value={progress}
          size={210}
          thickness={4}
          sx={timerValueProgressSx(progressColor)}
        />

        <Box sx={timerCenterSx}>
          <Typography variant="h3" fontWeight={900}>
            {formatTime(seconds)}
          </Typography>

          <Typography sx={timerLabelSx}>{label}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
