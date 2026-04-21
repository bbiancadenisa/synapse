import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';

type Props = {
  open: boolean;
  taskId: number | null;
  onClose: () => void;
  onStart: (data: {
    plannedDuration: number;
    breakInterval: number;
    breakDuration: number;
  }) => void;
};

export const CreateSessionModal = ({
  open,
  taskId,
  onClose,
  onStart,
}: Props) => {
  const [plannedDuration, setPlannedDuration] = useState<number>(60);
  const [breakInterval, setBreakInterval] = useState<number>(30);
  const [breakDuration, setBreakDuration] = useState<number>(5);

  const isValid =
    plannedDuration > 0 && breakInterval > 0 && breakDuration > 0 && !!taskId;

  const handleStart = () => {
    if (!isValid) return;

    onStart({
      plannedDuration,
      breakInterval,
      breakDuration,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Study Session</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Planned duration (minutes)"
            type="number"
            value={plannedDuration}
            onChange={(e) => setPlannedDuration(Number(e.target.value))}
          />

          <TextField
            label="Break interval (minutes)"
            type="number"
            value={breakInterval}
            onChange={(e) => setBreakInterval(Number(e.target.value))}
          />

          <TextField
            label="Break duration (minutes)"
            type="number"
            value={breakDuration}
            onChange={(e) => setBreakDuration(Number(e.target.value))}
          />

          <Button variant="contained" disabled={!isValid} onClick={handleStart}>
            Start Session
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
