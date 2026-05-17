import { Button, Paper, Stack, TextField, Typography } from '@mui/material';

import { cardSx, inputSx, labelSx, saveButtonSx } from './SleepCard.styles';

type Props = {
  sleepHours: string;
  setSleepHours: (value: string) => void;
  onSave: () => void;
};

export const SleepCard = ({ sleepHours, setSleepHours, onSave }: Props) => {
  return (
    <Paper elevation={0} sx={cardSx}>
      <Typography sx={labelSx}>Sleep hours</Typography>

      <Stack direction="row" spacing={1.5} sx={{ mt: 1.5 }}>
        <TextField
          size="small"
          type="number"
          value={sleepHours}
          onChange={(e) => setSleepHours(e.target.value)}
          inputProps={{ min: 0, max: 24, step: 0.5 }}
          sx={inputSx}
        />

        <Button variant="contained" onClick={onSave} sx={saveButtonSx}>
          Save
        </Button>
      </Stack>
    </Paper>
  );
};
