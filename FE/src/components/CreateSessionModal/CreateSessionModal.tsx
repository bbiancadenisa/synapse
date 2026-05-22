import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
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
  const [plannedHours, setPlannedHours] = useState<number>(1);
  const [plannedMinutes, setPlannedMinutes] = useState<number>(0);
  const [breakInterval, setBreakInterval] = useState<number>(30);
  const [breakDuration, setBreakDuration] = useState<number>(5);

  const plannedDuration = plannedHours * 60 + plannedMinutes;

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
      <DialogTitle>Create study session</DialogTitle>

      <DialogContent>
        <Stack spacing={2.25} sx={{ mt: 1 }}>
          <Typography sx={{ fontSize: 13, color: '#64748b' }}>
            Choose how long you want to study and how often you want breaks.
          </Typography>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Hours"
              type="number"
              value={plannedHours}
              onChange={(e) =>
                setPlannedHours(Math.max(0, Number(e.target.value)))
              }
              inputProps={{ min: 0 }}
              size="small"
              fullWidth
            />

            <TextField
              label="Minutes"
              type="number"
              value={plannedMinutes}
              onChange={(e) =>
                setPlannedMinutes(
                  Math.min(59, Math.max(0, Number(e.target.value))),
                )
              }
              inputProps={{ min: 0, max: 59 }}
              size="small"
              fullWidth
            />
          </Stack>

          <TextField
            label="Break interval (minutes)"
            type="number"
            value={breakInterval}
            onChange={(e) =>
              setBreakInterval(Math.max(1, Number(e.target.value)))
            }
            inputProps={{ min: 1 }}
            size="small"
            fullWidth
          />

          <TextField
            label="Break duration (minutes)"
            type="number"
            value={breakDuration}
            onChange={(e) =>
              setBreakDuration(Math.max(1, Number(e.target.value)))
            }
            inputProps={{ min: 1 }}
            size="small"
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            color: '#64748b',
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          disabled={!isValid}
          onClick={handleStart}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            background: isValid ? '#4f46e5' : '#cbd5e1',
            boxShadow: 'none',
            '&:hover': {
              background: isValid ? '#4338ca' : '#cbd5e1',
              boxShadow: 'none',
            },
            '&.Mui-disabled': {
              color: '#ffffff',
              background: '#cbd5e1',
            },
          }}
        >
          Start session
        </Button>
      </DialogActions>
    </Dialog>
  );
};
