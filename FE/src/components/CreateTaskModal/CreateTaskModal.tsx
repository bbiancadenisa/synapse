import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { createTask } from '../../services/task';

type Props = {
  open: boolean;
  subjectId: number;
  onClose: () => void;
  onCreated: () => void;
};

export const CreateTaskModal = ({
  open,
  subjectId,
  onClose,
  onCreated,
}: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedHours, setEstimatedHours] = useState<number>(1);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [deadline, setDeadline] = useState<Dayjs | null>(null);

  const isFormValid =
    title.trim().length > 0 && !!deadline && estimatedHours > 0;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setEstimatedHours(1);
    setPriority('low');
    setDeadline(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!isFormValid || !deadline) return;

    await createTask({
      subject_id: subjectId,
      title: title.trim(),
      description,
      estimated_hours: estimatedHours,
      priority,
      deadline: deadline.toISOString(),
    });

    resetForm();

    onCreated();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
          border: '1px solid #e5e7eb',
          boxShadow: '0 24px 60px rgba(15, 23, 42, 0.16)',
        },
      }}
    >
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1 }}>
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 600,
            color: '#111827',
            letterSpacing: '-0.02em',
          }}
        >
          Create task
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: 14,
            color: '#64748b',
          }}
        >
          Add a task with priority, estimated time, and a deadline.
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2 }}>
        <Stack spacing={2.25} sx={{ pt: 1 }}>
          <Typography
            sx={{
              fontSize: 13,
              color: '#64748b',
            }}
          >
            Fields marked with <strong>*</strong> are required.
          </Typography>

          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            size="small"
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            size="small"
          />

          <TextField
            label="Estimated hours"
            type="number"
            value={estimatedHours}
            onChange={(e) => setEstimatedHours(Number(e.target.value))}
            fullWidth
            required
            size="small"
            inputProps={{ min: 1 }}
          />

          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as 'low' | 'medium' | 'high')
            }
            fullWidth
            size="small"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <DateTimePicker
            label="Deadline"
            value={deadline}
            onChange={(v) => setDeadline(v)}
            disablePast
            ampm={false}
            format="DD/MM/YYYY HH:mm"
            slots={{ textField: TextField }}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                size: 'small',
              },
            }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
        <Button
          onClick={handleClose}
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
          onClick={handleSubmit}
          disabled={!isFormValid}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            background: isFormValid ? '#4f46e5' : '#cbd5e1',
            boxShadow: 'none',
            '&:hover': {
              background: isFormValid ? '#4338ca' : '#cbd5e1',
              boxShadow: 'none',
            },
            '&.Mui-disabled': {
              color: '#ffffff',
              background: '#cbd5e1',
            },
          }}
        >
          Create task
        </Button>
      </DialogActions>
    </Dialog>
  );
};
