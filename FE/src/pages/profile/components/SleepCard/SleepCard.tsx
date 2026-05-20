import { InfoOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import {
  cardSx,
  editButtonSx,
  helperTextSx,
  infoButtonSx,
  inputSx,
  labelSx,
  saveButtonSx,
  sleepValueSx,
  tooltipTextSx,
  tooltipTitleSx,
} from './SleepCard.styles';

type Props = {
  sleepHours: string;
  setSleepHours: (value: string) => void;
  onSave: () => void;
};

export const SleepCard = ({ sleepHours, setSleepHours, onSave }: Props) => {
  const [isEditing, setIsEditing] = useState(!sleepHours);

  const hasSleepValue = sleepHours.trim().length > 0;

  const handleSave = () => {
    onSave();
    setIsEditing(false);
  };

  return (
    <Paper elevation={0} sx={cardSx}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={labelSx}>Sleep hours</Typography>

        <Tooltip
          arrow
          title={
            <Box>
              <Typography sx={tooltipTitleSx}>Why sleep matters</Typography>

              <Typography sx={tooltipTextSx}>
                Sleep affects your energy, focus, stress level, recovery, and
                burnout risk.
              </Typography>

              <Typography sx={tooltipTextSx}>
                Low sleep can reduce health points and make long study sessions
                feel harder.
              </Typography>
            </Box>
          }
        >
          <IconButton size="small" sx={infoButtonSx}>
            <InfoOutlined sx={{ fontSize: 17 }} />
          </IconButton>
        </Tooltip>
      </Stack>

      <Typography sx={helperTextSx}>
        Add today&apos;s sleep so your LifeStats can better estimate recovery.
      </Typography>

      {isEditing ? (
        <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
          <TextField
            size="small"
            type="number"
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
            inputProps={{ min: 0, max: 24, step: 0.5 }}
            sx={inputSx}
          />

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!hasSleepValue}
            sx={saveButtonSx}
          >
            Save
          </Button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 2 }}>
          <Typography sx={sleepValueSx}>{sleepHours}h</Typography>

          <Button
            variant="outlined"
            onClick={() => setIsEditing(true)}
            sx={editButtonSx}
          >
            Edit
          </Button>
        </Stack>
      )}
    </Paper>
  );
};
